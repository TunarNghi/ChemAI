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
import UserAuthModal, { UserProfile, getStoredCurrentUser, saveStoredCurrentUser } from '@/components/UserAuthModal';

interface NavItem {
  index: number;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  isAudit?: boolean;
  teacherOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { index: 0, label: "Trang Chủ", shortLabel: "Trang chủ", icon: <Home size={20} /> },
  { index: 1, label: "Thí Nghiệm Ảo", shortLabel: "Thí nghiệm", icon: <FlaskConical size={20} /> },
  { index: 2, label: "Gia Sư AI", shortLabel: "Gia sư AI", icon: <Bot size={20} /> },
  { index: 3, label: "Thử Thách AI / Kahoot", shortLabel: "Kahoot", icon: <Trophy size={20} /> },
  { index: 4, label: "An Toàn & 3D Liên Kết", shortLabel: "3D & An toàn", icon: <ShieldCheck size={20} /> },
  { index: 5, label: "Soạn Giáo Án (5512)", shortLabel: "Giáo án 5512", icon: <BookOpen size={20} />, teacherOnly: true },
  { index: 6, label: "Soạn - Chấm Bài Thi", shortLabel: "Đề thi", icon: <FileCheck2 size={20} />, teacherOnly: true },
  { index: 7, label: "Dự Án STEM", shortLabel: "STEM", icon: <Sparkles size={20} />, teacherOnly: true },
  { index: 8, label: "Video Bài Giảng", shortLabel: "Video bài dạy", icon: <Video size={20} /> },
  { index: 9, label: "Sổ Học Sinh", shortLabel: "Sổ học sinh", icon: <GraduationCap size={20} />, teacherOnly: true },
  { index: 10, label: "Giáo Viên Audit", shortLabel: "Audit", icon: <UserCheck size={20} />, isAudit: true, teacherOnly: true },
  { index: 11, label: "Bảng Xếp Hạng", shortLabel: "Xếp hạng", icon: <Award size={20} /> },
];

export default function AppContainer() {
  const [currentTab, setCurrentTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
      return;
    }
    setCurrentTab(idx);
    setDrawerOpen(false);
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
              {/* Brand Logo & Title */}
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }} sx={{ minWidth: 0, flexShrink: 0 }}>
                <IconButton
                  edge="start"
                  color="primary"
                  onClick={() => setCurrentTab(0)}
                  sx={{
                    bgcolor: 'rgba(2, 132, 199, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    p: { xs: 0.8, sm: 1 },
                    '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.3)', borderColor: '#38bdf8' }
                  }}
                >
                  <FlaskConical size={22} color="#38bdf8" />
                </IconButton>
                <Box sx={{ minWidth: 0, cursor: 'pointer' }} onClick={() => setCurrentTab(0)}>
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
                      label="2026"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: 10,
                        fontWeight: 'bold',
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
                    Hệ Thống Trợ Lý & Mô Phỏng Hóa Học Lớp 10 (GDPT 2018)
                  </Typography>
                </Box>
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
                  display: { xs: 'none', md: 'flex' },
                  flexGrow: 1,
                  mx: 2,
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: '#38bdf8',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.7)',
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    minHeight: 64,
                    px: 1.6,
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
                    <Tab key={item.index} value={item.index} label={item.label} />
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

                {/* Desktop Teacher Audit Button (Only visible for teachers) */}
                {isTeacher && (
                  <Chip
                    icon={<UserCheck size={16} />}
                    label="Giáo viên Audit"
                    color={currentTab === 10 ? "warning" : "default"}
                    onClick={() => handleSelectTab(10)}
                    variant={currentTab === 10 ? "filled" : "outlined"}
                    sx={{
                      display: { xs: 'none', md: 'inline-flex' },
                      fontWeight: 'bold',
                      borderColor: 'rgba(245, 158, 11, 0.5)',
                      color: currentTab === 10 ? '#000' : '#f59e0b',
                      cursor: 'pointer',
                      height: 32,
                      '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.2)' }
                    }}
                  />
                )}

                {/* Mobile Menu Button */}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={() => setDrawerOpen(true)}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    p: 1
                  }}
                >
                  <Menu size={20} color="#38bdf8" />
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

        {/* Main View Area with Mobile-Optimized Spacing */}
        <Container
          maxWidth="xl"
          sx={{
            mt: { xs: 1.5, sm: 2, md: 3 },
            px: { xs: 1.5, sm: 2, md: 3 },
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
        </Container>

        {/* Mobile Bottom Navigation Bar (xs & sm screens) */}
        <Paper
          elevation={10}
          sx={{
            display: { xs: 'block', md: 'none' },
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
            value={currentTab > 3 ? 4 : currentTab}
            onChange={(_, newValue) => {
              if (newValue === 4) {
                setDrawerOpen(true);
              } else {
                handleSelectTab(newValue);
              }
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
              label="Kahoot"
              icon={<Trophy size={19} />}
            />
            <BottomNavigationAction
              label={currentTab >= 4 ? NAV_ITEMS[currentTab]?.shortLabel || "Thêm" : "Thêm"}
              icon={<Layers size={19} />}
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
