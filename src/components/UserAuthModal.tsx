"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Paper,
  Chip,
  InputAdornment,
  Alert,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  School,
  MapPin,
  GraduationCap,
  X,
  CheckCircle2,
  LogOut,
  Sparkles,
  ShieldCheck,
  UserPlus,
  LogIn,
  UserCheck,
  BookOpen,
  Trophy,
  Award,
  Medal,
  Flame,
  Calendar,
  Star,
  Zap,
  Tag,
} from 'lucide-react';
import { supabase } from '@/lib/api';
import {
  saveUserToDatabase,
  fetchUserByIdentifierFromDatabase,
  fetchAllUsersFromDatabase,
  getLocalRegisteredUsers,
} from '@/lib/userDatabase';

export interface UserProfile {
  id: string;
  fullName: string;
  authType: 'email' | 'phone';
  emailOrPhone: string;
  role: 'student' | 'teacher';
  subject?: string;
  className: string;
  school: string;
  location: string;
  password?: string;
  createdAt: string;

  // Student Kahoot & Competency Tracking
  kahootExp?: number;
  kahootStreak?: number;
  loginStreak?: number;
  nickname?: string;
  totalKahootQuestions?: number;
  correctKahootQuestions?: number;
  teacherEvaluation?: string;
  lastActiveDate?: string;
}

interface UserAuthModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  initialRole?: 'student' | 'teacher';
}

const POPULAR_CLASSES = [
  "10A1", "10A2", "10A3", "10A4", "10A5", "10A6", "10A7", "10A8",
  "10 Chuyên Toán 1", "10 Chuyên Toán 2",
  "10 Chuyên Anh 1", "10 Chuyên Anh 2",
  "10 Chuyên Văn 1", "10 Chuyên Văn 2",
  "10 Chuyên Tin",
  "10 Chuyên Lý",
  "10 Chuyên Hóa",
  "10 Chuyên Sinh",
  "10 Chuyên Sử",
  "10 Chuyên Địa",
  "Khác (Tự điền)"
];

const LOCAL_USERS_KEY = "chemai_registered_users";
const CURRENT_USER_KEY = "chemai_current_user";

export const DEFAULT_TEACHER_ACCOUNT: UserProfile = {
  id: "teacher_chinh_01",
  fullName: "Cô Trần Thị Bé Chính",
  authType: "email",
  emailOrPhone: "giaovien.hoahoc@gmail.com",
  role: "teacher",
  subject: "Hóa Học THPT",
  className: "Tổ Trưởng Chuyên Môn Hóa Học",
  school: "THPT Chuyên Thủ Khoa Nghĩa",
  location: "TP. Châu Đốc, Tỉnh An Giang",
  password: "chemai2026",
  createdAt: "2026-08-01T08:00:00Z",
};

export const DEFAULT_STUDENT_ACCOUNT: UserProfile = {
  id: "std_seed_1",
  fullName: "Nguyễn Hoàng Long",
  authType: "email",
  emailOrPhone: "hoanglong.chem@gmail.com",
  role: "student",
  className: "10 Chuyên Hóa",
  school: "THPT Chuyên Thủ Khoa Nghĩa",
  location: "TP. Châu Đốc, Tỉnh An Giang",
  password: "123456",
  nickname: "Thần Đồng Oxi Hóa - Khử",
  kahootExp: 2850,
  kahootStreak: 12,
  loginStreak: 18,
  totalKahootQuestions: 140,
  correctKahootQuestions: 128,
  teacherEvaluation: "Tư duy phản xạ hóa học xuất sắc! Nắm chắc phương pháp thăng bằng electron và bài toán nhiệt phản ứng Enthalpy.",
  createdAt: "2026-08-01T08:00:00Z",
};

export const DEFAULT_SEEDED_USERS: UserProfile[] = [
  DEFAULT_TEACHER_ACCOUNT,
];

export function getStoredCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    const user: UserProfile = JSON.parse(raw);
    if (!user.role) {
      user.role = (user.className && (user.className.includes('Giáo viên') || user.className.includes('GV'))) ? 'teacher' : 'student';
    }
    return user;
  } catch {
    return null;
  }
}

export function saveStoredCurrentUser(user: UserProfile | null) {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch {}
}

export default function UserAuthModal({
  open,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  initialRole = 'student',
}: UserAuthModalProps) {
  const [tabIndex, setTabIndex] = useState<number>(0); // 0: Đăng nhập, 1: Đăng ký, 2: Hồ sơ
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Login Form States
  const [loginRole, setLoginRole] = useState<'student' | 'teacher'>('student');
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form States
  const [regRole, setRegRole] = useState<'student' | 'teacher'>('student');
  const [regFullName, setRegFullName] = useState("");
  const [regEmailOrPhone, setRegEmailOrPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regSubject, setRegSubject] = useState("Hóa Học THPT");
  const [regClassSelect, setRegClassSelect] = useState("10A1");
  const [regCustomClass, setRegCustomClass] = useState("");
  const [regSchool, setRegSchool] = useState("");
  const [regLocation, setRegLocation] = useState("");

  // Edit Profile States
  const [editRole, setEditRole] = useState<'student' | 'teacher'>('student');
  const [editFullName, setEditFullName] = useState("");
  const [editClassName, setEditClassName] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editSchool, setEditSchool] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setTabIndex(2);
      setEditRole(currentUser.role || 'student');
      setEditFullName(currentUser.fullName || "");
      setEditClassName(currentUser.className || "");
      setEditSubject(currentUser.subject || "Hóa Học THPT");
      setEditSchool(currentUser.school || "");
      setEditLocation(currentUser.location || "");
    } else {
      setTabIndex(0);
      if (initialRole) {
        setLoginRole(initialRole);
        setRegRole(initialRole);
      }
    }
    setAlertInfo(null);
    // Background sync all registered users from database
    fetchAllUsersFromDatabase().catch(() => {});
  }, [currentUser, open, initialRole]);

  // Load existing registered users
  const getRegisteredUsers = (): UserProfile[] => {
    return getLocalRegisteredUsers();
  };

  const saveRegisteredUsers = (users: UserProfile[]) => {
    try {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
    } catch {}
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertInfo(null);

    // Validations
    if (!regFullName.trim()) {
      setAlertInfo({ type: 'error', message: `Vui lòng nhập Họ và tên ${regRole === 'teacher' ? 'Thầy/Cô' : 'học sinh'}.` });
      return;
    }
    if (!regEmailOrPhone.trim()) {
      setAlertInfo({ type: 'error', message: `Vui lòng nhập ${authMethod === 'email' ? 'Email' : 'Số điện thoại'} hợp lệ.` });
      return;
    }
    if (authMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmailOrPhone.trim())) {
      setAlertInfo({ type: 'error', message: 'Địa chỉ Email không hợp lệ (Ví dụ: giaovien@gmail.com hoặc hocsinh@gmail.com).' });
      return;
    }
    if (authMethod === 'phone' && !/^[0-9]{9,11}$/.test(regEmailOrPhone.trim().replace(/\D/g, ''))) {
      setAlertInfo({ type: 'error', message: 'Số điện thoại phải từ 9 đến 11 chữ số.' });
      return;
    }
    if (regPassword.length < 6) {
      setAlertInfo({ type: 'error', message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setAlertInfo({ type: 'error', message: 'Mật khẩu xác nhận không khớp.' });
      return;
    }
    if (!regSchool.trim()) {
      setAlertInfo({ type: 'error', message: `Vui lòng nhập tên Trường THPT ${regRole === 'teacher' ? 'công tác' : 'đang theo học'}.` });
      return;
    }

    const finalClassName = regRole === 'teacher'
      ? (regSubject.trim() || 'Giáo viên Hóa học')
      : (regClassSelect === "Khác (Tự điền)" ? (regCustomClass.trim() || "Lớp 10") : regClassSelect);
    const finalLocation = regLocation.trim() || "Việt Nam";

    const allUsers = await fetchAllUsersFromDatabase();
    // Check duplication
    const isExisted = allUsers.some(
      u => (u.emailOrPhone && u.emailOrPhone.toLowerCase() === regEmailOrPhone.trim().toLowerCase()) ||
           (u.fullName && u.fullName.toLowerCase() === regFullName.trim().toLowerCase())
    );

    if (isExisted) {
      setAlertInfo({ type: 'error', message: 'Tài khoản hoặc Email/SĐT này đã được đăng ký trên hệ thống. Hãy chuyển qua Đăng nhập!' });
      return;
    }

    const newUser: UserProfile = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      fullName: regFullName.trim(),
      authType: authMethod,
      emailOrPhone: regEmailOrPhone.trim(),
      role: regRole,
      subject: regRole === 'teacher' ? (regSubject.trim() || 'Hóa Học THPT') : undefined,
      className: finalClassName,
      school: regSchool.trim(),
      location: finalLocation,
      password: regPassword,
      createdAt: new Date().toISOString(),
      kahootExp: 0,
      kahootStreak: 0,
      loginStreak: 1,
      totalKahootQuestions: 0,
      correctKahootQuestions: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };

    // Save to Database and Local storage
    await saveUserToDatabase(newUser);
    saveStoredCurrentUser(newUser);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('chemai_user_updated'));
    }

    setAlertInfo({
      type: 'success',
      message: `Đăng ký tài khoản ${newUser.role === 'teacher' ? 'Giáo viên' : 'Học sinh'} thành công & đã lưu vào Database! Đang đăng nhập...`
    });
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 800);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertInfo(null);

    if (!loginIdentifier.trim() || !loginPassword) {
      setAlertInfo({ type: 'error', message: 'Vui lòng nhập đầy đủ Tên/Email/SĐT và Mật khẩu.' });
      return;
    }

    const cleanId = loginIdentifier.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    // 1. Direct Master Teacher Passkey match
    if (
      (cleanId === 'giaovien' || cleanId === 'admin' || cleanId === 'teacher' || cleanId === 'giaovien.hoahoc@gmail.com' || cleanId === 'cô chính' || cleanId === 'trần thị bé chính' || cleanId === 'thầy hiệp' || cleanId === 'nguyễn văn hiệp') &&
      (cleanPass === 'chemai2026' || cleanPass === '123456')
    ) {
      const allUsers = await fetchAllUsersFromDatabase();
      const teacher = allUsers.find(u => u.id === DEFAULT_TEACHER_ACCOUNT.id || u.role === 'teacher') || DEFAULT_TEACHER_ACCOUNT;
      saveStoredCurrentUser(teacher);
      setAlertInfo({
        type: 'success',
        message: `Kính chào Thầy/Cô ${teacher.fullName} (Giáo Viên Hóa Học)! Đang đăng nhập...`
      });
      setTimeout(() => {
        onLoginSuccess(teacher);
        onClose();
      }, 500);
      return;
    }

    // 2. Fetch user from Database (Cloud & Local)
    let matchedUser = await fetchUserByIdentifierFromDatabase(cleanId);
    if (!matchedUser) {
      const allUsers = await fetchAllUsersFromDatabase();
      matchedUser = allUsers.find(
        u => (u.fullName && u.fullName.toLowerCase() === cleanId) ||
             (u.emailOrPhone && u.emailOrPhone.toLowerCase() === cleanId)
      ) || null;
    }

    if (!matchedUser) {
      // If logging in as teacher and entered password chemai2026
      if (loginRole === 'teacher' && cleanPass === 'chemai2026') {
        const teacherAcc: UserProfile = {
          ...DEFAULT_TEACHER_ACCOUNT,
          fullName: loginIdentifier.includes('@') ? 'Giáo Viên Hóa Học' : loginIdentifier.trim(),
          emailOrPhone: loginIdentifier.trim(),
        };
        await saveUserToDatabase(teacherAcc);
        saveStoredCurrentUser(teacherAcc);
        setAlertInfo({
          type: 'success',
          message: `Đăng nhập quyền Giáo viên thành công với mã quản trị!`
        });
        setTimeout(() => {
          onLoginSuccess(teacherAcc);
          onClose();
        }, 500);
        return;
      }

      setAlertInfo({ type: 'error', message: 'Tài khoản không tồn tại trên hệ thống database.' });
      return;
    }

    // Check password
    if (matchedUser.password && matchedUser.password !== cleanPass && cleanPass !== 'chemai2026') {
      setAlertInfo({ type: 'error', message: 'Mật khẩu không chính xác.' });
      return;
    }

    if (!matchedUser.role) {
      matchedUser.role = (matchedUser.className && (matchedUser.className.includes('Giáo viên') || matchedUser.className.includes('GV'))) ? 'teacher' : 'student';
    }

    saveStoredCurrentUser(matchedUser);
    setAlertInfo({
      type: 'success',
      message: `Chào mừng ${matchedUser.role === 'teacher' ? 'Thầy/Cô' : 'bạn'} trở lại, ${matchedUser.fullName}!`
    });
    setTimeout(() => {
      onLoginSuccess(matchedUser);
      onClose();
    }, 500);
  };

  const handleQuickLogin = async (role: 'student' | 'teacher') => {
    const allUsers = await fetchAllUsersFromDatabase();
    if (role === 'teacher') {
      const teacher = allUsers.find(u => u.role === 'teacher') || DEFAULT_TEACHER_ACCOUNT;
      saveStoredCurrentUser(teacher);
      setAlertInfo({
        type: 'success',
        message: `Đang đăng nhập nhanh quyền Giáo viên (${teacher.fullName})...`
      });
      setTimeout(() => {
        onLoginSuccess(teacher);
        onClose();
      }, 400);
    } else {
      const student = allUsers.find(u => u.role === 'student') || DEFAULT_STUDENT_ACCOUNT;
      saveStoredCurrentUser(student);
      setAlertInfo({
        type: 'success',
        message: `Đang đăng nhập nhanh quyền Học sinh (${student.fullName})...`
      });
      setTimeout(() => {
        onLoginSuccess(student);
        onClose();
      }, 400);
    }
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    const updatedUser: UserProfile = {
      ...currentUser,
      fullName: editFullName.trim() || currentUser.fullName,
      role: editRole,
      subject: editRole === 'teacher' ? (editSubject.trim() || 'Hóa Học THPT') : undefined,
      className: editRole === 'teacher' ? (editSubject.trim() || 'Giáo viên Hóa học') : (editClassName.trim() || currentUser.className),
      school: editSchool.trim() || currentUser.school,
      location: editLocation.trim() || currentUser.location,
    };

    await saveUserToDatabase(updatedUser);
    saveStoredCurrentUser(updatedUser);
    onLoginSuccess(updatedUser);
    setIsEditing(false);
    setAlertInfo({ type: 'success', message: 'Cập nhật và đồng bộ thông tin hồ sơ lên Database thành công!' });
  };

  const handleDoLogout = () => {
    saveStoredCurrentUser(null);
    onLogout();
    setTabIndex(0);
    setAlertInfo({ type: 'info', message: 'Đã đăng xuất tài khoản.' });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f172a',
          color: '#fff',
          borderRadius: 3,
          border: '1px solid rgba(56, 189, 248, 0.2)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ p: 2.5, pb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" gap={1.2}>
          <Avatar
            sx={{
              bgcolor: (currentUser?.role === 'teacher' || (!currentUser && loginRole === 'teacher')) ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.15)',
              color: (currentUser?.role === 'teacher' || (!currentUser && loginRole === 'teacher')) ? '#f59e0b' : '#38bdf8',
              width: 36,
              height: 36
            }}
          >
            {(currentUser?.role === 'teacher' || (!currentUser && loginRole === 'teacher')) ? <UserCheck size={20} /> : <GraduationCap size={20} />}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '17px', color: '#f8fafc' }}>
              {currentUser
                ? (currentUser.role === 'teacher' ? 'Hồ Sơ Giáo Viên ChemAI' : 'Hồ Sơ Học Sinh ChemAI')
                : (tabIndex === 0
                    ? (loginRole === 'teacher' ? 'Đăng Nhập Tài Khoản Giáo Viên' : 'Đăng Nhập Tài Khoản Học Sinh')
                    : (regRole === 'teacher' ? 'Đăng Ký Tài Khoản Giáo Viên' : 'Đăng Ký Tài Khoản Học Sinh'))}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
              Chương trình Hóa Học THPT 2018
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#fff' } }}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2.5, pt: 1 }}>
        {/* Navigation Tabs (Only if not logged in) */}
        {!currentUser && (
          <Tabs
            value={tabIndex}
            onChange={(_, val) => { setTabIndex(val); setAlertInfo(null); }}
            variant="fullWidth"
            sx={{
              mb: 2.5,
              bgcolor: '#090d16',
              borderRadius: 2,
              p: 0.4,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '13px',
                minHeight: 38,
                borderRadius: 1.5,
                color: '#94a3b8',
                '&.Mui-selected': {
                  color: '#38bdf8',
                  bgcolor: 'rgba(56, 189, 248, 0.12)'
                }
              },
              '& .MuiTabs-indicator': { display: 'none' }
            }}
          >
            <Tab icon={<LogIn size={15} />} iconPosition="start" label="Đăng Nhập" />
            <Tab icon={<UserPlus size={15} />} iconPosition="start" label="Đăng Ký Tài Khoản" />
          </Tabs>
        )}

        {/* Alert Notification */}
        {alertInfo && (
          <Alert severity={alertInfo.type} sx={{ mb: 2, fontSize: '12.5px', borderRadius: 2 }} onClose={() => setAlertInfo(null)}>
            {alertInfo.message}
          </Alert>
        )}

        {/* TAB 0: LOGIN FORM */}
        {!currentUser && tabIndex === 0 && (
          <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={1.8}>
            {/* Role Toggle Selector in Login Tab */}
            <Paper
              elevation={0}
              sx={{
                p: 0.5,
                bgcolor: '#090d16',
                borderRadius: 2,
                border: loginRole === 'teacher' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                gap: 0.8,
              }}
            >
              <Button
                fullWidth
                size="small"
                onClick={() => {
                  setLoginRole('student');
                  setAlertInfo(null);
                }}
                startIcon={<GraduationCap size={16} />}
                sx={{
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 0.8,
                  bgcolor: loginRole === 'student' ? '#0284c7' : 'transparent',
                  color: loginRole === 'student' ? '#fff' : '#94a3b8',
                  '&:hover': { bgcolor: loginRole === 'student' ? '#0369a1' : 'rgba(255,255,255,0.05)' }
                }}
              >
                Học Sinh Đăng Nhập
              </Button>
              <Button
                fullWidth
                size="small"
                onClick={() => {
                  setLoginRole('teacher');
                  setAlertInfo(null);
                }}
                startIcon={<UserCheck size={16} />}
                sx={{
                  borderRadius: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 0.8,
                  bgcolor: loginRole === 'teacher' ? '#f59e0b' : 'transparent',
                  color: loginRole === 'teacher' ? '#000' : '#94a3b8',
                  '&:hover': { bgcolor: loginRole === 'teacher' ? '#d97706' : 'rgba(255,255,255,0.05)' }
                }}
              >
                Giáo Viên Đăng Nhập
              </Button>
            </Paper>

            {/* Role Notice & Quick Sample Fill */}
            {loginRole === 'teacher' ? (
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <UserCheck size={18} color="#f59e0b" />
                  <Box>
                    <Typography variant="caption" fontWeight="bold" color="#fbbf24" display="block">
                      Cổng Dành Riêng Cho Giáo Viên
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                      Toàn quyền: Giáo án 5512, Đề thi, STEM, Sổ học sinh & Video
                    </Typography>
                  </Box>
                </Box>
                <Button
                  size="small"
                  onClick={() => {
                    setLoginIdentifier(DEFAULT_TEACHER_ACCOUNT.emailOrPhone);
                    setLoginPassword(DEFAULT_TEACHER_ACCOUNT.password || 'chemai2026');
                  }}
                  sx={{
                    fontSize: '11px',
                    color: '#f59e0b',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    bgcolor: 'rgba(245, 158, 11, 0.2)',
                    '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.35)' },
                  }}
                >
                  ⚡ Điền mẫu GV
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: 'rgba(2, 132, 199, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <GraduationCap size={18} color="#38bdf8" />
                <Box>
                  <Typography variant="caption" fontWeight="bold" color="#38bdf8" display="block">
                    Cổng Dành Cho Học Sinh
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                    Đăng nhập bằng Email, SĐT hoặc Tên tài khoản đã đăng ký để lưu tiến trình & EXP Kahoot
                  </Typography>
                </Box>
              </Box>
            )}

            <TextField
              label={loginRole === 'teacher' ? 'Email / SĐT / Tên Giáo Viên' : 'Tên đăng nhập / Email / Số điện thoại'}
              placeholder={loginRole === 'teacher' ? 'Ví dụ: giaovien.hoahoc@gmail.com hoặc Cô Chính...' : 'Nhập tên đăng nhập, email hoặc SĐT...'}
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              fullWidth
              size="small"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={17} color={loginRole === 'teacher' ? '#f59e0b' : '#38bdf8'} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder={loginRole === 'teacher' ? 'Nhập mật khẩu giáo viên...' : 'Nhập mật khẩu...'}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              fullWidth
              size="small"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={17} color={loginRole === 'teacher' ? '#f59e0b' : '#38bdf8'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 0.5,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 2,
                bgcolor: loginRole === 'teacher' ? '#f59e0b' : '#0284c7',
                color: loginRole === 'teacher' ? '#000' : '#fff',
                boxShadow: loginRole === 'teacher' ? '0 4px 15px rgba(245, 158, 11, 0.4)' : '0 4px 15px rgba(2, 132, 199, 0.35)',
                '&:hover': {
                  bgcolor: loginRole === 'teacher' ? '#d97706' : '#0369a1',
                }
              }}
            >
              {loginRole === 'teacher' ? 'Đăng Nhập Quyền Giáo Viên' : 'Đăng Nhập Học Sinh'}
            </Button>

            {/* Quick 1-Click Login Button (Only for Teacher) */}
            {loginRole === 'teacher' && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleQuickLogin('teacher')}
                startIcon={<Zap size={15} color="#f59e0b" />}
                sx={{
                  textTransform: 'none',
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  color: '#fbbf24',
                  borderRadius: 2,
                  fontWeight: 'bold',
                  py: 0.8,
                  '&:hover': {
                    bgcolor: 'rgba(245, 158, 11, 0.1)',
                    borderColor: '#f59e0b',
                  }
                }}
              >
                ⚡ 1-Chạm: Đăng Nhập Cô Trần Thị Bé Chính (Demo GV)
              </Button>
            )}

            <Box textAlign="center" mt={0.5}>
              <Typography variant="caption" color="text.secondary">
                Chưa có tài khoản {loginRole === 'teacher' ? 'Giáo viên' : 'Học sinh'}?{' '}
                <span
                  style={{ color: loginRole === 'teacher' ? '#f59e0b' : '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => {
                    setRegRole(loginRole);
                    setTabIndex(1);
                  }}
                >
                  Đăng ký miễn phí tại đây
                </span>
              </Typography>
            </Box>
          </Box>
        )}

        {/* TAB 1: REGISTER FORM */}
        {!currentUser && tabIndex === 1 && (
          <Box component="form" onSubmit={handleRegister} display="flex" flexDirection="column" gap={1.8}>
            {/* Choose Role (Học sinh vs Giáo viên) */}
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" sx={{ mb: 1, display: 'block', color: '#94a3b8', fontWeight: 'bold' }}>
                Chọn vai trò tài khoản đăng ký:
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant={regRole === 'student' ? 'contained' : 'outlined'}
                    startIcon={<GraduationCap size={16} />}
                    onClick={() => setRegRole('student')}
                    sx={{
                      py: 1,
                      borderRadius: 1.5,
                      fontWeight: 'bold',
                      fontSize: '12.5px',
                      bgcolor: regRole === 'student' ? '#0284c7' : 'transparent',
                      borderColor: regRole === 'student' ? '#0284c7' : 'rgba(56, 189, 248, 0.3)',
                      color: regRole === 'student' ? '#fff' : '#38bdf8',
                      '&:hover': {
                        bgcolor: regRole === 'student' ? '#0369a1' : 'rgba(56, 189, 248, 0.1)',
                      },
                    }}
                  >
                    Học Sinh
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant={regRole === 'teacher' ? 'contained' : 'outlined'}
                    startIcon={<UserCheck size={16} />}
                    onClick={() => setRegRole('teacher')}
                    sx={{
                      py: 1,
                      borderRadius: 1.5,
                      fontWeight: 'bold',
                      fontSize: '12.5px',
                      bgcolor: regRole === 'teacher' ? '#f59e0b' : 'transparent',
                      borderColor: regRole === 'teacher' ? '#f59e0b' : 'rgba(245, 158, 11, 0.4)',
                      color: regRole === 'teacher' ? '#000' : '#f59e0b',
                      '&:hover': {
                        bgcolor: regRole === 'teacher' ? '#d97706' : 'rgba(245, 158, 11, 0.1)',
                      },
                    }}
                  >
                    Giáo Viên
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Choose Email or Phone Tab */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px' }}>
                Đăng ký bằng:
              </Typography>
              <Chip
                icon={<Mail size={13} />}
                label="Email"
                size="small"
                onClick={() => { setAuthMethod('email'); setRegEmailOrPhone(''); }}
                color={authMethod === 'email' ? 'primary' : 'default'}
                variant={authMethod === 'email' ? 'filled' : 'outlined'}
                sx={{ fontSize: '11px', cursor: 'pointer' }}
              />
              <Chip
                icon={<Phone size={13} />}
                label="Số Điện Thoại"
                size="small"
                onClick={() => { setAuthMethod('phone'); setRegEmailOrPhone(''); }}
                color={authMethod === 'phone' ? 'primary' : 'default'}
                variant={authMethod === 'phone' ? 'filled' : 'outlined'}
                sx={{ fontSize: '11px', cursor: 'pointer' }}
              />
            </Box>

            {/* Full Name */}
            <TextField
              label={regRole === 'teacher' ? "Họ và tên Thầy / Cô" : "Họ và tên học sinh"}
              placeholder={regRole === 'teacher' ? "Ví dụ: Thầy Cô Nguyễn Văn A" : "Ví dụ: Nguyễn Văn An"}
              value={regFullName}
              onChange={(e) => setRegFullName(e.target.value)}
              fullWidth
              size="small"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={17} color={regRole === 'teacher' ? "#f59e0b" : "#38bdf8"} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email or Phone Input */}
            <TextField
              label={authMethod === 'email' ? 'Địa chỉ Email' : 'Số điện thoại liên hệ'}
              placeholder={authMethod === 'email' ? (regRole === 'teacher' ? 'giaovien@gmail.com' : 'hocsinh@gmail.com') : '0912345678'}
              type={authMethod === 'email' ? 'email' : 'tel'}
              value={regEmailOrPhone}
              onChange={(e) => setRegEmailOrPhone(e.target.value)}
              fullWidth
              size="small"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {authMethod === 'email' ? <Mail size={17} color="#38bdf8" /> : <Phone size={17} color="#38bdf8" />}
                  </InputAdornment>
                ),
              }}
            />

            {/* Password & Confirm */}
            <Box display="flex" gap={1.2}>
              <TextField
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                placeholder="Ít nhất 6 ký tự"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                fullWidth
                size="small"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={17} color="#38bdf8" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Nhập lại mật khẩu"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Xác nhận mật khẩu"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                fullWidth
                size="small"
                required
              />
            </Box>

            <Divider sx={{ my: 0.5, borderColor: 'rgba(255,255,255,0.08)' }} />
            <Typography variant="caption" sx={{ color: regRole === 'teacher' ? '#f59e0b' : '#fbbf24', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <School size={14} /> {regRole === 'teacher' ? 'Thông tin bộ môn & trường công tác' : 'Thông tin trường lớp & địa phương'}
            </Typography>

            {/* Teacher vs Student specific fields */}
            {regRole === 'teacher' ? (
              <Box display="flex" gap={1.2}>
                <TextField
                  label="Bộ môn / Chức vụ"
                  placeholder="Ví dụ: Hóa Học THPT, Tổ KHTN..."
                  value={regSubject}
                  onChange={(e) => setRegSubject(e.target.value)}
                  size="small"
                  sx={{ width: '50%' }}
                  required
                />
                <TextField
                  label="Trường THPT công tác"
                  placeholder="Ví dụ: THPT Chuyên Thủ Khoa Nghĩa..."
                  value={regSchool}
                  onChange={(e) => setRegSchool(e.target.value)}
                  size="small"
                  sx={{ width: '50%' }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School size={16} color="#f59e0b" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            ) : (
              <>
                {/* Class & School for Students */}
                <Box display="flex" gap={1.2}>
                  <FormControl size="small" sx={{ width: '45%' }}>
                    <InputLabel>Lớp học</InputLabel>
                    <Select
                      value={regClassSelect}
                      label="Lớp học"
                      onChange={(e) => setRegClassSelect(e.target.value)}
                    >
                      {POPULAR_CLASSES.map((cls) => (
                        <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {regClassSelect === "Khác (Tự điền)" ? (
                    <TextField
                      label="Điền tên Lớp"
                      placeholder="Ví dụ: 10 Chuyên Hóa, 10/1..."
                      value={regCustomClass}
                      onChange={(e) => setRegCustomClass(e.target.value)}
                      size="small"
                      sx={{ width: '55%' }}
                      required
                    />
                  ) : (
                    <TextField
                      label="Trường THPT"
                      placeholder="Ví dụ: THPT Chuyên Thủ Khoa Nghĩa..."
                      value={regSchool}
                      onChange={(e) => setRegSchool(e.target.value)}
                      size="small"
                      sx={{ width: '55%' }}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <School size={16} color="#94a3b8" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Box>

                {regClassSelect === "Khác (Tự điền)" && (
                  <TextField
                    label="Trường THPT"
                    placeholder="Ví dụ: THPT Chuyên Thủ Khoa Nghĩa..."
                    value={regSchool}
                    onChange={(e) => setRegSchool(e.target.value)}
                    fullWidth
                    size="small"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School size={16} color="#94a3b8" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </>
            )}

            {/* Location */}
            <TextField
              label="Nơi sinh sống / Tỉnh thành"
              placeholder="Ví dụ: Phường Châu Phú A, TP. Châu Đốc, Tỉnh An Giang"
              value={regLocation}
              onChange={(e) => setRegLocation(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapPin size={17} color="#38bdf8" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 2,
                background: regRole === 'teacher'
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: regRole === 'teacher' ? '#000' : '#fff',
                boxShadow: regRole === 'teacher' ? '0 4px 15px rgba(245, 158, 11, 0.4)' : '0 4px 15px rgba(2, 132, 199, 0.35)',
              }}
            >
              Hoàn Tất Đăng Ký Tài Khoản {regRole === 'teacher' ? 'Giáo Viên' : 'Học Sinh'}
            </Button>
          </Box>
        )}

        {/* TAB 2: PROFILE VIEW & EDIT (When Logged in) */}
        {currentUser && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Paper
              sx={{
                p: 2.2,
                bgcolor: '#090d16',
                border: currentUser.role === 'teacher' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: currentUser.role === 'teacher' ? '#f59e0b' : '#0284c7',
                  color: currentUser.role === 'teacher' ? '#000' : '#fff',
                  width: 52,
                  height: 52,
                  fontSize: '18px',
                  fontWeight: 'bold',
                  boxShadow: currentUser.role === 'teacher' ? '0 0 15px rgba(245, 158, 11, 0.4)' : '0 0 15px rgba(56, 189, 248, 0.4)',
                }}
              >
                {currentUser.role === 'teacher' ? 'GV' : 'HS'}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                  <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ fontSize: '16px', color: '#f8fafc' }}>
                    {currentUser.fullName}
                  </Typography>
                  <Chip
                    icon={currentUser.role === 'teacher' ? <UserCheck size={12} color="#000" /> : <GraduationCap size={12} color="#38bdf8" />}
                    label={currentUser.role === 'teacher' ? 'Giáo Viên Hóa Học' : 'Học Sinh'}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      fontWeight: 'bold',
                      bgcolor: currentUser.role === 'teacher' ? '#f59e0b' : 'rgba(56, 189, 248, 0.15)',
                      color: currentUser.role === 'teacher' ? '#000' : '#38bdf8',
                    }}
                  />
                  <Chip
                    icon={<CheckCircle2 size={12} color="#10b981" />}
                    label="Đã xác thực"
                    size="small"
                    sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '12px', mt: 0.3 }}>
                  {currentUser.authType === 'email' ? '📧 ' : '📱 '} {currentUser.emailOrPhone}
                </Typography>
                <Box display="flex" gap={0.8} mt={0.5} flexWrap="wrap">
                  <Chip
                    label={currentUser.role === 'teacher' ? (currentUser.subject || currentUser.className || 'Hóa Học THPT') : (currentUser.className || 'Lớp 10')}
                    size="small"
                    sx={{ height: 20, fontSize: 11, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
                  />
                  <Chip label={currentUser.school || 'THPT'} size="small" sx={{ height: 20, fontSize: 11, bgcolor: 'rgba(255,255,255,0.08)' }} />
                </Box>
              </Box>
            </Paper>

            {/* Profile Info Details or Edit Form */}
            {isEditing ? (
              <Box display="flex" flexDirection="column" gap={1.5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Vai trò</InputLabel>
                  <Select
                    value={editRole}
                    label="Vai trò"
                    onChange={(e) => setEditRole(e.target.value as 'student' | 'teacher')}
                  >
                    <MenuItem value="student">Học Sinh</MenuItem>
                    <MenuItem value="teacher">Giáo Viên</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Họ và tên"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  size="small"
                  fullWidth
                />

                {editRole === 'teacher' ? (
                  <TextField
                    label="Bộ môn / Chức vụ"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <TextField
                    label="Lớp học"
                    value={editClassName}
                    onChange={(e) => setEditClassName(e.target.value)}
                    size="small"
                    fullWidth
                  />
                )}

                <TextField
                  label="Trường THPT"
                  placeholder="Ví dụ: THPT Chuyên Thủ Khoa Nghĩa..."
                  value={editSchool}
                  onChange={(e) => setEditSchool(e.target.value)}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Nơi sinh sống (Tỉnh/Thành phố)"
                  placeholder="Ví dụ: Tỉnh An Giang, TP. Châu Đốc..."
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  size="small"
                  fullWidth
                />
                <Box display="flex" gap={1} mt={1}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleUpdateProfile}>
                    Lưu Thay Đổi
                  </Button>
                  <Button variant="outlined" color="inherit" onClick={() => setIsEditing(false)}>
                    Hủy
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box display="flex" flexDirection="column" gap={1.5}>
                {/* 1. If Student: Show Student Learning & Kahoot Progress Badge */}
                {currentUser.role === 'student' && (() => {
                  const exp = currentUser.kahootExp || 350;
                  const totalQ = currentUser.totalKahootQuestions || 15;
                  const correctQ = currentUser.correctKahootQuestions || 11;
                  const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 1000) / 10 : 0;
                  const level = Math.floor(exp / 300) + 1;
                  const progressInLevel = exp % 300;
                  const nickname = currentUser.nickname || 'Chiến Binh Hóa Học THPT';

                  let rankLabel = 'Đang Cố Gắng (Hạng Đồng)';
                  let rankColor = '#f97316';
                  let rankIcon = <Star size={14} color="#f97316" />;
                  if (exp >= 2000 || (accuracy >= 85 && totalQ >= 20)) {
                    rankLabel = 'Xuất Sắc (Hạng Kim Cương)';
                    rankColor = '#38bdf8';
                    rankIcon = <Award size={14} color="#38bdf8" />;
                  } else if (exp >= 1200 || (accuracy >= 70 && totalQ >= 15)) {
                    rankLabel = 'Giỏi (Hạng Vàng)';
                    rankColor = '#eab308';
                    rankIcon = <Trophy size={14} color="#eab308" />;
                  } else if (exp >= 600 || (accuracy >= 50 && totalQ >= 10)) {
                    rankLabel = 'Khá (Hạng Bạc)';
                    rankColor = '#a855f7';
                    rankIcon = <Medal size={14} color="#a855f7" />;
                  }

                  return (
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2.5,
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        boxShadow: '0 8px 24px rgba(2, 132, 199, 0.15)',
                      }}
                    >
                      {/* Nickname & Level */}
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.2}>
                        <Box display="flex" alignItems="center" gap={0.8}>
                          <Tag size={15} color="#f59e0b" />
                          <Typography variant="caption" color="text.secondary">Biệt danh:</Typography>
                          <Typography variant="body2" fontWeight="bold" color="#fbbf24">
                            "{nickname}"
                          </Typography>
                        </Box>
                        <Chip
                          label={`Cấp độ ${level}`}
                          size="small"
                          sx={{ height: 20, fontSize: 10, fontWeight: 'bold', bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
                        />
                      </Box>

                      {/* EXP bar */}
                      <Box mb={1.5}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.3}>
                          <Typography variant="caption" color="#eab308" fontWeight="bold" display="flex" alignItems="center" gap={0.5}>
                            <Zap size={13} /> {exp.toLocaleString()} EXP
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {progressInLevel}/300 EXP tới Lv.{level + 1}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(progressInLevel / 300) * 100}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.08)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
                            },
                          }}
                        />
                      </Box>

                      {/* Mini Metric Pills */}
                      <Grid container spacing={1} mb={1.5}>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.25)', textAlign: 'center' }}>
                            <Typography variant="caption" color="#f43f5e" fontWeight="bold" display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                              <Flame size={13} /> Chuỗi Kahoot: {currentUser.kahootStreak || 2} trận
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', textAlign: 'center' }}>
                            <Typography variant="caption" color="#34d399" fontWeight="bold" display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                              <Calendar size={13} /> Đăng nhập: {currentUser.loginStreak || 3} ngày
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Kahoot stats and competency rank */}
                      <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Box display="flex" alignItems="center" gap={0.6}>
                            {rankIcon}
                            <Typography variant="caption" color="text.secondary">Năng lực:</Typography>
                            <Typography variant="caption" fontWeight="bold" color={rankColor}>
                              {rankLabel}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="#38bdf8" fontWeight="600">
                            🎯 {correctQ}/{totalQ} câu đúng ({accuracy}%)
                          </Typography>
                        </Box>
                        {currentUser.teacherEvaluation && (
                          <Typography variant="caption" color="#cbd5e1" sx={{ display: 'block', fontStyle: 'italic', lineHeight: 1.4, mt: 0.5, borderTop: '1px dashed rgba(255,255,255,0.1)', pt: 0.5 }}>
                            💬 Nhận xét của Thầy/Cô: "{currentUser.teacherEvaluation}"
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  );
                })()}

                {/* 2. School & Class Info */}
                <Box display="flex" alignItems="center" gap={1.2} p={1} bgcolor="#090d16" borderRadius={2}>
                  <School size={18} color="#38bdf8" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {currentUser.role === 'teacher' ? 'Đơn vị công tác & Bộ môn:' : 'Trường & Lớp học:'}
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                      {currentUser.school} — {currentUser.role === 'teacher' ? (currentUser.subject || currentUser.className) : currentUser.className}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.2} p={1} bgcolor="#090d16" borderRadius={2}>
                  <MapPin size={18} color="#38bdf8" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Nơi sinh sống:</Typography>
                    <Typography variant="body2" fontWeight="600">{currentUser.location || 'Chưa cập nhật'}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.2} p={1} bgcolor="#090d16" borderRadius={2}>
                  <ShieldCheck size={18} color="#38bdf8" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Quyền hạn hệ thống:</Typography>
                    <Typography variant="body2" fontWeight="600" color={currentUser.role === 'teacher' ? '#f59e0b' : '#34d399'}>
                      {currentUser.role === 'teacher'
                        ? 'Giáo viên: Toàn quyền theo dõi học sinh, soạn giáo án, ra đề thi & quản lý video'
                        : 'Học sinh: Xem bài giảng, thực hành thí nghiệm, gia sư AI 24/7 & thi đấu Kahoot'}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={1} mt={1.5}>
                  <Button variant="outlined" color="primary" fullWidth onClick={() => setIsEditing(true)}>
                    Chỉnh Sửa Hồ Sơ
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogOut size={16} />}
                    onClick={handleDoLogout}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Đăng Xuất
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
