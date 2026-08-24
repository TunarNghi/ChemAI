"use client";

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Chip,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Stack,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Flame,
  Zap,
  ShieldAlert,
  Atom,
  Layers,
  Thermometer,
  TestTube2,
  Sparkles,
  Mountain,
  Briefcase,
  History,
  Info,
  Radio,
  ExternalLink,
  FlameKindling,
} from 'lucide-react';
import {
  ChemicalElement,
  MAIN_CATEGORY_COLORS,
  SUB_CATEGORY_LABELS,
} from '@/lib/elementsTypes';

interface ElementDetailModalProps {
  element: ChemicalElement | null;
  open: boolean;
  onClose: () => void;
  onSelectElement?: (z: number) => void;
}

// 9 Major Sections Definition
const SECTION_TABS = [
  { id: 0, label: 'Tất Cả (9 Mục)', shortLabel: 'Tất cả', icon: <Layers size={16} /> },
  { id: 1, label: '1. Định Danh & Phân Loại', shortLabel: 'Định danh', icon: <Info size={16} /> },
  { id: 2, label: '2. Vị Trí Tuần Hoàn', shortLabel: 'Vị trí', icon: <Atom size={16} /> },
  { id: 3, label: '3. Cấu Trúc & Hạt Nhân', shortLabel: 'Cấu trúc', icon: <Radio size={16} /> },
  { id: 4, label: '4. Vật Lý & Nhiệt Động', shortLabel: 'Vật lý', icon: <Thermometer size={16} /> },
  { id: 5, label: '5. Hóa Học & Liên Kết', shortLabel: 'Hóa học', icon: <TestTube2 size={16} /> },
  { id: 6, label: '6. Phổ Học & Quang Học', shortLabel: 'Phổ học', icon: <Sparkles size={16} /> },
  { id: 7, label: '7. Nguồn Gốc & Điều Chế', shortLabel: 'Nguồn gốc', icon: <Mountain size={16} /> },
  { id: 8, label: '8. Ứng Dụng & Sinh Học', shortLabel: 'Ứng dụng', icon: <Briefcase size={16} /> },
  { id: 9, label: '9. An Toàn & Lịch Sử', shortLabel: 'An toàn', icon: <ShieldAlert size={16} /> },
];

export default function ElementDetailModal({
  element,
  open,
  onClose,
  onSelectElement,
}: ElementDetailModalProps) {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [internalQuery, setInternalQuery] = useState('');
  const [copiedSymbol, setCopiedSymbol] = useState(false);
  const [copiedCas, setCopiedCas] = useState(false);

  // Reset internal query on element change
  React.useEffect(() => {
    setInternalQuery('');
  }, [element?.atomicNumber]);

  if (!element) return null;

  const mainColor = MAIN_CATEGORY_COLORS[element.mainCategory];
  const subCategoryInfo = SUB_CATEGORY_LABELS[element.subCategory];

  const handleCopy = (text: string, type: 'symbol' | 'cas') => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      if (type === 'symbol') {
        setCopiedSymbol(true);
        setTimeout(() => setCopiedSymbol(false), 2000);
      } else {
        setCopiedCas(true);
        setTimeout(() => setCopiedCas(false), 2000);
      }
    }
  };

  // Helper to check if a section matches the in-element search query
  const queryLower = internalQuery.trim().toLowerCase();

  // Highlight matched search terms
  const highlightText = (text: string | number | undefined | null) => {
    if (text === undefined || text === null) return '—';
    const str = text.toString();
    if (!queryLower) return str;
    const parts = str.split(new RegExp(`(${queryLower})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === queryLower ? (
            <span
              key={i}
              style={{
                backgroundColor: 'rgba(234, 179, 8, 0.35)',
                color: '#fef08a',
                padding: '0 3px',
                borderRadius: '3px',
                fontWeight: 'bold',
              }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Check section visibility according to tab or search
  const isSectionVisible = (secNum: number) => {
    if (activeTab === 0) return true;
    return activeTab === secNum;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          bgcolor: '#090d16',
          backgroundImage: 'radial-gradient(ellipse at top, #1e293b 0%, #090d16 80%)',
          borderRadius: { xs: 2, sm: 3.5 },
          border: `1px solid ${mainColor.border}`,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.7), 0 0 35px ${mainColor.glow}`,
          maxHeight: '92vh',
        },
      }}
    >
      {/* Header Banner */}
      <DialogTitle
        sx={{
          p: { xs: 2, sm: 2.5 },
          bgcolor: 'rgba(15, 23, 42, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1.5}>
          {/* Element Main Badge & Titles */}
          <Box display="flex" alignItems="center" gap={{ xs: 1.5, sm: 2 }}>
            {/* Big Square Chemical Symbol Tile */}
            <Box
              sx={{
                width: { xs: 58, sm: 72 },
                height: { xs: 58, sm: 72 },
                borderRadius: 2.5,
                background: mainColor.bg,
                border: `2px solid ${mainColor.border}`,
                boxShadow: `0 0 20px ${mainColor.glow}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: 3,
                  left: 6,
                  fontSize: { xs: '10px', sm: '11px' },
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.75)',
                }}
              >
                {element.atomicNumber}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '24px', sm: '30px' },
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {element.symbol}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: '8px', sm: '9px' },
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 600,
                  maxWidth: '90%',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {element.nameEn}
              </Typography>
            </Box>

            {/* Names & Category Chips */}
            <Box>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography variant="h5" fontWeight="bold" color="white" sx={{ fontSize: { xs: '18px', sm: '22px' } }}>
                  {element.nameVi} ({element.nameEn})
                </Typography>
                <Chip
                  label={mainColor.label}
                  size="small"
                  sx={{
                    bgcolor: mainColor.lightBg,
                    color: mainColor.text,
                    border: `1px solid ${mainColor.border}`,
                    fontWeight: 'bold',
                    fontSize: '11px',
                  }}
                />
                <Chip
                  label={subCategoryInfo?.label || element.subCategoryNameVi}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#94a3b8',
                    fontSize: '11px',
                  }}
                />
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.4 }}>
                Tên Latin: <i>{element.nameLatin}</i> • Khối: <b>{element.block.toUpperCase()}</b> • Chu kỳ: <b>{element.period}</b> • Nhóm: <b>{element.group} ({element.groupTraditional})</b>
              </Typography>
            </Box>
          </Box>

          {/* Quick Actions & Navigation Controls */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Prev Element */}
            {onSelectElement && (
              <Tooltip title="Nguyên tố trước (Z-1)">
                <span>
                  <IconButton
                    size="small"
                    disabled={element.atomicNumber <= 1}
                    onClick={() => onSelectElement(element.atomicNumber - 1)}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' },
                    }}
                  >
                    <ChevronLeft size={18} color="#38bdf8" />
                  </IconButton>
                </span>
              </Tooltip>
            )}

            {/* Next Element */}
            {onSelectElement && (
              <Tooltip title="Nguyên tố kế tiếp (Z+1)">
                <span>
                  <IconButton
                    size="small"
                    disabled={element.atomicNumber >= 118}
                    onClick={() => onSelectElement(element.atomicNumber + 1)}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' },
                    }}
                  >
                    <ChevronRight size={18} color="#38bdf8" />
                  </IconButton>
                </span>
              </Tooltip>
            )}

            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444' },
              }}
            >
              <X size={18} color="#f87171" />
            </IconButton>
          </Box>
        </Box>

        {/* IN-ELEMENT SEARCH BAR (Tìm kiếm thông tin nhỏ trong nguyên tố) */}
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder={`🔍 Tìm kiếm nhanh thông tin nhỏ trong ${element.nameVi} (ví dụ: nhiệt độ nóng chảy, CAS, bán kính, ngọn lửa, quặng, GHS, đồng vị...)`}
            value={internalQuery}
            onChange={(e) => setInternalQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={17} color="#38bdf8" />
                </InputAdornment>
              ),
              endAdornment: internalQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setInternalQuery('')}>
                    <X size={14} color="#94a3b8" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                bgcolor: 'rgba(2, 132, 199, 0.08)',
                borderRadius: 2,
                fontSize: '13px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#38bdf8',
                },
              },
            }}
          />
        </Box>

        {/* 9 Section Filter Tabs */}
        <Box sx={{ mt: 1.5, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 40,
              '& .MuiTab-root': {
                minHeight: 40,
                textTransform: 'none',
                fontSize: '12px',
                fontWeight: 600,
                color: '#94a3b8',
                py: 0.5,
                px: 1.5,
                '&.Mui-selected': {
                  color: '#38bdf8',
                  fontWeight: 700,
                },
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#38bdf8',
                height: 2.5,
              },
            }}
          >
            {SECTION_TABS.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                label={
                  <Box display="flex" alignItems="center" gap={0.6}>
                    {tab.icon}
                    <span>{isMobile ? tab.shortLabel : tab.label}</span>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
      </DialogTitle>

      {/* Main Dialog Content with 9 Sections */}
      <DialogContent sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'transparent' }}>
        <Stack spacing={2.5}>
          {/* SECTION 1: Định danh & Phân loại cơ bản */}
          {isSectionVisible(1) && (
            <SectionCard
              title="1. Định Danh & Phân Loại Cơ Bản"
              icon={<Info size={20} color="#38bdf8" />}
              borderColor="rgba(56, 189, 248, 0.3)"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Ký hiệu hóa học (Symbol)" value={element.symbol} highlight={highlightText(element.symbol)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Số hiệu nguyên tử (Z)" value={`${element.atomicNumber} (Proton = Electron)`} highlight={highlightText(element.atomicNumber)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Tên tiếng Anh / Việt" value={`${element.nameEn} / ${element.nameVi}`} highlight={highlightText(`${element.nameEn} ${element.nameVi}`)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Tên gọi Latin" value={element.nameLatin} highlight={highlightText(element.nameLatin)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <DataField label="Mã số CAS Registry" value={element.casNumber} highlight={highlightText(element.casNumber)} />
                    <Tooltip title="Sao chép số CAS">
                      <IconButton size="small" onClick={() => handleCopy(element.casNumber, 'cas')} sx={{ color: '#94a3b8' }}>
                        {copiedCas ? <Check size={15} color="#4ade80" /> : <Copy size={15} />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Mã định danh PubChem CID" value={element.pubchemCid} highlight={highlightText(element.pubchemCid)} />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                      📖 Nguồn gốc từ nguyên (Etymology):
                    </Typography>
                    <Typography variant="body2" color="#e2e8f0" sx={{ lineHeight: 1.6 }}>
                      {highlightText(element.etymology)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 2: Vị trí trong Bảng tuần hoàn */}
          {isSectionVisible(2) && (
            <SectionCard
              title="2. Vị Trí Trong Bảng Tuần Hoàn"
              icon={<Atom size={20} color="#818cf8" />}
              borderColor="rgba(129, 140, 248, 0.3)"
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Ô nguyên tố (Cell)" value={`Số ${element.atomicNumber}`} highlight={highlightText(element.atomicNumber)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Chu kỳ (Period)" value={`Chu kỳ ${element.period} (${element.energyLevels.length} lớp e⁻)`} highlight={highlightText(element.period)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Nhóm IUPAC (1-18)" value={`Nhóm ${element.group}`} highlight={highlightText(element.group)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Phân nhóm chính/phụ" value={`Nhóm ${element.groupTraditional}`} highlight={highlightText(element.groupTraditional)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Khối nguyên tố (Block)" value={`Khối ${element.block.toUpperCase()}`} highlight={highlightText(element.block)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DataField label="3 Mảng màu phân loại chính" value={mainColor.label} highlight={highlightText(mainColor.label)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DataField label="Họ nguyên tố chi tiết (Family)" value={subCategoryInfo?.label || element.subCategoryNameVi} highlight={highlightText(subCategoryInfo?.label)} />
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 3: Cấu trúc nguyên tử & Hạt nhân */}
          {isSectionVisible(3) && (
            <SectionCard
              title="3. Cấu Trúc Nguyên Tử & Hạt Nhân"
              icon={<Radio size={20} color="#a855f7" />}
              borderColor="rgba(168, 85, 247, 0.3)"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Nguyên tử khối tương đối (Ar)" value={`${element.atomicMass} u (g/mol)`} highlight={highlightText(element.atomicMass)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Cấu hình electron thu gọn" value={element.electronConfigShort} highlight={highlightText(element.electronConfigShort)} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DataField label="Electron hóa trị" value={`${element.valenceElectrons} e⁻ lớp ngoài/sát ngoài`} highlight={highlightText(element.valenceElectrons)} />
                </Grid>
                <Grid item xs={12}>
                  <DataField label="Cấu hình electron đầy đủ" value={element.electronConfigFull} highlight={highlightText(element.electronConfigFull)} />
                </Grid>

                {/* Energy Levels / Shell Rings */}
                <Grid item xs={12}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                      ⚛️ Phân bố electron theo các lớp năng lượng (K, L, M, N, O, P, Q):
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                      {element.energyLevels.map((count, idx) => {
                        const shellNames = ['K (n=1)', 'L (n=2)', 'M (n=3)', 'N (n=4)', 'O (n=5)', 'P (n=6)', 'Q (n=7)'];
                        return (
                          <Chip
                            key={idx}
                            label={`${shellNames[idx]}: ${count} e⁻`}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(168, 85, 247, 0.15)',
                              color: '#c084fc',
                              border: '1px solid rgba(168, 85, 247, 0.4)',
                              fontWeight: 'bold',
                              fontSize: '11px',
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                </Grid>

                {/* Radii metrics */}
                <Grid item xs={6} sm={3}>
                  <DataField label="Bán kính nguyên tử" value={element.atomicRadiusEmpirical ? `${element.atomicRadiusEmpirical} pm` : '—'} highlight={highlightText(element.atomicRadiusEmpirical)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DataField label="Bán kính cộng hóa trị" value={element.covalentRadius ? `${element.covalentRadius} pm` : '—'} highlight={highlightText(element.covalentRadius)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DataField label="Bán kính Van der Waals" value={element.vanDerWaalsRadius ? `${element.vanDerWaalsRadius} pm` : '—'} highlight={highlightText(element.vanDerWaalsRadius)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DataField label="Bán kính ion" value={element.ionicRadius || '—'} highlight={highlightText(element.ionicRadius)} />
                </Grid>

                {/* Isotopes Table */}
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom sx={{ mt: 1 }}>
                    🔬 Hệ thống đồng vị bền và phóng xạ:
                  </Typography>
                  <TableContainer component={Paper} sx={{ bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ '& th': { color: '#94a3b8', fontSize: '11px', fontWeight: 'bold' } }}>
                          <TableCell>Đồng vị</TableCell>
                          <TableCell>Khối lượng (u)</TableCell>
                          <TableCell>Độ phổ biến / Chu kỳ bán rã</TableCell>
                          <TableCell>Dạng phân rã</TableCell>
                          <TableCell>Tính chất</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {element.isotopes.map((iso, idx) => (
                          <TableRow key={idx} sx={{ '& td': { color: '#e2e8f0', fontSize: '12px' } }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>{highlightText(iso.name)}</TableCell>
                            <TableCell>{iso.mass}</TableCell>
                            <TableCell>{highlightText(iso.abundance || iso.halfLife || '—')}</TableCell>
                            <TableCell>{highlightText(iso.decayMode || '—')}</TableCell>
                            <TableCell>
                              <Chip
                                label={iso.isStable ? 'Bền tự nhiên' : 'Phóng xạ'}
                                size="small"
                                color={iso.isStable ? 'success' : 'warning'}
                                sx={{ height: 20, fontSize: '10px', fontWeight: 'bold' }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 4: Tính chất vật lý & Nhiệt động học */}
          {isSectionVisible(4) && (
            <SectionCard
              title="4. Tính Chất Vật Lý & Nhiệt Động Học"
              icon={<Thermometer size={20} color="#f59e0b" />}
              borderColor="rgba(245, 158, 11, 0.3)"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <DataField label="Trạng thái chuẩn (25°C, 1 bar)" value={element.standardState === 'solid' ? 'Chất rắn' : element.standardState === 'liquid' ? 'Chất lỏng' : 'Chất khí'} highlight={highlightText(element.standardState)} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DataField label="Khối lượng riêng (Density)" value={element.density} highlight={highlightText(element.density)} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DataField label="Điểm nóng chảy" value={element.meltingPointC !== undefined ? `${element.meltingPointC} °C (${element.meltingPointK} K)` : '—'} highlight={highlightText(element.meltingPointC)} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DataField label="Điểm sôi" value={element.boilingPointC !== undefined ? `${element.boilingPointC} °C (${element.boilingPointK} K)` : '—'} highlight={highlightText(element.boilingPointC)} />
                </Grid>

                <Grid item xs={12}>
                  <DataField label="Hình thái & Màu sắc" value={element.appearance} highlight={highlightText(element.appearance)} />
                </Grid>

                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Nhiệt nóng chảy" value={typeof element.heatOfFusion === 'number' ? `${element.heatOfFusion} kJ/mol` : element.heatOfFusion} highlight={highlightText(element.heatOfFusion)} />
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Nhiệt hóa hơi" value={typeof element.heatOfVaporization === 'number' ? `${element.heatOfVaporization} kJ/mol` : element.heatOfVaporization} highlight={highlightText(element.heatOfVaporization)} />
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Nhiệt dung riêng (Cp)" value={element.molarHeatCapacity || '—'} highlight={highlightText(element.molarHeatCapacity)} />
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Độ dẫn nhiệt" value={element.thermalConductivity ? `${element.thermalConductivity} W/(m·K)` : '—'} highlight={highlightText(element.thermalConductivity)} />
                </Grid>

                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Độ dẫn điện" value={element.electricalConductivity || '—'} highlight={highlightText(element.electricalConductivity)} />
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Điện trở suất" value={element.electricalResistivity || '—'} highlight={highlightText(element.electricalResistivity)} />
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Mạng tinh thể" value={`${element.crystalStructure} (${element.crystalStructureVi})`} highlight={highlightText(element.crystalStructure)} />
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <DataField label="Từ tính & Tốc độ âm" value={`${element.magnetism} • ${element.speedOfSound} m/s`} highlight={highlightText(element.magnetism)} />
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 5: Tính chất hóa học & Khả năng liên kết */}
          {isSectionVisible(5) && (
            <SectionCard
              title="5. Tính Chất Hóa Học & Khả Năng Liên Kết"
              icon={<TestTube2 size={20} color="#10b981" />}
              borderColor="rgba(168, 185, 129, 0.3)"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <DataField label="Độ âm điện Pauling" value={element.electronegativityPauling !== undefined ? element.electronegativityPauling.toString() : '—'} highlight={highlightText(element.electronegativityPauling)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DataField label="Năng lượng ion hóa I₁" value={element.ionizationEnergies[0] ? `${element.ionizationEnergies[0]} kJ/mol` : '—'} highlight={highlightText(element.ionizationEnergies[0])} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DataField label="Ái lực electron (Eea)" value={element.electronAffinity !== undefined ? `${element.electronAffinity} kJ/mol` : '—'} highlight={highlightText(element.electronAffinity)} />
                </Grid>

                {/* Oxidation states pills */}
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                    ⚡ Trạng thái / Số oxi hóa (In đậm là phổ biến & bền):
                  </Typography>
                  <Stack direction="row" spacing={0.8} flexWrap="wrap">
                    {element.oxidationStates.map((ox, i) => {
                      const isCommon = element.commonOxidationStates.includes(ox);
                      return (
                        <Chip
                          key={i}
                          label={ox > 0 ? `+${ox}` : `${ox}`}
                          size="small"
                          sx={{
                            fontWeight: isCommon ? 900 : 500,
                            bgcolor: isCommon ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                            color: isCommon ? '#34d399' : '#94a3b8',
                            border: isCommon ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Grid>

                {/* Chemical Reactivity Breakdown */}
                <Grid item xs={12}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                      🧪 Khả năng phản ứng hóa học chi tiết:
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      <ReactionRow label="Với Oxi (O₂)" text={element.reactivity.withOxygen} highlight={highlightText} />
                      <ReactionRow label="Với Clo (Cl₂)" text={element.reactivity.withChlorine} highlight={highlightText} />
                      <ReactionRow label="Với Hiđro (H₂)" text={element.reactivity.withHydrogen} highlight={highlightText} />
                      <ReactionRow label="Với Nước (H₂O)" text={element.reactivity.withWater} highlight={highlightText} />
                      <ReactionRow label="Với Axit" text={element.reactivity.withAcids} highlight={highlightText} />
                      <ReactionRow label="Với Bazơ / Kiềm" text={element.reactivity.withBases} highlight={highlightText} />
                      <ReactionRow label="Tính chất Oxit & Hiđroxit" text={element.oxideHydroxideProperties} highlight={highlightText} />
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 6: Phổ học & Quang học */}
          {isSectionVisible(6) && (
            <SectionCard
              title="6. Phổ Học & Quang Học"
              icon={<Sparkles size={20} color="#ec4899" />}
              borderColor="rgba(236, 72, 153, 0.3)"
            >
              <Grid container spacing={2}>
                {/* Flame Test Swatch & Description */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: element.flameTestHex || '#e2e8f0',
                        boxShadow: `0 0 20px ${element.flameTestHex || '#e2e8f0'}`,
                        border: '2px solid rgba(255,255,255,0.5)',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Flame size={24} color="#000" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                        🔥 Màu ngọn lửa (Flame Test):
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="#fff">
                        {highlightText(element.flameTestColor)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DataField label="Chiết suất / Phản xạ ánh sáng" value={element.refractiveIndex || '—'} highlight={highlightText(element.refractiveIndex)} />
                </Grid>

                <Grid item xs={12}>
                  <DataField label="Phổ phát xạ & hấp thụ nguyên tử (AAS/ICP-MS)" value={element.emissionLinesSummary} highlight={highlightText(element.emissionLinesSummary)} />
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 7: Nguồn gốc, Địa chất & Điều chế */}
          {isSectionVisible(7) && (
            <SectionCard
              title="7. Nguồn Gốc, Địa Chất & Điều Chế"
              icon={<Mountain size={20} color="#06b6d4" />}
              borderColor="rgba(6, 182, 212, 0.3)"
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Vỏ Trái Đất (Clarke)" value={element.abundance.crust} highlight={highlightText(element.abundance.crust)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Trong Nước Biển" value={element.abundance.ocean} highlight={highlightText(element.abundance.ocean)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Trong Khí Quyển" value={element.abundance.atmosphere} highlight={highlightText(element.abundance.atmosphere)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Trong Cơ Thể Người" value={element.abundance.humanBody} highlight={highlightText(element.abundance.humanBody)} />
                </Grid>
                <Grid item xs={6} sm={4} md={2.4}>
                  <DataField label="Trong Hệ Mặt Trời" value={element.abundance.solarSystem} highlight={highlightText(element.abundance.solarSystem)} />
                </Grid>

                <Grid item xs={12}>
                  <DataField label="Khoáng vật học & Các loại quặng tự nhiên chính" value={element.mineralogy} highlight={highlightText(element.mineralogy)} />
                </Grid>
                <Grid item xs={12}>
                  <DataField label="Phương pháp sản xuất / Chiết tách công nghiệp & phòng lab" value={element.productionMethod} highlight={highlightText(element.productionMethod)} />
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 8: Ứng dụng & Sinh học */}
          {isSectionVisible(8) && (
            <SectionCard
              title="8. Ứng Dụng & Sinh Học"
              icon={<Briefcase size={20} color="#3b82f6" />}
              borderColor="rgba(59, 130, 246, 0.3)"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                    🚀 Ứng dụng công nghiệp & Công nghệ cao:
                  </Typography>
                  <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
                    {element.industrialApplications.map((app, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <Typography variant="body2" color="#e2e8f0">
                            • {highlightText(app)}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <Typography variant="caption" color="#60a5fa" fontWeight="bold" display="block" gutterBottom>
                      🧬 Vai trò sinh học & Y học:
                    </Typography>
                    <Typography variant="body2" color="#e2e8f0" sx={{ lineHeight: 1.6 }}>
                      {highlightText(element.biologicalRole)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </SectionCard>
          )}

          {/* SECTION 9: An toàn, Độc tính & Lịch sử */}
          {isSectionVisible(9) && (
            <SectionCard
              title="9. An Toàn, Độc Tính & Lịch Sử Khám Phá"
              icon={<ShieldAlert size={20} color="#ef4444" />}
              borderColor="rgba(239, 68, 68, 0.3)"
            >
              <Grid container spacing={2}>
                {/* NFPA 704 Diamond Visualization */}
                <Grid item xs={12} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2.5, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                      Chỉ số an toàn NFPA 704
                    </Typography>
                    <Box sx={{ display: 'inline-block', position: 'relative', width: 80, height: 80, my: 1 }}>
                      {/* Top: Flammability (Red) */}
                      <Box sx={{ position: 'absolute', top: 0, left: 20, width: 40, height: 40, transform: 'rotate(45deg)', bgcolor: '#ef4444', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ transform: 'rotate(-45deg)', fontWeight: 900, color: '#fff', fontSize: 13 }}>
                          {element.nfpa704.flammability}
                        </Typography>
                      </Box>
                      {/* Left: Health (Blue) */}
                      <Box sx={{ position: 'absolute', top: 20, left: 0, width: 40, height: 40, transform: 'rotate(45deg)', bgcolor: '#3b82f6', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ transform: 'rotate(-45deg)', fontWeight: 900, color: '#fff', fontSize: 13 }}>
                          {element.nfpa704.health}
                        </Typography>
                      </Box>
                      {/* Right: Instability (Yellow) */}
                      <Box sx={{ position: 'absolute', top: 20, left: 40, width: 40, height: 40, transform: 'rotate(45deg)', bgcolor: '#eab308', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ transform: 'rotate(-45deg)', fontWeight: 900, color: '#000', fontSize: 13 }}>
                          {element.nfpa704.instability}
                        </Typography>
                      </Box>
                      {/* Bottom: Special (White) */}
                      <Box sx={{ position: 'absolute', top: 40, left: 20, width: 40, height: 40, transform: 'rotate(45deg)', bgcolor: '#f8fafc', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ transform: 'rotate(-45deg)', fontWeight: 900, color: '#000', fontSize: 10 }}>
                          {element.nfpa704.special || '—'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                {/* GHS & Toxicity notes */}
                <Grid item xs={12} sm={8} md={9}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                    ⚠️ Cảnh báo nguy hại GHS & Độc tính:
                  </Typography>
                  <Stack spacing={1}>
                    {element.ghsClassification.map((item, idx) => (
                      <Chip
                        key={idx}
                        label={item}
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ fontSize: '11px', fontWeight: 600, justifyContent: 'flex-start', maxWidth: '100%' }}
                      />
                    ))}
                  </Stack>
                  <Typography variant="body2" color="#e2e8f0" sx={{ mt: 1.5, lineHeight: 1.6 }}>
                    <b>Ghi chú độc tính:</b> {highlightText(element.toxicityNotes)}
                  </Typography>
                </Grid>

                {/* Discovery History */}
                <Grid item xs={12}>
                  <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <History size={18} color="#f59e0b" />
                      <Typography variant="subtitle2" fontWeight="bold" color="#f59e0b">
                        Lịch Sử Khám Phá & Thực Nghiệm
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="#cbd5e1" sx={{ lineHeight: 1.6 }}>
                      • <b>Nhà khoa học phát hiện:</b> {highlightText(element.discoveryHistory.discoverer)}
                      <br />
                      • <b>Năm tìm ra / Công bố:</b> {highlightText(element.discoveryHistory.year)} • <b>Quốc gia:</b> {highlightText(element.discoveryHistory.country)}
                      <br />
                      • <b>Bối cảnh & Phương pháp:</b> {highlightText(element.discoveryHistory.description)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </SectionCard>
          )}
        </Stack>
      </DialogContent>

      {/* Footer Controls */}
      <DialogActions
        sx={{
          p: 2,
          bgcolor: 'rgba(15, 23, 42, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          HCC - ChemAI 2026 • Chuẩn IUPAC & Sách Giáo Khoa GDPT 2018
        </Typography>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: '#0284c7',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: 2,
            px: 3,
            '&:hover': { bgcolor: '#0369a1' },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SectionCard({
  title,
  icon,
  borderColor,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  borderColor: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        bgcolor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        borderRadius: 2.5,
        border: `1px solid ${borderColor}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        {icon}
        <Typography variant="subtitle1" fontWeight="bold" color="white">
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );
}

function DataField({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number | undefined;
  highlight?: React.ReactNode;
}) {
  return (
    <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <Typography variant="caption" color="text.secondary" fontWeight="500" display="block" noWrap>
        {label}
      </Typography>
      <Typography variant="body2" color="#f8fafc" fontWeight="600" sx={{ wordBreak: 'break-word', mt: 0.2 }}>
        {highlight !== undefined ? highlight : value ?? '—'}
      </Typography>
    </Box>
  );
}

function ReactionRow({
  label,
  text,
  highlight,
}: {
  label: string;
  text: string;
  highlight: (t: string) => React.ReactNode;
}) {
  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 0.5, sm: 1 }} alignItems={{ xs: 'flex-start', sm: 'center' }}>
      <Chip
        label={label}
        size="small"
        sx={{
          bgcolor: 'rgba(16, 185, 129, 0.15)',
          color: '#34d399',
          fontWeight: 'bold',
          fontSize: '11px',
          minWidth: 140,
          justifyContent: 'flex-start',
        }}
      />
      <Typography variant="body2" color="#cbd5e1" sx={{ flexGrow: 1, fontSize: '13px' }}>
        {highlight(text)}
      </Typography>
    </Box>
  );
}
