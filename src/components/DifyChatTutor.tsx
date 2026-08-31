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

export default function DifyChatTutor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text:
        "Xin chào! Tôi là **Gia Sư Hóa Học ChemAI** (Đã tích hợp Database hóa học THPT siêu tốc & Gemini AI). Bạn hãy nhập bất kỳ phương trình phản ứng hóa học (ví dụ: *Fe + HNO3*, *Cu + H2SO4*, *Al + NaOH*, *CH3COOH + C2H5OH*...), câu hỏi lý thuyết hoặc bài tập để nhận lời giải chi tiết theo chuẩn GDPT 2018 nhé!",
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
            "Xin chào! Tôi là **Gia Sư Hóa Học ChemAI** (Đã tích hợp Database hóa học THPT siêu tốc & Gemini AI). Bạn hãy nhập bất kỳ phương trình phản ứng hóa học (ví dụ: *Fe + HNO3*, *Cu + H2SO4*, *Al + NaOH*, *CH3COOH + C2H5OH*...), câu hỏi lý thuyết hoặc bài tập để nhận lời giải chi tiết theo chuẩn GDPT 2018 nhé!",
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

    // Step 1: Check Local Knowledge Base for exact prompt matches
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

    // Step 2: Call Gemini AI for dynamic, tailored answer for every chemical equation & question
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

YÊU CẦU TRÌNH BÀY VÀ ĐỊNH DẠNG PHƯƠNG TRÌNH HÓA HỌC (CHUẨN SÁCH GIÁO KHOA):
1. Phương trình phản ứng phải thể hiện rõ điều kiện trên mũi tên:
   - Điều kiện ánh sáng: dùng \`\\xrightarrow{as}\` (hoặc \`--as-->\`)
   - Điều kiện nhiệt độ: dùng \`\\xrightarrow{t^o}\` hoặc \`\\xrightarrow{Cu, t^o}\`, \`\\xrightarrow{Mn^{2+}, t^o}\`, \`\\xrightarrow{H_2SO_4 \\text{ đặc}, t^o}\`
   - Phản ứng thuận nghịch: dùng \`\\rightleftharpoons\` hoặc \`\\xrightleftharpoons{...}\` (hoặc \`⇌\`)
   - Khí bay lên dùng \`↑\` hoặc \`\\uparrow\`, kết tủa dùng \`↓\` hoặc \`\\downarrow\`
   - Phân số hệ số cân bằng (như 1/2 O₂) dùng \`\\frac{1}{2}\\text{O}_2\` hoặc \`1/2 O2\`
2. Cấu trúc bài giải cho câu hỏi phương trình phản ứng:
   - **I. Phương trình phản ứng phân tử:** (ghi rõ điều kiện xúc tác/nhiệt độ và trạng thái)
   - **II. Xác định chất khử, chất oxi hóa & Số oxi hóa:** (nếu là phản ứng oxi hóa - khử)
   - **III. Quá trình thăng bằng electron:** (nếu là phản ứng oxi hóa - khử)
   - **IV. Phương trình ion đầy đủ & Phương trình ion thu gọn:** (nếu phản ứng trong dung dịch)
   - **V. Hiện tượng thực tế & Ứng dụng:** (nêu màu sắc, khí thoát ra, kết tủa...)
3. Sử dụng công thức hóa học rõ ràng (CH₄, C₂H₅OH, HCOOH, CH₃Cl, Fe(NO₃)₃, H₂O).

Lịch sử hội thoại gần đây:
${recentHistory}

Học sinh vừa hỏi: "${textToSend}"
Hãy giải thích và trình bày cặn kẽ, chính xác cho câu hỏi/phương trình này:`;

      const aiResponse = await callGeminiAPI(prompt);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: aiResponse,
        source: "gemini",
      };
      setMessages((prev) => [...prev, botMsg]);

      // Save to Supabase chat_logs DB for Teacher Audit Portal
      supabase
        .from("chat_logs")
        .insert({
          session_id: sessionId,
          user_message: textToSend,
          ai_response: aiResponse,
        })
        .then();
    } catch (err: any) {
      console.error("Gia Sư AI Error:", err);
      // Check if there is an offline match in local knowledge base
      const offlineHit = checkLocalChemistryDB(textToSend);
      const fallbackText = offlineHit || `### ⚠️ THÔNG BÁO TẠM THỜI TỪ GIA SƯ CHEMAI

Không thể kết nối đến máy chủ AI vào lúc này (${err?.message || "Lỗi kết nối mạng"}).

💡 **Gợi ý tra cứu nhanh từ Database có sẵn:**
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
