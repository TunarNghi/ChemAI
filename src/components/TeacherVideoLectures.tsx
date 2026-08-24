"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  InputAdornment,
  Avatar,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Video,
  Play,
  Plus,
  Trash2,
  Edit,
  Search,
  Youtube,
  BookOpen,
  Sparkles,
  Check,
  Copy,
  Clock,
  User,
  Filter,
  Maximize2,
  Minimize2,
  Bookmark,
  Flame,
  Atom,
  ShieldCheck,
  Zap,
  FlaskConical,
  Microscope,
  RefreshCw,
  X,
  Share2,
  FileText,
  HelpCircle,
  GraduationCap,
  Layers,
} from 'lucide-react';
import { callGeminiAPI, supabase } from '@/lib/api';
import { UserProfile } from '@/components/UserAuthModal';

export interface VideoLecture {
  id: string;
  youtubeId: string;
  originalUrl: string;
  title: string;
  description: string;
  chapter: string;
  grade: string;
  teacherName: string;
  duration?: string;
  tags?: string[];
  keyReactions?: string[];
  studyNotes?: string;
  createdAt: string;
  isCustom?: boolean;
}

// Video Lectures default list (Empty by default)
const DEFAULT_VIDEO_LECTURES: VideoLecture[] = [];

const CHAPTER_LIST = [
  'Tất cả chương',
  'Chương 1: Cấu Tạo Nguyên Tử',
  'Chương 2: Bảng Tuần Hoàn',
  'Chương 3: Liên Kết Hóa Học',
  'Chương 4: Phản Ứng Oxi Hóa - Khử',
  'Chương 5: Năng Lượng Hóa Học',
  'Chương 6: Tốc Độ Phản Ứng',
  'Chương 7: Nhóm Halogen',
  'Thí Nghiệm Thực Hành & STEM',
  'Ôn Tập & Luyện Đề Thi',
];

const CHAPTER_ICONS: Record<string, React.ReactElement> = {
  'Chương 1: Cấu Tạo Nguyên Tử': <Atom size={16} color="#38bdf8" />,
  'Chương 2: Bảng Tuần Hoàn': <Layers size={16} color="#818cf8" />,
  'Chương 3: Liên Kết Hóa Học': <ShieldCheck size={16} color="#10b981" />,
  'Chương 4: Phản Ứng Oxi Hóa - Khử': <Flame size={16} color="#f59e0b" />,
  'Chương 5: Năng Lượng Hóa Học': <Zap size={16} color="#ec4899" />,
  'Chương 6: Tốc Độ Phản Ứng': <Clock size={16} color="#a855f7" />,
  'Chương 7: Nhóm Halogen': <FlaskConical size={16} color="#06b6d4" />,
  'Thí Nghiệm Thực Hành & STEM': <Sparkles size={16} color="#22c55e" />,
  'Ôn Tập & Luyện Đề Thi': <GraduationCap size={16} color="#eab308" />,
};

// Helper: Extract YouTube video ID from any URL format
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // If already an 11-character ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex matching various YouTube URL patterns
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);
  return match && match[1] ? match[1] : null;
}

interface TeacherVideoLecturesProps {
  currentUser?: UserProfile | null;
}

export default function TeacherVideoLectures({ currentUser }: TeacherVideoLecturesProps) {
  const isTeacher = currentUser?.role === 'teacher';
  const [videos, setVideos] = useState<VideoLecture[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoLecture | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('Tất cả chương');
  const [selectedGrade, setSelectedGrade] = useState('10');
  const [theaterMode, setTheaterMode] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState<'info' | 'notes' | 'playlist'>('playlist');

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [chapterInput, setChapterInput] = useState('Chương 1: Cấu Tạo Nguyên Tử');
  const [gradeInput, setGradeInput] = useState('10');
  const [teacherInput, setTeacherInput] = useState('');
  const [durationInput, setDurationInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [keyReactionsInput, setKeyReactionsInput] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // User Notes per video state
  const [userNote, setUserNote] = useState('');
  const [noteCopied, setNoteCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Load videos from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('chemai_teacher_video_lectures');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setVideos(parsed);
          setSelectedVideo(parsed[0]);
          return;
        }
      }
    } catch (e) {
      console.warn('Error reading stored videos:', e);
    }
    // No default lectures
    setVideos([]);
    setSelectedVideo(null);
  }, []);

  // Update user note when selected video changes
  useEffect(() => {
    if (selectedVideo) {
      const savedNote = localStorage.getItem(`chemai_video_note_${selectedVideo.id}`);
      setUserNote(savedNote || selectedVideo.studyNotes || '');
    }
  }, [selectedVideo]);

  // Save videos to LocalStorage whenever they change
  const saveVideosList = (newList: VideoLecture[]) => {
    setVideos(newList);
    try {
      localStorage.setItem('chemai_teacher_video_lectures', JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to persist video lectures:', e);
    }
  };

  // Handle Note Save
  const handleSaveNote = (newNote: string) => {
    setUserNote(newNote);
    if (selectedVideo) {
      try {
        localStorage.setItem(`chemai_video_note_${selectedVideo.id}`, newNote);
      } catch (e) {
        console.warn('Error saving note:', e);
      }
    }
  };

  // Handle Note Copy
  const handleCopyNote = () => {
    if (!userNote) return;
    navigator.clipboard.writeText(userNote);
    setNoteCopied(true);
    setTimeout(() => setNoteCopied(false), 2000);
  };

  // Handle Share Link Copy
  const handleCopyShareLink = () => {
    if (!selectedVideo) return;
    const shareText = `🎓 [HCC-ChemAI] Bài Giảng Hóa Học: "${selectedVideo.title}"\n👨‍🏫 Giảng viên: ${selectedVideo.teacherName}\n📺 Xem trực tiếp: ${selectedVideo.originalUrl}`;
    navigator.clipboard.writeText(shareText);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingVideoId(null);
    setUrlInput('');
    setTitleInput('');
    setDescInput('');
    setChapterInput('Chương 1: Cấu Tạo Nguyên Tử');
    setGradeInput('10');
    setTeacherInput('Thầy/Cô Giáo Bộ Môn Hóa Học');
    setDurationInput('30:00');
    setTagsInput('Hóa học 10, GDPT 2018');
    setKeyReactionsInput('');
    setValidationError(null);
    setModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (vid: VideoLecture, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingVideoId(vid.id);
    setUrlInput(vid.originalUrl || `https://www.youtube.com/watch?v=${vid.youtubeId}`);
    setTitleInput(vid.title);
    setDescInput(vid.description);
    setChapterInput(vid.chapter);
    setGradeInput(vid.grade || '10');
    setTeacherInput(vid.teacherName);
    setDurationInput(vid.duration || '30:00');
    setTagsInput((vid.tags || []).join(', '));
    setKeyReactionsInput((vid.keyReactions || []).join('\n'));
    setValidationError(null);
    setModalOpen(true);
  };

  // Delete Video
  const handleDeleteVideo = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa bài giảng video này khỏi danh sách?')) {
      const updated = videos.filter((v) => v.id !== id);
      saveVideosList(updated);
      if (selectedVideo?.id === id) {
        setSelectedVideo(updated[0] || null);
      }
    }
  };

  // Clear all videos
  const handleClearAllVideos = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách bài giảng video đã lưu?')) {
      saveVideosList([]);
      setSelectedVideo(null);
    }
  };

  // AI Assistant: Generate Summary and Description from Title/Topic
  const handleAiGenerateDescription = async () => {
    if (!titleInput.trim()) {
      setValidationError('Vui lòng nhập Tiêu đề hoặc Chủ đề bài học trước khi dùng trợ lý AI!');
      return;
    }
    setIsAiGenerating(true);
    setValidationError(null);

    const prompt = `Bạn là Trợ lý Sư phạm Hóa học ChemAI.
Hãy viết một bản tóm tắt mô tả nội dung bài dạy và mục tiêu học tập (theo chuẩn GDPT 2018) cho video bài giảng Hóa học lớp ${gradeInput} với:
- Tiêu đề: "${titleInput}"
- Chương: "${chapterInput}"

Yêu cầu định dạng trả về:
1. Đoạn giới thiệu ngắn gọn (2-3 câu) về trọng tâm kiến thức và ý nghĩa bài học.
2. Mục tiêu học tập cốt lõi (Kiến thức, Kỹ năng, Năng lực Hóa học).
3. 2-3 phương trình hóa học hoặc công thức toán học trọng tâm cần ghi nhớ (nếu có).

Trả về văn bản tiếng Việt tự nhiên, rõ ràng, sư phạm, không dùng ký tự định dạng markdown quá phức tạp.`;

    try {
      const aiResponse = await callGeminiAPI(prompt);
      if (aiResponse && aiResponse.trim()) {
        setDescInput(aiResponse.trim());
      }
    } catch (err: any) {
      console.warn('AI generator error:', err);
      setDescInput(
        `Bài giảng trọng tâm về ${titleInput}. Giúp học sinh nắm vững các khái niệm lý thuyết cốt lõi, thành thạo kỹ năng giải bài tập định tính và định lượng, phát triển năng lực tư duy hóa học thực nghiệm chuẩn GDPT 2018.`
      );
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Submit Add / Edit Form
  const handleSaveVideoLecture = () => {
    const extractedId = extractYouTubeId(urlInput);
    if (!extractedId) {
      setValidationError('Đường link YouTube không hợp lệ! Vui lòng nhập đúng định dạng link YouTube.');
      return;
    }
    if (!titleInput.trim()) {
      setValidationError('Vui lòng nhập tiêu đề cho bài giảng!');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const reactionsArray = keyReactionsInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    if (editingVideoId) {
      // Edit existing
      const updated = videos.map((v) => {
        if (v.id === editingVideoId) {
          return {
            ...v,
            youtubeId: extractedId,
            originalUrl: urlInput.trim(),
            title: titleInput.trim(),
            description: descInput.trim() || 'Bài giảng Hóa học trực tuyến.',
            chapter: chapterInput,
            grade: gradeInput,
            teacherName: teacherInput.trim() || 'Giáo Viên Hóa Học',
            duration: durationInput.trim() || '30:00',
            tags: tagsArray.length > 0 ? tagsArray : ['Hóa học 10'],
            keyReactions: reactionsArray,
          };
        }
        return v;
      });
      saveVideosList(updated);
      const newlyEdited = updated.find((v) => v.id === editingVideoId);
      if (newlyEdited && selectedVideo?.id === editingVideoId) {
        setSelectedVideo(newlyEdited);
      }
    } else {
      // Create new
      const newVideo: VideoLecture = {
        id: 'user-vid-' + Date.now(),
        youtubeId: extractedId,
        originalUrl: urlInput.trim(),
        title: titleInput.trim(),
        description: descInput.trim() || 'Bài giảng Hóa học do giáo viên cập nhật.',
        chapter: chapterInput,
        grade: gradeInput,
        teacherName: teacherInput.trim() || 'Giáo Viên Hóa Học',
        duration: durationInput.trim() || '30:00',
        tags: tagsArray.length > 0 ? tagsArray : ['Bài giảng giáo viên'],
        keyReactions: reactionsArray,
        studyNotes: '',
        createdAt: new Date().toISOString(),
        isCustom: true,
      };
      const updated = [newVideo, ...videos];
      saveVideosList(updated);
      setSelectedVideo(newVideo);
    }

    setModalOpen(false);
  };

  // Filtered video list
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchChapter = selectedChapter === 'Tất cả chương' || v.chapter === selectedChapter;
      const matchSearch =
        !searchQuery.trim() ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.tags && v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchChapter && matchSearch;
    });
  }, [videos, selectedChapter, searchQuery]);

  // Live extracted ID in dialog for thumbnail preview
  const previewYouTubeId = useMemo(() => {
    return extractYouTubeId(urlInput);
  }, [urlInput]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pb: 6 }}>
      {/* Top Banner Header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.18) 0%, rgba(129, 140, 248, 0.12) 50%, rgba(9, 13, 22, 0.9) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 8px 32px rgba(2, 132, 199, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow decorative spheres */}
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={8}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Youtube size={26} color="#ef4444" />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    background: 'linear-gradient(90deg, #38bdf8, #818cf8, #f43f5e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Thư Viện Video Bài Giảng Hóa Học 10
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Hệ thống kho học liệu video trực quan • Phát trực tiếp trên Web • Chuẩn CT GDPT 2018
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700, mt: 0.5, lineHeight: 1.6 }}>
              Dành cho giáo viên đăng tải bài giảng YouTube, hỗ trợ học sinh học tập đa phương tiện. Phát video sắc nét,
              không chuyển tab, tích hợp ghi chú tương tác và gợi ý trọng tâm bài học.
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.8} mt={1.5}>
              <Chip
                icon={<Video size={14} color="#38bdf8" />}
                label={`${videos.length} Bài giảng`}
                size="small"
                sx={{ bgcolor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: 'bold' }}
              />
              <Chip
                icon={<GraduationCap size={14} color="#a855f7" />}
                label="Hóa Học 10 GDPT"
                size="small"
                sx={{ bgcolor: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.3)', fontWeight: 'bold' }}
              />
              <Chip
                icon={<Sparkles size={14} color="#10b981" />}
                label="Trình phát Cinema nhúng Web"
                size="small"
                sx={{ bgcolor: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 'bold' }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent={{ md: 'flex-end' }}>
              {isTeacher ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={handleOpenAddModal}
                    sx={{
                      bgcolor: '#0284c7',
                      color: '#fff',
                      fontWeight: 'bold',
                      px: 2.5,
                      py: 1.2,
                      borderRadius: 2,
                      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
                      '&:hover': { bgcolor: '#0369a1' },
                    }}
                  >
                    Đăng Tải Video Mới
                  </Button>
                  {videos.length > 0 && (
                    <Tooltip title="Xóa toàn bộ bài giảng video">
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={handleClearAllVideos}
                        startIcon={<Trash2 size={14} />}
                        sx={{
                          borderColor: 'rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                          borderRadius: 2,
                          '&:hover': { borderColor: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' },
                        }}
                      >
                        Xóa tất cả
                      </Button>
                    </Tooltip>
                  )}
                </>
              ) : (
                <Chip
                  icon={<GraduationCap size={16} color="#38bdf8" />}
                  label="Chế độ Học Sinh • Tự học & Ôn tập"
                  sx={{
                    bgcolor: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8',
                    fontWeight: 'bold',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    height: 38,
                    px: 1.5,
                    fontSize: '12px',
                  }}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Video Cinema Stage & Side Controls */}
      {selectedVideo ? (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            mb: 4,
            borderRadius: 3,
            bgcolor: '#0d1322',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          <Grid container spacing={2.5}>
            {/* Left/Main Column: In-Web Direct Video Player */}
            <Grid item xs={12} lg={theaterMode ? 12 : 8}>
              {/* Top Video Player Bar */}
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444', animation: 'pulse 2s infinite' }} />
                  <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8">
                    Đang phát trực tiếp trên Web (No-Redirect Player)
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Tooltip title={theaterMode ? 'Thu nhỏ khung nhìn' : 'Chế độ Rạp chiếu (Theater Mode)'}>
                    <IconButton
                      size="small"
                      onClick={() => setTheaterMode(!theaterMode)}
                      sx={{
                        color: theaterMode ? '#38bdf8' : 'text.secondary',
                        bgcolor: 'rgba(255,255,255,0.06)',
                        '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.2)' },
                      }}
                    >
                      {theaterMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Sao chép thông tin bài giảng">
                    <IconButton
                      size="small"
                      onClick={handleCopyShareLink}
                      sx={{
                        color: shareCopied ? '#10b981' : 'text.secondary',
                        bgcolor: 'rgba(255,255,255,0.06)',
                        '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.2)' },
                      }}
                    >
                      {shareCopied ? <Check size={16} /> : <Share2 size={16} />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              {/* Responsive 16:9 YouTube Iframe Container */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%', // 16:9 Aspect Ratio
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  bgcolor: '#000',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px rgba(56, 189, 248, 0.15)',
                }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                />
              </Box>

              {/* Video Title & Actions */}
              <Box sx={{ mt: 2.5 }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap={1}>
                  <Box sx={{ flex: 1, minWidth: 280 }}>
                    <Typography variant="h6" fontWeight="bold" color="white" sx={{ lineHeight: 1.35, mb: 1 }}>
                      {selectedVideo.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
                      <Chip
                        icon={<User size={14} color="#38bdf8" />}
                        label={selectedVideo.teacherName}
                        size="small"
                        sx={{ bgcolor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', fontWeight: 600 }}
                      />
                      <Chip
                        icon={CHAPTER_ICONS[selectedVideo.chapter] || <BookOpen size={14} />}
                        label={selectedVideo.chapter}
                        size="small"
                        sx={{ bgcolor: 'rgba(129, 140, 248, 0.12)', color: '#818cf8', fontWeight: 600 }}
                      />
                      {selectedVideo.duration && (
                        <Chip
                          icon={<Clock size={13} />}
                          label={selectedVideo.duration}
                          size="small"
                          sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)', color: 'text.secondary' }}
                        />
                      )}
                    </Stack>
                  </Box>

                  {isTeacher && (
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit size={15} />}
                        onClick={(e) => handleOpenEditModal(selectedVideo, e)}
                        sx={{
                          borderColor: 'rgba(56, 189, 248, 0.3)',
                          color: '#38bdf8',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)' },
                        }}
                      >
                        Sửa bài dạy
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<Trash2 size={15} />}
                        onClick={(e) => handleDeleteVideo(selectedVideo.id, e)}
                        sx={{
                          borderColor: 'rgba(239, 68, 68, 0.3)',
                          borderRadius: 2,
                          '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.15)' },
                        }}
                      >
                        Xóa
                      </Button>
                    </Stack>
                  )}
                </Box>

                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }} />

                {/* Description & Key Equations Box */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8" mb={1} display="flex" alignItems="center" gap={1}>
                    <FileText size={16} /> Miêu Tả & Mục Tiêu Bài Dạy
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                    {selectedVideo.description}
                  </Typography>

                  {/* Key reactions / formulas if available */}
                  {selectedVideo.keyReactions && selectedVideo.keyReactions.length > 0 && (
                    <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                      <Typography variant="caption" fontWeight="bold" color="#f59e0b" display="flex" alignItems="center" gap={0.8} mb={1}>
                        <Zap size={14} /> Công thức & Phương trình phản ứng cốt lõi:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.8}>
                        {selectedVideo.keyReactions.map((eq, i) => (
                          <Chip
                            key={i}
                            label={eq}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(245, 158, 11, 0.12)',
                              color: '#fbbf24',
                              border: '1px solid rgba(245, 158, 11, 0.3)',
                              fontFamily: 'monospace',
                              fontSize: 12,
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Tags */}
                  {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                    <Box sx={{ mt: 1.5 }}>
                      <Stack direction="row" spacing={0.8} flexWrap="wrap" gap={0.6}>
                        {selectedVideo.tags.map((t, idx) => (
                          <Chip
                            key={idx}
                            label={`#${t}`}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: 11,
                              bgcolor: 'rgba(255,255,255,0.05)',
                              color: 'text.secondary',
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Grid>

            {/* Right Column: Interactive Tabs (Playlist & Study Notes) */}
            <Grid item xs={12} lg={theaterMode ? 12 : 4}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2.5,
                  bgcolor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                }}
              >
                {/* Side Tabs Header */}
                <Tabs
                  value={activeSideTab}
                  onChange={(_, val) => setActiveSideTab(val)}
                  variant="fullWidth"
                  sx={{
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    bgcolor: 'rgba(0,0,0,0.2)',
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: 13,
                      color: 'text.secondary',
                      minHeight: 48,
                      '&.Mui-selected': { color: '#38bdf8' },
                    },
                    '& .MuiTabs-indicator': { bgcolor: '#38bdf8' },
                  }}
                >
                  <Tab value="playlist" label={`Danh Sách (${filteredVideos.length})`} icon={<Video size={16} />} iconPosition="start" />
                  <Tab value="notes" label="Ghi Chú Học Tập" icon={<Bookmark size={16} />} iconPosition="start" />
                </Tabs>

                {/* Tab 1: Video Playlist */}
                {activeSideTab === 'playlist' && (
                  <Box sx={{ p: 1.5, flex: 1, overflowY: 'auto', maxHeight: { xs: 400, lg: 650 } }}>
                    <Typography variant="caption" color="text.secondary" sx={{ px: 1, pb: 1, display: 'block' }}>
                      Nhấp vào bài giảng bên dưới để phát trực tiếp:
                    </Typography>
                    <Stack spacing={1}>
                      {filteredVideos.map((v) => {
                        const isPlaying = selectedVideo.id === v.id;
                        return (
                          <Paper
                            key={v.id}
                            onClick={() => setSelectedVideo(v)}
                            sx={{
                              p: 1.2,
                              borderRadius: 2,
                              cursor: 'pointer',
                              display: 'flex',
                              gap: 1.5,
                              alignItems: 'center',
                              bgcolor: isPlaying ? 'rgba(2, 132, 199, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                              border: isPlaying ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                              transition: 'all 0.2s',
                              '&:hover': {
                                bgcolor: isPlaying ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255, 255, 255, 0.07)',
                                transform: 'translateX(4px)',
                              },
                            }}
                          >
                            {/* Thumbnail Preview with Overlay */}
                            <Box
                              sx={{
                                position: 'relative',
                                width: 90,
                                height: 55,
                                borderRadius: 1.5,
                                overflow: 'hidden',
                                flexShrink: 0,
                                bgcolor: '#000',
                              }}
                            >
                              <img
                                src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                                alt={v.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                  // Fallback placeholder
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              <Box
                                sx={{
                                  position: 'absolute',
                                  inset: 0,
                                  bgcolor: isPlaying ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 0, 0, 0.3)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Play size={18} color="#fff" fill={isPlaying ? '#fff' : 'none'} />
                              </Box>
                              {v.duration && (
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    bottom: 2,
                                    right: 2,
                                    bgcolor: 'rgba(0,0,0,0.8)',
                                    color: '#fff',
                                    fontSize: 9,
                                    px: 0.5,
                                    borderRadius: 0.5,
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {v.duration}
                                </Box>
                              )}
                            </Box>

                            {/* Info */}
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="caption"
                                fontWeight="bold"
                                noWrap
                                sx={{
                                  display: 'block',
                                  color: isPlaying ? '#38bdf8' : 'text.primary',
                                  fontSize: 13,
                                }}
                              >
                                {v.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', fontSize: 11 }}>
                                {v.teacherName} • {v.chapter.split(':')[0]}
                              </Typography>
                            </Box>
                          </Paper>
                        );
                      })}
                    </Stack>
                  </Box>
                )}

                {/* Tab 2: Interactive Study Notes */}
                {activeSideTab === 'notes' && (
                  <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8">
                        Ghi Chú Cá Nhân Cho Video Này
                      </Typography>
                      <Button
                        size="small"
                        startIcon={noteCopied ? <Check size={14} /> : <Copy size={14} />}
                        onClick={handleCopyNote}
                        sx={{ fontSize: 11, color: noteCopied ? '#10b981' : 'text.secondary' }}
                      >
                        {noteCopied ? 'Đã chép' : 'Sao chép'}
                      </Button>
                    </Box>

                    <Typography variant="caption" color="text.secondary" mb={1.5}>
                      Ghi chép các mốc thời gian, công thức quan trọng hoặc dặn dò của giáo viên. Tự động lưu vào trình duyệt.
                    </Typography>

                    <TextField
                      multiline
                      rows={14}
                      fullWidth
                      placeholder="Ví dụ:
- Phút 05:20: Quy tắc Hund và orbital AO.
- Phút 12:40: Ví dụ viết cấu hình Fe (Z=26) -> 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²
- Bài tập về nhà: Làm bài 1, 2 trang 35 SGK Cánh Diều..."
                      value={userNote}
                      onChange={(e) => handleSaveNote(e.target.value)}
                      sx={{
                        flex: 1,
                        bgcolor: 'rgba(0,0,0,0.3)',
                        borderRadius: 2,
                        '& .MuiInputBase-input': {
                          fontSize: 13,
                          lineHeight: 1.6,
                          fontFamily: 'inherit',
                          color: '#e0f2fe',
                        },
                      }}
                    />
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      ) : null}

      {/* Video Filter & Search Controls */}
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
        <Grid container spacing={2} alignItems="center">
          {/* Search Bar */}
          <Grid item xs={12} md={isTeacher ? 5 : 7}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm bài giảng theo tên, giáo viên, từ khóa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#64748b" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <X size={16} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Grid>

          {/* Chapter Filter */}
          <Grid item xs={12} sm={6} md={isTeacher ? 4 : 5}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'text.secondary' }}>Lọc theo Chương học</InputLabel>
              <Select
                value={selectedChapter}
                label="Lọc theo Chương học"
                onChange={(e) => setSelectedChapter(e.target.value)}
                sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}
              >
                {CHAPTER_LIST.map((chap) => (
                  <MenuItem key={chap} value={chap}>
                    <Box display="flex" alignItems="center" gap={1}>
                      {CHAPTER_ICONS[chap] || <BookOpen size={16} />}
                      <Typography variant="body2">{chap}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Add Video Button (Only visible for Teachers) */}
          {isTeacher && (
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { sm: 'right' } }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Plus size={18} />}
                onClick={handleOpenAddModal}
                sx={{
                  height: 40,
                  borderColor: '#38bdf8',
                  color: '#38bdf8',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8' },
                }}
              >
                Thêm Bài Dạy Mới
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Video Gallery Grid */}
      <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold" color="white" display="flex" alignItems="center" gap={1}>
          <Video size={20} color="#38bdf8" /> Danh Sách Video Bài Dạy ({filteredVideos.length})
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Hiển thị theo chương trình Hóa học 10 GDPT 2018
        </Typography>
      </Box>

      {filteredVideos.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            textAlign: 'center',
            bgcolor: 'rgba(15, 23, 42, 0.6)',
            borderRadius: 3,
            border: '1px dashed rgba(255,255,255,0.15)',
          }}
        >
          <Youtube size={48} color="#64748b" style={{ margin: '0 auto 12px' }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Không tìm thấy bài giảng video nào phù hợp!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {isTeacher
              ? 'Bạn có thể thử tìm kiếm từ khóa khác hoặc bấm nút "Đăng Tải Video Mới" để bổ sung bài giảng.'
              : 'Hiện chưa có bài giảng nào trong mục này. Vui lòng chọn chương học khác hoặc tìm kiếm từ khóa khác.'}
          </Typography>
          {isTeacher && (
            <Button variant="contained" startIcon={<Plus size={18} />} onClick={handleOpenAddModal}>
              Đăng Tải Video Ngay
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={2.5}>
          {filteredVideos.map((video) => {
            const isSelected = selectedVideo?.id === video.id;
            return (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card
                  onClick={() => {
                    setSelectedVideo(video);
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }
                  }}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2.5,
                    bgcolor: isSelected ? 'rgba(2, 132, 199, 0.15)' : '#0f172a',
                    border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected ? '0 8px 24px rgba(2, 132, 199, 0.25)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: '#38bdf8',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.5), 0 0 15px rgba(56, 189, 248, 0.2)',
                    },
                  }}
                >
                  {/* Card Thumbnail */}
                  <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', bgcolor: '#000' }}>
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        '&:hover': { opacity: 1 },
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '50%',
                          bgcolor: 'rgba(2, 132, 199, 0.9)',
                          color: '#fff',
                          boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)',
                        }}
                      >
                        <Play size={24} fill="#fff" />
                      </Box>
                    </Box>

                    {/* Chapter badge top-left */}
                    <Chip
                      label={video.chapter.split(':')[0]}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        height: 22,
                        fontSize: 10,
                        fontWeight: 'bold',
                        bgcolor: 'rgba(9, 13, 22, 0.85)',
                        backdropFilter: 'blur(4px)',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                      }}
                    />

                    {/* Duration badge bottom-right */}
                    {video.duration && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          bgcolor: 'rgba(0, 0, 0, 0.85)',
                          color: '#fff',
                          fontSize: 10,
                          px: 0.8,
                          py: 0.2,
                          borderRadius: 1,
                          fontWeight: 'bold',
                        }}
                      >
                        {video.duration}
                      </Box>
                    )}
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="white"
                      sx={{
                        lineHeight: 1.4,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: 40,
                      }}
                    >
                      {video.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.5,
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1,
                      }}
                    >
                      {video.description}
                    </Typography>

                    <Divider sx={{ mb: 1.5, borderColor: 'rgba(255,255,255,0.06)' }} />

                    {/* Teacher & Actions footer */}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 22, height: 22, fontSize: 10, bgcolor: '#0284c7' }}>
                          {video.teacherName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 160 }}>
                          {video.teacherName}
                        </Typography>
                      </Box>

                      {isTeacher && (
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Chỉnh sửa bài giảng">
                            <IconButton
                              size="small"
                              onClick={(e) => handleOpenEditModal(video, e)}
                              sx={{ color: 'text.secondary', '&:hover': { color: '#38bdf8' } }}
                            >
                              <Edit size={15} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa bài giảng">
                            <IconButton
                              size="small"
                              onClick={(e) => handleDeleteVideo(video.id, e)}
                              sx={{ color: 'text.secondary', '&:hover': { color: '#ef4444' } }}
                            >
                              <Trash2 size={15} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Modal / Dialog: Upload / Edit YouTube Lecture */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0f172a',
            backgroundImage: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                display: 'flex',
              }}
            >
              <Youtube size={22} color="#ef4444" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="white">
                {editingVideoId ? 'Chỉnh Sửa Video Bài Dạy' : 'Đăng Tải Link Video YouTube Mới'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Hệ thống tự động nhận diện ID và nhúng phát trực tiếp trên Web
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={() => setModalOpen(false)} size="small" sx={{ color: 'text.secondary' }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        <DialogContent sx={{ pt: 2.5 }}>
          {validationError && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }} onClose={() => setValidationError(null)}>
              {validationError}
            </Alert>
          )}

          <Grid container spacing={2.5}>
            {/* YouTube Link Input */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight="bold" color="#38bdf8" mb={0.5} display="block">
                Đường Dẫn (URL) Video Bài Giảng Trên YouTube *
              </Typography>
              <TextField
                fullWidth
                placeholder="Dán link YouTube (Ví dụ: https://www.youtube.com/watch?v=b_7i011j6o4 hoặc https://youtu.be/...)"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setValidationError(null);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Youtube size={18} color="#ef4444" />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Hỗ trợ mọi định dạng: youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/...
              </Typography>
            </Grid>

            {/* Live Preview Thumbnail if valid ID */}
            {previewYouTubeId && (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(2, 132, 199, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 70,
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      flexShrink: 0,
                      bgcolor: '#000',
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${previewYouTubeId}/hqdefault.jpg`}
                      alt="Thumbnail preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Box>
                    <Chip label="Đã nhận diện YouTube Video ID" size="small" color="success" sx={{ height: 20, fontSize: 10, mb: 0.5 }} />
                    <Typography variant="body2" fontWeight="bold" color="white">
                      Mã Video: {previewYouTubeId}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Video sẽ được nhúng phát mượt mà không cần chuyển hướng tab.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            )}

            {/* Title Input */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight="bold" color="#38bdf8" mb={0.5} display="block">
                Tiêu Đề Bài Giảng *
              </Typography>
              <TextField
                fullWidth
                placeholder="Ví dụ: Chương 1 - Bài 2: Cấu trúc hạt nhân và vỏ nguyên tử"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>

            {/* Chapter Selection */}
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" fontWeight="bold" color="#38bdf8" mb={0.5} display="block">
                Chương / Chủ Đề Học Tập *
              </Typography>
              <FormControl fullWidth>
                <Select value={chapterInput} onChange={(e) => setChapterInput(e.target.value)}>
                  {CHAPTER_LIST.filter((c) => c !== 'Tất cả chương').map((chap) => (
                    <MenuItem key={chap} value={chap}>
                      {chap}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Teacher Name */}
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" fontWeight="bold" color="#38bdf8" mb={0.5} display="block">
                Giáo Viên / Giảng Viên Giảng Dạy
              </Typography>
              <TextField
                fullWidth
                placeholder="Ví dụ: Thầy Cô Nguyễn Văn A - Tổ Hóa THPT"
                value={teacherInput}
                onChange={(e) => setTeacherInput(e.target.value)}
              />
            </Grid>

            {/* Grade & Duration */}
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" fontWeight="bold" color="#38bdf8" mb={0.5} display="block">
                Khối Lớp
              </Typography>
              <FormControl fullWidth>
                <Select value={gradeInput} onChange={(e) => setGradeInput(e.target.value)}>
                  <MenuItem value="10">Hóa Học Lớp 10 (GDPT 2018)</MenuItem>
                  <MenuItem value="11">Hóa Học Lớp 11 (GDPT 2018)</MenuItem>
                  <MenuItem value="12">Hóa Học Lớp 12 (GDPT 2018)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" fontWeight="bold" color="#38bdf8" mb={0.5} display="block">
                Thời Lượng Dự Kiến (phút:giây)
              </Typography>
              <TextField
                fullWidth
                placeholder="Ví dụ: 35:20 hoặc 45 phút"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
              />
            </Grid>

            {/* Description with AI Assistant Button */}
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" fontWeight="bold" color="#38bdf8">
                  Miêu Tả Chi Tiết & Mục Tiêu Bài Dạy *
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  startIcon={<Sparkles size={14} color="#a855f7" />}
                  onClick={handleAiGenerateDescription}
                  disabled={isAiGenerating}
                  sx={{
                    color: '#a855f7',
                    fontWeight: 'bold',
                    fontSize: 12,
                    '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.15)' },
                  }}
                >
                  {isAiGenerating ? 'AI Đang soạn tóm tắt...' : 'AI Soạn Tóm Tắt & Mục Tiêu'}
                </Button>
              </Box>
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Nhập nội dung tóm tắt, mục tiêu cần đạt, kiến thức trọng tâm hoặc bấm nút 'AI Soạn Tóm Tắt' bên trên..."
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
              />
            </Grid>

            {/* Key Reactions / Equations */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight="bold" color="#f59e0b" mb={0.5} display="block">
                Công Thức & Phương Trình Hóa Học Trọng Tâm (Mỗi dòng 1 phương trình)
              </Typography>
              <TextField
                multiline
                rows={2}
                fullWidth
                placeholder="Ví dụ:
Fe + 2HCl → FeCl₂ + H₂↑
ΔᵣH°₂₉₈ = ΣΔᵪH°(sp) - ΣΔᵪH°(cđ)"
                value={keyReactionsInput}
                onChange={(e) => setKeyReactionsInput(e.target.value)}
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight="bold" color="#38bdf8" mb={0.5} display="block">
                Từ Khóa / Thẻ Chủ Đề (Phân cách bởi dấu phẩy)
              </Typography>
              <TextField
                fullWidth
                placeholder="Ví dụ: Cấu hình electron, Bảng tuần hoàn, Oxi hóa khử, Thí nghiệm..."
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setModalOpen(false)} sx={{ color: 'text.secondary' }}>
            Hủy Bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveVideoLecture}
            sx={{
              bgcolor: '#0284c7',
              color: '#fff',
              fontWeight: 'bold',
              px: 3,
              '&:hover': { bgcolor: '#0369a1' },
            }}
          >
            {editingVideoId ? 'Lưu Thay Đổi' : 'Đăng Tải Bài Dạy'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
