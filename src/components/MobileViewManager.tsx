"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Tooltip,
  Paper,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Smartphone,
  Compass,
  FlaskConical,
  Atom,
  ShieldCheck,
  Bot,
  Trophy,
  Pen,
  Brain,
  X,
  SlidersHorizontal,
  FileCheck2,
  BookOpen,
  Sparkles,
  Award,
  Video,
  GraduationCap,
} from 'lucide-react';

interface MobileViewManagerProps {
  children: React.ReactNode;
  currentTab: number;
  onNavigateTab: (tabIndex: number) => void;
  isTeacher?: boolean;
}

export default function MobileViewManager({
  children,
  currentTab,
  onNavigateTab,
  isTeacher = false,
}: MobileViewManagerProps) {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* 1. NATIVE RESPONSIVE MAIN CONTENT WRAPPER (No CSS transform artifacts, 100% crisp & accurate touch) */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </Box>

      {/* 2. MOBILE FLOATING QUICK ACTION BUTTON (FAB) */}
      {isMobileDevice && (
        <Box
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 74, // Above Bottom Navigation
            zIndex: 1300,
          }}
        >
          <Tooltip title="Menu Nhanh Di Động">
            <IconButton
              onClick={() => setQuickMenuOpen(true)}
              sx={{
                bgcolor: '#0284c7',
                color: '#fff',
                width: 46,
                height: 46,
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.6), 0 0 14px rgba(56, 189, 248, 0.4)',
                border: '1.5px solid #38bdf8',
                '&:hover': { bgcolor: '#0369a1', transform: 'scale(1.08)' },
                transition: 'all 0.2s ease',
              }}
            >
              <SlidersHorizontal size={21} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* 3. MOBILE QUICK NAVIGATION DRAWER */}
      <Drawer
        anchor="bottom"
        open={quickMenuOpen}
        onClose={() => setQuickMenuOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#090d16',
            backgroundImage: 'linear-gradient(180deg, #0f172a 0%, #090d16 100%)',
            borderTop: '2px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '24px 24px 0 0',
            p: 2.5,
            maxHeight: '85vh',
          },
        }}
      >
        {/* Drawer Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" pb={1.5} mb={2} borderBottom="1px solid rgba(255,255,255,0.08)">
          <Box display="flex" alignItems="center" gap={1}>
            <SlidersHorizontal size={20} color="#38bdf8" />
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#fff', fontSize: '15px' }}>
              Điều Hướng Nhanh — HCC ChemAI
            </Typography>
          </Box>
          <IconButton onClick={() => setQuickMenuOpen(false)} size="small" sx={{ color: '#94a3b8' }}>
            <X size={18} />
          </IconButton>
        </Box>

        {/* Quick Jump List */}
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 'bold', mb: 1.2, display: 'block', fontSize: '11px' }}>
          🚀 CHỌN NHANH MÔ-ĐUN HỌC TẬP & GIẢNG DẠY:
        </Typography>
        <List sx={{ p: 0, maxHeight: 380, overflowY: 'auto' }}>
          {[
            { idx: 0, label: 'Trang Chủ & Dashboard', icon: <Compass size={18} color="#38bdf8" />, tag: 'Home' },
            { idx: 1, label: 'Phòng Thí Nghiệm & Chuẩn Độ pH', icon: <FlaskConical size={18} color="#38bdf8" />, tag: 'Lab' },
            { idx: 12, label: 'Bảng Tuần Hoàn 118 Nguyên Tố 4D', icon: <Atom size={18} color="#38bdf8" />, tag: '4D' },
            { idx: 4, label: '3D Liên Kết & 2D Lewis Octet', icon: <ShieldCheck size={18} color="#38bdf8" />, tag: 'Lewis' },
            { idx: 14, label: 'Chẩn Đoán Lỗ Hổng (10-11-12)', icon: <Brain size={18} color="#c084fc" />, tag: 'Test' },
            { idx: 2, label: 'Gia Sư Hóa Học AI (24/7)', icon: <Bot size={18} color="#c084fc" />, tag: 'AI' },
            { idx: 3, label: 'Đấu Trường Trắc Nghiệm Kahoot', icon: <Trophy size={18} color="#c084fc" />, tag: 'Quiz' },
            { idx: 11, label: 'Bảng Xếp Hạng & Huy Hiệu', icon: <Award size={18} color="#c084fc" />, tag: 'Top' },
            { idx: 8, label: 'Kho Video Bài Giảng Chuẩn', icon: <Video size={18} color="#c084fc" />, tag: 'Video' },
            ...(isTeacher
              ? [
                  { idx: 13, label: 'Studio Bảng Trắng Dạy Học', icon: <Pen size={18} color="#f59e0b" />, tag: 'GV' },
                  { idx: 6, label: 'Soạn & Chấm Đề Thi Mới 2025', icon: <FileCheck2 size={18} color="#f59e0b" />, tag: 'GV' },
                  { idx: 5, label: 'Trợ Lý Soạn Giáo Án 5512', icon: <BookOpen size={18} color="#f59e0b" />, tag: 'GV' },
                  { idx: 7, label: 'Kế Hoạch Dự Án STEM', icon: <Sparkles size={18} color="#f59e0b" />, tag: 'GV' },
                  { idx: 9, label: 'Sổ Học Sinh & Đánh Giá Năng Lực', icon: <GraduationCap size={18} color="#f59e0b" />, tag: 'GV' },
                ]
              : []),
          ].map((item) => (
            <ListItem key={item.idx} disablePadding sx={{ mb: 0.8 }}>
              <ListItemButton
                onClick={() => {
                  onNavigateTab(item.idx);
                  setQuickMenuOpen(false);
                }}
                sx={{
                  borderRadius: 2.5,
                  py: 1,
                  px: 1.5,
                  bgcolor: currentTab === item.idx ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255,255,255,0.03)',
                  border: currentTab === item.idx ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.06)',
                  '&:hover': { bgcolor: 'rgba(2, 132, 199, 0.15)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 34 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '13.5px',
                    fontWeight: currentTab === item.idx ? 'bold' : '500',
                    color: currentTab === item.idx ? '#fff' : '#cbd5e1',
                  }}
                />
                <Chip
                  label={item.tag}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '10px',
                    fontWeight: 'bold',
                    bgcolor: currentTab === item.idx ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                    color: currentTab === item.idx ? '#38bdf8' : '#94a3b8',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
