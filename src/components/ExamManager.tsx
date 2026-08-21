"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel, Paper, RadioGroup, FormControlLabel, Radio, Stack, Chip, Divider } from '@mui/material';
import { FileText, Sparkles, History, Save } from 'lucide-react';
import { supabase, callGeminiAPI } from '@/lib/api';

interface Question {
  id: number;
  type: 'mcq' | 'tf' | 'short';
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

interface SavedExam {
  id?: string;
  title: string;
  grade: string;
  topic: string;
  questions_json: Question[];
  created_at?: string;
}

export default function ExamManager() {
  const [activeSubTab, setActiveSubTab] = useState<'create' | 'grade' | 'history'>('create');
  const [examGrade, setExamGrade] = useState('10');
  const [topic, setTopic] = useState('Phản Ứng Oxi Hóa - Khử & Tốc Độ Phản Ứng');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto Grading state
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({});
  const [gradingResult, setGradingResult] = useState<{ score: number; total: number; details: string[] } | null>(null);

  // Saved Exams History State
  const [savedExams, setSavedExams] = useState<SavedExam[]>([]);

  useEffect(() => {
    fetchSavedExams();
  }, []);

  const fetchSavedExams = async () => {
    try {
      const { data } = await supabase.from("experiments").select("*").like("cache_key", "exam_paper_%").order("created_at", { ascending: false }).limit(20);
      if (data) {
        setSavedExams(data.map(item => item.result_json));
      }
    } catch (e) {
      console.warn("Fetch saved exams error:", e);
    }
  };

  const handleGenerateExam = async () => {
    setIsGenerating(true);
    const prompt = `Tạo bộ ${numQuestions} câu hỏi kiểm tra Hóa học Lớp ${examGrade} chủ đề "${topic}" (Format mới 2025: Trắc nghiệm 4 lựa chọn, Đúng/Sai, Điền từ ngắn). Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):
[
  {
    "id": 1,
    "type": "mcq",
    "text": "Nội dung câu hỏi...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "correctAnswer": "A. ...",
    "explanation": "Giải thích chi tiết..."
  }
]`;

    try {
      const responseText = await callGeminiAPI(prompt);
      const match = responseText.match(/\[[\s\S]*\]/);
      if (match) {
        const parsed: Question[] = JSON.parse(match[0]);
        setQuestions(parsed);
        saveExamToSupabaseDB(`Đề thi Hóa ${examGrade} - ${topic}`, examGrade, topic, parsed);
      }
    } catch (e) {
      const fallback: Question[] = [
        {
          id: 1,
          type: 'mcq',
          text: 'Dung dịch nào sau đây làm quỳ tím chuyển sang màu đỏ?',
          options: ['A. NaOH', 'B. HCl', 'C. NaCl', 'D. C₂H₅OH'],
          correctAnswer: 'B. HCl',
          explanation: 'Dung dịch HCl có tính axit làm quỳ tím chuyển sang màu đỏ.'
        },
        {
          id: 2,
          type: 'mcq',
          text: 'Chất nào sau đây là chất điện li mạnh?',
          options: ['A. CH₃COOH', 'B. H₂O', 'C. HNO₃', 'D. NH₃'],
          correctAnswer: 'C. HNO₃',
          explanation: 'HNO₃ là axit mạnh phân li hoàn toàn trong nước thành H⁺ và NO₃⁻.'
        }
      ];
      setQuestions(fallback);
      saveExamToSupabaseDB(`Đề thi Hóa ${examGrade} - ${topic}`, examGrade, topic, fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveExamToSupabaseDB = async (title: string, g: string, t: string, qs: Question[]) => {
    const examObj: SavedExam = {
      id: "ex_" + Date.now(),
      title,
      grade: g,
      topic: t,
      questions_json: qs,
      created_at: new Date().toISOString()
    };
    const cacheKey = `exam_paper_${t.replace(/[^a-zA-Z0-9]/g, "")}_${Date.now()}`;

    try {
      await supabase.from("experiments").upsert({ cache_key: cacheKey, result_json: examObj });
      setSavedExams(prev => [examObj, ...prev]);
    } catch (e) {
      console.warn("Save exam DB error:", e);
    }
  };

  const handleStudentAnswerChange = (qId: number, ans: string) => {
    setStudentAnswers(prev => ({ ...prev, [qId]: ans }));
  };

  const handleGradeExam = () => {
    let score = 0;
    const details: string[] = [];

    questions.forEach((q) => {
      const studentAns = studentAnswers[q.id];
      const isCorrect = studentAns && (studentAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase() || q.correctAnswer.includes(studentAns));
      if (isCorrect) {
        score += 2; // Each question 2 points
        details.push(`Câu ${q.id}: Đúng (+2đ)`);
      } else {
        details.push(`Câu ${q.id}: Sai (0đ) - Đáp án chuẩn: ${q.correctAnswer}`);
      }
    });

    setGradingResult({ score, total: questions.length * 2, details });
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={1.5}
          mb={2.5}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <FileText color="#0284c7" size={22} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Soạn & Chấm Bài Kiểm Tra Hóa Học
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button
              variant={activeSubTab === 'create' ? 'contained' : 'outlined'}
              onClick={() => setActiveSubTab('create')}
              size="small"
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}
            >
              Tạo Đề Thi AI
            </Button>
            <Button
              variant={activeSubTab === 'grade' ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => setActiveSubTab('grade')}
              size="small"
              disabled={questions.length === 0}
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}
            >
              Chấm Bài Thi ({questions.length})
            </Button>
            <Button
              variant={activeSubTab === 'history' ? 'contained' : 'outlined'}
              color="warning"
              onClick={() => setActiveSubTab('history')}
              size="small"
              startIcon={<History size={15} />}
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}
            >
              Lịch Sử ({savedExams.length})
            </Button>
          </Stack>
        </Box>

        {activeSubTab === 'history' && (
          <Paper sx={{ p: { xs: 1.5, sm: 2.5 }, bgcolor: '#0f172a', borderRadius: 2 }}>
            <Typography variant="subtitle2" color="amber" fontWeight="bold" mb={1.5} sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
              📜 Danh Sách Đề Thi Đã Lưu Trong CSDL Supabase
            </Typography>
            <Stack spacing={1}>
              {savedExams.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>Chưa có đề thi nào trong CSDL.</Typography>
              ) : (
                savedExams.map((ex, idx) => (
                  <Paper
                    key={ex.id || idx}
                    onClick={() => { setQuestions(ex.questions_json); setTopic(ex.topic); setActiveSubTab('create'); }}
                    sx={{ p: 1.5, bgcolor: '#1e293b', borderRadius: 2, cursor: 'pointer', '&:hover': { border: '1px solid #f59e0b' } }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="bold" color="common.white" sx={{ fontSize: '13.5px' }}>{ex.title}</Typography>
                      <Chip label={`Khối ${ex.grade} - ${ex.questions_json?.length || 0} câu`} size="small" color="primary" sx={{ height: 20, fontSize: 10 }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                      Chủ đề: {ex.topic} | Tạo lúc: {ex.created_at ? new Date(ex.created_at).toLocaleString('vi-VN') : 'Mới đây'}
                    </Typography>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>
        )}

        {activeSubTab === 'create' && (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: 'background.default', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1.5} sx={{ fontSize: { xs: '14px', sm: '16px' } }}>
                  🎯 Cấu Hình Đề Thi
                </Typography>
                <Stack spacing={1.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Khối Lớp</InputLabel>
                    <Select value={examGrade} label="Khối Lớp" onChange={(e) => setExamGrade(e.target.value)}>
                      <MenuItem value="10">Lớp 10 THPT</MenuItem>
                      <MenuItem value="11">Lớp 11 THPT</MenuItem>
                      <MenuItem value="12">Lớp 12 THPT</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Chủ đề / Bài học"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Số lượng câu hỏi"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Sparkles size={18} />}
                    onClick={handleGenerateExam}
                    disabled={isGenerating}
                    sx={{ py: 1.2, fontWeight: 'bold', textTransform: 'none', fontSize: { xs: '13.5px', sm: '14.5px' } }}
                  >
                    {isGenerating ? "AI Đang Soạn Đề..." : "Tạo & Lưu Đề Thi AI"}
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              {questions.length > 0 ? (
                <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#020617', border: '1px solid #1e293b', maxHeight: 600, overflowY: 'auto', borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="cyan" mb={1.5} sx={{ fontSize: { xs: '14px', sm: '16px' } }}>
                    📋 Danh Sách Câu Hỏi ({questions.length} Câu)
                  </Typography>
                  <Stack spacing={2}>
                    {questions.map((q, idx) => (
                      <Box key={q.id || idx} p={1.5} bgcolor="#0f172a" borderRadius={2} border="1px solid rgba(255,255,255,0.06)">
                        <Typography variant="subtitle2" fontWeight="bold" color="common.white" mb={1} sx={{ fontSize: '13.5px' }}>
                          Câu {idx + 1}: {q.text}
                        </Typography>
                        {q.options && q.options.length > 0 && (
                          <Grid container spacing={1} mb={1}>
                            {q.options.map((opt, oIdx) => (
                              <Grid item xs={12} sm={6} key={oIdx}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '12px' }}>
                                  {opt}
                                </Typography>
                              </Grid>
                            ))}
                          </Grid>
                        )}
                        <Typography variant="caption" color="emerald.main" fontWeight="bold" display="block">
                          ✓ Đáp án: {q.correctAnswer}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mt={0.5} sx={{ fontSize: '11px' }}>
                          💡 Giải thích: {q.explanation}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={{ xs: 200, sm: 320 }} bgcolor="background.default" borderRadius={2} border="1px dashed rgba(255,255,255,0.1)" p={2} textAlign="center">
                  <Typography color="text.secondary" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                    Cấu hình đề thi bên trái và nhấn <b>"Tạo & Lưu Đề Thi AI"</b> để bắt đầu.
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        )}

        {activeSubTab === 'grade' && (
          <Paper sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#0f172a', borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="secondary.main" mb={2} sx={{ fontSize: { xs: '15px', sm: '17px' } }}>
              📝 Học Sinh Làm Bài & Chấm Điểm Tự Động
            </Typography>

            <Stack spacing={2} mb={3}>
              {questions.map((q, idx) => (
                <Paper key={q.id || idx} sx={{ p: 1.5, bgcolor: '#1e293b', borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="common.white" mb={1} sx={{ fontSize: '13.5px' }}>
                    Câu {idx + 1}: {q.text}
                  </Typography>

                  {q.options && q.options.length > 0 ? (
                    <RadioGroup
                      value={studentAnswers[q.id] || ''}
                      onChange={(e) => handleStudentAnswerChange(q.id, e.target.value)}
                    >
                      <Grid container spacing={0.5}>
                        {q.options.map((opt, oIdx) => (
                          <Grid item xs={12} sm={6} key={oIdx}>
                            <FormControlLabel
                              value={opt}
                              control={<Radio size="small" />}
                              label={<Typography variant="body2" sx={{ fontSize: '13px' }}>{opt}</Typography>}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  ) : (
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Nhập câu trả lời..."
                      value={studentAnswers[q.id] || ''}
                      onChange={(e) => handleStudentAnswerChange(q.id, e.target.value)}
                    />
                  )}
                </Paper>
              ))}
            </Stack>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleGradeExam}
              sx={{ py: 1.2, fontWeight: 'bold', textTransform: 'none', fontSize: { xs: '14px', sm: '15px' } }}
            >
              Chấm Điểm Bài Thi Tự Động
            </Button>

            {gradingResult && (
              <Box mt={3} p={2} bgcolor="rgba(56, 189, 248, 0.15)" borderRadius={2} border="1px solid #38bdf8">
                <Typography variant="h6" fontWeight="bold" color="cyan" mb={1} sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                  🏆 Kết Quả: {gradingResult.score} / {gradingResult.total} Điểm
                </Typography>
                <Stack spacing={0.5}>
                  {gradingResult.details.map((d, dIdx) => (
                    <Typography key={dIdx} variant="caption" color="text.secondary" display="block" sx={{ fontSize: '12px' }}>
                      {d}
                    </Typography>
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
