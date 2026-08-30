"use client";

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Tooltip,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import {
  Atom,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Trophy,
  ArrowUp,
  ArrowDown,
  Volume2,
  Flame,
  Info,
} from 'lucide-react';
import { ELEMENTS_DATA } from '@/lib/elementsData';
import { ChemicalElement } from '@/lib/elementsTypes';

interface SubshellDef {
  name: string; // "1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"
  n: number;
  l: number;
  boxesCount: number; // s=1, p=3, d=5, f=7
  maxElectrons: number;
  energyRank: number; // Aufbau order: 1s(1), 2s(2), 2p(3), 3s(4), 3p(5), 4s(6), 3d(7), 4p(8)
}

const AUFBAU_SUBSHELLS: SubshellDef[] = [
  { name: '1s', n: 1, l: 0, boxesCount: 1, maxElectrons: 2, energyRank: 1 },
  { name: '2s', n: 2, l: 0, boxesCount: 1, maxElectrons: 2, energyRank: 2 },
  { name: '2p', n: 2, l: 1, boxesCount: 3, maxElectrons: 6, energyRank: 3 },
  { name: '3s', n: 3, l: 0, boxesCount: 1, maxElectrons: 2, energyRank: 4 },
  { name: '3p', n: 3, l: 1, boxesCount: 3, maxElectrons: 6, energyRank: 5 },
  { name: '4s', n: 4, l: 0, boxesCount: 1, maxElectrons: 2, energyRank: 6 },
  { name: '3d', n: 3, l: 2, boxesCount: 5, maxElectrons: 10, energyRank: 7 },
  { name: '4p', n: 4, l: 1, boxesCount: 3, maxElectrons: 6, energyRank: 8 },
];

// Calculate ground truth electron distribution in orbitals for Z <= 36 according to Hund & Aufbau
function getStandardOrbitalFilling(z: number): Record<string, ('none' | 'up' | 'pair')[]> {
  const result: Record<string, ('none' | 'up' | 'pair')[]> = {};
  
  // Special anomalous cases for stability (Cr: Z=24 -> [Ar] 3d⁵ 4s¹, Cu: Z=29 -> [Ar] 3d¹⁰ 4s¹)
  const isCr = z === 24;
  const isCu = z === 29;

  let remaining = z;

  for (const subshell of AUFBAU_SUBSHELLS) {
    const boxes: ('none' | 'up' | 'pair')[] = new Array(subshell.boxesCount).fill('none');

    let subshellCount = 0;
    if (subshell.name === '4s' && isCr) {
      subshellCount = 1;
      remaining -= 1;
    } else if (subshell.name === '3d' && isCr) {
      subshellCount = 5;
      remaining -= 5;
    } else if (subshell.name === '4s' && isCu) {
      subshellCount = 1;
      remaining -= 1;
    } else if (subshell.name === '3d' && isCu) {
      subshellCount = 10;
      remaining -= 10;
    } else {
      subshellCount = Math.min(remaining, subshell.maxElectrons);
      remaining -= subshellCount;
    }

    // Fill according to Hund's rule: single spin-ups first across all boxes, then pair with spin-downs
    if (subshellCount <= subshell.boxesCount) {
      for (let i = 0; i < subshellCount; i++) {
        boxes[i] = 'up';
      }
    } else {
      for (let i = 0; i < subshell.boxesCount; i++) {
        boxes[i] = 'up';
      }
      const pairsNeeded = subshellCount - subshell.boxesCount;
      for (let i = 0; i < pairsNeeded; i++) {
        boxes[i] = 'pair';
      }
    }

    result[subshell.name] = boxes;
    if (remaining <= 0) break;
  }

  return result;
}

export default function OrbitalSimulator({ initialZ = 26 }: { initialZ?: number }) {
  const [selectedZ, setSelectedZ] = useState<number>(initialZ);
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');

  // Quiz state
  const [userBoxes, setUserBoxes] = useState<Record<string, ('none' | 'up' | 'pair')[]>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string[]>([]);

  const currentElement = useMemo(() => {
    return ELEMENTS_DATA.find((e) => e.atomicNumber === selectedZ) || ELEMENTS_DATA[25]; // Default Fe (26)
  }, [selectedZ]);

  const groundTruth = useMemo(() => {
    return getStandardOrbitalFilling(selectedZ);
  }, [selectedZ]);

  // Reset quiz user state when switching element or mode
  const handleSelectElement = (z: number) => {
    setSelectedZ(z);
    setQuizSubmitted(false);
    setQuizScore(null);
    setQuizFeedback([]);
    
    // Initialize empty user boxes for quiz
    const emptyState: Record<string, ('none' | 'up' | 'pair')[]> = {};
    AUFBAU_SUBSHELLS.forEach((sub) => {
      emptyState[sub.name] = new Array(sub.boxesCount).fill('none');
    });
    setUserBoxes(emptyState);
  };

  // Toggle electron state on click during quiz: none -> up -> pair -> none
  const handleBoxClick = (subshellName: string, boxIndex: number) => {
    if (mode !== 'quiz' || quizSubmitted) return;

    setUserBoxes((prev) => {
      const currentSub = prev[subshellName] || new Array(AUFBAU_SUBSHELLS.find(s => s.name === subshellName)?.boxesCount || 1).fill('none');
      const nextSub = [...currentSub];
      const currentVal = nextSub[boxIndex];

      if (currentVal === 'none') {
        nextSub[boxIndex] = 'up';
      } else if (currentVal === 'up') {
        nextSub[boxIndex] = 'pair';
      } else {
        nextSub[boxIndex] = 'none';
      }

      return {
        ...prev,
        [subshellName]: nextSub,
      };
    });
  };

  // Check quiz results and detect Hund/Pauli/Aufbau violations
  const handleEvaluateQuiz = () => {
    let totalElectronsEntered = 0;
    let correctBoxes = 0;
    let totalActiveBoxes = 0;
    const feedback: string[] = [];

    AUFBAU_SUBSHELLS.forEach((sub) => {
      const uBoxes = userBoxes[sub.name] || [];
      const gBoxes = groundTruth[sub.name] || new Array(sub.boxesCount).fill('none');

      uBoxes.forEach((state) => {
        if (state === 'up') totalElectronsEntered += 1;
        if (state === 'pair') totalElectronsEntered += 2;
      });

      gBoxes.forEach((expected, i) => {
        const actual = uBoxes[i] || 'none';
        if (expected !== 'none') {
          totalActiveBoxes++;
          if (expected === actual) {
            correctBoxes++;
          }
        }
      });
    });

    if (totalElectronsEntered !== selectedZ) {
      feedback.push(`⚠️ Tổng số electron bạn đã điền là ${totalElectronsEntered}e, trong khi nguyên tử ${currentElement.symbol} (Z = ${selectedZ}) có đúng ${selectedZ} electron.`);
    }

    if (selectedZ === 24) {
      feedback.push(`💡 Lưu ý cấu hình đặc biệt của Chromium (Z = 24): [Ar] 3d⁵ 4s¹ (bán bão hòa 3d bền vững).`);
    } else if (selectedZ === 29) {
      feedback.push(`💡 Lưu ý cấu hình đặc biệt của Copper (Z = 29): [Ar] 3d¹⁰ 4s¹ (bão hòa 3d bền vững).`);
    }

    // Check Hund's rule violation: e.g., in 2p or 3p having a pair while another box is empty
    AUFBAU_SUBSHELLS.forEach((sub) => {
      if (sub.boxesCount > 1) {
        const uBoxes = userBoxes[sub.name] || [];
        const hasEmpty = uBoxes.some(b => b === 'none');
        const hasPair = uBoxes.some(b => b === 'pair');
        if (hasEmpty && hasPair) {
          feedback.push(`❌ Vi phạm Quy tắc Hund ở phân lớp ${sub.name}: Các electron chưa phân bố đều vào từng ô trước khi ghép đôi!`);
        }
      }
    });

    const calculatedScore = Math.max(0, Math.round((correctBoxes / Math.max(1, totalActiveBoxes)) * 100));
    setQuizScore(calculatedScore);
    if (calculatedScore === 100 && totalElectronsEntered === selectedZ) {
      feedback.unshift(`🎉 Tuyệt vời! Bạn đã điền cấu hình orbital của ${currentElement.symbol} chính xác 100% chuẩn quy tắc Hund, Pauli và Aufbau!`);
    }
    setQuizFeedback(feedback);
    setQuizSubmitted(true);
  };

  const handleRandomElement = () => {
    const popularZ = [6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 19, 20, 24, 26, 29, 30, 35];
    const rand = popularZ[Math.floor(Math.random() * popularZ.length)];
    handleSelectElement(rand);
  };

  // Speak IUPAC name
  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentElement.nameEn);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3.5,
        bgcolor: '#090d16',
        backgroundImage: 'radial-gradient(ellipse at top, #1e293b 0%, #090d16 80%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Title & Mode Switcher */}
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2} mb={2.5}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
            }}
          >
            <Atom size={24} color="#38bdf8" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#38bdf8', fontSize: { xs: '16px', sm: '18px' } }}>
              Mô Phỏng Điền Cấu Hình Electron Vào Ô Lượng Tử Orbital
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Chuẩn GDPT 2018: Nguyên lý vững bền Aufbau • Nguyên lý Pauli • Quy tắc Hund
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant={mode === 'learn' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => { setMode('learn'); setQuizSubmitted(false); }}
            sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '12px' }}
          >
            Chế Độ Khám Phá
          </Button>
          <Button
            variant={mode === 'quiz' ? 'contained' : 'outlined'}
            color="secondary"
            size="small"
            onClick={() => { setMode('quiz'); handleSelectElement(selectedZ); }}
            sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '12px' }}
          >
            Thử Thách Tự Điền
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 2.5 }} />

      {/* Element Selector Toolbar */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Chọn nguyên tố (Z = 1 → 36)</InputLabel>
            <Select
              value={selectedZ}
              label="Chọn nguyên tố (Z = 1 → 36)"
              onChange={(e) => handleSelectElement(Number(e.target.value))}
              sx={{
                bgcolor: 'rgba(0,0,0,0.3)',
                color: '#fff',
                borderRadius: 2,
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              {ELEMENTS_DATA.slice(0, 36).map((el) => (
                <MenuItem key={el.atomicNumber} value={el.atomicNumber}>
                  <b>Z = {el.atomicNumber}</b>: {el.symbol} - {el.nameEn} ({el.nameVi})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
            <Button
              variant="outlined"
              size="small"
              startIcon={<Sparkles size={16} />}
              onClick={handleRandomElement}
              sx={{
                borderColor: 'rgba(129, 140, 248, 0.4)',
                color: '#818cf8',
                borderRadius: 2,
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Chọn Ngẫu Nhiên
            </Button>

            <Tooltip title="Nghe phát âm danh pháp IUPAC quốc tế">
              <IconButton
                onClick={handleSpeak}
                size="small"
                sx={{
                  bgcolor: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.3)' }
                }}
              >
                <Volume2 size={17} />
              </IconButton>
            </Tooltip>

            {/* Quick Badges */}
            <Chip
              label={`Ký hiệu: ${currentElement.symbol}`}
              size="small"
              sx={{ fontWeight: 'bold', bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
            />
            <Chip
              label={`Số hiệu Z = ${currentElement.atomicNumber}`}
              size="small"
              sx={{ fontWeight: 'bold', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
            />
            <Chip
              label={`Khối: ${currentElement.block.toUpperCase()}`}
              size="small"
              sx={{ fontWeight: 'bold', bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Electron Configuration Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2.5,
          bgcolor: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
              CẤU HÌNH ELECTRON ĐẦY ĐỦ:
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                color: '#38bdf8',
                fontFamily: 'monospace',
                letterSpacing: '0.04em',
                fontSize: { xs: '13px', sm: '15px' },
              }}
            >
              {currentElement.electronConfigFull || '1s² 2s² 2p⁶ 3s² 3p⁶...'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
              VIẾT GỌN THEO KHÍ HIẾM:
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                color: '#818cf8',
                fontFamily: 'monospace',
                fontSize: { xs: '13px', sm: '15px' },
              }}
            >
              {currentElement.electronConfigShort || '[Ne] 3s² 3p⁵'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Interactive Orbital Diagram Boxes */}
      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Typography variant="subtitle2" fontWeight="bold" color="white" display="flex" alignItems="center" gap={1}>
            SƠ ĐỒ PHÂN BỐ ELECTRON VÀO CÁC Ô ORBITAL:
            {mode === 'quiz' && (
              <Chip label="Nhấp vào từng ô để điền ↑, ↑↓ hoặc xóa" size="small" color="warning" sx={{ height: 20, fontSize: '10px' }} />
            )}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {AUFBAU_SUBSHELLS.map((subshell) => {
            const boxes = mode === 'learn'
              ? (groundTruth[subshell.name] || new Array(subshell.boxesCount).fill('none'))
              : (userBoxes[subshell.name] || new Array(subshell.boxesCount).fill('none'));

            const isActiveSubshell = groundTruth[subshell.name] !== undefined;

            return (
              <Grid item xs={12} sm={6} md={3} key={subshell.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: isActiveSubshell ? 'rgba(30, 41, 59, 0.8)' : 'rgba(15, 23, 42, 0.4)',
                    border: isActiveSubshell ? '1px solid rgba(56, 189, 248, 0.3)' : '1px dashed rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: isActiveSubshell ? '#38bdf8' : '#64748b' }}>
                      Phân lớp {subshell.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '10px' }}>
                      Tối đa {subshell.maxElectrons}e
                    </Typography>
                  </Box>

                  {/* Orbital Boxes container */}
                  <Stack direction="row" spacing={1} justifyContent="center">
                    {boxes.map((boxState, idx) => {
                      return (
                        <Box
                          key={idx}
                          onClick={() => handleBoxClick(subshell.name, idx)}
                          sx={{
                            width: 38,
                            height: 48,
                            borderRadius: 1.5,
                            bgcolor: boxState === 'pair'
                              ? 'rgba(56, 189, 248, 0.25)'
                              : boxState === 'up'
                              ? 'rgba(129, 140, 248, 0.25)'
                              : 'rgba(0, 0, 0, 0.4)',
                            border: '1.5px solid',
                            borderColor: boxState === 'pair'
                              ? '#38bdf8'
                              : boxState === 'up'
                              ? '#818cf8'
                              : 'rgba(255, 255, 255, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0.3,
                            cursor: mode === 'quiz' ? 'pointer' : 'default',
                            boxShadow: boxState !== 'none' ? '0 0 10px rgba(56, 189, 248, 0.2)' : 'none',
                            transition: 'all 0.15s ease',
                            '&:hover': mode === 'quiz' ? {
                              borderColor: '#38bdf8',
                              transform: 'scale(1.05)',
                              bgcolor: 'rgba(56, 189, 248, 0.15)',
                            } : {},
                          }}
                        >
                          {boxState === 'up' && (
                            <Box display="flex" flexDirection="column" alignItems="center">
                              <ArrowUp size={18} color="#818cf8" strokeWidth={3} />
                            </Box>
                          )}
                          {boxState === 'pair' && (
                            <Box display="flex" alignItems="center" gap={0.2}>
                              <ArrowUp size={16} color="#38bdf8" strokeWidth={3} />
                              <ArrowDown size={16} color="#f43f5e" strokeWidth={3} />
                            </Box>
                          )}
                          {boxState === 'none' && (
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px' }}>
                              —
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Quiz Submission & Evaluation Section */}
      {mode === 'quiz' && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEvaluateQuiz}
              startIcon={<CheckCircle2 size={18} />}
              sx={{ fontWeight: 'bold', px: 3, py: 1, borderRadius: 2 }}
            >
              Kiểm Tra Đáp Án
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSelectElement(selectedZ)}
              startIcon={<RefreshCw size={16} />}
              sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}
            >
              Làm Lại
            </Button>
          </Box>

          {quizSubmitted && quizScore !== null && (
            <Box sx={{ mt: 2.5 }}>
              <Alert
                severity={quizScore === 100 ? 'success' : quizScore >= 60 ? 'warning' : 'error'}
                sx={{ borderRadius: 2, bgcolor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
              >
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Kết quả: {quizScore}/100 Điểm
                </Typography>
                {quizFeedback.map((fb, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mt: 0.5 }}>
                    {fb}
                  </Typography>
                ))}
              </Alert>
            </Box>
          )}
        </Box>
      )}

      {/* Pedagogical Rules Quick Guide */}
      <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Typography variant="caption" color="text.secondary" fontWeight="bold" display="flex" alignItems="center" gap={0.5} mb={1}>
          <Info size={14} color="#38bdf8" /> QUY TẮC PHÂN BỐ ELECTRON THEO CHƯƠNG TRÌNH GDPT 2018:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="#38bdf8" fontWeight="bold" display="block">
              1. Nguyên Lý Vững Bền Aufbau:
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Electron điền vào các phân lớp có mức năng lượng từ thấp đến cao: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p...
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="#10b981" fontWeight="bold" display="block">
              2. Nguyên Lý Loại Trừ Pauli:
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Mỗi ô orbital chứa tối đa 2 electron có spin ngược chiều nhau (↑↓). Không thể có 2e cùng spin trong 1 ô.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" color="#f59e0b" fontWeight="bold" display="block">
              3. Quy Tắc Hund:
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Trong cùng một phân lớp, electron phân bố đều vào các orbital sao cho số electron độc thân là tối đa (↑ trước, sau đó mới ghép đôi ↓).
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
