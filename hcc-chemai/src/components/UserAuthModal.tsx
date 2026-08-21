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
} from 'lucide-react';
import { supabase } from '@/lib/api';

export interface UserProfile {
  id: string;
  fullName: string;
  authType: 'email' | 'phone';
  emailOrPhone: string;
  className: string;
  school: string;
  location: string;
  password?: string;
  createdAt: string;
}

interface UserAuthModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
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

export function getStoredCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
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
}: UserAuthModalProps) {
  const [tabIndex, setTabIndex] = useState<number>(0); // 0: Đăng nhập, 1: Đăng ký, 2: Hồ sơ
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form States
  const [regFullName, setRegFullName] = useState("");
  const [regEmailOrPhone, setRegEmailOrPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regClassSelect, setRegClassSelect] = useState("10A1");
  const [regCustomClass, setRegCustomClass] = useState("");
  const [regSchool, setRegSchool] = useState("");
  const [regLocation, setRegLocation] = useState("");

  // Edit Profile States
  const [editFullName, setEditFullName] = useState("");
  const [editClassName, setEditClassName] = useState("");
  const [editSchool, setEditSchool] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setTabIndex(2);
      setEditFullName(currentUser.fullName || "");
      setEditClassName(currentUser.className || "");
      setEditSchool(currentUser.school || "");
      setEditLocation(currentUser.location || "");
    } else {
      setTabIndex(0);
    }
    setAlertInfo(null);
  }, [currentUser, open]);

  // Load existing registered users
  const getRegisteredUsers = (): UserProfile[] => {
    try {
      const data = localStorage.getItem(LOCAL_USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
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
      setAlertInfo({ type: 'error', message: 'Vui lòng nhập Họ và tên / Tên đăng nhập.' });
      return;
    }
    if (!regEmailOrPhone.trim()) {
      setAlertInfo({ type: 'error', message: `Vui lòng nhập ${authMethod === 'email' ? 'Email' : 'Số điện thoại'} hợp lệ.` });
      return;
    }
    if (authMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmailOrPhone.trim())) {
      setAlertInfo({ type: 'error', message: 'Địa chỉ Email không hợp lệ (Ví dụ: hocsinh@gmail.com).' });
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
      setAlertInfo({ type: 'error', message: 'Vui lòng nhập tên Trường THPT đang theo học.' });
      return;
    }

    const finalClassName = regClassSelect === "Khác (Tự điền)" ? (regCustomClass.trim() || "Lớp 10") : regClassSelect;
    const finalLocation = regLocation.trim() || "Việt Nam";

    const allUsers = getRegisteredUsers();
    // Check duplication
    const isExisted = allUsers.some(
      u => u.emailOrPhone.toLowerCase() === regEmailOrPhone.trim().toLowerCase() ||
           u.fullName.toLowerCase() === regFullName.trim().toLowerCase()
    );

    if (isExisted) {
      setAlertInfo({ type: 'error', message: 'Tài khoản hoặc Email/SĐT này đã được đăng ký. Hãy chuyển qua Đăng nhập!' });
      return;
    }

    const newUser: UserProfile = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      fullName: regFullName.trim(),
      authType: authMethod,
      emailOrPhone: regEmailOrPhone.trim(),
      className: finalClassName,
      school: regSchool.trim(),
      location: finalLocation,
      password: regPassword,
      createdAt: new Date().toISOString(),
    };

    allUsers.push(newUser);
    saveRegisteredUsers(allUsers);
    saveStoredCurrentUser(newUser);

    // Background sync to Supabase (if available)
    try {
      supabase.from('user_profiles').upsert({
        user_id: newUser.id,
        full_name: newUser.fullName,
        auth_type: newUser.authType,
        email_or_phone: newUser.emailOrPhone,
        class_name: newUser.className,
        school: newUser.school,
        location: newUser.location,
        created_at: newUser.createdAt,
      }).then();
    } catch {}

    setAlertInfo({ type: 'success', message: 'Đăng ký tài khoản thành công! Đang đăng nhập...' });
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertInfo(null);

    if (!loginIdentifier.trim() || !loginPassword) {
      setAlertInfo({ type: 'error', message: 'Vui lòng nhập đầy đủ Tên/Email/SĐT và Mật khẩu.' });
      return;
    }

    const allUsers = getRegisteredUsers();
    const cleanId = loginIdentifier.trim().toLowerCase();

    const matchedUser = allUsers.find(
      u => (u.fullName.toLowerCase() === cleanId || u.emailOrPhone.toLowerCase() === cleanId) &&
           u.password === loginPassword
    );

    if (!matchedUser) {
      setAlertInfo({ type: 'error', message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
      return;
    }

    saveStoredCurrentUser(matchedUser);
    setAlertInfo({ type: 'success', message: `Chào mừng bạn trở lại, ${matchedUser.fullName}!` });
    setTimeout(() => {
      onLoginSuccess(matchedUser);
      onClose();
    }, 600);
  };

  const handleUpdateProfile = () => {
    if (!currentUser) return;
    const allUsers = getRegisteredUsers();
    const updatedUser: UserProfile = {
      ...currentUser,
      fullName: editFullName.trim() || currentUser.fullName,
      className: editClassName.trim() || currentUser.className,
      school: editSchool.trim() || currentUser.school,
      location: editLocation.trim() || currentUser.location,
    };

    const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      allUsers[userIndex] = updatedUser;
      saveRegisteredUsers(allUsers);
    }
    saveStoredCurrentUser(updatedUser);
    onLoginSuccess(updatedUser);
    setIsEditing(false);
    setAlertInfo({ type: 'success', message: 'Cập nhật thông tin hồ sơ thành công!' });
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
          <Avatar sx={{ bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', width: 36, height: 36 }}>
            <GraduationCap size={20} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '17px', color: '#f8fafc' }}>
              {currentUser ? 'Hồ Sơ Học Sinh ChemAI' : 'Tài Khoản Học Sinh ChemAI'}
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
          <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên đăng nhập / Email / Số điện thoại"
              placeholder="Nhập tên đăng nhập hoặc email, số điện thoại..."
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              fullWidth
              size="small"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={17} color="#38bdf8" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu..."
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              fullWidth
              size="small"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={17} color="#38bdf8" />
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
              color="primary"
              fullWidth
              sx={{
                mt: 1,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.35)'
              }}
            >
              Đăng Nhập Ngay
            </Button>

            <Box textAlign="center" mt={0.5}>
              <Typography variant="caption" color="text.secondary">
                Chưa có tài khoản học sinh?{' '}
                <span
                  style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => setTabIndex(1)}
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
              label="Họ và tên (Tên học sinh / Tên đăng nhập)"
              placeholder="Ví dụ: Nguyễn Văn An"
              value={regFullName}
              onChange={(e) => setRegFullName(e.target.value)}
              fullWidth
              size="small"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={17} color="#38bdf8" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email or Phone Input */}
            <TextField
              label={authMethod === 'email' ? 'Địa chỉ Email' : 'Số điện thoại liên hệ'}
              placeholder={authMethod === 'email' ? 'hocsinh@gmail.com' : '0912345678'}
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
            <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <School size={14} /> Thông tin trường lớp & địa phương
            </Typography>

            {/* Class & School */}
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

            {/* Location */}
            <TextField
              label="Nơi sinh sống (Xã/Phường/Đặc khu, TP/TX/Huyện, Tỉnh)"
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
              color="primary"
              fullWidth
              sx={{
                mt: 1,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.35)'
              }}
            >
              Hoàn Tất Đăng Ký Tài Khoản
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
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#0284c7',
                  color: '#fff',
                  width: 52,
                  height: 52,
                  fontSize: '22px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
                }}
              >
                {currentUser.fullName.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ fontSize: '16px', color: '#f8fafc' }}>
                    {currentUser.fullName}
                  </Typography>
                  <Chip
                    icon={<CheckCircle2 size={12} color="#10b981" />}
                    label="Đã xác thực"
                    size="small"
                    sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '12px' }}>
                  {currentUser.authType === 'email' ? '📧 ' : '📱 '} {currentUser.emailOrPhone}
                </Typography>
                <Box display="flex" gap={0.8} mt={0.5} flexWrap="wrap">
                  <Chip label={currentUser.className || "Lớp 10"} size="small" sx={{ height: 20, fontSize: 11, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }} />
                  <Chip label={currentUser.school || "THPT"} size="small" sx={{ height: 20, fontSize: 11, bgcolor: 'rgba(255,255,255,0.08)' }} />
                </Box>
              </Box>
            </Paper>

            {/* Profile Info Details or Edit Form */}
            {isEditing ? (
              <Box display="flex" flexDirection="column" gap={1.5}>
                <TextField
                  label="Họ và tên"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Lớp học"
                  value={editClassName}
                  onChange={(e) => setEditClassName(e.target.value)}
                  size="small"
                  fullWidth
                />
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
              <Box display="flex" flexDirection="column" gap={1.2}>
                <Box display="flex" alignItems="center" gap={1.2} p={1} bgcolor="#090d16" borderRadius={2}>
                  <School size={18} color="#38bdf8" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Trường & Lớp học:</Typography>
                    <Typography variant="body2" fontWeight="600">{currentUser.school} — {currentUser.className}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.2} p={1} bgcolor="#090d16" borderRadius={2}>
                  <MapPin size={18} color="#38bdf8" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Nơi sinh sống:</Typography>
                    <Typography variant="body2" fontWeight="600">{currentUser.location || "Chưa cập nhật"}</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1.2} p={1} bgcolor="#090d16" borderRadius={2}>
                  <ShieldCheck size={18} color="#38bdf8" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Trạng thái học tập:</Typography>
                    <Typography variant="body2" fontWeight="600" color="#34d399">Đang học Chương trình Hóa Học 10 GDPT 2018</Typography>
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
