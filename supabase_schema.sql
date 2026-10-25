-- ==============================================================================
-- HCC CHEMAI - SUPABASE COMPLETE DATABASE SCHEMA (2026)
-- Hệ Thống Trợ Lý & Mô Phỏng Hóa Học THPT (Chuẩn GDPT 2018)
-- Website: hcc-chemai.com.vn
-- ==============================================================================

-- 1. BẢNG EXPERIMENTS
CREATE TABLE IF NOT EXISTS public.experiments (
    id BIGSERIAL PRIMARY KEY,
    cache_key TEXT UNIQUE NOT NULL,
    result_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_experiments_cache_key ON public.experiments(cache_key);

-- 2. BẢNG USER_PROFILES
CREATE TABLE IF NOT EXISTS public.user_profiles (
    user_id TEXT PRIMARY KEY,
    id TEXT,
    full_name TEXT NOT NULL,
    auth_type TEXT DEFAULT 'email',
    email_or_phone TEXT,
    email TEXT,
    role TEXT DEFAULT 'student',
    class_name TEXT DEFAULT '10A1',
    grade TEXT DEFAULT 'Lớp 10',
    school TEXT DEFAULT 'THPT Chuyên Thủ Khoa Nghĩa',
    location TEXT DEFAULT 'TP. Châu Đốc, Tỉnh An Giang',
    subject TEXT DEFAULT 'Hóa Học THPT',
    avatar_url TEXT,
    points INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 1,
    kahoot_exp INTEGER DEFAULT 0,
    kahoot_streak INTEGER DEFAULT 0,
    login_streak INTEGER DEFAULT 1,
    nickname TEXT,
    honor_badge TEXT,
    total_questions INTEGER DEFAULT 0,
    correct_questions INTEGER DEFAULT 0,
    teacher_evaluation TEXT,
    last_active_date TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email_or_phone);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_exp ON public.user_profiles(kahoot_exp DESC);

-- 3. BẢNG CHAT_LOGS
CREATE TABLE IF NOT EXISTS public.chat_logs (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT,
    user_id TEXT,
    user_message TEXT,
    user_query TEXT,
    ai_response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_session_id ON public.chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at ON public.chat_logs(created_at DESC);

-- 4. BẢNG QUIZ_QUESTIONS
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id BIGSERIAL PRIMARY KEY,
    topic TEXT NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INTEGER,
    correct_answer INTEGER,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_topic ON public.quiz_questions(topic);

-- 5. BẢNG ROOMS
CREATE TABLE IF NOT EXISTS public.rooms (
    id BIGSERIAL PRIMARY KEY,
    room_pin TEXT UNIQUE NOT NULL,
    topic TEXT DEFAULT 'Hóa Học THPT GDPT 2018',
    status TEXT DEFAULT 'waiting' NOT NULL,
    question_count INTEGER DEFAULT 5,
    questions JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rooms_room_pin ON public.rooms(room_pin);

-- 6. BẢNG ROOM_PARTICIPANTS
CREATE TABLE IF NOT EXISTS public.room_participants (
    id BIGSERIAL PRIMARY KEY,
    room_pin TEXT NOT NULL REFERENCES public.rooms(room_pin) ON DELETE CASCADE,
    participant_name TEXT,
    user_name TEXT,
    score INTEGER DEFAULT 0,
    answers JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_room_participants_room_pin ON public.room_participants(room_pin);
CREATE INDEX IF NOT EXISTS idx_room_participants_score ON public.room_participants(score DESC);

-- ==============================================================================
-- CẤU HÌNH ROW LEVEL SECURITY (RLS) & CẤP QUYỀN TRUY CẬP ĐẦY ĐỦ
-- ==============================================================================

ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_participants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public access experiments" ON public.experiments;
CREATE POLICY "Public access experiments" ON public.experiments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access user_profiles" ON public.user_profiles;
CREATE POLICY "Public access user_profiles" ON public.user_profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access chat_logs" ON public.chat_logs;
CREATE POLICY "Public access chat_logs" ON public.chat_logs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access quiz_questions" ON public.quiz_questions;
CREATE POLICY "Public access quiz_questions" ON public.quiz_questions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access rooms" ON public.rooms;
CREATE POLICY "Public access rooms" ON public.rooms FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access room_participants" ON public.room_participants;
CREATE POLICY "Public access room_participants" ON public.room_participants FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- BẬT SUPABASE REALTIME REPLICATION (PHỤC VỤ KAHOOT MULTIPLAYER)
-- ==============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'rooms'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'room_participants'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.room_participants;
  END IF;
END $$;
