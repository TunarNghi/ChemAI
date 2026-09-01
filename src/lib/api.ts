import { createClient } from '@supabase/supabase-js';

// 1. Primary Supabase Client (Gốc / Chính)
const PRIMARY_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cohutjbyyubjntqhjoao.supabase.co";
const PRIMARY_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_nGOAjDM4qBzmGHEz0RvkKw_CanWAI8C";

export const supabase = createClient(PRIMARY_SUPABASE_URL, PRIMARY_SUPABASE_ANON_KEY);

// 2. Backup Supabase Client (Dự Phòng / Failover)
const BACKUP_SUPABASE_URL = process.env.NEXT_PUBLIC_BACKUP_SUPABASE_URL || "https://xgmwmexfyzgnkcrljdki.supabase.co";
const BACKUP_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_BACKUP_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_BACKUP_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_sA51KcVjh0PJDDmgsSQbKw_0hvknAD5";

export const backupSupabase = createClient(BACKUP_SUPABASE_URL, BACKUP_SUPABASE_ANON_KEY);

// 3. Dify AI Configuration (Mã hóa Base64)
const DEFAULT_DIFY_KEY_ENCODED = "YXBwLWlMdmN4ZVVNekhabmJkUVpKRFJ6aXFDbA==";
const DIFY_API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL || "https://api.dify.ai/v1";

function decodeApiKey(key: string): string {
  try {
    if (!key) return "";
    if (key.startsWith("app-") || key.startsWith("AIza") || key.startsWith("AQ.")) return key;
    return atob(key);
  } catch {
    return key;
  }
}

const ENV_DIFY_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY || DEFAULT_DIFY_KEY_ENCODED;
export const DIFY_API_KEY = decodeApiKey(ENV_DIFY_KEY);

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

  const activeDifyKey = decodeApiKey(process.env.NEXT_PUBLIC_DIFY_API_KEY || DEFAULT_DIFY_KEY_ENCODED);

  if (activeDifyKey) {
    try {
      const res = await fetch(`${DIFY_API_URL}/chat-messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${activeDifyKey}`,
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
      console.warn("Dify API response not OK, falling back to Gemini API.");
    } catch (err) {
      console.warn("Dify Lesson Plan API Error, falling back to Gemini:", err);
    }
  }

  // Fallback to Gemini API if Dify is not configured or fails
  return await callGeminiAPI(finalPrompt);
}

export async function sendDifyMessage({ query, user = "chemai_student", conversation_id, inputs = {} }: DifyChatMessage): Promise<DifyChatResponse> {
  const activeDifyKey = decodeApiKey(process.env.NEXT_PUBLIC_DIFY_API_KEY || DEFAULT_DIFY_KEY_ENCODED);
  
  if (!activeDifyKey) {
    throw new Error("Dify API Key chưa được cấu hình.");
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
    const res = await fetch(`${DIFY_API_URL}/chat-messages`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${activeDifyKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Dify API error: HTTP ${res.status} ${res.statusText}`);
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

// 4. Gemini AI Configuration (Mã hóa Base64)
const DEFAULT_GEMINI_KEYS_ENCODED = [
  "QVEuQWI4Uk42THZ3cURiMnY3b2xZUjZINlFoaldWVkJWREZpdWdBSVJoNEZSZEpxcFJqcmc=",
  "QVEuQWI4Uk42Sjh4N1RCTFV1N0s3TTlyRkZ4NXJ2VTBmNHJ0UkszeUhuSDQ4M25LQ0ZyalE=",
  "QVEuQWI4Uk42SzNLbW5ObVZFREdhbmVkMjhWaUxmQm9MMnNSSzlyNXQ5a0FYcGJOaEs3Ync="
];

const ENV_GEMINI_KEYS = process.env.NEXT_PUBLIC_GEMINI_API_KEYS
  ? process.env.NEXT_PUBLIC_GEMINI_API_KEYS.split(',').map(k => k.trim()).filter(Boolean)
  : DEFAULT_GEMINI_KEYS_ENCODED;

const GEMINI_API_KEYS = ENV_GEMINI_KEYS.map(decodeApiKey);
const GEMINI_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-flash-latest"
];

export async function callGeminiAPI(prompt: string, keys: string[] = GEMINI_API_KEYS): Promise<string> {
  const keyList = Array.isArray(keys) ? keys : [keys];
  let lastError: any = null;

  for (const apiKey of keyList) {
    for (const model of GEMINI_MODELS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
          throw new Error(blockReason ? "Yêu cầu bị chặn: " + blockReason : "Gemini không trả về nội dung.");
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
        lastError = err.name === "AbortError" ? new Error("Gemini phản hồi quá thời gian 30 giây.") : err;
        const keyUnavailable = err.status === 403 || err.status === 429 || /api key|quota|permission/i.test(err.message || '');
        if (keyUnavailable) break;
      } finally {
        clearTimeout(timeoutId);
      }
    }
  }
  throw lastError || new Error("Tất cả API keys và mô hình Gemini không khả dụng.");
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
  } catch (e) {
    console.log("Audio disabled");
  }
}
