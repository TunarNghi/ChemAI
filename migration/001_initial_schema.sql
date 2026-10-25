-- ==============================================================================
-- HCC CHEMAI - SUPABASE COMPLETE DATABASE SCHEMA & MIGRATION (2026)
-- Hệ Thống Trợ Lý & Mô Phỏng Hóa Học THPT (Chuẩn GDPT 2018)
-- Website: hcc-chemai.com.vn
-- ==============================================================================

-- 1. BẢNG EXPERIMENTS
-- Lưu trữ Cache Phản ứng Động học ảo, Giáo án 5512, Đề thi 2025, Dự án STEM & Auth profiles
CREATE TABLE IF NOT EXISTS public.experiments (
    id BIGSERIAL PRIMARY KEY,
    cache_key TEXT UNIQUE NOT NULL,
    result_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_experiments_cache_key ON public.experiments(cache_key);

-- 2. BẢNG USER_PROFILES
-- Quản lý hồ sơ Học sinh, Giáo viên, EXP Kahoot, Chuỗi streak và Đánh giá năng lực
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
-- Nhật ký hội thoại giữa Học sinh và Gia Sư AI (Dify / Gemini) để Giáo viên kiểm duyệt
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
-- Ngân hàng câu hỏi trắc nghiệm Hóa học THPT (Lớp 10, 11, 12) phục vụ luyện tập & Kahoot
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
-- Quản lý phòng thi đấu trực tuyến Live Kahoot Arena theo mã PIN 6 số
CREATE TABLE IF NOT EXISTS public.rooms (
    id BIGSERIAL PRIMARY KEY,
    room_pin TEXT UNIQUE NOT NULL,
    topic TEXT DEFAULT 'Hóa Học THPT GDPT 2018',
    status TEXT DEFAULT 'waiting' NOT NULL, -- 'waiting', 'active', 'playing', 'finished'
    question_count INTEGER DEFAULT 5,
    questions JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rooms_room_pin ON public.rooms(room_pin);

-- 6. BẢNG ROOM_PARTICIPANTS
-- Danh sách học sinh tham gia phòng thi Live, điểm số và câu trả lời Realtime
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

-- Cấp quyền truy cập công khai cho Web App (Anon & Authenticated)
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

-- ==============================================================================
-- DỮ LIỆU KHỞI TẠO BAN ĐẦU (SEED DATA)
-- ==============================================================================

-- 1. Tài khoản Giáo viên & Học sinh mẫu
INSERT INTO public.user_profiles (
    user_id, id, full_name, email_or_phone, email, role, class_name, grade, school, location, subject, kahoot_exp, kahoot_streak, login_streak, nickname, honor_badge
) VALUES 
(
    'teacher_chinh_01', 'teacher_chinh_01', 'Cô Trần Thị Bé Chính', 'giaovien.hoahoc@gmail.com', 'giaovien.hoahoc@gmail.com', 
    'teacher', 'Tổ Trưởng Chuyên Môn Hóa Học', 'Tổ Hóa', 'THPT Chuyên Thủ Khoa Nghĩa', 'TP. Châu Đốc, Tỉnh An Giang', 'Hóa Học THPT',
    5000, 20, 30, 'Admin Giáo Viên', 'Giáo Viên Xuất Sắc'
),
(
    'std_seed_1', 'std_seed_1', 'Nguyễn Hoàng Long', 'hoanglong.chem@gmail.com', 'hoanglong.chem@gmail.com', 
    'student', '10 Chuyên Hóa', 'Lớp 10', 'THPT Chuyên Thủ Khoa Nghĩa', 'TP. Châu Đốc, Tỉnh An Giang', 'Hóa Học',
    2850, 12, 15, 'Thần Đồng Oxi Hóa - Khử', 'Huy Chương Vàng'
),
(
    'std_seed_2', 'std_seed_2', 'Lê Minh Anh', 'minhanh.le@gmail.com', 'minhanh.le@gmail.com', 
    'student', '10A1', 'Lớp 10', 'THPT Chuyên Thủ Khoa Nghĩa', 'TP. Châu Đốc, Tỉnh An Giang', 'Hóa Học',
    2420, 9, 10, 'Chiến Thần Halogen', 'Huy Chương Bạc'
),
(
    'std_seed_3', 'std_seed_3', 'Trần Bảo Ngọc', 'baongoc.tran@gmail.com', 'baongoc.tran@gmail.com', 
    'student', '11 Chuyên Hóa', 'Lớp 11', 'THPT Chuyên Thủ Khoa Nghĩa', 'TP. Châu Đốc, Tỉnh An Giang', 'Hóa Học',
    1980, 7, 8, 'Cao Thủ Phổ IR/MS', 'Huy Chương Đồng'
)
ON CONFLICT (user_id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email_or_phone = EXCLUDED.email_or_phone,
    role = EXCLUDED.role,
    kahoot_exp = EXCLUDED.kahoot_exp;

-- 2. Ngân hàng câu hỏi trắc nghiệm mẫu (5 câu đại diện 10-11-12)
INSERT INTO public.quiz_questions (topic, question, options, correct_index, correct_answer, explanation)
VALUES 
(
    'Cấu tạo nguyên tử & Bảng tuần hoàn',
    'Cấu hình electron nguyên tử của nguyên tố Chromium (Z = 24) ở trạng thái cơ bản là:',
    '["[Ar] 3d⁴ 4s²", "[Ar] 3d⁵ 4s¹", "[Ar] 3d⁶ 4s⁰", "[Ar] 4s² 3d⁴"]'::jsonb,
    1, 1,
    'Chromium (Z = 24) có hiện tượng nhảy 1 electron từ 4s sang 3d để đạt cấu hình bán bão hòa d⁵ bền vững hơn: [Ar] 3d⁵ 4s¹.'
),
(
    'Liên kết hóa học & Lewis',
    'Phân tử nào sau đây có cấu trúc hình học tứ diện đều và góc liên kết xấp xỉ 109.5°?',
    '["H₂O (Gấp khúc)", "NH₃ (Chóp tam giác)", "CH₄ (Tứ diện đều)", "CO₂ (Thẳng hàng)"]'::jsonb,
    2, 2,
    'Trong phân tử CH₄, nguyên tử C ở trạng thái lai hóa sp³ với 4 liên kết C-H tương đương hướng về 4 đỉnh của tứ diện đều, góc liên kết 109.5°.'
),
(
    'Phản ứng Oxi hóa - Khử',
    'Trong phản ứng: Fe + 4HNO₃ (loãng) → Fe(NO₃)₃ + NO↑ + 2H₂O, tỉ lệ giữa số phân tử HNO₃ đóng vai trò chất oxi hóa và số phân tử HNO₃ tạo muối là:',
    '["1 : 3", "1 : 4", "3 : 1", "1 : 1"]'::jsonb,
    0, 0,
    'Trong 4 phân tử HNO₃ tham gia phản ứng: 1 phân tử bị khử xuống NO (chất oxi hóa), 3 phân tử giữ nguyên số oxi hóa +5 trong gốc NO₃⁻ tạo muối Fe(NO₃)₃.'
),
(
    'Hóa học Hữu cơ & Phổ IR',
    'Trên phổ hồng ngoại (IR) của hợp chất hữu cơ X, tín hiệu hấp thụ mạnh đặc trưng ở vùng 1715 cm⁻¹ chứng minh sự hiện diện của nhóm chức nào?',
    '["Nhóm hydroxy (-OH)", "Nhóm carbonyl (>C=O)", "Nhóm amine (-NH₂)", "Liên kết ba carbon-carbon (-C≡C-)"]'::jsonb,
    1, 1,
    'Peak hấp thụ mạnh, nhọn trong khoảng 1680 - 1750 cm⁻¹ là tín hiệu đặc trưng của liên kết C=O trong nhóm carbonyl (aldehyde, ketone, ester, carboxylic acid).'
),
(
    'Năng lượng Hóa học & Enthalpy',
    'Phản ứng tỏa nhiệt là phản ứng có biến thiên enthalpy chuẩn (ΔᵣH°₂₉₈):',
    '["ΔᵣH°₂₉₈ > 0", "ΔᵣH°₂₉₈ < 0", "ΔᵣH°₂₉₈ = 0", "ΔᵣH°₂₉₈ ≥ 0"]'::jsonb,
    1, 1,
    'Theo quy ước nhiệt động hóa học chuẩn: Phản ứng tỏa nhiệt giải phóng năng lượng ra môi trường nên ΔᵣH°₂₉₈ mang giá trị âm (< 0).'
)
ON CONFLICT DO NOTHING;
