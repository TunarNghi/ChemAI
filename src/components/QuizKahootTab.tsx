"use client";

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Paper, Stack,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert
} from '@mui/material';
import { Trophy, Flame, Play, Users, Lock, ShieldCheck, RefreshCw, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { supabase, callGeminiAPI } from '@/lib/api';
import { cleanChemicalLatex } from '@/components/AuditTab';
import { UserProfile, getStoredCurrentUser, saveStoredCurrentUser } from '@/components/UserAuthModal';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function QuizKahootTab() {
  const [mode, setMode] = useState<'single' | 'kahoot'>('single');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Kahoot State
  const [pin, setPin] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [kahootScore, setKahootScore] = useState<number>(0);
  const [joinErrorMsg, setJoinErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const user = getStoredCurrentUser();
    if (user && !nickname) {
      setNickname(user.nickname || user.fullName);
    }
  }, []);

  useEffect(() => {
    if (mode === 'single' && !currentQuiz) {
      loadNextQuiz();
    }
  }, [mode]);

  const loadNextQuiz = async () => {
    setIsLoading(true);
    setIsAnswered(false);
    setSelectedOpt(null);

    // 1. Try fetching from Supabase DB
    try {
      const { data } = await supabase.from("quiz_questions").select("*");
      if (data && data.length > 0) {
        const rand = data[Math.floor(Math.random() * data.length)];
        setCurrentQuiz({
          question: rand.question,
          options: rand.options,
          correctIndex: rand.correct_index !== undefined ? rand.correct_index : rand.correctIndex,
          explanation: rand.explanation
        });
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Quiz DB fetch skip:", e);
    }

    // 2. Fallback to Gemini AI
    const prompt = `Bạn là Chuyên gia tạo đề trắc nghiệm Hóa học THPT (Lớp 10) chương trình mới (GDPT 2018). Dùng công thức dạng H2SO4, ion dạng Fe^3+ hoặc SO4^2-, trạng thái (aq)/(s)/(l)/(g) và mũi tên ->.
Tạo 1 câu hỏi trắc nghiệm hiện tượng thí nghiệm hoặc bài toán hóa học lớp 10. Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):
{
  "question": "Nội dung câu hỏi...",
  "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "correctIndex": 0,
  "explanation": "Giải thích chi tiết..."
}`;

    try {
      const response = await callGeminiAPI(prompt);
      const match = response.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        setCurrentQuiz(parsed);
      }
    } catch (e) {
      console.error("AI Quiz Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserStatsOnAnswer = (isCorrect: boolean) => {
    const user = getStoredCurrentUser();
    if (!user) return;

    const currentExp = user.kahootExp || 350;
    const currentStreak = user.kahootStreak || 0;
    const totalQ = (user.totalKahootQuestions || 0) + 1;
    const correctQ = (user.correctKahootQuestions || 0) + (isCorrect ? 1 : 0);
    const newExp = currentExp + (isCorrect ? 50 : 10);
    const newStreak = isCorrect ? currentStreak + 1 : 0;

    const updatedUser: UserProfile = {
      ...user,
      kahootExp: newExp,
      kahootStreak: newStreak,
      totalKahootQuestions: totalQ,
      correctKahootQuestions: correctQ,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };

    saveStoredCurrentUser(updatedUser);

    try {
      const raw = localStorage.getItem('chemai_registered_users');
      if (raw) {
        const users: UserProfile[] = JSON.parse(raw);
        const idx = users.findIndex((u) => u.id === user.id);
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...updatedUser };
          localStorage.setItem('chemai_registered_users', JSON.stringify(users));
        }
      }
    } catch {}
  };

  const handleSelectAnswer = (index: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOpt(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuiz.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    updateUserStatsOnAnswer(isCorrect);
  };

  const handleJoinRoom = async () => {
    if (!pin.trim() || !nickname.trim()) {
      setJoinErrorMsg("Vui lòng nhập đầy đủ Mã PIN và Biệt danh!");
      return;
    }
    setJoinErrorMsg(null);

    try {
      const { data: room, error: roomErr } = await supabase.from("rooms").select("*").eq("room_pin", pin.trim()).maybeSingle();
      if (roomErr || !room) {
        setJoinErrorMsg("⚠️ Không tìm thấy phòng đấu với PIN này!");
        return;
      }
      if (room.status === 'active') {
        setJoinErrorMsg("⚠️ Trận đấu đã BẮT ĐẦU! Không thể tham gia phòng đấu lúc này.");
        return;
      }
      if (room.status === 'finished') {
        setJoinErrorMsg("⚠️ Phòng đấu đã KẾT THÚC!");
        return;
      }

      const { data: participant, error } = await supabase.from("room_participants").insert({
        room_pin: pin.trim(),
        nickname: nickname.trim(),
        score: 0
      }).select().single();

      if (error) throw error;
      setParticipantId(participant.id);
      setIsJoined(true);
    } catch (e: any) {
      setJoinErrorMsg("Lỗi tham gia phòng Kahoot: " + e.message);
    }
  };

  // Poll room status & question when student is joined
  const [roomState, setRoomState] = useState<{ status: string; current_question: number | null; timer_sec?: number }>({ status: 'waiting', current_question: null });
  const [kahootQuiz, setKahootQuiz] = useState<QuizQuestion | null>(null);
  const [kahootSelectedOpt, setKahootSelectedOpt] = useState<number | null>(null);
  const [kahootAnswered, setKahootAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isJoined && pin && roomState.status !== 'finished') {
      const checkRoom = async () => {
        try {
          const { data: room } = await supabase.from("rooms").select("*").eq("room_pin", pin.trim()).maybeSingle();
          if (room) {
            const finalStatus = room.status === 'finished' ? 'finished' : roomState.status === 'finished' ? 'finished' : room.status;
            setRoomState({ status: finalStatus, current_question: room.current_question, timer_sec: room.timer_sec || 20 });
            if (room.status === 'active' && !kahootQuiz) {
              setTimeLeft(room.timer_sec || 20);
              fetchKahootQuestion();
            }
          }
        } catch (e) {
          console.warn("Check room status error:", e);
        }
      };
      checkRoom();
      interval = setInterval(checkRoom, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isJoined, pin, kahootQuiz, roomState.status]);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);

  // Countdown timer for active question
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (roomState.status === 'active' && kahootQuiz && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
      if (kahootSelectedOpt !== null && kahootQuiz && kahootSelectedOpt === kahootQuiz.correctIndex) {
        const newScore = kahootScore + 10;
        setKahootScore(newScore);
        if (participantId) {
          supabase.from("room_participants").update({ score: newScore }).eq("id", participantId).then();
        }
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [roomState.status, kahootQuiz, timeLeft, showResult, kahootSelectedOpt, kahootScore, participantId]);

  // Timer for auto-advancing to next question after result reveal
  useEffect(() => {
    let nextTimer: NodeJS.Timeout | null = null;
    if (showResult && roomState.status === 'active') {
      nextTimer = setTimeout(() => {
        const totalQ = allQuestions.length > 0 ? allQuestions.length : 10;
        if (questionIndex + 1 < totalQ) {
          const nextIdx = questionIndex + 1;
          setQuestionIndex(nextIdx);
          setKahootAnswered(false);
          setKahootSelectedOpt(null);
          setShowResult(false);
          setTimeLeft(roomState.timer_sec || 20);
          if (allQuestions[nextIdx]) {
            setKahootQuiz(allQuestions[nextIdx]);
          }
        } else {
          setRoomState(prev => ({ ...prev, status: 'finished' }));
          if (pin) {
            supabase.from("rooms").update({ status: 'finished' }).eq("room_pin", pin.trim()).then();
          }
        }
      }, 3000);
    }
    return () => {
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [showResult, roomState.status, questionIndex, allQuestions, roomState.timer_sec]);

  const fetchKahootQuestion = async () => {
    try {
      const { data } = await supabase.from("quiz_questions").select("*").limit(10);
      if (data && data.length > 0) {
        const mapped = data.map(q => ({
          question: q.question,
          options: q.options,
          correctIndex: q.correct_index !== undefined ? q.correct_index : q.correctIndex,
          explanation: q.explanation
        }));
        setAllQuestions(mapped);
        setKahootQuiz(mapped[0]);
      } else {
        const defaultQ: QuizQuestion = {
          question: "Phương pháp nào sau đây dùng để tách các chất lỏng có nhiệt độ sôi khác nhau?",
          options: ["Chưng cất", "Chiết", "Kết tinh", "Lọc"],
          correctIndex: 0,
          explanation: "Phương pháp chưng cất dùng để tách các chất lỏng dựa trên sự khác nhau về nhiệt độ sôi."
        };
        setAllQuestions([defaultQ]);
        setKahootQuiz(defaultQ);
      }
    } catch (e) {
      console.warn("Fetch Kahoot question error:", e);
    }
  };

  const handleSelectKahootAnswer = async (idx: number) => {
    if (kahootAnswered || timeLeft === 0) return;
    setKahootSelectedOpt(idx);
    setKahootAnswered(true);

    if (participantId) {
      try {
        const { data: pData } = await supabase.from("room_participants").select("answers").eq("id", participantId).single();
        const currentAns = pData?.answers || {};
        currentAns[questionIndex] = idx;
        await supabase.from("room_participants").update({ answers: currentAns }).eq("id", participantId);
      } catch (e) {
        console.warn("Save participant answer error:", e);
      }
    }
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
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Trophy color="#eab308" size={22} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Thử Thách AI & Đấu Trường Kahoot
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Button
              size="small"
              fullWidth
              variant={mode === 'single' ? 'contained' : 'outlined'}
              onClick={() => setMode('single')}
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}
            >
              Quiz Luyện Tập
            </Button>
            <Button
              size="small"
              fullWidth
              variant={mode === 'kahoot' ? 'contained' : 'outlined'}
              onClick={() => setMode('kahoot')}
              color="secondary"
              sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}
            >
              Đấu Trường Kahoot
            </Button>
          </Stack>
        </Box>

        {mode === 'single' ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}>
                {isLoading ? (
                  <Box display="flex" alignItems="center" justifyContent="center" py={6} gap={1.5}>
                    <RefreshCw className="animate-spin" color="#38bdf8" size={22} />
                    <Typography color="cyan" sx={{ fontSize: '13px' }}>ChemAIBuddy đang tạo câu hỏi trắc nghiệm...</Typography>
                  </Box>
                ) : currentQuiz ? (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="common.white"
                      mb={2}
                      sx={{
                        fontSize: { xs: '14px', sm: '15.5px' },
                        lineHeight: 1.5,
                        "& sub": { fontSize: "0.75em", verticalAlign: "sub" },
                        "& sup": { fontSize: "0.75em", verticalAlign: "super", color: "#38bdf8" }
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `❓ ${cleanChemicalLatex(currentQuiz.question)}`
                      }}
                    />

                    <Stack spacing={1.2} mb={2.5}>
                      {currentQuiz.options.map((opt, idx) => {
                        let btnColor: "inherit" | "success" | "error" = "inherit";
                        if (isAnswered) {
                          if (idx === currentQuiz.correctIndex) btnColor = "success";
                          else if (idx === selectedOpt) btnColor = "error";
                        }

                        return (
                          <Button
                            key={idx}
                            variant={isAnswered && (idx === currentQuiz.correctIndex || idx === selectedOpt) ? "contained" : "outlined"}
                            color={btnColor}
                            fullWidth
                            onClick={() => handleSelectAnswer(idx)}
                            sx={{
                              justifyContent: 'flex-start',
                              textTransform: 'none',
                              textAlign: 'left',
                              p: { xs: 1.2, sm: 1.5 },
                              borderColor: 'rgba(255,255,255,0.15)',
                              bgcolor: isAnswered ? undefined : 'rgba(30, 41, 59, 0.6)',
                              fontSize: { xs: '13px', sm: '14px' },
                              "& sub": { fontSize: "0.75em", verticalAlign: "sub" },
                              "& sup": { fontSize: "0.75em", verticalAlign: "super", color: "#38bdf8" }
                            }}
                          >
                            <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][idx]}.</span>
                            <span dangerouslySetInnerHTML={{ __html: cleanChemicalLatex(opt) }} />
                          </Button>
                        );
                      })}
                    </Stack>

                    {isAnswered && (
                      <Box p={1.5} bgcolor={selectedOpt === currentQuiz.correctIndex ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'} borderRadius={2} border={`1px solid ${selectedOpt === currentQuiz.correctIndex ? '#10b981' : '#ef4444'}`} mb={2}>
                        <Typography variant="subtitle2" fontWeight="bold" color={selectedOpt === currentQuiz.correctIndex ? 'emerald.main' : 'error.main'} mb={0.5}>
                          {selectedOpt === currentQuiz.correctIndex ? '🎉 Chính xác! (+10 Điểm)' : '❌ Chưa chính xác!'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '12px' }}>
                          💡 <b>Giải thích:</b> {currentQuiz.explanation}
                        </Typography>
                      </Box>
                    )}

                    {isAnswered && (
                      <Button variant="contained" fullWidth onClick={loadNextQuiz} sx={{ background: 'linear-gradient(45deg, #0284c7, #2563eb)', textTransform: 'none', fontWeight: 'bold', py: 1 }}>
                        Câu Tiếp Theo ➔
                      </Button>
                    )}
                  </Box>
                ) : null}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="cyan" mb={1.5}>
                  📊 Thành Tích Cá Nhân
                </Typography>

                <Grid container spacing={1.5}>
                  <Grid item xs={6} md={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={1.2} bgcolor="#1e293b" borderRadius={1.5}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '12px', sm: '13px' } }}>Điểm số:</Typography>
                      <Typography variant="h6" fontWeight="bold" color="cyan">{score}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6} md={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={1.2} bgcolor="#1e293b" borderRadius={1.5}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Flame color="#f97316" size={16} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '12px', sm: '13px' } }}>Streak:</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold" color="orange">{streak}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Paper sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}>
            {!isJoined ? (
              <Box maxWidth={400} mx="auto" py={1}>
                <Typography variant="h6" fontWeight="bold" textAlign="center" color="cyan" mb={2} sx={{ fontSize: { xs: '16px', sm: '18px' } }}>
                  🎮 Tham Gia Đấu Trường Kahoot
                </Typography>

                <Stack spacing={1.5}>
                  {joinErrorMsg && (
                    <Alert severity="warning" sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                      {joinErrorMsg}
                    </Alert>
                  )}
                  <TextField
                    label="Mã PIN Phòng Đấu"
                    fullWidth
                    size="small"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                  <TextField
                    label="Biệt Danh Học Sinh"
                    fullWidth
                    size="small"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <Button variant="contained" color="secondary" fullWidth onClick={handleJoinRoom} sx={{ fontWeight: 'bold', py: 1.2 }}>
                    Vào Phòng Đấu 🚀
                  </Button>
                </Stack>
              </Box>
            ) : roomState.status === 'active' && kahootQuiz ? (
              <Box py={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={1.2} bgcolor="#1e293b" borderRadius={2}>
                  <Typography variant="subtitle2" color="cyan" fontWeight="bold" sx={{ fontSize: { xs: '12px', sm: '13px' } }}>
                    🏆 CÂU {questionIndex + 1}/{allQuestions.length || 10}
                  </Typography>
                  <Stack direction="row" spacing={0.8}>
                    <Chip
                      label={`⏱️ ${timeLeft}s`}
                      color={timeLeft <= 5 ? "error" : "primary"}
                      size="small"
                      sx={{ fontWeight: 'bold', height: 22, fontSize: 11 }}
                    />
                    <Chip label={`Điểm: ${kahootScore}đ`} color="warning" size="small" sx={{ fontWeight: 'bold', height: 22, fontSize: 11 }} />
                  </Stack>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="common.white"
                  mb={2.5}
                  sx={{
                    fontSize: { xs: '15px', sm: '17px' },
                    lineHeight: 1.5,
                    "& sub": { fontSize: "0.75em", verticalAlign: "sub" },
                    "& sup": { fontSize: "0.75em", verticalAlign: "super", color: "#38bdf8" }
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `❓ ${cleanChemicalLatex(kahootQuiz.question)}`
                  }}
                />

                <Grid container spacing={1.2}>
                  {kahootQuiz.options.map((opt, idx) => {
                    let btnColor: "inherit" | "success" | "error" = "inherit";
                    if (showResult) {
                      if (idx === kahootQuiz.correctIndex) btnColor = "success";
                      else if (idx === kahootSelectedOpt) btnColor = "error";
                    }

                    const isChosen = kahootSelectedOpt === idx;

                    return (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Button
                          variant={showResult && (idx === kahootQuiz.correctIndex || isChosen) ? "contained" : isChosen ? "contained" : "outlined"}
                          color={showResult ? btnColor : isChosen ? "secondary" : "inherit"}
                          fullWidth
                          disabled={timeLeft === 0 && !showResult}
                          onClick={() => handleSelectKahootAnswer(idx)}
                          sx={{
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            p: 1.5,
                            textTransform: 'none',
                            fontSize: { xs: '13px', sm: '14px' },
                            bgcolor: isChosen && !showResult ? 'rgba(129, 140, 248, 0.4)' : undefined,
                            borderColor: isChosen ? '#818cf8' : undefined,
                            "& sub": { fontSize: "0.75em", verticalAlign: "sub" },
                            "& sup": { fontSize: "0.75em", verticalAlign: "super", color: "#38bdf8" }
                          }}
                        >
                          <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][idx]}.</span>
                          <span dangerouslySetInnerHTML={{ __html: cleanChemicalLatex(opt) }} />
                          {isChosen && !showResult && <span className="ml-auto text-xs italic opacity-80">(Đã chọn)</span>}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>

                {showResult && (
                  <Box mt={2.5} p={1.5} bgcolor={kahootSelectedOpt === kahootQuiz.correctIndex ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'} borderRadius={2} border={`1px solid ${kahootSelectedOpt === kahootQuiz.correctIndex ? '#10b981' : '#ef4444'}`}>
                    <Typography variant="subtitle2" fontWeight="bold" color={kahootSelectedOpt === kahootQuiz.correctIndex ? 'emerald.main' : 'error.main'}>
                      {kahootSelectedOpt === kahootQuiz.correctIndex ? '🎉 Trả lời Chính Xác! (+10 Điểm)' : kahootSelectedOpt === null ? '⏰ Hết giờ làm bài!' : '❌ Chưa chính xác!'}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mt: 0.5,
                        fontSize: '12px',
                        "& sub": { fontSize: "0.75em", verticalAlign: "sub" },
                        "& sup": { fontSize: "0.75em", verticalAlign: "super", color: "#38bdf8" }
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `💡 <b>Giải thích:</b> ${cleanChemicalLatex(kahootQuiz.explanation)}`
                      }}
                    />
                  </Box>
                )}
              </Box>
            ) : roomState.status === 'finished' ? (
              <Box py={3} textAlign="center">
                <Trophy color="#eab308" size={48} className="mx-auto mb-2 animate-bounce" />
                <Typography variant="h6" fontWeight="bold" color="amber" mb={1}>
                  🎉 TRẬN ĐẤU HOÀN THÀNH!
                </Typography>
                <Typography variant="body2" color="common.white" mb={2}>
                  Biệt danh: <b>{nickname}</b> | Tổng điểm: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{kahootScore}đ</span>
                </Typography>

                <Paper sx={{ p: 2, bgcolor: '#1e293b', maxWidth: 450, mx: 'auto', borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Cảm ơn em đã hoàn thành thử thách! Kết quả đã được tự động đồng bộ lên Bảng xếp hạng của Giáo viên.
                  </Typography>
                </Paper>
              </Box>
            ) : (
              <Box py={3} textAlign="center">
                <Typography variant="subtitle1" fontWeight="bold" color="emerald.main" mb={1}>
                  ✅ Đã Vào Phòng Đấu: PIN #{pin}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Biệt danh: <b>{nickname}</b> | Vui lòng chờ Giáo viên Host khởi chạy!
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </CardContent>
    </Card>
  );
}
