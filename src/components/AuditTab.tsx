"use client";

import { supabase } from "@/lib/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Brain,
  Lock,
  MessageSquare,
  Play,
  PlusCircle,
  Radio,
  RefreshCw,
  StopCircle,
  UserCheck,
  GraduationCap,
  Trash2,
  Sparkles,
  Zap,
  Download,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import StudentProgressManager from "@/components/StudentProgressManager";
import { PRESET_HIGH_SCHOOL_QUIZ_BANK } from "@/lib/quizBank";
import { isDemoAccount, getStoredCurrentUser } from "@/components/UserAuthModal";

export function cleanChemicalLatex(text: string): string {
  if (!text) return "";

  // Helper to peel LaTeX commands with balanced braces (e.g. \ce{...}, \text{...}) without breaking on nested braces
  const stripBalancedCommand = (str: string, cmd: string): string => {
    const prefix = `\\${cmd}{`;
    let idx = str.indexOf(prefix);
    while (idx !== -1) {
      let depth = 1;
      let end = idx + prefix.length;
      while (end < str.length && depth > 0) {
        if (str[end] === "{") depth++;
        else if (str[end] === "}") depth--;
        end++;
      }
      if (depth === 0) {
        const inner = str.slice(idx + prefix.length, end - 1);
        str = str.slice(0, idx) + inner + str.slice(end);
        idx = str.indexOf(prefix, idx + inner.length);
      } else {
        str = str.slice(0, idx) + str.slice(idx + prefix.length);
        idx = str.indexOf(prefix, idx);
      }
    }
    return str;
  };

  const makeOverset = (above: string, base: string) => {
    const cleanAbove = (above || "")
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/t\^[0o\circ]/g, "t°")
      .replace(/\^0|\^\circ|\^o|^˚$|^\circ$|^o$/g, "0")
      .trim();
    const cleanBase = (base || "").replace(/\\text\{([^}]+)\}/g, "$1").trim();
    if (cleanAbove === "0") return cleanBase;
    return `<ruby style="ruby-position:over;font-style:normal;margin:0 1px;">${cleanBase}<rt style="font-size:0.7em;font-weight:700;color:#38bdf8;line-height:1;user-select:none;font-style:normal;">${cleanAbove}</rt></ruby>`;
  };

  const isPhysicalState = (text: string): boolean => {
    if (!text) return false;
    const clean = text.replace(/<[^>]+>/g, "").trim().toLowerCase();
    // Exclude if it contains reaction condition indicators like t°, °C, xt, as, đp...
    if (/[tT][\^˚\circ0o°]|°C|xt|xúc tác|as|ánh sáng|đpdd|đpnc|men\b/i.test(clean)) {
      return false;
    }
    return /^(?:s|l|g|aq|r|k|dd|khan|lỏng|rắn|khí|hơi|đặc|loãng)(?:[\s,]+(?:s|l|g|aq|r|k|dd|khan|lỏng|rắn|khí|hơi|đặc|loãng|nóng|nguội|bột|tinh khiết|ẩm|khô|\d+[%M]|(?:đặc,\s*nóng)))*$/i.test(clean);
  };

  const formatCondition = (cond: string) => {
    if (!cond) return "";
    if (isPhysicalState(cond)) return "";
    const c = cond
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/\\mathrm\{([^}]+)\}/g, "$1")
      .replace(/\^\{?\\?(?:circ|degree|o|0|°)\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|\{C\}|C)\b/gi, "°C")
      .replace(/\^\{?\\?(?:circ|degree|o|0|°)\}?\s*(?:\\text\{K\}|\\mathrm\{K\}|\{K\}|K)\b/gi, " K")
      .replace(/\^\{?\\?(?:circ|degree|o|0|°)\}?/gi, "°")
      .replace(/\\?(?:circ|degree)\b/gi, "°")
      .replace(/t\^?[0o\circ˚°]|t0|to|t\^\circ/gi, "t°")
      .replace(/\^\{?([0-9]*[\+\-]|[\+\-][0-9]*)\}?/g, "<sup>$1</sup>")
      .replace(/([A-Z][a-z]?|\))_\{?([a-z0-9\+\-]+)\}?/g, "$1<sub>$2</sub>")
      .replace(/_\{?([0-9]+)\}?/g, "<sub>$1</sub>")
      .replace(/([A-Z][a-z]?|\))([0-9]+)(?![<0-9\+\-])/g, "$1<sub>$2</sub>")
      .replace(/([⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (match) => {
        const map: Record<string, string> = { "⁺": "+", "⁻": "-", "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
        return `<sup>${match.split("").map((ch) => map[ch] || ch).join("")}</sup>`;
      })
      .trim();
    return c;
  };

  // Realistic ChemDraw-grade vector chemical arrows & indicators
  const getCleanTextLength = (str: string) => {
    if (!str) return 0;
    return str.replace(/<[^>]+>/g, "").replace(/&[a-z0-9#]+;/gi, " ").trim().length;
  };

  const calculateArrowWidthNumber = (above?: string, below?: string) => {
    const visibleAbove = getCleanTextLength(above || "");
    const visibleBelow = getCleanTextLength(below || "");
    const maxVisible = Math.max(visibleAbove, visibleBelow);

    if (maxVisible === 0) {
      return 30;
    }
    if (maxVisible <= 3) {
      return 34;
    }
    return Math.min(Math.max(maxVisible * 6 + 14, 34), 68);
  };

  const renderChemFwdArrow = (above?: string, below?: string) => {
    let cleanAbove = (above || "").trim();
    let cleanBelow = (below || "").trim();
    if (cleanAbove && isPhysicalState(cleanAbove)) cleanAbove = "";
    if (cleanBelow && isPhysicalState(cleanBelow)) cleanBelow = "";
    const W = calculateArrowWidthNumber(cleanAbove, cleanBelow);
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 6px;">${cleanAbove ? `<span style="font-size:0.72em;font-style:italic;font-weight:600;color:#38bdf8;line-height:1;margin-bottom:2px;white-space:nowrap;">${cleanAbove}</span>` : ""}<svg width="${W}" height="12" viewBox="0 0 ${W} 12" style="display:block;overflow:visible;"><line x1="2" y1="6" x2="${W - 3}" y2="6" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><polygon points="${W - 9},2 ${W - 1.5},6 ${W - 9},10" fill="#38bdf8"/></svg>${cleanBelow ? `<span style="font-size:0.68em;color:#94a3b8;line-height:1;margin-top:2px;white-space:nowrap;">${cleanBelow}</span>` : ""}</span>`;
  };

  const renderChemRevArrow = (above?: string, below?: string) => {
    let cleanAbove = (above || "").trim();
    let cleanBelow = (below || "").trim();
    if (cleanAbove && isPhysicalState(cleanAbove)) cleanAbove = "";
    if (cleanBelow && isPhysicalState(cleanBelow)) cleanBelow = "";
    const W = calculateArrowWidthNumber(cleanAbove, cleanBelow);
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 6px;">${cleanAbove ? `<span style="font-size:0.72em;font-style:italic;font-weight:600;color:#38bdf8;line-height:1;margin-bottom:2px;white-space:nowrap;">${cleanAbove}</span>` : ""}<svg width="${W}" height="15" viewBox="0 0 ${W} 15" style="display:block;overflow:visible;"><line x1="2" y1="5" x2="${W - 2}" y2="5" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><polygon points="${W - 11},1 ${W - 1.5},5 ${W - 11},5" fill="#38bdf8"/><line x1="2" y1="10" x2="${W - 2}" y2="10" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><polygon points="11,14 1.5,10 11,10" fill="#38bdf8"/></svg>${cleanBelow ? `<span style="font-size:0.68em;color:#94a3b8;line-height:1;margin-top:2px;white-space:nowrap;">${cleanBelow}</span>` : ""}</span>`;
  };

  let res = text;

  // 0a. Strip LaTeX math environments and leftover artifacts: \begin{aligned}, \end{aligned}, beginaligned, endaligned, etc.
  res = res
    .replace(/\\begin\s*\{?\s*(?:aligned|align\*?|equation\*?|split|gather\*?)\s*\}?/gi, "")
    .replace(/\\end\s*\{?\s*(?:aligned|align\*?|equation\*?|split|gather\*?)\s*\}?/gi, "")
    .replace(/\b(?:beginaligned|endaligned|beginequation|endequation|beginsplit|endsplit|begingather|endgather)\b/gi, "");

  // Strip LaTeX alignment ampersands (e.g. & \xrightarrow{...} or A & \rightarrow B)
  res = res.replace(/(?<!&[a-z0-9#]{1,10})\s*&\s*(?![a-z0-9#]+;)/g, " ");

  // Join chemical equations split across multiple lines by \\ or newlines right before an arrow
  res = res.replace(/(\S[^\n\\]*?)\s*(?:\\\\|\n)\s*(&?\s*(?:\\xrightarrow|\\rightarrow|\\to|->|→|➔|\\overset|\\stackrel))/g, "$1 $2");

  // Pre-strip balanced commands that wrap chemical formulas or text
  res = stripBalancedCommand(res, "ce");
  res = stripBalancedCommand(res, "text");
  res = stripBalancedCommand(res, "mathrm");
  res = stripBalancedCommand(res, "mathbf");
  res = stripBalancedCommand(res, "textit");
  res = stripBalancedCommand(res, "textbf");

  // Fix common typo artifacts
  res = res
    .replace(/H_?\{?20\}?/g, "H<sub>2</sub>O")
    .replace(/3Fe\+\}/g, "Fe<sup>3+</sup>")
    .replace(/reduse\s*\(khử\)/gi, "khử");

  // Convert raw state subscripts like _{(aq)}, _{(aq, đặc, nóng)}, _{(s)}, _{(l)}, _{(g)}, _{(aq, t°, ...)} into clean states
  res = res
    .replace(/_\{?\s*(\([^}]+\))\s*\}?/g, " $1")
    .replace(/(?<=[\w\>])_\{((?:s|l|g|aq|r|k)(?:,\s*[^}]+)?)\}/gi, " ($1)");

  // 0. Dedicated thermodynamic enthalpy replacement (\Delta_r H^\circ_{298}, \Delta_r H_{298}^\circ, Delta_r H°_298, \Delta_f H^\circ_{298}, \Delta_c H^\circ_{298}, \Delta_r H, \Delta H)
  res = res.replace(
    /\\?(?:Delta|\\Delta)\s*(?:_\{?([a-zA-Z0-9]+)\}?)?\s*H(?=(?:\^|\_|[°o0]|\s|<|>|=|$))(?:(?:\^\{?(?:\\circ|circ|degree|[o0°])\}?|°)(?:\s*_\{?([0-9]+)\}?)?|(?:\s*_\{?([0-9]+)\}?)(?:\^\{?(?:\\circ|circ|degree|[o0°])\}?|°)?)/gi,
    (match, sub1, num1, num2) => {
      const s1 = sub1 ? `<sub>${sub1}</sub>` : "";
      const s2 = (num1 || num2) ? `<sub>${num1 || num2}</sub>` : "";
      const hasDeg =
        match.includes("circ") ||
        match.includes("degree") ||
        match.includes("°") ||
        match.includes("^o") ||
        match.includes("^0") ||
        /H[°o0]/i.test(match);
      const sup = hasDeg ? "°" : "";
      return `Δ${s1}H${sup}${s2}`;
    }
  );

  // 1. Remove LaTeX spacing and annotations
  res = res
    .replace(/\\(?:quad|qquad)\b|\bquad\b|\bqquad\b/gi, " ")
    .replace(/\\widehat\{([^}]+)\}|\bwidehat\{([^}]+)\}/gi, "$1$2")
    .replace(/\\times\b/gi, "×")
    .replace(/\\cdot\b/gi, "·")
    .replace(/\\(?:approx|approxeq)\b/gi, "≈")
    .replace(/\\neq\b/gi, "≠")
    .replace(/\\(?:le|leq)\b/gi, "≤")
    .replace(/\\(?:ge|geq)\b/gi, "≥")
    .replace(/\\pm\b/gi, "±")
    .replace(/\\alpha(?![a-zA-Z])/gi, "α")
    .replace(/\\beta(?![a-zA-Z])/gi, "β")
    .replace(/\\gamma(?![a-zA-Z])/gi, "γ")
    .replace(/\\pi(?![a-zA-Z])/gi, "π")
    .replace(/\\chi(?![a-zA-Z])/gi, "χ")
    .replace(/\\sum(?![a-zA-Z])/gi, "∑")
    .replace(/\\?(?:Delta|\\Delta)(?![a-zA-Z])/gi, "Δ")
    .replace(/\^\{?\\?(?:circ|degree|o|0|°)\}?\s*(?:\\text\{C\}|\\mathrm\{C\}|\{C\}|C)\b/gi, "°C")
    .replace(/\^\{?\\?(?:circ|degree|o|0|°)\}?\s*(?:\\text\{K\}|\\mathrm\{K\}|\{K\}|K)\b/gi, " K")
    .replace(/\^\{?\\?(?:circ|degree|o|0|°)\}?/gi, "°")
    .replace(/\\?(?:degree|circ)(?![a-zA-Z])/gi, "°")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\ce\{([^}]+)\}/g, "$1")
    .replace(/\\mathrm\{([^}]+)\}/g, "$1")
    .replace(/\\(?:left|right|big|Big|bigg|Bigg)(?=[()\[\]{}|.\/\\]|\s|$)/g, "")
    .replace(/\\(?:gt|lt)\b/g, "");

  // 2. Process Arrows with nested braces support
  // 2a. Overset / Stackrel arrows: \overset{t^\circ}{\rightarrow}, \stackrel{t°}{\longrightarrow}, \overset{xt}{\rightleftharpoons}
  res = res.replace(/\\(?:overset|stackrel)\{([^}]+)\}\{\\?(?:rightarrow|longrightarrow|leftarrow|longleftarrow|to|\-{1,4}>|={1,4}>|→|➔)\}/gi, (_, above) => {
    const cleanAbove = formatCondition(above);
    return ` @@@CHEMARRSTART@@@${cleanAbove}@@@CHEMSEP@@@@@@CHEMARREND@@@ `;
  });

  res = res.replace(/\\(?:overset|stackrel)\{([^}]+)\}\{\\?(?:x?rightleftharpoons|x?leftrightharpoons|x?leftharpoons|x?rightharpoons|x?leftharpoons|x?rightharpoon|x?leftharpoon|leftrightarrow|⇌|<={1,4}>|<\-{1,4}>)\}/gi, (_, above) => {
    const cleanAbove = formatCondition(above);
    return ` @@@CHEMREVSTART@@@${cleanAbove}@@@CHEMSEP@@@@@@CHEMREVEND@@@ `;
  });

  res = res.replace(/\\?(?:xrightleftharpoons|xleftrightharpoons)(?:\[((?:[^{}]|\{[^{}]*\})*)\])?\{((?:[^{}]|\{[^{}]*\})*)\}/gi, (_, below, above) => {
    const cleanAbove = formatCondition(above);
    const cleanBelow = formatCondition(below);
    return ` @@@CHEMREVSTART@@@${cleanAbove}@@@CHEMSEP@@@${cleanBelow}@@@CHEMREVEND@@@ `;
  });

  res = res.replace(/\\xrightarrow(?:\[((?:[^{}]|\{[^{}]*\})*)\])?\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, below, above) => {
    const cleanAbove = formatCondition(above);
    const cleanBelow = formatCondition(below);
    return ` @@@CHEMARRSTART@@@${cleanAbove}@@@CHEMSEP@@@${cleanBelow}@@@CHEMARREND@@@ `;
  });

  // 2b. Match arrows with bracketed conditions immediately before or after: "-> [t°]", "➔ [t°]", "-> (t°)", "➔ (as)", "[t°] ->"
  // IMPORTANT: Do NOT treat physical states of matter (s, l, g, aq, r, k...) as arrow conditions!
  res = res.replace(/(?:➔|\-{1,4}>|={1,4}>|\\rightarrow|\\to)\s*(?:\[([^\]\n]+)\]|\(([^\)\n]+)\))/g, (_, c1, c2) => {
    const raw = (c1 || c2 || "").trim();
    if (isPhysicalState(raw)) {
      return ` ${renderChemFwdArrow()} <span style="font-size:0.82em;color:#94a3b8;font-style:italic;">(${raw})</span> `;
    }
    const cond = formatCondition(raw);
    return ` @@@CHEMARRSTART@@@${cond}@@@CHEMSEP@@@@@@CHEMARREND@@@ `;
  });

  res = res.replace(/(?:\[([^\]\n]+)\]|\(([^\)\n]+)\))\s*(?:➔|\-{1,4}>|={1,4}>|\\rightarrow|\\to)/g, (_, c1, c2) => {
    const raw = (c1 || c2 || "").trim();
    if (isPhysicalState(raw)) {
      return ` <span style="font-size:0.82em;color:#94a3b8;font-style:italic;">(${raw})</span> ${renderChemFwdArrow()} `;
    }
    const cond = formatCondition(raw);
    return ` @@@CHEMARRSTART@@@${cond}@@@CHEMSEP@@@@@@CHEMARREND@@@ `;
  });

  res = res.replace(/(?:\-{2,4}\s*\(?([^->\n]+)\)?\s*\-{2,4}>|\-\s*\(([^->\n]+)\)\s*\->|\-{1,4}>\s*\(([^)\n]+)\)|([tT][\^˚\circ0o°]+|[tT]°)\s*(?:➔|\-{1,4}>)|(?:➔|\-{1,4}>)\s*([tT][\^˚\circ0o°]+|[tT]°))/g, (_, c1, c2, c3, c4, c5) => {
    const rawAbove = (c1 || c2 || c3 || c4 || c5 || "").trim();
    if (isPhysicalState(rawAbove)) {
      return ` ${renderChemFwdArrow()} <span style="font-size:0.82em;color:#94a3b8;font-style:italic;">(${rawAbove})</span> `;
    }
    const cleanAbove = rawAbove ? formatCondition(rawAbove) : "";
    return ` @@@CHEMARRSTART@@@${cleanAbove}@@@CHEMSEP@@@@@@CHEMARREND@@@ `;
  });

  // Join chemical equations split across multiple lines by \\ or newlines right before arrow markers
  res = res.replace(/(\S[^\n\\]*?)\s*(?:\\\\|\n)\s*(&?\s*(?:@@@CHEMARRSTART@@@|@@@CHEMREVSTART@@@))/g, "$1 $2");

  // 3. Mathematical fractions
  res = res.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (_, num, den) => {
    return `<span style="display:inline-block;vertical-align:middle;text-align:center;font-size:0.82em;line-height:1;margin:0 2px;"><span style="display:block;border-bottom:1px solid currentColor;padding:0 2px;">${num}</span><span style="display:block;padding:0 2px;">${den}</span></span>`;
  });

  res = res.replace(/(?:^|(?<=[\s\+\=]))(\d+)\/(\d+)\s*(?=[A-Z])/g, (_, num, den) => {
    return `<span style="display:inline-block;vertical-align:middle;text-align:center;font-size:0.82em;line-height:1;margin:0 2px;"><span style="display:block;border-bottom:1px solid currentColor;padding:0 2px;">${num}</span><span style="display:block;padding:0 2px;">${den}</span></span>`;
  });

  // 4. Oxidation states via Overset / Underset
  res = res
    .replace(/([A-Z][a-z]*)?\\overset\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, above, base) => {
      return (prefix || "") + makeOverset(above, base);
    })
    .replace(/([A-Z][a-z]*)?\\underset\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, below, base) => {
      const p = prefix || "";
      const cleanBelow = (below || "").replace(/\\text\{([^}]+)\}/g, "$1");
      const cleanBase = (base || "").replace(/\\text\{([^}]+)\}/g, "$1");
      return `${p}<span style="display:inline-block;text-align:center;vertical-align:baseline;line-height:1.1;margin:0 1px;"><span>${cleanBase}</span><span style="display:block;font-size:0.68em;color:#94a3b8;line-height:1;margin-top:1px;">${cleanBelow}</span></span>`;
    })
    .replace(/(?<=\s|^|\()([+-][0-9]+)\s*(Fe|N|O|Cu|Zn|Al|Mg|Cl|S|P|Mn|Cr|Na|K|Ca|Ba|Ag|H|C)\b/g, (_, num, elem) => {
      return makeOverset(num, elem);
    });

  // 5. Polyatomic and Monatomic ions & Oxidation states
  const unicodeSuperMap: Record<string, string> = {
    "⁺": "+", "⁻": "-", "⁰": "0", "¹": "1", "²": "2", "³": "3",
    "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9"
  };
  res = res.replace(/([⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (match) => {
    const converted = match.split("").map((c) => unicodeSuperMap[c] || c).join("");
    return `<sup>${converted}</sup>`;
  });

  res = res
    .replace(/\b(Cu|Fe|Cr|Mn|S|N|C|Cl|Br|O|H|P|Al|Zn|Mg|Ca|Ba|Na|K|Ag)\s*\^?\{?([\+\-][1-7]|[1-7][\+\-])\}?(?!\w)/g, "$1<sup>$2</sup>")
    .replace(/\b(SO4|SO3|CO3|Cr2O7|CrO4|SiO3|S2O3)\s*(\^?\{?(?:2-|2\+|-2|\+2)\}?|2-|2\+)(?!\d)/g, "$1<sup>2-</sup>")
    .replace(/\b(PO4|PO3)\s*(\^?\{?(?:3-|3\+|-3|\+3)\}?|3-|3\+)(?!\d)/g, "$1<sup>3-</sup>")
    .replace(/\b(NO3|NO2|OH|HCO3|HSO4|H2PO4|CH3COO|ClO|ClO2|ClO3|ClO4|MnO4|F|Cl|Br|I)\s*(\^?\{?(?:-|\+|-1|\+1)\}?|-|\+)(?!\d)/g, "$1<sup>$2</sup>")
    .replace(/\b(NH4|H3O|H)\s*(\^?\{?(?:\+|\+1)\}?|\+)(?!\d)/g, "$1<sup>+</sup>")
    .replace(/\b(Fe|Cu|Zn|Mg|Ca|Ba|Pb|Sn|Mn|Ni|Hg|Sr|Pt|Co)\s*(\^?\{?(?:2\+|\+2)\}?|2\+|\+2)(?!\d)/g, "$1<sup>2+</sup>")
    .replace(/\b(Al|Cr|Fe)\s*(\^?\{?(?:3\+|\+3)\}?|3\+|\+3)(?!\d)/g, "$1<sup>3+</sup>");

  // 6. LaTeX Array table environment (Electron balance)
  res = res.replace(/\\begin\{array\}\{?[^}]*\}?([\s\S]*?)\\end\{array\}/gi, (_, content) => {
    const rows = content.trim().split("\n").map((r: string) => r.replace(/\\\\$/, "").trim()).filter(Boolean);
    let tableRowsHTML = "";
    for (const row of rows) {
      const cells = row.split("&");
      if (cells.length >= 2) {
        const leftCell = cells[0].trim();
        const rightCell = cells.slice(1).join("&").trim();
        tableRowsHTML += `<tr><td style="padding:2px 8px;text-align:right;border-right:2px solid #38bdf8;font-weight:bold;color:#f59e0b;">${leftCell}</td><td style="padding:2px 8px;text-align:left;">${rightCell}</td></tr>`;
      } else {
        tableRowsHTML += `<tr><td colspan="2" style="padding:2px 8px;">${row}</td></tr>`;
      }
    }
    return `<table style="margin:8px 0;border-collapse:collapse;"><tbody>${tableRowsHTML}</tbody></table>`;
  });

  // 7. Gas (↑) and Precipitate (↓) symbols (High-definition chemical vector icons)
  res = res
    .replace(/\\uparrow|\s*\(\s*↑\s*\)|(?<=[A-Za-z0-9\)])\s*↑/g, ' <span style="display:inline-flex;align-items:center;vertical-align:middle;margin:0 2px;" title="Chất khí thoát ra"><svg width="11" height="13" viewBox="0 0 11 13" style="display:inline-block;vertical-align:middle;"><path d="M5.5,1 L10,5.5 L7,5.5 L7,12 L4,12 L4,5.5 L1,5.5 Z" fill="#34d399"/></svg></span> ')
    .replace(/\\downarrow|\s*\(\s*↓\s*\)|(?<=[A-Za-z0-9\)])\s*↓/g, ' <span style="display:inline-flex;align-items:center;vertical-align:middle;margin:0 2px;" title="Chất kết tủa lắng xuống"><svg width="11" height="13" viewBox="0 0 11 13" style="display:inline-block;vertical-align:middle;"><path d="M5.5,12 L1,7.5 L4,7.5 L4,1 L7,1 L7,7.5 L10,7.5 Z" fill="#f87171"/></svg></span> ');

  // 8. Plain Arrows (including LaTeX commands and AI text keywords)
  res = res
    .replace(/\\?(?:x?rightleftharpoons|x?leftrightharpoons|x?leftharpoons|x?rightharpoons|x?leftharpoon(?:up|down)?|x?rightharpoon(?:up|down)?)\b|\\leftrightarrow|\\Leftrightarrow|<={1,4}>|<\-{1,4}>|⇌/gi, ` ${renderChemRevArrow()} `)
    .replace(/\\?(?:rightarrow|longrightarrow|leftarrow|longleftarrow)\b|\\to\b|\-{1,4}>|={1,4}>|→|➔|\barrow\b/gi, ` ${renderChemFwdArrow()} `);

  // 9. Superscripts and Subscripts
  res = res
    .replace(/\${1,2}([^$]+)\${1,2}/g, "$1")
    .replace(/\$+/g, "")
    .replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>")
    .replace(/\^([0-9\+\-°]+|[a-zA-Z]+)/g, (_, val) => {
      if (val === "0" || val === "o" || val === "circ" || val === "degree") return "°";
      if (/^(?:circ|degree|o|0)C$/i.test(val)) return "°C";
      return `<sup>${val}</sup>`;
    })
    .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>")
    .replace(/([A-Z][a-z]?|\))_\{?([a-z0-9\+\-]+)\}?/g, "$1<sub>$2</sub>")
    .replace(/_([0-9]+)/g, "<sub>$1</sub>")
    .replace(/_([a-zA-Z])(?![a-zA-Z0-9])/g, "<sub>$1</sub>")
    .replace(/\\\\/g, "<br/>")
    .replace(/\\/g, "");

  // 10. Automatic subscripts on chemical formulas & complex groups (strictly adjacent, NO SPACES)
  // e.g. H2SO4 -> H<sub>2</sub>SO<sub>4</sub>, Fe2(SO4)3 -> Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>
  // Excludes Vietnamese diacritic letters so words like PHẦN 1 / PHẦN1 aren't matched,
  // while allowing consecutive element symbols in formulas (like 'S' before 'O4' in H2SO4)
  const vnDiacritics = "[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]";
  const elemSubscriptRegex = new RegExp(`(?<!${vnDiacritics})([A-Z][a-z]?|\\))([0-9]+)(?![<0-9\\+\\-])`, "g");
  res = res.replace(elemSubscriptRegex, "$1<sub>$2</sub>");

  // General chemical formulas with variable indices (x, y, z, n, m):
  // Alkane / alkene / alkyne: CnH2n+2, CnH2n, CnH2n-2, CnH2n-6, CnH2n+1OH, CmH2m+2
  res = res.replace(/\b([C])([nm])([H])(2[nm](?:[\+\-][0-9]+)?)/g, "$1<sub>$2</sub>$3<sub>$4</sub>");

  // Hydrocarbon general formulas: CxHy, CxHyOz, CxHyOzNt, CxHyClz
  res = res.replace(/\b([C])([xynm])([H])([yznm]|[0-9]+[a-z]?)/g, "$1<sub>$2</sub>$3<sub>$4</sub>");

  // Oxide & salt general formulas: FexOy, Fe_xOy, CxHyOz, MxOy, NxOy, SxOy, M2On, Al2Ox
  res = res.replace(/(<sub>[a-z0-9\+\-]+<\/sub>)\s*([O])([xyznm])\b/g, "$1$2<sub>$3</sub>");
  res = res.replace(/\b(Fe|M|N|S|Cl|P|Cr)([xynm])([O])([xynm])\b/g, "$1<sub>$2</sub>$3<sub>$4</sub>");
  res = res.replace(/\b([A-Z][a-z]?)([0-9]+)([O])([xynm])\b/g, "$1<sub>$2</sub>$3<sub>$4</sub>");

  // Polymer and acid general groups: R(COOH)n, (C6H10O5)n, M(OH)n, (-NH-...-CO-)n, [-NH-...-CO-]n
  res = res.replace(/\(\s+(\-[A-Za-z])/g, "($1").replace(/([A-Za-z]\-)\s+\)/g, "$1)");
  res = res.replace(/([\)\]])\s*_\{?([nmx0-9]+)\}?/gi, "$1<sub>$2</sub>");
  res = res.replace(/([\)\]])\s*([nmx])(?![a-zA-Z0-9])/g, "$1<sub>$2</sub>");

  // Ensure space between stoichiometric coefficient and chemical formula: 18HNO3 -> 18 HNO3, 2H2SO4 -> 2 H2SO4
  res = res.replace(/(^|[\s\+\=\(])([0-9]+)(?=[A-Z][a-z]?(?:[0-9]|_|\(|\)|\[|\]|[A-Z]))/g, "$1$2 ");

  // Format physical states cleanly with subtle spacing: (s), (l), (g), (aq), (aq, đặc), (aq, loãng)
  res = res.replace(/(?<=[\w\>])\s*\(((?:s|l|g|aq|r|k)(?:,\s*[^)]+)?)\)/gi, ' <span style="font-size:0.82em;color:#94a3b8;font-style:italic;">($1)</span>');

  // Space around '+' in chemical equations
  res = res.replace(/([a-zA-Z0-9\)])\s*\+\s*([0-9]*[A-Z])/g, "$1 + $2");

  // Format calculations: Convert double round parentheses to square brackets for clarity
  // e.g. 2 · (6 - (-1)) -> 2 · [6 - (-1)]
  res = res.replace(/\(\s*([0-9\s\+\-\*·\.\/]+)\s*\(\s*([\+\-]?[0-9]+)\s*\)\s*\)/g, "[$1($2)]");
  res = res.replace(/\(\s*([0-9\s\+\-\*·\.\/]*[-+*·]\s*\([-+][0-9]+\)[^)]*)\)/g, "[$1]");

  // Clean up stray closing parenthesis before period or comma: e.g. "15e⁻)." -> "15e⁻."
  res = res.replace(/(?<=[0-9a-zA-Z⁻⁺°])\)\s*(\.|\;|\:|\,)/g, "$1");

  // Strip ALL remaining unparsed curly braces { or } completely (solves stray '}' at end of reactions)
  res = res.replace(/[\{\}]/g, "");

  // 11. Restore condition arrows (Flawless textbook publication appearance with dynamic vector length)
  res = res.replace(/@@@CHEMARRSTART@@@([\s\S]*?)@@@CHEMSEP@@@([\s\S]*?)@@@CHEMARREND@@@/g, (_, above, below) => {
    return renderChemFwdArrow(above, below);
  });

  res = res.replace(/@@@CHEMREVSTART@@@([\s\S]*?)@@@CHEMSEP@@@([\s\S]*?)@@@CHEMREVEND@@@/g, (_, above, below) => {
    return renderChemRevArrow(above, below);
  });

  return res;
}

export function formatMarkdownToHTML(text: string): string {
  if (!text) return "";

  // Prevent double cleaning if text was already processed by cleanChemicalLatex
  const cleanedText = text.includes('viewBox="0 0') ? text : cleanChemicalLatex(text);

  const html = cleanedText
    // Replace <br> strings or newlines
    .replace(/<br\s*\/?>/gi, "\n")
    // Dividers: ---, ***, ___, - - -
    .replace(/^\s*(?:-{3,}|\*{3,}|_{3,}|(?:\-\s*){3,})\s*$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.12);margin:14px 0;"/>')
    // Bold **text**
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic *text*
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Headings ###
    .replace(
      /^#### (.*$)/gim,
      '<h4 style="color:#38bdf8;font-size:14px;font-weight:700;margin:12px 0 4px;">$1</h4>',
    )
    .replace(
      /^### (.*$)/gim,
      '<h3 style="color:#fbbf24;font-size:15px;font-weight:700;margin:14px 0 6px;">$1</h3>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 style="color:#38bdf8;font-size:16px;font-weight:700;margin:16px 0 6px;">$1</h2>',
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 style="color:#38bdf8;font-size:17.5px;font-weight:700;margin:18px 0 8px;">$1</h1>',
    );

  // Convert markdown tables, equation blocks & lists
  const lines = html.split("\n");
  let inTable = false;
  let tableHTML = "";
  const resultLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (trimmed.includes("---")) continue;
      const cells = trimmed
        .split("|")
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (!inTable) {
        tableHTML +=
          '<table style="width:100%;border-collapse:collapse;margin:10px 0;border:1px solid rgba(255,255,255,0.1);"><thead><tr style="background:#1e293b;color:#f59e0b;">' +
          cells
            .map(
              (c) =>
                `<th style="border:1px solid rgba(255,255,255,0.1);padding:6px;text-align:left;">${c.trim()}</th>`,
            )
            .join("") +
          "</tr></thead><tbody>";
        inTable = true;
      } else {
        tableHTML +=
          "<tr>" +
          cells
            .map(
              (c) =>
                `<td style="border:1px solid rgba(255,255,255,0.1);padding:6px;">${c.trim()}</td>`,
            )
            .join("") +
          "</tr>";
      }
    } else {
      if (inTable) {
        tableHTML += "</tbody></table>";
        resultLines.push(tableHTML);
        tableHTML = "";
        inTable = false;
      }

      if (trimmed === "") {
        resultLines.push('<div style="height:8px;"></div>');
      } else if (trimmed.startsWith("<hr")) {
        resultLines.push(trimmed);
      } else if (trimmed.startsWith("<h1") || trimmed.startsWith("<h2") || trimmed.startsWith("<h3") || trimmed.startsWith("<h4")) {
        resultLines.push(trimmed);
      } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("+ ") || trimmed.startsWith("• ")) {
        const itemContent = trimmed.replace(/^[\*\-\+•]\s*/, "");
        resultLines.push(
          `<div style="margin:4px 0;padding-left:16px;position:relative;line-height:1.75;font-size:14.5px;"><span style="position:absolute;left:2px;color:#38bdf8;font-size:1.1em;line-height:1.4;">•</span>${itemContent}</div>`,
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        resultLines.push(
          `<div style="margin:4px 0;padding-left:18px;line-height:1.75;font-size:14.5px;">${trimmed}</div>`,
        );
      } else {
        const plainText = trimmed.replace(/<[^>]+>/g, "").trim();
        const hasArrowSvg = trimmed.includes('<svg width=') && (trimmed.includes('<polygon') || trimmed.includes('<line'));
        const isLongProse = plainText.length > 120 || plainText.startsWith("(") || plainText.includes("Kiểm tra") || plainText.includes("hoàn toàn") || plainText.includes("bảo toàn");
        
        if (hasArrowSvg && !isLongProse) {
          let equationContent = trimmed;
          // If the line starts with an arrow SVG (reactants were placed on the preceding line), merge with preceding line
          if (
            trimmed.startsWith('<span style="display:inline-flex;flex-direction:column') &&
            resultLines.length > 0
          ) {
            const prev = resultLines[resultLines.length - 1];
            if (prev.startsWith('<div style="line-height:1.75')) {
              const prevText = prev.replace(/^<div[^>]*>|<\/div>$/g, "").trim();
              if (prevText && !prevText.startsWith("•") && !prevText.startsWith("<h") && !prevText.startsWith("<hr")) {
                resultLines.pop();
                equationContent = `${prevText} ${trimmed}`;
              }
            }
          }

          // Genuine chemical equation block: highlight in a clean, elegant card with prominent straight accent line
          resultLines.push(
            `<div style="margin:10px 0;padding:8px 14px;background:rgba(56,189,248,0.05);border:1px solid rgba(56,189,248,0.22);border-left:3.5px solid #38bdf8;border-radius:6px;overflow-x:auto;font-size:15px;line-height:1.8;letter-spacing:0.01em;">${equationContent}</div>`
          );
        } else {
          resultLines.push(`<div style="line-height:1.75;margin:4px 0;font-size:14.5px;">${trimmed}</div>`);
        }
      }
    }
  }

  if (inTable) {
    tableHTML += "</tbody></table>";
    resultLines.push(tableHTML);
  }

  return resultLines.join("\n");
}

export default function AuditTab() {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const [subTab, setSubTab] = useState<"students" | "chat" | "quiz" | "kahoot">("students");
  const [filterText, setFilterText] = useState<string>("");

  // Data States
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [quizBank, setQuizBank] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Kahoot Host State
  const [timerSec, setTimerSec] = useState<number>(20);
  const [hostPin, setHostPin] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [gameStatus, setGameStatus] = useState<string>("idle"); // idle | waiting | active | finished
  const [kahootHistory, setKahootHistory] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const fetchKahootHistory = async () => {
    try {
      const { data } = await supabase
        .from("experiments")
        .select("*")
        .like("cache_key", "kahoot_history_%")
        .order("created_at", { ascending: false })
        .limit(10);
      if (data) {
        setKahootHistory(data.map((item) => item.result_json));
      }
    } catch (e) {
      console.warn("Fetch Kahoot history error:", e);
    }
  };

  useEffect(() => {
    fetchKahootHistory();
  }, []);

  const handleVerify = () => {
    const expectedPassword =
      process.env.NEXT_PUBLIC_TEACHER_AUDIT_PASSWORD || "chemai2026";
    if (password === expectedPassword) {
      setIsAuthed(true);
      setOpenModal(false);
      fetchCurrentSubData("chat");
    } else {
      setErrorMsg(true);
    }
  };

  const fetchCurrentSubData = async (type = subTab) => {
    setIsLoading(true);
    try {
      if (type === "chat") {
        const { data } = await supabase
          .from("chat_logs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(40);
        setChatLogs(data || []);
      } else if (type === "quiz") {
        const { data } = await supabase
          .from("quiz_questions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(40);
        setQuizBank(data || []);
      }
    } catch (e) {
      console.error("Fetch audit data error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAllChatLogs = async () => {
    const currentUser = getStoredCurrentUser();
    if (isDemoAccount(currentUser)) {
      alert("⚠️ Tài khoản thử nghiệm (Demo) chỉ hoạt động ở chế độ xem và lưu tạm thời. Không thể xóa dữ liệu trên hệ thống chính.");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu lịch sử hội thoại trên cơ sở dữ liệu không? Thao tác này không thể hoàn tác.")) {
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from("chat_logs").delete().neq("id", 0);
      if (error) throw error;
      setChatLogs([]);
      alert("Đã xóa sạch toàn bộ lịch sử hội thoại thành công!");
    } catch (e: any) {
      alert("Lỗi khi xóa Chat Logs: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportChatLogsCSV = () => {
    const dataToExport = filteredChatLogs.length > 0 ? filteredChatLogs : chatLogs;
    if (dataToExport.length === 0) {
      alert("Chưa có dữ liệu nhật ký hội thoại để trích xuất.");
      return;
    }
    const headers = ["STT", "Thời gian", "Session ID", "Câu hỏi Học sinh", "Lời giải của Gia sư AI"];
    const rows = dataToExport.map((row, idx) => {
      const timeStr = `"${new Date(row.created_at).toLocaleString("vi-VN").replace(/"/g, '""')}"`;
      const sessionStr = `"${(row.session_id || "").replace(/"/g, '""')}"`;
      const userMsg = `"${(row.user_message || "").replace(/"/g, '""')}"`;
      const aiResp = `"${(row.ai_response || "").replace(/"/g, '""')}"`;
      return [idx + 1, timeStr, sessionStr, userMsg, aiResp].join(",");
    });

    // UTF-8 BOM (\uFEFF) ensures Excel opens Vietnamese accents without garbled text
    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nhat_Ky_Gia_Su_ChemAI_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportChatLogsJSON = () => {
    const dataToExport = filteredChatLogs.length > 0 ? filteredChatLogs : chatLogs;
    if (dataToExport.length === 0) {
      alert("Chưa có dữ liệu nhật ký hội thoại để trích xuất.");
      return;
    }
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nhat_Ky_Gia_Su_ChemAI_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSeed50PresetQuestions = async () => {
    const currentUser = getStoredCurrentUser();
    if (isDemoAccount(currentUser)) {
      alert("⚠️ Tài khoản thử nghiệm (Demo): Thao tác ghi nạp dữ liệu câu hỏi vào Cloud DB chỉ dành cho tài khoản quản trị viên chính.");
      return;
    }
    setIsLoading(true);
    try {
      const recordsToInsert = PRESET_HIGH_SCHOOL_QUIZ_BANK.map((q) => ({
        question: q.question,
        options: q.options,
        correct_index: q.correctIndex,
        explanation: q.explanation,
        created_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("quiz_questions").insert(recordsToInsert);
      if (error) {
        // Fallback: save to experiments table
        await supabase.from("experiments").upsert({
          cache_key: "preset_quiz_bank_50",
          result_json: PRESET_HIGH_SCHOOL_QUIZ_BANK,
        }, { onConflict: "cache_key" });
      }

      await fetchCurrentSubData("quiz");
      alert("✅ Đã nạp thành công bộ 50 câu hỏi Hóa học THPT chất lượng cao vào cơ sở dữ liệu!");
    } catch (e: any) {
      alert("Thông báo: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKahootRoom = async () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      let { error } = await supabase.from("rooms").insert({
        room_pin: pin,
        status: "waiting",
        current_question: null,
        timer_sec: timerSec,
      });

      // Fallback if timer_sec column does not exist in Supabase DB schema
      if (error && error.message?.includes("timer_sec")) {
        const fallback = await supabase.from("rooms").insert({
          room_pin: pin,
          status: "waiting",
          current_question: null,
        });
        error = fallback.error;
      }

      if (error) throw error;
      setHostPin(pin);
      setGameStatus("waiting");
      fetchCurrentSubData("quiz");
      pollParticipants(pin);
    } catch (e: any) {
      alert("Lỗi tạo phòng thi đấu: " + e.message);
    }
  };

  const pollParticipants = async (pinStr: string) => {
    try {
      const { data } = await supabase
        .from("room_participants")
        .select("*")
        .eq("room_pin", pinStr)
        .order("score", { ascending: false });
      setParticipants(data || []);

      // Auto finish match on teacher host side when all participants finished 10 questions OR room status is finished
      const allFinished = data && data.length > 0 && data.every(p => p.answers && Object.keys(p.answers).length >= 10);

      const { data: roomData } = await supabase
        .from("rooms")
        .select("status")
        .eq("room_pin", pinStr)
        .maybeSingle();

      if ((roomData && roomData.status === "finished") || allFinished) {
        if (gameStatus !== "finished") {
          setGameStatus("finished");
          // Save Kahoot leaderboard history to DB automatically
          const leaderData = {
            room_pin: pinStr,
            ended_at: new Date().toISOString(),
            leaderboard: (data || []).sort((a, b) => b.score - a.score),
          };
          await supabase.from("experiments").upsert({
            cache_key: `kahoot_history_${pinStr}_${Date.now()}`,
            result_json: leaderData,
          });
          if (roomData && roomData.status !== "finished") {
            await supabase.from("rooms").update({ status: "finished" }).eq("room_pin", pinStr);
          }
          fetchKahootHistory();
        }
      }
    } catch (e) {
      console.warn("Poll participants error:", e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let channel: any = null;

    if (hostPin && (gameStatus === "waiting" || gameStatus === "active")) {
      const cleanHostPin = hostPin.trim();

      // 1. Immediate query
      pollParticipants(cleanHostPin);

      // 2. Kích hoạt Supabase Realtime WebSocket cho Danh sách thí sinh & Điểm số
      try {
        channel = supabase
          .channel(`audit_participants_${cleanHostPin}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'room_participants',
              filter: `room_pin=eq.${cleanHostPin}`,
            },
            () => {
              pollParticipants(cleanHostPin);
            }
          )
          .subscribe();
      } catch (err) {
        console.warn("Realtime participants subscription fallback to polling:", err);
      }

      // 3. Polling dự phòng nhịp tim
      interval = setInterval(() => {
        pollParticipants(cleanHostPin);
      }, 3500);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      if (interval) clearInterval(interval);
    };
  }, [hostPin, gameStatus]);

  const filteredChatLogs = chatLogs.filter(
    (row) =>
      !filterText ||
      row.user_message?.toLowerCase().includes(filterText.toLowerCase()) ||
      row.session_id?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const filteredQuizBank = quizBank.filter(
    (row) =>
      !filterText ||
      row.question?.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <Card
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={1.5}
          mb={2.5}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <UserCheck color="#f59e0b" size={22} />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '15px', sm: '18px' } }}>
              Cổng Kiểm Duyệt & Quản Trị Phòng Đấu
            </Typography>
          </Box>

          {isAuthed && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label="Đã Xác Thực" color="success" size="small" sx={{ height: 22, fontSize: 11 }} />
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => setIsAuthed(false)}
                startIcon={<Lock size={14} />}
                sx={{ textTransform: "none", fontSize: "12px" }}
              >
                Khóa cổng
              </Button>
            </Stack>
          )}
        </Box>

        {!isAuthed ? (
          <Paper
            sx={{
              p: { xs: 2.5, sm: 4 },
              bgcolor: "#0f172a",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary" mb={2} sx={{ fontSize: { xs: "13px", sm: "14px" } }}>
              Vui lòng nhập mật khẩu quản trị dành cho Giáo viên để xem nhật ký
              thao tác học tập, Ngân hàng câu hỏi trắc nghiệm & Quản lý điều hành
              phòng đấu trực tuyến Multiplayer.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setOpenModal(true)}
              startIcon={<Lock size={16} />}
              sx={{ fontWeight: "bold", textTransform: "none", fontSize: { xs: "13.5px", sm: "14.5px" } }}
            >
              Nhập Mật Khẩu Đăng Nhập
            </Button>
          </Paper>
        ) : (
          <Box>
            {/* SUB TABS & CONTROLS */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              flexWrap="wrap"
              gap={1}
            >
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.8}>
                <Button
                  size="small"
                  variant={subTab === "students" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => setSubTab("students")}
                  startIcon={<GraduationCap size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Sổ Học Sinh & Năng Lực
                </Button>
                <Button
                  size="small"
                  variant={subTab === "chat" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => {
                    setSubTab("chat");
                    fetchCurrentSubData("chat");
                  }}
                  startIcon={<MessageSquare size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Chat Logs AI
                </Button>
                <Button
                  size="small"
                  variant={subTab === "quiz" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => {
                    setSubTab("quiz");
                    fetchCurrentSubData("quiz");
                  }}
                  startIcon={<Brain size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Quiz Bank (Ngân hàng)
                </Button>
                <Button
                  size="small"
                  variant={subTab === "kahoot" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => setSubTab("kahoot")}
                  startIcon={<Radio size={14} />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                >
                  Quản Trị Phòng Đấu
                </Button>
              </Stack>

              {subTab !== "kahoot" && (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {subTab === "chat" && chatLogs.length > 0 && (
                    <>
                      <Button
                        size="small"
                        color="success"
                        variant="outlined"
                        onClick={handleExportChatLogsCSV}
                        startIcon={<Download size={14} />}
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                      >
                        Trích Xuất CSV (Excel)
                      </Button>
                      <Button
                        size="small"
                        color="info"
                        variant="outlined"
                        onClick={handleExportChatLogsJSON}
                        startIcon={<FileText size={14} />}
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                      >
                        Trích Xuất JSON
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={handleClearAllChatLogs}
                        startIcon={<Trash2 size={14} />}
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                      >
                        Xóa Toàn Bộ Chat Logs
                      </Button>
                    </>
                  )}
                  <Button
                    size="small"
                    onClick={() => fetchCurrentSubData()}
                    startIcon={<RefreshCw size={14} />}
                    sx={{ textTransform: "none" }}
                  >
                    Tải Lại CSDL
                  </Button>
                </Stack>
              )}
            </Box>

            {/* SEARCH FILTER BOX FOR CHAT / QUIZ */}
            {subTab !== "kahoot" && (
              <Box mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="🔍 Nhập từ khóa tìm kiếm (Tên hóa chất, Session ID, câu hỏi...)..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Box>
            )}

            {/* VIEW 0: STUDENT PROGRESS & COMPETENCY */}
            {subTab === "students" && (
              <Box sx={{ mt: 1 }}>
                <StudentProgressManager />
              </Box>
            )}

            {/* VIEW 1: CHAT LOGS */}
            {subTab === "chat" && (
              <Paper
                sx={{
                  bgcolor: "#0f172a",
                  borderRadius: 2,
                  overflowX: "auto",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                className="custom-scrollbar"
              >
                <Table size="small">
                  <TableHead sx={{ bgcolor: "#1e293b" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        Thời gian
                      </TableCell>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        Session ID
                      </TableCell>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", minWidth: 160 }}>
                        Câu hỏi Học sinh
                      </TableCell>
                      <TableCell sx={{ color: "#38bdf8", fontWeight: "bold", minWidth: 280 }}>
                        AI Trả lời
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredChatLogs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          align="center"
                          sx={{ color: "text.secondary", py: 3 }}
                        >
                          Chưa có dữ liệu nhật ký trò chuyện được ghi nhận.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredChatLogs.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell
                            sx={{
                              color: "text.secondary",
                              fontSize: "11px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {new Date(row.created_at).toLocaleString("vi-VN")}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "cyan",
                              fontSize: "11px",
                              fontFamily: "monospace",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.session_id || "N/A"}
                          </TableCell>
                          <TableCell
                            sx={{ color: "common.white", fontSize: "12px" }}
                          >
                            {row.user_message}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "text.secondary",
                              fontSize: "12px",
                              minWidth: 280,
                            }}
                          >
                            <Box
                              sx={{
                                "& h1, & h2, & h3, & h4": {
                                  color: "#38bdf8",
                                  fontWeight: "bold",
                                  fontSize: "13px",
                                  my: 0.5,
                                },
                                "& p": { my: 0.5 },
                                "& table": {
                                  width: "100%",
                                  borderCollapse: "collapse",
                                  my: 1,
                                  border: "1px solid rgba(255,255,255,0.1)",
                                },
                                "& th, & td": {
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  p: 0.8,
                                  textAlign: "left",
                                  fontSize: "11px",
                                },
                                "& th": {
                                  bgcolor: "#1e293b",
                                  color: "#f59e0b",
                                },
                                "& strong, & b": { color: "#fbbf24" },
                              }}
                              dangerouslySetInnerHTML={{
                                __html: formatMarkdownToHTML(
                                  row.ai_response || "",
                                ),
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Paper>
            )}

            {/* VIEW 2: QUIZ BANK */}
            {subTab === "quiz" && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip 
                      icon={<Sparkles size={14} />} 
                      label={`Ngân hàng: ${filteredQuizBank.length > 0 ? filteredQuizBank.length : PRESET_HIGH_SCHOOL_QUIZ_BANK.length} câu hỏi THPT`} 
                      color="warning" 
                      variant="outlined" 
                      size="small" 
                    />
                    <Chip 
                      label="Giảm tải AI 100% khi làm bài" 
                      color="success" 
                      size="small" 
                      sx={{ fontSize: '11px', height: 22 }} 
                    />
                  </Stack>

                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    startIcon={<Zap size={14} />}
                    onClick={handleSeed50PresetQuestions}
                    disabled={isLoading}
                    sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '12px' }}
                  >
                    ⚡ Nạp 50 Câu Hỏi THPT Chuẩn Vào CSDL
                  </Button>
                </Box>

                <Paper
                  sx={{
                    bgcolor: "#0f172a",
                    borderRadius: 2,
                    overflowX: "auto",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  className="custom-scrollbar"
                >
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#1e293b" }}>
                      <TableRow>
                        <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                          STT / Khối
                        </TableCell>
                        <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                          Nội dung Câu hỏi
                        </TableCell>
                        <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                          Đáp án Lựa chọn
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ color: "#f59e0b", fontWeight: "bold" }}
                        >
                          Đúng
                        </TableCell>
                        <TableCell sx={{ color: "#f59e0b", fontWeight: "bold" }}>
                          Lời Giải thích
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(filteredQuizBank.length > 0 ? filteredQuizBank : PRESET_HIGH_SCHOOL_QUIZ_BANK).map((row: any, idx: number) => (
                        <TableRow key={row.id || idx}>
                          <TableCell
                            sx={{
                              color: "text.secondary",
                              fontSize: "11px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            #{idx + 1} {row.grade ? `(Lớp ${row.grade})` : row.created_at ? new Date(row.created_at).toLocaleDateString("vi-VN") : '(THPT)'}
                          </TableCell>
                          <TableCell
                            sx={{
                              color: "common.white",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {row.question}
                          </TableCell>
                          <TableCell
                            sx={{ color: "text.secondary", fontSize: "11px" }}
                          >
                            {Array.isArray(row.options)
                              ? row.options.map((opt: string, i: number) => (
                                <div key={i}>
                                  <b>{["A", "B", "C", "D"][i]}.</b> {opt}
                                </div>
                              ))
                              : ""}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={
                                ["A", "B", "C", "D"][row.correct_index !== undefined ? row.correct_index : row.correctIndex] || "A"
                              }
                              color="success"
                              size="small"
                              sx={{ fontWeight: "bold" }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{ color: "text.secondary", fontSize: "11px" }}
                          >
                            {row.explanation}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            )}

            {/* VIEW 3: KAHOOT HOST PORTAL */}
            {subTab === "kahoot" && (
              <Paper
                sx={{
                  p: 3,
                  bgcolor: "#0f172a",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {gameStatus === "idle" ? (
                  <Box textAlign="center" py={3}>
                    <Radio color="#f59e0b" size={48} className="mx-auto mb-2" />
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="common.white"
                      mb={1}
                    >
                      Tạo Phòng Đấu Trắc Nghiệm Hóa Học (Bộ 10 Câu)
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={3}
                      maxWidth={500}
                      mx="auto"
                    >
                      Hệ thống tự động kết hợp câu hỏi bám sát SGK Hóa Học THPT chuẩn GDPT 2018, tự động lưu và đồng bộ kết quả.
                    </Typography>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                      mb={3}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Thời gian/câu:
                      </Typography>
                      <Select
                        size="small"
                        value={timerSec}
                        onChange={(e) => setTimerSec(e.target.value as number)}
                        sx={{
                          bgcolor: "#1e293b",
                          color: "#f59e0b",
                          fontWeight: "bold",
                        }}
                      >
                        <MenuItem value={10}>10 giây</MenuItem>
                        <MenuItem value={15}>15 giây</MenuItem>
                        <MenuItem value={20}>20 giây (Khuyên dùng)</MenuItem>
                        <MenuItem value={30}>30 giây</MenuItem>
                      </Select>
                    </Box>

                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleCreateKahootRoom}
                      startIcon={<PlusCircle size={16} />}
                      sx={{ fontWeight: "bold", py: 1.2, px: 4 }}
                    >
                      Khởi Tạo Mã Phòng Mới 🚀
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={2}
                      bgcolor="#1e293b"
                      borderRadius={2}
                      mb={3}
                    >
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          MÃ PIN PHÒNG ĐẤU LỚP:
                        </Typography>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          color="amber"
                          fontFamily="monospace"
                        >
                          {hostPin}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color={gameStatus === "finished" ? "secondary" : gameStatus === "active" ? "info" : "success"}
                          startIcon={<Play size={16} />}
                          disabled={gameStatus === "finished"}
                          onClick={async () => {
                            if (!hostPin) return;
                            try {
                              await supabase
                                .from("rooms")
                                .update({
                                  status: "active",
                                  current_question: 1,
                                })
                                .eq("room_pin", hostPin);
                              setGameStatus("active");
                            } catch (e: any) {
                              alert("Lỗi bắt đầu trận đấu: " + e.message);
                            }
                          }}
                          sx={{ fontWeight: "bold" }}
                        >
                          {gameStatus === "finished"
                            ? "🏁 TRẬN ĐẤU ĐÃ HOÀN THÀNH"
                            : gameStatus === "active"
                              ? "Đang Đấu (Trận đấu Đang Diễn Ra)"
                              : "Bắt Đầu Đấu (10 Câu)"}
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={async () => {
                            if (hostPin) {
                              // Save Kahoot leaderboard history to DB
                              const leaderData = {
                                room_pin: hostPin,
                                ended_at: new Date().toISOString(),
                                leaderboard: participants.sort(
                                  (a, b) => b.score - a.score,
                                ),
                              };
                              await supabase.from("experiments").upsert({
                                cache_key: `kahoot_history_${hostPin}_${Date.now()}`,
                                result_json: leaderData,
                              });
                              await supabase
                                .from("rooms")
                                .update({ status: "finished" })
                                .eq("room_pin", hostPin);
                            }
                            setGameStatus("idle");
                            fetchKahootHistory();
                          }}
                          startIcon={<StopCircle size={16} />}
                        >
                          Kết Thúc & Lưu BXH
                        </Button>
                      </Stack>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box
                          p={2}
                          bgcolor="#1e293b"
                          borderRadius={2}
                          height="100%"
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1.5}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              color="cyan"
                            >
                              👥 Học sinh đã tham gia
                            </Typography>
                            <Chip
                              label={`${participants.length} em`}
                              size="small"
                              color="primary"
                            />
                          </Box>

                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {participants.length === 0 ? (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Đang chờ học sinh nhập mã PIN vào phòng...
                              </Typography>
                            ) : (
                              participants.map((p) => (
                                <Chip
                                  key={p.id}
                                  label={p.nickname}
                                  color="secondary"
                                  variant="outlined"
                                  onClick={() => setSelectedStudent(p)}
                                  sx={{
                                    cursor: "pointer",
                                    "&:hover": {
                                      bgcolor: "rgba(217, 70, 239, 0.2)",
                                    },
                                  }}
                                />
                              ))
                            )}
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box
                          p={2}
                          bgcolor="#1e293b"
                          borderRadius={2}
                          height="100%"
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            color="amber"
                            mb={1.5}
                          >
                            🏆 Bảng Xếp Hạng & Chi Tiết Học Sinh (Click Xem Chi
                            Tiết)
                          </Typography>
                          <Stack spacing={1}>
                            {participants.map((p, idx) => {
                              const isCorrect = p.score > 0;
                              return (
                                <Box
                                  key={p.id}
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  p={1}
                                  bgcolor="#0f172a"
                                  borderRadius={1}
                                  onClick={() => setSelectedStudent(p)}
                                  sx={{
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                      bgcolor: "#1e293b",
                                      border: "1px solid #f59e0b",
                                    },
                                  }}
                                >
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <Typography
                                      variant="caption"
                                      fontWeight="bold"
                                      color={
                                        idx === 0 ? "amber" : "common.white"
                                      }
                                    >
                                      #{idx + 1} {p.nickname}
                                    </Typography>
                                    <Chip
                                      label={
                                        isCorrect
                                          ? "✓ Đúng (+10đ)"
                                          : "Chờ / Chưa chọn"
                                      }
                                      color={isCorrect ? "success" : "default"}
                                      size="small"
                                      sx={{ fontSize: "10px", height: 20 }}
                                    />
                                  </Box>
                                  <Button
                                    size="small"
                                    variant="text"
                                    color="warning"
                                    sx={{
                                      fontSize: "11px",
                                      textTransform: "none",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {p.score}đ ➔ Xem bài
                                  </Button>
                                </Box>
                              );
                            })}
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                    {/* ALL 10 MATCH QUESTIONS BREAKDOWN - SHOWN ONLY WHEN MATCH IS FINISHED */}
                    {gameStatus === "finished" ? (
                      <Box mt={3} p={2} bgcolor="#1e293b" borderRadius={2}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="cyan"
                          mb={1.5}
                        >
                          📊 Báo Cáo & Thống Kê Chi Tiết Đáp Án Học Sinh Chọn (Hoàn Thành Trận Đấu)
                        </Typography>
                        <Stack spacing={2}>
                          {quizBank.slice(0, 10).map((q, qIdx) => (
                            <Paper
                              key={q.id || qIdx}
                              sx={{
                                p: 2,
                                bgcolor: "#0f172a",
                                borderRadius: 2,
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="common.white"
                                mb={1.5}
                              >
                                Câu {qIdx + 1}: {q.question}
                              </Typography>

                              <Grid container spacing={1.5} mb={2}>
                                {Array.isArray(q.options) &&
                                  q.options.map((opt: string, optIdx: number) => {
                                    const isCorrectOpt =
                                      optIdx === q.correct_index;
                                    // Count students who picked this option
                                    const pickedStudents = participants.filter(
                                      (p) =>
                                        p.answers && p.answers[qIdx] === optIdx,
                                    );
                                    return (
                                      <Grid item xs={12} sm={6} key={optIdx}>
                                        <Box
                                          p={1}
                                          bgcolor={
                                            isCorrectOpt
                                              ? "rgba(16, 185, 129, 0.15)"
                                              : "rgba(255,255,255,0.03)"
                                          }
                                          borderRadius={1.5}
                                          border={`1px solid ${isCorrectOpt ? "#10b981" : "rgba(255,255,255,0.08)"}`}
                                        >
                                          <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={0.5}
                                          >
                                            <Typography
                                              variant="caption"
                                              color={
                                                isCorrectOpt
                                                  ? "#10b981"
                                                  : "common.white"
                                              }
                                              fontWeight="bold"
                                            >
                                              {["A", "B", "C", "D"][optIdx]}.{" "}
                                              {opt}{" "}
                                              {isCorrectOpt && "✓ (Đáp án chuẩn)"}
                                            </Typography>
                                            <Chip
                                              label={`${pickedStudents.length} học sinh`}
                                              size="small"
                                              color={
                                                isCorrectOpt
                                                  ? "success"
                                                  : pickedStudents.length > 0
                                                    ? "error"
                                                    : "default"
                                              }
                                              sx={{
                                                height: 20,
                                                fontSize: "10px",
                                                fontWeight: "bold",
                                              }}
                                            />
                                          </Box>
                                          {pickedStudents.length > 0 && (
                                            <Stack
                                              direction="row"
                                              spacing={0.5}
                                              flexWrap="wrap"
                                              mt={0.5}
                                            >
                                              {pickedStudents.map((p) => (
                                                <Chip
                                                  key={p.id}
                                                  label={p.nickname}
                                                  size="small"
                                                  variant="outlined"
                                                  color={
                                                    isCorrectOpt
                                                      ? "success"
                                                      : "error"
                                                  }
                                                  sx={{
                                                    height: 18,
                                                    fontSize: "9px",
                                                  }}
                                                />
                                              ))}
                                            </Stack>
                                          )}
                                        </Box>
                                      </Grid>
                                    );
                                  })}
                              </Grid>

                              {/* Unanswered / Pending count for this question */}
                              {(() => {
                                const pending = participants.filter(
                                  (p) =>
                                    !p.answers || p.answers[qIdx] === undefined,
                                );
                                if (pending.length === 0) return null;
                                return (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                  >
                                    ⏳ <b>{pending.length} em chưa chọn:</b>{" "}
                                    {pending.map((p) => p.nickname).join(", ")}
                                  </Typography>
                                );
                              })()}
                            </Paper>
                          ))}
                        </Stack>
                      </Box>
                    ) : null}
                  </Box>
                )}

                {/* HISTORICAL KAHOOT LEADERBOARDS SECTION - ALWAYS VISIBLE */}
                <Box mt={4} pt={2} borderTop="1px dashed rgba(255,255,255,0.1)">
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="amber"
                    mb={1.5}
                  >
                    📜 Lịch Sử Bảng Xếp Hạng Các Trận Đấu Đã Lưu CSDL
                  </Typography>
                  <Stack spacing={1.5}>
                    {kahootHistory.length === 0 ? (
                      <Typography variant="caption" color="text.secondary">
                        Chưa có lịch sử kết quả trận đấu nào được lưu.
                      </Typography>
                    ) : (
                      kahootHistory.map((h, i) => (
                        <Paper
                          key={i}
                          sx={{ p: 2, bgcolor: "#1e293b", borderRadius: 2 }}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              color="cyan"
                            >
                              🏆 Trận đấu PIN #{h.room_pin}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Thời gian:{" "}
                              {new Date(h.ended_at).toLocaleString("vi-VN")}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={2} flexWrap="wrap">
                            {h.leaderboard
                              ?.slice(0, 3)
                              .map((player: any, pIdx: number) => (
                                <Chip
                                  key={pIdx}
                                  label={`#${pIdx + 1} ${player.nickname}: ${player.score}đ`}
                                  color={
                                    pIdx === 0
                                      ? "warning"
                                      : pIdx === 1
                                        ? "primary"
                                        : "secondary"
                                  }
                                  size="small"
                                  sx={{ fontWeight: "bold" }}
                                />
                              ))}
                          </Stack>
                        </Paper>
                      ))
                    )}
                  </Stack>
                </Box>
              </Paper>
            )}
          </Box>
        )}

        {/* AUTH MODAL */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: "#0f172a", color: "amber" }}>
            Xác Thực Quyền Giáo Viên
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#0f172a" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={2}
            >
              Vui lòng nhập mật khẩu quản trị để truy cập cổng Kiểm Duyệt & Quản
              Trị Phòng Đấu
            </Typography>
            <TextField
              fullWidth
              type="password"
              size="small"
              label="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              error={errorMsg}
              helperText={errorMsg ? "Mật khẩu không chính xác!" : ""}
            />
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#0f172a" }}>
            <Button onClick={() => setOpenModal(false)}>Hủy</Button>
            <Button variant="contained" color="warning" onClick={handleVerify}>
              Xác Nhận
            </Button>
          </DialogActions>
        </Dialog>
        {/* STUDENT DETAIL MODAL */}
        <Dialog
          open={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ bgcolor: "#0f172a", color: "#38bdf8", fontWeight: "bold" }}
          >
            👤 Chi Tiết Bài Làm Học Sinh: {selectedStudent?.nickname} (Tổng
            điểm: {selectedStudent?.score}đ)
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#0f172a" }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Phân tích đáp án học sinh <b>{selectedStudent?.nickname}</b> đã
              chọn trên tất cả 10 câu hỏi của trận đấu:
            </Typography>

            <Stack spacing={2}>
              {(() => {
                const list = quizBank
                  .slice(0, 10)
                  .filter((_, qIdx) => gameStatus === 'finished' || (selectedStudent?.answers && selectedStudent.answers[qIdx] !== undefined));

                if (list.length === 0) {
                  return (
                    <Paper sx={{ p: 3, bgcolor: '#1e293b', textAlign: 'center', borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⏳ Học sinh <b>{selectedStudent?.nickname}</b> chưa thực hiện trả lời câu hỏi nào trong trận đấu này.
                      </Typography>
                    </Paper>
                  );
                }

                return list.map((q, qIdx) => {
                  const studentAnsIdx = selectedStudent?.answers
                    ? selectedStudent.answers[qIdx]
                    : undefined;
                  const isCorrect = studentAnsIdx === q.correct_index;
                  const hasAnswered = studentAnsIdx !== undefined;

                  return (
                    <Paper
                      key={q.id || qIdx}
                      sx={{
                        p: 2,
                        bgcolor: "#1e293b",
                        borderRadius: 2,
                        border: `1px solid ${isCorrect ? "#10b981" : hasAnswered ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="common.white"
                        >
                          Câu {qIdx + 1}: {q.question}
                        </Typography>
                        <Chip
                          label={
                            isCorrect
                              ? "✓ Trả lời Đúng (+10đ)"
                              : hasAnswered
                                ? `❌ Chọn sai (${["A", "B", "C", "D"][studentAnsIdx]})`
                                : "⏳ Chưa chọn"
                          }
                          color={
                            isCorrect
                              ? "success"
                              : hasAnswered
                                ? "error"
                                : "default"
                          }
                          size="small"
                          sx={{ fontWeight: "bold" }}
                        />
                      </Box>

                      <Grid container spacing={1} mt={1}>
                        {Array.isArray(q.options) &&
                          q.options.map((opt: string, optIdx: number) => {
                            const isCorrectOpt = optIdx === q.correct_index;
                            const isStudentOpt = optIdx === studentAnsIdx;

                            return (
                              <Grid item xs={12} sm={6} key={optIdx}>
                                <Box
                                  p={1}
                                  bgcolor={
                                    isStudentOpt
                                      ? isCorrectOpt
                                        ? "rgba(16, 185, 129, 0.25)"
                                        : "rgba(239, 68, 68, 0.25)"
                                      : isCorrectOpt
                                        ? "rgba(16, 185, 129, 0.1)"
                                        : "rgba(255,255,255,0.02)"
                                  }
                                  borderRadius={1}
                                  border={`1px solid ${isStudentOpt ? (isCorrectOpt ? "#10b981" : "#ef4444") : isCorrectOpt ? "rgba(16, 185, 129, 0.5)" : "rgba(255,255,255,0.05)"}`}
                                >
                                  <Typography
                                    variant="caption"
                                    color={
                                      isStudentOpt
                                        ? isCorrectOpt
                                          ? "#10b981"
                                          : "#f87171"
                                        : isCorrectOpt
                                          ? "#10b981"
                                          : "text.secondary"
                                    }
                                    fontWeight={
                                      isStudentOpt || isCorrectOpt
                                        ? "bold"
                                        : "normal"
                                    }
                                  >
                                    {["A", "B", "C", "D"][optIdx]}. {opt}{" "}
                                    {isStudentOpt && "👈 (Em đã chọn)"}{" "}
                                    {isCorrectOpt && "✓ (Đáp án chuẩn)"}
                                  </Typography>
                                </Box>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </Paper>
                  );
                });
              })()}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#0f172a" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedStudent(null)}
            >
              Đóng Xem Chi Tiết
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
