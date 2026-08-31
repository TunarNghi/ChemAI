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
  Tabs,
  Tab,
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
  Menu,
  X,
  Layers,
  Home,
  User,
  Lock,
  Video,
  GraduationCap,
  Award,
  Atom,
} from 'lucide-react';
import { theme } from '@/theme/theme';
import HomeDashboard from '@/components/HomeDashboard';
import VirtualLab from '@/components/VirtualLab';
import DifyChatTutor from '@/components/DifyChatTutor';
import ChemicalBondViewer3D from '@/components/ChemicalBondViewer3D';
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
import UserAuthModal, { UserProfile, getStoredCurrentUser, saveStoredCurrentUser } from '@/components/UserAuthModal';
import { Grid2X2, Brain, Pen, Compass } from 'lucide-react';

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
  { index: 4, label: "3D Liên Kết & 2D Lewis", shortLabel: "3D & Lewis", category: 'practice', icon: <ShieldCheck size={20} /> },
  { index: 14, label: "Chẩn Đoán Lỗ Hổng", shortLabel: "Chẩn đoán", category: 'assistant', icon: <Brain size={20} /> },
  { index: 2, label: "Gia Sư Hóa Học AI", shortLabel: "Gia sư AI", category: 'assistant', icon: <Bot size={20} /> },
  { index: 3, label: "Đấu Trường Kahoot", shortLabel: "Kahoot", category: 'assistant', icon: <Trophy size={20} /> },
  { index: 11, label: "Bảng Xếp Hạng", shortLabel: "Xếp hạng", category: 'assistant', icon: <Award size={20} /> },
  { index: 8, label: "Video Bài Giảng", shortLabel: "Video bài dạy", category: 'assistant', icon: <Video size={20} /> },
  { index: 13, label: "Bảng Trắng Studio", shortLabel: "Bảng trắng", category: 'teacher', icon: <Pen size={20} />, teacherOnly: true },
  { index: 6, label: "Đề Thi Mới 2025", shortLabel: "Đề thi 2025", category: 'teacher', icon: <FileCheck2 size={20} />, teacherOnly: true },
  { index: 5, label: "Soạn Giáo Án (5512)", shortLabel: "Giáo án 5512", category: 'teacher', icon: <BookOpen size={20} />, teacherOnly: true },
  { index: 7, label: "Dự Án STEM", shortLabel: "STEM", category: 'teacher', icon: <Sparkles size={20} />, teacherOnly: true },
  { index: 9, label: "Sổ Học Sinh", shortLabel: "Sổ học sinh", category: 'teacher', icon: <GraduationCap size={20} />, teacherOnly: true },
  { index: 10, label: "Giáo Viên Audit", shortLabel: "Audit", category: 'teacher', icon: <UserCheck size={20} />, isAudit: true, teacherOnly: true },
];

export default function AppContainer() {
  const [currentTab, setCurrentTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hubModalOpen, setHubModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authInitialRole, setAuthInitialRole] = useState<'student' | 'teacher'>('student');

  const isTeacher = currentUser?.role === 'teacher';
  const visibleNavItems = NAV_ITEMS.filter(item => !item.teacherOnly || isTeacher);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredCurrentUser();
    if (stored) {
      setCurrentUser(stored);
    }
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue !== 0 && !currentUser) {
      setAuthModalOpen(true);
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
            <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 }, justifyContent: 'space-between', gap: 1 }}>
              {/* Brand Logo, Fast Home Button & Title */}
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.2 }} sx={{ minWidth: 0, flexShrink: 0 }}>
                {/* Fast Home Button */}
                <Tooltip title="Về Trang Chủ Ngay (1 Chạm)">
                  <IconButton
                    edge="start"
                    color="primary"
                    onClick={() => handleSelectTab(0)}
                    sx={{
                      bgcolor: currentTab === 0 ? 'rgba(2, 132, 199, 0.3)' : 'rgba(2, 132, 199, 0.15)',
                      border: currentTab === 0 ? '1.5px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.3)',
                      boxShadow: currentTab === 0 ? '0 0 12px rgba(56, 189, 248, 0.4)' : 'none',
                      p: { xs: 0.8, sm: 1 },
                      '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.3)', borderColor: '#38bdf8' }
                    }}
                  >
                    <Home size={21} color="#38bdf8" />
                  </IconButton>
                </Tooltip>

                <Box sx={{ minWidth: 0, cursor: 'pointer' }} onClick={() => handleSelectTab(0)}>
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      noWrap
                      sx={{
                        fontSize: { xs: '16px', sm: '19px', md: '21px' },
                        background: 'linear-gradient(45deg, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      HCC - ChemAI
                    </Typography>
                    <Chip
                      label="BIG UPDATE 2.0"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: 9.5,
                        fontWeight: 900,
                        bgcolor: 'rgba(56, 189, 248, 0.15)',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        display: { xs: 'none', sm: 'inline-flex' }
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      fontSize: '11px',
                      opacity: 0.85
                    }}
                  >
                    Hệ Thống Trợ Lý & Mô Phỏng Hóa Học THPT (GDPT 2018)
                  </Typography>
                </Box>

                {/* All Features Hub Trigger Button */}
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Grid2X2 size={16} />}
                  onClick={() => setHubModalOpen(true)}
                  sx={{
                    ml: { xs: 0.5, md: 1.5 },
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: 2,
                    color: '#38bdf8',
                    bgcolor: 'rgba(2, 132, 199, 0.1)',
                    borderColor: 'rgba(56, 189, 248, 0.35)',
                    display: { xs: 'none', sm: 'inline-flex' },
                    '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.25)', borderColor: '#38bdf8' }
                  }}
                >
                  Tất Cả Tính Năng
                </Button>
              </Box>

              {/* Desktop/Tablet Horizontal Tabs */}
              <Tabs
                value={visibleNavItems.some(i => i.index === currentTab && !i.isAudit) ? currentTab : false}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  display: { xs: 'none', lg: 'flex' },
                  flexGrow: 1,
                  mx: 1.5,
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: '#38bdf8',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.7)',
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    minHeight: 64,
                    px: 1.3,
                    color: '#94a3b8',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#e0f2fe',
                      bgcolor: 'rgba(255, 255, 255, 0.03)',
                    },
                    '&.Mui-selected': {
                      color: '#38bdf8',
                      fontWeight: 700,
                      bgcolor: 'rgba(56, 189, 248, 0.06)',
                    }
                  }
                }}
              >
                {visibleNavItems
                  .filter(item => !item.isAudit)
                  .map(item => (
                    <Tab key={item.index} value={item.index} label={item.shortLabel || item.label} />
                  ))}
              </Tabs>

              {/* Action Buttons */}
              <Box display="flex" alignItems="center" gap={1}>
                {/* User Account / Profile Button */}
                {currentUser ? (
                  <Chip
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: isTeacher ? '#f59e0b' : '#0284c7',
                          color: isTeacher ? '#000' : '#fff',
                          fontWeight: 'bold',
                          width: 26,
                          height: 26,
                          fontSize: '11px'
                        }}
                      >
                        {isTeacher ? 'GV' : 'HS'}
                      </Avatar>
                    }
                    label={isTeacher ? `[GV] ${currentUser.fullName}` : `[HS] ${currentUser.fullName} (${currentUser.className || 'Lớp 10'})`}
                    onClick={() => setAuthModalOpen(true)}
                    variant="outlined"
                    sx={{
                      display: { xs: 'none', sm: 'inline-flex' },
                      fontWeight: '600',
                      borderColor: isTeacher ? 'rgba(245, 158, 11, 0.5)' : 'rgba(56, 189, 248, 0.4)',
                      color: isTeacher ? '#f59e0b' : '#38bdf8',
                      bgcolor: isTeacher ? 'rgba(245, 158, 11, 0.08)' : 'rgba(56, 189, 248, 0.08)',
                      cursor: 'pointer',
                      height: 32,
                      '&:hover': { bgcolor: isTeacher ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.2)' }
                    }}
                  />
                ) : (
                  <Chip
                    icon={<User size={15} color="#38bdf8" />}
                    label="Đăng nhập / Đăng ký"
                    onClick={() => setAuthModalOpen(true)}
                    variant="outlined"
                    sx={{
                      display: { xs: 'none', sm: 'inline-flex' },
                      fontWeight: 'bold',
                      borderColor: 'rgba(56, 189, 248, 0.5)',
                      color: '#38bdf8',
                      bgcolor: 'rgba(2, 132, 199, 0.1)',
                      cursor: 'pointer',
                      height: 32,
                      '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.25)' }
                    }}
                  />
                )}

                {/* Mobile Menu & Hub Trigger */}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={() => setHubModalOpen(true)}
                  sx={{
                    display: { xs: 'flex', lg: 'none' },
                    bgcolor: 'rgba(2, 132, 199, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    p: 0.9,
                  }}
                >
                  <Grid2X2 size={20} color="#38bdf8" />
                </IconButton>
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

          {/* Drawer Nav Items List */}
          <List sx={{ p: 0 }}>
            {visibleNavItems.map((item) => {
              const isSelected = currentTab === item.index;
              const isLocked = !currentUser && item.index !== 0;
              return (
                <ListItem key={item.index} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => handleSelectTab(item.index)}
                    selected={isSelected}
                    sx={{
                      borderRadius: 2,
                      py: 1,
                      px: 1.5,
                      bgcolor: isSelected
                        ? (item.isAudit ? 'rgba(245, 158, 11, 0.15)' : 'rgba(2, 132, 199, 0.15)')
                        : 'transparent',
                      border: isSelected
                        ? (item.isAudit ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(56, 189, 248, 0.4)')
                        : '1px solid transparent',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isSelected
                          ? (item.isAudit ? '#f59e0b' : '#38bdf8')
                          : 'text.secondary'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '14px',
                        fontWeight: isSelected ? 'bold' : '500',
                        color: isSelected
                          ? (item.isAudit ? '#f59e0b' : '#38bdf8')
                          : 'text.primary',
                      }}
                    />
                    {isLocked && (
                      <Lock size={14} color="#64748b" style={{ marginLeft: 'auto' }} />
                    )}
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
                🤖 TRỢ LÝ AI & ĐẤU TRƯỜNG LUYỆN THI
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { idx: 14, label: "Chẩn Đoán Lỗ Hổng", desc: "Quét 4 cấp độ (10, 11, 12, THPT) & Bẫy đề thi", icon: <Brain size={20} color="#c084fc" /> },
                  { idx: 2, label: "Gia Sư Hóa Học AI", desc: "Hỏi đáp hóa học thông minh 24/7 Dify AI", icon: <Bot size={20} color="#c084fc" /> },
                  { idx: 3, label: "Đấu Trường Kahoot", desc: "Trắc nghiệm hóa học kịch tính", icon: <Trophy size={20} color="#c084fc" /> },
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
          onLoginSuccess={(user) => setCurrentUser(user)}
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
