import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

const _SERVER_VAULT = {
  D_URL: "MhMA8f2hh5qjv7XHkmp2ZARWLX4oWg==",
  D_KEY: "OxcErP/akOWypKmRmHN7UHBtEhQ0BD3r/fbWyA==",
};

const DIFY_API_URL = process.env.DIFY_API_URL || process.env.NEXT_PUBLIC_DIFY_API_URL || _secDecode(_SERVER_VAULT.D_URL);
const DIFY_API_KEY = process.env.DIFY_API_KEY || process.env.NEXT_PUBLIC_DIFY_API_KEY || _secDecode(_SERVER_VAULT.D_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { query, user = 'chemai_student', conversation_id, inputs = {} } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Nội dung câu hỏi không hợp lệ.' }, { status: 400 });
    }

    const payload: Record<string, any> = {
      inputs,
      query,
      response_mode: 'blocking',
      user: user || 'chemai_student',
    };

    if (conversation_id && typeof conversation_id === 'string' && conversation_id.trim() && !conversation_id.startsWith('conv_error')) {
      payload.conversation_id = conversation_id.trim();
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    try {
      const res = await fetch(`${DIFY_API_URL}/chat-messages`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return NextResponse.json(
          { error: data.message || `Dify Gateway HTTP ${res.status}` },
          { status: res.status }
        );
      }

      const outputAnswer = data.answer || data.text || (data.data && (data.data.outputs?.result || data.data.outputs?.text)) || '';
      return NextResponse.json({
        answer: typeof outputAnswer === 'string' ? outputAnswer.trim() : JSON.stringify(outputAnswer),
        conversation_id: data.conversation_id,
        message_id: data.message_id || data.id,
        success: true,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Lỗi kết nối máy chủ Dify' },
      { status: 500 }
    );
  }
}
