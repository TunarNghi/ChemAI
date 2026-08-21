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
  Stack,
} from "@mui/material";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { formatMarkdownToHTML } from "@/components/AuditTab";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

function cleanChemicalLatex(text: string): string {
  if (!text) return "";
  return text
    .replace(/\$([^\$]+)\$/g, (_, match) => {
      return match
        .replace(/\\text\{([^}]+)\}/g, "$1")
        .replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>")
        .replace(/\^([a-zA-Z0-9+\-]+)/g, "<sup>$1</sup>")
        .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>")
        .replace(/_([a-zA-Z0-9+\-]+)/g, "<sub>$1</sub>")
        .replace(/\\rightarrow/g, " ➔ ");
    })
    .replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>")
    .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>");
}

const QUICK_PROMPTS = [
  "Cấu hình electron nguyên tử Cl (Z=17)",
  "Quy tắc Octet & Lai hóa sp³",
  "Cân bằng PTHH Fe + HNO₃ đặc",
  "Phân biệt liên kết Ion & Cộng hóa trị",
  "Chuẩn độ dung dịch NaOH bằng HCl",
  "Cơ chế phản ứng Este hóa (Lớp 12)",
  "Phản ứng tráng gương Glucose (Lớp 12)",
  "Hiện tượng điều chế Cl₂ từ KMnO₄",
];

export default function DifyChatTutor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text:
        "Xin chào! Tôi là **Gia Sư Hóa Học ChemAI** (Dify AI & Gemini 3.5 Pro) chuyên trách Hóa Học THPT Khối 10, 11, 12 (Chương trình GDPT 2018). Bạn có thể hỏi về Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Phản ứng Oxi hóa - Khử, Axit - Bazo, Este - Lipit hay Cơ chế phản ứng thí nghiệm...",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState<string>(() => "session_" + Math.random().toString(36).substring(2, 9));

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
    setLoading(true);

    try {
      const recentHistory = updatedMessages
        .slice(-6)
        .map((m) => `${m.sender === "user" ? "Học sinh" : "Gia sư ChemAI"}: ${m.text}`)
        .join("\n");

      const prompt = `Bạn là Gia sư Hóa Học ChemAI thông minh, tận tâm và chuyên sâu về môn Hóa học THPT (Lớp 10, 11, 12 theo chương trình GDPT 2018 - bộ sách Kết nối tri thức, Cánh diều, Chân trời sáng tạo).
Nhiệm vụ của bạn là giải thích cặn kẽ, chính xác, ngắn gọn, dễ hiểu và truyền cảm hứng cho học sinh.
Khi viết phương trình phản ứng hóa học (PTHH), hãy ghi rõ điều kiện, trạng thái chất (aq, s, l, g), và cân bằng chính xác.
Định dạng câu trả lời bằng Markdown sạch sẽ.

Lịch sử hội thoại gần đây:
${recentHistory}

Học sinh vừa hỏi: "${textToSend}"
Hãy trả lời học sinh một cách ân cần, chi tiết và chính xác:`;

      const aiResponse = await callGeminiAPI(prompt);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: aiResponse,
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
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Xin lỗi, hiện tại kết nối đến AI đang bận. Bạn vui lòng thử lại sau giây lát nhé!",
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
              Gia Sư Hóa Học AI (Gemini Flash)
            </Typography>
          </Box>
          <Chip label="Gemini AI" color="info" size="small" variant="outlined" sx={{ height: 22, fontSize: 11 }} />
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
                Gemini AI đang phân tích bài tập...
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
