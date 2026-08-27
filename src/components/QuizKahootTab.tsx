import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Paper, Stack,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert
} from '@mui/material';
import { Trophy, Flame, Play, Users, Lock, ShieldCheck, RefreshCw, CheckCircle2, XCircle, Zap, Sparkles } from 'lucide-react';
import { supabase, callGeminiAPI } from '@/lib/api';
import { cleanChemicalLatex } from '@/components/AuditTab';
import { UserProfile, getStoredCurrentUser, saveStoredCurrentUser } from '@/components/UserAuthModal';
import { saveUserToDatabase } from '@/lib/userDatabase';
import { PRESET_HIGH_SCHOOL_QUIZ_BANK, getPresetQuizQuestion } from '@/lib/quizBank';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const HIGH_SCHOOL_CHEMISTRY_TOPICS = [
  // LỚP 10 GDPT 2018
  "Lớp 10: Cấu hình electron nguyên tử, quy tắc Hund, cấu trúc ô orbital (s, p, d) của các ion kim loại chuyển tiếp Fe²⁺, Fe³⁺, Cu²⁺, Cr³⁺",
  "Lớp 10: Bảng tuần hoàn, quy luật biến đổi bán kính nguyên tử/ion, độ âm điện, năng lượng ion hóa và tính phi kim - kim loại",
  "Lớp 10: Liên kết ion, liên kết cộng hóa trị (liên kết sigma và pi), trạng thái lai hóa sp, sp², sp³ của nguyên tử trung tâm (CH₄, C₂H₄, C₂H₂, H₂O, NH₃)",
  "Lớp 10: Liên kết hydrogen liên phân tử và tương tác van der Waals giải thích nhiệt độ sôi, độ tan bất thường của H₂O, HF, NH₃, C₂H₅OH",
  "Lớp 10: Phản ứng Oxi hóa - Khử nâng cao, cân bằng phản ứng tự oxi hóa - khử, phản ứng trong môi trường acid/base và quá trình thăng bằng electron",
  "Lớp 10: Năng lượng hóa học, tính biến thiên enthalpy chuẩn (ΔᵣH°₂₉₈) dựa trên năng lượng liên kết E_b và enthalpy tạo thành chuẩn Δ_fH°₂₉₈",
  "Lớp 10: Tốc độ phản ứng hóa học, định luật tác dụng khối lượng, biểu thức tốc độ v = k.[A]^a.[B]^b và hệ số nhiệt độ Van't Hoff",
  "Lớp 10: Nhóm Halogen (F, Cl, Br, I), tính khử của hydrohalic acid (HF, HCl, HBr, HI), phản ứng nhận biết ion halide (Cl⁻, Br⁻, I⁻)",

  // LỚP 11 GDPT 2018
  "Lớp 11: Cân bằng hóa học, tính hằng số cân bằng Kc và nguyên lý chuyển dịch cân bằng Le Chatelier (ảnh hưởng của nhiệt độ, nồng độ, áp suất)",
  "Lớp 11: Cân bằng trong dung dịch nước, thuyết Bronsted - Lowry, tính pH của dung dịch acid/base mạnh và yếu theo hằng số Ka, Kb",
  "Lớp 11: Nitrogen & Sulfur: Phản ứng oxi hóa của HNO₃ đặc/loãng và H₂SO₄ đặc nóng với kim loại/phi kim, mưa acid và chu trình nitrogen",
  "Lớp 11: Đại cương Hóa hữu cơ, phân tích phổ hồng ngoại (IR) nhận biết nhóm chức C=O, O-H, C=C và phổ khối lượng (MS) xác định ion phân tử [M⁺]",
  "Lớp 11: Hydrocarbon: Quy tắc cộng Markovnikov vào Alkene/Alkyne, phản ứng thế ion bạc của alk-1-yne với AgNO₃/NH₃, quy tắc thế vào nhân thơm của Arene",
  "Lớp 11: Dẫn xuất Halogen - Alcohol - Phenol: Bậc alcohol, phản ứng oxi hóa alcohol bằng CuO/KMnO₄, tính acid và phản ứng thế ở nhân thơm của Phenol",
  "Lớp 11: Hợp chất Carbonyl (Aldehyde - Ketone) & Carboxylic Acid: Phản ứng tráng bạc với thuốc thử Tollens, phản ứng Cu(OH)₂/NaOH, phản ứng tạo iodoform",

  // LỚP 12 GDPT 2018
  "Lớp 12: Ester - Lipid: Cấu tạo ester, phản ứng xà phòng hóa triglyceride, tính chỉ số acid, xà phòng và chất giặt rửa tổng hợp",
  "Lớp 12: Carbohydrate: Cấu trúc mạch hở/mạch vòng của Glucose, Fructose, Saccharose, Maltose, Tinh bột (amylose, amylopectin), Cellulose",
  "Lớp 12: Amine - Amino Acid - Peptide - Protein: Bậc của amine, tính base, cấu trúc ion lưỡng cực amino acid, điểm đẳng điện pI, phản ứng màu biuret",
  "Lớp 12: Polymer & Vật liệu polymer: Phản ứng trùng hợp, trùng ngưng (tơ nilon-6,6, tơ lapsan, cao su buna-S, buna-N, keo dán epoxi)",
  "Lớp 12: Pin điện hóa & Thế điện cực chuẩn: Suất điện động chuẩn E°pin, chiều phản ứng oxi hóa - khử tự phát theo thế điện cực chuẩn E°",
  "Lớp 12: Điện phân dung dịch và điện phân nóng chảy: Thứ tự phóng điện ở catot/anot, định luật Faraday tính khối lượng chất giải phóng",
  "Lớp 12: Kim loại chuyển tiếp dãy thứ nhất & Phức chất: Cấu hình electron ion chuyển tiếp (Fe, Cu, Cr, Mn, Ni), nguyên tử trung tâm, phối tử, số phối trí"
];

export default function QuizKahootTab() {
  const [mode, setMode] = useState<'single' | 'kahoot'>('single');
  
  // Persistent Score & Streak across tab switches and reloads
  const [score, setScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chemai_quiz_score');
      if (saved) return parseInt(saved, 10) || 0;
    }
    return 0;
  });

  const [streak, setStreak] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const user = getStoredCurrentUser();
      if (user?.kahootStreak !== undefined && user.kahootStreak > 0) return user.kahootStreak;
      const saved = localStorage.getItem('chemai_quiz_streak');
      if (saved) return parseInt(saved, 10) || 0;
    }
    return 0;
  });

  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Anti-duplication tracking
  const askedQuestionsRef = useRef<Set<string>>(new Set());

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
    // Load asked question history from session storage
    if (typeof window !== 'undefined') {
      try {
        const historyRaw = sessionStorage.getItem('chemai_quiz_asked_history');
        if (historyRaw) {
          const parsed: string[] = JSON.parse(historyRaw);
          parsed.forEach(q => askedQuestionsRef.current.add(q));
        }
      } catch {}
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

    // 1. Check local preset 50 High-School questions bank first (Instant, zero AI latency & quota)
    const unaskedPreset = PRESET_HIGH_SCHOOL_QUIZ_BANK.filter(
      q => !askedQuestionsRef.current.has(q.question?.trim().toLowerCase())
    );

    if (unaskedPreset.length > 0) {
      const selected = unaskedPreset[Math.floor(Math.random() * unaskedPreset.length)];
      const qText = selected.question.trim().toLowerCase();
      askedQuestionsRef.current.add(qText);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('chemai_quiz_asked_history', JSON.stringify(Array.from(askedQuestionsRef.current).slice(-50)));
      }

      setCurrentQuiz(selected);
      setIsLoading(false);
      return;
    }

    // 2. Try fetching unasked question from Supabase DB
    try {
      const { data } = await supabase.from("quiz_questions").select("*");
      if (data && data.length > 0) {
        const unaskedDB = data.filter(q => !askedQuestionsRef.current.has(q.question?.trim().toLowerCase()));
        if (unaskedDB.length > 0) {
          const rand = unaskedDB[Math.floor(Math.random() * unaskedDB.length)];
          if (rand && rand.question) {
            const qText = rand.question.trim().toLowerCase();
            askedQuestionsRef.current.add(qText);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('chemai_quiz_asked_history', JSON.stringify(Array.from(askedQuestionsRef.current).slice(-50)));
            }

            setCurrentQuiz({
              question: rand.question,
              options: rand.options,
              correctIndex: rand.correct_index !== undefined ? rand.correct_index : rand.correctIndex,
              explanation: rand.explanation
            });
            setIsLoading(false);
            return;
          }
        }
      }
    } catch (e) {
      console.warn("Quiz DB fetch skip:", e);
    }

    // 3. Fallback to Gemini AI if all 50+ preset and DB questions have been answered in this session
    const randomTopic = HIGH_SCHOOL_CHEMISTRY_TOPICS[Math.floor(Math.random() * HIGH_SCHOOL_CHEMISTRY_TOPICS.length)];
    const uniqueSeed = Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6);

    const prompt = `Bạn là Chuyên gia Khảo thí và Biên soạn Đề thi Hóa học THPT Quốc gia (Chương trình GDPT 2018).

YÊU CẦU BẮT BUỘC VỀ ĐỘ KHÓ VÀ CHUYÊN MÔN:
1. Chủ đề bài học: "${randomTopic}". (Mã đề ngẫu nhiên: ${uniqueSeed})
2. ĐỘ KHÓ: NÂNG CAO (Mức độ Thông hiểu - Vận dụng - Vận dụng cao của THPT Lớp 10, 11, 12).
3. TUYỆT ĐỐI NGHIÊM CẤM ra các câu hỏi cấp 2 (THCS) đơn giản, cơ bản (như thành phần của nước, không khí, tính chất chung đơn giản...).
4. Câu hỏi phải yêu cầu tư duy hóa học thực thụ: tính toán năng lượng enthalpy ΔᵣH°, hằng số cân bằng Kc, pH, thế điện cực E°, cơ chế hữu cơ, phổ IR/MS, thăng bằng electron hoặc hiện tượng phức chất.
5. Danh pháp: BẮT BUỘC dùng danh pháp IUPAC tiếng Anh (hydrogen, oxygen, chlorine, nitrogen, iron, copper, nitric acid, sulfuric acid, ester, aldehyde...).
6. Ký hiệu hóa học chuẩn: công thức như H2SO4, Fe(NO3)3, ion như Fe^3+, SO4^2-, mũi tên phản ứng ->, điều kiện nhiệt độ t°, xúc tác.

Trả về DUY NHẤT một chuỗi JSON hợp lệ theo đúng cấu trúc (không dùng markdown codeblock, không thêm chữ ngoài JSON):
{
  "question": "Nội dung câu hỏi trắc nghiệm THPT...",
  "options": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
  "correctIndex": 0,
  "explanation": "Giải thích chi tiết bản chất hóa học..."
}`;

    try {
      const response = await callGeminiAPI(prompt);
      const match = response.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed: QuizQuestion = JSON.parse(match[0]);
        if (parsed.question && Array.isArray(parsed.options) && parsed.options.length === 4) {
          const qText = parsed.question.trim().toLowerCase();
          askedQuestionsRef.current.add(qText);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('chemai_quiz_asked_history', JSON.stringify(Array.from(askedQuestionsRef.current).slice(-50)));
          }
          setCurrentQuiz(parsed);
        }
      }
    } catch (e) {
      console.error("AI Quiz Error:", e);
      // Ultimate safety: pick any random question from the 50-question bank
      const fallback = getPresetQuizQuestion();
      setCurrentQuiz(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserStatsOnAnswer = async (isCorrect: boolean) => {
    let user = getStoredCurrentUser();

    // If student is not logged in, generate a stable guest session user
    if (!user) {
      const guestId = typeof window !== 'undefined' ? (localStorage.getItem('chemai_guest_id') || ('guest_' + Math.random().toString(36).substring(2, 9))) : ('guest_' + Date.now());
      if (typeof window !== 'undefined' && !localStorage.getItem('chemai_guest_id')) {
        localStorage.setItem('chemai_guest_id', guestId);
      }
      user = {
        id: guestId,
        fullName: nickname || 'Học sinh ChemAI',
        authType: 'email',
        emailOrPhone: '',
        role: 'student',
        className: '10A1',
        school: 'THPT',
        location: 'Việt Nam',
        createdAt: new Date().toISOString(),
        kahootExp: 0,
        kahootStreak: 0,
        totalKahootQuestions: 0,
        correctKahootQuestions: 0,
      };
    }

    const currentExp = user.kahootExp !== undefined ? user.kahootExp : 0;
    const currentStreak = user.kahootStreak !== undefined ? user.kahootStreak : 0;
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

    // 1. Update local storage immediately
    saveStoredCurrentUser(updatedUser);

    // 2. Persist streak & score locally so switching tabs / reload won't lose it
    if (typeof window !== 'undefined') {
      localStorage.setItem('chemai_quiz_streak', newStreak.toString());
      localStorage.setItem('chemai_quiz_score', ((score || 0) + (isCorrect ? 10 : 0)).toString());
    }

    // 3. Persist to central Supabase DB immediately
    try {
      await saveUserToDatabase(updatedUser);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('chemai_user_updated'));
      }
    } catch (err) {
      console.warn('Sync user stats to Supabase error:', err);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOpt(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuiz.correctIndex;
    if (isCorrect) {
      const nextScore = score + 10;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (typeof window !== 'undefined') {
        localStorage.setItem('chemai_quiz_score', nextScore.toString());
        localStorage.setItem('chemai_quiz_streak', nextStreak.toString());
      }
    } else {
      setStreak(0);
      if (typeof window !== 'undefined') {
        localStorage.setItem('chemai_quiz_streak', '0');
      }
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
      const isCorrect = (kahootSelectedOpt !== null && kahootQuiz && kahootSelectedOpt === kahootQuiz.correctIndex);
      if (isCorrect) {
        const newScore = kahootScore + 10;
        setKahootScore(newScore);
        if (participantId) {
          supabase.from("room_participants").update({ score: newScore }).eq("id", participantId).then();
        }
      }
      updateUserStatsOnAnswer(Boolean(isCorrect));
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
      if (data && data.length >= 5) {
        const mapped = data.map(q => ({
          question: q.question,
          options: q.options,
          correctIndex: q.correct_index !== undefined ? q.correct_index : q.correctIndex,
          explanation: q.explanation
        }));
        setAllQuestions(mapped);
        setKahootQuiz(mapped[0]);
      } else {
        // Sample 10 diverse questions from 50 High School preset questions
        const shuffled = [...PRESET_HIGH_SCHOOL_QUIZ_BANK].sort(() => 0.5 - Math.random()).slice(0, 10);
        setAllQuestions(shuffled);
        setKahootQuiz(shuffled[0]);
      }
    } catch (e) {
      console.warn("Fetch Kahoot question error:", e);
      const shuffled = [...PRESET_HIGH_SCHOOL_QUIZ_BANK].sort(() => 0.5 - Math.random()).slice(0, 10);
      setAllQuestions(shuffled);
      setKahootQuiz(shuffled[0]);
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
