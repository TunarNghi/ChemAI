"use client";

import ChemicalBondViewer3D, {
  MOLECULES,
  MoleculeData,
} from "@/components/ChemicalBondViewer3D";
import { callGeminiAPI, supabase } from "@/lib/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
} from "chart.js";
import {
  Activity,
  Box as Box3DIcon,
  FileSearch,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

interface SafetyItem {
  name: string;
  formula: string;
  hazard: string;
  ir: string;
  ms: string;
  moleculeKey?: string;
}

const INITIAL_SAFETY_DATA: SafetyItem[] = [
  {
    name: "Sulfuric Acid (H₂SO₄)",
    formula: "H₂SO₄",
    hazard: "Ăn mòn cực mạnh, tỏa nhiệt dữ dội khi pha loãng, gây bỏng sâu",
    ir: "1220 (S=O), 1050 (S-O), 912, 580",
    ms: "98 (M⁺), 81 (HSO₃⁺), 80 (SO₃⁺)",
    moleculeKey: "H2SO4",
  },
  {
    name: "Nitric Acid (HNO₃)",
    formula: "HNO₃",
    hazard: "Axit oxi hóa mạnh, làm ố vàng da, hơi axit độc hại cho đường hô hấp",
    ir: "1326 (NO₂), 1303, 879",
    ms: "63 (M⁺), 46 (NO₂⁺), 30 (NO⁺)",
    moleculeKey: "HNO3",
  },
  {
    name: "Hydrochloric Acid (HCl)",
    formula: "HCl",
    hazard: "Dung dịch ăn mòn, khí HCl bốc hơi gây kích ứng mắt và niêm mạc",
    ir: "2886 (H-Cl stretch)",
    ms: "36 (M⁺ ³⁵Cl), 38 (M⁺ ³⁷Cl)",
    moleculeKey: "HCl",
  },
  {
    name: "Sodium Hydroxide (NaOH)",
    formula: "NaOH",
    hazard: "Bazo mạnh (xút ăn da), gây bỏng nghiêm trọng và hỏng giác mạc",
    ir: "3630 (O-H tự do), 1640",
    ms: "Không áp dụng (hợp chất ion không bay hơi)",
    moleculeKey: "NaOH",
  },
  {
    name: "Chlorine Gas (Cl₂)",
    formula: "Cl₂",
    hazard: "Khí độc màu vàng lục gây ngạt, tổn thương phổi và hệ hô hấp",
    ir: "Không hấp thụ IR (phân tử đồng hạt nhân)",
    ms: "70 (M⁺ ³⁵Cl₂), 72 (³⁵Cl³⁷Cl), 74 (³⁷Cl₂)",
    moleculeKey: "Cl2",
  },
  {
    name: "Ammonia (NH₃)",
    formula: "NH₃",
    hazard: "Khí độc có mùi khai hắc, gây kích ứng mạnh mắt, mũi và bỏng hô hấp",
    ir: "3444, 3337 (N-H stretch), 1627 (N-H bend), 950",
    ms: "17 (M⁺), 16 (NH₂⁺), 15 (NH⁺)",
    moleculeKey: "NH3",
  },
  {
    name: "Sulfur Dioxide (SO₂)",
    formula: "SO₂",
    hazard: "Khí độc hắc, gây mưa axit, kích ứng niêm mạc và đường hô hấp",
    ir: "1361 (S=O bất đối xứng), 1151 (S=O đối xứng), 519",
    ms: "64 (M⁺), 48 (SO⁺), 32 (S⁺)",
    moleculeKey: "SO2",
  },
  {
    name: "Carbon Monoxide (CO)",
    formula: "CO",
    hazard: "Khí độc không màu không mùi, liên kết mạnh với Hemoglobin gây ngạt tử vong",
    ir: "2143 (C≡O stretch)",
    ms: "28 (M⁺), 16 (O⁺), 12 (C⁺)",
    moleculeKey: "CO",
  },
  {
    name: "Acetic Acid (CH₃COOH)",
    formula: "CH₃COOH",
    hazard: "Axit hữu cơ gây kích ứng niêm mạc, mùi chua nồng",
    ir: "3000-2500 (O-H rộng liên kết H), 1715 (C=O carbonyl), 1280 (C-O)",
    ms: "60 (M⁺), 45 (COOH⁺), 43 (CH₃CO⁺)",
    moleculeKey: "CH3COOH",
  },
  {
    name: "Ethanol (C₂H₅OH)",
    formula: "C₂H₅OH",
    hazard: "Dung môi dễ cháy, ức chế thần kinh trung ương ở nồng độ cao",
    ir: "3350 (O-H rộng liên kết hydro), 2970 (C-H stretch), 1050 (C-O)",
    ms: "46 (M⁺), 45 (M-1), 31 (CH₂OH⁺ - Đỉnh cơ sở)",
    moleculeKey: "C2H5OH",
  },
];

interface IRSpectrumPeak {
  wavenumber: number;
  transmittance: number;
  assignment: string;
}

export default function SafetyTab() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<SafetyItem[]>(INITIAL_SAFETY_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modal Dialog State for 3D Molecule Bond Viewer
  const [open3DDialog, setOpen3DDialog] = useState<boolean>(false);
  const [activeMoleculeKey, setActiveMoleculeKey] = useState<string>("H2SO4");
  const [custom3DData, setCustom3DData] = useState<MoleculeData | null>(null);

  // Modal Dialog State for IR Spectrum Analyzer
  const [openIRDialog, setOpenIRDialog] = useState<boolean>(false);
  const [activeIRChemical, setActiveIRChemical] = useState<SafetyItem | null>(null);
  const [irExplanation, setIrExplanation] = useState<string>("");
  const [irPeaks, setIrPeaks] = useState<IRSpectrumPeak[]>([]);
  const [isIRAnalyzing, setIsIRAnalyzing] = useState<boolean>(false);

  const mapFormulaToKey = (formula: string): string | null => {
    const clean = formula
      .replace(/[₂₃₄₅₆₇₈₉]/g, (match) => "23456789"["₂₃₄₅₆₇₈₉".indexOf(match)])
      .replace(/[\s\(\)]/g, "");
    if (MOLECULES[clean]) return clean;
    return null;
  };

  const handleSelectChemical = async (item: SafetyItem) => {
    const key = item.moleculeKey || mapFormulaToKey(item.formula);

    if (key && MOLECULES[key]) {
      setActiveMoleculeKey(key);
      setCustom3DData(null);
      setOpen3DDialog(true);
      return;
    }

    // Check Supabase DB cache for saved 3D structure
    const cacheKey = `3d_structure_${item.formula.replace(/[^a-zA-Z0-9]/g, "")}`;
    const cachedLocal = localStorage.getItem(cacheKey);

    if (cachedLocal) {
      try {
        setCustom3DData(JSON.parse(cachedLocal));
        setOpen3DDialog(true);
        return;
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    try {
      const { data: dbData } = await supabase
        .from("experiments")
        .select("result_json")
        .eq("cache_key", cacheKey)
        .maybeSingle();
      if (dbData && dbData.result_json) {
        localStorage.setItem(cacheKey, JSON.stringify(dbData.result_json));
        setCustom3DData(dbData.result_json);
        setOpen3DDialog(true);
        return;
      }
    } catch (e) {
      console.warn("Supabase 3D cache fetch skip:", e);
    }

    // Fallback AI generated 3D structure
    fetchAI3DStructure(item.name, item.formula, cacheKey);
  };

  const fetchAI3DStructure = async (
    name: string,
    formula: string,
    cacheKey: string,
  ) => {
    setIsLoading(true);
    const prompt = `Phân tích cấu trúc 3D liên kết hóa học cho chất: "${name} (${formula})". Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):
{
  "name": "${name}",
  "formula": "${formula}",
  "bondType": "Loại liên kết hóa học (Cộng hóa trị/Ion/Kim loại)",
  "description": "Giải thích ngắn góc liên kết & trạng thái lai hóa",
  "atoms": [
    {"position": [0, 0, 0], "color": "#ef4444", "radius": 0.6, "label": "Tên nguyên tử 1"},
    {"position": [1.2, 0, 0], "color": "#f8fafc", "radius": 0.35, "label": "Tên nguyên tử 2"}
  ],
  "bonds": [
    {"start": [0, 0, 0], "end": [1.2, 0, 0], "color": "#94a3b8", "radius": 0.08}
  ]
}`;

    try {
      const response = await callGeminiAPI(prompt);
      const match = response.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed: MoleculeData = JSON.parse(match[0]);
        localStorage.setItem(cacheKey, JSON.stringify(parsed));
        supabase
          .from("experiments")
          .upsert({ cache_key: cacheKey, result_json: parsed })
          .then();

        setCustom3DData(parsed);
        setOpen3DDialog(true);
      }
    } catch (e) {
      console.error("AI 3D structure error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenIR = async (item: SafetyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIRChemical(item);
    setOpenIRDialog(true);
    setIsIRAnalyzing(true);

    const prompt = `Phân tích quang phổ hồng ngoại (FTIR) và khối phổ (MS) chuẩn chương trình GDPT 2018 cho chất: "${item.name} (${item.formula})".
Dữ liệu gợi ý: IR = ${item.ir}, MS = ${item.ms}.

Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):
{
  "peaks": [
    {"wavenumber": 3350, "transmittance": 18, "assignment": "Dao động hóa trị liên kết O-H (vùng 3200-3600 cm⁻¹)"},
    {"wavenumber": 2970, "transmittance": 32, "assignment": "Dao động dãn C-H nhóm ankyl (vùng 2850-2980 cm⁻¹)"},
    {"wavenumber": 1050, "transmittance": 25, "assignment": "Dao động C-O ancol bậc 1 (vùng 1000-1100 cm⁻¹)"}
  ],
  "explanation": "Giải thích chi tiết nhận diện nhóm chức, ứng dụng biện luận công thức cấu tạo trong các bài tập Hóa học THPT."
}`;

    try {
      const res = await callGeminiAPI(prompt);
      const match = res.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        setIrPeaks(parsed.peaks || []);
        setIrExplanation(parsed.explanation || "");
      }
    } catch (err) {
      console.warn("IR Analysis error:", err);
      setIrExplanation(`Phổ hồng ngoại IR của ${item.name} có các dải hấp thụ chính: ${item.ir}. Khối phổ MS với các mảnh m/z: ${item.ms}.`);
      setIrPeaks([
        { wavenumber: 3350, transmittance: 20, assignment: "Đỉnh hấp thụ đặc trưng nhóm phân cực" },
        { wavenumber: 1710, transmittance: 15, assignment: "Đỉnh hấp thụ liên kết mạnh" },
        { wavenumber: 1050, transmittance: 30, assignment: "Vùng dấu vân tay phân tử (Fingerprint)" }
      ]);
    } finally {
      setIsIRAnalyzing(false);
    }
  };

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setData(INITIAL_SAFETY_DATA);
      return;
    }

    const filtered = INITIAL_SAFETY_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        item.formula.toLowerCase().includes(trimmed.toLowerCase()),
    );

    if (filtered.length > 0) {
      setData(filtered);
      handleSelectChemical(filtered[0]);
      return;
    }

    // Call Gemini AI for unknown chemical
    setIsLoading(true);
    const prompt = `Tra cứu thông tin an toàn hóa chất & dữ liệu phổ học cho: "${trimmed}". Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):
{
  "name": "Tên hóa chất tiếng Việt & IUPAC",
  "formula": "Công thức hóa học",
  "hazard": "Mô tả mức độ độc hại, nguy hiểm ăn mòn/cháy nổ và quy tắc bảo hộ",
  "ir": "Số sóng hấp thụ đặc trưng cm-1",
  "ms": "Giá trị m/z các mảnh ion chính"
}`;

    try {
      const response = await callGeminiAPI(prompt);
      const match = response.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed: SafetyItem = JSON.parse(match[0]);
        setData([parsed, ...INITIAL_SAFETY_DATA]);
        handleSelectChemical(parsed);
      }
    } catch (e) {
      console.error("Safety AI Search error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate synthetic FTIR curve data (4000 to 400 cm⁻¹)
  const generateIRChartData = () => {
    const wavenumbers = [4000, 3600, 3400, 3200, 3000, 2800, 2400, 2000, 1750, 1650, 1500, 1350, 1200, 1050, 900, 750, 600, 400];
    const transmittanceValues = wavenumbers.map(wn => {
      // Find if any peak is close
      const matchPeak = irPeaks.find(p => Math.abs(p.wavenumber - wn) < 180);
      if (matchPeak) {
        return matchPeak.transmittance;
      }
      return 85 + Math.sin(wn / 200) * 8;
    });

    return {
      labels: wavenumbers.map(w => `${w}`),
      datasets: [
        {
          label: "Độ truyền qua Transmittance (%)",
          data: transmittanceValues,
          borderColor: "#ec4899",
          backgroundColor: "rgba(236, 72, 153, 0.12)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: "#f43f5e",
        }
      ]
    };
  };

  const irChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        reverse: true, // Standard IR spectrum x-axis is inverted (4000 -> 400)
        grid: { color: "rgba(255, 255, 255, 0.08)" },
        ticks: { color: "#94a3b8", font: { size: 10 } },
        title: { display: true, text: "Số sóng Wave Number (cm⁻¹)", color: "#38bdf8" }
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "rgba(255, 255, 255, 0.08)" },
        ticks: { color: "#94a3b8", font: { size: 10 } },
        title: { display: true, text: "Độ truyền qua T (%)", color: "#ec4899" }
      }
    },
    plugins: {
      legend: { labels: { color: "#e2e8f0", font: { size: 11 } } }
    }
  };

  return (
    <Box>
      {/* 3D MOLECULE BOND VIEWER COMPONENT (Preserved 100% Intact) */}
      <ChemicalBondViewer3D />

      {/* SAFETY & SPECTROSCOPY DATABASE CARD */}
      <Card
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
          mt: { xs: 2, sm: 3 },
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <ShieldAlert color="#f59e0b" size={22} />
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
                An Toàn Hóa Chất & Tra Cứu Phổ IR / MS
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={1.5} mb={2.5}>
            <Grid item xs={12} sm={8} md={9}>
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập tên hóa chất hoặc CTHH (vd: H2SO4, HNO3, HCl, NaOH, CH3COOH, C2H5OH...)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Button
                variant="contained"
                fullWidth
                disabled={isLoading}
                onClick={handleSearch}
                startIcon={
                  isLoading ? (
                    <RefreshCw className="animate-spin" size={16} />
                  ) : (
                    <Search size={16} />
                  )
                }
                sx={{
                  background: "linear-gradient(45deg, #d97706, #b45309)",
                  textTransform: "none",
                  fontWeight: "bold",
                  height: 40,
                  fontSize: { xs: '13px', sm: '14px' }
                }}
              >
                {isLoading ? "AI Tra Cứu..." : "Tra Cứu Hóa Chất"}
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1.5}>
            {data.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  onClick={() => handleSelectChemical(item)}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    bgcolor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 2,
                    height: "100%",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#38bdf8",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(56, 189, 248, 0.2)",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={1}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="common.white"
                      sx={{ fontSize: { xs: '13.5px', sm: '14.5px' }, minWidth: 0 }}
                    >
                      {item.name}
                    </Typography>
                    <Stack direction="row" spacing={0.8} alignItems="center" flexShrink={0}>
                      <Chip
                        label={item.formula}
                        size="small"
                        color="primary"
                        sx={{ fontFamily: "monospace", fontWeight: "bold", height: 22, fontSize: 11 }}
                      />
                      <Chip
                        icon={<Box3DIcon size={13} />}
                        label="3D"
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ fontSize: "10.5px", height: "22px" }}
                      />
                    </Stack>
                  </Box>

                  <Typography
                    variant="caption"
                    color="warning.main"
                    display="block"
                    mb={1.2}
                    sx={{ fontSize: { xs: '11.5px', sm: '12px' }, lineHeight: 1.4 }}
                  >
                    ⚠️ {item.hazard}
                  </Typography>

                  <Stack spacing={0.8}>
                    <Box
                      p={1}
                      bgcolor="#1e293b"
                      borderRadius={1}
                      border="1px solid rgba(255,255,255,0.05)"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          📈 Phổ Hồng Ngoại (IR):
                        </Typography>
                        <Typography variant="caption" color="cyan" fontFamily="monospace" sx={{ fontSize: { xs: '11px', sm: '12px' } }}>
                          {item.ir}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Activity size={13} />}
                        onClick={(e) => handleOpenIR(item, e)}
                        sx={{
                          borderColor: 'rgba(236, 72, 153, 0.4)',
                          color: '#f43f5e',
                          textTransform: 'none',
                          fontSize: '11px',
                          py: 0.3,
                          px: 1,
                          flexShrink: 0
                        }}
                      >
                        Xem Phổ IR
                      </Button>
                    </Box>

                    <Box
                      p={1}
                      bgcolor="#1e293b"
                      borderRadius={1}
                      border="1px solid rgba(255,255,255,0.05)"
                    >
                      <Typography variant="caption" color="text.secondary" display="block">
                        🔬 Khối Phổ (MS):
                      </Typography>
                      <Typography variant="caption" color="emerald.main" fontFamily="monospace" sx={{ fontSize: { xs: '11px', sm: '12px' } }}>
                        {item.ms}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* 3D MOLECULE MODAL DIALOG */}
      <Dialog
        open={open3DDialog}
        onClose={() => setOpen3DDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            m: { xs: 1.5, sm: 2 }
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { xs: 1.5, sm: 2 }
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Box3DIcon color="#38bdf8" size={20} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              {custom3DData
                ? custom3DData.name
                : MOLECULES[activeMoleculeKey]?.name || "Mô hình 3D"}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setOpen3DDialog(false)}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <X size={18} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
          <ChemicalBondViewer3D />
        </DialogContent>
      </Dialog>

      {/* INTERACTIVE FTIR / MS SPECTRUM MODAL DIALOG */}
      <Dialog
        open={openIRDialog}
        onClose={() => setOpenIRDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0f172a",
            border: "1px solid rgba(236, 72, 153, 0.3)",
            borderRadius: 3,
            m: { xs: 1.5, sm: 2 }
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { xs: 1.5, sm: 2 },
            borderBottom: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Activity color="#ec4899" size={20} />
            <Typography variant="h6" fontWeight="bold" color="common.white" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Quang Phổ Hồng Ngoại FTIR & Khối Phổ MS: {activeIRChemical?.name} ({activeIRChemical?.formula})
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenIRDialog(false)} size="small" sx={{ color: "text.secondary" }}>
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          {isIRAnalyzing ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={6} gap={2}>
              <RefreshCw className="animate-spin text-pink-400" size={32} />
              <Typography variant="body2" color="text.secondary">
                AI đang giải tích số sóng & cấu trúc liên kết phổ học...
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2.5}>
              {/* FTIR CHART */}
              <Box p={1.5} bgcolor="#1e293b" borderRadius={2} border="1px solid rgba(255,255,255,0.08)">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" fontWeight="bold" color="#ec4899">
                    📈 Đồ thị Đường cong Hấp thụ Phổ Hồng Ngoại FTIR:
                  </Typography>
                  <Chip label="Dải 4000 - 400 cm⁻¹" size="small" sx={{ bgcolor: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', height: 20, fontSize: 10 }} />
                </Box>
                <Box sx={{ height: { xs: 200, sm: 240 }, width: '100%' }}>
                  <Line data={generateIRChartData()} options={irChartOptions} />
                </Box>
              </Box>

              {/* PEAK TABLE */}
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="cyan" mb={1}>
                  🔬 Bảng Nhận Diện Đỉnh Đặc Trưng & Nhóm Chức:
                </Typography>
                <Grid container spacing={1}>
                  {irPeaks.map((peak, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Paper sx={{ p: 1.5, bgcolor: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 1.5 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" fontWeight="bold" color="#ec4899" fontFamily="monospace">
                            ν = {peak.wavenumber} cm⁻¹
                          </Typography>
                          <Chip label={`T = ${peak.transmittance}%`} size="small" sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {peak.assignment}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* AI EXPLANATION */}
              <Paper sx={{ p: 1.5, bgcolor: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 1.5 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  <Sparkles color="#38bdf8" size={16} />
                  <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8">
                    Biện Luận Phổ GDPT 2018 (AI Specialist):
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '13px', lineHeight: 1.6 }}>
                  {irExplanation}
                </Typography>
              </Paper>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: { xs: 1.5, sm: 2 }, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Button onClick={() => setOpenIRDialog(false)} sx={{ color: "#94a3b8" }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
