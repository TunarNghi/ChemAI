(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callGeminiAPI",
    ()=>callGeminiAPI,
    "generateLessonPlanWithDify",
    ()=>generateLessonPlanWithDify,
    "generateParamHash",
    ()=>generateParamHash,
    "playBubbleSoundEffect",
    ()=>playBubbleSoundEffect,
    "sendDifyMessage",
    ()=>sendDifyMessage,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const SUPABASE_URL = ("TURBOPACK compile-time value", "https://cohutjbyyubjntqhjoao.supabase.co") || "https://cohutjbyyubjntqhjoao.supabase.co";
const SUPABASE_ANON_KEY = ("TURBOPACK compile-time value", "sb_publishable_nGOAjDM4qBzmGHEz0RvkKw_CanWAI8C") || "sb_publishable_nGOAjDM4qBzmGHEz0RvkKw_CanWAI8C";
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(SUPABASE_URL, SUPABASE_ANON_KEY);
const DIFY_API_KEY = ("TURBOPACK compile-time value", "") || "";
const DIFY_API_URL = ("TURBOPACK compile-time value", "https://api.dify.ai/v1") || "https://api.dify.ai/v1";
async function generateLessonPlanWithDify({ topic, grade, duration, prompt }) {
    const finalPrompt = prompt || `Soạn Kế Hoạch Bài Dạy (Giáo Án Hóa Học ${grade}) chuẩn theo Công văn 5512 BGD&ĐT cho bài học: "${topic}".
Thời lượng: ${duration} phút.
Bao gồm đầy đủ 4 hoạt động: 
I. MỤC TIÊU BÀI HỌC (Năng lực & Phẩm chất)
II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
III. TIẾN TRÌNH DẠY HỌC (Hoạt động 1: Mở đầu -> Hoạt động 2: Hình thành kiến thức -> Hoạt động 3: Luyện tập -> Hoạt động 4: Vận dụng & STEM).
Trả về nội dung trình bày sạch sẽ dưới dạng Markdown.`;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Fallback to Gemini API if Dify is not configured or fails
    return await callGeminiAPI(finalPrompt);
}
async function sendDifyMessage({ query, user, conversation_id, inputs = {} }) {
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            answer: `[Dify AI Response Simulated] Trợ lý ChemAI đã nhận câu hỏi: "${query}".`,
            conversation_id: conversation_id || "conv_" + Date.now()
        };
    }
    //TURBOPACK unreachable
    ;
}
const DEFAULT_GEMINI_KEYS_ENCODED = [
    "QVEuQWI4Uk42SWdTLUd4VUNVTlZWaGRTUUJzRE1RWHQwN2FWUDFsN0VvOWt0bUtHZGRiNWc=",
    "QVEuQWI4Uk42TDdQSUoyMHlPaDFmdjM1OGV5bVd3ajg5TzFDVFdYaklWUy1MRGdFZVpaeg==",
    "QVEuQWI4Uk42Sjh4N1RCTFV1N0s3TTlyRkZ4NXJ2VTBmNHJ0UkszeUhuSDQ4M25LQ0ZyalE=",
    "QVEuQWI4Uk42SzNLbW5ObVZFREdhbmVkMjhWaUxmQm9MMnNSSzlyNXQ5a0FYcGJOaEs3Ync="
];
function decodeApiKey(key) {
    try {
        return atob(key);
    } catch  {
        return key;
    }
}
const ENV_GEMINI_KEYS = ("TURBOPACK compile-time truthy", 1) ? ("TURBOPACK compile-time value", "QVEuQWI4Uk42SWdTLUd4VUNVTlZWaGRTUUJzRE1RWHQwN2FWUDFsN0VvOWt0bUtHZGRiNWc=,QVEuQWI4Uk42TDdQSUoyMHlPaDFmdjM1OGV5bVd3ajg5TzFDVFdYaklWUy1MRGdFZVpaeg==,QVEuQWI4Uk42Sjh4N1RCTFV1N0s3TTlyRkZ4NXJ2VTBmNHJ0UkszeUhuSDQ4M25LQ0ZyalE=,QVEuQWI4Uk42SzNLbW5ObVZFREdhbmVkMjhWaUxmQm9MMnNSSzlyNXQ5a0FYcGJOaEs3Ync=").split(',').map((k)=>k.trim()).filter(Boolean) : "TURBOPACK unreachable";
const GEMINI_API_KEYS = ENV_GEMINI_KEYS.map(decodeApiKey);
const GEMINI_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro"
];
async function callGeminiAPI(prompt, keys = GEMINI_API_KEYS) {
    const keyList = Array.isArray(keys) ? keys : [
        keys
    ];
    let lastError = null;
    for (const apiKey of keyList){
        for (const model of GEMINI_MODELS){
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 30000);
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
                const response = await fetch(url, {
                    method: "POST",
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt
                                    }
                                ]
                            }
                        ]
                    })
                });
                const data = await response.json().catch(()=>({}));
                if (!response.ok) {
                    const apiMessage = data.error && data.error.message ? data.error.message : "HTTP " + response.status;
                    const error = new Error(apiMessage);
                    error.status = response.status;
                    throw error;
                }
                if (!data.candidates || !data.candidates[0]) {
                    const blockReason = data.promptFeedback && data.promptFeedback.blockReason;
                    throw new Error(blockReason ? "Yêu cầu bị chặn: " + blockReason : "Gemini không trả về nội dung.");
                }
                const parts = data.candidates[0].content.parts;
                let resultText = "";
                for(let i = parts.length - 1; i >= 0; i--){
                    if (parts[i].text) {
                        resultText = parts[i].text;
                        break;
                    }
                }
                if (resultText) return resultText;
            } catch (err) {
                lastError = err.name === "AbortError" ? new Error("Gemini phản hồi quá thời gian 30 giây.") : err;
                const keyUnavailable = err.status === 403 || err.status === 429 || /api key|quota|permission/i.test(err.message || '');
                if (keyUnavailable) break;
            } finally{
                clearTimeout(timeoutId);
            }
        }
    }
    throw lastError || new Error("Tất cả API keys và mô hình Gemini không khả dụng.");
}
async function generateParamHash(inputA, volA, concA, inputB, volB, concB, temp, indicator) {
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
    return Array.from(new Uint8Array(digest)).map((b)=>b.toString(16).padStart(2, "0")).join("");
}
function playBubbleSoundEffect() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        for(let i = 0; i < 6; i++){
            setTimeout(()=>{
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/theme/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "theme",
    ()=>theme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/styles/createTheme.js [app-client] (ecmascript) <locals> <export default as createTheme>");
"use client";
;
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0284c7',
            dark: '#0369a1',
            light: '#38bdf8'
        },
        secondary: {
            main: '#a855f7'
        },
        background: {
            default: '#090d16',
            paper: '#0f172a'
        },
        text: {
            primary: '#f8fafc',
            secondary: '#94a3b8'
        }
    },
    typography: {
        fontFamily: [
            'Inter',
            'var(--font-sans)',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'sans-serif'
        ].join(','),
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.025em'
        },
        h2: {
            fontWeight: 800,
            letterSpacing: '-0.025em'
        },
        h3: {
            fontWeight: 800,
            letterSpacing: '-0.02em'
        },
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em'
        },
        h5: {
            fontWeight: 700,
            letterSpacing: '-0.015em'
        },
        h6: {
            fontWeight: 600,
            letterSpacing: '-0.01em'
        },
        button: {
            textTransform: 'none',
            fontWeight: 600
        }
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1m6838x._.js.map