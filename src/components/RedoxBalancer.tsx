"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  TextField,
  Stack,
  Divider,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Zap,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Copy,
  Check,
  Keyboard,
  ArrowRight,
  Info,
  Layers,
} from 'lucide-react';
import { callGeminiAPI } from '@/lib/api';

interface RedoxPreset {
  name: string;
  reactants: string;
  products: string;
  balancedEq: string;
  oxidationStep: string;
  reductionStep: string;
  multiplierOx: number;
  multiplierRed: number;
  reducingAgent: string;
  oxidizingAgent: string;
  notes: string;
}

const REDOX_PRESETS: RedoxPreset[] = [
  {
    name: "1. Fe + HNO₃ (loãng) → Fe(NO₃)₃ + NO + H₂O",
    reactants: "Fe + HNO3",
    products: "Fe(NO3)3 + NO + H2O",
    balancedEq: "Fe + 4HNO₃ → Fe(NO₃)₃ + NO↑ + 2H₂O",
    oxidationStep: "Fe⁰ → Fe⁺³ + 3e",
    reductionStep: "N⁺⁵ + 3e → N⁺² (NO)",
    multiplierOx: 1,
    multiplierRed: 1,
    reducingAgent: "Fe (Sắt) - Số oxi hóa tăng từ 0 lên +3",
    oxidizingAgent: "HNO₃ (Axit nitric) - N(+5) giảm xuống N(+2)",
    notes: "Tỉ lệ mol chất khử : chất oxi hóa tạo khí = 1 : 1. Tỉ lệ mol Fe : HNO₃ phản ứng = 1 : 4 (3 phân tử HNO₃ tạo muối, 1 phân tử bị khử tạo NO)."
  },
  {
    name: "2. KMnO₄ + HCl (đặc) → KCl + MnCl₂ + Cl₂ + H₂O",
    reactants: "KMnO4 + HCl",
    products: "KCl + MnCl2 + Cl2 + H2O",
    balancedEq: "2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O",
    oxidationStep: "2Cl⁻¹ → Cl₂⁰ + 2e",
    reductionStep: "Mn⁺⁷ + 5e → Mn⁺²",
    multiplierOx: 5,
    multiplierRed: 2,
    reducingAgent: "HCl (Hydrochloric acid) - Cl(-1) tăng lên Cl2(0)",
    oxidizingAgent: "KMnO₄ (Thuốc tím) - Mn(+7) giảm xuống Mn(+2)",
    notes: "Trong 16 phân tử HCl tham gia phản ứng: 10 phân tử đóng vai trò là chất khử (tạo 5Cl₂), 6 phân tử đóng vai trò môi trường (tạo muối KCl, MnCl₂)."
  },
  {
    name: "3. Cu + H₂SO₄ (đặc, nóng) → CuSO₄ + SO₂ + H₂O",
    reactants: "Cu + H2SO4",
    products: "CuSO4 + SO2 + H2O",
    balancedEq: "Cu + 2H₂SO₄ (đặc) → CuSO₄ + SO₂↑ + 2H₂O",
    oxidationStep: "Cu⁰ → Cu⁺² + 2e",
    reductionStep: "S⁺⁶ + 2e → S⁺⁴ (SO₂)",
    multiplierOx: 1,
    multiplierRed: 1,
    reducingAgent: "Cu (Đồng) - Số oxi hóa tăng từ 0 lên +2",
    oxidizingAgent: "H₂SO₄ đặc - S(+6) giảm xuống S(+4)",
    notes: "1 phân tử H₂SO₄ đóng vai trò chất oxi hóa (tạo SO₂), 1 phân tử H₂SO₄ đóng vai trò môi trường (tạo CuSO₄)."
  },
  {
    name: "4. Al + HNO₃ (rất loãng) → Al(NO₃)₃ + NH₄NO₃ + H₂O",
    reactants: "Al + HNO3",
    products: "Al(NO3)3 + NH4NO3 + H2O",
    balancedEq: "8Al + 30HNO₃ → 8Al(NO₃)₃ + 3NH₄NO₃ + 9H₂O",
    oxidationStep: "Al⁰ → Al⁺³ + 3e",
    reductionStep: "N⁺⁵ + 8e → N⁻³ (NH₄⁺)",
    multiplierOx: 8,
    multiplierRed: 3,
    reducingAgent: "Al (Nhôm) - Số oxi hóa tăng từ 0 lên +3",
    oxidizingAgent: "HNO₃ - N(+5) giảm sâu xuống N(-3)",
    notes: "Kim loại có tính khử mạnh (Mg, Al, Zn) tác dụng với HNO₃ loãng/lạnh thường khử N(+5) về N(-3) trong NH₄NO₃."
  },
  {
    name: "5. Cl₂ + KOH (ở 100°C) → KCl + KClO₃ + H₂O (Tự oxi hóa - khử)",
    reactants: "Cl2 + KOH",
    products: "KCl + KClO3 + H2O",
    balancedEq: "3Cl₂ + 6KOH → 5KCl + KClO₃ + 3H₂O",
    oxidationStep: "Cl₂⁰ → 2Cl⁺⁵ + 10e (hay Cl⁰ → Cl⁺⁵ + 5e)",
    reductionStep: "Cl₂⁰ + 2e → 2Cl⁻¹ (hay Cl⁰ + 1e → Cl⁻¹)",
    multiplierOx: 1,
    multiplierRed: 5,
    reducingAgent: "Cl₂ vừa là chất khử vừa là chất oxi hóa (Phản ứng tự oxi hóa - khử)",
    oxidizingAgent: "Cl₂",
    notes: "Ở nhiệt độ thường tạo nước Javel (KCl + KClO). Ở nhiệt độ cao (100°C) tạo muối Potassium chlorate KClO₃."
  }
];

export default function RedoxBalancer() {
  const [inputReactants, setInputReactants] = useState<string>("Fe + HNO3");
  const [inputProducts, setInputProducts] = useState<string>("Fe(NO3)3 + NO + H2O");
  const [isBalancing, setIsBalancing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Balanced Result
  const [result, setResult] = useState<{
    balancedEq: string;
    reducingAgent: string;
    oxidizingAgent: string;
    oxidationStep: string;
    reductionStep: string;
    multiplierOx: number;
    multiplierRed: number;
    notes: string;
  }>({
    balancedEq: "Fe + 4HNO₃ → Fe(NO₃)₃ + NO↑ + 2H₂O",
    reducingAgent: "Fe (Sắt) - Số oxi hóa tăng từ 0 lên +3",
    oxidizingAgent: "HNO₃ (Axit nitric) - N(+5) giảm xuống N(+2)",
    oxidationStep: "Fe⁰ → Fe⁺³ + 3e",
    reductionStep: "N⁺⁵ + 3e → N⁺² (NO)",
    multiplierOx: 1,
    multiplierRed: 1,
    notes: "Tỉ lệ mol chất khử : chất oxi hóa tạo khí = 1 : 1. Tỉ lệ mol Fe : HNO₃ phản ứng = 1 : 4."
  });

  const handleLoadPreset = (p: RedoxPreset) => {
    setInputReactants(p.reactants);
    setInputProducts(p.products);
    setResult({
      balancedEq: p.balancedEq,
      reducingAgent: p.reducingAgent,
      oxidizingAgent: p.oxidizingAgent,
      oxidationStep: p.oxidationStep,
      reductionStep: p.reductionStep,
      multiplierOx: p.multiplierOx,
      multiplierRed: p.multiplierRed,
      notes: p.notes,
    });
  };

  const handleInsertChar = (char: string, field: 'reactants' | 'products') => {
    if (field === 'reactants') {
      setInputReactants(prev => prev + char);
    } else {
      setInputProducts(prev => prev + char);
    }
  };

  const handleBalance = async () => {
    setIsBalancing(true);

    // Check presets first for 0ms speed
    const matched = REDOX_PRESETS.find(
      p => p.reactants.toLowerCase().replace(/\s/g, '') === inputReactants.toLowerCase().replace(/\s/g, '') &&
           p.products.toLowerCase().replace(/\s/g, '') === inputProducts.toLowerCase().replace(/\s/g, '')
    );

    if (matched) {
      handleLoadPreset(matched);
      setIsBalancing(false);
      return;
    }

    const prompt = `Cân bằng phản ứng oxi hóa - khử sau theo phương pháp thăng bằng electron (Chuẩn GDPT 2018):
Chất tham gia: ${inputReactants}
Sản phẩm: ${inputProducts}

Trả về DUY NHẤT một chuỗi JSON thuần túy (không dùng markdown codeblock, không thêm text ngoài):
{
  "balancedEq": "Phương trình đã cân bằng với hệ số...",
  "reducingAgent": "Chất khử và giải thích số oxi hóa...",
  "oxidizingAgent": "Chất oxi hóa và giải thích...",
  "oxidationStep": "Quá trình oxi hóa (nhường e)...",
  "reductionStep": "Quá trình khử (nhận e)...",
  "multiplierOx": 1,
  "multiplierRed": 1,
  "notes": "Nhận xét về vai trò môi trường và tỉ lệ mol..."
}`;

    try {
      const responseText = await callGeminiAPI(prompt);
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        setResult(parsed);
      }
    } catch (e) {
      console.warn("Redox balance error:", e);
    } finally {
      setIsBalancing(false);
    }
  };

  const handleCopyEq = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(result.balancedEq);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      {/* Title */}
      <Box display="flex" alignItems="center" gap={1.5} mb={2.5}>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            display: 'flex',
          }}
        >
          <Zap size={24} color="#38bdf8" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#38bdf8', fontSize: { xs: '16px', sm: '18px' } }}>
            Máy Cân Bằng Phản Ứng Oxi Hóa - Khử Từng Bước 4 Bước Chuẩn
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Phương pháp thăng bằng electron: Quá trình nhường/nhận e • Tỉ lệ môi trường • Bàn phím ký hiệu Hóa học
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 2.5 }} />

      {/* Preset Quick Select Chips */}
      <Box mb={2.5}>
        <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={1}>
          📌 Phản Ứng Oxi Hóa - Khử Tiêu Biểu THPT:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {REDOX_PRESETS.map((p, idx) => (
            <Chip
              key={idx}
              label={p.name}
              size="small"
              onClick={() => handleLoadPreset(p)}
              sx={{
                bgcolor: 'rgba(56, 189, 248, 0.1)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                fontWeight: 'bold',
                fontSize: '11.5px',
                '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.25)' },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Chemical Formula Virtual Keyboard */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 2.5,
          borderRadius: 2,
          bgcolor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight="bold" display="flex" alignItems="center" gap={0.5} mb={1}>
          <Keyboard size={14} color="#818cf8" /> BÀN PHÍM KÝ HIỆU HÓA HỌC NHANH:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={0.8}>
          {['₂', '₃', '₄', '₅', '₆', '⁺', '⁻', '²⁺', '³⁺', '²⁻', '→', '⇌', '↑', '↓', 'ΔᵣH°₂₉₈', '(s)', '(l)', '(g)', '(aq)'].map((char) => (
            <Button
              key={char}
              size="small"
              variant="outlined"
              onClick={() => handleInsertChar(char, 'reactants')}
              sx={{
                minWidth: 32,
                height: 28,
                p: 0.5,
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#38bdf8',
                borderColor: 'rgba(56, 189, 248, 0.3)',
                bgcolor: 'rgba(56, 189, 248, 0.05)',
              }}
            >
              {char}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Input Form */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            size="small"
            label="Chất tham gia phản ứng"
            placeholder="Ví dụ: Fe + HNO3"
            value={inputReactants}
            onChange={(e) => setInputReactants(e.target.value)}
            sx={{ bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={2} textAlign="center">
          <ArrowRight size={24} color="#38bdf8" style={{ margin: '0 auto' }} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            size="small"
            label="Sản phẩm phản ứng"
            placeholder="Ví dụ: Fe(NO3)3 + NO + H2O"
            value={inputProducts}
            onChange={(e) => setInputProducts(e.target.value)}
            sx={{ bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Sparkles size={18} />}
            onClick={handleBalance}
            disabled={isBalancing}
            sx={{ py: 1.2, fontWeight: 'bold', borderRadius: 2 }}
          >
            {isBalancing ? "Đang Tính Toán Quá Trình Electron..." : "Cân Bằng Oxi Hóa - Khử Từng Bước"}
          </Button>
        </Grid>
      </Grid>

      {/* 4-Step Pedagogical Explanation Breakdown */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          bgcolor: '#020617',
          border: '1px solid rgba(56, 189, 248, 0.3)',
        }}
      >
        {/* Balanced Main Equation Banner */}
        <Box
          sx={{
            p: 2,
            mb: 2.5,
            borderRadius: 2,
            bgcolor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="caption" color="#38bdf8" fontWeight="bold" display="block">
              PHƯƠNG TRÌNH HÓA HỌC ĐÃ CÂN BẰNG:
            </Typography>
            <Typography
              variant="h6"
              fontWeight="900"
              sx={{ color: '#fff', letterSpacing: '0.02em', fontSize: { xs: '15px', sm: '18px' } }}
            >
              {result.balancedEq}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={copied ? <Check size={15} color="#34d399" /> : <Copy size={15} />}
            onClick={handleCopyEq}
            sx={{ color: copied ? '#34d399' : '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', textTransform: 'none' }}
          >
            {copied ? "Đã sao chép" : "Sao chép PTHH"}
          </Button>
        </Box>

        {/* 4 Detailed Steps */}
        <Grid container spacing={2}>
          {/* Step 1 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2, height: '100%', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <Typography variant="subtitle2" color="#38bdf8" fontWeight="bold" mb={1}>
                Bước 1: Xác định số oxi hóa & Vai trò các chất
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                • <b>Chất khử:</b> <span style={{ color: '#34d399' }}>{result.reducingAgent}</span>
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • <b>Chất oxi hóa:</b> <span style={{ color: '#f87171' }}>{result.oxidizingAgent}</span>
              </Typography>
            </Paper>
          </Grid>

          {/* Step 2 & 3 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2, height: '100%', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <Typography variant="subtitle2" color="#818cf8" fontWeight="bold" mb={1}>
                Bước 2 & 3: Quá trình nhường/nhận e & Hệ số nhân
              </Typography>
              <Box p={1} borderRadius={1} bgcolor="rgba(0,0,0,0.3)" mb={1}>
                <Typography variant="caption" fontFamily="monospace" color="#34d399" display="block">
                  × {result.multiplierOx} | {result.oxidationStep} (Quá trình oxi hóa)
                </Typography>
                <Typography variant="caption" fontFamily="monospace" color="#f87171" display="block">
                  × {result.multiplierRed} | {result.reductionStep} (Quá trình khử)
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Bảo toàn electron: Tổng e nhường = Tổng e nhận.
              </Typography>
            </Paper>
          </Grid>

          {/* Step 4 */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <Typography variant="subtitle2" color="#fbbf24" fontWeight="bold" mb={1}>
                Bước 4: Đặt hệ số, kiểm tra bảo toàn nguyên tố & Ghi chú sư phạm
              </Typography>
              <Typography variant="body2" color="white" sx={{ fontSize: '13px' }}>
                {result.notes}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
}
