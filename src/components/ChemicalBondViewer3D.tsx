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
  },
  CH3COOH: {
    name: "Axit Axetic (Giấm ăn)",
    formula: "CH₃COOH",
    bondType: "Cộng hóa trị phân cực (Nhóm cacboxyl -COOH)",
    description: "Chứa nhóm metyl -CH₃ lai hóa sp³ liên kết với nhóm cacboxyl -COOH phẳng lai hóa sp².",
    atoms: [
      { position: [-1.2, 0, 0], color: "#334155", radius: 0.55, label: "C1" },
      { position: [-1.2, 1.0, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.2, -0.5, 0.9], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [-1.2, -0.5, -0.9], color: "#f8fafc", radius: 0.35, label: "H3" },
      { position: [0.3, 0, 0], color: "#334155", radius: 0.55, label: "C2" },
      { position: [0.9, 1.2, 0], color: "#ef4444", radius: 0.5, label: "O1(=O)" },
      { position: [1.1, -1.0, 0], color: "#ef4444", radius: 0.5, label: "O2(-OH)" },
      { position: [1.9, -0.7, 0], color: "#f8fafc", radius: 0.35, label: "H4" },
    ],
    bonds: [
      { start: [-1.2, 0, 0], end: [-1.2, 1.0, 0] },
      { start: [-1.2, 0, 0], end: [-1.2, -0.5, 0.9] },
      { start: [-1.2, 0, 0], end: [-1.2, -0.5, -0.9] },
      { start: [-1.2, 0, 0], end: [0.3, 0, 0] },
      { start: [0.3, 0, 0], end: [0.9, 1.2, 0] },
      { start: [0.3, 0, 0], end: [1.1, -1.0, 0] },
      { start: [1.1, -1.0, 0], end: [1.9, -0.7, 0] },
    ]
  },
  H3PO4: {
    name: "Axit Photphoric",
    formula: "H₃PO₄",
    bondType: "Cộng hóa trị & Phối trí (Tứ diện)",
    description: "Nguyên tử Photpho (P) ở tâm liên kết 1 oxi đôi P=O và 3 nhóm -OH.",
    atoms: [
      { position: [0, 0, 0], color: "#f97316", radius: 0.65, label: "P" },
      { position: [0, 1.4, 0], color: "#ef4444", radius: 0.5, label: "O1" },
      { position: [1.3, -0.4, 0.6], color: "#ef4444", radius: 0.5, label: "O2" },
      { position: [-1.3, -0.4, 0.6], color: "#ef4444", radius: 0.5, label: "O3" },
      { position: [0, -0.5, -1.3], color: "#ef4444", radius: 0.5, label: "O4" },
      { position: [1.9, -0.3, 0.9], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.9, -0.3, 0.9], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [0, -0.9, -1.8], color: "#f8fafc", radius: 0.35, label: "H3" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.4, 0] },
      { start: [0, 0, 0], end: [1.3, -0.4, 0.6] },
      { start: [0, 0, 0], end: [-1.3, -0.4, 0.6] },
      { start: [0, 0, 0], end: [0, -0.5, -1.3] },
      { start: [1.3, -0.4, 0.6], end: [1.9, -0.3, 0.9] },
      { start: [-1.3, -0.4, 0.6], end: [-1.9, -0.3, 0.9] },
      { start: [0, -0.5, -1.3], end: [0, -0.9, -1.8] },
    ]
  },
  HF: {
    name: "Axit Flohiđric",
    formula: "HF",
    bondType: "Cộng hóa trị phân cực rất mạnh",
    description: "Liên kết đơn H-F phân cực mạnh do Flo có độ âm điện lớn nhất bảng tuần hoàn.",
    atoms: [
      { position: [-0.9, 0, 0], color: "#f8fafc", radius: 0.35, label: "H" },
      { position: [0.8, 0, 0], color: "#06b6d4", radius: 0.55, label: "F" },
    ],
    bonds: [
      { start: [-0.9, 0, 0], end: [0.8, 0, 0] }
    ]
  },
  C2H5OH: {
    name: "Ethanol (Cồn 96°)",
    formula: "C₂H₅OH",
    bondType: "Cộng hóa trị (Nhóm chức Ancol -OH)",
    description: "Chuỗi 2 nguyên tử cacbon liên kết nhóm hydroxyl -OH có thể tạo liên kết hiđro liên phân tử.",
    atoms: [
      { position: [-1.3, 0, 0], color: "#334155", radius: 0.55, label: "C1" },
      { position: [0.1, 0, 0], color: "#334155", radius: 0.55, label: "C2" },
      { position: [1.1, 0.8, 0], color: "#ef4444", radius: 0.5, label: "O" },
      { position: [1.9, 0.4, 0], color: "#f8fafc", radius: 0.35, label: "H(O)" },
      { position: [-1.3, 1.0, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.3, -0.5, 0.9], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [-1.3, -0.5, -0.9], color: "#f8fafc", radius: 0.35, label: "H3" },
      { position: [0.1, -1.0, 0], color: "#f8fafc", radius: 0.35, label: "H4" },
      { position: [0.1, 0.5, 0.9], color: "#f8fafc", radius: 0.35, label: "H5" },
    ],
    bonds: [
      { start: [-1.3, 0, 0], end: [0.1, 0, 0] },
      { start: [0.1, 0, 0], end: [1.1, 0.8, 0] },
      { start: [1.1, 0.8, 0], end: [1.9, 0.4, 0] },
      { start: [-1.3, 0, 0], end: [-1.3, 1.0, 0] },
      { start: [-1.3, 0, 0], end: [-1.3, -0.5, 0.9] },
      { start: [-1.3, 0, 0], end: [-1.3, -0.5, -0.9] },
      { start: [0.1, 0, 0], end: [0.1, -1.0, 0] },
      { start: [0.1, 0, 0], end: [0.1, 0.5, 0.9] },
    ]
  },
  CH3COCH3: {
    name: "Axeton (Dung môi sơn)",
    formula: "CH₃COCH₃",
    bondType: "Cộng hóa trị (Nhóm chức Xeton C=O)",
    description: "Nhóm cacbonyl C=O ở giữa liên kết với 2 nhóm metyl -CH₃ hai bên.",
    atoms: [
      { position: [0, 0.3, 0], color: "#334155", radius: 0.55, label: "C(C=O)" },
      { position: [0, 1.6, 0], color: "#ef4444", radius: 0.55, label: "O" },
      { position: [-1.3, -0.5, 0], color: "#334155", radius: 0.55, label: "C1" },
      { position: [1.3, -0.5, 0], color: "#334155", radius: 0.55, label: "C2" },
      { position: [-1.3, -1.5, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-2.0, -0.2, 0.7], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [-1.6, -0.2, -0.7], color: "#f8fafc", radius: 0.35, label: "H3" },
      { position: [1.3, -1.5, 0], color: "#f8fafc", radius: 0.35, label: "H4" },
      { position: [2.0, -0.2, 0.7], color: "#f8fafc", radius: 0.35, label: "H5" },
      { position: [1.6, -0.2, -0.7], color: "#f8fafc", radius: 0.35, label: "H6" },
    ],
    bonds: [
      { start: [0, 0.3, 0], end: [0, 1.6, 0] },
      { start: [0, 0.3, 0], end: [-1.3, -0.5, 0] },
      { start: [0, 0.3, 0], end: [1.3, -0.5, 0] },
      { start: [-1.3, -0.5, 0], end: [-1.3, -1.5, 0] },
      { start: [-1.3, -0.5, 0], end: [-2.0, -0.2, 0.7] },
      { start: [-1.3, -0.5, 0], end: [-1.6, -0.2, -0.7] },
      { start: [1.3, -0.5, 0], end: [1.3, -1.5, 0] },
      { start: [1.3, -0.5, 0], end: [2.0, -0.2, 0.7] },
      { start: [1.3, -0.5, 0], end: [1.6, -0.2, -0.7] },
    ]
  },
  C6H6: {
    name: "Benzen",
    formula: "C₆H₆",
    bondType: "Liên kết cộng hưởng nhân thơm pi liên hợp",
    description: "Vòng 6 cạnh phẳng đều với hệ electron pi giải tỏa đồng đều trên toàn bộ khung cacbon.",
    atoms: [
      { position: [1.4, 0, 0], color: "#334155", radius: 0.5, label: "C1" },
      { position: [0.7, 1.21, 0], color: "#334155", radius: 0.5, label: "C2" },
      { position: [-0.7, 1.21, 0], color: "#334155", radius: 0.5, label: "C3" },
      { position: [-1.4, 0, 0], color: "#334155", radius: 0.5, label: "C4" },
      { position: [-0.7, -1.21, 0], color: "#334155", radius: 0.5, label: "C5" },
      { position: [0.7, -1.21, 0], color: "#334155", radius: 0.5, label: "C6" },
      { position: [2.3, 0, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [1.15, 2.0, 0], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [-1.15, 2.0, 0], color: "#f8fafc", radius: 0.35, label: "H3" },
      { position: [-2.3, 0, 0], color: "#f8fafc", radius: 0.35, label: "H4" },
      { position: [-1.15, -2.0, 0], color: "#f8fafc", radius: 0.35, label: "H5" },
      { position: [1.15, -2.0, 0], color: "#f8fafc", radius: 0.35, label: "H6" },
    ],
    bonds: [
      { start: [1.4, 0, 0], end: [0.7, 1.21, 0] },
      { start: [0.7, 1.21, 0], end: [-0.7, 1.21, 0] },
      { start: [-0.7, 1.21, 0], end: [-1.4, 0, 0] },
      { start: [-1.4, 0, 0], end: [-0.7, -1.21, 0] },
      { start: [-0.7, -1.21, 0], end: [0.7, -1.21, 0] },
      { start: [0.7, -1.21, 0], end: [1.4, 0, 0] },
      { start: [1.4, 0, 0], end: [2.3, 0, 0] },
      { start: [0.7, 1.21, 0], end: [1.15, 2.0, 0] },
      { start: [-0.7, 1.21, 0], end: [-1.15, 2.0, 0] },
      { start: [-1.4, 0, 0], end: [-2.3, 0, 0] },
      { start: [-0.7, -1.21, 0], end: [-1.15, -2.0, 0] },
      { start: [0.7, -1.21, 0], end: [1.15, -2.0, 0] },
    ]
  },
  KOH: {
    name: "Kali Hiđroxit (Potash)",
    formula: "KOH",
    bondType: "Liên kết Ion (K⁺) & Cộng hóa trị (OH⁻)",
    description: "Cation K⁺ liên kết ion tĩnh điện với anion hyđroxit OH⁻.",
    atoms: [
      { position: [-1.5, 0, 0], color: "#a855f7", radius: 0.65, label: "K⁺" },
      { position: [0.5, 0, 0], color: "#ef4444", radius: 0.5, label: "O" },
      { position: [1.4, 0, 0], color: "#f8fafc", radius: 0.35, label: "H" },
    ],
    bonds: [
      { start: [-1.5, 0, 0], end: [0.5, 0, 0], color: "#eab308", radius: 0.04 },
      { start: [0.5, 0, 0], end: [1.4, 0, 0] },
    ]
  },
  H2S: {
    name: "Hiđro Sunfua (Mùi trứng thối)",
    formula: "H₂S",
    bondType: "Cộng hóa trị có cực (Gấp khúc ~92°)",
    description: "Nguyên tử S ở đỉnh có 2 cặp e chưa liên kết, tạo góc liên kết hẹp ~92.1°.",
    atoms: [
      { position: [0, 0.2, 0], color: "#eab308", radius: 0.65, label: "S" },
      { position: [1.3, -0.7, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.3, -0.7, 0], color: "#f8fafc", radius: 0.35, label: "H2" },
    ],
    bonds: [
      { start: [0, 0.2, 0], end: [1.3, -0.7, 0] },
      { start: [0, 0.2, 0], end: [-1.3, -0.7, 0] },
    ]
  },
  NO2: {
    name: "Nitơ Đioxit (Khí nâu đỏ)",
    formula: "NO₂",
    bondType: "Cộng hóa trị có cực (Gấp khúc ~134°, gốc tự do)",
    description: "Phân tử có 1 electron độc thân trên Nitơ, tạo màu nâu đỏ và tính chất phản từ.",
    atoms: [
      { position: [0, 0.3, 0], color: "#3b82f6", radius: 0.55, label: "N" },
      { position: [1.3, -0.4, 0], color: "#ef4444", radius: 0.5, label: "O1" },
      { position: [-1.3, -0.4, 0], color: "#ef4444", radius: 0.5, label: "O2" },
    ],
    bonds: [
      { start: [0, 0.3, 0], end: [1.3, -0.4, 0] },
      { start: [0, 0.3, 0], end: [-1.3, -0.4, 0] },
    ]
  },
  Li: {
    name: "Liti (Lithium - Nhóm IA)",
    formula: "Li",
    bondType: "Liên kết Kim loại (Mạng lập phương tâm khối BCC)",
    description: "Cấu hình [He]2s¹. Mạng tinh thể BCC với nguyên tử Li ở tâm và 8 đỉnh, mật độ electron tự do cao.",
    atoms: [
      { position: [0, 0, 0], color: "#ef4444", radius: 0.55, label: "Li (Tâm)" },
      { position: [1.1, 1.1, 1.1], color: "#f87171", radius: 0.4, label: "Li" },
      { position: [-1.1, 1.1, 1.1], color: "#f87171", radius: 0.4, label: "Li" },
      { position: [1.1, -1.1, 1.1], color: "#f87171", radius: 0.4, label: "Li" },
      { position: [-1.1, -1.1, 1.1], color: "#f87171", radius: 0.4, label: "Li" },
      { position: [1.1, 1.1, -1.1], color: "#f87171", radius: 0.4, label: "Li" },
      { position: [-1.1, 1.1, -1.1], color: "#f87171", radius: 0.4, label: "Li" },
      { position: [1.1, -1.1, -1.1], color: "#f87171", radius: 0.4, label: "Li" },
      { position: [-1.1, -1.1, -1.1], color: "#f87171", radius: 0.4, label: "Li" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.1, 1.1, 1.1], color: "#fbbf24", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.1, 1.1, 1.1], color: "#fbbf24", radius: 0.05 },
      { start: [0, 0, 0], end: [1.1, -1.1, 1.1], color: "#fbbf24", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.1, -1.1, 1.1], color: "#fbbf24", radius: 0.05 },
      { start: [0, 0, 0], end: [1.1, 1.1, -1.1], color: "#fbbf24", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.1, 1.1, -1.1], color: "#fbbf24", radius: 0.05 },
      { start: [0, 0, 0], end: [1.1, -1.1, -1.1], color: "#fbbf24", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.1, -1.1, -1.1], color: "#fbbf24", radius: 0.05 },
    ]
  },
  Na: {
    name: "Natri (Sodium - Nhóm IA)",
    formula: "Na",
    bondType: "Liên kết Kim loại (Mạng lập phương tâm khối BCC)",
    description: "Cấu hình [Ne]3s¹. Cation Na⁺ bao quanh bởi biển electron tự do, kim loại mềm dễ cắt bằng dao.",
    atoms: [
      { position: [0, 0, 0], color: "#eab308", radius: 0.65, label: "Na⁺ (Tâm)" },
      { position: [1.3, 1.3, 1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
      { position: [-1.3, 1.3, 1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
      { position: [1.3, -1.3, 1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
      { position: [-1.3, -1.3, 1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
      { position: [1.3, 1.3, -1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
      { position: [-1.3, 1.3, -1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
      { position: [1.3, -1.3, -1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
      { position: [-1.3, -1.3, -1.3], color: "#facc15", radius: 0.45, label: "Na⁺" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.3, 1.3, 1.3], color: "#38bdf8", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.3, 1.3, 1.3], color: "#38bdf8", radius: 0.05 },
      { start: [0, 0, 0], end: [1.3, -1.3, 1.3], color: "#38bdf8", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.3, -1.3, 1.3], color: "#38bdf8", radius: 0.05 },
      { start: [0, 0, 0], end: [1.3, 1.3, -1.3], color: "#38bdf8", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.3, 1.3, -1.3], color: "#38bdf8", radius: 0.05 },
      { start: [0, 0, 0], end: [1.3, -1.3, -1.3], color: "#38bdf8", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.3, -1.3, -1.3], color: "#38bdf8", radius: 0.05 },
    ]
  },
  K: {
    name: "Kali (Potassium - Nhóm IA)",
    formula: "K",
    bondType: "Liên kết Kim loại (Mạng lập phương tâm khối BCC)",
    description: "Cấu hình [Ar]4s¹. Bán kính nguyên tử lớn 227 pm, năng lượng ion hóa rất thấp 419 kJ/mol, hoạt động hóa học cực mạnh.",
    atoms: [
      { position: [0, 0, 0], color: "#a855f7", radius: 0.7, label: "K⁺ (Tâm)" },
      { position: [1.4, 1.4, 1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
      { position: [-1.4, 1.4, 1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
      { position: [1.4, -1.4, 1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
      { position: [-1.4, -1.4, 1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
      { position: [1.4, 1.4, -1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
      { position: [-1.4, 1.4, -1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
      { position: [1.4, -1.4, -1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
      { position: [-1.4, -1.4, -1.4], color: "#c084fc", radius: 0.5, label: "K⁺" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.4, 1.4, 1.4], color: "#e879f9", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.4, 1.4, 1.4], color: "#e879f9", radius: 0.05 },
      { start: [0, 0, 0], end: [1.4, -1.4, 1.4], color: "#e879f9", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.4, -1.4, 1.4], color: "#e879f9", radius: 0.05 },
      { start: [0, 0, 0], end: [1.4, 1.4, -1.4], color: "#e879f9", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.4, 1.4, -1.4], color: "#e879f9", radius: 0.05 },
      { start: [0, 0, 0], end: [1.4, -1.4, -1.4], color: "#e879f9", radius: 0.05 },
      { start: [0, 0, 0], end: [-1.4, -1.4, -1.4], color: "#e879f9", radius: 0.05 },
    ]
  },
  Be: {
    name: "Beri (Beryllium - Nhóm IIA)",
    formula: "Be",
    bondType: "Liên kết Kim loại (Mạng lục phương chặt khít HCP)",
    description: "Cấu hình 1s²2s². Kim loại nhẹ, có màng oxit BeO bảo vệ trơ với nước, hiđroxit Be(OH)₂ lưỡng tính.",
    atoms: [
      { position: [0, 0, 0], color: "#0284c7", radius: 0.5, label: "Be" },
      { position: [1.2, 0, 0], color: "#38bdf8", radius: 0.45, label: "Be1" },
      { position: [-1.2, 0, 0], color: "#38bdf8", radius: 0.45, label: "Be2" },
      { position: [0.6, 1.0, 0], color: "#38bdf8", radius: 0.45, label: "Be3" },
      { position: [-0.6, 1.0, 0], color: "#38bdf8", radius: 0.45, label: "Be4" },
      { position: [0.6, -1.0, 0], color: "#38bdf8", radius: 0.45, label: "Be5" },
      { position: [-0.6, -1.0, 0], color: "#38bdf8", radius: 0.45, label: "Be6" },
      { position: [0, 0.5, 0.9], color: "#7dd3fc", radius: 0.4, label: "Be(Lớp 2)" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.2, 0, 0] },
      { start: [0, 0, 0], end: [-1.2, 0, 0] },
      { start: [0, 0, 0], end: [0.6, 1.0, 0] },
      { start: [0, 0, 0], end: [-0.6, 1.0, 0] },
      { start: [0, 0, 0], end: [0.6, -1.0, 0] },
      { start: [0, 0, 0], end: [-0.6, -1.0, 0] },
      { start: [0, 0, 0], end: [0, 0.5, 0.9], color: "#f59e0b" },
    ]
  },
  Mg: {
    name: "Magie (Magnesium - Nhóm IIA)",
    formula: "Mg",
    bondType: "Liên kết Kim loại (Mạng lục phương chặt khít HCP)",
    description: "Cấu hình [Ne]3s². Cháy với ngọn lửa trắng chói lòa trong không khí và cả trong CO₂, phản ứng chậm với nước nóng.",
    atoms: [
      { position: [0, 0, 0], color: "#059669", radius: 0.6, label: "Mg" },
      { position: [1.3, 0, 0], color: "#34d399", radius: 0.5, label: "Mg1" },
      { position: [-1.3, 0, 0], color: "#34d399", radius: 0.5, label: "Mg2" },
      { position: [0.65, 1.1, 0], color: "#34d399", radius: 0.5, label: "Mg3" },
      { position: [-0.65, 1.1, 0], color: "#34d399", radius: 0.5, label: "Mg4" },
      { position: [0.65, -1.1, 0], color: "#34d399", radius: 0.5, label: "Mg5" },
      { position: [-0.65, -1.1, 0], color: "#34d399", radius: 0.5, label: "Mg6" },
      { position: [0, 0.6, 1.0], color: "#6ee7b7", radius: 0.45, label: "Mg(Lớp 2)" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.3, 0, 0] },
      { start: [0, 0, 0], end: [-1.3, 0, 0] },
      { start: [0, 0, 0], end: [0.65, 1.1, 0] },
      { start: [0, 0, 0], end: [-0.65, 1.1, 0] },
      { start: [0, 0, 0], end: [0.65, -1.1, 0] },
      { start: [0, 0, 0], end: [-0.65, -1.1, 0] },
      { start: [0, 0, 0], end: [0, 0.6, 1.0], color: "#facc15" },
    ]
  },
  Ca: {
    name: "Canxi (Calcium - Nhóm IIA)",
    formula: "Ca",
    bondType: "Liên kết Kim loại (Mạng lập phương tâm diện FCC)",
    description: "Cấu hình [Ar]4s². Mạng lập phương tâm diện, phản ứng khá mạnh với nước sinh khí H₂ và dung dịch vôi Ca(OH)₂, ngọn lửa màu đỏ da cam.",
    atoms: [
      { position: [0, 0, 0], color: "#ea580c", radius: 0.65, label: "Ca (Gốc)" },
      { position: [1.4, 1.4, 0], color: "#fb923c", radius: 0.55, label: "Ca (Mặt)" },
      { position: [1.4, 0, 1.4], color: "#fb923c", radius: 0.55, label: "Ca (Mặt)" },
      { position: [0, 1.4, 1.4], color: "#fb923c", radius: 0.55, label: "Ca (Mặt)" },
      { position: [-1.4, -1.4, 0], color: "#fdba74", radius: 0.45, label: "Ca" },
      { position: [-1.4, 0, -1.4], color: "#fdba74", radius: 0.45, label: "Ca" },
      { position: [0, -1.4, -1.4], color: "#fdba74", radius: 0.45, label: "Ca" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.4, 1.4, 0] },
      { start: [0, 0, 0], end: [1.4, 0, 1.4] },
      { start: [0, 0, 0], end: [0, 1.4, 1.4] },
      { start: [0, 0, 0], end: [-1.4, -1.4, 0] },
      { start: [0, 0, 0], end: [-1.4, 0, -1.4] },
      { start: [0, 0, 0], end: [0, -1.4, -1.4] },
    ]
  },
  Ba: {
    name: "Bari (Barium - Nhóm IIA)",
    formula: "Ba",
    bondType: "Liên kết Kim loại (Mạng lập phương tâm khối BCC)",
    description: "Cấu hình [Xe]6s². Hoạt động hóa học mạnh nhất nhóm IIA, phản ứng dữ dội với nước, đốt cháy ngọn lửa màu lục vàng (xanh táo).",
    atoms: [
      { position: [0, 0, 0], color: "#84cc16", radius: 0.7, label: "Ba²⁺ (Tâm)" },
      { position: [1.5, 1.5, 1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
      { position: [-1.5, 1.5, 1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
      { position: [1.5, -1.5, 1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
      { position: [-1.5, -1.5, 1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
      { position: [1.5, 1.5, -1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
      { position: [-1.5, 1.5, -1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
      { position: [1.5, -1.5, -1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
      { position: [-1.5, -1.5, -1.5], color: "#a3e635", radius: 0.5, label: "Ba²⁺" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.5, 1.5, 1.5], color: "#eab308", radius: 0.06 },
      { start: [0, 0, 0], end: [-1.5, 1.5, 1.5], color: "#eab308", radius: 0.06 },
      { start: [0, 0, 0], end: [1.5, -1.5, 1.5], color: "#eab308", radius: 0.06 },
      { start: [0, 0, 0], end: [-1.5, -1.5, 1.5], color: "#eab308", radius: 0.06 },
      { start: [0, 0, 0], end: [1.5, 1.5, -1.5], color: "#eab308", radius: 0.06 },
      { start: [0, 0, 0], end: [-1.5, 1.5, -1.5], color: "#eab308", radius: 0.06 },
      { start: [0, 0, 0], end: [1.5, -1.5, -1.5], color: "#eab308", radius: 0.06 },
      { start: [0, 0, 0], end: [-1.5, -1.5, -1.5], color: "#eab308", radius: 0.06 },
    ]
  },
  Al: {
    name: "Nhôm (Aluminium - Nhóm IIIA)",
    formula: "Al",
    bondType: "Liên kết Kim loại (Mạng lập phương tâm diện FCC)",
    description: "Cấu hình [Ne]3s²3p¹. Kim loại nhẹ, dẫn điện nhiệt tốt, có màng Al₂O₃ bảo vệ cực bền và tính chất lưỡng tính.",
    atoms: [
      { position: [0, 0, 0], color: "#94a3b8", radius: 0.6, label: "Al (Gốc)" },
      { position: [1.3, 1.3, 0], color: "#cbd5e1", radius: 0.5, label: "Al" },
      { position: [1.3, 0, 1.3], color: "#cbd5e1", radius: 0.5, label: "Al" },
      { position: [0, 1.3, 1.3], color: "#cbd5e1", radius: 0.5, label: "Al" },
      { position: [-1.3, -1.3, 0], color: "#64748b", radius: 0.45, label: "Al" },
      { position: [-1.3, 0, -1.3], color: "#64748b", radius: 0.45, label: "Al" },
      { position: [0, -1.3, -1.3], color: "#64748b", radius: 0.45, label: "Al" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.3, 1.3, 0] },
      { start: [0, 0, 0], end: [1.3, 0, 1.3] },
      { start: [0, 0, 0], end: [0, 1.3, 1.3] },
      { start: [0, 0, 0], end: [-1.3, -1.3, 0] },
      { start: [0, 0, 0], end: [-1.3, 0, -1.3] },
      { start: [0, 0, 0], end: [0, -1.3, -1.3] },
    ]
  },
  Si: {
    name: "Silic (Silicon - Nhóm IVA)",
    formula: "Si",
    bondType: "Liên kết Cộng hóa trị (Mạng tinh thể kiểu Kim Cương)",
    description: "Cấu hình [Ne]3s²3p². Mạng tứ diện bền vững, chất bán dẫn chiến lược trong vi mạch điện tử.",
    atoms: [
      { position: [0, 0, 0], color: "#64748b", radius: 0.6, label: "Si" },
      { position: [1.1, 1.1, 1.1], color: "#475569", radius: 0.45, label: "Si1" },
      { position: [-1.1, -1.1, 1.1], color: "#475569", radius: 0.45, label: "Si2" },
      { position: [-1.1, 1.1, -1.1], color: "#475569", radius: 0.45, label: "Si3" },
      { position: [1.1, -1.1, -1.1], color: "#475569", radius: 0.45, label: "Si4" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.1, 1.1, 1.1] },
      { start: [0, 0, 0], end: [-1.1, -1.1, 1.1] },
      { start: [0, 0, 0], end: [-1.1, 1.1, -1.1] },
      { start: [0, 0, 0], end: [1.1, -1.1, -1.1] },
    ]
  },
  P4: {
    name: "Photpho Trắng (White Phosphorus - Nhóm VA)",
    formula: "P₄",
    bondType: "Cộng hóa trị không cực (Tứ diện đều)",
    description: "Cấu hình [Ne]3s²3p³. Phân tử tứ diện đều góc liên kết 60° căng thẳng cao, rất dễ bốc cháy tự phát ở 40°C.",
    atoms: [
      { position: [0, 1.3, 0], color: "#f97316", radius: 0.55, label: "P1" },
      { position: [-1.1, -0.65, 0.7], color: "#ea580c", radius: 0.55, label: "P2" },
      { position: [1.1, -0.65, 0.7], color: "#ea580c", radius: 0.55, label: "P3" },
      { position: [0, -0.65, -1.1], color: "#ea580c", radius: 0.55, label: "P4" },
    ],
    bonds: [
      { start: [0, 1.3, 0], end: [-1.1, -0.65, 0.7] },
      { start: [0, 1.3, 0], end: [1.1, -0.65, 0.7] },
      { start: [0, 1.3, 0], end: [0, -0.65, -1.1] },
      { start: [-1.1, -0.65, 0.7], end: [1.1, -0.65, 0.7] },
      { start: [1.1, -0.65, 0.7], end: [0, -0.65, -1.1] },
      { start: [0, -0.65, -1.1], end: [-1.1, -0.65, 0.7] },
    ]
  },
  S8: {
    name: "Lưu Huỳnh (Octasulfur - Nhóm VIA)",
    formula: "S₈",
    bondType: "Cộng hóa trị không cực (Vòng hình Vương Miện Crown)",
    description: "Cấu hình [Ne]3s²3p⁴. Vòng 8 nguyên tử S gợn sóng kiểu vương miện dẻo dai màu vàng chanh.",
    atoms: [
      { position: [1.4, 0.5, 0], color: "#eab308", radius: 0.5, label: "S1" },
      { position: [1.0, -0.5, 1.0], color: "#eab308", radius: 0.5, label: "S2" },
      { position: [0, 0.5, 1.4], color: "#eab308", radius: 0.5, label: "S3" },
      { position: [-1.0, -0.5, 1.0], color: "#eab308", radius: 0.5, label: "S4" },
      { position: [-1.4, 0.5, 0], color: "#eab308", radius: 0.5, label: "S5" },
      { position: [-1.0, -0.5, -1.0], color: "#eab308", radius: 0.5, label: "S6" },
      { position: [0, 0.5, -1.4], color: "#eab308", radius: 0.5, label: "S7" },
      { position: [1.0, -0.5, -1.0], color: "#eab308", radius: 0.5, label: "S8" },
    ],
    bonds: [
      { start: [1.4, 0.5, 0], end: [1.0, -0.5, 1.0] },
      { start: [1.0, -0.5, 1.0], end: [0, 0.5, 1.4] },
      { start: [0, 0.5, 1.4], end: [-1.0, -0.5, 1.0] },
      { start: [-1.0, -0.5, 1.0], end: [-1.4, 0.5, 0] },
      { start: [-1.4, 0.5, 0], end: [-1.0, -0.5, -1.0] },
      { start: [-1.0, -0.5, -1.0], end: [0, 0.5, -1.4] },
      { start: [0, 0.5, -1.4], end: [1.0, -0.5, -1.0] },
      { start: [1.0, -0.5, -1.0], end: [1.4, 0.5, 0] },
    ]
  },
  F2: {
    name: "Khí Flo (Fluorine Gas - Nhóm VIIA)",
    formula: "F₂",
    bondType: "Cộng hóa trị không phân cực (Đơn chất)",
    description: "Cấu hình [He]2s²2p⁵. Độ âm điện lớn nhất (3.98), tính oxi hóa mạnh nhất trong bảng tuần hoàn.",
    atoms: [
      { position: [-0.9, 0, 0], color: "#86efac", radius: 0.5, label: "F1" },
      { position: [0.9, 0, 0], color: "#86efac", radius: 0.5, label: "F2" },
    ],
    bonds: [
      { start: [-0.9, 0, 0], end: [0.9, 0, 0] }
    ]
  },
  I2: {
    name: "Tinh Thể Iot (Iodine - Nhóm VIIA)",
    formula: "I₂",
    bondType: "Cộng hóa trị không phân cực (Tinh thể phân tử thăng hoa)",
    description: "Cấu hình [Kr]4d¹⁰5s²5p⁵. Chất rắn tím đen dễ thăng hoa thành hơi màu tím biếc, làm xanh hồ tinh bột.",
    atoms: [
      { position: [-1.3, 0, 0], color: "#7e22ce", radius: 0.7, label: "I1" },
      { position: [1.3, 0, 0], color: "#7e22ce", radius: 0.7, label: "I2" },
    ],
    bonds: [
      { start: [-1.3, 0, 0], end: [1.3, 0, 0] }
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
