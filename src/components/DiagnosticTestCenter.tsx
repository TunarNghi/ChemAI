"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  Stack,
  Divider,
  Card,
  CardContent,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Radar,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Brain,
  Zap,
} from 'lucide-react';

export type DiagnosticGrade = 'grade10' | 'grade11' | 'grade12' | 'thpt';

export interface DiagnosticQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pitfall: string; // Bẫy đề thi hay gặp
  remedyTip: string; // Lời khuyên khắc phục
}

const DIAGNOSTIC_DATA: Record<DiagnosticGrade, { title: string; subtitle: string; icon: string; competencies: string[]; questions: DiagnosticQuestion[] }> = {
  grade10: {
    title: "Chẩn Đoán Năng Lực Hóa Học Lớp 10",
    subtitle: "Quét lỗ hổng Nguyên tử, BTH, Liên kết hóa học, Tốc độ phản ứng & Nhiệt hóa học",
    icon: "📘",
    competencies: [
      "Cấu tạo nguyên tử & Obitan",
      "Bảng tuần hoàn & Xu hướng",
      "Liên kết hóa học & Lewis",
      "Phản ứng Oxi hóa - Khử",
      "Năng lượng Enthalpy ΔrH",
      "Tốc độ phản ứng & Halogen",
    ],
    questions: [
      {
        id: "10_1",
        topic: "Cấu tạo nguyên tử & Obitan",
        question: "Cấu hình electron nguyên tử của nguyên tố Chromium (Z = 24) ở trạng thái cơ bản là:",
        options: [
          "A. [Ar] 3d⁴ 4s²",
          "B. [Ar] 3d⁵ 4s¹ (Bán bão hòa obitan d)",
          "C. [Ar] 3d⁶ 4s⁰",
          "D. [Ar] 4s² 3d⁴",
        ],
        correctIndex: 1,
        explanation: "Chromium (Z = 24) có hiện tượng nhảy 1 electron từ phân lớp 4s sang 3d để đạt cấu hình bán bão hòa d⁵ bền vững hơn: [Ar] 3d⁵ 4s¹.",
        pitfall: "Học sinh thường điền máy móc theo thứ tự mức năng lượng thành 3d⁴ 4s² mà quên quy tắc bền bán bão hòa phân lớp d.",
        remedyTip: "Ghi nhớ 2 trường hợp ngoại lệ kinh điển lớp 10: Cr (Z=24: 3d⁵ 4s¹) và Cu (Z=29: 3d¹⁰ 4s¹).",
      },
      {
        id: "10_2",
        topic: "Bảng tuần hoàn & Xu hướng",
        question: "Trong một chu kỳ theo chiều tăng dần của điện tích hạt nhân (từ trái sang phải), quy luật biến đổi nào sau đây là ĐÚNG?",
        options: [
          "A. Bán kính nguyên tử tăng dần, độ âm điện giảm dần",
          "B. Tính kim loại tăng dần, tính phi kim giảm dần",
          "C. Bán kính nguyên tử giảm dần, độ âm điện tăng dần",
          "D. Năng lượng ion hóa thứ nhất luôn giảm đều",
        ],
        correctIndex: 2,
        explanation: "Trong cùng 1 chu kỳ, số lớp e không đổi nhưng Z tăng dần làm lực hút của hạt nhân lên electron lớp ngoài cùng mạnh hơn -> bán kính co lại, độ âm điện và tính phi kim tăng dần.",
        pitfall: "Dễ nhầm lẫn giữa quy luật biến đổi trong cùng 1 chu kỳ và trong cùng 1 nhóm A.",
        remedyTip: "Nhớ mẹo: Càng sang phải (tiến về phía F) thì độ âm điện càng cực đại, bán kính càng co nhỏ.",
      },
      {
        id: "10_3",
        topic: "Liên kết hóa học & Lewis",
        question: "Phân tử nào sau đây có liên kết cộng hóa trị KHÔNG phân cực?",
        options: [
          "A. HCl",
          "B. H₂O",
          "C. N₂ (Liên kết ba N≡N)",
          "D. NH₃",
        ],
        correctIndex: 2,
        explanation: "Phân tử N₂ gồm 2 nguyên tử Nitrogen giống hệt nhau có độ âm điện bằng nhau (hiệu độ âm điện Δχ = 0) nên cặp e liên kết nằm chính giữa -> liên kết cộng hóa trị không phân cực.",
        pitfall: "Nhầm lẫn giữa phân tử có cực và liên kết có cực.",
        remedyTip: "Đơn chất gồm các nguyên tử cùng loại (H₂, O₂, N₂, Cl₂, Br₂) luôn có liên kết cộng hóa trị không cực.",
      },
      {
        id: "10_4",
        topic: "Phản ứng Oxi hóa - Khử",
        question: "Trong phản ứng: 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ + 8H₂O, chất oxi hóa và số phân tử HCl bị oxi hóa lần lượt là:",
        options: [
          "A. KMnO₄ và 16",
          "B. KMnO₄ và 10",
          "C. HCl và 5",
          "D. KMnO₄ và 8",
        ],
        correctIndex: 1,
        explanation: "Mn⁺⁷ nhận 5e thành Mn⁺² nên KMnO₄ là chất oxi hóa. Trong 16 phân tử HCl, có 10 phân tử Cl⁻ nhường e tạo thành 5Cl₂ (bị oxi hóa), còn 6 phân tử đóng vai trò tạo môi trường muối (KCl, MnCl₂).",
        pitfall: "Học sinh thường đếm toàn bộ 16 phân tử HCl đều bị oxi hóa mà quên phần đóng vai trò tạo môi trường.",
        remedyTip: "Nhìn vào số mol Cl₂ sinh ra: 5 mol Cl₂ = 10 nguyên tử Cl⁻ đã thay đổi số oxi hóa -> có đúng 10 phân tử HCl bị oxi hóa.",
      },
      {
        id: "10_5",
        topic: "Năng lượng Enthalpy ΔrH",
        question: "Một phản ứng hóa học có biến thiên enthalpy chuẩn ΔrH°₂₉₈ = -184.6 kJ. Phản ứng này là:",
        options: [
          "A. Phản ứng thu nhiệt, hấp thu nhiệt từ môi trường",
          "B. Phản ứng tỏa nhiệt, giải phóng năng lượng ra môi trường",
          "C. Phản ứng không trao đổi nhiệt",
          "D. Phản ứng có năng lượng sản phẩm lớn hơn chất phản ứng",
        ],
        correctIndex: 1,
        explanation: "Theo quy ước nhiệt hóa học GDPT 2018: ΔrH°₂₉₈ < 0 là phản ứng tỏa nhiệt (Exothermic), làm nóng môi trường xung quanh.",
        pitfall: "Rất hay nhầm lẫn dấu: nhầm ΔH < 0 là thu nhiệt, ΔH > 0 là tỏa nhiệt.",
        remedyTip: "Nhớ câu thần chú: 'Âm Tỏa - Dương Thu' (ΔH âm là tỏa nhiệt, ΔH dương là thu nhiệt).",
      },
      {
        id: "10_6",
        topic: "Tốc độ phản ứng & Halogen",
        question: "Khi tăng nhiệt độ lên 10°C, tốc độ một phản ứng tăng 3 lần (hệ số nhiệt độ Van't Hoff γ = 3). Nếu tăng nhiệt độ từ 20°C lên 50°C, tốc độ phản ứng sẽ tăng:",
        options: [
          "A. 9 lần",
          "B. 27 lần",
          "C. 81 lần",
          "D. 12 lần",
        ],
        correctIndex: 1,
        explanation: "Số khoảng tăng 10°C là n = (50 - 20) / 10 = 3. Tốc độ tăng: v₂ / v₁ = γⁿ = 3³ = 27 lần.",
        pitfall: "Nhầm lấy 3 nhân 3 = 9 lần thay vì lũy thừa 3³ = 27.",
        remedyTip: "Công thức Van't Hoff: v₂ = v₁ * γ^((T₂ - T₁) / 10).",
      },
    ],
  },
  grade11: {
    title: "Chẩn Đoán Năng Lực Hóa Học Lớp 11",
    subtitle: "Quét lỗ hổng Cân bằng Le Chatelier, pH, N-S, Hydrocarbon & Hợp chất Carbonyl",
    icon: "📗",
    competencies: [
      "Cân bằng hóa học & pH",
      "Hợp chất Nitrogen (NH₃, HNO₃)",
      "Hợp chất Sulfur & H₂SO₄",
      "Đại cương Hữu cơ & Alkane",
      "Hydrocarbon không no & Thơm",
      "Alcohol, Phenol & Carbonyl",
    ],
    questions: [
      {
        id: "11_1",
        topic: "Cân bằng hóa học & pH",
        question: "Cho cân bằng: N₂(k) + 3H₂(k) ⇄ 2NH₃(k); ΔrH°₂₉₈ = -92 kJ. Để cân bằng chuyển dịch theo chiều thuận tạo nhiều NH₃, cần:",
        options: [
          "A. Tăng nhiệt độ và giảm áp suất",
          "B. Giảm nhiệt độ và tăng áp suất của hệ",
          "C. Tăng nhiệt độ và tăng nồng độ NH₃",
          "D. Thêm chất xúc tác bột sắt Fe",
        ],
        correctIndex: 1,
        explanation: "Phản ứng tỏa nhiệt (ΔH < 0) và có tổng số mol khí giảm (4 mol khí -> 2 mol khí). Theo nguyên lý Le Chatelier: giảm nhiệt độ sẽ làm cân bằng dời sang chiều tỏa nhiệt (chiều thuận), tăng áp suất sẽ làm cân bằng dời sang chiều giảm số mol khí (chiều thuận).",
        pitfall: "Nghĩ rằng chất xúc tác Fe làm chuyển dịch cân bằng (thực tế xúc tác chỉ làm phản ứng nhanh đạt cân bằng chứ không làm chuyển dịch).",
        remedyTip: "Nhớ: Giảm T ưu tiên chiều Tỏa nhiệt; Tăng P ưu tiên chiều Giảm số mol khí.",
      },
      {
        id: "11_2",
        topic: "Hợp chất Nitrogen (NH₃, HNO₃)",
        question: "Kim loại nào sau đây bị THỤ ĐỘNG HÓA trong dung dịch HNO₃ đặc, nguội?",
        options: [
          "A. Cu, Ag",
          "B. Fe, Al, Cr",
          "C. Mg, Zn",
          "D. Au, Pt",
        ],
        correctIndex: 1,
        explanation: "Fe, Al, Cr bị thụ động hóa trong HNO₃ đặc nguội và H₂SO₄ đặc nguội do tạo màng oxit bảo vệ cực mỏng và bền, ngăn cản phản ứng tiếp diễn.",
        pitfall: "Nhầm lẫn giữa kim loại không tác dụng (Au, Pt) và kim loại bị thụ động hóa (Fe, Al, Cr).",
        remedyTip: "Bộ 3 thụ động hóa kinh điển: 'Sắt - Nhôm - Crom' (Fe - Al - Cr) trong axit đặc nguội.",
      },
      {
        id: "11_3",
        topic: "Hợp chất Sulfur & H₂SO₄",
        question: "Khi pha loãng axit sunfuric đặc (H₂SO₄ đặc), thao tác kỹ thuật an toàn ĐÚNG là:",
        options: [
          "A. Rót nhanh nước vào bình chứa axit đặc rồi lắc mạnh",
          "B. Rót từ từ axit đặc vào nước dọc theo đũa thủy tinh và khuấy đều",
          "C. Đổ đồng thời cả nước và axit đặc vào cốc",
          "D. Đun nóng nước trước khi đổ axit đặc vào",
        ],
        correctIndex: 1,
        explanation: "H₂SO₄ đặc hút nước cực mạnh và tỏa nhiệt khổng lồ. Phải rót từ từ axit vào nước để lượng nước lớn hấp thu nhiệt; nếu làm ngược lại, nước sôi cục bộ sẽ bắn tung tóe axit gây bỏng nặng.",
        pitfall: "Thao tác ngược (đổ nước vào axit) là lỗi nguy hiểm thường gặp trong các câu hỏi an toàn thực hành.",
        remedyTip: "Quy tắc sống còn: 'Axit vào Nước' (A vào N), tuyệt đối không đổ Nước vào Axit.",
      },
      {
        id: "11_4",
        topic: "Đại cương Hữu cơ & Alkane",
        question: "Số lượng đồng phân cấu tạo ứng với công thức phân tử C₅H₁₂ (Pentane) là:",
        options: [
          "A. 2 đồng phân",
          "B. 3 đồng phân (pentan, isopentan, neopentan)",
          "C. 4 đồng phân",
          "D. 5 đồng phân",
        ],
        correctIndex: 1,
        explanation: "C₅H₁₂ có 3 đồng phân ankan: pentan (mạch thẳng 5C), 2-metylbutan / isopentan (mạch 4C có 1 nhánh), 2,2-đimetylpropan / neopentan (mạch 3C có 2 nhánh).",
        pitfall: "Đếm trùng đồng phân khi bẻ nhánh ở vị trí đối xứng.",
        remedyTip: "Nhớ dãy số đồng phân ankan cơ bản: C₄H₁₀ (2), C₅H₁₂ (3), C₆H₁₄ (5).",
      },
      {
        id: "11_5",
        topic: "Hydrocarbon không no & Thơm",
        question: "Khi cho Propene (CH₃-CH=CH₂) phản ứng cộng hợp với HBr, theo quy tắc Markovnikov, sản phẩm chính thu được là:",
        options: [
          "A. 1-bromopropane (CH₃-CH₂-CH₂Br)",
          "B. 2-bromopropane (CH₃-CHBr-CH₃)",
          "C. 1,2-dibromopropane",
          "D. Cyclopropane",
        ],
        correctIndex: 1,
        explanation: "Quy tắc Markovnikov: Trong phản ứng cộng HX vào liên kết đôi bất đối xứng, phần mang điện dương (H) ưu tiên cộng vào carbon mang nối đôi có nhiều H hơn (bậc thấp hơn), phần âm (Br) cộng vào carbon ít H hơn (bậc cao hơn) -> tạo 2-bromopropane.",
        pitfall: "Học sinh hay nhầm Markovnikov (sản phẩm cộng) với Zaitsev (sản phẩm tách).",
        remedyTip: "Mẹo nhớ Markovnikov: 'Giàu càng thêm giàu' (C nào nhiều H sẽ nhận thêm H).",
      },
      {
        id: "11_6",
        topic: "Alcohol, Phenol & Carbonyl",
        question: "Thuốc thử nào sau đây dùng để phân biệt Phenol (C₆H₅OH) và Ethanol (C₂H₅OH)?",
        options: [
          "A. Kim loại Na",
          "B. Dung dịch nước Brom (Br₂)",
          "C. Dung dịch NaOH",
          "D. Cả B và C đều đúng",
        ],
        correctIndex: 3,
        explanation: "Phenol tác dụng với nước Brom tạo kết tủa trắng 2,4,6-tribromophenol và tan trong dung dịch NaOH (tính axit yếu), còn Ethanol không phản ứng với cả 2 chất này.",
        pitfall: "Dùng kim loại Na để nhận biết (sai vì cả Phenol và Ethanol đều tác dụng với Na sủi bọt khí H₂).",
        remedyTip: "Nhớ Phenol có vòng benzen hoạt hóa nhóm -OH nên phản ứng được với NaOH và làm mất màu + kết tủa trắng nước Brom.",
      },
    ],
  },
  grade12: {
    title: "Chẩn Đoán Năng Lực Hóa Học Lớp 12",
    subtitle: "Quét lỗ hổng Este, Cacbohiđrat, Amin, Polyme, Điện phân & Kim loại chuyển tiếp",
    icon: "📙",
    competencies: [
      "Ester, Lipid & Xà phòng hóa",
      "Carbohydrate (Glucose, Cellulose)",
      "Amine, Amino acid & Protein",
      "Polymer & Vật liệu",
      "Pin điện & Điện phân dung dịch",
      "Đại cương kim loại & Phức chất",
    ],
    questions: [
      {
        id: "12_1",
        topic: "Ester, Lipid & Xà phòng hóa",
        question: "Thủy phân hoàn toàn 1 mol chất béo Triolein trong dung dịch NaOH đun nóng thu được:",
        options: [
          "A. 1 mol C₁₇H₃₅COONa và 1 mol C₃H₅(OH)₃",
          "B. 3 mol C₁₇H₃₃COONa và 1 mol C₃H₅(OH)₃",
          "C. 3 mol C₁₅H₃₁COONa và 1 mol C₃H₅(OH)₃",
          "D. 3 mol C₁₇H₃₅COONa và 1 mol C₃H₅(OH)₃",
        ],
        correctIndex: 1,
        explanation: "Triolein có công thức (C₁₇H₃₃COO)₃C₃H₅. Khi xà phòng hóa với 3NaOH thu được 3 mol muối natri oleat (C₁₇H₃₃COONa) và 1 mol glycerol (C₃H₅(OH)₃).",
        pitfall: "Nhầm lẫn công thức gốc axit béo: Olein (C₁₇H₃₃ - không no), Stearin (C₁₇H₃₅ - no), Palmitin (C₁₅H₃₁ - no).",
        remedyTip: "Bảng nhớ gốc axit béo: Palmitic 15-31, Stearic 17-35, Oleic 17-33 (ít hơn stearic 2H do có 1 nối đôi C=C).",
      },
      {
        id: "12_2",
        topic: "Carbohydrate (Glucose, Cellulose)",
        question: "Phát biểu nào sau đây về Carbohydrate là KHÔNG ĐÚNG?",
        options: [
          "A. Glucose và Fructose là đồng phân của nhau",
          "B. Tinh bột và Cellulose đều có công thức phân tử là (C₆H₁₀O₅)ₙ và là đồng phân của nhau",
          "C. Saccharose bị thủy phân trong môi trường axit tạo Glucose và Fructose",
          "D. Cellulose có cấu trúc mạch kéo dài, không phân nhánh",
        ],
        correctIndex: 1,
        explanation: "Tinh bột và Cellulose tuy cùng có công thức chung (C₆H₁₀O₅)ₙ nhưng hệ số trùng hợp n khác nhau rất nhiều (n của cellulose lớn hơn rất nhiều so với tinh bột) nên KHÔNG PHẢI là đồng phân của nhau.",
        pitfall: "Bẫy kinh điển: thấy cùng viết dạng (C₆H₁₀O₅)ₙ là vội vàng kết luận là đồng phân.",
        remedyTip: "Ghi nhớ: Polyme có cùng công thức đơn vị nhưng khác chỉ số n thì KHÔNG bao giờ là đồng phân.",
      },
      {
        id: "12_3",
        topic: "Amine, Amino acid & Protein",
        question: "Chất nào sau đây có tính bazơ MẠNH NHẤT trong số các chất dưới đây?",
        options: [
          "A. Anilin (C₆H₅NH₂)",
          "B. Amoniac (NH₃)",
          "C. Dimetylamin ((CH₃)₂NH)",
          "D. Metylamin (CH₃NH₂)",
        ],
        correctIndex: 2,
        explanation: "Nhóm alkyl đẩy electron (+I) làm tăng mật độ e trên N -> tăng tính bazơ. Nhóm phenyl hút e (-C, -I) làm giảm tính bazơ. Thứ tự tính bazơ: (CH₃)₂NH > CH₃NH₂ > NH₃ > C₆H₅NH₂.",
        pitfall: "Nhiều học sinh nhầm amin bậc 3 có tính bazơ mạnh nhất (trong dung dịch nước, amin bậc 2 như (CH₃)₂NH có tính bazơ mạnh nhất do hiệu ứng solvat hóa).",
        remedyTip: "Thứ tự bazơ amin béo mạch hở trong nước: Bậc 2 > Bậc 1 > NH₃ > Amin thơm (Anilin).",
      },
      {
        id: "12_4",
        topic: "Polymer & Vật liệu",
        question: "Tơ nào sau đây thuộc loại tơ BÁN TỔNG HỢP (tơ nhân tạo)?",
        options: [
          "A. Tơ tằm và len lông cừu",
          "B. Tơ nilon-6,6 và tơ nitron (olon)",
          "C. Tơ visco và tơ axetat",
          "D. Tơ capron",
        ],
        correctIndex: 2,
        explanation: "Tơ bán tổng hợp (nhân tạo) được chế tạo bằng cách biến tính hóa học polyme thiên nhiên có sẵn (cellulose) -> tiêu biểu là tơ visco và tơ cellulose axetat.",
        pitfall: "Nhầm lẫn giữa tơ tổng hợp (nilon, nitron) và tơ bán tổng hợp (visco, axetat).",
        remedyTip: "Nhớ: Tơ bán tổng hợp (nhân tạo) có nguồn gốc từ Cellulose = Visco + Axetat.",
      },
      {
        id: "12_5",
        topic: "Pin điện & Điện phân dung dịch",
        question: "Khi điện phân dung dịch CuSO₄ với điện cực trơ, tại anot xảy ra quá trình nào sau đây?",
        options: [
          "A. Khử ion Cu²⁺: Cu²⁺ + 2e → Cu",
          "B. Oxi hóa nước: 2H₂O → O₂ + 4H⁺ + 4e",
          "C. Oxi hóa ion SO₄²⁻",
          "D. Khử ion H⁺: 2H⁺ + 2e → H₂",
        ],
        correctIndex: 1,
        explanation: "Tại catot (-) xảy ra quá trình khử Cu²⁺ + 2e -> Cu. Tại anot (+) ion SO₄²⁻ chứa oxi không bị oxi hóa, nước bị oxi hóa giải phóng khí O₂: 2H₂O -> O₂ + 4H⁺ + 4e.",
        pitfall: "Nhầm lẫn giữa cực Anot (nơi xảy ra quá trình oxi hóa) và Catot (nơi xảy ra quá trình khử).",
        remedyTip: "Ghi nhớ quy tắc: 'Anot Oxi hóa - Catot Khử' (A-O, C-K). Gốc axit chứa oxi (SO₄²⁻, NO₃⁻) không bị điện phân trong nước.",
      },
      {
        id: "12_6",
        topic: "Đại cương kim loại & Phức chất",
        question: "Trong phức chất [Cu(NH₃)₄]²⁺, ion trung tâm và phối tử lần lượt là:",
        options: [
          "A. NH₃ và Cu²⁺",
          "B. Cu²⁺ và phân tử NH₃",
          "C. Cu và NH₄⁺",
          "D. Cu²⁺ và ion NH₂⁻",
        ],
        correctIndex: 1,
        explanation: "Phức chất [Cu(NH₃)₄]²⁺ có ion trung tâm là cation đồng Cu²⁺ (nhận electron), phối tử là 4 phân tử NH₃ (cung cấp cặp electron tự do tạo liên kết phối trí).",
        pitfall: "Học sinh mới tiếp cận phần Hóa phức chất lớp 12 GDPT 2018 dễ nhầm lẫn vai trò giữa phối tử và ion trung tâm.",
        remedyTip: "Nhớ: Kim loại chuyển tiếp đóng vai trò Ion Trung Tâm (nhận e); các phân tử/ion có cặp e tự do (NH₃, H₂O, Cl⁻, OH⁻) là Phối Tử (cho e).",
      },
    ],
  },
  thpt: {
    title: "Chẩn Đoán Tổng Quan Toàn Diện THPT Quốc Gia",
    subtitle: "Đề test ma trận chuẩn hóa phát hiện toàn bộ bẫy điểm 8+ và 9+ thi Tốt nghiệp THPT",
    icon: "🎓",
    competencies: [
      "Lý thuyết trọng tâm Vô cơ",
      "Lý thuyết trọng tâm Hữu cơ",
      "Bảo toàn Electron & Mol",
      "Đồ thị & Thực hành Thí nghiệm",
      "Quy đổi & Este Peptit nâng cao",
      "Điện phân & Năng lượng phản ứng",
    ],
    questions: [
      {
        id: "thpt_1",
        topic: "Lý thuyết trọng tâm Vô cơ",
        question: "Cho hỗn hợp gồm Cu và Fe₃O₄ (tỉ lệ mol 1:1) vào lượng dư dung dịch HCl loãng. Hiện tượng quan sát được là:",
        options: [
          "A. Fe₃O₄ tan hết, Cu còn dư không tan",
          "B. Hỗn hợp tan hoàn toàn tạo dung dịch trong suốt",
          "C. Cu tan hết, Fe₃O₄ còn dư",
          "D. Sinh ra kết tủa và khí mùi xốc",
        ],
        correctIndex: 1,
        explanation: "Fe₃O₄ + 8HCl -> FeCl₂ + 2FeCl₃ + 4H₂O. 1 mol Fe₃O₄ sinh ra 2 mol Fe³⁺. Cu phản ứng với Fe³⁺: Cu + 2Fe³⁺ -> Cu²⁺ + 2Fe²⁺. Do tỉ lệ 1 mol Cu vừa đủ hòa tan hết trong 2 mol Fe³⁺ nên hỗn hợp tan hoàn toàn!",
        pitfall: "Nhiều học sinh nhớ máy móc 'Cu đứng sau H trong dãy điện hóa nên không tan trong HCl' mà quên phản ứng phụ của Cu với Fe³⁺ sinh ra từ oxit sắt.",
        remedyTip: "Ghi nhớ cặp phản ứng kinh điển: 1 mol Cu hòa tan vừa khít trong 1 mol Fe₃O₄ hoặc 1 mol Fe₂O₃ trong môi trường axit HCl/H₂SO₄ loãng.",
      },
      {
        id: "thpt_2",
        topic: "Lý thuyết trọng tâm Hữu cơ",
        question: "Cho các chất: Glucose, Fructose, Saccharose, Maltose, Tinh bột, Cellulose, Axit fomic, Methyl fomat. Số chất có khả năng tham gia phản ứng tráng bạc (tráng gương) là:",
        options: [
          "A. 4 chất",
          "B. 5 chất (Glucose, Fructose, Maltose, Axit fomic, Methyl fomat)",
          "C. 6 chất",
          "D. 3 chất",
        ],
        correctIndex: 1,
        explanation: "Các chất tráng bạc gồm: Glucose (nhóm -CHO), Fructose (trong môi trường kiềm chuyển thành glucose), Maltose (còn nhóm OH hemiacetal), Axit fomic HCOOH (có nhóm H-C=O), Methyl fomat HCOOCH₃ (có nhóm H-C=O). Tổng cộng có 5 chất.",
        pitfall: "Hay quên: Fructose tráng bạc được trong môi trường kiềm (NH₃), và nhóm formyl HCOO- của axit/este fomic cũng tráng bạc được.",
        remedyTip: "Nhớ danh sách vàng tráng bạc: Glucose, Fructose, Maltose, HCHO, Andehit, HCOOH và tất cả este fomat (HCOOR).",
      },
      {
        id: "thpt_3",
        topic: "Bảo toàn Electron & Mol",
        question: "Hòa tan hoàn toàn 5.6 gam Fe (0.1 mol) vào dung dịch chứa 0.25 mol HNO₃ loãng, thu được khí NO (sản phẩm khử duy nhất). Dung dịch sau phản ứng chứa muối nào?",
        options: [
          "A. Chỉ có Fe(NO₃)₃",
          "B. Chỉ có Fe(NO₃)₂",
          "C. Gồm cả Fe(NO₃)₂ và Fe(NO₃)₃",
          "D. Fe(NO₃)₃ và HNO₃ dư",
        ],
        correctIndex: 2,
        explanation: "Để Fe lên Fe³⁺ cần tỉ lệ n_HNO3 / n_Fe = 4. Để Fe lên Fe²⁺ cần tỉ lệ n_HNO3 / n_Fe = 8/3 ≈ 2.67. Ở đây tỉ lệ = 0.25 / 0.1 = 2.5 -> nhỏ hơn 2.67 -> Fe dư khử Fe³⁺ về Fe²⁺, dung dịch chứa hỗn hợp cả 2 muối Fe(NO₃)₂ và Fe(NO₃)₃.",
        pitfall: "Học sinh thường mặc định axit HNO₃ luôn đưa Fe lên mức oxi hóa cao nhất +3 mà không kiểm tra lượng chất dư/thiếu.",
        remedyTip: "Xét tỉ lệ T = n_HNO3 / n_Fe: Nếu T ≥ 4 -> tạo Fe³⁺; Nếu T ≤ 8/3 -> chỉ tạo Fe²⁺; Nếu 8/3 < T < 4 -> tạo cả Fe²⁺ và Fe³⁺.",
      },
      {
        id: "thpt_4",
        topic: "Đồ thị & Thực hành Thí nghiệm",
        question: "Nhỏ từ từ dung dịch Ba(OH)₂ vào dung dịch chứa hỗn hợp Al₂(SO₄)₃ và H₂SO₄. Đồ thị biểu diễn khối lượng kết tủa theo số mol Ba(OH)₂ có đặc điểm:",
        options: [
          "A. Tăng đều liên tục đến cực đại rồi giữ nguyên không đổi",
          "B. Tăng đến cực đại sau đó giảm về 0",
          "C. Tăng đến cực đại, sau đó giảm một phần rồi đi ngang (do Al(OH)₃ tan còn BaSO₄ không tan)",
          "D. Đi ngang trước sau đó mới tăng dần",
        ],
        correctIndex: 2,
        explanation: "Giai đoạn đầu tạo cả BaSO₄ và Al(OH)₃ kết tủa -> khối lượng kết tủa tăng vọt lên cực đại. Sau đó khi dư Ba(OH)₂, kết tủa Al(OH)₃ bị hòa tan (Al(OH)₃ + OH⁻ -> [Al(OH)₄]⁻) làm đồ thị đi xuống, nhưng kết tủa BaSO₄ không tan nên đồ thị dừng lại và đi ngang ở mức khối lượng BaSO₄.",
        pitfall: "Nhầm rằng kết tủa tan hết về 0 (quên mất BaSO₄ là kết tủa siêu bền không tan trong kiềm dư).",
        remedyTip: "Phân biệt rõ: Nếu nhỏ NaOH vào Al₂(SO₄)₃ thì kết tủa Al(OH)₃ tan hết về 0; nhưng nhỏ Ba(OH)₂ thì luôn còn lại kết tủa BaSO₄.",
      },
    ],
  },
};

export default function DiagnosticTestCenter() {
  const [selectedGrade, setSelectedGrade] = useState<DiagnosticGrade>('grade10');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [testFinished, setTestFinished] = useState<boolean>(false);

  const currentData = DIAGNOSTIC_DATA[selectedGrade] || DIAGNOSTIC_DATA.grade10;
  const currentQuestions = currentData.questions || [];
  const safeIndex = Math.min(Math.max(0, currentQIndex), Math.max(0, currentQuestions.length - 1));
  const currentQ = currentQuestions[safeIndex] || currentQuestions[0];

  const handleSelectAnswer = (optionIdx: number) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setTestFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  const handleResetTest = () => {
    setUserAnswers({});
    setCurrentQIndex(0);
    setTestFinished(false);
  };

  const handleSwitchGrade = (grade: DiagnosticGrade) => {
    setSelectedGrade(grade);
    setUserAnswers({});
    setCurrentQIndex(0);
    setTestFinished(false);
  };

  // Calculate Diagnostic Scores
  const totalQuestions = currentQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  let correctCount = 0;
  const wrongQuestions: DiagnosticQuestion[] = [];

  currentQuestions.forEach((q) => {
    if (userAnswers[q.id] === q.correctIndex) {
      correctCount++;
    } else if (userAnswers[q.id] !== undefined) {
      wrongQuestions.push(q);
    }
  });

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      {/* Header Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          mb: 3,
          borderRadius: 3,
          bgcolor: '#0f172a',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 1.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2,
              bgcolor: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'flex',
            }}
          >
            <Brain size={26} color="#c084fc" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ color: '#fff', fontSize: { xs: '16px', sm: '19px' } }}>
              Trung Tâm Chẩn Đoán Lỗ Hổng Kiến Thức Hóa Học
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Dành riêng cho Học sinh: Quét 4 cấp độ (Lớp 10, 11, 12 & THPT) để chỉ điểm chính xác bẫy đề thi và lỗ hổng lý thuyết.
            </Typography>
          </Box>
        </Box>

        {/* 4 Track Selector Buttons */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {(['grade10', 'grade11', 'grade12', 'thpt'] as DiagnosticGrade[]).map((g) => {
            const isSelected = selectedGrade === g;
            return (
              <Button
                key={g}
                size="small"
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => handleSwitchGrade(g)}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '11.5px',
                  borderRadius: 2,
                  textTransform: 'none',
                  bgcolor: isSelected ? '#7c3aed' : 'rgba(255,255,255,0.04)',
                  color: isSelected ? '#fff' : '#cbd5e1',
                  borderColor: isSelected ? '#a855f7' : 'rgba(255,255,255,0.15)',
                  '&:hover': { bgcolor: isSelected ? '#6d28d9' : 'rgba(168, 85, 247, 0.15)' },
                }}
              >
                {DIAGNOSTIC_DATA[g].icon} {g === 'grade10' ? 'Lớp 10' : g === 'grade11' ? 'Lớp 11' : g === 'grade12' ? 'Lớp 12' : 'Tổng Quan THPT'}
              </Button>
            );
          })}
        </Stack>
      </Paper>

      {/* Main Diagnostic Area */}
      {!testFinished ? (
        /* In-progress Test Question Screen */
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3.5,
            bgcolor: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Progress Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={`Câu ${currentQIndex + 1} / ${totalQuestions}`}
                size="small"
                sx={{ bgcolor: '#7c3aed', color: '#fff', fontWeight: 'bold' }}
              />
              <Chip
                label={currentQ.topic}
                size="small"
                variant="outlined"
                sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.4)', fontWeight: 'bold' }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Đã làm: {answeredCount}/{totalQuestions} câu
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={((currentQIndex + 1) / totalQuestions) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              mb: 3,
              bgcolor: 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': { bgcolor: '#a855f7' },
            }}
          />

          {/* Question Text */}
          <Typography
            variant="h6"
            sx={{
              color: '#f8fafc',
              fontWeight: 700,
              fontSize: { xs: '15px', sm: '17px' },
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            {currentQ.question}
          </Typography>

          {/* Options List */}
          <RadioGroup
            value={userAnswers[currentQ.id] !== undefined ? userAnswers[currentQ.id] : -1}
            onChange={(e) => handleSelectAnswer(parseInt(e.target.value))}
          >
            <Stack spacing={1.5}>
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = userAnswers[currentQ.id] === oIdx;
                return (
                  <Box
                    key={oIdx}
                    onClick={() => handleSelectAnswer(oIdx)}
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      cursor: 'pointer',
                      bgcolor: isSelected ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1.5px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        bgcolor: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      },
                    }}
                  >
                    <FormControlLabel
                      value={oIdx}
                      control={<Radio size="small" sx={{ color: '#a855f7', '&.Mui-checked': { color: '#c084fc' } }} />}
                      label={
                        <Typography sx={{ color: isSelected ? '#fff' : '#cbd5e1', fontSize: { xs: '13px', sm: '14.5px' }, fontWeight: isSelected ? 600 : 400 }}>
                          {opt}
                        </Typography>
                      }
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </RadioGroup>

          {/* Bottom Nav Buttons */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <Button
              variant="outlined"
              disabled={currentQIndex === 0}
              onClick={handlePrev}
              sx={{ color: '#cbd5e1', borderColor: 'rgba(255,255,255,0.2)', textTransform: 'none', borderRadius: 2 }}
            >
              Câu Trước
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={userAnswers[currentQ.id] === undefined}
              endIcon={<ArrowRight size={16} />}
              sx={{
                bgcolor: '#7c3aed',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': { bgcolor: '#6d28d9' },
              }}
            >
              {currentQIndex === totalQuestions - 1 ? 'Xem Kết Quả Chẩn Đoán' : 'Câu Tiếp Theo'}
            </Button>
          </Box>
        </Paper>
      ) : (
        /* Diagnostic Results & Knowledge Gap Report Screen */
        <Box>
          <Grid container spacing={2.5}>
            {/* Left: Score & Competency Radar Card */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3.5,
                  bgcolor: '#090d16',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Typography variant="overline" sx={{ color: '#a855f7', fontWeight: 900, letterSpacing: '0.1em' }}>
                  BÁO CÁO NĂNG LỰC HÓA HỌC
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff', mb: 2 }}>
                  {currentData.title}
                </Typography>

                {/* Score Circle Badge */}
                <Box
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: scorePercentage >= 80 ? 'rgba(16, 185, 129, 0.15)' : scorePercentage >= 50 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                    border: `3px solid ${scorePercentage >= 80 ? '#10b981' : scorePercentage >= 50 ? '#f59e0b' : '#f43f5e'}`,
                    boxShadow: `0 0 25px ${scorePercentage >= 80 ? 'rgba(16, 185, 129, 0.4)' : scorePercentage >= 50 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`,
                    mb: 2,
                  }}
                >
                  <Typography variant="h3" fontWeight="900" sx={{ color: '#fff' }}>
                    {scorePercentage}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                    {correctCount}/{totalQuestions} Đúng
                  </Typography>
                </Box>

                <Chip
                  label={scorePercentage >= 80 ? "🌟 Xuất Sắc - Vững Kiến Thức" : scorePercentage >= 50 ? "⚠️ Khá - Còn Một Vài Lỗ Hổng" : "🚨 Cần Củng Cố Cấp Tốc"}
                  color={scorePercentage >= 80 ? "success" : scorePercentage >= 50 ? "warning" : "error"}
                  sx={{ fontWeight: 'bold', mb: 3 }}
                />

                {/* 6 Competencies Breakdown Progress */}
                <Box width="100%" textAlign="left">
                  <Typography variant="subtitle2" fontWeight="bold" color="#38bdf8" mb={1.5}>
                    📊 Đánh Giá 6 Mũi Nhọn Năng Lực:
                  </Typography>
                  {currentQuestions.map((q, idx) => {
                    const isCorrect = userAnswers[q.id] === q.correctIndex;
                    return (
                      <Box key={q.id} mb={1.2}>
                        <Box display="flex" justifyContent="space-between" mb={0.4}>
                          <Typography variant="caption" color="#cbd5e1" fontWeight={500}>
                            {idx + 1}. {q.topic}
                          </Typography>
                          <Typography variant="caption" color={isCorrect ? '#34d399' : '#f43f5e'} fontWeight="bold">
                            {isCorrect ? 'Đạt chuẩn' : 'Bị rỗng'}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={isCorrect ? 100 : 25}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'rgba(255,255,255,0.06)',
                            '& .MuiLinearProgress-bar': { bgcolor: isCorrect ? '#10b981' : '#f43f5e' },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RotateCcw size={16} />}
                  onClick={handleResetTest}
                  sx={{
                    mt: 3,
                    color: '#c084fc',
                    borderColor: 'rgba(168, 85, 247, 0.4)',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: 2,
                  }}
                >
                  Làm Lại Bài Test
                </Button>
              </Paper>
            </Grid>

            {/* Right: Knowledge Gap & Pitfall Prescription List */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3.5,
                  bgcolor: '#090d16',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AlertTriangle size={20} color="#f59e0b" />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#fff', fontSize: '17px' }}>
                    Chỉ Điểm Lỗ Hổng & Bẫy Đề Thi Cần Tránh
                  </Typography>
                </Box>

                {wrongQuestions.length === 0 ? (
                  <Alert severity="success" sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderRadius: 2 }}>
                    🎉 Xin chúc mừng! Bạn đã trả lời đúng 100% tất cả các câu hỏi trong chuyên đề này. Nền tảng tư duy Hóa học của bạn cực kỳ vững chắc!
                  </Alert>
                ) : (
                  <Stack spacing={2}>
                    <Typography variant="caption" color="text.secondary">
                      Dưới đây là {wrongQuestions.length} lỗ hổng kiến thức AI phát hiện từ bài làm của bạn. Đọc kỹ phân tích để không bị mất điểm oan trong phòng thi:
                    </Typography>

                    {wrongQuestions.map((q) => (
                      <Card
                        key={q.id}
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: 2.5,
                          border: '1px solid rgba(244, 63, 94, 0.3)',
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <XCircle size={17} color="#f43f5e" />
                            <Typography variant="subtitle2" fontWeight="bold" color="#f87171">
                              {q.topic}
                            </Typography>
                          </Box>

                          <Typography variant="body2" sx={{ color: '#e2e8f0', fontSize: '13.5px', mb: 1.5, fontWeight: 500 }}>
                            {q.question}
                          </Typography>

                          {/* Correct Answer & Explanation */}
                          <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', mb: 1 }}>
                            <Typography variant="caption" sx={{ color: '#34d399', fontWeight: 'bold', display: 'block', mb: 0.3 }}>
                              ✅ Đáp án đúng: {q.options[q.correctIndex]}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px', lineHeight: 1.5 }}>
                              {q.explanation}
                            </Typography>
                          </Box>

                          {/* Pitfall & Prescription */}
                          <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                            <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 'bold', display: 'block', mb: 0.3 }}>
                              ⚠️ Bẫy đề thi hay gặp:
                            </Typography>
                            <Typography variant="caption" color="#e2e8f0" sx={{ fontSize: '12px', display: 'block', mb: 0.5 }}>
                              {q.pitfall}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 'bold', display: 'block' }}>
                              💡 Lời khuyên khắc phục: <span style={{ fontWeight: 400, color: '#cbd5e1' }}>{q.remedyTip}</span>
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
