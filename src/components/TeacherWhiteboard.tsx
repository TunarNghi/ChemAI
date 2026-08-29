"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Stack,
  Tooltip,
  Slider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Divider,
  TextField,
} from '@mui/material';
import {
  MousePointer2,
  Pen,
  Highlighter,
  Eraser,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  FileText,
  Square,
  Circle,
  ArrowRight,
  MoveRight,
  Type,
  Minus as MinusIcon,
  Move,
  Edit3,
  Copy,
  Layers,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';

export type BoardTheme = 'chalkboard' | 'whiteboard' | 'grid' | 'ruled';
export type DrawTool = 'select' | 'pen' | 'highlighter' | 'eraser' | 'line' | 'arrow' | 'arrow_rev' | 'rect' | 'circle' | 'text' | 'stamp';

interface DrawAction {
  id?: string;
  tool: DrawTool;
  color: string;
  size: number;
  points?: { x: number; y: number }[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  text?: string;
  stamp?: string;
}

const PALETTE_COLORS = [
  '#ffffff', // Trắng phấn
  '#38bdf8', // Xanh cyan
  '#34d399', // Xanh lục ngọc
  '#fde047', // Vàng phấn
  '#fb923c', // Cam
  '#f87171', // Đỏ hồng
  '#c084fc', // Tím phấn
  '#94a3b8', // Xám sáng
  '#000000', // Đen mực
  '#0284c7', // Xanh biển đậm
  '#059669', // Xanh lá đậm
  '#dc2626', // Đỏ đậm
];

const CHEMISTRY_STAMPS = [
  { label: 'H₂SO₄', desc: 'Axit sunfuric' },
  { label: 'HCl', desc: 'Axit clohiđric' },
  { label: 'HNO₃', desc: 'Axit nitric' },
  { label: 'NaOH', desc: 'Natri hiđroxit' },
  { label: 'Ca(OH)₂', desc: 'Vôi tôi' },
  { label: 'CaCO₃', desc: 'Đá vôi' },
  { label: 'Fe₂O₃', desc: 'Sắt(III) oxit' },
  { label: 'CuSO₄', desc: 'Đồng sunfat' },
  { label: 'C₂H₅OH', desc: 'Ethanol' },
  { label: 'CH₃COOH', desc: 'Axit axetic' },
  { label: 'C₆H₁₂O₆', desc: 'Glucozơ' },
  { label: '→', desc: 'Mũi tên phản ứng' },
  { label: '⇄', desc: 'Mũi tên thuận nghịch' },
  { label: '↑', desc: 'Khí thoát ra' },
  { label: '↓', desc: 'Kết tủa tạo thành' },
  { label: 't°', desc: 'Nhiệt độ xúc tác' },
  { label: 'e⁻', desc: 'Electron' },
  { label: '••', desc: 'Cặp electron tự do' },
  { label: 'ΔrH°₂₉₈', desc: 'Enthalpy chuẩn' },
  { label: 'pH', desc: 'Chỉ số pH' },
];

export default function TeacherWhiteboard() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  // State
  const [boardTheme, setBoardTheme] = useState<BoardTheme>('chalkboard');
  const [currentTool, setCurrentTool] = useState<DrawTool>('pen');
  const [currentColor, setCurrentColor] = useState<string>('#ffffff');
  const [brushSize, setBrushSize] = useState<number>(4);
  const [selectedStamp, setSelectedStamp] = useState<string>('H₂SO₄');
  const [textInputOpen, setTextInputOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [textPos, setTextPos] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Selection & Editing State
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const isDraggingSelected = useRef<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  // Edit Text/Stamp Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [editDialogText, setEditDialogText] = useState<string>('');
  const [editDialogColor, setEditDialogColor] = useState<string>('#ffffff');
  const [editDialogSize, setEditDialogSize] = useState<number>(4);

  // History for Undo / Redo
  const [history, setHistory] = useState<DrawAction[]>([]);
  const [redoStack, setRedoStack] = useState<DrawAction[]>([]);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);
  const currentAction = useRef<DrawAction | null>(null);

  // Adjust color if theme changes (e.g. black ink on whiteboard, white chalk on chalkboard)
  useEffect(() => {
    if (boardTheme === 'whiteboard' || boardTheme === 'grid' || boardTheme === 'ruled') {
      if (currentColor === '#ffffff') setCurrentColor('#000000');
    } else {
      if (currentColor === '#000000') setCurrentColor('#ffffff');
    }
  }, [boardTheme]);

  // Helper: Distance from point to line segment
  const distToSegment = (p: { x: number; y: number }, v: { x: number; y: number }, w: { x: number; y: number }) => {
    const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
  };

  // Calculate bounding box of an action (excluding eraser)
  const getActionBounds = useCallback((act: DrawAction) => {
    if (!act || act.tool === 'eraser') return null;
    if (act.tool === 'text' || act.tool === 'stamp') {
      if (!act.start) return null;
      const fontSize = act.tool === 'stamp' ? Math.max(20, (act.size || 3) * 5) : Math.max(16, (act.size || 3) * 4);
      const textLen = (act.text || act.stamp || '').length;
      const width = Math.max(40, textLen * (fontSize * 0.6) + 16);
      const height = fontSize + 10;
      return {
        minX: act.start.x - 4,
        minY: act.start.y - fontSize + 2,
        maxX: act.start.x + width,
        maxY: act.start.y + 8,
        width,
        height,
      };
    } else if (act.tool === 'rect' || act.tool === 'circle') {
      if (!act.start || !act.end) return null;
      const minX = Math.min(act.start.x, act.end.x) - 6;
      const maxX = Math.max(act.start.x, act.end.x) + 6;
      const minY = Math.min(act.start.y, act.end.y) - 6;
      const maxY = Math.max(act.start.y, act.end.y) + 6;
      return { minX, minY, maxX, maxY, width: Math.max(20, maxX - minX), height: Math.max(20, maxY - minY) };
    } else if (act.tool === 'line' || act.tool === 'arrow' || act.tool === 'arrow_rev') {
      if (!act.start || !act.end) return null;
      const minX = Math.min(act.start.x, act.end.x) - 12;
      const maxX = Math.max(act.start.x, act.end.x) + 12;
      const minY = Math.min(act.start.y, act.end.y) - 12;
      const maxY = Math.max(act.start.y, act.end.y) + 12;
      return { minX, minY, maxX, maxY, width: Math.max(24, maxX - minX), height: Math.max(24, maxY - minY) };
    } else if (act.tool === 'pen' || act.tool === 'highlighter') {
      if (!act.points || act.points.length === 0) return null;
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      for (const p of act.points) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }
      return {
        minX: minX - 10,
        minY: minY - 10,
        maxX: maxX + 10,
        maxY: maxY + 10,
        width: Math.max(20, maxX - minX + 20),
        height: Math.max(20, maxY - minY + 20),
      };
    }
    return null;
  }, []);

  // Precise Hit Testing for any element (Never hits eraser!)
  const isActionHit = useCallback(
    (pos: { x: number; y: number }, act: DrawAction) => {
      if (!act || act.tool === 'eraser') return false;

      if (act.tool === 'text' || act.tool === 'stamp') {
        const bounds = getActionBounds(act);
        if (!bounds) return false;
        return pos.x >= bounds.minX && pos.x <= bounds.maxX && pos.y >= bounds.minY && pos.y <= bounds.maxY;
      }

      if (act.tool === 'rect') {
        if (!act.start || !act.end) return false;
        const minX = Math.min(act.start.x, act.end.x);
        const maxX = Math.max(act.start.x, act.end.x);
        const minY = Math.min(act.start.y, act.end.y);
        const maxY = Math.max(act.start.y, act.end.y);
        return pos.x >= minX - 8 && pos.x <= maxX + 8 && pos.y >= minY - 8 && pos.y <= maxY + 8;
      }

      if (act.tool === 'circle') {
        if (!act.start || !act.end) return false;
        const rx = Math.abs(act.end.x - act.start.x) / 2;
        const ry = Math.abs(act.end.y - act.start.y) / 2;
        const cx = Math.min(act.start.x, act.end.x) + rx;
        const cy = Math.min(act.start.y, act.end.y) + ry;
        if (rx === 0 || ry === 0) return false;
        const normalizedDist = ((pos.x - cx) / rx) ** 2 + ((pos.y - cy) / ry) ** 2;
        return normalizedDist <= 1.35;
      }

      if (act.tool === 'line' || act.tool === 'arrow' || act.tool === 'arrow_rev') {
        if (!act.start || !act.end) return false;
        return distToSegment(pos, act.start, act.end) <= 12;
      }

      if (act.tool === 'pen' || act.tool === 'highlighter') {
        if (!act.points || act.points.length === 0) return false;
        if (act.points.length === 1) {
          return Math.hypot(pos.x - act.points[0].x, pos.y - act.points[0].y) <= (act.size || 4) + 10;
        }
        const hitThreshold = Math.max(12, (act.size || 4) * 2.2);
        for (let j = 0; j < act.points.length - 1; j++) {
          if (distToSegment(pos, act.points[j], act.points[j + 1]) <= hitThreshold) {
            return true;
          }
        }
        return false;
      }

      return false;
    },
    [getActionBounds]
  );

  // Find action index at pointer position (from topmost to bottommost)
  const findActionAtPos = useCallback(
    (pos: { x: number; y: number }) => {
      for (let i = history.length - 1; i >= 0; i--) {
        const act = history[i];
        if (!act || act.tool === 'eraser') continue;
        if (isActionHit(pos, act)) {
          return i;
        }
      }
      return -1;
    },
    [history, isActionHit]
  );

  // Resize canvas to fill container
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set display size (css pixels)
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Set actual render size (device pixels)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    redrawCanvas();
  }, [history]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Redraw all actions on canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    // Completely clear canvas to transparent
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Render history actions
    if (Array.isArray(history)) {
      for (const act of history) {
        if (act && act.tool) {
          drawSingleAction(ctx, act);
        }
      }
    }

    // Render currently active drawing action
    if (currentAction.current && currentAction.current.tool) {
      drawSingleAction(ctx, currentAction.current);
    }

    // Render Selection Bounding Box & Handles if an object is selected
    if (selectedActionIndex !== null && history[selectedActionIndex]) {
      const selectedAct = history[selectedActionIndex];
      const bounds = getActionBounds(selectedAct);
      if (bounds) {
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(bounds.minX, bounds.minY, bounds.width, bounds.height);

        // Corner handles
        ctx.setLineDash([]);
        ctx.fillStyle = '#38bdf8';
        const handleSize = 8;
        const corners = [
          { x: bounds.minX, y: bounds.minY },
          { x: bounds.maxX, y: bounds.minY },
          { x: bounds.minX, y: bounds.maxY },
          { x: bounds.maxX, y: bounds.maxY },
        ];
        for (const c of corners) {
          ctx.fillRect(c.x - handleSize / 2, c.y - handleSize / 2, handleSize, handleSize);
        }

        // Mini drag tag
        ctx.fillStyle = 'rgba(2, 132, 199, 0.95)';
        const tagW = 125;
        const tagH = 22;
        const tagX = bounds.minX;
        const tagY = Math.max(2, bounds.minY - tagH - 4);
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(tagX, tagY, tagW, tagH, 4);
        } else {
          ctx.rect(tagX, tagY, tagW, tagH);
        }
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('✋ Kéo để di chuyển', tagX + 8, tagY + 15);
        ctx.restore();
      }
    }
  }, [history, boardTheme, selectedActionIndex, getActionBounds]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const drawSingleAction = (ctx: CanvasRenderingContext2D, act: DrawAction | null | undefined) => {
    if (!ctx || !act || !act.tool) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    try {
      if (act.tool === 'pen') {
        if (!act.points || act.points.length < 2) {
          ctx.restore();
          return;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = act.color || '#ffffff';
        ctx.lineWidth = act.size || 3;
        ctx.beginPath();
        ctx.moveTo(act.points[0].x, act.points[0].y);
        for (let i = 1; i < act.points.length; i++) {
          ctx.lineTo(act.points[i].x, act.points[i].y);
        }
        ctx.stroke();
      } else if (act.tool === 'highlighter') {
        if (!act.points || act.points.length < 2) {
          ctx.restore();
          return;
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = act.color || '#fde047';
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = (act.size || 3) * 3.5;
        ctx.beginPath();
        ctx.moveTo(act.points[0].x, act.points[0].y);
        for (let i = 1; i < act.points.length; i++) {
          ctx.lineTo(act.points[i].x, act.points[i].y);
        }
        ctx.stroke();
      } else if (act.tool === 'eraser') {
        if (!act.points || act.points.length < 2) {
          ctx.restore();
          return;
        }
        // TRUE ERASER: Deletes drawn pixels completely so background/grid shows through
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.lineWidth = (act.size || 3) * 5;
        ctx.beginPath();
        ctx.moveTo(act.points[0].x, act.points[0].y);
        for (let i = 1; i < act.points.length; i++) {
          ctx.lineTo(act.points[i].x, act.points[i].y);
        }
        ctx.stroke();
      } else if (act.tool === 'line' && act.start && act.end) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = act.color || '#ffffff';
        ctx.lineWidth = act.size || 3;
        ctx.beginPath();
        ctx.moveTo(act.start.x, act.start.y);
        ctx.lineTo(act.end.x, act.end.y);
        ctx.stroke();
      } else if (act.tool === 'arrow' && act.start && act.end) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = act.color || '#ffffff';
        ctx.fillStyle = act.color || '#ffffff';
        ctx.lineWidth = act.size || 3;
        drawArrow(ctx, act.start.x, act.start.y, act.end.x, act.end.y, 14);
      } else if (act.tool === 'arrow_rev' && act.start && act.end) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = act.color || '#ffffff';
        ctx.lineWidth = act.size || 3;
        const midY = (act.start.y + act.end.y) / 2;
        ctx.beginPath();
        ctx.moveTo(act.start.x, midY - 4);
        ctx.lineTo(act.end.x, midY - 4);
        ctx.moveTo(act.start.x, midY + 4);
        ctx.lineTo(act.end.x, midY + 4);
        ctx.stroke();
      } else if (act.tool === 'rect' && act.start && act.end) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = act.color || '#ffffff';
        ctx.lineWidth = act.size || 3;
        ctx.strokeRect(act.start.x, act.start.y, act.end.x - act.start.x, act.end.y - act.start.y);
      } else if (act.tool === 'circle' && act.start && act.end) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = act.color || '#ffffff';
        ctx.lineWidth = act.size || 3;
        const rx = Math.abs(act.end.x - act.start.x) / 2;
        const ry = Math.abs(act.end.y - act.start.y) / 2;
        const cx = Math.min(act.start.x, act.end.x) + rx;
        const cy = Math.min(act.start.y, act.end.y) + ry;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (act.tool === 'text' && act.start && act.text) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = act.color || '#ffffff';
        ctx.font = `bold ${Math.max(16, (act.size || 3) * 4)}px 'Outfit', 'Inter', sans-serif`;
        ctx.fillText(act.text, act.start.x, act.start.y);
      } else if (act.tool === 'stamp' && act.start && act.stamp) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = act.color || '#ffffff';
        ctx.font = `bold ${Math.max(20, (act.size || 3) * 5)}px 'Outfit', 'Inter', monospace`;
        ctx.fillText(act.stamp, act.start.x, act.start.y);
      }
    } catch {
      // Ignore draw errors gracefully
    } finally {
      ctx.restore();
    }
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, fromx: number, fromy: number, tox: number, toy: number, headlen: number) => {
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  };

  // Get pointer coordinates relative to canvas
  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0] || (e as any).changedTouches?.[0];
      if (!touch) return { x: 0, y: 0 };
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // Pointer Event Handlers
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getPointerPos(e);

    // MODE 1: SELECT & MOVE TOOL
    if (currentTool === 'select') {
      const hitIndex = findActionAtPos(pos);
      if (hitIndex !== -1) {
        setSelectedActionIndex(hitIndex);
        isDraggingSelected.current = true;
        dragStartPos.current = pos;
      } else {
        setSelectedActionIndex(null);
      }
      redrawCanvas();
      return;
    }

    // MODE 2: TEXT TOOL
    if (currentTool === 'text') {
      setTextPos(pos);
      setTextInputValue('');
      setTextInputOpen(true);
      return;
    }

    // MODE 3: STAMP TOOL
    if (currentTool === 'stamp') {
      const newAction: DrawAction = {
        tool: 'stamp',
        color: currentColor,
        size: brushSize,
        start: pos,
        stamp: selectedStamp,
      };
      setHistory((prev) => [...prev, newAction]);
      setRedoStack([]);
      return;
    }

    // MODE 4: DRAWING SHAPES & BRUSHES
    isDrawing.current = true;

    if (currentTool === 'pen' || currentTool === 'highlighter' || currentTool === 'eraser') {
      currentAction.current = {
        tool: currentTool,
        color: currentColor,
        size: brushSize,
        points: [pos],
      };
    } else {
      currentAction.current = {
        tool: currentTool,
        color: currentColor,
        size: brushSize,
        start: pos,
        end: pos,
      };
    }

    redrawCanvas();
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPointerPos(e);

    // DRAG SELECTED OBJECT
    if (currentTool === 'select' && isDraggingSelected.current && selectedActionIndex !== null && dragStartPos.current) {
      e.preventDefault();
      const dx = pos.x - dragStartPos.current.x;
      const dy = pos.y - dragStartPos.current.y;
      dragStartPos.current = pos;

      const act = history[selectedActionIndex];
      if (act) {
        if (act.start) {
          act.start.x += dx;
          act.start.y += dy;
        }
        if (act.end) {
          act.end.x += dx;
          act.end.y += dy;
        }
        if (act.points) {
          for (const p of act.points) {
            p.x += dx;
            p.y += dy;
          }
        }
      }
      redrawCanvas();
      return;
    }

    // ACTIVE DRAWING
    if (!isDrawing.current || !currentAction.current) return;
    e.preventDefault();

    if (currentAction.current.points) {
      currentAction.current.points.push(pos);
    } else {
      currentAction.current.end = pos;
    }

    redrawCanvas();
  };

  const handlePointerUp = () => {
    if (currentTool === 'select') {
      if (isDraggingSelected.current) {
        isDraggingSelected.current = false;
        dragStartPos.current = null;
        setHistory([...history]); // trigger state update
      }
      return;
    }

    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (currentAction.current) {
      const act = currentAction.current;
      currentAction.current = null;
      setHistory((prev) => [...prev, act]);
      setRedoStack([]);
    }
    redrawCanvas();
  };

  // Undo / Redo
  const handleUndo = () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setRedoStack((prev) => [...prev, lastAction]);
    setSelectedActionIndex(null);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextAction = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
    setHistory((prev) => [...prev, nextAction]);
  };

  // Clear Canvas
  const handleClearAll = () => {
    setHistory([]);
    setRedoStack([]);
    currentAction.current = null;
    setSelectedActionIndex(null);
    setConfirmClearOpen(false);
    redrawCanvas();
  };

  // Submit Text
  const handleAddText = () => {
    if (!textInputValue.trim()) {
      setTextInputOpen(false);
      return;
    }
    const newAction: DrawAction = {
      tool: 'text',
      color: currentColor,
      size: brushSize,
      start: textPos,
      text: textInputValue,
    };
    setHistory((prev) => [...prev, newAction]);
    setRedoStack([]);
    setTextInputOpen(false);
  };

  // Selected Object Operations: Edit, Change Color, Resize, Duplicate, Delete, Bring to front
  const handleOpenEditDialog = () => {
    if (selectedActionIndex === null || !history[selectedActionIndex]) return;
    const act = history[selectedActionIndex];
    setEditDialogText(act.text || act.stamp || '');
    setEditDialogColor(act.color || '#ffffff');
    setEditDialogSize(act.size || 4);
    setEditDialogOpen(true);
  };

  const handleSaveEditDialog = () => {
    if (selectedActionIndex === null || !history[selectedActionIndex]) {
      setEditDialogOpen(false);
      return;
    }
    const updated = [...history];
    const act = updated[selectedActionIndex];
    if (act.tool === 'text') {
      act.text = editDialogText;
    } else if (act.tool === 'stamp') {
      act.stamp = editDialogText;
    }
    act.color = editDialogColor;
    act.size = editDialogSize;
    setHistory(updated);
    setEditDialogOpen(false);
    redrawCanvas();
  };

  const handleChangeSelectedColor = (newColor: string) => {
    if (selectedActionIndex === null || !history[selectedActionIndex]) return;
    const updated = [...history];
    updated[selectedActionIndex].color = newColor;
    setHistory(updated);
    redrawCanvas();
  };

  const handleResizeSelected = (factor: number) => {
    if (selectedActionIndex === null || !history[selectedActionIndex]) return;
    const updated = [...history];
    const act = updated[selectedActionIndex];

    act.size = Math.max(1, Math.min(24, Math.round(act.size * factor)));

    if ((act.tool === 'rect' || act.tool === 'circle' || act.tool === 'line' || act.tool === 'arrow' || act.tool === 'arrow_rev') && act.start && act.end) {
      const cx = (act.start.x + act.end.x) / 2;
      const cy = (act.start.y + act.end.y) / 2;
      act.start.x = cx + (act.start.x - cx) * factor;
      act.start.y = cy + (act.start.y - cy) * factor;
      act.end.x = cx + (act.end.x - cx) * factor;
      act.end.y = cy + (act.end.y - cy) * factor;
    } else if (act.points && act.points.length > 0) {
      let sumX = 0,
        sumY = 0;
      for (const p of act.points) {
        sumX += p.x;
        sumY += p.y;
      }
      const cx = sumX / act.points.length;
      const cy = sumY / act.points.length;
      for (const p of act.points) {
        p.x = cx + (p.x - cx) * factor;
        p.y = cy + (p.y - cy) * factor;
      }
    }

    setHistory(updated);
    redrawCanvas();
  };

  const handleDuplicateSelected = () => {
    if (selectedActionIndex === null || !history[selectedActionIndex]) return;
    const original = history[selectedActionIndex];
    const cloned: DrawAction = JSON.parse(JSON.stringify(original));
    const offset = 24;

    if (cloned.start) {
      cloned.start.x += offset;
      cloned.start.y += offset;
    }
    if (cloned.end) {
      cloned.end.x += offset;
      cloned.end.y += offset;
    }
    if (cloned.points) {
      for (const p of cloned.points) {
        p.x += offset;
        p.y += offset;
      }
    }

    setHistory((prev) => [...prev, cloned]);
    setSelectedActionIndex(history.length);
  };

  const handleDeleteSelected = () => {
    if (selectedActionIndex === null || !history[selectedActionIndex]) return;
    setHistory((prev) => prev.filter((_, idx) => idx !== selectedActionIndex));
    setSelectedActionIndex(null);
  };

  const handleBringToFront = () => {
    if (selectedActionIndex === null || !history[selectedActionIndex]) return;
    const act = history[selectedActionIndex];
    const filtered = history.filter((_, idx) => idx !== selectedActionIndex);
    setHistory([...filtered, act]);
    setSelectedActionIndex(filtered.length);
  };

  // Export to PNG Image
  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tCtx = tempCanvas.getContext('2d');
    if (!tCtx) return;

    // Fill background color
    tCtx.fillStyle = boardTheme === 'chalkboard' ? '#0f172a' : boardTheme === 'whiteboard' ? '#ffffff' : boardTheme === 'grid' ? '#f8fafc' : '#fefce8';
    tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw background grid/ruled lines on exported image
    if (boardTheme === 'grid') {
      tCtx.strokeStyle = 'rgba(14, 165, 233, 0.18)';
      tCtx.lineWidth = 1;
      const gridSize = 28 * (window.devicePixelRatio || 1);
      for (let x = 0; x < tempCanvas.width; x += gridSize) {
        tCtx.beginPath();
        tCtx.moveTo(x, 0);
        tCtx.lineTo(x, tempCanvas.height);
        tCtx.stroke();
      }
      for (let y = 0; y < tempCanvas.height; y += gridSize) {
        tCtx.beginPath();
        tCtx.moveTo(0, y);
        tCtx.lineTo(tempCanvas.width, y);
        tCtx.stroke();
      }
    } else if (boardTheme === 'ruled') {
      tCtx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      tCtx.lineWidth = 1;
      const lineGap = 32 * (window.devicePixelRatio || 1);
      for (let y = 40 * (window.devicePixelRatio || 1); y < tempCanvas.height; y += lineGap) {
        tCtx.beginPath();
        tCtx.moveTo(0, y);
        tCtx.lineTo(tempCanvas.width, y);
        tCtx.stroke();
      }
    }

    tCtx.drawImage(canvas, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ChemAI_Whiteboard_Lecture_${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Export to PDF / Print Dialog
  const handleExportPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tCtx = tempCanvas.getContext('2d');
    if (!tCtx) return;

    tCtx.fillStyle = boardTheme === 'chalkboard' ? '#0f172a' : boardTheme === 'whiteboard' ? '#ffffff' : boardTheme === 'grid' ? '#f8fafc' : '#fefce8';
    tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    if (boardTheme === 'grid') {
      tCtx.strokeStyle = 'rgba(14, 165, 233, 0.18)';
      tCtx.lineWidth = 1;
      const gridSize = 28 * (window.devicePixelRatio || 1);
      for (let x = 0; x < tempCanvas.width; x += gridSize) {
        tCtx.beginPath();
        tCtx.moveTo(x, 0);
        tCtx.lineTo(x, tempCanvas.height);
        tCtx.stroke();
      }
      for (let y = 0; y < tempCanvas.height; y += gridSize) {
        tCtx.beginPath();
        tCtx.moveTo(0, y);
        tCtx.lineTo(tempCanvas.width, y);
        tCtx.stroke();
      }
    } else if (boardTheme === 'ruled') {
      tCtx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      tCtx.lineWidth = 1;
      const lineGap = 32 * (window.devicePixelRatio || 1);
      for (let y = 40 * (window.devicePixelRatio || 1); y < tempCanvas.height; y += lineGap) {
        tCtx.beginPath();
        tCtx.moveTo(0, y);
        tCtx.lineTo(tempCanvas.width, y);
        tCtx.stroke();
      }
    }

    tCtx.drawImage(canvas, 0, 0);

    const dataUrl = tempCanvas.toDataURL('image/png');
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Bài Giảng Bảng Trắng - ChemAI Studio</title>
            <style>
              body { margin: 0; padding: 20px; font-family: sans-serif; text-align: center; background: #fff; }
              img { max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px; }
              @media print { body { padding: 0; } img { border: none; } }
            </style>
          </head>
          <body>
            <h2>📘 TÀI LIỆU BÀI DẠY HÓA HỌC — HCC CHEMAI STUDIO</h2>
            <p>Ngày xuất: ${new Date().toLocaleDateString('vi-VN')} | Chuẩn GDPT 2018</p>
            <img src="${dataUrl}" />
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Get background styles
  const getBoardBgStyle = () => {
    switch (boardTheme) {
      case 'chalkboard':
        return {
          bgcolor: '#0f172a',
          backgroundImage: 'radial-gradient(ellipse at center, #1e293b 0%, #090d16 100%)',
          border: '3px solid #334155',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
        };
      case 'whiteboard':
        return {
          bgcolor: '#ffffff',
          backgroundImage: 'none',
          border: '3px solid #cbd5e1',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        };
      case 'grid':
        return {
          bgcolor: '#f8fafc',
          backgroundImage:
            'linear-gradient(to right, rgba(14, 165, 233, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          border: '3px solid #94a3b8',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        };
      case 'ruled':
        return {
          bgcolor: '#fefce8',
          backgroundImage: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.22) 1px, transparent 1px)',
          backgroundSize: '100% 32px',
          border: '3px solid #fde047',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        };
    }
  };

  const selectedAction = selectedActionIndex !== null ? history[selectedActionIndex] : null;

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      {/* Header Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5 },
          mb: 2,
          borderRadius: 3,
          bgcolor: '#0f172a',
          border: '1px solid rgba(56, 189, 248, 0.25)',
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
              p: 1,
              borderRadius: 2,
              bgcolor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
            }}
          >
            <Pen size={24} color="#38bdf8" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ color: '#fff', fontSize: { xs: '16px', sm: '19px' } }}>
              Studio Bảng Trắng & Soạn Bài Giảng Trực Quan
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Dành cho Giáo viên & Học sinh: Vẽ công thức, <b>chọn & di chuyển hình/chữ</b>, chèn tem hóa học và <b>Xuất file PDF / Ảnh bài giảng 1 chạm</b>.
            </Typography>
          </Box>
        </Box>

        {/* Top Right Quick Actions */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button
            size="small"
            variant="outlined"
            startIcon={<Download size={15} />}
            onClick={handleExportPNG}
            sx={{
              fontSize: '11.5px',
              fontWeight: 'bold',
              borderRadius: 2,
              color: '#38bdf8',
              borderColor: 'rgba(56, 189, 248, 0.4)',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)', borderColor: '#38bdf8' },
            }}
          >
            Tải Ảnh PNG
          </Button>

          <Button
            size="small"
            variant="contained"
            startIcon={<FileText size={15} />}
            onClick={handleExportPDF}
            sx={{
              fontSize: '11.5px',
              fontWeight: 'bold',
              borderRadius: 2,
              bgcolor: '#0284c7',
              textTransform: 'none',
              '&:hover': { bgcolor: '#0369a1' },
            }}
          >
            Xuất PDF / In Bài Dạy
          </Button>
        </Stack>
      </Paper>

      {/* Main Studio Toolbar & Canvas Container */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3.5,
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          bgcolor: '#090d16',
        }}
      >
        {/* Floating Top Control Toolbar */}
        <Box
          sx={{
            p: 1.2,
            bgcolor: 'rgba(15, 23, 42, 0.95)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {/* Group 1: Tools */}
          <Stack direction="row" spacing={0.6} alignItems="center" flexWrap="wrap">
            {/* Dedicated SELECT & MOVE TOOL Button */}
            <Tooltip title="Chọn, di chuyển và chỉnh sửa đối tượng (Chữ, Hình, Tem, Nét vẽ)">
              <Button
                size="small"
                variant={currentTool === 'select' ? 'contained' : 'outlined'}
                onClick={() => {
                  setCurrentTool('select');
                }}
                startIcon={<MousePointer2 size={16} />}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '12px',
                  borderRadius: 2,
                  px: 1.2,
                  py: 0.5,
                  textTransform: 'none',
                  bgcolor: currentTool === 'select' ? '#0284c7' : 'rgba(56, 189, 248, 0.08)',
                  borderColor: currentTool === 'select' ? '#38bdf8' : 'rgba(56, 189, 248, 0.35)',
                  color: currentTool === 'select' ? '#fff' : '#38bdf8',
                  boxShadow: currentTool === 'select' ? '0 0 14px rgba(56, 189, 248, 0.4)' : 'none',
                  '&:hover': { bgcolor: currentTool === 'select' ? '#0369a1' : 'rgba(56, 189, 248, 0.2)' },
                }}
              >
                Chọn & Di chuyển
              </Button>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, bgcolor: 'rgba(255,255,255,0.12)' }} />

            <Tooltip title="Bút viết nét phấn / mực">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('pen');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'pen' ? '#0284c7' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                  '&:hover': { bgcolor: currentTool === 'pen' ? '#0284c7' : 'rgba(255,255,255,0.15)' },
                }}
              >
                <Pen size={17} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Bút dạ quang (Highlight)">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('highlighter');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'highlighter' ? '#eab308' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                  '&:hover': { bgcolor: currentTool === 'highlighter' ? '#eab308' : 'rgba(255,255,255,0.15)' },
                }}
              >
                <Highlighter size={17} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Tẩy xóa nét vẽ">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('eraser');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'eraser' ? '#f43f5e' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                  '&:hover': { bgcolor: currentTool === 'eraser' ? '#f43f5e' : 'rgba(255,255,255,0.15)' },
                }}
              >
                <Eraser size={17} />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, bgcolor: 'rgba(255,255,255,0.12)' }} />

            {/* Shape Tools */}
            <Tooltip title="Đoạn thẳng / Liên kết hóa học">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('line');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'line' ? '#8b5cf6' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                <MinusIcon size={17} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Mũi tên phản ứng một chiều (→)">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('arrow');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'arrow' ? '#8b5cf6' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                <ArrowRight size={17} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Mũi tên thuận nghịch (⇄)">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('arrow_rev');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'arrow_rev' ? '#8b5cf6' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                <MoveRight size={17} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Hình chữ nhật / Khung chú thích">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('rect');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'rect' ? '#8b5cf6' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                <Square size={17} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Hình tròn / Khung obitan / Nguyên tử">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('circle');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'circle' ? '#8b5cf6' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                <Circle size={17} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Chèn văn bản / Lời giảng (Text)">
              <IconButton
                size="small"
                onClick={() => {
                  setCurrentTool('text');
                  setSelectedActionIndex(null);
                }}
                sx={{
                  bgcolor: currentTool === 'text' ? '#10b981' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                <Type size={17} />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Group 2: Palette & Size */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            {/* Color Palette Chips */}
            <Box display="flex" alignItems="center" gap={0.5}>
              {PALETTE_COLORS.slice(0, isMobile ? 6 : 10).map((c) => (
                <Box
                  key={c}
                  onClick={() => setCurrentColor(c)}
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: c,
                    cursor: 'pointer',
                    border: currentColor === c ? '2.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.3)',
                    transform: currentColor === c ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                    boxShadow: currentColor === c ? `0 0 10px ${c}` : 'none',
                  }}
                />
              ))}
            </Box>

            {/* Brush / Text Size Slider */}
            <Box display="flex" alignItems="center" gap={1} width={{ xs: 80, sm: 110 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '11px' }}>
                Cỡ:
              </Typography>
              <Slider
                size="small"
                min={1}
                max={16}
                value={brushSize}
                onChange={(_, val) => setBrushSize(val as number)}
                sx={{ color: '#38bdf8', py: 0.5 }}
              />
            </Box>

            {/* Board Background Selector */}
            <select
              value={boardTheme}
              onChange={(e) => setBoardTheme(e.target.value as BoardTheme)}
              style={{
                backgroundColor: '#1e293b',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '11.5px',
                fontWeight: 'bold',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="chalkboard">⬛ Bảng Đen</option>
              <option value="whiteboard">⬜ Bảng Trắng</option>
              <option value="grid">📐 Giấy Ô Ly</option>
              <option value="ruled">📝 Giấy Kẻ Ngang</option>
            </select>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, bgcolor: 'rgba(255,255,255,0.12)' }} />

            {/* Undo / Redo / Clear */}
            <Tooltip title="Hoàn tác nét vẽ (Undo)">
              <span>
                <IconButton size="small" onClick={handleUndo} disabled={history.length === 0} sx={{ color: '#fff' }}>
                  <RotateCcw size={16} />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Làm lại (Redo)">
              <span>
                <IconButton size="small" onClick={handleRedo} disabled={redoStack.length === 0} sx={{ color: '#fff' }}>
                  <RotateCw size={16} />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Xóa toàn bộ bảng">
              <IconButton size="small" onClick={() => setConfirmClearOpen(true)} sx={{ color: '#f43f5e' }}>
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Quick Chemistry Formula Stamps Bar */}
        <Box
          sx={{
            px: 1.5,
            py: 0.8,
            bgcolor: 'rgba(10, 15, 29, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: 4 },
          }}
        >
          <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '11px', flexShrink: 0, mr: 0.5 }}>
            🏷️ Tem Công Thức Nhanh:
          </Typography>
          {CHEMISTRY_STAMPS.map((stamp) => {
            const isSelected = currentTool === 'stamp' && selectedStamp === stamp.label;
            return (
              <Chip
                key={stamp.label}
                label={stamp.label}
                size="small"
                onClick={() => {
                  setCurrentTool('stamp');
                  setSelectedStamp(stamp.label);
                  setSelectedActionIndex(null);
                }}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '11.5px',
                  fontFamily: 'monospace',
                  height: 24,
                  bgcolor: isSelected ? '#0284c7' : 'rgba(255, 255, 255, 0.06)',
                  color: isSelected ? '#fff' : '#cbd5e1',
                  border: isSelected ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isSelected ? '0 0 10px rgba(56, 189, 248, 0.5)' : 'none',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.2)' },
                }}
              />
            );
          })}
        </Box>

        {/* FLOATING ACTION TOOLBAR WHEN AN OBJECT IS SELECTED */}
        {selectedAction && (
          <Box
            sx={{
              px: 2,
              py: 1,
              bgcolor: 'rgba(2, 132, 199, 0.2)',
              borderBottom: '1.5px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Chip
                size="small"
                icon={<Move size={14} />}
                label={`Đang chọn: ${
                  selectedAction.tool === 'text'
                    ? `Chữ "${selectedAction.text || ''}"`
                    : selectedAction.tool === 'stamp'
                    ? `Tem "${selectedAction.stamp || ''}"`
                    : selectedAction.tool === 'rect'
                    ? 'Hình chữ nhật'
                    : selectedAction.tool === 'circle'
                    ? 'Hình tròn'
                    : selectedAction.tool === 'line'
                    ? 'Đoạn thẳng'
                    : selectedAction.tool === 'arrow'
                    ? 'Mũi tên'
                    : 'Nét vẽ'
                }`}
                sx={{ bgcolor: '#0284c7', color: '#fff', fontWeight: 'bold', fontSize: '11.5px' }}
              />

              {/* Edit Text / Stamp Button */}
              {(selectedAction.tool === 'text' || selectedAction.tool === 'stamp') && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Edit3 size={14} />}
                  onClick={handleOpenEditDialog}
                  sx={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    borderRadius: 1.5,
                    color: '#38bdf8',
                    borderColor: 'rgba(56, 189, 248, 0.4)',
                    textTransform: 'none',
                    py: 0.3,
                    bgcolor: 'rgba(56, 189, 248, 0.1)',
                  }}
                >
                  Sửa Nội Dung
                </Button>
              )}

              {/* Quick Color Change Chips */}
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '10.5px' }}>
                  Màu:
                </Typography>
                {PALETTE_COLORS.slice(0, 6).map((c) => (
                  <Box
                    key={c}
                    onClick={() => handleChangeSelectedColor(c)}
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: c,
                      cursor: 'pointer',
                      border: selectedAction.color === c ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.4)',
                    }}
                  />
                ))}
              </Box>

              {/* Resize Buttons */}
              <Stack direction="row" spacing={0.5}>
                <Tooltip title="Phóng to đối tượng">
                  <IconButton size="small" onClick={() => handleResizeSelected(1.2)} sx={{ color: '#38bdf8', bgcolor: 'rgba(255,255,255,0.06)' }}>
                    <ZoomIn size={14} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Thu nhỏ đối tượng">
                  <IconButton size="small" onClick={() => handleResizeSelected(0.85)} sx={{ color: '#38bdf8', bgcolor: 'rgba(255,255,255,0.06)' }}>
                    <ZoomOut size={14} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>

            {/* Duplicate, Layer & Delete */}
            <Stack direction="row" spacing={0.8} alignItems="center">
              <Tooltip title="Nhân bản đối tượng">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Copy size={13} />}
                  onClick={handleDuplicateSelected}
                  sx={{
                    fontSize: '11px',
                    borderRadius: 1.5,
                    color: '#c084fc',
                    borderColor: 'rgba(192, 132, 252, 0.3)',
                    textTransform: 'none',
                    py: 0.3,
                  }}
                >
                  Nhân Bản
                </Button>
              </Tooltip>

              <Tooltip title="Đưa lên lớp trên cùng">
                <IconButton size="small" onClick={handleBringToFront} sx={{ color: '#a855f7', bgcolor: 'rgba(255,255,255,0.06)' }}>
                  <Layers size={14} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Xóa đối tượng đang chọn">
                <IconButton size="small" onClick={handleDeleteSelected} sx={{ color: '#f43f5e', bgcolor: 'rgba(244, 63, 94, 0.15)' }}>
                  <Trash2 size={14} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Bỏ chọn">
                <IconButton size="small" onClick={() => setSelectedActionIndex(null)} sx={{ color: '#94a3b8' }}>
                  <X size={15} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        )}

        {/* Interactive Drawing Canvas Stage */}
        <Box
          ref={containerRef}
          sx={{
            width: '100%',
            height: { xs: 450, sm: 580, md: 660 },
            position: 'relative',
            cursor: currentTool === 'select' ? (selectedAction ? 'grab' : 'default') : currentTool === 'eraser' ? 'crosshair' : 'crosshair',
            userSelect: 'none',
            touchAction: 'none',
            ...getBoardBgStyle(),
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          />

          {/* Hint Overlay */}
          {history.length === 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
                opacity: 0.45,
              }}
            >
              <Pen size={42} color={boardTheme === 'chalkboard' ? '#38bdf8' : '#64748b'} style={{ margin: '0 auto 8px' }} />
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: boardTheme === 'chalkboard' ? '#fff' : '#0f172a' }}>
                Bảng Trắng Đang Trống
              </Typography>
              <Typography variant="caption" sx={{ color: boardTheme === 'chalkboard' ? '#94a3b8' : '#64748b' }}>
                Dùng chuột hoặc cảm ứng để vẽ, chèn tem công thức hoặc nhấn nút <b>"Chọn & Di chuyển"</b> để kéo thả hình/chữ.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* NEW TEXT INPUT DIALOG */}
      <Dialog
        open={textInputOpen}
        onClose={() => setTextInputOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 3 } }}
      >
        <DialogTitle sx={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}>
          ✏️ Nhập Văn Bản / Lời Giảng Hóa Học
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            placeholder="Ví dụ: Phản ứng tỏa nhiệt mạnh, tạo kết tủa trắng..."
            value={textInputValue}
            onChange={(e) => setTextInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddText();
            }}
            sx={{
              mt: 1,
              input: { color: '#fff' },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#1e293b',
                '& fieldset': { borderColor: 'rgba(56, 189, 248, 0.4)' },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setTextInputOpen(false)} sx={{ color: '#94a3b8', textTransform: 'none' }}>
            Hủy
          </Button>
          <Button onClick={handleAddText} variant="contained" sx={{ bgcolor: '#0284c7', textTransform: 'none' }}>
            Chèn Lên Bảng
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT SELECTED TEXT / STAMP DIALOG */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { bgcolor: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: 3 } }}
      >
        <DialogTitle sx={{ color: '#38bdf8', fontSize: '16px', fontWeight: 'bold' }}>
          ✏️ Chỉnh Sửa Chữ / Tem Công Thức
        </DialogTitle>
        <DialogContent>
          <Typography variant="caption" sx={{ color: '#cbd5e1', mb: 1, display: 'block' }}>
            Nội dung hiển thị:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            value={editDialogText}
            onChange={(e) => setEditDialogText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEditDialog();
            }}
            sx={{
              input: { color: '#fff', fontWeight: 'bold', fontSize: '15px' },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#1e293b',
                '& fieldset': { borderColor: '#0284c7' },
              },
            }}
          />

          <Box mt={2}>
            <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', mb: 0.5 }}>
              Màu chữ / Tem:
            </Typography>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              {PALETTE_COLORS.map((c) => (
                <Box
                  key={c}
                  onClick={() => setEditDialogColor(c)}
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    bgcolor: c,
                    cursor: 'pointer',
                    border: editDialogColor === c ? '2.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.3)',
                    transform: editDialogColor === c ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: editDialogColor === c ? `0 0 8px ${c}` : 'none',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box mt={2}>
            <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', mb: 0.5 }}>
              Cỡ chữ / Kích thước ({editDialogSize}):
            </Typography>
            <Slider
              size="small"
              min={2}
              max={16}
              value={editDialogSize}
              onChange={(_, val) => setEditDialogSize(val as number)}
              sx={{ color: '#38bdf8' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} sx={{ color: '#94a3b8', textTransform: 'none' }}>
            Hủy
          </Button>
          <Button onClick={handleSaveEditDialog} variant="contained" sx={{ bgcolor: '#0284c7', textTransform: 'none', fontWeight: 'bold' }}>
            Lưu Thay Đổi
          </Button>
        </DialogActions>
      </Dialog>

      {/* CONFIRM CLEAR DIALOG */}
      <Dialog
        open={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        PaperProps={{ sx: { bgcolor: '#0f172a', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: 3 } }}
      >
        <DialogTitle sx={{ color: '#f43f5e', fontSize: '15px', fontWeight: 'bold' }}>
          ⚠️ Xóa Toàn Bộ Bài Giảng?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
            Bạn có chắc chắn muốn xóa sạch toàn bộ nội dung, hình vẽ và công thức trên bảng trắng không?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmClearOpen(false)} sx={{ color: '#94a3b8', textTransform: 'none' }}>
            Không Xóa
          </Button>
          <Button onClick={handleClearAll} variant="contained" color="error" sx={{ textTransform: 'none' }}>
            Xác Nhận Xóa Sạch
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
