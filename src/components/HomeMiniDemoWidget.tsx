"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Trophy,
  ShieldCheck,
  Atom,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Eye,
  Zap,
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

import { PRESETS, PRESET_SIMULATION_DATA } from '@/components/VirtualLab';
import { MOLECULES } from '@/components/ChemicalBondViewer3D';
import { ELEMENTS_DATA, getElementByAtomicNumber } from '@/lib/elementsData';
import { ChemicalElement, MAIN_CATEGORY_COLORS } from '@/lib/elementsTypes';
import ElementDetailModal from '@/components/ElementDetailModal';

// --- Curated Quiz Questions for Instant Fast Response ---
interface DemoQuizItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  grade: string;
}

const DEMO_QUIZ_POOL: DemoQuizItem[] = [
  {
    id: 1,
    grade: "Lớp 10",
    question: "Hiện tượng nào sau đây quan sát được khi thả mẩu kim loại Natri (Na) vào cốc nước có nhỏ sẵn vài giọt phenolphtalein?",
    options: [
      "A. Mẩu Na chìm xuống đáy cốc, có bọt khí sủi mạnh",
      "B. Mẩu Na nóng chảy thành viên tròn chạy nhảy trên mặt nước, dung dịch chuyển sang màu hồng",
      "C. Dung dịch xuất hiện kết tủa trắng không tan",
      "D. Mẩu Na không tan, dung dịch chuyển màu vàng"
    ],
    correctIndex: 1,
    explanation: "Natri có khối lượng riêng nhẹ hơn nước và nhiệt độ nóng chảy thấp (98°C), phản ứng mãnh liệt tỏa nhiệt làm Na nóng chảy thành giọt tròn chạy trên mặt nước sinh ra NaOH (bazơ làm phenolphtalein hóa hồng) và khí H₂."
  },
  {
    id: 2,
    grade: "Lớp 10",
    question: "Khi cho thanh đồng (Cu) vào dung dịch axit Nitric đặc (HNO₃ đặc), hiện tượng quan sát được là gì?",
    options: [
      "A. Thanh Cu tan dần, dung dịch chuyển sang màu xanh lam và thoát ra khí NO₂ màu nâu đỏ",
      "B. Dung dịch không đổi màu, thoát ra khí H₂ không màu bắt cháy",
      "C. Tạo kết tủa đen bám trên thanh đồng và có mùi trứng thối",
      "D. Thanh Cu không tan vì đồng là kim loại đứng sau hiđro"
    ],
    correctIndex: 0,
    explanation: "Cu bị HNO₃ đặc oxi hóa mạnh: Cu + 4HNO₃ (đặc) → Cu(NO₃)₂ (dung dịch màu xanh) + 2NO₂↑ (khí màu nâu đỏ độc) + 2H₂O."
  },
  {
    id: 3,
    grade: "Lớp 11",
    question: "Góc liên kết trong phân tử nước (H₂O) có giá trị xấp xỉ bằng bao nhiêu và do dạng lai hóa nào quyết định?",
    options: [
      "A. 180° - Lai hóa sp (thẳng hàng)",
      "B. 120° - Lai hóa sp² (tam giác phẳng)",
      "C. 104.5° - Lai hóa sp³ (gấp khúc do 2 cặp electron tự do đẩy)",
      "D. 109.5° - Lai hóa sp³ (tứ diện đều)"
    ],
    correctIndex: 2,
    explanation: "Nguyên tử O trong H₂O lai hóa sp³ với 2 liên kết O-H và 2 cặp electron chưa liên kết. Lực đẩy mạnh của 2 cặp electron tự do ép góc liên kết H-O-H từ 109.5° giảm xuống 104.5°."
  },
  {
    id: 4,
    grade: "Lớp 12",
    question: "Phản ứng tráng bạc của glucozơ (C₆H₁₂O₆) với thuốc thử Tollens [Ag(NH₃)₂]OH tạo ra lớp chất rắn màu gì bám trên thành ống nghiệm?",
    options: [
      "A. Kết tủa đỏ gạch Cu₂O",
      "B. Lớp kim loại bạc (Ag) màu sáng bóng như gương",
      "C. Kết tủa trắng vón cục AgCl",
      "D. Dung dịch phức màu xanh lam đậm"
    ],
    correctIndex: 1,
    explanation: "Nhóm chức anđehit (-CHO) ở dạng mạch hở của Glucozơ khử ion [Ag(NH₃)₂]⁺ thành bạc kim loại Ag sáng bóng bao phủ thành ống nghiệm (phản ứng tráng gương)."
  },
  {
    id: 5,
    grade: "Lớp 10",
    question: "Nguyên tố nào sau đây có độ âm điện lớn nhất trong toàn bộ Bảng tuần hoàn hóa học?",
    options: [
      "A. Oxi (O - 3.44)",
      "B. Clo (Cl - 3.16)",
      "C. Flo (F - 3.98)",
      "D. Nitơ (N - 3.04)"
    ],
    correctIndex: 2,
    explanation: "Flo (F) nằm ở nhóm VIIA chu kì 2 có bán kính nguyên tử nhỏ và điện tích hạt nhân hiệu dụng cao, là nguyên tố có độ âm điện lớn nhất (~3.98 theo thang Pauling)."
  },
  {
    id: 6,
    grade: "Lớp 10",
    question: "Cho vài giọt dung dịch BaCl₂ vào ống nghiệm chứa dung dịch H₂SO₄ loãng, hiện tượng xảy ra là gì?",
    options: [
      "A. Xuất hiện kết tủa trắng tinh BaSO₄ không tan trong axit mạnh",
      "B. Xuất hiện bọt khí bay lên và dung dịch đổi màu tím",
      "C. Tạo kết tủa keo màu xanh lục",
      "D. Không có hiện tượng vì không xảy ra phản ứng"
    ],
    correctIndex: 0,
    explanation: "Phản ứng trao đổi ion tạo kết tủa bền BaSO₄: BaCl₂ + H₂SO₄ → BaSO₄↓ (trắng) + 2HCl. BaSO₄ không tan trong cả nước lẫn các axit mạnh."
  }
];

// --- 3D Molecule Components ---
function Mini3DAtom({ position, color, radius, label }: { position: [number, number, number]; color: string; radius: number; label: string }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.25} />
      </mesh>
      <Html position={[0, radius + 0.22, 0]} center distanceFactor={8}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          color: '#fff',
          padding: '1px 4px',
          borderRadius: '3px',
          fontSize: '9px',
          fontWeight: 'bold',
          border: '1px solid rgba(255,255,255,0.2)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function MiniSingleCylinder({
  start,
  end,
  color,
  radius,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  radius: number;
}) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  if (length < 0.001) return null;
  const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

  const orientation = new THREE.Matrix4();
  const dirNorm = direction.clone().normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const rotationAxis = new THREE.Vector3().crossVectors(up, dirNorm).normalize();
  const dot = Math.min(Math.max(up.dot(dirNorm), -1), 1);
  const rotationAngle = Math.acos(dot);

  if (rotationAxis.lengthSq() > 0.0001) {
    orientation.makeRotationAxis(rotationAxis, rotationAngle);
  } else if (dot < -0.999) {
    orientation.makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI);
  }

  return (
    <mesh position={position} rotation={new THREE.Euler().setFromRotationMatrix(orientation)}>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

function Mini3DBond({
  start,
  end,
  color = "#94a3b8",
  radius = 0.06,
  order = 1
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  radius?: number;
  order?: 1 | 2 | 3;
}) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const dir = new THREE.Vector3().subVectors(endVec, startVec);
  const length = dir.length();
  if (length < 0.001) return null;
  const dirNorm = dir.clone().normalize();

  let perp = new THREE.Vector3(0, 0, 1).cross(dirNorm);
  if (perp.lengthSq() < 0.01) {
    perp = new THREE.Vector3(0, 1, 0).cross(dirNorm);
  }
  perp.normalize();

  if (order === 2) {
    const offset = perp.clone().multiplyScalar(0.08);
    const r = radius * 0.75;
    return (
      <group>
        <MiniSingleCylinder
          start={startVec.clone().add(offset)}
          end={endVec.clone().add(offset)}
          color={color}
          radius={r}
        />
        <MiniSingleCylinder
          start={startVec.clone().sub(offset)}
          end={endVec.clone().sub(offset)}
          color={color}
          radius={r}
        />
      </group>
    );
  }

  if (order === 3) {
    const offset = perp.clone().multiplyScalar(0.1);
    const r = radius * 0.65;
    return (
      <group>
        <MiniSingleCylinder start={startVec} end={endVec} color={color} radius={r} />
        <MiniSingleCylinder
          start={startVec.clone().add(offset)}
          end={endVec.clone().add(offset)}
          color={color}
          radius={r}
        />
        <MiniSingleCylinder
          start={startVec.clone().sub(offset)}
          end={endVec.clone().sub(offset)}
          color={color}
          radius={r}
        />
      </group>
    );
  }

  return <MiniSingleCylinder start={startVec} end={endVec} color={color} radius={radius} />;
}

interface HomeMiniDemoWidgetProps {
  onNavigateTab: (tabIndex: number) => void;
}

const FEATURE_TABS = [
  {
    id: 'lab',
    tabIndex: 1,
    title: 'Phòng Thí Nghiệm Ảo THPT',
    shortTitle: 'Thí nghiệm',
    icon: <FlaskConical size={18} color="#38bdf8" />,
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    bgColor: 'rgba(56, 189, 248, 0.12)',
  },
  {
    id: 'quiz',
    tabIndex: 3,
    title: 'Thử Thách Đấu Trường Luyện Tập',
    shortTitle: 'Đấu trường',
    icon: <Trophy size={18} color="#f59e0b" />,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    bgColor: 'rgba(245, 158, 11, 0.12)',
  },
  {
    id: '3d',
    tabIndex: 4,
    title: 'Mô Phỏng 3D Liên Kết Phân Tử',
    shortTitle: '3D Phân tử',
    icon: <ShieldCheck size={18} color="#10b981" />,
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    bgColor: 'rgba(16, 185, 129, 0.12)',
  },
  {
    id: 'periodic',
    tabIndex: 12,
    title: 'Bảng Tuần Hoàn 118 Nguyên Tố',
    shortTitle: 'Bảng tuần hoàn',
    icon: <Atom size={18} color="#06b6d4" />,
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    bgColor: 'rgba(6, 182, 212, 0.12)',
  },
];

export default function HomeMiniDemoWidget({ onNavigateTab }: HomeMiniDemoWidgetProps) {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  // 1. LAB STATE
  const [currentExpId, setCurrentExpId] = useState<number>(2); // Default to Na + H2O
  const [labKey, setLabKey] = useState<number>(0);

  // 2. QUIZ STATE
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizStreak, setQuizStreak] = useState<number>(0);

  // 3. 3D MOLECULE STATE
  const moleculeKeys = useMemo(() => Object.keys(MOLECULES), []);
  const [selectedMoleculeKey, setSelectedMoleculeKey] = useState<string>("H2O");

  // 4. PERIODIC ELEMENT STATE
  const [randomElementZ, setRandomElementZ] = useState<number>(11); // Na (Natri)
  const [elementModalOpen, setElementModalOpen] = useState<boolean>(false);
  const [selectedDetailElement, setSelectedDetailElement] = useState<ChemicalElement | null>(null);

  // Navigation handlers
  const handlePrev = () => {
    setActiveTabIdx((prev) => (prev === 0 ? FEATURE_TABS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTabIdx((prev) => (prev === FEATURE_TABS.length - 1 ? 0 : prev + 1));
  };

  // Lab randomizer
  const handleRandomizeLab = () => {
    const availableIds = PRESETS.map((p) => p.id);
    const otherIds = availableIds.filter((id) => id !== currentExpId);
    const nextId = otherIds[Math.floor(Math.random() * otherIds.length)] || availableIds[0];
    setCurrentExpId(nextId);
    setLabKey((k) => k + 1);
  };

  // Quiz randomizer
  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setCurrentQuizIdx((prev) => (prev + 1) % DEMO_QUIZ_POOL.length);
  };

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = index === DEMO_QUIZ_POOL[currentQuizIdx].correctIndex;
    if (isCorrect) {
      setQuizScore((s) => s + 10);
      setQuizStreak((st) => st + 1);
    } else {
      setQuizStreak(0);
    }
  };

  // 3D randomizer
  const handleRandomize3D = () => {
    const others = moleculeKeys.filter((k) => k !== selectedMoleculeKey);
    const nextKey = others[Math.floor(Math.random() * others.length)] || moleculeKeys[0];
    setSelectedMoleculeKey(nextKey);
  };

  // Element randomizer
  const handleRandomizeElement = () => {
    const commonZ = [1, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 19, 20, 26, 29, 30, 35, 47, 53, 56, 79, 80, 82, 92];
    const pool = commonZ.filter((z) => z !== randomElementZ);
    const nextZ = pool[Math.floor(Math.random() * pool.length)] || Math.floor(Math.random() * 118) + 1;
    setRandomElementZ(nextZ);
  };

  const handleOpenDetailModal = (el: ChemicalElement) => {
    setSelectedDetailElement(el);
    setElementModalOpen(true);
  };

  const currentTab = FEATURE_TABS[activeTabIdx];
  const currentExp = PRESETS.find((p) => p.id === currentExpId) || PRESETS[0];
  const currentSimResult = PRESET_SIMULATION_DATA[currentExpId];
  const currentQuiz = DEMO_QUIZ_POOL[currentQuizIdx];
  const currentMolecule = MOLECULES[selectedMoleculeKey] || MOLECULES.H2O;
  const currentElement = getElementByAtomicNumber(randomElementZ) || ELEMENTS_DATA[10];

  // Beaker animation bubbles & fumes
  const sampleBubbles = useMemo(() => [
    { id: 1, left: 20, delay: 0.1, size: 6 },
    { id: 2, left: 45, delay: 0.5, size: 8 },
    { id: 3, left: 70, delay: 0.3, size: 5 },
    { id: 4, left: 35, delay: 0.8, size: 7 },
    { id: 5, left: 60, delay: 0.2, size: 6 },
  ], [labKey]);

  const sampleFumes = useMemo(() => [
    { id: 1, left: 30, delay: 0, size: 24, color: currentSimResult?.fumeColor || "rgba(255,255,255,0.4)" },
    { id: 2, left: 55, delay: 0.6, size: 28, color: currentSimResult?.fumeColor || "rgba(255,255,255,0.4)" },
    { id: 3, left: 42, delay: 1.2, size: 22, color: currentSimResult?.fumeColor || "rgba(255,255,255,0.4)" },
  ], [labKey, currentSimResult]);

  return (
    <>
      <Paper
        elevation={12}
        sx={{
          borderRadius: 3.5,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)',
          border: `1.5px solid ${currentTab.color}50`,
          boxShadow: `0 12px 36px rgba(0, 0, 0, 0.5), 0 0 24px ${currentTab.glowColor}`,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: { xs: 460, sm: 500, md: 520 },
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* TOP HEADER CONTROLS */}
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            bgcolor: 'rgba(9, 13, 22, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          {/* Left Arrow Button */}
          <Tooltip title="Chức năng trước">
            <IconButton
              onClick={handlePrev}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.06)',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': { bgcolor: currentTab.bgColor, color: currentTab.color, borderColor: currentTab.color },
              }}
            >
              <ChevronLeft size={18} />
            </IconButton>
          </Tooltip>

          {/* Current Active Feature Title & Badges */}
          <Box sx={{ textAlign: 'center', flexGrow: 1, minWidth: 0, px: 0.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <Box
                sx={{
                  p: 0.6,
                  borderRadius: 1.5,
                  bgcolor: currentTab.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {currentTab.icon}
              </Box>
              <Typography
                variant="subtitle2"
                fontWeight="800"
                noWrap
                sx={{
                  color: '#f8fafc',
                  fontSize: { xs: '13px', sm: '14.5px' },
                  letterSpacing: '-0.01em',
                }}
              >
                {currentTab.title}
              </Typography>
            </Stack>
            <Typography
              variant="caption"
              sx={{
                color: '#94a3b8',
                fontSize: '11px',
                display: { xs: 'none', sm: 'block' },
                mt: 0.2,
              }}
            >
              ✨ Trải nghiệm tương tác trực tiếp — Không cần đăng nhập
            </Typography>
          </Box>

          {/* Right Arrow Button */}
          <Tooltip title="Chức năng tiếp theo">
            <IconButton
              onClick={handleNext}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.06)',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': { bgcolor: currentTab.bgColor, color: currentTab.color, borderColor: currentTab.color },
              }}
            >
              <ChevronRight size={18} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 4 FAST NAV PILLS / DOTS */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 0.6, sm: 1 },
            px: 1.5,
            py: 0.8,
            bgcolor: 'rgba(15, 23, 42, 0.4)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {FEATURE_TABS.map((tab, idx) => {
            const isSelected = activeTabIdx === idx;
            return (
              <Chip
                key={tab.id}
                label={tab.shortTitle}
                size="small"
                onClick={() => setActiveTabIdx(idx)}
                sx={{
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: isSelected ? 800 : 500,
                  height: 24,
                  bgcolor: isSelected ? tab.bgColor : 'transparent',
                  color: isSelected ? tab.color : '#94a3b8',
                  border: isSelected ? `1px solid ${tab.color}70` : '1px solid transparent',
                  '&:hover': { bgcolor: `${tab.color}15`, color: '#fff' },
                  transition: 'all 0.2s ease',
                }}
              />
            );
          })}
        </Box>

        {/* MAIN INTERACTIVE BODY */}
        <Box sx={{ p: { xs: 2, sm: 2.5 }, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          {/* ============================================================ */}
          {/* TAB 0: PHÒNG THÍ NGHIỆM ẢO MINI                              */}
          {/* ============================================================ */}
          {activeTabIdx === 0 && (
            <Box key={`lab-${labKey}`} sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {/* Header Info */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Chip
                  label={`Thí nghiệm #${currentExp.id} • Lớp ${currentExp.grade}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontWeight: 'bold', fontSize: '11px' }}
                />
                <Chip
                  label={`pH: ${currentSimResult?.phEstimate || "---"}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(15, 23, 42, 0.8)', color: '#22d3ee', border: '1px solid rgba(34, 211, 238, 0.4)', fontFamily: 'monospace', fontWeight: 'bold' }}
                />
              </Box>

              {/* Animated Beaker Stage */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 1,
                  my: 'auto',
                }}
              >
                <Box className="relative w-32 sm:w-36 h-40 sm:h-44 border-4 border-t-0 border-slate-400 rounded-b-3xl bg-slate-900/70 flex flex-col justify-end p-1 overflow-hidden shadow-2xl">
                  {/* Graduated Scale */}
                  <div className="absolute top-2 left-1 bottom-2 w-5 border-r border-slate-500/40 flex flex-col justify-between text-[7.5px] text-slate-400 font-mono select-none pointer-events-none z-30">
                    <span>250ml</span>
                    <span>150ml</span>
                    <span>50ml</span>
                  </div>

                  {/* Silver Mirror Coating */}
                  {currentSimResult?.isSilverMirror && (
                    <div className="absolute inset-0 pointer-events-none rounded-b-3xl transition-all duration-1000 bg-gradient-to-r from-slate-200/50 via-white/90 to-slate-300/50 border-2 border-slate-100 shadow-[inset_0_0_20px_rgba(255,255,255,0.9)] opacity-100 z-20" />
                  )}

                  {/* Fume Layer */}
                  {currentSimResult?.hasFume && (
                    <div className="absolute -top-10 left-0 right-0 h-14 pointer-events-none z-40 overflow-visible flex justify-center">
                      {sampleFumes.map((f) => (
                        <div
                          key={f.id}
                          className="fume-particle"
                          style={{
                            width: `${f.size}px`,
                            height: `${f.size}px`,
                            backgroundColor: f.color,
                            left: `${f.left}%`,
                            animationDelay: `${f.delay}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Solid Metal Rod */}
                  {(currentSimResult?.hasSolidRod || currentSimResult?.isDissolving) && (
                    <div
                      className={`absolute top-4 left-1/2 -translate-x-1/2 w-3 rounded-t-sm shadow-md z-15 border border-slate-500 ${currentSimResult?.isDissolving ? 'dissolve-rod' : 'h-28'}`}
                      style={{ backgroundColor: currentSimResult?.solidRodColor || '#94a3b8' }}
                    />
                  )}

                  {/* Main Liquid */}
                  <div
                    className="w-full rounded-b-2xl transition-all duration-1000 relative overflow-hidden flex flex-col justify-end"
                    style={{
                      height: '70%',
                      backgroundColor: currentSimResult?.liquidColor || 'rgba(56, 189, 248, 0.4)',
                    }}
                  >
                    {/* Sodium Surface Spark */}
                    {currentSimResult?.surfaceSpark && (
                      <div className="absolute top-0 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-tr from-slate-300 via-amber-300 to-amber-500 border-2 border-yellow-200 skitter-effect spark-effect z-35 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white blur-[1px]" />
                      </div>
                    )}

                    {/* Immiscible Upper Oil Layer */}
                    {currentSimResult?.isImmiscible && (
                      <div className="w-full h-1/3 transition-all duration-1000 border-b border-white/20" style={{ backgroundColor: currentSimResult.upperLiquidColor || 'rgba(254, 240, 138, 0.6)' }} />
                    )}

                    {/* Precipitate */}
                    {currentSimResult?.precipitate && (
                      <div
                        className="w-full precipitate-effect rounded-b-2xl z-20"
                        style={{ height: '22%', backgroundColor: currentSimResult.precipitateColor || '#ffffff' }}
                      />
                    )}

                    {/* Bubbles */}
                    {currentSimResult?.bubbles && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {sampleBubbles.map((b) => (
                          <div
                            key={b.id}
                            className="bubble"
                            style={{
                              left: `${b.left}%`,
                              animationDelay: `${b.delay}s`,
                              width: `${b.size}px`,
                              height: `${b.size}px`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Box>
              </Box>

              {/* Reaction Equation Banner */}
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: 'rgba(9, 13, 22, 0.85)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  mt: 1.5,
                  mb: 1.5,
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption" color="#94a3b8" display="block" sx={{ fontSize: '10.5px', mb: 0.3 }}>
                  Phương trình hóa học phản ứng:
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                    fontSize: { xs: '12px', sm: '13.5px' },
                    lineHeight: 1.3,
                  }}
                >
                  {currentSimResult?.eq || currentExp.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="#cbd5e1"
                  sx={{
                    display: 'block',
                    mt: 0.5,
                    fontSize: '11px',
                    lineHeight: 1.35,
                    fontStyle: 'italic',
                  }}
                >
                  {currentSimResult?.phenomenon ? currentSimResult.phenomenon.slice(0, 100) + '...' : ''}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={handleRandomizeLab}
                  startIcon={<RefreshCw size={14} />}
                  sx={{
                    color: '#38bdf8',
                    borderColor: 'rgba(56, 189, 248, 0.4)',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: 2,
                    py: 0.8,
                    '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8' },
                  }}
                >
                  🎲 Đổi Thí Nghiệm
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => onNavigateTab(1)}
                  endIcon={<ArrowRight size={14} />}
                  sx={{
                    bgcolor: '#0284c7',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: 2,
                    py: 0.8,
                    '&:hover': { bgcolor: '#0369a1' },
                  }}
                >
                  Vào Lab Đầy Đủ
                </Button>
              </Stack>
            </Box>
          )}

          {/* ============================================================ */}
          {/* TAB 1: THỬ THÁCH TRẮC NGHIỆM ĐẤU TRƯỜNG LUYỆN TẬP MINI     */}
          {/* ============================================================ */}
          {activeTabIdx === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {/* Header Stats */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.2}>
                <Chip
                  label={`Câu ${currentQuizIdx + 1}/${DEMO_QUIZ_POOL.length} • ${currentQuiz.grade}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontWeight: 'bold', fontSize: '11px' }}
                />
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<Zap size={12} color="#eab308" />}
                    label={`+${quizScore} Điểm`}
                    size="small"
                    sx={{ bgcolor: 'rgba(234, 179, 8, 0.15)', color: '#eab308', fontWeight: 'bold', fontSize: '11px' }}
                  />
                  {quizStreak > 1 && (
                    <Chip
                      label={`🔥 ${quizStreak} Chuỗi`}
                      size="small"
                      sx={{ bgcolor: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', fontWeight: 'bold', fontSize: '11px' }}
                    />
                  )}
                </Stack>
              </Box>

              {/* Question Text */}
              <Box sx={{ mb: 1.5, p: 1.2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)' }}>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="#f8fafc"
                  sx={{ fontSize: { xs: '12.5px', sm: '13.5px' }, lineHeight: 1.5 }}
                >
                  {currentQuiz.question}
                </Typography>
              </Box>

              {/* 4 Options ABCD */}
              <Stack spacing={0.8} sx={{ mb: 1.5 }}>
                {currentQuiz.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswer === oIdx;
                  const isCorrect = oIdx === currentQuiz.correctIndex;
                  const isAnswered = selectedAnswer !== null;

                  let borderStyle = '1px solid rgba(255, 255, 255, 0.1)';
                  let bgStyle = 'rgba(15, 23, 42, 0.7)';
                  let textCol = '#e2e8f0';

                  if (isAnswered) {
                    if (isCorrect) {
                      borderStyle = '1.5px solid #10b981';
                      bgStyle = 'rgba(16, 185, 129, 0.2)';
                      textCol = '#34d399';
                    } else if (isSelected) {
                      borderStyle = '1.5px solid #f43f5e';
                      bgStyle = 'rgba(244, 63, 94, 0.2)';
                      textCol = '#fb7185';
                    }
                  }

                  return (
                    <Button
                      key={oIdx}
                      variant="outlined"
                      fullWidth
                      disabled={isAnswered}
                      onClick={() => handleSelectAnswer(oIdx)}
                      sx={{
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        textTransform: 'none',
                        fontSize: { xs: '11.5px', sm: '12px' },
                        py: 0.7,
                        px: 1.2,
                        borderRadius: 1.8,
                        color: textCol,
                        bgcolor: bgStyle,
                        border: borderStyle,
                        '&:hover': {
                          bgcolor: isAnswered ? bgStyle : 'rgba(245, 158, 11, 0.15)',
                          borderColor: isAnswered ? undefined : '#f59e0b',
                        },
                      }}
                    >
                      <span style={{ lineHeight: 1.35 }}>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginLeft: 6 }} />}
                      {isAnswered && isSelected && !isCorrect && <XCircle size={16} color="#f43f5e" style={{ flexShrink: 0, marginLeft: 6 }} />}
                    </Button>
                  );
                })}
              </Stack>

              {/* Explanation note when answered */}
              {selectedAnswer !== null && (
                <Box
                  sx={{
                    p: 1,
                    mb: 1.5,
                    borderRadius: 1.5,
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#a7f3d0', fontSize: '11px', display: 'block', lineHeight: 1.4 }}>
                    💡 <b>Giải thích:</b> {currentQuiz.explanation}
                  </Typography>
                </Box>
              )}

              {/* Action Buttons */}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={handleNextQuiz}
                  startIcon={<RefreshCw size={14} />}
                  sx={{
                    color: '#f59e0b',
                    borderColor: 'rgba(245, 158, 11, 0.4)',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: 2,
                    py: 0.8,
                    '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.15)', borderColor: '#f59e0b' },
                  }}
                >
                  🎲 Câu Hỏi Khác
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => onNavigateTab(3)}
                  endIcon={<ArrowRight size={14} />}
                  sx={{
                    bgcolor: '#d97706',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: 2,
                    py: 0.8,
                    '&:hover': { bgcolor: '#b45309' },
                  }}
                >
                  Vào Đấu Trường Luyện Tập
                </Button>
              </Stack>
            </Box>
          )}

          {/* ============================================================ */}
          {/* TAB 2: MÔ PHỎNG 3D HỢP CHẤT PHÂN TỬ MINI                     */}
          {/* ============================================================ */}
          {activeTabIdx === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {/* Header Info */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Chip
                  label={`${currentMolecule.name} (${currentMolecule.formula})`}
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 'bold', fontSize: '11.5px' }}
                />
                <Chip
                  label="Xoay 360° WebGL"
                  size="small"
                  sx={{ bgcolor: 'rgba(15, 23, 42, 0.8)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10.5px' }}
                />
              </Box>

              {/* 3D Canvas Stage */}
              <Box
                sx={{
                  height: { xs: 180, sm: 200 },
                  width: '100%',
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  bgcolor: '#090d16',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  position: 'relative',
                  my: 'auto',
                }}
              >
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                  <ambientLight intensity={0.9} />
                  <pointLight position={[10, 10, 10]} intensity={1.2} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <group>
                    {currentMolecule.atoms.map((atom, idx) => (
                      <Mini3DAtom
                        key={idx}
                        position={atom.position}
                        color={atom.color}
                        radius={atom.radius * 0.85}
                        label={atom.label}
                      />
                    ))}
                    {currentMolecule.bonds.map((bond, idx) => (
                      <Mini3DBond
                        key={idx}
                        start={bond.start}
                        end={bond.end}
                        color={bond.color || "#94a3b8"}
                        radius={0.06}
                        order={bond.order}
                      />
                    ))}
                  </group>
                  <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2.5} />
                </Canvas>
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    bottom: 6,
                    right: 8,
                    color: '#64748b',
                    fontSize: '9.5px',
                    pointerEvents: 'none',
                  }}
                >
                  💡 Kéo chuột để xoay / phóng to
                </Typography>
              </Box>

              {/* Molecule Bond & Geometry Description */}
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: 'rgba(9, 13, 22, 0.85)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  mt: 1.5,
                  mb: 1.5,
                }}
              >
                <Typography variant="caption" fontWeight="bold" color="#34d399" display="block" sx={{ fontSize: '11px', mb: 0.2 }}>
                  🔗 Loại liên kết: {currentMolecule.bondType}
                </Typography>
                <Typography variant="caption" color="#cbd5e1" sx={{ fontSize: '11px', lineHeight: 1.4, display: 'block' }}>
                  {currentMolecule.description}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={handleRandomize3D}
                  startIcon={<RefreshCw size={14} />}
                  sx={{
                    color: '#10b981',
                    borderColor: 'rgba(16, 185, 129, 0.4)',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: 2,
                    py: 0.8,
                    '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981' },
                  }}
                >
                  🎲 Đổi Phân Tử 3D
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => onNavigateTab(4)}
                  endIcon={<ArrowRight size={14} />}
                  sx={{
                    bgcolor: '#059669',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: 2,
                    py: 0.8,
                    '&:hover': { bgcolor: '#047857' },
                  }}
                >
                  Mở 3D & An Toàn
                </Button>
              </Stack>
            </Box>
          )}

          {/* ============================================================ */}
          {/* TAB 3: BẢNG TUẦN HOÀN NGUYÊN TỐ HÓA HỌC MINI                 */}
          {/* ============================================================ */}
          {activeTabIdx === 3 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              {/* Header Info */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Chip
                  label={`Nguyên tố #${currentElement.atomicNumber} • Chu kì ${currentElement.period} • Nhóm ${currentElement.group}`}
                  size="small"
                  sx={{ bgcolor: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', fontWeight: 'bold', fontSize: '11px' }}
                />
                <Chip
                  label={
                    currentElement.mainCategory === 'metal'
                      ? 'Kim loại'
                      : currentElement.mainCategory === 'nonmetal'
                      ? 'Phi kim'
                      : 'Khí hiếm'
                  }
                  size="small"
                  sx={{
                    bgcolor: MAIN_CATEGORY_COLORS[currentElement.mainCategory].lightBg,
                    color: MAIN_CATEGORY_COLORS[currentElement.mainCategory].color,
                    border: `1px solid ${MAIN_CATEGORY_COLORS[currentElement.mainCategory].border}`,
                    fontWeight: 'bold',
                    fontSize: '10.5px',
                  }}
                />
              </Box>

              {/* Large Element Showcase Card */}
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  bgcolor: 'rgba(9, 13, 22, 0.9)',
                  border: `1.5px solid ${MAIN_CATEGORY_COLORS[currentElement.mainCategory].border}`,
                  boxShadow: `inset 0 0 20px ${MAIN_CATEGORY_COLORS[currentElement.mainCategory].glow}`,
                  my: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {/* Element Symbol Box */}
                <Box
                  sx={{
                    width: 76,
                    height: 76,
                    borderRadius: 2,
                    bgcolor: MAIN_CATEGORY_COLORS[currentElement.mainCategory].lightBg,
                    border: `1px solid ${MAIN_CATEGORY_COLORS[currentElement.mainCategory].border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px', lineHeight: 1 }}>
                    Z = {currentElement.atomicNumber}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="900"
                    sx={{
                      color: MAIN_CATEGORY_COLORS[currentElement.mainCategory].color,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {currentElement.symbol}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '9px', lineHeight: 1 }}>
                    {currentElement.atomicMass.toFixed(2)}
                  </Typography>
                </Box>

                {/* Element Key Specs */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#fff" noWrap sx={{ fontSize: '16px', lineHeight: 1.2 }}>
                    {currentElement.nameVi} ({currentElement.nameEn})
                  </Typography>
                  <Typography variant="caption" color="#38bdf8" sx={{ fontFamily: 'monospace', display: 'block', fontSize: '11px', mt: 0.3 }}>
                    {currentElement.electronConfigShort || currentElement.electronConfigFull}
                  </Typography>
                  
                  <Box display="flex" flexWrap="wrap" gap={0.8} mt={0.8}>
                    <Typography variant="caption" color="#94a3b8" sx={{ fontSize: '11px' }}>
                      Độ âm điện: <b style={{ color: '#f8fafc' }}>{currentElement.electronegativityPauling ?? '---'}</b>
                    </Typography>
                    <Typography variant="caption" color="#94a3b8" sx={{ fontSize: '11px' }}>
                      Trạng thái: <b style={{ color: '#f8fafc' }}>{currentElement.standardState === 'solid' ? 'Rắn' : currentElement.standardState === 'liquid' ? 'Lỏng' : 'Khí'}</b>
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Action Buttons */}
              <Stack spacing={1} sx={{ mt: 1.5 }}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={() => handleOpenDetailModal(currentElement)}
                  startIcon={<Eye size={15} />}
                  sx={{
                    bgcolor: '#0891b2',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    borderRadius: 2,
                    py: 0.9,
                    boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)',
                    '&:hover': { bgcolor: '#0e7490' },
                  }}
                >
                  🔍 Xem Thông Tin Chi Tiết (9 Mục)
                </Button>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={handleRandomizeElement}
                    startIcon={<RefreshCw size={14} />}
                    sx={{
                      color: '#06b6d4',
                      borderColor: 'rgba(6, 182, 212, 0.4)',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      borderRadius: 2,
                      py: 0.7,
                      '&:hover': { bgcolor: 'rgba(6, 182, 212, 0.15)', borderColor: '#06b6d4' },
                    }}
                  >
                    🎲 Nguyên Tố Khác
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => onNavigateTab(12)}
                    endIcon={<ArrowRight size={14} />}
                    sx={{
                      color: '#cbd5e1',
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      borderRadius: 2,
                      py: 0.7,
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
                    }}
                  >
                    Mở Bảng 118 Ô
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}

        </Box>
      </Paper>

      {/* FULL ELEMENT DETAIL MODAL (9 COMPREHENSIVE SECTIONS) */}
      <ElementDetailModal
        element={selectedDetailElement}
        open={elementModalOpen}
        onClose={() => setElementModalOpen(false)}
        onSelectElement={(z) => {
          const nextEl = getElementByAtomicNumber(z);
          if (nextEl) setSelectedDetailElement(nextEl);
        }}
      />
    </>
  );
}
