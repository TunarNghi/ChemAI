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

async function generateUpgradeReport() {
  const primaryColor = "0284C7"; // Cyan/Sky Blue
  const secondaryColor = "0F172A"; // Dark Slate
  const accentColor = "7C3AED"; // Purple
  const tableHeaderBg = "E0F2FE"; // Light Blue
  const lightGreyBg = "F8FAFC";
  const warmBg = "FEF3C7";

  const createHeading1 = (text) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 180 },
      children: [
        new TextRun({
          text: text,
          bold: true,
          size: 30, // 15pt
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
          size: 24, // 12pt
          color: accentColor,
          font: "Times New Roman"
        })
      ]
    });
  };

  const createBullet = (boldPrefix, text) => {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { before: 60, after: 60, line: 300 },
      children: [
        new TextRun({
          text: boldPrefix ? `${boldPrefix}: ` : "",
          bold: true,
          size: 24,
          font: "Times New Roman"
        }),
        new TextRun({
          text: text,
          size: 24,
          font: "Times New Roman"
        })
      ]
    });
  };

  const createParagraph = (text, isItalic = false) => {
    return new Paragraph({
      spacing: { before: 80, after: 80, line: 320 },
      children: [
        new TextRun({
          text: text,
          italic: isItalic,
          size: 24,
          font: "Times New Roman"
        })
      ]
    });
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Times New Roman",
            size: 24,
            color: "1E293B"
          },
          paragraph: {
            spacing: { line: 320 }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: [
          // Header / Title Block
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({
                text: "HỆ THỐNG TRỢ LÝ & MÔ PHỎNG HÓA HỌC THPT (GDPT 2018)",
                bold: true,
                size: 24,
                color: "64748B",
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 240 },
            children: [
              new TextRun({
                text: "BÁO CÁO TỔNG KẾT NÂNG CẤP HỆ THỐNG — PHIÊN BẢN 2.0 (BIG UPDATE)",
                bold: true,
                size: 34, // 17pt
                color: primaryColor,
                font: "Times New Roman"
              })
            ]
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Tên Dự Án", bold: true, size: 22 })] })]
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: "HCC - ChemAI (Hệ Thống Trợ Lý & Mô Phỏng Hóa Học)", size: 22 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Phiên Bản Nâng Cấp", bold: true, size: 22 })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Phiên bản 2.0 (BIG UPDATE Toàn Diện)", bold: true, color: primaryColor, size: 22 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Đối Tượng Phục Vụ", bold: true, size: 22 })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Giáo viên Hóa học THPT và Học sinh các khối 10, 11, 12", size: 22 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: tableHeaderBg, type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "Thời Điểm Hoàn Thành", bold: true, size: 22 })] })]
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Tháng 09/2026", size: 22 })] })]
                  })
                ]
              })
            ]
          }),

          createHeading1("I. TỔNG QUAN VỀ ĐỢT NÂNG CẤP BIG UPDATE 2.0"),
          createParagraph("Đợt nâng cấp toàn diện Phiên bản 2.0 tập trung giải quyết trọn vẹn các bài toán thực tiễn trong công tác giảng dạy của giáo viên và học tập của học sinh môn Hóa học THPT theo chương trình GDPT 2018 (áp dụng cho cả 3 bộ sách Kết Nối Tri Thức, Cánh Diều, Chân Trời Sáng Tạo). Toàn bộ hệ sinh thái đã được mở rộng mạnh mẽ với 6 nhánh nâng cấp đột phá, mang lại trải nghiệm tương tác trực quan, hiện đại và bảo mật tuyệt đối."),

          createHeading1("II. CHI TIẾT CÁC TÍNH NĂNG ĐƯỢC NÂNG CẤP"),

          createHeading2("1. Studio Bảng Trắng Dạy Học Chuyên Nghiệp (Teacher Whiteboard Studio)"),
          createParagraph("Mô-đun Bảng Trắng số hóa dành riêng cho giáo viên đã được nâng cấp thành một Studio giảng dạy kỹ thuật số toàn năng:"),
          createBullet("4 Không gian bảng đa dạng", "Tùy chọn Bảng đen viết phấn truyền thống, Bảng trắng văn phòng viết bút lông, Bảng giấy kẻ ô ly (Grid) và Giấy kẻ ngang (Ruled) chuẩn tập học sinh."),
          createBullet("Bộ công cụ vẽ & đồ họa đầy đủ", "Bút viết nét phấn/mực, Bút dạ quang (Highlighter), Tẩy thông minh, Đoạn thẳng / Liên kết hóa học, Mũi tên phản ứng một chiều (→), Mũi tên cân bằng hóa học thuận nghịch hai chiều (⇄), Hình chữ nhật, Hình tròn và Chèn khối văn bản lời giảng."),
          createBullet("Bảng màu chuẩn mực", "Tích hợp 10 gam màu sắc nét; đặc biệt bổ sung Màu Đen Mực (#000000) có viền sáng nhận diện rõ nét ngay trên nền bảng đen lẫn giấy kẻ trắng."),
          createBullet("Thanh tem công thức nhanh", "Chèn nhanh 1-chạm các công thức và ký hiệu hóa học thường gặp: H₂SO₄, HCl, HNO₃, NaOH, Ca(OH)₂, CaCO₃, Fe₂O₃, CuSO₄, C₂H₅OH, CH₃COOH, C₆H₁₂O₆, ΔrH°₂₉₈, pH, ↑, ↓, ⇄, e⁻, cặp electron tự do (••)..."),
          createBullet("Công cụ 'Chọn & Di Chuyển / Chỉnh Sửa'", "Cho phép chọn trực tiếp bất kỳ khối chữ, tem công thức, nét vẽ hay hình học nào để kéo thả di chuyển tự do, sửa nội dung chữ/tem, đổi màu sắc tức thì, phóng to, thu nhỏ, nhân bản bản sao, đưa lên lớp trên cùng hoặc xóa riêng lẻ đối tượng."),
          createBullet("Chế độ 'Toàn Màn Hình Studio'", "Mở rộng 100% diện tích màn hình thiết bị (ẩn thanh điều hướng), biến màn hình cảm ứng hay máy tính bảng thành bảng thông minh thực thụ."),
          createBullet("Xuất bản tài liệu bài dạy", "Hỗ trợ tải ảnh PNG chất lượng cao hoặc xuất file PDF in ấn phục vụ hồ sơ chuyên môn bài giảng."),

          createHeading2("2. Tích Hợp Sâu Toàn Bộ Khối Kiến Thức Hóa Học Lớp 11 & 12 (GDPT 2018)"),
          createParagraph("Toàn bộ kiến thức trọng tâm của chương trình Hóa học 11 và 12 được hòa tan tự nhiên vào phòng Lab, mô hình phân tử 3D, gia sư AI và ngân hàng đề thi:"),
          createBullet("Khối kiến thức Lớp 11", "Cân bằng hóa học (Thuyết Brønsted-Lowry, Hằng số Kc, Nguyên lý Le Chatelier); Trạm đo pH và chuẩn độ Acid-Base; Hợp chất Nitrogen & Sulfur (Tính trơ của N₂, tính khử của NH₃, tính oxi hóa cực mạnh của HNO₃, tính háo nước than hóa đường của H₂SO₄ đặc, mưa acid); Đại cương hữu cơ, Phổ hồng ngoại IR, Phổ khối lượng MS, Hydrocarbon (Alkane, Alkene, Alkyne, Aren); Dẫn xuất Halogen, Alcohol, Phenol (Liên kết hydrogen, nhiệt độ sôi, độ tan); Hợp chất Carbonyl & Carboxylic Acid (Phản ứng tráng bạc Tollens, phản ứng Iodoform, phản ứng ester hóa)."),
          createBullet("Khối kiến thức Lớp 12", "Ester - Lipid & Chất giặt rửa (Thủy phân thuận nghịch trong acid, xà phòng hóa trong kiềm, cơ chế ưa/kị nước); Carbohydrate (Glucose, Fructose, Saccharose, Maltose, Tinh bột, Cellulose, phản ứng màu Iot); Hợp chất chứa Nitơ (Bậc amine, tính lưỡng tính của amino acid, điểm đẳng điện pI, liên kết peptide, phản ứng màu Biuret nhận biết protein với Cu(OH)₂); Polymer & Vật liệu cao phân tử (Trùng hợp, trùng ngưng, cao su lưu hóa); Pin điện hóa & Điện phân (Thế điện cực chuẩn, Pin Galvani Zn-Cu, ăn mòn hóa học & điện hóa học, điện phân nóng chảy & dung dịch); Kim loại chuyển tiếp & Hóa học Phức chất (Cấu trúc ion phức aqua, phức amin, phối tử và nguyên tử trung tâm)."),

          createHeading2("3. Mô Hình Phân Tử Không Gian 3D & Cơ Chế Liên Kết Lewis 2D"),
          createParagraph("Nâng cấp trải nghiệm trực quan hóa cấu trúc vi mô của các chất hóa học:"),
          createBullet("Thư viện 38 phân tử & ion phức chất", "Mô phỏng 3D WebGL dạng cầu - que xoay 360 độ, phóng to thu nhỏ đa chiều theo màu quy ước CPK quốc tế."),
          createBullet("Công thức Lewis 2D trực quan", "Thể hiện rõ ràng liên kết đơn, đôi, ba, liên kết cho nhận, các cặp electron tự do (••) và electron độc thân phát sáng."),
          createBullet("Tự động kiểm tra Quy tắc Bát tử (Octet / Duet)", "Bảng thống kê chi tiết điện tích hình thức (Formal Charge), số electron hóa trị và đánh giá trạng thái Octet cho từng nguyên tử trong phân tử."),

          createHeading2("4. Giao Diện Độc Quyền Cho Thiết Bị Di Động (Mobile-First Architecture)"),
          createParagraph("Tối ưu hóa toàn diện trải nghiệm người dùng trên điện thoại thông minh và máy tính bảng:"),
          createBullet("Kiến trúc hiển thị Native 100%", "Loại bỏ hoàn toàn cảm giác méo lệch, co dúm hay mờ chữ. Font chữ hiển thị sắc nét chuẩn 4K trên mọi màn hình Retina/OLED."),
          createBullet("Bảng Tuần Hoàn 118 Nguyên Tố dạng Thẻ Thông Minh", "Tự động kích hoạt chế độ Lưới thẻ 2 cột dọc vừa vặn màn hình điện thoại; tìm kiếm tức thì theo Tên/Ký hiệu/Z; chạm 1 chạm để mở bảng thông số 3D Orbital và nghe phát âm tiếng Anh chuẩn IUPAC. Tích hợp nút chuyển nhanh sang Bản đồ 18 cột cuộn ngang cảm ứng."),
          createBullet("Thanh điều hướng đáy (Bottom Navigation)", "Cố định dưới đáy màn hình giúp chuyển đổi 5 nhóm chức năng chính dễ dàng chỉ với một ngón tay cái."),
          createBullet("Menu Nhanh Nổi (Floating Action Button - FAB)", "Nút tròn nổi thông minh mở bảng trượt Bottom Sheet để nhảy ngay đến bất kỳ tính năng nào trong toàn bộ 15 mô-đun."),

          createHeading2("5. Trung Tâm Chẩn Đoán Lỗ Hổng Kiến Thức THPT"),
          createParagraph("Hệ thống đánh giá năng lực học sinh phân tầng với độ chính xác cao:"),
          createBullet("4 Cấp độ khảo sát chuyên biệt", "Gồm Khảo sát Lớp 10, Khảo sát Lớp 11, Khảo sát Lớp 12 và Đề Tổng ôn THPT Quốc Gia chuẩn ma trận đề thi định dạng mới của Bộ GD&ĐT (Trắc nghiệm nhiều lựa chọn, Trắc nghiệm Đúng/Sai, Câu hỏi trả lời ngắn)."),
          createBullet("Biểu đồ Radar Năng Lực & Nhận Diện Bẫy Đề Thi", "Sau khi hoàn thành bài test, hệ thống tự động phân tích ma trận năng lực, chỉ rõ các lỗ hổng kiến thức cốt lõi và đề xuất lộ trình ôn tập khắc phục."),

          createHeading2("6. Tối Ưu Hệ Thống Cơ Sở Dữ Liệu & Cơ Chế Dự Phòng (Failover)"),
          createBullet("Phân định cơ sở dữ liệu Chính & Dự phòng", "Thiết lập cấu trúc tách biệt rõ ràng giữa Database chính thức (Primary) và Database dự phòng (Backup), đảm bảo lưu trữ an toàn 100% hồ sơ học sinh, điểm số Kahoot và cache thí nghiệm ảo."),
          createBullet("Hiệu năng vượt trội", "Hệ thống vận hành mượt mà ở tốc độ 60fps trên toàn bộ các nền tảng thiết bị."),

          createHeading1("III. KẾT LUẬN & ĐỊNH HƯỚNG PHÁT TRIỂN"),
          createParagraph("Bản nâng cấp BIG UPDATE 2.0 đã hoàn thiện một hệ sinh thái Hóa học THPT số hóa toàn diện, thẩm mỹ và an toàn. Hệ thống đã sẵn sàng phục vụ các hoạt động đổi mới phương pháp giảng dạy, ôn luyện thi tốt nghiệp THPT và khơi gợi niềm đam mê khoa học thực nghiệm cho học sinh."),
          createParagraph("Tài liệu được khởi tạo tự động từ Hệ thống Quản trị HCC - ChemAI 2026.", true)
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(process.cwd(), 'HCC_ChemAI_Bao_Cao_Nang_Cap_2.0.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Đã xuất thành công file Word tại: ${outputPath}`);
}

generateUpgradeReport().catch(console.error);
