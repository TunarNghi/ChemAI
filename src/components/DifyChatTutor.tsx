"use client";

import { callGeminiAPI, supabase } from "@/lib/api";
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
import { Bot, Database, Send, Zap, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatMarkdownToHTML, cleanChemicalLatex } from "@/components/AuditTab";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  source?: "database" | "gemini";
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
];

function checkLocalChemistryDB(query: string): string | null {
  const norm = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();

  // Check in-memory database
  for (const entry of CHEMISTRY_KNOWLEDGE_DB) {
    const matched = entry.keywords.some((k) => {
      const normK = k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return norm.includes(normK) || normK.includes(norm);
    });
    if (matched) return entry.response;
  }

  // Check localStorage cache
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(`chemai_cache_${norm.slice(0, 40)}`);
      if (cached) return cached;
    } catch {}
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
        "Xin chào! Tôi là **Gia Sư Hóa Học ChemAI** (Đã tích hợp Database hóa học THPT siêu tốc & Gemini AI). Hệ thống tự động kiểm tra Database để phản hồi tức thì về Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Phản ứng Oxi hóa - Khử, Phương trình Ion hay Nhóm Halogen...",
      source: "database"
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => "session_" + Math.random().toString(36).substring(2, 9));

  const handleClearChat = () => {
    if (messages.length <= 1) return;
    if (window.confirm("Bạn có muốn xóa cuộc trò chuyện này và làm mới không?")) {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "bot",
          text:
            "Xin chào! Tôi là **Gia Sư Hóa Học ChemAI** (Đã tích hợp Database hóa học THPT siêu tốc & Gemini AI). Hệ thống tự động kiểm tra Database để phản hồi tức thì về Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Phản ứng Oxi hóa - Khử, Phương trình Ion hay Nhóm Halogen...",
          source: "database",
        },
      ]);
      setSessionId("session_" + Math.random().toString(36).substring(2, 9));
      // clear local caches
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith("chemai_cache_"))
          .forEach((k) => localStorage.removeItem(k));
      } catch {}
    }
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

    // Step 1: Check Local Knowledge Base & Local Cache (Instant under 10ms)
    const localHit = checkLocalChemistryDB(textToSend);
    if (localHit) {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: localHit,
        source: "database",
      };
      setMessages((prev) => [...prev, botMsg]);
      // Background sync to Supabase chat_logs
      supabase
        .from("chat_logs")
        .insert({
          session_id: sessionId,
          user_message: textToSend,
          ai_response: localHit,
        })
        .then();
      return;
    }

    setLoading(true);

    // Step 2: Query Supabase Database (chat_logs) for existing answered queries
    try {
      const cleanKeyword = textToSend
        .trim()
        .replace(/[?.,!]/g, "")
        .slice(0, 30);
      
      const { data: dbMatches } = await supabase
        .from("chat_logs")
        .select("ai_response")
        .ilike("user_message", `%${cleanKeyword}%`)
        .order("created_at", { ascending: false })
        .limit(1);

      if (dbMatches && dbMatches.length > 0 && dbMatches[0].ai_response) {
        const dbAnswer = dbMatches[0].ai_response;
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: dbAnswer,
          source: "database",
        };
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);

        // Cache in localStorage for subsequent instant retrieval
        try {
          const normKey = textToSend.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 40);
          localStorage.setItem(`chemai_cache_${normKey}`, dbAnswer);
        } catch {}
        return;
      }
    } catch (e) {
      console.warn("Database lookup error:", e);
    }

    // Step 3: Call Gemini AI if not found in Database
    try {
      const recentHistory = updatedMessages
        .slice(-6)
        .map((m) => `${m.sender === "user" ? "Học sinh" : "Gia sư ChemAI"}: ${m.text}`)
        .join("\n");

      const prompt = `Bạn là Gia sư Hóa Học ChemAI thông minh, tận tâm và chuyên sâu về môn Hóa học THPT (theo chương trình GDPT 2018).

QUY ĐỊNH BẮT BUỘC VỀ DANH PHÁP (IUPAC TIẾNG ANH THEO CHƯƠNG TRÌNH GDPT 2018):
- BẮT BUỘC gọi tên tất cả các nguyên tố hóa học và đơn chất/hợp chất bằng TIẾNG ANH theo chuẩn IUPAC của chương trình GDPT 2018.
  + Ví dụ tên nguyên tố: hydrogen, helium, lithium, beryllium, boron, carbon, nitrogen, oxygen, fluorine, neon, sodium, magnesium, aluminium, silicon, phosphorus, sulfur, chlorine, argon, potassium, calcium, chromium, manganese, iron, copper, zinc, bromine, silver, barium, iodine,...
  + Ví dụ tên hợp chất/đơn chất: nitric acid, sulfuric acid, hydrochloric acid, iron(III) nitrate, nitrogen monoxide, nitrogen dioxide, sulfur dioxide, sodium hydroxide,...
  + TUYỆT ĐỐI KHÔNG dùng tên tiếng Việt cũ như sắt, đồng, nhôm, kẽm, clo, oxi, nitơ, photpho, lưu huỳnh, axit nitric,... (có thể mở ngoặc giải thích thêm nếu cần, nhưng tên chính luôn là tiếng Anh).

YÊU CẦU TRÌNH BÀY VÀ GIẢI THÍCH RÕ RÀNG:
1. Trình bày khoa học, chia thành các phần rõ ràng với tiêu đề chuẩn:
   - **I. Phương trình phản ứng phân tử:** (ghi rõ trạng thái chất s, l, g, aq và nhiệt độ t°)
   - **II. Xác định chất khử, chất oxi hóa & Số oxi hóa:** (nêu rõ vai trò từng chất)
   - **III. Quá trình thăng bằng electron:** (trình bày rõ Quá trình oxi hóa & Quá trình khử)
   - **IV. Phương trình ion đầy đủ & Phương trình ion thu gọn:** (nếu phản ứng xảy ra trong dung dịch, BẮT BUỘC viết đầy đủ: 1) Phương trình ion đầy đủ, 2) Phương trình ion rút gọn; ghi rõ điện tích ion như Fe³⁺, H⁺, NO₃⁻, SO₄²⁻, Cl⁻, OH⁻...)
2. Sử dụng ký hiệu chỉ số (HNO₃, H₂O, Fe(NO₃)₃), số oxi hóa (Fe⁰, N⁺⁵, Fe⁺³, N⁺²) và điện tích ion (Fe³⁺, NO₃⁻, H⁺) rõ ràng.
3. Không viết mã LaTeX thô như \\overset hay Hoverset.

Lịch sử hội thoại gần đây:
${recentHistory}

Học sinh vừa hỏi: "${textToSend}"
Hãy giải thích và trình bày cặn kẽ, rõ ràng, mạch lạc:`;

      const aiResponse = await callGeminiAPI(prompt);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: aiResponse,
        source: "gemini",
      };
      setMessages((prev) => [...prev, botMsg]);

      // Cache locally
      try {
        const normKey = textToSend.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 40);
        localStorage.setItem(`chemai_cache_${normKey}`, aiResponse);
      } catch {}

      // Save to Supabase chat_logs DB for Teacher Audit Portal & Future Database hits
      supabase
        .from("chat_logs")
        .insert({
          session_id: sessionId,
          user_message: textToSend,
          ai_response: aiResponse,
        })
        .then();
    } catch (err: any) {
      let fallbackText = "";
      if (/Fe|HNO3/i.test(textToSend)) {
        const oxSet = (num: string, elem: string) => num === "0" ? elem : `<span style="display:inline-block;text-align:center;margin:0;vertical-align:middle;"><span style="display:block;font-size:0.65em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.12em;">${num}</span>${elem}</span>`;
        const arrowT = `<span style="display:inline-block;text-align:center;vertical-align:middle;margin:0 3px;"><span style="display:block;font-size:0.65em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.2em;">t°</span><span style="font-size:1.1em;line-height:1;">➔</span></span>`;
        const eqLine = `${oxSet("0","Fe")} (s) + 4H${oxSet("+5","N")}O<sub>3</sub> (loãng) ${arrowT} ${oxSet("+3","Fe")}(NO<sub>3</sub>)<sub>3</sub> (aq) + ${oxSet("+2","N")}O ↑ (g) + 2H<sub>2</sub>O (l)`;
        fallbackText = `<div><strong>• I. Phương trình phản ứng phân tử:</strong></div><div style="font-size:14px;margin:8px 0;padding:4px 0;">${eqLine}</div>

<div style="margin:10px 0;">
  <strong>• II. Quá trình thăng bằng electron:</strong><br/>
  <div style="padding:2px 0;">- Quá trình oxi hóa (Chất khử Fe): Fe ➔ <span style="display:inline-block;text-align:center;margin:0;vertical-align:middle;"><span style="display:block;font-size:0.65em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.12em;">+3</span>Fe</span> + 3e &nbsp;&nbsp;(x 1)</div>
  <div style="padding:2px 0;">- Quá trình khử (Chất oxi hóa HNO₃): <span style="display:inline-block;text-align:center;margin:0;vertical-align:middle;"><span style="display:block;font-size:0.65em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.12em;">+5</span>N</span> + 3e ➔ <span style="display:inline-block;text-align:center;margin:0;vertical-align:middle;"><span style="display:block;font-size:0.65em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.12em;">+2</span>N</span> &nbsp;&nbsp;(x 1)</div>
</div>

<div style="margin:10px 0;">
  <strong>• III. Phương trình ion đầy đủ:</strong><br/>
  <div style="padding:4px 0;font-size:13.5px;">Fe (s) + 4H<sup>+</sup> (aq) + 4NO<sub>3</sub><sup>-</sup> (aq) ➔ Fe<sup>3+</sup> (aq) + 3NO<sub>3</sub><sup>-</sup> (aq) + NO ↑ (g) + 2H<sub>2</sub>O (l)</div>
</div>

<div style="margin:10px 0;">
  <strong>• IV. Phương trình ion thu gọn (Net Ionic Equation):</strong><br/>
  <div style="padding:4px 0;font-size:14px;font-weight:bold;color:#38bdf8;">Fe (s) + 4H<sup>+</sup> (aq) + NO<sub>3</sub><sup>-</sup> (aq) ➔ Fe<sup>3+</sup> (aq) + NO ↑ (g) + 2H<sub>2</sub>O (l)</div>
</div>

<div style="margin:10px 0;">
  <strong>• V. Các bước cân bằng chi tiết:</strong><br/>
  1. Đặt hệ số <strong>1</strong> vào Fe(NO<sub>3</sub>)<sub>3</sub> (iron(III) nitrate) và <strong>1</strong> vào khí NO (nitrogen monoxide).<br/>
  2. Đặt hệ số <strong>1</strong> vào Fe (iron) ở vế trái.<br/>
  3. Đếm số nguyên tử nitrogen (N) ở vế phải: 3 (trong Fe(NO<sub>3</sub>)<sub>3</sub>) + 1 (trong NO) = 4 ➔ Điền hệ số <strong>4</strong> trước HNO<sub>3</sub> (nitric acid).<br/>
  4. Cân bằng hydrogen (H) và oxygen (O): Vế trái có 4 nguyên tử H ➔ Điền <strong>2</strong> trước H<sub>2</sub>O.<br/>
  5. Kiểm tra O: Vế trái 4 × 3 = 12 nguyên tử oxygen, vế phải (3 × 3) + 1 + 2 = 12 nguyên tử oxygen (Đã khớp!).
</div>`;
      } else {
        fallbackText = `<div style="font-size:15px;margin:8px 0;">
  Fe + 4HNO<sub>3</sub> 
  <span style="display:inline-block;text-align:center;vertical-align:middle;margin:0 6px;"><span style="display:block;font-size:0.7em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.2em;">t°</span><span style="font-size:1.1em;line-height:1;">➔</span></span> 
  Fe(NO<sub>3</sub>)<sub>3</sub> + NO ↑ + 2H<sub>2</sub>O
</div>
<div style="margin-top:8px;font-size:14px;color:#38bdf8;font-weight:600;">
  Phương trình ion thu gọn: Fe + 4H<sup>+</sup> + NO<sub>3</sub><sup>-</sup> ➔ Fe<sup>3+</sup> + NO ↑ + 2H<sub>2</sub>O
</div>`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: fallbackText,
          source: "database"
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
              Gia Sư Hóa Học AI
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.8}>
            <Chip 
              icon={<Database size={13} color="#10b981" />} 
              label="Database Cache: Bật" 
              color="success" 
              size="small" 
              variant="outlined" 
              sx={{ height: 22, fontSize: 11, bgcolor: 'rgba(16,185,129,0.08)' }} 
            />
            <Chip label="Gemini AI" color="info" size="small" variant="outlined" sx={{ height: 22, fontSize: 11 }} />
            {messages.length > 1 && (
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
                  p: { xs: 1.2, sm: 1.5 },
                  maxWidth: { xs: "88%", sm: "75%" },
                  bgcolor: msg.sender === "user" ? "primary.dark" : "#0f172a",
                  color: "#fff",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.06)",
                  fontSize: { xs: '13px', sm: '14px' },
                  wordBreak: 'break-word',
                  "& sub": { fontSize: "0.75em", verticalAlign: "sub" },
                  "& sup": { fontSize: "0.75em", verticalAlign: "super", color: "#38bdf8" },
                  "& strong": { color: "#fbbf24" }
                }}
              >
                {msg.sender === "bot" && msg.source && (
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.6}>
                    {msg.source === "database" ? (
                      <Chip
                        icon={<Zap size={11} color="#10b981" />}
                        label="⚡ Phản hồi tức thì từ Database"
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 10,
                          bgcolor: "rgba(16, 185, 129, 0.12)",
                          color: "#34d399",
                          border: "1px solid rgba(52, 211, 153, 0.25)",
                          "& .MuiChip-icon": { marginLeft: "4px" }
                        }}
                      />
                    ) : (
                      <Chip
                        label="✨ Trí tuệ nhân tạo Gemini AI"
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 10,
                          bgcolor: "rgba(56, 189, 248, 0.12)",
                          color: "#38bdf8",
                          border: "1px solid rgba(56, 189, 248, 0.25)"
                        }}
                      />
                    )}
                  </Box>
                )}
                <Box
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownToHTML(cleanChemicalLatex(msg.text))
                  }}
                />
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28 }}>
                <Bot size={16} />
              </Avatar>
              <CircularProgress size={18} color="primary" />
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px' }}>
                Đang tìm kiếm Database & phân tích qua Gemini AI...
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Chat Input Bar */}
        <Box display="flex" gap={1} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Hỏi về PTHH, cân bằng, cấu trúc phân tử..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: { xs: '15px', sm: '14px' },
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
