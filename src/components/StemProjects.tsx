"use client";

import { supabase, callGeminiAPI } from "@/lib/api";
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
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FlaskConical, PlusCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface StemProject {
  id?: string;
  title: string;
  grade: string;
  category: string;
  description: string;
  materials: string[];
  steps: string[];
  chemistryConcept: string;
  created_at?: string;
}

const DEFAULT_STEM_PROJECTS: StemProject[] = [
  {
    id: "stem-1",
    title: "Chế Tạo Dung Dịch Chỉ Thị Màu Tự Nhiên Từ Bắp Cải Tím",
    grade: "Lớp 10",
    category: "Hóa học Môi trường & Đời sống",
    description:
      "Sử dụng hợp chất Anthocyanin trong bắp cải tím để nhận biết môi trường Axit - Bazơ của các dung dịch sinh hoạt hàng ngày (chanh, xà phòng, giấm, nước bọt).",
    materials: [
      "1/4 bắp cải tím",
      "Nước ấm / Cồn 70°",
      "Cốc thủy tinh",
      "Chanh, Giấm, Nước rửa chén, Baking soda",
    ],
    steps: [
      "Bước 1 (Hỏi & Khám phá): Tìm hiểu tính chất đổi màu theo pH của Anthocyanin.",
      "Bước 2 (Thiết kế): Xây dựng quy trình chiết xuất dịch ép bắp cải tím.",
      "Bước 3 (Thử nghiệm): Xay nhỏ bắp cải, ngâm nước ấm/cồn thu dịch chiết màu tím nhạt.",
      "Bước 4 (Đánh giá): Rót dịch chiết vào các cốc dung dịch chanh (hóa đỏ), giấm (hóa hồng), xà phòng (hóa xanh lá/vàng).",
      "Bước 5 (Chia sẻ): Lập bảng thang đo pH tự tạo và trình bày báo cáo.",
    ],
    chemistryConcept:
      "Chỉ thị pH tự nhiên, Cân bằng Axit - Bazơ, Sự đổi màu của sắc tố Anthocyanin.",
  },
  {
    id: "stem-2",
    title: "Xà Phòng Hóa Từ Dầu Ăn Thừa (Upcycling Eco-Soap)",
    grade: "Lớp 12",
    category: "Tái chế & Hóa hữu cơ",
    description:
      "Tái chế dầu ăn đã qua sử dụng thành xà phòng rửa tay sinh học thân thiện với môi trường.",
    materials: [
      "Dầu ăn đã lọc cặn (100g)",
      "NaOH (14g)",
      "Nước cất (35ml)",
      "Tinh dầu thơm (cam/sả)",
    ],
    steps: [
      "Bước 1: Hòa tan NaOH vào nước cất (chú ý an toàn đeo găng tay & kính bảo hộ).",
      "Bước 2: Đun nhẹ dầu ăn thừa đến ~50°C.",
      "Bước 3: Rót từ từ dung dịch NaOH vào dầu ăn, khuấy đều liên tục theo 1 chiều đến khi đạt trạng thái sánh (trace).",
      "Bước 4: Nhỏ tinh dầu thơm và đổ vào khuôn nhựa/silicon.",
      "Bước 5: Để xà phòng ủ (cure) trong 3-4 tuần để hoàn tất phản ứng xà phòng hóa.",
    ],
    chemistryConcept:
      "Phản ứng xà phòng hóa Triglixerit (Chất béo) với NaOH tạo Muối Natri của Axit béo & Glycerol.",
  },
  {
    id: "stem-3",
    title: "Pin Điện Hóa Sinh Học Từ Chanh & Kim Loại (Citrus Battery)",
    grade: "Lớp 10 - Lớp 11",
    category: "Điện hóa học & Năng lượng xanh",
    description:
      "Tạo dòng điện một chiều thắp sáng bóng đèn LED từ phản ứng oxy hóa - khử giữa đinh đồng/kẽm và axit xitric trong quả chanh.",
    materials: [
      "4 quả chanh tươi",
      "4 thanh đồng (Cu)",
      "4 thanh kẽm (Zn) hoặc đinh mạ kẽm",
      "Dây dẫn thắt sấu",
      "1 bóng đèn LED nhỏ",
    ],
    steps: [
      "Bước 1: Bóp nhẹ quả chanh cho mọng nước bên trong.",
      "Bước 2: Cắm 1 thanh Cu và 1 thanh Zn vào mỗi quả chanh (không chạm vào nhau).",
      "Bước 3: Nối cực dương (Cu) của quả này với cực âm (Zn) của quả kia nối tiếp.",
      "Bước 4: Nối 2 đầu dây tổng vào 2 chân của bóng đèn LED.",
      "Bước 5: Quan sát đèn sáng và giải thích sự di chuyển của dòng electron.",
    ],
    chemistryConcept:
      "Pin Galvanic, Phản ứng Oxi hóa - Khử tự diễn biến, Thế điện cực kim loại.",
  },
];

export default function StemProjects() {
  const [projects, setProjects] = useState<StemProject[]>(DEFAULT_STEM_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<StemProject>(DEFAULT_STEM_PROJECTS[0]);

  // Modal Dialog Form State
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newGrade, setNewGrade] = useState<string>("Lớp 10");
  const [newCategory, setNewCategory] = useState<string>("Hóa học Thực nghiệm & STEM");
  const [newDesc, setNewDesc] = useState<string>("");
  const [newConcept, setNewConcept] = useState<string>("");
  const [newMaterials, setNewMaterials] = useState<string>("");
  const [generatedSteps, setGeneratedSteps] = useState<string[]>([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    fetchStemProjectsFromDB();
  }, []);

  const fetchStemProjectsFromDB = async () => {
    try {
      const { data } = await supabase
        .from("experiments")
        .select("*")
        .like("cache_key", "stem_project_%")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const customProjs: StemProject[] = data.map((item) => item.result_json);
        setProjects([...customProjs, ...DEFAULT_STEM_PROJECTS]);
      }
    } catch (e) {
      console.warn("Fetch STEM DB error:", e);
    }
  };

  const handleAIGenerateSteps = async () => {
    if (!newTitle.trim()) {
      alert("Vui lòng nhập Tên Dự Án STEM để AI tự động tạo quy trình!");
      return;
    }
    setIsGeneratingAI(true);
    const prompt = `Xây dựng quy trình 5 bước thực hiện (Engineering Design Process - EDP) cho dự án STEM Hóa học: "${newTitle}". Mô tả: "${newDesc}". Trả về DUY NHẤT một chuỗi JSON dạng mảng chuỗi (không dùng markdown codeblock):
[
  "Bước 1 (Hỏi & Khám phá): ...",
  "Bước 2 (Thiết kế): ...",
  "Bước 3 (Thử nghiệm): ...",
  "Bước 4 (Đánh giá): ...",
  "Bước 5 (Chia sẻ & Báo cáo): ..."
]`;

    try {
      const response = await callGeminiAPI(prompt);
      const match = response.match(/\[[\s\S]*\]/);
      if (match) {
        const parsedSteps: string[] = JSON.parse(match[0]);
        setGeneratedSteps(parsedSteps);
      }
    } catch (e) {
      console.error("AI STEM generation error:", e);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSaveNewProject = async () => {
    if (!newTitle.trim()) {
      alert("Vui lòng nhập Tên Dự Án STEM!");
      return;
    }

    setIsSaving(true);
    const proj: StemProject = {
      id: "stem_" + Date.now(),
      title: newTitle.trim(),
      grade: newGrade.trim() || "Lớp 10",
      category: newCategory.trim() || "Hóa học Thực nghiệm & STEM",
      description: newDesc.trim() || "Dự án STEM Hóa học sáng tạo ứng dụng thực tế.",
      materials: newMaterials
        ? newMaterials.split(",").map((m) => m.trim()).filter(Boolean)
        : ["Hóa chất & Dụng cụ thí nghiệm thông dụng"],
      steps: generatedSteps.length > 0 ? generatedSteps : [
        "Bước 1 (Hỏi & Khám phá): Nêu vấn đề & Thiết kế ý tưởng STEM.",
        "Bước 2 (Thiết kế): Lập sơ đồ nguyên lý & chuẩn bị nguyên liệu.",
        "Bước 3 (Thử nghiệm): Tiến hành thực nghiệm & Thu thập dữ liệu.",
        "Bước 4 (Đánh giá & Chia sẻ): Báo cáo & Đánh giá sản phẩm STEM."
      ],
      chemistryConcept:
        newConcept.trim() || "Ứng dụng kiến thức Hóa học THPT vào đời sống thực tế.",
      created_at: new Date().toISOString(),
    };

    const cacheKey = `stem_project_${newTitle.replace(/[^a-zA-Z0-9]/g, "")}_${Date.now()}`;

    try {
      const { error } = await supabase.from("experiments").upsert({
        cache_key: cacheKey,
        result_json: proj,
      });

      if (error) {
        console.error("Supabase upsert error:", error);
      }

      await fetchStemProjectsFromDB();
      setOpenModal(false);
      setNewTitle("");
      setNewDesc("");
      setNewConcept("");
      setNewMaterials("");
      setGeneratedSteps([]);
    } catch (e: any) {
      console.error("Save STEM project error:", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={1.5}
          mb={2.5}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <FlaskConical color="#0284c7" size={22} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Dự Án STEM Hóa Học THPT
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            startIcon={<PlusCircle size={16} />}
            sx={{ fontWeight: "bold", textTransform: 'none', fontSize: { xs: '12.5px', sm: '13.5px' } }}
          >
            Tạo Dự Án STEM Mới
          </Button>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Project List */}
          <Grid item xs={12} md={5}>
            <Stack spacing={1.2}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="text.secondary"
                sx={{ fontSize: { xs: '12px', sm: '13px' } }}
              >
                DANH SÁCH DỰ ÁN ({projects.length} DỰ ÁN)
              </Typography>
              {projects.map((proj, idx) => (
                <Paper
                  key={proj.id || idx}
                  onClick={() => setSelectedProject(proj)}
                  sx={{
                    p: 1.5,
                    bgcolor:
                      selectedProject.title === proj.title
                        ? "rgba(2, 132, 199, 0.2)"
                        : "background.default",
                    borderColor: selectedProject.title === proj.title ? "#38bdf8" : "rgba(255,255,255,0.08)",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={0.8}
                  >
                    <Chip label={proj.grade} size="small" color="secondary" sx={{ height: 20, fontSize: 10 }} />
                    <Typography variant="caption" color="cyan" sx={{ fontSize: '11px' }}>
                      {proj.category}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                    {proj.title}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* Project Details */}
          <Grid item xs={12} md={7}>
            <Paper
              sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: "#020617", border: "1px solid #1e293b", borderRadius: 2 }}
            >
              <Typography variant="h6" fontWeight="bold" color="cyan" mb={1} sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
                {selectedProject.title}
              </Typography>
              <Chip
                label={selectedProject.category}
                color="primary"
                size="small"
                sx={{ mb: 1.5, height: 22, fontSize: 11 }}
              />

              <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                {selectedProject.description}
              </Typography>

              <Box
                my={2}
                p={1.5}
                bgcolor="#0f172a"
                borderRadius={2}
                border="1px solid rgba(255,255,255,0.05)"
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="warning.main"
                  mb={0.5}
                  sx={{ fontSize: '13px' }}
                >
                  💡 Kiến Thức Hóa Học Nền Tảng:
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '13px' }}>
                  {selectedProject.chemistryConcept}
                </Typography>
              </Box>

              <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1} sx={{ fontSize: '13px' }}>
                📦 Dụng Cụ & Hóa Chất Cần Chuẩn Bị:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={0.8} mb={2}>
                {selectedProject.materials?.map((mat, i) => (
                  <Chip key={i} label={mat} variant="outlined" size="small" sx={{ height: 24, fontSize: 11 }} />
                ))}
              </Box>

              <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1} sx={{ fontSize: '13px' }}>
                🛠️ Tiến Trình Thực Hiện (5 Bước EDP):
              </Typography>
              <Stack spacing={1}>
                {selectedProject.steps?.map((step, idx) => (
                  <Paper
                    key={idx}
                    sx={{
                      p: 1.2,
                      bgcolor: "#0f172a",
                      borderLeft: "4px solid #0284c7",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="caption" color="common.white" sx={{ fontSize: { xs: '12px', sm: '12.5px' }, lineHeight: 1.5, display: 'block' }}>
                      {step}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* MODAL TAO DU AN STEM MOI */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: { xs: 2, sm: 3 },
              m: { xs: 1.5, sm: 2 }
            }
          }}
        >
          <DialogTitle sx={{ color: "cyan", p: { xs: 1.5, sm: 2 }, fontSize: { xs: '16px', sm: '18px' } }}>
            Tạo Dự Án STEM Hóa Học Mới
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Stack spacing={1.5} pt={0.5}>
              <TextField
                fullWidth
                size="small"
                label="Tên Dự Án STEM"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Khối Lớp"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Lĩnh Vực / Thể Loại"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                label="Mô Tả Dự Án"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Kiến Thức Hóa Học Nền Tảng"
                value={newConcept}
                onChange={(e) => setNewConcept(e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Dụng Cụ & Hóa Chất (phân cách bằng dấu phẩy)"
                value={newMaterials}
                onChange={(e) => setNewMaterials(e.target.value)}
              />

              <Button
                variant="outlined"
                color="secondary"
                disabled={isGeneratingAI || !newTitle.trim()}
                onClick={handleAIGenerateSteps}
                startIcon={<Sparkles size={16} />}
                sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}
              >
                {isGeneratingAI ? "AI Đang Soạn Quy Trình..." : "Tự Động Sinh Quy Trình (AI ✨)"}
              </Button>

              {generatedSteps.length > 0 && (
                <Box p={1.2} bgcolor="#020617" borderRadius={2} border="1px solid #0284c7">
                  <Typography variant="caption" color="cyan" fontWeight="bold" display="block" mb={0.5}>
                    ✨ Quy trình EDP 5 bước AI đã tạo:
                  </Typography>
                  {generatedSteps.map((st, idx) => (
                    <Typography key={idx} variant="caption" color="text.secondary" display="block" sx={{ fontSize: '11px', mb: 0.3 }}>
                      • {st}
                    </Typography>
                  ))}
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 1, sm: 1.5 } }}>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#94a3b8' }}>Hủy</Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isSaving}
              onClick={handleSaveNewProject}
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            >
              {isSaving ? "Đang Lưu CSDL..." : "Lưu Vào CSDL"}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
