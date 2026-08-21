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
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack, TextField,
  Typography
} from '@mui/material';
import { CategoryScale, Chart as ChartJS, Tooltip as ChartTooltip, Filler, Legend, LinearScale, LineElement, PointElement, Title } from 'chart.js';
import { FlaskConical, Grid2X2, Play, RefreshCw, ShieldCheck, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

interface PresetReaction {
  id: number;
  grade: "10";
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

const PRESETS: PresetReaction[] = [
  { id: 1, grade: "10", name: "1. NaOH + HCl (+ Quỳ tím - Trung hòa)", subA: "NaOH", volA: 100, concA: 1.0, subB: "HCl", volB: 100, concB: 1.0, temp: 25, indicator: "litmus" },
  { id: 2, grade: "10", name: "2. Na + H₂O (Kim loại kiềm chạy nhảy + Lóe sáng + Hồng)", subA: "Na", volA: 20, concA: 1.0, subB: "H2O", volB: 100, concB: 1.0, temp: 25, indicator: "phenolphthalein" },
  { id: 3, grade: "10", name: "3. Zn + H₂SO₄ loãng (Thanh Zn tan dần + Sủi bọt H₂)", subA: "Zn", volA: 10, concA: 1.0, subB: "H2SO4", volB: 60, concB: 1.0, temp: 25, indicator: "none" },
  { id: 4, grade: "10", name: "4. Fe + CuSO₄ (Phản ứng thế kim loại → Màu đỏ gạch)", subA: "Fe", volA: 10, concA: 1.0, subB: "CuSO4", volB: 80, concB: 0.5, temp: 25, indicator: "none" },
  { id: 5, grade: "10", name: "5. KMnO₄ + HCl đặc (Điều chế khí Cl₂ Vàng Lục)", subA: "KMnO4", volA: 10, concA: 1.0, subB: "HCl", volB: 50, concB: 2.0, temp: 60, indicator: "none" },
  { id: 6, grade: "10", name: "6. KI + Cl₂ (Halogen đẩy nhau → Dung dịch sẫm màu)", subA: "KI", volA: 50, concA: 0.5, subB: "Cl2", volB: 50, concB: 0.5, temp: 25, indicator: "none" },
  { id: 7, grade: "10", name: "7. AgNO₃ + NaCl (Kết tủa trắng AgCl lắng)", subA: "AgNO3", volA: 40, concA: 0.5, subB: "NaCl", volB: 40, concB: 0.5, temp: 25, indicator: "none" },
  { id: 8, grade: "10", name: "8. BaCl₂ + H₂SO₄ (Kết tủa trắng BaSO₄ không tan)", subA: "BaCl2", volA: 50, concA: 0.5, subB: "H2SO4", volB: 50, concB: 0.5, temp: 25, indicator: "none" },
];

interface SimulationResult {
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

export default function VirtualLab() {
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
    const needsBubbles = data.bubbles || lowerA === "na" || lowerB === "na" || ["zn", "fe", "mg", "al"].includes(lowerA);
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
    const needsFumes = data.hasFume || lowerA.includes("hno3") || lowerB.includes("hno3") || lowerA.includes("kmno4");
    if (needsFumes) {
      const fColor = data.fumeColor || (lowerA.includes("hno3") || lowerB.includes("hno3") ? "rgba(180, 83, 9, 0.8)" : "rgba(255, 255, 255, 0.7)");
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
            <Button
              variant="outlined"
              size="small"
              startIcon={<Grid2X2 size={14} />}
              onClick={() => setOpenPeriodic(true)}
              sx={{
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#38bdf8',
                textTransform: 'none',
                fontSize: { xs: '12px', sm: '13px' },
                alignSelf: { xs: 'stretch', sm: 'auto' }
              }}
            >
              Bảng tuần hoàn / M
            </Button>
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {/* LEFT INPUT PANEL */}
            <Grid item xs={12} lg={5}>
              <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="subtitle2" fontWeight="bold" color="cyan" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                    📖 Mẫu Thí Nghiệm SGK Lớp 10
                  </Typography>
                  <Chip label="Lớp 10" color="primary" size="small" sx={{ height: 20, fontSize: 11 }} />
                </Box>

                {/* Scrollable Presets */}
                <Box sx={{ maxHeight: 180, overflowY: 'auto', pr: 0.5, mb: 2 }} className="custom-scrollbar">
                  <Stack spacing={0.8}>
                    {filteredPresets.map((p) => (
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
                          py: 0.6,
                          px: 1.2,
                          textAlign: 'left',
                          '&:hover': { bgcolor: 'rgba(30, 41, 59, 1)', borderColor: '#38bdf8' }
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 6 }}>
                          {p.name}
                        </span>
                        <Chip label={`Lớp ${p.grade}`} size="small" color="primary" sx={{ height: 18, fontSize: 10, flexShrink: 0 }} />
                      </Button>
                    ))}
                  </Stack>
                </Box>

                <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={1}>
                  ⚙️ Thông số Thí nghiệm tùy chỉnh:
                </Typography>

                {/* Substance A */}
                <Grid container spacing={1} mb={1.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Chất A"
                      size="small"
                      fullWidth
                      value={subA}
                      onChange={(e) => setSubA(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
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
                    <TextField
                      label="Chất B"
                      size="small"
                      fullWidth
                      value={subB}
                      onChange={(e) => setSubB(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
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
                  {(result?.hasSolidRod || result?.isDissolving || subA.toLowerCase() === "fe") && (
                    <div
                      className={`absolute top-6 left-1/2 -translate-x-1/2 w-3.5 rounded-t-sm shadow-md z-15 border border-slate-500 ${result?.isDissolving ? 'dissolve-rod bg-slate-400' : 'h-36'}`}
                      style={{ backgroundColor: result?.solidRodColor || '#b91c1c' }}
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

      {/* PERIODIC TABLE MODAL */}
      <Dialog
        open={openPeriodic}
        onClose={() => setOpenPeriodic(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#0f172a',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            m: { xs: 1.5, sm: 2 }
          }
        }}
      >
        <DialogTitle sx={{ color: 'cyan', fontSize: { xs: '15px', sm: '18px' }, p: { xs: 1.5, sm: 2 } }}>
          Bảng Tuần Hoàn & Tra Cứu Nguyên Tố
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Typography variant="body2" color="text.secondary" mb={1.5} sx={{ fontSize: { xs: '12px', sm: '13px' } }}>
            Nhấp vào nguyên tố để chọn nhanh làm Chất A:
          </Typography>
          <Grid container spacing={0.8}>
            {["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Fe", "Cu", "Zn", "Ag", "Au"].map((el) => (
              <Grid item xs={4} sm={3} md={2} key={el}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => { setSubA(el); setOpenPeriodic(false); }}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.12)',
                    color: '#38bdf8',
                    fontWeight: 'bold',
                    py: 0.8,
                    fontSize: '13px'
                  }}
                >
                  {el}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1, sm: 1.5 } }}>
          <Button onClick={() => setOpenPeriodic(false)} sx={{ color: '#94a3b8' }}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
