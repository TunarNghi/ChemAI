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
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Box as Box3DIcon,
  RefreshCw,
  Search,
  ShieldAlert,
  X,
} from "lucide-react";
import { useState } from "react";

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
    ir: "1220, 1050, 912, 580",
    ms: "98, 81, 80",
    moleculeKey: "H2SO4",
  },
  {
    name: "Nitric Acid (HNO₃)",
    formula: "HNO₃",
    hazard:
      "Axit oxi hóa mạnh, làm ố vàng da, hơi axit độc hại cho đường hô hấp",
    ir: "1326, 1303, 879",
    ms: "63, 46, 30",
    moleculeKey: "HNO3",
  },
  {
    name: "Hydrochloric Acid (HCl)",
    formula: "HCl",
    hazard: "Dung dịch ăn mòn, khí HCl bốc hơi gây kích ứng mắt và niêm mạc",
    ir: "2886",
    ms: "36, 38",
    moleculeKey: "HCl",
  },
  {
    name: "Sodium Hydroxide (NaOH)",
    formula: "NaOH",
    hazard: "Bazo mạnh (xút ăn da), gây bỏng nghiêm trọng và hỏng giác mạc",
    ir: "3630, 1640",
    ms: "Không áp dụng (chất ion không bay hơi)",
    moleculeKey: "NaOH",
  },
  {
    name: "Chlorine Gas (Cl₂)",
    formula: "Cl₂",
    hazard: "Khí độc màu vàng lục gây ngạt, tổn thương phổi và hệ hô hấp",
    ir: "Không hấp thụ IR (phân tử đồng hạt nhân)",
    ms: "70, 72, 74",
    moleculeKey: "Cl2",
  },
  {
    name: "Ammonia (NH₃)",
    formula: "NH₃",
    hazard:
      "Khí độc có mùi khai hắc, gây kích ứng mạnh mắt, mũi và bỏng hô hấp",
    ir: "3444, 3337, 1627, 950",
    ms: "17, 16, 15",
    moleculeKey: "NH3",
  },
  {
    name: "Sulfur Dioxide (SO₂)",
    formula: "SO₂",
    hazard: "Khí độc hắc, gây mưa axit, kích ứng niêm mạc và đường hô hấp",
    ir: "1361, 1151, 519",
    ms: "64, 48, 32",
    moleculeKey: "SO2",
  },
  {
    name: "Carbon Monoxide (CO)",
    formula: "CO",
    hazard:
      "Khí độc không màu không mùi, liên kết mạnh với Hemoglobin gây ngạt tử vong",
    ir: "2143",
    ms: "28, 16, 12",
    moleculeKey: "CO",
  },
  {
    name: "Sodium Chloride (NaCl)",
    formula: "NaCl",
    hazard: "Muối ăn tinh thể, an toàn ở nồng độ thường",
    ir: "Không áp dụng",
    ms: "58.5",
    moleculeKey: "NaCl",
  },
  {
    name: "Water (H₂O)",
    formula: "H₂O",
    hazard: "Dung môi phổ biến, an toàn tuyệt đối",
    ir: "3300, 1640",
    ms: "18",
    moleculeKey: "H2O",
  },
];

export default function SafetyTab() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<SafetyItem[]>(INITIAL_SAFETY_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modal Dialog State for 3D Molecule Bond Viewer
  const [open3DDialog, setOpen3DDialog] = useState<boolean>(false);
  const [activeMoleculeKey, setActiveMoleculeKey] = useState<string>("H2SO4");
  const [custom3DData, setCustom3DData] = useState<MoleculeData | null>(null);

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

  return (
    <Box>
      <ChemicalBondViewer3D />

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
                placeholder="Nhập tên hóa chất hoặc CTHH (vd: H2SO4, HNO3, HCl, NaOH, Cl2...)..."
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

                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box
                        p={0.8}
                        bgcolor="#1e293b"
                        borderRadius={1}
                        border="1px solid rgba(255,255,255,0.05)"
                      >
                        <Typography
                          variant="caption"
                          color="cyan"
                          fontWeight="bold"
                          display="block"
                          sx={{ fontSize: '10.5px' }}
                        >
                          Phổ IR (cm⁻¹):
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontFamily="monospace"
                          sx={{ fontSize: '11px' }}
                        >
                          {item.ir}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        p={0.8}
                        bgcolor="#1e293b"
                        borderRadius={1}
                        border="1px solid rgba(255,255,255,0.05)"
                      >
                        <Typography
                          variant="caption"
                          color="cyan"
                          fontWeight="bold"
                          display="block"
                          sx={{ fontSize: '10.5px' }}
                        >
                          Phổ MS (m/z):
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontFamily="monospace"
                          sx={{ fontSize: '11px' }}
                        >
                          {item.ms}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* DIALOG POPUP FOR 3D MOLECULE BOND VIEWER */}
      <Dialog
        open={open3DDialog}
        onClose={() => setOpen3DDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: { xs: 2, sm: 3 },
            m: { xs: 1, sm: 2 }
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "cyan",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { xs: 1.5, sm: 2 },
            fontSize: { xs: '15px', sm: '18px' }
          }}
        >
          <span>🔬 Mô Phỏng 3D Liên Kết Hóa Học</span>
          <IconButton
            onClick={() => setOpen3DDialog(false)}
            sx={{ color: "text.secondary", p: 0.5 }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ borderColor: "rgba(255,255,255,0.1)", p: { xs: 1.5, sm: 2 } }}
        >
          <ChemicalBondViewer3D
            selectedMoleculeKey={activeMoleculeKey}
            customMoleculeData={custom3DData}
            isDialog={true}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
