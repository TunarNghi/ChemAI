"use client";

import React, { useState, useMemo, useEffect } from 'react';
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
  Slider,
  Tooltip,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import {
  Pipette,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  TrendingUp,
  FlaskConical,
  Droplets,
  Activity,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

interface TitrationPreset {
  id: string;
  name: string;
  analyteName: string; // Trong bình tam giác
  analyteFormula: string;
  analyteVolMl: number; // e.g. 25 mL
  analyteConcM: number; // e.g. 0.1 M
  analyteType: 'strong_acid' | 'weak_acid' | 'strong_base';
  analyteKa?: number; // e.g. 1.8e-5 for CH3COOH

  titrantName: string; // Trong Buret
  titrantFormula: string;
  titrantConcM: number; // e.g. 0.1 M
  titrantType: 'strong_base' | 'strong_acid';

  indicator: 'phenolphthalein' | 'methyl_orange' | 'litmus';
  description: string;
}

const TITRATION_PRESETS: TitrationPreset[] = [
  {
    id: 'hcl_naoh',
    name: '1. Chuẩn độ Axit Mạnh - Bazơ Mạnh (HCl + NaOH)',
    analyteName: 'Hydrochloric Acid',
    analyteFormula: 'HCl',
    analyteVolMl: 25.0,
    analyteConcM: 0.10,
    analyteType: 'strong_acid',
    titrantName: 'Sodium Hydroxide',
    titrantFormula: 'NaOH',
    titrantConcM: 0.10,
    titrantType: 'strong_base',
    indicator: 'phenolphthalein',
    description: 'Chuẩn độ 25.0 mL dung dịch HCl 0.10 M bằng dung dịch NaOH 0.10 M chuẩn. Điểm tương đương tại pH = 7.00 khi V(NaOH) = 25.0 mL.',
  },
  {
    id: 'ch3cooh_naoh',
    name: '2. Chuẩn độ Axit Yếu - Bazơ Mạnh (CH₃COOH + NaOH)',
    analyteName: 'Acetic Acid',
    analyteFormula: 'CH₃COOH',
    analyteVolMl: 25.0,
    analyteConcM: 0.10,
    analyteType: 'weak_acid',
    analyteKa: 1.75e-5,
    titrantName: 'Sodium Hydroxide',
    titrantFormula: 'NaOH',
    titrantConcM: 0.10,
    titrantType: 'strong_base',
    indicator: 'phenolphthalein',
    description: 'Chuẩn độ 25.0 mL dung dịch CH₃COOH 0.10 M bằng NaOH 0.10 M. Điểm tương đương tại pH ≈ 8.72 (môi trường bazơ do muối CH₃COONa thủy phân).',
  },
  {
    id: 'naoh_hcl',
    name: '3. Chuẩn độ Bazơ Mạnh - Axit Mạnh (NaOH + HCl)',
    analyteName: 'Sodium Hydroxide',
    analyteFormula: 'NaOH',
    analyteVolMl: 20.0,
    analyteConcM: 0.10,
    analyteType: 'strong_base',
    titrantName: 'Hydrochloric Acid',
    titrantFormula: 'HCl',
    titrantConcM: 0.10,
    titrantType: 'strong_acid',
    indicator: 'methyl_orange',
    description: 'Chuẩn độ 20.0 mL dung dịch NaOH 0.10 M bằng dung dịch HCl 0.10 M. Điểm tương đương tại pH = 7.00 khi V(HCl) = 20.0 mL.',
  },
];

// Exact pH calculation along titration curve
function calculateTitrationPH(preset: TitrationPreset, vAddedMl: number): number {
  const vA = preset.analyteVolMl / 1000; // in Liters
  const cA = preset.analyteConcM;
  const cT = preset.titrantConcM;
  const vT = vAddedMl / 1000;
  const vTotal = vA + vT;

  const nA_initial = cA * vA;
  const nT_added = cT * vT;

  if (preset.id === 'hcl_naoh') {
    if (vAddedMl === 0) return 1.0; // pH = -log(0.1) = 1.0
    if (nT_added < nA_initial) {
      // Acid in excess
      const hConc = (nA_initial - nT_added) / vTotal;
      return Math.max(1.0, -Math.log10(hConc));
    } else if (Math.abs(nT_added - nA_initial) < 1e-7) {
      // Equivalence point
      return 7.0;
    } else {
      // Base in excess
      const ohConc = (nT_added - nA_initial) / vTotal;
      const pOH = -Math.log10(ohConc);
      return Math.min(13.0, 14.0 - pOH);
    }
  } else if (preset.id === 'ch3cooh_naoh') {
    const Ka = preset.analyteKa || 1.75e-5;
    if (vAddedMl === 0) {
      // [H+] = sqrt(Ka * C)
      const hConc = Math.sqrt(Ka * cA);
      return -Math.log10(hConc);
    }
    if (nT_added < nA_initial) {
      // Buffer region: pH = pKa + log([A-] / [HA])
      const pKa = -Math.log10(Ka);
      const ratio = nT_added / (nA_initial - nT_added);
      if (ratio <= 0) return 2.87;
      return pKa + Math.log10(ratio);
    } else if (Math.abs(nT_added - nA_initial) < 1e-7) {
      // Equivalence point: Salt CH3COONa hydrolysis
      // [OH-] = sqrt(Kb * C_salt) where Kb = Kw / Ka
      const cSalt = nA_initial / vTotal;
      const Kb = 1e-14 / Ka;
      const ohConc = Math.sqrt(Kb * cSalt);
      const pOH = -Math.log10(ohConc);
      return 14.0 - pOH;
    } else {
      // Base in excess
      const ohConc = (nT_added - nA_initial) / vTotal;
      const pOH = -Math.log10(ohConc);
      return Math.min(13.0, 14.0 - pOH);
    }
  } else {
    // NaOH + HCl
    if (vAddedMl === 0) return 13.0;
    if (nT_added < nA_initial) {
      const ohConc = (nA_initial - nT_added) / vTotal;
      const pOH = -Math.log10(ohConc);
      return 14.0 - pOH;
    } else if (Math.abs(nT_added - nA_initial) < 1e-7) {
      return 7.0;
    } else {
      const hConc = (nT_added - nA_initial) / vTotal;
      return Math.max(1.0, -Math.log10(hConc));
    }
  }
}

// Indicator color based on pH
function getIndicatorColor(indicator: 'phenolphthalein' | 'methyl_orange' | 'litmus', ph: number): { hex: string; label: string } {
  if (indicator === 'phenolphthalein') {
    if (ph < 8.2) return { hex: 'rgba(255, 255, 255, 0.15)', label: 'Không màu (Axit / Trung tính)' };
    if (ph >= 8.2 && ph < 10.0) return { hex: 'rgba(244, 114, 182, 0.65)', label: 'Hồng nhạt (Chuyển màu chuẩn)' };
    return { hex: 'rgba(236, 72, 153, 0.85)', label: 'Hồng cánh sen đậm (Dư kiềm)' };
  } else if (indicator === 'methyl_orange') {
    if (ph < 3.1) return { hex: 'rgba(239, 68, 68, 0.8)', label: 'Đỏ (Axit mạnh)' };
    if (ph >= 3.1 && ph <= 4.4) return { hex: 'rgba(249, 115, 22, 0.8)', label: 'Da cam (Khoảng đổi màu)' };
    return { hex: 'rgba(234, 179, 8, 0.8)', label: 'Vàng (Trung tính / Bazơ)' };
  } else {
    // Litmus
    if (ph < 6.0) return { hex: 'rgba(239, 68, 68, 0.7)', label: 'Đỏ (Môi trường Axit)' };
    if (ph >= 6.0 && ph <= 8.0) return { hex: 'rgba(168, 85, 247, 0.7)', label: 'Tím (Trung tính)' };
    return { hex: 'rgba(59, 130, 246, 0.7)', label: 'Xanh (Môi trường Bazơ)' };
  }
}

export default function TitrationSimulator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('hcl_naoh');
  const [vAddedMl, setVAddedMl] = useState<number>(0);
  const [isStirring, setIsStirring] = useState<boolean>(true);
  const [isAutoDropping, setIsAutoDropping] = useState<boolean>(false);
  const [dropSpeed, setDropSpeed] = useState<number>(0.5); // mL per interval

  const preset = useMemo(() => {
    return TITRATION_PRESETS.find(p => p.id === selectedPresetId) || TITRATION_PRESETS[0];
  }, [selectedPresetId]);

  const currentPH = useMemo(() => {
    return calculateTitrationPH(preset, vAddedMl);
  }, [preset, vAddedMl]);

  const indicatorState = useMemo(() => {
    return getIndicatorColor(preset.indicator, currentPH);
  }, [preset.indicator, currentPH]);

  // V_equivalence calculation
  const vEquivalence = useMemo(() => {
    return (preset.analyteVolMl * preset.analyteConcM) / preset.titrantConcM;
  }, [preset]);

  const isEquivalenceReached = Math.abs(vAddedMl - vEquivalence) <= 0.2;

  // Auto drop timer effect
  useEffect(() => {
    let interval: any = null;
    if (isAutoDropping) {
      interval = setInterval(() => {
        setVAddedMl((prev) => {
          const next = Math.min(50.0, Math.round((prev + dropSpeed) * 10) / 10);
          if (next >= 50.0) {
            setIsAutoDropping(false);
          }
          return next;
        });
      }, 400);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoDropping, dropSpeed]);

  const handleAddVolume = (ml: number) => {
    setVAddedMl((prev) => Math.min(50.0, Math.round((prev + ml) * 10) / 10));
  };

  const handleReset = () => {
    setIsAutoDropping(false);
    setVAddedMl(0);
  };

  // Generate continuous titration curve points
  const chartData = useMemo(() => {
    const labels: string[] = [];
    const fullCurvePoints: number[] = [];
    const currentTrailPoints: (number | null)[] = [];

    // From 0 to 50 mL at steps of 1 mL (and finer steps near equivalence)
    for (let v = 0; v <= 50; v += 1) {
      labels.push(`${v}`);
      const phVal = calculateTitrationPH(preset, v);
      fullCurvePoints.push(Math.round(phVal * 100) / 100);

      if (v <= vAddedMl) {
        currentTrailPoints.push(Math.round(phVal * 100) / 100);
      } else {
        currentTrailPoints.push(null);
      }
    }

    return {
      labels,
      datasets: [
        {
          label: 'Đường cong chuẩn độ lý thuyết',
          data: fullCurvePoints,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
        },
        {
          label: 'Tiến trình thực nghiệm thực tế',
          data: currentTrailPoints,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          borderWidth: 3,
          pointRadius: 2,
          pointHoverRadius: 6,
          fill: true,
        },
      ],
    };
  }, [preset, vAddedMl]);

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
      {/* Title */}
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
            <Pipette size={24} color="#38bdf8" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#38bdf8', fontSize: { xs: '16px', sm: '18px' } }}>
              Trạm Chuẩn Độ Axit - Bazơ & Đường Cong pH Động Học
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Mô phỏng Buret chia vạch giọt rơi • Máy khuấy từ • Đồ thị bước nhảy pH thời gian thực
            </Typography>
          </Box>
        </Box>

        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 320 } }}>
          <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Chọn thí nghiệm chuẩn độ</InputLabel>
          <Select
            value={selectedPresetId}
            label="Chọn thí nghiệm chuẩn độ"
            onChange={(e) => {
              setSelectedPresetId(e.target.value);
              handleReset();
            }}
            sx={{
              bgcolor: 'rgba(0,0,0,0.3)',
              color: '#fff',
              borderRadius: 2,
              border: '1px solid rgba(56, 189, 248, 0.3)',
            }}
          >
            {TITRATION_PRESETS.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 2.5 }} />

      <Grid container spacing={3}>
        {/* Left Column: Visual Apparatus (Buret + Erlenmeyer Flask) */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              minHeight: 480,
            }}
          >
            {/* Top Buret Status */}
            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="caption" fontWeight="bold" sx={{ color: '#38bdf8' }}>
                Buret: {preset.titrantFormula} ({preset.titrantConcM} M)
              </Typography>
              <Chip
                label={`Đã nhỏ: ${vAddedMl.toFixed(1)} mL / 50 mL`}
                size="small"
                sx={{ fontWeight: 'bold', bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
              />
            </Box>

            {/* Visual Glassware Simulation Container */}
            <Box
              sx={{
                width: 220,
                height: 280,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                my: 1,
              }}
            >
              {/* Buret Tube Graphic */}
              <Box
                sx={{
                  width: 22,
                  height: 120,
                  borderRadius: '3px 3px 6px 6px',
                  bgcolor: 'rgba(255, 255, 255, 0.06)',
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Liquid in Buret (decreases as V is added) */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${Math.max(0, 100 - (vAddedMl / 50) * 100)}%`,
                    bgcolor: 'rgba(56, 189, 248, 0.45)',
                    transition: 'height 0.2s linear',
                  }}
                />
              </Box>

              {/* Buret Stopcock Tap */}
              <Box
                sx={{
                  width: 32,
                  height: 6,
                  bgcolor: isAutoDropping ? '#38bdf8' : '#94a3b8',
                  borderRadius: 2,
                  my: 0.3,
                  boxShadow: isAutoDropping ? '0 0 8px #38bdf8' : 'none',
                }}
              />

              {/* Dropping animated droplet */}
              {isAutoDropping && (
                <Box
                  sx={{
                    width: 6,
                    height: 8,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    bgcolor: '#38bdf8',
                    animation: 'dropAnim 0.4s infinite linear',
                    '@keyframes dropAnim': {
                      '0%': { transform: 'translateY(0)', opacity: 1 },
                      '100%': { transform: 'translateY(24px)', opacity: 0 },
                    },
                  }}
                />
              )}

              {/* Erlenmeyer Flask Body Graphic */}
              <Box
                sx={{
                  width: 140,
                  height: 120,
                  clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderBottom: '3px solid rgba(255, 255, 255, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  mt: 0.5,
                }}
              >
                {/* Stirring vortex liquid with dynamic indicator color */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${Math.min(90, 40 + (vAddedMl / 50) * 45)}%`,
                    bgcolor: indicatorState.hex,
                    transition: 'all 0.3s ease',
                    boxShadow: isEquivalenceReached ? '0 0 25px rgba(244, 114, 182, 0.6)' : 'none',
                    animation: isStirring ? 'stirWave 1.2s infinite ease-in-out' : 'none',
                    '@keyframes stirWave': {
                      '0%, 100%': { transform: 'scaleY(1)' },
                      '50%': { transform: 'scaleY(1.05) skewX(2deg)' },
                    },
                  }}
                />
              </Box>

              {/* Magnetic Stirrer Base Plate */}
              <Box
                sx={{
                  width: 160,
                  height: 12,
                  bgcolor: '#334155',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.1)',
                  mt: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" sx={{ fontSize: '9px', color: '#94a3b8' }}>
                  {isStirring ? '🌀 Máy khuấy từ đang hoạt động' : 'Tắt khuấy từ'}
                </Typography>
              </Box>
            </Box>

            {/* pH Meter Live Display */}
            <Box
              sx={{
                width: '100%',
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 'auto',
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  ĐỘ pH THỜI GIAN THỰC:
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="900"
                  sx={{
                    color: currentPH < 7 ? '#f87171' : currentPH === 7 ? '#34d399' : '#38bdf8',
                    fontFamily: 'monospace',
                  }}
                >
                  pH = {currentPH.toFixed(2)}
                </Typography>
              </Box>

              <Box textAlign="right">
                <Typography variant="caption" color="text.secondary" display="block">
                  MÀU CHỈ THỊ:
                </Typography>
                <Chip
                  label={indicatorState.label}
                  size="small"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '10.5px',
                    bgcolor: indicatorState.hex,
                    color: currentPH >= 8.2 ? '#fff' : '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column: Controls & Dynamic Titration Curve Chart */}
        <Grid item xs={12} md={7}>
          {/* Titration Control Buttons */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2.5,
              borderRadius: 2.5,
              bgcolor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={1}>
              ĐIỀU KHIỂN KHÓA BURET:
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddVolume(0.1)}
                sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', fontWeight: 'bold' }}
              >
                +0.1 mL (1 Giọt)
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddVolume(0.5)}
                sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', fontWeight: 'bold' }}
              >
                +0.5 mL
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddVolume(1.0)}
                sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', fontWeight: 'bold' }}
              >
                +1.0 mL
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAddVolume(5.0)}
                sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', fontWeight: 'bold' }}
              >
                +5.0 mL
              </Button>

              <Button
                variant={isAutoDropping ? 'contained' : 'outlined'}
                color={isAutoDropping ? 'warning' : 'primary'}
                size="small"
                startIcon={<Play size={15} />}
                onClick={() => setIsAutoDropping(!isAutoDropping)}
                sx={{ fontWeight: 'bold', textTransform: 'none' }}
              >
                {isAutoDropping ? 'Dừng Nhỏ Giọt' : 'Nhỏ Giọt Tự Động'}
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<RotateCcw size={15} />}
                onClick={handleReset}
                sx={{ fontWeight: 'bold', textTransform: 'none', ml: 'auto' }}
              >
                Làm Lại
              </Button>
            </Box>

            {/* Slider Control */}
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="caption" sx={{ color: '#94a3b8', minWidth: 90 }}>
                Thể tích thêm vào:
              </Typography>
              <Slider
                size="small"
                min={0}
                max={50}
                step={0.1}
                value={vAddedMl}
                onChange={(_, val) => setVAddedMl(val as number)}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v.toFixed(1)} mL`}
                sx={{ color: '#38bdf8' }}
              />
              <Typography variant="body2" fontWeight="bold" sx={{ color: '#38bdf8', minWidth: 60, textAlign: 'right' }}>
                {vAddedMl.toFixed(1)} mL
              </Typography>
            </Box>
          </Paper>

          {/* Real-time Titration Curve Chart */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2.5,
              bgcolor: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              height: 280,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="caption" fontWeight="bold" color="white" display="flex" alignItems="center" gap={0.5}>
                <TrendingUp size={15} color="#38bdf8" /> ĐƯỜNG CONG CHUẨN ĐỘ (pH THEO THỂ TÍCH V_NaOH):
              </Typography>
              {isEquivalenceReached && (
                <Chip
                  label="✨ ĐÃ ĐẠT ĐIỂM TƯƠNG ĐƯƠNG!"
                  size="small"
                  color="success"
                  sx={{ height: 20, fontSize: '10px', fontWeight: 'bold' }}
                />
              )}
            </Box>

            <Box sx={{ height: 220 }}>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: { display: true, text: 'Thể tích dd chuẩn thêm vào V (mL)', color: '#94a3b8', font: { size: 11 } },
                      grid: { color: 'rgba(255, 255, 255, 0.05)' },
                      ticks: { color: '#94a3b8', font: { size: 10 } },
                    },
                    y: {
                      min: 0,
                      max: 14,
                      title: { display: true, text: 'Độ pH dung dịch', color: '#94a3b8', font: { size: 11 } },
                      grid: { color: 'rgba(255, 255, 255, 0.08)' },
                      ticks: { color: '#94a3b8', font: { size: 10 }, stepSize: 2 },
                    },
                  },
                  plugins: {
                    legend: { labels: { color: '#e2e8f0', font: { size: 11 } } },
                  },
                }}
              />
            </Box>
          </Paper>

          {/* Pedagogical Description */}
          <Alert severity="info" sx={{ mt: 2, borderRadius: 2, bgcolor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}>
            <Typography variant="caption" display="block">
              <b>Nguyên tắc:</b> {preset.description}
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Paper>
  );
}
