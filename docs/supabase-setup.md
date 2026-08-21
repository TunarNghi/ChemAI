# HƯỚNG DẪN KỸ THUẬT SETUP SUPABASE CHO HCC-CHEMAI

Tài liệu này hướng dẫn chi tiết quy trình thiết lập cơ sở dữ liệu trên **Supabase** để phục vụ các tính năng: Caching Thí nghiệm ảo, Ngân hàng câu hỏi trắc nghiệm, Đấu trường Live Kahoot Arena, Kho Giáo án 5512, Đề thi & Dự án STEM.

---

## 1. Tạo Project trên Supabase
1. Truy cập [https://supabase.com/](https://supabase.com/) và đăng nhập (hoặc đăng ký tài khoản miễn phí).
2. Nhấn **New Project**:
   - **Name**: `hcc-chemai`
   - **Database Password**: Nhập mật khẩu an toàn (lưu lại mật khẩu này).
   - **Region**: Chọn vùng gần Việt Nam nhất (khuyên dùng `Singapore - ap-southeast-1`).
   - **Pricing Plan**: Free.
3. Nhấn **Create new project** và đợi khoảng 1-2 phút để hệ thống khởi tạo hoàn tất.

---

## 2. Tạo Bảng & Cấu hình Phân quyền (SQL Editor)

Vào thanh điều hướng bên trái $\rightarrow$ chọn **SQL Editor** $\rightarrow$ bấm **New query** $\rightarrow$ Dán toàn bộ nội dung sau (hoặc mở file [schema.sql](./schema.sql)):

```sql
-- 1. Bảng lưu trữ Cache Thí nghiệm ảo, Giáo án 5512, Đề thi & Dự án STEM
CREATE TABLE IF NOT EXISTS public.experiments (
    id BIGSERIAL PRIMARY KEY,
    cache_key TEXT UNIQUE NOT NULL,
    result_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_experiments_cache_key ON public.experiments(cache_key);

-- 2. Bảng Ngân hàng câu hỏi trắc nghiệm
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id BIGSERIAL PRIMARY KEY,
    topic TEXT NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Bảng Quản lý phòng thi Live Kahoot Arena
CREATE TABLE IF NOT EXISTS public.rooms (
    id BIGSERIAL PRIMARY KEY,
    room_pin TEXT UNIQUE NOT NULL,
    topic TEXT NOT NULL,
    status TEXT DEFAULT 'waiting' NOT NULL, -- 'waiting', 'active', 'finished'
    question_count INTEGER DEFAULT 5,
    questions JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rooms_room_pin ON public.rooms(room_pin);

-- 4. Bảng Học sinh tham gia phòng thi Live
CREATE TABLE IF NOT EXISTS public.room_participants (
    id BIGSERIAL PRIMARY KEY,
    room_pin TEXT NOT NULL REFERENCES public.rooms(room_pin) ON DELETE CASCADE,
    participant_name TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    answers JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_room_participants_room_pin ON public.room_participants(room_pin);

-- 5. Bảng Nhật ký Hội thoại Gia Sư AI (phục vụ Giáo viên Audit)
CREATE TABLE IF NOT EXISTS public.chat_logs (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    user_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_session_id ON public.chat_logs(session_id);

-- Cấu hình Row Level Security (RLS)
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all access on experiments" 
ON public.experiments FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public all access on quiz_questions" 
ON public.quiz_questions FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public all access on rooms" 
ON public.rooms FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public all access on room_participants" 
ON public.room_participants FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public all access on chat_logs" 
ON public.chat_logs FOR ALL USING (true) WITH CHECK (true);

-- Kích hoạt Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_participants;
```

Nhấn nút **Run** (hoặc tổ hợp phím `Ctrl + Enter`) để thực thi. Bạn sẽ nhận được thông báo `Success. No rows returned`.

---

## 3. Lấy Thông Tin Kết Nối (API Keys)

1. Trong Dashboard Supabase, vào **Project Settings** (biểu tượng bánh răng góc dưới bên trái) $\rightarrow$ chọn mục **API**.
2. Sao chép 2 giá trị:
   - **Project URL**: Ví dụ `https://cohutjbyyubjntqhjoao.supabase.co`
   - **Project API keys (`anon` / `public`)**: Chuỗi publishable key hoặc JWT token.

---

## 4. Cấu Hình Biến Môi Trường Trong Ứng Dụng

Mở file `.env.local` tại thư mục gốc của dự án `hcc-chemai` và điền:

```env
# Supabase DB Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Dify AI Configuration (Soạn Giáo Án 5512)
NEXT_PUBLIC_DIFY_API_KEY=your-dify-api-key
NEXT_PUBLIC_DIFY_API_URL=https://api.dify.ai/v1

# Gemini AI Keys (Gia sư AI, Thí nghiệm ảo, Kahoot, Đề thi, STEM)
NEXT_PUBLIC_GEMINI_API_KEYS=your-gemini-api-key-here

# Teacher Audit Portal Password
NEXT_PUBLIC_TEACHER_AUDIT_PASSWORD=chemai2026
```
