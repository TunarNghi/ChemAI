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
  { label: string; bg: string; border: string; glow: string; text: string; lightBg: string; color: string }
> = {
  metal: {
    label: 'Kim loại (Metals)',
    bg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.28) 0%, rgba(30, 58, 138, 0.45) 100%)',
    border: 'rgba(56, 189, 248, 0.6)',
    glow: 'rgba(56, 189, 248, 0.35)',
    text: '#38bdf8',
    color: '#38bdf8',
    lightBg: 'rgba(56, 189, 248, 0.14)',
  },
  nonmetal: {
    label: 'Phi kim (Non-metals)',
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(6, 78, 59, 0.45) 100%)',
    border: 'rgba(52, 211, 153, 0.6)',
    glow: 'rgba(52, 211, 153, 0.35)',
    text: '#34d399',
    color: '#34d399',
    lightBg: 'rgba(52, 211, 153, 0.14)',
  },
  noble_gas: {
    label: 'Khí hiếm (Noble gases)',
    bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.28) 0%, rgba(88, 28, 135, 0.45) 100%)',
    border: 'rgba(192, 132, 252, 0.6)',
    glow: 'rgba(192, 132, 252, 0.35)',
    text: '#c084fc',
    color: '#c084fc',
    lightBg: 'rgba(192, 132, 252, 0.14)',
  },
};

export const SUB_CATEGORY_LABELS: Record<SubCategory, { label: string; main: MainCategory; color: string }> = {
  alkali_metal: { label: 'Kim loại kiềm', main: 'metal', color: '#ef4444' },
  alkaline_earth: { label: 'Kim loại kiềm thổ', main: 'metal', color: '#f97316' },
  transition_metal: { label: 'Kim loại chuyển tiếp', main: 'metal', color: '#38bdf8' },
  post_transition: { label: 'Kim loại sau chuyển tiếp', main: 'metal', color: '#60a5fa' },
  lanthanoid: { label: 'Họ Lantan (Lanthanoids)', main: 'metal', color: '#06b6d4' },
  actinoid: { label: 'Họ Actini (Actinoids)', main: 'metal', color: '#ec4899' },
  metalloid: { label: 'Á kim (Metalloid)', main: 'nonmetal', color: '#10b981' },
  reactive_nonmetal: { label: 'Phi kim hoạt động', main: 'nonmetal', color: '#22c55e' },
  halogen: { label: 'Nhóm Halogen', main: 'nonmetal', color: '#eab308' },
  noble_gas: { label: 'Khí hiếm (Nhóm 18)', main: 'noble_gas', color: '#a855f7' },
};
