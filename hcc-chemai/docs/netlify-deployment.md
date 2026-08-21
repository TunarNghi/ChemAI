# HƯỚNG DẪN DEPLOY HCC-CHEMAI LÊN NETLIFY (https://app.netlify.com/)

Tài liệu này hướng dẫn từng bước triển khai ứng dụng Next.js **HCC-ChemAI** lên nền tảng **Netlify**.

---

## 1. Chuẩn Bị File Cấu Hình `netlify.toml`

Để Netlify tự động nhận diện Next.js App Router và cấu hình build tối ưu, file [`netlify.toml`](../netlify.toml) được đặt tại thư mục gốc của project:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 2. Phương Pháp 1: Triển Khai Qua GitHub (Khuyên Dùng)

### Bước 1: Đẩy mã nguồn lên kho chứa GitHub
Tại thư mục `hcc-chemai`, mở terminal và thực hiện:
```bash
git init
git add .
git commit -m "feat: setup hcc-chemai for netlify deployment"
git branch -M main
git remote add origin https://github.com/<your-github-username>/hcc-chemai.git
git push -u origin main
```

### Bước 2: Liên kết Netlify với GitHub
1. Truy cập [https://app.netlify.com/](https://app.netlify.com/) và đăng nhập.
2. Nhấn nút **Add new site** $\rightarrow$ chọn **Import an existing project**.
3. Chọn **GitHub** và cấp quyền truy cập cho Netlify.
4. Tìm và chọn repository `hcc-chemai` vừa tạo.

### Bước 3: Cấu hình Build & Output Settings
- **Base directory**: để trống (nếu repository là thư mục gốc của project) hoặc `edu/hcc-chemai` (nếu đưa cả monorepo lên).
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### Bước 4: Thiết lập Biến Môi Trường (Environment Variables)
Trong mục **Environment variables**, bấm **Add a variable** (hoặc **Import from .env**) và thêm các biến:

| Key | Giá trị mẫu | Ghi chú |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | URL kết nối Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` | Public Anonymous Key của Supabase |
| `NEXT_PUBLIC_GEMINI_API_KEYS` | `AIzaSyD...` | API Key Google Gemini (cho Gia Sư AI, Thí nghiệm ảo, Kahoot, Đề thi, STEM) |
| `NEXT_PUBLIC_DIFY_API_KEY` | `app-xxxx` | API Key ứng dụng Dify chuyên trách Soạn Giáo Án 5512 |
| `NEXT_PUBLIC_DIFY_API_URL` | `https://api.dify.ai/v1` | URL API Dify (mặc định) |
| `NEXT_PUBLIC_TEACHER_AUDIT_PASSWORD` | `chemai2026` | Mật khẩu truy cập Cổng Giáo viên Audit |

### Bước 5: Tiến hành Deploy
Nhấn nút **Deploy site**. Hệ thống Netlify sẽ bắt đầu quá trình cài đặt dependencies, build ứng dụng và xuất bản bản chạy trực tuyến.

---

## 3. Phương Pháp 2: Triển Khai Nhanh Bằng Netlify CLI

Nếu bạn muốn deploy trực tiếp từ máy cục bộ mà không cần thông qua GitHub:

1. **Cài đặt Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Đăng nhập vào tài khoản Netlify**:
   ```bash
   netlify login
   ```

3. **Khởi tạo Site trên Netlify**:
   ```bash
   netlify init
   ```
   - Chọn *Create & configure a new site*.
   - Đặt tên site theo mong muốn (ví dụ: `hcc-chemai-2026`).

4. **Thêm biến môi trường vào Netlify**:
   ```bash
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://your-project.supabase.co"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key"
   netlify env:set NEXT_PUBLIC_GEMINI_API_KEYS "your-gemini-key"
   ```

5. **Build và Deploy Production**:
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

Sau khi hoàn tất, Netlify CLI sẽ hiển thị đường link trực tiếp (ví dụ: `https://hcc-chemai-2026.netlify.app`) để truy cập ngay lập tức.
