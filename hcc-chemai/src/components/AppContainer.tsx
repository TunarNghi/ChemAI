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
} from 'lucide-react';
import { theme } from '@/theme/theme';
import VirtualLab from '@/components/VirtualLab';
import DifyChatTutor from '@/components/DifyChatTutor';
import ChemicalBondViewer3D from '@/components/ChemicalBondViewer3D';
import SafetyTab from '@/components/SafetyTab';
import QuizKahootTab from '@/components/QuizKahootTab';
import AuditTab from '@/components/AuditTab';
import LessonPlanner from '@/components/LessonPlanner';
import ExamManager from '@/components/ExamManager';
import StemProjects from '@/components/StemProjects';
import UserAuthModal, { UserProfile, getStoredCurrentUser } from '@/components/UserAuthModal';
import { User } from 'lucide-react';

interface NavItem {
  index: number;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  isAudit?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { index: 0, label: "Thí Nghiệm Ảo", shortLabel: "Thí nghiệm", icon: <FlaskConical size={20} /> },
  { index: 1, label: "Gia Sư AI", shortLabel: "Gia sư AI", icon: <Bot size={20} /> },
  { index: 2, label: "Thử Thách AI / Kahoot", shortLabel: "Kahoot", icon: <Trophy size={20} /> },
  { index: 3, label: "An Toàn & 3D Liên Kết", shortLabel: "3D & An toàn", icon: <ShieldCheck size={20} /> },
  { index: 4, label: "Soạn Giáo Án (5512)", shortLabel: "Giáo án 5512", icon: <BookOpen size={20} /> },
  { index: 5, label: "Soạn - Chấm Bài Thi", shortLabel: "Đề thi", icon: <FileCheck2 size={20} /> },
  { index: 6, label: "Dự Án STEM", shortLabel: "STEM", icon: <Sparkles size={20} /> },
  { index: 7, label: "Giáo Viên Audit", shortLabel: "Audit", icon: <UserCheck size={20} />, isAudit: true },
];

export default function AppContainer() {
  const [currentTab, setCurrentTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredCurrentUser();
    if (stored) {
      setCurrentUser(stored);
    }
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSelectTab = (idx: number) => {
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
            bgcolor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
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
                    bgcolor: 'rgba(2, 132, 199, 0.18)',
                    p: { xs: 0.8, sm: 1 },
                    '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.3)' }
                  }}
                >
                  <FlaskConical size={22} color="#38bdf8" />
                </IconButton>
                <Box sx={{ minWidth: 0 }}>
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
                value={currentTab === 7 ? false : currentTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  flexGrow: 1,
                  mx: 2,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    minHeight: 64,
                    px: 1.5,
                    transition: 'all 0.2s ease',
                    '&:hover': { color: '#38bdf8' }
                  }
                }}
              >
                <Tab label="Thí Nghiệm Ảo" />
                <Tab label="Gia Sư AI" />
                <Tab label="Thử Thách Kahoot" />
                <Tab label="An Toàn & 3D" />
                <Tab label="Soạn Giáo Án" />
                <Tab label="Soạn - Chấm Thi" />
                <Tab label="Dự Án STEM" />
              </Tabs>

              {/* Action Buttons */}
              <Box display="flex" alignItems="center" gap={1}>
                {/* User Account / Profile Button */}
                {currentUser ? (
                  <Chip
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: '#0284c7',
                          color: '#fff',
                          fontWeight: 'bold',
                          width: 26,
                          height: 26,
                          fontSize: '12px'
                        }}
                      >
                        {currentUser.fullName.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    label={`${currentUser.fullName} (${currentUser.className || 'Lớp 10'})`}
                    onClick={() => setAuthModalOpen(true)}
                    variant="outlined"
                    sx={{
                      display: { xs: 'none', sm: 'inline-flex' },
                      fontWeight: '600',
                      borderColor: 'rgba(56, 189, 248, 0.4)',
                      color: '#38bdf8',
                      bgcolor: 'rgba(56, 189, 248, 0.08)',
                      cursor: 'pointer',
                      height: 32,
                      '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.2)' }
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

                {/* Desktop Teacher Audit Button */}
                <Chip
                  icon={<UserCheck size={16} />}
                  label="Giáo viên Audit"
                  color={currentTab === 7 ? "warning" : "default"}
                  onClick={() => setCurrentTab(7)}
                  variant={currentTab === 7 ? "filled" : "outlined"}
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    fontWeight: 'bold',
                    borderColor: 'rgba(245, 158, 11, 0.5)',
                    color: currentTab === 7 ? '#000' : '#f59e0b',
                    cursor: 'pointer',
                    height: 32,
                    '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.2)' }
                  }}
                />

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

        {/* Mobile Navigation Drawer / Menu */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 290,
              bgcolor: '#0f172a',
              backgroundImage: 'none',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              p: 2,
            },
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <FlaskConical size={20} color="#0284c7" />
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Danh Mục Tính Năng
              </Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.secondary', p: 0.5 }}>
              <X size={20} />
            </IconButton>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 1.5 }} />

          {/* Mobile User Profile Quick Button */}
          <Paper
            onClick={() => { setDrawerOpen(false); setAuthModalOpen(true); }}
            sx={{
              p: 1.5,
              mb: 1.5,
              bgcolor: currentUser ? 'rgba(56, 189, 248, 0.08)' : '#090d16',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: 2,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)' }
            }}
          >
            <Avatar sx={{ bgcolor: currentUser ? '#0284c7' : 'rgba(255,255,255,0.1)', color: '#fff', width: 38, height: 38 }}>
              {currentUser ? currentUser.fullName.charAt(0).toUpperCase() : <User size={18} />}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" fontWeight="bold" noWrap sx={{ color: '#f8fafc', fontSize: '13px' }}>
                {currentUser ? currentUser.fullName : 'Tài Khoản Học Sinh'}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '11px', display: 'block' }}>
                {currentUser ? `${currentUser.className || 'Lớp 10'} — ${currentUser.school || 'THPT'}` : 'Nhấn để Đăng nhập / Đăng ký'}
              </Typography>
            </Box>
          </Paper>

          <List sx={{ p: 0 }}>
            {NAV_ITEMS.map((item) => {
              const isSelected = currentTab === item.index;
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
                    {item.isAudit && (
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
          {currentTab === 0 && <VirtualLab />}
          {currentTab === 1 && <DifyChatTutor />}
          {currentTab === 2 && <QuizKahootTab />}
          {currentTab === 3 && <SafetyTab />}
          {currentTab === 4 && <LessonPlanner />}
          {currentTab === 5 && <ExamManager />}
          {currentTab === 6 && <StemProjects />}
          {currentTab === 7 && <AuditTab />}
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
              label="3D Liên kết"
              icon={<ShieldCheck size={19} />}
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
        />
      </Box>
    </ThemeProvider>
  );
}
