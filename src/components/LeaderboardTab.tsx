"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
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
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import {
  Trophy,
  Award,
  Flame,
  Calendar,
  Search,
  RefreshCw,
  GraduationCap,
  Zap,
  Tag,
  Crown,
  X,
  FileSpreadsheet,
  Globe2,
  Building2,
  MapPin,
  Compass,
} from 'lucide-react';
import { supabase } from '@/lib/api';
import { UserProfile } from '@/components/UserAuthModal';
import { calculateCompetencyRank } from '@/components/StudentProgressManager';

export interface LeaderboardStudent extends UserProfile {
  kahootExp: number;
  kahootStreak: number;
  loginStreak: number;
  nickname: string;
  totalKahootQuestions: number;
  correctKahootQuestions: number;
  teacherEvaluation: string;
  lastActiveDate: string;
}

interface LeaderboardTabProps {
  currentUser?: UserProfile | null;
  onNavigateTab?: (tabIndex: number) => void;
}

// Preset provinces & cities/districts in Vietnam
const PRESET_PROVINCES = [
  'Tất cả tỉnh / thành',
  'Tỉnh An Giang',
  'TP. Hồ Chí Minh',
  'TP. Cần Thơ',
  'TP. Hà Nội',
  'TP. Đà Nẵng',
  'Tỉnh Kiên Giang',
  'Tỉnh Đồng Tháp',
  'Tỉnh Vĩnh Long',
  'Tỉnh Tiền Giang',
  'Tỉnh Hậu Giang',
  'Tỉnh Bến Tre',
  'Tỉnh Trà Vinh',
  'Tỉnh Sóc Trăng',
  'Tỉnh Bạc Liêu',
  'Tỉnh Cà Mau',
  'Tỉnh Bình Dương',
  'Tỉnh Đồng Nai',
  'Tỉnh Lâm Đồng',
  'Tỉnh Khánh Hòa',
];

const PRESET_CITIES = [
  'Tất cả thành phố / huyện',
  'TP. Châu Đốc',
  'TP. Long Xuyên',
  'TX. Tân Châu',
  'Huyện Tri Tôn',
  'Huyện Tịnh Biên',
  'Huyện Thoại Sơn',
  'Huyện Chợ Mới',
  'Huyện An Phú',
  'Huyện Châu Phú',
  'Huyện Châu Thành',
  'Huyện Phú Tân',
  'Quận 1, TP.HCM',
  'Quận 5, TP.HCM',
  'TP. Thủ Đức, TP.HCM',
  'Quận Ninh Kiều, Cần Thơ',
  'Quận Cầu Giấy, Hà Nội',
  'Quận Hải Châu, Đà Nẵng',
  'TP. Rạch Giá, Kiên Giang',
  'TP. Cao Lãnh, Đồng Tháp',
];

export default function LeaderboardTab({ currentUser }: LeaderboardTabProps) {
  // Category tabs: 0 = EXP, 1 = Kahoot Streak, 2 = Login Streak
  const [activeCategory, setActiveCategory] = useState<number>(0);

  // Region Scope: 'city' | 'province' | 'national'
  const [scopeType, setScopeType] = useState<'city' | 'province' | 'national'>('national');
  const [selectedCity, setSelectedCity] = useState<string>('Tất cả thành phố / huyện');
  const [selectedProvince, setSelectedProvince] = useState<string>('Tất cả tỉnh / thành');

  const [students, setStudents] = useState<LeaderboardStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('Tất cả lớp');
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // Load students from database / storage
  useEffect(() => {
    loadLeaderboardData();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'chemai_registered_users' || e.key === 'chemai_current_user') {
        loadLeaderboardData();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const loadLeaderboardData = async () => {
    try {
      const raw = localStorage.getItem('chemai_registered_users');
      let registeredUsers: UserProfile[] = raw ? JSON.parse(raw) : [];

      // Purge any legacy sample seed accounts (std_seed_*)
      const purged = registeredUsers.filter((u) => !u.id?.startsWith('std_seed_'));
      if (purged.length !== registeredUsers.length) {
        localStorage.setItem('chemai_registered_users', JSON.stringify(purged));
        registeredUsers = purged;
      }

      let studentOnly = registeredUsers.filter(
        (u) => !u.id?.startsWith('std_seed_') && (u.role === 'student' || (!u.role && u.className && !u.className.includes('Giáo viên') && !u.className.includes('GV')))
      );

      // Attempt sync with Supabase remote database
      try {
        const { data: remoteUsers } = await supabase.from('user_profiles').select('*').eq('role', 'student');
        if (remoteUsers && remoteUsers.length > 0) {
          const map = new Map<string, UserProfile>();
          studentOnly.forEach((u) => map.set(u.id, u));

          remoteUsers.forEach((r) => {
            const uid = r.user_id || r.id;
            if (!map.has(uid) && !uid.startsWith('std_seed_')) {
              map.set(uid, {
                id: uid,
                fullName: r.full_name,
                authType: r.auth_type || 'email',
                emailOrPhone: r.email_or_phone,
                role: 'student',
                className: r.class_name || '10A1',
                school: r.school || '',
                location: r.location || '',
                createdAt: r.created_at || new Date().toISOString(),
                kahootExp: r.kahoot_exp || 0,
                kahootStreak: r.kahoot_streak || 0,
                loginStreak: r.login_streak || 1,
                nickname: r.nickname || '',
                totalKahootQuestions: r.total_questions || 0,
                correctKahootQuestions: r.correct_questions || 0,
                teacherEvaluation: r.teacher_evaluation || '',
                lastActiveDate: r.last_active_date || r.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
              });
            }
          });
          studentOnly = Array.from(map.values());
        }
      } catch (err) {
        console.warn('Supabase leaderboard fetch:', err);
      }

      const mapped: LeaderboardStudent[] = studentOnly.map((u) => {
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

      setStudents(mapped);
    } catch (e) {
      console.warn('Leaderboard error:', e);
      setStudents([]);
    }
  };

  // Class list for filtering
  const classList = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.className) set.add(s.className);
    });
    return ['Tất cả lớp', ...Array.from(set)];
  }, [students]);

  // Dynamic Province options (merged with preset)
  const provinceOptions = useMemo(() => {
    const set = new Set<string>(PRESET_PROVINCES);
    students.forEach((s) => {
      if (s.location) set.add(s.location);
    });
    return Array.from(set);
  }, [students]);

  // Dynamic City options (merged with preset)
  const cityOptions = useMemo(() => {
    const set = new Set<string>(PRESET_CITIES);
    students.forEach((s) => {
      if (s.location) set.add(s.location);
    });
    return Array.from(set);
  }, [students]);

  // Filter students based on Scope (National / Province / City)
  const scopedStudents = useMemo(() => {
    return students.filter((s) => {
      if (scopeType === 'national') return true;

      const loc = (s.location || '').toLowerCase();
      const school = (s.school || '').toLowerCase();

      if (scopeType === 'province') {
        if (selectedProvince === 'Tất cả tỉnh / thành') return true;
        const target = selectedProvince.toLowerCase().replace(/^(tỉnh|tp\.|thành phố)\s+/i, '').trim();
        return loc.includes(target) || school.includes(target);
      }

      if (scopeType === 'city') {
        if (selectedCity === 'Tất cả thành phố / huyện') return true;
        const target = selectedCity.toLowerCase().replace(/^(tp\.|thành phố|thị xã|tx\.|huyện)\s+/i, '').trim();
        return loc.includes(target) || school.includes(target);
      }

      return true;
    });
  }, [students, scopeType, selectedProvince, selectedCity]);

  // Sorted list based on active category
  const sortedStudents = useMemo(() => {
    return [...scopedStudents].sort((a, b) => {
      if (activeCategory === 0) {
        // 1. Kinh nghiệm (EXP)
        if (b.kahootExp !== a.kahootExp) return b.kahootExp - a.kahootExp;
        return b.correctKahootQuestions - a.correctKahootQuestions;
      } else if (activeCategory === 1) {
        // 2. Chuỗi Kahoot (Streak)
        if (b.kahootStreak !== a.kahootStreak) return b.kahootStreak - a.kahootStreak;
        return b.kahootExp - a.kahootExp;
      } else {
        // 3. Chuỗi đăng nhập (Login Streak)
        if (b.loginStreak !== a.loginStreak) return b.loginStreak - a.loginStreak;
        return b.kahootExp - a.kahootExp;
      }
    });
  }, [scopedStudents, activeCategory]);

  // Filtered list for display in table (search & class filter)
  const filteredStudents = useMemo(() => {
    return sortedStudents.filter((s) => {
      const matchSearch =
        !searchQuery.trim() ||
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.className?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchClass = selectedClass === 'Tất cả lớp' || s.className === selectedClass;
      return matchSearch && matchClass;
    });
  }, [sortedStudents, searchQuery, selectedClass]);

  // Top 3 Podium Students
  const top1 = sortedStudents[0] || null;
  const top2 = sortedStudents[1] || null;
  const top3 = sortedStudents[2] || null;

  // Current logged in user rank
  const myRankIndex = useMemo(() => {
    if (!currentUser) return -1;
    return sortedStudents.findIndex((s) => s.id === currentUser.id);
  }, [sortedStudents, currentUser]);

  const myStudentData = myRankIndex !== -1 ? sortedStudents[myRankIndex] : null;

  // Export CSV
  const handleExportLeaderboardCSV = () => {
    const headers = [
      'Hạng',
      'Họ và Tên',
      'Lớp',
      'Trường THPT',
      'Khu Vực / Tỉnh Thành',
      'Biệt Danh',
      'Kinh Nghiệm (EXP)',
      'Cấp Độ',
      'Chuỗi Kahoot (Trận)',
      'Chuỗi Đăng Nhập (Ngày)',
      'Số Câu Làm',
      'Số Câu Đúng',
      'Tỉ Lệ Đúng (%)',
      'Xếp Loại Năng Lực',
    ];

    const rows = filteredStudents.map((s, idx) => {
      const comp = calculateCompetencyRank(s.kahootExp, s.totalKahootQuestions, s.correctKahootQuestions);
      return [
        idx + 1,
        `"${s.fullName}"`,
        `"${s.className}"`,
        `"${s.school}"`,
        `"${s.location || ''}"`,
        `"${s.nickname}"`,
        s.kahootExp,
        comp.level,
        s.kahootStreak,
        s.loginStreak,
        s.totalKahootQuestions,
        s.correctKahootQuestions,
        `${comp.accuracy}%`,
        `"${comp.shortRank}"`,
      ].join(',');
    });

    const categoryName = activeCategory === 0 ? 'Kinh_Nghiem_EXP' : activeCategory === 1 ? 'Chuoi_Kahoot' : 'Chuoi_Dang_Nhap';
    const scopeName = scopeType === 'national' ? 'Toan_Quoc' : scopeType === 'province' ? selectedProvince.replace(/\s+/g, '_') : selectedCity.replace(/\s+/g, '_');
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Bang_Xep_Hang_${scopeName}_${categoryName}_ChemAI_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pb: 8 }}>
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

      {/* 1. HERO BANNER */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          mb: 3.5,
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.92) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(245, 158, 11, 0.15)',
        }}
      >
        {/* Glow Effects */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <Grid container spacing={2.5} alignItems="center">
          <Grid item xs={12} md={8}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={1.2}>
              <Box
                sx={{
                  p: 1.3,
                  borderRadius: 2.5,
                  bgcolor: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f59e0b',
                }}
              >
                <Trophy size={32} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="900" color="white" sx={{ fontSize: { xs: '20px', sm: '26px' }, letterSpacing: '-0.5px' }}>
                  Bảng Xếp Hạng Học Sinh Hóa Học 10
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px' }}>
                  Hóa Học 10 GDPT 2018 • Xếp hạng đa cấp: Thành Phố / Thị Xã — Tỉnh — Toàn Quốc
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 740, lineHeight: 1.7, fontSize: '13.5px' }}>
              Vinh danh các <b>Học Sinh</b> có thành tích Hóa học xuất sắc nhất theo 3 phạm vi địa lý (<b>Thành Phố / Huyện</b>, <b>Tỉnh</b> và <b>Toàn Quốc</b>), 
              dựa trên 3 chỉ số cốt lõi: <b>Điểm Kinh Nghiệm (EXP)</b>, <b>Chuỗi Thắng Kahoot</b> và <b>Chuỗi Ngày Đăng Nhập</b>.
            </Typography>

            {/* Quick Metrics */}
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
              <Chip
                icon={<GraduationCap size={15} color="#38bdf8" />}
                label={`Tổng số học sinh: ${scopedStudents.length} học sinh`}
                size="small"
                sx={{ bgcolor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', fontWeight: 'bold', border: '1px solid rgba(56, 189, 248, 0.3)' }}
              />
              <Chip
                icon={<Crown size={15} color="#f59e0b" />}
                label={`Quán quân: ${top1?.fullName || 'Chưa xác định'}`}
                size="small"
                sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontWeight: 'bold', border: '1px solid rgba(245, 158, 11, 0.3)' }}
              />
              <Chip
                icon={<Compass size={15} color="#10b981" />}
                label={
                  scopeType === 'national'
                    ? 'Phạm vi: Toàn Quốc 🇻🇳'
                    : scopeType === 'province'
                    ? `Phạm vi: ${selectedProvince}`
                    : `Phạm vi: ${selectedCity}`
                }
                size="small"
                sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 'bold', border: '1px solid rgba(16, 185, 129, 0.3)' }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent={{ md: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<RefreshCw size={16} />}
                onClick={() => {
                  loadLeaderboardData();
                  setNotification({ type: 'success', message: 'Đã cập nhật bảng xếp hạng thời gian thực!' });
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
                Làm Mới BXH
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileSpreadsheet size={16} />}
                onClick={handleExportLeaderboardCSV}
                sx={{
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.1)', borderColor: '#38bdf8' },
                }}
              >
                Xuất Báo Cáo
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* 2. REGIONAL SCOPE SELECTOR (3 VÙNG: THÀNH PHỐ / TỈNH / TOÀN QUỐC) */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3.5,
          bgcolor: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* 3 Scope Buttons */}
          <Grid item xs={12} md={7}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block', color: '#94a3b8', fontWeight: 'bold' }}>
              📍 CHỌN PHẠM VI KHU VỰC XẾP HẠNG:
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant={scopeType === 'city' ? 'contained' : 'outlined'}
                  startIcon={<Building2 size={16} />}
                  onClick={() => setScopeType('city')}
                  sx={{
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: { xs: '11px', sm: '13px' },
                    textTransform: 'none',
                    bgcolor: scopeType === 'city' ? '#0284c7' : 'rgba(2, 132, 199, 0.06)',
                    borderColor: scopeType === 'city' ? '#0284c7' : 'rgba(56, 189, 248, 0.3)',
                    color: scopeType === 'city' ? '#fff' : '#38bdf8',
                    '&:hover': { bgcolor: scopeType === 'city' ? '#0369a1' : 'rgba(56, 189, 248, 0.15)' },
                  }}
                >
                  Thành Phố / Huyện
                </Button>
              </Grid>

              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant={scopeType === 'province' ? 'contained' : 'outlined'}
                  startIcon={<MapPin size={16} />}
                  onClick={() => setScopeType('province')}
                  sx={{
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: { xs: '11px', sm: '13px' },
                    textTransform: 'none',
                    bgcolor: scopeType === 'province' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.06)',
                    borderColor: scopeType === 'province' ? '#8b5cf6' : 'rgba(167, 139, 250, 0.3)',
                    color: scopeType === 'province' ? '#fff' : '#a78bfa',
                    '&:hover': { bgcolor: scopeType === 'province' ? '#7c3aed' : 'rgba(167, 139, 250, 0.15)' },
                  }}
                >
                  Cấp Tỉnh / Thành
                </Button>
              </Grid>

              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant={scopeType === 'national' ? 'contained' : 'outlined'}
                  startIcon={<Globe2 size={16} />}
                  onClick={() => setScopeType('national')}
                  sx={{
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: { xs: '11px', sm: '13px' },
                    textTransform: 'none',
                    bgcolor: scopeType === 'national' ? '#f59e0b' : 'rgba(245, 158, 11, 0.06)',
                    borderColor: scopeType === 'national' ? '#f59e0b' : 'rgba(245, 158, 11, 0.3)',
                    color: scopeType === 'national' ? '#000' : '#fbbf24',
                    '&:hover': { bgcolor: scopeType === 'national' ? '#d97706' : 'rgba(245, 158, 11, 0.15)' },
                  }}
                >
                  Toàn Quốc 🇻🇳
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Scope Dropdown Selection */}
          <Grid item xs={12} md={5}>
            {scopeType === 'city' && (
              <FormControl fullWidth size="small">
                <InputLabel>Chọn Thành Phố / Thị Xã / Huyện</InputLabel>
                <Select
                  value={selectedCity}
                  label="Chọn Thành Phố / Thị Xã / Huyện"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cityOptions.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {scopeType === 'province' && (
              <FormControl fullWidth size="small">
                <InputLabel>Chọn Tỉnh / Thành Phố</InputLabel>
                <Select
                  value={selectedProvince}
                  label="Chọn Tỉnh / Thành Phố"
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  {provinceOptions.map((p) => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {scopeType === 'national' && (
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.2,
                }}
              >
                <Globe2 size={20} color="#f59e0b" />
                <Typography variant="body2" color="#fbbf24" fontWeight="bold">
                  Bảng Xếp Hạng Toàn Quốc (63 Tỉnh Thành Việt Nam)
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* 3. CATEGORY SELECTOR TABS (3 MỤC: EXP / KAHOOT STREAK / LOGIN STREAK) */}
      <Paper
        elevation={0}
        sx={{
          mb: 3.5,
          p: 0.8,
          borderRadius: 3,
          bgcolor: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Tabs
          value={activeCategory}
          onChange={(_, newVal) => setActiveCategory(newVal)}
          variant="fullWidth"
          sx={{
            minHeight: 48,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: { xs: '12.5px', sm: '14.5px' },
              borderRadius: 2.5,
              minHeight: 46,
              color: '#94a3b8',
              transition: 'all 0.2s ease',
              '&.Mui-selected': {
                color: activeCategory === 0 ? '#f59e0b' : activeCategory === 1 ? '#f43f5e' : '#10b981',
                bgcolor:
                  activeCategory === 0
                    ? 'rgba(245, 158, 11, 0.15)'
                    : activeCategory === 1
                    ? 'rgba(244, 63, 94, 0.15)'
                    : 'rgba(16, 185, 129, 0.15)',
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: activeCategory === 0 ? '#f59e0b' : activeCategory === 1 ? '#f43f5e' : '#10b981',
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          <Tab
            icon={<Zap size={18} />}
            iconPosition="start"
            label="1. Xếp Hạng Điểm Kinh Nghiệm (EXP)"
          />
          <Tab
            icon={<Flame size={18} />}
            iconPosition="start"
            label="2. Xếp Hạng Chuỗi Kahoot (Streak)"
          />
          <Tab
            icon={<Calendar size={18} />}
            iconPosition="start"
            label="3. Xếp Hạng Chuỗi Ngày Đăng Nhập"
          />
        </Tabs>
      </Paper>

      {/* 4. PODIUM (TOP 3 RANKING) */}
      {sortedStudents.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="white"
            align="center"
            sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
          >
            <Crown size={22} color="#f59e0b" /> Bục Vinh Quang Top 3 Học Sinh Xuất Sắc
          </Typography>

          <Grid container spacing={2.5} alignItems="flex-end" justifyContent="center">
            {/* TOP 2 (SILVER - LEFT) */}
            <Grid item xs={12} sm={4} order={{ xs: 2, sm: 1 }}>
              <PodiumCard
                student={top2}
                rank={2}
                rankLabel="HẠNG 2 (Á QUÂN)"
                themeColor="#94a3b8"
                badgeColor="#cbd5e1"
                activeCategory={activeCategory}
              />
            </Grid>

            {/* TOP 1 (GOLD - CENTER - ELEVATED) */}
            <Grid item xs={12} sm={4} order={{ xs: 1, sm: 2 }}>
              <PodiumCard
                student={top1}
                rank={1}
                rankLabel="HẠNG 1 (QUÁN QUÂN)"
                themeColor="#f59e0b"
                badgeColor="#fbbf24"
                activeCategory={activeCategory}
                isCenter
              />
            </Grid>

            {/* TOP 3 (BRONZE - RIGHT) */}
            <Grid item xs={12} sm={4} order={{ xs: 3, sm: 3 }}>
              <PodiumCard
                student={top3}
                rank={3}
                rankLabel="HẠNG 3 (QUÝ QUÂN)"
                themeColor="#f97316"
                badgeColor="#fb923c"
                activeCategory={activeCategory}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* 5. CURRENT USER POSITION CARD (If logged in as student) */}
      {currentUser && currentUser.role !== 'teacher' && myStudentData && (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 3.5,
            borderRadius: 3,
            bgcolor: 'rgba(2, 132, 199, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 8px 24px rgba(2, 132, 199, 0.2)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    bgcolor: '#0284c7',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    fontSize: '20px',
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.5)',
                  }}
                >
                  #{myRankIndex + 1}
                </Box>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6" fontWeight="bold" color="white">
                      Vị trí của bạn: Hạng #{myRankIndex + 1}
                    </Typography>
                    <Chip label="Bạn" size="small" sx={{ bgcolor: '#0284c7', color: '#fff', fontWeight: 'bold', height: 20, fontSize: 11 }} />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {myStudentData.fullName} • {myStudentData.className} • Biệt danh: <b>{myStudentData.nickname || 'Chiến Binh Hóa Học'}</b>
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1.5} justifyContent={{ md: 'flex-end' }}>
                <Chip
                  icon={<Zap size={14} color="#eab308" />}
                  label={`${myStudentData.kahootExp.toLocaleString()} EXP`}
                  sx={{ bgcolor: 'rgba(234, 179, 8, 0.15)', color: '#fbbf24', fontWeight: 'bold' }}
                />
                <Chip
                  icon={<Flame size={14} color="#f43f5e" />}
                  label={`🔥 ${myStudentData.kahootStreak} trận`}
                  sx={{ bgcolor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', fontWeight: 'bold' }}
                />
                <Chip
                  icon={<Calendar size={14} color="#10b981" />}
                  label={`📅 ${myStudentData.loginStreak}d`}
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 'bold' }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* 6. FILTER & SEARCH BAR */}
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
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm theo tên học sinh, biệt danh, lớp, trường..."
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

          <Grid item xs={12} sm={6} md={3.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Lọc theo Lớp Học</InputLabel>
              <Select
                value={selectedClass}
                label="Lọc theo Lớp Học"
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classList.map((cls) => (
                  <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3.5} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Typography variant="body2" color="text.secondary" fontWeight="500">
              Hiển thị: <b>{filteredStudents.length}</b> / {scopedStudents.length} học sinh
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* 7. FULL RANKING TABLE */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3.5,
          bgcolor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
        }}
      >
        <Box p={2} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid rgba(255,255,255,0.08)">
          <Box display="flex" alignItems="center" gap={1}>
            <Award size={20} color="#f59e0b" />
            <Typography variant="subtitle1" fontWeight="bold" color="white">
              Bảng Xếp Hạng Chi Tiết —{' '}
              {activeCategory === 0 ? 'Điểm Kinh Nghiệm (EXP)' : activeCategory === 1 ? 'Chuỗi Kahoot Bất Bại' : 'Chuỗi Ngày Đăng Nhập'}
            </Typography>
          </Box>
          <Chip
            label={activeCategory === 0 ? '⚡ Xếp theo EXP' : activeCategory === 1 ? '🔥 Xếp theo Streak' : '📅 Xếp theo Ngày'}
            size="small"
            sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontWeight: 'bold' }}
          />
        </Box>

        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold', width: 80, textAlign: 'center' }}>Hạng</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Học Sinh</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Khu Vực / Tỉnh</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Biệt Danh Phong Tặng</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>
                  {activeCategory === 0 ? '⚡ Kinh Nghiệm (EXP)' : activeCategory === 1 ? '🔥 Chuỗi Thắng Kahoot' : '📅 Chuỗi Đăng Nhập'}
                </TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Chỉ Số Phụ</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontWeight: 'bold' }}>Xếp Loại Năng Lực</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <GraduationCap size={36} color="#64748b" />
                      <Typography variant="subtitle1" fontWeight="bold" color="#94a3b8">
                        {students.length === 0
                          ? 'Chưa có tài khoản học sinh nào đăng ký trên hệ thống'
                          : 'Không tìm thấy học sinh nào phù hợp với phạm vi & bộ lọc tìm kiếm!'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 460 }}>
                        {students.length === 0
                          ? 'Dữ liệu xếp hạng sẽ tự động cập nhật ngay khi học sinh đăng ký tài khoản và hoàn thành các bài thi đấu Kahoot.'
                          : 'Hãy thử đổi sang phạm vi Toàn Quốc hoặc chọn "Tất cả lớp".'}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((std, idx) => {
                  const rankNum = idx + 1;
                  const isTop1 = rankNum === 1;
                  const isTop2 = rankNum === 2;
                  const isTop3 = rankNum === 3;
                  const isSelf = currentUser?.id === std.id;
                  const comp = calculateCompetencyRank(std.kahootExp, std.totalKahootQuestions, std.correctKahootQuestions);

                  return (
                    <TableRow
                      key={std.id}
                      hover
                      sx={{
                        bgcolor: isSelf
                          ? 'rgba(2, 132, 199, 0.12)'
                          : isTop1
                          ? 'rgba(245, 158, 11, 0.05)'
                          : 'transparent',
                        borderLeft: isSelf ? '3px solid #38bdf8' : isTop1 ? '3px solid #f59e0b' : 'none',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' },
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {/* 1. Rank Badge */}
                      <TableCell sx={{ textAlign: 'center' }}>
                        {isTop1 ? (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: 'rgba(245, 158, 11, 0.2)',
                              border: '1px solid #f59e0b',
                              color: '#fbbf24',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              fontWeight: '900',
                              fontSize: 14,
                            }}
                          >
                            👑 1
                          </Box>
                        ) : isTop2 ? (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: 'rgba(148, 163, 184, 0.2)',
                              border: '1px solid #94a3b8',
                              color: '#cbd5e1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              fontWeight: '900',
                              fontSize: 13,
                            }}
                          >
                            🥈 2
                          </Box>
                        ) : isTop3 ? (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: 'rgba(249, 115, 22, 0.2)',
                              border: '1px solid #f97316',
                              color: '#fb923c',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              fontWeight: '900',
                              fontSize: 13,
                            }}
                          >
                            🥉 3
                          </Box>
                        ) : (
                          <Typography variant="body2" fontWeight="bold" color="text.secondary">
                            #{rankNum}
                          </Typography>
                        )}
                      </TableCell>

                      {/* 2. Student Name & Class */}
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.2}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              fontSize: 13,
                              fontWeight: 'bold',
                              bgcolor: isTop1 ? '#f59e0b' : isTop2 ? '#94a3b8' : isTop3 ? '#f97316' : comp.badgeColor,
                              color: '#000',
                            }}
                          >
                            {std.fullName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Stack direction="row" spacing={0.8} alignItems="center">
                              <Typography variant="body2" fontWeight="bold" color="white" noWrap sx={{ maxWidth: 170 }}>
                                {std.fullName}
                              </Typography>
                              {isSelf && (
                                <Chip label="Bạn" size="small" sx={{ bgcolor: '#0284c7', color: '#fff', fontWeight: 'bold', height: 17, fontSize: 9.5 }} />
                              )}
                            </Stack>
                            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', fontSize: 11 }}>
                              {std.className} • {std.school}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* 3. Location */}
                      <TableCell>
                        <Chip
                          icon={<MapPin size={11} color="#38bdf8" />}
                          label={std.location || 'Chưa cập nhật'}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(56, 189, 248, 0.08)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            fontSize: 11,
                            maxWidth: 150,
                          }}
                        />
                      </TableCell>

                      {/* 4. Nickname */}
                      <TableCell>
                        <Chip
                          icon={<Tag size={12} color="#f59e0b" />}
                          label={std.nickname || 'Chưa đặt biệt danh'}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(245, 158, 11, 0.1)',
                            color: '#fbbf24',
                            border: '1px solid rgba(245, 158, 11, 0.25)',
                            fontWeight: '600',
                            fontSize: 11,
                          }}
                        />
                      </TableCell>

                      {/* 5. Primary Metric (Depends on Category) */}
                      <TableCell>
                        {activeCategory === 0 ? (
                          <Box sx={{ minWidth: 130 }}>
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
                        ) : activeCategory === 1 ? (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              icon={<Flame size={14} color="#f43f5e" />}
                              label={`🔥 Chuỗi: ${std.kahootStreak} trận thắng`}
                              sx={{ bgcolor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', fontWeight: 'bold', fontSize: 12 }}
                            />
                          </Stack>
                        ) : (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              icon={<Calendar size={14} color="#10b981" />}
                              label={`📅 Đăng nhập: ${std.loginStreak} ngày liên tục`}
                              sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 'bold', fontSize: 12 }}
                            />
                          </Stack>
                        )}
                      </TableCell>

                      {/* 6. Secondary Metrics */}
                      <TableCell>
                        <Stack direction="row" spacing={0.8} alignItems="center">
                          {activeCategory !== 0 && (
                            <Chip
                              label={`⚡ ${std.kahootExp} EXP`}
                              size="small"
                              sx={{ height: 20, fontSize: 10.5, bgcolor: 'rgba(234, 179, 8, 0.12)', color: '#fbbf24', fontWeight: 'bold' }}
                            />
                          )}
                          {activeCategory !== 1 && (
                            <Chip
                              label={`🔥 ${std.kahootStreak}t`}
                              size="small"
                              sx={{ height: 20, fontSize: 10.5, bgcolor: 'rgba(244, 63, 94, 0.12)', color: '#f43f5e', fontWeight: 'bold' }}
                            />
                          )}
                          {activeCategory !== 2 && (
                            <Chip
                              label={`📅 ${std.loginStreak}d`}
                              size="small"
                              sx={{ height: 20, fontSize: 10.5, bgcolor: 'rgba(16, 185, 129, 0.12)', color: '#34d399', fontWeight: 'bold' }}
                            />
                          )}
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11, ml: 0.5 }}>
                            Đúng: {comp.accuracy}% ({std.correctKahootQuestions}/{std.totalKahootQuestions})
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* 7. Competency Rank Badge */}
                      <TableCell>
                        <Chip
                          icon={comp.icon}
                          label={comp.shortRank}
                          size="small"
                          sx={{
                            bgcolor: `${comp.badgeColor}18`,
                            color: comp.badgeColor,
                            border: `1px solid ${comp.badgeColor}40`,
                            fontWeight: 'bold',
                            fontSize: 11,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

// ----------------------------------------------------
// PODIUM COMPONENT FOR TOP 3
// ----------------------------------------------------
function PodiumCard({
  student,
  rank,
  rankLabel,
  themeColor,
  badgeColor,
  activeCategory,
  isCenter = false,
}: {
  student: LeaderboardStudent | null;
  rank: number;
  rankLabel: string;
  themeColor: string;
  badgeColor: string;
  activeCategory: number;
  isCenter?: boolean;
}) {
  if (!student) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          textAlign: 'center',
          borderRadius: 3.5,
          bgcolor: 'rgba(15, 23, 42, 0.6)',
          border: `1px dashed rgba(255, 255, 255, 0.15)`,
          minHeight: isCenter ? 260 : 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1.5,
            color: 'text.secondary',
            fontWeight: 'bold',
          }}
        >
          #{rank}
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight="bold">
          Chưa xác định
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Chưa có học sinh trong khu vực này
        </Typography>
      </Paper>
    );
  }

  const comp = calculateCompetencyRank(student.kahootExp, student.totalKahootQuestions, student.correctKahootQuestions);

  return (
    <Paper
      elevation={isCenter ? 12 : 4}
      sx={{
        p: { xs: 2.5, sm: 3 },
        textAlign: 'center',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        background: isCenter
          ? 'linear-gradient(180deg, rgba(245, 158, 11, 0.18) 0%, rgba(15, 23, 42, 0.95) 100%)'
          : rank === 2
          ? 'linear-gradient(180deg, rgba(148, 163, 184, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)'
          : 'linear-gradient(180deg, rgba(249, 115, 22, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: `1.5px solid ${themeColor}`,
        boxShadow: isCenter
          ? `0 16px 36px rgba(0,0,0,0.5), 0 0 24px ${themeColor}40`
          : `0 10px 24px rgba(0,0,0,0.4)`,
        transform: isCenter ? { xs: 'none', sm: 'translateY(-12px)' } : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: isCenter ? { xs: 'none', sm: 'translateY(-16px)' } : 'translateY(-4px)',
          boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${themeColor}60`,
        },
      }}
    >
      {/* Crown / Trophy icon for center */}
      {isCenter && (
        <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Crown size={22} color="#f59e0b" />
        </Box>
      )}

      {/* Rank Header */}
      <Chip
        label={rankLabel}
        size="small"
        sx={{
          bgcolor: `${themeColor}22`,
          color: badgeColor,
          fontWeight: '900',
          fontSize: '11px',
          border: `1px solid ${themeColor}60`,
          mb: 2,
        }}
      />

      {/* Avatar with Ring */}
      <Box sx={{ position: 'relative', width: 68, height: 68, mx: 'auto', mb: 1.5 }}>
        <Avatar
          sx={{
            width: 68,
            height: 68,
            fontSize: '24px',
            fontWeight: '900',
            bgcolor: themeColor,
            color: '#000',
            border: `3px solid ${badgeColor}`,
            boxShadow: `0 0 20px ${themeColor}80`,
          }}
        >
          {student.fullName.charAt(0).toUpperCase()}
        </Avatar>
        <Box
          sx={{
            position: 'absolute',
            bottom: -6,
            right: -4,
            width: 26,
            height: 26,
            borderRadius: '50%',
            bgcolor: '#0f172a',
            border: `2px solid ${themeColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '900',
            color: badgeColor,
          }}
        >
          {rank === 1 ? '👑' : rank === 2 ? '🥈' : '🥉'}
        </Box>
      </Box>

      {/* Student Name */}
      <Typography variant="h6" fontWeight="bold" color="white" noWrap sx={{ fontSize: isCenter ? '18px' : '16px' }}>
        {student.fullName}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" noWrap sx={{ fontSize: '11.5px', mb: 0.5 }}>
        {student.className} • {student.school}
      </Typography>
      <Typography variant="caption" color="#38bdf8" display="block" noWrap sx={{ fontSize: '11px', mb: 1 }}>
        📍 {student.location || 'Việt Nam'}
      </Typography>

      {/* Nickname */}
      <Chip
        icon={<Tag size={11} color="#f59e0b" />}
        label={student.nickname || 'Chiến Binh Hóa Học'}
        size="small"
        sx={{
          bgcolor: 'rgba(245, 158, 11, 0.12)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          fontWeight: 'bold',
          fontSize: '10.5px',
          mb: 2,
          maxWidth: '100%',
        }}
      />

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />

      {/* Highlighted Metric for active Category */}
      {activeCategory === 0 ? (
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
            TỔNG KINH NGHIỆM
          </Typography>
          <Typography variant="h5" fontWeight="900" sx={{ color: '#eab308', my: 0.3 }}>
            ⚡ {student.kahootExp.toLocaleString()} <span style={{ fontSize: '14px' }}>EXP</span>
          </Typography>
          <Chip label={`Cấp độ ${comp.level} • Đúng ${comp.accuracy}%`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', fontSize: 11, color: '#fff' }} />
        </Box>
      ) : activeCategory === 1 ? (
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
            CHUỖI KAHOOT BẤT BẠI
          </Typography>
          <Typography variant="h5" fontWeight="900" sx={{ color: '#f43f5e', my: 0.3 }}>
            🔥 {student.kahootStreak} <span style={{ fontSize: '14px' }}>trận liên tiếp</span>
          </Typography>
          <Chip label={`Tổng câu: ${student.totalKahootQuestions} • Đúng ${comp.accuracy}%`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', fontSize: 11, color: '#fff' }} />
        </Box>
      ) : (
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
            CHUỖI NGÀY ĐĂNG NHẬP
          </Typography>
          <Typography variant="h5" fontWeight="900" sx={{ color: '#34d399', my: 0.3 }}>
            📅 {student.loginStreak} <span style={{ fontSize: '14px' }}>ngày chuyên cần</span>
          </Typography>
          <Chip label={`Gần nhất: ${student.lastActiveDate}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', fontSize: 11, color: '#fff' }} />
        </Box>
      )}
    </Paper>
  );
}
