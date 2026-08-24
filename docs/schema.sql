-- ====================================================================
-- HCC-CHEMAI SUPABASE DATABASE SCHEMA
-- Hệ thống Trợ lý & Mô phỏng Hóa học THPT
-- ====================================================================

-- 1. Bảng lưu trữ Cache Thí nghiệm ảo, Giáo án 5512, Đề thi & Dự án STEM
CREATE TABLE IF NOT EXISTS public.experiments (
    id BIGSERIAL PRIMARY KEY,
    cache_key TEXT UNIQUE NOT NULL,
    result_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index tối ưu tốc độ tra cứu cache_key
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

-- Index tra cứu phòng thi qua room_pin
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

-- Index tra cứu danh sách học sinh theo room_pin
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

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Cấp quyền truy cập công khai cho ứng dụng trường học
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

-- ====================================================================
-- KÍCH HOẠT SUPABASE REALTIME ĐỒNG BỘ ĐẤU TRƯỜNG KAHOOT
-- ====================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_participants;

