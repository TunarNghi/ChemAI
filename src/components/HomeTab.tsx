"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from '@mui/material';
import {
  FlaskConical,
  Bot,
  Trophy,
  ShieldCheck,
  Award,
  BookOpen,
  FileCheck2,
  Sparkles,
  UserCheck,
  Grid2X2,
  Lock,
  ArrowRight,
  Flame,
  Star,
  GraduationCap,
  Atom,
  Database,
  Radio,
} from 'lucide-react';
import { getLocalStudentProfile, saveStudentProfile, StudentProfile } from '@/lib/api';

interface HomeTabProps {
  onNavigate: (tabIndex: number) => void;
  onOpenTeacherPass: () => void;
}

export default function HomeTab({ onNavigate, onOpenTeacherPass }: HomeTabProps) {
  const [profile, setProfile] = useState<StudentProfile>(getLocalStudentProfile);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [className, setClassName] = useState<string>('10A1');
  const [schoolName, setSchoolName] = useState<string>('THPT Chuyên Thoại Ngọc Hầu');

  const handleAuthSubmit = () => {
    if (!username.trim()) {
      alert("Vui lòng nhập tên đăng nhập!");
      return;
    }
    const updated: StudentProfile = {
      ...profile,
      username: username.trim().toLowerCase(),
      name: fullname.trim() || username.trim(),
      className: className.trim() || "10A1",
      school: schoolName.trim() || "THPT An Giang",
    };
    saveStudentProfile(updated);
    setProfile(updated);
    setOpenAuthModal(false);
    alert(`Đăng nhập thành công! Chào mừng em ${updated.name} (Lớp ${updated.className})`);
  };

  return (
    <Box sx={{ spaceY: 4, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* HERO BANNER */}
      <Paper
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: { xs: 2.5, sm: 4, md: 5 },
          bgcolor: 'rgba(15, 23, 42, 0.95)',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.25)',
        }}
      >
        <Box sx={{ maxWidth: 850, position: 'relative', zIndex: 1 }}>
          <Chip
            icon={<Atom size={16} color="#38bdf8" />}
            label="Nền Tảng Hóa Học Số THPT Chuẩn GDPT 2018"
            size="small"
            sx={{
              bgcolor: 'rgba(56, 189, 248, 0.12)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              fontWeight: 'bold',
              fontSize: 11,
              mb: 2,
            }}
          />

          <Typography
            variant="h3"
            fontWeight="black"
            sx={{
              fontSize: { xs: '26px', sm: '36px', md: '44px' },
              color: '#fff',
              lineHeight: 1.2,
              mb: 1.5,
            }}
          >
            Chào Mừng Đến Với{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              HCC - ChemAI 2026
            </span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#cbd5e1',
              fontSize: { xs: '13.5px', sm: '15.5px' },
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Hệ sinh thái học tập và giảng dạy Hóa học thông minh tích hợp <strong>Trí tuệ nhân tạo (Gemini AI & Dify)</strong>,
            mô phỏng ống nghiệm định lượng thời gian thực, trợ lý giải bài tập 24/7, phân tích phổ hồng ngoại FTIR & đấu trường Kahoot Live.
          </Typography>

          {/* Quick Technology Pills */}
          <Box display="flex" flexWrap="wrap" gap={1.2}>
            <Chip
              icon={<Sparkles size={14} color="#facc15" />}
              label="Gemini 3.5 & Dify AI"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <Chip
              icon={<Database size={14} color="#34d399" />}
              label="Dual-Database Cloud (Primary & Backup)"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <Chip
              icon={<Radio size={14} color="#818cf8" />}
              label="Đấu Trường Kahoot Live Multiplayer"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </Box>
        </Box>
      </Paper>

      {/* PORTAL VAI TRÒ HỌC SINH & GIÁO VIÊN */}
      <Grid container spacing={2.5}>
        {/* CARD 1: HỌC SINH */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
              bgcolor: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              '&:hover': { borderColor: '#38bdf8', boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.2)' }
            }}
          >
            <div>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap color="#38bdf8" size={24} />
                </Box>
                <Chip label="Dành Cho Học Sinh" color="primary" size="small" sx={{ fontWeight: 'bold', fontSize: 10 }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" color="common.white" gutterBottom>
                Cổng Tài Khoản Học Sinh
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 2 }}>
                Lưu tiến trình học tập, chuỗi ngày đăng nhập ({profile.streak} ngày), tích lũy điểm kinh nghiệm ({profile.exp} EXP), mở khóa danh hiệu và thi đấu Kahoot thời gian thực.
              </Typography>
            </div>

            <Box display="flex" gap={1.5} pt={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => { setAuthMode('login'); setOpenAuthModal(true); }}
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                Đăng Nhập
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => { setAuthMode('signup'); setOpenAuthModal(true); }}
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                Tạo Tài Khoản
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* CARD 2: GIÁO VIÊN */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
              bgcolor: '#0f172a',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              '&:hover': { borderColor: '#f59e0b', boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.2)' }
            }}
          >
            <div>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck color="#f59e0b" size={24} />
                </Box>
                <Chip label="Dành Cho Giáo Viên" color="warning" size="small" sx={{ fontWeight: 'bold', fontSize: 10 }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" color="common.white" gutterBottom>
                Cổng Xác Thực Giáo Viên
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mb: 2 }}>
                Dành riêng cho Thầy/Cô. Xác thực bảo mật để xem Chat Logs học sinh, gán danh hiệu custom, quản lý lớp học, soạn kế hoạch bài dạy 5512 và host phòng thi đấu Kahoot.
              </Typography>
            </div>

            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={onOpenTeacherPass}
              startIcon={<Lock size={16} />}
              sx={{ fontWeight: 'bold', textTransform: 'none', bgcolor: '#f59e0b', color: '#0f172a' }}
            >
              Nhập Mật Khẩu Giáo Viên (chemai2026)
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* DANH SÁCH 8 TÍNH NĂNG CỐT LÕI (FEATURE GRID) */}
      <Box>
        <Typography variant="h6" fontWeight="bold" color="common.white" mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Sparkles color="#38bdf8" size={20} />
          Các Tính Năng Cốt Lõi Của Hệ Thống (Nhấp Để Mở Nhanh)
        </Typography>

        <Grid container spacing={2}>
          {/* Feature 1: Thí nghiệm ảo */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(1)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.1)', borderColor: '#38bdf8', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <FlaskConical color="#38bdf8" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                Thí Nghiệm Ảo THPT
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                16 Presets Lớp 10-12, ống nghiệm 250ml, biểu đồ pH, M-Checker & in báo cáo.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 2: Gia sư AI */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(2)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.1)', borderColor: '#818cf8', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <Bot color="#818cf8" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                Gia Sư Hóa Học AI
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                Hỏi đáp 24/7 với Dify & Gemini, gợi ý prompt chuẩn hóa công thức hóa học.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 3: Kahoot Live */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(3)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(234, 179, 8, 0.1)', borderColor: '#facc15', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(234, 179, 8, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <Trophy color="#facc15" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                Thử Thách & Kahoot Live
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                Solo AI Quiz luyện tập & Đấu trường Multiplayer realtime với mã PIN 6 số.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 4: 3D & Phổ IR */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(4)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.1)', borderColor: '#34d399', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <ShieldCheck color="#34d399" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                An Toàn, 3D & Phổ IR
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                Mô hình Three.js 3D xoay 360°, tra cứu SDS & đồ thị phổ hồng ngoại FTIR.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 5: Leaderboard */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(5)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(249, 115, 22, 0.1)', borderColor: '#fb923c', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <Award color="#fb923c" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                Bảng Xếp Hạng Toàn Trường
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                Vinh danh Top EXP, Top Chuỗi Ngày Streak & Top Chuỗi Đúng Kahoot.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 6: Soạn Giáo Án 5512 */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(6)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(217, 70, 239, 0.1)', borderColor: '#e879f9', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(217, 70, 239, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <BookOpen color="#e879f9" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                Soạn Kế Hoạch Bài Dạy
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                Soạn giáo án chuẩn Công văn 5512 đầy đủ 4 hoạt động và xuất Word/PDF.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 7: Soạn - Chấm Đề Thi */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(7)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(14, 165, 233, 0.1)', borderColor: '#38bdf8', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(14, 165, 233, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <FileCheck2 color="#38bdf8" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                Soạn - Chấm Đề Thi
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                Ma trận đề thi 4 mức độ nhận thức & công cụ chấm thi phân tích phổ điểm.
              </Typography>
            </Paper>
          </Grid>

          {/* Feature 8: STEM & Bồi Dưỡng GV */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => onNavigate(8)}
              sx={{
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': { bgcolor: 'rgba(234, 179, 8, 0.1)', borderColor: '#facc15', transform: 'translateY(-2px)' }
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(234, 179, 8, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <Sparkles color="#facc15" size={20} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                STEM, Video & Bồi Dưỡng GV
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                Dự án STEM thực tế, kho video bài giảng & tài liệu phát triển năng lực GDPT 2018.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* MODAL AUTH ĐĂNG NHẬP / ĐĂNG KÝ HỌC SINH */}
      <Dialog
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0f172a',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 3,
            p: 1,
          }
        }}
      >
        <DialogTitle sx={{ color: '#38bdf8', fontWeight: 'bold' }}>
          {authMode === 'login' ? 'Đăng Nhập Tài Khoản Học Sinh' : 'Tạo Tài Khoản Học Sinh Mới'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Tên đăng nhập (Username)"
              size="small"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="VD: nguyenvana"
            />
            {authMode === 'signup' && (
              <>
                <TextField
                  label="Họ và tên đầy đủ"
                  size="small"
                  fullWidth
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="VD: Nguyễn Văn An"
                />
                <TextField
                  label="Lớp học"
                  size="small"
                  fullWidth
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="VD: 10A1, 11B2..."
                />
                <TextField
                  label="Trường THPT"
                  size="small"
                  fullWidth
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="VD: THPT Chuyên Thoại Ngọc Hầu"
                />
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenAuthModal(false)} sx={{ color: '#94a3b8' }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={handleAuthSubmit} sx={{ fontWeight: 'bold' }}>
            {authMode === 'login' ? 'Đăng Nhập Ngay' : 'Hoàn Tất Đăng Ký'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
