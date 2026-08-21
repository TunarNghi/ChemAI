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
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { FlaskConical, PlusCircle, Sparkles, Video, BookOpen, GraduationCap, Play, ExternalLink, Award } from "lucide-react";
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

interface VideoLecture {
  id: string;
  title: string;
  grade: string;
  teacher: string;
  embedUrl: string;
  description: string;
  tags: string[];
}

const DEFAULT_STEM_PROJECTS: StemProject[] = [
  {
    id: "stem-0",
    title: "Sản Xuất Khí Oxy Từ Củ Khoai Tây & Nước Oxy Già (THCS KHTN 8)",
    grade: "THCS (Lớp 8)",
    category: "Khoa Học Tự Nhiên & Enzim Sinh Học",
    description:
      "Sử dụng Enzim Catalase trong khoai tây/gan tươi để xúc tác phân hủy Hydro peroxide (H₂O₂) tạo khí O₂ làm bùng cháy tàn đóm đỏ.",
    materials: [
      "1 củ khoai tây tươi gọt vỏ cắt hạt lựu",
      "Dung dịch H₂O₂ 3% (nước oxy già y tế)",
      "Ống nghiệm hoặc cốc thủy tinh nhỏ",
      "Que đóm gỗ & bật lửa",
    ],
    steps: [
      "Bước 1: Cho các mẩu khoai tây tươi vào đáy ống nghiệm.",
      "Bước 2: Rót 5-10 ml dung dịch oxy già H₂O₂ vào ống nghiệm.",
      "Bước 3: Quan sát hiện tượng sủi bọt khí O₂ mạnh mẽ.",
      "Bước 4: Đốt que đóm cháy rồi thổi tắt chỉ còn tàn đóm đỏ.",
      "Bước 5: Đưa tàn đóm đỏ vào miệng ống nghiệm, quan sát que đóm bùng cháy sáng rực rỡ.",
    ],
    chemistryConcept:
      "Phản ứng phân hủy 2H₂O₂ -> 2H₂O + O₂↑ với xúc tác enzim tự nhiên Catalase.",
  },
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

const DEFAULT_VIDEO_LECTURES: VideoLecture[] = [
  {
    id: "vid-1",
    title: "Thí Nghiệm Thực Hành: Điều Chế Và Thu Khí Clo (Cl₂) Trong Phòng Thí Nghiệm",
    grade: "Lớp 10",
    teacher: "Tổ Hóa Học THPT",
    embedUrl: "https://www.youtube.com/embed/5rEw5oDbgBw",
    description: "Quan sát hiện tượng điều chế khí clo từ KMnO₄ và HCl đặc, cách khử độc khí clo dư bằng bông tẩm xút NaOH.",
    tags: ["Halogen", "Thực Hành", "An Toàn"]
  },
  {
    id: "vid-2",
    title: "Thí Nghiệm Phản Ứng Tráng Bạc Của Glucose Với Thuốc Thử Tollens",
    grade: "Lớp 12",
    teacher: "Tổ Hóa Học THPT",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Cơ chế phản ứng oxy hóa nhóm andehit của phân tử glucose bằng ion [Ag(NH₃)₂]⁺ tạo lớp gương bạc sáng bóng bám thành ống nghiệm.",
    tags: ["Carbohydrate", "Tráng Gương", "Lớp 12"]
  },
  {
    id: "vid-3",
    title: "KHTN 8: Định Luật Bảo Toàn Khối Lượng Và Cân Bằng Phương Trình Hóa Học",
    grade: "THCS (Lớp 8)",
    teacher: "Tổ KHTN THCS",
    embedUrl: "https://www.youtube.com/embed/5rEw5oDbgBw",
    description: "Bài giảng trực quan minh họa định luật Lômônôxốp - Lavoadie qua thí nghiệm BaCl₂ tác dụng Na₂SO₄ trên cân thăng bằng.",
    tags: ["KHTN 8", "Bảo Toàn Khối Lượng", "THCS"]
  }
];

export default function StemProjects() {
  const [activeTab, setActiveTab] = useState<'stem' | 'videos' | 'teacher-dev'>('stem');
  const [projects, setProjects] = useState<StemProject[]>(DEFAULT_STEM_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<StemProject>(DEFAULT_STEM_PROJECTS[0]);

  // Video State
  const [videos, setVideos] = useState<VideoLecture[]>(DEFAULT_VIDEO_LECTURES);
  const [openVideoModal, setOpenVideoModal] = useState<boolean>(false);
  const [newVidTitle, setNewVidTitle] = useState<string>("");
  const [newVidGrade, setNewVidGrade] = useState<string>("Lớp 10");
  const [newVidUrl, setNewVidUrl] = useState<string>("");
  const [newVidDesc, setNewVidDesc] = useState<string>("");

  // Modal Dialog Form State for STEM
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

    const prompt = `Bạn là Chuyên gia Giáo dục STEM Hóa học THPT & THCS theo chương trình GDPT 2018.
Hãy xây dựng quy trình thực hiện dự án STEM cho bài học: "${newTitle}" (${newGrade}).
Chủ đề: ${newCategory}.
Mô tả tóm tắt: ${newDesc || "Ứng dụng hóa học vào đời sống và môi trường"}.

Hãy trả về chính xác 5 bước theo đúng quy trình thiết kế kỹ thuật (EDP - Engineering Design Process):
Bước 1 (Xác định vấn đề): ...
Bước 2 (Nghiên cứu kiến thức nền): ...
Bước 3 (Đề xuất giải pháp & Thiết kế): ...
Bước 4 (Chế tạo mẫu thử & Thử nghiệm): ...
Bước 5 (Đánh giá, hoàn thiện & Báo cáo): ...

Mỗi bước viết thành 1 dòng rõ ràng, súc tích.`;

    try {
      const result = await callGeminiAPI(prompt);
      const lines = result
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.startsWith("Bước") || l.startsWith("1.") || l.startsWith("2.") || l.startsWith("3.") || l.startsWith("4.") || l.startsWith("5."));
      if (lines.length > 0) {
        setGeneratedSteps(lines);
      } else {
        setGeneratedSteps(result.split("\n").filter((l) => l.trim().length > 5));
      }
    } catch (e: any) {
      alert("Lỗi AI: " + e.message);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSaveCustomProject = async () => {
    if (!newTitle.trim()) {
      alert("Vui lòng nhập tiêu đề dự án!");
      return;
    }
    setIsSaving(true);

    const proj: StemProject = {
      id: "stem_" + Date.now(),
      title: newTitle,
      grade: newGrade,
      category: newCategory,
      description: newDesc || "Dự án STEM sáng tạo ứng dụng Hóa học.",
      materials: newMaterials.split("\n").map((m) => m.trim()).filter(Boolean),
      steps: generatedSteps.length > 0 ? generatedSteps : ["Bước 1: Chuẩn bị dụng cụ", "Bước 2: Tiến hành", "Bước 3: Báo cáo kết quả"],
      chemistryConcept: newConcept || "Kiến thức hóa học liên môn.",
      created_at: new Date().toISOString(),
    };

    const cacheKey = `stem_project_${newTitle.replace(/[^a-zA-Z0-9]/g, "")}_${Date.now()}`;

    try {
      await supabase.from("experiments").upsert({
        cache_key: cacheKey,
        result_json: proj,
      });

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

  const handleAddVideo = () => {
    if (!newVidTitle.trim() || !newVidUrl.trim()) {
      alert("Vui lòng nhập Tiêu đề và Link Video!");
      return;
    }
    const newVid: VideoLecture = {
      id: "vid_" + Date.now(),
      title: newVidTitle,
      grade: newVidGrade,
      teacher: "Giáo viên Hóa học",
      embedUrl: newVidUrl,
      description: newVidDesc || "Video bài giảng thí nghiệm thực hành.",
      tags: [newVidGrade, "Thực hành"]
    };
    setVideos([newVid, ...videos]);
    setOpenVideoModal(false);
    setNewVidTitle("");
    setNewVidUrl("");
    setNewVidDesc("");
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
        {/* Header & Sub-Tabs */}
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
            <div>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
                Trung Tâm STEM & Bồi Dưỡng Chuyên Môn
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Dự án liên môn, video bài giảng & tài liệu phát triển năng lực sư phạm
              </Typography>
            </div>
          </Box>

          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              bgcolor: '#0f172a',
              borderRadius: 2,
              p: 0.5,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: { xs: '12px', sm: '13px' },
                minHeight: 36,
                borderRadius: 1.5,
                color: '#94a3b8',
                '&.Mui-selected': { bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }
              }
            }}
          >
            <Tab value="stem" label="💡 Dự Án STEM" />
            <Tab value="videos" label="🎥 Video Bài Giảng" />
            <Tab value="teacher-dev" label="📖 Bồi Dưỡng GV" />
          </Tabs>
        </Box>

        {/* TAB 1: STEM PROJECTS */}
        {activeTab === 'stem' && (
          <Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
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
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="common.white"
                        sx={{ fontSize: { xs: '13px', sm: '14px' } }}
                      >
                        {proj.title}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Grid>

              {/* Project Detail */}
              <Grid item xs={12} md={7}>
                <Paper
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    bgcolor: "background.default",
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                  >
                    <Chip
                      label={selectedProject.grade}
                      color="primary"
                      size="small"
                      sx={{ height: 22, fontSize: 11, fontWeight: 'bold' }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Chủ đề: <b style={{ color: '#38bdf8' }}>{selectedProject.category}</b>
                    </Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#facc15"
                    gutterBottom
                    sx={{ fontSize: { xs: '16px', sm: '18px' } }}
                  >
                    {selectedProject.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ fontSize: { xs: '13px', sm: '13.5px' }, lineHeight: 1.6 }}
                  >
                    {selectedProject.description}
                  </Typography>

                  <Box
                    mb={2}
                    p={1.5}
                    bgcolor="rgba(56, 189, 248, 0.08)"
                    borderRadius={1.5}
                    border="1px solid rgba(56, 189, 248, 0.2)"
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="#38bdf8"
                      display="block"
                      gutterBottom
                    >
                      🧪 Khái niệm Hóa học Trọng tâm (Khoa học nền tảng):
                    </Typography>
                    <Typography variant="body2" color="common.white" sx={{ fontSize: '13px' }}>
                      {selectedProject.chemistryConcept}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="common.white"
                    gutterBottom
                  >
                    📦 Dụng Cụ & Vật Liệu Cần Chuẩn Bị:
                  </Typography>
                  <Stack spacing={0.5} mb={2}>
                    {selectedProject.materials.map((mat, i) => (
                      <Typography
                        key={i}
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '12.5px' }}
                      >
                        <span style={{ color: '#38bdf8' }}>•</span> {mat}
                      </Typography>
                    ))}
                  </Stack>

                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="common.white"
                    gutterBottom
                  >
                    ⚙️ Tiến Trình Thực Hiện (Quy trình Thiết Kế Kỹ Thuật):
                  </Typography>
                  <Stack spacing={1}>
                    {selectedProject.steps.map((step, i) => (
                      <Paper
                        key={i}
                        sx={{
                          p: 1.2,
                          bgcolor: "#0f172a",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: 1.5,
                        }}
                      >
                        <Typography variant="body2" color="common.white" sx={{ fontSize: '12.5px', lineHeight: 1.5 }}>
                          {step}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* TAB 2: VIDEO LECTURES */}
        {activeTab === 'videos' && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Thư viện video bài giảng & thực hành thí nghiệm trực quan
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => setOpenVideoModal(true)}
                startIcon={<PlusCircle size={14} />}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                Thêm Video Mới
              </Button>
            </Box>

            <Grid container spacing={2}>
              {videos.map((vid) => (
                <Grid item xs={12} md={4} key={vid.id}>
                  <Paper sx={{ p: 2, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative', pt: '56.25%', mb: 1.5, borderRadius: 1.5, overflow: 'hidden', bgcolor: '#000' }}>
                      <iframe
                        src={vid.embedUrl}
                        title={vid.title}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Chip label={vid.grade} size="small" color="primary" sx={{ height: 20, fontSize: 10, fontWeight: 'bold' }} />
                      <Typography variant="caption" color="text.secondary">
                        {vid.teacher}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" fontWeight="bold" color="common.white" sx={{ fontSize: 13, mb: 1 }}>
                      {vid.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1, display: 'block', mb: 1.5 }}>
                      {vid.description}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {vid.tags.map((t, idx) => (
                        <Chip key={idx} label={`#${t}`} size="small" sx={{ height: 18, fontSize: 9.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* TAB 3: TEACHER PROFESSIONAL DEVELOPMENT */}
        {activeTab === 'teacher-dev' && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2.5, bgcolor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                  <BookOpen color="#38bdf8" size={20} />
                  <Typography variant="subtitle1" fontWeight="bold" color="#38bdf8">
                    Đổi Mới Phương Pháp Dạy Học GDPT 2018
                  </Typography>
                </Box>
                <Stack spacing={1.5} sx={{ fontSize: 13, color: '#cbd5e1' }}>
                  <Paper sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="#facc15">
                      1. Dạy Học Dựa Trên Khám Phá & Thí Nghiệm Ảo:
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Kết hợp thí nghiệm thực hành với mô phỏng tương tác 250ml của HCC-ChemAI để học sinh quan sát rõ cơ chế electron, liên kết 3D và biến thiên pH.
                    </Typography>
                  </Paper>
                  <Paper sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="#facc15">
                      2. Tích Hợp Giáo Dục STEM & Liên Môn:
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Chuyển hóa lý thuyết este/chất béo thành dự án làm xà phòng sinh học, phân bón vi lượng hữu cơ, năng lượng pin quả chanh.
                    </Typography>
                  </Paper>
                  <Paper sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="#facc15">
                      3. Đánh Giá Quá Trình Bằng Gamification:
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sử dụng Kahoot Multiplayer Live và bảng xếp hạng EXP để tạo động lực cạnh tranh lành mạnh, khen thưởng bằng danh hiệu sư phạm kịp thời.
                    </Typography>
                  </Paper>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2.5, bgcolor: '#0f172a', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 2 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                  <GraduationCap color="#facc15" size={20} />
                  <Typography variant="subtitle1" fontWeight="bold" color="#facc15">
                    Tài Liệu Bồi Dưỡng & Văn Bản Sư Phạm
                  </Typography>
                </Box>
                <Stack spacing={1.5}>
                  <Paper sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                      📄 Công Văn 5512/BGDĐT-GDTrH:
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Hướng dẫn xây dựng và tổ chức thực hiện kế hoạch giáo dục của nhà trường, chuẩn hóa 4 hoạt động sư phạm.
                    </Typography>
                  </Paper>
                  <Paper sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="common.white">
                      📊 Đổi Mới Ma Trận Đề Thi Tốt Nghiệp THPT Từ 2025:
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Cấu trúc đề thi mới gồm Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai, và Trắc nghiệm Trả lời ngắn.
                    </Typography>
                  </Paper>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Modal Thêm Video Mới */}
        <Dialog open={openVideoModal} onClose={() => setOpenVideoModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: '#38bdf8', fontWeight: 'bold' }}>Thêm Video Bài Giảng Mới</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField label="Tiêu đề video" fullWidth size="small" value={newVidTitle} onChange={(e) => setNewVidTitle(e.target.value)} />
              <TextField label="Khối Lớp (THCS / Lớp 10 / Lớp 11 / Lớp 12)" fullWidth size="small" value={newVidGrade} onChange={(e) => setNewVidGrade(e.target.value)} />
              <TextField label="Link Embed Video (YouTube/Drive)" fullWidth size="small" placeholder="https://www.youtube.com/embed/..." value={newVidUrl} onChange={(e) => setNewVidUrl(e.target.value)} />
              <TextField label="Mô tả nội dung bài giảng" fullWidth multiline rows={2} size="small" value={newVidDesc} onChange={(e) => setNewVidDesc(e.target.value)} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenVideoModal(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleAddVideo}>Lưu Video</Button>
          </DialogActions>
        </Dialog>

        {/* Modal Tạo Dự Án STEM Mới */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ color: '#38bdf8', fontWeight: 'bold' }}>Tạo Kế Hoạch Dự Án STEM Mới</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField label="Tên Dự Án STEM" fullWidth size="small" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="VD: Sản xuất cồn sát khuẩn từ tinh bột sắn..." />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField label="Khối Lớp" fullWidth size="small" value={newGrade} onChange={(e) => setNewGrade(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Chuyên mục" fullWidth size="small" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                </Grid>
              </Grid>
              <TextField label="Mô tả tóm tắt" fullWidth multiline rows={2} size="small" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
              <TextField label="Dụng cụ & Vật liệu (Mỗi dòng 1 món)" fullWidth multiline rows={3} size="small" value={newMaterials} onChange={(e) => setNewMaterials(e.target.value)} />
              <Button variant="outlined" color="secondary" onClick={handleAIGenerateSteps} disabled={isGeneratingAI} startIcon={<Sparkles size={16} />}>
                {isGeneratingAI ? "AI Đang Soạn Quy Trình STEM..." : "Tự Động Sinh Quy Trình Bằng AI"}
              </Button>
              {generatedSteps.length > 0 && (
                <Paper sx={{ p: 1.5, bgcolor: '#0f172a' }}>
                  <Typography variant="caption" fontWeight="bold" color="#38bdf8">Quy trình AI đề xuất:</Typography>
                  {generatedSteps.map((s, idx) => (
                    <Typography key={idx} variant="caption" display="block" color="common.white" sx={{ mt: 0.5 }}>{s}</Typography>
                  ))}
                </Paper>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleSaveCustomProject} disabled={isSaving}>Lưu Dự Án</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
