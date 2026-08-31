"use client";

import { callGeminiAPI, generateParamHash, playBubbleSoundEffect, supabase } from '@/lib/api';
import {
  Box,
  Button,
  Card, CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack, TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import { CategoryScale, Chart as ChartJS, Tooltip as ChartTooltip, Filler, Legend, LinearScale, LineElement, PointElement, Title } from 'chart.js';
import {
  FlaskConical,
  Grid2X2,
  Play,
  RefreshCw,
  ShieldCheck,
  Volume2,
  Atom,
  Pipette,
  X,
  Table,
  Sliders,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import TitrationSimulator from '@/components/TitrationSimulator';
import RedoxBalancer from '@/components/RedoxBalancer';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

export interface PresetReaction {
  id: number;
  grade: "10" | "11" | "12" | string;
  name: string;
  subA: string;
  volA: number;
  concA: number;
  subB: string;
  volB: number;
  concB: number;
  temp: number;
  indicator: string;
}

export const PRESETS: PresetReaction[] = [
  { id: 1, grade: "10", name: "1. NaOH + HCl (+ Quỳ tím - Trung hòa)", subA: "NaOH", volA: 100, concA: 1.0, subB: "HCl", volB: 100, concB: 1.0, temp: 25, indicator: "litmus" },
  { id: 2, grade: "10", name: "2. Na + H₂O (Kim loại kiềm chạy nhảy + Lóe sáng + Hồng)", subA: "Na", volA: 20, concA: 1.0, subB: "H2O", volB: 100, concB: 1.0, temp: 25, indicator: "phenolphthalein" },
  { id: 3, grade: "10", name: "3. Zn + H₂SO₄ loãng (Thanh Zn tan dần + Sủi bọt H₂)", subA: "Zn", volA: 10, concA: 1.0, subB: "H2SO4", volB: 60, concB: 1.0, temp: 25, indicator: "none" },
  { id: 4, grade: "10", name: "4. Fe + CuSO₄ (Phản ứng thế kim loại → Màu đỏ gạch)", subA: "Fe", volA: 10, concA: 1.0, subB: "CuSO4", volB: 80, concB: 0.5, temp: 25, indicator: "none" },
  { id: 5, grade: "10", name: "5. KMnO₄ + HCl đặc (Điều chế khí Cl₂ Vàng Lục)", subA: "KMnO4", volA: 10, concA: 1.0, subB: "HCl", volB: 50, concB: 2.0, temp: 60, indicator: "none" },
  { id: 6, grade: "11", name: "6. Cu + HNO₃ đặc → Dung dịch xanh + Khí Nâu Đỏ NO₂", subA: "Cu", volA: 15, concA: 1.0, subB: "HNO3", volB: 60, concB: 2.0, temp: 75, indicator: "none" },
  { id: 7, grade: "12", name: "7. CH₃COOH + C₂H₅OH → Este phân 2 lớp dầu", subA: "CH3COOH", volA: 30, concA: 2.0, subB: "C2H5OH", volB: 30, concB: 2.0, temp: 80, indicator: "none" },
  { id: 8, grade: "12", name: "8. C₆H₁₂O₆ (Glucose) + AgNO₃ → Tráng bạc thành cốc", subA: "C6H12O6", volA: 40, concA: 0.5, subB: "AgNO3", volB: 40, concB: 0.5, temp: 60, indicator: "none" },
  { id: 9, grade: "10", name: "9. KI + Cl₂ (Halogen đẩy nhau → Dung dịch sẫm màu)", subA: "KI", volA: 50, concA: 0.5, subB: "Cl2", volB: 50, concB: 0.5, temp: 25, indicator: "none" },
  { id: 10, grade: "10", name: "10. AgNO₃ + NaCl (Kết tủa trắng AgCl lắng)", subA: "AgNO3", volA: 40, concA: 0.5, subB: "NaCl", volB: 40, concB: 0.5, temp: 25, indicator: "none" },
  { id: 11, grade: "10", name: "11. BaCl₂ + H₂SO₄ (Kết tủa trắng BaSO₄ không tan)", subA: "BaCl2", volA: 50, concA: 0.5, subB: "H2SO4", volB: 50, concB: 0.5, temp: 25, indicator: "none" },
];

import { ELEMENTS_DATA } from '@/lib/elementsData';

interface ChemicalMItem {
  formula: string;
  displayFormula?: string;
  mVal: string;
  color: string;
  nameVi?: string;
  category?: string;
  atomicNumber?: number;
}

const CHEMICAL_COMPOUNDS_DATA: ChemicalMItem[] = [
  { formula: "HCl", mVal: "36.5", color: "#fbbf24", nameVi: "Axit clohiđric" },
  { formula: "H2SO4", displayFormula: "H₂SO₄", mVal: "98.0", color: "#fbbf24", nameVi: "Axit sunfuric" },
  { formula: "HNO3", displayFormula: "HNO₃", mVal: "63.0", color: "#fbbf24", nameVi: "Axit nitric" },
  { formula: "NaOH", mVal: "40.0", color: "#34d399", nameVi: "Natri hiđroxit" },
  { formula: "KOH", mVal: "56.1", color: "#34d399", nameVi: "Kali hiđroxit" },
  { formula: "AgNO3", displayFormula: "AgNO₃", mVal: "170.0", color: "#c084fc", nameVi: "Bạc nitrat" },
  { formula: "CuSO4", displayFormula: "CuSO₄", mVal: "160.0", color: "#38bdf8", nameVi: "Đồng(II) sunfat" },
  { formula: "KMnO4", displayFormula: "KMnO₄", mVal: "158.0", color: "#c084fc", nameVi: "Thuốc tím" },
  { formula: "CH3COOH", displayFormula: "CH₃COOH", mVal: "60.0", color: "#fde047", nameVi: "Axit axetic (Giấm ăn)" },
  { formula: "C2H5OH", displayFormula: "C₂H₅OH", mVal: "46.0", color: "#fde047", nameVi: "Ethanol (Cồn 96°)" },
  { formula: "C6H12O6", displayFormula: "Glucose", mVal: "180.0", color: "#fb7185", nameVi: "Glucozơ" },
  { formula: "CaCO3", displayFormula: "CaCO₃", mVal: "100.0", color: "#f8fafc", nameVi: "Đá vôi" },
  { formula: "BaCl2", displayFormula: "BaCl₂", mVal: "208.2", color: "#38bdf8", nameVi: "Bari clorua" },
  { formula: "KI", displayFormula: "KI", mVal: "166.0", color: "#a855f7", nameVi: "Kali iotua" },
  { formula: "FeCl3", displayFormula: "FeCl₃", mVal: "162.2", color: "#f59e0b", nameVi: "Sắt(III) clorua" },
  { formula: "AlCl3", displayFormula: "AlCl₃", mVal: "133.3", color: "#94a3b8", nameVi: "Nhôm clorua" },
  { formula: "H2O2", displayFormula: "H₂O₂", mVal: "34.0", color: "#38bdf8", nameVi: "Oxi già" },
];

export interface SimulationResult {
  eq: string;
  phenomenon: string;
  phEstimate: string;
  stoichiometry: string;
  liquidColor: string;
  isSilverMirror?: boolean;
  isDissolving?: boolean;
  hasFume?: boolean;
  fumeColor?: string;
  hasSolidRod?: boolean;
  solidRodColor?: string;
  isImmiscible?: boolean;
  upperLiquidColor?: string;
  surfaceSpark?: boolean;
  precipitate?: boolean;
  precipitateColor?: string;
  precipitateHeightPct?: number;
  bubbles?: boolean;
  bubbleIntensity?: number;
  hazard: string;
}

export const PRESET_SIMULATION_DATA: Record<number, SimulationResult> = {
  1: {
    eq: "NaOH + HCl → NaCl + H₂O",
    phenomenon: "Phản ứng trung hòa hoàn toàn giữa axit mạnh và bazơ mạnh. Quỳ tím chuyển từ xanh (môi trường bazơ ban đầu) sang tím trung tính (pH ~ 7.0). Tỏa nhiệt nhẹ.",
    phEstimate: "7.0 - Trung tính",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(NaOH) = 0.100 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(HCl) = 0.100 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Phản ứng vừa đủ theo tỉ lệ mol 1 : 1.</div><div>• <b>Sản phẩm:</b> n(NaCl) = 0.100 mol</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [NaCl] = 0.500 M</div></div>",
    liquidColor: "rgba(147, 51, 234, 0.55)",
    hazard: "Phản ứng tỏa nhiệt nhẹ. Tránh để hóa chất bắn vào mắt.",
  },
  2: {
    eq: "2Na + 2H₂O → 2NaOH + H₂↑",
    phenomenon: "Mẩu Na nóng chảy thành viên tròn chạy nhảy lăn tăn trên mặt nước, phát ra tiếng xèo xèo và bốc cháy lóe sáng. Dung dịch có phenolphtalein chuyển sang màu hồng cánh sen rực rỡ, bọt khí H₂ sủi mạnh.",
    phEstimate: "13.0 - Kiềm mạnh",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Na) = 0.020 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(H₂O) = 5.550 mol (dư)</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Na tan hoàn toàn, sinh ra khí H₂ và dung dịch NaOH.</div><div>• <b>Sản phẩm:</b> n(NaOH) = 0.020 mol, n(H₂) = 0.010 mol (0.248 L ở đkc).</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [NaOH] = 0.200 M</div></div>",
    liquidColor: "rgba(236, 72, 153, 0.75)",
    surfaceSpark: true,
    bubbles: true,
    bubbleIntensity: 14,
    hazard: "Kim loại kiềm phản ứng mãnh liệt với nước, có thể gây bắn kiềm nóng nguy hiểm. Chỉ dùng lượng nhỏ Na cỡ hạt đậu.",
  },
  3: {
    eq: "Zn + H₂SO₄ → ZnSO₄ + H₂↑",
    phenomenon: "Thanh kẽm (Zn) tan dần trong dung dịch axit, bọt khí không màu H₂ sủi lên liên tục và bám quanh bề mặt thanh kẽm.",
    phEstimate: "1.0 - Axit mạnh",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Zn) = 0.010 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(H₂SO₄) = 0.060 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Zn hết, H₂SO₄ dư 0.050 mol.</div><div>• <b>Sản phẩm:</b> n(ZnSO₄) = 0.010 mol, sinh ra 0.010 mol H₂ (0.248 L ở đkc).</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [ZnSO₄] = 0.143 M; [H₂SO₄ dư] = 0.714 M</div></div>",
    liquidColor: "rgba(59, 130, 246, 0.25)",
    hasSolidRod: true,
    solidRodColor: "#94a3b8",
    isDissolving: true,
    bubbles: true,
    bubbleIntensity: 10,
    hazard: "Khí H₂ dễ bắt cháy nổ. Tránh tiếp xúc với lửa trần.",
  },
  4: {
    eq: "Fe + CuSO₄ → FeSO₄ + Cu↓",
    phenomenon: "Thanh sắt (Fe) bị phủ một lớp kim loại đồng (Cu) màu đỏ gạch sáng bóng, dung dịch CuSO₄ màu xanh lam nhạt dần chuyển sang màu xanh lục nhạt của FeSO₄.",
    phEstimate: "5.5 - Axit yếu",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Fe) = 0.010 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(CuSO₄) = 0.040 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Fe phản ứng hết, CuSO₄ dư 0.030 mol.</div><div>• <b>Sản phẩm:</b> Tạo 0.010 mol Cu (0.64g) bám trên đinh sắt, sinh ra 0.010 mol FeSO₄.</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [FeSO₄] = 0.111 M; [CuSO₄ dư] = 0.333 M</div></div>",
    liquidColor: "rgba(16, 185, 129, 0.5)",
    hasSolidRod: true,
    solidRodColor: "#b91c1c",
    precipitate: true,
    precipitateColor: "#b45309",
    hazard: "Muối kim loại nặng cần thu gom chất thải đúng quy định sau thí nghiệm.",
  },
  5: {
    eq: "2KMnO₄ + 16HCl (đặc) → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O",
    phenomenon: "Dung dịch thuốc tím KMnO₄ mất màu, sủi bọt khí mạnh và bốc luồng khí Clo (Cl₂) màu vàng lục, mùi hắc nồng bốc lên khỏi miệng cốc.",
    phEstimate: "0.8 - Axit rất mạnh",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(KMnO₄) = 0.010 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(HCl) = 0.100 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> KMnO₄ hết, HCl dư 0.020 mol.</div><div>• <b>Sản phẩm:</b> Sinh ra 0.025 mol khí Cl₂ (vàng lục, độc) = 0.62 L ở đkc.</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [MnCl₂] = 0.167 M; [KCl] = 0.167 M</div></div>",
    liquidColor: "rgba(250, 204, 21, 0.4)",
    hasFume: true,
    fumeColor: "rgba(234, 179, 8, 0.75)",
    bubbles: true,
    bubbleIntensity: 12,
    hazard: "Khí Clo (Cl₂) cực độc, phá hủy niêm mạc đường hô hấp. Bắt buộc thực hiện trong tủ hút khí độc!",
  },
  6: {
    eq: "Cu + 4HNO₃ (đặc) → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O",
    phenomenon: "Thanh đồng (Cu) màu đỏ tan dần, dung dịch chuyển sang màu xanh lam ngọc đặc trưng của Cu(NO₃)₂. Bọt khí sủi mạnh và xuất hiện luồng khí NO₂ màu nâu đỏ độc bốc lên khỏi miệng cốc.",
    phEstimate: "0.5 - Axit rất mạnh",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Cu) = 0.010 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(HNO₃) = 0.120 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Cu hết, HNO₃ dư 0.080 mol.</div><div>• <b>Sản phẩm:</b> n(Cu(NO₃)₂) = 0.010 mol, sinh ra 0.020 mol khí NO₂ (nâu đỏ, độc).</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [Cu(NO₃)₂] = 0.143 M; [HNO₃ dư] = 1.143 M</div></div>",
    liquidColor: "rgba(14, 165, 233, 0.85)",
    hasFume: true,
    fumeColor: "rgba(180, 83, 9, 0.9)",
    hasSolidRod: true,
    solidRodColor: "#b45309",
    isDissolving: true,
    bubbles: true,
    bubbleIntensity: 12,
    hazard: "Khí NO₂ màu nâu đỏ cực kỳ độc hại cho đường hô hấp. Axit HNO₃ đặc ăn mòn da dữ dội. Thao tác trong tủ hút!",
  },
  7: {
    eq: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ (Ethyl acetate) + H₂O (H₂SO₄ đặc, 65°C)",
    phenomenon: "Đun nóng ở 65°C, phản ứng este hóa thuận nghịch xảy ra tạo Ethyl acetate có mùi thơm hoa quả chín, không tan trong nước, tạo thành lớp chất lỏng dầu este nhẹ nổi lên trên bề mặt.",
    phEstimate: "3.2 - Axit yếu",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(CH₃COOH) = 0.050 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(C₂H₅OH) = 0.050 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Phản ứng este hóa đạt trạng thái cân bằng (hiệu suất ~66%).</div><div>• <b>Sản phẩm:</b> Sinh ra ~0.033 mol Ethyl acetate (CH₃COOC₂H₅).</div><div class='text-emerald-400 font-medium'>• <b>Đặc điểm:</b> Dung dịch phân tách thành 2 lớp chất lỏng rõ rệt.</div></div>",
    liquidColor: "rgba(241, 245, 249, 0.45)",
    isImmiscible: true,
    upperLiquidColor: "rgba(254, 240, 138, 0.7)",
    bubbles: false,
    hazard: "Hỗn hợp cồn và este dễ bay hơi và bắt cháy. Cần đun cách thủy nhẹ nhàng và tránh xa ngọn lửa trần.",
  },
  8: {
    eq: "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → CH₂OH(CHOH)₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O",
    phenomenon: "Đun nóng nhẹ ở 60°C, nhóm chức andehit trong Glucose khử ion Ag⁺ tạo lớp bạc kim loại (Ag) sáng bóng bám đều và bao phủ toàn bộ thành trong của cốc thí nghiệm (phản ứng tráng gương).",
    phEstimate: "8.5 - Môi trường kiềm NH₃",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(C₆H₁₂O₆) = 0.020 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(AgNO₃) = 0.020 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> 1 mol Glucose khử được 2 mol Ag⁺.</div><div>• <b>Sản phẩm:</b> Tạo 0.020 mol bạc kim loại (Ag) bám thành cốc (m(Ag) = 2.16 gam).</div><div class='text-emerald-400 font-medium'>• <b>Ứng dụng:</b> Dùng tráng gương soi và tráng ruột phích nước giữ nhiệt.</div></div>",
    liquidColor: "rgba(203, 213, 225, 0.45)",
    isSilverMirror: true,
    bubbles: false,
    hazard: "Dung dịch phức bạc amoniac để lâu có thể tạo cặn bạc fulminat gây nổ. Rửa sạch bằng axit HNO₃ loãng sau khi thực hành.",
  },
  9: {
    eq: "2KI + Cl₂ → 2KCl + I₂↓",
    phenomenon: "Khí Clo có tính oxi hóa mạnh hơn Iod, đẩy Iod ra khỏi dung dịch muối KI. Dung dịch không màu nhanh chóng chuyển sang màu nâu sẫm của Iod tự do.",
    phEstimate: "6.8 - Gần trung tính",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(KI) = 0.025 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Cl₂) = 0.025 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> KI hết, Cl₂ dư 0.0125 mol.</div><div>• <b>Sản phẩm:</b> Tạo 0.0125 mol Iod (I₂) màu nâu sẫm.</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [KCl] = 0.250 M</div></div>",
    liquidColor: "rgba(120, 53, 15, 0.85)",
    precipitate: true,
    precipitateColor: "#451a03",
    hazard: "Khí Clo độc hại, dung dịch Iod bám dính làm ố vàng da và quần áo.",
  },
  10: {
    eq: "AgNO₃ + NaCl → AgCl↓ (trắng) + NaNO₃",
    phenomenon: "Xuất hiện kết tủa trắng vón cục AgCl không tan trong axit mạnh, lắng dần xuống đáy cốc thí nghiệm.",
    phEstimate: "7.0 - Trung tính",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(AgNO₃) = 0.020 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(NaCl) = 0.020 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Phản ứng vừa đủ theo tỉ lệ mol 1 : 1.</div><div>• <b>Sản phẩm:</b> n(AgCl) = 0.020 mol (2.87g kết tủa trắng).</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [NaNO₃] = 0.250 M</div></div>",
    liquidColor: "rgba(241, 245, 249, 0.4)",
    precipitate: true,
    precipitateColor: "#ffffff",
    hazard: "Dung dịch AgNO₃ làm đen da khi tiếp xúc trực tiếp dưới ánh sáng.",
  },
  11: {
    eq: "BaCl₂ + H₂SO₄ → BaSO₄↓ (trắng) + 2HCl",
    phenomenon: "Tạo kết tủa trắng tinh mịn BaSO₄ không tan trong nước và axit mạnh, làm dung dịch đục như sữa rồi lắng xuống đáy.",
    phEstimate: "1.2 - Axit mạnh",
    stoichiometry: "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(BaCl₂) = 0.025 mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(H₂SO₄) = 0.025 mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> Phản ứng vừa đủ theo tỉ lệ mol 1 : 1.</div><div>• <b>Sản phẩm:</b> Tạo 0.025 mol BaSO₄ (5.83g kết tủa trắng) và 0.050 mol HCl.</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> [HCl] = 0.500 M</div></div>",
    liquidColor: "rgba(241, 245, 249, 0.4)",
    precipitate: true,
    precipitateColor: "#ffffff",
    hazard: "Muối Bari tan (BaCl₂) có độc tính cao đối với tim mạch và cơ bắp nếu nuốt phải.",
  },
};

export default function VirtualLab() {
  const [activeLabModule, setActiveLabModule] = useState<'reaction' | 'titration' | 'redox'>('reaction');
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [subA, setSubA] = useState<string>("Zn");
  const [volA, setVolA] = useState<number>(10);
  const [concA, setConcA] = useState<number>(1.0);

  const [subB, setSubB] = useState<string>("H2SO4");
  const [volB, setVolB] = useState<number>(60);
  const [concB, setConcB] = useState<number>(1.0);

  const [temp, setTemp] = useState<number>(25);
  const [indicator, setIndicator] = useState<string>("none");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("Sẵn sàng mô phỏng Thí nghiệm THPT");
  const [result, setResult] = useState<SimulationResult | null>(null);

  const [openPeriodic, setOpenPeriodic] = useState<boolean>(false);
  const [periodicTab, setPeriodicTab] = useState<'elements' | 'compounds'>('elements');
  const [targetSlot, setTargetSlot] = useState<'A' | 'B'>('A');
  const [elementSearchQuery, setElementSearchQuery] = useState<string>('');

  // Dynamic animations state
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);
  const [fumes, setFumes] = useState<Array<{ id: number; left: number; delay: number; size: number; color: string }>>([]);

  const filteredPresets = PRESETS.filter(p => gradeFilter === "all" || p.grade === gradeFilter);

  const handleLoadPreset = (p: PresetReaction) => {
    setSubA(p.subA);
    setVolA(p.volA);
    setConcA(p.concA);
    setSubB(p.subB);
    setVolB(p.volB);
    setConcB(p.concB);
    setTemp(p.temp);
    setIndicator(p.indicator);

    // If preset data is pre-compiled, load immediately for instant response
    const presetData = PRESET_SIMULATION_DATA[p.id];
    if (presetData) {
      setIsLoading(true);
      applyKineticSpeed(p.temp);
      const totalVol = p.volA + p.volB;
      setStatusText(`Đang tính toán phản ứng THPT (${totalVol} ml | ${p.temp}°C)...`);

      setTimeout(() => {
        renderResult(presetData, p.subA, p.subB, p.temp);
        setStatusText(`Đã mô phỏng xong | Thể tích: ${totalVol} ml (${p.temp}°C)`);
        setIsLoading(false);
      }, 200);
      return;
    }

    runSimulation(p.subA, p.volA, p.concA, p.subB, p.volB, p.concB, p.temp, p.indicator);
  };

  const applyKineticSpeed = (temperature: number) => {
    const speed = Math.max(0.3, 1 - (temperature - 25) * 0.012);
    document.documentElement.style.setProperty("--anim-speed", `${speed * 2}s`);
    document.documentElement.style.setProperty("--skitter-speed", `${speed * 2.8}s`);
    document.documentElement.style.setProperty("--dissolve-speed", `${speed * 4.5}s`);
  };

  const runSimulation = async (
    sA = subA, vA = volA, cA = concA,
    sB = subB, vB = volB, cB = concB,
    t = temp, ind = indicator
  ) => {
    if (!sA.trim() || !sB.trim()) {
      alert("Vui lòng nhập đầy đủ tên chất hóa học!");
      return;
    }

    setIsLoading(true);
    applyKineticSpeed(t);
    const totalVol = vA + vB;
    setStatusText(`Đang tính toán phản ứng THPT (${totalVol} ml | ${t}°C)...`);

    const hashKey = await generateParamHash(sA, vA, cA, sB, vB, cB, t, ind);

    // 1. Check local storage cache
    const cachedLocal = localStorage.getItem(hashKey);
    if (cachedLocal) {
      try {
        const parsed = JSON.parse(cachedLocal);
        renderResult(parsed, sA, sB, t);
        setStatusText(`Đã mô phỏng xong | Thể tích: ${totalVol} ml (${t}°C)`);
        setIsLoading(false);
        return;
      } catch {
        localStorage.removeItem(hashKey);
      }
    }

    // 2. Check Supabase DB cache
    try {
      const { data } = await supabase.from("experiments").select("result_json").eq("cache_key", hashKey).maybeSingle();
      if (data && data.result_json) {
        localStorage.setItem(hashKey, JSON.stringify(data.result_json));
        renderResult(data.result_json, sA, sB, t);
        setStatusText(`Đã mô phỏng xong | Thể tích: ${totalVol} ml (${t}°C)`);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Supabase cache skip:", e);
    }

    // 3. Call Gemini AI API
    const prompt = `Phân tích định lượng phản ứng Hóa học THPT:
- Chất A: ${sA} (${vA} ml, nồng độ ${cA} M)
- Chất B: ${sB} (${vB} ml, nồng độ ${cB} M)
- Nhiệt độ: ${t} °C
- Chất chỉ thị sử dụng: ${ind}

Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):
{
  "eq": "Phương trình hóa học đầy đủ có cân bằng",
  "phenomenon": "Mô tả ngắn gọn hiện tượng nhận biết (kèm theo sự đổi màu của chất chỉ thị ${ind} nếu có)",
  "phEstimate": "Giá trị pH ước tính dung dịch sau phản ứng (ví dụ: 1.5 - Axit mạnh hoặc 7.0 - Trung tính hoặc 12.5 - Bazo)",
  "stoichiometry": "<div class='space-y-1 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Chất A) = ... mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Chất B) = ... mol</span></div><div>• <b>Tỉ lệ & Phản ứng:</b> ...</div><div>• <b>Sản phẩm:</b> ...</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> ...</div></div>",
  "liquidColor": "Mã màu rgba đại diện cho dung dịch",
  "isSilverMirror": true nếu đây là phản ứng tráng bạc thành cốc ngược lại false,
  "isDissolving": true nếu có thanh/viên kim loại hay chất rắn bị hòa tan dần ngược lại false,
  "hasFume": true nếu có khói/khí độc bốc lên khỏi miệng cốc ngược lại false,
  "fumeColor": "Mã rgba màu khói/khí nếu có",
  "hasSolidRod": true nếu có thanh kim loại cắm vào cốc ngược lại false,
  "solidRodColor": "Mã hex màu thanh kim loại",
  "isImmiscible": true nếu dung dịch tách 2 lớp dầu/nước ngược lại false,
  "upperLiquidColor": "Mã màu rgba lớp trên",
  "surfaceSpark": true nếu có viên Na/K nóng chảy chạy nhảy lóe sáng trên mặt nước ngược lại false,
  "precipitate": true hoặc false,
  "precipitateColor": "Mã hex màu kết tủa (#ffffff)",
  "precipitateHeightPct": 15,
  "bubbles": true hoặc false,
  "bubbleIntensity": 8,
  "hazard": "Cảnh báo an toàn"
}`;

    try {
      const response = await callGeminiAPI(prompt);
      const match = response.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("JSON không hợp lệ");
      const resData: SimulationResult = JSON.parse(match[0]);

      localStorage.setItem(hashKey, JSON.stringify(resData));
      supabase.from("experiments").upsert({ cache_key: hashKey, result_json: resData }).then();

      renderResult(resData, sA, sB, t);
      setStatusText(`Đã mô phỏng xong | Thể tích: ${totalVol} ml (${t}°C)`);
    } catch (err: any) {
      console.error("AI Error:", err);
      setStatusText(`Lỗi định lượng mô phỏng: ${err.message || 'Thử lại'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = (data: SimulationResult, sA: string, sB: string, t: number) => {
    setResult(data);

    // Generate bubbles if needed
    const lowerA = sA.toLowerCase();
    const lowerB = sB.toLowerCase();
    const needsBubbles = data.bubbles || lowerA === "na" || lowerB === "na" || ["zn", "fe", "mg", "al", "cu"].includes(lowerA);
    if (needsBubbles) {
      playBubbleSoundEffect();
      const count = data.bubbleIntensity || 8;
      const bList = Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 80 + 10,
        delay: Math.random() * 1.5,
        size: Math.random() * 8 + 4
      }));
      setBubbles(bList);
    } else {
      setBubbles([]);
    }

    // Generate fumes if needed
    const needsFumes = data.hasFume || lowerA.includes("hno3") || lowerB.includes("hno3") || lowerA.includes("kmno4") || lowerB.includes("kmno4");
    if (needsFumes) {
      const fColor = data.fumeColor || (lowerA.includes("hno3") || lowerB.includes("hno3") ? "rgba(180, 83, 9, 0.85)" : "rgba(255, 255, 255, 0.7)");
      const fList = Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        left: Math.random() * 60 + 20,
        delay: Math.random() * 1.2,
        size: Math.random() * 25 + 20,
        color: fColor
      }));
      setFumes(fList);
    } else {
      setFumes([]);
    }
  };

  // Voice speech synthesis
  const speakPhenomenon = () => {
    if (!result) return;
    let text = `${result.phenomenon}. ${result.hazard}`;
    const chemDict = [
      { regex: /\b(H2SO4|H₂SO₄)\b/gi, phonetic: "a-xít sun-phu-ríc" },
      { regex: /\b(HNO3|HNO₃)\b/gi, phonetic: "a-xít ni-tríc" },
      { regex: /\b(HCl)\b/gi, phonetic: "a-xít clo-hi-đríc" },
      { regex: /\b(NaOH)\b/gi, phonetic: "na-tri hi-đrô-xít" },
      { regex: /\b(KOH)\b/gi, phonetic: "ka-li hi-đrô-xít" },
      { regex: /\b(CH3COOH|CH₃COOH)\b/gi, phonetic: "a-xít a-xê-tíc" },
      { regex: /\b(C2H5OH|C₂H₅OH)\b/gi, phonetic: "rượu ê-thi-líc" },
      { regex: /\b(C6H12O6|C₆H₁₂O₆)\b/gi, phonetic: "glu-cô-zơ" },
      { regex: /\b(AgNO3|AgNO₃)\b/gi, phonetic: "bạc ni-trát" },
      { regex: /\b(KMnO4|KMnO₄)\b/gi, phonetic: "ka-li pem-man-ga-nát" },
      { regex: /\b(CuSO4|CuSO₄)\b/gi, phonetic: "đồng hai sun-phát" },
      { regex: /\b(H2O|H₂O)\b/gi, phonetic: "nước" },
      { regex: /\b(CO2|CO₂)\b/gi, phonetic: "khí cac-bo-níc" },
      { regex: /\b(NO2|NO₂)\b/gi, phonetic: "khí ni-tơ đi-ô-xít" },
      { regex: /\b(Cl2|Cl₂)\b/gi, phonetic: "khí clo" },
      { regex: /\b(H2|H₂)\b/gi, phonetic: "khí hi-đrô" },
      { regex: /\b(Zn)\b/g, phonetic: "kẽm" },
      { regex: /\b(Fe)\b/g, phonetic: "sắt" },
      { regex: /\b(Cu)\b/g, phonetic: "đồng" },
      { regex: /\b(Na)\b/g, phonetic: "na-tri" },
    ];
    chemDict.forEach(item => { text = text.replace(item.regex, item.phonetic); });

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt không hỗ trợ đọc giọng nói.");
    }
  };

  // Chart data calculation
  const phVal = parseFloat(result?.phEstimate || "7.0") || 7.0;
  const chartData = {
    labels: ["0ml", "20ml", "40ml", "60ml", "Đương lượng", "100ml", "120ml"],
    datasets: [
      {
        label: "Đường cong Chuẩn độ pH",
        data: [1, 1.5, 2, 3.5, phVal, Math.min(14, phVal + 0.5), Math.min(14, phVal + 1)],
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.15)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#38bdf8",
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: "rgba(255, 255, 255, 0.08)" }, ticks: { color: "#94a3b8", font: { size: 9 } } },
      y: { min: 0, max: 14, grid: { color: "rgba(255, 255, 255, 0.08)" }, ticks: { color: "#94a3b8", font: { size: 9 } } }
    },
    plugins: { legend: { labels: { color: "#e2e8f0", font: { size: 10 } } } }
  };

  const totalVolume = volA + volB;
  const liquidHeightPct = Math.min(95, Math.max(15, (totalVolume / 250) * 100));

  return (
    <Box>
      {/* 3 Major Lab Modules Navigation Switcher */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 2.5,
          borderRadius: 2.5,
          bgcolor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
          <Button
            variant={activeLabModule === 'reaction' ? 'contained' : 'outlined'}
            color="primary"
            size="small"
            startIcon={<FlaskConical size={16} />}
            onClick={() => setActiveLabModule('reaction')}
            sx={{ fontWeight: 'bold', borderRadius: 2, textTransform: 'none' }}
          >
            Phản Ứng Động Học Ảo
          </Button>

          <Button
            variant={activeLabModule === 'titration' ? 'contained' : 'outlined'}
            color="info"
            size="small"
            startIcon={<Pipette size={16} />}
            onClick={() => setActiveLabModule('titration')}
            sx={{ fontWeight: 'bold', borderRadius: 2, textTransform: 'none' }}
          >
            Trạm Chuẩn Độ Axit - Bazơ
          </Button>

          <Button
            variant={activeLabModule === 'redox' ? 'contained' : 'outlined'}
            color="warning"
            size="small"
            startIcon={<Zap size={16} />}
            onClick={() => setActiveLabModule('redox')}
            sx={{ fontWeight: 'bold', borderRadius: 2, textTransform: 'none' }}
          >
            Cân Bằng Oxi Hóa - Khử (4 Bước)
          </Button>
        </Box>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Grid2X2 size={14} />}
          onClick={() => setOpenPeriodic(true)}
          sx={{
            borderColor: 'rgba(255,255,255,0.2)',
            color: '#38bdf8',
            textTransform: 'none',
            fontSize: '12px',
          }}
        >
          Bảng tuần hoàn / M
        </Button>
      </Paper>

      {activeLabModule === 'titration' && <TitrationSimulator />}
      {activeLabModule === 'redox' && <RedoxBalancer />}

      {activeLabModule === 'reaction' && (
        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)', mb: 3 }}>
          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
            {/* Header */}
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              gap={1.5}
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <FlaskConical color="#0284c7" size={22} />
                <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px', md: '20px' } }}>
                  Phòng Thí Nghiệm Hóa Học Ảo THPT (2D/Chart Dynamic)
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }}>
              {/* LEFT INPUT PANEL */}
              <Grid item xs={12} lg={5}>
              <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.2} flexWrap="wrap" gap={1}>
                  <Typography variant="subtitle2" fontWeight="bold" color="cyan" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                    📖 Mẫu Thí Nghiệm THPT (10 - 11 - 12)
                  </Typography>
                  <Stack direction="row" spacing={0.5}>
                    {['all', '10', '11', '12'].map((g) => (
                      <Chip
                        key={g}
                        label={g === 'all' ? 'Tất cả' : `Lớp ${g}`}
                        size="small"
                        onClick={() => setGradeFilter(g)}
                        sx={{
                          height: 20,
                          fontSize: 10,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          bgcolor: gradeFilter === g ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.05)',
                          color: gradeFilter === g ? '#38bdf8' : '#94a3b8',
                          border: gradeFilter === g ? '1px solid rgba(56, 189, 248, 0.6)' : '1px solid rgba(255,255,255,0.1)',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Scrollable Presets */}
                <Box sx={{ maxHeight: 220, overflowY: 'auto', pr: 0.5, mb: 2 }} className="custom-scrollbar">
                  <Stack spacing={0.8}>
                    {filteredPresets.map((p) => {
                      const badgeStyle =
                        p.grade === '11'
                          ? { bgcolor: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.35)' }
                          : p.grade === '12'
                          ? { bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)' }
                          : { bgcolor: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)' };

                      return (
                        <Button
                          key={p.id}
                          onClick={() => handleLoadPreset(p)}
                          variant="outlined"
                          fullWidth
                          sx={{
                            justifyContent: 'space-between',
                            textTransform: 'none',
                            fontSize: '11.5px',
                            color: '#e2e8f0',
                            borderColor: 'rgba(255,255,255,0.1)',
                            bgcolor: 'rgba(30, 41, 59, 0.6)',
                            py: 0.7,
                            px: 1.2,
                            textAlign: 'left',
                            '&:hover': { bgcolor: 'rgba(30, 41, 59, 1)', borderColor: '#38bdf8' }
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 6 }}>
                            {p.name}
                          </span>
                          <Chip
                            label={`Lớp ${p.grade}`}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: 10,
                              fontWeight: 'bold',
                              flexShrink: 0,
                              ...badgeStyle
                            }}
                          />
                        </Button>
                      );
                    })}
                  </Stack>
                </Box>

                <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={1}>
                  ⚙️ Thông số Thí nghiệm tùy chỉnh:
                </Typography>

                {/* Substance A */}
                <Grid container spacing={1} mb={1.5}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" gap={0.5} alignItems="center">
                      <TextField
                        label="Chất A"
                        size="small"
                        fullWidth
                        value={subA}
                        onChange={(e) => setSubA(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Tooltip title="Chọn từ 118 nguyên tố BTH & Tủ hóa chất cho Chất A">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setTargetSlot('A');
                            setOpenPeriodic(true);
                          }}
                          sx={{
                            bgcolor: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8',
                            borderRadius: 2,
                            p: 0.9,
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.3)' },
                          }}
                        >
                          <Atom size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="ml"
                      type="number"
                      size="small"
                      fullWidth
                      value={volA}
                      onChange={(e) => setVolA(parseFloat(e.target.value) || 0)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Nồng độ M"
                      type="number"
                      size="small"
                      fullWidth
                      value={concA}
                      onChange={(e) => setConcA(parseFloat(e.target.value) || 0)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                {/* Substance B */}
                <Grid container spacing={1} mb={2}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" gap={0.5} alignItems="center">
                      <TextField
                        label="Chất B"
                        size="small"
                        fullWidth
                        value={subB}
                        onChange={(e) => setSubB(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Tooltip title="Chọn từ 118 nguyên tố BTH & Tủ hóa chất cho Chất B">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setTargetSlot('B');
                            setOpenPeriodic(true);
                          }}
                          sx={{
                            bgcolor: 'rgba(168, 85, 247, 0.15)',
                            color: '#c084fc',
                            borderRadius: 2,
                            p: 0.9,
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                            '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.3)' },
                          }}
                        >
                          <Atom size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="ml"
                      type="number"
                      size="small"
                      fullWidth
                      value={volB}
                      onChange={(e) => setVolB(parseFloat(e.target.value) || 0)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Nồng độ M"
                      type="number"
                      size="small"
                      fullWidth
                      value={concB}
                      onChange={(e) => setConcB(parseFloat(e.target.value) || 0)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Chất chỉ thị pH</InputLabel>
                  <Select value={indicator} label="Chất chỉ thị pH" onChange={(e) => setIndicator(e.target.value)}>
                    <MenuItem value="none">Không sử dụng chất chỉ thị</MenuItem>
                    <MenuItem value="litmus">Quỳ tím (Litmus)</MenuItem>
                    <MenuItem value="phenolphthalein">Phenolphthalein</MenuItem>
                    <MenuItem value="universal">Chỉ thị vạn năng (Universal)</MenuItem>
                  </Select>
                </FormControl>

                <Box mb={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">Nhiệt độ phản ứng:</Typography>
                    <Typography variant="caption" fontWeight="bold" color="amber">{temp} °C</Typography>
                  </Box>
                  <Slider value={temp} min={20} max={100} onChange={(_, val) => setTemp(val as number)} size="small" />
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  onClick={() => runSimulation()}
                  startIcon={isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
                  sx={{
                    background: 'linear-gradient(45deg, #0284c7, #2563eb)',
                    fontWeight: 'bold',
                    py: 1.2,
                    textTransform: 'none',
                    fontSize: { xs: '14px', sm: '15px' },
                    borderRadius: 2,
                  }}
                >
                  {isLoading ? 'ChemAIBuddy đang xử lý...' : 'Chạy Mô Phỏng THPT'}
                </Button>
              </Paper>
            </Grid>

            {/* RIGHT BEAKER VISUALIZER & OUTPUT PANEL */}
            <Grid item xs={12} lg={7}>
              {/* BEAKER VISUALIZER */}
              <Paper sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Box position="absolute" top={12} left={16}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">
                    🧪 Cốc Thí nghiệm 250ml
                  </Typography>
                </Box>

                <Box position="absolute" top={12} right={16} bgcolor="#1e293b" px={1.2} py={0.4} borderRadius={5} border="1px solid rgba(255,255,255,0.1)">
                  <Typography variant="caption" color="text.secondary">pH: </Typography>
                  <Typography variant="caption" fontWeight="bold" color="cyan" fontFamily="monospace">
                    {result?.phEstimate || "---"}
                  </Typography>
                </Box>

                {/* BEAKER CANVAS CONTAINER */}
                <Box className="relative w-36 sm:w-40 h-48 sm:h-56 border-4 border-t-0 border-slate-400 rounded-b-3xl bg-slate-900/60 flex flex-col justify-end p-1 overflow-hidden shadow-2xl mt-8">
                  {/* Graduated Scale */}
                  <div className="absolute top-2 left-1 bottom-2 w-6 border-r border-slate-500/50 flex flex-col justify-between text-[8px] sm:text-[9px] text-slate-400 font-mono select-none pointer-events-none z-30">
                    <span>250ml</span>
                    <span>200ml</span>
                    <span>150ml</span>
                    <span>100ml</span>
                    <span>50ml</span>
                  </div>

                  {/* Silver Mirror Coating */}
                  {result?.isSilverMirror && (
                    <div className="absolute inset-0 pointer-events-none rounded-b-3xl transition-all duration-1000 bg-gradient-to-r from-slate-200/50 via-white/90 to-slate-300/50 border-2 border-slate-100 shadow-[inset_0_0_20px_rgba(255,255,255,0.9)] opacity-100 z-20" />
                  )}

                  {/* Fume Layer */}
                  <div className="absolute -top-12 left-0 right-0 h-16 pointer-events-none z-40 overflow-visible flex justify-center">
                    {fumes.map(f => (
                      <div
                        key={f.id}
                        className="fume-particle"
                        style={{
                          width: `${f.size}px`,
                          height: `${f.size}px`,
                          backgroundColor: f.color,
                          left: `${f.left}%`,
                          animationDelay: `${f.delay}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Solid Rod */}
                  {(result?.hasSolidRod || result?.isDissolving || ["fe", "zn", "cu", "al", "mg"].includes(subA.toLowerCase())) && (
                    <div
                      className={`absolute top-6 left-1/2 -translate-x-1/2 w-3.5 rounded-t-sm shadow-md z-15 border border-slate-500 ${result?.isDissolving ? 'dissolve-rod' : 'h-36'}`}
                      style={{ backgroundColor: result?.solidRodColor || (subA.toLowerCase() === "cu" ? '#b45309' : (subA.toLowerCase() === "zn" ? '#94a3b8' : '#b91c1c')) }}
                    />
                  )}

                  {/* Main Liquid */}
                  <div
                    className="w-full rounded-b-2xl transition-all duration-1000 relative overflow-hidden flex flex-col justify-between"
                    style={{
                      height: `${liquidHeightPct}%`,
                      backgroundColor: result?.liquidColor || (indicator === 'phenolphthalein' && phVal > 8 ? 'rgba(236, 72, 153, 0.75)' : 'rgba(59, 130, 246, 0.3)')
                    }}
                  >
                    {/* Sodium Surface Spark */}
                    {(result?.surfaceSpark || subA.toLowerCase() === 'na' || subB.toLowerCase() === 'na') && (
                      <div className="absolute top-0 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-slate-300 via-amber-300 to-amber-500 border-2 border-yellow-200 skitter-effect spark-effect z-35 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white blur-[1px]" />
                      </div>
                    )}

                    {/* Immiscible Upper Oil Layer */}
                    {result?.isImmiscible && (
                      <div className="w-full h-1/3 transition-all duration-1000 border-b border-white/20" style={{ backgroundColor: result.upperLiquidColor || 'rgba(254, 240, 138, 0.6)' }} />
                    )}

                    {/* Precipitate */}
                    {result?.precipitate && (
                      <div
                        className="w-full precipitate-effect rounded-b-2xl z-20"
                        style={{ height: `${result.precipitateHeightPct || 15}%`, backgroundColor: result.precipitateColor || '#ffffff' }}
                      />
                    )}

                    {/* Bubbles */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                      {bubbles.map(b => (
                        <div
                          key={b.id}
                          className="bubble"
                          style={{
                            width: `${b.size}px`,
                            height: `${b.size}px`,
                            left: `${b.left}%`,
                            animationDelay: `${b.delay}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Box>

                {/* Heating Flame */}
                {temp > 40 && (
                  <div className="flex flex-col items-center -mt-1 z-30">
                    <div className="w-5 h-7 sm:w-6 sm:h-8 bg-gradient-to-t from-red-600 via-amber-500 to-yellow-200 rounded-full flame-effect blur-[1px]" />
                    <div className="w-10 sm:w-12 h-2 bg-slate-600 rounded-full" />
                  </div>
                )}

                <Typography variant="caption" fontWeight="bold" color="cyan" mt={1.5} align="center" sx={{ fontSize: { xs: '11px', sm: '12px' } }}>
                  {statusText}
                </Typography>

                {/* Phenomenon Badges */}
                <Box display="flex" flexWrap="wrap" gap={0.8} justifyContent="center" mt={1}>
                  {result?.isSilverMirror && <Chip label="✨ Tráng bạc" size="small" color="secondary" sx={{ height: 22, fontSize: 11 }} />}
                  {result?.hasFume && <Chip label="💨 Khí bốc lên" size="small" color="warning" sx={{ height: 22, fontSize: 11 }} />}
                  {result?.isDissolving && <Chip label="🔻 Tan dần" size="small" color="warning" sx={{ height: 22, fontSize: 11 }} />}
                  {result?.isImmiscible && <Chip label="🛢️ 2 lớp dầu" size="small" color="info" sx={{ height: 22, fontSize: 11 }} />}
                  {result?.surfaceSpark && <Chip label="⚡ Na lóe sáng" size="small" color="error" sx={{ height: 22, fontSize: 11 }} />}
                  {result?.precipitate && <Chip label="❄️ Kết tủa" size="small" color="default" sx={{ height: 22, fontSize: 11 }} />}
                  {result?.bubbles && <Chip label="🫧 Sủi bọt khí" size="small" color="primary" sx={{ height: 22, fontSize: 11 }} />}
                </Box>
              </Paper>

              {/* ANALYSIS RESULT CARD */}
              <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, mt: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="subtitle2" fontWeight="bold" color="cyan" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                    📊 Kết quả Phân tích Định lượng AI
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Volume2 size={14} />}
                    onClick={speakPhenomenon}
                    sx={{ textTransform: 'none', color: '#38bdf8', borderColor: 'rgba(255,255,255,0.15)', fontSize: '11px', py: 0.3 }}
                  >
                    Đọc AI
                  </Button>
                </Box>

                <Stack spacing={1.2}>
                  <Box p={1.2} bgcolor="#1e293b" borderRadius={1.5} border="1px solid rgba(255,255,255,0.05)" sx={{ overflowX: 'auto' }}>
                    <Typography variant="caption" color="text.secondary" display="block">Phương trình hóa học cân bằng:</Typography>
                    <Typography variant="body2" fontFamily="monospace" fontWeight="bold" color="cyan" sx={{ wordBreak: 'break-word', fontSize: { xs: '13px', sm: '14px' } }}>
                      {result?.eq || "Chưa chọn phản ứng"}
                    </Typography>
                  </Box>

                  <Box p={1.2} bgcolor="#1e293b" borderRadius={1.5} border="1px solid rgba(255,255,255,0.05)">
                    <Typography variant="caption" color="text.secondary" display="block">Hiện tượng nhận biết:</Typography>
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                      {result?.phenomenon || "Hãy bấm nút 'Chạy Mô Phỏng THPT' để xem kết quả."}
                    </Typography>
                  </Box>

                  <Box p={1.2} bgcolor="#1e293b" borderRadius={1.5} border="1px solid rgba(255,255,255,0.05)" sx={{ overflowX: 'auto' }}>
                    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Phân tích Tỉ lệ & Nồng độ (CM):</Typography>
                    <div dangerouslySetInnerHTML={{ __html: result?.stoichiometry || "Chưa có dữ liệu tính toán." }} />
                  </Box>

                  {/* TITRATION CHART */}
                  <Box p={1.2} bgcolor="#1e293b" borderRadius={1.5} border="1px solid rgba(255,255,255,0.05)">
                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                      📉 Đồ thị Chuẩn độ pH:
                    </Typography>
                    <Box sx={{ height: { xs: 135, sm: 155 }, width: '100%' }}>
                      <Line data={chartData} options={chartOptions} />
                    </Box>
                  </Box>

                  <Box p={1.2} bgcolor="#1e293b" borderRadius={1.5} border="1px solid rgba(255,255,255,0.05)" display="flex" justifyContent="space-between" alignItems="center">
                    <Box sx={{ minWidth: 0, pr: 1 }}>
                      <Typography variant="caption" color="text.secondary" display="block">Mức độ an toàn:</Typography>
                      <Typography variant="body2" fontWeight="bold" color="emerald.main" sx={{ fontSize: { xs: '12px', sm: '13px' } }}>
                        {result?.hazard || "An toàn"}
                      </Typography>
                    </Box>
                    <ShieldCheck color="#10b981" size={22} style={{ flexShrink: 0 }} />
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      )}

      {/* PERIODIC TABLE & CHEMICAL COMPOUNDS M-CHECKER MODAL */}
      <Dialog
        open={openPeriodic}
        onClose={() => setOpenPeriodic(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0d1527',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 3.5,
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
            p: { xs: 2, sm: 2.5 }
          }
        }}
      >
        {/* Title Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center" pb={1.5} mb={2} borderBottom="1px solid rgba(255,255,255,0.08)">
          <Box display="flex" alignItems="center" gap={1.2}>
            <Table size={22} color="#22d3ee" />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#22d3ee', fontSize: { xs: '15px', sm: '17px' } }}>
              Khay Chọn 118 Nguyên Tố & Tủ Hóa Chất Phản Ứng
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenPeriodic(false)} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
            <X size={20} />
          </IconButton>
        </Box>

        {/* Slot Target & Search Filter Bar */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1.5}
          mb={2}
        >
          {/* Dual Tab Buttons */}
          <Stack direction="row" spacing={1}>
            <Button
              onClick={() => setPeriodicTab('elements')}
              startIcon={<Atom size={16} />}
              sx={{
                bgcolor: periodicTab === 'elements' ? '#0891b2' : 'transparent',
                color: periodicTab === 'elements' ? '#ffffff' : '#94a3b8',
                fontWeight: 'bold',
                fontSize: '12px',
                px: 2,
                py: 0.6,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: periodicTab === 'elements' ? '0 4px 14px rgba(8, 145, 178, 0.4)' : 'none',
                '&:hover': {
                  bgcolor: periodicTab === 'elements' ? '#0e7490' : 'rgba(255,255,255,0.05)',
                  color: '#ffffff'
                }
              }}
            >
              118 Nguyên Tố BTH ({ELEMENTS_DATA.length})
            </Button>

            <Button
              onClick={() => setPeriodicTab('compounds')}
              startIcon={<Pipette size={16} />}
              sx={{
                bgcolor: periodicTab === 'compounds' ? '#0891b2' : 'transparent',
                color: periodicTab === 'compounds' ? '#ffffff' : '#94a3b8',
                fontWeight: 'bold',
                fontSize: '12px',
                px: 2,
                py: 0.6,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: periodicTab === 'compounds' ? '0 4px 14px rgba(8, 145, 178, 0.4)' : 'none',
                '&:hover': {
                  bgcolor: periodicTab === 'compounds' ? '#0e7490' : 'rgba(255,255,255,0.05)',
                  color: '#ffffff'
                }
              }}
            >
              Hợp Chất Phổ Biến ({CHEMICAL_COMPOUNDS_DATA.length})
            </Button>
          </Stack>

          {/* Target Slot Toggle */}
          <Stack direction="row" spacing={0.8} alignItems="center">
            <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '11px' }}>
              Chèn vào:
            </Typography>
            <Chip
              label="🧪 Chất A"
              size="small"
              onClick={() => setTargetSlot('A')}
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
                bgcolor: targetSlot === 'A' ? '#0284c7' : 'rgba(255,255,255,0.06)',
                color: targetSlot === 'A' ? '#fff' : '#94a3b8',
                border: targetSlot === 'A' ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
              }}
            />
            <Chip
              label="⚗️ Chất B"
              size="small"
              onClick={() => setTargetSlot('B')}
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
                bgcolor: targetSlot === 'B' ? '#7c3aed' : 'rgba(255,255,255,0.06)',
                color: targetSlot === 'B' ? '#fff' : '#94a3b8',
                border: targetSlot === 'B' ? '1.5px solid #c084fc' : '1px solid rgba(255,255,255,0.1)',
              }}
            />
          </Stack>
        </Box>

        {/* Search Input Bar */}
        <Box mb={2}>
          <input
            type="text"
            placeholder="🔍 Tìm nhanh nguyên tố (Ký hiệu H, Fe, Na / Tên Sắt, Đồng, Nhôm / Z=1..118)..."
            value={elementSearchQuery}
            onChange={(e) => setElementSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#090d16',
              color: '#fff',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </Box>

        {/* Tab 1: All 118 Elements Grid */}
        {periodicTab === 'elements' && (
          <Grid container spacing={1} sx={{ maxHeight: 380, overflowY: 'auto', pr: 0.5 }} className="custom-scrollbar">
            {ELEMENTS_DATA.filter((el) => {
              if (!elementSearchQuery.trim()) return true;
              const q = elementSearchQuery.toLowerCase().trim();
              return (
                el.symbol.toLowerCase().includes(q) ||
                el.nameVi.toLowerCase().includes(q) ||
                el.nameEn.toLowerCase().includes(q) ||
                el.atomicNumber.toString() === q
              );
            }).map((el) => {
              const isMetal = el.mainCategory === 'metal';
              const color = isMetal ? '#38bdf8' : el.mainCategory === 'nonmetal' ? '#34d399' : '#c084fc';
              return (
                <Grid item xs={3} sm={2.4} md={1.5} key={el.symbol}>
                  <Paper
                    onClick={() => {
                      if (targetSlot === 'A') {
                        setSubA(el.symbol);
                      } else {
                        setSubB(el.symbol);
                      }
                      setOpenPeriodic(false);
                    }}
                    sx={{
                      p: 0.8,
                      textAlign: 'center',
                      bgcolor: '#0f172a',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        borderColor: color,
                        bgcolor: 'rgba(2, 132, 199, 0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${color}40`,
                      },
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '9px', display: 'block' }}>
                      Z = {el.atomicNumber}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color, fontSize: '14px', lineHeight: 1.1 }}>
                      {el.symbol}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '9.5px', color: '#cbd5e1', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {el.nameVi}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '8.5px', display: 'block' }}>
                      M = {el.atomicMass.toFixed(1)}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Tab 2: Common Chemical Compounds Grid */}
        {periodicTab === 'compounds' && (
          <Grid container spacing={1.2} sx={{ maxHeight: 380, overflowY: 'auto', pr: 0.5 }} className="custom-scrollbar">
            {CHEMICAL_COMPOUNDS_DATA.filter((item) => {
              if (!elementSearchQuery.trim()) return true;
              const q = elementSearchQuery.toLowerCase().trim();
              return item.formula.toLowerCase().includes(q) || (item.nameVi && item.nameVi.toLowerCase().includes(q));
            }).map((item) => (
              <Grid item xs={4} sm={3} md={2} key={item.formula}>
                <Paper
                  onClick={() => {
                    if (targetSlot === 'A') {
                      setSubA(item.formula);
                    } else {
                      setSubB(item.formula);
                    }
                    setOpenPeriodic(false);
                  }}
                  sx={{
                    p: 1.2,
                    textAlign: 'center',
                    bgcolor: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: item.color,
                      bgcolor: 'rgba(2, 132, 199, 0.18)',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 18px rgba(2, 132, 199, 0.25)`,
                    },
                  }}
                >
                  <Typography variant="body1" fontWeight="bold" sx={{ color: item.color, fontSize: '14px', lineHeight: 1.2 }}>
                    {item.displayFormula || item.formula}
                  </Typography>
                  {item.nameVi && (
                    <Typography variant="caption" sx={{ fontSize: '10px', color: '#cbd5e1', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.nameVi}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '9.5px', display: 'block', mt: 0.2 }}>
                    M = {item.mVal} g/mol
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Dialog>
    </Box>
  );
}
