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
} from 'lucide-react';
import { UserProfile } from '@/components/UserAuthModal';

interface HomeDashboardProps {
  onNavigateTab: (tabIndex: number) => void;
  onOpenAuthModal?: (role?: 'student' | 'teacher') => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

interface FeatureItem {
  id: string;
  tabIndex: number;
  title: string;
  subtitle: string;
  category: 'student' | 'teacher' | 'simulation';
  categoryLabel: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  iconBg: string;
  glowColor: string;
  description: string;
  highlights: string[];
  techStack: string[];
  actionLabel: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'virtual-lab',
    tabIndex: 1,
    title: 'Phòng Thí Nghiệm Ảo Hóa Học 10',
    subtitle: 'Mô phỏng phản ứng thực nghiệm tức thì & an toàn tuyệt đối',
    category: 'student',
    categoryLabel: 'Học sinh & Thực hành',
    badge: 'Mô phỏng tương tác',
    badgeColor: '#38bdf8',
    icon: <FlaskConical size={28} color="#38bdf8" />,
    iconBg: 'rgba(56, 189, 248, 0.15)',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    description:
      'Thực hiện thí nghiệm hóa học chân thực: trộn hóa chất, quan sát biến đổi màu sắc, hiện tượng sủi bọt khí, tạo kết tủa, khói bay, tỏa nhiệt và đo độ pH theo thời gian thực.',
    highlights: [
      '11+ thí nghiệm mẫu THPT (Kim loại kiềm, Halogen, Cu + HNO₃, Este hóa, Tráng bạc, Axit - Bazơ)',
      'Tích hợp động học phản ứng Arrhenius theo nhiệt độ đun nóng',
      'Đồ thị động học biến thiên pH & nhiệt độ thời gian thực',
      'Cơ chế Cache SHA-256 phản hồi tức thì 0ms',
    ],
    techStack: ['Gemini 2.0 AI', 'Chart.js', 'Web Audio API', 'Supabase Cache'],
    actionLabel: 'Vào Phòng Thí Nghiệm',
  },
  {
    id: 'ai-tutor',
    tabIndex: 2,
    title: 'Gia Sư Hóa Học AI (ChemAI Buddy)',
    subtitle: 'Trợ lý học tập thông minh giải đáp 24/7 chuẩn GDPT 2018',
    category: 'student',
    categoryLabel: 'Học sinh & Tự học',
    badge: 'AI Gia sư 24/7',
    badgeColor: '#818cf8',
    icon: <Bot size={28} color="#818cf8" />,
    iconBg: 'rgba(129, 140, 248, 0.15)',
    glowColor: 'rgba(129, 140, 248, 0.25)',
    description:
      'Được tinh chỉnh sâu với toàn bộ kiến thức Hóa học 10 THPT. Sẵn sàng giải thích hiện tượng, hướng dẫn giải bài tập cân bằng oxi hóa - khử, cấu hình electron và bài toán nhiệt phản ứng.',
    highlights: [
      'Hỏi đáp tự nhiên mọi chủ đề Hóa học 10 (Sách Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo)',
      'Định dạng công thức hóa học, phương trình phản ứng chuẩn xác',
      'Gợi ý câu hỏi thông minh giúp tư duy logic',
      'Lưu trữ nhật ký hội thoại phục vụ ôn tập cá nhân',
    ],
    techStack: ['Google Gemini API', 'Markdown Renderer', 'Prompt Sư Phạm'],
    actionLabel: 'Hỏi Gia Sư AI Ngay',
  },
  {
    id: 'quiz-kahoot',
    tabIndex: 3,
    title: 'Đấu Trường Live Kahoot & Trắc Nghiệm AI',
    subtitle: 'Ôn luyện vui nhộn, thi đấu đối kháng nhiều người chơi theo mã PIN',
    category: 'student',
    categoryLabel: 'Học sinh & Thi đấu',
    badge: 'Đấu trường trực tuyến',
    badgeColor: '#f59e0b',
    icon: <Trophy size={28} color="#f59e0b" />,
    iconBg: 'rgba(245, 158, 11, 0.15)',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    description:
      'Tạo không khí học tập sôi nổi với 2 chế độ: Luyện tập Solo phân hóa theo chủ đề và Đấu trường Live Kahoot nhập mã PIN thi đấu tính điểm theo tốc độ trả lời.',
    highlights: [
      'Chế độ Solo: Tự chọn chủ đề, chấm điểm tức thì kèm lời giải chi tiết',
      'Chế độ Đấu trường Live: Tạo phòng thi bằng mã PIN 6 số, đồng bộ Realtime',
      'Bảng vinh danh Top 3 Podium sống động như Kahoot quốc tế',
      'Tự động sinh bộ câu hỏi mới không giới hạn bằng AI',
    ],
    techStack: ['Supabase Realtime', 'Gemini Question Generator', 'Live Leaderboard'],
    actionLabel: 'Tham Gia Đấu Trường',
  },
  {
    id: 'safety-3d',
    tabIndex: 4,
    title: 'Mô Hình 3D Liên Kết & An Toàn Phòng Lab',
    subtitle: 'Trực quan hóa không gian phân tử & Cẩm nang sơ cứu hóa chất GHS',
    category: 'simulation',
    categoryLabel: 'Trực quan hóa & An toàn',
    badge: '3D WebGL & Sơ cứu',
    badgeColor: '#10b981',
    icon: <ShieldCheck size={28} color="#10b981" />,
    iconBg: 'rgba(16, 185, 129, 0.15)',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    description:
      'Khám phá thế giới vi mô với mô hình 3D phân tử xoay 360 độ (H₂O, CH₄, NH₃, CO₂, NaCl,...) và tra cứu quy tắc an toàn phòng thí nghiệm, sơ cứu bỏng axit/kiềm chuẩn quốc tế GHS.',
    highlights: [
      'Mô hình 3D tương tác chuột (Xoay 360°, Zoom in/out, Auto Rotate)',
      'Hệ thống màu nguyên tử CPK quốc tế (H, C, O, N, Cl, Na, S, Br)',
      'Hiển thị độ dài liên kết, góc liên kết và loại liên kết (Cộng hóa trị, Ion)',
      'Cẩm nang sơ cứu khẩn cấp: xử lý bỏng H₂SO₄, kiềm đặc, ngộ độc Cl₂',
    ],
    techStack: ['Three.js', 'React Three Fiber', 'Standard PBR Material', 'GHS Guidelines'],
    actionLabel: 'Khám Phá Mô Hình 3D',
  },
  {
    id: 'lesson-planner',
    tabIndex: 5,
    title: 'Soạn Giáo Án Chuẩn Công Văn 5512 BGD&ĐT',
    subtitle: 'Trợ lý AI chuyên trách thiết kế Kế hoạch bài dạy chi tiết trong 30 giây',
    category: 'teacher',
    categoryLabel: 'Giáo viên & Sư phạm',
    badge: 'Dify AI Engine (5512)',
    badgeColor: '#ec4899',
    icon: <BookOpen size={28} color="#ec4899" />,
    iconBg: 'rgba(236, 72, 153, 0.15)',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    description:
      'Ứng dụng Dify AI chuyên biệt để tự động tạo cấu trúc giáo án đầy đủ 4 hoạt động: Khởi động, Hình thành kiến thức, Luyện tập và Vận dụng đúng quy chuẩn Bộ GD&ĐT.',
    highlights: [
      'Đầy đủ mục tiêu (Năng lực hóa học, Năng lực chung, Phẩm chất)',
      'Tiến trình 4 hoạt động sư phạm chi tiết (Nội dung, Sản phẩm, Tổ chức thực hiện)',
      'Kèm phiếu học tập, bảng rubric đánh giá và câu hỏi kiểm tra',
      'Sao chép 1 chạm và hỗ trợ xuất bản sang Microsoft Word / PDF',
    ],
    techStack: ['Dify AI Workflow', 'BGD&ĐT 5512 Template', 'Word Exporter'],
    actionLabel: 'Soạn Giáo Án Ngay',
  },
  {
    id: 'exam-manager',
    tabIndex: 6,
    title: 'Soạn & Chấm Đề Thi Định Dạng Mới (2025/2026)',
    subtitle: 'Ma trận 4 mức độ nhận thức & Đa dạng dạng câu hỏi trắc nghiệm',
    category: 'teacher',
    categoryLabel: 'Giáo viên & Đánh giá',
    badge: 'Format Mới 2025-2026',
    badgeColor: '#06b6d4',
    icon: <FileCheck2 size={28} color="#06b6d4" />,
    iconBg: 'rgba(6, 182, 212, 0.15)',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    description:
      'Thiết lập ma trận đề thi chuẩn 4 cấp độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) với 3 dạng câu hỏi mới: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai và Câu hỏi trả lời ngắn.',
    highlights: [
      'Tạo đề thi tự động theo ma trận cấu trúc quy định của Bộ GD&ĐT',
      'Đầy đủ 3 dạng câu hỏi chuẩn đề thi tốt nghiệp THPT định dạng mới',
      'Bảng ma trận phân bố số câu, số điểm, tỉ lệ phần trăm trực quan',
      'Xuất bản đề thi, đáp án và biểu điểm chi tiết tiện in ấn',
    ],
    techStack: ['Gemini 2.0 Pro', 'Ma Trận Nhận Thức BGD', 'Auto Exam Generator'],
    actionLabel: 'Tạo Đề Thi Mới',
  },
  {
    id: 'stem-projects',
    tabIndex: 7,
    title: 'Thiết Kế Dự Án Học Tập STEM Hóa Học',
    subtitle: 'Gắn liền kiến thức hóa học với thực tiễn cuộc sống & bảo vệ môi trường',
    category: 'teacher',
    categoryLabel: 'Giáo viên & STEM',
    badge: 'STEM 5 Bước',
    badgeColor: '#a855f7',
    icon: <Sparkles size={28} color="#a855f7" />,
    iconBg: 'rgba(168, 85, 247, 0.15)',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    description:
      'Ngân hàng dự án STEM hóa học thực tế (Pha chế nước muối sinh lý, Pin điện hóa quả chanh, Làm xà phòng handmade, Xử lý nước phèn) tích hợp quy trình 5 bước sư phạm hoàn chỉnh.',
    highlights: [
      'Dự án mẫu bám sát đời sống và chuyên đề học tập Hóa 10',
      'Quy trình 5 bước: Giao nhiệm vụ → Nghiên cứu → Thiết kế → Chế tạo → Báo cáo',
      'Bộ tiêu chí đánh giá sản phẩm (Rubric) chi tiết cho giáo viên và học sinh',
      'Tạo dự án STEM mới tùy chỉnh theo từng bối cảnh lớp học bằng AI',
    ],
    techStack: ['STEM Framework', 'Interactive Rubric', 'AI Project Designer'],
    actionLabel: 'Khám Phá Dự Án STEM',
  },
  {
    id: 'video-lectures',
    tabIndex: 8,
    title: 'Thư Viện Video Bài Giảng Trực Quan',
    subtitle: 'Đăng tải bài dạy YouTube & Phát trực tiếp chuẩn Cinema không chuyển tab',
    category: 'teacher',
    categoryLabel: 'Giáo viên & Học tập',
    badge: 'Video & Bài giảng',
    badgeColor: '#f43f5e',
    icon: <Video size={28} color="#f43f5e" />,
    iconBg: 'rgba(244, 63, 94, 0.15)',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    description:
      'Không gian số dành cho giáo viên đăng tải video bài dạy YouTube, phân loại theo 6 Chương Hóa học 10 GDPT 2018. Học sinh theo dõi bài giảng trực tiếp trên web, ghi chú tức thì và nhận tóm tắt kiến thức từ AI.',
    highlights: [
      'Phát video nhúng trực tiếp không mở tab ngoài, không quảng cáo chen ngang',
      'Đăng tải dễ dàng qua link YouTube với tự động nhận diện ảnh Thumbnail',
      'Tích hợp sổ tay ghi chú học tập (Lecture Notes) lưu trữ tự động',
      'Trợ lý AI tự động phân tích mục tiêu & tóm tắt trọng tâm bài học',
    ],
    techStack: ['YouTube Cinema Embed', 'No-Redirect Player', 'AI Lesson Summary', 'Study Notes'],
    actionLabel: 'Xem Kho Video Bài Giảng',
  },
  {
    id: 'student-progress',
    tabIndex: 9,
    title: 'Sổ Theo Dõi & Đánh Giá Năng Lực Học Sinh',
    subtitle: 'Theo dõi EXP Kahoot, Chuỗi thi đấu, Đặt biệt danh & Đánh giá năng lực GDPT',
    category: 'teacher',
    categoryLabel: 'Giáo viên & Đánh giá',
    badge: 'Quản lý Học sinh',
    badgeColor: '#f59e0b',
    icon: <GraduationCap size={28} color="#f59e0b" />,
    iconBg: 'rgba(245, 158, 11, 0.15)',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    description:
      'Hệ thống quản lý học sinh toàn diện dành cho giáo viên: theo dõi chi tiết điểm kinh nghiệm Kahoot, chuỗi ngày đăng nhập, tỷ lệ câu đúng, đặt biệt danh danh dự và xếp loại năng lực theo chuẩn GDPT 2018.',
    highlights: [
      'Theo dõi tiến trình học tập, EXP và cấp độ Level từng học sinh',
      'Đặt biệt danh danh dự & phong tặng danh hiệu chuyên môn',
      'Đánh giá năng lực tự động (Kim cương / Vàng / Bạc / Đồng) & Gợi ý nhận xét bằng AI',
      'Xuất danh sách và báo cáo năng lực ra file CSV/Excel tiện lợi',
    ],
    techStack: ['Student Analytics', 'AI Pedagogical Comment', 'Excel Exporter', 'Gamification'],
    actionLabel: 'Mở Sổ Theo Dõi Học Sinh',
  },
  {
    id: 'teacher-audit',
    tabIndex: 10,
    title: 'Cổng Quản Trị & Kiểm Duyệt Sư Phạm (Audit)',
    subtitle: 'Giám sát học tập, quản lý ngân hàng đề thi & an toàn nội dung AI',
    category: 'teacher',
    categoryLabel: 'Quản trị & Kiểm duyệt',
    badge: 'Dành cho Giáo viên',
    badgeColor: '#eab308',
    icon: <UserCheck size={28} color="#eab308" />,
    iconBg: 'rgba(234, 179, 8, 0.15)',
    glowColor: 'rgba(234, 179, 8, 0.25)',
    description:
      'Khu vực bảo mật dành cho giáo viên và quản trị viên: theo dõi lịch sử tương tác AI của học sinh, quản lý phòng thi Kahoot, duyệt câu hỏi và xem báo cáo tổng hợp chất lượng.',
    highlights: [
      'Bảo mật đăng nhập bằng mật mã quản trị viên giáo viên',
      'Xem và kiểm duyệt toàn bộ nhật ký hội thoại AI Chat Logs của học sinh',
      'Quản lý danh sách phòng thi Kahoot trực tuyến và kết quả thí sinh',
      'Quản trị ngân hàng câu hỏi trắc nghiệm & dữ liệu thí nghiệm',
    ],
    techStack: ['Teacher Auth Guard', 'Supabase Management', 'Audit Logging'],
    actionLabel: 'Mở Cổng Giáo Viên',
  },
  {
    id: 'leaderboard',
    tabIndex: 11,
    title: 'Bảng Xếp Hạng Học Sinh THPT',
    subtitle: 'Vinh danh Top 3 Học sinh THPT xuất sắc theo Thành Phố, Tỉnh và Toàn Quốc',
    category: 'student',
    categoryLabel: 'Học sinh THPT & Thi đấu',
    badge: 'Bảng Vàng Học Sinh THPT',
    badgeColor: '#f59e0b',
    icon: <Award size={28} color="#f59e0b" />,
    iconBg: 'rgba(245, 158, 11, 0.15)',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    description:
      'Trang xếp hạng và vinh danh học sinh THPT toàn diện: hỗ trợ phân vùng theo 3 cấp độ (Thành phố/Thị xã/Huyện, Cấp Tỉnh, và Toàn Quốc). Tích hợp 3 bảng xếp hạng chuyên sâu: Điểm EXP, Chuỗi thắng Kahoot và Chuỗi ngày chuyên cần.',
    highlights: [
      'Phân vùng 3 cấp độ: Thành phố / Thị xã / Huyện, Cấp Tỉnh, và Toàn Quốc (Quốc gia)',
      '3 Bảng xếp hạng độc lập: Điểm EXP, Chuỗi trận Kahoot & Chuỗi ngày đăng nhập',
      'Bục vinh quang Olympic Top 3 (Quán quân, Á quân, Quý quân) với hiệu ứng hào quang',
      'Thẻ theo dõi thứ hạng cá nhân và xuất báo cáo bảng vàng CSV/Excel',
    ],
    techStack: ['Geo-Location Filter', 'Realtime Sync', 'Podium Showcase', 'CSV Exporter'],
    actionLabel: 'Xem Bảng Xếp Hạng Học Sinh THPT',
  },
  {
    id: 'periodic-table',
    tabIndex: 12,
    title: 'Bảng Tuần Hoàn Hóa Học 118 Nguyên Tố',
    subtitle: 'Chuẩn IUPAC, phân loại 3 mảng màu & Tra cứu 9 mục chuyên sâu',
    category: 'simulation',
    categoryLabel: 'Tra cứu & Mô phỏng',
    badge: '118 Nguyên Tố IUPAC',
    badgeColor: '#06b6d4',
    icon: <Atom size={28} color="#06b6d4" />,
    iconBg: 'rgba(6, 182, 212, 0.15)',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    description:
      'Khám phá toàn bộ 118 nguyên tố hóa học với 3 mảng màu chuẩn (Kim loại, Phi kim, Khí hiếm). Hỗ trợ tìm kiếm nhanh, mô phỏng trạng thái theo nhiệt độ và tra cứu 9 mục thông tin chi tiết kèm tìm kiếm nội bộ.',
    highlights: [
      'Đầy đủ 118 nguyên tố hóa học hiển thị trên lưới IUPAC 18 cột chuẩn quốc tế',
      'Phân chia trực quan 3 mảng màu chính: Kim loại (Metals), Phi kim (Non-metals), Khí hiếm (Noble gases)',
      '9 Mục thông tin chuyên sâu: Cấu trúc hạt nhân, nhiệt động học, độ âm điện, quang phổ, quặng tự nhiên, ứng dụng, an toàn NFPA 704',
      'Tìm kiếm nhanh đa tiêu chí & Tìm kiếm thông tin nhỏ tức thì bên trong từng nguyên tố',
    ],
    techStack: ['IUPAC Standard 2026', 'In-Element Search', 'NFPA 704 Diamond', 'State Simulation'],
    actionLabel: 'Khám Phá Bảng Hóa Học',
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

export default function HomeDashboard({ onNavigateTab, onOpenAuthModal, currentUser, onLogout }: HomeDashboardProps) {
  const [filterCategory, setFilterCategory] = useState<'all' | 'student' | 'teacher' | 'simulation'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFeatureClick = (tabIndex: number) => {
    if (!currentUser) {
      const feat = FEATURES.find(f => f.tabIndex === tabIndex);
      const targetRole = feat?.category === 'teacher' ? 'teacher' : 'student';
      if (onOpenAuthModal) onOpenAuthModal(targetRole);
      return;
    }
    onNavigateTab(tabIndex);
  };

  const filteredFeatures = FEATURES.filter((f) => {
    const matchCategory = filterCategory === 'all' || f.category === filterCategory;
    const matchSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      {/* 1. HERO SECTION WITH VIBRANT ANIMATED BACKGROUND */}
      <Box
        sx={{
          position: 'relative',
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          p: { xs: 2.5, sm: 4, md: 5 },
          mb: 4,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 13, 22, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Ambient Glowing Orbs Background */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.2) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-25%',
            left: '-10%',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2 }}>
          {/* Top Badge */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<Sparkles size={14} color="#38bdf8" />}
              label="HỆ THỐNG TRỢ LÝ & MÔ PHỎNG HÓA HỌC SỐ — GDPT 2018"
              sx={{
                bgcolor: 'rgba(56, 189, 248, 0.12)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                fontWeight: 'bold',
                fontSize: { xs: '11px', sm: '12px' },
                py: 0.5,
              }}
            />
            <Chip
              label="Phiên bản 2026"
              size="small"
              sx={{
                bgcolor: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 'bold',
                fontSize: '11px',
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />
          </Stack>

          {/* Main Hero Title */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '26px', sm: '36px', md: '44px', lg: '48px' },
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              mb: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #bae6fd 50%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HCC - ChemAI: Khám Phá Hóa Học 10 <br />
            Bằng Trí Tuệ Nhân Tạo & Mô Phỏng 3D
          </Typography>

          {/* Slogan & Intro */}
          <Typography
            variant="body1"
            sx={{
              color: '#94a3b8',
              fontSize: { xs: '14px', sm: '16px', md: '17px' },
              maxWidth: 820,
              lineHeight: 1.65,
              mb: 3.5,
            }}
          >
            Nền tảng toàn diện tích hợp <strong>Google Gemini 2.0 AI</strong> và <strong>Dify AI</strong>, kết hợp
            phòng thí nghiệm ảo trực quan, mô hình 3D phân tử sống động, đấu trường trắc nghiệm Kahoot cùng trợ lý
            soạn giáo án 5512 & đề thi chuẩn cấu trúc mới của Bộ Giáo dục & Đào tạo.
          </Typography>

          {/* Hero Action CTA Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 0 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleFeatureClick(1)}
              startIcon={<FlaskConical size={20} />}
              endIcon={!currentUser ? <Lock size={16} /> : <ArrowRight size={18} />}
              sx={{
                bgcolor: '#0284c7',
                backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '15px',
                px: 3,
                py: 1.3,
                borderRadius: 2.5,
                boxShadow: '0 8px 24px rgba(2, 132, 199, 0.4)',
                '&:hover': {
                  bgcolor: '#0369a1',
                  boxShadow: '0 12px 28px rgba(2, 132, 199, 0.6)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Vào Thí Nghiệm Ảo Ngay
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => handleFeatureClick(2)}
              startIcon={<Bot size={20} />}
              endIcon={!currentUser ? <Lock size={16} /> : undefined}
              sx={{
                borderColor: 'rgba(56, 189, 248, 0.4)',
                color: '#38bdf8',
                bgcolor: 'rgba(56, 189, 248, 0.06)',
                fontWeight: 'bold',
                fontSize: '15px',
                px: 2.8,
                py: 1.3,
                borderRadius: 2.5,
                '&:hover': {
                  bgcolor: 'rgba(56, 189, 248, 0.15)',
                  borderColor: '#38bdf8',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Hỏi Gia Sư Hóa Học AI
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => handleFeatureClick(3)}
              startIcon={<Trophy size={20} />}
              endIcon={!currentUser ? <Lock size={16} /> : undefined}
              sx={{
                borderColor: 'rgba(245, 158, 11, 0.4)',
                color: '#f59e0b',
                bgcolor: 'rgba(245, 158, 11, 0.06)',
                fontWeight: 'bold',
                fontSize: '15px',
                px: 2.5,
                py: 1.3,
                borderRadius: 2.5,
                '&:hover': {
                  bgcolor: 'rgba(245, 158, 11, 0.15)',
                  borderColor: '#f59e0b',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Đấu Trường Kahoot
            </Button>
          </Stack>
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
                  <Typography variant="h6" fontWeight="bold" color="white" sx={{ fontSize: '18px' }}>
                    {currentUser.role === 'teacher' ? `👋 Kính chào Thầy/Cô, ${currentUser.fullName}` : `👋 Xin chào bạn, ${currentUser.fullName}`}
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
                    : `Trường: ${currentUser.school || 'THPT'} • Khám phá bài giảng video, phòng thí nghiệm ảo, gia sư AI 24/7 và thi đấu Kahoot.`}
                </Typography>

                {/* Extra Student Progress Bar & Pills in Dashboard Welcome Banner */}
                {currentUser.role === 'student' && (() => {
                  const exp = currentUser.kahootExp || 350;
                  const totalQ = currentUser.totalKahootQuestions || 15;
                  const correctQ = currentUser.correctKahootQuestions || 11;
                  const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 1000) / 10 : 0;
                  const level = Math.floor(exp / 300) + 1;
                  const nickname = currentUser.nickname || 'Chiến Binh Hóa Học 10';

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
                startIcon={<Users size={16} />}
                sx={{
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  flex: { xs: 1, sm: 'none' }
                }}
              >
                Hồ Sơ
              </Button>
              {onLogout && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onLogout}
                  startIcon={<LogOut size={16} />}
                  color="error"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Đăng Xuất
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
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 3,
                    bgcolor: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: '#38bdf8',
                      boxShadow: '0 12px 36px rgba(2, 132, 199, 0.2)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
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
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          fontWeight: 'bold',
                          fontSize: '11px'
                        }}
                      />
                    </Box>

                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom sx={{ fontSize: '17px' }}>
                      Cổng Tài Khoản Học Sinh
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6, fontSize: '13px' }}>
                      Lưu tiến trình học tập, chuỗi ngày đăng nhập (Streak), tích lũy điểm kinh nghiệm (EXP), mở khóa danh hiệu và thi đấu Kahoot trực tuyến cùng cả lớp.
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, pt: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => onOpenAuthModal?.('student')}
                      startIcon={<LogIn size={16} />}
                      sx={{
                        bgcolor: '#0284c7',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        '&:hover': { bgcolor: '#0369a1' }
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
                        bgcolor: 'rgba(56, 189, 248, 0.05)',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '13px',
                        '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8' }
                      }}
                    >
                      Tạo Tài Khoản
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* CARD 2: CỔNG GIÁO VIÊN */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 3,
                    bgcolor: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: '#10b981',
                      boxShadow: '0 12px 36px rgba(16, 185, 129, 0.2)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
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
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          fontWeight: 'bold',
                          fontSize: '11px'
                        }}
                      />
                    </Box>

                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom sx={{ fontSize: '17px' }}>
                      Cổng Xác Thực Giáo Viên
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.6, fontSize: '13px' }}>
                      Dành riêng cho Thầy/Cô. Xác thực bảo mật bằng mật khẩu nội bộ để soạn kế hoạch bài dạy 5512, ma trận đề thi 2026 và kiểm duyệt phòng thi Kahoot.
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, pt: 1 }}>
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
                        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                        '&:hover': { bgcolor: '#d97706' }
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
                        '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.15)', borderColor: '#f59e0b' }
                      }}
                    >
                      Đăng Ký Giáo Viên
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
          mb: 3.5,
          p: 2,
          bgcolor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Category Pills */}
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: { xs: 0.5, md: 0 } }}>
          <Chip
            label="Tất Cả Công Dụng (8)"
            onClick={() => setFilterCategory('all')}
            color={filterCategory === 'all' ? 'primary' : 'default'}
            variant={filterCategory === 'all' ? 'filled' : 'outlined'}
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          />
          <Chip
            icon={<GraduationCap size={16} />}
            label="Dành Cho Học Sinh"
            onClick={() => setFilterCategory('student')}
            color={filterCategory === 'student' ? 'primary' : 'default'}
            variant={filterCategory === 'student' ? 'filled' : 'outlined'}
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          />
          <Chip
            icon={<BookMarked size={16} />}
            label="Dành Cho Giáo Viên"
            onClick={() => setFilterCategory('teacher')}
            color={filterCategory === 'teacher' ? 'primary' : 'default'}
            variant={filterCategory === 'teacher' ? 'filled' : 'outlined'}
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          />
          <Chip
            icon={<Atom size={16} />}
            label="Mô Phỏng & 3D"
            onClick={() => setFilterCategory('simulation')}
            color={filterCategory === 'simulation' ? 'primary' : 'default'}
            variant={filterCategory === 'simulation' ? 'filled' : 'outlined'}
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          />
        </Stack>

        {/* Search input */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(9, 13, 22, 0.8)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            minWidth: { xs: '100%', md: 280 },
          }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Tìm kiếm tính năng, công dụng..."
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

      {/* 3. GRID OF COMPREHENSIVE FEATURES & USE CASES */}
      <Box sx={{ mb: 6 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2.5}>
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#f8fafc', fontSize: { xs: '18px', sm: '22px' } }}>
              Tổng Hợp Toàn Bộ Công Dụng Của Nền Tảng ChemAI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {!currentUser ? 'Biểu tượng & tính năng hệ thống (Đăng nhập vai trò để kích hoạt và thao tác)' : 'Khám phá chi tiết các phân hệ hỗ trợ học tập, thí nghiệm, luyện thi và soạn bài giảng'}
            </Typography>
          </Box>
          <Chip
            label={`${filteredFeatures.length} Tính năng`}
            size="small"
            sx={{ bgcolor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontWeight: 'bold' }}
          />
        </Box>

        <Grid container spacing={2.5}>
          {filteredFeatures.map((feat) => (
            <Grid item xs={12} sm={6} lg={4} key={feat.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 3,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: feat.badgeColor,
                    boxShadow: `0 12px 30px ${feat.glowColor}`,
                  },
                }}
              >
                <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Top Header with Icon and Badges */}
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: 2.5,
                        bgcolor: feat.iconBg,
                        border: `1px solid ${feat.badgeColor}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {feat.icon}
                    </Box>
                    <Stack direction="column" alignItems="flex-end" spacing={0.5}>
                      <Chip
                        label={feat.badge}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '11px',
                          fontWeight: 'bold',
                          bgcolor: `${feat.badgeColor}18`,
                          color: feat.badgeColor,
                          border: `1px solid ${feat.badgeColor}40`,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10.5px' }}>
                        {feat.categoryLabel}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Title & Subtitle */}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontSize: '17px',
                      color: '#f8fafc',
                      mb: 0.5,
                      lineHeight: 1.3,
                    }}
                  >
                    {feat.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: '#94a3b8',
                      fontSize: '12px',
                      mb: 1.5,
                      display: 'block',
                      fontStyle: 'italic',
                    }}
                  >
                    {feat.subtitle}
                  </Typography>

                  {/* Main Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: '13px',
                      lineHeight: 1.55,
                      mb: 2,
                    }}
                  >
                    {feat.description}
                  </Typography>

                  {/* Highlights Bullet Points */}
                  <Box sx={{ mb: 2.5, flexGrow: 1 }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#cbd5e1', mb: 1, display: 'block' }}>
                      Điểm nổi bật:
                    </Typography>
                    <Stack spacing={0.8}>
                      {feat.highlights.map((h, i) => (
                        <Box key={i} display="flex" alignItems="flex-start" gap={0.8}>
                          <CheckCircle2 size={14} color={feat.badgeColor} style={{ marginTop: 2, flexShrink: 0 }} />
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '11.5px', lineHeight: 1.4 }}>
                            {h}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  {/* Tech stack badges */}
                  <Box display="flex" flexWrap="wrap" gap={0.5} mb={2.5}>
                    {feat.techStack.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '10px',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          color: '#cbd5e1',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      />
                    ))}
                  </Box>

                  {/* Action Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleFeatureClick(feat.tabIndex)}
                    startIcon={!currentUser ? <Lock size={15} /> : undefined}
                    endIcon={currentUser ? <ChevronRight size={16} /> : undefined}
                    sx={{
                      bgcolor: !currentUser ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.06)',
                      color: !currentUser ? '#94a3b8' : '#f8fafc',
                      border: `1px solid ${!currentUser ? 'rgba(255, 255, 255, 0.1)' : feat.badgeColor + '50'}`,
                      fontWeight: 'bold',
                      fontSize: '13px',
                      borderRadius: 2,
                      py: 1,
                      '&:hover': {
                        bgcolor: !currentUser ? 'rgba(51, 65, 85, 0.9)' : feat.badgeColor,
                        color: !currentUser ? '#ffffff' : '#000000',
                        boxShadow: !currentUser ? 'none' : `0 4px 15px ${feat.glowColor}`,
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {!currentUser ? 'Đăng nhập để mở khóa' : feat.actionLabel}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#f8fafc', fontSize: { xs: '18px', sm: '22px' } }}>
            Khung Chương Trình Hóa Học Lớp 10 THPT (Chuẩn GDPT 2018)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Toàn bộ công cụ thí nghiệm, bài tập, câu hỏi Kahoot và giáo án trên ChemAI được thiết kế bám sát 6 chuyên đề
          chính của 3 bộ SGK hiện hành (Kết Nối Tri Thức, Cánh Diều, Chân Trời Sáng Tạo).
        </Typography>

        <Grid container spacing={2}>
          {SYLLABUS_CHAPTERS.map((ch, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: 'rgba(9, 13, 22, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: ch.color,
                    transform: 'translateY(-2px)',
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
                      height: 22,
                      fontSize: '11px',
                    }}
                  />
                  {ch.icon}
                </Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#f8fafc', fontSize: '14px' }}>
                  {ch.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px', lineHeight: 1.5 }}>
                  {ch.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 5. 3-STEP USER WORKFLOW GUIDE */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 4 },
          bgcolor: 'radial-gradient(ellipse at 50% 100%, rgba(2, 132, 199, 0.15) 0%, rgba(15, 23, 42, 0.8) 70%)',
          borderRadius: 3.5,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" sx={{ color: '#f8fafc', mb: 1, fontSize: { xs: '18px', sm: '22px' } }}>
          Quy Trình Khai Thác ChemAI Tối Ưu Cho Giáo Viên & Học Sinh
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4, maxWidth: 650, mx: 'auto' }}>
          3 bước đơn giản giúp bạn biến kiến thức hóa học trừu tượng thành trải nghiệm trực quan và đạt kết quả học tập vượt trội.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2.5,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 3,
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                1
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#f8fafc', mb: 1 }}>
                Khám Phá & Mô Phỏng
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', lineHeight: 1.5 }}>
                Vào <strong>Thí Nghiệm Ảo</strong> trộn phản ứng và xoay <strong>Mô Hình 3D</strong> để hiểu bản chất
                phân tử trước khi học lý thuyết.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2.5,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(129, 140, 248, 0.25)',
                borderRadius: 3,
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(129, 140, 248, 0.2)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                2
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#f8fafc', mb: 1 }}>
                Thảo Luận Với Gia Sư AI
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', lineHeight: 1.5 }}>
                Hỏi bất cứ bài tập hoặc hiện tượng nào khó hiểu với <strong>ChemAI Buddy</strong> để nhận giải thích chi
                tiết từng bước.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2.5,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 3,
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'rgba(245, 158, 11, 0.2)',
                  color: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                3
              </Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#f8fafc', mb: 1 }}>
                Luyện Tập & Soạn Bài
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', lineHeight: 1.5 }}>
                Học sinh tham gia <strong>Đấu Trường Kahoot</strong>; Giáo viên tạo <strong>Giáo Án 5512</strong> và{' '}
                <strong>Đề Thi Mới 2026</strong> trong nháy mắt.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 6. PLATFORM FOOTER SUMMARY */}
      <Box
        sx={{
          textAlign: 'center',
          pt: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
          HCC - ChemAI © 2026 | Nền Tảng Trợ Lý & Mô Phỏng Hóa Học Lớp 10 THPT
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          Phát triển trên nền tảng Next.js, Material UI, Three.js, Supabase, Google Gemini API và Dify AI Platform.
        </Typography>
      </Box>
    </Box>
  );
}
