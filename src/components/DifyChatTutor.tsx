"use client";

import { callGeminiAPI, sendDifyMessage, supabase } from "@/lib/api";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Bot, Database, Send, Zap, Trash2, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { formatMarkdownToHTML, cleanChemicalLatex } from "@/components/AuditTab";
import { isDemoAccount, getStoredCurrentUser } from "@/components/UserAuthModal";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  source?: "database" | "dify" | "gemini";
  thinkingSeconds?: number;
}

const QUICK_PROMPTS = [
  "Cấu hình electron nguyên tử chlorine (Cl, Z=17)",
  "Quy tắc Octet & Lai hóa sp³ của methane (CH₄)",
  "Cân bằng PTHH iron (Fe) + nitric acid (HNO₃)",
  "Phân biệt liên kết Ion & Cộng hóa trị",
];

// Curated High-Speed ChemAI Chemistry Database (GDPT 2018 Standard)
const CHEMISTRY_KNOWLEDGE_DB: Array<{
  keywords: string[];
  response: string;
}> = [
  {
    keywords: ["chlorine", "cl", "z=17", "z = 17", "cau hinh electron cl", "cấu hình electron nguyên tử cl"],
    response: `### CẤU HÌNH ELECTRON VÀ TÍNH CHẤT CỦA CHLORINE (Cl, Z = 17)

**I. Cấu hình electron nguyên tử:**
- Số hiệu nguyên tử: $Z = 17$ (nguyên tử có 17 electron).
- Cấu hình electron đầy đủ: **1s² 2s² 2p⁶ 3s² 3p⁵**
- Cấu hình electron viết gọn theo khí hiếm: **[Ne] 3s² 3p⁵**
- Số electron lớp ngoài cùng: Lớp thứ 3 ($n=3$) có **7 electron** ($3s^2 3p^5$) $\\rightarrow$ Là phi kim điển hình thuộc nhóm Halogen (Nhóm VIIA).

**II. Vị trí trong Bảng tuần hoàn:**
- Ô số: **17**
- Chu kì: **3** (có 3 lớp electron)
- Nhóm: **VIIA** (nguyên tố p, có 7 electron hóa trị)

**III. Xu hướng tạo liên kết (Quy tắc Octet):**
- Nguyên tử chlorine có xu hướng **nhận thêm 1 electron** để đạt cấu hình electron bền vững của khí hiếm argon (Ar):
  $$\\text{Cl} + 1e \\rightarrow \\text{Cl}^- \\quad (\\text{[Ne] } 3s^2 3p^6)$$
- Hoặc dùng chung 1 cặp electron với phi kim khác để tạo liên kết cộng hóa trị (ví dụ phân tử $\\text{Cl}_2$, $\\text{HCl}$).`
  },
  {
    keywords: ["octet", "lai hoa", "sp3", "methane", "ch4", "lai hóa", "quy tắc octet"],
    response: `### QUY TẮC OCTET & TRẠNG THÁI LAI HÓA sp³ CỦA METHANE (CH₄)

**I. Quy tắc Octet đối với phân tử Methane (CH₄):**
- Nguyên tử carbon (C, $Z=6$) có cấu hình electron: $1s^2 2s^2 2p^2$ (4 electron lớp ngoài cùng).
- Nguyên tử hydrogen (H, $Z=1$) có cấu hình electron: $1s^1$ (1 electron).
- Để đạt octet bền vững (8 electron ở lớp ngoài cùng của C) và cấu hình doublet bền vững (2 electron của H):
  + Nguyên tử C góp chung 4 electron với 4 nguyên tử H, tạo thành **4 liên kết cộng hóa trị đơn $\\sigma$ (C-H)**.
  + Cả C và H đều đạt trạng thái bền vững.

**II. Trạng thái Lai hóa sp³ của Carbon:**
- Một orbital $2s$ trộn lẫn với ba orbital $2p$ của nguyên tử carbon tạo thành **4 orbital lai hóa $sp^3$** giống hệt nhau về hình dạng và năng lượng.
- Các orbital lai hóa $sp^3$ hướng về 4 đỉnh của một **hình tứ diện đều** (tetrahedron) với góc liên kết $\\widehat{\\text{H-C-H}} = 109.5^\\circ$.
- Dạng hình học phân tử: **Hình tứ diện đều (Tetrahedral)**, phân tử không phân cực do tính đối xứng cao.`
  },
  {
    keywords: ["fe + hno3", "iron + nitric acid", "fe + hno3 loãng", "cân bằng pthh iron", "sắt + hno3"],
    response: `### PHẢN ỨNG CỦA IRON (Fe) VỚI NITRIC ACID (HNO₃ LOÃNG)

**I. Phương trình phản ứng phân tử:**
$$\\overset{0}{\\text{Fe}} \\text{ (s)} + 4\\text{H}\\overset{+5}{\\text{N}}\\text{O}_3 \\text{ (loãng)} \\xrightarrow{t^\\circ} \\overset{+3}{\\text{Fe}}(\\text{NO}_3)_3 \\text{ (aq)} + \\overset{+2}{\\text{N}}\\text{O} \\uparrow \\text{ (g)} + 2\\text{H}_2\\text{O (l)}$$

**II. Xác định vai trò các chất & Số oxi hóa:**
- $\\text{Fe}$ là **chất khử** (số oxi hóa tăng từ $0$ lên $+3$).
- $\\text{HNO}_3$ là **chất oxi hóa** (số oxi hóa của nitrogen giảm từ $+5$ xuống $+2$ trong $\\text{NO}$) và đóng vai trò môi trường tạo muối.

**III. Quá trình thăng bằng electron:**
- Quá trình oxi hóa: $\\text{Fe} \\rightarrow \\text{Fe}^{3+} + 3e \\quad (\\times 1)$
- Quá trình khử: $\\text{N}^{+5} + 3e \\rightarrow \\text{N}^{+2} \\quad (\\times 1)$

**IV. Phương trình ion đầy đủ & Phương trình ion thu gọn:**
- **Phương trình ion đầy đủ:**
  $$\\text{Fe (s)} + 4\\text{H}^+\\text{ (aq)} + 4\\text{NO}_3^-\\text{ (aq)} \\rightarrow \\text{Fe}^{3+}\\text{ (aq)} + 3\\text{NO}_3^-\\text{ (aq)} + \\text{NO} \\uparrow\\text{ (g)} + 2\\text{H}_2\\text{O (l)}$$
- **Phương trình ion thu gọn (Net Ionic Equation):**
  $$\\text{Fe (s)} + 4\\text{H}^+\\text{ (aq)} + \\text{NO}_3^-\\text{ (aq)} \\rightarrow \\text{Fe}^{3+}\\text{ (aq)} + \\text{NO} \\uparrow\\text{ (g)} + 2\\text{H}_2\\text{O (l)}$$`
  },
  {
    keywords: ["phan biet", "lien ket ion", "cong hoa tri", "cộng hóa trị", "so sánh liên kết"],
    response: `### PHÂN BIỆT LIÊN KẾT ION VÀ LIÊN KẾT CỘNG HÓA TRỊ

| Tiêu chí so sánh | Liên kết Ion | Liên kết Cộng hóa trị |
| :--- | :--- | :--- |
| **Bản chất** | Lực hút tĩnh điện giữa các ion mang điện tích trái dấu (cation & anion). | Cặp electron dùng chung giữa các nguyên tử. |
| **Đối tượng hình thành** | Kim loại điển hình (nhóm IA, IIA) + Phi kim điển hình (nhóm VIA, VIIA). | Giữa các phi kim với nhau (phi kim - phi kim). |
| **Hiệu độ âm điện ($\\Delta \\chi$)** | $\\Delta \\chi \\ge 1.7$ | - Không cực: $0 \\le \\Delta \\chi < 0.4$<br/>- Có cực: $0.4 \\le \\Delta \\chi < 1.7$ |
| **Ví dụ điển hình** | $\\text{NaCl}, \\text{MgCl}_2, \\text{CaO}, \\text{KF}$ | $\\text{Cl}_2, \\text{O}_2, \\text{H}_2\\text{O}, \\text{HCl}, \\text{CH}_4$ |
| **Trạng thái & Nhiệt độ nóng chảy** | Thường là chất rắn tinh thể, $t^\\circ$ nóng chảy & $t^\\circ$ sôi rất cao, dẫn điện khi nóng chảy hoặc hòa tan trong nước. | Chất khí, lỏng hoặc rắn có liên kết phân tử; $t^\\circ$ nóng chảy & $t^\\circ$ sôi thấp hơn; không dẫn điện ở trạng thái tinh khiết. |`
  },
  {
    keywords: ["na + h2o", "sodium + nuoc", "sodium + nước", "natri + nuoc", "natri + nước"],
    response: `### PHẢN ỨNG CỦA SODIUM (Na) VỚI NƯỚC (H₂O)

**I. Phương trình phản ứng phân tử:**
$$2\\text{Na (s)} + 2\\text{H}_2\\text{O (l)} \\rightarrow 2\\text{NaOH (aq)} + \\text{H}_2 \\uparrow \\text{ (g)}$$

**II. Bản chất phản ứng & Số oxi hóa:**
- $\\text{Na}$ là **chất khử** (số oxi hóa tăng từ $0$ lên $+1$).
- $\\text{H}_2\\text{O}$ là **chất oxi hóa** (số oxi hóa của hydrogen giảm từ $+1$ xuống $0$ trong $\\text{H}_2$).

**III. Phương trình ion thu gọn:**
$$2\\text{Na (s)} + 2\\text{H}_2\\text{O (l)} \\rightarrow 2\\text{Na}^+\\text{ (aq)} + 2\\text{OH}^-\\text{ (aq)} + \\text{H}_2 \\uparrow \\text{ (g)}$$

**IV. Hiện tượng:**
- Mẩu sodium nóng chảy thành viên tròn chạy lăn tăn trên mặt nước, sủi bọt khí không màu ($\\text{H}_2$), tỏa nhiều nhiệt.
- Dung dịch tạo thành làm phenolphthalein đổi sang màu hồng rực rỡ.`
  },
  {
    keywords: ["al + hcl", "aluminium + hydrochloric acid", "nhom + hcl", "nhôm + hcl"],
    response: `### PHẢN ỨNG CỦA ALUMINIUM (Al) VỚI HYDROCHLORIC ACID (HCl)

**I. Phương trình phản ứng phân tử:**
$$2\\text{Al (s)} + 6\\text{HCl (aq)} \\rightarrow 2\\text{AlCl}_3\\text{ (aq)} + 3\\text{H}_2 \\uparrow \\text{ (g)}$$

**II. Xác định vai trò & Số oxi hóa:**
- $\\text{Al}$ là **chất khử** ($\\overset{0}{\\text{Al}} \\rightarrow \\overset{+3}{\\text{Al}} + 3e$).
- $\\text{HCl}$ là **chất oxi hóa** ($2\\overset{+1}{\\text{H}} + 2e \\rightarrow \\overset{0}{\\text{H}}_2$).

**III. Phương trình ion thu gọn:**
$$2\\text{Al (s)} + 6\\text{H}^+\\text{ (aq)} \\rightarrow 2\\text{Al}^{3+}\\text{ (aq)} + 3\\text{H}_2 \\uparrow \\text{ (g)}$$`
  },
  {
    keywords: ["bacl2 + h2so4", "barium chloride + sulfuric acid"],
    response: `### PHẢN ỨNG TRAO ĐỔI ION: BaCl₂ + H₂SO₄

**I. Phương trình phản ứng phân tử:**
$$\\text{BaCl}_2\\text{ (aq)} + \\text{H}_2\\text{SO}_4\\text{ (aq)} \\rightarrow \\text{BaSO}_4 \\downarrow \\text{ (s)} + 2\\text{HCl (aq)}$$

**II. Phương trình ion thu gọn:**
$$\\text{Ba}^{2+}\\text{ (aq)} + \\text{SO}_4^{2-}\\text{ (aq)} \\rightarrow \\text{BaSO}_4 \\downarrow \\text{ (trắng)}$$

**III. Hiện tượng & Ứng dụng:**
- Xuất hiện kết tủa trắng $\\text{BaSO}_4$ không tan trong acid mạnh.
- Dùng để nhận biết ion sulfate ($\\text{SO}_4^{2-}$).`
  },
  {
    keywords: ["caco3 + hcl", "calcium carbonate + hydrochloric acid", "da voi + hcl"],
    response: `### PHẢN ỨNG CỦA CALCIUM CARBONATE (CaCO₃) VỚI HCl

**I. Phương trình phản ứng phân tử:**
$$\\text{CaCO}_3\\text{ (s)} + 2\\text{HCl (aq)} \\rightarrow \\text{CaCl}_2\\text{ (aq)} + \\text{CO}_2 \\uparrow \\text{ (g)} + \\text{H}_2\\text{O (l)}$$

**II. Phương trình ion thu gọn:**
$$\\text{CaCO}_3\\text{ (s)} + 2\\text{H}^+\\text{ (aq)} \\rightarrow \\text{Ca}^{2+}\\text{ (aq)} + \\text{CO}_2 \\uparrow \\text{ (g)} + \\text{H}_2\\text{O (l)}$$`
  },
  {
    keywords: ["cu + hno3", "copper + nitric acid", "dong + hno3", "đồng + hno3"],
    response: `### PHẢN ỨNG CỦA COPPER (Cu) VỚI NITRIC ACID (HNO₃ LOÃNG)

**I. Phương trình phản ứng phân tử:**
$$3\\text{Cu (s)} + 8\\text{HNO}_3\\text{ (loãng)} \\rightarrow 3\\text{Cu(NO}_3)_2\\text{ (aq)} + 2\\text{NO} \\uparrow \\text{ (g)} + 4\\text{H}_2\\text{O (l)}$$

**II. Phương trình ion thu gọn:**
$$3\\text{Cu (s)} + 8\\text{H}^+\\text{ (aq)} + 2\\text{NO}_3^-\\text{ (aq)} \\rightarrow 3\\text{Cu}^{2+}\\text{ (aq)} + 2\\text{NO} \\uparrow \\text{ (g)} + 4\\text{H}_2\\text{O (l)}$$

**III. Hiện tượng:**
- Kim loại đồng tan dần, dung dịch chuyển sang màu xanh lam của ion $\\text{Cu}^{2+}$.
- Sinh ra khí không màu $\\text{NO}$, khi tiếp xúc với không khí chuyển thành khí màu nâu đỏ $\\text{NO}_2$.`
  }
];

function checkLocalChemistryDB(query: string): string | null {
  const norm = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!norm || norm.length < 4) return null;

  // Check in-memory database with strict full matching only
  for (const entry of CHEMISTRY_KNOWLEDGE_DB) {
    const matched = entry.keywords.some((k) => {
      const normK = k
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (!normK || normK.length < 4) return false;
      return norm === normK;
    });
    if (matched) return entry.response;
  }

  return null;
}

function normalizeQuestion(query: string): string {
  return query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function computeQuestionHash(str: string): Promise<string> {
  try {
    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
      const encoded = new TextEncoder().encode(str);
      const digest = await window.crypto.subtle.digest("SHA-256", encoded);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .slice(0, 24)
        .join("");
    }
  } catch {}
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return "h_" + Math.abs(hash).toString(16);
}

async function findExistingAnswerInDatabase(query: string): Promise<string | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  // 1. Kiểm tra ngân hàng tri thức Hóa học offline tích hợp sẵn
  const localHit = checkLocalChemistryDB(trimmed);
  if (localHit) return localHit;

  const normQuery = normalizeQuestion(trimmed);

  // 2. Kiểm tra bộ nhớ tạm lịch sử trò chuyện (LocalStorage)
  try {
    const localKey = "chemai_chat_history";
    const hist = JSON.parse(localStorage.getItem(localKey) || "[]");
    if (Array.isArray(hist)) {
      for (let i = hist.length - 1; i >= 0; i--) {
        const item = hist[i];
        if (!item || !item.ai_response || typeof item.ai_response !== "string") continue;
        const uMsg = (item.user_message || "").trim();
        if (uMsg.toLowerCase() === trimmed.toLowerCase()) {
          return item.ai_response;
        }
        if (normQuery && normQuery.length >= 4 && normalizeQuestion(uMsg) === normQuery) {
          return item.ai_response;
        }
      }
    }
  } catch {}

  // 3. Truy vấn trực tiếp Cloud Database Supabase (chat_logs)
  try {
    // 3.1 Tìm chính xác câu hỏi trong chat_logs (không phân biệt hoa thường)
    const { data: logs, error } = await supabase
      .from("chat_logs")
      .select("user_message, ai_response")
      .not("ai_response", "is", null)
      .ilike("user_message", trimmed)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && logs && logs.length > 0 && logs[0].ai_response && typeof logs[0].ai_response === "string" && logs[0].ai_response.trim()) {
      return logs[0].ai_response;
    }

    // 3.2 Quét các câu hỏi gần đây theo chuỗi chuẩn hóa (loại bỏ dấu câu/khoảng trắng thừa)
    if (normQuery.length >= 6) {
      const { data: recentLogs } = await supabase
        .from("chat_logs")
        .select("user_message, ai_response")
        .not("ai_response", "is", null)
        .order("created_at", { ascending: false })
        .limit(50);

      if (recentLogs && recentLogs.length > 0) {
        for (const log of recentLogs) {
          if (log.ai_response && normalizeQuestion(log.user_message || "") === normQuery) {
            return log.ai_response;
          }
        }
      }
    }

    // 3.3 Kiểm tra bảng experiments cache
    const hash = await computeQuestionHash(normQuery);
    const { data: expData } = await supabase
      .from("experiments")
      .select("result_json")
      .eq("cache_key", `qa_${hash}`)
      .maybeSingle();

    if (expData?.result_json?.answer && typeof expData.result_json.answer === "string") {
      return expData.result_json.answer;
    }
  } catch (err) {
    console.warn("Supabase QA lookup notice:", err);
  }

  return null;
}

export default function DifyChatTutor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text:
        "Xin chào! Tôi là **Gia Sư Hóa Học ChemAI** (Trợ lý học tập môn Hóa học THPT chuẩn GDPT 2018). Bạn hãy nhập bất kỳ câu hỏi lý thuyết, phương trình phản ứng hoặc bài tập cần giải đáp nhé!",
      source: "gemini"
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [sessionId, setSessionId] = useState<string>(() => "session_" + Math.random().toString(36).substring(2, 9));
  const [difyConversationId, setDifyConversationId] = useState<string | undefined>(undefined);

  // Real-time Thinking Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (loading) {
      setThinkingSeconds(1);
      timer = setInterval(() => {
        setThinkingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setThinkingSeconds(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [loading]);

  const handleClearChat = () => {
    if (messages.length <= 1) return;
    if (window.confirm("Bạn có muốn xóa cuộc trò chuyện này và làm mới không?")) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "bot",
          text:
            "Xin chào! Tôi là **Gia Sư Hóa Học ChemAI** (Trợ lý học tập môn Hóa học THPT chuẩn GDPT 2018). Bạn hãy nhập bất kỳ câu hỏi lý thuyết, phương trình phản ứng hoặc bài tập cần giải đáp nhé!",
          source: "gemini",
        },
      ]);
      setDifyConversationId(undefined);
      setSessionId("session_" + Math.random().toString(36).substring(2, 9));
      // clear local caches
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith("chemai_cache_"))
          .forEach((k) => localStorage.removeItem(k));
      } catch {}
    }
  };

  const handleExportChatLog = () => {
    if (messages.length <= 1) {
      alert("Chưa có đoạn hội thoại nào để xuất log.");
      return;
    }
    const dateStr = new Date().toISOString().slice(0, 10);
    let md = `# NHẬT KÝ HỌC TẬP CÙNG GIA SƯ HÓA HỌC CHEMAI\n`;
    md += `*Thời gian xuất:* ${new Date().toLocaleString("vi-VN")}\n`;
    md += `*Mã phiên (Session ID):* \`${sessionId}\`\n\n`;
    md += `---\n\n`;

    messages.slice(1).forEach((m, idx) => {
      if (m.sender === "user") {
        md += `### 👤 Câu hỏi [${idx + 1}]:\n${m.text}\n\n`;
      } else {
        md += `### 🤖 Lời giải từ Gia sư ChemAI:\n${m.text}\n\n---\n\n`;
      }
    });

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nhat_Ky_Gia_Su_ChemAI_${dateStr}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
    };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    // Step 1: Kiểm tra Cơ sở dữ liệu (Supabase Cloud DB, LocalStorage, Offline Bank)
    // Nếu câu hỏi đã tồn tại trong CSDL trước đó, xuất lại ngay lập tức và KHÔNG gọi AI
    const existingAnswer = await findExistingAnswerInDatabase(textToSend);
    if (existingAnswer) {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: existingAnswer,
        source: "database",
        thinkingSeconds: 0,
      };
      setMessages((prev) => [...prev, botMsg]);

      // Đồng bộ vào phiên làm việc hiện tại của Supabase chat_logs (chỉ dành cho tài khoản thực tế)
      const currentAuthUser = getStoredCurrentUser();
      if (!isDemoAccount(currentAuthUser)) {
        supabase
          .from("chat_logs")
          .insert({
            session_id: sessionId,
            user_message: textToSend,
            ai_response: existingAnswer,
          })
          .then();
      }

      try {
        const localKey = "chemai_chat_history";
        const hist = JSON.parse(localStorage.getItem(localKey) || "[]");
        hist.push({
          timestamp: new Date().toISOString(),
          session_id: sessionId,
          user_message: textToSend,
          ai_response: existingAnswer,
        });
        if (hist.length > 80) hist.shift();
        localStorage.setItem(localKey, JSON.stringify(hist));
      } catch {}
      return; // ĐÃ XUẤT TỪ CSDL, KHÔNG GỌI AI
    }

    // Step 2: Chưa có trong CSDL -> Bắt đầu tính thời gian suy nghĩ và gọi AI Engine
    const startTime = Date.now();
    setLoading(true);

    // Step 2: Call Primary AI (Gemini AI Engine) with auto-failover to Standby (Dify AI)
    try {
      let aiResponseText = "";
      let sourceTag: "dify" | "gemini" = "gemini";

      try {
        const recentHistory = updatedMessages
          .slice(-6)
          .map((m) => `${m.sender === "user" ? "Học sinh" : "Gia sư ChemAI"}: ${m.text}`)
          .join("\n");

        const prompt = `Bạn là Gia sư Hóa học ChemAI (ChemAI Tutor) - Trợ lý trí tuệ nhân tạo chuyên sâu về Hóa học THPT chuẩn chương trình GDPT 2018 tại Việt Nam.

QUY TẮC BẢO MẬT DANH TÍNH (TUYỆT ĐỐI BẮT BUỘC):
- Bạn luôn tự xưng là 'Gia sư ChemAI' hoặc 'Thầy/Cô Gia sư ChemAI' (hoặc 'mình' khi xưng hô thân mật với học sinh).
- TUYỆT ĐỐI KHÔNG BAO GIỜ tự nhận mình là Gemini, Google, OpenAI, ChatGPT, Dify hay bất kỳ hãng/mô hình bên thứ ba nào.
- Khi người dùng hỏi: 'Bạn là ai?', 'Bạn là mô hình gì?', 'Ai tạo ra bạn?', 'Bạn có phải là Gemini/ChatGPT không?':
  -> Hãy khẳng định dứt khoát và thân thiện: 'Mình là Gia sư Hóa học ChemAI – trợ lý trí tuệ nhân tạo chuyên biệt về môn Hóa học THPT, được phát triển và tối ưu riêng cho chương trình GDPT 2018 tại Việt Nam. Mình không phải là Gemini hay ChatGPT!'

QUY TẮC ĐÀM THOẠI NHƯ CHATBOT THÔNG THƯỜNG (THÂN THIỆN, SƯ PHẠM, TỰ NHIÊN):
- Khi học sinh chào hỏi, cảm ơn, tâm sự việc học hoặc trò chuyện giao tiếp thông thường (như 'Chào bạn', 'Hôm nay mệt quá', 'Học hóa khó quá'): Hãy lắng nghe, chia sẻ chân thành, động viên tinh thần và khéo léo kết nối với việc học một cách tự nhiên. Tuyệt đối không từ chối cứng nhắc!
- Giọng điệu luôn truyền cảm hứng, kiên nhẫn, gần gũi, khích lệ học sinh tự tin học tập.

QUY TẮC ĐỘ CHÍNH XÁC CHUYÊN MÔN HÓA HỌC (CHUẨN GDPT 2018):
1. Danh pháp IUPAC Tiếng Anh: Bắt buộc gọi tên nguyên tố và hợp chất theo chuẩn SGK mới (iron, copper, zinc, aluminium, chlorine, sulfur, nitrogen, nitric acid, sulfuric acid, sulfur dioxide, iron(II) nitrate, iron(III) nitrate...). Có thể chú thích thêm tên tiếng Việt quen thuộc trong ngoặc để học sinh dễ liên hệ.
2. Độ chính xác tuyệt đối của phương trình và hiện tượng:
   - Ghi điều kiện phản ứng CHÍNH XÁC theo bản chất hóa học:
     + CHỈ ghi điều kiện khi phản ứng THỰC SỰ CẦN THIẾT (ví dụ: este hóa cần H2SO4 đặc, đun hồi lưu; alkane thế halogen cần ánh sáng as; phản ứng nhiệt luyện/nhiệt phân cần t°; phản ứng oxi hóa hoàn toàn cần t°).
     + CÁC PHẢN ỨNG XẢY RA Ở NHIỆT ĐỘ THƯỜNG TUYỆT ĐỐI KHÔNG GHI t°:
       * Phản ứng cộng alkene/alkyne với HBr, HCl, dung dịch Br2 xảy ra êm dịu ở nhiệt độ thường (ví dụ: CH2=CH2 + HBr -> CH3CH2Br, TUYỆT ĐỐI KHÔNG thêm t° hay [t°]!).
       * Phản ứng trung hòa acid - base (HCl + NaOH -> NaCl + H2O): KHÔNG có t°.
       * Phản ứng trao đổi ion trong dung dịch tạo kết tủa/khí (BaCl2 + H2SO4 -> BaSO4↓ + 2 HCl): KHÔNG có t°.
   - Kiểm tra kỹ chất dư/thiếu:
     + Fe + HNO3 (loãng dư) -> Fe(NO3)3 + NO + H2O
     + Fe (dư) + HNO3 (loãng) -> Sản phẩm muối cuối cùng là Fe(NO3)2 (do Fe + 2Fe(NO3)3 -> 3Fe(NO3)2)
     + Al, Fe, Cr bị THỤ ĐỘNG HÓA trong HNO3 đặc nguội và H2SO4 đặc nguội (màng oxit bảo vệ ngăn phản ứng).
     + Phản ứng thuận nghịch este hóa: RCOOH + R'OH <=> RCOOR' + H2O (xúc tác H2SO4 đặc, đun hồi lưu).
3. Quy tắc trình bày công thức, phương trình và dấu ngoặc chuẩn mực:
   - Cách khoảng trắng giữa hệ số cân bằng và công thức hóa học: Ví dụ viết "18 HNO3", "2 H2SO4", "15 NO2", "7 H2O" (TUYỆT ĐỐI KHÔNG viết dính liền "18HNO3", "2H2SO4", "1FeS2").
   - Hệ số 1 luôn lược bỏ trong phương trình hoàn chỉnh (viết "FeS2", "Fe(NO3)3" thay vì "1FeS2", "1Fe(NO3)3").
   - Viết phương trình trực tiếp, trong sáng: Trạng thái chất viết ngay sau chất trong ngoặc đơn thông thường như (s), (l), (g), (aq). Ví dụ: "Fe (s) + H2SO4 (aq) -> FeSO4 (aq) + H2 (g) ↑". TUYỆT ĐỐI KHÔNG bọc cả phương trình trong \\ce{...} với các dấu ngoặc nhọn phức tạp gây lỗi cú pháp.
   - Khi có điều kiện trên mũi tên: Dùng ký hiệu LaTeX chuẩn "\\xrightarrow{t^\\circ}" hoặc "➔ (t°)", TUYỆT ĐỐI KHÔNG viết ngoặc vuông "[t°]" đứng lơ lửng sau mũi tên như "➔ [t°]".
   - QUY TẮC DẤU NGOẶC TRONG TÍNH TOÁN & SỐ OXI HÓA:
     + Khi tính số electron trao đổi hoặc biến thiên số oxi hóa, nếu có số âm trong ngoặc đơn (-1), (-2)... BẮT BUỘC dùng ngoặc vuông bên ngoài để phân biệt rõ ràng:
       Ví dụ: Viết "1 · (3 - 2) + 2 · [6 - (-1)] = 1 + 14 = 15e⁻" (TUYỆT ĐỐI KHÔNG viết lồng hai ngoặc đơn "(6 - (-1))").
     + Luôn kiểm tra cân bằng số lượng mở ngoặc và đóng ngoặc, TUYỆT ĐỐI KHÔNG để sót dấu ngoặc thừa như "15e⁻)." hay ")}".
   - Phản ứng thuận nghịch: dùng ký hiệu "\\rightleftharpoons" hoặc "⇌". TUYỆT ĐỐI không bao giờ để lọt từ tiếng Anh "leftharpoons" hay "leftrightharpoons" vào bài giảng.
   - Thể hiện trạng thái chất rõ ràng: (s) rắn, (l) lỏng, (g) khí, (aq) dung dịch. Dùng mũi tên khí bay (↑) và kết tủa (↓).
   - Trình bày bài tập tính toán từng bước rõ ràng, mạch lạc, có dòng trắng phân cách giữa các mục; không viết dồn cục một đoạn quá dài.
4. Mở rộng độ dài & Chi tiết sư phạm:
   - Bạn được cấp hạn mức trả lời dài và chi tiết; hãy thoải mái giảng giải đầy đủ, cặn kẽ và chuyên sâu, không cần cắt ngắn hay tóm tắt quá sơ sài.
   - Với bài tập: Trình bày chi tiết từ Hiện tượng -> Phương trình -> Đặt ẩn/Tính mol -> Áp dụng định luật bảo toàn -> Biện luận -> Đáp án & Bài học mở rộng.

Lịch sử hội thoại gần đây:
${recentHistory}

Học sinh vừa hỏi: "${textToSend}"
Hãy giải thích và phản hồi thật chính xác, đầy đủ chi tiết, sư phạm và gần gũi cho học sinh:`;

        aiResponseText = await callGeminiAPI(prompt, undefined, { maxOutputTokens: 8192 });
        sourceTag = "gemini";
      } catch (geminiErr: any) {
        console.warn("Primary AI encounter issue, auto-fallback to Dify AI Standby:", geminiErr);

        const wrappedDifyQuery = `[CHỈ THỊ HỆ THỐNG GIA SƯ CHEMAI: Bạn là Gia sư Hóa học ChemAI (ChemAI Tutor) chuyên sâu Hóa học THPT chuẩn GDPT 2018. TUYỆT ĐỐI KHÔNG tự nhận là Gemini, ChatGPT, OpenAI hay Google dưới mọi hình thức. Luôn xưng là "Gia sư ChemAI" hoặc "Thầy/Cô Gia sư ChemAI". Đảm bảo chính xác tuyệt đối kiến thức Hóa học THPT chuẩn GDPT 2018, danh pháp IUPAC tiếng Anh. CHỈ ghi điều kiện t° khi phản ứng thực sự cần thiết (alkene/alkyne + HBr/Br2, acid + base, trao đổi ion ở nhiệt độ thường, TUYỆT ĐỐI KHÔNG CÓ t°). Dùng ngoặc vuông [6 - (-1)] khi tính toán số oxi hóa/electron, không để sót dấu ngoặc thừa, và không bọc công thức trong \\ce{} gây lỗi cú pháp.]

Học sinh hỏi: ${textToSend}`;

        const difyResult = await sendDifyMessage({
          query: wrappedDifyQuery,
          user: "chemai_student",
          conversation_id: difyConversationId,
          inputs: {},
        });

        if (difyResult && difyResult.answer && difyResult.answer.trim()) {
          aiResponseText = difyResult.answer;
          if (difyResult.conversation_id) {
            setDifyConversationId(difyResult.conversation_id);
          }
          sourceTag = "dify";
        } else {
          throw new Error("Hệ thống trợ lý học tập không phản hồi nội dung.");
        }
      }

      const elapsedSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: aiResponseText,
        source: sourceTag,
        thinkingSeconds: elapsedSec,
      };
      setMessages((prev) => [...prev, botMsg]);

      // Lưu kết quả vào Supabase chat_logs DB nếu là tài khoản thực tế (tài khoản thử nghiệm chỉ lưu tạm thời)
      const currentAuthUser = getStoredCurrentUser();
      if (!isDemoAccount(currentAuthUser)) {
        supabase
          .from("chat_logs")
          .insert({
            session_id: sessionId,
            user_message: textToSend,
            ai_response: aiResponseText,
          })
          .then(({ error }) => {
            if (error) console.warn("Supabase log sync notice:", error.message);
          });

        // Lưu trữ chỉ mục vào Supabase experiments để tái sử dụng ngay lập tức
        computeQuestionHash(normalizeQuestion(textToSend)).then((h) => {
          supabase
            .from("experiments")
            .upsert({
              cache_key: `qa_${h}`,
              result_json: { query: textToSend, answer: aiResponseText },
            })
            .then();
        });
      }

      try {
        const localKey = "chemai_chat_history";
        const hist = JSON.parse(localStorage.getItem(localKey) || "[]");
        hist.push({
          timestamp: new Date().toISOString(),
          session_id: sessionId,
          user_message: textToSend,
          ai_response: aiResponseText,
        });
        if (hist.length > 80) hist.shift();
        localStorage.setItem(localKey, JSON.stringify(hist));
      } catch {}
    } catch (err: any) {
      console.error("Gia Sư AI Error:", err);
      // Check if there is an offline match in local knowledge base
      const offlineHit = checkLocalChemistryDB(textToSend);
      const fallbackText = offlineHit || `### ⚠️ THÔNG BÁO TẠM THỜI TỪ GIA SƯ CHEMAI

Không thể kết nối đến máy chủ vào lúc này (${err?.message || "Lỗi kết nối mạng"}).

💡 **Gợi ý tra cứu nhanh các chủ đề phổ biến:**
- **Kim loại tác dụng nước:** \`Na + H2O\`, \`K + H2O\`, \`Ba + H2O\`
- **Kim loại tác dụng acid:** \`Fe + HNO3\`, \`Al + HCl\`, \`Cu + HNO3\`
- **Phản ứng trao đổi ion:** \`BaCl2 + H2SO4\`, \`CaCO3 + HCl\`, \`AgNO3 + NaCl\`
- **Cấu tạo & Liên kết:** \`Cấu hình electron Cl (Z=17)\`, \`Lai hóa sp3 Methane\`, \`Phân biệt liên kết Ion và Cộng hóa trị\`

*Bạn có thể bấm vào các gợi ý phía trên hoặc thử gửi lại câu hỏi sau ít giây nhé!*`;

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: fallbackText,
          source: offlineHit ? "database" : "gemini"
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Bot color="#0284c7" size={22} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Gia Sư Hóa Học
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.8} flexWrap="wrap">
            {messages.length > 1 && (
              <>
                <Button
                  size="small"
                  color="info"
                  variant="outlined"
                  onClick={handleExportChatLog}
                  startIcon={<Download size={12} />}
                  sx={{
                    height: 22,
                    fontSize: "11px",
                    textTransform: "none",
                    px: 1,
                    minWidth: "auto",
                  }}
                >
                  Xuất log (.md)
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={handleClearChat}
                  startIcon={<Trash2 size={12} />}
                  sx={{
                    height: 22,
                    fontSize: "11px",
                    textTransform: "none",
                    px: 1,
                    minWidth: "auto",
                  }}
                >
                  Xóa chat
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* Quick Suggestion Chips on Mobile */}
        <Box
          sx={{
            display: 'flex',
            gap: 0.8,
            overflowX: 'auto',
            pb: 1,
            mb: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {QUICK_PROMPTS.map((p, idx) => (
            <Chip
              key={idx}
              label={p}
              size="small"
              onClick={() => handleSend(p)}
              clickable
              sx={{
                fontSize: '11px',
                bgcolor: 'rgba(2, 132, 199, 0.12)',
                color: '#38bdf8',
                borderColor: 'rgba(56, 189, 248, 0.25)',
                borderWidth: 1,
                borderStyle: 'solid',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.25)' }
              }}
            />
          ))}
        </Box>

        {/* Chat Messages List */}
        <Paper
          sx={{
            p: { xs: 1.2, sm: 2 },
            bgcolor: "#020617",
            border: "1px solid #1e293b",
            height: { xs: 'calc(100dvh - 350px)', sm: 420, md: 480 },
            minHeight: 300,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.2,
            mb: 1.5,
            borderRadius: 2,
          }}
          className="custom-scrollbar"
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              display="flex"
              justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
              alignItems="flex-start"
              gap={1}
            >
              {msg.sender === "bot" && (
                <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28, flexShrink: 0, mt: 0.3 }}>
                  <Bot size={16} />
                </Avatar>
              )}
              <Paper
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  maxWidth: { xs: "92%", sm: "80%" },
                  bgcolor: msg.sender === "user" ? "primary.dark" : "#0f172a",
                  color: "#f8fafc",
                  borderRadius: 2.5,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: { xs: "14px", sm: "15px" },
                  lineHeight: 1.75,
                  letterSpacing: "normal",
                  wordBreak: "break-word",
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  "& ruby": {
                    rubyPosition: "over",
                    fontStyle: "normal",
                    margin: "0 1px",
                  },
                  "& rt": {
                    fontSize: "0.7em",
                    fontWeight: 700,
                    color: "#38bdf8",
                    lineHeight: 1,
                    userSelect: "none",
                    fontStyle: "normal",
                  },
                  "& sub": {
                    fontSize: "0.78em",
                    lineHeight: 0,
                    position: "relative",
                    verticalAlign: "baseline",
                    bottom: "-0.2em",
                    color: "#cbd5e1",
                  },
                  "& sup": {
                    fontSize: "0.78em",
                    lineHeight: 0,
                    position: "relative",
                    verticalAlign: "baseline",
                    top: "-0.38em",
                    color: "#38bdf8",
                    fontWeight: 600,
                  },
                  "& strong": { color: "#fbbf24", fontWeight: 700 },
                  "& em": { color: "#94a3b8", fontStyle: "italic" },
                  "& hr": {
                    border: "none",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    margin: "14px 0",
                  },
                }}
              >
                {msg.sender === "bot" && (
                  <Box display="flex" alignItems="center" gap={0.8} mb={1}>
                    {msg.source === "database" ? (
                      <Chip
                        icon={<Database size={11} />}
                        label="Cơ sở dữ liệu (Có sẵn)"
                        size="small"
                        sx={{
                          height: 19,
                          fontSize: '10px',
                          fontWeight: 700,
                          bgcolor: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                        }}
                      />
                    ) : (
                      <Chip
                        icon={<Zap size={11} />}
                        label={
                          msg.thinkingSeconds
                            ? `Đã suy nghĩ trong ${msg.thinkingSeconds}s`
                            : "Gia sư ChemAI"
                        }
                        size="small"
                        sx={{
                          height: 19,
                          fontSize: '10px',
                          fontWeight: 700,
                          bgcolor: 'rgba(168, 85, 247, 0.15)',
                          color: '#c084fc',
                          border: '1px solid rgba(168, 85, 247, 0.35)',
                        }}
                      />
                    )}
                  </Box>
                )}
                <Box
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownToHTML(msg.text)
                  }}
                />
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box display="flex" alignItems="center" gap={1.2} sx={{ pl: 0.5, py: 0.5 }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28 }}>
                <Bot size={16} />
              </Avatar>
              <CircularProgress size={18} color="primary" />
              <Typography variant="caption" sx={{ fontSize: '13px', fontWeight: 600, color: '#38bdf8' }}>
                Đang suy nghĩ trong {thinkingSeconds}s...
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Chat Input Bar */}
        <Box display="flex" gap={1} alignItems="flex-end">
          <TextField
            fullWidth
            size="small"
            multiline
            minRows={1}
            maxRows={4}
            placeholder="Nhắn tin với Gia sư ChemAI (Hỏi bài tập, PTHH, lý thuyết, giải thích hiện tượng)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: { xs: '15px', sm: '14px' },
                lineHeight: 1.5,
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            sx={{
              minWidth: { xs: 44, sm: 54 },
              height: 40,
              p: 0,
              borderRadius: 2,
            }}
          >
            <Send size={18} />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
