"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FileText,
  Sparkles,
  History,
  Save,
  Download,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  Layers,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { supabase, callGeminiAPI } from '@/lib/api';

export interface MCQQuestion {
  id: number;
  part: 1;
  text: string;
  options: string[];
  correctAnswer: string;
  cognitiveLevel: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  explanation: string;
}

export interface TrueFalseItem {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean; // true: Đúng, false: Sai
  explanation: string;
}

export interface TrueFalseQuestion {
  id: number;
  part: 2;
  context: string;
  items: TrueFalseItem[];
  cognitiveLevel: 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
}

export interface ShortAnswerQuestion {
  id: number;
  part: 3;
  text: string;
  correctValue: string;
  unit?: string;
  cognitiveLevel: 'Vận dụng' | 'Vận dụng cao';
  explanation: string;
}

export interface Exam2025Data {
  id?: string;
  title: string;
  grade: string;
  topic: string;
  durationMinutes: number;
  created_at?: string;
  part1: MCQQuestion[];
  part2: TrueFalseQuestion[];
  part3: ShortAnswerQuestion[];
}

const DEFAULT_EXAM_GRADE_10: Exam2025Data = {
  title: "Đề Kiểm Tra Định Kỳ Hóa Học 10 - Chuẩn Format 2025 BGD&ĐT",
  grade: "10",
  topic: "Cấu Tạo Nguyên Tử, Bảng Tuần Hoàn & Phản Ứng Oxi Hóa - Khử",
  durationMinutes: 45,
  part1: [
    {
      id: 1,
      part: 1,
      text: "Hạt mang điện tích âm trong cấu tạo nguyên tử là:",
      options: ["A. Proton", "B. Neutron", "C. Electron", "D. Hạt nhân"],
      correctAnswer: "C. Electron",
      cognitiveLevel: "Nhận biết",
      explanation: "Trong nguyên tử, proton mang điện tích dương (+), electron mang điện tích âm (-), neutron không mang điện."
    },
    {
      id: 2,
      part: 1,
      text: "Trong bảng tuần hoàn, các nguyên tố nhóm VIIA còn được gọi là nhóm:",
      options: ["A. Kim loại kiềm", "B. Khí hiếm", "C. Kim loại kiềm thổ", "D. Halogen"],
      correctAnswer: "D. Halogen",
      cognitiveLevel: "Nhận biết",
      explanation: "Nhóm VIIA gồm các nguyên tố phi kim điển hình: F, Cl, Br, I, At được gọi là nhóm Halogen."
    },
    {
      id: 3,
      part: 1,
      text: "Trong phản ứng: Fe + CuSO₄ → FeSO₄ + Cu, chất đóng vai trò là chất khử là:",
      options: ["A. Fe", "B. CuSO₄", "C. FeSO₄", "D. Cu"],
      correctAnswer: "A. Fe",
      cognitiveLevel: "Thông hiểu",
      explanation: "Fe có số oxi hóa tăng từ 0 lên +2 trong FeSO₄ nên Fe là chất khử (chất nhường electron)."
    },
    {
      id: 4,
      part: 1,
      text: "Nguyên tử nguyên tố X có cấu hình electron [Ne] 3s² 3p⁵. Vị trí của X trong bảng tuần hoàn là:",
      options: ["A. Ô 17, Chu kì 3, Nhóm VIIA", "B. Ô 7, Chu kì 2, Nhóm VA", "C. Ô 15, Chu kì 3, Nhóm VA", "D. Ô 17, Chu kì 4, Nhóm VIIB"],
      correctAnswer: "A. Ô 17, Chu kì 3, Nhóm VIIA",
      cognitiveLevel: "Thông hiểu",
      explanation: "Z = 10 + 2 + 5 = 17 (Ô 17). Có 3 lớp e (Chu kì 3). Lớp ngoài cùng có 7e hóa trị (Nhóm VIIA)."
    }
  ],
  part2: [
    {
      id: 1,
      part: 2,
      context: "Cho phản ứng hóa học sau xảy ra trong dung dịch: 2KMnO₄ + 16HCl (đặc) → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O.",
      cognitiveLevel: "Vận dụng",
      items: [
        { key: "a", text: "KMnO₄ là chất oxi hóa và HCl là chất khử.", isCorrect: true, explanation: "Mn(+7) giảm xuống Mn(+2) là chất oxi hóa; Cl(-1) tăng lên Cl2(0) là chất khử." },
        { key: "b", text: "Trong 16 phân tử HCl tham gia phản ứng, có 10 phân tử đóng vai trò là chất khử.", isCorrect: true, explanation: "Có 10 nguyên tử Cl(-1) tạo 5Cl2 (0) đóng vai trò chất khử; 6 phân tử HCl còn lại tạo muối KCl và MnCl2 đóng vai trò môi trường." },
        { key: "c", text: "Phản ứng trên thuộc loại phản ứng nhiệt phân muối permanganate.", isCorrect: false, explanation: "Đây là phản ứng oxi hóa - khử điều chế khí chlorine trong phòng thí nghiệm, không phải nhiệt phân." },
        { key: "d", text: "Khi cho 0.1 mol KMnO₄ phản ứng hoàn toàn với lượng dư dung dịch HCl đặc, thể tích khí Cl₂ thu được ở điều kiện chuẩn (25°C, 1 bar) là 6.1975 lít.", isCorrect: true, explanation: "n(Cl2) = 0.1 * 5 / 2 = 0.25 mol -> V = 0.25 * 24.79 = 6.1975 L." }
      ]
    }
  ],
  part3: [
    {
      id: 1,
      part: 3,
      text: "Hòa tan hoàn toàn 5.6 gam kim loại Iron (Fe, M = 56 g/mol) vào dung dịch hydrochloric acid (HCl) dư thu được V lít khí H₂ (ở đkc 25°C, 1 bar). Tính giá trị của V (làm tròn 2 chữ số thập phân):",
      correctValue: "2.48",
      unit: "lít",
      cognitiveLevel: "Vận dụng",
      explanation: "PTHH: Fe + 2HCl -> FeCl2 + H2. n(Fe) = 5.6 / 56 = 0.1 mol -> n(H2) = 0.1 mol -> V = 0.1 * 24.79 = 2.479 ≈ 2.48 L."
    },
    {
      id: 2,
      part: 3,
      text: "Cho phản ứng nhiệt hóa học: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) có ΔᵣH°₂₉₈ = -890.3 kJ. Khi đốt cháy hoàn toàn 3.2 gam methane (CH₄, M = 16 g/mol), lượng nhiệt tỏa ra là bao nhiêu kJ?",
      correctValue: "178.06",
      unit: "kJ",
      cognitiveLevel: "Vận dụng cao",
      explanation: "n(CH4) = 3.2 / 16 = 0.2 mol. Nhiệt tỏa ra = 0.2 * 890.3 = 178.06 kJ."
    }
  ]
};

export default function ExamManager() {
  const [activeSubTab, setActiveSubTab] = useState<'create' | 'grade' | 'history'>('create');
  const [examGrade, setExamGrade] = useState('10');
  const [topic, setTopic] = useState('Phản Ứng Oxi Hóa - Khử, Bảng Tuần Hoàn & Năng Lượng Hóa Học');
  const [duration, setDuration] = useState(45);
  const [isGenerating, setIsGenerating] = useState(false);

  // Current Exam Data
  const [currentExam, setCurrentExam] = useState<Exam2025Data>(DEFAULT_EXAM_GRADE_10);
  const [savedExams, setSavedExams] = useState<Exam2025Data[]>([]);

  // Student Test Answers
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<string, 'true' | 'false'>>({}); // key e.g. "1_a"
  const [shortAnswers, setShortAnswers] = useState<Record<number, string>>({});

  // Grading Result State
  const [gradingResult, setGradingResult] = useState<{
    totalScore: number;
    part1Score: number;
    part2Score: number;
    part3Score: number;
    details: { part: string; text: string; scoreStr: string; isCorrect: boolean }[];
  } | null>(null);

  useEffect(() => {
    fetchSavedExams();
  }, []);

  const fetchSavedExams = async () => {
    try {
      const { data } = await supabase
        .from("experiments")
        .select("*")
        .like("cache_key", "exam_2025_%")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data && data.length > 0) {
        setSavedExams(data.map(item => item.result_json));
      }
    } catch (e) {
      console.warn("Fetch saved exams error:", e);
    }
  };

  const handleGenerateExam = async () => {
    setIsGenerating(true);
    const prompt = `Soạn 1 đề thi Hóa học Lớp ${examGrade} chủ đề: "${topic}" theo đúng QUY CHUẨN ĐỊNH DẠNG ĐỀ THI MỚI NĂM 2025 CỦA BỘ GIÁO DỤC & ĐÀO TẠO.
Cấu trúc gồm 3 phần bắt buộc:
- PHẦN I: Gồm 4 câu trắc nghiệm nhiều lựa chọn (4 lựa chọn A, B, C, D; mỗi câu có 1 đáp án đúng duy nhất).
- PHẦN II: Gồm 2 câu trắc nghiệm Đúng/Sai (Mỗi câu có 1 đoạn ngữ cảnh thực nghiệm/lý thuyết và 4 mệnh đề a, b, c, d; mỗi mệnh đề chỉ rõ isCorrect: true/false).
- PHẦN III: Gồm 2 câu trắc nghiệm trả lời ngắn (Điền số tính toán hoặc công thức ngắn).

Trả về DUY NHẤT một chuỗi JSON thuần túy (không dùng markdown codeblock, không thêm text ngoài):
{
  "title": "Đề Kiểm Tra Hóa Học Lớp ${examGrade} - ${topic}",
  "grade": "${examGrade}",
  "topic": "${topic}",
  "durationMinutes": ${duration},
  "part1": [
    {
      "id": 1,
      "part": 1,
      "text": "Câu hỏi...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "A. ...",
      "cognitiveLevel": "Nhận biết",
      "explanation": "Giải thích..."
    }
  ],
  "part2": [
    {
      "id": 1,
      "part": 2,
      "context": "Đoạn văn mô tả thí nghiệm hoặc dữ kiện...",
      "cognitiveLevel": "Vận dụng",
      "items": [
        { "key": "a", "text": "Mệnh đề 1...", "isCorrect": true, "explanation": "Giải thích a..." },
        { "key": "b", "text": "Mệnh đề 2...", "isCorrect": false, "explanation": "Giải thích b..." },
        { "key": "c", "text": "Mệnh đề 3...", "isCorrect": true, "explanation": "Giải thích c..." },
        { "key": "d", "text": "Mệnh đề 4...", "isCorrect": false, "explanation": "Giải thích d..." }
      ]
    }
  ],
  "part3": [
    {
      "id": 1,
      "part": 3,
      "text": "Bài toán yêu cầu tính...",
      "correctValue": "2.48",
      "unit": "lít",
      "cognitiveLevel": "Vận dụng",
      "explanation": "Lời giải chi tiết..."
    }
  ]
}`;

    try {
      const responseText = await callGeminiAPI(prompt);
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed: Exam2025Data = JSON.parse(match[0]);
        parsed.id = "ex_" + Date.now();
        parsed.created_at = new Date().toISOString();
        setCurrentExam(parsed);
        saveExamToSupabaseDB(parsed);
      }
    } catch (e) {
      console.warn("AI generation fallback to default exam:", e);
      setCurrentExam(DEFAULT_EXAM_GRADE_10);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveExamToSupabaseDB = async (examObj: Exam2025Data) => {
    const cacheKey = `exam_2025_${examObj.grade}_${Date.now()}`;
    try {
      await supabase.from("experiments").upsert({ cache_key: cacheKey, result_json: examObj });
      setSavedExams(prev => [examObj, ...prev]);
    } catch (e) {
      console.warn("Save exam DB error:", e);
    }
  };

  // Official BGD 2025 Graduated Scoring for Part II
  // 1 correct item = 0.10 pt, 2 correct = 0.25 pt, 3 correct = 0.50 pt, 4 correct = 1.00 pt
  const calculatePart2QuestionScore = (correctCount: number) => {
    if (correctCount === 1) return 0.10;
    if (correctCount === 2) return 0.25;
    if (correctCount === 3) return 0.50;
    if (correctCount === 4) return 1.00;
    return 0;
  };

  // Execute Auto Grading
  const handleGradeExam = () => {
    let p1Score = 0;
    let p2Score = 0;
    let p3Score = 0;
    const details: { part: string; text: string; scoreStr: string; isCorrect: boolean }[] = [];

    // Grade Part I (Each correct = 0.25 pt)
    currentExam.part1.forEach((q) => {
      const userAns = mcqAnswers[q.id];
      const isCorrect = userAns && (userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() || q.correctAnswer.startsWith(userAns.substring(0, 2)));
      if (isCorrect) {
        p1Score += 0.25;
        details.push({ part: 'Phần I', text: `Câu ${q.id}: ${q.text.substring(0, 50)}...`, scoreStr: '+0.25đ', isCorrect: true });
      } else {
        details.push({ part: 'Phần I', text: `Câu ${q.id}: Đáp án đúng là "${q.correctAnswer}"`, scoreStr: '0đ', isCorrect: false });
      }
    });

    // Grade Part II (Graduated 0.1 - 0.25 - 0.5 - 1.0 pt)
    currentExam.part2.forEach((q) => {
      let correctItemsCount = 0;
      q.items.forEach((item) => {
        const userChoice = tfAnswers[`${q.id}_${item.key}`];
        const expected = item.isCorrect ? 'true' : 'false';
        if (userChoice === expected) {
          correctItemsCount++;
        }
      });
      const qScore = calculatePart2QuestionScore(correctItemsCount);
      p2Score += qScore;
      details.push({
        part: 'Phần II',
        text: `Câu ${q.id} (Đúng ${correctItemsCount}/4 ý): ${q.context.substring(0, 60)}...`,
        scoreStr: `+${qScore.toFixed(2)}đ`,
        isCorrect: correctItemsCount === 4
      });
    });

    // Grade Part III (Each correct = 0.25 pt)
    currentExam.part3.forEach((q) => {
      const userVal = (shortAnswers[q.id] || '').trim().replace(',', '.');
      const expectedVal = q.correctValue.trim().replace(',', '.');
      const isCorrect = userVal === expectedVal || Math.abs(parseFloat(userVal) - parseFloat(expectedVal)) < 0.05;
      if (isCorrect) {
        p3Score += 0.25;
        details.push({ part: 'Phần III', text: `Câu ${q.id}: ${q.text.substring(0, 50)}...`, scoreStr: '+0.25đ', isCorrect: true });
      } else {
        details.push({ part: 'Phần III', text: `Câu ${q.id}: Đáp án chuẩn là "${q.correctValue} ${q.unit || ''}"`, scoreStr: '0đ', isCorrect: false });
      }
    });

    const totalScore = Math.round((p1Score + p2Score + p3Score) * 100) / 100;
    setGradingResult({
      totalScore,
      part1Score: p1Score,
      part2Score: p2Score,
      part3Score: p3Score,
      details,
    });
  };

  // Export to Print / HTML Document
  const handlePrintExam = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', borderRadius: 3.5, border: '1px solid rgba(56, 189, 248, 0.2)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header Title */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2} mb={3}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
              }}
            >
              <FileText size={24} color="#38bdf8" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#38bdf8', fontSize: { xs: '17px', sm: '20px' } }}>
                Soạn & Chấm Đề Thi Hóa Học Chuẩn Format Mới 2025 BGD&ĐT
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Đầy đủ 3 phần: Trắc nghiệm 4 lựa chọn • Trắc nghiệm Đúng/Sai 4 ý (0.1 - 0.25 - 0.5 - 1.0đ) • Trả lời ngắn
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant={activeSubTab === 'create' ? 'contained' : 'outlined'}
              onClick={() => setActiveSubTab('create')}
              size="small"
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '13px' }}
            >
              Tạo Đề Thi Tự Động
            </Button>
            <Button
              variant={activeSubTab === 'grade' ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => setActiveSubTab('grade')}
              size="small"
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '13px' }}
            >
              Làm Bài & Chấm Điểm
            </Button>
            <Button
              variant={activeSubTab === 'history' ? 'contained' : 'outlined'}
              color="warning"
              onClick={() => setActiveSubTab('history')}
              size="small"
              startIcon={<History size={15} />}
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '13px' }}
            >
              Kho Đề ({savedExams.length})
            </Button>
          </Stack>
        </Box>

        {/* SUBTAB: HISTORY */}
        {activeSubTab === 'history' && (
          <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#0f172a', borderRadius: 2.5, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Typography variant="subtitle2" color="#fbbf24" fontWeight="bold" mb={2}>
              📜 Danh Sách Đề Thi Chuẩn 2025 Đã Lưu Trong CSDL:
            </Typography>
            <Stack spacing={1.5}>
              {savedExams.length === 0 ? (
                <Typography variant="body2" color="text.secondary">Chưa có đề thi nào trong CSDL.</Typography>
              ) : (
                savedExams.map((ex, idx) => (
                  <Paper
                    key={ex.id || idx}
                    onClick={() => { setCurrentExam(ex); setActiveSubTab('create'); }}
                    sx={{
                      p: 2,
                      bgcolor: '#1e293b',
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'all 0.2s ease',
                      '&:hover': { border: '1px solid #38bdf8', transform: 'translateX(4px)' }
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.8}>
                      <Typography variant="subtitle2" fontWeight="bold" color="common.white">{ex.title}</Typography>
                      <Chip label={`Khối ${ex.grade} • ${ex.durationMinutes || 45} phút`} size="small" color="primary" sx={{ height: 22, fontSize: 11, fontWeight: 'bold' }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Chủ đề: <b>{ex.topic}</b> | Phần I: {ex.part1?.length || 0} câu | Phần II: {ex.part2?.length || 0} câu | Phần III: {ex.part3?.length || 0} câu
                    </Typography>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>
        )}

        {/* SUBTAB: CREATE & VIEW EXAM */}
        {activeSubTab === 'create' && (
          <Grid container spacing={3}>
            {/* Left: AI Generator Controls */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2.5, bgcolor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: 2.5 }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#38bdf8" mb={2} display="flex" alignItems="center" gap={1}>
                  <Sparkles size={18} /> Cấu Hình Soạn Đề 2025
                </Typography>
                <Stack spacing={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Khối Lớp</InputLabel>
                    <Select value={examGrade} label="Khối Lớp" onChange={(e) => setExamGrade(e.target.value)}>
                      <MenuItem value="10">Hóa Học 10 (GDPT 2018)</MenuItem>
                      <MenuItem value="11">Hóa Học 11 (GDPT 2018)</MenuItem>
                      <MenuItem value="12">Hóa Học 12 (GDPT 2018)</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Chủ đề bài học / Chuyên đề"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    size="small"
                  />

                  <FormControl fullWidth size="small">
                    <InputLabel>Thời Lượng Làm Bài</InputLabel>
                    <Select value={duration} label="Thời Lượng Làm Bài" onChange={(e) => setDuration(Number(e.target.value))}>
                      <MenuItem value={15}>15 Phút (Kiểm tra nhanh)</MenuItem>
                      <MenuItem value={45}>45 Phút (Kiểm tra định kỳ)</MenuItem>
                      <MenuItem value={50}>50 Phút (Thi Học kỳ / Khảo sát)</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Sparkles size={18} />}
                    onClick={handleGenerateExam}
                    disabled={isGenerating}
                    sx={{ py: 1.2, fontWeight: 'bold', textTransform: 'none', borderRadius: 2 }}
                  >
                    {isGenerating ? "Đang Soạn Đề Tự Động..." : "Tạo & Lưu Đề Thi Chuẩn 2025"}
                  </Button>

                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                  {/* Cognitive Matrix Box */}
                  <Box p={1.5} borderRadius={2} bgcolor="rgba(0, 0, 0, 0.3)" border="1px solid rgba(255, 255, 255, 0.05)">
                    <Typography variant="caption" fontWeight="bold" color="#38bdf8" display="block" mb={1}>
                      📊 MA TRẬN 4 MỨC ĐỘ NHẬN THỨC:
                    </Typography>
                    <Stack spacing={0.5}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">1. Nhận biết (40%):</Typography>
                        <Chip label="4 câu Phần I" size="small" sx={{ height: 18, fontSize: 10 }} />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">2. Thông hiểu (30%):</Typography>
                        <Chip label="2 câu P.I + P.II" size="small" sx={{ height: 18, fontSize: 10 }} />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">3. Vận dụng (20%):</Typography>
                        <Chip label="P.II + P.III" size="small" sx={{ height: 18, fontSize: 10 }} />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">4. Vận dụng cao (10%):</Typography>
                        <Chip label="Câu khó P.III" size="small" sx={{ height: 18, fontSize: 10 }} />
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Right: Render 3-Part Exam Paper */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#020617', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 2.5 }}>
                {/* Exam Title & Action Bar */}
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5} pb={2} mb={2.5} borderBottom="1px solid rgba(255, 255, 255, 0.1)">
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="white">
                      {currentExam.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Khối: <b>Lớp {currentExam.grade}</b> • Thời gian: <b>{currentExam.durationMinutes} phút</b> (Không kể thời gian phát đề)
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<Printer size={16} />}
                    onClick={handlePrintExam}
                    size="small"
                    sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', textTransform: 'none', borderRadius: 2 }}
                  >
                    In / Lưu PDF
                  </Button>
                </Box>

                {/* --- PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN --- */}
                <Box mb={3.5}>
                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <Chip label="PHẦN I" color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                    <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8">
                      CÂU HỎI TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN ({currentExam.part1?.length || 0} CÂU)
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    <i>Thí sinh chọn một phương án đúng nhất từ A, B, C hoặc D. Mỗi câu đúng được 0.25 điểm.</i>
                  </Typography>

                  <Stack spacing={2}>
                    {currentExam.part1?.map((q, idx) => (
                      <Paper key={q.id || idx} sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1} mb={1}>
                          <Typography variant="body2" fontWeight="bold" color="white">
                            Câu {idx + 1}: {q.text}
                          </Typography>
                          <Chip label={q.cognitiveLevel} size="small" sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }} />
                        </Box>
                        <Grid container spacing={1} mb={1.5}>
                          {q.options?.map((opt, oIdx) => (
                            <Grid item xs={12} sm={6} key={oIdx}>
                              <Typography variant="caption" color={opt.startsWith(q.correctAnswer.substring(0, 2)) ? '#34d399' : 'text.secondary'} sx={{ fontSize: '12.5px', fontWeight: opt.startsWith(q.correctAnswer.substring(0, 2)) ? 'bold' : 'normal' }}>
                                {opt}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', my: 1 }} />
                        <Typography variant="caption" color="#10b981" fontWeight="bold" display="block">
                          ✓ Đáp án đúng: {q.correctAnswer}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          💡 Giải thích: {q.explanation}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>

                {/* --- PHẦN II: TRẮC NGHIỆM ĐÚNG/SAI --- */}
                <Box mb={3.5}>
                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <Chip label="PHẦN II" color="warning" size="small" sx={{ fontWeight: 'bold' }} />
                    <Typography variant="subtitle2" fontWeight="bold" color="#fbbf24">
                      CÂU HỎI TRẮC NGHIỆM ĐÚNG / SAI ({currentExam.part2?.length || 0} CÂU)
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    <i>Thí sinh chọn Đúng hoặc Sai cho mỗi ý a), b), c), d). Điểm chuẩn: Đúng 1 ý: 0.1đ • Đúng 2 ý: 0.25đ • Đúng 3 ý: 0.5đ • Đúng 4 ý: 1.0đ.</i>
                  </Typography>

                  <Stack spacing={2.5}>
                    {currentExam.part2?.map((q, idx) => (
                      <Paper key={q.id || idx} sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1} mb={1}>
                          <Typography variant="body2" fontWeight="bold" color="#fbbf24">
                            Câu {idx + 1}:
                          </Typography>
                          <Chip label={q.cognitiveLevel} size="small" color="warning" sx={{ height: 20, fontSize: 10 }} />
                        </Box>
                        <Typography variant="body2" color="white" mb={1.5} sx={{ fontStyle: 'italic' }}>
                          "{q.context}"
                        </Typography>

                        <Stack spacing={1}>
                          {q.items?.map((item) => (
                            <Box key={item.key} p={1} borderRadius={1.5} bgcolor="rgba(0, 0, 0, 0.25)" display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                              <Typography variant="caption" color="white" sx={{ fontSize: '12.5px', maxWidth: '75%' }}>
                                <b>{item.key})</b> {item.text}
                              </Typography>
                              <Chip
                                label={item.isCorrect ? "ĐÚNG" : "SAI"}
                                size="small"
                                sx={{
                                  height: 22,
                                  fontWeight: 'bold',
                                  fontSize: '11px',
                                  bgcolor: item.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                  color: item.isCorrect ? '#34d399' : '#f87171',
                                  border: `1px solid ${item.isCorrect ? '#10b981' : '#ef4444'}`,
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Box>

                {/* --- PHẦN III: TRẮC NGHIỆM TRẢ LỜI NGẮN --- */}
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <Chip label="PHẦN III" color="secondary" size="small" sx={{ fontWeight: 'bold' }} />
                    <Typography variant="subtitle2" fontWeight="bold" color="#c084fc">
                      CÂU HỎI TRẮC NGHIỆM TRẢ LỜI NGẮN ({currentExam.part3?.length || 0} CÂU)
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    <i>Thí sinh điền kết quả tính toán hoặc công thức vào ô trả lời. Mỗi câu đúng được 0.25 điểm.</i>
                  </Typography>

                  <Stack spacing={2}>
                    {currentExam.part3?.map((q, idx) => (
                      <Paper key={q.id || idx} sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2, border: '1px solid rgba(192, 132, 252, 0.2)' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1} mb={1}>
                          <Typography variant="body2" fontWeight="bold" color="white">
                            Câu {idx + 1}: {q.text}
                          </Typography>
                          <Chip label={q.cognitiveLevel} size="small" sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }} />
                        </Box>
                        <Typography variant="caption" color="#c084fc" fontWeight="bold" display="block" mt={0.5}>
                          ✓ Giá trị chuẩn: <b>{q.correctValue}</b> {q.unit || ''}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          💡 Hướng dẫn giải: {q.explanation}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* SUBTAB: STUDENT TEST TAKER & AUTO GRADER */}
        {activeSubTab === 'grade' && (
          <Paper sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#090d16', borderRadius: 3, border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <Box mb={2.5} pb={1.5} borderBottom="1px solid rgba(255, 255, 255, 0.1)">
              <Typography variant="h6" fontWeight="bold" color="#818cf8">
                📝 Học Sinh Làm Bài Thi & Hệ Thống Chấm Điểm 2025
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Đề thi: <b>{currentExam.title}</b> • Thời gian: <b>{currentExam.durationMinutes} phút</b>
              </Typography>
            </Box>

            {/* Test Taking Form */}
            <Stack spacing={3}>
              {/* Part 1 Interactive */}
              <Box>
                <Typography variant="subtitle2" color="#38bdf8" fontWeight="bold" mb={1.5}>
                  PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN
                </Typography>
                <Stack spacing={1.5}>
                  {currentExam.part1?.map((q, idx) => (
                    <Paper key={q.id || idx} sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2 }}>
                      <Typography variant="body2" fontWeight="bold" color="white" mb={1}>
                        Câu {idx + 1}: {q.text}
                      </Typography>
                      <RadioGroup
                        value={mcqAnswers[q.id] || ''}
                        onChange={(e) => setMcqAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      >
                        <Grid container spacing={1}>
                          {q.options?.map((opt, oIdx) => (
                            <Grid item xs={12} sm={6} key={oIdx}>
                              <FormControlLabel
                                value={opt}
                                control={<Radio size="small" />}
                                label={<Typography variant="caption" sx={{ fontSize: '13px' }}>{opt}</Typography>}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </RadioGroup>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Part 2 Interactive */}
              <Box>
                <Typography variant="subtitle2" color="#fbbf24" fontWeight="bold" mb={1.5}>
                  PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI
                </Typography>
                <Stack spacing={2}>
                  {currentExam.part2?.map((q, idx) => (
                    <Paper key={q.id || idx} sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2 }}>
                      <Typography variant="body2" fontWeight="bold" color="#fbbf24" mb={1}>
                        Câu {idx + 1}: {q.context}
                      </Typography>
                      <Stack spacing={1.5}>
                        {q.items?.map((item) => {
                          const stateKey = `${q.id}_${item.key}`;
                          const val = tfAnswers[stateKey] || '';
                          return (
                            <Box key={item.key} p={1} borderRadius={1.5} bgcolor="rgba(0, 0, 0, 0.3)" display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                              <Typography variant="caption" color="white" sx={{ fontSize: '13px', maxWidth: '70%' }}>
                                <b>{item.key})</b> {item.text}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                <Button
                                  size="small"
                                  variant={val === 'true' ? 'contained' : 'outlined'}
                                  color="success"
                                  onClick={() => setTfAnswers(prev => ({ ...prev, [stateKey]: 'true' }))}
                                  sx={{ minWidth: 60, height: 28, fontSize: '11px', fontWeight: 'bold' }}
                                >
                                  Đúng
                                </Button>
                                <Button
                                  size="small"
                                  variant={val === 'false' ? 'contained' : 'outlined'}
                                  color="error"
                                  onClick={() => setTfAnswers(prev => ({ ...prev, [stateKey]: 'false' }))}
                                  sx={{ minWidth: 60, height: 28, fontSize: '11px', fontWeight: 'bold' }}
                                >
                                  Sai
                                </Button>
                              </Stack>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Part 3 Interactive */}
              <Box>
                <Typography variant="subtitle2" color="#c084fc" fontWeight="bold" mb={1.5}>
                  PHẦN III: TRẮC NGHIỆM TRẢ LỜI NGẮN
                </Typography>
                <Stack spacing={1.5}>
                  {currentExam.part3?.map((q, idx) => (
                    <Paper key={q.id || idx} sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2 }}>
                      <Typography variant="body2" fontWeight="bold" color="white" mb={1.5}>
                        Câu {idx + 1}: {q.text}
                      </Typography>
                      <TextField
                        size="small"
                        placeholder={`Nhập đáp án số hoặc công thức (${q.unit || 'giá trị'})...`}
                        value={shortAnswers[q.id] || ''}
                        onChange={(e) => setShortAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                        sx={{ bgcolor: 'rgba(0, 0, 0, 0.4)', borderRadius: 1.5, maxWidth: 300 }}
                      />
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Stack>

            <Box mt={3} pt={2} borderTop="1px solid rgba(255, 255, 255, 0.1)">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleGradeExam}
                sx={{ py: 1.4, fontWeight: 'bold', fontSize: '15px', borderRadius: 2 }}
              >
                Nộp Bài & Chấm Điểm Chuẩn BGD 2025
              </Button>
            </Box>

            {/* Grading Results Panel */}
            {gradingResult && (
              <Box mt={3} p={2.5} bgcolor="rgba(15, 23, 42, 0.9)" borderRadius={2.5} border="1px solid #38bdf8">
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} mb={2}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Award size={28} color="#38bdf8" />
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#38bdf8' }}>
                      Tổng Điểm: {gradingResult.totalScore} / 10.0 Điểm
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Chip label={`P.I: ${gradingResult.part1Score.toFixed(2)}đ`} color="primary" size="small" />
                    <Chip label={`P.II: ${gradingResult.part2Score.toFixed(2)}đ`} color="warning" size="small" />
                    <Chip label={`P.III: ${gradingResult.part3Score.toFixed(2)}đ`} color="secondary" size="small" />
                  </Stack>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 2 }} />

                <Typography variant="subtitle2" color="white" fontWeight="bold" mb={1}>
                  Bảng Chi Tiết Điểm Từng Câu:
                </Typography>
                <Stack spacing={1}>
                  {gradingResult.details.map((d, dIdx) => (
                    <Box
                      key={dIdx}
                      p={1.2}
                      borderRadius={1.5}
                      bgcolor={d.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
                      border={`1px solid ${d.isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        {d.isCorrect ? <CheckCircle2 size={16} color="#34d399" /> : <XCircle size={16} color="#f87171" />}
                        <Typography variant="caption" color="white" sx={{ fontSize: '12px' }}>
                          <b>[{d.part}]</b> {d.text}
                        </Typography>
                      </Box>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: d.isCorrect ? '#34d399' : '#f87171' }}>
                        {d.scoreStr}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
        )}
      </CardContent>
    </Card>
  );
}
