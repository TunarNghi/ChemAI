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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  LinearProgress,
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
  Flame,
  Star,
  Award,
  User,
  GraduationCap,
  Home,
} from 'lucide-react';
import { theme } from '@/theme/theme';
import HomeTab from '@/components/HomeTab';
import VirtualLab from '@/components/VirtualLab';
import DifyChatTutor from '@/components/DifyChatTutor';
import ChemicalBondViewer3D from '@/components/ChemicalBondViewer3D';
import SafetyTab from '@/components/SafetyTab';
import QuizKahootTab from '@/components/QuizKahootTab';
import AuditTab from '@/components/AuditTab';
import LessonPlanner from '@/components/LessonPlanner';
import ExamManager from '@/components/ExamManager';
import StemProjects from '@/components/StemProjects';
import LeaderboardTab from '@/components/LeaderboardTab';
import { getLocalStudentProfile, saveStudentProfile, StudentProfile, calculateLevel } from '@/lib/api';

interface NavItem {
  index: number;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  isAudit?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { index: 0, label: "Trang Chủ", shortLabel: "Trang chủ", icon: <Home size={20} /> },
  { index: 1, label: "Thí Nghiệm Ảo (10-12)", shortLabel: "Thí nghiệm", icon: <FlaskConical size={20} /> },
  { index: 2, label: "Gia Sư AI", shortLabel: "Gia sư AI", icon: <Bot size={20} /> },
  { index: 3, label: "Thử Thách Kahoot", shortLabel: "Kahoot", icon: <Trophy size={20} /> },
  { index: 4, label: "An Toàn, 3D & Phổ IR", shortLabel: "3D & Phổ", icon: <ShieldCheck size={20} /> },
  { index: 5, label: "Bảng Xếp Hạng", shortLabel: "Xếp hạng", icon: <Award size={20} /> },
  { index: 6, label: "Soạn Giáo Án (5512)", shortLabel: "Giáo án 5512", icon: <BookOpen size={20} /> },
  { index: 7, label: "Soạn - Chấm Bài Thi", shortLabel: "Đề thi", icon: <FileCheck2 size={20} /> },
  { index: 8, label: "STEM & Bồi Dưỡng GV", shortLabel: "STEM", icon: <Sparkles size={20} /> },
  { index: 9, label: "Giáo Viên Audit", shortLabel: "Audit", icon: <UserCheck size={20} />, isAudit: true },
];

export default function AppContainer() {
  const [currentTab, setCurrentTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Student Profile State
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editClass, setEditClass] = useState<string>("");
  const [editSchool, setEditSchool] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const p = getLocalStudentProfile();
    setProfile(p);
    setEditName(p.name);
    setEditClass(p.className);
    setEditSchool(p.school);
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSelectTab = (idx: number) => {
    setCurrentTab(idx);
    setDrawerOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveProfile = () => {
    if (!profile) return;
    const updated: StudentProfile = {
      ...profile,
      name: editName.trim() || profile.name,
      className: editClass.trim() || profile.className,
      school: editSchool.trim() || profile.school,
    };
    saveStudentProfile(updated);
    setProfile(updated);
    setOpenProfileModal(false);
  };

  if (!mounted) {
    return null;
  }

  const currentLevelExp = (profile?.exp || 0) % 100;

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
                    Hệ Thống Trợ Lý & Mô Phỏng Hóa Học THPT (GDPT 2018)
                  </Typography>
                </Box>
              </Box>

              {/* Desktop/Tablet Horizontal Tabs */}
              <Tabs
                value={currentTab === 9 ? false : currentTab}
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
                <Tab label="Trang Chủ" />
                <Tab label="Thí Nghiệm Ảo" />
                <Tab label="Gia Sư AI" />
                <Tab label="Thử Thách Kahoot" />
                <Tab label="An Toàn & 3D" />
                <Tab label="Bảng Xếp Hạng" />
                <Tab label="Soạn Giáo Án" />
                <Tab label="Soạn - Chấm Thi" />
                <Tab label="STEM & Video" />
              </Tabs>

              {/* Action Buttons & Profile */}
              <Box display="flex" alignItems="center" gap={1}>
                {/* Student Stats Badges */}
                <Box
                  onClick={() => setOpenProfileModal(true)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    bgcolor: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 3,
                    py: 0.4,
                    px: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#38bdf8', bgcolor: 'rgba(56, 189, 248, 0.15)' }
                  }}
                >
                  <Box display="flex" alignItems="center" gap={0.3}>
                    <Flame size={14} color="#f97316" />
                    <Typography variant="caption" fontWeight="bold" color="#fb923c" sx={{ fontSize: 11 }}>
                      {profile?.streak || 1}
                    </Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Box display="flex" alignItems="center" gap={0.3}>
                    <Star size={14} color="#eab308" />
                    <Typography variant="caption" fontWeight="bold" color="#facc15" sx={{ fontSize: 11 }}>
                      {profile?.exp || 150} EXP
                    </Typography>
                  </Box>
                </Box>

                {/* Desktop Teacher Audit Button */}
                <Chip
                  icon={<UserCheck size={16} />}
                  label="Giáo viên Audit"
                  color={currentTab === 9 ? "warning" : "default"}
                  onClick={() => setCurrentTab(9)}
                  variant={currentTab === 9 ? "filled" : "outlined"}
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    fontWeight: 'bold',
                    borderColor: 'rgba(245, 158, 11, 0.5)',
                    color: currentTab === 9 ? '#000' : '#f59e0b',
                    cursor: 'pointer',
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

          {/* Student Profile in Drawer */}
          <Paper
            onClick={() => { setDrawerOpen(false); setOpenProfileModal(true); }}
            sx={{
              p: 1.5,
              mb: 2,
              bgcolor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 2,
              cursor: 'pointer'
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={20} color="#fff" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight="bold" noWrap color="common.white">
                  {profile?.name || "Học Sinh"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Lớp {profile?.className} • Cấp độ {profile?.level || 1}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 1.5 }} />

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

        {/* Main View Area */}
        <Container
          maxWidth="xl"
          sx={{
            mt: { xs: 1.5, sm: 2, md: 3 },
            px: { xs: 1.5, sm: 2, md: 3 },
            maxWidth: '100% !important',
          }}
        >
          {currentTab === 0 && <HomeTab onNavigate={(idx) => setCurrentTab(idx)} onOpenTeacherPass={() => setCurrentTab(9)} />}
          {currentTab === 1 && <VirtualLab />}
          {currentTab === 2 && <DifyChatTutor />}
          {currentTab === 3 && <QuizKahootTab />}
          {currentTab === 4 && <SafetyTab />}
          {currentTab === 5 && <LeaderboardTab />}
          {currentTab === 6 && <LessonPlanner />}
          {currentTab === 7 && <ExamManager />}
          {currentTab === 8 && <StemProjects />}
          {currentTab === 9 && <AuditTab />}
        </Container>

        {/* STUDENT PROFILE MODAL */}
        <Dialog
          open={openProfileModal}
          onClose={() => setOpenProfileModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 3,
              p: 1
            }
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Award color="#38bdf8" size={22} />
              <Typography variant="h6" fontWeight="bold" color="common.white">
                Hồ Sơ Học Sinh & Gamification
              </Typography>
            </Box>
            <IconButton onClick={() => setOpenProfileModal(false)} size="small" sx={{ color: 'text.secondary' }}>
              <X size={18} />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ pt: 1.5 }}>
            <Stack spacing={2.5}>
              {/* Level & EXP Bar */}
              <Paper sx={{ p: 2, bgcolor: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8">
                    Cấp độ {profile?.level || 1} • {profile?.exp || 150} EXP
                  </Typography>
                  <Chip
                    icon={<Flame size={14} />}
                    label={`Chuỗi ${profile?.streak || 1} ngày`}
                    size="small"
                    sx={{ bgcolor: 'rgba(249, 115, 22, 0.2)', color: '#fb923c', fontWeight: 'bold' }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={currentLevelExp}
                  sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#38bdf8' } }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  Còn {100 - currentLevelExp} EXP để lên Cấp { (profile?.level || 1) + 1 }
                </Typography>
              </Paper>

              {/* Badges Earned */}
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="common.white" mb={1}>
                  🏆 Huy Hiệu Đạt Được:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {profile?.badges?.map((badge, idx) => (
                    <Chip
                      key={idx}
                      icon={<Award size={14} />}
                      label={badge}
                      sx={{ bgcolor: 'rgba(234, 179, 8, 0.15)', color: '#facc15', border: '1px solid rgba(234, 179, 8, 0.4)', fontWeight: 'bold' }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Edit Info Fields */}
              <Stack spacing={1.5}>
                <TextField
                  label="Họ và tên học sinh"
                  size="small"
                  fullWidth
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <TextField
                  label="Lớp học"
                  size="small"
                  fullWidth
                  value={editClass}
                  onChange={(e) => setEditClass(e.target.value)}
                />
                <TextField
                  label="Trường THPT"
                  size="small"
                  fullWidth
                  value={editSchool}
                  onChange={(e) => setEditSchool(e.target.value)}
                />
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenProfileModal(false)} sx={{ color: '#94a3b8' }}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ fontWeight: 'bold' }}>
              Lưu Thông Tin
            </Button>
          </DialogActions>
        </Dialog>

        {/* Mobile Bottom Navigation Bar */}
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
              label="3D & Phổ"
              icon={<ShieldCheck size={19} />}
            />
            <BottomNavigationAction
              label={currentTab >= 4 ? NAV_ITEMS[currentTab]?.shortLabel || "Thêm" : "Thêm"}
              icon={<Layers size={19} />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
