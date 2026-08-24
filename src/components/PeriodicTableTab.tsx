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
  MAIN_CATEGORY_COLORS,
  SUB_CATEGORY_LABELS,
} from '@/lib/elementsTypes';
import {
  ELEMENTS_DATA,
  PERIODIC_GRID_POSITIONS,
  getElementByAtomicNumber,
  searchElements,
} from '@/lib/elementsData';
import ElementDetailModal from '@/components/ElementDetailModal';

export default function PeriodicTableTab() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // State
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filtered elements set for fast lookup
  const filteredElements = useMemo(() => {
    return searchElements(searchQuery).filter((el) => {
      // Main category filter
      if (selectedMainCat !== 'all' && el.mainCategory !== selectedMainCat) {
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
  }, [searchQuery, selectedMainCat, selectedBlock, selectedState, tempEnabled, temperatureC]);

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
                  fontSize: { xs: '22px', sm: '26px', md: '30px' },
                  background: 'linear-gradient(45deg, #38bdf8, #818cf8, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Bảng Tuần Hoàn Hóa Học 118 Nguyên Tố
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 780 }}>
              Chuẩn IUPAC & Chương trình GDPT 2018. Phân chia rõ 3 mảng màu: <b>Phi kim</b>, <b>Kim loại</b>, <b>Khí hiếm</b>. Nhấp vào nguyên tố để tra cứu chuyên sâu <b>9 mục thông tin</b> và tìm kiếm nội bộ.
            </Typography>
          </Box>

          {/* Compare Mode Button */}
          <Button
            variant="outlined"
            startIcon={<ArrowRightLeft size={18} />}
            onClick={() => setCompareModalOpen(true)}
            sx={{
              borderColor: 'rgba(129, 140, 248, 0.4)',
              color: '#818cf8',
              fontWeight: 'bold',
              borderRadius: 2.5,
              px: 2.5,
              py: 1,
              bgcolor: 'rgba(129, 140, 248, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(129, 140, 248, 0.2)',
                borderColor: '#818cf8',
              },
            }}
          >
            So Sánh 2 Nguyên Tố
          </Button>
        </Box>

        {/* Global Search & Filters Toolbar */}
        <Box sx={{ mt: 3, pt: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Quick Search Input */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="🔍 Tìm nhanh: Fe, Sắt, Iron, 26, CAS 7439-89-6, Khối d, Nhóm 8..."
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

            {/* 3 Main Color Categories Selector */}
            <Grid item xs={12} md={7}>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ mr: 0.5 }}>
                  3 Mảng Màu Chuẩn:
                </Typography>
                <Chip
                  label="Tất cả (118)"
                  size="small"
                  onClick={() => setSelectedMainCat('all')}
                  variant={selectedMainCat === 'all' ? 'filled' : 'outlined'}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: selectedMainCat === 'all' ? '#0284c7' : 'transparent',
                    color: selectedMainCat === 'all' ? '#fff' : '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                />
                <Chip
                  label="Kim Loại (Metals)"
                  size="small"
                  onClick={() => setSelectedMainCat('metal')}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: selectedMainCat === 'metal' ? MAIN_CATEGORY_COLORS.metal.lightBg : 'transparent',
                    color: MAIN_CATEGORY_COLORS.metal.text,
                    border: `1px solid ${MAIN_CATEGORY_COLORS.metal.border}`,
                    boxShadow: selectedMainCat === 'metal' ? `0 0 10px ${MAIN_CATEGORY_COLORS.metal.glow}` : 'none',
                  }}
                />
                <Chip
                  label="Phi Kim (Non-metals)"
                  size="small"
                  onClick={() => setSelectedMainCat('nonmetal')}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: selectedMainCat === 'nonmetal' ? MAIN_CATEGORY_COLORS.nonmetal.lightBg : 'transparent',
                    color: MAIN_CATEGORY_COLORS.nonmetal.text,
                    border: `1px solid ${MAIN_CATEGORY_COLORS.nonmetal.border}`,
                    boxShadow: selectedMainCat === 'nonmetal' ? `0 0 10px ${MAIN_CATEGORY_COLORS.nonmetal.glow}` : 'none',
                  }}
                />
                <Chip
                  label="Khí Hiếm (Noble gases)"
                  size="small"
                  onClick={() => setSelectedMainCat('noble_gas')}
                  sx={{
                    fontWeight: 'bold',
                    bgcolor: selectedMainCat === 'noble_gas' ? MAIN_CATEGORY_COLORS.noble_gas.lightBg : 'transparent',
                    color: MAIN_CATEGORY_COLORS.noble_gas.text,
                    border: `1px solid ${MAIN_CATEGORY_COLORS.noble_gas.border}`,
                    boxShadow: selectedMainCat === 'noble_gas' ? `0 0 10px ${MAIN_CATEGORY_COLORS.noble_gas.glow}` : 'none',
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Secondary Sub-filters: Blocks & Temperature */}
          <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} gap={2} mt={2}>
            {/* Block & State Filter Pills */}
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                Khối:
              </Typography>
              {(['all', 's', 'p', 'd', 'f'] as const).map((blk) => (
                <Chip
                  key={blk}
                  label={blk === 'all' ? 'Tất cả khối' : `Khối ${blk.toUpperCase()}`}
                  size="small"
                  onClick={() => setSelectedBlock(blk)}
                  variant={selectedBlock === blk ? 'filled' : 'outlined'}
                  sx={{
                    height: 22,
                    fontSize: '11px',
                    fontWeight: selectedBlock === blk ? 'bold' : 'normal',
                    bgcolor: selectedBlock === blk ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: selectedBlock === blk ? '#38bdf8' : '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                  }}
                />
              ))}

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                Trạng thái:
              </Typography>
              {(['all', 'solid', 'liquid', 'gas'] as const).map((st) => (
                <Chip
                  key={st}
                  label={st === 'all' ? 'Tất cả' : st === 'solid' ? 'Rắn ⏹' : st === 'liquid' ? 'Lỏng 💧' : 'Khí 💨'}
                  size="small"
                  onClick={() => setSelectedState(st)}
                  variant={selectedState === st ? 'filled' : 'outlined'}
                  sx={{
                    height: 22,
                    fontSize: '11px',
                    bgcolor: selectedState === st ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                    color: selectedState === st ? '#f59e0b' : '#94a3b8',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                  }}
                />
              ))}
            </Box>

            {/* Interactive Temperature Slider Toggle */}
            <Box display="flex" alignItems="center" gap={1.5} sx={{ minWidth: { xs: '100%', lg: 340 } }}>
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
        </Box>
      </Paper>

      {/* Main IUPAC Periodic Table Grid Container */}
      <Box
        sx={{
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(56, 189, 248, 0.3)', borderRadius: 4 },
        }}
      >
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
          {/* Render All 118 Element Tiles */}
          {ELEMENTS_DATA.map((element) => {
            const pos = PERIODIC_GRID_POSITIONS[element.atomicNumber];
            if (!pos) return null;

            const isMatch = filteredZSet.has(element.atomicNumber);
            const mainCat = MAIN_CATEGORY_COLORS[element.mainCategory];
            const currentState = tempEnabled
              ? getElementStateAtTemp(element, temperatureC)
              : element.standardState;

            return (
              <Box
                key={element.atomicNumber}
                onClick={() => handleOpenDetail(element.atomicNumber)}
                sx={{
                  gridRow: pos.row,
                  gridColumn: pos.col,
                  borderRadius: 2,
                  background: mainCat.bg,
                  border: `1.5px solid ${mainCat.border}`,
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
                  boxShadow: isMatch ? `0 2px 8px rgba(0,0,0,0.3)` : 'none',
                  '&:hover': {
                    transform: 'scale(1.08)',
                    zIndex: 10,
                    borderColor: '#ffffff',
                    boxShadow: `0 0 16px ${mainCat.glow}, 0 4px 12px rgba(0,0,0,0.6)`,
                  },
                }}
              >
                {/* Top Row: Z (atomic number) and Ar (mass) */}
                <Box display="flex" justifyContent="space-between" width="100%" px={0.3}>
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
                      fontSize: '9px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: 1,
                      fontFamily: 'monospace',
                    }}
                  >
                    {typeof element.atomicMass === 'number' ? element.atomicMass.toFixed(element.atomicMass < 10 ? 2 : 1) : element.atomicMass}
                  </Typography>
                </Box>

                {/* Center: CHEMICAL SYMBOL (Ký hiệu hóa học ở trung tâm) */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '18px', sm: '20px' },
                    color: '#ffffff',
                    lineHeight: 1,
                    my: 0.3,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {element.symbol}
                </Typography>

                {/* Bottom: ENGLISH CHEMICAL NAME (Tên chất hóa học bằng tiếng Anh ở dưới) */}
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '8.5px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  {element.nameEn}
                </Typography>
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

      {/* Legend & Summary Info Bar */}
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
        <Typography variant="subtitle2" fontWeight="bold" color="white" gutterBottom>
          📌 Chú Thích 3 Mảng Màu Phân Loại & Phân Nhóm Chi Tiết:
        </Typography>
        <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
          {/* Metal Legend */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: MAIN_CATEGORY_COLORS.metal.lightBg, border: `1px solid ${MAIN_CATEGORY_COLORS.metal.border}` }}>
              <Typography variant="body2" fontWeight="bold" color={MAIN_CATEGORY_COLORS.metal.text}>
                🔵 Kim loại (Metals)
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3 }}>
                Gồm kim loại kiềm, kiềm thổ, chuyển tiếp, sau chuyển tiếp, lantanoid và actinoid.
              </Typography>
            </Box>
          </Grid>

          {/* Nonmetal Legend */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: MAIN_CATEGORY_COLORS.nonmetal.lightBg, border: `1px solid ${MAIN_CATEGORY_COLORS.nonmetal.border}` }}>
              <Typography variant="body2" fontWeight="bold" color={MAIN_CATEGORY_COLORS.nonmetal.text}>
                🟢 Phi kim (Non-metals)
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3 }}>
                Gồm phi kim hoạt động, halogen và các á kim (metalloid).
              </Typography>
            </Box>
          </Grid>

          {/* Noble Gas Legend */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: MAIN_CATEGORY_COLORS.noble_gas.lightBg, border: `1px solid ${MAIN_CATEGORY_COLORS.noble_gas.border}` }}>
              <Typography variant="body2" fontWeight="bold" color={MAIN_CATEGORY_COLORS.noble_gas.text}>
                🟣 Khí hiếm (Noble gases)
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.3 }}>
                Nhóm 18 (VIIIA) trơ về mặt hóa học, lớp vỏ ngoài cùng bão hòa electron bền vững.
              </Typography>
            </Box>
          </Grid>
        </Grid>
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
