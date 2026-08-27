export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  grade?: 10 | 11 | 12;
  topic?: string;
}

export const PRESET_HIGH_SCHOOL_QUIZ_BANK: QuizQuestion[] = [
  // ==========================================
  // KHỐI LỚP 10 (17 CÂU)
  // ==========================================
  {
    grade: 10,
    topic: "Cấu hình electron",
    question: "Cấu hình electron của ion Fe³⁺ (Z = 26) ở trạng thái cơ bản là:",
    options: [
      "[Ar] 3d⁵",
      "[Ar] 3d⁶",
      "[Ar] 3d⁴ 4s¹",
      "[Ar] 3d³ 4s²"
    ],
    correctIndex: 0,
    explanation: "Nguyên tử Fe (Z = 26) có cấu hình [Ar] 3d⁶ 4s². Khi nhường 3 electron để tạo ion Fe³⁺, 2 electron ở phân lớp 4s và 1 electron ở phân lớp 3d bị mất đi, thu được cấu hình bền bán bão hòa phân lớp d là [Ar] 3d⁵."
  },
  {
    grade: 10,
    topic: "Cấu hình electron",
    question: "Cấu hình electron của ion Cu⁺ (Z = 29) ở trạng thái cơ bản là:",
    options: [
      "[Ar] 3d¹⁰",
      "[Ar] 3d⁹ 4s¹",
      "[Ar] 3d⁸ 4s²",
      "[Ar] 3d⁹"
    ],
    correctIndex: 0,
    explanation: "Nguyên tử Cu có cấu hình đặc biệt bền bão hòa [Ar] 3d¹⁰ 4s¹. Khi nhường 1 electron ở phân lớp ngoài cùng 4s tạo ion Cu⁺, cấu hình thu được là [Ar] 3d¹⁰."
  },
  {
    grade: 10,
    topic: "Bảng tuần hoàn",
    question: "Dãy nào sau đây được sắp xếp theo chiều TĂNG DẦN của bán kính nguyên tử?",
    options: [
      "F < O < N < C",
      "C < N < O < F",
      "Na < Mg < Al < Si",
      "K < Na < Li < H"
    ],
    correctIndex: 0,
    explanation: "Trong cùng một chu kì (chu kì 2: C, N, O, F), khi đi từ trái sang phải, điện tích hạt nhân tăng dần làm lực hút tĩnh điện giữa hạt nhân và electron lớp ngoài cùng tăng, dẫn đến bán kính nguyên tử giảm dần: C > N > O > F. Do đó chiều tăng dần là F < O < N < C."
  },
  {
    grade: 10,
    topic: "Bảng tuần hoàn",
    question: "Nguyên tố X ở chu kì 3, nhóm VIA của bảng tuần hoàn. Công thức oxide cao nhất và hydroxide tương ứng của X là:",
    options: [
      "XO₃ và H₂XO₄",
      "X₂O₅ và HXO₃",
      "XO₂ và H₂XO₃",
      "X₂O₇ và HXO₄"
    ],
    correctIndex: 0,
    explanation: "Nguyên tố nhóm VIA có hóa trị cao nhất với oxygen bằng VI (công thức oxide cao nhất là XO₃, ví dụ SO₃). Hydroxide cao nhất tương ứng có dạng acid H₂XO₄ (ví dụ H₂SO₄)."
  },
  {
    grade: 10,
    topic: "Liên kết hóa học",
    question: "Trạng thái lai hóa của nguyên tử trung tâm Carbon trong phân tử ethene (C₂H₄) và ethyne (C₂H₂) lần lượt là:",
    options: [
      "sp² và sp",
      "sp³ và sp²",
      "sp và sp²",
      "sp³ và sp"
    ],
    correctIndex: 0,
    explanation: "Trong C₂H₄ (CH₂=CH₂), mỗi nguyên tử C liên kết với 3 nguyên tử (2 H và 1 C) nên ở trạng thái lai hóa sp² (tạo 1 liên kết pi và 3 liên kết sigma). Trong C₂H₂ (CH≡CH), mỗi nguyên tử C liên kết với 2 nguyên tử (1 H và 1 C) nên ở trạng thái lai hóa sp."
  },
  {
    grade: 10,
    topic: "Liên kết hóa học",
    question: "Yếu tố chính giải thích vì sao nhiệt độ sôi của nước (H₂O, 100 °C) cao hơn rất nhiều so với hydrogen sulfide (H₂S, -60 °C) là:",
    options: [
      "Giữa các phân tử H₂O hình thành mạng lưới liên kết hydrogen liên phân tử bền vững",
      "Phân tử H₂O có khối lượng phân tử lớn hơn H₂S",
      "Liên kết cộng hóa trị H-S bền hơn liên kết H-O",
      "Phân tử H₂S là phân tử phân cực mạnh hơn H₂O"
    ],
    correctIndex: 0,
    explanation: "Oxygen có độ âm điện lớn và bán kính nguyên tử nhỏ hơn Sulfur rất nhiều, tạo điều kiện cho các phân tử H₂O hình thành liên kết hydrogen liên phân tử mạnh. H₂S hầu như không tạo được liên kết hydrogen, do đó H₂O có nhiệt độ sôi cao vượt trội."
  },
  {
    grade: 10,
    topic: "Phản ứng Oxi hóa - Khử",
    question: "Trong phản ứng: 3Cu + 8HNO₃ (loãng) -> 3Cu(NO₃)₂ + 2NO + 4H₂O. Tỉ lệ giữa số phân tử HNO₃ đóng vai trò chất oxi hóa và số phân tử HNO₃ đóng vai trò môi trường là:",
    options: [
      "1 : 3",
      "1 : 4",
      "2 : 3",
      "3 : 1"
    ],
    correctIndex: 0,
    explanation: "Tổng số phân tử HNO₃ tham gia phản ứng là 8. Trong đó có 2 phân tử nhận electron tạo khí NO (đóng vai trò chất oxi hóa) và 6 phân tử tạo gốc NO₃⁻ trong muối Cu(NO₃)₂ (đóng vai trò môi trường). Tỉ lệ là 2 : 6 = 1 : 3."
  },
  {
    grade: 10,
    topic: "Phản ứng Oxi hóa - Khử",
    question: "Phản ứng nào sau đây là phản ứng tự oxi hóa - tự khử (disproportionation)?",
    options: [
      "Cl₂ + 2NaOH -> NaCl + NaClO + H₂O",
      "2KClO₃ -(t°)-> 2KCl + 3O₂",
      "2Fe + 3Cl₂ -(t°)-> 2FeCl₃",
      "Fe₃O₄ + 8HCl -> FeCl₂ + 2FeCl₃ + 4H₂O"
    ],
    correctIndex: 0,
    explanation: "Trong phản ứng Cl₂ + 2NaOH -> NaCl + NaClO + H₂O, nguyên tố Chlorine từ số oxi hóa 0 vừa giảm xuống -1 (trong NaCl, đóng vai trò chất oxi hóa) vừa tăng lên +1 (trong NaClO, đóng vai trò chất khử). Đây là phản ứng tự oxi hóa - tự khử."
  },
  {
    grade: 10,
    topic: "Năng lượng hóa học",
    question: "Cho phản ứng: N₂ (g) + 3H₂ (g) ⇌ 2NH₃ (g), có ΔᵣH°₂₉₈ = -92,2 kJ. Nhận định nào sau đây là ĐÚNG?",
    options: [
      "Phản ứng trên là phản ứng tỏa nhiệt; khi tăng nhiệt độ, cân bằng chuyển dịch theo chiều nghịch",
      "Phản ứng trên là phản ứng thu nhiệt; khi tăng nhiệt độ, cân bằng chuyển dịch theo chiều thuận",
      "Nhiệt tạo thành chuẩn của khí NH₃ là -92,2 kJ/mol",
      "Phản ứng không kèm theo sự thay đổi năng lượng"
    ],
    correctIndex: 0,
    explanation: "Vì ΔᵣH°₂₉₈ < 0 (-92,2 kJ) nên phản ứng là quá trình tỏa nhiệt. Theo nguyên lý Le Chatelier, khi tăng nhiệt độ, hệ thống sẽ chuyển dịch theo chiều chống lại sự tăng nhiệt độ (chiều thu nhiệt, tức chiều nghịch). Lưu ý enthalpy tạo thành chuẩn của NH₃ là -92,2 / 2 = -46,1 kJ/mol."
  },
  {
    grade: 10,
    topic: "Năng lượng hóa học",
    question: "Cho năng lượng liên kết: E_b(H-H) = 436 kJ/mol, E_b(Cl-Cl) = 242 kJ/mol, E_b(H-Cl) = 431 kJ/mol. Biến thiên enthalpy chuẩn của phản ứng: H₂ (g) + Cl₂ (g) -> 2HCl (g) là:",
    options: [
      "-184 kJ",
      "+184 kJ",
      "-247 kJ",
      "+247 kJ"
    ],
    correctIndex: 0,
    explanation: "ΔᵣH°₂₉₈ = ΣE_b(chất đầu) - ΣE_b(sản phẩm) = [E_b(H-H) + E_b(Cl-Cl)] - 2 × E_b(H-Cl) = [436 + 242] - 2 × 431 = 678 - 862 = -184 kJ."
  },
  {
    grade: 10,
    topic: "Tốc độ phản ứng",
    question: "Cho phản ứng đơn giản: 2NO (g) + O₂ (g) -> 2NO₂ (g). Biểu thức định luật tác dụng khối lượng của tốc độ phản ứng là:",
    options: [
      "v = k · [NO]² · [O₂]",
      "v = k · [NO] · [O₂]",
      "v = k · [NO]² · [O₂]²",
      "v = k · [NO] / [O₂]"
    ],
    correctIndex: 0,
    explanation: "Đối với phản ứng đơn giản đồng thể giữa các khí, bậc phản ứng tương ứng với hệ số tỉ lượng trong phương trình: v = k · [NO]² · [O₂]."
  },
  {
    grade: 10,
    topic: "Tốc độ phản ứng",
    question: "Một phản ứng có hệ số nhiệt độ Van't Hoff γ = 2. Khi tăng nhiệt độ từ 20 °C lên 50 °C, tốc độ phản ứng tăng lên bao nhiêu lần?",
    options: [
      "8 lần",
      "6 lần",
      "16 lần",
      "4 lần"
    ],
    correctIndex: 0,
    explanation: "Độ tăng nhiệt độ ΔT = 50 - 20 = 30 °C. Tốc độ tăng: v₂ / v₁ = γ^(ΔT / 10) = 2^(30 / 10) = 2³ = 8 lần."
  },
  {
    grade: 10,
    topic: "Nhóm Halogen",
    question: "Dung dịch hydrohalic acid nào sau đây có tính acid YẾU NHẤT nhưng lại có tính chất đặc biệt ăn mòn được thủy tinh (SiO₂)?",
    options: [
      "HF",
      "HCl",
      "HBr",
      "HI"
    ],
    correctIndex: 0,
    explanation: "Do liên kết H-F rất bền và tạo liên kết hydrogen mạnh, HF phân ly không hoàn toàn trong nước nên là acid yếu. Phản ứng ăn mòn thủy tinh: 4HF + SiO₂ -> SiF₄ + 2H₂O."
  },
  {
    grade: 10,
    topic: "Nhóm Halogen",
    question: "Để phân biệt 3 dung dịch muối NaCl, NaBr, NaI không nhãn, thuốc thử tối ưu được lựa chọn là:",
    options: [
      "Dung dịch AgNO₃",
      "Dung dịch BaCl₂",
      "Dung dịch NaOH",
      "Quỳ tím ẩm"
    ],
    correctIndex: 0,
    explanation: "AgNO₃ tạo kết tủa màu đặc trưng: AgCl (kết tủa trắng), AgBr (kết tủa vàng nhạt), AgI (kết tủa vàng đậm)."
  },
  {
    grade: 10,
    topic: "Nhóm Halogen",
    question: "Dãy các đơn chất halogen được sắp xếp theo chiều GIẢM DẦN tính oxi hóa từ trái sang phải là:",
    options: [
      "F₂ > Cl₂ > Br₂ > I₂",
      "I₂ > Br₂ > Cl₂ > F₂",
      "Cl₂ > F₂ > Br₂ > I₂",
      "F₂ > Br₂ > Cl₂ > I₂"
    ],
    correctIndex: 0,
    explanation: "Trong nhóm VIIA (Halogen), theo chiều tăng của điện tích hạt nhân, bán kính nguyên tử tăng dần, khả năng nhận electron giảm dần nên tính oxi hóa giảm dần: F₂ > Cl₂ > Br₂ > I₂."
  },
  {
    grade: 10,
    topic: "Cấu tạo nguyên tử",
    question: "Số orbital (AO) có trong lớp electron thứ 3 (lớp M, n = 3) của nguyên tử là:",
    options: [
      "9 orbital",
      "4 orbital",
      "18 orbital",
      "3 orbital"
    ],
    correctIndex: 0,
    explanation: "Số orbital trong một lớp n được tính theo công thức n². Với n = 3, số orbital = 3² = 9 AO (bao gồm 1 AO s, 3 AO p và 5 AO d)."
  },
  {
    grade: 10,
    topic: "Liên kết hóa học",
    question: "Phân tử nào sau đây có cấu trúc hình học dạng đường thẳng (góc liên kết 180°)?",
    options: [
      "CO₂",
      "H₂O",
      "SO₂",
      "NH₃"
    ],
    correctIndex: 0,
    explanation: "Trong phân tử CO₂ (O=C=O), nguyên tử trung tâm Carbon ở trạng thái lai hóa sp và không còn cặp electron chưa liên kết, tạo thành hình học đường thẳng với góc liên kết 180°."
  },

  // ==========================================
  // KHỐI LỚP 11 (17 CÂU)
  // ==========================================
  {
    grade: 11,
    topic: "Cân bằng hóa học",
    question: "Cho cân bằng trong bình kín: 2SO₂ (g) + O₂ (g) ⇌ 2SO₃ (g), ΔᵣH°₂₉₈ < 0. Yếu tố nào sau đây làm cân bằng chuyển dịch theo chiều THUẬN?",
    options: [
      "Tăng áp suất chung của hệ hoặc giảm nhiệt độ",
      "Giảm áp suất chung của hệ hoặc tăng nhiệt độ",
      "Thêm chất xúc tác V₂O₅",
      "Giảm nồng độ khí SO₂"
    ],
    correctIndex: 0,
    explanation: "Phản ứng có chiều thuận làm giảm số mol khí (từ 3 mol -> 2 mol) và tỏa nhiệt (ΔᵣH° < 0). Do đó, khi tăng áp suất (chuyển dịch về phía ít mol khí) hoặc giảm nhiệt độ (chuyển dịch về phía tỏa nhiệt), cân bằng đều chuyển dịch theo chiều thuận. Chất xúc tác chỉ làm tăng tốc độ đạt cân bằng chứ không làm chuyển dịch vị trí cân bằng."
  },
  {
    grade: 11,
    topic: "Cân bằng trong dung dịch",
    question: "Giá trị pH của dung dịch Ba(OH)₂ 0,005 M ở 25 °C là:",
    options: [
      "12,0",
      "11,7",
      "2,0",
      "11,0"
    ],
    correctIndex: 0,
    explanation: "Ba(OH)₂ -> Ba²⁺ + 2OH⁻. Nồng độ [OH⁻] = 2 × 0,005 = 0,01 M = 10⁻² M. pOH = -log(10⁻²) = 2 => pH = 14 - pOH = 14 - 2 = 12."
  },
  {
    grade: 11,
    topic: "Cân bằng trong dung dịch",
    question: "Theo thuyết Bronsted - Lowry, chất hoặc ion nào sau đây có tính lưỡng tính (amphoteric)?",
    options: [
      "HCO₃⁻",
      "CO₃²⁻",
      "NH₄⁺",
      "Cl⁻"
    ],
    correctIndex: 0,
    explanation: "Ion HCO₃⁻ vừa có khả năng nhường proton H⁺ (HCO₃⁻ + OH⁻ -> CO₃²⁻ + H₂O - thể hiện tính acid) vừa có khả năng nhận proton H⁺ (HCO₃⁻ + H⁺ -> CO₂ + H₂O - thể hiện tính base), do đó là ion lưỡng tính."
  },
  {
    grade: 11,
    topic: "Nitrogen & Hợp chất",
    question: "Khí nitrogen (N₂) khá trơ về mặt hóa học ở nhiệt độ phòng là do nguyên nhân chính nào sau đây?",
    options: [
      "Liên kết ba giữa 2 nguyên tử N (N≡N) có năng lượng liên kết rất lớn (945 kJ/mol)",
      "Nguyên tử nitrogen có bán kính nguyên tử quá lớn",
      "Nitrogen có độ âm điện nhỏ hơn nhiều so với oxygen",
      "Phân tử nitrogen có cấu tạo phân cực mạnh"
    ],
    correctIndex: 0,
    explanation: "Phân tử N₂ có liên kết ba N≡N rất bền vững với năng lượng liên kết lên tới 945 kJ/mol, đòi hỏi năng lượng hoạt hóa rất cao để bẻ gãy liên kết, khiến N₂ trơ ở nhiệt độ thường."
  },
  {
    grade: 11,
    topic: "Sulfur & Hợp chất",
    question: "Kim loại nào sau đây bị THỤ ĐỘNG HÓA (không tan) trong dung dịch HNO₃ đặc, nguội và H₂SO₄ đặc, nguội?",
    options: [
      "Al, Fe, Cr",
      "Cu, Ag, Au",
      "Zn, Mg, Al",
      "Fe, Cu, Zn"
    ],
    correctIndex: 0,
    explanation: "Al, Fe, Cr bị thụ động hóa trong HNO₃ đặc nguội và H₂SO₄ đặc nguội do tạo màng oxide bảo vệ rất mỏng và trơ trên bề mặt kim loại."
  },
  {
    grade: 11,
    topic: "Đại cương Hóa hữu cơ",
    question: "Trên phổ hồng ngoại (IR) của một hợp chất hữu cơ có một tín hiệu hấp thụ rất mạnh và đặc trưng ở vùng 1715 cm⁻¹. Tín hiệu này đặc trưng cho dao động hóa trị của nhóm chức nào?",
    options: [
      "Liên kết C=O (Carbonyl)",
      "Liên kết O-H (Alcohol)",
      "Liên kết C-O (Ether)",
      "Liên kết C≡C (Alkyne)"
    ],
    correctIndex: 0,
    explanation: "Vùng hấp thụ 1680 - 1750 cm⁻¹ trên phổ IR là peak nhọn, cường độ mạnh đặc trưng của liên kết đôi C=O trong nhóm carbonyl (aldehyde, ketone, carboxylic acid, ester)."
  },
  {
    grade: 11,
    topic: "Đại cương Hóa hữu cơ",
    question: "Phổ khối lượng (MS) của acetone (CH₃COCH₃) xuất hiện peak ion phân tử [M⁺] có giá trị m/z bằng:",
    options: [
      "58",
      "43",
      "15",
      "60"
    ],
    correctIndex: 0,
    explanation: "Công thức phân tử của acetone là C₃H₆O. Khối lượng phân tử M = 12×3 + 1×6 + 16 = 58. Peak ion phân tử [M⁺] có giá trị m/z tương ứng bằng 58."
  },
  {
    grade: 11,
    topic: "Hydrocarbon",
    question: "Sản phẩm chính của phản ứng cộng hydrogen chloride (HCl) vào propene (CH₃-CH=CH₂) theo quy tắc Markovnikov là:",
    options: [
      "2-chloropropane (CH₃-CH(Cl)-CH₃)",
      "1-chloropropane (CH₃-CH₂-CH₂Cl)",
      "1,2-dichloropropane",
      "propyl chloride"
    ],
    correctIndex: 0,
    explanation: "Theo quy tắc Markovnikov, khi cộng tác nhân bất đối xứng HX vào alkene bất đối xứng, phần mang điện dương (H⁺) ưu tiên cộng vào carbon mang nhiều hydrogen hơn (C1), phần mang điện âm (Cl⁻) cộng vào carbon mang ít hydrogen hơn (C2), tạo sản phẩm chính là 2-chloropropane."
  },
  {
    grade: 11,
    topic: "Hydrocarbon",
    question: "Hydrocarbon nào sau đây tạo được kết tủa vàng nhạt khi cho tác dụng với dung dịch AgNO₃ trong NH₃?",
    options: [
      "But-1-yne (CH≡C-CH₂-CH₃)",
      "But-2-yne (CH₃-C≡C-CH₃)",
      "But-2-ene (CH₃-CH=CH-CH₃)",
      "Butane (CH₃-CH₂-CH₂-CH₃)"
    ],
    correctIndex: 0,
    explanation: "Chỉ các alk-1-yne có liên kết ba đầu mạch (có nguyên tử H linh động gắn vào C mang liên kết ba) mới có phản ứng thế ion Ag⁺ tạo kết tủa vàng nhạt: CH≡C-CH₂-CH₃ + AgNO₃ + NH₃ -> AgC≡C-CH₂-CH₃↓ + NH₄NO₃."
  },
  {
    grade: 11,
    topic: "Arene",
    question: "Khi cho toluene (C₆H₅CH₃) tác dụng với Br₂ khan theo tỉ lệ mol 1:1, có mặt bột sắt (Fe) làm xúc tác và đun nóng, sản phẩm thế chính thu được là:",
    options: [
      "Hỗn hợp ortho-bromotoluene và para-bromotoluene",
      "Benzyl bromide (C₆H₅CH₂Br)",
      "meta-bromotoluene",
      "1,3,5-tribromotoluene"
    ],
    correctIndex: 0,
    explanation: "Nhóm methyl (-CH₃) là nhóm đẩy electron (định hướng ortho, para), xúc tác bột Fe kích hoạt phản ứng thế electrophile vào nhân thơm, tạo sản phẩm chính là hỗn hợp o-bromotoluene và p-bromotoluene. (Nếu chiếu sáng as, không có Fe thì mới thế ở nhánh CH₃ tạo benzyl bromide)."
  },
  {
    grade: 11,
    topic: "Alcohol & Phenol",
    question: "Chất nào sau đây tác dụng được với dung dịch NaOH ở điều kiện thường?",
    options: [
      "Phenol (C₆H₅OH)",
      "Ethanol (C₂H₅OH)",
      "Methanol (CH₃OH)",
      "Glycerol (C₃H₅(OH)₃)"
    ],
    correctIndex: 0,
    explanation: "Do ảnh hưởng hút electron của vòng benzene, liên kết O-H trong phenol phân cực mạnh hơn alcohol, làm phenol có tính acid yếu và tác dụng được với dung dịch base mạnh NaOH: C₆H₅OH + NaOH -> C₆H₅ONa + H₂O. Các alcohol không phản ứng với NaOH."
  },
  {
    grade: 11,
    topic: "Alcohol & Phenol",
    question: "Oxi hóa propan-2-ol (CH₃-CH(OH)-CH₃) bằng CuO nung nóng, sản phẩm hữu cơ thu được thuộc loại hợp chất nào?",
    options: [
      "Ketone (Acetone)",
      "Aldehyde (Propanal)",
      "Carboxylic acid (Propanoic acid)",
      "Ester (Propyl acetate)"
    ],
    correctIndex: 0,
    explanation: "Propan-2-ol là alcohol bậc 2. Oxi hóa không hoàn toàn alcohol bậc 2 bằng CuO (t°) sẽ sinh ra ketone tương ứng: CH₃-CH(OH)-CH₃ + CuO -(t°)-> CH₃-CO-CH₃ + Cu + H₂O."
  },
  {
    grade: 11,
    topic: "Hợp chất Carbonyl",
    question: "Thuốc thử Tollens (phức bạc-ammonia [Ag(NH₃)₂]OH) dùng để nhận biết hợp chất nào sau đây nhờ phản ứng tráng gương?",
    options: [
      "Aldehyde (R-CHO)",
      "Ketone (R-CO-R')",
      "Alcohol bậc 1",
      "Alkane"
    ],
    correctIndex: 0,
    explanation: "Nhóm chức aldehyde -CHO có tính khử, bị oxi hóa bởi thuốc thử Tollens tạo lớp bạc kim loại Ag sáng bóng bám vào thành ống nghiệm (phản ứng tráng bạc): RCHO + 2[Ag(NH₃)₂]OH -> RCOONH₄ + 2Ag↓ + 3NH₃ + H₂O."
  },
  {
    grade: 11,
    topic: "Hợp chất Carbonyl",
    question: "Phản ứng tạo kết tủa vàng iodoform (CHI₃) khi tác dụng với I₂ trong môi trường kiềm NaOH xảy ra với hợp chất chứa nhóm cấu trúc nào?",
    options: [
      "Nhóm CH₃-C=O (methyl ketone) hoặc CH₃-CH(OH)-",
      "Nhóm -COOH",
      "Nhóm -O-CH₃ (methoxy)",
      "Nhóm -CH₂-OH (alcohol bậc 1 bất kì)"
    ],
    correctIndex: 0,
    explanation: "Phản ứng iodoform đặc trưng cho các hợp chất có nhóm methyl ketone (CH₃-C=O) như ethanal, acetone, hoặc các alcohol có nhóm CH₃-CH(OH)- có thể bị oxi hóa thành CH₃-C=O."
  },
  {
    grade: 11,
    topic: "Carboxylic Acid",
    question: "Phản ứng este hóa giữa acetic acid (CH₃COOH) và ethanol (C₂H₅OH) là phản ứng thuận nghịch. Để nâng cao hiệu suất phản ứng, người ta thường dùng xúc tác và biện pháp nào?",
    options: [
      "Dùng H₂SO₄ đặc làm xúc tác kiêm hút nước và chưng cất tách ester ra khỏi hỗn hợp",
      "Dùng dung dịch NaOH đặc làm xúc tác",
      "Giảm nồng độ acetic acid",
      "Tăng áp suất trong bình phản ứng"
    ],
    correctIndex: 0,
    explanation: "H₂SO₄ đặc đóng vai trò xúc tác acid và hút nước (sản phẩm), làm cân bằng chuyển dịch theo chiều thuận tạo ester ethyl acetate (CH₃COOC₂H₅). Đồng thời chưng cất tách ester ra cũng giúp cân bằng chuyển dịch theo chiều thuận."
  },
  {
    grade: 11,
    topic: "Carboxylic Acid",
    question: "Dãy nào sau đây sắp xếp các chất theo chiều TĂNG DẦN tính acid từ trái qua phải?",
    options: [
      "C₂H₅OH < C₆H₅OH < CH₃COOH < HCOOH",
      "CH₃COOH < HCOOH < C₆H₅OH < C₂H₅OH",
      "C₆H₅OH < C₂H₅OH < HCOOH < CH₃COOH",
      "HCOOH < CH₃COOH < C₆H₅OH < C₂H₅OH"
    ],
    correctIndex: 0,
    explanation: "Ethanol (alcohol) có tính acid cực yếu < Phenol (tính acid yếu) < Acetic acid (nhóm CH₃ đẩy electron làm giảm độ phân cực liên kết O-H) < Formic acid (HCOOH không có nhóm đẩy electron nên tính acid mạnh hơn CH₃COOH)."
  },
  {
    grade: 11,
    topic: "Nitrogen & Sulfur",
    question: "Nguyên nhân chính gây ra hiện tượng mưa acid (pH < 5,6) trong khí quyển bị ô nhiễm là do khí thải nào sau đây?",
    options: [
      "SO₂ và các nitrogen oxide (NOx)",
      "CO₂ và CH₄",
      "CFCs và O₃",
      "N₂ và H₂"
    ],
    correctIndex: 0,
    explanation: "Khí SO₂ và NOx phát thải từ quá trình đốt nhiên liệu hóa thạch bị oxi hóa trong khí quyển kết hợp với nước mưa tạo thành dung dịch loãng của sulfuric acid (H₂SO₄) và nitric acid (HNO₃), gây mưa acid."
  },

  // ==========================================
  // KHỐI LỚP 12 (16 CÂU)
  // ==========================================
  {
    grade: 12,
    topic: "Ester - Lipid",
    question: "Xà phòng hóa hoàn toàn triolein ((C₁₇H₃₃COO)₃C₃H₅) bằng dung dịch NaOH dư, đun nóng thu được glycerol và muối nào sau đây?",
    options: [
      "Sodium oleate (C₁₇H₃₃COONa)",
      "Sodium stearate (C₁₇H₃₅COONa)",
      "Sodium palmitate (C₁₅H₃₁COONa)",
      "Sodium linoleate (C₁₇H₃₁COONa)"
    ],
    correctIndex: 0,
    explanation: "Phương trình phản ứng: (C₁₇H₃₃COO)₃C₃H₅ + 3NaOH -(t°)-> 3C₁₇H₃₃COONa (sodium oleate) + C₃H₅(OH)₃ (glycerol)."
  },
  {
    grade: 12,
    topic: "Ester - Lipid",
    question: "Chất béo nào sau đây tồn tại ở trạng thái LỎNG ở nhiệt độ phòng (dầu thực vật)?",
    options: [
      "Triolein ((C₁₇H₃₃COO)₃C₃H₅)",
      "Tristearin ((C₁₇H₃₅COO)₃C₃H₅)",
      "Tripalmitin ((C₁₅H₃₁COO)₃C₃H₅)",
      "Mỡ động vật đông đặc"
    ],
    correctIndex: 0,
    explanation: "Chất béo chứa chủ yếu gốc acid béo không no (như gốc oleate C₁₇H₃₃-, linoleate C₁₇H₃₁-) có nhiệt độ nóng chảy thấp, tồn tại ở trạng thái lỏng ở nhiệt độ thường. Tristearin và Tripalmitin chứa gốc no nên ở trạng thái rắn."
  },
  {
    grade: 12,
    topic: "Carbohydrate",
    question: "Carbohydrate nào sau đây là DISACCHARIDE có cấu trúc gồm một gốc α-glucose và một gốc β-fructose liên kết qua nguyên tử oxygen?",
    options: [
      "Saccharose (Sucrose)",
      "Maltose",
      "Glucose",
      "Cellulose"
    ],
    correctIndex: 0,
    explanation: "Phân tử Saccharose gồm một gốc α-glucose liên kết với một gốc β-fructose qua liên kết α,β-1,2-glycosidic. Do không còn nhóm -OH hemiacetal tự do nên Saccharose không có phản ứng tráng bạc."
  },
  {
    grade: 12,
    topic: "Carbohydrate",
    question: "Thuốc súng không khói (cellulose trinitrate) được điều chế bằng phản ứng este hóa giữa cellulose với chất nào?",
    options: [
      "HNO₃ đặc có mặt H₂SO₄ đặc làm xúc tác",
      "Dung dịch HNO₃ loãng",
      "Khí NO₂ ở áp suất cao",
      "Dung dịch NaNO₃ trong môi trường acid"
    ],
    correctIndex: 0,
    explanation: "Phương trình phản ứng: [C₆H₇O₂(OH)₃]n + 3nHNO₃ (đặc) -(H₂SO₄ đặc, t°)-> [C₆H₇O₂(ONO₂)₃]n (cellulose trinitrate) + 3nH₂O."
  },
  {
    grade: 12,
    topic: "Carbohydrate",
    question: "Để nhận biết hồ tinh bột ở nhiệt độ thường, thuốc thử đặc trưng tạo dung dịch màu xanh tím là:",
    options: [
      "Dung dịch Iodine (I₂)",
      "Dung dịch AgNO₃/NH₃",
      "Cu(OH)₂ ở nhiệt độ thường",
      "Dung dịch Bromine"
    ],
    correctIndex: 0,
    explanation: "Cấu trúc xoắn ốc của chuỗi amylose trong tinh bột hấp phụ các phân tử iodine (I₂) tạo thành phức chất bọc có màu xanh tím đặc trưng. Khi đun nóng màu biến mất, để nguội màu xuất hiện trở lại."
  },
  {
    grade: 12,
    topic: "Amine",
    question: "Dãy nào sau đây sắp xếp các amine và hợp chất amine theo chiều TĂNG DẦN tính base?",
    options: [
      "Aniline (C₆H₅NH₂) < Ammonia (NH₃) < Methylamine (CH₃NH₂) < Dimethylamine ((CH₃)₂NH)",
      "Dimethylamine < Methylamine < NH₃ < Aniline",
      "NH₃ < Aniline < Methylamine < Dimethylamine",
      "Aniline < Dimethylamine < Methylamine < NH₃"
    ],
    correctIndex: 0,
    explanation: "Vòng benzene hút electron làm giảm mật độ electron trên nguyên tử N => Aniline có tính base rất yếu (không làm đổi màu quỳ tím). Nhóm alkyl (-CH₃) đẩy electron làm tăng mật độ electron trên N => (CH₃)₂NH có 2 nhóm đẩy > CH₃NH₂ > NH₃."
  },
  {
    grade: 12,
    topic: "Amino Acid & Peptide",
    question: "Amino acid là hợp chất hữu cơ tạp chức, trong phân tử chứa đồng thời:",
    options: [
      "Nhóm amino (-NH₂) và nhóm carboxyl (-COOH)",
      "Nhóm hydroxyl (-OH) và nhóm carboxyl (-COOH)",
      "Nhóm amino (-NH₂) và nhóm carbonyl (>C=O)",
      "Nhóm nitro (-NO₂) và nhóm carboxyl (-COOH)"
    ],
    correctIndex: 0,
    explanation: "Theo định nghĩa, amino acid là loại hợp chất hữu cơ tạp chức mà phân tử chứa đồng thời nhóm amino (-NH₂) có tính base và nhóm carboxyl (-COOH) có tính acid."
  },
  {
    grade: 12,
    topic: "Amino Acid & Peptide",
    question: "Phản ứng màu biuret dùng Cu(OH)₂ trong môi trường kiềm để nhận biết các hợp chất peptide có tối thiểu bao nhiêu liên kết peptide?",
    options: [
      "2 liên kết peptide trở lên (tripeptide trở lên)",
      "1 liên kết peptide (dipeptide)",
      "3 liên kết peptide trở lên",
      "Bất kì hợp chất chứa nitrogen nào"
    ],
    correctIndex: 0,
    explanation: "Phản ứng màu biuret tạo phức chất màu tím đặc trưng giữa ion Cu²⁺ với các nguyên tử nitrogen trong liên kết peptide. Phản ứng yêu cầu tối thiểu 2 liên kết peptide kế tiếp nhau, do đó tripeptide trở lên và protein mới có phản ứng màu biuret (dipeptide không có)."
  },
  {
    grade: 12,
    topic: "Polymer",
    question: "Polymer nào sau đây được tổng hợp bằng phản ứng TRÙNG NGƯNG?",
    options: [
      "Tơ nilon-6,6 (Poly(hexamethylene adipamide))",
      "Polyethylene (PE)",
      "Poly(vinyl chloride) (PVC)",
      "Cao su Buna (Polybutadiene)"
    ],
    correctIndex: 0,
    explanation: "Tơ nilon-6,6 được điều chế bằng phản ứng trùng ngưng giữa hexamethylenediamine (H₂N-(CH₂)₆-NH₂) và adipic acid (HOOC-(CH₂)₄-COOH) đồng thời giải phóng các phân tử nước H₂O. PE, PVC, Cao su Buna đều là sản phẩm của phản ứng trùng hợp."
  },
  {
    grade: 12,
    topic: "Polymer",
    question: "Cao su Buna-S là sản phẩm đồng trùng hợp giữa butadiene (CH₂=CH-CH=CH₂) và monome nào?",
    options: [
      "Styrene (C₆H₅-CH=CH₂)",
      "Acrylonitrile (CH₂=CH-CN)",
      "Sulfur (Lưu huỳnh)",
      "Vinyl chloride (CH₂=CH-Cl)"
    ],
    correctIndex: 0,
    explanation: "Chữ 'S' trong cao su Buna-S là viết tắt của Styrene. Phản ứng đồng trùng hợp giữa buta-1,3-diene và styrene tạo cao su Buna-S có độ bền cơ học cao."
  },
  {
    grade: 12,
    topic: "Pin điện hóa & Thế điện cực",
    question: "Cho thế điện cực chuẩn: E°(Zn²⁺/Zn) = -0,76 V và E°(Cu²⁺/Cu) = +0,34 V. Suất điện động chuẩn của pin Galvani Zn - Cu (pin Daniell) là:",
    options: [
      "+1,10 V",
      "+0,42 V",
      "-1,10 V",
      "-0,42 V"
    ],
    correctIndex: 0,
    explanation: "Suất điện động chuẩn của pin: E°pin = E°catot (cực dương) - E°anot (cực âm) = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = (+0,34) - (-0,76) = +1,10 V."
  },
  {
    grade: 12,
    topic: "Pin điện hóa & Thế điện cực",
    question: "Cho thế điện cực chuẩn: E°(Ag⁺/Ag) = +0,80 V; E°(Fe²⁺/Fe) = -0,44 V; E°(Fe³⁺/Fe²⁺) = +0,77 V. Chiều phản ứng tự phát xảy ra ở điều kiện chuẩn là:",
    options: [
      "Fe²⁺ + Ag⁺ -> Fe³⁺ + Ag",
      "Fe³⁺ + Ag -> Fe²⁺ + Ag⁺",
      "Fe + 2Fe³⁺ -> 3Fe²⁺",
      "Fe + 2Ag⁺ -> Fe²⁺ + 2Ag"
    ],
    correctIndex: 0,
    explanation: "Theo quy tắc alpha (hoặc tính suất điện động E°pin > 0): E°(Ag⁺/Ag) = +0,80 V > E°(Fe³⁺/Fe²⁺) = +0,77 V => Ag⁺ là chất oxi hóa mạnh hơn Fe³⁺, Fe²⁺ là chất khử mạnh hơn Ag. Do đó phản ứng tự phát là: Fe²⁺ + Ag⁺ -> Fe³⁺ + Ag (E°pin = 0,80 - 0,77 = +0,03 V > 0)."
  },
  {
    grade: 12,
    topic: "Điện phân",
    question: "Điện phân dung dịch CuSO₄ với điện cực trơ (graphite), tại ANODE (cực dương) xảy ra quá trình nào sau đây?",
    options: [
      "2H₂O -> O₂ + 4H⁺ + 4e (Nước bị oxi hóa giải phóng khí O₂)",
      "Cu²⁺ + 2e -> Cu (Khử Cu²⁺)",
      "SO₄²⁻ bị oxi hóa giải phóng SO₂",
      "2H₂O + 2e -> H₂ + 2OH⁻"
    ],
    correctIndex: 0,
    explanation: "Tại Anode (cực dương), ion SO₄²⁻ là gốc acid có oxygen có số oxi hóa cao nhất (+6) nên không bị oxi hóa. Nước bị oxi hóa thay thế: 2H₂O -> O₂↑ + 4H⁺ + 4e."
  },
  {
    grade: 12,
    topic: "Điện phân",
    question: "Điện phân nóng chảy hợp chất nào sau đây là phương pháp công nghiệp duy nhất dùng để sản xuất kim loại Nhôm (Aluminium)?",
    options: [
      "Al₂O₃ nóng chảy với chất phụ gia cryolite (Na₃AlF₆)",
      "AlCl₃ nóng chảy",
      "Al(NO₃)₃ nóng chảy",
      "Al₂(SO₄)₃ nóng chảy"
    ],
    correctIndex: 0,
    explanation: "AlCl₃ là hợp chất cộng hóa trị thăng hoa ở nhiệt độ cao, không dẫn điện khi nóng chảy. Do đó người ta phải điện phân Al₂O₃ nóng chảy hòa tan trong cryolite (Na₃AlF₆) để hạ nhiệt độ nóng chảy từ 2050 °C xuống ~950 °C và tăng độ dẫn điện."
  },
  {
    grade: 12,
    topic: "Phức chất",
    question: "Trong phức chất aqua [Cu(H₂O)₆]²⁺, nguyên tử trung tâm và phối tử (ligand) lần lượt là:",
    options: [
      "Ion Cu²⁺ và phân tử H₂O",
      "Ion Cu⁺ và phân tử H₂O",
      "Phân tử H₂O và ion Cu²⁺",
      "Ion Cu²⁺ và ion OH⁻"
    ],
    correctIndex: 0,
    explanation: "Trong phức chất [Cu(H₂O)₆]²⁺, ion Cu²⁺ đóng vai trò là nguyên tử/ion trung tâm (nhận cặp electron tự do) và 6 phân tử H₂O đóng vai trò là phối tử liên kết phối trí với số phối trí bằng 6."
  },
  {
    grade: 12,
    topic: "Phức chất",
    question: "Khi cho dung dịch NH₃ dư vào dung dịch CuSO₄, ban đầu xuất hiện kết tủa xanh nhạt, sau đó kết tủa tan dần tạo thành dung dịch màu xanh lam thẫm do tạo thành phức chất nào?",
    options: [
      "[Cu(NH₃)₄(H₂O)₂]²⁺ (hoặc [Cu(NH₃)₄]²⁺)",
      "[Cu(OH)₄]²⁻",
      "[Cu(NH₃)₆]³⁺",
      "[CuCl₄]²⁻"
    ],
    correctIndex: 0,
    explanation: "Ban đầu NH₃ tạo môi trường base làm kết tủa Cu(OH)₂: Cu²⁺ + 2NH₃ + 2H₂O -> Cu(OH)₂↓ + 2NH₄⁺. Sau đó NH₃ dư thế phối tử tạo phức chất tan màu xanh lam thẫm đặc trưng: Cu(OH)₂ + 4NH₃ -> [Cu(NH₃)₄]²⁺ + 2OH⁻."
  }
];

/**
 * Get a random high school chemistry question from the preset bank,
 * prioritizing questions that haven't been asked yet in the current session.
 */
export function getPresetQuizQuestion(askedSet?: Set<string>): QuizQuestion {
  if (!askedSet || askedSet.size === 0) {
    return PRESET_HIGH_SCHOOL_QUIZ_BANK[Math.floor(Math.random() * PRESET_HIGH_SCHOOL_QUIZ_BANK.length)];
  }

  const unasked = PRESET_HIGH_SCHOOL_QUIZ_BANK.filter(
    q => !askedSet.has(q.question.trim().toLowerCase())
  );

  if (unasked.length > 0) {
    return unasked[Math.floor(Math.random() * unasked.length)];
  }

  // If all 50 questions have been asked in this session, reset and return any random question
  return PRESET_HIGH_SCHOOL_QUIZ_BANK[Math.floor(Math.random() * PRESET_HIGH_SCHOOL_QUIZ_BANK.length)];
}
