# TÀI LIỆU DỰ ÁN HCC-CHEMAI

Thư mục `docs/` chứa toàn bộ tài liệu kỹ thuật, hướng dẫn vận hành, thiết lập cơ sở dữ liệu và triển khai cho hệ thống **HCC-ChemAI (Hệ thống Trợ lý & Mô phỏng Hóa học Lớp 10)**.

---

## Kiến Trúc Phân Bổ AI

- **Dify AI Engine**: Chuyên trách module **Soạn Giáo Án 5512** ([LessonPlanner.tsx](../src/components/LessonPlanner.tsx)).
- **Google Gemini AI Engine**: Chuyên trách toàn bộ các module tương tác học tập và phân tích:
  - **Gia Sư AI** ([DifyChatTutor.tsx](../src/components/DifyChatTutor.tsx))
  - **Thí Nghiệm Ảo** ([VirtualLab.tsx](../src/components/VirtualLab.tsx))
  - **Đấu Trường Kahoot & Trắc Nghiệm** ([QuizKahootTab.tsx](../src/components/QuizKahootTab.tsx))
  - **An Toàn Hóa Chất & Sơ Cứu** ([SafetyTab.tsx](../src/components/SafetyTab.tsx))
  - **Soạn & Chấm Đề Thi** ([ExamManager.tsx](../src/components/ExamManager.tsx))
  - **Dự Án STEM Hóa Học** ([StemProjects.tsx](../src/components/StemProjects.tsx))

---

## Danh Mục Tài Liệu

1. **[Hướng Dẫn Chức Năng & Code Chi Tiết](./functions-guide.md)**
   - Phân tích kiến trúc hệ thống và luồng dữ liệu.
   - Giải thích chi tiết từng component, các hàm (function), thuật toán tính toán tốc độ phản ứng, cơ chế gọi Gemini API, Dify AI và âm thanh Web Audio API.

2. **[Hướng Dẫn Thiết Lập Supabase](./supabase-setup.md)**
   - Các bước tạo Project Supabase.
   - Cấu hình phân quyền RLS (Row Level Security) và Realtime publication.
   - Lấy URL và API Keys.

3. **[File SQL Schema Chuẩn](./schema.sql)**
   - Script SQL sẵn sàng copy-paste vào Supabase SQL Editor để tạo 5 bảng: `experiments`, `quiz_questions`, `rooms`, `room_participants`, `chat_logs`.

4. **[Hướng Dẫn Triển Khai Lên Netlify](./netlify-deployment.md)**
   - Triển khai tự động thông qua kết nối Git/GitHub.
   - Triển khai nhanh bằng Netlify CLI.
   - Cấu hình biến môi trường và file `netlify.toml`.

