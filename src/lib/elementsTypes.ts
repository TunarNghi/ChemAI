export type MainCategory = 'metal' | 'nonmetal' | 'noble_gas';

export type SubCategory =
  | 'alkali_metal'
  | 'alkaline_earth'
  | 'transition_metal'
  | 'post_transition'
  | 'metalloid'
  | 'reactive_nonmetal'
  | 'halogen'
  | 'noble_gas'
  | 'lanthanoid'
  | 'actinoid';

export type ElementState = 'solid' | 'liquid' | 'gas' | 'unknown';

export interface IsotopeInfo {
  name: string;
  mass: number;
  abundance?: string; // e.g. "99.98%"
  halfLife?: string; // e.g. "Stable" or "12.32 years"
  decayMode?: string; // e.g. "β-", "α", "Stable"
  isStable: boolean;
}

export interface NFPA704 {
  health: number; // 0-4
  flammability: number; // 0-4
  instability: number; // 0-4
  special?: string; // e.g. "W", "OX", "SA", "COR", "RAD"
}

export interface ChemicalElement {
  // 1. Định danh & Phân loại cơ bản
  symbol: string;
  atomicNumber: number; // Z
  nameEn: string;
  nameVi: string;
  nameLatin: string;
  casNumber: string;
  pubchemCid: number | string;
  etymology: string;

  // 2. Vị trí trong Bảng tuần hoàn
  period: number; // 1-7
  group: number; // 1-18 (or 0 for f-block)
  groupTraditional: string; // IA, IIA, VIIIB, etc.
  block: 's' | 'p' | 'd' | 'f';
  mainCategory: MainCategory;
  subCategory: SubCategory;
  subCategoryNameVi: string;

  // 3. Cấu trúc nguyên tử & Hạt nhân
  atomicMass: number; // Ar (g/mol or u)
  electronConfigFull: string;
  electronConfigShort: string;
  energyLevels: number[]; // e.g. [2, 8, 14, 2] for Fe
  valenceElectrons: number;
  atomicRadiusEmpirical?: number; // pm
  covalentRadius?: number; // pm
  ionicRadius?: string; // e.g. "Fe²⁺: 78 pm, Fe³⁺: 64.5 pm"
  vanDerWaalsRadius?: number; // pm
  isotopes: IsotopeInfo[];

  // 4. Tính chất vật lý & Nhiệt động học
  standardState: ElementState; // at 25°C, 1 bar
  appearance: string;
  density: number | string; // g/cm³ or g/L
  meltingPointC?: number; // °C
  boilingPointC?: number; // °C
  meltingPointK?: number; // K
  boilingPointK?: number; // K
  criticalPoint?: string; // e.g. "33.2 K, 1.297 MPa"
  triplePoint?: string;
  heatOfFusion?: number | string; // kJ/mol
  heatOfVaporization?: number | string; // kJ/mol
  molarHeatCapacity?: number | string; // J/(mol·K)
  electricalConductivity?: string; // S/m or MS/m
  electricalResistivity?: string; // Ω·m
  thermalConductivity?: number | string; // W/(m·K)
  crystalStructure: string; // FCC, BCC, HCP, Diamond cubic, etc.
  crystalStructureVi: string;
  magnetism: string; // Thuận từ, Nghịch từ, Sắt từ
  speedOfSound?: number | string; // m/s

  // 5. Tính chất hóa học & Khả năng liên kết
  electronegativityPauling?: number;
  electronegativityAllen?: number;
  electronegativityAllredRochow?: number;
  ionizationEnergies: number[]; // [I1, I2, I3...] in kJ/mol
  electronAffinity?: number | string; // kJ/mol
  oxidationStates: number[]; // e.g. [-2, -1, 1, 2, 3, 4, 5, 6]
  commonOxidationStates: number[]; // e.g. [2, 3] for Fe
  reactivity: {
    withOxygen: string;
    withChlorine: string;
    withHydrogen: string;
    withWater: string;
    withAcids: string;
    withBases: string;
  };
  oxideHydroxideProperties: string; // e.g. "Oxit bazơ, hiđroxit bazơ không tan"

  // 6. Phổ học & Quang học
  emissionLinesSummary: string; // Vạch quang phổ đặc trưng
  flameTestColor?: string; // Mô tả màu ngọn lửa
  flameTestHex?: string; // Mã màu HEX để render preview ngọn lửa
  refractiveIndex?: number | string;

  // 7. Nguồn gốc, Địa chất & Điều chế
  abundance: {
    crust: string; // Vỏ Trái Đất
    ocean: string; // Nước biển
    atmosphere: string; // Khí quyển
    humanBody: string; // Cơ thể người
    solarSystem: string; // Hệ Mặt Trời
  };
  mineralogy: string; // Các quặng tự nhiên chính
  productionMethod: string; // Phương pháp điều chế / tách

  // 8. Ứng dụng & Sinh học
  industrialApplications: string[];
  biologicalRole: string; // Đa lượng, vi lượng, độc tính

  // 9. An toàn, Độc tính & Lịch sử
  nfpa704: NFPA704;
  ghsClassification: string[];
  ghsPictograms: ('flammable' | 'toxic' | 'corrosive' | 'oxidizer' | 'compressed_gas' | 'health_hazard' | 'environment' | 'explosive' | 'harmful')[];
  toxicityNotes: string;
  discoveryHistory: {
    discoverer: string;
    year: string | number;
    country: string;
    description: string;
  };
}

export const MAIN_CATEGORY_COLORS: Record<
  MainCategory,
  { label: string; bg: string; border: string; glow: string; text: string; lightBg: string; color: string; desc: string; count: number }
> = {
  metal: {
    label: 'Kim loại (Metals)',
    bg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.45) 0%, rgba(30, 58, 138, 0.75) 100%)',
    border: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.55)',
    text: '#bae6fd',
    color: '#38bdf8',
    lightBg: 'rgba(14, 165, 233, 0.18)',
    desc: 'Dẫn điện, dẫn nhiệt tốt, có ánh kim, dễ nhường electron (tính khử). Gồm kiềm, kiềm thổ, chuyển tiếp, lantanoid, actinoid...',
    count: 94,
  },
  nonmetal: {
    label: 'Phi kim (Non-metals)',
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(6, 95, 70, 0.75) 100%)',
    border: '#10b981',
    glow: 'rgba(16, 185, 129, 0.55)',
    text: '#a7f3d0',
    color: '#10b981',
    lightBg: 'rgba(16, 185, 129, 0.18)',
    desc: 'Độ âm điện lớn, dẫn điện/nhiệt kém, dễ nhận electron (tính oxi hóa). Gồm halogen, phi kim đa nguyên tử và á kim.',
    count: 18,
  },
  noble_gas: {
    label: 'Khí hiếm (Noble gases)',
    bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.50) 0%, rgba(88, 28, 135, 0.80) 100%)',
    border: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.60)',
    text: '#f5d0fe',
    color: '#c084fc',
    lightBg: 'rgba(168, 85, 247, 0.20)',
    desc: 'Lớp vỏ ngoài cùng bão hòa 8e (hoặc 2e với He), rất bền vững, trơ về mặt hóa học, phát quang rực rỡ dưới điện áp cao.',
    count: 6,
  },
};

export const SUB_CATEGORY_LABELS: Record<SubCategory, { label: string; main: MainCategory; color: string }> = {
  alkali_metal: { label: 'Kim loại kiềm', main: 'metal', color: '#ef4444' },
  alkaline_earth: { label: 'Kim loại kiềm thổ', main: 'metal', color: '#f97316' },
  transition_metal: { label: 'Kim loại chuyển tiếp', main: 'metal', color: '#38bdf8' },
  post_transition: { label: 'Kim loại sau chuyển tiếp', main: 'metal', color: '#14b8a6' },
  lanthanoid: { label: 'Họ Lantan (Lanthanoids)', main: 'metal', color: '#6366f1' },
  actinoid: { label: 'Họ Actini (Actinoids)', main: 'metal', color: '#ec4899' },
  metalloid: { label: 'Bán kim (Á kim)', main: 'nonmetal', color: '#10b981' },
  reactive_nonmetal: { label: 'Phi kim hoạt động', main: 'nonmetal', color: '#84cc16' },
  halogen: { label: 'Nhóm Halogen', main: 'nonmetal', color: '#eab308' },
  noble_gas: { label: 'Khí hiếm (Nhóm 18)', main: 'noble_gas', color: '#d946ef' },
};

export const SUB_CATEGORY_STYLES: Record<
  SubCategory,
  { label: string; bg: string; border: string; text: string; glow: string; lightBg: string; color: string }
> = {
  alkali_metal: {
    label: 'Kim loại kiềm (IA)',
    bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.45) 0%, rgba(153, 27, 27, 0.75) 100%)',
    border: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.5)',
    text: '#fca5a5',
    color: '#ef4444',
    lightBg: 'rgba(239, 68, 68, 0.18)',
  },
  alkaline_earth: {
    label: 'Kiềm thổ (IIA)',
    bg: 'linear-gradient(135deg, rgba(249, 115, 22, 0.45) 0%, rgba(194, 65, 12, 0.75) 100%)',
    border: '#f97316',
    glow: 'rgba(249, 115, 22, 0.5)',
    text: '#fdba74',
    color: '#f97316',
    lightBg: 'rgba(249, 115, 22, 0.18)',
  },
  transition_metal: {
    label: 'Kim loại chuyển tiếp',
    bg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.45) 0%, rgba(30, 58, 138, 0.75) 100%)',
    border: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.5)',
    text: '#7dd3fc',
    color: '#38bdf8',
    lightBg: 'rgba(56, 189, 248, 0.18)',
  },
  post_transition: {
    label: 'Kim loại sau chuyển tiếp',
    bg: 'linear-gradient(135deg, rgba(20, 184, 166, 0.45) 0%, rgba(15, 118, 110, 0.75) 100%)',
    border: '#14b8a6',
    glow: 'rgba(20, 184, 166, 0.5)',
    text: '#5eead4',
    color: '#14b8a6',
    lightBg: 'rgba(20, 184, 166, 0.18)',
  },
  metalloid: {
    label: 'Bán kim (Á kim)',
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(6, 95, 70, 0.75) 100%)',
    border: '#10b981',
    glow: 'rgba(16, 185, 129, 0.5)',
    text: '#6ee7b7',
    color: '#10b981',
    lightBg: 'rgba(16, 185, 129, 0.18)',
  },
  reactive_nonmetal: {
    label: 'Phi kim hoạt động',
    bg: 'linear-gradient(135deg, rgba(132, 204, 22, 0.45) 0%, rgba(77, 124, 15, 0.75) 100%)',
    border: '#84cc16',
    glow: 'rgba(132, 204, 22, 0.5)',
    text: '#bef264',
    color: '#84cc16',
    lightBg: 'rgba(132, 204, 22, 0.18)',
  },
  halogen: {
    label: 'Halogen (VIIA)',
    bg: 'linear-gradient(135deg, rgba(234, 179, 8, 0.45) 0%, rgba(161, 98, 7, 0.75) 100%)',
    border: '#eab308',
    glow: 'rgba(234, 179, 8, 0.5)',
    text: '#fde047',
    color: '#eab308',
    lightBg: 'rgba(234, 179, 8, 0.18)',
  },
  noble_gas: {
    label: 'Khí hiếm (VIIIA)',
    bg: 'linear-gradient(135deg, rgba(217, 70, 239, 0.45) 0%, rgba(134, 25, 143, 0.75) 100%)',
    border: '#d946ef',
    glow: 'rgba(217, 70, 239, 0.5)',
    text: '#f0abfc',
    color: '#d946ef',
    lightBg: 'rgba(217, 70, 239, 0.18)',
  },
  lanthanoid: {
    label: 'Họ Lantan',
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(55, 48, 163, 0.75) 100%)',
    border: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.5)',
    text: '#a5b4fc',
    color: '#6366f1',
    lightBg: 'rgba(99, 102, 241, 0.18)',
  },
  actinoid: {
    label: 'Họ Actini',
    bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.45) 0%, rgba(157, 23, 77, 0.75) 100%)',
    border: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.5)',
    text: '#f472b6',
    color: '#ec4899',
    lightBg: 'rgba(236, 72, 153, 0.18)',
  },
};

export function getSpectralHeatmapStyle(t: number): { bg: string; border: string; glow: string; text: string } {
  const clamped = Math.max(0, Math.min(1, t));

  // Multi-stop color map: Blue (0.0) -> Cyan (0.2) -> Green (0.4) -> Yellow (0.65) -> Orange (0.85) -> Crimson/Magenta (1.0)
  let r = 0, g = 0, b = 0;
  if (clamped < 0.2) {
    const f = clamped / 0.2;
    r = Math.round(37 + (6 - 37) * f);
    g = Math.round(99 + (182 - 99) * f);
    b = Math.round(235 + (212 - 235) * f);
  } else if (clamped < 0.4) {
    const f = (clamped - 0.2) / 0.2;
    r = Math.round(6 + (16 - 6) * f);
    g = Math.round(182 + (185 - 182) * f);
    b = Math.round(212 + (129 - 212) * f);
  } else if (clamped < 0.65) {
    const f = (clamped - 0.4) / 0.25;
    r = Math.round(16 + (234 - 16) * f);
    g = Math.round(185 + (179 - 185) * f);
    b = Math.round(129 + (8 - 129) * f);
  } else if (clamped < 0.85) {
    const f = (clamped - 0.65) / 0.2;
    r = Math.round(234 + (249 - 234) * f);
    g = Math.round(179 + (115 - 179) * f);
    b = Math.round(8 + (22 - 8) * f);
  } else {
    const f = (clamped - 0.85) / 0.15;
    r = Math.round(249 + (236 - 249) * f);
    g = Math.round(115 + (72 - 115) * f);
    b = Math.round(22 + (153 - 22) * f);
  }

  const bg = `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.85) 0%, rgba(${Math.max(10, r - 50)}, ${Math.max(15, g - 50)}, ${Math.max(25, b - 50)}, 0.95) 100%)`;
  const border = `1.5px solid rgb(${Math.min(255, r + 45)}, ${Math.min(255, g + 45)}, ${Math.min(255, b + 45)})`;
  const glow = `rgba(${r}, ${g}, ${b}, 0.5)`;

  return { bg, border, glow, text: '#ffffff' };
}

/**
 * Calibrated 6-tier high-contrast heatmap styling specifically designed for Ionization Energy (I₁ in kJ/mol).
 * Spans smoothly from Cs (375 kJ/mol - easily ionized) to He (2372 kJ/mol - extremely tightly bound).
 */
export function getIonizationEnergyStyle(i1: number): {
  bg: string;
  border: string;
  glow: string;
  text: string;
  badgeBg: string;
  badgeColor: string;
  levelLabel: string;
} {
  // Clamped bounds: Cs (375) -> He (2372)
  const val = Math.max(350, Math.min(2400, i1));

  let r1 = 0, g1 = 0, b1 = 0;
  let r2 = 0, g2 = 0, b2 = 0;
  let borderCol = '';
  let glowCol = '';
  let badgeBg = '';
  let badgeColor = '';
  let levelLabel = '';

  if (val <= 550) {
    // Tier 1: 350 - 550 kJ/mol (Royal Blue / Deep Indigo -> Sky Cobalt)
    // Alkali metals (Cs 375, Rb 403, K 419, Na 496, Li 520, Ba 503)
    const f = (val - 350) / 200;
    r1 = Math.round(30 + (2 - 30) * f);
    g1 = Math.round(58 + (132 - 58) * f);
    b1 = Math.round(138 + (199 - 138) * f);
    r2 = 15; g2 = 23; b2 = 42;
    borderCol = '#38bdf8';
    glowCol = 'rgba(56, 189, 248, 0.55)';
    badgeBg = 'rgba(56, 189, 248, 0.25)';
    badgeColor = '#7dd3fc';
    levelLabel = 'Rất dễ mất e';
  } else if (val <= 750) {
    // Tier 2: 550 - 750 kJ/mol (Vivid Cyan / Ocean Teal)
    // Alkaline earths (Sr 550, Ca 590), Lanthanoids/Actinoids, Al (578), Ga (579), In (558), Tl (589)
    const f = (val - 550) / 200;
    r1 = Math.round(8 + (13 - 8) * f);
    g1 = Math.round(145 + (148 - 145) * f);
    b1 = Math.round(178 + (136 - 178) * f);
    r2 = 12; g2 = 74; b2 = 96;
    borderCol = '#22d3ee';
    glowCol = 'rgba(34, 211, 238, 0.55)';
    badgeBg = 'rgba(34, 211, 238, 0.25)';
    badgeColor = '#67e8f9';
    levelLabel = 'Dễ mất e';
  } else if (val <= 950) {
    // Tier 3: 750 - 950 kJ/mol (Vivid Emerald -> Bright Lime Green)
    // 3d Transition metals (Fe 762, Cu 745, Zn 906, Au 890), Metalloids (B 801, Si 786, Ge 762, Te 869)
    const f = (val - 750) / 200;
    r1 = Math.round(5 + (101 - 5) * f);
    g1 = Math.round(150 + (163 - 150) * f);
    b1 = Math.round(105 + (13 - 105) * f);
    r2 = 6; g2 = 78; b2 = 59;
    borderCol = '#4ade80';
    glowCol = 'rgba(74, 222, 128, 0.55)';
    badgeBg = 'rgba(74, 222, 128, 0.25)';
    badgeColor = '#86efac';
    levelLabel = 'Trung bình';
  } else if (val <= 1250) {
    // Tier 4: 950 - 1250 kJ/mol (Radiant Amber -> Rich Gold / Warm Orange)
    // Reactive nonmetals (S 1000, P 1012, C 1086), Halogens (I 1008, Br 1140), Heavy noble gases (Rn 1037, Xe 1170), Hg (1007)
    const f = (val - 950) / 300;
    r1 = Math.round(217 + (234 - 217) * f);
    g1 = Math.round(119 + (88 - 119) * f);
    b1 = Math.round(6 + (12 - 6) * f);
    r2 = 120; g2 = 53; b2 = 15;
    borderCol = '#fde047';
    glowCol = 'rgba(250, 204, 21, 0.6)';
    badgeBg = 'rgba(250, 204, 21, 0.25)';
    badgeColor = '#fef08a';
    levelLabel = 'Khó mất e';
  } else if (val <= 1650) {
    // Tier 5: 1250 - 1650 kJ/mol (Vivid Coral Red -> Rich Crimson Flare)
    // Electronegative nonmetals & light halogens/noble gases (Cl 1251, O 1314, N 1402, Kr 1351, Ar 1520)
    const f = (val - 1250) / 400;
    r1 = Math.round(220 + (225 - 220) * f);
    g1 = Math.round(38 + (29 - 38) * f);
    b1 = Math.round(38 + (72 - 38) * f);
    r2 = 136; g2 = 19; b2 = 55;
    borderCol = '#fda4af';
    glowCol = 'rgba(244, 63, 94, 0.65)';
    badgeBg = 'rgba(244, 63, 94, 0.25)';
    badgeColor = '#fecdd3';
    levelLabel = 'Rất khó mất e';
  } else {
    // Tier 6: > 1650 kJ/mol (Electric Neon Magenta -> Radiant Ultra-Violet)
    // Extreme inertness / tightly bound: F (1681), Ne (2080), He (2372)
    const f = Math.min(1, (val - 1650) / 722);
    r1 = Math.round(192 + (126 - 192) * f);
    g1 = Math.round(38 + (34 - 38) * f);
    b1 = Math.round(211 + (206 - 211) * f);
    r2 = 88; g2 = 28; b2 = 135;
    borderCol = '#f0abfc';
    glowCol = 'rgba(217, 70, 239, 0.75)';
    badgeBg = 'rgba(217, 70, 239, 0.3)';
    badgeColor = '#f5d0fe';
    levelLabel = 'Cực kỳ bền vững';
  }

  const bg = `linear-gradient(135deg, rgba(${r1}, ${g1}, ${b1}, 0.85) 0%, rgba(${r2}, ${g2}, ${b2}, 0.95) 100%)`;
  const border = `1.5px solid ${borderCol}`;
  const glow = glowCol;

  return {
    bg,
    border,
    glow,
    text: '#ffffff',
    badgeBg,
    badgeColor,
    levelLabel,
  };
}

