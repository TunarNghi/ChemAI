"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel, Chip, Paper, Divider, Stack } from '@mui/material';
import { Sparkles, BookOpen, Download, Save, History } from 'lucide-react';
import { supabase, generateLessonPlanWithDify } from '@/lib/api';
import { formatMarkdownToHTML } from '@/components/AuditTab';

interface SavedLessonPlan {
  id?: string;
  topic: string;
  grade: string;
  duration: string;
  plan_content: string;
  created_at?: string;
}

export default function LessonPlanner() {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('10');
  const [duration, setDuration] = useState('45');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);

  const [savedPlans, setSavedPlans] = useState<SavedLessonPlan[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    fetchSavedLessonPlans();
  }, []);

  const fetchSavedLessonPlans = async () => {
    try {
      const { data } = await supabase.from("experiments").select("*").like("cache_key", "lesson_plan_%").order("created_at", { ascending: false }).limit(20);
      if (data) {
        setSavedPlans(data.map(item => item.result_json));
      }
    } catch (e) {
      console.warn("Fetch saved lesson plans error:", e);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    const prompt = `Soạn Kế Hoạch Bài Dạy (Giáo Án Hóa Học ${grade}) chuẩn theo Công văn 5512 BGD&ĐT cho bài học: "${topic}".
Thời lượng: ${duration} phút.
Bao gồm đầy đủ 4 hoạt động: 
I. MỤC TIÊU BÀI HỌC (Năng lực & Phẩm chất)
II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
III. TIẾN TRÌNH DẠY HỌC (Hoạt động 1: Mở đầu -> Hoạt động 2: Hình thành kiến thức -> Hoạt động 3: Luyện tập -> Hoạt động 4: Vận dụng & STEM).
Trả về nội dung trình bày sạch sẽ dưới dạng Markdown.`;

    try {
      const resultText = await generateLessonPlanWithDify({
        topic,
        grade,
        duration,
        prompt,
      });
      setGeneratedPlan(resultText);
      saveToSupabaseDB(topic, grade, duration, resultText);
    } catch (e) {
      const fallback = `
# KẾ HOẠCH BÀI DẠY (GIÁO ÁN HÓA HỌC ${grade})
**Tên bài dạy:** ${topic}
**Thời lượng:** ${duration} phút | **Bộ sách:** Cánh Diều / Kết Nối Tri Thức / Chân Trời Sáng Tạo
---
## I. MỤC TIÊU BÀI HỌC
### 1. Về năng lực
- **Năng lực Hóa học:** Trình bày được lý thuyết & tính chất trọng tâm bài ${topic}.
- **Năng lực chung:** Tự học, hợp tác nhóm và giải quyết vấn đề sáng tạo.
## II. TIẾN TRÌNH DẠY HỌC (Công văn 5512)
- **Hoạt động 1:** Mở đầu / Khởi động (5 phút)
- **Hoạt động 2:** Hình thành kiến thức mới & Thí nghiệm ảo ChemAI (20 phút)
- **Hoạt động 3:** Luyện tập trắc nghiệm Kahoot (12 phút)
- **Hoạt động 4:** Vận dụng & Dự án STEM (8 phút)
`;
      setGeneratedPlan(fallback);
      saveToSupabaseDB(topic, grade, duration, fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveToSupabaseDB = async (t: string, g: string, d: string, content: string) => {
    setIsSaving(true);
    const planObj: SavedLessonPlan = {
      id: "lp_" + Date.now(),
      topic: t,
      grade: g,
      duration: d,
      plan_content: content,
      created_at: new Date().toISOString()
    };
    const cacheKey = `lesson_plan_${t.replace(/[^a-zA-Z0-9]/g, "")}_${Date.now()}`;

    try {
      await supabase.from("experiments").upsert({ cache_key: cacheKey, result_json: planObj });
      setSavedPlans(prev => [planObj, ...prev]);
    } catch (e) {
      console.warn("Save to DB error:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportWord = () => {
    if (!generatedPlan) return;

    const lines = generatedPlan.split('\n');
    let htmlLines: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();
      let isHeading = false;
      let isList = false;
      let rawText = '';

      if (trimmed.startsWith('#### ')) {
        isHeading = true;
        rawText = `<h4 style="font-family:'Times New Roman'; font-size:13pt; font-weight:bold; color:#003366; margin-top:10pt; margin-bottom:4pt;">${trimmed.substring(5)}</h4>`;
      } else if (trimmed.startsWith('### ')) {
        isHeading = true;
        rawText = `<h3 style="font-family:'Times New Roman'; font-size:13pt; font-weight:bold; color:#003366; margin-top:12pt; margin-bottom:4pt;">${trimmed.substring(4)}</h3>`;
      } else if (trimmed.startsWith('## ')) {
        isHeading = true;
        rawText = `<h2 style="font-family:'Times New Roman'; font-size:14pt; font-weight:bold; color:#003366; margin-top:14pt; margin-bottom:6pt;">${trimmed.substring(3)}</h2>`;
      } else if (trimmed.startsWith('# ')) {
        isHeading = true;
        rawText = `<h1 style="font-family:'Times New Roman'; font-size:16pt; font-weight:bold; text-align:center; color:#003366; margin-top:16pt; margin-bottom:8pt;">${trimmed.substring(2)}</h1>`;
      } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        isList = true;
        rawText = `<p style="margin:3pt 0 3pt 20pt; font-family:'Times New Roman'; font-size:13pt; text-align:justify;">• ${trimmed.substring(2)}</p>`;
      } else if (trimmed === '') {
        htmlLines.push('<p style="margin:4pt 0;"></p>');
        continue;
      } else {
        rawText = `<p style="margin:4pt 0; line-height:1.4; font-family:'Times New Roman'; font-size:13pt; text-align:justify;">${line}</p>`;
      }

      let formattedLine = rawText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>');

      htmlLines.push(formattedLine);
    }

    const cleanContent = htmlLines.join('');

    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
      "xmlns:w='urn:schemas-microsoft-com:office:word' "+
      "xmlns='http://www.w3.org/TR/REC-html40'>"+
      "<head><meta charset='utf-8'><title>Kế hoạch bài dạy 5512</title>"+
      "<style>"+
      "body { font-family: 'Times New Roman', serif; font-size: 13pt; color: #000000; margin: 30px; }"+
      "p { font-family: 'Times New Roman', serif; font-size: 13pt; }"+
      "strong { font-weight: bold; }"+
      "</style></head><body>";
    
    const footer = "</body></html>";

    const sourceHTML = header + cleanContent + footer;
    const blob = new Blob(['\ufeff' + sourceHTML], { type: 'application/msword' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Giao_An_5512_${topic.replace(/[^a-zA-Z0-9]/g, "_") || "HoaHoc10"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
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
            <BookOpen color="#0284c7" size={22} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Soạn Giáo Án Bài Dạy (Công Văn 5512)
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => setShowHistory(!showHistory)}
            startIcon={<History size={16} />}
            sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: { xs: '12px', sm: '13px' } }}
          >
            {showHistory ? "Khung Soạn Giáo Án" : `Lịch Sử Đã Lưu (${savedPlans.length})`}
          </Button>
        </Box>

        {showHistory ? (
          <Paper sx={{ p: { xs: 1.5, sm: 2.5 }, bgcolor: '#0f172a', borderRadius: 2 }}>
            <Typography variant="subtitle2" color="cyan" fontWeight="bold" mb={1.5} sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
              📜 Danh Sách Giáo Án Đã Lưu Trong CSDL
            </Typography>
            <Stack spacing={1}>
              {savedPlans.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>Chưa có giáo án nào được lưu.</Typography>
              ) : (
                savedPlans.map((plan, idx) => (
                  <Paper
                    key={plan.id || idx}
                    onClick={() => { setGeneratedPlan(plan.plan_content); setTopic(plan.topic); setShowHistory(false); }}
                    sx={{ p: 1.5, bgcolor: '#1e293b', borderRadius: 2, cursor: 'pointer', '&:hover': { border: '1px solid #38bdf8' } }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="bold" color="common.white" sx={{ fontSize: '13.5px' }}>{plan.topic}</Typography>
                      <Chip label={`Khối ${plan.grade} - ${plan.duration}p`} size="small" color="primary" sx={{ height: 20, fontSize: 10 }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                      Tạo lúc: {plan.created_at ? new Date(plan.created_at).toLocaleString('vi-VN') : 'Mới đây'}
                    </Typography>
                  </Paper>
                ))
              )}
            </Stack>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: 'background.default', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1.5} sx={{ fontSize: { xs: '14px', sm: '16px' } }}>
                  ⚙️ Thông Tin Bài Dạy
                </Typography>
                <Stack spacing={1.5}>
                  <TextField
                    fullWidth
                    label="Tên bài học / Chủ đề Hóa học"
                    placeholder="Ví dụ: Tốc độ phản ứng, Phản ứng Oxi hóa - Khử..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    size="small"
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel>Khối Lớp</InputLabel>
                    <Select value={grade} label="Khối Lớp" onChange={(e) => setGrade(e.target.value)}>
                      <MenuItem value="10">Lớp 10 THPT</MenuItem>
                      <MenuItem value="11">Lớp 11 THPT</MenuItem>
                      <MenuItem value="12">Lớp 12 THPT</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Thời lượng (Phút)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Sparkles size={18} />}
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic.trim()}
                    sx={{ py: 1.2, fontWeight: 'bold', textTransform: 'none', fontSize: { xs: '13.5px', sm: '14.5px' } }}
                  >
                    {isGenerating ? "Đang Soạn Giáo Án Tự Động..." : "Tạo & Lưu Giáo Án 5512"}
                  </Button>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              {generatedPlan ? (
                <Paper sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: '#020617', border: '1px solid #1e293b', maxHeight: 600, overflowY: 'auto', borderRadius: 2 }}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    gap={1}
                    mb={1.5}
                  >
                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <Chip label="Chuẩn 5512 BGD&ĐT" color="primary" size="small" variant="outlined" sx={{ height: 22, fontSize: 11 }} />
                      <Chip label="Đã lưu CSDL" color="success" size="small" sx={{ height: 22, fontSize: 11 }} />
                    </Stack>
                    <Button size="small" variant="contained" color="secondary" onClick={handleExportWord} startIcon={<Download size={15} />} sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '12px' }}>
                      Xuất File Word (.doc)
                    </Button>
                  </Box>
                  <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.08)' }} />
                  <Box
                    sx={{
                      color: '#e2e8f0',
                      fontSize: { xs: '13px', sm: '13.5px' },
                      wordBreak: 'break-word',
                      '& strong': { color: '#fbbf24' },
                      '& h1, & h2, & h3, & h4': { color: '#38bdf8' }
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdownToHTML(generatedPlan || '')
                    }}
                  />
                </Paper>
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={{ xs: 200, sm: 320 }} bgcolor="background.default" borderRadius={2} border="1px dashed rgba(255,255,255,0.1)" p={2} textAlign="center">
                  <Typography color="text.secondary" sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
                    Nhập thông tin bài dạy bên trái và nhấn <b>"Tạo & Lưu Giáo Án 5512"</b> để bắt đầu.
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
