import { createClient } from '@supabase/supabase-js';

// Obfuscation / Deobfuscation Engine (Multi-layered XOR + Base64 Byte Shift)
function _secDecode(cipherText: string, salt: number = 0x5a): string {
  try {
    const raw = typeof atob !== 'undefined'
      ? atob(cipherText)
      : typeof Buffer !== 'undefined'
      ? Buffer.from(cipherText, 'base64').toString('binary')
      : '';
    let out = '';
    for (let i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ ((salt + (i * 13)) & 0xff));
    }
    return out;
  } catch {
    return '';
  }
}

// Obfuscated Encrypted Vault
const _VAULT = {
  P_URL: "MhMA8f2hh5qhoLScgmlyZFNCJjswHwnt+PDN1uiglZ2bZXVSSxUrOg==",
  P_KEY: "KQUr8fv5xNyxp72LmmZPc214BTsaJkz00OXB/o6Wmt2ocX9qWWQLNAw4PcCu4A==",
  B_URL: "MhMA8f2hh5q6qLGem2Zoe1NNIz81CArp+PvH0OiglZ2bZXVSSxUrOg==",
  B_KEY: "KQUr8fv5xNyxp72LmmZPbmsCdRo9PRLtos/m/YK+h56pVnZqWWR4PRQEEsjSlg==",
  D_URL: "MhMA8f2hh5qjv7XHkmp2ZARWLX4oWg==",
  D_KEY: "OxcErOfX3ta6qomkjEtKc0hTFQsULyr/++7v1Q==",
  G_EP: "MhMA8f2hh5qlqrKMhGJkdFxSKDAwDA3k9fqC3qm8h4GfZmRIXRUrOg9ACrj0xsTc5bqLlZtnaw==",
  K1: "GzZawOyj+vv0g6qeh0dyL1wAKz0HOU7NpM7E05GFtq+sQ1JIW1wJHDAHSM/Ex/rMuoWOg5k=",
  K2: "GzZawOyj+vv0heSRwVdSUX9CcxppJkH31NnUjLSltd2cM2ZVfHB7LCoBNL2ukN72iZGWm68=",
  K3: "GzZawOyj+vv0hO+im21ecHxyABY/BR3hoKf60Iq1ooK2NWdzZQI6YBZWF8jO09LzopzTk4k=",
  M1: "PQIZ6ODyhYbs+fGPmmJjdQ==",
  M2: "PQIZ6ODyhYbs+vGPmmJjdQ==",
  M3: "PQIZ6ODyhYbs+vGPmmJjdQdbLSU7",
  M4: "PQIZ6ODyhdOurq+B229xaU9EMA=="
};

// 1. Primary Data Provider
const PRIMARY_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || _secDecode(_VAULT.P_URL);
const PRIMARY_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  _secDecode(_VAULT.P_KEY);

export const supabase = createClient(PRIMARY_URL, PRIMARY_KEY);

// 2. Backup Data Provider
const BACKUP_URL = process.env.NEXT_PUBLIC_BACKUP_SUPABASE_URL || _secDecode(_VAULT.B_URL);
const BACKUP_KEY =
  process.env.NEXT_PUBLIC_BACKUP_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_BACKUP_SUPABASE_PUBLISHABLE_KEY ||
  _secDecode(_VAULT.B_KEY);

export const backupSupabase = createClient(BACKUP_URL, BACKUP_KEY);

// 3. Neural Assistant Configuration
const ASSISTANT_GATEWAY = process.env.NEXT_PUBLIC_DIFY_API_URL || _secDecode(_VAULT.D_URL);
const DEFAULT_ASSISTANT_KEY = _secDecode(_VAULT.D_KEY);

function decodeApiKey(key: string): string {
  try {
    if (!key) return "";
    if (key.startsWith("app-") || key.startsWith("AIza") || key.startsWith("AQ.")) return key;
    return typeof atob !== 'undefined' ? atob(key) : Buffer.from(key, 'base64').toString('utf8');
  } catch {
    return key;
  }
}

const ENV_DIFY_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY ? decodeApiKey(process.env.NEXT_PUBLIC_DIFY_API_KEY) : DEFAULT_ASSISTANT_KEY;
export const DIFY_API_KEY = ENV_DIFY_KEY;

export interface DifyChatMessage {
  query: string;
  user?: string;
  conversation_id?: string;
  inputs?: Record<string, any>;
}

export interface DifyChatResponse {
  answer: string;
  conversation_id?: string;
  message_id?: string;
}

export interface LessonPlanRequest {
  topic: string;
  grade: string;
  duration: string;
  prompt?: string;
}

export async function generateLessonPlanWithDify({ topic, grade, duration, prompt }: LessonPlanRequest): Promise<string> {
  const finalPrompt = prompt || `Soạn Kế Hoạch Bài Dạy (Giáo Án Hóa Học ${grade}) chuẩn theo Công văn 5512 BGD&ĐT cho bài học: "${topic}".
Thời lượng: ${duration} phút.
Bao gồm đầy đủ 4 hoạt động: 
I. MỤC TIÊU BÀI HỌC (Năng lực & Phẩm chất)
II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
III. TIẾN TRÌNH DẠY HỌC (Hoạt động 1: Mở đầu -> Hoạt động 2: Hình thành kiến thức -> Hoạt động 3: Luyện tập -> Hoạt động 4: Vận dụng & STEM).
Trả về nội dung trình bày sạch sẽ dưới dạng Markdown.`;

  const activeKey = process.env.NEXT_PUBLIC_DIFY_API_KEY ? decodeApiKey(process.env.NEXT_PUBLIC_DIFY_API_KEY) : DEFAULT_ASSISTANT_KEY;

  if (activeKey) {
    try {
      const res = await fetch(`${ASSISTANT_GATEWAY}/chat-messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${activeKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: { topic, grade, duration },
          query: finalPrompt,
          response_mode: "blocking",
          user: "teacher_user",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const outputText = data.answer || data.text || (data.data && (data.data.outputs?.result || data.data.outputs?.text));
        if (outputText && typeof outputText === "string" && outputText.trim()) {
          return outputText;
        }
      }
    } catch {
      // Fallback
    }
  }

  // Fallback to secondary pipeline
  return await callGeminiAPI(finalPrompt);
}

export async function sendDifyMessage({ query, user = "chemai_student", conversation_id, inputs = {} }: DifyChatMessage): Promise<DifyChatResponse> {
  const activeKey = process.env.NEXT_PUBLIC_DIFY_API_KEY ? decodeApiKey(process.env.NEXT_PUBLIC_DIFY_API_KEY) : DEFAULT_ASSISTANT_KEY;
  
  if (!activeKey) {
    throw new Error("Hệ thống trợ lý học tập chưa được kích hoạt khóa truy cập.");
  }

  const payload: Record<string, any> = {
    inputs,
    query,
    response_mode: "blocking",
    user: user || "chemai_student",
  };
  if (conversation_id && conversation_id.trim() && !conversation_id.startsWith("conv_error")) {
    payload.conversation_id = conversation_id.trim();
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch(`${ASSISTANT_GATEWAY}/chat-messages`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${activeKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Máy chủ học tập phản hồi: HTTP ${res.status}`);
    }

    const data = await res.json();
    const outputAnswer = data.answer || data.text || (data.data && (data.data.outputs?.result || data.data.outputs?.text)) || "";
    return {
      answer: typeof outputAnswer === "string" ? outputAnswer.trim() : JSON.stringify(outputAnswer),
      conversation_id: data.conversation_id,
      message_id: data.message_id || data.id,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

// 4. Secondary Inference Pipeline
const DEFAULT_SECONDARY_KEYS = [
  _secDecode(_VAULT.K1),
  _secDecode(_VAULT.K2),
  _secDecode(_VAULT.K3)
];

const ENV_SECONDARY_KEYS = process.env.NEXT_PUBLIC_GEMINI_API_KEYS
  ? process.env.NEXT_PUBLIC_GEMINI_API_KEYS.split(',').map(k => decodeApiKey(k.trim())).filter(Boolean)
  : DEFAULT_SECONDARY_KEYS;

const INFERENCE_MODELS = [
  _secDecode(_VAULT.M1),
  _secDecode(_VAULT.M2),
  _secDecode(_VAULT.M3),
  _secDecode(_VAULT.M4)
];

export async function callGeminiAPI(prompt: string, keys: string[] = ENV_SECONDARY_KEYS): Promise<string> {
  const keyList = Array.isArray(keys) ? keys : [keys];
  let lastError: any = null;
  const endpointBase = _secDecode(_VAULT.G_EP);

  for (const apiKey of keyList) {
    for (const model of INFERENCE_MODELS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      try {
        const url = `${endpointBase}/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const apiMessage = data.error && data.error.message ? data.error.message : "HTTP " + response.status;
          const error: any = new Error(apiMessage);
          error.status = response.status;
          throw error;
        }

        if (!data.candidates || !data.candidates[0]) {
          const blockReason = data.promptFeedback && data.promptFeedback.blockReason;
          throw new Error(blockReason ? "Nội dung câu hỏi cần điều chỉnh: " + blockReason : "Hệ thống chưa trả về nội dung.");
        }

        const parts = data.candidates[0].content.parts;
        let resultText = "";
        for (let i = parts.length - 1; i >= 0; i--) {
          if (parts[i].text) {
            resultText = parts[i].text;
            break;
          }
        }
        if (resultText) return resultText;
      } catch (err: any) {
        lastError = err.name === "AbortError" ? new Error("Hệ thống phản hồi quá thời gian 30 giây.") : err;
        const keyUnavailable = err.status === 403 || err.status === 429 || /api key|quota|permission/i.test(err.message || '');
        if (keyUnavailable) break;
      } finally {
        clearTimeout(timeoutId);
      }
    }
  }
  throw lastError || new Error("Hệ thống phân tích đang bảo trì, vui lòng thử lại sau ít phút.");
}

export async function generateParamHash(
  inputA: string, volA: number, concA: number,
  inputB: string, volB: number, concB: number,
  temp: number, indicator: string
): Promise<string> {
  const normA = inputA.toLowerCase().trim();
  const normB = inputB.toLowerCase().trim();
  let str = "";
  if (normA <= normB) {
    str = `A:${normA}|VA:${volA}|CA:${concA}|B:${normB}|VB:${volB}|CB:${concB}|T:${temp}|IND:${indicator}`;
  } else {
    str = `A:${normB}|VA:${volB}|CA:${concB}|B:${normA}|VB:${volA}|CB:${concA}|T:${temp}|IND:${indicator}`;
  }
  const encoded = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function playBubbleSoundEffect() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(250 + Math.random() * 350, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }, i * 180);
    }
  } catch {
    // Silent
  }
}
