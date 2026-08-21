# TÀI LIỆU CHI TIẾT TỪNG CHỨC NĂNG & FUNCTION TRONG HCC-CHEMAI

Dự án **HCC-ChemAI** là Hệ thống Trợ lý & Mô phỏng Hóa học Lớp 10 (Chuẩn chương trình GDPT 2018), được phát triển bằng **Next.js 16 (App Router), React 19, TypeScript, Material UI (MUI), Three.js / React Three Fiber, Chart.js, Supabase, Google Gemini API và Dify AI**.

---

## 1. Module Cốt Lõi Tích Hợp API (`src/lib/api.ts`)

File [`src/lib/api.ts`](../src/lib/api.ts) đóng vai trò là tầng dịch vụ (Service Layer) kết nối toàn bộ hệ thống với Backend và AI APIs.

### 1.1. Khởi tạo Supabase Client
```typescript
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```
- **Nhiệm vụ**: Tạo kết nối singleton tới Supabase backend thông qua biến môi trường `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 1.2. `callGeminiAPI(prompt: string, keys?: string[]): Promise<string>`
- **Mục đích**: Gửi prompt tới Google Generative Language API (Gemini).
- **Cơ chế hoạt động**:
  1. Hỗ trợ truyền vào danh sách nhiều API Keys (xoay vòng tránh cạn kiệt Quota / Rate Limit).
  2. Thử lần lượt qua 3 model: `gemini-3.6-flash` $\rightarrow$ `gemini-3.5-flash` $\rightarrow$ `gemini-flash-latest`.
  3. Sử dụng `AbortController` với giới hạn **timeout 30 giây** để tránh treo tiến trình người dùng.
  4. Nếu gặp mã lỗi `403`, `429` (Quota / Permission), tự động chuyển tiếp sang Key / Model kế tiếp.

### 1.3. `generateLessonPlanWithDify({ topic, grade, duration, prompt })`
- **Mục đích**: Tích hợp nền tảng **Dify AI** chuyên trách cho chức năng Soạn Giáo Án 5512 BGD&ĐT.
- **Cơ chế hoạt động**: Gửi HTTP POST request đến Dify API (`/chat-messages`) kèm payload input (`topic`, `grade`, `duration`) và prompt. Nếu Dify API Key chưa cấu hình hoặc lỗi, hệ thống tự động fallback sang `callGeminiAPI` để đảm bảo không bị gián đoạn.

### 1.4. `sendDifyMessage({ query, user, conversation_id, inputs })`
- **Mục đích**: Gửi tin nhắn trò chuyện đến Chatbot / Workflow trên nền tảng **Dify.ai**.
- **Cơ chế hoạt động**: Gửi HTTP POST request đến endpoint `/chat-messages` với payload JSON.

### 1.4. `generateParamHash(...)`
```typescript
export async function generateParamHash(
  inputA: string, volA: number, concA: number,
  inputB: string, volB: number, concB: number,
  temp: number, indicator: string
): Promise<string>
```
- **Mục đích**: Tạo mã băm duy nhất SHA-256 đại diện cho cấu hình thí nghiệm để làm `cache_key`.
- **Cơ chế hoạt động**:
  - Chuẩn hóa tên chất $A$ và $B$ (viết thường, loại bỏ khoảng trắng thừa).
  - Sắp xếp theo thứ tự từ điển ($A \le B$) để phản ứng $A+B$ và $B+A$ có cùng mã băm.
  - Sử dụng Web Crypto API `crypto.subtle.digest("SHA-256", ...)` tạo chuỗi hex.

### 1.5. `playBubbleSoundEffect()`
- **Mục đích**: Tạo âm thanh sủi bọt khí trực tiếp trên trình duyệt mà không cần tải file MP3.
- **Cơ chế hoạt động**:
  - Sử dụng `AudioContext` nguyên sinh của Web Audio API.
  - Tạo 6 nút sóng `OscillatorNode` (dạng `sine`, tần số ngẫu nhiên 250 - 600 Hz) cách nhau 180ms.
  - Điều chỉnh âm lượng giảm dần theo hàm mũ với `gain.exponentialRampToValueAtTime`.

---

## 2. Thí Nghiệm Ảo Hóa Học 10 (`src/components/VirtualLab.tsx`)

Mô phỏng chân thực các phản ứng hóa học tiêu biểu lớp 10 theo thời gian thực.

### 2.1. Cấu trúc State & Dữ liệu
- `PRESETS`: 8 thí nghiệm chuẩn GDPT 2018 ($\text{NaOH}+\text{HCl}$, $\text{Na}+\text{H}_2\text{O}$, $\text{Zn}+\text{H}_2\text{SO}_4$, $\text{Fe}+\text{CuSO}_4$, $\text{KMnO}_4+\text{HCl}$, $\text{KI}+\text{Cl}_2$, $\text{AgNO}_3+\text{NaCl}$, $\text{BaCl}_2+\text{H}_2\text{SO}_4$).
- `SimulationResult`: Interface chứa dữ liệu phản ứng do AI tính toán (phương trình ion, hiện tượng quan sát, pH, màu sắc dung dịch, có bọt khí/kết tủa/khói/lóe sáng/mặt gương hay không).

### 2.2. Các hàm cốt lõi
- **`handleLoadPreset(p: PresetReaction)`**: Gán giá trị chất, thể tích, nồng độ từ preset vào state và kích hoạt `runSimulation`.
- **`applyKineticSpeed(temperature)`**: Tính toán tốc độ phản ứng theo nhiệt độ thực nghiệm (động học Arrhenius) và cập nhật biến CSS toàn cục `--anim-speed`, `--skitter-speed`, `--dissolve-speed`.
- **`runSimulation(...)`**:
  1. Kiểm tra cache trong Supabase bảng `experiments`. Nếu có kết quả sẵn, nạp ngay trong 0ms.
  2. Nếu chưa có, gửi prompt có cấu trúc chặt chẽ yêu cầu Gemini tính toán phương trình, số mol dư, màu dung dịch, sinh kết tủa, bọt khí, khói.
  3. Ghi kết quả mới vào Supabase (`upsert`).
  4. Tạo hoạt ảnh hạt bọt khí (`bubbles`), luồng khói (`fumes`), thanh kim loại tan dần, và cập nhật biểu đồ pH/nhiệt độ bằng Chart.js.

---

## 3. Gia Sư AI - ChemAI Buddy (`src/components/DifyChatTutor.tsx`)

- **Chức năng**: Cung cấp trợ lý học tập cá nhân hóa cho học sinh sử dụng Google Gemini AI (`callGeminiAPI`).
- **Hàm `handleSend()`**:
  - Ghi nhận câu hỏi từ ô nhập liệu, lưu giữ lịch sử hội thoại gần nhất.
  - Gửi prompt kèm ngữ cảnh Hóa học Lớp 10 GDPT 2018 tới **Gemini AI**.
  - Hiển thị Markdown hỗ trợ công thức hóa học, bảng số liệu và danh sách gợi ý.
  - Tự động ghi nhật ký vào Supabase `chat_logs` phục vụ kiểm duyệt của giáo viên.

---

## 4. Thử Thách Trắc Nghiệm & Đấu Trường Kahoot (`src/components/QuizKahootTab.tsx`)

Bao gồm 2 chế độ:
- **Luyện tập cá nhân (Solo Mode)**:
  - `fetchSoloQuestions()`: Lấy câu hỏi từ bảng `quiz_questions` hoặc nhờ Gemini sinh bộ 5 câu hỏi mới theo chủ đề.
  - `handleSelectSoloAnswer()`: Ghi nhận đáp án, chấm điểm và hiển thị giải thích chi tiết.
- **Đấu trường Live (Kahoot Arena)**:
  - `handleJoinRoom()`: Nhập PIN phòng thi, kiểm tra phòng trong bảng `rooms`, đăng ký học sinh vào `room_participants`.
  - `handleAnswerLiveQuestion()`: Tính điểm cộng theo tốc độ phản hồi và cập nhật `score` trực tiếp lên Supabase.
  - Hiển thị bảng vinh danh Top 3 khi kết thúc.

---

## 5. An Toàn Phòng Thí Nghiệm & Mô Hình 3D Liên Kết (`src/components/SafetyTab.tsx` & `src/components/ChemicalBondViewer3D.tsx`)

### 5.1. An Toàn Hóa Chất & Sơ Cứu (`SafetyTab.tsx`)
- Cung cấp sổ tay nhận diện biểu tượng nguy hiểm theo chuẩn quốc tế GHS (chất ăn mòn, độc hại, dễ cháy nổ, oxy hóa mạnh).
- Quy trình sơ cứu khẩn cấp: xử lý bỏng acid $H_2SO_4$, bỏng kiềm $NaOH$, ngộ độc khí $Cl_2$, dập lửa kim loại kiềm.

---

### 5.2. Cơ Chế Hoạt Động & Toán Học Tạo Mô Hình 3D Liên Kết (`ChemicalBondViewer3D.tsx`)

Mô hình 3D được xây dựng trên sự kết hợp giữa **Three.js**, **React Three Fiber (R3F)** và **Drei**, cho phép trực quan hóa cấu trúc nguyên tử, dạng hình học không gian phân tử và các loại liên kết hóa học.

```
+-------------------------------------------------------------------------------+
|                             <Canvas> Viewport                                 |
|  [Camera: position=(0,0,5), fov=50]  [OrbitControls: rotate/zoom/autoRotate]  |
|  [Hệ thống Chiếu sáng: ambientLight(0.7) + pointLight(1.2) + dirLight(0.5)]   |
|                                                                               |
|            <Atom /> (SphereGeometry)          <Bond /> (CylinderGeometry)      |
|         - Vị trí: [x, y, z]                - Điểm đầu A [x1, y1, z1]          |
|         - Màu CPK quốc tế                  - Điểm cuối B [x2, y2, z2]         |
|         - StandardMaterial PBR             - Tính Vector khoảng cách L        |
|         - <Html> 2D Badge Label            - Xoay hướng bằng Matrix4 Rotation |
+-------------------------------------------------------------------------------+
```

#### A. Cấu trúc Khung cảnh 3D (Scene & Camera Pipeline)
1. **Thiết lập Camera & Viewport (`<Canvas>`):**
   - Camera phối cảnh (Perspective Camera) đặt tại tọa độ $[0, 0, 5]$ với góc nhìn (Field of View - FOV) $50^\circ$.
   - `<OrbitControls>` cho phép người dùng dùng chuột kéo để xoay 360 độ quanh tâm phân tử, cuộn chuột để phóng to/thu nhỏ (Zoom), đồng thời tích hợp `autoRotate` với tốc độ quay 1.5 vòng/phút giúp tăng tính trực quan.
2. **Hệ thống ánh sáng 3 nguồn (3-Point Lighting):**
   - `<ambientLight intensity={0.7} />`: Ánh sáng môi trường dịu nhẹ, đảm bảo không có vùng nào bị đen hoàn toàn.
   - `<pointLight position={[10, 10, 10]} intensity={1.2} />`: Nguồn sáng điểm tạo điểm phản chiếu bóng loáng (specular highlight) trên bề mặt nguyên tử.
   - `<directionalLight position={[-10, -10, -5]} intensity={0.5} />`: Nguồn sáng định hướng tạo chiều sâu khối (shading) giữa các mặt phân tử.

#### B. Khởi tạo Nguyên tử (`Atom Component`)
Mỗi nguyên tử là một nhóm đối tượng 3D (`<group>`) bao gồm:
1. **Hình cầu 3D (`SphereGeometry`):**
   ```typescript
   <sphereGeometry args={[radius, 32, 32]} />
   ```
   Tạo khối cầu mịn với 32 phân đoạn kinh tuyến và vĩ tuyến. Bán kính $radius$ được chuẩn hóa tỉ lệ theo bán kính Van der Waals hoặc bán kính cộng hóa trị của từng nguyên tố (ví dụ: $H=0.35, C=0.55, O=0.5, Cl=0.6, S=0.65$).
2. **Vật liệu PBR (`meshStandardMaterial`):**
   - `roughness={0.3}` (độ nhám thấp) và `metalness={0.2}` (độ kim loại nhẹ) tạo bề mặt phản quang chân thực.
   - Hệ màu quy chuẩn theo bảng màu CPK quốc tế:
     - **Hydro (H)**: Trắng `#f8fafc`
     - **Cacbon (C)**: Xám đậm `#334155`
     - **Oxi (O)**: Đỏ tươi `#ef4444`
     - **Nito (N)**: Xanh dương `#3b82f6`
     - **Clo (Cl)**: Xanh lá `#22c55e`
     - **Natri (Na⁺)**: Tím `#a855f7`
     - **Lưu huỳnh (S)**: Vàng `#eab308`
     - **Brom (Br)**: Nâu đỏ `#991b1b`
3. **Nhãn 2D Billboard (`<Html>` từ `@react-three/drei`):**
   - Đặt tại tọa độ $[0, radius + 0.3, 0]$ phía trên nguyên tử.
   - Tự động xoay mặt theo hướng camera (Billboard effect) giúp hiển thị tên nguyên tố ($H_1, H_2, O, C, Na^+, Cl^-$) rõ ràng ở mọi góc nhìn.

#### C. Thuật Toán Vector & Ma Trận Định Vị Liên Kết (`Bond Component`)
Một liên kết hóa học là một hình trụ (`<cylinderGeometry>`) nối giữa 2 nguyên tử tại điểm đầu $\vec{A}(x_1, y_1, z_1)$ và điểm cuối $\vec{B}(x_2, y_2, z_2)$. 

Hình trụ mặc định trong Three.js có tâm tại gốc tọa độ $(0,0,0)$ và hướng dọc theo trục thẳng đứng $Y = (0, 1, 0)$. Để xoay và đặt hình trụ khớp chính xác giữa 2 nguyên tử, component thực hiện các bước toán học:

```typescript
function Bond({ start, end, color = "#94a3b8", radius = 0.08 }: BondProps) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  
  // 1. Tính vector định hướng và chiều dài liên kết
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  
  // 2. Tính tọa độ trung điểm đặt liên kết
  const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);

  // 3. Tính trục xoay và góc xoay từ vector chuẩn (0, 1, 0) sang vector định hướng
  const orientation = new THREE.Matrix4();
  const dirNormalized = direction.clone().normalize();
  const yAxis = new THREE.Vector3(0, 1, 0);
  
  // Trục xoay = Tích có hướng của (0,1,0) và vector chỉ phương
  const rotationAxis = yAxis.cross(dirNormalized).normalize();
  
  // Góc xoay = arccos của tích vô hướng
  const rotationAngle = Math.acos(yAxis.dot(dirNormalized));

  // 4. Thiết lập ma trận xoay nếu 2 vector không trùng phương
  if (rotationAxis.lengthSq() > 0) {
    orientation.makeRotationAxis(rotationAxis, rotationAngle);
  }

  return (
    <mesh position={position} rotation={new THREE.Euler().setFromRotationMatrix(orientation)}>
      <cylinderGeometry args={[radius, radius, length, 16]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}
```

**Các bước tính toán:**
1. **Tính độ dài liên kết ($L$):**
   $$L = \|\vec{B} - \vec{A}\| = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$
2. **Tính vị trí đặt tâm hình trụ ($\vec{M}$):**
   $$\vec{M} = \frac{\vec{A} + \vec{B}}{2} = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}, \frac{z_1+z_2}{2}\right)$$
3. **Tính trục xoay ($\vec{u}$) bằng Tích có hướng (Cross Product):**
   $$\vec{u} = \vec{Y}_0 \times \hat{D} \quad (\text{với } \vec{Y}_0 = (0, 1, 0), \hat{D} = \frac{\vec{D}}{\|\vec{D}\|})$$
4. **Tính góc xoay ($\theta$) bằng Tích vô hướng (Dot Product):**
   $$\theta = \arccos(\vec{Y}_0 \cdot \hat{D})$$
5. **Tạo ma trận xoay (`makeRotationAxis`):** Dùng công thức Rodrigues để biến đổi vector cột trụ $Y$ hướng chính xác theo đường nối $AB$.

#### D. Biểu diễn Các Loại Liên Kết Hóa Học Lớp 10
1. **Liên kết đơn ($H_2O, CH_4, HCl, Cl_2$):** Sử dụng 1 cylinder có bán kính `radius = 0.08`.
2. **Liên kết đôi ($CO_2$):** Tạo 2 cylinder song song bằng cách tịnh tiến tọa độ $y$ một khoảng $\Delta y = \pm 0.1$:
   - `start: [0, 0.1, 0] -> end: [1.6, 0.1, 0]`
   - `start: [0, -0.1, 0] -> end: [1.6, -0.1, 0]`
3. **Liên kết ba ($CO$):** Tạo 3 cylinder song song tại $y = +0.1, y = 0, y = -0.1$.
4. **Liên kết Ion ($NaCl, NaOH$):** Biểu diễn bằng ống trụ màu vàng thanh mảnh (`radius = 0.04`, `color = "#eab308"`) mô tả lực hút tĩnh điện giữa cation $Na^+$ và anion $Cl^- / OH^-$.

#### E. Tọa độ Không Gian Các Phân Tử (`MOLECULES`)
Hệ thống lưu trữ cấu trúc hình học chuẩn thực tế:
- **$H_2O$ (Nước - Gấp khúc $104.5^\circ$):**
  - O: $[0, 0, 0]$
  - $H_1$: $[1.2, -0.7, 0]$, $H_2$: $[-1.2, -0.7, 0]$
- **$CO_2$ (Cacbon đioxit - Thẳng hàng $180^\circ$):**
  - C: $[0, 0, 0]$, $O_1$: $[1.6, 0, 0]$, $O_2$: $[-1.6, 0, 0]$
- **$CH_4$ (Metan - Tứ diện đều $109.5^\circ$):**
  - C: $[0, 0, 0]$
  - $H_1$: $[0, 1.3, 0]$, $H_2$: $[1.2, -0.4, 0]$, $H_3$: $[-0.6, -0.4, 1.0]$, $H_4$: $[-0.6, -0.4, -1.0]$
- **$NH_3$ (Amoniac - Chóp tam giác $107^\circ$):**
  - N: $[0, 0.4, 0]$ (đỉnh chóp)
  - $H_1$: $[0, -0.5, 1.1]$, $H_2$: $[1.0, -0.5, -0.6]$, $H_3$: $[-1.0, -0.5, -0.6]$
- **$H_2SO_4$ (Axit sunfuric - Tứ diện $S$ trung tâm nối 4 nguyên tử $O$ và 2 nguyên tử $H$).**
- **$HNO_3, SO_2, Br_2, NaCl, NaOH, CO, HCl$.**

---

## 6. Soạn Giáo Án Chuẩn Công Văn 5512 (`src/components/LessonPlanner.tsx`)

- **Tích hợp Dify AI Engine**: Sử dụng hàm `generateLessonPlanWithDify({ topic, grade, duration, prompt })` gửi payload lên Dify AI để biên soạn giáo án Hóa học theo quy chuẩn Công văn 5512 BGD&ĐT.
- **Tiến trình 4 hoạt động chuẩn**:
  1. Hoạt động 1: Mở đầu / Khởi động (kết nối tình huống thực tiễn).
  2. Hoạt động 2: Hình thành kiến thức mới & Thí nghiệm ảo ChemAI.
  3. Hoạt động 3: Luyện tập (trắc nghiệm Kahoot & câu hỏi tư duy).
  4. Hoạt động 4: Vận dụng & Dự án STEM sáng tạo.
- **`handleExportWord()`**: Tạo file Word `.doc` theo đúng chuẩn font Times New Roman 13-14pt, cấu trúc heading, bullet point và căn lề chuẩn văn bản hành chính để giáo viên tải về dùng ngay.
- **Lưu trữ CSDL**: Tự động lưu trữ giáo án vào Supabase bảng `experiments` với định dạng cache_key `lesson_plan_*` giúp tra cứu lịch sử nhanh chóng.

---

## 7. Soạn & Chấm Đề Thi Trắc Nghiệm - Tự Luận (`src/components/ExamManager.tsx`)

- **`generateExamPaper()`**: Thiết kế ma trận đề thi phân bổ 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) theo định dạng đề thi mới của Bộ Giáo dục & Đào tạo.
- Xuất đề thi gồm 3 phần: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai, Câu hỏi ngắn/Tự luận kèm bảng ma trận, đáp án và biểu điểm chi tiết.

---

## 8. Thiết Kế Dự Án STEM Hóa Học 10 (`src/components/StemProjects.tsx`)

- Cung cấp các dự án STEM mẫu ứng dụng thực tế:
  - Chiết xuất chất chỉ thị màu tự nhiên từ bắp cải tím.
  - Tái chế dầu ăn thừa thành xà phòng handmade.
  - Chế tạo pin điện hóa từ quả chanh.
- **`generateCustomStem()`**: Cho phép tạo dự án STEM tùy biến theo yêu cầu, xây dựng bảng tiêu chí đánh giá Rubric và lưu trữ trên Supabase.

---

## 9. Bảng Quản Trị Giáo Viên (`src/components/AuditTab.tsx`)

- **Quản lý phòng thi Live**:
  - `createRoom()`: Tạo mã PIN ngẫu nhiên 6 số, chọn chủ đề và số lượng câu hỏi, ghi vào bảng `rooms`.
  - `startGame()` / `endGame()`: Chuyển đổi trạng thái phòng thi (`waiting` $\rightarrow$ `active` $\rightarrow$ `finished`).
  - Giám sát học sinh tham gia và điểm số theo thời gian thực.
- **Quản trị nội dung**:
  - Kiểm duyệt, chỉnh sửa hoặc xóa bộ nhớ đệm thí nghiệm, giáo án, đề thi và dự án STEM đã lưu trên Supabase.
