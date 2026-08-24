"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Badge,
} from '@mui/material';
import {
  Trophy,
  Award,
  Medal,
  Flame,
  Calendar,
  Star,
  Edit,
  Plus,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  UserCheck,
  GraduationCap,
  School,
  BookOpen,
  Sparkles,
  Download,
  ArrowUpDown,
  ChevronRight,
  Check,
  Zap,
  Tag,
  Smile,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Clock,
  Send,
  X,
} from 'lucide-react';
import { callGeminiAPI, supabase } from '@/lib/api';
import { UserProfile, getStoredCurrentUser, saveStoredCurrentUser } from '@/components/UserAuthModal';
import { fetchAllUsersFromDatabase, saveUserToDatabase } from '@/lib/userDatabase';

export interface StudentProgressData extends UserProfile {
  kahootExp: number;
  kahootStreak: number;
  loginStreak: number;
  nickname: string;
  totalKahootQuestions: number;
  correctKahootQuestions: number;
  teacherEvaluation: string;
  lastActiveDate: string;
}

export const NICKNAME_PRESETS = [
  'Thần Đồng Oxi Hóa - Khử',
  'Bậc Thầy Cấu Hình Electron',
  'Chiến Binh Năng Lượng Enthalpy',
  'Chuyên Gia Nhóm Halogen',
  'Kỷ Lục Gia Đấu Trường Kahoot',
  'Chiến Binh Cân Bằng Phương Trình',
  'Nhà Hóa Học Trẻ Xuất Sắc',
  'Ngôi Sao Sáng Tạo STEM',
  'Chiến Binh Chăm Chỉ 10A',
  'Tia Chớp Phản Xạ Nhanh',
  'Bậc Thầy Bảng Tuần Hoàn',
  'Nhà Khám Phá Thí Nghiệm',
];

export function calculateCompetencyRank(exp = 0, totalQuestions = 0, correctQuestions = 0) {
  const accuracy = totalQuestions > 0 ? (correctQuestions / totalQuestions) * 100 : 0;
  const level = Math.floor(exp / 300) + 1;
  const currentLevelProgress = exp % 300;
  const nextLevelExp = level * 300;

  if (exp >= 2000 || (accuracy >= 85 && totalQuestions >= 20)) {
    return {
      rankKey: 'master',
      rankLabel: 'Xuất Sắc (Hạng Kim Cương)',
      shortRank: 'Xuất Sắc',
      badgeColor: '#38bdf8',
      bgGlow: 'rgba(56, 189, 248, 0.2)',
      icon: <Award size={16} color="#38bdf8" />,
      level,
      accuracy: Math.round(accuracy * 10) / 10,
      currentLevelProgress,
      nextLevelExp,
      defaultEvaluation: 'Nắm rất vững toàn bộ hệ thống lý thuyết và phương pháp giải bài tập Hóa 10 GDPT 2018. Phản xạ thi đấu nhanh nhẹn, tư duy logic sắc sảo và tỷ lệ chính xác vượt trội.',
    };
  } else if (exp >= 1200 || (accuracy >= 70 && totalQuestions >= 15)) {
    return {
      rankKey: 'advanced',
      rankLabel: 'Giỏi (Hạng Vàng)',
      shortRank: 'Giỏi',
      badgeColor: '#eab308',
      bgGlow: 'rgba(234, 179, 8, 0.2)',
      icon: <Trophy size={16} color="#eab308" />,
      level,
      accuracy: Math.round(accuracy * 10) / 10,
      currentLevelProgress,
      nextLevelExp,
      defaultEvaluation: 'Hiểu sâu bản chất hóa học, thành thạo các dạng bài toán Oxi hóa - Khử, cấu hình e và liên kết hóa học. Tinh thần học tập tích cực, phong độ thi đấu ổn định.',
    };
  } else if (exp >= 600 || (accuracy >= 50 && totalQuestions >= 10)) {
    return {
      rankKey: 'proficient',
      rankLabel: 'Khá (Hạng Bạc)',
      shortRank: 'Khá',
      badgeColor: '#a855f7',
      bgGlow: 'rgba(168, 85, 247, 0.2)',
      icon: <Medal size={16} color="#a855f7" />,
      level,
      accuracy: Math.round(accuracy * 10) / 10,
      currentLevelProgress,
      nextLevelExp,
      defaultEvaluation: 'Nắm được các khái niệm nền tảng, hoàn thành tốt các câu hỏi nhận biết và thông hiểu. Cần rèn luyện thêm kỹ năng tính toán biến thiên Enthalpy và phản ứng nâng cao.',
    };
  } else {
    return {
      rankKey: 'developing',
      rankLabel: 'Đang Cố Gắng (Hạng Đồng)',
      shortRank: 'Đang Cố Gắng',
      badgeColor: '#f97316',
      bgGlow: 'rgba(249, 115, 22, 0.2)',
      icon: <Star size={16} color="#f97316" />,
      level,
      accuracy: Math.round(accuracy * 10) / 10,
      currentLevelProgress,
      nextLevelExp,
      defaultEvaluation: 'Học sinh đang trong quá trình tích lũy kiến thức cơ bản. Cần tăng cường luyện tập thêm các dạng bài tập trắc nghiệm và xem lại video bài giảng.',
    };
  }
}

interface StudentProgressManagerProps {
  currentUser?: UserProfile | null;
}

export default function StudentProgressManager({ currentUser }: StudentProgressManagerProps) {
  const [students, setStudents] = useState<StudentProgressData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('Tất cả lớp');
  const [selectedRank, setSelectedRank] = useState('all');
  const [sortBy, setSortBy] = useState<'exp_desc' | 'streak_desc' | 'login_desc' | 'questions_desc' | 'name_asc'>('exp_desc');

  // Modal: Evaluate & Nickname
  const [evalModalOpen, setEvalModalOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState<StudentProgressData | null>(null);
  const [editNickname, setEditNickname] = useState('');
  const [editEvaluation, setEditEvaluation] = useState('');
  const [bonusExp, setBonusExp] = useState(0);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  // Load registered students on mount & on storage events
  useEffect(() => {
    loadStudents();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chemai_registered_users' || e.key === 'chemai_current_user') {
        loadStudents();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadStudents = async () => {
    try {
      const allUsers = await fetchAllUsersFromDatabase();
      const studentOnly = allUsers.filter(
        (u) => !u.id?.startsWith('std_seed_') && (u.role === 'student' || (!u.role && u.className && !u.className.includes('Giáo viên') && !u.className.includes('GV')))
      );

      const mappedList: StudentProgressData[] = studentOnly.map((u) => {
        const exp = u.kahootExp !== undefined ? u.kahootExp : 0;
        const totalQ = u.totalKahootQuestions !== undefined ? u.totalKahootQuestions : 0;
        const correctQ = u.correctKahootQuestions !== undefined ? u.correctKahootQuestions : 0;
        const comp = calculateCompetencyRank(exp, totalQ, correctQ);

        return {
          ...u,
          kahootExp: exp,
          kahootStreak: u.kahootStreak !== undefined ? u.kahootStreak : 0,
          loginStreak: u.loginStreak !== undefined ? u.loginStreak : 1,
          nickname: u.nickname || '',
          totalKahootQuestions: totalQ,
          correctKahootQuestions: correctQ,
          teacherEvaluation: u.teacherEvaluation || (exp > 0 ? comp.defaultEvaluation : ''),
          lastActiveDate: u.lastActiveDate || u.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
        };
      });

      setStudents(mappedList);
    } catch (e) {
      console.warn('Load students error:', e);
      setStudents([]);
    }
  };

  const persistStudentsList = (updatedList: StudentProgressData[]) => {
    setStudents(updatedList);
    try {
      updatedList.forEach((std) => {
        saveUserToDatabase(std).catch(() => {});
      });

      // If current logged-in user is one of updated students, update current_user
      const currentStored = getStoredCurrentUser();
      if (currentStored) {
        const matched = updatedList.find((s) => s.id === currentStored.id);
        if (matched) {
          saveStoredCurrentUser({ ...currentStored, ...matched });
        }
      }
    } catch (e) {
      console.error('Persist students error:', e);
    }
  };

  // Open Evaluate modal
  const handleOpenEvalModal = (student: StudentProgressData) => {
    setActiveStudent(student);
    setEditNickname(student.nickname || '');
    setEditEvaluation(student.teacherEvaluation || '');
    setBonusExp(0);
    setEvalModalOpen(true);
  };

  // Save student evaluation
  const handleSaveEvaluation = () => {
    if (!activeStudent) return;
    const newTotalExp = Math.max(0, activeStudent.kahootExp + Number(bonusExp || 0));
    const updatedList = students.map((s) => {
      if (s.id === activeStudent.id) {
        return {
          ...s,
          nickname: editNickname.trim() || 'Học Sinh ChemAI',
          teacherEvaluation: editEvaluation.trim() || 'Học sinh có tinh thần học tập tốt.',
          kahootExp: newTotalExp,
        };
      }
      return s;
    });

    persistStudentsList(updatedList);
    setEvalModalOpen(false);
    setNotification({
      type: 'success',
      message: `Đã cập nhật đánh giá & biệt danh cho học sinh ${activeStudent.fullName}!`,
    });
  };

  // Generate AI pedagogical comment via Gemini
  const handleGenerateAiEvaluation = async () => {
    if (!activeStudent) return;
    setIsAiGenerating(true);
    const comp = calculateCompetencyRank(activeStudent.kahootExp, activeStudent.totalKahootQuestions, activeStudent.correctKahootQuestions);
    
    const prompt = `Bạn là Giáo viên bộ môn Hóa học THPT chương trình GDPT 2018 đầy tâm huyết.
Hãy viết một lời nhận xét sư phạm ngắn gọn, súc tích (khoảng 2-3 câu, tối đa 50 từ), mang tính động viên, chuyên môn sâu sắc cho học sinh:
- Tên học sinh: ${activeStudent.fullName}
- Lớp: ${activeStudent.className}
- Điểm kinh nghiệm Kahoot: ${activeStudent.kahootExp} EXP (Cấp độ ${comp.level})
- Số câu đúng: ${activeStudent.correctKahootQuestions}/${activeStudent.totalKahootQuestions} (${comp.accuracy}% chính xác)
- Chuỗi thắng Kahoot: ${activeStudent.kahootStreak} trận
- Biệt danh hiện tại: "${editNickname || activeStudent.nickname}"
- Xếp loại năng lực: ${comp.rankLabel}

Yêu cầu: Lời nhận xét bằng tiếng Việt chuẩn mực, chỉ xuất ra nội dung nhận xét thuần văn bản, không thêm tiêu đề hay dấu ngoặc kép thừa.`;

    try {
      const res = await callGeminiAPI(prompt);
      if (res && res.trim()) {
        setEditEvaluation(res.trim().replace(/^["']|["']$/g, ''));
      }
    } catch (e) {
      console.warn('AI Gen error:', e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Delete student
  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Thầy/Cô có chắc chắn muốn xóa học sinh "${name}" khỏi danh sách theo dõi?`)) {
      const updated = students.filter((s) => s.id !== id);
      persistStudentsList(updated);
      setNotification({ type: 'info', message: `Đã xóa học sinh ${name}.` });
    }
  };

  // Export CSV / Excel format
  const handleExportCSV = () => {
    const headers = [
      'STT',
      'Họ và Tên',
      'Lớp',
      'Trường THPT',
      'Biệt Danh Sư Phạm',
      'Kinh Nghiệm (EXP)',
      'Cấp Độ',
      'Chuỗi Kahoot (Trận)',
      'Chuỗi Đăng Nhập (Ngày)',
      'Số Câu Làm',
      'Số Câu Đúng',
      'Tỉ Lệ Đúng (%)',
      'Xếp Loại Năng Lực',
      'Nhận Xét Của Giáo Viên',
    ];

    const rows = filteredAndSortedStudents.map((s, idx) => {
      const comp = calculateCompetencyRank(s.kahootExp, s.totalKahootQuestions, s.correctKahootQuestions);
      return [
        idx + 1,
        `"${s.fullName}"`,
        `"${s.className}"`,
        `"${s.school}"`,
        `"${s.nickname}"`,
        s.kahootExp,
        comp.level,
        s.kahootStreak,
        s.loginStreak,
        s.totalKahootQuestions,
        s.correctKahootQuestions,
        `${comp.accuracy}%`,
        `"${comp.shortRank}"`,
        `"${(s.teacherEvaluation || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Danh_Sach_Nang_Luc_Hoc_Sinh_ChemAI_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Unique Classes list for filter
  const classList = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.className) set.add(s.className);
    });
    return ['Tất cả lớp', ...Array.from(set)];
  }, [students]);

  // Filtered and Sorted list
  const filteredAndSortedStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchSearch =
          !searchQuery.trim() ||
          s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.className?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.emailOrPhone?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchClass = selectedClass === 'Tất cả lớp' || s.className === selectedClass;

        const comp = calculateCompetencyRank(s.kahootExp, s.totalKahootQuestions, s.correctKahootQuestions);
        const matchRank = selectedRank === 'all' || comp.rankKey === selectedRank;

        return matchSearch && matchClass && matchRank;
      })
      .sort((a, b) => {
        if (sortBy === 'exp_desc') return b.kahootExp - a.kahootExp;
        if (sortBy === 'streak_desc') return b.kahootStreak - a.kahootStreak;
        if (sortBy === 'login_desc') return b.loginStreak - a.loginStreak;
        if (sortBy === 'questions_desc') return b.totalKahootQuestions - a.totalKahootQuestions;
        if (sortBy === 'name_asc') return a.fullName.localeCompare(b.fullName);
        return 0;
      });
  }, [students, searchQuery, selectedClass, selectedRank, sortBy]);

  // Overview Analytics
  const analytics = useMemo(() => {
    const total = students.length;
    if (total === 0) return { total: 0, avgExp: 0, topStudent: null, masterCount: 0, advancedCount: 0, proficientCount: 0, developingCount: 0 };
    
    let sumExp = 0;
    let master = 0, advanced = 0, proficient = 0, developing = 0;
    let top: StudentProgressData = students[0];

    students.forEach((s) => {
      sumExp += s.kahootExp;
      if (s.kahootExp > (top?.kahootExp || 0)) top = s;
      const comp = calculateCompetencyRank(s.kahootExp, s.totalKahootQuestions, s.correctKahootQuestions);
      if (comp.rankKey === 'master') master++;
      else if (comp.rankKey === 'advanced') advanced++;
      else if (comp.rankKey === 'proficient') proficient++;
      else developing++;
    });

    return {
      total,
      avgExp: Math.round(sumExp / total),
      topStudent: top,
      masterCount: master,
      advancedCount: advanced,
      proficientCount: proficient,
      developingCount: developing,
    };
  }, [students]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pb: 6 }}>
      {/* Toast Notification */}
      {notification && (
        <Alert
          severity={notification.type}
          onClose={() => setNotification(null)}
          sx={{ mb: 2.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {notification.message}
        </Alert>
      )}

      {/* Top Banner Header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          mb: 3,
          borderRadius: 3.5,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(245, 158, 11, 0.15)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2.5,
                  bgcolor: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f59e0b',
                }}
              >
                <GraduationCap size={28} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="white" sx={{ fontSize: { xs: '18px', sm: '22px' } }}>
                  Sổ Theo Dõi & Đánh Giá Năng Lực Học Sinh
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Dành riêng cho Giáo viên • Quản lý EXP Kahoot, Chuỗi thi đấu, Biệt danh & Đánh giá năng lực GDPT 2018
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 720, mt: 0.5, lineHeight: 1.6 }}>
              Hệ thống tự động đồng bộ danh sách từ tất cả tài khoản Học Sinh đã đăng ký trên ChemAI.
              Thầy/Cô có thể đặt <b>Biệt danh danh dự</b>, trao điểm thưởng EXP và ghi nhận xét năng lực để học sinh thấy trên trang cá nhân.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent={{ md: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<RefreshCw size={16} />}
                onClick={() => {
                  loadStudents();
                  setNotification({ type: 'success', message: 'Đã làm mới danh sách học sinh từ hệ thống tài khoản!' });
                }}
                sx={{
                  bgcolor: '#f59e0b',
                  color: '#000',
                  fontWeight: 'bold',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                  '&:hover': { bgcolor: '#d97706' },
                }}
              >
                Đồng Bộ CSDL
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileSpreadsheet size={16} />}
                onClick={handleExportCSV}
                sx={{
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.1)', borderColor: '#38bdf8' },
                }}
              >
                Xuất CSV
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Analytics Metric Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Card 1: Total Students */}
        <Grid item xs={6} sm={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2.5,
              bgcolor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              height: '100%',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                TỔNG SỐ HỌC SINH
              </Typography>
              <GraduationCap size={18} color="#38bdf8" />
            </Box>
            <Typography variant="h4" fontWeight="bold" color="#38bdf8" mt={0.5}>
              {analytics.total}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Đang học Hóa học 10 GDPT
            </Typography>
          </Paper>
        </Grid>

        {/* Card 2: Average EXP */}
        <Grid item xs={6} sm={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2.5,
              bgcolor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              height: '100%',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                EXP TRUNG BÌNH
              </Typography>
              <Zap size={18} color="#eab308" />
            </Box>
            <Typography variant="h4" fontWeight="bold" color="#eab308" mt={0.5}>
              {analytics.avgExp.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Cấp độ ~ Level {Math.floor(analytics.avgExp / 300) + 1}
            </Typography>
          </Paper>
        </Grid>

        {/* Card 3: Top 1 Student */}
        <Grid item xs={12} sm={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2.5,
              bgcolor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              height: '100%',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                QUÁN QUÂN KAHOOT (TOP 1)
              </Typography>
              <Trophy size={18} color="#f43f5e" />
            </Box>
            <Typography variant="subtitle1" fontWeight="bold" color="white" noWrap mt={0.5}>
              👑 {analytics.topStudent?.fullName || 'Chưa có'}
            </Typography>
            <Typography variant="caption" color="#f43f5e" fontWeight="bold" display="block">
              {analytics.topStudent ? `${analytics.topStudent.kahootExp} EXP • Chuỗi 🔥 ${analytics.topStudent.kahootStreak}` : ''}
            </Typography>
          </Paper>
        </Grid>

        {/* Card 4: Competency Distribution */}
        <Grid item xs={12} sm={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2.5,
              bgcolor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              height: '100%',
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={0.8}>
              PHÂN BỐ NĂNG LỰC
            </Typography>
            <Stack direction="row" spacing={0.6} flexWrap="wrap" gap={0.5}>
              <Chip label={`💎 ${analytics.masterCount} Xuất sắc`} size="small" sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontWeight: 'bold' }} />
              <Chip label={`🥇 ${analytics.advancedCount} Giỏi`} size="small" sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(234, 179, 8, 0.15)', color: '#eab308', fontWeight: 'bold' }} />
              <Chip label={`🥈 ${analytics.proficientCount} Khá`} size="small" sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', fontWeight: 'bold' }} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Filter and Search Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2.5,
          bgcolor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Grid container spacing={1.5} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm học sinh theo tên, biệt danh, lớp, trường..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search size={18} color="#64748b" style={{ marginRight: 8 }} />,
                endAdornment: searchQuery ? (
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <X size={15} />
                  </IconButton>
                ) : null,
              }}
            />
          </Grid>

          {/* Class Filter */}
          <Grid item xs={6} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Lọc theo Lớp</InputLabel>
              <Select
                value={selectedClass}
                label="Lọc theo Lớp"
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classList.map((cls) => (
                  <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Rank Filter */}
          <Grid item xs={6} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Xếp Loại Năng Lực</InputLabel>
              <Select
                value={selectedRank}
                label="Xếp Loại Năng Lực"
                onChange={(e) => setSelectedRank(e.target.value)}
              >
                <MenuItem value="all">Tất cả xếp loại</MenuItem>
                <MenuItem value="master">💎 Xuất Sắc (Kim Cương)</MenuItem>
                <MenuItem value="advanced">🥇 Giỏi (Vàng)</MenuItem>
                <MenuItem value="proficient">🥈 Khá (Bạc)</MenuItem>
                <MenuItem value="developing">🥉 Đang Cố Gắng (Đồng)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort By */}
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sắp xếp theo</InputLabel>
              <Select
                value={sortBy}
                label="Sắp xếp theo"
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <MenuItem value="exp_desc">⚡ EXP cao nhất</MenuItem>
                <MenuItem value="streak_desc">🔥 Chuỗi Kahoot dài nhất</MenuItem>
                <MenuItem value="login_desc">📅 Chuỗi đăng nhập cao nhất</MenuItem>
                <MenuItem value="questions_desc">🎯 Số câu làm nhiều nhất</MenuItem>
                <MenuItem value="name_asc">🔤 Tên học sinh A - Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Student List Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          bgcolor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Box p={2} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid rgba(255,255,255,0.08)">
          <Box display="flex" alignItems="center" gap={1}>
            <UserCheck size={20} color="#38bdf8" />
            <Typography variant="subtitle1" fontWeight="bold" color="white">
              Danh Sách Học Sinh ({filteredAndSortedStudents.length})
            </Typography>
          </Box>
          <Tooltip title="Làm mới và đồng bộ danh sách từ cơ sở dữ liệu">
            <Button
              size="small"
              onClick={() => {
                loadStudents();
                setNotification({ type: 'success', message: 'Đã đồng bộ lại danh sách từ cơ sở dữ liệu!' });
              }}
              startIcon={<RefreshCw size={14} />}
              sx={{ color: 'text.secondary', fontSize: 12, '&:hover': { color: '#38bdf8' } }}
            >
              Làm mới CSDL
            </Button>
          </Tooltip>
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Học Sinh</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Biệt Danh Sư Phạm</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Kinh Nghiệm (EXP)</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Chuỗi Kahoot / Đăng Nhập</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Số Câu Kahoot</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Đánh Giá Năng Lực</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold', textAlign: 'center' }}>Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <GraduationCap size={36} color="#64748b" />
                      <Typography variant="subtitle1" fontWeight="bold" color="#94a3b8">
                        {students.length === 0
                          ? 'Chưa có tài khoản học sinh nào đăng ký trên hệ thống'
                          : 'Không tìm thấy học sinh nào phù hợp với bộ lọc tìm kiếm!'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 460 }}>
                        {students.length === 0
                          ? 'Hệ thống chỉ ghi nhận dữ liệu từ các tài khoản học sinh thực tế sau khi đăng ký hoặc tham gia học tập trên web.'
                          : 'Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn "Tất cả lớp".'}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedStudents.map((std) => {
                  const comp = calculateCompetencyRank(std.kahootExp, std.totalKahootQuestions, std.correctKahootQuestions);
                  return (
                    <TableRow
                      key={std.id}
                      hover
                      sx={{
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' },
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {/* 1. Student Name & Class */}
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.2}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              fontSize: 13,
                              fontWeight: 'bold',
                              bgcolor: comp.badgeColor,
                              color: '#000',
                            }}
                          >
                            {std.fullName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold" color="white" noWrap sx={{ maxWidth: 160 }}>
                              {std.fullName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', fontSize: 11 }}>
                              {std.className} • {std.school}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* 2. Nickname */}
                      <TableCell>
                        <Chip
                          icon={<Tag size={12} color="#f59e0b" />}
                          label={std.nickname || 'Chưa đặt'}
                          size="small"
                          onClick={() => handleOpenEvalModal(std)}
                          sx={{
                            bgcolor: 'rgba(245, 158, 11, 0.12)',
                            color: '#fbbf24',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            fontWeight: '600',
                            fontSize: 11,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.25)' },
                          }}
                        />
                      </TableCell>

                      {/* 3. Kahoot EXP & Level Progress */}
                      <TableCell>
                        <Box sx={{ minWidth: 120 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" fontWeight="bold" color="#eab308">
                              ⚡ {std.kahootExp.toLocaleString()} EXP
                            </Typography>
                            <Chip label={`Lv.${comp.level}`} size="small" sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(255,255,255,0.08)', fontWeight: 'bold' }} />
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(comp.currentLevelProgress / 300) * 100}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              mt: 0.5,
                              bgcolor: 'rgba(255,255,255,0.1)',
                              '& .MuiLinearProgress-bar': { bgcolor: comp.badgeColor },
                            }}
                          />
                        </Box>
                      </TableCell>

                      {/* 4. Streaks */}
                      <TableCell>
                        <Stack direction="row" spacing={0.8}>
                          <Tooltip title="Chuỗi trận Kahoot liên tiếp">
                            <Chip
                              icon={<Flame size={12} color="#f43f5e" />}
                              label={`${std.kahootStreak}`}
                              size="small"
                              sx={{ bgcolor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', fontWeight: 'bold', fontSize: 11 }}
                            />
                          </Tooltip>
                          <Tooltip title="Chuỗi ngày đăng nhập học tập liên tục">
                            <Chip
                              icon={<Calendar size={12} color="#10b981" />}
                              label={`${std.loginStreak}d`}
                              size="small"
                              sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 'bold', fontSize: 11 }}
                            />
                          </Tooltip>
                        </Stack>
                      </TableCell>

                      {/* 5. Kahoot Questions count & accuracy */}
                      <TableCell>
                        <Typography variant="body2" fontWeight="600" color="white">
                          {std.correctKahootQuestions}/{std.totalKahootQuestions} câu
                        </Typography>
                        <Typography variant="caption" color={comp.accuracy >= 80 ? '#34d399' : '#94a3b8'}>
                          Đúng: {comp.accuracy}%
                        </Typography>
                      </TableCell>

                      {/* 6. Competency Evaluation */}
                      <TableCell sx={{ maxWidth: 220 }}>
                        <Chip
                          icon={comp.icon}
                          label={comp.shortRank}
                          size="small"
                          sx={{
                            bgcolor: comp.bgGlow,
                            color: comp.badgeColor,
                            border: `1px solid ${comp.badgeColor}50`,
                            fontWeight: 'bold',
                            fontSize: 11,
                            mb: 0.4,
                          }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontSize: 11,
                            lineHeight: 1.3,
                          }}
                        >
                          {std.teacherEvaluation || comp.defaultEvaluation}
                        </Typography>
                      </TableCell>

                      {/* 7. Action Buttons */}
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Tooltip title="Đánh giá năng lực & Đổi biệt danh">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenEvalModal(std)}
                              sx={{ color: '#38bdf8', '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)' } }}
                            >
                              <Edit size={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa khỏi danh sách">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteStudent(std.id, std.fullName)}
                              sx={{ color: '#ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.15)' } }}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* MODAL 1: TEACHER EVALUATION & NICKNAME DIALOG */}
      <Dialog
        open={evalModalOpen}
        onClose={() => setEvalModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0f172a',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 3,
            color: 'white',
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Award size={22} color="#f59e0b" />
            <Typography variant="h6" fontWeight="bold">
              Đánh Giá Năng Lực & Đặt Biệt Danh Sư Phạm
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setEvalModalOpen(false)}>
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2.5 }}>
          {activeStudent && (
            <Box display="flex" flexDirection="column" gap={2.5}>
              {/* Student Overview Card */}
              <Paper
                sx={{
                  p: 2,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold" color="white">
                      {activeStudent.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lớp: <b>{activeStudent.className}</b> • Trường: {activeStudent.school}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.8}>
                      <Chip label={`⚡ ${activeStudent.kahootExp} EXP`} size="small" sx={{ bgcolor: 'rgba(234, 179, 8, 0.15)', color: '#eab308', fontWeight: 'bold' }} />
                      <Chip label={`🔥 Chuỗi ${activeStudent.kahootStreak} trận`} size="small" sx={{ bgcolor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', fontWeight: 'bold' }} />
                      <Chip label={`📅 Đăng nhập ${activeStudent.loginStreak} ngày`} size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 'bold' }} />
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* 1. Edit Nickname */}
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="#fbbf24" mb={1} display="flex" alignItems="center" gap={0.8}>
                  <Tag size={16} /> Biệt Danh Danh Dự Do Giáo Viên Phong Tặng:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Ví dụ: Thần Đồng Oxi Hóa - Khử, Bậc Thầy Cấu Hình Electron..."
                  value={editNickname}
                  onChange={(e) => setEditNickname(e.target.value)}
                  sx={{ mb: 1.5 }}
                />
                <Typography variant="caption" color="text.secondary" display="block" mb={0.8}>
                  Gợi ý biệt danh phong tặng nhanh:
                </Typography>
                <Stack direction="row" spacing={0.8} flexWrap="wrap" gap={0.6}>
                  {NICKNAME_PRESETS.map((preset) => (
                    <Chip
                      key={preset}
                      label={preset}
                      size="small"
                      onClick={() => setEditNickname(preset)}
                      sx={{
                        fontSize: 11,
                        cursor: 'pointer',
                        bgcolor: editNickname === preset ? '#f59e0b' : 'rgba(255,255,255,0.06)',
                        color: editNickname === preset ? '#000' : 'text.primary',
                        fontWeight: editNickname === preset ? 'bold' : 'normal',
                        '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.2)' },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

              {/* 2. Bonus EXP */}
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8" mb={1} display="flex" alignItems="center" gap={0.8}>
                  <Zap size={16} /> Thưởng Điểm Kinh Nghiệm (Bonus EXP):
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button size="small" variant="outlined" onClick={() => setBonusExp(50)}>+50 EXP (Chuyên cần)</Button>
                  <Button size="small" variant="outlined" onClick={() => setBonusExp(100)}>+100 EXP (Phát biểu hay)</Button>
                  <Button size="small" variant="outlined" onClick={() => setBonusExp(200)}>+200 EXP (Dự án xuất sắc)</Button>
                  <TextField
                    type="number"
                    size="small"
                    label="Tùy chỉnh EXP"
                    value={bonusExp}
                    onChange={(e) => setBonusExp(Number(e.target.value))}
                    sx={{ width: 130 }}
                  />
                </Stack>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

              {/* 3. Teacher Evaluation Text with AI Suggestion */}
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" fontWeight="bold" color="#34d399" display="flex" alignItems="center" gap={0.8}>
                    <BookOpen size={16} /> Nhận Xét Năng Lực & Dặn Dò Sư Phạm:
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Sparkles size={14} color="#a855f7" />}
                    onClick={handleGenerateAiEvaluation}
                    disabled={isAiGenerating}
                    sx={{
                      borderColor: 'rgba(168, 85, 247, 0.4)',
                      color: '#c084fc',
                      fontSize: 11,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.15)' },
                    }}
                  >
                    {isAiGenerating ? 'AI Đang viết...' : 'AI Viết Nhận Xét Năng Lực'}
                  </Button>
                </Box>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Nhập nhận xét chuyên môn của Thầy/Cô về năng lực giải toán, thái độ học tập và định hướng ôn tập..."
                  value={editEvaluation}
                  onChange={(e) => setEditEvaluation(e.target.value)}
                />
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Button onClick={() => setEvalModalOpen(false)} color="inherit">
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEvaluation}
            sx={{ bgcolor: '#f59e0b', color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#d97706' } }}
          >
            Lưu Đánh Giá & Biệt Danh
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
