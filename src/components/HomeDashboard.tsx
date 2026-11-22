"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Container,
  Paper,
  Divider,
  Stack,
  IconButton,
  Tooltip,
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
  ArrowRight,
  Atom,
  Zap,
  CheckCircle2,
  Flame,
  Award,
  BookMarked,
  Microscope,
  Compass,
  GraduationCap,
  ChevronRight,
  Layers,
  Search,
  Users,
  LogIn,
  UserPlus,
  Lock,
  LogOut,
  Video,
  Youtube,
  Calendar,
  Tag,
  Brain,
  Pen,
} from 'lucide-react';
import { UserProfile, getUserGreeting } from '@/components/UserAuthModal';
import HomeMiniDemoWidget from '@/components/HomeMiniDemoWidget';

interface HomeDashboardProps {
  onNavigateTab: (tabIndex: number) => void;
  onOpenAuthModal?: (role?: 'student' | 'teacher') => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
  roleViewMode?: 'all' | 'student' | 'teacher';
  onRoleViewModeChange?: (mode: 'all' | 'student' | 'teacher') => void;
  onQuickLogin?: (role: 'student' | 'teacher') => void;
}

export interface SubFeatureItem {
  id: string;
  tabIndex: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  teacherOnly?: boolean;
}

export interface CoreFeatureGroup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  roleTarget: 'all' | 'student' | 'teacher';
  category?: 'student' | 'teacher';
  badge: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  mainActionIndex: number;
  mainActionText: string;
  items: SubFeatureItem[];
}

export const CORE_FEATURE_GROUPS: CoreFeatureGroup[] = [
  {
    id: 'lab',
    title: 'Thực Nghiệm Ảo & Không Gian 3D',
    subtitle: 'Mô phỏng phản ứng thực nghiệm tức thì, an toàn tuyệt đối & trực quan hóa 3D',
    description:
      'Nền tảng thực nghiệm số toàn diện bám sát SGK GDPT 2018: 11+ kịch bản thí nghiệm tương tác WebGL, bảng tuần hoàn 118 nguyên tố đa chiều và mô hình liên kết phân tử 3D.',
    roleTarget: 'all',
    badge: 'Mô Phỏng Thực Nghiệm',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    icon: <FlaskConical size={26} color="#38bdf8" />,
    mainActionIndex: 1,
    mainActionText: 'Vào Phòng Thí Nghiệm Ảo',
    items: [
      {
        id: 'virtual-lab',
        tabIndex: 1,
        title: 'Phòng Thí Nghiệm Ảo Hóa Học THPT',
        desc: '11+ phản ứng mô phỏng WebGL (Axit - Bazơ, Halogen, Kim loại kiềm, Este hóa, Tráng bạc), đồ thị pH & nhiệt độ thời gian thực.',
        icon: <FlaskConical size={18} color="#38bdf8" />,
        badge: '11+ Mô phỏng',
      },
      {
        id: 'periodic-table',
        tabIndex: 12,
        title: 'Bảng Tuần Hoàn Nguyên Tố Động',
        desc: 'Tra cứu 118 nguyên tố, cấu hình electron, độ âm điện Pauling, bán kính nguyên tử và quy luật biến đổi tuần hoàn.',
        icon: <Layers size={18} color="#38bdf8" />,
        badge: '118 Nguyên tố',
      },
      {
        id: 'chemical-bond-3d',
        tabIndex: 4,
        title: 'Mô Hình Phân Tử 3D & An Toàn Lab',
        desc: 'Trực quan hóa cấu trúc liên kết 3D Three.js theo chuẩn IUPAC, cẩm nang an toàn phòng lab và quy trình xử lý sự cố hóa chất.',
        icon: <Atom size={18} color="#38bdf8" />,
        badge: 'Three.js 3D',
      },
    ],
  },
  {
    id: 'tutor',
    title: 'Gia Sư AI & Đánh Giá Năng Lực',
    subtitle: 'Trợ lý thông minh giải đáp 24/7, phác đồ chẩn đoán lỗ hổng & kho bài giảng số',
    description:
      'Hệ thống trợ lý học tập AI chuyên sâu Hóa học THPT: giải đáp bài tập, cân bằng phản ứng oxi hóa - khử, bài thi chẩn đoán chỉ điểm bẫy đề thi và thư viện bài giảng đa phương tiện.',
    roleTarget: 'all',
    badge: 'Trí Tuệ Nhân Tạo 24/7',
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.25)',
    icon: <Bot size={26} color="#818cf8" />,
    mainActionIndex: 2,
    mainActionText: 'Hỏi Trợ Lý ChemAI Ngay',
    items: [
      {
        id: 'ai-tutor',
        tabIndex: 2,
        title: 'Gia Sư Hóa Học ChemAI Thông Minh',
        desc: 'Hỏi đáp 24/7 kiến thức Hóa 10, 11, 12 bám sát 3 bộ SGK mới. Giải thích từng bước cân bằng e, enthalpy phản ứng chuẩn xác.',
        icon: <Bot size={18} color="#818cf8" />,
        badge: 'ChemAI Core 2.0',
      },
      {
        id: 'diagnostic',
        tabIndex: 14,
        title: 'Chẩn Đoán Lỗ Hổng & Phác Đồ Học Tập',
        desc: 'Đánh giá 6 chỉ số năng lực hóa học GDPT 2018, phát hiện bẫy đề thi kinh điển và đề xuất phác đồ bồi dưỡng cá nhân hóa.',
        icon: <Sparkles size={18} color="#818cf8" />,
        badge: 'Đánh giá năng lực',
      },
      {
        id: 'video-lectures',
        tabIndex: 8,
        title: 'Kho Video Bài Giảng & Thực Nghiệm',
        desc: 'Hệ thống video bài giảng tóm tắt trọng tâm và video thực tế các phản ứng nguy hiểm ngoài đời thực được kiểm duyệt kỹ càng.',
        icon: <Video size={18} color="#818cf8" />,
        badge: 'Video HD',
      },
    ],
  },
  {
    id: 'arena',
    title: 'Đấu Trường & Luyện Thi Trực Tuyến',
    subtitle: 'Phòng thi đấu Kahoot nhiều người chơi, bảng vàng xếp hạng & vinh danh thành tích',
    description:
      'Môi trường rèn luyện trắc nghiệm tương tác cao giúp ôn thi THPT Quốc Gia và Đánh giá năng lực: thi đấu đối kháng thời gian thực theo mã PIN, tích lũy điểm EXP và thăng hạng danh hiệu.',
    roleTarget: 'student',
    badge: 'Thi Đấu Trực Tuyến',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    icon: <Trophy size={26} color="#f59e0b" />,
    mainActionIndex: 3,
    mainActionText: 'Tham Gia Đấu Trường Ngay',
    items: [
      {
        id: 'quiz-kahoot',
        tabIndex: 3,
        title: 'Đấu Trường Trắc Nghiệm Tương Tác (Mã PIN)',
        desc: 'Thi đấu đối kháng trực tiếp nhiều người chơi theo mã PIN phòng, tính điểm tốc độ, chuỗi combo đúng và âm thanh sống động.',
        icon: <Trophy size={18} color="#f59e0b" />,
        badge: 'Multiplayer Realtime',
      },
      {
        id: 'leaderboard',
        tabIndex: 11,
        title: 'Bảng Vàng Thành Tích Toàn Trường',
        desc: 'Vinh danh cá nhân xuất sắc, xếp hạng cấp bậc EXP (Đồng, Bạc, Vàng, Kim Cương), tỷ lệ làm đúng và bảng xếp hạng theo lớp.',
        icon: <Award size={18} color="#f59e0b" />,
        badge: 'BXH & Huy hiệu',
      },
    ],
  },
  {
    id: 'teacher',
    title: 'Không Gian Sư Phạm & Quản Trị Dạy Học',
    subtitle: 'Soạn giáo án CV 5512 AI, ma trận đề thi chuẩn Bộ GD&ĐT, bảng trắng số & quản lý lớp',
    description:
      'Bộ công cụ số hóa dành riêng cho giáo viên Hóa học THPT: tự động sinh kế hoạch bài dạy chuẩn Công văn 5512, ngân hàng đề thi đa dạng cấp độ, bảng trắng tương tác xuất PDF và sổ theo dõi tiến trình học sinh.',
    roleTarget: 'teacher',
    badge: 'Chuyên Dụng Giáo Viên',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    icon: <BookMarked size={26} color="#10b981" />,
    mainActionIndex: 5,
    mainActionText: 'Vào Không Gian Giáo Viên',
    items: [
      {
        id: 'lesson-planner',
        tabIndex: 5,
        title: 'Soạn Kế Hoạch Bài Dạy (Công Văn 5512)',
        desc: 'AI hỗ trợ sinh giáo án 4 hoạt động chuẩn Bộ GD&ĐT chỉ trong 5 giây, tích hợp mục tiêu năng lực và xuất file Word/PDF tiện lợi.',
        icon: <BookMarked size={18} color="#10b981" />,
        badge: 'Chuẩn CV 5512',
        teacherOnly: true,
      },
      {
        id: 'exam-manager',
        tabIndex: 6,
        title: 'Ngân Hàng Đề Thi & Ma Trận Đề Mới',
        desc: 'Tạo đề kiểm tra 4 mức độ nhận thức (Biết - Hiểu - Vận dụng - VDC), trắc nghiệm đúng/sai và trả lời ngắn theo cấu trúc mới.',
        icon: <FileCheck2 size={18} color="#10b981" />,
        badge: 'Đề thi chuẩn',
        teacherOnly: true,
      },
      {
        id: 'teacher-whiteboard',
        tabIndex: 13,
        title: 'Studio Bảng Trắng Dạy Học & Xuất PDF',
        desc: 'Canvas vẽ phấn mượt mà, dán tem công thức hóa học 1 chạm (H₂SO₄, Δr H°, e⁻, pH...), 4 chế độ nền và xuất bài giảng PDF ngay lập tức.',
        icon: <Compass size={18} color="#10b981" />,
        badge: 'Bảng phấn số',
        teacherOnly: true,
      },
      {
        id: 'student-progress',
        tabIndex: 9,
        title: 'Sổ Theo Dõi Tiến Trình Học Sinh',
        desc: 'Thống kê tỷ lệ hoàn thành bài tập, điểm số bài thi, nhận diện sớm học sinh có nguy cơ hổng kiến thức để hỗ trợ kịp thời.',
        icon: <Users size={18} color="#10b981" />,
        badge: 'Giám sát lớp',
        teacherOnly: true,
      },
      {
        id: 'pedagogical-audit',
        tabIndex: 10,
        title: 'Nhật Ký & Báo Cáo Sư Phạm',
        desc: 'Lưu trữ biên bản chấm thi, thống kê phổ điểm theo lớp và lịch sử hoạt động sư phạm phục vụ công tác thanh kiểm tra chuyên môn.',
        icon: <ShieldCheck size={18} color="#10b981" />,
        badge: 'Báo cáo & Kiểm toán',
        teacherOnly: true,
      },
    ],
  },
];

const SYLLABUS_CHAPTERS = [
  {
    num: 'Chương 1',
    title: 'Cấu Tạo Nguyên Tử & Bảng Tuần Hoàn',
    desc: 'Hạt nhân nguyên tử, orbital nguyên tử (AO), cấu hình electron, quy luật biến đổi tính chất nguyên tố.',
    icon: <Atom size={20} color="#38bdf8" />,
    color: '#38bdf8',
  },
  {
    num: 'Chương 2',
    title: 'Liên Kết Hóa Học & Tinh Thể',
    desc: 'Quy tắc Octet, liên kết ion, liên kết cộng hóa trị có cực/không cực, liên kết hydrogen & tương tác van der Waals.',
    icon: <ShieldCheck size={20} color="#10b981" />,
    color: '#10b981',
  },
  {
    num: 'Chương 3',
    title: 'Phản Ứng Oxi Hóa - Khử',
    desc: 'Số oxi hóa, quá trình oxi hóa, quá trình khử, cân bằng phản ứng bằng phương pháp thăng bằng electron.',
    icon: <Flame size={20} color="#f59e0b" />,
    color: '#f59e0b',
  },
  {
    num: 'Chương 4',
    title: 'Năng Lượng Hóa Học (Nhiệt Phản Ứng)',
    desc: 'Phản ứng tỏa nhiệt, phản ứng thu nhiệt, biến thiên enthalpy chuẩn (ΔᵣH°₂₉₈), nhiệt tạo thành chuẩn (ΔᵪH°₂₉₈).',
    icon: <Zap size={20} color="#ec4899" />,
    color: '#ec4899',
  },
  {
    num: 'Chương 5',
    title: 'Tốc Độ Phản Ứng Hóa Học',
    desc: 'Khái niệm tốc độ phản ứng, các yếu tố ảnh hưởng (nồng độ, nhiệt độ, áp suất, diện tích tiếp xúc, chất xúc tác).',
    icon: <FlaskConical size={20} color="#a855f7" />,
    color: '#a855f7',
  },
  {
    num: 'Chương 6',
    title: 'Nhóm Nguyên Tố Halogen (VIIA)',
    desc: 'Đơn chất halogen (F₂, Cl₂, Br₂, I₂), hợp chất hydrogen halide, hydrohalic acid và muối halide.',
    icon: <Microscope size={20} color="#06b6d4" />,
    color: '#06b6d4',
  },
];

export default function HomeDashboard({
  onNavigateTab,
  onOpenAuthModal,
  currentUser,
  onLogout,
  roleViewMode = 'all',
  onRoleViewModeChange,
  onQuickLogin,
}: HomeDashboardProps) {
  const [activeRoleMode, setActiveRoleMode] = useState<'all' | 'student' | 'teacher'>(roleViewMode || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    if (currentUser?.role === 'student') {
      setActiveRoleMode('student');
    } else if (roleViewMode) {
      setActiveRoleMode(roleViewMode);
    }
  }, [roleViewMode, currentUser]);

  const handleRoleModeChange = (mode: 'all' | 'student' | 'teacher') => {
    if (currentUser?.role === 'student' && mode === 'teacher') return;
    setActiveRoleMode(mode);
    if (onRoleViewModeChange) {
      onRoleViewModeChange(mode);
    }
  };

  const handleFeatureClick = (tabIndex: number) => {
    if (!currentUser) {
      const teacherTabs = [5, 6, 13, 9, 10];
      const targetRole = teacherTabs.includes(tabIndex) ? 'teacher' : 'student';
      if (onOpenAuthModal) onOpenAuthModal(targetRole);
      return;
    }
    onNavigateTab(tabIndex);
  };

  // Filter groups according to activeRoleMode and searchQuery
  const filteredGroups = CORE_FEATURE_GROUPS.map((group) => {
    const q = searchQuery.trim().toLowerCase();
    const matchedItems = group.items.filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    });

    const groupMatches =
      !q ||
      group.title.toLowerCase().includes(q) ||
      group.subtitle.toLowerCase().includes(q) ||
      group.description.toLowerCase().includes(q) ||
      matchedItems.length > 0;

    let roleMatches = true;
    if (activeRoleMode === 'student' || currentUser?.role === 'student') {
      roleMatches = group.roleTarget !== 'teacher';
    } else if (activeRoleMode === 'teacher') {
      roleMatches = true;
    }

    return {
      ...group,
      displayItems: q ? matchedItems : group.items,
      isVisible: groupMatches && roleMatches,
    };
  }).filter((g) => g.isVisible);

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      {/* 1. HERO SECTION WITH VIBRANT AURORA BACKGROUND & METRICS */}
      <Box
        sx={{
          position: 'relative',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          p: { xs: 2.5, sm: 4, md: 5 },
          mb: 4,
          bgcolor: '#0f172a',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
            {/* LEFT COLUMN: HERO HEADLINE, CTAs & STAT METRICS */}
            <Grid item xs={12} lg={6.5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Top Badge with Live Beacon */}
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.6,
                    borderRadius: 999,
                    bgcolor: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#10b981',
                      boxShadow: '0 0 10px #10b981',
                    }}
                  />
                  <Typography
                    sx={{
                      color: '#38bdf8',
                      fontWeight: 700,
                      fontSize: { xs: '11px', sm: '12px' },
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Hệ Thống Trợ Lý & Thí Nghiệm Hóa Học Số GDPT 2018
                  </Typography>
                </Box>
                <Chip
                  label="Phiên bản 2026"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    fontWeight: 700,
                    fontSize: '11px',
                    display: { xs: 'none', sm: 'inline-flex' },
                  }}
                />
              </Stack>

              {/* Main Hero Title */}
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '28px', sm: '36px', md: '42px', lg: '48px' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  mb: 2,
                  color: '#ffffff',
                }}
              >
                Khám Phá Hóa Học Số THPT <br />
                <Box
                  component="span"
                  sx={{
                    color: '#38bdf8',
                  }}
                >
                  Trí Tuệ Nhân Tạo & Mô Phỏng 3D
                </Box>
              </Typography>

              {/* Slogan & Intro */}
              <Typography
                variant="body1"
                sx={{
                  color: '#cbd5e1',
                  fontSize: { xs: '15px', sm: '16px', md: '16.5px' },
                  lineHeight: 1.7,
                  mb: 3,
                  maxWidth: 720,
                }}
              >
                Nền tảng thực nghiệm số toàn diện bám sát 6 chủ đề SGK GDPT 2018: tích hợp <strong>11+ kịch bản thí nghiệm ảo WebGL</strong> chân thực, mô hình 3D nguyên tử & liên kết chuẩn IUPAC, trợ lý AI ChemAI 2.0 hỗ trợ 24/7, cùng công cụ soạn giáo án Công văn 5512 và ngân hàng đề thi chuẩn cấu trúc mới của Bộ GD&ĐT.
              </Typography>

              {/* Hero Action CTA Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleFeatureClick(1)}
                  startIcon={<FlaskConical size={18} />}
                  endIcon={!currentUser ? <Lock size={15} /> : <ArrowRight size={16} />}
                  sx={{
                    bgcolor: '#0284c7',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    px: 3,
                    py: 1.3,
                    borderRadius: 2.5,
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    boxShadow: '0 4px 16px rgba(2, 132, 199, 0.4)',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#0369a1',
                      boxShadow: '0 6px 20px rgba(2, 132, 199, 0.6)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Vào Thí Nghiệm Ảo
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleFeatureClick(2)}
                  startIcon={<Bot size={18} />}
                  endIcon={!currentUser ? <Lock size={15} /> : undefined}
                  sx={{
                    borderColor: 'rgba(56, 189, 248, 0.45)',
                    color: '#38bdf8',
                    bgcolor: 'rgba(56, 189, 248, 0.08)',
                    backdropFilter: 'blur(8px)',
                    fontWeight: 700,
                    fontSize: '14px',
                    px: 2.5,
                    py: 1.3,
                    borderRadius: 2.5,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(56, 189, 248, 0.18)',
                      borderColor: '#38bdf8',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(56, 189, 248, 0.25)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Gia Sư Hóa Học
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleFeatureClick(3)}
                  startIcon={<Trophy size={18} />}
                  endIcon={!currentUser ? <Lock size={15} /> : undefined}
                  sx={{
                    borderColor: 'rgba(245, 158, 11, 0.45)',
                    color: '#fbbf24',
                    bgcolor: 'rgba(245, 158, 11, 0.08)',
                    backdropFilter: 'blur(8px)',
                    fontWeight: 700,
                    fontSize: '14px',
                    px: 2.5,
                    py: 1.3,
                    borderRadius: 2.5,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(245, 158, 11, 0.18)',
                      borderColor: '#f59e0b',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(245, 158, 11, 0.25)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Đấu Trường Luyện Tập
                </Button>
              </Stack>

              {/* Quick Live Metric Strip (Stats Bar) */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                  gap: 1.5,
                  pt: 2.5,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#38bdf8', transform: 'translateY(-1px)' },
                  }}
                >
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex' }}>
                    <FlaskConical size={18} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800, fontSize: '18px', lineHeight: 1.1 }}>11+</Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '12px', mt: 0.3 }}>Thí nghiệm 3D</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#06b6d4', transform: 'translateY(-1px)' },
                  }}
                >
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', display: 'flex' }}>
                    <Atom size={18} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800, fontSize: '18px', lineHeight: 1.1 }}>118</Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '12px', mt: 0.3 }}>Nguyên tố IUPAC</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#10b981', transform: 'translateY(-1px)' },
                  }}
                >
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex' }}>
                    <Bot size={18} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800, fontSize: '18px', lineHeight: 1.1 }}>24/7</Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '12px', mt: 0.3 }}>ChemAI 24/7</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#f59e0b', transform: 'translateY(-1px)' },
                  }}
                >
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex' }}>
                    <ShieldCheck size={18} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800, fontSize: '18px', lineHeight: 1.1 }}>100%</Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '12px', mt: 0.3 }}>Chuẩn GDPT 2018</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* RIGHT COLUMN: KHUNG ĐA CHỨC NĂNG MINI (INTERACTIVE DEMO WIDGET) */}
            <Grid item xs={12} lg={5.5}>
              <HomeMiniDemoWidget onNavigateTab={handleFeatureClick} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* 1.5. CỔNG CHỌN VAI TRÒ / TRẠNG THÁI ĐĂNG NHẬP */}
      <Box sx={{ mb: 4 }}>
        {currentUser ? (
          /* Khi đã đăng nhập: Hiển thị Profile Banner */
          <Paper
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 3.5,
              bgcolor: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 8px 32px rgba(2, 132, 199, 0.15)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  bgcolor: currentUser.role === 'teacher' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(2, 132, 199, 0.25)',
                  border: currentUser.role === 'teacher' ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(56, 189, 248, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentUser.role === 'teacher' ? '#f59e0b' : '#38bdf8',
                  flexShrink: 0
                }}
              >
                {currentUser.role === 'teacher' ? <UserCheck size={28} /> : <GraduationCap size={28} />}
              </Box>
              <Box>
                <Box display="flex" alignItems="center" gap={1.2} flexWrap="wrap">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="white"
                    sx={{
                      fontSize: { xs: '16px', sm: '18px' },
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.2px',
                    }}
                  >
                    👋 {getUserGreeting(currentUser)}
                  </Typography>
                  <Chip
                    icon={currentUser.role === 'teacher' ? <UserCheck size={13} color="#000" /> : <GraduationCap size={13} color="#38bdf8" />}
                    label={currentUser.role === 'teacher' ? 'Giáo Viên Hóa Học' : `Học sinh • ${currentUser.className || 'Lớp 10'}`}
                    size="small"
                    sx={{
                      bgcolor: currentUser.role === 'teacher' ? '#f59e0b' : 'rgba(56, 189, 248, 0.15)',
                      color: currentUser.role === 'teacher' ? '#000' : '#38bdf8',
                      border: currentUser.role === 'teacher' ? '1px solid #f59e0b' : '1px solid rgba(56, 189, 248, 0.3)',
                      fontWeight: 'bold',
                      fontSize: '11.5px',
                    }}
                  />
                  <Chip
                    label={currentUser.role === 'teacher' ? "QUYỀN GIÁO VIÊN" : "HỌC SINH GDPT 2018"}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.15)',
                      color: '#34d399',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      fontWeight: 'bold',
                      fontSize: '11px',
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12.5px', display: 'block', mt: 0.3 }}>
                  {currentUser.role === 'teacher'
                    ? `Đơn vị: ${currentUser.school || 'THPT'} • Bộ môn: ${currentUser.subject || 'Hóa Học THPT'} • Toàn quyền theo dõi học sinh, soạn giáo án 5512, ra đề thi & quản lý video.`
                    : `Trường: ${currentUser.school || 'THPT'} • Khám phá bài giảng video, phòng thí nghiệm ảo, gia sư 24/7 và thi đấu tại Đấu Trường Luyện Tập.`}
                </Typography>

                {/* Extra Student Progress Bar & Pills in Dashboard Welcome Banner */}
                {currentUser.role === 'student' && (() => {
                  const exp = currentUser.kahootExp || 350;
                  const totalQ = currentUser.totalKahootQuestions || 15;
                  const correctQ = currentUser.correctKahootQuestions || 11;
                  const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 1000) / 10 : 0;
                  const level = Math.floor(exp / 300) + 1;
                  const nickname = currentUser.nickname || 'Chiến Binh Hóa Học THPT';

                  let rankLabel = 'Đang Cố Gắng';
                  let rankColor = '#f97316';
                  if (exp >= 2000 || (accuracy >= 85 && totalQ >= 20)) {
                    rankLabel = 'Xuất Sắc (Kim Cương)';
                    rankColor = '#38bdf8';
                  } else if (exp >= 1200 || (accuracy >= 70 && totalQ >= 15)) {
                    rankLabel = 'Giỏi (Vàng)';
                    rankColor = '#eab308';
                  } else if (exp >= 600 || (accuracy >= 50 && totalQ >= 10)) {
                    rankLabel = 'Khá (Bạc)';
                    rankColor = '#a855f7';
                  }

                  return (
                    <Box sx={{ mt: 1.2, pt: 1, borderTop: '1px dashed rgba(255, 255, 255, 0.12)' }}>
                      <Box display="flex" alignItems="center" gap={0.8} flexWrap="wrap">
                        <Chip
                          icon={<Tag size={13} color="#f59e0b" />}
                          label={`Biệt danh: "${nickname}"`}
                          size="small"
                          sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontWeight: 'bold', border: '1px solid rgba(245, 158, 11, 0.3)' }}
                        />
                        <Chip
                          icon={<Zap size={13} color="#eab308" />}
                          label={`⚡ ${exp.toLocaleString()} EXP (Lv.${level})`}
                          size="small"
                          sx={{ bgcolor: 'rgba(234, 179, 8, 0.12)', color: '#eab308', fontWeight: 'bold' }}
                        />
                        <Chip
                          icon={<Flame size={13} color="#f43f5e" />}
                          label={`🔥 Chuỗi: ${currentUser.kahootStreak || 2} trận`}
                          size="small"
                          sx={{ bgcolor: 'rgba(244, 63, 94, 0.12)', color: '#f43f5e', fontWeight: 'bold' }}
                        />
                        <Chip
                          icon={<Calendar size={13} color="#10b981" />}
                          label={`📅 Đăng nhập: ${currentUser.loginStreak || 3} ngày`}
                          size="small"
                          sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', color: '#34d399', fontWeight: 'bold' }}
                        />
                        <Chip
                          label={`🏆 Năng lực: ${rankLabel}`}
                          size="small"
                          sx={{ bgcolor: `${rankColor}18`, color: rankColor, fontWeight: 'bold', border: `1px solid ${rankColor}40` }}
                        />
                      </Box>
                      {currentUser.teacherEvaluation && (
                        <Typography variant="caption" color="#cbd5e1" sx={{ display: 'block', mt: 0.6, fontStyle: 'italic' }}>
                          💬 Lời nhận xét của Giáo viên: "{currentUser.teacherEvaluation}"
                        </Typography>
                      )}
                    </Box>
                  );
                })()}
              </Box>
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onOpenAuthModal?.(currentUser?.role || 'student')}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '13px',
                  borderColor: 'rgba(56, 189, 248, 0.45)',
                  color: '#38bdf8',
                  bgcolor: 'rgba(56, 189, 248, 0.08)',
                  px: 2,
                  py: 0.8,
                  minWidth: 100,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.8,
                  flex: { xs: 1, sm: 'none' },
                  '&:hover': {
                    borderColor: '#38bdf8',
                    bgcolor: 'rgba(56, 189, 248, 0.2)',
                  }
                }}
              >
                <Users size={16} style={{ flexShrink: 0 }} />
                <span>Hồ Sơ</span>
              </Button>
              {onLogout && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onLogout}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    borderColor: 'rgba(239, 68, 68, 0.5)',
                    color: '#f87171',
                    bgcolor: 'rgba(239, 68, 68, 0.08)',
                    px: 2.2,
                    py: 0.8,
                    minWidth: 120,
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.8,
                    flex: { xs: 1, sm: 'none' },
                    '&:hover': {
                      borderColor: '#ef4444',
                      bgcolor: 'rgba(239, 68, 68, 0.2)',
                      color: '#ef4444',
                    }
                  }}
                >
                  <LogOut size={16} style={{ flexShrink: 0 }} />
                  <span>Đăng Xuất</span>
                </Button>
              )}
            </Stack>
          </Paper>
        ) : (
          /* Khi chưa đăng nhập: Hiển thị 2 Cổng vai trò */
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, pb: 1, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 1, fontSize: { xs: '16px', sm: '18px' } }}>
                  <Users size={20} color="#38bdf8" /> Chọn Cổng Truy Cập & Vai Trò
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px' }}>
                  Vui lòng đăng nhập Học sinh hoặc Giáo viên để mở khóa toàn bộ tính năng và thao tác với hệ thống
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2.5}>
              {/* CARD 1: CỔNG HỌC SINH */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 3.5,
                    bgcolor: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: '#38bdf8',
                      boxShadow: '0 16px 42px rgba(2, 132, 199, 0.25)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {/* Subtle top neon accent line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #38bdf8 0%, #06b6d4 100%)',
                    }}
                  />
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2.5,
                          bgcolor: 'rgba(2, 132, 199, 0.2)',
                          border: '1px solid rgba(56, 189, 248, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#38bdf8'
                        }}
                      >
                        <GraduationCap size={26} />
                      </Box>
                      <Chip
                        label="DÀNH CHO HỌC SINH"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          fontWeight: 'bold',
                          fontSize: '11px'
                        }}
                      />
                    </Box>

                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom sx={{ fontSize: '18px' }}>
                      Cổng Tài Khoản Học Sinh
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2, lineHeight: 1.6, fontSize: '13px' }}>
                      Lưu tiến trình học tập, duy trì chuỗi ngày học tập (Streak), tích lũy điểm kinh nghiệm (EXP) và mở khóa danh hiệu khi chinh phục bài học.
                    </Typography>

                    {/* Feature bullet checklist */}
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle2 size={15} color="#38bdf8" />
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '12.5px' }}>
                          Thực hành 11+ mô phỏng thí nghiệm WebGL an toàn tuyệt đối
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle2 size={15} color="#38bdf8" />
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '12.5px' }}>
                          Gia sư AI 24/7 hướng dẫn giải thích từng bước phản ứng
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle2 size={15} color="#38bdf8" />
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '12.5px' }}>
                          Đấu trường trắc nghiệm trực tuyến tranh tài cùng cả lớp
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box sx={{ pt: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => onQuickLogin ? onQuickLogin('student') : onOpenAuthModal?.('student')}
                      startIcon={<Zap size={16} />}
                      sx={{
                        mb: 1.5,
                        bgcolor: 'rgba(56, 189, 248, 0.18)',
                        color: '#38bdf8',
                        border: '1px dashed #38bdf8',
                        fontWeight: 'bold',
                        py: 0.9,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.32)' },
                      }}
                    >
                      ⚡ Trải Nghiệm 1-Chạm: Học Sinh A (hocsinha@gmail.com)
                    </Button>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                    <Button
                      variant="contained"
                      onClick={() => onOpenAuthModal?.('student')}
                      startIcon={<LogIn size={16} />}
                      sx={{
                        bgcolor: '#0284c7',
                        color: '#fff',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
                        '&:hover': { bgcolor: '#0369a1', transform: 'translateY(-1px)' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Đăng Nhập Học Sinh
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => onOpenAuthModal?.('student')}
                      startIcon={<UserPlus size={16} />}
                      sx={{
                        borderColor: 'rgba(56, 189, 248, 0.4)',
                        color: '#38bdf8',
                        bgcolor: 'rgba(56, 189, 248, 0.06)',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8', transform: 'translateY(-1px)' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Tạo Tài Khoản
                    </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* CARD 2: CỔNG GIÁO VIÊN */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 3.5,
                    bgcolor: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: '#10b981',
                      boxShadow: '0 16px 42px rgba(16, 185, 129, 0.25)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {/* Subtle top neon accent line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                    }}
                  />
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2.5,
                          bgcolor: 'rgba(16, 185, 129, 0.2)',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#34d399'
                        }}
                      >
                        <UserCheck size={26} />
                      </Box>
                      <Chip
                        label="DÀNH CHO GIÁO VIÊN"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          border: '1px solid rgba(16, 185, 129, 0.35)',
                          fontWeight: 'bold',
                          fontSize: '11px'
                        }}
                      />
                    </Box>

                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom sx={{ fontSize: '18px' }}>
                      Cổng Xác Thực Giáo Viên
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2, lineHeight: 1.6, fontSize: '13px' }}>
                      Khu vực sư phạm bảo mật: thiết kế Kế hoạch bài dạy (Giáo án) 5512, ngân hàng ma trận đề thi 2026 và kiểm duyệt phòng thi đấu luyện tập.
                    </Typography>

                    {/* Feature bullet checklist */}
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle2 size={15} color="#34d399" />
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '12.5px' }}>
                          Soạn Kế hoạch bài dạy chuẩn cấu trúc Công văn 5512 tức thì
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle2 size={15} color="#34d399" />
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '12.5px' }}>
                          Xuất đề kiểm tra ma trận 4 mức độ bám sát quy định Bộ GD&ĐT
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle2 size={15} color="#34d399" />
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '12.5px' }}>
                          Phòng thí nghiệm mẫu hỗ trợ giảng dạy số tương tác trên lớp
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box sx={{ pt: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => onQuickLogin ? onQuickLogin('teacher') : onOpenAuthModal?.('teacher')}
                      startIcon={<Zap size={16} />}
                      sx={{
                        mb: 1.5,
                        bgcolor: 'rgba(245, 158, 11, 0.18)',
                        color: '#fbbf24',
                        border: '1px dashed #f59e0b',
                        fontWeight: 'bold',
                        py: 0.9,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.32)' },
                      }}
                    >
                      ⚡ Trải Nghiệm 1-Chạm: Giáo Viên A (giaovien@gmail.com)
                    </Button>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                    <Button
                      variant="contained"
                      onClick={() => onOpenAuthModal?.('teacher')}
                      startIcon={<UserCheck size={16} />}
                      sx={{
                        bgcolor: '#f59e0b',
                        color: '#000',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                        '&:hover': { bgcolor: '#d97706', transform: 'translateY(-1px)' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Đăng Nhập Giáo Viên
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => onOpenAuthModal?.('teacher')}
                      startIcon={<UserPlus size={16} />}
                      sx={{
                        borderColor: 'rgba(245, 158, 11, 0.4)',
                        color: '#fbbf24',
                        bgcolor: 'rgba(245, 158, 11, 0.05)',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.15)', borderColor: '#f59e0b', transform: 'translateY(-1px)' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Đăng Ký Giáo Viên
                    </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      {/* 2. CHỌN CHẾ ĐỘ XEM & TÌM KIẾM TÍNH NĂNG */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
          mb: 3.5,
          p: 2,
          bgcolor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Role View Mode Pills */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            overflowX: 'auto',
            pb: { xs: 0.5, md: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
          }}
        >
          <Chip
            label={currentUser?.role === 'student' ? 'Tất Cả (3 Nhóm)' : 'Tất Cả (4 Nhóm)'}
            onClick={() => handleRoleModeChange('all')}
            sx={{
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              bgcolor: activeRoleMode === 'all' ? '#0284c7' : 'rgba(255, 255, 255, 0.04)',
              color: activeRoleMode === 'all' ? '#ffffff' : '#94a3b8',
              border: activeRoleMode === 'all' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: activeRoleMode === 'all' ? '0 0 14px rgba(2, 132, 199, 0.45)' : 'none',
              '&:hover': { bgcolor: activeRoleMode === 'all' ? '#0369a1' : 'rgba(255, 255, 255, 0.08)' },
              transition: 'all 0.2s ease',
            }}
          />
          <Chip
            icon={<GraduationCap size={16} color={activeRoleMode === 'student' ? '#38bdf8' : '#94a3b8'} />}
            label="Góc Học Sinh (3 Nhóm)"
            onClick={() => handleRoleModeChange('student')}
            sx={{
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              bgcolor: activeRoleMode === 'student' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              color: activeRoleMode === 'student' ? '#38bdf8' : '#94a3b8',
              border: activeRoleMode === 'student' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: activeRoleMode === 'student' ? '0 0 14px rgba(56, 189, 248, 0.35)' : 'none',
              '&:hover': { bgcolor: activeRoleMode === 'student' ? 'rgba(56, 189, 248, 0.28)' : 'rgba(255, 255, 255, 0.08)' },
              transition: 'all 0.2s ease',
            }}
          />
          {currentUser?.role !== 'student' && (
            <Chip
              icon={<BookMarked size={16} color={activeRoleMode === 'teacher' ? '#34d399' : '#94a3b8'} />}
              label="Góc Giáo Viên (4 Nhóm)"
              onClick={() => handleRoleModeChange('teacher')}
              sx={{
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                bgcolor: activeRoleMode === 'teacher' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: activeRoleMode === 'teacher' ? '#34d399' : '#94a3b8',
                border: activeRoleMode === 'teacher' ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: activeRoleMode === 'teacher' ? '0 0 14px rgba(16, 185, 129, 0.35)' : 'none',
                '&:hover': { bgcolor: activeRoleMode === 'teacher' ? 'rgba(16, 185, 129, 0.28)' : 'rgba(255, 255, 255, 0.08)' },
                transition: 'all 0.2s ease',
              }}
            />
          )}
        </Stack>

        {/* Search input */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(9, 13, 22, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 2,
            px: 1.5,
            py: 0.7,
            minWidth: { xs: '100%', md: 280 },
          }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Tìm tính năng trong 4 nhóm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '13px',
              marginLeft: '8px',
              width: '100%',
            }}
          />
          {searchQuery && (
            <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.2, color: 'text.secondary' }}>
              ×
            </IconButton>
          )}
        </Box>
      </Box>

      {/* 3. 4 NHÓM CHỨC NĂNG CỐT LÕI (CORE FEATURE GROUPS) */}
      <Box sx={{ mb: 6 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={1.5} mb={3}>
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#f8fafc', fontSize: { xs: '22px', sm: '26px' }, letterSpacing: '-0.02em' }}>
              {currentUser?.role === 'student' || activeRoleMode === 'student' ? '3 Nhóm Chức Năng Dành Cho Học Sinh' : '4 Nhóm Chức Năng Cốt Lõi ChemAI'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '14px', mt: 0.3 }}>
              {activeRoleMode === 'student' || currentUser?.role === 'student'
                ? '🎓 Chế độ Học Sinh: Thu gọn các công cụ quản trị của giáo viên để bạn tập trung làm thí nghiệm và luyện thi'
                : activeRoleMode === 'teacher'
                ? '👨‍🏫 Chế độ Giáo Viên: Ưu tiên bộ công cụ sư phạm, giáo án CV 5512, ma trận đề thi & giám sát lớp học'
                : 'Đã gom 13 phân hệ thành 4 nhóm mạch lạc: Thực nghiệm Ảo, Gia sư AI, Đấu trường & Không gian Giáo viên'}
            </Typography>
          </Box>
          <Chip
            label={`${filteredGroups.length} Nhóm Chức Năng`}
            size="small"
            sx={{ bgcolor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', fontWeight: 'bold', fontSize: '12px', border: '1px solid rgba(56, 189, 248, 0.3)' }}
          />
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          {filteredGroups.map((group) => {
            const isStudentMode = activeRoleMode === 'student';
            const colSpan = isStudentMode ? 4 : 6;
            const isTeacherGroup = group.id === 'teacher';

            return (
              <Grid item xs={12} md={colSpan} key={group.id} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    bgcolor: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${isTeacherGroup ? 'rgba(16, 185, 129, 0.35)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: 3.5,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: group.color,
                      boxShadow: `0 16px 40px ${group.glowColor}`,
                    },
                  }}
                >
                  {/* Top neon color accent bar */}
                  <Box
                    sx={{
                      height: 4,
                      width: '100%',
                      background: `linear-gradient(90deg, ${group.color} 0%, transparent 100%)`,
                    }}
                  />

                  <CardContent sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header: Icon, Title & Badge */}
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box display="flex" alignItems="center" gap={1.8}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2.5,
                            bgcolor: `${group.color}18`,
                            border: `1px solid ${group.color}45`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 0 16px ${group.glowColor}`,
                            flexShrink: 0,
                          }}
                        >
                          {group.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={800}
                            sx={{
                              fontSize: { xs: '20px', sm: '22px' },
                              color: '#ffffff',
                              lineHeight: 1.25,
                            }}
                          >
                            {group.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#94a3b8',
                              fontSize: '13px',
                              display: 'block',
                              mt: 0.3,
                            }}
                          >
                            {group.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={group.badge}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: '11.5px',
                          fontWeight: 'bold',
                          bgcolor: `${group.color}15`,
                          color: group.color,
                          border: `1px solid ${group.color}40`,
                          flexShrink: 0,
                        }}
                      />
                    </Box>

                    {/* Group Summary Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '14.5px',
                        lineHeight: 1.6,
                        color: '#cbd5e1',
                        mb: 2.5,
                      }}
                    >
                      {group.description}
                    </Typography>

                    {/* Sub-Features Breakdown List */}
                    <Box sx={{ mb: 2.5, flexGrow: 1 }}>
                      <Typography
                        variant="caption"
                        fontWeight={700}
                        sx={{
                          color: '#e2e8f0',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          mb: 1.2,
                          display: 'block',
                        }}
                      >
                        Các phân hệ bên trong ({group.items.length} phân hệ):
                      </Typography>
                      <Stack spacing={1}>
                        {group.displayItems.map((item) => (
                          <Box
                            key={item.id}
                            onClick={() => handleFeatureClick(item.tabIndex)}
                            sx={{
                              p: 1.2,
                              px: 1.5,
                              borderRadius: 2,
                              bgcolor: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 1.5,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: `${group.color}12`,
                                borderColor: `${group.color}40`,
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            <Box display="flex" alignItems="flex-start" gap={1.2}>
                              <Box sx={{ mt: 0.3, flexShrink: 0 }}>{item.icon}</Box>
                              <Box>
                                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                  <Typography
                                    sx={{
                                      fontSize: '15px',
                                      fontWeight: 700,
                                      color: '#f8fafc',
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {item.title}
                                  </Typography>
                                  {item.badge && (
                                    <Chip
                                      label={item.badge}
                                      size="small"
                                      sx={{
                                        height: 18,
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        bgcolor: 'rgba(255, 255, 255, 0.06)',
                                        color: '#cbd5e1',
                                      }}
                                    />
                                  )}
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: '13.5px',
                                    color: '#94a3b8',
                                    lineHeight: 1.5,
                                    mt: 0.3,
                                  }}
                                >
                                  {item.desc}
                                </Typography>
                              </Box>
                            </Box>
                            <ChevronRight size={16} color={group.color} style={{ flexShrink: 0 }} />
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* Group Main Action CTA Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleFeatureClick(group.mainActionIndex)}
                      startIcon={!currentUser && isTeacherGroup ? <Lock size={15} /> : undefined}
                      endIcon={<ChevronRight size={16} />}
                      sx={{
                        bgcolor: `${group.color}20`,
                        color: '#ffffff',
                        border: `1px solid ${group.color}60`,
                        fontWeight: 700,
                        fontSize: '14px',
                        borderRadius: 2.5,
                        py: 1.2,
                        cursor: 'pointer',
                        textTransform: 'none',
                        boxShadow: `0 4px 14px ${group.glowColor}`,
                        '&:hover': {
                          bgcolor: group.color,
                          color: '#000000',
                          boxShadow: `0 6px 20px ${group.glowColor}`,
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {!currentUser && isTeacherGroup ? 'Đăng nhập Giáo viên để mở khóa' : group.mainActionText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* 4. SYLLABUS ALIGNMENT: 6 CHỦ ĐỀ TRỌNG TÂM GDPT 2018 */}
      <Box
        sx={{
          mb: 6,
          p: { xs: 2.5, sm: 3.5, md: 4 },
          bgcolor: 'rgba(15, 23, 42, 0.7)',
          borderRadius: 3.5,
          border: '1px solid rgba(56, 189, 248, 0.18)',
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <Compass size={24} color="#38bdf8" />
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#f8fafc', fontSize: { xs: '20px', sm: '24px' } }}>
            Khung Chương Trình Hóa Học THPT (Chuẩn GDPT 2018)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Toàn bộ công cụ thí nghiệm, bài tập, câu hỏi đấu trường luyện tập và giáo án trên ChemAI được thiết kế bám sát 6 chuyên đề
          chính của 3 bộ SGK hiện hành (Kết Nối Tri Thức, Cánh Diều, Chân Trời Sáng Tạo).
        </Typography>

        <Grid container spacing={2}>
          {SYLLABUS_CHAPTERS.map((ch, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                sx={{
                  p: 2.5,
                  height: '100%',
                  bgcolor: 'rgba(9, 13, 22, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.2,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: ch.color,
                    boxShadow: `0 8px 24px ${ch.color}25`,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Chip
                    label={ch.num}
                    size="small"
                    sx={{
                      fontWeight: 'bold',
                      bgcolor: `${ch.color}20`,
                      color: ch.color,
                      border: `1px solid ${ch.color}40`,
                      height: 24,
                      fontSize: '11px',
                    }}
                  />
                  <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: `${ch.color}15`, display: 'flex' }}>
                    {ch.icon}
                  </Box>
                </Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#f8fafc', fontSize: '16px' }}>
                  {ch.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
                  {ch.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

            {/* 4.5. BÁO CÁO TÍNH KHOA HỌC, SÁNG TẠO & ĐÓNG GÓP ĐỘC LẬP DỰ ÁN */}
      <Box
        sx={{
          mb: 6,
          p: { xs: 2.5, sm: 3.5, md: 4 },
          bgcolor: 'rgba(15, 23, 42, 0.75)',
          borderRadius: 3.5,
          border: '1px solid rgba(56, 189, 248, 0.22)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1.5} mb={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex' }}>
              <ShieldCheck size={26} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#f8fafc', fontSize: { xs: '18px', sm: '22px' } }}>
                Báo Cáo Sáng Tạo, Thuật Toán Mới & Thẩm Định Khoa Học
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '13px', display: 'block', mt: 0.3 }}>
                Minh bạch giải pháp công nghệ độc lập do nhóm học sinh phát triển & Quy trình đối chuẩn khoa học GDPT 2018
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={<CheckCircle2 size={14} color="#10b981" />}
            label="Đã Thẩm Định Chuyên Môn"
            size="small"
            sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 'bold' }}
          />
        </Box>

        <Grid container spacing={2.5}>
          {/* Card 1: Thuật toán Cân bằng Ma trận Redox */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2.5,
                height: '100%',
                bgcolor: 'rgba(9, 13, 22, 0.75)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: '#38bdf8', transform: 'translateY(-2px)' },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.2}>
                <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex' }}>
                  <Atom size={20} />
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff', fontSize: '16px' }}>
                  1. Thuật Toán Cân Bằng Oxi Hóa - Khử Ma Trận (Độc Quyền)
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>
                Thay vì tra cứu bảng phản ứng tĩnh hoặc phụ thuộc LLM (vốn hay bị ảo giác hệ số), nhóm đã xây dựng <strong>thuật toán giải hệ phương trình ma trận bảo toàn electron và bảo toàn nguyên tố</strong>.
              </Typography>
              <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(56, 189, 248, 0.06)', border: '1px dashed rgba(56, 189, 248, 0.3)' }}>
                <Typography variant="caption" sx={{ color: '#38bdf8', fontSize: '12px', display: 'block', fontWeight: 600 }}>
                  ✓ Cân bằng chuẩn xác các ca phản ứng phức tạp: Cu + HNO₃ loãng/đặc, Fe + H₂SO₄ đặc nóng, phản ứng tự oxi hóa - khử của Halogen, phản ứng hữu cơ Este/Ancol.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Card 2: Dựng hình 3D VSEPR & Động học chuẩn độ */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2.5,
                height: '100%',
                bgcolor: 'rgba(9, 13, 22, 0.75)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: '#c084fc', transform: 'translateY(-2px)' },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.2}>
                <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex' }}>
                  <Sparkles size={20} />
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff', fontSize: '16px' }}>
                  2. Mô Phỏng Không Gian 3D (VSEPR) & Đường Cong pH Động Học
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>
                Nhóm tự lập trình <strong>Engine mô phỏng hình học phân tử 3D WebGL Three.js</strong> dựa trên thuyết đẩy cặp electron hóa trị (VSEPR) và lai hóa orbital ($sp, sp^2, sp^3$), kết hợp thuật toán tính đường cong chuẩn độ pH theo phương trình Henderson-Hasselbalch.
              </Typography>
              <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(168, 85, 247, 0.06)', border: '1px dashed rgba(168, 85, 247, 0.3)' }}>
                <Typography variant="caption" sx={{ color: '#c084fc', fontSize: '12px', display: 'block', fontWeight: 600 }}>
                  ✓ Tự động tính bước nhảy pH, đổi màu chỉ thị thị giác và dựng tọa độ nguyên tử theo chuẩn cấu trúc IUPAC.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Card 3: Quy trình Thẩm định Khoa học 3 Cấp */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2.5,
                height: '100%',
                bgcolor: 'rgba(9, 13, 22, 0.75)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: '#10b981', transform: 'translateY(-2px)' },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.2}>
                <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex' }}>
                  <BookOpen size={20} />
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff', fontSize: '16px' }}>
                  3. Quy Trình Thẩm Định & Kiểm Chứng Khoa Học 3 Lớp
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>
                Đảm bảo 100% tính chính xác khoa học, không tự suy diễn:
              </Typography>
              <Stack spacing={0.8}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '12.5px' }}>
                  • <strong>Lớp 1 (SGK GDPT 2018):</strong> Đối chuẩn từng thí nghiệm với 3 bộ sách Kết Nối Tri Thức, Cánh Diều, Chân Trời Sáng Tạo.
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '12.5px' }}>
                  • <strong>Lớp 2 (Cơ sở dữ liệu quốc tế):</strong> Đối chiếu enthalpy (ΔᵣH°₂₉₈), độ âm điện, hằng số phân ly acid/base từ NIST Chemistry WebBook & PubChem.
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '12.5px' }}>
                  • <strong>Lớp 3 (Hội đồng chuyên môn):</strong> Giáo viên THPT Chuyên (Tổ trưởng Chuyên môn Hóa học) trực tiếp duyệt đề thi và ngân hàng câu hỏi.
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          {/* Card 4: Đóng góp độc lập của học sinh */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2.5,
                height: '100%',
                bgcolor: 'rgba(9, 13, 22, 0.75)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: '#f59e0b', transform: 'translateY(-2px)' },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.2}>
                <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex' }}>
                  <Award size={20} />
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff', fontSize: '16px' }}>
                  4. Mức Độ Đóng Góp Độc Lập Của Nhóm Học Sinh
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>
                Nhóm học sinh tự đảm nhận:
              </Typography>
              <Stack spacing={0.8}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '12.5px' }}>
                  • <strong>100% Giao diện & Trải nghiệm:</strong> Thiết kế phân hệ riêng biệt cho Học sinh và Giáo viên, đáp ứng chuẩn di động mượt mà.
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '12.5px' }}>
                  • <strong>Ngân hàng 500+ bẫy đề thi:</strong> Phân loại theo 6 tiêu chí năng lực hóa học của Bộ GD&ĐT cấu trúc mới 2025-2026.
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '12.5px' }}>
                  • <strong>Prompt Engineering có Guardrails:</strong> Bọc lớp kiểm duyệt và cơ chế failover đa nguồn AI để ngăn chặn hoàn toàn ảo giác kiến thức.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>

{/* 5. 3-STEP USER WORKFLOW GUIDE */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 4 },
          bgcolor: '#0f172a',
          borderRadius: 3.5,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" sx={{ color: '#f8fafc', mb: 1, fontSize: { xs: '18px', sm: '22px' } }}>
          Quy Trình Khai Thác ChemAI Tối Ưu Cho Giáo Viên & Học Sinh
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4, maxWidth: 650, mx: 'auto', textAlign: 'center' }}>
          3 bước đơn giản giúp bạn biến kiến thức hóa học trừu tượng thành trải nghiệm trực quan và đạt kết quả học tập vượt trội.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 3,
                textAlign: 'center',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#38bdf8',
                  boxShadow: '0 12px 30px rgba(2, 132, 199, 0.25)',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  bgcolor: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontWeight: 800,
                  fontSize: '20px',
                }}
              >
                1
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#f8fafc', mb: 1, fontSize: '16px' }}>
                Khám Phá & Mô Phỏng 3D
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
                Vào <strong>Thí Nghiệm Ảo</strong> trộn phản ứng và xoay <strong>Mô Hình 3D</strong> để hiểu sâu cấu trúc
                phân tử và hiện tượng hóa học trước khi học lý thuyết.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(129, 140, 248, 0.25)',
                borderRadius: 3,
                textAlign: 'center',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#818cf8',
                  boxShadow: '0 12px 30px rgba(99, 102, 241, 0.25)',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  bgcolor: 'rgba(129, 140, 248, 0.2)',
                  border: '1px solid rgba(129, 140, 248, 0.4)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontWeight: 800,
                  fontSize: '20px',
                }}
              >
                2
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#f8fafc', mb: 1, fontSize: '16px' }}>
                Thảo Luận Với Gia Sư AI
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
                Hỏi bất cứ bài tập hoặc phương trình nào khó hiểu với <strong>ChemAI Buddy</strong> để nhận giải thích bản chất
                từng bước kèm video thí nghiệm liên quan.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 3,
                textAlign: 'center',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#f59e0b',
                  boxShadow: '0 12px 30px rgba(245, 158, 11, 0.25)',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  bgcolor: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontWeight: 800,
                  fontSize: '20px',
                }}
              >
                3
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#f8fafc', mb: 1, fontSize: '16px' }}>
                Luyện Tập & Soạn Bài Giảng
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>
                Học sinh tham gia <strong>Đấu Trường Luyện Tập</strong> tích lũy EXP; Giáo viên tạo <strong>Giáo Án 5512</strong> và{' '}
                <strong>Đề Thi Ma Trận 2026</strong> trong nháy mắt.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 6. PLATFORM FOOTER SUMMARY */}
      <Box
        sx={{
          textAlign: 'center',
          pt: 4,
          pb: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}>
          <Chip label="Next.js 16" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', fontSize: '11px' }} />
          <Chip label="Three.js WebGL" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', fontSize: '11px' }} />
          <Chip label="Lõi ChemAI 2.0" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', fontSize: '11px' }} />
          <Chip label="Supabase Realtime" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', fontSize: '11px' }} />
          <Chip label="Chuẩn GDPT 2018" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px' }} />
        </Box>

        <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
          HCC - ChemAI © 2026 | Nền Tảng Trợ Lý & Phòng Thí Nghiệm Hóa Học Số THPT
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 0.8 }}>
          Bảo lưu mọi quyền. Thiết kế theo tiêu chuẩn UI/UX quốc tế dành cho giáo dục STEM và chuyển đổi số trường học.
        </Typography>
      </Box>
    </Box>
  );
}
