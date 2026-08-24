const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} = require('docx');

async function generateDocx() {
  const primaryColor = "0284C7"; // Cyan/Sky Blue
  const secondaryColor = "1E293B"; // Slate 800
  const headerBgColor = "0F172A"; // Dark Slate
  const tableHeaderBg = "E0F2FE"; // Light Blue
  const lightGreyBg = "F8FAFC";

  const createHeading1 = (text) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 180 },
      children: [
        new TextRun({
          text: text,
          bold: true,
          size: 32, // 16pt
          color: primaryColor,
          font: "Times New Roman"
        })
      ]
    });
  };

  const createHeading2 = (text) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: text,
          bold: true,
          size: 26, // 13pt
          color: secondaryColor,
          font: "Times New Roman"
        })
      ]
    });
  };

  const createHeading3 = (text) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 180, after: 80 },
      children: [
        new TextRun({
          text: text,
          bold: true,
          italics: true,
          size: 24, // 12pt
          color: "334155",
          font: "Times New Roman"
        })
      ]
    });
  };

  const createParagraph = (text, options = {}) => {
    return new Paragraph({
      spacing: { before: 80, after: 120, line: 276 }, // 1.15 line spacing
      alignment: options.alignment || AlignmentType.BOTH,
      children: [
        new TextRun({
          text: text,
          bold: !!options.bold,
          italics: !!options.italics,
          size: options.size || 24, // 12pt
          color: options.color || "000000",
          font: "Times New Roman"
        })
      ]
    });
  };

  const createBullet = (label, text) => {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { before: 60, after: 60, line: 276 },
      children: [
        new TextRun({
          text: label ? label + ": " : "",
          bold: true,
          size: 24,
          font: "Times New Roman",
          color: "1E293B"
        }),
        new TextRun({
          text: text,
          size: 24,
          font: "Times New Roman"
        })
      ]
    });
  };

  const createTableCell = (text, isHeader = false, widthPercent = 50) => {
    return new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      shading: {
        fill: isHeader ? tableHeaderBg : "FFFFFF",
        type: ShadingType.CLEAR
      },
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: [
        new Paragraph({
          alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
          children: [
            new TextRun({
              text: text,
              bold: isHeader,
              size: 22,
              font: "Times New Roman",
              color: isHeader ? "0369A1" : "000000"
            })
          ]
        })
      ]
    });
  };

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        children: [
          // TITLE / COVER HEADER
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "DỰ ÁN HCC - CHEMAI",
                bold: true,
                size: 40,
                color: "0369A1",
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 300 },
            children: [
              new TextRun({
                text: "HỆ THỐNG TRỢ LÝ & MÔ PHỎNG HÓA HỌC THPT (GDPT 2018)",
                bold: true,
                size: 26,
                color: "475569",
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 400 },
            children: [
              new TextRun({
                text: "TÀI LIỆU KỸ THUẬT & HƯỚNG DẪN KIẾN TRÚC TOÀN DIỆN",
                italics: true,
                size: 22,
                color: "64748B",
                font: "Times New Roman"
              })
            ]
          }),

          // SECTION 1: TỔNG QUAN DỰ ÁN
          createHeading1("1. TỔNG QUAN DỰ ÁN"),
          createParagraph(
            "HCC - ChemAI là nền tảng số hóa giáo dục chuyên sâu dành cho môn Hóa học THPT theo định hướng Chương trình Giáo dục Phổ thông 2018. Dự án kết hợp công nghệ Trí tuệ nhân tạo (Generative AI), công nghệ mô phỏng 3D tương tác theo thời gian thực và nền tảng đấu trường học tập trực tuyến nhằm nâng cao chất lượng dạy và học môn Hóa học."
          ),
          createBullet("Tên dự án", "HCC - ChemAI (Chemistry AI Assistant & Virtual Laboratory)"),
          createBullet("Đối tượng phục vụ", "Học sinh THPT, Giáo viên bộ môn Hóa học, Tổ chuyên môn Nhà trường"),
          createBullet("Định hướng chương trình", "Chuẩn GDPT 2018, Công văn 5512/BGDĐT, Định dạng cấu trúc đề thi mới của BGD&ĐT"),
          createBullet("Môi trường triển khai", "Web Application (Đa nền tảng PC, Tablet, Smartphone, Bảng tương tác thông minh)"),

          // SECTION 2: CÔNG NGHỆ & KIẾN TRÚC
          createHeading1("2. KIẾN TRÚC CÔNG NGHỆ (TECH STACK)"),
          createParagraph("Hệ thống được phát triển trên nền tảng công nghệ hiện đại, tối ưu hiệu năng và trải nghiệm người dùng:"),
          
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("Thành phần", true, 30),
                  createTableCell("Công nghệ sử dụng", true, 35),
                  createTableCell("Vai trò & Mô tả", true, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("Frontend Framework", false, 30),
                  createTableCell("Next.js 16 (App Router) + React 19 + TypeScript", false, 35),
                  createTableCell("Cung cấp giao diện hiện đại, tối ưu SSR/CSR và xử lý tương tác động mượt mà", false, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("Giao diện & Thiết kế", false, 30),
                  createTableCell("Material UI (MUI v6) + Emotion + Tailwind CSS v4 + Lucide Icons", false, 35),
                  createTableCell("Thiết kế giao diện kính mờ (Glassmorphism), bảng điều khiển khoa học và biểu tượng trực quan", false, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("Đồ họa 3D & Trực quan", false, 30),
                  createTableCell("Three.js + React Three Fiber + Drei", false, 35),
                  createTableCell("Mô phỏng mô hình nguyên tử, góc liên kết và dạng hình học không gian phân tử 3D", false, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("Biểu đồ khoa học", false, 30),
                  createTableCell("Chart.js + React ChartJS 2", false, 35),
                  createTableCell("Vẽ đường cong pH và nhiệt độ phản ứng biến thiên theo thời gian", false, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("Âm thanh mô phỏng", false, 30),
                  createTableCell("Web Audio API (Synthesizer)", false, 35),
                  createTableCell("Tạo âm thanh sủi bọt khí thực tế bằng bộ dao động sóng không cần file MP3", false, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("Backend & Database", false, 30),
                  createTableCell("Supabase (PostgreSQL + Realtime)", false, 35),
                  createTableCell("Lưu trữ bộ đệm thí nghiệm, câu hỏi, tài liệu và đồng bộ hóa phòng thi trực tiếp", false, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("AI Core 1: Gemini", false, 30),
                  createTableCell("Google Gemini API (3.6-flash / 3.5-flash)", false, 35),
                  createTableCell("Xử lý tính toán hóa học, gia sư AI, sinh đề thi, dự án STEM và trắc nghiệm", false, 35),
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("AI Core 2: Dify AI", false, 30),
                  createTableCell("Dify.ai Engine API", false, 35),
                  createTableCell("Chuyên trách cấu trúc và biên soạn Kế hoạch bài dạy chuẩn Công văn 5512", false, 35),
                ]
              }),
            ]
          }),

          // SECTION 3: CHI TIẾT CÁC PHÂN HỆ CHỨC NĂNG
          createHeading1("3. CHI TIẾT CÁC PHÂN HỆ CHỨC NĂNG"),

          createHeading2("3.1. Thí Nghiệm Ảo Hóa Học THPT (VirtualLab.tsx)"),
          createParagraph(
            "Phân hệ Thí nghiệm Ảo cho phép học sinh và giáo viên thực hiện các phản ứng hóa học trực quan trong ống nghiệm ảo mà không gặp nguy hiểm về hóa chất độc hại hay cháy nổ."
          ),
          createBullet("Bộ thí nghiệm mẫu (Presets)", "Tích hợp sẵn 8 phản ứng trọng tâm GDPT 2018 (Trung hòa NaOH + HCl; Kim loại kiềm Na + H2O; Zn + H2SO4; Thế kim loại Fe + CuSO4; Điều chế Cl2 từ KMnO4 + HCl; Halogen đẩy nhau KI + Cl2; Kết tủa AgNO3 + NaCl; BaCl2 + H2SO4)."),
          createBullet("Cơ chế tính toán AI", "Hệ thống tự động tính toán chất hết, chất dư, trạng thái tạo khí, kết tủa (màu sắc và chiều cao lớp kết tủa), luồng khói, hiệu ứng bọt khí và ước lượng pH dung dịch sau phản ứng."),
          createBullet("Động học phản ứng (Arrhenius)", "Tự động điều chỉnh tốc độ hoạt ảnh bọt khí, tốc độ tan của kim loại và nhiệt độ tỏa ra dựa trên nhiệt độ môi trường thiết lập (20°C - 100°C)."),
          createBullet("Bộ đệm tối ưu (ParamHash)", "Tạo mã băm SHA-256 cho từng cặp hóa chất và nồng độ; tự động lưu và lấy kết quả từ Supabase cache trong 0ms giúp tiết kiệm API Quota."),

          createHeading2("3.2. Mô Hình 3D Liên Kết Phân Tử (ChemicalBondViewer3D.tsx)"),
          createParagraph(
            "Trực quan hóa cấu trúc hình học không gian phân tử và các loại liên kết hóa học bằng công nghệ 3D WebGL tương tác xoay 360 độ và phóng to thu nhỏ."
          ),
          createBullet("Bảng màu chuẩn CPK", "Gán màu sắc quy chuẩn quốc tế cho từng nguyên tố (H: trắng, C: xám đen, O: đỏ, N: xanh dương, Cl: xanh lá, Na: tím, S: vàng)."),
          createBullet("Thuật toán định vị liên kết", "Sử dụng phép biến đổi Vector (Cross Product & Dot Product) và ma trận xoay Matrix4 để tạo các hình trụ liên kết nối chính xác giữa tâm 2 nguyên tử trong không gian 3D."),
          createBullet("Đa dạng liên kết", "Biểu diễn đầy đủ liên kết đơn, liên kết đôi (2 cylinder song song), liên kết ba và liên kết ion tĩnh điện."),
          createBullet("Thư viện phân tử phong phú", "Bao gồm H2O (gấp khúc 104.5°), CO2 (thẳng hàng 180°), CH4 (tứ diện đều 109.5°), NH3 (chóp tam giác 107°), H2SO4, HNO3, SO2, Br2, NaCl, NaOH, CO, HCl."),

          createHeading2("3.3. Gia Sư Hóa Học AI (DifyChatTutor.tsx)"),
          createParagraph(
            "Trợ lý AI thông minh đóng vai trò gia sư 24/7 đồng hành cùng học sinh trong quá trình tự học."
          ),
          createBullet("Khả năng giải đáp", "Giải thích cơ chế phản ứng, bản chất liên kết, cân bằng phương trình phản ứng oxi hóa - khử bằng phương pháp thăng bằng electron."),
          createBullet("Giao diện tương tác", "Hỗ trợ định dạng Markdown, công thức hóa học có chỉ số trên/dưới rõ ràng, cung cấp các câu hỏi gợi ý nhanh."),
          createBullet("Kiểm duyệt học đường", "Lưu trữ toàn bộ lịch sử hội thoại lên bảng chat_logs để giáo viên giám sát tiến độ và chất lượng hỏi đáp."),

          createHeading2("3.4. Đấu Trường Live & Trắc Nghiệm Kahoot (QuizKahootTab.tsx)"),
          createParagraph(
            "Cung cấp 2 chế độ luyện tập giúp tăng tính hấp dẫn và thi đua trong học tập:"
          ),
          createBullet("Chế độ cá nhân (Solo Mode)", "Học sinh tự luyện tập với hệ thống chuỗi trả lời đúng (Streak), tính điểm thưởng và xem giải thích chi tiết cho từng đáp án."),
          createBullet("Chế độ Đấu trường Trực tiếp (Kahoot Arena)", "Giáo viên tạo phòng thi với mã PIN 6 chữ số; học sinh tham gia đồng bộ thời gian thực qua Supabase Realtime; tính điểm cộng dồn theo thời gian phản hồi và vinh danh Top 3 bảng xếp hạng."),

          createHeading2("3.5. Soạn Kế Hoạch Bài Dạy 5512 (LessonPlanner.tsx)"),
          createParagraph(
            "Tự động hóa quy trình soạn giáo án môn Hóa học cho giáo viên theo đúng mẫu chuẩn Công văn 5512/BGDĐT."
          ),
          createBullet("Cấu trúc 4 hoạt động", "Bao gồm Hoạt động 1 (Mở đầu/Khởi động), Hoạt động 2 (Hình thành kiến thức mới kết hợp ChemAI), Hoạt động 3 (Luyện tập trắc nghiệm), Hoạt động 4 (Vận dụng & STEM)."),
          createBullet("Xuất file Word chuyên nghiệp", "Hỗ trợ tải về file văn bản định dạng chuẩn để giáo viên có thể chỉnh sửa và in ấn ngay."),

          createHeading2("3.6. Soạn & Chấm Đề Thi Định Dạng Mới (ExamManager.tsx)"),
          createParagraph(
            "Hỗ trợ giáo viên thiết kế đề kiểm tra và đề thi thử theo cấu trúc định dạng mới nhất của Bộ Giáo dục & Đào tạo."
          ),
          createBullet("Phân bổ 3 phần chuẩn", "Phần I: Câu trắc nghiệm nhiều lựa chọn; Phần II: Câu trắc nghiệm Đúng/Sai; Phần III: Câu hỏi trắc nghiệm trả lời ngắn / Tự luận."),
          createBullet("Ma trận kiến thức", "Phân bổ câu hỏi theo 4 mức độ nhận thức: Nhận biết, Thông hiểu, Vận dụng và Vận dụng cao kèm thang điểm chi tiết."),

          createHeading2("3.7. Thiết Kế Dự Án STEM Hóa Học (StemProjects.tsx)"),
          createParagraph(
            "Gợi ý và thiết kế các dự án trải nghiệm STEM Hóa học thực tế gắn liền với đời sống (như làm xà phòng từ dầu ăn thừa, chất chỉ thị màu tự nhiên, pin điện hóa quả chanh) kèm bảng tiêu chí đánh giá năng lực Rubric."
          ),

          createHeading2("3.8. An Toàn Phòng Thí Nghiệm & Sơ Cứu (SafetyTab.tsx)"),
          createParagraph(
            "Cung cấp cẩm nang số về an toàn hóa chất theo chuẩn GHS (chất ăn mòn, dễ cháy, độc hại) và các bước xử trí sơ cứu ban đầu khi xảy ra tai nạn hóa chất (bỏng axit, bỏng kiềm, hít phải khí độc)."
          ),

          createHeading2("3.9. Cổng Quản Trị Giáo Viên (AuditTab.tsx)"),
          createParagraph(
            "Khu vực bảo mật dành cho giáo viên và quản trị viên trường học quản lý phòng thi trực tiếp, kiểm duyệt dữ liệu câu hỏi, tra cứu nhật ký học tập và quản lý kho lưu trữ."
          ),

          // SECTION 4: CƠ SỞ DỮ LIỆU
          createHeading1("4. THIẾT KẾ CƠ SỞ DỮ LIỆU (SUPABASE SCHEMA)"),
          createParagraph(
            "Cơ sở dữ liệu của ChemAI được thiết kế trên PostgreSQL (Supabase) với cấu trúc phân tán và kích hoạt cơ chế Realtime đồng bộ:"
          ),
          createBullet("experiments", "Lưu trữ bộ nhớ đệm (cache) kết quả mô phỏng thí nghiệm, giáo án 5512, đề thi và dự án STEM với khóa chính cache_key."),
          createBullet("quiz_questions", "Ngân hàng câu hỏi trắc nghiệm phân loại theo chủ đề, danh sách lựa chọn, đáp án đúng và lời giải thích."),
          createBullet("rooms", "Quản lý phòng thi đấu trường trực tiếp (room_pin, chủ đề, trạng thái waiting/active/finished, danh sách câu hỏi)."),
          createBullet("room_participants", "Danh sách thí sinh tham gia phòng thi kèm điểm số và mảng câu trả lời thời gian thực."),
          createBullet("chat_logs", "Nhật ký hội thoại giữa học sinh và Gia sư AI phục vụ kiểm duyệt học đường."),

          // SECTION 5: HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY
          createHeading1("5. HƯỚNG DẪN CÀI ĐẶT VÀ VẬN HÀNH"),
          createHeading2("5.1. Yêu cầu hệ thống"),
          createBullet("Node.js", "Phiên bản 18.x trở lên (khuyến nghị Node 20.x hoặc 24.x)"),
          createBullet("Trình quản lý gói", "npm (v10 trở lên) hoặc pnpm / yarn"),
          createBullet("Trình duyệt", "Google Chrome, Microsoft Edge, Firefox hoặc Safari hỗ trợ WebGL và Web Audio API"),

          createHeading2("5.2. Các bước khởi chạy môi trường phát triển"),
          createBullet("Bước 1: Cài đặt gói thư viện", "Chạy lệnh: npm install"),
          createBullet("Bước 2: Cấu hình biến môi trường", "Kiểm tra file .env.local chứa đầy đủ NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_GEMINI_API_KEYS"),
          createBullet("Bước 3: Chạy máy chủ phát triển", "Chạy lệnh: npm run dev"),
          createBullet("Bước 4: Truy cập ứng dụng", "Mở trình duyệt tại địa chỉ http://localhost:3000"),

          createHeading2("5.3. Hướng dẫn đóng gói và triển khai"),
          createBullet("Biên dịch sản phẩm (Build)", "Chạy lệnh: npm run build"),
          createBullet("Khởi chạy production", "Chạy lệnh: npm run start"),
          createBullet("Triển khai lên Netlify / Vercel", "Kết nối repository GitHub, cấu hình Build command: npm run build và Publish directory: .next"),

          // SECTION 6: THÔNG TIN TỔNG KẾT
          createHeading1("6. KẾT LUẬN & ĐỊNH HƯỚNG PHÁT TRIỂN"),
          createParagraph(
            "Dự án HCC - ChemAI là giải pháp chuyển đổi số toàn diện, kết hợp hài hòa giữa kiến thức chuyên môn Hóa học THPT GDPT 2018 và các công nghệ tiên tiến nhất hiện nay (Next.js 16, React 19, Three.js 3D, Supabase Realtime, Gemini AI và Dify AI). Hệ thống sẵn sàng phục vụ công tác giảng dạy thực tế tại các trường THPT và phát triển mở rộng trong tương lai."
          ),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 300, after: 100 },
            children: [
              new TextRun({
                text: "HCC - ChemAI Development Team • 2026",
                bold: true,
                italics: true,
                size: 22,
                color: "64748B",
                font: "Times New Roman"
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, 'HCC_ChemAI_Thong_Tin_Chi_Tiet.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('SUCCESS: Generated ' + outputPath);
}

generateDocx().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});
