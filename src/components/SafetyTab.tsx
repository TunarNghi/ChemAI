"use client";

import ChemicalBondViewer3D, {
  MOLECULES,
  MoleculeData,
} from "@/components/ChemicalBondViewer3D";
import { callGeminiAPI, supabase } from "@/lib/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  Box as Box3DIcon,
  Flame,
  Info,
  Layers,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface SafetyItem {
  name: string;
  formula: string;
  category: "ia" | "iia" | "iiia" | "iva" | "va" | "via" | "viia" | "acid" | "base" | "gas" | "organic" | "salt_other";
  hazard: string;
  ir: string;
  ms: string;
  moleculeKey?: string;
  electronConfig?: string;
  flameColor?: string;
  oxidationStates?: string;
}

const CATEGORIES = [
  { id: "all", label: "Tất cả", icon: "🌟", color: "#38bdf8" },
  { id: "ia", label: "IA: Kim loại Kiềm", icon: "⚡", color: "#eab308" },
  { id: "iia", label: "IIA: Kiềm Thổ", icon: "🪨", color: "#06b6d4" },
  { id: "iiia", label: "IIIA: Bo - Nhôm", icon: "🧱", color: "#8b5cf6" },
  { id: "iva", label: "IVA: Cacbon - Silic", icon: "💎", color: "#ec4899" },
  { id: "va", label: "VA: Nitơ - Photpho", icon: "🧪", color: "#f97316" },
  { id: "via", label: "VIA: Oxi - Lưu huỳnh", icon: "🔥", color: "#ef4444" },
  { id: "viia", label: "VIIA: Halogen", icon: "❄️", color: "#10b981" },
  { id: "acid", label: "Axit (Acid)", icon: "🧪", color: "#f43f5e" },
  { id: "base", label: "Bazơ / Kiềm", icon: "🧴", color: "#3b82f6" },
  { id: "gas", label: "Khí độc & Nguy hiểm", icon: "☣️", color: "#f59e0b" },
  { id: "organic", label: "Hữu cơ & Dung môi", icon: "🧬", color: "#14b8a6" },
  { id: "salt_other", label: "Muối & Khác", icon: "🧂", color: "#a855f7" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

export interface GroupHandbookInfo {
  groupCode: string;
  name: string;
  valenceConfig: string;
  elements: string[];
  oxidationStates: string;
  generalTrends: string;
  chemicalProperties: {
    title: string;
    description: string;
    equation?: string;
  }[];
  flameTest?: { element: string; color: string; hex: string }[];
  safetyNotes: string;
  color: string;
}

const PERIODIC_GROUPS_HANDBOOK: Record<string, GroupHandbookInfo> = {
  ia: {
    groupCode: "Nhóm IA",
    name: "Nhóm Kim Loại Kiềm (Alkali Metals)",
    valenceConfig: "ns¹ (1 electron hóa trị lớp ngoài cùng)",
    elements: ["Li (Liti)", "Na (Natri)", "K (Kali)", "Rb (Rubiđi)", "Cs (Xesi)", "Fr (Franxi - phóng xạ)"],
    oxidationStates: "+1 (duy nhất trong mọi hợp chất)",
    generalTrends: "Từ Li → Cs: Bán kính nguyên tử tăng dần, năng lượng ion hóa I₁ giảm dần (520 → 376 kJ/mol) → Tính khử tăng dần. Kim loại mềm dễ cắt bằng dao, nhiệt độ nóng chảy thấp và giảm dần.",
    chemicalProperties: [
      {
        title: "1. Tính khử cực mạnh (Mạnh nhất trong các kim loại)",
        description: "Nguyên tử kim loại kiềm rất dễ nhường 1e để đạt cấu hình khí hiếm bền vững: M → M⁺ + 1e.",
      },
      {
        title: "2. Tác dụng mãnh liệt với Nước (H₂O)",
        description: "Phản ứng ngay ở nhiệt độ thường tỏa nhiệt cực lớn, làm nóng chảy Na/K thành viên bi chạy trên mặt nước và sinh khí H₂ dễ nổ.",
        equation: "2M + 2H₂O → 2MOH + H₂↑   (ví dụ: 2Na + 2H₂O → 2NaOH + H₂↑)",
      },
      {
        title: "3. Tác dụng với Oxi (O₂) & Phi kim",
        description: "Cháy mạnh trong không khí tạo oxit bazơ M₂O, peoxit M₂O₂ (Na₂O₂) hoặc supeoxit MO₂ (KO₂). Tác dụng mãnh liệt với halogen tạo muối ion MX.",
        equation: "4Li + O₂ → 2Li₂O ;  2Na + O₂ (đốt) → Na₂O₂ ;  2K + Cl₂ → 2KCl",
      },
      {
        title: "4. Tính bazơ của Hiđroxit",
        description: "Dung dịch MOH là các bazơ kiềm rất mạnh, tính bazơ tăng dần theo thứ tự: LiOH < NaOH < KOH < RbOH < CsOH.",
      },
    ],
    flameTest: [
      { element: "Li (Liti)", color: "Đỏ tươi (Crimson)", hex: "#ef4444" },
      { element: "Na (Natri)", color: "Vàng tươi (Bright Yellow)", hex: "#eab308" },
      { element: "K (Kali)", color: "Tím hoa cà (Lilac Purple)", hex: "#c084fc" },
      { element: "Rb (Rubiđi)", color: "Đỏ thẫm (Dark Red)", hex: "#dc2626" },
      { element: "Cs (Xesi)", color: "Xanh lam nhạt (Sky Blue)", hex: "#38bdf8" },
    ],
    safetyNotes: "Tuyệt đối bảo quản ngâm chìm hoàn toàn trong dầu hỏa khan (hoặc bao sáp parafin kín). KHI CHÁY CẤM DÙNG NƯỚC HOẶC BÌNH CO₂! Chỉ dùng cát khô hoặc bột chữa cháy kim loại chuyên dụng (Class D).",
    color: "#eab308",
  },
  iia: {
    groupCode: "Nhóm IIA",
    name: "Nhóm Kim Loại Kiềm Thổ (Alkaline Earth Metals)",
    valenceConfig: "ns² (2 electron hóa trị lớp ngoài cùng)",
    elements: ["Be (Beri)", "Mg (Magie)", "Ca (Canxi)", "Sr (Stronti)", "Ba (Bari)", "Ra (Rađi - phóng xạ)"],
    oxidationStates: "+2 (duy nhất trong hợp chất)",
    generalTrends: "Từ Be → Ba: Bán kính nguyên tử tăng, năng lượng ion hóa I₁ và I₂ giảm → Tính khử tăng dần. Be trơ với nước, Mg tác dụng chậm với nước nóng, Ca, Sr, Ba tác dụng mạnh ở nhiệt độ thường.",
    chemicalProperties: [
      {
        title: "1. Tính khử mạnh (kém hơn nhóm IA cùng chu kỳ)",
        description: "Dễ nhường 2 electron hóa trị để tạo cation 2+: M → M²⁺ + 2e.",
      },
      {
        title: "2. Phản ứng với Nước (H₂O)",
        description: "Be không phản ứng do màng oxit bền. Mg tác dụng chậm với nước nóng. Ca, Sr, Ba phản ứng mạnh ở nhiệt độ thường giải phóng H₂.",
        equation: "Ca + 2H₂O → Ca(OH)₂↓ + H₂↑  ;  Ba + 2H₂O → Ba(OH)₂ + H₂↑",
      },
      {
        title: "3. Tác dụng với Axit (HCl, H₂SO₄ loãng)",
        description: "Khử ion H⁺ thành khí H₂ rất nhanh và giải phóng nhiệt.",
        equation: "Mg + 2HCl → MgCl₂ + H₂↑",
      },
      {
        title: "4. Phản ứng đặc biệt của Magie trong khí CO₂",
        description: "Magie có ái lực cực mạnh với Oxi, có thể cháy sáng chói ngay trong môi trường khí CO₂.",
        equation: "2Mg + CO₂ → 2MgO + C  (Cấm dùng bình CO₂ dập đám cháy Magie!)",
      },
      {
        title: "5. Tính bazơ & Lưỡng tính của Hiđroxit",
        description: "Be(OH)₂ là hiđroxit lưỡng tính; Mg(OH)₂ bazơ yếu; Ca(OH)₂, Sr(OH)₂, Ba(OH)₂ là các bazơ mạnh (tính bazơ tăng dần từ Be → Ba).",
      },
    ],
    flameTest: [
      { element: "Ca (Canxi)", color: "Đỏ da cam / Đỏ gạch (Brick Red)", hex: "#ea580c" },
      { element: "Sr (Stronti)", color: "Đỏ son rực rỡ (Crimson / Scarlet)", hex: "#e11d48" },
      { element: "Ba (Bari)", color: "Lục vàng / Xanh táo (Apple Green)", hex: "#84cc16" },
      { element: "Mg (Magie)", color: "Trắng chói lòa (Dazzling White)", hex: "#f8fafc" },
    ],
    safetyNotes: "Bụi Beri và hợp chất Ba²⁺ tan rất độc đối với cơ thể. Phoi magie bột dễ gây cháy nổ nhiệt độ cao (~3000°C).",
    color: "#06b6d4",
  },
  iiia: {
    groupCode: "Nhóm IIIA",
    name: "Nhóm Bo - Nhôm (Boron - Aluminium Group)",
    valenceConfig: "ns² np¹ (3 electron lớp ngoài cùng)",
    elements: ["B (Bo - phi kim/bán dẫn)", "Al (Nhôm)", "Ga (Gali)", "In (Inđi)", "Tl (Tali)"],
    oxidationStates: "+3 (phổ biến nhất), +1 (tăng độ bền đối với Tl)",
    generalTrends: "Từ Bo (phi kim) đến Tali (kim loại), tính kim loại tăng dần rõ rệt. Nhôm là kim loại phổ biến nhất vỏ Trái Đất (chiếm ~8%).",
    chemicalProperties: [
      {
        title: "1. Tính khử của Nhôm (Al)",
        description: "Al có tính khử mạnh (Al → Al³⁺ + 3e). Được bảo vệ bởi màng oxit Al₂O₃ siêu mỏng, mịn và trơ ngăn cản sự ăn mòn của không khí và nước.",
        equation: "4Al + 3O₂ → 2Al₂O₃  ;  2Al + 6HCl → 2AlCl₃ + 3H₂↑",
      },
      {
        title: "2. Tính chất LƯỠNG TÍNH của Al₂O₃ và Al(OH)₃",
        description: "Tác dụng được với cả dung dịch axit mạnh và dung dịch bazơ kiềm mạnh.",
        equation: "Al(OH)₃ + NaOH → Na[Al(OH)₄] (hoặc NaAlO₂ + 2H₂O) ;  Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O",
      },
      {
        title: "3. Phản ứng Nhiệt Nhôm",
        description: "Nhôm khử các oxit kim loại ở nhiệt độ cao để luyện kim hoặc hàn gắn đường ray.",
        equation: "2Al + Fe₂O₃ (nhiệt độ cao) → Al₂O₃ + 2Fe (tỏa nhiệt > 2000°C)",
      },
      {
        title: "4. Hiện tượng Thụ Động Hóa",
        description: "Al bị thụ động hóa (không phản ứng) trong dung dịch HNO₃ đặc nguội và H₂SO₄ đặc nguội do tạo màng oxit trơ đặc biệt.",
      },
    ],
    safetyNotes: "Bột nhôm mịn khi bay lơ lửng trong không khí có thể gây nổ bụi áp suất cao. Tránh tiếp xúc dung dịch aluminat ăn da.",
    color: "#8b5cf6",
  },
  iva: {
    groupCode: "Nhóm IVA",
    name: "Nhóm Cacbon - Silic (Carbon - Silicon Group)",
    valenceConfig: "ns² np² (4 electron lớp ngoài cùng)",
    elements: ["C (Cacbon - phi kim)", "Si (Silic - bán dẫn)", "Ge (Gecmani)", "Sn (Thiếc - kim loại)", "Pb (Chì - kim loại)"],
    oxidationStates: "-4, 0, +2, +4 (số oxi hóa +4 bền ở C, Si; +2 bền hơn ở Pb)",
    generalTrends: "Từ C → Pb: Tính phi kim giảm dần, tính kim loại tăng dần. C, Si là phi kim/bán dẫn; Ge là chất bán kim; Sn, Pb là kim loại điển hình.",
    chemicalProperties: [
      {
        title: "1. Tính Khử và Tính Oxi Hóa của Cacbon (C)",
        description: "Cacbon vừa có tính khử (cháy trong O₂, khử oxit kim loại ở nhiệt độ cao) vừa có tính oxi hóa (tác dụng với kim loại, H₂).",
        equation: "C + O₂ → CO₂  ;  C + CuO (t°) → Cu + CO↑  ;  C + 2H₂ (Ni, t°) → CH₄",
      },
      {
        title: "2. Tính chất Oxit Cacbon (CO và CO₂)",
        description: "CO là oxit trung tính có tính khử rất mạnh ở nhiệt độ cao. CO₂ là oxit axit tác dụng với dung dịch kiềm tạo muối cacbonat/hiđrocacbonat.",
        equation: "3CO + Fe₂O₃ (t°) → 2Fe + 3CO₂↑  ;  CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O",
      },
      {
        title: "3. Tính chất đặc biệt của Silic (Si) & Silic Đioxit (SiO₂)",
        description: "SiO₂ trơ với hầu hết các axit nhưng tan dễ dàng trong axit flohiđric (HF) - phản ứng ứng dụng để khắc chữ lên thủy tinh.",
        equation: "SiO₂ + 4HF → SiF₄↑ + 2H₂O",
      },
    ],
    safetyNotes: "Khí CO là chất độc không màu không mùi làm ngạt máu gây tử vong âm thầm. Axit HF ngấm qua da gây hoại tử tủy xương. Bụi chì (Pb) gây ngộ độc chì mãn tính.",
    color: "#ec4899",
  },
  va: {
    groupCode: "Nhóm VA",
    name: "Nhóm Nitơ - Photpho (Pnictogens)",
    valenceConfig: "ns² np³ (5 electron lớp ngoài cùng)",
    elements: ["N (Nitơ - phi kim)", "P (Photpho - phi kim)", "As (Asen - bán kim)", "Sb (Antimon)", "Bi (Bismut - kim loại)"],
    oxidationStates: "-3, 0, +1, +2, +3, +4, +5 (các mức oxi hóa của Nitơ rất đa dạng)",
    generalTrends: "Tính phi kim giảm dần từ N → Bi. Phân tử N₂ có liên kết ba N≡N siêu bền vững (năng lượng liên kết 945 kJ/mol) nên rất trơ ở nhiệt độ phòng.",
    chemicalProperties: [
      {
        title: "1. Sự Trơ Hóa học của Đơn chất Nitơ (N₂)",
        description: "Chỉ phản ứng ở nhiệt độ rất cao (>3000°C) hoặc có tia lửa điện sét đánh.",
        equation: "N₂ + O₂ (3000°C hoặc tia lửa điện) ⇌ 2NO",
      },
      {
        title: "2. Tính Bazơ yếu & Tính Khử của Amoniac (NH₃)",
        description: "Khí NH₃ tan rất nhiều trong nước tạo môi trường bazơ yếu làm xanh quỳ tím; cháy trong oxi tạo N₂ hoặc NO (có xúc tác Pt).",
        equation: "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻  ;  4NH₃ + 5O₂ (Pt, 850°C) → 4NO + 6H₂O",
      },
      {
        title: "3. Tính Oxi Hóa cực mạnh của Axit Nitric (HNO₃)",
        description: "HNO₃ oxi hóa hầu hết kim loại (trừ Au, Pt) và phi kim lên số oxi hóa cao nhất mà KHÔNG giải phóng khí H₂.",
        equation: "Cu + 4HNO₃ (đặc) → Cu(NO₃)₂ + 2NO₂↑ (nâu đỏ) + 2H₂O",
      },
      {
        title: "4. Dạng thù hình của Photpho (P trắng và P đỏ)",
        description: "Photpho trắng (P₄) rất độc, tự bốc cháy ở 40°C trong không khí (phải ngâm trong nước). Photpho đỏ bền, không độc, dùng làm diêm quẹt.",
      },
    ],
    safetyNotes: "Khí NO₂ nâu đỏ gây phù phổi cấp tử vong. Photpho trắng tự bốc cháy gây bỏng photpho ăn sâu rất đau đớn. Hợp chất Asen (As) là thạch tín cực độc.",
    color: "#f97316",
  },
  via: {
    groupCode: "Nhóm VIA",
    name: "Nhóm Oxi - Lưu Huỳnh (Chalcogens)",
    valenceConfig: "ns² np⁴ (6 electron lớp ngoài cùng)",
    elements: ["O (Oxi - phi kim)", "S (Lưu huỳnh - phi kim)", "Se (Selen)", "Te (Telu)", "Po (Poloni - phóng xạ)"],
    oxidationStates: "-2 (đặc trưng nhất của O); -2, 0, +4, +6 (của S, Se, Te)",
    generalTrends: "Độ âm điện lớn (Oxi đạt 3.44, chỉ sau Flo). Tính phi kim và tính oxi hóa giảm dần từ O → Po. O₂ và O₃ là 2 dạng thù hình có tính oxi hóa mạnh.",
    chemicalProperties: [
      {
        title: "1. Tính Oxi Hóa mạnh của Oxi (O₂) và Ozon (O₃)",
        description: "Ozon có tính oxi hóa mạnh hơn Oxi, oxi hóa được ion I⁻ thành I₂ và oxi hóa kim loại Ag ngay ở nhiệt độ thường.",
        equation: "2Ag + O₃ → Ag₂O + O₂  ;  2KI + O₃ + H₂O → 2KOH + I₂ + O₂ (nhận biết ozon)",
      },
      {
        title: "2. Tính chất Vừa Khử Vừa Oxi Hóa của Lưu Huỳnh (S)",
        description: "Tác dụng với kim loại, H₂ (tính oxi hóa: S⁰ → S⁻²); tác dụng với O₂, axit oxi hóa mạnh (tính khử: S⁰ → S⁺⁴, S⁺⁶).",
        equation: "Hg + S → HgS (xử lý thủy ngân rơi vỡ ở t° phòng) ;  S + O₂ (t°) → SO₂",
      },
      {
        title: "3. Axit Sunfuric Đặc (H₂SO₄ đặc) - Háo nước & Oxi hóa mạnh",
        description: "Hút nước mãnh liệt từ hợp chất hữu cơ (làm than hóa đường) và oxi hóa nhiều kim loại giải phóng khí SO₂.",
        equation: "C₁₂H₂₂O₁₁ (đường) + H₂SO₄ đặc → 12C + 11H₂O  ;  Cu + 2H₂SO₄ (đặc, nóng) → CuSO₄ + SO₂↑ + 2H₂O",
      },
    ],
    safetyNotes: "Axit H₂SO₄ đặc khi pha loãng phải rót từ từ axit vào nước (TUYỆT ĐỐI KHÔNG LÀM NGƯỢC LẠI vì nước sôi bùng bắn axit). Khí SO₂, H₂S kích ứng hô hấp và gây ngộ độc tế bào.",
    color: "#ef4444",
  },
  viia: {
    groupCode: "Nhóm VIIA",
    name: "Nhóm Halogen (Halogens - Tạo Muối)",
    valenceConfig: "ns² np⁵ (7 electron lớp ngoài cùng)",
    elements: ["F (Flo - khí vàng lục nhạt)", "Cl (Clo - khí vàng lục)", "Br (Brom - chất lỏng nâu đỏ)", "I (Iot - tinh thể tím đen)", "At (Astatin)"],
    oxidationStates: "-1 (Flo duy nhất -1); -1, 0, +1, +3, +5, +7 (đối với Cl, Br, I)",
    generalTrends: "Từ F → I: Bán kính nguyên tử tăng, độ âm điện giảm (3.98 → 2.66) → Tính phi kim và tính oxi hóa giảm dần (F₂ > Cl₂ > Br₂ > I₂). Nhiệt độ nóng chảy và sôi tăng dần.",
    chemicalProperties: [
      {
        title: "1. Tính Oxi Hóa Mạnh Nhất của Flo (F₂)",
        description: "Flo có độ âm điện lớn nhất trong mọi nguyên tố, oxi hóa mãnh liệt nước ngay trong bóng tối.",
        equation: "2F₂ + 2H₂O → 4HF + O₂↑",
      },
      {
        title: "2. Quy luật Đẩy Halogen ra khỏi dung dịch muối",
        description: "Halogen đứng trước có tính oxi hóa mạnh hơn đẩy được halogen đứng sau ra khỏi dung dịch muối halogenua.",
        equation: "Cl₂ + 2NaBr → 2NaCl + Br₂  ;  Br₂ + 2NaI → 2NaBr + I₂",
      },
      {
        title: "3. Tác dụng với Nước và Dung dịch Kiềm",
        description: "Clo tác dụng với nước tạo nước clo có tính tẩy màu sát trùng (chứa axit hipoclorơ HClO); tác dụng với NaOH tạo nước Javel.",
        equation: "Cl₂ + H₂O ⇌ HCl + HClO  ;  Cl₂ + 2NaOH → NaCl + NaClO (nước Javel) + H₂O",
      },
      {
        title: "4. Nhận biết Ion Halogenua (X⁻) bằng AgNO₃",
        description: "Thuốc thử AgNO₃ tạo các kết tủa đặc trưng để nhận diện các ion Cl⁻, Br⁻, I⁻.",
        equation: "Ag⁺ + Cl⁻ → AgCl↓ (trắng) ;  Ag⁺ + Br⁻ → AgBr↓ (vàng nhạt) ;  Ag⁺ + I⁻ → AgI↓ (vàng đậm)",
      },
      {
        title: "5. Tính chất Thăng Hoa của Iot (I₂)",
        description: "Iot chuyển trực tiếp từ thể rắn sang hơi màu tím biếc khi đun nóng; làm dung dịch hồ tinh bột chuyển màu xanh lam đặc trưng.",
      },
    ],
    safetyNotes: "Khí Clo, hơi Brom phá hủy màng nhầy và phổi. Nước Javel không được trộn chung với axit hoặc nước rửa bồn cầu (sinh khí Cl₂ gây ngạt tử vong). Axit HF ăn mòn hủy hoại xương.",
    color: "#10b981",
  },
};

const INITIAL_SAFETY_DATA: SafetyItem[] = [
  // --- NHÓM IA: KIM LOẠI KIỀM ---
  {
    name: "Lithium (Li) - Kim loại Kiềm (Nhóm IA)",
    formula: "Li",
    category: "ia",
    hazard: "Kim loại nhẹ nhất (D = 0.534 g/cm³), tính khử rất mạnh. Phản ứng êm dịu hơn với nước sinh khí H₂ dễ cháy. Đốt cháy cho ngọn lửa màu ĐỎ TƯƠI đặc trưng. Bảo quản ngâm trong dầu khoáng hoặc sáp parafin kín.",
    ir: "Kim loại nguyên chất (Mạng BCC)",
    ms: "m/z = 7 (92.5%), 6 (7.5%)",
    electronConfig: "[He] 2s¹",
    flameColor: "🔴 Đỏ tươi (Crimson red)",
    oxidationStates: "+1",
    moleculeKey: "Li",
  },
  {
    name: "Sodium (Na) - Natri (Nhóm IA)",
    formula: "Na",
    category: "ia",
    hazard: "CỰC KỲ NGUY HIỂM: Kim loại mềm dễ cắt bằng dao, tính khử siêu mạnh. Phản ứng mãnh liệt với nước tỏa nhiệt lớn làm nóng chảy Na thành viên bi chạy trên mặt nước, sinh khí H₂ nổ bùng! Cháy ngọn lửa VÀNG TƯƠI. Tuyệt đối ngâm chìm hoàn toàn trong dầu hỏa.",
    ir: "Kim loại nguyên chất (Mạng BCC)",
    ms: "m/z = 23 (100%)",
    electronConfig: "[Ne] 3s¹",
    flameColor: "🟡 Vàng tươi (Bright yellow)",
    oxidationStates: "+1",
    moleculeKey: "Na",
  },
  {
    name: "Potassium (K) - Kali (Nhóm IA)",
    formula: "K",
    category: "ia",
    hazard: "Tính khử cực mạnh, phản ứng nổ phát hỏa ngay khi tiếp xúc nước, tự bốc cháy với ngọn lửa màu TÍM HOA CÀ. Cắt mẫu nhỏ dưới kính bảo hộ, ngâm ngập sâu trong dầu hỏa khan.",
    ir: "Kim loại nguyên chất (Mạng BCC)",
    ms: "m/z = 39 (93.3%), 41 (6.7%)",
    electronConfig: "[Ar] 4s¹",
    flameColor: "🟣 Tím hoa cà (Lilac)",
    oxidationStates: "+1",
    moleculeKey: "K",
  },
  {
    name: "Rubidium (Rb) - Rubiđi (Nhóm IA)",
    formula: "Rb",
    category: "ia",
    hazard: "Cực kỳ nguy hiểm: Tự bốc cháy tức thì trong không khí ẩm, phản ứng nổ tung với nước ngay cả khi nước ở trạng thái băng tuyết (-100°C)! Ngọn lửa màu ĐỎ THẪM.",
    ir: "Kim loại nguyên chất (Mạng BCC)",
    ms: "m/z = 85 (72.2%), 87 (27.8%)",
    electronConfig: "[Kr] 5s¹",
    flameColor: "🔴 Đỏ tím thẫm (Dark red)",
    oxidationStates: "+1",
  },
  {
    name: "Cesium (Cs) - Xesi (Nhóm IA)",
    formula: "Cs",
    category: "ia",
    hazard: "Kim loại hoạt động hóa học mạnh nhất trong các nguyên tố bền. Năng lượng ion hóa I₁ thấp nhất (376 kJ/mol). Nổ dữ dội khi gặp nước. Ứng dụng quan trọng trong tế bào quang điện và chuẩn đồng hồ nguyên tử.",
    ir: "Kim loại nguyên chất (Mạng BCC)",
    ms: "m/z = 133 (100%)",
    electronConfig: "[Xe] 6s¹",
    flameColor: "🔵 Xanh lam nhạt (Sky blue)",
    oxidationStates: "+1",
  },

  // --- NHÓM IIA: KIM LOẠI KIỀM THỔ ---
  {
    name: "Beryllium (Be) - Beri (Nhóm IIA)",
    formula: "Be",
    category: "iia",
    hazard: "Bụi kim loại và hợp chất Beri CỰC ĐỘC, gây viêm phổi berylliosis mãn tính và ung thư. Trơ với nước ở mọi nhiệt độ do màng oxit BeO bảo vệ rất bền. Be(OH)₂ là hiđroxit lưỡng tính.",
    ir: "Kim loại nguyên chất (Mạng HCP)",
    ms: "m/z = 9 (100%)",
    electronConfig: "1s² 2s²",
    flameColor: "⚪ Không phát màu rõ",
    oxidationStates: "+2",
    moleculeKey: "Be",
  },
  {
    name: "Magnesium (Mg) - Magie (Nhóm IIA)",
    formula: "Mg",
    category: "iia",
    hazard: "Bột và phoi Mg cháy trong không khí với ngọn lửa TRẮNG CHÓI LÒA tỏa nhiệt độ cực cao (~3000°C). Cháy được trong CO₂ (2Mg + CO₂ → 2MgO + C) nên CẤM DÙNG BÌNH CHỮA CHÁY CO₂! Phản ứng chậm với nước nóng.",
    ir: "Kim loại nguyên chất (Mạng HCP)",
    ms: "m/z = 24 (79%), 25 (10%), 26 (11%)",
    electronConfig: "[Ne] 3s²",
    flameColor: "⚪ Trắng chói lòa (Dazzling white)",
    oxidationStates: "+2",
    moleculeKey: "Mg",
  },
  {
    name: "Calcium (Ca) - Canxi (Nhóm IIA)",
    formula: "Ca",
    category: "iia",
    hazard: "Kim loại màu xám bạc, phản ứng khá nhanh với nước ở nhiệt độ phòng sinh khí H₂ và dung dịch vôi đục Ca(OH)₂. Đốt cháy phát ngọn lửa màu ĐỎ DA CAM (đỏ gạch). Bụi canxi gây kích ứng mắt.",
    ir: "Kim loại nguyên chất (Mạng FCC)",
    ms: "m/z = 40 (96.9%), 44 (2.1%)",
    electronConfig: "[Ar] 4s²",
    flameColor: "🟠 Đỏ da cam / Đỏ gạch (Brick red)",
    oxidationStates: "+2",
    moleculeKey: "Ca",
  },
  {
    name: "Strontium (Sr) - Stronti (Nhóm IIA)",
    formula: "Sr",
    category: "iia",
    hazard: "Phản ứng mạnh với nước tạo bazơ Sr(OH)₂ và khí H₂. Muối stronti khi cháy cho ngọn lửa màu ĐỎ SON rực rỡ (ứng dụng chính tạo màu đỏ trong pháo hoa và pháo sáng cứu hộ).",
    ir: "Kim loại nguyên chất (Mạng FCC)",
    ms: "m/z = 88 (82.6%), 86 (9.9%), 87 (7.0%)",
    electronConfig: "[Kr] 5s²",
    flameColor: "🔴 Đỏ son rực rỡ (Crimson / Scarlet)",
    oxidationStates: "+2",
  },
  {
    name: "Barium (Ba) - Bari (Nhóm IIA)",
    formula: "Ba",
    category: "iia",
    hazard: "Kim loại kiềm thổ hoạt động hóa học mạnh nhất. Phản ứng dữ dội với nước tạo dung dịch kiềm mạnh Ba(OH)₂. Hợp chất Bari tan (Ba²⁺) CỰC ĐỘC với tim mạch và thần kinh. Cháy ngọn lửa màu LỤC VÀNG (xanh táo).",
    ir: "Kim loại nguyên chất (Mạng BCC)",
    ms: "m/z = 138 (71.7%), 137 (11.2%), 136 (7.8%)",
    electronConfig: "[Xe] 6s²",
    flameColor: "🟢 Lục vàng / Xanh táo (Apple green)",
    oxidationStates: "+2",
    moleculeKey: "Ba",
  },

  // --- NHÓM IIIA: BO - NHÔM ---
  {
    name: "Aluminium (Al) - Nhôm (Nhóm IIIA)",
    formula: "Al",
    category: "iiia",
    hazard: "Kim loại màu trắng bạc, nhẹ, dẫn điện và nhiệt rất tốt. Có màng Al₂O₃ bảo vệ cực bền. Hợp chất Al₂O₃ và Al(OH)₃ có tính lưỡng tính. Bột nhôm dễ gây nổ bụi áp suất cao.",
    ir: "Mạng tinh thể kim loại FCC",
    ms: "m/z = 27 (100%)",
    electronConfig: "[Ne] 3s² 3p¹",
    oxidationStates: "+3",
    moleculeKey: "Al",
  },
  {
    name: "Aluminium Oxide (Al₂O₃) - Nhôm Oxit",
    formula: "Al₂O₃",
    category: "iiia",
    hazard: "Oxit lưỡng tính rất bền nhiệt, không tan trong nước, tan được trong cả dung dịch axit mạnh và bazơ kiềm mạnh.",
    ir: "650, 450 (Al-O)",
    ms: "Chất rắn vô cơ",
    oxidationStates: "+3",
  },
  {
    name: "Aluminium Hydroxide (Al(OH)₃) - Nhôm Hiđroxit",
    formula: "Al(OH)₃",
    category: "iiia",
    hazard: "Kết tủa dạng keo trắng, là hiđroxit lưỡng tính tan trong cả axit mạnh và kiềm mạnh tạo phức aluminat [Al(OH)₄]⁻.",
    ir: "3620, 3520 (O-H), 1020",
    ms: "Chất rắn vô cơ",
    oxidationStates: "+3",
  },

  // --- NHÓM IVA: CACBON - SILIC ---
  {
    name: "Carbon / Graphite (C) - Than Chì / Cacbon",
    formula: "C",
    category: "iva",
    hazard: "Đơn chất phi kim tồn tại ở dạng than chì, kim cương, than hoạt tính. Có tính khử mạnh ở nhiệt độ cao. Bột than dễ cháy âm ỉ sinh khí độc CO.",
    ir: "1580 (Graphite G-band)",
    ms: "m/z = 12 (98.9%), 13 (1.1%)",
    electronConfig: "1s² 2s² 2p²",
    oxidationStates: "-4, 0, +2, +4",
  },
  {
    name: "Silicon (Si) - Silic (Nhóm IVA)",
    formula: "Si",
    category: "iva",
    hazard: "Nguyên tố bán dẫn chiến lược trong ngành sản xuất chip vi điện tử. Tinh thể màu xám ánh kim, trơ ở nhiệt độ phòng nhưng tác dụng với kiềm mạnh và axit HF.",
    ir: "610 (Si-Si)",
    ms: "m/z = 28 (92.2%), 29 (4.7%), 30 (3.1%)",
    electronConfig: "[Ne] 3s² 3p²",
    oxidationStates: "-4, 0, +4",
    moleculeKey: "Si",
  },
  {
    name: "Silicon Dioxide (SiO₂) - Cát / Thạch Anh",
    formula: "SiO₂",
    category: "iva",
    hazard: "Oxit axit mạng tinh thể nguyên tử cực bền. Trơ với hầu hết axit trừ axit HF (phản ứng khắc thủy tinh). Hít phải bụi thạch anh gây bệnh xơ phổi silicosis.",
    ir: "1080 (Si-O-Si), 800, 460",
    ms: "Chất rắn vô cơ",
    oxidationStates: "+4",
  },

  // --- NHÓM VA: NITƠ - PHOTPHO ---
  {
    name: "Nitrogen Gas (N₂) - Khí Nitơ",
    formula: "N₂",
    category: "va",
    hazard: "Khí không màu không mùi chiếm 78% khí quyển. Trơ ở điều kiện thường do liên kết ba N≡N rất bền. Ở nồng độ cao làm ngạt thở do thiếu oxy.",
    ir: "Không hấp thụ IR (đồng hạt nhân)",
    ms: "m/z = 28 (100%)",
    electronConfig: "1s² 2s² 2p³",
    oxidationStates: "-3, 0, +1, +2, +3, +4, +5",
  },
  {
    name: "White Phosphorus (P₄) - Photpho Trắng",
    formula: "P₄",
    category: "va",
    hazard: "CỰC KỲ NGUY HIỂM: Rất độc, tự bốc cháy ở 40°C trong không khí tạo khói trắng P₂O₅ dày đặc. Gây bỏng sâu ăn mòn thịt xương. Bắt buộc ngâm chìm trong nước.",
    ir: "600 (P-P)",
    ms: "m/z = 124 (P₄+), 93, 62, 31",
    electronConfig: "[Ne] 3s² 3p³",
    oxidationStates: "-3, 0, +3, +5",
    moleculeKey: "P4",
  },

  // --- NHÓM VIA: OXI - LƯU HUỲNH ---
  {
    name: "Oxygen Gas (O₂) - Khí Oxi",
    formula: "O₂",
    category: "via",
    hazard: "Khí duy trì sự sống và sự cháy. Oxi nguyên chất nồng độ cao làm tăng nguy cơ bốc cháy nổ dữ dội của các chất hữu cơ và dầu mỡ.",
    ir: "Không hấp thụ IR (đồng hạt nhân)",
    ms: "m/z = 32 (99.8%), 34",
    electronConfig: "1s² 2s² 2p⁴",
    oxidationStates: "-2 (phổ biến), -1 (peoxit), 0",
    moleculeKey: "O2",
  },
  {
    name: "Ozone (O₃) - Khí Ozon",
    formula: "O₃",
    category: "via",
    hazard: "Chất khí màu xanh nhạt có mùi hắc đặc trưng, tính oxi hóa cực mạnh (oxi hóa được Ag ở nhiệt độ thường). Nồng độ cao gây tổn thương phế nang phổi.",
    ir: "1042, 701",
    ms: "m/z = 48, 32, 16",
    oxidationStates: "0",
  },
  {
    name: "Sulfur (S₈) - Lưu Huỳnh",
    formula: "S₈",
    category: "via",
    hazard: "Chất rắn màu vàng chanh dạng vòng S₈. Vừa có tính khử vừa có tính oxi hóa (tác dụng với Hg ngay ở nhiệt độ thường để thu gom thủy ngân).",
    ir: "470 (S-S)",
    ms: "m/z = 256 (S₈+), 128, 64, 32",
    electronConfig: "[Ne] 3s² 3p⁴",
    oxidationStates: "-2, 0, +4, +6",
    moleculeKey: "S8",
  },

  // --- NHÓM VIIA: HALOGEN ---
  {
    name: "Fluorine Gas (F₂) - Khí Flo",
    formula: "F₂",
    category: "viia",
    hazard: "CỰC KỲ NGUY HIỂM: Phi kim có độ âm điện lớn nhất (3.98), tính oxi hóa mạnh nhất. Phản ứng nổ mãnh liệt với nước và hầu hết các chất ngay trong bóng tối.",
    ir: "Không hấp thụ IR",
    ms: "m/z = 38 (100%)",
    electronConfig: "1s² 2s² 2p⁵",
    oxidationStates: "-1 (duy nhất trong hợp chất)",
    moleculeKey: "F2",
  },
  {
    name: "Iodine (I₂) - Iot Tinh Thể",
    formula: "I₂",
    category: "viia",
    hazard: "Chất rắn màu tím đen, dễ thăng hoa thành hơi màu tím biếc. Làm dung dịch hồ tinh bột hóa xanh lam đặc trưng. Bốc hơi gây cay mắt và kích ứng da.",
    ir: "Không hấp thụ IR",
    ms: "m/z = 254 (100%)",
    electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵",
    oxidationStates: "-1, 0, +1, +3, +5, +7",
    moleculeKey: "I2",
  },
  {
    name: "Sodium Hypochlorite (NaClO) - Nước Javel",
    formula: "NaClO",
    category: "viia",
    hazard: "Chất tẩy trắng và khử trùng phổ biến. TUYỆT ĐỐI KHÔNG trộn với axit hoặc nước tẩy bồn cầu vì sẽ giải phóng khí Clo (Cl₂) cực độc gây ngạt tử vong.",
    ir: "750 (Cl-O)",
    ms: "Chất vô cơ",
    oxidationStates: "+1 (Cl)",
  },

  // --- AXIT (ACIDS) ---
  {
    name: "Sulfuric Acid (H₂SO₄) - Axit Sunfuric",
    formula: "H₂SO₄",
    category: "acid",
    hazard: "Ăn mòn cực mạnh, tỏa nhiệt dữ dội khi pha loãng, gây bỏng sâu và phá hủy mô tức thì. Tính háo nước làm than hóa hợp chất hữu cơ.",
    ir: "1220, 1050, 912, 580",
    ms: "98, 81, 80",
    moleculeKey: "H2SO4",
  },
  {
    name: "Nitric Acid (HNO₃) - Axit Nitric",
    formula: "HNO₃",
    category: "acid",
    hazard: "Axit oxi hóa mạnh, làm ố vàng da thịt (phản ứng xantoprotein), hơi axit bốc khói gây phù phổi cấp tính.",
    ir: "1326, 1303, 879",
    ms: "63, 46, 30",
    moleculeKey: "HNO3",
  },
  {
    name: "Hydrochloric Acid (HCl) - Axit Clohiđric",
    formula: "HCl",
    category: "acid",
    hazard: "Dung dịch ăn mòn da, khí HCl bốc khói kích ứng dữ dội niêm mạc mắt và đường hô hấp.",
    ir: "2886",
    ms: "36, 38",
    moleculeKey: "HCl",
  },
  {
    name: "Acetic Acid (CH₃COOH) - Axit Axetic",
    formula: "CH₃COOH",
    category: "acid",
    hazard: "Axit hữu cơ đậm đặc gây bỏng rát da, hơi chua nồng gây kích thích mắt và mũi.",
    ir: "1715 (C=O), 2500-3300 (O-H)",
    ms: "60, 45, 43, 15",
    moleculeKey: "CH3COOH",
  },
  {
    name: "Phosphoric Acid (H₃PO₄) - Axit Photphoric",
    formula: "H₃PO₄",
    category: "acid",
    hazard: "Axit 3 nấc trung bình, không có tính oxi hóa mạnh, gây kích ứng mắt, da và niêm mạc đường tiêu hóa ở nồng độ cao.",
    ir: "1030, 900, 500",
    ms: "98, 81",
    moleculeKey: "H3PO4",
  },
  {
    name: "Hydrofluoric Acid (HF) - Axit Flohiđric",
    formula: "HF",
    category: "acid",
    hazard: "CỰC KỲ NGUY HIỂM: Ăn mòn thủy tinh (khắc chữ), ngấm sâu qua da liên kết với Canxi trong xương gây hoại tử sâu và suy tim.",
    ir: "3960",
    ms: "20, 19",
    moleculeKey: "HF",
  },
  {
    name: "Formic Acid (HCOOH) - Axit Fomic",
    formula: "HCOOH",
    category: "acid",
    hazard: "Axit trong nọc kiến, có tính khử, gây bỏng rát đau đớn và phồng rộp da dữ dội.",
    ir: "1740, 3100-3400",
    ms: "46, 45, 29",
  },

  // --- BAZƠ / KIỀM (BASES) ---
  {
    name: "Sodium Hydroxide (NaOH) - Natri Hiđroxit (Xút)",
    formula: "NaOH",
    category: "base",
    hazard: "Xút ăn da cực mạnh, làm xà phòng hóa mô da, gây bỏng sâu và nguy cơ mù mắt vĩnh viễn.",
    ir: "3630, 1640",
    ms: "Chất ion không bay hơi",
    moleculeKey: "NaOH",
  },
  {
    name: "Potassium Hydroxide (KOH) - Kali Hiđroxit",
    formula: "KOH",
    category: "base",
    hazard: "Bazơ kiềm ăn mòn da thịt dữ dội, tỏa nhiệt lượng rất lớn khi hòa tan vào nước.",
    ir: "3600, 1620",
    ms: "Chất ion không bay hơi",
    moleculeKey: "KOH",
  },
  {
    name: "Calcium Hydroxide (Ca(OH)₂) - Vôi tôi",
    formula: "Ca(OH)₂",
    category: "base",
    hazard: "Kích ứng da, bụi vôi bay vào mắt gây bỏng giác mạc và kích ứng đường hô hấp.",
    ir: "3644",
    ms: "Chất vô cơ không bay hơi",
  },
  {
    name: "Ammonia (NH₃) - Amoniac",
    formula: "NH₃",
    category: "base",
    hazard: "Khí kiềm có mùi khai nồng nặc, gây kích ứng mạnh màng nhầy, co thắt thanh quản và bỏng hô hấp.",
    ir: "3444, 3337, 1627, 950",
    ms: "17, 16, 15",
    moleculeKey: "NH3",
  },

  // --- KHÍ ĐỘC & NGUY HIỂM (TOXIC GASES) ---
  {
    name: "Chlorine Gas (Cl₂) - Khí Clo",
    formula: "Cl₂",
    category: "gas",
    hazard: "Khí độc màu vàng lục, kích ứng dữ dội màng nhầy, gây nghẹt thở và phù phổi cấp nguy hiểm.",
    ir: "Không hấp thụ IR (đồng hạt nhân)",
    ms: "70, 72, 74",
    moleculeKey: "Cl2",
  },
  {
    name: "Carbon Monoxide (CO) - Cacbon Monoxit",
    formula: "CO",
    category: "gas",
    hazard: "Sát thủ vô hình: Không màu, không mùi, kết hợp chặt chẽ Hb máu làm ngạt tế bào dẫn đến tử vong.",
    ir: "2143",
    ms: "28, 16, 12",
    moleculeKey: "CO",
  },
  {
    name: "Sulfur Dioxide (SO₂) - Lưu Huỳnh Đioxit",
    formula: "SO₂",
    category: "gas",
    hazard: "Khí mùi hắc ngột ngạt gây mưa axit, kích ứng niêm mạc và gây co thắt phế quản cấp.",
    ir: "1361, 1151, 519",
    ms: "64, 48, 32",
    moleculeKey: "SO2",
  },
  {
    name: "Nitrogen Dioxide (NO₂) - Nitơ Đioxit",
    formula: "NO₂",
    category: "gas",
    hazard: "Khí màu nâu đỏ cực độc, phá hủy phế nang phổi diễn biến âm thầm sau vài giờ hít phải.",
    ir: "1618, 1318, 750",
    ms: "46, 30, 16",
    moleculeKey: "NO2",
  },
  {
    name: "Hydrogen Sulfide (H₂S) - Khí Trứng Thối",
    formula: "H₂S",
    category: "gas",
    hazard: "Mùi trứng thối nồng nặc, ở nồng độ cao làm liệt dây thần kinh khứu giác gây tử vong chớp nhoáng.",
    ir: "2615, 1183",
    ms: "34, 33, 32",
    moleculeKey: "H2S",
  },
  {
    name: "Bromine (Br₂) - Khí / Hơi Brom",
    formula: "Br₂",
    category: "gas",
    hazard: "Chất lỏng bốc hơi nâu đỏ cực độc, ăn mòn da tạo vết bỏng sâu rất khó lành.",
    ir: "Không hấp thụ IR",
    ms: "160, 158, 162",
    moleculeKey: "Br2",
  },

  // --- HỢP CHẤT HỮU CƠ & DUNG MÔI (ORGANIC) ---
  {
    name: "Ethanol (C₂H₅OH) - Cồn / Rượu Etylic",
    formula: "C₂H₅OH",
    category: "organic",
    hazard: "Chất lỏng dễ bắt lửa cháy, làm ức chế hệ thần kinh trung ương khi hấp thụ lượng lớn.",
    ir: "3350 (O-H), 2970, 1050 (C-O)",
    ms: "46, 31, 45, 29",
    moleculeKey: "C2H5OH",
  },
  {
    name: "Methanol (CH₃OH) - Cồn Công Nghiệp",
    formula: "CH₃OH",
    category: "organic",
    hazard: "Cực độc: Chuyển hóa sinh học thành axit fomic phá hủy dây thần kinh thị giác gây mù và tử vong.",
    ir: "3330, 2945, 1030",
    ms: "32, 31, 29, 15",
  },
  {
    name: "Acetone (CH₃COCH₃) - Axeton",
    formula: "CH₃COCH₃",
    category: "organic",
    hazard: "Dung môi hữu cơ rất dễ bay hơi và dễ cháy nổ, nồng độ cao gây chóng mặt và kích ứng mắt.",
    ir: "1715 (C=O), 1360, 1220",
    ms: "58 (M+), 43, 15",
    moleculeKey: "CH3COCH3",
  },
  {
    name: "Benzene (C₆H₆) - Benzen",
    formula: "C₆H₆",
    category: "organic",
    hazard: "Dung môi thơm độc hại, gây ung thư tủy xương và máu trắng (leukemia), tích tụ trong mỡ.",
    ir: "3030, 1480, 675",
    ms: "78 (M+), 77, 51",
    moleculeKey: "C6H6",
  },
  {
    name: "Methane (CH₄) - Khí Mêtan",
    formula: "CH₄",
    category: "organic",
    hazard: "Khí tự nhiên không màu, dễ gây nổ lớn trong hầm mỏ khi trộn với không khí theo tỉ lệ 1:2.",
    ir: "3019, 1306",
    ms: "16, 15, 14",
    moleculeKey: "CH4",
  },

  // --- MUỐI & HỢP CHẤT KHÁC (SALTS & OTHERS) ---
  {
    name: "Sodium Chloride (NaCl) - Muối Ăn",
    formula: "NaCl",
    category: "salt_other",
    hazard: "Muối ăn tinh thể ion, an toàn và thiết yếu ở điều kiện bình thường.",
    ir: "Không áp dụng",
    ms: "58.5",
    moleculeKey: "NaCl",
  },
  {
    name: "Copper(II) Sulfate (CuSO₄) - Phèn Xanh",
    formula: "CuSO₄",
    category: "salt_other",
    hazard: "Muối đồng màu xanh lam, có độc tính đối với sinh vật thủy sinh, kích ứng đường tiêu hóa.",
    ir: "1100 (SO₄²⁻)",
    ms: "Chất vô cơ",
  },
  {
    name: "Potassium Permanganate (KMnO₄) - Thuốc Tím",
    formula: "KMnO₄",
    category: "salt_other",
    hazard: "Chất oxi hóa mạnh, làm ố tím da, nguy cơ bốc cháy/nổ khi tiếp xúc chất hữu cơ hoặc axit đặc.",
    ir: "900 (MnO₄⁻)",
    ms: "Chất vô cơ",
  },
  {
    name: "Water (H₂O) - Nước Tinh Khiết",
    formula: "H₂O",
    category: "salt_other",
    hazard: "Dung môi phân cực phổ biến, an toàn tuyệt đối cho người và môi trường.",
    ir: "3300, 1640",
    ms: "18, 17, 16",
    moleculeKey: "H2O",
  },
];

export default function SafetyTab() {
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [data, setData] = useState<SafetyItem[]>(INITIAL_SAFETY_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedChemicalName, setSelectedChemicalName] = useState<string>("");

  // Selected group in the handbook tab
  const [activeHandbookGroup, setActiveHandbookGroup] = useState<string>("ia");
  const [showHandbook, setShowHandbook] = useState<boolean>(true);

  // Modal Dialog State for 3D Molecule Bond Viewer
  const [open3DDialog, setOpen3DDialog] = useState<boolean>(false);
  const [activeMoleculeKey, setActiveMoleculeKey] = useState<string>("H2SO4");
  const [custom3DData, setCustom3DData] = useState<MoleculeData | null>(null);

  const mapFormulaToKey = (formula: string): string | null => {
    const clean = formula
      .replace(/[₂₃₄₅₆₇₈₉]/g, (match) => "23456789"["₂₃₄₅₆₇₈₉".indexOf(match)])
      .replace(/[\s\(\)]/g, "");
    if (MOLECULES[clean]) return clean;
    return null;
  };

  const handleSelectChemical = async (item: SafetyItem) => {
    setSelectedChemicalName(item.name);
    const key = item.moleculeKey || mapFormulaToKey(item.formula);

    if (key && MOLECULES[key]) {
      setActiveMoleculeKey(key);
      setCustom3DData(null);
      setOpen3DDialog(true);
      return;
    }

    // Check Supabase DB cache for saved 3D structure
    const cacheKey = `3d_structure_${item.formula.replace(/[^a-zA-Z0-9]/g, "")}`;
    const cachedLocal = localStorage.getItem(cacheKey);

    if (cachedLocal) {
      try {
        setCustom3DData(JSON.parse(cachedLocal));
        setOpen3DDialog(true);
        return;
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    try {
      const { data: dbData } = await supabase
        .from("experiments")
        .select("result_json")
        .eq("cache_key", cacheKey)
        .maybeSingle();
      if (dbData && dbData.result_json) {
        localStorage.setItem(cacheKey, JSON.stringify(dbData.result_json));
        setCustom3DData(dbData.result_json);
        setOpen3DDialog(true);
        return;
      }
    } catch (e) {
      console.warn("Supabase 3D cache fetch skip:", e);
    }

    // Fallback AI generated 3D structure
    fetchAI3DStructure(item.name, item.formula, cacheKey);
  };

  const fetchAI3DStructure = async (chemName: string, formula: string, cacheKey: string) => {
    setIsLoading(true);
    const prompt = `Bạn là chuyên gia hóa học lượng tử & tinh thể học. Hãy xuất tọa độ 3D không gian cho phân tử/tinh thể: "${chemName}" (Công thức: "${formula}").
Trả về DUY NHẤT một chuỗi JSON hợp lệ theo đúng cấu trúc (không dùng markdown codeblock hay lời dẫn):
{
  "name": "${chemName}",
  "formula": "${formula}",
  "bondType": "Loại liên kết (Cộng hóa trị / Ion / Kim loại...)",
  "description": "Mô tả ngắn hình học phân tử và góc liên kết",
  "atoms": [
    { "position": [0, 0, 0], "color": "#38bdf8", "radius": 0.5, "label": "Nguyên tố" }
  ],
  "bonds": [
    { "start": [0, 0, 0], "end": [1, 0, 0], "radius": 0.05 }
  ]
}`;

    try {
      const res = await callGeminiAPI(prompt);
      const match = res.match(/\{[\s\S]*\}/);
      if (match) {
        const parsedData: MoleculeData = JSON.parse(match[0]);
        setCustom3DData(parsedData);
        setOpen3DDialog(true);

        // Save to cache
        localStorage.setItem(cacheKey, JSON.stringify(parsedData));
        supabase
          .from("experiments")
          .upsert({ cache_key: cacheKey, result_json: parsedData }, { onConflict: "cache_key" })
          .then();
      }
    } catch (err) {
      console.error("AI 3D generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Search chemical
  const handleSearch = async (searchTerm = query) => {
    if (!searchTerm.trim()) {
      setData(INITIAL_SAFETY_DATA);
      return;
    }

    // Local filter first
    const filtered = INITIAL_SAFETY_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.formula.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length > 0) {
      setData(filtered);
      handleSelectChemical(filtered[0]);
      return;
    }

    // Call Gemini AI for unknown chemical
    setIsLoading(true);
    const prompt = `Tra cứu thông tin an toàn hóa chất, nhóm bảng tuần hoàn, cấu hình e & phổ học cho: "${searchTerm}". Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):
{
  "name": "Tên hóa chất tiếng Việt & IUPAC",
  "formula": "Công thức hóa học",
  "category": "ia" hoặc "iia" hoặc "iiia" hoặc "iva" hoặc "va" hoặc "via" hoặc "viia" hoặc "acid" hoặc "base" hoặc "gas" hoặc "organic" hoặc "salt_other",
  "hazard": "Mô tả mức độ độc hại, nguy hiểm ăn mòn/cháy nổ và quy tắc bảo hộ",
  "ir": "Số sóng hấp thụ đặc trưng cm-1",
  "ms": "Giá trị m/z các mảnh ion chính",
  "electronConfig": "Cấu hình electron lớp ngoài cùng",
  "flameColor": "Màu ngọn lửa khi đốt (nếu có)",
  "oxidationStates": "Các số oxi hóa đặc trưng"
}`;

    try {
      const response = await callGeminiAPI(prompt);
      const match = response.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed: SafetyItem = JSON.parse(match[0]);
        setData([parsed, ...INITIAL_SAFETY_DATA]);
        handleSelectChemical(parsed);
      }
    } catch (e) {
      console.error("Safety AI Search error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (item: SafetyItem) => {
    setQuery(item.formula);
    setSelectedChemicalName(item.name);
    const matched = INITIAL_SAFETY_DATA.filter(
      (d) => d.formula === item.formula || d.name === item.name
    );
    if (matched.length > 0) {
      setData(matched);
      handleSelectChemical(matched[0]);
    } else {
      handleSearch(item.formula);
    }
  };

  const handleCategoryChange = (catId: CategoryId) => {
    setSelectedCategory(catId);
    if (["ia", "iia", "iiia", "iva", "va", "via", "viia"].includes(catId)) {
      setActiveHandbookGroup(catId);
    }
    if (catId === "all") {
      if (query.trim()) {
        const filtered = INITIAL_SAFETY_DATA.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.formula.toLowerCase().includes(query.toLowerCase())
        );
        setData(filtered.length > 0 ? filtered : INITIAL_SAFETY_DATA);
      } else {
        setData(INITIAL_SAFETY_DATA);
      }
    } else {
      const filtered = INITIAL_SAFETY_DATA.filter((item) => item.category === catId);
      setData(filtered);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelectedChemicalName("");
    if (selectedCategory === "all") {
      setData(INITIAL_SAFETY_DATA);
    } else {
      setData(INITIAL_SAFETY_DATA.filter((i) => i.category === selectedCategory));
    }
  };

  const activeSuggestions =
    selectedCategory === "all"
      ? INITIAL_SAFETY_DATA
      : INITIAL_SAFETY_DATA.filter((item) => item.category === selectedCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "ia":
        return "#eab308";
      case "iia":
        return "#06b6d4";
      case "iiia":
        return "#8b5cf6";
      case "iva":
        return "#ec4899";
      case "va":
        return "#f97316";
      case "via":
        return "#ef4444";
      case "viia":
        return "#10b981";
      case "acid":
        return "#f43f5e";
      case "base":
        return "#3b82f6";
      case "gas":
        return "#f59e0b";
      case "organic":
        return "#14b8a6";
      case "salt_other":
        return "#a855f7";
      default:
        return "#38bdf8";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "ia":
        return "⚡ IA: Kim loại Kiềm";
      case "iia":
        return "🪨 IIA: Kiềm Thổ";
      case "iiia":
        return "🧱 IIIA: Bo - Nhôm";
      case "iva":
        return "💎 IVA: Cacbon - Silic";
      case "va":
        return "🧪 VA: Nitơ - Photpho";
      case "via":
        return "🔥 VIA: Oxi - Lưu huỳnh";
      case "viia":
        return "❄️ VIIA: Halogen";
      case "acid":
        return "🧪 Axit";
      case "base":
        return "🧴 Bazơ / Kiềm";
      case "gas":
        return "☣️ Khí độc";
      case "organic":
        return "🧬 Hữu cơ";
      case "salt_other":
        return "🧂 Muối / Vô cơ";
      default:
        return "🔬 Hóa chất";
    }
  };

  const activeGroupData = PERIODIC_GROUPS_HANDBOOK[activeHandbookGroup] || PERIODIC_GROUPS_HANDBOOK.ia;

  return (
    <Box>
      <ChemicalBondViewer3D />

      {/* CẨM NANG & TRA CỨU QUY LUẬT NHÓM IA ĐẾN VIIA (CHUẨN HÓA 10 GDPT 2018) */}
      <Card
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          border: `1.5px solid ${activeGroupData.color}40`,
          mt: { xs: 2, sm: 3 },
          boxShadow: `0 8px 32px ${activeGroupData.color}20`,
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2, md: 2.5 },
            background: `linear-gradient(135deg, ${activeGroupData.color}15 0%, rgba(15, 23, 42, 0.95) 100%)`,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5}>
            <Box display="flex" alignItems="center" gap={1.2}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: `${activeGroupData.color}25`,
                  border: `1px solid ${activeGroupData.color}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap color={activeGroupData.color} size={24} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "16px", sm: "19px" }, color: "#f8fafc" }}
                >
                  ⚡ Cẩm Nang Tính Chất Hóa Học Nhóm IA → VIIA (Hóa Học 10)
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "11px", sm: "12.5px" }, display: "block" }}
                >
                  Quy luật biến đổi tuần hoàn, cấu hình e hóa trị, phản ứng đặc trưng & màu ngọn lửa thử nghiệm
                </Typography>
              </Box>
            </Box>

            <Button
              size="small"
              variant="outlined"
              onClick={() => setShowHandbook(!showHandbook)}
              startIcon={<Layers size={15} />}
              sx={{
                borderColor: `${activeGroupData.color}60`,
                color: activeGroupData.color,
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: activeGroupData.color,
                  bgcolor: `${activeGroupData.color}15`,
                },
              }}
            >
              {showHandbook ? "Thu gọn Cẩm Nang" : "Mở rộng Cẩm Nang"}
            </Button>
          </Box>

          {/* Group Tabs (IA to VIIA) */}
          <Box mt={2}>
            <Tabs
              value={activeHandbookGroup}
              onChange={(_, val) => {
                setActiveHandbookGroup(val);
                handleCategoryChange(val as CategoryId);
              }}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 38,
                "& .MuiTab-root": {
                  minHeight: 36,
                  py: 0.5,
                  px: 1.8,
                  fontSize: { xs: "12px", sm: "13px" },
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 2,
                  mr: 1,
                  color: "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.08)",
                  bgcolor: "rgba(30, 41, 59, 0.6)",
                  transition: "all 0.2s ease",
                  "&.Mui-selected": {
                    color: "#fff",
                    bgcolor: `${activeGroupData.color}30`,
                    borderColor: activeGroupData.color,
                    boxShadow: `0 0 12px ${activeGroupData.color}40`,
                  },
                },
                "& .MuiTabs-indicator": { display: "none" },
              }}
            >
              <Tab value="ia" label="⚡ Nhóm IA (Kiềm)" />
              <Tab value="iia" label="🪨 Nhóm IIA (Kiềm Thổ)" />
              <Tab value="iiia" label="🧱 Nhóm IIIA (Bo - Nhôm)" />
              <Tab value="iva" label="💎 Nhóm IVA (C - Si)" />
              <Tab value="va" label="🧪 Nhóm VA (N - P)" />
              <Tab value="via" label="🔥 Nhóm VIA (O - S)" />
              <Tab value="viia" label="❄️ Nhóm VIIA (Halogen)" />
            </Tabs>
          </Box>
        </Box>

        {/* Handbook Content Body */}
        {showHandbook && (
          <CardContent sx={{ p: { xs: 1.5, sm: 2.5, md: 3 } }}>
            {/* Header info badge grid */}
            <Grid container spacing={1.5} mb={2.5}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                    🏷️ Tên & Nhóm:
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: activeGroupData.color, fontSize: "13.5px" }}>
                    {activeGroupData.groupCode} - {activeGroupData.name}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                    ⚛️ Cấu hình e hóa trị:
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold" fontFamily="monospace" sx={{ color: "cyan", fontSize: "13.5px" }}>
                    {activeGroupData.valenceConfig}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                    🔢 Số oxi hóa đặc trưng:
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#fbbf24", fontSize: "13.5px" }}>
                    {activeGroupData.oxidationStates}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper sx={{ p: 1.5, bgcolor: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block">
                    🧬 Các nguyên tố chính:
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#cbd5e1", fontSize: "12.5px" }}>
                    {activeGroupData.elements.join(", ")}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Quy luật tuần hoàn & Tính chất hóa học */}
            <Grid container spacing={2}>
              {/* Left Column: Chemical Properties */}
              <Grid item xs={12} md={7}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "rgba(15, 23, 42, 0.8)",
                    border: `1px solid ${activeGroupData.color}30`,
                    borderRadius: 2.5,
                    height: "100%",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                    <Sparkles color={activeGroupData.color} size={18} />
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: activeGroupData.color, fontSize: "14.5px" }}>
                      Tính Chất Hóa Học Đặc Trưng & Phương Trình Phản Ứng:
                    </Typography>
                  </Box>

                  <Stack spacing={1.5}>
                    {activeGroupData.chemicalProperties.map((prop, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          p: 1.2,
                          bgcolor: "rgba(30, 41, 59, 0.7)",
                          borderRadius: 2,
                          borderLeft: `3px solid ${activeGroupData.color}`,
                        }}
                      >
                        <Typography variant="caption" fontWeight="bold" color="common.white" sx={{ fontSize: "12.5px", display: "block" }}>
                          {prop.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px", display: "block", mt: 0.3 }}>
                          {prop.description}
                        </Typography>
                        {prop.equation && (
                          <Box
                            sx={{
                              mt: 0.8,
                              p: 0.8,
                              bgcolor: "rgba(15, 23, 42, 0.9)",
                              borderRadius: 1.5,
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <Typography
                              variant="caption"
                              fontFamily="monospace"
                              fontWeight="bold"
                              sx={{ color: "cyan", fontSize: "12px", display: "block" }}
                            >
                              ⚗️ {prop.equation}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Grid>

              {/* Right Column: Periodic Trends, Flame Test & Safety */}
              <Grid item xs={12} md={5}>
                <Stack spacing={2}>
                  {/* Periodic Trends */}
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: "rgba(15, 23, 42, 0.8)",
                      border: "1px solid rgba(56, 189, 248, 0.2)",
                      borderRadius: 2.5,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Info color="#38bdf8" size={17} />
                      <Typography variant="subtitle2" fontWeight="bold" color="cyan" sx={{ fontSize: "13.5px" }}>
                        Quy Luật Biến Đổi Tuần Hoàn:
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "12px", lineHeight: 1.5, display: "block" }}>
                      {activeGroupData.generalTrends}
                    </Typography>
                  </Paper>

                  {/* Flame Test (if applicable) */}
                  {activeGroupData.flameTest && (
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: "rgba(15, 23, 42, 0.8)",
                        border: "1px solid rgba(245, 158, 11, 0.2)",
                        borderRadius: 2.5,
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} mb={1.2}>
                        <Flame color="#f59e0b" size={18} />
                        <Typography variant="subtitle2" fontWeight="bold" color="warning.main" sx={{ fontSize: "13.5px" }}>
                          Màu Thử Nghiệm Ngọn Lửa (Flame Test):
                        </Typography>
                      </Box>
                      <Stack spacing={0.8}>
                        {activeGroupData.flameTest.map((ft, idx) => (
                          <Box
                            key={idx}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                              p: 0.8,
                              bgcolor: "rgba(30, 41, 59, 0.7)",
                              borderRadius: 1.5,
                              borderLeft: `4px solid ${ft.hex}`,
                            }}
                          >
                            <Typography variant="caption" fontWeight="bold" color="common.white" sx={{ fontSize: "12px" }}>
                              {ft.element}
                            </Typography>
                            <Chip
                              label={ft.color}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "11px",
                                bgcolor: `${ft.hex}25`,
                                color: ft.hex,
                                fontWeight: "bold",
                                border: `1px solid ${ft.hex}50`,
                              }}
                            />
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                  )}

                  {/* Safety Alert Note */}
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: 2.5,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={0.8} mb={0.5}>
                      <ShieldAlert color="#ef4444" size={17} />
                      <Typography variant="caption" fontWeight="bold" color="error.main" sx={{ fontSize: "12px" }}>
                        Quy Tắc An Toàn Thực Hành Bắt Buộc:
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="#fca5a5" sx={{ fontSize: "11.5px", lineHeight: 1.4, display: "block" }}>
                      {activeGroupData.safetyNotes}
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>

      {/* DANH MỤC HÓA CHẤT AN TOÀN & TRA CỨU PHỔ IR / MS */}
      <Card
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
          mt: { xs: 2, sm: 3 },
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2.5, md: 3 } }}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            mb={2.5}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShieldAlert color="#f59e0b" size={24} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "16px", sm: "19px" }, color: "#f8fafc" }}
                >
                  An Toàn Hóa Chất & Tra Cứu Phổ IR / MS / Mô Hình 3D
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "11px", sm: "12.5px" }, display: "block" }}
                >
                  Tra cứu an toàn GHS, cấu hình e, số oxi hóa, phổ IR/MS và mô phỏng 3D liên kết cho nhóm IA → VIIA
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Search Bar Input */}
          <Grid container spacing={1.5} mb={2}>
            <Grid item xs={12} sm={8} md={9}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Nhập tên hoặc công thức hóa học (ví dụ: Na, Mg, Al, Si, P4, S8, Cl2, H2SO4...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                InputProps={{
                  startAdornment: <Search size={18} style={{ marginRight: 8, color: "#94a3b8" }} />,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(15, 23, 42, 0.6)",
                    borderRadius: 2,
                    fontSize: { xs: "13px", sm: "14px" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Button
                variant="contained"
                fullWidth
                disabled={isLoading}
                onClick={() => handleSearch()}
                startIcon={
                  isLoading ? (
                    <RefreshCw className="animate-spin" size={16} />
                  ) : (
                    <Search size={16} />
                  )
                }
                sx={{
                  background: "linear-gradient(45deg, #d97706, #b45309)",
                  textTransform: "none",
                  fontWeight: "bold",
                  height: 40,
                  borderRadius: 2,
                  fontSize: { xs: "13px", sm: "14px" },
                  boxShadow: "0 4px 14px rgba(217, 119, 6, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #b45309, #92400e)",
                  },
                }}
              >
                {isLoading ? "AI Tra Cứu..." : "Tra Cứu Hóa Chất"}
              </Button>
            </Grid>
          </Grid>

          {/* Quick Suggestions & Categories Section */}
          <Paper
            sx={{
              p: { xs: 1.5, sm: 2 },
              mb: 2.5,
              bgcolor: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              borderRadius: 2.5,
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Category Filter Tabs */}
            <Box mb={1.5}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  sx={{ color: "cyan", textTransform: "uppercase", letterSpacing: 0.5, fontSize: "11px" }}
                >
                  ⚡ Phân Loại Nhóm & Hóa Chất (Bấm để lọc):
                </Typography>
                {query && (
                  <Chip
                    label="Xóa bộ lọc"
                    size="small"
                    onClick={handleClear}
                    onDelete={handleClear}
                    sx={{ height: 22, fontSize: 10, bgcolor: "rgba(239, 68, 68, 0.2)", color: "#fca5a5" }}
                  />
                )}
              </Box>

              <Stack
                direction="row"
                spacing={0.8}
                sx={{
                  overflowX: "auto",
                  pb: 0.5,
                  "&::-webkit-scrollbar": { height: 4 },
                  "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.2)", borderRadius: 2 },
                }}
              >
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const count =
                    cat.id === "all"
                      ? INITIAL_SAFETY_DATA.length
                      : INITIAL_SAFETY_DATA.filter((i) => i.category === cat.id).length;

                  return (
                    <Chip
                      key={cat.id}
                      icon={<span>{cat.icon}</span>}
                      label={`${cat.label} (${count})`}
                      onClick={() => handleCategoryChange(cat.id)}
                      clickable
                      sx={{
                        fontSize: { xs: "11.5px", sm: "12.5px" },
                        fontWeight: isSelected ? "bold" : "normal",
                        bgcolor: isSelected ? `${cat.color}25` : "rgba(30, 41, 59, 0.7)",
                        color: isSelected ? "#fff" : "#94a3b8",
                        border: isSelected
                          ? `1.5px solid ${cat.color}`
                          : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isSelected ? `0 0 12px ${cat.color}40` : "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: `${cat.color}35`,
                          color: "#fff",
                          transform: "translateY(-1px)",
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* Quick Suggestion Chemical Chips */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "11px", display: "block", mb: 0.8 }}
              >
                👇 Bấm trực tiếp vào chất để tra cứu tức thì & xem mô hình 3D liên kết:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.8,
                  maxHeight: { xs: 150, sm: "none" },
                  overflowY: "auto",
                }}
              >
                {activeSuggestions.map((item, idx) => {
                  const isItemActive =
                    selectedChemicalName === item.name ||
                    query.trim().toLowerCase() === item.formula.toLowerCase() ||
                    query.trim().toLowerCase() === item.name.toLowerCase();
                  const catColor = getCategoryColor(item.category);

                  return (
                    <Chip
                      key={idx}
                      label={
                        <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                          <span style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                            {item.formula}
                          </span>
                          <span style={{ opacity: 0.85, fontSize: "11px" }}>
                            ({item.name.split("-")[0].trim()})
                          </span>
                        </Box>
                      }
                      size="small"
                      onClick={() => handleSuggestionClick(item)}
                      clickable
                      sx={{
                        fontSize: "11.5px",
                        bgcolor: isItemActive ? `${catColor}35` : "rgba(30, 41, 59, 0.9)",
                        color: isItemActive ? "#fff" : "#cbd5e1",
                        border: isItemActive
                          ? `1.5px solid ${catColor}`
                          : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isItemActive ? `0 0 10px ${catColor}50` : "none",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          bgcolor: `${catColor}40`,
                          color: "#fff",
                          borderColor: catColor,
                          transform: "translateY(-1.5px) scale(1.02)",
                          boxShadow: `0 4px 12px ${catColor}30`,
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Paper>

          {/* Results Safety Cards Grid */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1.5}
          >
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: "13px" }}>
              Hiển thị <strong style={{ color: "#38bdf8" }}>{data.length}</strong> hóa chất an toàn & phổ học:
            </Typography>
          </Box>

          <Grid container spacing={1.5}>
            {data.map((item, index) => {
              const catColor = getCategoryColor(item.category);
              const isSelected = selectedChemicalName === item.name;

              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    onClick={() => handleSelectChemical(item)}
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      bgcolor: isSelected ? "rgba(15, 23, 42, 0.95)" : "#0f172a",
                      border: isSelected
                        ? `1.5px solid ${catColor}`
                        : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      height: "100%",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      position: "relative",
                      boxShadow: isSelected ? `0 0 16px ${catColor}35` : "none",
                      "&:hover": {
                        borderColor: catColor,
                        transform: "translateY(-2px)",
                        boxShadow: `0 6px 16px ${catColor}25`,
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      gap={1}
                      mb={1}
                    >
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Box display="flex" alignItems="center" gap={0.8} mb={0.3} flexWrap="wrap">
                          <Chip
                            label={getCategoryLabel(item.category)}
                            size="small"
                            sx={{
                              fontSize: "10px",
                              height: 18,
                              bgcolor: `${catColor}20`,
                              color: catColor,
                              fontWeight: "bold",
                              border: `1px solid ${catColor}40`,
                            }}
                          />
                          {item.electronConfig && (
                            <Chip
                              label={`e: ${item.electronConfig}`}
                              size="small"
                              sx={{
                                fontSize: "10px",
                                height: 18,
                                bgcolor: "rgba(56, 189, 248, 0.15)",
                                color: "#38bdf8",
                                fontFamily: "monospace",
                              }}
                            />
                          )}
                          {item.oxidationStates && (
                            <Chip
                              label={`Ox: ${item.oxidationStates}`}
                              size="small"
                              sx={{
                                fontSize: "10px",
                                height: 18,
                                bgcolor: "rgba(251, 191, 36, 0.15)",
                                color: "#fbbf24",
                              }}
                            />
                          )}
                        </Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="common.white"
                          sx={{ fontSize: { xs: "13.5px", sm: "14.5px" } }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={0.8} alignItems="center" flexShrink={0}>
                        <Chip
                          label={item.formula}
                          size="small"
                          color="primary"
                          sx={{ fontFamily: "monospace", fontWeight: "bold", height: 22, fontSize: 11 }}
                        />
                        <Chip
                          icon={<Box3DIcon size={13} />}
                          label="3D"
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ fontSize: "10.5px", height: "22px" }}
                        />
                      </Stack>
                    </Box>

                    {/* Flame Color Badge if available */}
                    {item.flameColor && (
                      <Box
                        sx={{
                          mb: 1,
                          p: 0.6,
                          px: 1,
                          borderRadius: 1.5,
                          bgcolor: "rgba(245, 158, 11, 0.12)",
                          border: "1px solid rgba(245, 158, 11, 0.25)",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.6,
                        }}
                      >
                        <Flame size={14} color="#f59e0b" />
                        <Typography variant="caption" sx={{ color: "#fde68a", fontSize: "11px", fontWeight: "medium" }}>
                          Ngọn lửa: <strong>{item.flameColor}</strong>
                        </Typography>
                      </Box>
                    )}

                    <Typography
                      variant="caption"
                      color="warning.main"
                      display="block"
                      mb={1.2}
                      sx={{ fontSize: { xs: "11.5px", sm: "12px" }, lineHeight: 1.4 }}
                    >
                      ⚠️ {item.hazard}
                    </Typography>

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Box
                          p={0.8}
                          bgcolor="#1e293b"
                          borderRadius={1}
                          border="1px solid rgba(255,255,255,0.05)"
                        >
                          <Typography
                            variant="caption"
                            color="cyan"
                            fontWeight="bold"
                            display="block"
                            sx={{ fontSize: "10.5px" }}
                          >
                            Phổ IR (cm⁻¹):
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontFamily="monospace"
                            sx={{ fontSize: "11px" }}
                          >
                            {item.ir}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          p={0.8}
                          bgcolor="#1e293b"
                          borderRadius={1}
                          border="1px solid rgba(255,255,255,0.05)"
                        >
                          <Typography
                            variant="caption"
                            color="cyan"
                            fontWeight="bold"
                            display="block"
                            sx={{ fontSize: "10.5px" }}
                          >
                            Phổ MS (m/z):
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            fontFamily="monospace"
                            sx={{ fontSize: "11px" }}
                          >
                            {item.ms}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* DIALOG POPUP FOR 3D MOLECULE BOND VIEWER */}
      <Dialog
        open={open3DDialog}
        onClose={() => setOpen3DDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: { xs: 2, sm: 3 },
            m: { xs: 1, sm: 2 }
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "cyan",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { xs: 1.5, sm: 2 },
            fontSize: { xs: '15px', sm: '18px' }
          }}
        >
          <span>🔬 Mô Phỏng 3D Liên Kết Hóa Học & Tinh Thể</span>
          <IconButton
            onClick={() => setOpen3DDialog(false)}
            sx={{ color: "text.secondary", p: 0.5 }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ borderColor: "rgba(255,255,255,0.1)", p: { xs: 1.5, sm: 2 } }}
        >
          <ChemicalBondViewer3D
            selectedMoleculeKey={activeMoleculeKey}
            customMoleculeData={custom3DData}
            isDialog={true}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
