"use client";

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Box, Typography, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, Chip, Stack, Paper
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
  order?: 1 | 2 | 3;
}

function SingleCylinder({
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
      <cylinderGeometry args={[radius, radius, length, 16]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

function Bond({ start, end, color = "#94a3b8", radius = 0.075, order = 1 }: BondProps) {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const dir = new THREE.Vector3().subVectors(endVec, startVec);
  const length = dir.length();
  if (length < 0.001) return null;
  const dirNorm = dir.clone().normalize();

  // Find a reliable perpendicular vector for offset
  let perp = new THREE.Vector3(0, 0, 1).cross(dirNorm);
  if (perp.lengthSq() < 0.01) {
    perp = new THREE.Vector3(0, 1, 0).cross(dirNorm);
  }
  perp.normalize();

  if (order === 2) {
    const offsetDist = 0.085;
    const offset = perp.clone().multiplyScalar(offsetDist);
    const r = radius * 0.75;
    return (
      <group>
        <SingleCylinder
          start={startVec.clone().add(offset)}
          end={endVec.clone().add(offset)}
          color={color}
          radius={r}
        />
        <SingleCylinder
          start={startVec.clone().sub(offset)}
          end={endVec.clone().sub(offset)}
          color={color}
          radius={r}
        />
      </group>
    );
  }

  if (order === 3) {
    const offsetDist = 0.11;
    const offset = perp.clone().multiplyScalar(offsetDist);
    const r = radius * 0.65;
    return (
      <group>
        <SingleCylinder start={startVec} end={endVec} color={color} radius={r} />
        <SingleCylinder
          start={startVec.clone().add(offset)}
          end={endVec.clone().add(offset)}
          color={color}
          radius={r}
        />
        <SingleCylinder
          start={startVec.clone().sub(offset)}
          end={endVec.clone().sub(offset)}
          color={color}
          radius={r}
        />
      </group>
    );
  }

  return <SingleCylinder start={startVec} end={endVec} color={color} radius={radius} />;
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
    name: "Nước (Water)",
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
    name: "Cacbon Đioxit (Carbon Dioxide)",
    formula: "CO₂",
    bondType: "Liên kết đôi C=O (Thẳng hàng 180°)",
    description: "Nguyên tử Carbon lai hóa sp tạo 2 liên kết đôi C=O thẳng hàng không phân cực.",
    atoms: [
      { position: [0, 0, 0], color: "#334155", radius: 0.55, label: "C" },
      { position: [1.6, 0, 0], color: "#ef4444", radius: 0.5, label: "O1" },
      { position: [-1.6, 0, 0], color: "#ef4444", radius: 0.5, label: "O2" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [1.6, 0, 0], order: 2 },
      { start: [0, 0, 0], end: [-1.6, 0, 0], order: 2 },
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
    name: "Cacbon Monoxit (Carbon Monoxide)",
    formula: "CO",
    bondType: "Liên kết ba C≡O (Bao gồm 1 liên kết cho - nhận)",
    description: "Nguyên tử C và O liên kết ba bền vững với độ dài liên kết ngắn 1.128 Å.",
    atoms: [
      { position: [-0.8, 0, 0], color: "#334155", radius: 0.55, label: "C" },
      { position: [0.8, 0, 0], color: "#ef4444", radius: 0.55, label: "O" },
    ],
    bonds: [
      { start: [-0.8, 0, 0], end: [0.8, 0, 0], order: 3 },
    ]
  },
  O2: {
    name: "Khí Oxi (Oxygen Gas)",
    formula: "O₂",
    bondType: "Liên kết đôi O=O",
    description: "Hai nguyên tử Oxi liên kết với nhau bằng 1 liên kết đôi O=O gồm 1 liên kết sigma và 1 liên kết pi.",
    atoms: [
      { position: [-0.85, 0, 0], color: "#ef4444", radius: 0.55, label: "O1" },
      { position: [0.85, 0, 0], color: "#ef4444", radius: 0.55, label: "O2" },
    ],
    bonds: [
      { start: [-0.85, 0, 0], end: [0.85, 0, 0], order: 2 },
    ]
  },
  C2H4: {
    name: "Etylen (Ethene)",
    formula: "C₂H₄",
    bondType: "Liên kết đôi C=C (Phẳng sp²)",
    description: "Hai nguyên tử Carbon lai hóa sp² tạo 1 liên kết đôi C=C và 4 liên kết đơn C-H trên cùng một mặt phẳng.",
    atoms: [
      { position: [-0.75, 0, 0], color: "#334155", radius: 0.55, label: "C1" },
      { position: [0.75, 0, 0], color: "#334155", radius: 0.55, label: "C2" },
      { position: [-1.4, 0.9, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.4, -0.9, 0], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [1.4, 0.9, 0], color: "#f8fafc", radius: 0.35, label: "H3" },
      { position: [1.4, -0.9, 0], color: "#f8fafc", radius: 0.35, label: "H4" },
    ],
    bonds: [
      { start: [-0.75, 0, 0], end: [0.75, 0, 0], order: 2 },
      { start: [-0.75, 0, 0], end: [-1.4, 0.9, 0] },
      { start: [-0.75, 0, 0], end: [-1.4, -0.9, 0] },
      { start: [0.75, 0, 0], end: [1.4, 0.9, 0] },
      { start: [0.75, 0, 0], end: [1.4, -0.9, 0] },
    ]
  },
  C2H2: {
    name: "Axetilen (Ethyne)",
    formula: "C₂H₂",
    bondType: "Liên kết ba C≡C (Thẳng hàng sp)",
    description: "Hai nguyên tử Carbon lai hóa sp tạo liên kết ba C≡C thẳng hàng với góc liên kết 180°.",
    atoms: [
      { position: [-0.65, 0, 0], color: "#334155", radius: 0.55, label: "C1" },
      { position: [0.65, 0, 0], color: "#334155", radius: 0.55, label: "C2" },
      { position: [-1.6, 0, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [1.6, 0, 0], color: "#f8fafc", radius: 0.35, label: "H2" },
    ],
    bonds: [
      { start: [-0.65, 0, 0], end: [0.65, 0, 0], order: 3 },
      { start: [-0.65, 0, 0], end: [-1.6, 0, 0] },
      { start: [0.65, 0, 0], end: [1.6, 0, 0] },
    ]
  },
  HCHO: {
    name: "Fomanđehit (Formaldehyde)",
    formula: "HCHO",
    bondType: "Liên kết đôi C=O (Phẳng tam giác sp²)",
    description: "Nhóm aldehyde chứa liên kết đôi C=O phân cực mạnh, dạng phẳng tam giác.",
    atoms: [
      { position: [0, 0, 0], color: "#334155", radius: 0.55, label: "C" },
      { position: [0, 1.3, 0], color: "#ef4444", radius: 0.55, label: "O(=O)" },
      { position: [-0.95, -0.65, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [0.95, -0.65, 0], color: "#f8fafc", radius: 0.35, label: "H2" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.3, 0], order: 2 },
      { start: [0, 0, 0], end: [-0.95, -0.65, 0] },
      { start: [0, 0, 0], end: [0.95, -0.65, 0] },
    ]
  },
  HCOOH: {
    name: "Axit Fomic (Formic Acid)",
    formula: "HCOOH",
    bondType: "Cộng hóa trị (Nhóm chức Carboxyl -COOH có C=O)",
    description: "Acid carboxylic đơn giản nhất chứa nhóm carbonyl C=O và hydroxyl -OH.",
    atoms: [
      { position: [0, 0, 0], color: "#334155", radius: 0.55, label: "C" },
      { position: [0, 1.3, 0], color: "#ef4444", radius: 0.55, label: "O1(=O)" },
      { position: [1.1, -0.8, 0], color: "#ef4444", radius: 0.5, label: "O2(-OH)" },
      { position: [1.8, -0.4, 0], color: "#f8fafc", radius: 0.35, label: "H(O)" },
      { position: [-1.0, -0.6, 0], color: "#f8fafc", radius: 0.35, label: "H(C)" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.3, 0], order: 2 },
      { start: [0, 0, 0], end: [1.1, -0.8, 0] },
      { start: [1.1, -0.8, 0], end: [1.8, -0.4, 0] },
      { start: [0, 0, 0], end: [-1.0, -0.6, 0] },
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
      { position: [0, 1.4, 0], color: "#ef4444", radius: 0.5, label: "O1(=O)" },
      { position: [0, -1.4, 0], color: "#ef4444", radius: 0.5, label: "O2(=O)" },
      { position: [1.3, 0, 0.6], color: "#ef4444", radius: 0.5, label: "O3(-OH)" },
      { position: [-1.3, 0, -0.6], color: "#ef4444", radius: 0.5, label: "O4(-OH)" },
      { position: [2.0, 0, 1.0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-2.0, 0, -1.0], color: "#f8fafc", radius: 0.35, label: "H2" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.4, 0], order: 2 },
      { start: [0, 0, 0], end: [0, -1.4, 0], order: 2 },
      { start: [0, 0, 0], end: [1.3, 0, 0.6] },
      { start: [0, 0, 0], end: [-1.3, 0, -0.6] },
      { start: [1.3, 0, 0.6], end: [2.0, 0, 1.0] },
      { start: [-1.3, 0, -0.6], end: [-2.0, 0, -1.0] },
    ]
  },
  CH3COOH: {
    name: "Axit Axetic (Acetic Acid)",
    formula: "CH₃COOH",
    bondType: "Cộng hóa trị (Nhóm chức Carboxyl -COOH có C=O)",
    description: "Chứa nhóm methyl -CH₃ lai hóa sp³ liên kết với nhóm carboxyl -COOH phẳng với liên kết đôi C=O và liên kết đơn C-OH.",
    atoms: [
      { position: [-1.2, 0, 0], color: "#334155", radius: 0.55, label: "C1" },
      { position: [-1.2, 1.0, 0], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.2, -0.5, 0.9], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [-1.2, -0.5, -0.9], color: "#f8fafc", radius: 0.35, label: "H3" },
      { position: [0.3, 0, 0], color: "#334155", radius: 0.55, label: "C2" },
      { position: [0.9, 1.2, 0], color: "#ef4444", radius: 0.55, label: "O1(=O)" },
      { position: [1.1, -1.0, 0], color: "#ef4444", radius: 0.5, label: "O2(-OH)" },
      { position: [1.9, -0.7, 0], color: "#f8fafc", radius: 0.35, label: "H4" },
    ],
    bonds: [
      { start: [-1.2, 0, 0], end: [-1.2, 1.0, 0] },
      { start: [-1.2, 0, 0], end: [-1.2, -0.5, 0.9] },
      { start: [-1.2, 0, 0], end: [-1.2, -0.5, -0.9] },
      { start: [-1.2, 0, 0], end: [0.3, 0, 0] },
      { start: [0.3, 0, 0], end: [0.9, 1.2, 0], order: 2 },
      { start: [0.3, 0, 0], end: [1.1, -1.0, 0] },
      { start: [1.1, -1.0, 0], end: [1.9, -0.7, 0] },
    ]
  },
  H3PO4: {
    name: "Axit Photphoric (Phosphoric Acid)",
    formula: "H₃PO₄",
    bondType: "Cộng hóa trị & Phối trí (Tứ diện)",
    description: "Nguyên tử Photpho (P) ở tâm liên kết 1 liên kết đôi P=O và 3 nhóm -OH.",
    atoms: [
      { position: [0, 0, 0], color: "#f97316", radius: 0.65, label: "P" },
      { position: [0, 1.4, 0], color: "#ef4444", radius: 0.5, label: "O1(=O)" },
      { position: [1.3, -0.4, 0.6], color: "#ef4444", radius: 0.5, label: "O2(-OH)" },
      { position: [-1.3, -0.4, 0.6], color: "#ef4444", radius: 0.5, label: "O3(-OH)" },
      { position: [0, -0.5, -1.3], color: "#ef4444", radius: 0.5, label: "O4(-OH)" },
      { position: [1.9, -0.3, 0.9], color: "#f8fafc", radius: 0.35, label: "H1" },
      { position: [-1.9, -0.3, 0.9], color: "#f8fafc", radius: 0.35, label: "H2" },
      { position: [0, -0.9, -1.8], color: "#f8fafc", radius: 0.35, label: "H3" },
    ],
    bonds: [
      { start: [0, 0, 0], end: [0, 1.4, 0], order: 2 },
      { start: [0, 0, 0], end: [1.3, -0.4, 0.6] },
      { start: [0, 0, 0], end: [-1.3, -0.4, 0.6] },
      { start: [0, 0, 0], end: [0, -0.5, -1.3] },
      { start: [1.3, -0.4, 0.6], end: [1.9, -0.3, 0.9] },
      { start: [-1.3, -0.4, 0.6], end: [-1.9, -0.3, 0.9] },
      { start: [0, -0.5, -1.3], end: [0, -0.9, -1.8] },
    ]
  },
  HF: {
    name: "Axit Flohiđric (Hydrofluoric Acid)",
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
    name: "Axeton (Acetone - Dung môi)",
    formula: "CH₃COCH₃",
    bondType: "Cộng hóa trị (Nhóm chức Xeton C=O)",
    description: "Nhóm carbonyl C=O ở giữa liên kết đôi với O và liên kết đơn với 2 nhóm methyl -CH₃ hai bên.",
    atoms: [
      { position: [0, 0.3, 0], color: "#334155", radius: 0.55, label: "C(C=O)" },
      { position: [0, 1.6, 0], color: "#ef4444", radius: 0.55, label: "O(=O)" },
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
      { start: [0, 0.3, 0], end: [0, 1.6, 0], order: 2 },
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

export interface LewisAtomNode {
  id: string;
  symbol: string;
  x: number;
  y: number;
  color: string;
  textColor?: string;
  radius?: number;
  formalCharge?: string;
  lonePairs?: Array<{ angle: number; count?: number }>; // angle in degrees: 0 (right), 90 (top), 180 (left), 270 (bottom)
  isBracket?: boolean;
}

export interface LewisBondLink {
  from: string;
  to: string;
  type: 'single' | 'double' | 'triple' | 'coordinate' | 'ionic' | 'ring';
  arrowDirection?: 'forward' | 'backward';
}

export interface LewisOctetItem {
  atom: string;
  valence: number;
  bondingElectrons: number;
  lonePairElectrons: number;
  totalElectrons: number;
  status: string;
}

export interface LewisData {
  lewisFormula: string;
  hybridization: string;
  vseprGeometry: string;
  bondAngle: string;
  octetStatus: string;
  valenceElectrons: number;
  lonePairsTotal: number;
  bondingPairsTotal: number;
  lonePairDetails: string;
  formalChargeNotes: string;
  atoms: LewisAtomNode[];
  bonds: LewisBondLink[];
  octetTable: LewisOctetItem[];
}

export const LEWIS_DATABASE: Record<string, LewisData> = {
  H2O: {
    lewisFormula: "H — Ö̈ — H",
    hybridization: "sp³ (tại O)",
    vseprGeometry: "Gấp khúc (Bent, AX₂E₂)",
    bondAngle: "104.5°",
    octetStatus: "Oxi đạt bát tử 8e, Hydro đạt đúp-lê 2e",
    valenceElectrons: 8,
    lonePairsTotal: 2,
    bondingPairsTotal: 2,
    lonePairDetails: "Oxi ở giữa có 2 cặp e tự do (lone pairs) ở đỉnh, tạo lực đẩy ép góc liên kết H-O-H thu hẹp về 104.5°.",
    formalChargeNotes: "O(0), H(0). Phân tử phân cực mạnh, tạo liên kết hiđro.",
    atoms: [
      { id: "O", symbol: "O", x: 250, y: 135, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 140 }] },
      { id: "H1", symbol: "H", x: 160, y: 210, color: "#38bdf8" },
      { id: "H2", symbol: "H", x: 340, y: 210, color: "#38bdf8" },
    ],
    bonds: [
      { from: "O", to: "H1", type: "single" },
      { from: "O", to: "H2", type: "single" },
    ],
    octetTable: [
      { atom: "Oxygen (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Hydrogen 1 (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
      { atom: "Hydrogen 2 (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  CO2: {
    lewisFormula: "::Ö = C = Ö::",
    hybridization: "sp (tại C)",
    vseprGeometry: "Thẳng hàng (Linear, AX₂)",
    bondAngle: "180°",
    octetStatus: "Tất cả các nguyên tử đều đạt bát tử 8e",
    valenceElectrons: 16,
    lonePairsTotal: 4,
    bondingPairsTotal: 4,
    lonePairDetails: "Mỗi Oxi ở 2 đầu giữ 2 cặp e tự do, nguyên tử C ở giữa không còn e tự do nào.",
    formalChargeNotes: "C(0), O(0). 2 liên kết đôi C=O triệt tiêu mômen lưỡng cực (phân tử không cực).",
    atoms: [
      { id: "C", symbol: "C", x: 250, y: 150, color: "#64748b" },
      { id: "O1", symbol: "O", x: 120, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "O2", symbol: "O", x: 380, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "C", to: "O1", type: "double" },
      { from: "C", to: "O2", type: "double" },
    ],
    octetTable: [
      { atom: "Carbon (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen 1 (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen 2 (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  CH4: {
    lewisFormula: "H\n  |\nH — C — H\n  |\n  H",
    hybridization: "sp³ (tại C)",
    vseprGeometry: "Tứ diện đều (Tetrahedral, AX₄)",
    bondAngle: "109.5°",
    octetStatus: "Carbon đạt bát tử 8e, Hydro đạt đúp-lê 2e",
    valenceElectrons: 8,
    lonePairsTotal: 0,
    bondingPairsTotal: 4,
    lonePairDetails: "Không có cặp electron tự do. Toàn bộ 4 cặp e tham gia tạo 4 liên kết σ C-H.",
    formalChargeNotes: "C(0), H(0). Phân tử hoàn toàn đối xứng, không phân cực.",
    atoms: [
      { id: "C", symbol: "C", x: 250, y: 150, color: "#64748b" },
      { id: "H1", symbol: "H", x: 250, y: 55, color: "#38bdf8" },
      { id: "H2", symbol: "H", x: 350, y: 150, color: "#38bdf8" },
      { id: "H3", symbol: "H", x: 250, y: 245, color: "#38bdf8" },
      { id: "H4", symbol: "H", x: 150, y: 150, color: "#38bdf8" },
    ],
    bonds: [
      { from: "C", to: "H1", type: "single" },
      { from: "C", to: "H2", type: "single" },
      { from: "C", to: "H3", type: "single" },
      { from: "C", to: "H4", type: "single" },
    ],
    octetTable: [
      { atom: "Carbon (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "4 x Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  NaCl: {
    lewisFormula: "[Na]⁺  [ :C̈l: ]⁻",
    hybridization: "Mạng tinh thể ion (Không lai hóa)",
    vseprGeometry: "Mạng lập phương tâm mặt",
    bondAngle: "90° / 180°",
    octetStatus: "Na⁺ đạt cấu hình Neon (8e), Cl⁻ đạt cấu hình Argon (8e)",
    valenceElectrons: 8,
    lonePairsTotal: 4,
    bondingPairsTotal: 0,
    lonePairDetails: "Na nhường đứt 1e cho Cl. Cl⁻ bao quanh bởi 4 cặp electron tự do (8e hóa trị đầy đủ).",
    formalChargeNotes: "Liên kết ion: Cation Na⁺ và Anion Cl⁻ hút tĩnh điện cực mạnh.",
    atoms: [
      { id: "Na", symbol: "Na⁺", x: 160, y: 150, color: "#f59e0b", isBracket: true, formalCharge: "+1" },
      { id: "Cl", symbol: "Cl⁻", x: 340, y: 150, color: "#10b981", isBracket: true, formalCharge: "-1", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 180 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "Na", to: "Cl", type: "ionic" }
    ],
    octetTable: [
      { atom: "Natri Cation (Na⁺)", valence: 1, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình bền [Ne] 8e" },
      { atom: "Clorua Anion (Cl⁻)", valence: 7, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình bền [Ar] 8e" },
    ]
  },
  HCl: {
    lewisFormula: "H — C̈l::",
    hybridization: "Không xác định",
    vseprGeometry: "Thẳng hàng (Linear)",
    bondAngle: "180°",
    octetStatus: "Cl đạt bát tử 8e, H đạt đúp-lê 2e",
    valenceElectrons: 8,
    lonePairsTotal: 3,
    bondingPairsTotal: 1,
    lonePairDetails: "Clo sở hữu 3 cặp electron tự do và 1 cặp e dùng chung với H (lệch mạnh về phía Cl).",
    formalChargeNotes: "H(0), Cl(0). Phân tử phân cực mạnh.",
    atoms: [
      { id: "H", symbol: "H", x: 160, y: 150, color: "#38bdf8" },
      { id: "Cl", symbol: "Cl", x: 320, y: 150, color: "#10b981", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "H", to: "Cl", type: "single" }
    ],
    octetTable: [
      { atom: "Chlorine (Cl)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  NH3: {
    lewisFormula: "H — N̈ — H\n    |\n    H",
    hybridization: "sp³ (tại N)",
    vseprGeometry: "Chóp tam giác (Trigonal Pyramidal, AX₃E)",
    bondAngle: "107.3°",
    octetStatus: "Nitơ đạt bát tử 8e, Hydro đạt đúp-lê 2e",
    valenceElectrons: 8,
    lonePairsTotal: 1,
    bondingPairsTotal: 3,
    lonePairDetails: "Nguyên tử Nitơ ở đỉnh có 1 cặp electron tự do hoạt động như một bazơ Lewis sẵn sàng nhận proton H⁺.",
    formalChargeNotes: "N(0), H(0). Phân tử phân cực, tan vô hạn trong nước.",
    atoms: [
      { id: "N", symbol: "N", x: 250, y: 120, color: "#3b82f6", lonePairs: [{ angle: 90 }] },
      { id: "H1", symbol: "H", x: 155, y: 195, color: "#38bdf8" },
      { id: "H2", symbol: "H", x: 250, y: 230, color: "#38bdf8" },
      { id: "H3", symbol: "H", x: 345, y: 195, color: "#38bdf8" },
    ],
    bonds: [
      { from: "N", to: "H1", type: "single" },
      { from: "N", to: "H2", type: "single" },
      { from: "N", to: "H3", type: "single" },
    ],
    octetTable: [
      { atom: "Nitrogen (N)", valence: 5, bondingElectrons: 6, lonePairElectrons: 2, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "3 x Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  Cl2: {
    lewisFormula: "::C̈l — C̈l::",
    hybridization: "Không xác định",
    vseprGeometry: "Thẳng hàng (Linear)",
    bondAngle: "180°",
    octetStatus: "Cả 2 nguyên tử Clo đều đạt bát tử 8e",
    valenceElectrons: 14,
    lonePairsTotal: 6,
    bondingPairsTotal: 1,
    lonePairDetails: "Mỗi Clo giữ 3 cặp e tự do, đôi e liên kết chia đều ở giữa.",
    formalChargeNotes: "Cl(0), Cl(0). Phân tử không phân cực.",
    atoms: [
      { id: "Cl1", symbol: "Cl", x: 170, y: 150, color: "#10b981", lonePairs: [{ angle: 90 }, { angle: 180 }, { angle: 270 }] },
      { id: "Cl2", symbol: "Cl", x: 330, y: 150, color: "#10b981", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "Cl1", to: "Cl2", type: "single" }
    ],
    octetTable: [
      { atom: "Chlorine 1 (Cl)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Chlorine 2 (Cl)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  HNO3: {
    lewisFormula: "O = N⁺(—O⁻) — O — H",
    hybridization: "sp² (tại N)",
    vseprGeometry: "Tam giác phẳng tại N",
    bondAngle: "~120°",
    octetStatus: "Tất cả các nguyên tử đều đạt bát tử 8e",
    valenceElectrons: 24,
    lonePairsTotal: 7,
    bondingPairsTotal: 5,
    lonePairDetails: "Gồm 1 liên kết đôi N=O (2 lone pairs), 1 liên kết cho nhận N→O⁻ (3 lone pairs) và 1 liên kết đơn N-OH (2 lone pairs).",
    formalChargeNotes: "N(+1), O(đơn)(-1), O(đôi)(0), O(-OH)(0), H(0).",
    atoms: [
      { id: "N", symbol: "N", x: 230, y: 150, color: "#3b82f6", formalCharge: "+1" },
      { id: "O1", symbol: "O", x: 230, y: 55, color: "#ef4444", lonePairs: [{ angle: 0 }, { angle: 180 }] },
      { id: "O2", symbol: "O", x: 130, y: 220, color: "#ef4444", formalCharge: "-1", lonePairs: [{ angle: 90 }, { angle: 180 }, { angle: 270 }] },
      { id: "O3", symbol: "O", x: 330, y: 190, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "H", symbol: "H", x: 420, y: 210, color: "#38bdf8" },
    ],
    bonds: [
      { from: "N", to: "O1", type: "double" },
      { from: "N", to: "O2", type: "coordinate" },
      { from: "N", to: "O3", type: "single" },
      { from: "O3", to: "H", type: "single" },
    ],
    octetTable: [
      { atom: "Nitrogen (N)", valence: 5, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e (+1)" },
      { atom: "Oxygen carbonyl (O=)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e (0)" },
      { atom: "Oxygen cho nhận (O⁻)", valence: 6, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e (-1)" },
      { atom: "Oxygen hydroxyl (-O-)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e (0)" },
      { atom: "Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  NaOH: {
    lewisFormula: "[Na]⁺  [ :Ö̈ — H ]⁻",
    hybridization: "sp³ (tại O trong OH⁻)",
    vseprGeometry: "Thẳng hàng trong OH⁻",
    bondAngle: "180°",
    octetStatus: "Na⁺ đạt cấu hình Neon (8e), O đạt bát tử 8e",
    valenceElectrons: 8,
    lonePairsTotal: 3,
    bondingPairsTotal: 1,
    lonePairDetails: "Anion Hydroxit OH⁻ có 3 cặp electron tự do trên nguyên tử Oxi và 1 liên kết cộng hóa trị với H.",
    formalChargeNotes: "Na(+1), O(-1), H(0).",
    atoms: [
      { id: "Na", symbol: "Na⁺", x: 140, y: 150, color: "#f59e0b", isBracket: true, formalCharge: "+1" },
      { id: "O", symbol: "O", x: 290, y: 150, color: "#ef4444", formalCharge: "-1", isBracket: true, lonePairs: [{ angle: 90 }, { angle: 180 }, { angle: 270 }] },
      { id: "H", symbol: "H", x: 390, y: 150, color: "#38bdf8" },
    ],
    bonds: [
      { from: "Na", to: "O", type: "ionic" },
      { from: "O", to: "H", type: "single" },
    ],
    octetTable: [
      { atom: "Natri Cation (Na⁺)", valence: 1, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Đạt cấu hình [Ne] 8e" },
      { atom: "Oxygen trong OH⁻", valence: 6, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e (-1)" },
      { atom: "Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  SO2: {
    lewisFormula: "::Ö = S̈ — Ö̈::  ↔  ::Ö̈ — S̈ = Ö::",
    hybridization: "sp² (tại S)",
    vseprGeometry: "Gấp khúc (Bent, AX₂E)",
    bondAngle: "119.5°",
    octetStatus: "Lưu huỳnh đạt bát tử 8e hoặc mở rộng cộng hưởng",
    valenceElectrons: 18,
    lonePairsTotal: 5,
    bondingPairsTotal: 3,
    lonePairDetails: "Nguyên tử S ở đỉnh có 1 cặp e tự do đẩy 2 liên kết S-O gập góc ~119.5°.",
    formalChargeNotes: "Cấu trúc cộng hưởng giữa liên kết đôi và liên kết đơn cho nhận.",
    atoms: [
      { id: "S", symbol: "S", x: 250, y: 110, color: "#eab308", lonePairs: [{ angle: 90 }] },
      { id: "O1", symbol: "O", x: 140, y: 200, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "O2", symbol: "O", x: 360, y: 200, color: "#ef4444", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "S", to: "O1", type: "double" },
      { from: "S", to: "O2", type: "single" },
    ],
    octetTable: [
      { atom: "Sulfur (S)", valence: 6, bondingElectrons: 6, lonePairElectrons: 2, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen 1 (O=)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen 2 (O-)", valence: 6, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  CO: {
    lewisFormula: "⁻:C ≡ O:⁺",
    hybridization: "sp (tại C và O)",
    vseprGeometry: "Thẳng hàng (Linear)",
    bondAngle: "180°",
    octetStatus: "Cả C và O đều đạt bát tử 8e",
    valenceElectrons: 10,
    lonePairsTotal: 2,
    bondingPairsTotal: 3,
    lonePairDetails: "Liên kết 3 gồm 2 liên kết cộng hóa trị thường và 1 liên kết cho nhận từ cặp e của O sang C.",
    formalChargeNotes: "C(-1), O(+1). Khí độc liên kết mạnh với Fe²⁺ trong Hemoglobin.",
    atoms: [
      { id: "C", symbol: "C", x: 170, y: 150, color: "#64748b", formalCharge: "-1", lonePairs: [{ angle: 180 }] },
      { id: "O", symbol: "O", x: 330, y: 150, color: "#ef4444", formalCharge: "+1", lonePairs: [{ angle: 0 }] },
    ],
    bonds: [
      { from: "C", to: "O", type: "triple" }
    ],
    octetTable: [
      { atom: "Carbon (C)", valence: 4, bondingElectrons: 6, lonePairElectrons: 2, totalElectrons: 8, status: "✅ Đạt Octet 8e (-1)" },
      { atom: "Oxygen (O)", valence: 6, bondingElectrons: 6, lonePairElectrons: 2, totalElectrons: 8, status: "✅ Đạt Octet 8e (+1)" },
    ]
  },
  O2: {
    lewisFormula: "::Ö = Ö::",
    hybridization: "sp² (xấp xỉ)",
    vseprGeometry: "Thẳng hàng (Linear)",
    bondAngle: "180°",
    octetStatus: "Cả 2 nguyên tử Oxi đều đạt bát tử 8e",
    valenceElectrons: 12,
    lonePairsTotal: 4,
    bondingPairsTotal: 2,
    lonePairDetails: "Mỗi Oxi có 2 cặp e tự do (thuyết MO chỉ ra O₂ có 2 electron độc thân ở obitan π* nên có tính thuận từ).",
    formalChargeNotes: "O(0), O(0). Phân tử không phân cực.",
    atoms: [
      { id: "O1", symbol: "O", x: 170, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "O2", symbol: "O", x: 330, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "O1", to: "O2", type: "double" }
    ],
    octetTable: [
      { atom: "Oxygen 1 (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen 2 (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  C2H4: {
    lewisFormula: "H₂C = CH₂",
    hybridization: "sp² (tại cả 2 C)",
    vseprGeometry: "Tam giác phẳng quanh mỗi C",
    bondAngle: "~121.3° (H-C-H)",
    octetStatus: "Cả 2 nguyên tử Carbon đều đạt bát tử 8e",
    valenceElectrons: 12,
    lonePairsTotal: 0,
    bondingPairsTotal: 6,
    lonePairDetails: "Không có cặp e tự do. Liên kết C=C gồm 1 liên kết σ bền và 1 liên kết π linh động dễ tham gia phản ứng cộng.",
    formalChargeNotes: "C(0), H(0).",
    atoms: [
      { id: "C1", symbol: "C", x: 190, y: 150, color: "#64748b" },
      { id: "C2", symbol: "C", x: 310, y: 150, color: "#64748b" },
      { id: "H1", symbol: "H", x: 110, y: 80, color: "#38bdf8" },
      { id: "H2", symbol: "H", x: 110, y: 220, color: "#38bdf8" },
      { id: "H3", symbol: "H", x: 390, y: 80, color: "#38bdf8" },
      { id: "H4", symbol: "H", x: 390, y: 220, color: "#38bdf8" },
    ],
    bonds: [
      { from: "C1", to: "C2", type: "double" },
      { from: "C1", to: "H1", type: "single" },
      { from: "C1", to: "H2", type: "single" },
      { from: "C2", to: "H3", type: "single" },
      { from: "C2", to: "H4", type: "single" },
    ],
    octetTable: [
      { atom: "Carbon 1 (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Carbon 2 (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  C2H2: {
    lewisFormula: "H — C ≡ C — H",
    hybridization: "sp (tại cả 2 C)",
    vseprGeometry: "Thẳng hàng (Linear)",
    bondAngle: "180°",
    octetStatus: "Cả 2 nguyên tử Carbon đều đạt bát tử 8e",
    valenceElectrons: 10,
    lonePairsTotal: 0,
    bondingPairsTotal: 5,
    lonePairDetails: "Liên kết 3 C≡C gồm 1 liên kết σ và 2 liên kết π vuông góc nhau.",
    formalChargeNotes: "C(0), H(0).",
    atoms: [
      { id: "H1", symbol: "H", x: 80, y: 150, color: "#38bdf8" },
      { id: "C1", symbol: "C", x: 190, y: 150, color: "#64748b" },
      { id: "C2", symbol: "C", x: 310, y: 150, color: "#64748b" },
      { id: "H2", symbol: "H", x: 420, y: 150, color: "#38bdf8" },
    ],
    bonds: [
      { from: "H1", to: "C1", type: "single" },
      { from: "C1", to: "C2", type: "triple" },
      { from: "C2", to: "H2", type: "single" },
    ],
    octetTable: [
      { atom: "2 x Carbon (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "2 x Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  HCHO: {
    lewisFormula: "H₂C = Ö::",
    hybridization: "sp² (tại C)",
    vseprGeometry: "Tam giác phẳng (Trigonal Planar)",
    bondAngle: "~120°",
    octetStatus: "C và O đều đạt bát tử 8e",
    valenceElectrons: 12,
    lonePairsTotal: 2,
    bondingPairsTotal: 4,
    lonePairDetails: "Oxi nhóm aldehyde giữ 2 cặp electron tự do.",
    formalChargeNotes: "C(0), O(0), H(0). Liên kết C=O phân cực mạnh.",
    atoms: [
      { id: "C", symbol: "C", x: 220, y: 150, color: "#64748b" },
      { id: "H1", symbol: "H", x: 120, y: 80, color: "#38bdf8" },
      { id: "H2", symbol: "H", x: 120, y: 220, color: "#38bdf8" },
      { id: "O", symbol: "O", x: 350, y: 150, color: "#ef4444", lonePairs: [{ angle: 45 }, { angle: 315 }] },
    ],
    bonds: [
      { from: "C", to: "H1", type: "single" },
      { from: "C", to: "H2", type: "single" },
      { from: "C", to: "O", type: "double" },
    ],
    octetTable: [
      { atom: "Carbon (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  HCOOH: {
    lewisFormula: "H — C(=Ö::) — Ö̈ — H",
    hybridization: "sp² (tại C)",
    vseprGeometry: "Tam giác phẳng tại C",
    bondAngle: "~120°",
    octetStatus: "Tất cả C và O đều đạt bát tử 8e",
    valenceElectrons: 18,
    lonePairsTotal: 4,
    bondingPairsTotal: 5,
    lonePairDetails: "Có 4 cặp e tự do (2 cặp trên O=carbonyl, 2 cặp trên O-hydroxyl).",
    formalChargeNotes: "C(0), O(0), H(0).",
    atoms: [
      { id: "H1", symbol: "H", x: 70, y: 150, color: "#38bdf8" },
      { id: "C", symbol: "C", x: 170, y: 150, color: "#64748b" },
      { id: "O1", symbol: "O", x: 170, y: 55, color: "#ef4444", lonePairs: [{ angle: 0 }, { angle: 180 }] },
      { id: "O2", symbol: "O", x: 290, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "H2", symbol: "H", x: 390, y: 150, color: "#38bdf8" },
    ],
    bonds: [
      { from: "H1", to: "C", type: "single" },
      { from: "C", to: "O1", type: "double" },
      { from: "C", to: "O2", type: "single" },
      { from: "O2", to: "H2", type: "single" },
    ],
    octetTable: [
      { atom: "Carbon (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen Carbonyl (O=)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen Hydroxyl (O-)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  Br2: {
    lewisFormula: "::B̈r — B̈r::",
    hybridization: "Không xác định",
    vseprGeometry: "Thẳng hàng",
    bondAngle: "180°",
    octetStatus: "Cả 2 nguyên tử Brom đều đạt bát tử 8e",
    valenceElectrons: 14,
    lonePairsTotal: 6,
    bondingPairsTotal: 1,
    lonePairDetails: "Mỗi nguyên tử Brom có 3 cặp electron tự do (tổng 6 cặp e tự do).",
    formalChargeNotes: "Br(0), Br(0).",
    atoms: [
      { id: "Br1", symbol: "Br", x: 170, y: 150, color: "#b45309", lonePairs: [{ angle: 90 }, { angle: 180 }, { angle: 270 }] },
      { id: "Br2", symbol: "Br", x: 330, y: 150, color: "#b45309", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "Br1", to: "Br2", type: "single" }
    ],
    octetTable: [
      { atom: "Bromine 1 (Br)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Bromine 2 (Br)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  H2SO4: {
    lewisFormula: "HO — S(=O)₂ — OH",
    hybridization: "sp³ (tại S)",
    vseprGeometry: "Tứ diện quanh S",
    bondAngle: "~109.5°",
    octetStatus: "Lưu huỳnh mở rộng bát tử với 12e hóa trị (Hypervalent)",
    valenceElectrons: 32,
    lonePairsTotal: 8,
    bondingPairsTotal: 8,
    lonePairDetails: "Gồm 2 liên kết đôi S=O (mỗi O có 2 cặp e tự do) và 2 liên kết đơn S-OH (mỗi O có 2 cặp e tự do).",
    formalChargeNotes: "S(0), O(=O)(0), O(-OH)(0), H(0).",
    atoms: [
      { id: "S", symbol: "S", x: 250, y: 150, color: "#eab308" },
      { id: "O1", symbol: "O", x: 250, y: 55, color: "#ef4444", lonePairs: [{ angle: 0 }, { angle: 180 }] },
      { id: "O2", symbol: "O", x: 250, y: 245, color: "#ef4444", lonePairs: [{ angle: 0 }, { angle: 180 }] },
      { id: "O3", symbol: "O", x: 150, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "H1", symbol: "H", x: 70, y: 150, color: "#38bdf8" },
      { id: "O4", symbol: "O", x: 350, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "H2", symbol: "H", x: 430, y: 150, color: "#38bdf8" },
    ],
    bonds: [
      { from: "S", to: "O1", type: "double" },
      { from: "S", to: "O2", type: "double" },
      { from: "S", to: "O3", type: "single" },
      { from: "O3", to: "H1", type: "single" },
      { from: "S", to: "O4", type: "single" },
      { from: "O4", to: "H2", type: "single" },
    ],
    octetTable: [
      { atom: "Sulfur (S)", valence: 6, bondingElectrons: 12, lonePairElectrons: 0, totalElectrons: 12, status: "✨ Bát tử mở rộng 12e" },
      { atom: "4 x Oxygen (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "2 x Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  HF: {
    lewisFormula: "H — F̈::",
    hybridization: "Không xác định",
    vseprGeometry: "Thẳng hàng",
    bondAngle: "180°",
    octetStatus: "F đạt bát tử 8e, H đạt đúp-lê 2e",
    valenceElectrons: 8,
    lonePairsTotal: 3,
    bondingPairsTotal: 1,
    lonePairDetails: "Flo giữ 3 cặp e tự do và hút rất mạnh cặp e liên kết.",
    formalChargeNotes: "H(0), F(0). Tạo liên kết hiđro liên phân tử rất bền.",
    atoms: [
      { id: "H", symbol: "H", x: 160, y: 150, color: "#38bdf8" },
      { id: "F", symbol: "F", x: 320, y: 150, color: "#86efac", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "H", to: "F", type: "single" }
    ],
    octetTable: [
      { atom: "Fluorine (F)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  C2H5OH: {
    lewisFormula: "CH₃ — CH₂ — Ö̈ — H",
    hybridization: "sp³ (tại cả 2 C và O)",
    vseprGeometry: "Gấp khúc tại O (104.5°), tứ diện tại C",
    bondAngle: "~108.5° (C-O-H)",
    octetStatus: "Tất cả C và O đều đạt bát tử 8e",
    valenceElectrons: 20,
    lonePairsTotal: 2,
    bondingPairsTotal: 8,
    lonePairDetails: "Nguyên tử Oxi trong nhóm -OH sở hữu 2 cặp electron tự do.",
    formalChargeNotes: "C(0), O(0), H(0).",
    atoms: [
      { id: "C1", symbol: "C", x: 110, y: 150, color: "#64748b" },
      { id: "C2", symbol: "C", x: 220, y: 150, color: "#64748b" },
      { id: "O", symbol: "O", x: 330, y: 150, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "H", symbol: "H", x: 420, y: 150, color: "#38bdf8" },
    ],
    bonds: [
      { from: "C1", to: "C2", type: "single" },
      { from: "C2", to: "O", type: "single" },
      { from: "O", to: "H", type: "single" },
    ],
    octetTable: [
      { atom: "2 x Carbon (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  CH3COCH3: {
    lewisFormula: "CH₃ — C(=Ö::) — CH₃",
    hybridization: "sp² (tại C carbonyl), sp³ (tại 2 C methyl)",
    vseprGeometry: "Tam giác phẳng tại C=O",
    bondAngle: "~120°",
    octetStatus: "Tất cả C và O đều đạt bát tử 8e",
    valenceElectrons: 24,
    lonePairsTotal: 2,
    bondingPairsTotal: 10,
    lonePairDetails: "Nguyên tử Oxi nhóm carbonyl sở hữu 2 cặp electron tự do.",
    formalChargeNotes: "C(0), O(0), H(0).",
    atoms: [
      { id: "C1", symbol: "C", x: 120, y: 150, color: "#64748b" },
      { id: "C2", symbol: "C", x: 250, y: 150, color: "#64748b" },
      { id: "O", symbol: "O", x: 250, y: 55, color: "#ef4444", lonePairs: [{ angle: 0 }, { angle: 180 }] },
      { id: "C3", symbol: "C", x: 380, y: 150, color: "#64748b" },
    ],
    bonds: [
      { from: "C1", to: "C2", type: "single" },
      { from: "C2", to: "O", type: "double" },
      { from: "C2", to: "C3", type: "single" },
    ],
    octetTable: [
      { atom: "3 x Carbon (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen (O)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  C6H6: {
    lewisFormula: "Vòng 6 cạnh thơm C₆H₆ (Kekulé resonance)",
    hybridization: "sp² (tại cả 6 C)",
    vseprGeometry: "Lục giác phẳng đều",
    bondAngle: "120°",
    octetStatus: "Cả 6 nguyên tử Carbon đều đạt bát tử 8e",
    valenceElectrons: 30,
    lonePairsTotal: 0,
    bondingPairsTotal: 15,
    lonePairDetails: "Hệ 6 electron π giải tỏa đồng đều thành vòng thơm khép kín, bền vững vượt trội.",
    formalChargeNotes: "C(0), H(0).",
    atoms: [
      { id: "C1", symbol: "C", x: 250, y: 70, color: "#64748b" },
      { id: "C2", symbol: "C", x: 330, y: 115, color: "#64748b" },
      { id: "C3", symbol: "C", x: 330, y: 195, color: "#64748b" },
      { id: "C4", symbol: "C", x: 250, y: 240, color: "#64748b" },
      { id: "C5", symbol: "C", x: 170, y: 195, color: "#64748b" },
      { id: "C6", symbol: "C", x: 170, y: 115, color: "#64748b" },
    ],
    bonds: [
      { from: "C1", to: "C2", type: "double" },
      { from: "C2", to: "C3", type: "single" },
      { from: "C3", to: "C4", type: "double" },
      { from: "C4", to: "C5", type: "single" },
      { from: "C5", to: "C6", type: "double" },
      { from: "C6", to: "C1", type: "single" },
    ],
    octetTable: [
      { atom: "6 x Carbon trong vòng (C)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  KOH: {
    lewisFormula: "[K]⁺  [ :Ö̈ — H ]⁻",
    hybridization: "sp³ (tại O trong OH⁻)",
    vseprGeometry: "Thẳng hàng trong OH⁻",
    bondAngle: "180°",
    octetStatus: "K⁺ đạt cấu hình Argon (8e), O đạt bát tử 8e",
    valenceElectrons: 8,
    lonePairsTotal: 3,
    bondingPairsTotal: 1,
    lonePairDetails: "Anion OH⁻ có 3 cặp electron tự do trên Oxi.",
    formalChargeNotes: "K(+1), O(-1), H(0).",
    atoms: [
      { id: "K", symbol: "K⁺", x: 140, y: 150, color: "#a855f7", isBracket: true, formalCharge: "+1" },
      { id: "O", symbol: "O", x: 290, y: 150, color: "#ef4444", formalCharge: "-1", isBracket: true, lonePairs: [{ angle: 90 }, { angle: 180 }, { angle: 270 }] },
      { id: "H", symbol: "H", x: 390, y: 150, color: "#38bdf8" },
    ],
    bonds: [
      { from: "K", to: "O", type: "ionic" },
      { from: "O", to: "H", type: "single" },
    ],
    octetTable: [
      { atom: "Kali Cation (K⁺)", valence: 1, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Đạt cấu hình [Ar] 8e" },
      { atom: "Oxygen (O)", valence: 6, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  H2S: {
    lewisFormula: "H — S̈ — H",
    hybridization: "sp³ (không thuần thục)",
    vseprGeometry: "Gấp khúc (Bent, AX₂E₂)",
    bondAngle: "92.1°",
    octetStatus: "Lưu huỳnh đạt bát tử 8e",
    valenceElectrons: 8,
    lonePairsTotal: 2,
    bondingPairsTotal: 2,
    lonePairDetails: "S có 2 cặp e tự do ở đỉnh. Do S có bán kính lớn hơn O nên góc liên kết hẹp hơn H₂O.",
    formalChargeNotes: "S(0), H(0).",
    atoms: [
      { id: "S", symbol: "S", x: 250, y: 135, color: "#eab308", lonePairs: [{ angle: 90 }, { angle: 140 }] },
      { id: "H1", symbol: "H", x: 160, y: 210, color: "#38bdf8" },
      { id: "H2", symbol: "H", x: 340, y: 210, color: "#38bdf8" },
    ],
    bonds: [
      { from: "S", to: "H1", type: "single" },
      { from: "S", to: "H2", type: "single" },
    ],
    octetTable: [
      { atom: "Sulfur (S)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "2 x Hydrogen (H)", valence: 1, bondingElectrons: 2, lonePairElectrons: 0, totalElectrons: 2, status: "✅ Đạt Duet 2e" },
    ]
  },
  NO2: {
    lewisFormula: "::Ö = Ṅ — Ö̈::⁻",
    hybridization: "sp² (tại N)",
    vseprGeometry: "Gấp khúc (Bent, AX₂E)",
    bondAngle: "134.3°",
    octetStatus: "Nitơ có 7e hóa trị (gốc tự do, thiếu 1e)",
    valenceElectrons: 17,
    lonePairsTotal: 5,
    bondingPairsTotal: 3,
    lonePairDetails: "Chứa 1 electron độc thân trên Nitơ, khiến NO₂ có màu nâu đỏ và dễ trùng hợp thành N₂O₄ không màu.",
    formalChargeNotes: "N(+1), O(đơn)(-1), O(đôi)(0).",
    atoms: [
      { id: "N", symbol: "N", x: 250, y: 120, color: "#3b82f6", formalCharge: "+1", lonePairs: [{ angle: 90, count: 1 }] },
      { id: "O1", symbol: "O", x: 140, y: 200, color: "#ef4444", lonePairs: [{ angle: 90 }, { angle: 270 }] },
      { id: "O2", symbol: "O", x: 360, y: 200, color: "#ef4444", formalCharge: "-1", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "N", to: "O1", type: "double" },
      { from: "N", to: "O2", type: "single" },
    ],
    octetTable: [
      { atom: "Nitrogen (N)", valence: 5, bondingElectrons: 6, lonePairElectrons: 1, totalElectrons: 7, status: "⚠️ Gốc tự do 7e (thiếu 1e)" },
      { atom: "Oxygen 1 (O=)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
      { atom: "Oxygen 2 (O-)", valence: 6, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  F2: {
    lewisFormula: "::F̈ — F̈::",
    hybridization: "Không xác định",
    vseprGeometry: "Thẳng hàng (Linear)",
    bondAngle: "180°",
    octetStatus: "Cả 2 nguyên tử Flo đều đạt bát tử 8e",
    valenceElectrons: 14,
    lonePairsTotal: 6,
    bondingPairsTotal: 1,
    lonePairDetails: "Mỗi Flo giữ 3 cặp e tự do.",
    formalChargeNotes: "F(0), F(0).",
    atoms: [
      { id: "F1", symbol: "F", x: 170, y: 150, color: "#86efac", lonePairs: [{ angle: 90 }, { angle: 180 }, { angle: 270 }] },
      { id: "F2", symbol: "F", x: 330, y: 150, color: "#86efac", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "F1", to: "F2", type: "single" }
    ],
    octetTable: [
      { atom: "2 x Fluorine (F)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  I2: {
    lewisFormula: "::Ï — Ï::",
    hybridization: "Không xác định",
    vseprGeometry: "Thẳng hàng (Linear)",
    bondAngle: "180°",
    octetStatus: "Cả 2 nguyên tử Iot đều đạt bát tử 8e",
    valenceElectrons: 14,
    lonePairsTotal: 6,
    bondingPairsTotal: 1,
    lonePairDetails: "Mỗi Iot giữ 3 cặp electron tự do.",
    formalChargeNotes: "I(0), I(0).",
    atoms: [
      { id: "I1", symbol: "I", x: 170, y: 150, color: "#7e22ce", lonePairs: [{ angle: 90 }, { angle: 180 }, { angle: 270 }] },
      { id: "I2", symbol: "I", x: 330, y: 150, color: "#7e22ce", lonePairs: [{ angle: 0 }, { angle: 90 }, { angle: 270 }] },
    ],
    bonds: [
      { from: "I1", to: "I2", type: "single" }
    ],
    octetTable: [
      { atom: "2 x Iodine (I)", valence: 7, bondingElectrons: 2, lonePairElectrons: 6, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  P4: {
    lewisFormula: "Tứ diện đều P₄ với 4 liên kết P-P tam giác",
    hybridization: "sp³ (tại cả 4 P)",
    vseprGeometry: "Tứ diện đều (Tetrahedral)",
    bondAngle: "60° (sức căng góc lớn)",
    octetStatus: "Cả 4 nguyên tử Photpho đều đạt bát tử 8e",
    valenceElectrons: 20,
    lonePairsTotal: 4,
    bondingPairsTotal: 6,
    lonePairDetails: "Mỗi nguyên tử P ở 4 đỉnh tứ diện sở hữu 1 cặp electron tự do hướng ra ngoài.",
    formalChargeNotes: "P(0). Góc liên kết 60° làm photpho trắng rất kém bền, dễ tự cháy ở 40°C.",
    atoms: [
      { id: "P1", symbol: "P", x: 250, y: 70, color: "#f97316", lonePairs: [{ angle: 90 }] },
      { id: "P2", symbol: "P", x: 150, y: 220, color: "#ea580c", lonePairs: [{ angle: 210 }] },
      { id: "P3", symbol: "P", x: 350, y: 220, color: "#ea580c", lonePairs: [{ angle: 330 }] },
      { id: "P4", symbol: "P", x: 250, y: 175, color: "#ea580c", lonePairs: [{ angle: 270 }] },
    ],
    bonds: [
      { from: "P1", to: "P2", type: "single" },
      { from: "P1", to: "P3", type: "single" },
      { from: "P1", to: "P4", type: "single" },
      { from: "P2", to: "P3", type: "single" },
      { from: "P2", to: "P4", type: "single" },
      { from: "P3", to: "P4", type: "single" },
    ],
    octetTable: [
      { atom: "4 x Phosphorus (P)", valence: 5, bondingElectrons: 6, lonePairElectrons: 2, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  S8: {
    lewisFormula: "Vòng vương miện S₈ khép kín 8 liên kết S-S",
    hybridization: "sp³ (tại cả 8 S)",
    vseprGeometry: "Vòng vương miện gợn sóng (Crown)",
    bondAngle: "108°",
    octetStatus: "Cả 8 nguyên tử Lưu huỳnh đều đạt bát tử 8e",
    valenceElectrons: 48,
    lonePairsTotal: 16,
    bondingPairsTotal: 8,
    lonePairDetails: "Mỗi nguyên tử S giữ 2 cặp e tự do và tạo 2 liên kết đơn với 2 nguyên tử S lân cận.",
    formalChargeNotes: "S(0).",
    atoms: [
      { id: "S1", symbol: "S", x: 160, y: 80, color: "#eab308", lonePairs: [{ angle: 90 }, { angle: 180 }] },
      { id: "S2", symbol: "S", x: 250, y: 65, color: "#eab308", lonePairs: [{ angle: 90 }] },
      { id: "S3", symbol: "S", x: 340, y: 80, color: "#eab308", lonePairs: [{ angle: 90 }, { angle: 0 }] },
      { id: "S4", symbol: "S", x: 390, y: 170, color: "#eab308", lonePairs: [{ angle: 0 }, { angle: 270 }] },
      { id: "S5", symbol: "S", x: 340, y: 240, color: "#eab308", lonePairs: [{ angle: 270 }, { angle: 0 }] },
      { id: "S6", symbol: "S", x: 250, y: 220, color: "#eab308", lonePairs: [{ angle: 270 }] },
      { id: "S7", symbol: "S", x: 160, y: 240, color: "#eab308", lonePairs: [{ angle: 270 }, { angle: 180 }] },
      { id: "S8", symbol: "S", x: 110, y: 170, color: "#eab308", lonePairs: [{ angle: 180 }, { angle: 90 }] },
    ],
    bonds: [
      { from: "S1", to: "S2", type: "single" },
      { from: "S2", to: "S3", type: "single" },
      { from: "S3", to: "S4", type: "single" },
      { from: "S4", to: "S5", type: "single" },
      { from: "S5", to: "S6", type: "single" },
      { from: "S6", to: "S7", type: "single" },
      { from: "S7", to: "S8", type: "single" },
      { from: "S8", to: "S1", type: "single" },
    ],
    octetTable: [
      { atom: "8 x Sulfur trong vòng (S)", valence: 6, bondingElectrons: 4, lonePairElectrons: 4, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  Si: {
    lewisFormula: "Mạng tinh thể cộng hóa trị kim cương Si",
    hybridization: "sp³ (Mạng không gian 3 chiều)",
    vseprGeometry: "Tứ diện đều liên tục",
    bondAngle: "109.5°",
    octetStatus: "Mỗi nguyên tử Si dùng chung 4e tạo 4 liên kết đạt bát tử 8e",
    valenceElectrons: 16,
    lonePairsTotal: 0,
    bondingPairsTotal: 4,
    lonePairDetails: "Không có electron tự do. Toàn bộ electron tham gia tạo mạng liên kết cộng hóa trị tứ diện khổng lồ.",
    formalChargeNotes: "Si(0). Chất bán dẫn tinh khiết.",
    atoms: [
      { id: "Si0", symbol: "Si", x: 250, y: 150, color: "#64748b" },
      { id: "Si1", symbol: "Si", x: 250, y: 60, color: "#475569" },
      { id: "Si2", symbol: "Si", x: 350, y: 150, color: "#475569" },
      { id: "Si3", symbol: "Si", x: 250, y: 240, color: "#475569" },
      { id: "Si4", symbol: "Si", x: 150, y: 150, color: "#475569" },
    ],
    bonds: [
      { from: "Si0", to: "Si1", type: "single" },
      { from: "Si0", to: "Si2", type: "single" },
      { from: "Si0", to: "Si3", type: "single" },
      { from: "Si0", to: "Si4", type: "single" },
    ],
    octetTable: [
      { atom: "Silicon trung tâm (Si)", valence: 4, bondingElectrons: 8, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Đạt Octet 8e" },
    ]
  },
  Li: {
    lewisFormula: "Mạng tinh thể kim loại Liti (BCC) + Biển electron tự do",
    hybridization: "Liên kết kim loại (Electron tự do phi định cư)",
    vseprGeometry: "Lập phương tâm khối (BCC)",
    bondAngle: "109.5° / 70.5°",
    octetStatus: "Cation Li⁺ đạt cấu hình He (2e), electron tự do di chuyển tự do",
    valenceElectrons: 8,
    lonePairsTotal: 0,
    bondingPairsTotal: 8,
    lonePairDetails: "Cation Li⁺ nằm ở tâm và 8 đỉnh mạng tinh thể, ngập trong biển electron 2s¹ chuyển động tự do mang lại tính dẫn điện tốt.",
    formalChargeNotes: "Mô hình biển electron kim loại [Li⁺ + e⁻].",
    atoms: [
      { id: "Li0", symbol: "Li⁺", x: 250, y: 150, color: "#ef4444", formalCharge: "+1" },
      { id: "Li1", symbol: "Li⁺", x: 160, y: 70, color: "#f87171" },
      { id: "Li2", symbol: "Li⁺", x: 340, y: 70, color: "#f87171" },
      { id: "Li3", symbol: "Li⁺", x: 340, y: 230, color: "#f87171" },
      { id: "Li4", symbol: "Li⁺", x: 160, y: 230, color: "#f87171" },
    ],
    bonds: [
      { from: "Li0", to: "Li1", type: "single" },
      { from: "Li0", to: "Li2", type: "single" },
      { from: "Li0", to: "Li3", type: "single" },
      { from: "Li0", to: "Li4", type: "single" },
    ],
    octetTable: [
      { atom: "Cation Liti (Li⁺)", valence: 1, bondingElectrons: 0, lonePairElectrons: 2, totalElectrons: 2, status: "✅ Cấu hình [He] 2e" },
    ]
  },
  Na: {
    lewisFormula: "Mạng tinh thể kim loại Natri (BCC) + Biển electron tự do",
    hybridization: "Liên kết kim loại",
    vseprGeometry: "Lập phương tâm khối (BCC)",
    bondAngle: "109.5°",
    octetStatus: "Cation Na⁺ đạt cấu hình Neon (8e)",
    valenceElectrons: 8,
    lonePairsTotal: 0,
    bondingPairsTotal: 8,
    lonePairDetails: "Cation Na⁺ bao quanh bởi biển electron tự do 3s¹, giúp kim loại dẻo và dẫn điện tốt.",
    formalChargeNotes: "[Na⁺ + e⁻]. Kim loại kiềm hoạt động mạnh.",
    atoms: [
      { id: "Na0", symbol: "Na⁺", x: 250, y: 150, color: "#eab308", formalCharge: "+1" },
      { id: "Na1", symbol: "Na⁺", x: 160, y: 70, color: "#facc15" },
      { id: "Na2", symbol: "Na⁺", x: 340, y: 70, color: "#facc15" },
      { id: "Na3", symbol: "Na⁺", x: 340, y: 230, color: "#facc15" },
      { id: "Na4", symbol: "Na⁺", x: 160, y: 230, color: "#facc15" },
    ],
    bonds: [
      { from: "Na0", to: "Na1", type: "single" },
      { from: "Na0", to: "Na2", type: "single" },
      { from: "Na0", to: "Na3", type: "single" },
      { from: "Na0", to: "Na4", type: "single" },
    ],
    octetTable: [
      { atom: "Cation Natri (Na⁺)", valence: 1, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình [Ne] 8e" },
    ]
  },
  K: {
    lewisFormula: "Mạng tinh thể kim loại Kali (BCC)",
    hybridization: "Liên kết kim loại",
    vseprGeometry: "Lập phương tâm khối (BCC)",
    bondAngle: "109.5°",
    octetStatus: "Cation K⁺ đạt cấu hình Argon (8e)",
    valenceElectrons: 8,
    lonePairsTotal: 0,
    bondingPairsTotal: 8,
    lonePairDetails: "Bán kính lớn, lực hút e tự do yếu làm K rất mềm và phản ứng nổ với nước.",
    formalChargeNotes: "[K⁺ + e⁻].",
    atoms: [
      { id: "K0", symbol: "K⁺", x: 250, y: 150, color: "#a855f7", formalCharge: "+1" },
      { id: "K1", symbol: "K⁺", x: 160, y: 70, color: "#c084fc" },
      { id: "K2", symbol: "K⁺", x: 340, y: 70, color: "#c084fc" },
      { id: "K3", symbol: "K⁺", x: 340, y: 230, color: "#c084fc" },
      { id: "K4", symbol: "K⁺", x: 160, y: 230, color: "#c084fc" },
    ],
    bonds: [
      { from: "K0", to: "K1", type: "single" },
      { from: "K0", to: "K2", type: "single" },
      { from: "K0", to: "K3", type: "single" },
      { from: "K0", to: "K4", type: "single" },
    ],
    octetTable: [
      { atom: "Cation Kali (K⁺)", valence: 1, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình [Ar] 8e" },
    ]
  },
  Be: {
    lewisFormula: "Mạng tinh thể Lục phương chặt khít Be (HCP)",
    hybridization: "Liên kết kim loại",
    vseprGeometry: "Lục phương chặt khít (HCP)",
    bondAngle: "120° / 90°",
    octetStatus: "Mạng kim loại Be²⁺ với 2 electron hóa trị tự do",
    valenceElectrons: 8,
    lonePairsTotal: 0,
    bondingPairsTotal: 6,
    lonePairDetails: "Liên kết kim loại bền vững, độ cứng cao và màng oxit BeO bảo vệ.",
    formalChargeNotes: "[Be²⁺ + 2e⁻].",
    atoms: [
      { id: "Be0", symbol: "Be", x: 250, y: 150, color: "#0284c7" },
      { id: "Be1", symbol: "Be", x: 160, y: 150, color: "#38bdf8" },
      { id: "Be2", symbol: "Be", x: 340, y: 150, color: "#38bdf8" },
      { id: "Be3", symbol: "Be", x: 205, y: 75, color: "#38bdf8" },
      { id: "Be4", symbol: "Be", x: 295, y: 75, color: "#38bdf8" },
      { id: "Be5", symbol: "Be", x: 205, y: 225, color: "#38bdf8" },
      { id: "Be6", symbol: "Be", x: 295, y: 225, color: "#38bdf8" },
    ],
    bonds: [
      { from: "Be0", to: "Be1", type: "single" },
      { from: "Be0", to: "Be2", type: "single" },
      { from: "Be0", to: "Be3", type: "single" },
      { from: "Be0", to: "Be4", type: "single" },
      { from: "Be0", to: "Be5", type: "single" },
      { from: "Be0", to: "Be6", type: "single" },
    ],
    octetTable: [
      { atom: "Beryllium (Be)", valence: 2, bondingElectrons: 0, lonePairElectrons: 2, totalElectrons: 2, status: "✅ Cấu hình bền [He]" },
    ]
  },
  Mg: {
    lewisFormula: "Mạng tinh thể Magie (HCP) + Biển 2e⁻",
    hybridization: "Liên kết kim loại",
    vseprGeometry: "Lục phương chặt khít (HCP)",
    bondAngle: "120° / 90°",
    octetStatus: "Cation Mg²⁺ đạt cấu hình bền Neon (8e)",
    valenceElectrons: 12,
    lonePairsTotal: 0,
    bondingPairsTotal: 6,
    lonePairDetails: "Cation Mg²⁺ giải tỏa 2 electron vào biển e tự do.",
    formalChargeNotes: "[Mg²⁺ + 2e⁻].",
    atoms: [
      { id: "Mg0", symbol: "Mg²⁺", x: 250, y: 150, color: "#059669" },
      { id: "Mg1", symbol: "Mg", x: 160, y: 150, color: "#34d399" },
      { id: "Mg2", symbol: "Mg", x: 340, y: 150, color: "#34d399" },
      { id: "Mg3", symbol: "Mg", x: 205, y: 75, color: "#34d399" },
      { id: "Mg4", symbol: "Mg", x: 295, y: 75, color: "#34d399" },
    ],
    bonds: [
      { from: "Mg0", to: "Mg1", type: "single" },
      { from: "Mg0", to: "Mg2", type: "single" },
      { from: "Mg0", to: "Mg3", type: "single" },
      { from: "Mg0", to: "Mg4", type: "single" },
    ],
    octetTable: [
      { atom: "Cation Magie (Mg²⁺)", valence: 2, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình [Ne] 8e" },
    ]
  },
  Ca: {
    lewisFormula: "Mạng tinh thể Canxi (FCC) + Biển 2e⁻",
    hybridization: "Liên kết kim loại",
    vseprGeometry: "Lập phương tâm diện (FCC)",
    bondAngle: "90° / 60°",
    octetStatus: "Cation Ca²⁺ đạt cấu hình bền Argon (8e)",
    valenceElectrons: 12,
    lonePairsTotal: 0,
    bondingPairsTotal: 6,
    lonePairDetails: "Mạng lập phương tâm diện với mật độ xếp chặt 74%.",
    formalChargeNotes: "[Ca²⁺ + 2e⁻].",
    atoms: [
      { id: "Ca0", symbol: "Ca²⁺", x: 250, y: 150, color: "#ea580c" },
      { id: "Ca1", symbol: "Ca", x: 170, y: 70, color: "#fb923c" },
      { id: "Ca2", symbol: "Ca", x: 330, y: 70, color: "#fb923c" },
      { id: "Ca3", symbol: "Ca", x: 330, y: 230, color: "#fb923c" },
      { id: "Ca4", symbol: "Ca", x: 170, y: 230, color: "#fb923c" },
    ],
    bonds: [
      { from: "Ca0", to: "Ca1", type: "single" },
      { from: "Ca0", to: "Ca2", type: "single" },
      { from: "Ca0", to: "Ca3", type: "single" },
      { from: "Ca0", to: "Ca4", type: "single" },
    ],
    octetTable: [
      { atom: "Cation Canxi (Ca²⁺)", valence: 2, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình [Ar] 8e" },
    ]
  },
  Ba: {
    lewisFormula: "Mạng tinh thể Bari (BCC) + Biển 2e⁻",
    hybridization: "Liên kết kim loại",
    vseprGeometry: "Lập phương tâm khối (BCC)",
    bondAngle: "109.5°",
    octetStatus: "Cation Ba²⁺ đạt cấu hình bền Xenon (8e)",
    valenceElectrons: 8,
    lonePairsTotal: 0,
    bondingPairsTotal: 4,
    lonePairDetails: "Bán kính lớn, dễ nhường 2e tạo ion Ba²⁺.",
    formalChargeNotes: "[Ba²⁺ + 2e⁻].",
    atoms: [
      { id: "Ba0", symbol: "Ba²⁺", x: 250, y: 150, color: "#84cc16" },
      { id: "Ba1", symbol: "Ba", x: 160, y: 70, color: "#a3e635" },
      { id: "Ba2", symbol: "Ba", x: 340, y: 70, color: "#a3e635" },
      { id: "Ba3", symbol: "Ba", x: 340, y: 230, color: "#a3e635" },
      { id: "Ba4", symbol: "Ba", x: 160, y: 230, color: "#a3e635" },
    ],
    bonds: [
      { from: "Ba0", to: "Ba1", type: "single" },
      { from: "Ba0", to: "Ba2", type: "single" },
      { from: "Ba0", to: "Ba3", type: "single" },
      { from: "Ba0", to: "Ba4", type: "single" },
    ],
    octetTable: [
      { atom: "Cation Bari (Ba²⁺)", valence: 2, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình [Xe] 8e" },
    ]
  },
  Al: {
    lewisFormula: "Mạng tinh thể Nhôm (FCC) + Biển 3e⁻",
    hybridization: "Liên kết kim loại",
    vseprGeometry: "Lập phương tâm diện (FCC)",
    bondAngle: "90° / 60°",
    octetStatus: "Cation Al³⁺ đạt cấu hình bền Neon (8e)",
    valenceElectrons: 12,
    lonePairsTotal: 0,
    bondingPairsTotal: 6,
    lonePairDetails: "Mỗi Al nhường 3e vào biển electron tạo độ dẫn điện dẫn nhiệt vượt trội.",
    formalChargeNotes: "[Al³⁺ + 3e⁻].",
    atoms: [
      { id: "Al0", symbol: "Al³⁺", x: 250, y: 150, color: "#94a3b8" },
      { id: "Al1", symbol: "Al", x: 170, y: 70, color: "#cbd5e1" },
      { id: "Al2", symbol: "Al", x: 330, y: 70, color: "#cbd5e1" },
      { id: "Al3", symbol: "Al", x: 330, y: 230, color: "#cbd5e1" },
      { id: "Al4", symbol: "Al", x: 170, y: 230, color: "#cbd5e1" },
    ],
    bonds: [
      { from: "Al0", to: "Al1", type: "single" },
      { from: "Al0", to: "Al2", type: "single" },
      { from: "Al0", to: "Al3", type: "single" },
      { from: "Al0", to: "Al4", type: "single" },
    ],
    octetTable: [
      { atom: "Cation Nhôm (Al³⁺)", valence: 3, bondingElectrons: 0, lonePairElectrons: 8, totalElectrons: 8, status: "✅ Cấu hình [Ne] 8e" },
    ]
  }
};

/**
 * High-Precision SVG Lewis Diagram Component
 */
function LewisSvgCanvas({ data }: { data: LewisData }) {
  const atomRadius = 22;

  const atomMap = new Map<string, LewisAtomNode>();
  data.atoms.forEach((a) => atomMap.set(a.id, a));

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <svg
        viewBox="0 0 500 300"
        style={{
          width: '100%',
          maxWidth: 560,
          maxHeight: 320,
          filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.15))',
        }}
      >
        <defs>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#38bdf8" />
          </marker>
        </defs>

        {/* 1. BONDS RENDERING */}
        {data.bonds.map((bond, idx) => {
          const a1 = atomMap.get(bond.from);
          const a2 = atomMap.get(bond.to);
          if (!a1 || !a2) return null;

          const dx = a2.x - a1.x;
          const dy = a2.y - a1.y;
          const dist = Math.hypot(dx, dy) || 1;
          const ux = dx / dist;
          const uy = dy / dist;
          const px = -uy; // Perpendicular vector for double/triple offsets
          const py = ux;

          const startX = a1.x + ux * (atomRadius + 2);
          const startY = a1.y + uy * (atomRadius + 2);
          const endX = a2.x - ux * (atomRadius + 2);
          const endY = a2.y - uy * (atomRadius + 2);

          if (bond.type === 'single') {
            return (
              <line
                key={idx}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#38bdf8"
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          }

          if (bond.type === 'double') {
            const offset = 4.5;
            return (
              <g key={idx}>
                <line
                  x1={startX + px * offset}
                  y1={startY + py * offset}
                  x2={endX + px * offset}
                  y2={endY + py * offset}
                  stroke="#38bdf8"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1={startX - px * offset}
                  y1={startY - py * offset}
                  x2={endX - px * offset}
                  y2={endY - py * offset}
                  stroke="#38bdf8"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            );
          }

          if (bond.type === 'triple') {
            const offset = 6.5;
            return (
              <g key={idx}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#38bdf8"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1={startX + px * offset}
                  y1={startY + py * offset}
                  x2={endX + px * offset}
                  y2={endY + py * offset}
                  stroke="#38bdf8"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <line
                  x1={startX - px * offset}
                  y1={startY - py * offset}
                  x2={endX - px * offset}
                  y2={endY - py * offset}
                  stroke="#38bdf8"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </g>
            );
          }

          if (bond.type === 'coordinate') {
            return (
              <line
                key={idx}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#38bdf8"
                strokeWidth={3}
                strokeLinecap="round"
                markerEnd="url(#arrowhead)"
              />
            );
          }

          if (bond.type === 'ionic') {
            return (
              <line
                key={idx}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            );
          }

          return null;
        })}

        {/* 2. ATOMS & LONE PAIRS RENDERING */}
        {data.atoms.map((atom) => {
          return (
            <g key={atom.id}>
              {/* Bracket for Ions */}
              {atom.isBracket && (
                <text
                  x={atom.x}
                  y={atom.y + 10}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.4)"
                  fontSize="48"
                  fontFamily="monospace"
                  style={{ userSelect: 'none' }}
                >
                  [ &nbsp;&nbsp;&nbsp; ]
                </text>
              )}

              {/* Atom Circle Background */}
              <circle
                cx={atom.x}
                cy={atom.y}
                r={atomRadius}
                fill="#0f172a"
                stroke={atom.color || "#38bdf8"}
                strokeWidth={2.5}
                filter="url(#glow-cyan)"
              />

              {/* Atom Symbol Text */}
              <text
                x={atom.x}
                y={atom.y + 6}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={atom.symbol.length > 2 ? 13 : 16}
                fontWeight="900"
                fontFamily="Outfit, Inter, sans-serif"
                style={{ userSelect: 'none' }}
              >
                {atom.symbol}
              </text>

              {/* Formal Charge Badge */}
              {atom.formalCharge && (
                <g>
                  <circle
                    cx={atom.x + 18}
                    cy={atom.y - 18}
                    r={9}
                    fill="#f59e0b"
                    stroke="#000"
                    strokeWidth={1.5}
                  />
                  <text
                    x={atom.x + 18}
                    y={atom.y - 14.5}
                    textAnchor="middle"
                    fill="#000"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {atom.formalCharge}
                  </text>
                </g>
              )}

              {/* Glowing Lone Pair Electron Dots (••) */}
              {atom.lonePairs?.map((lp, lpIdx) => {
                const rad = (lp.angle * Math.PI) / 180;
                const dist = atomRadius + 8.5;
                const cx = atom.x + Math.cos(rad) * dist;
                const cy = atom.y - Math.sin(rad) * dist;
                const spread = 5.5;
                const px = -Math.sin(rad) * spread;
                const py = -Math.cos(rad) * spread;

                // If single unpaired electron
                if (lp.count === 1) {
                  return (
                    <circle
                      key={lpIdx}
                      cx={cx}
                      cy={cy}
                      r={3.8}
                      fill="#38bdf8"
                      stroke="#ffffff"
                      strokeWidth={1}
                    />
                  );
                }

                // Standard Pair of Dots
                return (
                  <g key={lpIdx}>
                    <circle
                      cx={cx + px}
                      cy={cy + py}
                      r={3.4}
                      fill="#38bdf8"
                      stroke="#ffffff"
                      strokeWidth={0.8}
                    />
                    <circle
                      cx={cx - px}
                      cy={cy - py}
                      r={3.4}
                      fill="#38bdf8"
                      stroke="#ffffff"
                      strokeWidth={0.8}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </Box>
  );
}

interface ChemicalBondViewer3DProps {
  selectedMoleculeKey?: string;
  customMoleculeData?: MoleculeData | null;
  isDialog?: boolean;
}

export default function ChemicalBondViewer3D({ selectedMoleculeKey = "H2O", customMoleculeData, isDialog = false }: ChemicalBondViewer3DProps) {
  const [selectedKey, setSelectedKey] = useState<string>(selectedMoleculeKey);
  const [viewFormat, setViewFormat] = useState<'3d' | 'lewis'>('3d');

  useEffect(() => {
    if (selectedMoleculeKey) {
      setSelectedKey(selectedMoleculeKey);
    }
  }, [selectedMoleculeKey]);

  const currentMol = customMoleculeData || MOLECULES[selectedKey] || MOLECULES["H2O"];
  const currentLewis: LewisData = LEWIS_DATABASE[selectedKey] || {
    lewisFormula: currentMol.formula,
    hybridization: "Mạng tinh thể / Đang cập nhật",
    vseprGeometry: "Hình học không gian 3D",
    bondAngle: "Chuẩn IUPAC",
    octetStatus: "Thỏa mãn cấu hình electron bền vững",
    valenceElectrons: currentMol.atoms.length * 2,
    lonePairsTotal: 0,
    bondingPairsTotal: currentMol.bonds.length,
    lonePairDetails: "Cấu trúc mạng tinh thể với liên kết bền vững.",
    formalChargeNotes: "Phân tử trung hòa về điện.",
    atoms: [
      { id: "A1", symbol: currentMol.formula, x: 250, y: 150, color: "#38bdf8" }
    ],
    bonds: [],
    octetTable: [
      { atom: currentMol.name, valence: 4, bondingElectrons: 4, lonePairElectrons: 0, totalElectrons: 8, status: "✅ Bền vững" }
    ]
  };

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
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ fontSize: { xs: '16px', sm: '18px', md: '20px' } }}
            >
              🔬 Khám Phá Liên Kết: 3D Không Gian & 2D Lewis SVG
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center" width={{ xs: '100%', sm: 'auto' }}>
            {/* View Mode Toggle: 3D vs 2D Lewis */}
            <Stack direction="row" spacing={0.5} sx={{ bgcolor: 'rgba(15, 23, 42, 0.8)', p: 0.5, borderRadius: 2, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <Chip
                label="🪐 Không Gian 3D"
                size="small"
                onClick={() => setViewFormat('3d')}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '11px',
                  cursor: 'pointer',
                  bgcolor: viewFormat === '3d' ? '#0284c7' : 'transparent',
                  color: viewFormat === '3d' ? '#fff' : '#94a3b8',
                }}
              />
              <Chip
                label="📐 Công Thức Lewis 2D"
                size="small"
                onClick={() => setViewFormat('lewis')}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '11px',
                  cursor: 'pointer',
                  bgcolor: viewFormat === 'lewis' ? '#7c3aed' : 'transparent',
                  color: viewFormat === 'lewis' ? '#fff' : '#94a3b8',
                }}
              />
            </Stack>

            {!customMoleculeData && (
              <FormControl size="small" sx={{ minWidth: { xs: 150, sm: 190 } }}>
                <InputLabel>Chọn phân tử</InputLabel>
                <Select
                  value={selectedKey}
                  label="Chọn phân tử"
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
          </Stack>
        </Box>
      )}

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {/* Main Stage: 3D Canvas vs 2D Lewis Diagram */}
        <Grid item xs={12}>
          {viewFormat === '3d' ? (
            <Box
              sx={{
                height: { xs: 270, sm: 350, md: 420 },
                width: '100%',
                bgcolor: '#020617',
                borderRadius: 2.5,
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
          ) : (
            /* 2D Lewis Structure & Electron Dot Diagram Stage */
            <Box
              sx={{
                minHeight: { xs: 290, sm: 360, md: 430 },
                width: '100%',
                bgcolor: '#090d16',
                backgroundImage: 'radial-gradient(ellipse at top, #1e1b4b 0%, #090d16 100%)',
                borderRadius: 2.5,
                p: { xs: 2, sm: 3 },
                border: '1.5px solid rgba(168, 85, 247, 0.4)',
                boxShadow: 'inset 0 0 50px rgba(124, 58, 237, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} mb={1.5}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip
                    label="📐 CƠ CHẾ ELECTRON LEWIS 2D"
                    size="small"
                    sx={{ bgcolor: '#7c3aed', color: '#fff', fontWeight: 'bold', fontSize: '11px' }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                    {currentMol.name} ({currentMol.formula})
                  </Typography>
                </Box>
                <Chip
                  label={currentLewis.octetStatus}
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid #10b981', fontWeight: 'bold', fontSize: '11px' }}
                />
              </Box>

              {/* Crisp Interactive SVG Lewis Canvas */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1, sm: 2 },
                  my: 'auto',
                  borderRadius: 2,
                  bgcolor: 'rgba(2, 6, 23, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 220,
                }}
              >
                <LewisSvgCanvas data={currentLewis} />
              </Paper>

              <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1, textAlign: 'center', display: 'block' }}>
                💡 <b>Chú giải:</b> Vòng tròn = Nguyên tử • Đường thẳng = Liên kết cộng hóa trị (Đơn/Đôi/Ba) • Chấm phát sáng <b>••</b> = Cặp electron tự do (Lone pairs)
              </Typography>

              {/* Lewis Parameter Badges */}
              <Grid container spacing={1.5} mt={1}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" color="text.secondary" display="block">Trạng thái lai hóa:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="#38bdf8">{currentLewis.hybridization}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" color="text.secondary" display="block">Hình học VSEPR:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="#c084fc">{currentLewis.vseprGeometry}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" color="text.secondary" display="block">Góc liên kết lý thuyết:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="#34d399">{currentLewis.bondAngle}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.2, borderRadius: 1.5, bgcolor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <Typography variant="caption" color="text.secondary" display="block">Cặp e tự do / Liên kết:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="#f59e0b">{currentLewis.lonePairsTotal} cặp tự do / {currentLewis.bondingPairsTotal} liên kết</Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Detailed Octet Verification Breakdown Table */}
              {currentLewis.octetTable && currentLewis.octetTable.length > 0 && (
                <Box mt={2} p={1.5} borderRadius={2} bgcolor="rgba(15, 23, 42, 0.6)" border="1px solid rgba(255,255,255,0.06)">
                  <Typography variant="caption" fontWeight="bold" color="#38bdf8" display="block" mb={0.8}>
                    📋 BẢNG KIỂM TRA QUY TẮC BÁT TỬ (OCTET / DUET) TỪNG NGUYÊN TỬ:
                  </Typography>
                  <Stack spacing={0.6}>
                    {currentLewis.octetTable.map((row, rIdx) => (
                      <Box
                        key={rIdx}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        py={0.4}
                        px={1}
                        borderRadius={1}
                        bgcolor="rgba(255,255,255,0.02)"
                        sx={{ fontSize: '11.5px' }}
                      >
                        <Typography variant="caption" fontWeight="bold" color="#e2e8f0">{row.atom}</Typography>
                        <Box display="flex" gap={1.5} alignItems="center">
                          <Typography variant="caption" color="#94a3b8">e hóa trị: <b>{row.valence}</b></Typography>
                          <Typography variant="caption" color="#38bdf8">e liên kết: <b>{row.bondingElectrons}</b></Typography>
                          <Typography variant="caption" color="#c084fc">e tự do: <b>{row.lonePairElectrons}</b></Typography>
                          <Typography variant="caption" fontWeight="bold" color="#34d399">Tổng e ngoài: <b>{row.totalElectrons}e</b></Typography>
                          <Chip label={row.status} size="small" sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }} />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          )}
        </Grid>

        {/* Chemical Characteristics Card */}
        <Grid item xs={12} sm={6}>
          <Box p={{ xs: 1.5, sm: 2 }} bgcolor="background.default" borderRadius={2} border="1px solid rgba(255,255,255,0.05)" height="100%">
            <Typography variant="subtitle1" fontWeight="bold" color="cyan" sx={{ fontSize: { xs: '15px', sm: '16px' } }}>
              {currentMol.name} - {currentMol.formula}
            </Typography>
            <Chip label={currentMol.bondType} color="primary" size="small" sx={{ mt: 1, mb: 1, maxWidth: '100%', height: 'auto', py: 0.4, '& .MuiChip-label': { whiteSpace: 'normal' } }} />
            <Typography variant="body2" color="text.secondary" mt={0.5} sx={{ fontSize: { xs: '13px', sm: '14px' }, lineHeight: 1.5 }}>
              {currentMol.description}
            </Typography>
            <Typography variant="caption" color="#cbd5e1" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
              💡 <b>Phân tích cặp electron:</b> {currentLewis.lonePairDetails}
            </Typography>
          </Box>
        </Grid>

        {/* Laboratory Safety & Electron Distribution Card */}
        <Grid item xs={12} sm={6}>
          <Box p={{ xs: 1.5, sm: 2 }} bgcolor="background.default" borderRadius={2} border="1px solid rgba(255,255,255,0.05)" height="100%">
            <Typography variant="subtitle2" fontWeight="bold" mb={1} color="warning.main" sx={{ fontSize: { xs: '14px', sm: '15px' } }}>
              ⚡ Điện Tích & Quy Tắc An Toàn
            </Typography>
            <Typography variant="caption" color="#cbd5e1" component="div" sx={{ fontSize: { xs: '12px', sm: '12.5px' }, lineHeight: 1.6, mb: 1 }}>
              • <b>Điện tích hình thức:</b> {currentLewis.formalChargeNotes}<br />
              • <b>Tổng electron hóa trị:</b> {currentLewis.valenceElectrons} e⁻.<br />
            </Typography>
            <Typography variant="caption" color="text.secondary" component="div" sx={{ fontSize: { xs: '11.5px', sm: '12px' }, lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.08)', pt: 0.8 }}>
              • Luôn đeo kính bảo hộ và găng tay khi làm việc với hóa chất.<br />
              • Khi pha loãng H₂SO₄ đặc, nhớ rót từ từ axit vào nước, tuyệt đối không làm ngược lại.
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

