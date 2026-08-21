"use client";

import { supabase } from "@/lib/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Brain,
  Lock,
  MessageSquare,
  Play,
  PlusCircle,
  Radio,
  RefreshCw,
  StopCircle,
  UserCheck,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import StudentProgressManager from "@/components/StudentProgressManager";

export function cleanChemicalLatex(text: string): string {
  if (!text) return "";

  const makeOverset = (above: string, base: string) => {
    const cleanAbove = (above || "")
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/t\^[0o\circ]/g, "t°")
      .replace(/\^0|\^\circ|\^o|^˚$|^\circ$|^o$/g, "0");
    const cleanBase = (base || "").replace(/\\text\{([^}]+)\}/g, "$1");
    if (cleanAbove === "0") return cleanBase;
    return `<span style="display:inline-block;text-align:center;vertical-align:baseline;line-height:1.1;margin:0;"><span style="display:block;font-size:0.65em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.12em;">${cleanAbove}</span><span>${cleanBase}</span></span>`;
  };

  const unicodeSuperMap: Record<string, string> = {
    "⁺": "+", "⁻": "-", "⁰": "0", "¹": "1", "²": "2", "³": "3",
    "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9"
  };

  let res = text
    .replace(/H_?\{?20\}?/g, "H<sub>2</sub>O")
    .replace(/3Fe\+\}/g, "Fe<sup>3+</sup>")
    .replace(/reduse\s*\(khử\)/gi, "khử")
    // Convert unicode superscripts on ions (e.g. Fe³⁺, NO₃⁻, SO₄²⁻, H⁺)
    .replace(/([⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (match) => {
      const converted = match.split("").map((c) => unicodeSuperMap[c] || c).join("");
      return `<sup>${converted}</sup>`;
    })
    // Polyatomic and Monatomic ions without caret (e.g. Fe3+, Fe2+, Cu2+, SO4 2-, NO3-, OH-, H+)
    .replace(/\b(SO4|SO3|CO3|Cr2O7|CrO4|SiO3|S2O3)\s*(\^?\{?(?:2-|2\+|-2|\+2)\}?|2-|2\+)/g, "$1<sup>2-</sup>")
    .replace(/\b(PO4|PO3)\s*(\^?\{?(?:3-|3\+|-3|\+3)\}?|3-|3\+)/g, "$1<sup>3-</sup>")
    .replace(/\b(NO3|NO2|OH|HCO3|HSO4|H2PO4|CH3COO|ClO|ClO2|ClO3|ClO4|MnO4|F|Cl|Br|I)\s*(\^?\{?(?:-|\+|-1|\+1)\}?|-|\+)(?!\d)/g, "$1<sup>$2</sup>")
    .replace(/\b(NH4|H3O)\s*(\^?\{?(?:\+|\+1)\}?|\+)(?!\d)/g, "$1<sup>+</sup>")
    .replace(/\b(Fe|Cu|Zn|Mg|Ca|Ba|Pb|Sn|Mn|Ni|Hg|Sr|Pt|Co)\s*(2\+|\+2)/g, "$1<sup>2+</sup>")
    .replace(/\b(Al|Cr|Fe)\s*(3\+|\+3)/g, "$1<sup>3+</sup>")
    .replace(/\b(Na|K|Ag|Li|Cs)\s*(\+|\+1)(?!\d)/g, "$1<sup>+</sup>")
    .replace(/\b(H)\s*(\+|\+1)(?!\d)/g, "$1<sup>+</sup>")
    .replace(/([0-9]*[A-Za-z\(\)]+(?:<sub>[0-9]+<\/sub>|_\{?[0-9]+\}?)?)\s*\^\s*\{?([0-9]*[+-]|[+-][0-9]*)\}?/g, "$1<sup>$2</sup>")
    .replace(/([0-9]*e)\s*([0-9]+\s*[×x])/gi, "$1<br/>$2")
    .replace(/\\?begin\{array\}\{?[^}]*\}?([\s\S]*?)\\?end\{array\}/gi, (_, content) => {
      const rows = content.trim().split("\n").map((r: string) => r.replace(/\\\\$/, "").trim()).filter(Boolean);
      let tableRowsHTML = "";
      for (const row of rows) {
        const cells = row.split("&");
        if (cells.length >= 2) {
          const leftCell = cells[0].trim();
          const rightCell = cells.slice(1).join("&").trim();
          tableRowsHTML += `<tr><td style="padding:2px 8px;text-align:right;border-right:2px solid #38bdf8;font-weight:bold;color:#f59e0b;">${leftCell}</td><td style="padding:2px 8px;text-align:left;">${rightCell}</td></tr>`;
        } else {
          tableRowsHTML += `<tr><td colspan="2" style="padding:2px 8px;">${row}</td></tr>`;
        }
      }
      return `<table style="margin:8px 0;border-collapse:collapse;"><tbody>${tableRowsHTML}</tbody></table>`;
    })
    .replace(/\\?(?:mathbf|textbf)\{([^}]+)\}/g, '<b style="color:#fbbf24;font-weight:bold;">$1</b>')
    .replace(/\\?times\b/gi, "×")
    .replace(/\\?cdot\b/gi, "·")
    .replace(/\\?frac\{([^}]+)\}\{([^}]+)\}/g, "($1/$2)")
    .replace(/\\?(?:approx|approxeq)\b/gi, "≈")
    .replace(/\\?neq\b/gi, "≠")
    .replace(/\\?(?:le|leq)\b/gi, "≤")
    .replace(/\\?(?:ge|geq)\b/gi, "≥")
    .replace(/\\?pm\b/gi, "±")
    .replace(/\\?alpha\b/gi, "α")
    .replace(/\\?beta\b/gi, "β")
    .replace(/\\?gamma\b/gi, "γ")
    .replace(/\\?pi\b/gi, "π")
    .replace(/\\?Delta\b/gi, "Δ")
    .replace(/\\?(?:degree|circ)\b/gi, "°")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\ce\{([^}]+)\}/g, "$1")
    .replace(/\\mathrm\{([^}]+)\}/g, "$1")
    .replace(/\\(?:left|right|big|Big|gt|lt)/g, "")
    .replace(/([A-Z][a-z]*)?\\?overset\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, above, base) => {
      return (prefix || "") + makeOverset(above, base);
    })
    .replace(/([A-Z][a-z]*)?\\?underset\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, below, base) => {
      const p = prefix || "";
      const cleanBelow = (below || "").replace(/\\text\{([^}]+)\}/g, "$1");
      const cleanBase = (base || "").replace(/\\text\{([^}]+)\}/g, "$1");
      return `${p}<span style="display:inline-block;text-align:center;vertical-align:baseline;line-height:1.1;margin:0 1px;"><span>${cleanBase}</span><span style="display:block;font-size:0.68em;color:#94a3b8;line-height:1;margin-top:1px;">${cleanBelow}</span></span>`;
    })
    .replace(/([A-Z][a-z]*)?\\?stackrel\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, above, base) => {
      return (prefix || "") + makeOverset(above, base);
    })
    .replace(/\b(?:\+|-|0)?([+-]?[0-9]+)\s*(Fe|N|O|Cu|Zn|Al|Mg|Cl|S|P|Mn|Cr|Na|K|Ca|Ba|Ag|H)\b/g, (match, num, elem) => {
      if (match.startsWith("4H") || match.startsWith("2H") || match.startsWith("3H") || match.startsWith("6H")) {
        return match;
      }
      const sign = num.startsWith("-") ? num : (num === "0" ? "0" : "+" + num.replace(/^\+/, ""));
      return makeOverset(sign, elem);
    })
    .replace(/([A-Z][a-z]?)\s*(?:\^\{?([+-]?[0-9]+|0|\\circ|o)\}?|˚)/g, (_, elem, oxid1) => {
      return makeOverset(oxid1 || "0", elem);
    })
    .replace(/(?:\\?xrightarrow(?:\[([^\]]*)\])?\{([^}]*)\}|➔\s*\(([^)]+)\)|->\s*\(([^)]+)\)|([tT][\^˚\circ0o]+)\s*➔|➔\s*([tT][\^˚\circ0o]+))/g, (_, below, above, c1, c2, c3, c4) => {
      const cond = above || c1 || c2 || c3 || c4 || "t°";
      const cleanAbove = cond
        .replace(/\\text\{([^}]+)\}/g, "$1")
        .replace(/t\^?[0o\circ˚]|t0|to/gi, "t°")
        .replace(/\^0|\^\circ|\^o/g, "°");
      const cleanBelow = (below || "").replace(/\\text\{([^}]+)\}/g, "$1");
      if (cleanBelow) {
        return `<span style="display:inline-block;text-align:center;vertical-align:middle;margin:0 6px;"><span style="display:block;font-size:0.7em;font-weight:600;color:#38bdf8;line-height:1;margin-bottom:-0.2em;">${cleanAbove}</span><span style="font-size:1.1em;line-height:1;">➔</span><span style="display:block;font-size:0.7em;color:#94a3b8;line-height:1;margin-top:1px;">${cleanBelow}</span></span>`;
      }
      return `<span style="display:inline-block;text-align:center;vertical-align:middle;margin:0 6px;"><span style="display:block;font-size:0.7em;font-weight:600;color:#38bdf8;line-height:1;margin-bottom:-0.2em;">${cleanAbove}</span><span style="font-size:1.1em;line-height:1;">➔</span></span>`;
    })
    .replace(/\\uparrow/g, " ↑ ")
    .replace(/\\downarrow/g, " ↓ ")
    .replace(/\\rightarrow|\\longrightarrow|\\to|->|arrow/gi, " ➔ ")
    .replace(/\\rightleftharpoons|\\leftrightarrow|\\Leftrightarrow/g, " ⇌ ")
    .replace(/\$([^\$]+)\$/g, "$1")
    .replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>")
    .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>")
    .replace(/_([a-zA-Z0-9+\-]+)/g, "<sub>$1</sub>")
    .replace(/\\\\/g, "<br/>")
    .replace(/\\/g, "");

  res = res.replace(/([A-Z][a-z]?|\))([0-9]+)(?![<0-9\+\-])/g, "$1<sub>$2</sub>");
  res = res.replace(/([^\n<]+)\s*\n+\s*(<span[^>]*>[^<]*t°[^<]*➔[^<]*<\/span>|➔|→|⇌)\s*\n+\s*([^\n<]+)/gi, "$1 $2 $3");

  return res;
}

export function formatMarkdownToHTML(text: string): string {
  if (!text) return "";

  const cleanedText = cleanChemicalLatex(text);

  let html = cleanedText
    // Replace <br> strings or newlines
    .replace(/<br\s*\/?>/gi, "\n")
    // Bold **text**
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic *text*
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Headings ###
    .replace(
      /^#### (.*$)/gim,
      '<h4 style="color:#38bdf8;font-size:13px;margin:8px 0 4px;">$1</h4>',
    )
    .replace(
      /^### (.*$)/gim,
      '<h3 style="color:#38bdf8;font-size:14px;margin:10px 0 4px;">$1</h3>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 style="color:#38bdf8;font-size:16px;margin:12px 0 6px;">$1</h2>',
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 style="color:#38bdf8;font-size:18px;margin:14px 0 8px;">$1</h1>',
    );

  // Convert markdown tables & lists
  const lines = html.split("\n");
  let inTable = false;
  let tableHTML = "";
  const resultLines: string[] = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (trimmed.includes("---")) continue;
      const cells = trimmed
        .split("|")
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (!inTable) {
        tableHTML +=
          '<table style="width:100%;border-collapse:collapse;margin:10px 0;border:1px solid rgba(255,255,255,0.1);"><thead><tr style="background:#1e293b;color:#f59e0b;">' +
          cells
            .map(
              (c) =>
                `<th style="border:1px solid rgba(255,255,255,0.1);padding:6px;text-align:left;">${c.trim()}</th>`,
            )
            .join("") +
          "</tr></thead><tbody>";
        inTable = true;
      } else {
        tableHTML +=
          "<tr>" +
          cells
            .map(
              (c) =>
                `<td style="border:1px solid rgba(255,255,255,0.1);padding:6px;">${c.trim()}</td>`,
            )
            .join("") +
          "</tr>";
      }
    } else {
      if (inTable) {
        tableHTML += "</tbody></table>";
        resultLines.push(tableHTML);
        tableHTML = "";
        inTable = false;
      }
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        resultLines.push(
          `<div style="padding-left:14px;margin:2px 0;">• ${trimmed.substring(2)}</div>`,
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        resultLines.push(
          `<div style="padding-left:14px;margin:2px 0;">${trimmed}</div>`,
        );
      } else {
        resultLines.push(line);
      }
    }
  }

  if (inTable) {
    tableHTML += "</tbody></table>";
    resultLines.push(tableHTML);
  }

  return resultLines.join("<br/>");
}

export default function AuditTab() {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const [subTab, setSubTab] = useState<"students" | "chat" | "quiz" | "kahoot">("students");
  const [filterText, setFilterText] = useState<string>("");

  // Data States
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [quizBank, setQuizBank] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Kahoot Host State
  const [timerSec, setTimerSec] = useState<number>(20);
  const [hostPin, setHostPin] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [gameStatus, setGameStatus] = useState<string>("idle"); // idle | waiting | active | finished
  const [kahootHistory, setKahootHistory] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  useEffect(() => {
    fetchKahootHistory();
  }, []);

  const fetchKahootHistory = async () => {
    try {
      const { data } = await supabase
        .from("experiments")
        .select("*")
        .like("cache_key", "kahoot_history_%")
        .order("created_at", { ascending: false })
        .limit(10);
      if (data) {
        setKahootHistory(data.map((item) => item.result_json));
      }
    } catch (e) {
      console.warn("Fetch Kahoot history error:", e);
    }
  };

  const handleVerify = () => {
    const expectedPassword =
      process.env.NEXT_PUBLIC_TEACHER_AUDIT_PASSWORD || "chemai2026";
    if (password === expectedPassword) {
      setIsAuthed(true);
      setOpenModal(false);
      fetchCurrentSubData("chat");
    } else {
      setErrorMsg(true);
    }
  };

  const fetchCurrentSubData = async (type = subTab) => {
    setIsLoading(true);
    try {
      if (type === "chat") {
        const { data } = await supabase
          .from("chat_logs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(40);
        setChatLogs(data || []);
      } else if (type === "quiz") {
        const { data } = await supabase
          .from("quiz_questions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(40);
        setQuizBank(data || []);
      }
    } catch (e) {
      console.error("Fetch audit data error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKahootRoom = async () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      let { error } = await supabase.from("rooms").insert({
        room_pin: pin,
        status: "waiting",
        current_question: null,
        timer_sec: timerSec,
      });

      // Fallback if timer_sec column does not exist in Supabase DB schema
      if (error && error.message?.includes("timer_sec")) {
        const fallback = await supabase.from("rooms").insert({
          room_pin: pin,
          status: "waiting",
          current_question: null,
        });
        error = fallback.error;
      }

      if (error) throw error;
      setHostPin(pin);
      setGameStatus("waiting");
      fetchCurrentSubData("quiz");
      pollParticipants(pin);
    } catch (e: any) {
      alert("Lỗi tạo phòng Kahoot: " + e.message);
    }
  };

  const pollParticipants = async (pinStr: string) => {
    try {
      const { data } = await supabase
        .from("room_participants")
        .select("*")
        .eq("room_pin", pinStr)
        .order("score", { ascending: false });
      setParticipants(data || []);

      // Auto finish match on teacher host side when all participants finished 10 questions OR room status is finished
      const allFinished = data && data.length > 0 && data.every(p => p.answers && Object.keys(p.answers).length >= 10);

      const { data: roomData } = await supabase
        .from("rooms")
        .select("status")
        .eq("room_pin", pinStr)
        .maybeSingle();

      if ((roomData && roomData.status === "finished") || allFinished) {
        if (gameStatus !== "finished") {
          setGameStatus("finished");
          // Save Kahoot leaderboard history to DB automatically
          const leaderData = {
            room_pin: pinStr,
            ended_at: new Date().toISOString(),
            leaderboard: (data || []).sort((a, b) => b.score - a.score),
          };
          await supabase.from("experiments").upsert({
            cache_key: `kahoot_history_${pinStr}_${Date.now()}`,
            result_json: leaderData,
          });
          if (roomData && roomData.status !== "finished") {
            await supabase.from("rooms").update({ status: "finished" }).eq("room_pin", pinStr);
          }
          fetchKahootHistory();
        }
      }
    } catch (e) {
      console.warn("Poll participants error:", e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (hostPin && (gameStatus === "waiting" || gameStatus === "active")) {
      // Immediate poll
      pollParticipants(hostPin);
      // Auto poll every 2 seconds
      interval = setInterval(() => {
        pollParticipants(hostPin);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hostPin, gameStatus]);

  const filteredChatLogs = chatLogs.filter(
    (row) =>
      !filterText ||
      row.user_message?.toLowerCase().includes(filterText.toLowerCase()) ||
      row.session_id?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const filteredQuizBank = quizBank.filter(
    (row) =>
      !filterText ||
      row.question?.toLowerCase().includes(filterText.toLowerCase()),
  );

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
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={1.5}
          mb={2.5}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <UserCheck color="#f59e0b" size={22} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Cổng Kiểm Duyệt Audit & Kahoot Host
            </Typography>
          </Box>

          {isAuthed && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label="Đã Xác Thực" color="success" size="small" sx={{ height: 22, fontSize: 11 }} />
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => setIsAuthed(false)}
                startIcon={<Lock size={14} />}
                sx={{ textTransform: "none", fontSize: "12px" }}
              >
                Khóa cổng
              </Button>
            </Stack>
          )}
        </Box>

        {!isAuthed ? (
          <Paper
            sx={{
              p: { xs: 2.5, sm: 4 },
              bgcolor: "#0f172a",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary" mb={2} sx={{ fontSize: { xs: "13px", sm: "14px" } }}>
              Vui lòng nhập mật khẩu quản trị dành cho Giáo viên để xem nhật ký
              thao tác AI, Ngân hàng câu hỏi trắc nghiệm & Quản lý điều hành
              phòng đấu Kahoot Multiplayer.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setOpenModal(true)}
              startIcon={<Lock size={16} />}
              sx={{ fontWeight: "bold", textTransform: "none", fontSize: { xs: "13.5px", sm: "14.5px" } }}
            >
              Nhập Mật Khẩu Đăng Nhập
            </Button>
          </Paper>
        ) : (
          <Box>
            {/* SUB TABS & CONTROLS */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              flexWrap="wrap"
              gap={1}
            >
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.8}>
                <Button
                  size="small"
                  variant={subTab === "students" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => setSubTab("students")}
                  startIcon={<GraduationCap size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Sổ Học Sinh & Năng Lực
                </Button>
                <Button
                  size="small"
                  variant={subTab === "chat" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => {
                    setSubTab("chat");
                    fetchCurrentSubData("chat");
                  }}
                  startIcon={<MessageSquare size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Chat Logs AI
                </Button>
                <Button
                  size="small"
                  variant={subTab === "quiz" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => {
                    setSubTab("quiz");
                    fetchCurrentSubData("quiz");
                  }}
                  startIcon={<Brain size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Quiz Bank (Ngân hàng)
                </Button>
                <Button
                  size="small"
                  variant={subTab === "kahoot" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => setSubTab("kahoot")}
                  startIcon={<Radio size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Kahoot Host Portal
                </Button>
              </Stack>

              {subTab !== "kahoot" && (
                <Button
                  size="small"
                  onClick={() => fetchCurrentSubData()}
                  startIcon={<RefreshCw size={14} />}
                >
                  Tải Lại CSDL
                </Button>
              )}
            </Box>

            {/* SEARCH FILTER BOX FOR CHAT / QUIZ */}
            {subTab !== "kahoot" && (
              <Box mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="🔍 Nhập từ khóa tìm kiếm (Tên hóa chất, Session ID, câu hỏi...)..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Box>
            )}

            {/* VIEW 0: STUDENT PROGRESS & COMPETENCY */}
            {subTab === "students" && (
              <Box sx={{ mt: 1 }}>
                <StudentProgressManager />
              </Box>
            )}

            {/* VIEW 1: CHAT LOGS */}
            {subTab === "chat" && (
              <Paper
                sx={{
                  bgcolor: "#0f172a",
                  borderRadius: 2,
                  overflowX: "auto",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                className="custom-scrollbar"
              >
                <Table size="small">
                  <TableHead sx={{ bgcolor: "#1e293b" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        Thời gian
                      </TableCell>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        Session ID
                      </TableCell>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", minWidth: 160 }}>
                        Câu hỏi Học sinh
                      </TableCell>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", minWidth: 280 }}>
                        AI Trả lời
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredChatLogs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          align="center"
                          sx={{ color: "text.secondary", py: 3 }}
                        >
                          Chưa có dữ liệu Chat Log được ghi nhận trên Supabase.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredChatLogs.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell
                            sx={{
                              color: "text.secondary",
                              fontSize: "11px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {new Date(row.created_at).toLocaleString("vi-VN")}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "cyan",
                              fontSize: "11px",
                              fontFamily: "monospace",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.session_id || "N/A"}
                          </TableCell>
                          <TableCell
                            sx={{ color: "common.white", fontSize: "12px" }}
                          >
                            {row.user_message}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "text.secondary",
                              fontSize: "12px",
                              minWidth: 280,
                            }}
                          >
                            <Box
                              sx={{
                                "& h1, & h2, & h3, & h4": {
                                  color: "#38bdf8",
                                  fontWeight: "bold",
                                  fontSize: "13px",
                                  my: 0.5,
                                },
                                "& p": { my: 0.5 },
                                "& table": {
                                  width: "100%",
                                  borderCollapse: "collapse",
                                  my: 1,
                                  border: "1px solid rgba(255,255,255,0.1)",
                                },
                                "& th, & td": {
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  p: 0.8,
                                  textAlign: "left",
                                  fontSize: "11px",
                                },
                                "& th": {
                                  bgcolor: "#1e293b",
                                  color: "#f59e0b",
                                },
                                "& strong, & b": { color: "#fbbf24" },
                              }}
                              dangerouslySetInnerHTML={{
                                __html: formatMarkdownToHTML(
                                  row.ai_response || "",
                                ),
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Paper>
            )}

            {/* VIEW 2: QUIZ BANK */}
            {subTab === "quiz" && (
              <Paper
                sx={{
                  bgcolor: "#0f172a",
                  borderRadius: 2,
                  overflowX: "auto",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                className="custom-scrollbar"
              >
                <Table size="small">
                  <TableHead sx={{ bgcolor: "#1e293b" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                        Thời gian
                      </TableCell>
                      <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                        Nội dung Câu hỏi
                      </TableCell>
                      <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                        Đáp án Lựa chọn
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: "#f59e0b", fontWeight: "bold" }}
                      >
                        Đúng
                      </TableCell>
                      <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                        Lời Giải thích
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredQuizBank.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          align="center"
                          sx={{ color: "text.secondary", py: 3 }}
                        >
                          Chưa có câu hỏi trắc nghiệm nào trong Ngân hàng CSDL
                          Supabase.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredQuizBank.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell
                            sx={{
                              color: "text.secondary",
                              fontSize: "11px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {new Date(row.created_at).toLocaleString("vi-VN")}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "common.white",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {row.question}
                          </TableCell>
                          <TableCell
                            sx={{ color: "text.secondary", fontSize: "11px" }}
                          >
                            {Array.isArray(row.options)
                              ? row.options.map((opt: string, i: number) => (
                                <div key={i}>
                                  <b>{["A", "B", "C", "D"][i]}.</b> {opt}
                                </div>
                              ))
                              : ""}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={
                                ["A", "B", "C", "D"][row.correct_index] || "A"
                              }
                              color="success"
                              size="small"
                              sx={{ fontWeight: "bold" }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ color: "text.secondary", fontSize: "11px" }}
                          >
                            {row.explanation}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Paper>
            )}

            {/* VIEW 3: KAHOOT HOST PORTAL */}
            {subTab === "kahoot" && (
              <Paper
                sx={{
                  p: 3,
                  bgcolor: "#0f172a",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {gameStatus === "idle" ? (
                  <Box textAlign="center" py={3}>
                    <Radio color="#f59e0b" size={48} className="mx-auto mb-2" />
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="common.white"
                      mb={1}
                    >
                      Tạo Phòng Đấu Kahoot Hóa Học (Bộ 10 Câu)
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={3}
                      maxWidth={500}
                      mx="auto"
                    >
                      Hệ thống tự động kết hợp câu hỏi bám sát SGK Hóa 10 từ
                      Dify AI & Gemini AI, tự động lưu vào Supabase DB.
                    </Typography>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                      mb={3}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Thời gian/câu:
                      </Typography>
                      <Select
                        size="small"
                        value={timerSec}
                        onChange={(e) => setTimerSec(e.target.value as number)}
                        sx={{
                          bgcolor: "#1e293b",
                          color: "#f59e0b",
                          fontWeight: "bold",
                        }}
                      >
                        <MenuItem value={10}>10 giây</MenuItem>
                        <MenuItem value={15}>15 giây</MenuItem>
                        <MenuItem value={20}>20 giây (Khuyên dùng)</MenuItem>
                        <MenuItem value={30}>30 giây</MenuItem>
                      </Select>
                    </Box>

                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleCreateKahootRoom}
                      startIcon={<PlusCircle size={16} />}
                      sx={{ fontWeight: "bold", py: 1.2, px: 4 }}
                    >
                      Khởi Tạo Mã Phòng Mới 🚀
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={2}
                      bgcolor="#1e293b"
                      borderRadius={2}
                      mb={3}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          MÃ PIN KAHOOT PHÒNG LỚP:
                        </Typography>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          color="amber"
                          fontFamily="monospace"
                        >
                          {hostPin}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color={gameStatus === "finished" ? "secondary" : gameStatus === "active" ? "info" : "success"}
                          startIcon={<Play size={16} />}
                          disabled={gameStatus === "finished"}
                          onClick={async () => {
                            if (!hostPin) return;
                            try {
                              await supabase
                                .from("rooms")
                                .update({
                                  status: "active",
                                  current_question: 1,
                                })
                                .eq("room_pin", hostPin);
                              setGameStatus("active");
                            } catch (e: any) {
                              alert("Lỗi bắt đầu trận đấu: " + e.message);
                            }
                          }}
                          sx={{ fontWeight: "bold" }}
                        >
                          {gameStatus === "finished"
                            ? "🏁 TRẬN ĐẤU ĐÃ HOÀN THÀNH"
                            : gameStatus === "active"
                              ? "Đang Đấu (Trận đấu Đang Diễn Ra)"
                              : "Bắt Đầu Đấu (10 Câu)"}
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={async () => {
                            if (hostPin) {
                              // Save Kahoot leaderboard history to DB
                              const leaderData = {
                                room_pin: hostPin,
                                ended_at: new Date().toISOString(),
                                leaderboard: participants.sort(
                                  (a, b) => b.score - a.score,
                                ),
                              };
                              await supabase.from("experiments").upsert({
                                cache_key: `kahoot_history_${hostPin}_${Date.now()}`,
                                result_json: leaderData,
                              });
                              await supabase
                                .from("rooms")
                                .update({ status: "finished" })
                                .eq("room_pin", hostPin);
                            }
                            setGameStatus("idle");
                            fetchKahootHistory();
                          }}
                          startIcon={<StopCircle size={16} />}
                        >
                          Kết Thúc & Lưu BXH
                        </Button>
                      </Stack>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box
                          p={2}
                          bgcolor="#1e293b"
                          borderRadius={2}
                          height="100%"
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1.5}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              color="cyan"
                            >
                              👥 Học sinh đã tham gia
                            </Typography>
                            <Chip
                              label={`${participants.length} em`}
                              size="small"
                              color="primary"
                            />
                          </Box>

                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {participants.length === 0 ? (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Đang chờ học sinh nhập mã PIN vào phòng...
                              </Typography>
                            ) : (
                              participants.map((p) => (
                                <Chip
                                  key={p.id}
                                  label={p.nickname}
                                  color="secondary"
                                  variant="outlined"
                                  onClick={() => setSelectedStudent(p)}
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                      bgcolor: "rgba(217, 70, 239, 0.2)",
                                    },
                                  }}
                                />
                              ))
                            )}
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box
                          p={2}
                          bgcolor="#1e293b"
                          borderRadius={2}
                          height="100%"
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            color="amber"
                            mb={1.5}
                          >
                            🏆 Bảng Xếp Hạng & Chi Tiết Học Sinh (Click Xem Chi
                            Tiết)
                          </Typography>
                          <Stack spacing={1}>
                            {participants.map((p, idx) => {
                              const isCorrect = p.score > 0;
                              return (
                                <Box
                                  key={p.id}
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  p={1}
                                  bgcolor="#0f172a"
                                  borderRadius={1}
                                  onClick={() => setSelectedStudent(p)}
                                  sx={{
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                      bgcolor: "#1e293b",
                                      border: "1px solid #f59e0b",
                                    },
                                  }}
                                >
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <Typography
                                      variant="caption"
                                      fontWeight="bold"
                                      color={
                                        idx === 0 ? "amber" : "common.white"
                                      }
                                    >
                                      #{idx + 1} {p.nickname}
                                    </Typography>
                                    <Chip
                                      label={
                                        isCorrect
                                          ? "✓ Đúng (+10đ)"
                                          : "Chờ / Chưa chọn"
                                      }
                                      color={isCorrect ? "success" : "default"}
                                      size="small"
                                      sx={{ fontSize: "10px", height: 20 }}
                                    />
                                  </Box>
                                  <Button
                                    size="small"
                                    variant="text"
                                    color="warning"
                                    sx={{
                                      fontSize: "11px",
                                      textTransform: "none",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {p.score}đ ➔ Xem bài
                                  </Button>
                                </Box>
                              );
                            })}
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                    {/* ALL 10 MATCH QUESTIONS BREAKDOWN - SHOWN ONLY WHEN MATCH IS FINISHED */}
                    {gameStatus === "finished" ? (
                      <Box mt={3} p={2} bgcolor="#1e293b" borderRadius={2}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="cyan"
                          mb={1.5}
                        >
                          📊 Báo Cáo & Thống Kê Chi Tiết Đáp Án Học Sinh Chọn (Hoàn Thành Trận Đấu)
                        </Typography>
                        <Stack spacing={2}>
                          {quizBank.slice(0, 10).map((q, qIdx) => (
                            <Paper
                              key={q.id || qIdx}
                              sx={{
                                p: 2,
                                bgcolor: "#0f172a",
                                borderRadius: 2,
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="common.white"
                                mb={1.5}
                              >
                                Câu {qIdx + 1}: {q.question}
                              </Typography>

                              <Grid container spacing={1.5} mb={2}>
                                {Array.isArray(q.options) &&
                                  q.options.map((opt: string, optIdx: number) => {
                                    const isCorrectOpt =
                                      optIdx === q.correct_index;
                                    // Count students who picked this option
                                    const pickedStudents = participants.filter(
                                      (p) =>
                                        p.answers && p.answers[qIdx] === optIdx,
                                    );
                                    return (
                                      <Grid item xs={12} sm={6} key={optIdx}>
                                        <Box
                                          p={1}
                                          bgcolor={
                                            isCorrectOpt
                                              ? "rgba(16, 185, 129, 0.15)"
                                              : "rgba(255,255,255,0.03)"
                                          }
                                          borderRadius={1.5}
                                          border={`1px solid ${isCorrectOpt ? "#10b981" : "rgba(255,255,255,0.08)"}`}
                                        >
                                          <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={0.5}
                                          >
                                            <Typography
                                              variant="caption"
                                              color={
                                                isCorrectOpt
                                                  ? "#10b981"
                                                  : "common.white"
                                              }
                                              fontWeight="bold"
                                            >
                                              {["A", "B", "C", "D"][optIdx]}.{" "}
                                              {opt}{" "}
                                              {isCorrectOpt && "✓ (Đáp án chuẩn)"}
                                            </Typography>
                                            <Chip
                                              label={`${pickedStudents.length} học sinh`}
                                              size="small"
                                              color={
                                                isCorrectOpt
                                                  ? "success"
                                                  : pickedStudents.length > 0
                                                    ? "error"
                                                    : "default"
                                              }
                                              sx={{
                                                height: 20,
                                                fontSize: "10px",
                                                fontWeight: "bold",
                                              }}
                                            />
                                          </Box>
                                          {pickedStudents.length > 0 && (
                                            <Stack
                                              direction="row"
                                              spacing={0.5}
                                              flexWrap="wrap"
                                              mt={0.5}
                                            >
                                              {pickedStudents.map((p) => (
                                                <Chip
                                                  key={p.id}
                                                  label={p.nickname}
                                                  size="small"
                                                  variant="outlined"
                                                  color={
                                                    isCorrectOpt
                                                      ? "success"
                                                      : "error"
                                                  }
                                                  sx={{
                                                    height: 18,
                                                    fontSize: "9px",
                                                  }}
                                                />
                                              ))}
                                            </Stack>
                                          )}
                                        </Box>
                                      </Grid>
                                    );
                                  })}
                              </Grid>

                              {/* Unanswered / Pending count for this question */}
                              {(() => {
                                const pending = participants.filter(
                                  (p) =>
                                    !p.answers || p.answers[qIdx] === undefined,
                                );
                                if (pending.length === 0) return null;
                                return (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    ⏳ <b>{pending.length} em chưa chọn:</b>{" "}
                                    {pending.map((p) => p.nickname).join(", ")}
                                  </Typography>
                                );
                              })()}
                            </Paper>
                          ))}
                        </Stack>
                      </Box>
                    ) : null}
                  </Box>
                )}

                {/* HISTORICAL KAHOOT LEADERBOARDS SECTION - ALWAYS VISIBLE */}
                <Box mt={4} pt={2} borderTop="1px dashed rgba(255,255,255,0.1)">
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="amber"
                    mb={1.5}
                  >
                    📜 Lịch Sử Bảng Xếp Hạng Các Trận Đấu Kahoot Đã Lưu CSDL
                  </Typography>
                  <Stack spacing={1.5}>
                    {kahootHistory.length === 0 ? (
                      <Typography variant="caption" color="text.secondary">
                        Chưa có lịch sử kết quả trận đấu Kahoot nào được lưu.
                      </Typography>
                    ) : (
                      kahootHistory.map((h, i) => (
                        <Paper
                          key={i}
                          sx={{ p: 2, bgcolor: "#1e293b", borderRadius: 2 }}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              color="cyan"
                            >
                              🏆 Trận đấu PIN #{h.room_pin}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Thời gian:{" "}
                              {new Date(h.ended_at).toLocaleString("vi-VN")}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={2} flexWrap="wrap">
                            {h.leaderboard
                              ?.slice(0, 3)
                              .map((player: any, pIdx: number) => (
                                <Chip
                                  key={pIdx}
                                  label={`#${pIdx + 1} ${player.nickname}: ${player.score}đ`}
                                  color={
                                    pIdx === 0
                                      ? "warning"
                                      : pIdx === 1
                                        ? "primary"
                                        : "secondary"
                                  }
                                  size="small"
                                  sx={{ fontWeight: "bold" }}
                                />
                              ))}
                          </Stack>
                        </Paper>
                      ))
                    )}
                  </Stack>
                </Box>
              </Paper>
            )}
          </Box>
        )}

        {/* AUTH MODAL */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: "#0f172a", color: "amber" }}>
            Xác Thực Quyền Giáo Viên
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#0f172a" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={2}
            >
              Vui lòng nhập mật khẩu quản trị để truy cập cổng Audit & Kahoot
              Host
            </Typography>
            <TextField
              fullWidth
              type="password"
              size="small"
              label="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              error={errorMsg}
              helperText={errorMsg ? "Mật khẩu không chính xác!" : ""}
            />
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#0f172a" }}>
            <Button onClick={() => setOpenModal(false)}>Hủy</Button>
            <Button variant="contained" color="warning" onClick={handleVerify}>
              Xác Nhận
            </Button>
          </DialogActions>
        </Dialog>
        {/* STUDENT DETAIL MODAL */}
        <Dialog
          open={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ bgcolor: "#0f172a", color: "#38bdf8", fontWeight: "bold" }}
          >
            👤 Chi Tiết Bài Làm Học Sinh: {selectedStudent?.nickname} (Tổng
            điểm: {selectedStudent?.score}đ)
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#0f172a" }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Phân tích đáp án học sinh <b>{selectedStudent?.nickname}</b> đã
              chọn trên tất cả 10 câu hỏi của trận đấu Kahoot:
            </Typography>

            <Stack spacing={2}>
              {(() => {
                const list = quizBank
                  .slice(0, 10)
                  .filter((_, qIdx) => gameStatus === 'finished' || (selectedStudent?.answers && selectedStudent.answers[qIdx] !== undefined));

                if (list.length === 0) {
                  return (
                    <Paper sx={{ p: 3, bgcolor: '#1e293b', textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⏳ Học sinh <b>{selectedStudent?.nickname}</b> chưa thực hiện trả lời câu hỏi nào trong trận đấu này.
                      </Typography>
                    </Paper>
                  );
                }

                return list.map((q, qIdx) => {
                  const studentAnsIdx = selectedStudent?.answers
                    ? selectedStudent.answers[qIdx]
                    : undefined;
                  const isCorrect = studentAnsIdx === q.correct_index;
                  const hasAnswered = studentAnsIdx !== undefined;

                  return (
                    <Paper
                      key={q.id || qIdx}
                      sx={{
                        p: 2,
                        bgcolor: "#1e293b",
                        borderRadius: 2,
                        border: `1px solid ${isCorrect ? "#10b981" : hasAnswered ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="common.white"
                        >
                          Câu {qIdx + 1}: {q.question}
                        </Typography>
                        <Chip
                          label={
                            isCorrect
                              ? "✓ Trả lời Đúng (+10đ)"
                              : hasAnswered
                                ? `❌ Chọn sai (${["A", "B", "C", "D"][studentAnsIdx]})`
                                : "⏳ Chưa chọn"
                          }
                          color={
                            isCorrect
                              ? "success"
                              : hasAnswered
                                ? "error"
                                : "default"
                          }
                          size="small"
                          sx={{ fontWeight: "bold" }}
                        />
                      </Box>

                      <Grid container spacing={1} mt={1}>
                        {Array.isArray(q.options) &&
                          q.options.map((opt: string, optIdx: number) => {
                            const isCorrectOpt = optIdx === q.correct_index;
                            const isStudentOpt = optIdx === studentAnsIdx;

                            return (
                              <Grid item xs={12} sm={6} key={optIdx}>
                                <Box
                                  p={1}
                                  bgcolor={
                                    isStudentOpt
                                      ? isCorrectOpt
                                        ? "rgba(16, 185, 129, 0.25)"
                                        : "rgba(239, 68, 68, 0.25)"
                                      : isCorrectOpt
                                        ? "rgba(16, 185, 129, 0.1)"
                                        : "rgba(255,255,255,0.02)"
                                  }
                                  borderRadius={1}
                                  border={`1px solid ${isStudentOpt ? (isCorrectOpt ? "#10b981" : "#ef4444") : isCorrectOpt ? "rgba(16, 185, 129, 0.5)" : "rgba(255,255,255,0.05)"}`}
                                >
                                  <Typography
                                    variant="caption"
                                    color={
                                      isStudentOpt
                                        ? isCorrectOpt
                                          ? "#10b981"
                                          : "#f87171"
                                        : isCorrectOpt
                                          ? "#10b981"
                                          : "text.secondary"
                                    }
                                    fontWeight={
                                      isStudentOpt || isCorrectOpt
                                        ? "bold"
                                        : "normal"
                                    }
                                  >
                                    {["A", "B", "C", "D"][optIdx]}. {opt}{" "}
                                    {isStudentOpt && "👈 (Em đã chọn)"}{" "}
                                    {isCorrectOpt && "✓ (Đáp án chuẩn)"}
                                  </Typography>
                                </Box>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </Paper>
                  );
                });
              })()}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#0f172a" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedStudent(null)}
            >
              Đóng Xem Chi Tiết
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
