import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60;

// Obfuscation decoder for server-side fallback
function _secDecode(cipherText: string, salt: number = 0x5a): string {
  try {
    const raw = Buffer.from(cipherText, 'base64').toString('binary');
    let out = '';
    for (let i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ ((salt + (i * 13)) & 0xff));
    }
    return out;
  } catch {
    return '';
  }
}

// Internal Server Vault
const _SERVER_VAULT = {
  G_EP: "MhMA8f2hh5qlqrKMhGJkdFxSKDAwDA3k9fqC3qm8h4GfZmRIXRUrOg9ACrj0xsTc5bqLlZtnaw==",
  K1: "GzZawOyj+vv0g5+Ez095SkFQKmcSXTnr4qj0/a+Zj6/MUH0YHFQ/Mg41NPnim+/pv42RsK8=",
  K2: "GzZawOyj+vv0heSRwVdSUX9CcxppJkH31NnUjLSltd2cM2ZVfHB7LCoBNL2ukN72iZGWm68=",
  K3: "GzZawOyj+vv0hO+im21ecHxyABY/BR3hoKf60Iq1ooK2NWdzZQI6YBZWF8jO09LzopzTk4k=",
};

const DEFAULT_SERVER_KEYS = [
  _secDecode(_SERVER_VAULT.K1),
  _secDecode(_SERVER_VAULT.K2),
  _secDecode(_SERVER_VAULT.K3),
];

const SERVER_KEYS = (process.env.GEMINI_API_KEYS || process.env.NEXT_PUBLIC_GEMINI_API_KEYS || '')
  .split(',')
  .map(k => k.trim())
  .filter(Boolean);

const ACTIVE_KEYS = SERVER_KEYS.length > 0 ? SERVER_KEYS : DEFAULT_SERVER_KEYS;

const INFERENCE_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-3.8-flash",
  "gemini-3.1-flash-lite",
  "gemini-flash-lite-latest",
];

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { prompt, maxOutputTokens, temperature } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Nội dung prompt không hợp lệ.' }, { status: 400 });
    }

    const endpointBase = _secDecode(_SERVER_VAULT.G_EP);
    let lastError: any = null;

    // Server-Side 3-Key Rotation & 6-Model Cascade Failover
    for (const apiKey of ACTIVE_KEYS) {
      for (const model of INFERENCE_MODELS) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        try {
          const url = `${endpointBase}/${model}:generateContent?key=${apiKey}`;
          const response = await fetch(url, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                maxOutputTokens: typeof maxOutputTokens === 'number' && maxOutputTokens > 0 ? maxOutputTokens : 8192,
                temperature: typeof temperature === 'number' ? temperature : 0.35,
              },
            }),
          });

          const data = await response.json().catch(() => ({}));

          if (!response.ok) {
            const apiMessage = data.error?.message || `HTTP ${response.status}`;
            const error: any = new Error(apiMessage);
            error.status = response.status;
            throw error;
          }

          if (!data.candidates || !data.candidates[0]) {
            const blockReason = data.promptFeedback?.blockReason;
            throw new Error(blockReason ? `Nội dung bị chặn: ${blockReason}` : 'AI chưa trả về nội dung.');
          }

          const parts = data.candidates[0].content.parts;
          let resultText = '';
          for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i].text) {
              resultText = parts[i].text;
              break;
            }
          }

          if (resultText) {
            return NextResponse.json({ text: resultText, model, success: true });
          }
        } catch (err: any) {
          lastError = err;
          // If key is exhausted/unauthorized, break to try next key
          const keyUnavailable = err.status === 403 || err.status === 429 || /api key|quota|permission/i.test(err.message || '');
          if (keyUnavailable) {
            break;
          }
        } finally {
          clearTimeout(timeoutId);
        }
      }
    }

    return NextResponse.json(
      { error: lastError?.message || 'Hệ thống AI đang bảo trì, vui lòng thử lại sau.' },
      { status: 500 }
    );
  } catch (globalErr: any) {
    return NextResponse.json(
      { error: globalErr?.message || 'Lỗi xử lý máy chủ' },
      { status: 500 }
    );
  }
}
