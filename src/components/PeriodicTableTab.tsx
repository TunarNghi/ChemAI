"use client";

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Button,
  Stack,
  Tooltip,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search,
  X,
  Layers,
  Thermometer,
  Sparkles,
  ArrowRightLeft,
  Info,
  SlidersHorizontal,
  Flame,
  Atom,
  RefreshCw,
} from 'lucide-react';
import {
  ChemicalElement,
  MainCategory,
  SubCategory,
  MAIN_CATEGORY_COLORS,
  SUB_CATEGORY_LABELS,
  SUB_CATEGORY_STYLES,
  getSpectralHeatmapStyle,
  getIonizationEnergyStyle,
} from '@/lib/elementsTypes';
import {
  ELEMENTS_DATA,
  PERIODIC_GRID_POSITIONS,
  getElementByAtomicNumber,
  searchElements,
} from '@/lib/elementsData';
import ElementDetailModal from '@/components/ElementDetailModal';
import OrbitalSimulator from '@/components/OrbitalSimulator';
import { Volume2 } from 'lucide-react';

export type HeatmapMode = 'none' | 'electronegativity' | 'atomicRadius' | 'ionizationEnergy' | 'atomicMass';

export default function PeriodicTableTab() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // Mobile Display Mode: Cards (fast thumb list) vs Grid (18-column scrollable map)
  const [mobileDisplayMode, setMobileDisplayMode] = useState<'cards' | 'grid'>('cards');

  // Main View Mode (Table vs Orbital Simulator)
  const [viewMode, setViewMode] = useState<'table' | 'orbital'>('table');
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>('none');

  // Classification Mode: Default (3 main categories) vs Advanced (10 detailed subcategories)
  const [isAdvancedCategories, setIsAdvancedCategories] = useState<boolean>(false);

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState<SubCategory | 'all'>('all');
  const [selectedMainCat, setSelectedMainCat] = useState<MainCategory | 'all'>('all');
  const [selectedBlock, setSelectedBlock] = useState<'all' | 's' | 'p' | 'd' | 'f'>('all');
  const [selectedState, setSelectedState] = useState<'all' | 'solid' | 'liquid' | 'gas'>('all');
  const [temperatureC, setTemperatureC] = useState<number>(25); // Room temperature 25°C
  const [tempEnabled, setTempEnabled] = useState<boolean>(false);

  // Selected element for detail modal
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Compare mode state
  const [compareModalOpen, setCompareModalOpen] = useState<boolean>(false);
  const [compareEl1, setCompareEl1] = useState<ChemicalElement>(ELEMENTS_DATA[0]); // H
  const [compareEl2, setCompareEl2] = useState<ChemicalElement>(ELEMENTS_DATA[25]); // Fe

  // Speak IUPAC name
  const speakIUPACName = (name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered elements set for fast lookup
  const filteredElements = useMemo(() => {
    return searchElements(searchQuery).filter((el) => {
      // Main category filter
      if (selectedMainCat !== 'all' && el.mainCategory !== selectedMainCat) {
        return false;
      }
      // Subcategory filter (applies when in advanced mode)
      if (isAdvancedCategories && selectedSubCat !== 'all' && el.subCategory !== selectedSubCat) {
        return false;
      }
      // Block filter
      if (selectedBlock !== 'all' && el.block !== selectedBlock) {
        return false;
      }
      // State filter or temp-dependent state
      if (tempEnabled) {
        const calculatedState = getElementStateAtTemp(el, temperatureC);
        if (selectedState !== 'all' && calculatedState !== selectedState) {
          return false;
        }
      } else if (selectedState !== 'all' && el.standardState !== selectedState) {
        return false;
      }
      return true;
    });
  }, [searchQuery, isAdvancedCategories, selectedSubCat, selectedMainCat, selectedBlock, selectedState, tempEnabled, temperatureC]);

  const filteredZSet = useMemo(() => {
    return new Set(filteredElements.map((e) => e.atomicNumber));
  }, [filteredElements]);

  // Handle tile click
  const handleOpenDetail = (z: number) => {
    const el = getElementByAtomicNumber(z);
    if (el) {
      setSelectedElement(el);
      setModalOpen(true);
    }
  };

  // Helper to compute state at custom temperature
  function getElementStateAtTemp(el: ChemicalElement, tempC: number): 'solid' | 'liquid' | 'gas' | 'unknown' {
    if (el.meltingPointC === undefined || el.boilingPointC === undefined) {
      return el.standardState;
    }
    if (tempC < el.meltingPointC) return 'solid';
    if (tempC >= el.meltingPointC && tempC < el.boilingPointC) return 'liquid';
    return 'gas';
  }

  return (
    <Box sx={{ width: '100%', pb: 6 }}>
      {/* Header Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          mb: 3,
          borderRadius: 3.5,
          bgcolor: '#0f172a',
          backgroundImage: 'radial-gradient(ellipse at top left, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.95) 70%)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.1)',
        }}
      >
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={2}>
          <Box>
            <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                }}
              >
                <Atom size={26} color="#38bdf8" />
              </Box>
              <Typography
                variant="h4"
                fontWeight="900"
                sx={{
                  fontSize: { xs: '20px', sm: '24px', md: '28px' },
                  background: 'linear-gradient(45deg, #38bdf8, #818cf8, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Bảng Tuần Hoàn 118 Nguyên Tố & Ô Lượng Tử 4D
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 780 }}>
              Chuẩn danh pháp IUPAC & Chương trình GDPT 2018. Mặc định <b>3 họ cơ bản</b> (Kim loại, Phi kim, Khí hiếm) hoặc <b>10 họ nâng cao</b>, tích hợp <b>Heatmap Năng lượng ion hóa tương phản cao</b> và <b>Mô phỏng Orbital Aufbau</b>.
            </Typography>
          </Box>

          {/* Action Button Group */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button
              variant={viewMode === 'orbital' ? 'contained' : 'outlined'}
              color="info"
              startIcon={<Sparkles size={17} />}
              onClick={() => setViewMode(viewMode === 'table' ? 'orbital' : 'table')}
              sx={{
                fontWeight: 'bold',
                borderRadius: 2.5,
                px: 2,
                py: 0.8,
                fontSize: '13px',
                textTransform: 'none',
              }}
            >
              {viewMode === 'table' ? 'Mô Phỏng Ô Orbital (Aufbau)' : 'Quay Lại Bảng Tuần Hoàn'}
            </Button>

            <Button
              variant="outlined"
              startIcon={<ArrowRightLeft size={17} />}
              onClick={() => setCompareModalOpen(true)}
              sx={{
                borderColor: 'rgba(129, 140, 248, 0.4)',
                color: '#818cf8',
                fontWeight: 'bold',
                borderRadius: 2.5,
                px: 2,
                py: 0.8,
                fontSize: '13px',
                bgcolor: 'rgba(129, 140, 248, 0.08)',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'rgba(129, 140, 248, 0.2)',
                  borderColor: '#818cf8',
                },
              }}
            >
              So Sánh 2 Nguyên Tố
            </Button>
          </Stack>
        </Box>

        {/* Global Search & Filters Toolbar */}
        <Box sx={{ mt: 3, pt: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Quick Search Input */}
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="🔍 Tìm: Fe, Sắt, Iron, Z=26, Khối d, Nhóm 8, CAS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#38bdf8" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                        <X size={15} color="#94a3b8" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  sx: {
                    bgcolor: 'rgba(0, 0, 0, 0.35)',
                    borderRadius: 2,
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#fff',
                    fontSize: '13px',
                    '&:hover': { borderColor: '#38bdf8' },
                  },
                }}
              />
            </Grid>

            {/* Classification Bar: 3 Default Families vs 10 Advanced Subcategories */}
            <Grid item xs={12} lg={8}>
              <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                {/* Left: Category Chips */}
                <Box display="flex" alignItems="center" gap={0.8} flexWrap="wrap">
                  {!isAdvancedCategories ? (
                    /* Default Mode: 3 Major Families */
                    <>
                      <Typography variant="caption" color="#38bdf8" fontWeight="bold" sx={{ mr: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        🏷️ 3 Họ Mặc Định:
                      </Typography>
                      <Chip
                        label="Tất cả (118)"
                        size="small"
                        onClick={() => setSelectedMainCat('all')}
                        variant={selectedMainCat === 'all' ? 'filled' : 'outlined'}
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '11px',
                          height: 26,
                          bgcolor: selectedMainCat === 'all' ? '#0284c7' : 'transparent',
                          color: selectedMainCat === 'all' ? '#fff' : '#94a3b8',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                        }}
                      />
                      <Chip
                        label="🛡️ Kim loại (94)"
                        size="small"
                        onClick={() => setSelectedMainCat(selectedMainCat === 'metal' ? 'all' : 'metal')}
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '11px',
                          height: 26,
                          bgcolor: selectedMainCat === 'metal' ? MAIN_CATEGORY_COLORS.metal.bg : MAIN_CATEGORY_COLORS.metal.lightBg,
                          color: MAIN_CATEGORY_COLORS.metal.text,
                          border: `1.5px solid ${MAIN_CATEGORY_COLORS.metal.border}`,
                          boxShadow: selectedMainCat === 'metal' ? `0 0 12px ${MAIN_CATEGORY_COLORS.metal.glow}` : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          '&:hover': { transform: 'translateY(-1px)', filter: 'brightness(1.2)' },
                        }}
                      />
                      <Chip
                        label="🌿 Phi kim (18)"
                        size="small"
                        onClick={() => setSelectedMainCat(selectedMainCat === 'nonmetal' ? 'all' : 'nonmetal')}
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '11px',
                          height: 26,
                          bgcolor: selectedMainCat === 'nonmetal' ? MAIN_CATEGORY_COLORS.nonmetal.bg : MAIN_CATEGORY_COLORS.nonmetal.lightBg,
                          color: MAIN_CATEGORY_COLORS.nonmetal.text,
                          border: `1.5px solid ${MAIN_CATEGORY_COLORS.nonmetal.border}`,
                          boxShadow: selectedMainCat === 'nonmetal' ? `0 0 12px ${MAIN_CATEGORY_COLORS.nonmetal.glow}` : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          '&:hover': { transform: 'translateY(-1px)', filter: 'brightness(1.2)' },
                        }}
                      />
                      <Chip
                        label="⚡ Khí hiếm (6)"
                        size="small"
                        onClick={() => setSelectedMainCat(selectedMainCat === 'noble_gas' ? 'all' : 'noble_gas')}
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '11px',
                          height: 26,
                          bgcolor: selectedMainCat === 'noble_gas' ? MAIN_CATEGORY_COLORS.noble_gas.bg : MAIN_CATEGORY_COLORS.noble_gas.lightBg,
                          color: MAIN_CATEGORY_COLORS.noble_gas.text,
                          border: `1.5px solid ${MAIN_CATEGORY_COLORS.noble_gas.border}`,
                          boxShadow: selectedMainCat === 'noble_gas' ? `0 0 12px ${MAIN_CATEGORY_COLORS.noble_gas.glow}` : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          '&:hover': { transform: 'translateY(-1px)', filter: 'brightness(1.2)' },
                        }}
                      />
                    </>
                  ) : (
                    /* Advanced Mode: 10 Subcategories */
                    <>
                      <Typography variant="caption" color="#c084fc" fontWeight="bold" sx={{ mr: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        🌈 10 Họ Chi Tiết:
                      </Typography>
                      <Chip
                        label="Tất cả (118)"
                        size="small"
                        onClick={() => { setSelectedSubCat('all'); setSelectedMainCat('all'); }}
                        variant={selectedSubCat === 'all' && selectedMainCat === 'all' ? 'filled' : 'outlined'}
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '11px',
                          height: 24,
                          bgcolor: selectedSubCat === 'all' && selectedMainCat === 'all' ? '#0284c7' : 'transparent',
                          color: selectedSubCat === 'all' && selectedMainCat === 'all' ? '#fff' : '#94a3b8',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                        }}
                      />
                      {Object.entries(SUB_CATEGORY_STYLES).map(([key, style]) => {
                        const isSelected = selectedSubCat === key;
                        return (
                          <Chip
                            key={key}
                            label={style.label}
                            size="small"
                            onClick={() => {
                              setSelectedSubCat(isSelected ? 'all' : (key as SubCategory));
                              setSelectedMainCat('all');
                            }}
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '10px',
                              height: 24,
                              bgcolor: isSelected ? style.bg : style.lightBg,
                              color: style.text,
                              border: `1.5px solid ${style.border}`,
                              boxShadow: isSelected ? `0 0 12px ${style.glow}` : 'none',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              '&:hover': { transform: 'translateY(-1px)', filter: 'brightness(1.25)' },
                            }}
                          />
                        );
                      })}
                    </>
                  )}
                </Box>

                {/* Right: Advanced Toggle Button */}
                <Button
                  size="small"
                  variant={isAdvancedCategories ? 'contained' : 'outlined'}
                  startIcon={isAdvancedCategories ? <Sparkles size={15} /> : <SlidersHorizontal size={15} />}
                  onClick={() => {
                    setIsAdvancedCategories(!isAdvancedCategories);
                    setSelectedSubCat('all');
                    setSelectedMainCat('all');
                  }}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '11.5px',
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.4,
                    textTransform: 'none',
                    bgcolor: isAdvancedCategories ? '#7c3aed' : 'rgba(168, 85, 247, 0.1)',
                    borderColor: 'rgba(168, 85, 247, 0.5)',
                    color: isAdvancedCategories ? '#ffffff' : '#c084fc',
                    boxShadow: isAdvancedCategories ? '0 0 15px rgba(124, 58, 237, 0.55)' : 'none',
                    '&:hover': {
                      bgcolor: isAdvancedCategories ? '#6d28d9' : 'rgba(168, 85, 247, 0.22)',
                      borderColor: '#c084fc',
                    },
                  }}
                >
                  {isAdvancedCategories ? 'Đang bật 10 Họ (Bấm để về 3 họ)' : '⚡ Bật 10 Họ Nâng Cao'}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Heatmap & Secondary Filters Toolbar */}
          <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} gap={2} mt={2}>
            {/* Heatmap Mode Selector */}
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                🔥 Bản đồ nhiệt (Heatmap):
              </Typography>
              <Chip
                label={isAdvancedCategories ? "Mặc định (10 Họ Nguyên Tố)" : "Mặc định (3 Họ Cơ Bản)"}
                size="small"
                onClick={() => setHeatmapMode('none')}
                variant={heatmapMode === 'none' ? 'filled' : 'outlined'}
                sx={{
                  height: 25,
                  fontSize: '11px',
                  fontWeight: 'bold',
                  bgcolor: heatmapMode === 'none' ? '#0284c7' : 'transparent',
                  color: heatmapMode === 'none' ? '#fff' : '#94a3b8',
                }}
              />
              <Chip
                label="Độ Âm Điện (Pauling χ)"
                size="small"
                onClick={() => setHeatmapMode('electronegativity')}
                variant={heatmapMode === 'electronegativity' ? 'filled' : 'outlined'}
                sx={{
                  height: 25,
                  fontSize: '11px',
                  fontWeight: 'bold',
                  bgcolor: heatmapMode === 'electronegativity' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
                  color: heatmapMode === 'electronegativity' ? '#f87171' : '#94a3b8',
                  borderColor: heatmapMode === 'electronegativity' ? '#ef4444' : 'rgba(255, 255, 255, 0.12)',
                }}
              />
              <Chip
                label="Bán Kính Nguyên Tử (pm)"
                size="small"
                onClick={() => setHeatmapMode('atomicRadius')}
                variant={heatmapMode === 'atomicRadius' ? 'filled' : 'outlined'}
                sx={{
                  height: 25,
                  fontSize: '11px',
                  fontWeight: 'bold',
                  bgcolor: heatmapMode === 'atomicRadius' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                  color: heatmapMode === 'atomicRadius' ? '#34d399' : '#94a3b8',
                  borderColor: heatmapMode === 'atomicRadius' ? '#10b981' : 'rgba(255, 255, 255, 0.12)',
                }}
              />
              <Chip
                label="⚡ Năng Lượng Ion Hóa I₁ (kJ/mol)"
                size="small"
                onClick={() => setHeatmapMode('ionizationEnergy')}
                variant={heatmapMode === 'ionizationEnergy' ? 'filled' : 'outlined'}
                sx={{
                  height: 25,
                  fontSize: '11px',
                  fontWeight: '900',
                  bgcolor: heatmapMode === 'ionizationEnergy' ? 'rgba(168, 85, 247, 0.35)' : 'rgba(168, 85, 247, 0.08)',
                  color: heatmapMode === 'ionizationEnergy' ? '#e879f9' : '#c084fc',
                  border: `1.5px solid ${heatmapMode === 'ionizationEnergy' ? '#d946ef' : 'rgba(168, 85, 247, 0.3)'}`,
                  boxShadow: heatmapMode === 'ionizationEnergy' ? '0 0 12px rgba(217, 70, 239, 0.4)' : 'none',
                }}
              />
            </Box>

            {/* Interactive Temperature Slider Toggle */}
            <Box display="flex" alignItems="center" gap={1.5} sx={{ minWidth: { xs: '100%', lg: 320 } }}>
              <Chip
                icon={<Thermometer size={14} />}
                label={tempEnabled ? `${temperatureC}°C (${temperatureC + 273}K)` : 'Mô phỏng nhiệt độ (T)'}
                size="small"
                onClick={() => setTempEnabled(!tempEnabled)}
                color={tempEnabled ? 'warning' : 'default'}
                variant={tempEnabled ? 'filled' : 'outlined'}
                sx={{ fontWeight: 'bold', fontSize: '11px', flexShrink: 0 }}
              />
              {tempEnabled && (
                <Slider
                  size="small"
                  min={-273}
                  max={4000}
                  step={20}
                  value={temperatureC}
                  onChange={(_, val) => setTemperatureC(val as number)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}°C`}
                  sx={{
                    color: '#f59e0b',
                    '& .MuiSlider-thumb': { boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)' },
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Full Spectral Heatmap Legend Bar (shown when active) */}
          {heatmapMode !== 'none' && (
            <Box sx={{ mt: 2, p: 1.8, borderRadius: 2.5, bgcolor: 'rgba(0, 0, 0, 0.55)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              {heatmapMode === 'ionizationEnergy' ? (
                /* Specialized 6-tier Ionization Energy Legend Bar */
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5} mb={1}>
                    <Typography variant="caption" fontWeight="900" sx={{ color: '#e879f9', fontSize: '12px' }}>
                      ⚡ Thang Đo Năng Lượng Ion Hóa Thứ Nhất I₁ (kJ/mol) — 6 Tầng Màu Tương Phản Cao:
                    </Typography>
                    <Typography variant="caption" color="#94a3b8" sx={{ fontSize: '11px' }}>
                      Càng sang phải / lên trên chu kỳ thì $I_1$ càng cao (hạt nhân hút electron càng chặt)
                    </Typography>
                  </Box>

                  {/* Gradient Track with Milestone Labels */}
                  <Box sx={{ position: 'relative', my: 1.5 }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 14,
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #1e3a8a 0%, #0284c7 15%, #06b6d4 30%, #10b981 48%, #f59e0b 68%, #ef4444 85%, #d946ef 100%)',
                        boxShadow: '0 0 16px rgba(217, 70, 239, 0.35)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                      }}
                    />
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5} px={0.5}>
                      <Typography variant="caption" sx={{ color: '#60a5fa', fontSize: '10.5px', fontWeight: 'bold' }}>
                        Cs 375 kJ
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#22d3ee', fontSize: '10.5px', fontWeight: 'bold' }}>
                        Ca 590 kJ
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#4ade80', fontSize: '10.5px', fontWeight: 'bold' }}>
                        Fe 762 kJ
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#fde047', fontSize: '10.5px', fontWeight: 'bold' }}>
                        C 1086 kJ
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#fda4af', fontSize: '10.5px', fontWeight: 'bold' }}>
                        Cl 1251 kJ
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#f472b6', fontSize: '10.5px', fontWeight: 'bold' }}>
                        F 1681 kJ
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#f0abfc', fontSize: '10.5px', fontWeight: 'bold' }}>
                        He 2372 kJ
                      </Typography>
                    </Box>
                  </Box>

                  {/* 6 Micro-tier Explanation Chips */}
                  <Grid container spacing={0.8} mt={0.5}>
                    <Grid item xs={6} sm={4} md={2}>
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'rgba(30, 58, 138, 0.4)', border: '1px solid #38bdf8' }}>
                        <Typography variant="caption" sx={{ color: '#7dd3fc', fontWeight: 'bold', display: 'block', fontSize: '10px' }}>
                          🔵 350-550 kJ/mol
                        </Typography>
                        <Typography variant="caption" color="#cbd5e1" sx={{ fontSize: '9px' }}>
                          Rất dễ mất e (Kiềm: Cs, Na, K...)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'rgba(8, 145, 178, 0.35)', border: '1px solid #22d3ee' }}>
                        <Typography variant="caption" sx={{ color: '#67e8f9', fontWeight: 'bold', display: 'block', fontSize: '10px' }}>
                          🌊 550-750 kJ/mol
                        </Typography>
                        <Typography variant="caption" color="#cbd5e1" sx={{ fontSize: '9px' }}>
                          Dễ mất e (Kiềm thổ, Lantan, Al...)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'rgba(5, 150, 105, 0.35)', border: '1px solid #4ade80' }}>
                        <Typography variant="caption" sx={{ color: '#86efac', fontWeight: 'bold', display: 'block', fontSize: '10px' }}>
                          🟢 750-950 kJ/mol
                        </Typography>
                        <Typography variant="caption" color="#cbd5e1" sx={{ fontSize: '9px' }}>
                          Trung bình (Chuyển tiếp 3d, Á kim)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'rgba(217, 119, 6, 0.35)', border: '1px solid #fde047' }}>
                        <Typography variant="caption" sx={{ color: '#fef08a', fontWeight: 'bold', display: 'block', fontSize: '10px' }}>
                          🟡 950-1250 kJ/mol
                        </Typography>
                        <Typography variant="caption" color="#cbd5e1" sx={{ fontSize: '9px' }}>
                          Khó mất e (Phi kim C, P, S, Halogen I, Br)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'rgba(220, 38, 38, 0.35)', border: '1px solid #fda4af' }}>
                        <Typography variant="caption" sx={{ color: '#fecdd3', fontWeight: 'bold', display: 'block', fontSize: '10px' }}>
                          🔴 1250-1650 kJ/mol
                        </Typography>
                        <Typography variant="caption" color="#cbd5e1" sx={{ fontSize: '9px' }}>
                          Rất khó mất e (O, N, Cl, Ar, Kr)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: 'rgba(192, 38, 211, 0.4)', border: '1px solid #f0abfc' }}>
                        <Typography variant="caption" sx={{ color: '#f5d0fe', fontWeight: 'bold', display: 'block', fontSize: '10px' }}>
                          🟣 &gt;1650 kJ/mol
                        </Typography>
                        <Typography variant="caption" color="#cbd5e1" sx={{ fontSize: '9px' }}>
                          Bền vững cực đại (F, Ne, He)
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                /* Standard Legend for Electronegativity & Atomic Radius */
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5}>
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#38bdf8' }}>
                    {heatmapMode === 'electronegativity' && '🌈 Phổ Màu Độ Âm Điện Pauling (χ): 0.70 (Fr, Cs - Xanh biển) → 3.98 (F - Đỏ tím cực đại)'}
                    {heatmapMode === 'atomicRadius' && '🌈 Phổ Màu Bán Kính Nguyên Tử: 31 pm (He - Xanh biển nhỏ nhất) → 265 pm (Cs - Đỏ hồng lớn nhất)'}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Typography variant="caption" sx={{ color: '#60a5fa', fontSize: '11px', fontWeight: 'bold' }}>
                      {heatmapMode === 'electronegativity' && '0.70 (Thấp)'}
                      {heatmapMode === 'atomicRadius' && '31 pm (Nhỏ)'}
                    </Typography>
                    <Box
                      sx={{
                        width: 220,
                        height: 12,
                        borderRadius: 1.5,
                        background: 'linear-gradient(to right, #2563eb 0%, #06b6d4 20%, #10b981 40%, #eab308 65%, #f97316 85%, #ec4899 100%)',
                        boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#f472b6', fontSize: '11px', fontWeight: 'bold' }}>
                      {heatmapMode === 'electronegativity' && '3.98 (Cao nhất)'}
                      {heatmapMode === 'atomicRadius' && '265 pm (Lớn nhất)'}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Conditional View: Orbital Simulator vs Full Periodic Table Grid */}
      {viewMode === 'orbital' ? (
        <OrbitalSimulator />
      ) : isMobile && mobileDisplayMode === 'cards' ? (
        /* Mobile Dedicated Element Cards Grid */
        <Box sx={{ width: '100%' }}>
          {/* Mobile View Switcher */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            p={1.2}
            bgcolor="rgba(15, 23, 42, 0.75)"
            borderRadius={3}
            border="1px solid rgba(56, 189, 248, 0.3)"
          >
            <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 'bold' }}>
              📱 Chế độ xem điện thoại:
            </Typography>
            <Stack direction="row" spacing={0.8}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setMobileDisplayMode('cards')}
                sx={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  py: 0.3,
                  px: 1.2,
                  borderRadius: 2,
                  bgcolor: '#0284c7',
                }}
              >
                📑 Thẻ ({filteredElements.length})
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setMobileDisplayMode('grid')}
                sx={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  py: 0.3,
                  px: 1.2,
                  borderRadius: 2,
                  bgcolor: 'transparent',
                }}
              >
                🗺️ Bản Đồ 18 Cột
              </Button>
            </Stack>
          </Box>

          {/* Mobile Cards Grid */}
          <Grid container spacing={1.2}>
            {filteredElements.map((element) => {
              const mainCatStyle = MAIN_CATEGORY_COLORS[element.mainCategory];
              const subCatStyle = SUB_CATEGORY_STYLES[element.subCategory] || mainCatStyle;
              const tileBg = isAdvancedCategories ? subCatStyle.bg : mainCatStyle.bg;
              const tileBorder = isAdvancedCategories ? `1.5px solid ${subCatStyle.border}` : `1.5px solid ${mainCatStyle.border}`;
              const subCatObj = SUB_CATEGORY_LABELS[element.subCategory];
              const subCatName = subCatObj ? subCatObj.label : element.mainCategory;
              return (
                <Grid item xs={6} sm={4} key={element.atomicNumber}>
                  <Paper
                    onClick={() => handleOpenDetail(element.atomicNumber)}
                    sx={{
                      p: 1.2,
                      borderRadius: 2.5,
                      background: tileBg,
                      border: tileBorder,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      minHeight: 90,
                      transition: 'all 0.15s ease',
                      '&:active': { transform: 'scale(0.97)' },
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Chip
                        label={`Z=${element.atomicNumber}`}
                        size="small"
                        sx={{ height: 18, fontSize: 9.5, fontWeight: 'bold', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff' }}
                      />
                      <Typography variant="caption" sx={{ fontSize: '10px', color: '#e0f2fe', fontWeight: 'bold' }}>
                        {typeof element.atomicMass === 'number' ? element.atomicMass.toFixed(1) : element.atomicMass}
                      </Typography>
                    </Box>

                    <Box textAlign="center" my={0.5}>
                      <Typography variant="h5" fontWeight="900" sx={{ color: '#fff', lineHeight: 1 }}>
                        {element.symbol}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#f8fafc', fontWeight: 600, fontSize: '11px', display: 'block', mt: 0.2 }} noWrap>
                        {element.nameVi} ({element.nameEn})
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center" pt={0.5} borderTop="1px solid rgba(255,255,255,0.1)">
                      <Typography variant="caption" sx={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)' }}>
                        Khối {element.block} • Nhóm {element.group}
                      </Typography>
                      <Chip
                        label={subCatName}
                        size="small"
                        sx={{ height: 16, fontSize: '8px', bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        /* Main IUPAC Periodic Table Grid Container */
        <Box
          sx={{
            overflowX: 'auto',
            pb: 2,
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(56, 189, 248, 0.3)', borderRadius: 4 },
          }}
        >
          {isMobile && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1.5}
              p={1}
              bgcolor="rgba(15, 23, 42, 0.75)"
              borderRadius={2}
              border="1px solid rgba(56, 189, 248, 0.3)"
            >
              <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 'bold' }}>
                👉 Vuốt ngang để xem đủ 18 nhóm
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setMobileDisplayMode('cards')}
                sx={{ fontSize: '10.5px', textTransform: 'none', py: 0.2, px: 1, borderRadius: 2 }}
              >
                Chuyển sang dạng Thẻ 📑
              </Button>
            </Box>
          )}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(18, minmax(64px, 1fr))',
              gridTemplateRows: 'repeat(10, minmax(68px, auto))',
              gap: '6px',
              minWidth: 1200,
              p: 1,
              bgcolor: 'rgba(15, 23, 42, 0.4)',
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Render All 118 Element Tiles with Dynamic Heatmap Gradient */}
            {ELEMENTS_DATA.map((element) => {
              const pos = PERIODIC_GRID_POSITIONS[element.atomicNumber];
              if (!pos) return null;

              const isMatch = filteredZSet.has(element.atomicNumber);
              const mainCatStyle = MAIN_CATEGORY_COLORS[element.mainCategory];
              const subCatStyle = SUB_CATEGORY_STYLES[element.subCategory] || mainCatStyle;
              
              // By default, color by 3 main categories unless advanced 10-subcategories mode is toggled
              let tileBg = isAdvancedCategories ? subCatStyle.bg : mainCatStyle.bg;
              let tileBorder = isAdvancedCategories ? `1.5px solid ${subCatStyle.border}` : `1.5px solid ${mainCatStyle.border}`;
              let tileGlow = isAdvancedCategories ? subCatStyle.glow : mainCatStyle.glow;
              let tileTopRightText = typeof element.atomicMass === 'number'
                ? element.atomicMass.toFixed(element.atomicMass < 10 ? 2 : 1)
                : element.atomicMass;

              if (heatmapMode === 'electronegativity') {
                const en = element.electronegativityPauling;
                if (en !== undefined) {
                  const t = Math.max(0, Math.min(1, (en - 0.7) / (3.98 - 0.7)));
                  const heat = getSpectralHeatmapStyle(t);
                  tileBg = heat.bg;
                  tileBorder = heat.border;
                  tileGlow = heat.glow;
                  tileTopRightText = `χ ${en}`;
                } else {
                  tileBg = 'rgba(15, 23, 42, 0.75)';
                  tileBorder = '1.5px solid rgba(255, 255, 255, 0.15)';
                  tileGlow = 'none';
                  tileTopRightText = '—';
                }
              } else if (heatmapMode === 'atomicRadius') {
                const rad = element.atomicRadiusEmpirical;
                if (rad !== undefined) {
                  const t = Math.max(0, Math.min(1, (rad - 31) / (265 - 31)));
                  const heat = getSpectralHeatmapStyle(t);
                  tileBg = heat.bg;
                  tileBorder = heat.border;
                  tileGlow = heat.glow;
                  tileTopRightText = `${rad}pm`;
                } else {
                  tileBg = 'rgba(15, 23, 42, 0.75)';
                  tileBorder = '1.5px solid rgba(255, 255, 255, 0.15)';
                  tileGlow = 'none';
                  tileTopRightText = '—';
                }
              } else if (heatmapMode === 'ionizationEnergy') {
                const i1 = element.ionizationEnergies?.[0];
                if (i1 !== undefined) {
                  const heat = getIonizationEnergyStyle(i1);
                  tileBg = heat.bg;
                  tileBorder = heat.border;
                  tileGlow = heat.glow;
                  tileTopRightText = `${i1} kJ`;
                } else {
                  tileBg = 'rgba(15, 23, 42, 0.75)';
                  tileBorder = '1.5px solid rgba(255, 255, 255, 0.15)';
                  tileGlow = 'none';
                  tileTopRightText = '—';
                }
              }

              return (
                <Box
                  key={element.atomicNumber}
                  onClick={() => handleOpenDetail(element.atomicNumber)}
                  sx={{
                    gridRow: pos.row,
                    gridColumn: pos.col,
                    borderRadius: 2,
                    background: tileBg,
                    border: tileBorder,
                    p: 0.6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isMatch ? 1 : 0.15,
                    transform: isMatch ? 'scale(1)' : 'scale(0.96)',
                    boxShadow: isMatch ? `0 2px 10px rgba(0,0,0,0.4)` : 'none',
                    '&:hover': {
                      transform: 'scale(1.10)',
                      zIndex: 10,
                      borderColor: '#ffffff',
                      boxShadow: `0 0 20px ${tileGlow}, 0 6px 16px rgba(0,0,0,0.7)`,
                    },
                  }}
                >
                  {/* Top Row: Z and Property Badge / Audio */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" px={0.3}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1,
                      }}
                    >
                      {element.atomicNumber}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '8.5px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1,
                        fontFamily: 'monospace',
                        fontWeight: 800,
                        bgcolor: heatmapMode === 'ionizationEnergy' ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
                        px: heatmapMode === 'ionizationEnergy' ? 0.4 : 0,
                        py: heatmapMode === 'ionizationEnergy' ? 0.1 : 0,
                        borderRadius: 1,
                      }}
                    >
                      {tileTopRightText}
                    </Typography>
                  </Box>

                  {/* Center: CHEMICAL SYMBOL */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: '17px', sm: '19px' },
                      color: '#ffffff',
                      lineHeight: 1,
                      my: 0.2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {element.symbol}
                  </Typography>

                  {/* Bottom: IUPAC English Name & Vietnamese name hint */}
                  <Box display="flex" alignItems="center" justifyContent="center" width="100%" gap={0.3}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '8px',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1,
                        maxWidth: '85%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                      }}
                    >
                      {element.nameEn}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

          {/* Lanthanoids Reference Box in Grid (Row 6, Col 3) */}
          <Box
            sx={{
              gridRow: 6,
              gridColumn: 3,
              borderRadius: 2,
              border: '1.5px dashed rgba(6, 182, 212, 0.5)',
              bgcolor: 'rgba(6, 182, 212, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0.5,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 'bold', color: '#06b6d4' }}>
              57-71
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 800, color: '#e0f2fe' }}>
              La - Lu
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '7.5px', color: '#94a3b8' }}>
              Lantanoid
            </Typography>
          </Box>

          {/* Actinoids Reference Box in Grid (Row 7, Col 3) */}
          <Box
            sx={{
              gridRow: 7,
              gridColumn: 3,
              borderRadius: 2,
              border: '1.5px dashed rgba(236, 72, 153, 0.5)',
              bgcolor: 'rgba(236, 72, 153, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0.5,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 'bold', color: '#ec4899' }}>
              89-103
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 800, color: '#fdf2f8' }}>
              Ac - Lr
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '7.5px', color: '#94a3b8' }}>
              Actinoid
            </Typography>
          </Box>

          {/* Lanthanoids Label Row Indicator */}
          <Box
            sx={{
              gridRow: 9,
              gridColumn: '1 / 4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pr: 1.5,
            }}
          >
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#06b6d4', fontSize: '11px' }}>
              * Họ Lantan (Lanthanoids) →
            </Typography>
          </Box>

          {/* Actinoids Label Row Indicator */}
          <Box
            sx={{
              gridRow: 10,
              gridColumn: '1 / 4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pr: 1.5,
            }}
          >
            <Typography variant="caption" fontWeight="bold" sx={{ color: '#ec4899', fontSize: '11px' }}>
              ** Họ Actini (Actinoids) →
            </Typography>
          </Box>
        </Box>
      </Box>
      )}

      {/* Dynamic Classification Legend (3 Default Families vs 10 Advanced Subcategories) */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mt: 3,
          borderRadius: 3,
          bgcolor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {!isAdvancedCategories ? (
          /* Default Legend: 3 Main Categories */
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} mb={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle2" fontWeight="900" color="#38bdf8">
                  📌 Phân Loại 3 Họ Nguyên Tố Cơ Bản (Nhấp vào thẻ để lọc):
                </Typography>
                <Chip
                  label="Chế độ mặc định"
                  size="small"
                  sx={{ height: 20, fontSize: '10px', bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontWeight: 'bold' }}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                {selectedMainCat !== 'all' && (
                  <Chip
                    label="Hủy lọc (Hiện tất cả 118)"
                    size="small"
                    color="primary"
                    onClick={() => setSelectedMainCat('all')}
                    sx={{ height: 22, fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                  />
                )}
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<SlidersHorizontal size={14} />}
                  onClick={() => setIsAdvancedCategories(true)}
                  sx={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    color: '#c084fc',
                    borderColor: 'rgba(168, 85, 247, 0.4)',
                    bgcolor: 'rgba(168, 85, 247, 0.08)',
                    '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.18)', borderColor: '#c084fc' },
                  }}
                >
                  ⚡ Mở 10 họ chi tiết
                </Button>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {/* Metal Card */}
              <Grid item xs={12} md={4}>
                <Box
                  onClick={() => setSelectedMainCat(selectedMainCat === 'metal' ? 'all' : 'metal')}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    bgcolor: selectedMainCat === 'metal' ? MAIN_CATEGORY_COLORS.metal.bg : MAIN_CATEGORY_COLORS.metal.lightBg,
                    border: `1.5px solid ${MAIN_CATEGORY_COLORS.metal.border}`,
                    boxShadow: selectedMainCat === 'metal' ? `0 0 16px ${MAIN_CATEGORY_COLORS.metal.glow}` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    '&:hover': { transform: 'translateY(-2px)', filter: 'brightness(1.15)' },
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: MAIN_CATEGORY_COLORS.metal.text, fontSize: '14px' }}>
                      🛡️ Kim Loại (Metals)
                    </Typography>
                    <Chip
                      label="94 nguyên tố (79.7%)"
                      size="small"
                      sx={{ bgcolor: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontWeight: 'bold', fontSize: '10.5px' }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', fontSize: '11px', lineHeight: 1.4, mb: 1 }}>
                    {MAIN_CATEGORY_COLORS.metal.desc}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '10.5px', display: 'block' }}>
                    <b>Ví dụ tiêu biểu:</b> Fe (Sắt), Cu (Đồng), Al (Nhôm), Au (Vàng), Na (Natri), Ca (Canxi)...
                  </Typography>
                </Box>
              </Grid>

              {/* Non-metal Card */}
              <Grid item xs={12} md={4}>
                <Box
                  onClick={() => setSelectedMainCat(selectedMainCat === 'nonmetal' ? 'all' : 'nonmetal')}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    bgcolor: selectedMainCat === 'nonmetal' ? MAIN_CATEGORY_COLORS.nonmetal.bg : MAIN_CATEGORY_COLORS.nonmetal.lightBg,
                    border: `1.5px solid ${MAIN_CATEGORY_COLORS.nonmetal.border}`,
                    boxShadow: selectedMainCat === 'nonmetal' ? `0 0 16px ${MAIN_CATEGORY_COLORS.nonmetal.glow}` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    '&:hover': { transform: 'translateY(-2px)', filter: 'brightness(1.15)' },
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: MAIN_CATEGORY_COLORS.nonmetal.text, fontSize: '14px' }}>
                      🌿 Phi Kim (Non-metals)
                    </Typography>
                    <Chip
                      label="18 nguyên tố (15.3%)"
                      size="small"
                      sx={{ bgcolor: 'rgba(16, 185, 129, 0.25)', color: '#34d399', fontWeight: 'bold', fontSize: '10.5px' }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', fontSize: '11px', lineHeight: 1.4, mb: 1 }}>
                    {MAIN_CATEGORY_COLORS.nonmetal.desc}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '10.5px', display: 'block' }}>
                    <b>Ví dụ tiêu biểu:</b> O (Oxi), C (Cacbon), N (Nitơ), H (Hiđro), Cl (Clo), S (Lưu huỳnh)...
                  </Typography>
                </Box>
              </Grid>

              {/* Noble Gas Card */}
              <Grid item xs={12} md={4}>
                <Box
                  onClick={() => setSelectedMainCat(selectedMainCat === 'noble_gas' ? 'all' : 'noble_gas')}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    bgcolor: selectedMainCat === 'noble_gas' ? MAIN_CATEGORY_COLORS.noble_gas.bg : MAIN_CATEGORY_COLORS.noble_gas.lightBg,
                    border: `1.5px solid ${MAIN_CATEGORY_COLORS.noble_gas.border}`,
                    boxShadow: selectedMainCat === 'noble_gas' ? `0 0 16px ${MAIN_CATEGORY_COLORS.noble_gas.glow}` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    '&:hover': { transform: 'translateY(-2px)', filter: 'brightness(1.15)' },
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2" fontWeight="900" sx={{ color: MAIN_CATEGORY_COLORS.noble_gas.text, fontSize: '14px' }}>
                      ⚡ Khí Hiếm (Noble gases)
                    </Typography>
                    <Chip
                      label="6 nguyên tố (5.1%)"
                      size="small"
                      sx={{ bgcolor: 'rgba(168, 85, 247, 0.25)', color: '#c084fc', fontWeight: 'bold', fontSize: '10.5px' }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', fontSize: '11px', lineHeight: 1.4, mb: 1 }}>
                    {MAIN_CATEGORY_COLORS.noble_gas.desc}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '10.5px', display: 'block' }}>
                    <b>Gồm 6 khí trơ:</b> He (Heli), Ne (Neon), Ar (Argon), Kr (Kripton), Xe (Xenon), Rn (Radon).
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          /* Advanced Legend: 10 Subcategories */
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} mb={1.5}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle2" fontWeight="bold" color="white">
                  📌 Chú Thích Phân Loại 10 Họ Nguyên Tố Chuẩn IUPAC & GDPT 2018 (Nhấp để lọc):
                </Typography>
                <Chip
                  label="Chế độ nâng cao"
                  size="small"
                  sx={{ height: 20, fontSize: '10px', bgcolor: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', fontWeight: 'bold' }}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                {selectedSubCat !== 'all' && (
                  <Chip
                    label="Hủy lọc nhóm (Hiện tất cả 118)"
                    size="small"
                    color="primary"
                    onClick={() => setSelectedSubCat('all')}
                    sx={{ height: 22, fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                  />
                )}
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setIsAdvancedCategories(false);
                    setSelectedSubCat('all');
                  }}
                  sx={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    color: '#38bdf8',
                    borderColor: 'rgba(56, 189, 248, 0.4)',
                    bgcolor: 'rgba(56, 189, 248, 0.08)',
                  }}
                >
                  ↩ Quay lại 3 họ cơ bản
                </Button>
              </Box>
            </Box>

            <Grid container spacing={1.2}>
              {Object.entries(SUB_CATEGORY_STYLES).map(([key, style]) => {
                const isSelected = selectedSubCat === key;
                return (
                  <Grid item xs={6} sm={4} md={2.4} key={key}>
                    <Box
                      onClick={() => setSelectedSubCat(isSelected ? 'all' : (key as SubCategory))}
                      sx={{
                        p: 1.2,
                        borderRadius: 2,
                        bgcolor: isSelected ? style.bg : style.lightBg,
                        border: `1.5px solid ${style.border}`,
                        cursor: 'pointer',
                        boxShadow: isSelected ? `0 0 12px ${style.glow}` : 'none',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          filter: 'brightness(1.2)',
                        },
                      }}
                    >
                      <Typography variant="caption" fontWeight="bold" color={style.text} display="block" sx={{ fontSize: '11.5px' }}>
                        {style.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '9.5px', mt: 0.2 }}>
                        {key === 'alkali_metal' && 'Li, Na, K, Rb, Cs, Fr (Nhóm IA)'}
                        {key === 'alkaline_earth' && 'Be, Mg, Ca, Sr, Ba, Ra (Nhóm IIA)'}
                        {key === 'transition_metal' && 'Khối d: Sc→Zn, Y→Cd, Pt, Au...'}
                        {key === 'post_transition' && 'Al, Ga, In, Sn, Pb, Bi...'}
                        {key === 'metalloid' && 'B, Si, Ge, As, Sb, Te (Á kim)'}
                        {key === 'reactive_nonmetal' && 'C, N, O, P, S, Se'}
                        {key === 'halogen' && 'F, Cl, Br, I, At (Nhóm VIIA)'}
                        {key === 'noble_gas' && 'He, Ne, Ar, Kr, Xe, Rn (VIIIA)'}
                        {key === 'lanthanoid' && 'La→Lu (57-71, Khối 4f)'}
                        {key === 'actinoid' && 'Ac→Lr (89-103, Khối 5f)'}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Element Detail Inspection Modal with 9 sections & internal search */}
      <ElementDetailModal
        element={selectedElement}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectElement={handleOpenDetail}
      />

      {/* Compare Two Elements Modal */}
      <CompareElementsModal
        open={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        el1={compareEl1}
        el2={compareEl2}
        onSelectEl1={setCompareEl1}
        onSelectEl2={setCompareEl2}
      />
    </Box>
  );
}

// Compare Tool Modal
function CompareElementsModal({
  open,
  onClose,
  el1,
  el2,
  onSelectEl1,
  onSelectEl2,
}: {
  open: boolean;
  onClose: () => void;
  el1: ChemicalElement;
  el2: ChemicalElement;
  onSelectEl1: (el: ChemicalElement) => void;
  onSelectEl2: (el: ChemicalElement) => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f172a',
          backgroundImage: 'linear-gradient(180deg, #1e293b 0%, #090d16 100%)',
          borderRadius: 3,
          border: '1px solid rgba(129, 140, 248, 0.3)',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <ArrowRightLeft size={20} color="#818cf8" />
          <Typography variant="h6" fontWeight="bold" color="white">
            So Sánh Đối Chiếu 2 Nguyên Tố Hóa Học
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={18} color="#94a3b8" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {/* Element Selectors */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
              Nguyên tố 1:
            </Typography>
            <select
              value={el1.atomicNumber}
              onChange={(e) => {
                const found = getElementByAtomicNumber(Number(e.target.value));
                if (found) onSelectEl1(found);
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: '#090d16',
                color: '#fff',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            >
              {ELEMENTS_DATA.map((e) => (
                <option key={e.atomicNumber} value={e.atomicNumber}>
                  {e.atomicNumber}. {e.nameVi} ({e.symbol})
                </option>
              ))}
            </select>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
              Nguyên tố 2:
            </Typography>
            <select
              value={el2.atomicNumber}
              onChange={(e) => {
                const found = getElementByAtomicNumber(Number(e.target.value));
                if (found) onSelectEl2(found);
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: '#090d16',
                color: '#fff',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            >
              {ELEMENTS_DATA.map((e) => (
                <option key={e.atomicNumber} value={e.atomicNumber}>
                  {e.atomicNumber}. {e.nameVi} ({e.symbol})
                </option>
              ))}
            </select>
          </Grid>
        </Grid>

        {/* Comparison Table */}
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', color: '#e2e8f0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                <th style={{ padding: '8px', color: '#94a3b8' }}>Tiêu chí đối chiếu</th>
                <th style={{ padding: '8px', color: '#38bdf8', fontWeight: 'bold' }}>
                  {el1.nameVi} ({el1.symbol})
                </th>
                <th style={{ padding: '8px', color: '#c084fc', fontWeight: 'bold' }}>
                  {el2.nameVi} ({el2.symbol})
                </th>
              </tr>
            </thead>
            <tbody>
              <CompareRow label="Số hiệu nguyên tử (Z)" val1={el1.atomicNumber} val2={el2.atomicNumber} />
              <CompareRow label="Nguyên tử khối (Ar)" val1={`${el1.atomicMass} u`} val2={`${el2.atomicMass} u`} />
              <CompareRow label="3 Mảng màu chính" val1={MAIN_CATEGORY_COLORS[el1.mainCategory].label} val2={MAIN_CATEGORY_COLORS[el2.mainCategory].label} />
              <CompareRow label="Họ nguyên tố" val1={el1.subCategoryNameVi} val2={el2.subCategoryNameVi} />
              <CompareRow label="Chu kỳ & Nhóm" val1={`Chu kỳ ${el1.period}, Nhóm ${el1.group}`} val2={`Chu kỳ ${el2.period}, Nhóm ${el2.group}`} />
              <CompareRow label="Khối nguyên tố" val1={`Khối ${el1.block.toUpperCase()}`} val2={`Khối ${el2.block.toUpperCase()}`} />
              <CompareRow label="Cấu hình electron" val1={el1.electronConfigShort} val2={el2.electronConfigShort} />
              <CompareRow label="Độ âm điện Pauling" val1={el1.electronegativityPauling || '—'} val2={el2.electronegativityPauling || '—'} />
              <CompareRow label="Bán kính nguyên tử" val1={el1.atomicRadiusEmpirical ? `${el1.atomicRadiusEmpirical} pm` : '—'} val2={el2.atomicRadiusEmpirical ? `${el2.atomicRadiusEmpirical} pm` : '—'} />
              <CompareRow label="Nhiệt độ nóng chảy" val1={el1.meltingPointC !== undefined ? `${el1.meltingPointC}°C` : '—'} val2={el2.meltingPointC !== undefined ? `${el2.meltingPointC}°C` : '—'} />
              <CompareRow label="Nhiệt độ sôi" val1={el1.boilingPointC !== undefined ? `${el1.boilingPointC}°C` : '—'} val2={el2.boilingPointC !== undefined ? `${el2.boilingPointC}°C` : '—'} />
              <CompareRow label="Khối lượng riêng" val1={el1.density} val2={el2.density} />
              <CompareRow label="Số oxi hóa phổ biến" val1={el1.commonOxidationStates.join(', ')} val2={el2.commonOxidationStates.join(', ')} />
              <CompareRow label="Mã CAS" val1={el1.casNumber} val2={el2.casNumber} />
            </tbody>
          </table>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ bgcolor: '#818cf8', fontWeight: 'bold' }}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function CompareRow({ label, val1, val2 }: { label: string; val1: any; val2: any }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <td style={{ padding: '8px', color: '#94a3b8', fontWeight: '500' }}>{label}</td>
      <td style={{ padding: '8px', fontWeight: '600' }}>{val1}</td>
      <td style={{ padding: '8px', fontWeight: '600' }}>{val2}</td>
    </tr>
  );
}
