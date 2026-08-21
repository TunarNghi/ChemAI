import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================================================
// DUAL-DATABASE FAILOVER CONFIGURATION (Primary & Backup from ChemAIBuddy)
// ============================================================================
const SUPABASE_PRIMARY_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_PRIMARY_URL || "https://cohutjbyyubjntqhjoao.supabase.co",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_PRIMARY_ANON_KEY || "sb_publishable_nGOAjDM4qBzmGHEz0RvkKw_CanWAI8C"
};

const SUPABASE_BACKUP_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_BACKUP_URL || "https://gxmwmevxfyzgnkcrlrjkdi.supabase.co",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_BACKUP_ANON_KEY || "sb_publishable_sA51KcWh0PJDDmgSQUbKw_0hvkAnAD5",
  secretKey: process.env.NEXT_PUBLIC_SUPABASE_BACKUP_SECRET_KEY || "sb_secret_aa5vafZknkVb_y5kuQYKHSHQ_qL4jOgUF",
  jwksUrl: process.env.NEXT_PUBLIC_SUPABASE_BACKUP_JWKS_URL || "https://gxmwmevxfyzgnkcrlrjkdi.supabase.co/auth/v1/.well-known/jwks.json"
};

// Create both client instances
export const supabasePrimary: SupabaseClient = createClient(
  SUPABASE_PRIMARY_CONFIG.url,
  SUPABASE_PRIMARY_CONFIG.anonKey
);

export const supabaseBackup: SupabaseClient = createClient(
  SUPABASE_BACKUP_CONFIG.url,
  SUPABASE_BACKUP_CONFIG.anonKey
);

// Determine active database (Default to Backup as in ChemAIBuddy script.js line 65)
const ACTIVE_DB_DEFAULT = process.env.NEXT_PUBLIC_ACTIVE_SUPABASE || "backup";

export function getActiveDatabaseMode(): 'backup' | 'primary' {
  if (typeof window !== "undefined") {
    const override = localStorage.getItem("chem_active_supabase_mode");
    if (override === "primary" || override === "backup") return override;
  }
  return ACTIVE_DB_DEFAULT === "primary" ? "primary" : "backup";
}

export function setActiveDatabaseMode(mode: 'backup' | 'primary'): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("chem_active_supabase_mode", mode);
  }
}

export function getActiveDatabaseInfo() {
  const mode = getActiveDatabaseMode();
  const config = mode === "backup" ? SUPABASE_BACKUP_CONFIG : SUPABASE_PRIMARY_CONFIG;
  return {
    mode,
    url: config.url,
    isBackup: mode === "backup",
    label: mode === "backup" ? "Supabase Dự Phòng (gxmwmevxfyzgnkcrlrjkdi)" : "Supabase Chính (cohutjbyyubjntqhjoao)"
  };
}

// Proxy client that routes to the active database with auto-failover
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const mode = getActiveDatabaseMode();
    const activeClient = mode === "backup" ? supabaseBackup : supabasePrimary;
    const val = (activeClient as any)[prop];
    if (typeof val === "function") {
      return val.bind(activeClient);
    }
    return val;
  }
});

// Helper for resilient DB operations with automatic dual-write / fallback
export async function resilientDbQuery<T>(
  queryFn: (client: SupabaseClient) => Promise<{ data: T | null; error: any }>
): Promise<{ data: T | null; error: any; source: 'primary' | 'backup' }> {
  const mode = getActiveDatabaseMode();
  const primaryClient = mode === "backup" ? supabaseBackup : supabasePrimary;
  const secondaryClient = mode === "backup" ? supabasePrimary : supabaseBackup;

  try {
    const res1 = await queryFn(primaryClient);
    if (!res1.error && res1.data) {
      return { data: res1.data, error: null, source: mode };
    }
  } catch (_e) {
    console.warn(`Query on ${mode} DB failed, attempting failover...`);
  }

  // Fallback to secondary
  try {
    const res2 = await queryFn(secondaryClient);
    return { data: res2.data, error: res2.error, source: mode === "backup" ? "primary" : "backup" };
  } catch (err: any) {
    return { data: null, error: err, source: mode };
  }
}

// ============================================================================
// DIFY & GEMINI AI CONFIGURATION (6 Keys Failover)
// ============================================================================
const DIFY_API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY || "app-Jzaac2ye6oDoWcCh5ovxrXYIAN";
const DIFY_API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL || "https://api.dify.ai/v1";

export interface DifyChatMessage {
  query: string;
  user: string;
  conversation_id?: string;
  inputs?: Record<string, any>;
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

  if (DIFY_API_KEY) {
    try {
      const res = await fetch(`${DIFY_API_URL}/chat-messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DIFY_API_KEY}`,
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
    } catch (err) {
      console.warn("Dify Lesson Plan API Error, falling back to Gemini:", err);
    }
  }

  // Fallback to Gemini API if Dify is not configured or fails
  return await callGeminiAPI(finalPrompt);
}

export async function sendDifyMessage({ query, user, conversation_id, inputs = {} }: DifyChatMessage) {
  if (DIFY_API_KEY) {
    try {
      const res = await fetch(`${DIFY_API_URL}/chat-messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DIFY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs, query, response_mode: "blocking", user, conversation_id }),
      });

      if (res.ok) {
        const data = await res.json();
        return {
          answer: data.answer || data.text,
          conversation_id: data.conversation_id,
        };
      }
    } catch (err: any) {
      console.warn("Dify API Error, using Gemini fallback:", err);
    }
  }

  // Gemini Fallback for Chat Tutor
  try {
    const prompt = `Bạn là Trợ lý Gia sư AI Hóa học THCS & THPT ChemAI theo chuẩn GDPT 2018. Hãy trả lời câu hỏi sau của học sinh/giáo viên thật chi tiết, có phân tích cơ chế, cân bằng phương trình ion thu gọn và ghi chú an toàn:\n\n${query}`;
    const geminiAnswer = await callGeminiAPI(prompt);
    return {
      answer: geminiAnswer,
      conversation_id: conversation_id || "gemini_conv_" + Date.now(),
    };
  } catch (err: any) {
    return {
      answer: `Lỗi kết nối AI: ${err.message}. Vui lòng thử lại sau giây lát.`,
      conversation_id: conversation_id || "conv_error",
    };
  }
}

// 6 Active Encoded Keys merged from ChemAIBuddy
const DEFAULT_GEMINI_KEYS_ENCODED = [
  "QVEuQWI4Uk42SWdTLUd4VUNVTlZWaGRTUUJzRE1RWHQwN2FWUDFsN0VvOWt0bUtHZGRiNWc=",
  "QVEuQWI4Uk42TDdQSUoyMHlPaDFmdjM1OGV5bVd3ajg5TzFDVFdYaklWUy1MRGdFZVpaeg==",
  "QVEuQWI4Uk42Sjh4N1RCTFV1N0s3TTlyRkZ4NXJ2VTBmNHJ0UkszeUhuSDQ4M25LQ0ZyalE=",
  "QVEuQWI4Uk42SzNLbW5ObVZFREdhbmVkMjhWaUxmQm9MMnNSSzlyNXQ5a0FYcGJOaEs3Ync=",
  "QVEuQWI4Uk42S25FMk10a0NyZkFLbk9nUjVfTWlsQlpuOVNuSWpaQmgxX3EwQlF5T25NbVE=",
  "QVEuQWI4Uk42TFA3QUtYdS1mbUpmOW5yR0x3VW43ampNdXo2UzV2NHltSkNVakk2b3VwSGc="
];

function decodeApiKey(key: string): string {
  try {
    return atob(key);
  } catch {
    return key;
  }
}

const ENV_GEMINI_KEYS = process.env.NEXT_PUBLIC_GEMINI_API_KEYS
  ? process.env.NEXT_PUBLIC_GEMINI_API_KEYS.split(',').map(k => k.trim()).filter(Boolean)
  : DEFAULT_GEMINI_KEYS_ENCODED;

const GEMINI_API_KEYS = ENV_GEMINI_KEYS.map(decodeApiKey);
const GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest"];

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
  } catch {
    // ignore
  }
}

// ----------------------------------------------------
// CHEMISTRY NOTATION & FORMULA FORMATTING ENGINE
// ----------------------------------------------------
export const CHEMICAL_ELEMENTS = new Set([
  "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca",
  "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
  "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
  "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
  "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm",
  "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
]);

export function normalizeLatexChemistryExpression(expression: string): string {
  return expression
    .replace(/\\ce\{((?:[^{}]|\{[^{}]*\})*)\}/g, "$1")
    .replace(/\\(?:mathrm|text)\{([^{}]*)\}/g, "$1")
    .replace(/\\left|\\right/g, "")
    .replace(/\\xrightarrow(?:\{[^{}]*\})?/g, "->")
    .replace(/\\(?:rightleftharpoons|leftrightharpoons)/g, "<=>")
    .replace(/\\(?:rightarrow|longrightarrow|to|arrow)/g, "->")
    .replace(/\\(?:quad|qquad|,|;|:|!)/g, " ")
    .replace(/\\(?:uparrow)/g, "↑")
    .replace(/\\(?:downarrow)/g, "↓")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\^?\\circ/g, "°")
    .replace(/\\cdot/g, "·")
    .replace(/\\equiv/g, "≡")
    .replace(/\\pm/g, "±")
    .replace(/\\bond\{([^{}]+)\}/g, "$1")
    .replace(/_\{([^{}]+)\}/g, (_, index) => /^\d+$/.test(index) ? index : "_" + index)
    .replace(/_([0-9])/g, "$1")
    .replace(/\^\{([^{}]+)\}/g, "^$1")
    .replace(/\^([0-9]*[+-])/g, "^$1")
    .replace(/[{}]/g, "")
    .trim();
}

export function normalizeChemistryNotation(text: string): string {
  if (!text) return "";
  const normalized = String(text)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, expression) => normalizeLatexChemistryExpression(expression))
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, expression) => normalizeLatexChemistryExpression(expression))
    .replace(/\$([^$\n]+)\$/g, (_, expression) => normalizeLatexChemistryExpression(expression));
  return normalized
    .replace(/\\ce\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, expression) => normalizeLatexChemistryExpression(expression))
    .replace(/\\(?:mathrm|text)\{([^{}]*)\}/g, "$1")
    .replace(/_\{([0-9]+)\}/g, "$1")
    .replace(/_([0-9]+)/g, "$1")
    .replace(/\^\{([0-9]*[+-])\}/g, "^$1")
    .replace(/\\(?:rightleftharpoons|leftrightharpoons)/g, "<=>")
    .replace(/\\(?:rightarrow|longrightarrow|to|arrow)/g, "->")
    .replace(/\\(?:quad|qquad|,|;|:|!)/g, " ")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\(?:uparrow)/g, "↑")
    .replace(/\\(?:downarrow)/g, "↓")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\^?\\circ/g, "°")
    .replace(/\\cdot/g, "·")
    .replace(/\\equiv/g, "≡")
    .replace(/\\pm/g, "±")
    .replace(/\\bond\{([^{}]+)\}/g, "$1");
}

export function formatChemHtml(text: string): string {
  if (!text) return "";
  const normalized = normalizeChemistryNotation(text);
  return normalized
    .replace(/\^([0-9]*[+-])/g, "<sup>$1</sup>")
    .replace(/_([0-9]+)/g, "<sub>$1</sub>")
    .replace(/<=>/g, " ⇌ ")
    .replace(/->/g, " → ");
}

// ----------------------------------------------------
// GAMIFICATION, AUTH & STUDENT PROFILE STATE ENGINE
// ----------------------------------------------------
export interface StudentProfile {
  id: string;
  username: string;
  name: string;
  className: string;
  school: string;
  exp: number;
  level: number;
  streak: number;
  lastLoginOn: string;
  badges: string[];
  kahootWins: number;
  weakTopics?: string[];
  assignedTasks?: Array<{ id: string; title: string; deadline: string; completed: boolean }>;
}

const STORAGE_KEYS = {
  profile: "chem_student_session_v3",
  accounts: "chem_student_accounts_v3"
};

export function getLocalStudentProfile(): StudentProfile {
  if (typeof window === "undefined") {
    return createDefaultStudentProfile("Học Sinh");
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.profile);
    if (raw) {
      const parsed = JSON.parse(raw);
      return updateStudentLoginStreak(parsed);
    }
  } catch {
    // fallback
  }
  const defaultProfile = createDefaultStudentProfile("Học Sinh Khám Phá");
  saveStudentProfile(defaultProfile);
  return defaultProfile;
}

export function createDefaultStudentProfile(name: string): StudentProfile {
  return {
    id: "stu_" + Math.random().toString(36).substring(2, 9),
    username: name.toLowerCase().replace(/\s+/g, "_"),
    name: name,
    className: "10A1",
    school: "THPT Chuyên Thoại Ngọc Hầu - An Giang",
    exp: 150,
    level: 1,
    streak: 1,
    lastLoginOn: new Date().toISOString().slice(0, 10),
    badges: ["Nhà Khám Phá", "Tân Binh Hóa Học"],
    kahootWins: 0,
    weakTopics: ["Phản ứng Oxi hóa - Khử phức tạp", "Cân bằng ion thu gọn"],
    assignedTasks: [
      { id: "task_1", title: "Thực hành ảo 3 phản ứng Lớp 10 & 11", deadline: "Chủ nhật tuần này", completed: false },
      { id: "task_2", title: "Luyện 10 câu trắc nghiệm Phổ IR", deadline: "Thứ 6", completed: false }
    ]
  };
}

export function calculateLevel(exp: number): number {
  return Math.floor(Math.sqrt(exp / 100)) + 1;
}

export function addExpToStudent(amount: number): StudentProfile {
  const profile = getLocalStudentProfile();
  profile.exp = (profile.exp || 0) + amount;
  profile.level = calculateLevel(profile.exp);

  if (profile.exp >= 500 && !profile.badges.includes("Phù Thủy Ống Nghiệm")) {
    profile.badges.push("Phù Thủy Ống Nghiệm");
  }
  if (profile.exp >= 1000 && !profile.badges.includes("Bậc Thầy GDPT 2018")) {
    profile.badges.push("Bậc Thầy GDPT 2018");
  }

  saveStudentProfile(profile);
  syncStudentToDatabase(profile).catch(() => {});
  return profile;
}

export function updateStudentLoginStreak(profile: StudentProfile): StudentProfile {
  const today = new Date().toISOString().slice(0, 10);
  if (profile.lastLoginOn === today) return profile;

  const previous = profile.lastLoginOn ? new Date(profile.lastLoginOn + "T00:00:00Z") : null;
  const diff = previous ? Math.round((Date.now() - previous.getTime()) / 86400000) : 99;

  profile.streak = diff === 1 ? (profile.streak || 0) + 1 : 1;
  profile.lastLoginOn = today;
  if (profile.streak >= 3 && !profile.badges.includes("Chiến Binh Chăm Chỉ")) {
    profile.badges.push("Chiến Binh Chăm Chỉ");
  }
  return profile;
}

export function saveStudentProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
    const rawAccs = localStorage.getItem(STORAGE_KEYS.accounts);
    let accs: StudentProfile[] = rawAccs ? JSON.parse(rawAccs) : [];
    const idx = accs.findIndex(a => a.id === profile.id);
    if (idx >= 0) accs[idx] = profile;
    else accs.push(profile);
    localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accs));
  } catch {
    // ignore
  }
}

export async function syncStudentToDatabase(profile: StudentProfile): Promise<void> {
  const payload = {
    id: profile.id,
    username: profile.username,
    name: profile.name,
    class_name: profile.className,
    school_name: profile.school,
    kahoot_exp: profile.exp,
    kahoot_streak: profile.streak,
    login_streak: profile.streak,
    last_login_on: profile.lastLoginOn,
    updated_at: new Date().toISOString()
  };

  // Sync to both primary and backup Supabase
  supabaseBackup.from("student_profiles").upsert(payload, { onConflict: "id" }).then();
  supabasePrimary.from("student_profiles").upsert(payload, { onConflict: "id" }).then();
}
