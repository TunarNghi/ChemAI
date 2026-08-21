"use client";

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Box, Typography, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, Chip, Stack
} from '@mui/material';

export interface AtomProps {
  position: [number, number, number];
  color: string;
  radius: number;
  label: string;
}

function Atom({ position, color, radius, label }: AtomProps) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <Html position={[0, radius + 0.3, 0]} center>
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#fff',
          padding: '2px 5px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 'bold',
          border: '1px solid rgba(255,255,255,0.25)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

export interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  radius?: number;
}

function Bond({ start, end, color = "#94a3b8", radius = 0.08 }: BondProps) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);

  const orientation = new THREE.Matrix4();
  const rotationAxis = new THREE.Vector3(0, 1, 0).cross(direction.clone().normalize()).normalize();
  const rotationAngle = Math.acos(new THREE.Vector3(0, 1, 0).dot(direction.clone().normalize()));

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

export interface MoleculeData {
  name: string;
  formula: string;
  bondType: string;
  description: string;
  atoms: AtomProps[];
  bonds: BondProps[];
}

export const MOLECULES: Record<string, MoleculeData> = {
  H2O: {
    name: "Nước",
    formula: "H₂O",
    bondType: "Cộng hóa trị có cực (Góc liên kết ~104.5°)",
    description: "Nguyên tử Oxi lai hóa sp³ có 2 cặp electron chưa liên kết, tạo góc gấp khúc 104.5°.",
    atoms: [
      { position: [0, 0, 0], color: "#ef4444", radius: 0.6, label: "O" },
      { position: [1.2, -0.7, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.2, -0.7, 0], color: "#f8fafc", radius: 0.35, label: "H2" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.2, -0.7, 0] },
      { start: [0, 0, 0], end: [-1.2, -0.7, 0] },
    ]
  },
  CO2: {
    name: "Cacbon Đioxit",
    formula: "CO₂",
    bondType: "Cộng hóa trị đôi (Thẳng hàng 180°)",
    description: "Nguyên tử Cacbon lai hóa sp tạo 2 liên kết đôi C=O thẳng hàng.",
    atoms: [
      { position: [0, 0, 0], color: "#334155", radius: 0.55, label: "C" },
      { position: [1.6, 0, 0], color: "#ef4444", radius: 0.5, label: "O1" },
      { position: [-1.6, 0, 0], color: "#ef4444", radius: 0.5, label: "O2" },
    ],
    bonds: [
      { start: [0, 0.1, 0], end: [1.6, 0.1, 0] },
      { start: [0, -0.1, 0], end: [1.6, -0.1, 0] },
      { start: [0, 0.1, 0], end: [-1.6, 0.1, 0] },
      { start: [0, -0.1, 0], end: [-1.6, -0.1, 0] },
    ]
  },
  CH4: {
    name: "Mêtan",
    formula: "CH₄",
    bondType: "Cộng hóa trị đơn (Tứ diện đều 109.5°)",
    description: "Cacbon lai hóa sp³ liên kết với 4 Hydro hướng về 4 đỉnh tứ diện đều.",
    atoms: [
      { position: [0, 0, 0], color: "#334155", radius: 0.55, label: "C" },
      { position: [0, 1.3, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [1.2, -0.4, 0], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [-0.6, -0.4, 1.0], color: "#f8fafc", radius: 0.35, label: "H3" },
      { position: [-0.6, -0.4, -1.0], color: "#f8fafc", radius: 0.35, label: "H4" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.3, 0] },
      { start: [0, 0, 0], end: [1.2, -0.4, 0] },
      { start: [0, 0, 0], end: [-0.6, -0.4, 1.0] },
      { start: [0, 0, 0], end: [-0.6, -0.4, -1.0] },
    ]
  },
  NaCl: {
    name: "Natri Clorua",
    formula: "NaCl",
    bondType: "Liên kết Ion (Hút tĩnh điện Na⁺ và Cl⁻)",
    description: "Nguyên tử Na nhường 1e trở thành Na⁺, Cl nhận 1e thành Cl⁻ hút tĩnh điện bền vững.",
    atoms: [
      { position: [-1.2, 0, 0], color: "#a855f7", radius: 0.5, label: "Na⁺" },
      { position: [1.2, 0, 0], color: "#22c55e", radius: 0.7, label: "Cl⁻" },
    ],
    bonds: [
      { start: [-1.2, 0, 0], end: [1.2, 0, 0], color: "#eab308", radius: 0.04 }
    ]
  },
  HCl: {
    name: "Hydrocloric Axit",
    formula: "HCl",
    bondType: "Cộng hóa trị có cực (Độ lệch âm điện 0.96)",
    description: "Cặp electron liên kết bị lệch hẳn về phía nguyên tử Cl có độ âm điện lớn hơn.",
    atoms: [
      { position: [-0.9, 0, 0], color: "#f8fafc", radius: 0.35, label: "H" },
      { position: [0.9, 0, 0], color: "#22c55e", radius: 0.65, label: "Cl" },
    ],
    bonds: [
      { start: [-0.9, 0, 0], end: [0.9, 0, 0] }
    ]
  },
  NH3: {
    name: "Amoniac",
    formula: "NH₃",
    bondType: "Cộng hóa trị có cực (Chóp tam giác ~107°)",
    description: "Nguyên tử Nito còn 1 cặp electron tự do đẩy 3 liên kết N-H thành hình chóp tam giác.",
    atoms: [
      { position: [0, 0.4, 0], color: "#3b82f6", radius: 0.55, label: "N" },
      { position: [0, -0.5, 1.1], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [1.0, -0.5, -0.6], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [-1.0, -0.5, -0.6], color: "#f8fafc", radius: 0.35, label: "H3" },
    ],
    bonds: [
      { start: [0, 0.4, 0], end: [0, -0.5, 1.1] },
      { start: [0, 0.4, 0], end: [1.0, -0.5, -0.6] },
      { start: [0, 0.4, 0], end: [-1.0, -0.5, -0.6] },
    ]
  },
  Cl2: {
    name: "Khí Clo",
    formula: "Cl₂",
    bondType: "Cộng hóa trị không cực (Đôi e chung ở giữa)",
    description: "Hai nguyên tử Cl có độ âm điện bằng nhau cùng góp chung 1 cặp electron.",
    atoms: [
      { position: [-1.0, 0, 0], color: "#22c55e", radius: 0.6, label: "Cl1" },
      { position: [1.0, 0, 0], color: "#22c55e", radius: 0.6, label: "Cl2" },
    ],
    bonds: [
      { start: [-1.0, 0, 0], end: [1.0, 0, 0] }
    ]
  },
  HNO3: {
    name: "Nitric Axit",
    formula: "HNO₃",
    bondType: "Cộng hóa trị & Liên kết cho nhận (Phẳng)",
    description: "Nguyên tử Nito lai hóa sp² liên kết với 3 nguyên tử Oxi trên một mặt phẳng.",
    atoms: [
      { position: [0, 0, 0], color: "#3b82f6", radius: 0.55, label: "N" },
      { position: [0, 1.4, 0], color: "#ef4444", radius: 0.5, label: "O1" },
      { position: [1.2, -0.7, 0], color: "#ef4444", radius: 0.5, label: "O2" },
      { position: [-1.2, -0.7, 0], color: "#ef4444", radius: 0.5, label: "O3" },
      { position: [1.9, -0.7, 0], color: "#f8fafc", radius: 0.35, label: "H" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.4, 0] },
      { start: [0, 0, 0], end: [1.2, -0.7, 0] },
      { start: [0, 0, 0], end: [-1.2, -0.7, 0] },
      { start: [1.2, -0.7, 0], end: [1.9, -0.7, 0] },
    ]
  },
  NaOH: {
    name: "Natri Hiđroxit",
    formula: "NaOH",
    bondType: "Liên kết Ion (Na⁺) & Cộng hóa trị (OH⁻)",
    description: "Nguyên tử Na⁺ liên kết ion với nhóm hyđroxit OH⁻.",
    atoms: [
      { position: [-1.4, 0, 0], color: "#a855f7", radius: 0.55, label: "Na⁺" },
      { position: [0.5, 0, 0], color: "#ef4444", radius: 0.5, label: "O" },
      { position: [1.4, 0, 0], color: "#f8fafc", radius: 0.35, label: "H" },
    ],
    bonds: [
      { start: [-1.4, 0, 0], end: [0.5, 0, 0], color: "#eab308", radius: 0.04 },
      { start: [0.5, 0, 0], end: [1.4, 0, 0] },
    ]
  },
  SO2: {
    name: "Lưu Huỳnh Đioxit",
    formula: "SO₂",
    bondType: "Cộng hóa trị có cực (Gấp khúc ~119°)",
    description: "Nguyên tử S lai hóa sp² có 1 cặp electron tự do đẩy 2 liên kết S-O thành hình gấp khúc.",
    atoms: [
      { position: [0, 0.3, 0], color: "#eab308", radius: 0.6, label: "S" },
      { position: [1.4, -0.5, 0], color: "#ef4444", radius: 0.5, label: "O1" },
      { position: [-1.4, -0.5, 0], color: "#ef4444", radius: 0.5, label: "O2" },
    ],
    bonds: [
      { start: [0, 0.3, 0], end: [1.4, -0.5, 0] },
      { start: [0, 0.3, 0], end: [-1.4, -0.5, 0] },
    ]
  },
  CO: {
    name: "Cacbon Monoxit",
    formula: "CO",
    bondType: "Liên kết ba C≡O (Bao gồm 1 liên kết cho - nhận)",
    description: "Nguyên tử C và O liên kết ba bền vững với độ dài liên kết ngắn 1.128 Å.",
    atoms: [
      { position: [-0.8, 0, 0], color: "#334155", radius: 0.55, label: "C" },
      { position: [0.8, 0, 0], color: "#ef4444", radius: 0.55, label: "O" },
    ],
    bonds: [
      { start: [-0.8, 0.1, 0], end: [0.8, 0.1, 0] },
      { start: [-0.8, 0, 0], end: [0.8, 0, 0] },
      { start: [-0.8, -0.1, 0], end: [0.8, -0.1, 0] },
    ]
  },
  Br2: {
    name: "Khí Brom",
    formula: "Br₂",
    bondType: "Cộng hóa trị không cực (Đôi e chung ở giữa)",
    description: "Hai nguyên tử Brom góp chung 1 cặp electron liên kết đơn Br-Br.",
    atoms: [
      { position: [-1.1, 0, 0], color: "#991b1b", radius: 0.65, label: "Br1" },
      { position: [1.1, 0, 0], color: "#991b1b", radius: 0.65, label: "Br2" },
    ],
    bonds: [
      { start: [-1.1, 0, 0], end: [1.1, 0, 0] }
    ]
  },
  H2SO4: {
    name: "Sunfuric Axit",
    formula: "H₂SO₄",
    bondType: "Cộng hóa trị & Liên kết cho nhận",
    description: "Cấu trúc tứ diện với nguyên tử Lưu huỳnh (S) ở trung tâm liên kết với 4 nguyên tử Oxi.",
    atoms: [
      { position: [0, 0, 0], color: "#eab308", radius: 0.65, label: "S" },
      { position: [0, 1.4, 0], color: "#ef4444", radius: 0.5, label: "O1" },
      { position: [0, -1.4, 0], color: "#ef4444", radius: 0.5, label: "O2" },
      { position: [1.3, 0, 0.6], color: "#ef4444", radius: 0.5, label: "O3" },
      { position: [-1.3, 0, -0.6], color: "#ef4444", radius: 0.5, label: "O4" },
      { position: [2.0, 0, 1.0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-2.0, 0, -1.0], color: "#f8fafc", radius: 0.35, label: "H2" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.4, 0] },
      { start: [0, 0, 0], end: [0, -1.4, 0] },
      { start: [0, 0, 0], end: [1.3, 0, 0.6] },
      { start: [0, 0, 0], end: [-1.3, 0, -0.6] },
      { start: [1.3, 0, 0.6], end: [2.0, 0, 1.0] },
      { start: [-1.3, 0, -0.6], end: [-2.0, 0, -1.0] },
    ]
  }
};

interface ChemicalBondViewer3DProps {
  selectedMoleculeKey?: string;
  customMoleculeData?: MoleculeData | null;
  isDialog?: boolean;
}

export default function ChemicalBondViewer3D({ selectedMoleculeKey = "H2O", customMoleculeData, isDialog = false }: ChemicalBondViewer3DProps) {
  const [selectedKey, setSelectedKey] = useState<string>(selectedMoleculeKey);

  useEffect(() => {
    if (selectedMoleculeKey) {
      setSelectedKey(selectedMoleculeKey);
    }
  }, [selectedMoleculeKey]);

  const currentMol = customMoleculeData || MOLECULES[selectedKey] || MOLECULES["H2O"];

  const content = (
    <Box>
      {!isDialog && (
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1.5}
          mb={2}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}
          >
            🔬 Mô Phỏng 3D Liên Kết Hóa Học (Three.js)
          </Typography>
          {!customMoleculeData && (
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 190 } }}>
              <InputLabel>Chọn phân tử 3D</InputLabel>
              <Select
                value={selectedKey}
                label="Chọn phân tử 3D"
                onChange={(e) => setSelectedKey(e.target.value)}
              >
                {Object.keys(MOLECULES).map((key) => (
                  <MenuItem key={key} value={key}>
                    {MOLECULES[key].name} ({MOLECULES[key].formula})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      )}

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              height: { xs: 270, sm: 350, md: 420 },
              width: '100%',
              bgcolor: '#020617',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #1e293b',
              touchAction: 'none',
            }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
              <group>
                {currentMol.atoms.map((atom, idx) => (
                  <Atom key={idx} {...atom} />
                ))}
                {currentMol.bonds.map((bond, idx) => (
                  <Bond key={idx} {...bond} />
                ))}
              </group>
              <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
            </Canvas>
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                right: { xs: 8, sm: 'auto' },
                bgcolor: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(6px)",
                p: 0.8,
                borderRadius: 1,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '10px', sm: '11px' }, display: 'block', textAlign: 'center' }}>
                💡 Vuốt để xoay 3D | Dùng 2 ngón tay thu phóng
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box p={{ xs: 1.5, sm: 2 }} bgcolor="background.default" borderRadius={2} border="1px solid rgba(255,255,255,0.05)" height="100%">
            <Typography variant="subtitle1" fontWeight="bold" color="cyan" sx={{ fontSize: { xs: '15px', sm: '16px' } }}>
              {currentMol.name} - {currentMol.formula}
            </Typography>
            <Chip label={currentMol.bondType} color="primary" size="small" sx={{ mt: 1, mb: 1, maxWidth: '100%', height: 'auto', py: 0.4, '& .MuiChip-label': { whiteSpace: 'normal' } }} />
            <Typography variant="body2" color="text.secondary" mt={0.5} sx={{ fontSize: { xs: '13px', sm: '14px' } }}>
              {currentMol.description}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box p={{ xs: 1.5, sm: 2 }} bgcolor="background.default" borderRadius={2} border="1px solid rgba(255,255,255,0.05)" height="100%">
            <Typography variant="subtitle2" fontWeight="bold" mb={1} color="warning.main" sx={{ fontSize: { xs: '14px', sm: '15px' } }}>
              ⚠️ Quy Tắc An Toàn Phòng Thí Nghiệm
            </Typography>
            <Typography variant="caption" color="text.secondary" component="div" sx={{ fontSize: { xs: '12px', sm: '12.5px' }, lineHeight: 1.6 }}>
              • Luôn đeo kính bảo hộ và găng tay khi làm việc với hóa chất.<br />
              • Khi pha loãng H₂SO₄ đặc, nhớ rót từ từ axit vào nước, tuyệt đối không làm ngược lại.<br />
              • Làm thí nghiệm sinh khí độc (Cl₂, NO₂, CO) trong tủ hút.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  if (isDialog) {
    return content;
  }

  return (
    <Card id="3d-bond-viewer-section" sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        {content}
      </CardContent>
    </Card>
  );
}
