"use client";

import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Chip,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Button,
  Stack,
  Tooltip,
  Dialog,
  Grid,
  Menu,
} from '@mui/material';
import {
  FlaskConical,
  Bot,
  Trophy,
  ShieldCheck,
  BookOpen,
  FileCheck2,
  Sparkles,
  UserCheck,
  X,
  Home,
  User,
  Lock,
  Video,
  GraduationCap,
  Award,
  Atom,
  Zap,
  ChevronDown,
  Menu as MenuIcon,
} from 'lucide-react';
import { theme } from '@/theme/theme';
import HomeDashboard from '@/components/HomeDashboard';
import VirtualLab from '@/components/VirtualLab';
import DifyChatTutor from '@/components/DifyChatTutor';
import SafetyTab from '@/components/SafetyTab';
import QuizKahootTab from '@/components/QuizKahootTab';
import AuditTab from '@/components/AuditTab';
import LessonPlanner from '@/components/LessonPlanner';
import ExamManager from '@/components/ExamManager';
import StemProjects from '@/components/StemProjects';
import TeacherVideoLectures from '@/components/TeacherVideoLectures';
import StudentProgressManager from '@/components/StudentProgressManager';
import LeaderboardTab from '@/components/LeaderboardTab';
import PeriodicTableTab from '@/components/PeriodicTableTab';
import TeacherWhiteboard from '@/components/TeacherWhiteboard';
import DiagnosticTestCenter from '@/components/DiagnosticTestCenter';
import MobileViewManager from '@/components/MobileViewManager';
import UserAuthModal, { UserProfile, getStoredCurrentUser, saveStoredCurrentUser, DEFAULT_TEACHER_ACCOUNT, DEFAULT_STUDENT_ACCOUNT } from '@/components/UserAuthModal';
import { Grid2X2, Brain, Pen } from 'lucide-react';

interface NavItem {
  index: number;
  label: string;
  shortLabel: string;
  category: 'practice' | 'assistant' | 'teacher';
  icon: React.ReactNode;
  isAudit?: boolean;
  teacherOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { index: 0, label: "Trang Chủ", shortLabel: "Trang chủ", category: 'assistant', icon: <Home size={20} /> },
  { index: 1, label: "Thí Nghiệm & Chuẩn Độ", shortLabel: "Thí nghiệm", category: 'practice', icon: <FlaskConical size={20} /> },
  { index: 12, label: "Bảng Tuần Hoàn 4D", shortLabel: "Bảng tuần hoàn", category: 'practice', icon: <Atom size={20} /> },
  { index: 4, label: "3D Liên Kết & An Toàn PTN", shortLabel: "3D & An toàn", category: 'practice', icon: <ShieldCheck size={20} /> },
  { index: 14, label: "Chẩn Đoán Lỗ Hổng", shortLabel: "Chẩn đoán", category: 'assistant', icon: <Brain size={20} /> },
  { index: 2, label: "Gia Sư Hóa Học", shortLabel: "Gia sư", category: 'assistant', icon: <Bot size={20} /> },
  { index: 3, label: "Đấu Trường Luyện Tập", shortLabel: "Đấu trường", category: 'assistant', icon: <Trophy size={20} /> },
  { index: 11, label: "Bảng Xếp Hạng", shortLabel: "Xếp hạng", category: 'assistant', icon: <Award size={20} /> },
  { index: 8, label: "Video Bài Giảng", shortLabel: "Video bài dạy", category: 'assistant', icon: <Video size={20} /> },
  { index: 13, label: "Bảng Trắng Studio", shortLabel: "Bảng trắng", category: 'teacher', icon: <Pen size={20} />, teacherOnly: true },
  { index: 6, label: "Đề Thi Mới 2025", shortLabel: "Đề thi 2025", category: 'teacher', icon: <FileCheck2 size={20} />, teacherOnly: true },
  { index: 5, label: "Soạn Giáo Án (5512)", shortLabel: "Giáo án 5512", category: 'teacher', icon: <BookOpen size={20} />, teacherOnly: true },
  { index: 7, label: "Dự Án STEM", shortLabel: "STEM", category: 'teacher', icon: <Sparkles size={20} />, teacherOnly: true },
  { index: 9, label: "Sổ Học Sinh", shortLabel: "Sổ học sinh", category: 'teacher', icon: <GraduationCap size={20} />, teacherOnly: true },
  { index: 10, label: "Giáo Viên Audit", shortLabel: "Audit", category: 'teacher', icon: <UserCheck size={20} />, isAudit: true, teacherOnly: true },
];

export interface NavGroupItem {
  index: number;
  label: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  teacherOnly?: boolean;
  isAudit?: boolean;
}

export interface NavGroup {
  id: string;
  title: string;
  shortTitle: string;
  color: string;
  icon: React.ReactNode;
  teacherOnly?: boolean;
  items: NavGroupItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'lab',
    title: 'Thực Nghiệm Ảo & 3D',
    shortTitle: 'Thực Nghiệm 3D',
    color: '#38bdf8',
    icon: <FlaskConical size={18} />,
    items: [
      {
        index: 1,
        label: 'Phòng Thí Nghiệm & Chuẩn Độ',
        desc: 'Mô phỏng 11+ phản ứng hóa học WebGL, đổi màu chỉ thị pH',
        icon: <FlaskConical size={18} color="#38bdf8" />,
        badge: 'Mô phỏng ảo'
      },
      {
        index: 12,
        label: 'Bảng Tuần Hoàn 4D',
        desc: '118 nguyên tố IUPAC tương tác, tra cứu khối lượng & tính chất',
        icon: <Atom size={18} color="#06b6d4" />,
        badge: 'IUPAC'
      },
      {
        index: 4,
        label: '3D Liên Kết & An Toàn PTN',
        desc: 'Mô hình quả cầu - que nối 3D và cẩm nang an toàn hóa chất',
        icon: <ShieldCheck size={18} color="#10b981" />,
        badge: '3D WebGL'
      },
    ]
  },
  {
    id: 'tutor',
    title: 'Gia Sư AI & Đánh Giá',
    shortTitle: 'Gia Sư AI',
    color: '#818cf8',
    icon: <Bot size={18} />,
    items: [
      {
        index: 2,
        label: 'Gia Sư Hóa Học ChemAI',
        desc: 'Trợ lý học tập thông minh giải đáp 24/7 chuẩn GDPT 2018',
        icon: <Bot size={18} color="#818cf8" />,
        badge: 'Trợ Lý ChemAI 2.0'
      },
      {
        index: 14,
        label: 'Chẩn Đoán Lỗ Hổng Kiến Thức',
        desc: 'Trắc nghiệm ma trận phát hiện lỗ hổng và gợi ý lộ trình bù',
        icon: <Brain size={18} color="#a855f7" />,
        badge: 'Test Center'
      },
      {
        index: 8,
        label: 'Video Bài Giảng Thí Nghiệm',
        desc: 'Kho học liệu video thực nghiệm trực quan sinh động theo SGK',
        icon: <Video size={18} color="#ec4899" />,
        badge: 'Video'
      },
    ]
  },
  {
    id: 'arena',
    title: 'Đấu Trường & Luyện Thi',
    shortTitle: 'Đấu Trường',
    color: '#f59e0b',
    icon: <Trophy size={18} />,
    items: [
      {
        index: 3,
        label: 'Đấu Trường Trắc Nghiệm Realtime',
        desc: 'Thi đấu đối kháng thời gian thực theo mã PIN cùng cả lớp',
        icon: <Trophy size={18} color="#f59e0b" />,
        badge: 'Realtime'
      },
      {
        index: 11,
        label: 'Bảng Vàng Xếp Hạng',
        desc: 'Vinh danh Top học sinh xuất sắc, chuỗi ngày Streak và EXP',
        icon: <Award size={18} color="#eab308" />,
        badge: 'Leaderboard'
      },
    ]
  },
  {
    id: 'teacher',
    title: 'Không Gian Giáo Viên',
    shortTitle: 'Góc Giáo Viên',
    color: '#10b981',
    icon: <BookOpen size={18} />,
    teacherOnly: true,
    items: [
      {
        index: 5,
        label: 'Soạn Kế Hoạch Bài Dạy (5512)',
        desc: 'Tự động tạo giáo án chuẩn mẫu Công văn 5512 của Bộ GD&ĐT',
        icon: <BookOpen size={18} color="#10b981" />,
        badge: 'CV 5512',
        teacherOnly: true
      },
      {
        index: 6,
        label: 'Ngân Hàng Đề Thi Ma Trận 2026',
        desc: 'Xuất đề trắc nghiệm Đúng/Sai, Trả lời ngắn cấu trúc mới 2025-2026',
        icon: <FileCheck2 size={18} color="#34d399" />,
        badge: 'Ma trận mới',
        teacherOnly: true
      },
      {
        index: 13,
        label: 'Bảng Trắng Studio & STEM',
        desc: 'Phấn điện tử, vẽ cấu tạo phân tử và tổ chức bài học STEM',
        icon: <Pen size={18} color="#06b6d4" />,
        badge: 'Studio',
        teacherOnly: true
      },
      {
        index: 9,
        label: 'Sổ Theo Dõi & Đánh Giá Học Sinh',
        desc: 'Quản lý điểm số, tiến trình và sổ nhận xét đánh giá năng lực',
        icon: <GraduationCap size={18} color="#f59e0b" />,
        badge: 'Sổ điểm',
        teacherOnly: true
      },
      {
        index: 10,
        label: 'Kiểm Duyệt Nội Dung & Audit',
        desc: 'Kiểm tra độ chính xác khoa học và nhật ký dữ liệu hệ thống',
        icon: <UserCheck size={18} color="#818cf8" />,
        badge: 'Audit',
        isAudit: true,
        teacherOnly: true
      },
    ]
  }
];

export default function AppContainer() {
  const [currentTab, setCurrentTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hubModalOpen, setHubModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authInitialRole, setAuthInitialRole] = useState<'student' | 'teacher'>('student');
  const [roleViewMode, setRoleViewMode] = useState<'all' | 'student' | 'teacher'>('all');
  const [featuresMenuAnchorEl, setFeaturesMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenFeaturesMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFeaturesMenuAnchorEl(event.currentTarget);
  };

  const handleCloseFeaturesMenu = () => {
    setFeaturesMenuAnchorEl(null);
  };

  const isTeacher = currentUser?.role === 'teacher';
  const isStudent = currentUser?.role === 'student';

  const handleQuickDemoLogin = (role: 'student' | 'teacher') => {
    const acc = role === 'teacher' ? DEFAULT_TEACHER_ACCOUNT : DEFAULT_STUDENT_ACCOUNT;
    saveStoredCurrentUser(acc);
    setCurrentUser(acc);
    setRoleViewMode(role === 'student' ? 'student' : 'teacher');
  };

  useEffect(() => {
    setMounted(true);
    const stored = getStoredCurrentUser();
    if (stored) {
      setCurrentUser(stored);
      if (stored.role === 'student') {
        setRoleViewMode('student');
      } else if (stored.role === 'teacher') {
        setRoleViewMode('teacher');
      }
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'student') {
      setRoleViewMode('student');
      const teacherTabs = [5, 6, 9, 10, 13];
      if (teacherTabs.includes(currentTab)) {
        setCurrentTab(0);
      }
    }
  }, [currentUser]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue !== 0 && !currentUser) {
      setAuthModalOpen(true);
      return;
    }
    const teacherTabs = [5, 6, 9, 10, 13];
    if (isStudent && teacherTabs.includes(newValue)) {
      return;
    }
    setCurrentTab(newValue);
  };

  const handleSelectTab = (idx: number) => {
    if (idx !== 0 && !currentUser) {
      setAuthModalOpen(true);
      setDrawerOpen(false);
      setHubModalOpen(false);
      return;
    }
    const teacherTabs = [5, 6, 9, 10, 13];
    if (isStudent && teacherTabs.includes(idx)) {
      setDrawerOpen(false);
      setHubModalOpen(false);
      return;
    }
    setCurrentTab(idx);
    setDrawerOpen(false);
    setHubModalOpen(false);
    // Scroll smoothly to top on mobile tab change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', pb: { xs: 9, md: 4 } }}>
        {/* Header Navigation */}
        <AppBar
          position="sticky"
          sx={{
            bgcolor: 'rgba(9, 13, 22, 0.92)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            zIndex: 1100,
          }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: 58, sm: 62 },
                height: { xs: 58, sm: 62 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: { xs: 1, sm: 1.5, lg: 2 },
              }}
            >
              {/* BRAND LOGO & TITLE (Clean 1-touch Home Navigation) */}
              <Box
                onClick={() => handleSelectTab(0)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.2,
                  cursor: 'pointer',
                  flexShrink: 0,
                  userSelect: 'none',
                  textDecoration: 'none',
                  '&:hover .brand-logo-mark': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.6)',
                  },
                }}
              >
                <Box
                  className="brand-logo-mark"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2.2,
                    background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.45)',
                    boxShadow: '0 0 12px rgba(2, 132, 199, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <FlaskConical size={20} color="#ffffff" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '18px', sm: '20px' },
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      whiteSpace: 'nowrap',
                      background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ChemAI
                  </Typography>
                  <Chip
                    label="2.0"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '10px',
                      fontWeight: 800,
                      bgcolor: 'rgba(56, 189, 248, 0.12)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                    }}
                  />
                </Box>
              </Box>

              {/* RIGHT CONTROLS: FEATURES DROPDOWN, ROLE TOGGLE, PROFILE & MOBILE DRAWER */}
              <Box display="flex" alignItems="center" gap={{ xs: 0.8, sm: 1.2 }} flexShrink={0}>
                {/* SINGLE COMPACT FEATURES DROPDOWN BUTTON (Desktop & Tablet) */}
                <Box
                  component="nav"
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    bgcolor: 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(16px)',
                    p: '3px 6px',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    flexShrink: 0,
                  }}
                >
                  <Button
                    size="small"
                    onClick={handleOpenFeaturesMenu}
                    startIcon={<Grid2X2 size={16} color="#38bdf8" />}
                    endIcon={
                      <ChevronDown
                        size={14}
                        style={{
                          opacity: 0.7,
                          transform: Boolean(featuresMenuAnchorEl) ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    }
                    sx={{
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      fontWeight: 700,
                      fontSize: '13px',
                      px: 1.5,
                      py: 0.5,
                      height: 30,
                      borderRadius: 2,
                      color: Boolean(featuresMenuAnchorEl) ? '#ffffff' : '#f8fafc',
                      bgcolor: Boolean(featuresMenuAnchorEl) ? 'rgba(56, 189, 248, 0.22)' : 'rgba(56, 189, 248, 0.1)',
                      border: Boolean(featuresMenuAnchorEl)
                        ? '1px solid #38bdf8'
                        : '1px solid rgba(56, 189, 248, 0.3)',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(56, 189, 248, 0.25)',
                        borderColor: '#38bdf8',
                        color: '#ffffff',
                      },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    Các chức năng
                  </Button>

                  {/* MEGA DROPDOWN MENU CONTAINING ALL FEATURES */}
                  <Menu
                    anchorEl={featuresMenuAnchorEl}
                    open={Boolean(featuresMenuAnchorEl)}
                    onClose={handleCloseFeaturesMenu}
                    PaperProps={{
                      sx: {
                        bgcolor: '#090d16',
                        backgroundImage: 'linear-gradient(180deg, #0d1527 0%, #080c14 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: 3.5,
                        boxShadow: '0 24px 60px rgba(0,0,0,0.92), 0 0 25px rgba(56, 189, 248, 0.12)',
                        backdropFilter: 'blur(20px)',
                        width: { xs: '92vw', sm: 660, md: 780 },
                        maxHeight: '85vh',
                        p: 2.2,
                        overflowY: 'auto',
                      }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    {/* Top Header: Quick Access to Home */}
                    <Box sx={{ mb: 2 }}>
                      <Paper
                        onClick={() => {
                          handleCloseFeaturesMenu();
                          handleSelectTab(0);
                        }}
                        sx={{
                          p: 1.5,
                          borderRadius: 2.5,
                          bgcolor: currentTab === 0 ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                          border: currentTab === 0 ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease',
                          '&:hover': {
                            bgcolor: 'rgba(56, 189, 248, 0.22)',
                            borderColor: '#38bdf8',
                          },
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              bgcolor: 'rgba(56, 189, 248, 0.15)',
                              color: '#38bdf8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Home size={20} />
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={800} sx={{ color: '#fff', fontSize: '14px' }}>
                              Trang Chủ ChemAI
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '11.5px' }}>
                              Bảng điều khiển tổng quan, lối tắt nhanh & thống kê học tập
                            </Typography>
                          </Box>
                        </Box>
                        {currentTab === 0 && (
                          <Chip
                            label="Đang mở"
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '10.5px',
                              fontWeight: 800,
                              bgcolor: 'rgba(56, 189, 248, 0.2)',
                              color: '#38bdf8',
                              border: '1px solid rgba(56, 189, 248, 0.4)',
                            }}
                          />
                        )}
                      </Paper>
                    </Box>

                    {/* All 4 Main Function Categories in a 2-Column Grid */}
                    <Grid container spacing={2}>
                      {NAV_GROUPS
                        .filter(group => !group.teacherOnly || (!isStudent && (isTeacher || roleViewMode === 'teacher')))
                        .map((group) => {
                          return (
                            <Grid item xs={12} sm={6} key={group.id}>
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: 2.5,
                                  bgcolor: 'rgba(15, 23, 42, 0.6)',
                                  border: '1px solid rgba(255, 255, 255, 0.06)',
                                  height: '100%',
                                }}
                              >
                                {/* Group Header */}
                                <Box display="flex" alignItems="center" gap={1} mb={1.2} pb={0.8} borderBottom={`1px solid ${group.color}25`}>
                                  {React.cloneElement(group.icon as React.ReactElement<any>, { size: 16, color: group.color })}
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight={800}
                                    sx={{
                                      color: group.color,
                                      fontSize: '12px',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.04em',
                                    }}
                                  >
                                    {group.title}
                                  </Typography>
                                </Box>

                                {/* Group Items */}
                                <Stack spacing={0.8}>
                                  {group.items.map((item) => {
                                    const isSelected = currentTab === item.index;
                                    return (
                                      <Box
                                        key={item.index}
                                        onClick={() => {
                                          handleCloseFeaturesMenu();
                                          handleSelectTab(item.index);
                                        }}
                                        sx={{
                                          p: 1,
                                          borderRadius: 2,
                                          bgcolor: isSelected ? `${group.color}20` : 'transparent',
                                          border: isSelected ? `1.5px solid ${group.color}80` : '1px solid transparent',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'flex-start',
                                          gap: 1.2,
                                          transition: 'all 0.15s ease',
                                          '&:hover': {
                                            bgcolor: `${group.color}18`,
                                            border: `1px solid ${group.color}40`,
                                            transform: 'translateX(3px)',
                                          },
                                        }}
                                      >
                                        <Box sx={{ mt: 0.2, flexShrink: 0 }}>
                                          {item.icon}
                                        </Box>
                                        <Box sx={{ minWidth: 0, flex: 1 }}>
                                          <Box display="flex" alignItems="center" gap={0.8} flexWrap="wrap">
                                            <Typography
                                              variant="body2"
                                              fontWeight={isSelected ? 800 : 700}
                                              sx={{
                                                color: isSelected ? group.color : '#f8fafc',
                                                fontSize: '13px',
                                                lineHeight: 1.3,
                                              }}
                                            >
                                              {item.label}
                                            </Typography>
                                            {item.badge && (
                                              <Chip
                                                label={item.badge}
                                                size="small"
                                                sx={{
                                                  height: 17,
                                                  fontSize: '9px',
                                                  fontWeight: 800,
                                                  bgcolor: `${group.color}15`,
                                                  color: group.color,
                                                  border: `1px solid ${group.color}35`,
                                                }}
                                              />
                                            )}
                                          </Box>
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              color: '#94a3b8',
                                              fontSize: '11px',
                                              display: '-webkit-box',
                                              WebkitLineClamp: 2,
                                              WebkitBoxOrient: 'vertical',
                                              overflow: 'hidden',
                                              mt: 0.3,
                                              lineHeight: 1.25,
                                            }}
                                          >
                                            {item.desc}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    );
                                  })}
                                </Stack>
                              </Box>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Menu>
                </Box>

                {/* Role-Based Mode Switcher (Visible on both Mobile & Desktop) */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(15, 23, 42, 0.75)',
                    p: { xs: '2px', sm: '3px' },
                    borderRadius: 2.5,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Tooltip title="Chế độ học tập tinh gọn dành riêng cho Học sinh">
                    <Button
                      size="small"
                      onClick={() => {
                        if (!isStudent) {
                          setRoleViewMode(roleViewMode === 'student' ? 'all' : 'student');
                        }
                      }}
                      startIcon={<GraduationCap size={12} />}
                      sx={{
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '11px', sm: '11.5px' },
                        fontWeight: 700,
                        py: { xs: 0.3, sm: 0.4 },
                        px: { xs: 0.8, sm: 1.1 },
                        height: { xs: 26, sm: 28 },
                        borderRadius: 2,
                        cursor: isStudent ? 'default' : 'pointer',
                        color: roleViewMode === 'student' || isStudent ? '#38bdf8' : '#94a3b8',
                        bgcolor: roleViewMode === 'student' || isStudent ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                        border: roleViewMode === 'student' || isStudent ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                        '&:hover': { bgcolor: isStudent ? 'rgba(56, 189, 248, 0.2)' : 'rgba(56, 189, 248, 0.15)', color: '#fff' }
                      }}
                    >
                      Học Sinh
                    </Button>
                  </Tooltip>
                  {!isStudent && (
                    <Tooltip title="Chế độ sư phạm dành cho Thầy/Cô (Giáo án 5512, Đề thi, Sổ điểm)">
                      <Button
                        size="small"
                        onClick={() => setRoleViewMode(roleViewMode === 'teacher' ? 'all' : 'teacher')}
                        startIcon={<BookOpen size={12} />}
                        sx={{
                          textTransform: 'none',
                          whiteSpace: 'nowrap',
                          fontSize: { xs: '11px', sm: '11.5px' },
                          fontWeight: 700,
                          py: { xs: 0.3, sm: 0.4 },
                          px: { xs: 0.8, sm: 1.1 },
                          height: { xs: 26, sm: 28 },
                          borderRadius: 2,
                          cursor: 'pointer',
                          color: roleViewMode === 'teacher' ? '#34d399' : '#94a3b8',
                          bgcolor: roleViewMode === 'teacher' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                          border: roleViewMode === 'teacher' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                          '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#fff' }
                        }}
                      >
                        Giáo Viên
                      </Button>
                    </Tooltip>
                  )}
                </Box>

                {/* User Account / Profile Button */}
                {currentUser ? (
                  <Chip
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: isTeacher ? '#f59e0b' : '#0284c7',
                          color: isTeacher ? '#000' : '#fff',
                          fontWeight: 'bold',
                          width: 24,
                          height: 24,
                          fontSize: '10.5px'
                        }}
                      >
                        {isTeacher ? 'GV' : 'HS'}
                      </Avatar>
                    }
                    label={isTeacher ? `${currentUser.title || (currentUser.gender === 'male' ? 'Thầy' : 'Cô')} ${(currentUser.fullName || 'Giáo Viên A').replace(/^(Cô|Thầy)\s+/i, '').trim() || 'Giáo Viên A'}` : currentUser.fullName}
                    onClick={() => setAuthModalOpen(true)}
                    variant="outlined"
                    sx={{
                      display: { xs: 'none', sm: 'inline-flex' },
                      fontWeight: 700,
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      borderColor: isTeacher ? 'rgba(245, 158, 11, 0.5)' : 'rgba(56, 189, 248, 0.4)',
                      color: isTeacher ? '#fbbf24' : '#38bdf8',
                      bgcolor: isTeacher ? 'rgba(245, 158, 11, 0.08)' : 'rgba(56, 189, 248, 0.08)',
                      cursor: 'pointer',
                      height: 32,
                      maxWidth: { sm: 160, md: 220 },
                      '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' },
                      '&:hover': { bgcolor: isTeacher ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.2)' }
                    }}
                  />
                ) : (
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Tooltip title="Thử nghiệm nhanh quyền Giáo viên (Giáo Viên A)">
                      <Chip
                        icon={<Zap size={13} color="#f59e0b" />}
                        label="Thử Quyền GV"
                        size="small"
                        onClick={() => handleQuickDemoLogin('teacher')}
                        sx={{
                          fontWeight: 700,
                          fontSize: '11px',
                          cursor: 'pointer',
                          bgcolor: 'rgba(245, 158, 11, 0.15)',
                          color: '#fbbf24',
                          border: '1px solid rgba(245, 158, 11, 0.4)',
                          height: 30,
                          '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.3)' }
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Thử nghiệm nhanh quyền Học sinh (Học Sinh A)">
                      <Chip
                        icon={<Zap size={13} color="#38bdf8" />}
                        label="Thử Quyền HS"
                        size="small"
                        onClick={() => handleQuickDemoLogin('student')}
                        sx={{
                          fontWeight: 700,
                          fontSize: '11px',
                          cursor: 'pointer',
                          bgcolor: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          height: 30,
                          '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.3)' }
                        }}
                      />
                    </Tooltip>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => setAuthModalOpen(true)}
                      startIcon={<User size={14} />}
                      sx={{
                        fontWeight: 700,
                        fontSize: '12.5px',
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                        bgcolor: '#0284c7',
                        color: '#ffffff',
                        height: 32,
                        px: 1.8,
                        borderRadius: 2,
                        cursor: 'pointer',
                        boxShadow: '0 2px 10px rgba(2, 132, 199, 0.4)',
                        '&:hover': { bgcolor: '#0369a1' }
                      }}
                    >
                      Đăng Nhập
                    </Button>
                  </Stack>
                )}

                {/* Mobile Menu & Hub Triggers */}
                <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 0.8 }}>
                  <IconButton
                    color="inherit"
                    aria-label="open hub"
                    onClick={() => setHubModalOpen(true)}
                    sx={{
                      bgcolor: 'rgba(2, 132, 199, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      p: 0.8,
                    }}
                  >
                    <Grid2X2 size={18} color="#38bdf8" />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      p: 0.8,
                    }}
                  >
                    <MenuIcon size={18} color="#f8fafc" />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 290,
              bgcolor: '#090d16',
              backgroundImage: 'linear-gradient(180deg, #0f172a 0%, #090d16 100%)',
              borderLeft: '1px solid rgba(56, 189, 248, 0.2)',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }
          }}
        >
          {/* Drawer Header */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FlaskConical size={22} color="#38bdf8" />
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#38bdf8' }}>
                HCC - ChemAI
              </Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ color: 'text.secondary' }}>
              <X size={20} />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />

          {/* User Profile in Drawer */}
          <Box sx={{ mb: 2 }}>
            {currentUser ? (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(2, 132, 199, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setDrawerOpen(false);
                  setAuthModalOpen(true);
                }}
              >
                <Typography variant="body2" fontWeight="bold" color="white">
                  {currentUser.fullName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.className || 'Học sinh'} • {currentUser.school || 'THPT'}
                </Typography>
              </Box>
            ) : (
              <Chip
                icon={<User size={16} color="#38bdf8" />}
                label="Đăng nhập / Đăng ký"
                onClick={() => {
                  setDrawerOpen(false);
                  setAuthModalOpen(true);
                }}
                variant="outlined"
                sx={{
                  width: '100%',
                  fontWeight: 'bold',
                  borderColor: 'rgba(56, 189, 248, 0.5)',
                  color: '#38bdf8',
                  bgcolor: 'rgba(2, 132, 199, 0.1)',
                  height: 38,
                  justifyContent: 'flex-start',
                  px: 1,
                  '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.25)' }
                }}
              />
            )}
          </Box>

          {/* Quick Role Mode Switcher in Drawer */}
          <Box sx={{ mb: 2, p: 1, borderRadius: 2.2, bgcolor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '11px', fontWeight: 800, mb: 0.8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Chế độ hiển thị vai trò:
            </Typography>
            <Stack direction="row" spacing={0.8}>
              <Button
                fullWidth
                size="small"
                onClick={() => {
                  if (!isStudent) {
                    setRoleViewMode(roleViewMode === 'student' ? 'all' : 'student');
                  }
                }}
                startIcon={<GraduationCap size={13} />}
                sx={{
                  textTransform: 'none',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  py: 0.5,
                  borderRadius: 2,
                  cursor: isStudent ? 'default' : 'pointer',
                  color: roleViewMode === 'student' || isStudent ? '#38bdf8' : '#94a3b8',
                  bgcolor: roleViewMode === 'student' || isStudent ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)',
                  border: roleViewMode === 'student' || isStudent ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                  '&:hover': { bgcolor: isStudent ? 'rgba(56, 189, 248, 0.2)' : 'rgba(56, 189, 248, 0.15)' }
                }}
              >
                Học Sinh
              </Button>
              {!isStudent && (
                <Button
                  fullWidth
                  size="small"
                  onClick={() => setRoleViewMode(roleViewMode === 'teacher' ? 'all' : 'teacher')}
                  startIcon={<BookOpen size={13} />}
                  sx={{
                    textTransform: 'none',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    py: 0.5,
                    borderRadius: 2,
                    color: roleViewMode === 'teacher' ? '#34d399' : '#94a3b8',
                    bgcolor: roleViewMode === 'teacher' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)',
                    border: roleViewMode === 'teacher' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                    '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.15)' }
                  }}
                >
                  Giáo Viên
                </Button>
              )}
            </Stack>
          </Box>

          {/* Drawer Grouped Nav Items (Organized into 4 Core Categories) */}
          <Box sx={{ overflowY: 'auto', flexGrow: 1, pr: 0.5 }}>
            {/* Quick Home Item */}
            <ListItemButton
              onClick={() => handleSelectTab(0)}
              selected={currentTab === 0}
              sx={{
                borderRadius: 2,
                mb: 1.5,
                py: 1,
                bgcolor: currentTab === 0 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)',
                border: currentTab === 0 ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: '#38bdf8' }}>
                <Home size={19} />
              </ListItemIcon>
              <ListItemText
                primary="Trang Chủ Dashboard"
                primaryTypographyProps={{ fontSize: '14.5px', fontWeight: 700, color: '#fff' }}
              />
            </ListItemButton>

            {NAV_GROUPS
              .filter(group => !group.teacherOnly || (!isStudent && (isTeacher || roleViewMode === 'teacher')))
              .map((group) => (
                <Box key={group.id} sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: group.color,
                      fontWeight: 800,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      px: 1,
                      mb: 0.8,
                      display: 'block'
                    }}
                  >
                    {group.title}
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {group.items.map((item) => {
                      const isSelected = currentTab === item.index;
                      const isLocked = !currentUser && item.index !== 0;
                      return (
                        <ListItem key={item.index} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemButton
                            onClick={() => handleSelectTab(item.index)}
                            selected={isSelected}
                            sx={{
                              borderRadius: 2,
                              py: 0.9,
                              px: 1.2,
                              bgcolor: isSelected ? `${group.color}20` : 'transparent',
                              border: isSelected ? `1px solid ${group.color}50` : '1px solid transparent',
                              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 32, color: isSelected ? group.color : 'text.secondary' }}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{
                                fontSize: '13.5px',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? group.color : '#e2e8f0',
                              }}
                            />
                            {isLocked && <Lock size={13} color="#64748b" style={{ marginLeft: 'auto' }} />}
                            {item.isAudit && !isLocked && (
                              <Chip
                                label="Admin"
                                size="small"
                                color="warning"
                                sx={{ height: 18, fontSize: 10, fontWeight: 'bold' }}
                              />
                            )}
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              ))}
          </Box>

          <Box mt="auto" pt={2}>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 1.5 }} />
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              HCC - ChemAI © 2026 | GDPT 2018
            </Typography>
          </Box>
        </Drawer>

        {/* Main View Area with Mobile-Optimized Spacing & Mobile View Manager */}
        <MobileViewManager
          currentTab={currentTab}
          onNavigateTab={(idx) => handleSelectTab(idx)}
          isTeacher={isTeacher}
        >
          <Container
            maxWidth="xl"
            sx={{
              mt: { xs: 1.5, sm: 2, md: 3 },
              px: { xs: 1, sm: 2, md: 3 },
              maxWidth: '100% !important',
            }}
          >
            {(!currentUser || currentTab === 0) && (
              <HomeDashboard
                onNavigateTab={(idx) => handleSelectTab(idx)}
                onOpenAuthModal={(role) => {
                  setAuthInitialRole(role || 'student');
                  setAuthModalOpen(true);
                }}
                currentUser={currentUser}
                onLogout={() => {
                  saveStoredCurrentUser(null);
                  setCurrentUser(null);
                  setCurrentTab(0);
                }}
                roleViewMode={roleViewMode}
                onRoleViewModeChange={setRoleViewMode}
                onQuickLogin={handleQuickDemoLogin}
              />
            )}
            {currentUser && currentTab === 1 && <VirtualLab />}
            {currentUser && currentTab === 2 && <DifyChatTutor />}
            {currentUser && currentTab === 3 && <QuizKahootTab />}
            {currentUser && currentTab === 4 && <SafetyTab />}
            {currentUser && currentTab === 5 && (isTeacher ? <LessonPlanner /> : <TeacherAccessGuard onBack={() => setCurrentTab(0)} onOpenAuth={() => { setAuthInitialRole('teacher'); setAuthModalOpen(true); }} title="Soạn Giáo Án (5512)" />)}
            {currentUser && currentTab === 6 && (isTeacher ? <ExamManager /> : <TeacherAccessGuard onBack={() => setCurrentTab(0)} onOpenAuth={() => { setAuthInitialRole('teacher'); setAuthModalOpen(true); }} title="Soạn - Chấm Bài Thi" />)}
            {currentUser && currentTab === 7 && (isTeacher ? <StemProjects /> : <TeacherAccessGuard onBack={() => setCurrentTab(0)} onOpenAuth={() => { setAuthInitialRole('teacher'); setAuthModalOpen(true); }} title="Dự Án Học Tập STEM" />)}
            {currentUser && currentTab === 8 && <TeacherVideoLectures currentUser={currentUser} />}
            {currentUser && currentTab === 9 && (isTeacher ? <StudentProgressManager currentUser={currentUser} /> : <TeacherAccessGuard onBack={() => setCurrentTab(0)} onOpenAuth={() => { setAuthInitialRole('teacher'); setAuthModalOpen(true); }} title="Sổ Theo Dõi & Đánh Giá Năng Lực Học Sinh" />)}
            {currentUser && currentTab === 10 && (isTeacher ? <AuditTab /> : <TeacherAccessGuard onBack={() => setCurrentTab(0)} onOpenAuth={() => { setAuthInitialRole('teacher'); setAuthModalOpen(true); }} title="Cổng Quản Trị Audit" />)}
            {currentUser && currentTab === 11 && <LeaderboardTab currentUser={currentUser} onNavigateTab={(idx) => handleSelectTab(idx)} />}
            {currentUser && currentTab === 12 && <PeriodicTableTab />}
            {currentUser && currentTab === 13 && (isTeacher ? <TeacherWhiteboard /> : <TeacherAccessGuard onBack={() => setCurrentTab(0)} onOpenAuth={() => { setAuthInitialRole('teacher'); setAuthModalOpen(true); }} title="Studio Bảng Trắng Dạy Học" />)}
            {currentUser && currentTab === 14 && <DiagnosticTestCenter />}
          </Container>
        </MobileViewManager>

        {/* ALL FEATURES MEGA MENU / HUB MODAL */}
        <Dialog
          open={hubModalOpen}
          onClose={() => setHubModalOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#090d16',
              backgroundImage: 'linear-gradient(180deg, #0f172a 0%, #090d16 100%)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 3.5,
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
              p: { xs: 2, sm: 3 },
            },
          }}
        >
          {/* Hub Title */}
          <Box display="flex" justifyContent="space-between" alignItems="center" pb={1.5} mb={2.5} borderBottom="1px solid rgba(255,255,255,0.08)">
            <Box display="flex" alignItems="center" gap={1.2}>
              <Grid2X2 size={24} color="#38bdf8" />
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff', fontSize: { xs: '16px', sm: '19px' } }}>
                  Danh Mục Tất Cả Tính Năng — HCC ChemAI 2.0
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Chọn nhanh bất kỳ công cụ hoặc mô-đun học tập nào dưới đây:
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setHubModalOpen(false)} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
              <X size={20} />
            </IconButton>
          </Box>

          <Stack spacing={3}>
            {/* Category 1: Practice & Simulation */}
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8" mb={1.2} display="flex" alignItems="center" gap={1}>
                🧪 MÔ PHỎNG & THỰC HÀNH HÓA HỌC
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { idx: 1, label: "Thí Nghiệm & Chuẩn Độ", desc: "Phản ứng tự do 118 nguyên tố & Đo pH", icon: <FlaskConical size={20} color="#38bdf8" /> },
                  { idx: 12, label: "Bảng Tuần Hoàn 4D", desc: "118 nguyên tố 4D, Aufbau, Heatmap I₁", icon: <Atom size={20} color="#38bdf8" /> },
                  { idx: 4, label: "3D Liên Kết & 2D Lewis", desc: "Mô hình 3D phân tử & Cặp e tự do Lewis", icon: <ShieldCheck size={20} color="#38bdf8" /> },
                ].map((item) => (
                  <Grid item xs={12} sm={4} key={item.idx}>
                    <Paper
                      onClick={() => handleSelectTab(item.idx)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        bgcolor: currentTab === item.idx ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                        border: currentTab === item.idx ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.2)', borderColor: '#38bdf8', transform: 'translateY(-2px)' },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        {item.icon}
                        <Typography variant="body2" fontWeight="bold" color="#fff">
                          {item.label}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px', display: 'block' }}>
                        {item.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Category 2: AI Tutor & Exam Arena */}
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" color="#c084fc" mb={1.2} display="flex" alignItems="center" gap={1}>
                🎯 TRỢ LÝ HỌC TẬP & ĐẤU TRƯỜNG LUYỆN TẬP
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { idx: 14, label: "Chẩn Đoán Lỗ Hổng", desc: "Quét 4 cấp độ (10, 11, 12, THPT) & Bẫy đề thi", icon: <Brain size={20} color="#c084fc" /> },
                  { idx: 2, label: "Gia Sư Hóa Học", desc: "Hỏi đáp hóa học thông minh 24/7", icon: <Bot size={20} color="#c084fc" /> },
                  { idx: 3, label: "Đấu Trường Luyện Tập", desc: "Trắc nghiệm hóa học kịch tính", icon: <Trophy size={20} color="#c084fc" /> },
                  { idx: 11, label: "Bảng Xếp Hạng", desc: "Vinh danh Top học sinh xuất sắc", icon: <Award size={20} color="#c084fc" /> },
                  { idx: 8, label: "Video Bài Giảng", desc: "Kho video thí nghiệm & lý thuyết chuẩn", icon: <Video size={20} color="#c084fc" /> },
                ].map((item) => (
                  <Grid item xs={12} sm={4} key={item.idx}>
                    <Paper
                      onClick={() => handleSelectTab(item.idx)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        bgcolor: currentTab === item.idx ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                        border: currentTab === item.idx ? '1.5px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.2)', borderColor: '#a855f7', transform: 'translateY(-2px)' },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        {item.icon}
                        <Typography variant="body2" fontWeight="bold" color="#fff">
                          {item.label}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px', display: 'block' }}>
                        {item.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Category 3: Teacher Special Features */}
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" color="#f59e0b" mb={1.2} display="flex" alignItems="center" gap={1}>
                📚 DÀNH RIÊNG CHO GIÁO VIÊN {isTeacher ? "(Đang bật)" : "(Chế độ xem)"}
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { idx: 13, label: "Bảng Trắng Studio", desc: "Vẽ phấn, dán công thức, xuất file PDF/Ảnh", icon: <Pen size={20} color="#f59e0b" /> },
                  { idx: 6, label: "Đề Thi Mới 2025", desc: "Soạn & Chấm đề thi trắc nghiệm GDPT", icon: <FileCheck2 size={20} color="#f59e0b" /> },
                  { idx: 5, label: "Soạn Giáo Án (5512)", desc: "Trợ lý soạn giáo án chuẩn công văn", icon: <BookOpen size={20} color="#f59e0b" /> },
                  { idx: 7, label: "Dự Án STEM", desc: "Kế hoạch bài dạy STEM thực tiễn", icon: <Sparkles size={20} color="#f59e0b" /> },
                  { idx: 9, label: "Sổ Học Sinh", desc: "Theo dõi đánh giá năng lực cả lớp", icon: <GraduationCap size={20} color="#f59e0b" /> },
                  { idx: 10, label: "Giáo Viên Audit", desc: "Kiểm tra chất lượng & lịch sử", icon: <UserCheck size={20} color="#f59e0b" /> },
                ].map((item) => (
                  <Grid item xs={12} sm={4} key={item.idx}>
                    <Paper
                      onClick={() => handleSelectTab(item.idx)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        bgcolor: currentTab === item.idx ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                        border: currentTab === item.idx ? '1.5px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b', transform: 'translateY(-2px)' },
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        {item.icon}
                        <Typography variant="body2" fontWeight="bold" color="#fff">
                          {item.label}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px', display: 'block' }}>
                        {item.desc}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Dialog>

        {/* Mobile Bottom Navigation Bar (xs & sm screens) */}
        <Paper
          elevation={10}
          sx={{
            display: { xs: 'block', lg: 'none' },
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            bgcolor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <BottomNavigation
            showLabels
            value={currentTab === 0 ? 0 : currentTab === 1 ? 1 : currentTab === 2 ? 2 : currentTab === 14 ? 3 : 4}
            onChange={(_, newValue) => {
              if (newValue === 0) handleSelectTab(0);
              else if (newValue === 1) handleSelectTab(1);
              else if (newValue === 2) handleSelectTab(2);
              else if (newValue === 3) handleSelectTab(14);
              else setHubModalOpen(true);
            }}
            sx={{
              bgcolor: 'transparent',
              height: 60,
              '& .MuiBottomNavigationAction-root': {
                minWidth: 0,
                padding: '4px 0',
                color: '#94a3b8',
                '&.Mui-selected': {
                  color: '#38bdf8',
                },
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '10px',
                  fontWeight: 500,
                  mt: 0.3,
                  '&.Mui-selected': {
                    fontSize: '11px',
                    fontWeight: 'bold',
                  },
                },
              },
            }}
          >
            <BottomNavigationAction
              label="Trang chủ"
              icon={<Home size={19} />}
            />
            <BottomNavigationAction
              label="Thí nghiệm"
              icon={<FlaskConical size={19} />}
            />
            <BottomNavigationAction
              label="Gia Sư AI"
              icon={<Bot size={19} />}
            />
            <BottomNavigationAction
              label="Chẩn đoán"
              icon={<Brain size={19} />}
            />
            <BottomNavigationAction
              label="Tất cả"
              icon={<Grid2X2 size={19} />}
            />
          </BottomNavigation>
        </Paper>

        {/* User Authentication & Profile Modal */}
        <UserAuthModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={currentUser}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            if (user.role === 'student') {
              setRoleViewMode('student');
            } else if (user.role === 'teacher') {
              setRoleViewMode('teacher');
            }
          }}
          onLogout={() => setCurrentUser(null)}
          initialRole={authInitialRole}
        />
      </Box>
    </ThemeProvider>
  );
}

function TeacherAccessGuard({
  title,
  onBack,
  onOpenAuth,
}: {
  title: string;
  onBack: () => void;
  onOpenAuth: () => void;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        textAlign: 'center',
        bgcolor: '#0f172a',
        borderRadius: 3.5,
        border: '1px solid rgba(245, 158, 11, 0.3)',
        maxWidth: 680,
        mx: 'auto',
        my: { xs: 3, md: 6 },
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.1)',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: '50%',
          bgcolor: 'rgba(245, 158, 11, 0.15)',
          width: 72,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2.5,
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }}
      >
        <Lock size={36} color="#f59e0b" />
      </Box>

      <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
        Chức Năng Dành Riêng Cho Giáo Viên
      </Typography>

      <Chip
        label={title}
        color="warning"
        variant="outlined"
        sx={{ mb: 2, fontWeight: 'bold', fontSize: 13 }}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.7, maxWidth: 540, mx: 'auto' }}>
        Tài khoản hiện tại của bạn đang có vai trò <b>Học Sinh</b>. Chức năng <b>{title}</b> chỉ dành riêng cho Thầy/Cô để soạn giáo án, ra đề thi, thiết kế dự án STEM và quản trị chuyên môn.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: '#94a3b8',
            borderRadius: 2,
            px: 2.5,
            '&:hover': { borderColor: '#fff', color: '#fff' },
          }}
        >
          Quay Lại Trang Chủ
        </Button>
        <Button
          variant="contained"
          onClick={onOpenAuth}
          startIcon={<UserCheck size={18} />}
          sx={{
            bgcolor: '#f59e0b',
            color: '#000',
            fontWeight: 'bold',
            borderRadius: 2,
            px: 3,
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
            '&:hover': { bgcolor: '#d97706' },
          }}
        >
          Đăng Ký / Đổi Vai Trò Giáo Viên
        </Button>
      </Stack>
    </Paper>
  );
}
