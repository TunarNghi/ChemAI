"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  Trophy,
  Flame,
  Star,
  Award,
  RefreshCw,
  Crown,
  Medal,
  Users,
  GraduationCap,
} from 'lucide-react';
import { supabase, getLocalStudentProfile, StudentProfile } from '@/lib/api';

interface LeaderboardEntry {
  id: string;
  username: string;
  name: string;
  className: string;
  school: string;
  exp: number;
  streak: number;
  kahootStreak?: number;
  level: number;
  badge?: string;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: "1", username: "nguyenvana", name: "Nguyễn Văn An", className: "10A1", school: "THPT Chuyên Thoại Ngọc Hầu", exp: 2850, streak: 14, kahootStreak: 25, level: 6, badge: "Thủ Khoa Kahoot" },
  { id: "2", username: "tranthib", name: "Trần Thị Bích", className: "10A1", school: "THPT Chuyên Thoại Ngọc Hầu", exp: 2400, streak: 12, kahootStreak: 21, level: 5, badge: "Phù Thủy Ống Nghiệm" },
  { id: "3", username: "lehoangc", name: "Lê Hoàng Cường", className: "11B2", school: "THPT Long Xuyên", exp: 2150, streak: 9, kahootStreak: 18, level: 5, badge: "Bậc Thầy Este" },
  { id: "4", username: "phamthid", name: "Phạm Thị Dung", className: "12A5", school: "THPT Chu Văn An", exp: 1950, streak: 8, kahootStreak: 16, level: 4, badge: "Chuyên Gia Kim Loại" },
  { id: "5", username: "dangvanminh", name: "Đặng Văn Minh", className: "10A3", school: "THPT Nguyễn Hiền", exp: 1720, streak: 7, kahootStreak: 14, level: 4, badge: "Chiến Binh Chăm Chỉ" },
  { id: "6", username: "vothimy", name: "Võ Thị Mỹ", className: "11A1", school: "THPT Chuyên Thoại Ngọc Hầu", exp: 1540, streak: 6, kahootStreak: 12, level: 4, badge: "Ngôi Sao Halogen" },
  { id: "7", username: "hoangnam", name: "Hoàng Nam", className: "12A2", school: "THPT Long Xuyên", exp: 1380, streak: 5, kahootStreak: 10, level: 3, badge: "Nhà Khám Phá" },
  { id: "8", username: "ngocmai", name: "Ngọc Mai", className: "10A2", school: "THPT Chuyên Thoại Ngọc Hầu", exp: 1200, streak: 5, kahootStreak: 9, level: 3, badge: "Tân Binh Hóa Học" },
];

export default function LeaderboardTab() {
  const [tabMode, setTabMode] = useState<'exp' | 'streak' | 'kahoot'>('exp');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [data, setData] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchLeaderboard();
  }, [tabMode]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    const localProf = getLocalStudentProfile();

    try {
      // Fetch from Supabase student_profiles table
      const { data: dbData } = await supabase
        .from("student_profiles")
        .select("*")
        .order(tabMode === 'exp' ? 'kahoot_exp' : 'kahoot_streak', { ascending: false })
        .limit(30);

      if (dbData && dbData.length > 0) {
        const mapped: LeaderboardEntry[] = dbData.map((d, i) => ({
          id: d.id || String(i),
          username: d.username || "Học sinh",
          name: d.name || d.username || "Học sinh",
          className: d.class_name || "10A1",
          school: d.school_name || "THPT An Giang",
          exp: d.kahoot_exp || d.exp || 100,
          streak: d.login_streak || d.streak || 1,
          kahootStreak: d.kahoot_streak || 0,
          level: Math.floor(Math.sqrt((d.kahoot_exp || d.exp || 100) / 100)) + 1,
          badge: d.teacher_badge || (i === 0 ? "Thủ Khoa Kahoot" : undefined)
        }));

        // Merge local profile if not in list
        const exists = mapped.some(m => m.id === localProf.id);
        if (!exists) {
          mapped.push({
            id: localProf.id,
            username: localProf.username,
            name: localProf.name,
            className: localProf.className,
            school: localProf.school,
            exp: localProf.exp,
            streak: localProf.streak,
            kahootStreak: 5,
            level: localProf.level,
            badge: localProf.badges[0]
          });
        }
        setData(mapped);
      } else {
        // Fallback with local user merged into mock
        const list = [...MOCK_LEADERBOARD];
        const exists = list.some(m => m.id === localProf.id);
        if (!exists) {
          list.push({
            id: localProf.id,
            username: localProf.username,
            name: localProf.name,
            className: localProf.className,
            school: localProf.school,
            exp: localProf.exp,
            streak: localProf.streak,
            kahootStreak: 6,
            level: localProf.level,
            badge: localProf.badges[0]
          });
        }
        setData(list);
      }
    } catch {
      // use mock
      setData(MOCK_LEADERBOARD);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedData = [...data]
    .filter(item => classFilter === 'all' || item.className.includes(classFilter))
    .sort((a, b) => {
      if (tabMode === 'exp') return b.exp - a.exp;
      if (tabMode === 'streak') return b.streak - a.streak;
      return (b.kahootStreak || 0) - (a.kahootStreak || 0);
    });

  const getRankMedal = (index: number) => {
    if (index === 0) return <Crown size={20} color="#fbbf24" />;
    if (index === 1) return <Medal size={20} color="#94a3b8" />;
    if (index === 2) return <Medal size={20} color="#b45309" />;
    return <Typography variant="body2" fontWeight="bold" color="text.secondary" fontFamily="monospace">#{index + 1}</Typography>;
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        {/* Header */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.5} mb={2.5}>
          <Box display="flex" alignItems="center" gap={1.2}>
            <Trophy color="#eab308" size={24} />
            <div>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '16px', sm: '19px' } }}>
                Bảng Xếp Hạng Hóa Học Toàn Trường
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Vinh danh cao thủ Kahoot, chuỗi ngày học tập & điểm kinh nghiệm tích lũy
              </Typography>
            </div>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={<RefreshCw className={isLoading ? "animate-spin" : ""} size={14} />}
            onClick={fetchLeaderboard}
            sx={{ textTransform: 'none', color: '#38bdf8', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            Làm mới
          </Button>
        </Box>

        {/* Mode Selector Tabs & Class Filter */}
        <Grid container spacing={1.5} alignItems="center" mb={2}>
          <Grid item xs={12} sm={8}>
            <Tabs
              value={tabMode}
              onChange={(_, val) => setTabMode(val)}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              sx={{
                bgcolor: '#0f172a',
                borderRadius: 2,
                p: 0.5,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: { xs: '12px', sm: '13px' },
                  minHeight: 38,
                  borderRadius: 1.5,
                  color: '#94a3b8',
                  '&.Mui-selected': { bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }
                }
              }}
            >
              <Tab value="exp" label="⭐ Top Kinh Nghiệm (EXP)" />
              <Tab value="streak" label="🔥 Top Chuỗi Ngày (Streak)" />
              <Tab value="kahoot" label="🏆 Top Chuỗi Đúng Kahoot" />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl size="small" fullWidth>
              <InputLabel>Lọc theo Khối/Lớp</InputLabel>
              <Select
                value={classFilter}
                label="Lọc theo Khối/Lớp"
                onChange={(e) => setClassFilter(e.target.value)}
                sx={{ bgcolor: '#0f172a', color: '#38bdf8' }}
              >
                <MenuItem value="all">Tất cả Khối Lớp</MenuItem>
                <MenuItem value="10">Khối 10 (10A1, 10A2...)</MenuItem>
                <MenuItem value="11">Khối 11 (11A1, 11B2...)</MenuItem>
                <MenuItem value="12">Khối 12 (12A1, 12A5...)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Top 3 Podium Cards */}
        {sortedData.length >= 3 && (
          <Grid container spacing={1.5} mb={3}>
            {/* Rank 2 */}
            <Grid item xs={4}>
              <Paper sx={{ p: { xs: 1, sm: 2 }, textAlign: 'center', bgcolor: 'rgba(148, 163, 184, 0.08)', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: 2 }}>
                <Medal size={28} color="#cbd5e1" style={{ margin: '0 auto' }} />
                <Typography variant="body2" fontWeight="bold" noWrap color="common.white" mt={0.5} sx={{ fontSize: { xs: '11px', sm: '13px' } }}>
                  {sortedData[1]?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Lớp {sortedData[1]?.className}
                </Typography>
                <Chip
                  label={tabMode === 'exp' ? `${sortedData[1]?.exp} EXP` : tabMode === 'streak' ? `${sortedData[1]?.streak} ngày` : `${sortedData[1]?.kahootStreak} câu`}
                  size="small"
                  sx={{ mt: 0.8, height: 20, fontSize: 10, bgcolor: 'rgba(148, 163, 184, 0.2)', color: '#cbd5e1', fontWeight: 'bold' }}
                />
              </Paper>
            </Grid>

            {/* Rank 1 (Gold) */}
            <Grid item xs={4}>
              <Paper sx={{ p: { xs: 1, sm: 2 }, textAlign: 'center', bgcolor: 'rgba(234, 179, 8, 0.12)', border: '1.5px solid rgba(234, 179, 8, 0.5)', borderRadius: 2, transform: 'scale(1.04)' }}>
                <Crown size={32} color="#fbbf24" style={{ margin: '0 auto' }} />
                <Typography variant="body2" fontWeight="bold" noWrap color="#facc15" mt={0.5} sx={{ fontSize: { xs: '12px', sm: '14px' } }}>
                  {sortedData[0]?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Lớp {sortedData[0]?.className}
                </Typography>
                <Chip
                  label={tabMode === 'exp' ? `${sortedData[0]?.exp} EXP` : tabMode === 'streak' ? `${sortedData[0]?.streak} ngày` : `${sortedData[0]?.kahootStreak} câu`}
                  size="small"
                  sx={{ mt: 0.8, height: 22, fontSize: 11, bgcolor: '#eab308', color: '#0f172a', fontWeight: 'black' }}
                />
              </Paper>
            </Grid>

            {/* Rank 3 (Bronze) */}
            <Grid item xs={4}>
              <Paper sx={{ p: { xs: 1, sm: 2 }, textAlign: 'center', bgcolor: 'rgba(180, 83, 9, 0.08)', border: '1px solid rgba(180, 83, 9, 0.3)', borderRadius: 2 }}>
                <Medal size={28} color="#b45309" style={{ margin: '0 auto' }} />
                <Typography variant="body2" fontWeight="bold" noWrap color="common.white" mt={0.5} sx={{ fontSize: { xs: '11px', sm: '13px' } }}>
                  {sortedData[2]?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Lớp {sortedData[2]?.className}
                </Typography>
                <Chip
                  label={tabMode === 'exp' ? `${sortedData[2]?.exp} EXP` : tabMode === 'streak' ? `${sortedData[2]?.streak} ngày` : `${sortedData[2]?.kahootStreak} câu`}
                  size="small"
                  sx={{ mt: 0.8, height: 20, fontSize: 10, bgcolor: 'rgba(180, 83, 9, 0.2)', color: '#fb923c', fontWeight: 'bold' }}
                />
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Full Leaderboard Table */}
        <TableContainer component={Paper} sx={{ bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#1e293b' }}>
              <TableRow>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', width: 60, fontSize: 12 }}>Hạng</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', fontSize: 12 }}>Học Sinh & Trường</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', fontSize: 12 }}>Lớp</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', fontSize: 12, display: { xs: 'none', sm: 'table-cell' } }}>Danh Hiệu</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', textAlign: 'right', fontSize: 12 }}>
                  {tabMode === 'exp' ? 'Kinh Nghiệm' : tabMode === 'streak' ? 'Chuỗi Ngày' : 'Chuỗi Kahoot'}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    bgcolor: index < 3 ? 'rgba(56, 189, 248, 0.03)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' }
                  }}
                >
                  <TableCell sx={{ py: 1.2 }}>
                    <Box display="flex" alignItems="center">
                      {getRankMedal(index)}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.2 }}>
                    <Box display="flex" alignItems="center" gap={1.2}>
                      <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: index === 0 ? '#eab308' : '#0284c7' }}>
                        {row.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight="bold" color="common.white" noWrap sx={{ fontSize: { xs: '12px', sm: '13px' } }}>
                          {row.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: 10.5, display: 'block' }}>
                          {row.school}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.2 }}>
                    <Chip label={row.className} size="small" sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(255,255,255,0.08)' }} />
                  </TableCell>
                  <TableCell sx={{ py: 1.2, display: { xs: 'none', sm: 'table-cell' } }}>
                    {row.badge && (
                      <Chip
                        icon={<Award size={12} />}
                        label={row.badge}
                        size="small"
                        sx={{ height: 20, fontSize: 10, bgcolor: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ py: 1.2, textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight="bold" fontFamily="monospace" color="cyan" sx={{ fontSize: { xs: '12px', sm: '13px' } }}>
                      {tabMode === 'exp' ? `${row.exp} EXP` : tabMode === 'streak' ? `${row.streak} ngày` : `${row.kahootStreak || 0} câu`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
