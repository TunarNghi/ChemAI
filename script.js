const GEMINI_API_KEYS_ENCODED = [
  "QVEuQWI4Uk42SWdTLUd4VUNVTlZWaGRTUUJzRE1RWHQwN2FWUDFsN0VvOWt0bUtHZGRiNWc=",
  "QVEuQWI4Uk42TDdQSUoyMHlPaDFmdjM1OGV5bVd3ajg5TzFDVFdYaklWUy1MRGdFZVpaeg==",
  "QVEuQWI4Uk42Sjh4N1RCTFV1N0s3TTlyRkZ4NXJ2VTBmNHJ0UkszeUhuSDQ4M25LQ0ZyalE=",
  "QVEuQWI4Uk42SzNLbW5ObVZFREdhbmVkMjhWaUxmQm9MMnNSSzlyNXQ5a0FYcGJOaEs3Ync="
];

function decodeApiKey(key) {
  try {
    return atob(key);
  } catch (e) {
    return key;
  }
}

const GEMINI_API_KEYS = GEMINI_API_KEYS_ENCODED.map(decodeApiKey);
const TEACHER_PASSWORD = "chemai2026";
let isTeacherAuthed = false;
let currentAuditSub = "chat";
let quizScore = 0;
let quizStreak = 0;
let currentHostPin = null;
let hostPollerInterval = null;
let hostTimerInterval = null;
let kahootQuestionsSet = [];
let hostCurrentQIndex = 0;
let hostSelectedSeconds = 20;
let joinedStudentPin = null;
let joinedStudentNick = null;
let joinedParticipantId = null;
let studentPollerInterval = null;
let studentTimerInterval = null;
let studentKahootScore = 0;
let currentKahootQuestionText = "";
let hasAnsweredCurrentKahootQ = false;
let currentStudentQObj = null;
let studentAnswersHistory = [];
const SUPABASE_URL = "https://cohutjbyyubjntqhjoao.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nGOAjDM4qBzmGHEz0RvkKw_CanWAI8C";
const supabaseClient = typeof window.supabase !== "undefined" && SUPABASE_URL && !SUPABASE_URL.includes("your-supabase") ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
const GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest"];
let reactionChartInstance = null;

const CHEMICAL_ELEMENTS = new Set([
  "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca",
  "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
  "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
  "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
  "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm",
  "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
]);

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeLatexChemistryExpression(expression) {
  return expression
    .replace(/\\ce\{((?:[^{}]|\{[^{}]*\})*)\}/g, "$1")
    .replace(/\\(?:mathrm|text)\{([^{}]*)\}/g, "$1")
    .replace(/\\left|\\right/g, "")
    .replace(/\\xrightarrow(?:\{[^{}]*\})?/g, "->")
    .replace(/\\(?:rightleftharpoons|leftrightharpoons)/g, "<=>")
    .replace(/\\(?:rightarrow|longrightarrow|to|arrow)/g, "->")
    .replace(/\\(?:quad|qquad|,|;|:|!)/g, " ")
    .replace(/\\(?:uparrow)/g, "↑")
    .replace(/\\(?:downarrow)/g, "↓")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\^?\\circ/g, "°")
    .replace(/\\cdot/g, "·")
    .replace(/\\equiv/g, "≡")
    .replace(/\\pm/g, "±")
    .replace(/\\bond\{([^{}]+)\}/g, "$1")
    .replace(/_\{([^{}]+)\}/g, (_, index) => /^\d+$/.test(index) ? index : "_" + index)
    .replace(/_([0-9])/g, "$1")
    .replace(/\^\{([^{}]+)\}/g, "^$1")
    .replace(/\^([0-9]*[+-])/g, "^$1")
    .replace(/[{}]/g, "")
    .trim();
}

function normalizeChemistryNotation(text) {
  const normalized = String(text)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, expression) => normalizeLatexChemistryExpression(expression))
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, expression) => normalizeLatexChemistryExpression(expression))
    .replace(/\$([^$\n]+)\$/g, (_, expression) => normalizeLatexChemistryExpression(expression));
  return normalized
    .replace(/\\ce\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, expression) => normalizeLatexChemistryExpression(expression))
    .replace(/\\(?:mathrm|text)\{([^{}]*)\}/g, "$1")
    .replace(/_\{([0-9]+)\}/g, "$1")
    .replace(/_([0-9]+)/g, "$1")
    .replace(/\^\{([0-9]*[+-])\}/g, "^$1")
    .replace(/\\(?:rightleftharpoons|leftrightharpoons)/g, "<=>")
    .replace(/\\(?:rightarrow|longrightarrow|to|arrow)/g, "->")
    .replace(/\\(?:quad|qquad|,|;|:|!)/g, " ")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\(?:uparrow)/g, "↑")
    .replace(/\\(?:downarrow)/g, "↓")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\^?\\circ/g, "°")
    .replace(/\\cdot/g, "·")
    .replace(/\\equiv/g, "≡")
    .replace(/\\pm/g, "±")
    .replace(/\\bond\{([^{}]+)\}/g, "$1")
    .replace(/\bDelta_([A-Za-z])/g, "Δ_$1")
    .replace(/\bAlpha-/gi, "α-")
    .replace(/\bBeta-/gi, "β-")
    .replace(/\bGamma-/gi, "γ-")
    .replace(/\^o(?=\d)/gi, "°");
}

function renderChemicalFormula(token) {
  let formula = token;
  let state = "";
  let charge = "";
  let hasOuterParentheses = false;

  const stateMatch = formula.match(/\((aq|s|l|g|dd|r|k)\)$/i);
  if (stateMatch) {
    state = stateMatch[0];
    formula = formula.slice(0, -state.length);
  }

  if (formula.startsWith("(") && formula.endsWith(")")) {
    hasOuterParentheses = true;
    formula = formula.slice(1, -1);
  }

  const explicitCharge = formula.match(/\^(\d*)([+-])$/);
  if (explicitCharge) {
    charge = (explicitCharge[1] || "") + explicitCharge[2];
    formula = formula.slice(0, -explicitCharge[0].length);
  } else {
    const simpleCharge = formula.match(/([+-])$/);
    if (simpleCharge) {
      charge = simpleCharge[1];
      formula = formula.slice(0, -1);
    }
  }

  const symbols = formula.match(/[A-Z][a-z]?/g) || [];
  if (!symbols.length || symbols.some(symbol => !CHEMICAL_ELEMENTS.has(symbol))) {
    return token;
  }
  if (/^[IVX]+$/.test(formula)) return token;
  if (symbols.length === 1 && !/\d/.test(formula) && !charge && !state && !/[()[\]]/.test(formula)) return token;

  // Fe3+ and Cu2+ use the trailing number as the ion charge. In NH4+, 4 remains a subscript.
  if (charge && symbols.length === 1) {
    const ionicCharge = formula.match(/^(?:\d+)?[A-Z][a-z]?(\d+)$/);
    if (ionicCharge) {
      charge = ionicCharge[1] + charge;
      formula = formula.slice(0, -ionicCharge[1].length);
    }
  }

  const coefficientMatch = formula.match(/^\d+/);
  const coefficient = coefficientMatch ? coefficientMatch[0] : "";
  const formulaBody = coefficient ? formula.slice(coefficient.length) : formula;
  const formattedBody = coefficient + formulaBody.replace(/(\d+)/g, "<sub>$1</sub>");
  const chargeHtml = charge ? "<sup>" + charge + "</sup>" : "";
  const formatted = hasOuterParentheses ? "(" + formattedBody + chargeHtml + ")" : formattedBody + chargeHtml;
  const stateHtml = state ? "<span class=\"chem-state\">" + state + "</span>" : "";
  return "<span class=\"chem-formula\">" + formatted + stateHtml + "</span>";
}

function splitMarkdownTableRow(line) {
  let row = line.trim();
  if (!row.includes("|")) return null;
  if (row.startsWith("|")) row = row.slice(1);
  if (row.endsWith("|") && !row.endsWith("\\|")) row = row.slice(0, -1);

  const cells = [];
  let cell = "";
  let inInlineCode = false;
  for (let index = 0; index < row.length; index++) {
    const character = row[index];
    if (character === "`" && row[index - 1] !== "\\") {
      inInlineCode = !inInlineCode;
    }
    if (character === "|" && row[index - 1] !== "\\" && !inInlineCode) {
      cells.push(cell.trim());
      cell = "";
      continue;
    }
    if (character === "\\" && row[index + 1] === "|") continue;
    cell += character;
  }
  cells.push(cell.trim());
  return cells;
}

function renderMarkdownTables(text) {
  const lines = String(text).split(/\r?\n/);
  const output = [];

  for (let lineIndex = 0; lineIndex < lines.length;) {
    const headerCells = splitMarkdownTableRow(lines[lineIndex]);
    const separatorCells = lineIndex + 1 < lines.length ? splitMarkdownTableRow(lines[lineIndex + 1]) : null;
    const isTable = headerCells && headerCells.length > 1 && separatorCells &&
      separatorCells.length === headerCells.length &&
      separatorCells.every(cell => /^:?-{3,}:?$/.test(cell.replace(/\s/g, "")));

    if (!isTable) {
      output.push(escapeHtml(lines[lineIndex]));
      lineIndex++;
      continue;
    }

    const alignments = separatorCells.map(cell => {
      const marker = cell.replace(/\s/g, "");
      if (marker.startsWith(":") && marker.endsWith(":")) return "text-center";
      if (marker.endsWith(":")) return "text-right";
      return "text-left";
    });
    const bodyRows = [];
    lineIndex += 2;
    while (lineIndex < lines.length) {
      const rowCells = splitMarkdownTableRow(lines[lineIndex]);
      if (!rowCells || rowCells.length !== headerCells.length) break;
      bodyRows.push(rowCells);
      lineIndex++;
    }

    const headHtml = headerCells.map((cell, index) =>
      "<th scope=\"col\" class=\"border-b border-slate-600 px-3 py-2 font-semibold text-cyan-300 " + alignments[index] + "\">" + escapeHtml(cell) + "</th>"
    ).join("");
    const bodyHtml = bodyRows.map(row =>
      "<tr class=\"transition-colors hover:bg-slate-800/70\">" + row.map((cell, index) =>
        "<td class=\"px-3 py-2 align-top text-slate-200 " + alignments[index] + "\">" + escapeHtml(cell) + "</td>"
      ).join("") + "</tr>"
    ).join("");
    output.push("<div class=\"my-3 overflow-x-auto rounded-lg border border-slate-700\"><table class=\"w-full border-collapse text-xs\"><thead class=\"bg-slate-800\"><tr>" + headHtml + "</tr></thead><tbody class=\"divide-y divide-slate-700 bg-slate-900/60\">" + bodyHtml + "</tbody></table></div>");
  }

  return output.join("\n");
}

// Escapes untrusted content first, then formats common chemistry notation and light Markdown.
function formatChemText(text) {
  if (text === null || text === undefined) return "";
  let formatted = renderMarkdownTables(normalizeChemistryNotation(text))
    .replace(/&lt;=&gt;/g, "⇌")
    .replace(/&lt;-&gt;/g, "⇌")
    .replace(/-&gt;/g, "→");

  formatted = formatted.replace(/(?<![\p{L}\p{N}_])([A-Za-zΔ])_([A-Za-z0-9]+)(?![\p{L}\p{N}_])/gu, "<span class=\"chem-indexed-symbol\">$1<sub>$2</sub></span>");
  formatted = formatted.replace(/(?<![\p{L}\p{N}_])([A-Za-z])°(\d{2,3})(?![\p{L}\p{N}_])/gu, "<span class=\"chem-indexed-symbol\">$1°<sub>$2</sub></span>");
  const formulaPattern = /(?<![\p{L}\p{N}_])(?:\d+)?(?:\[(?:[A-Z][a-z]?\d*|\([^()\s]+\)\d*)+\]|(?:[A-Z][a-z]?\d*|\([^()\s]+\)\d*)+)(?:\^\d*[+-]|[+-])?(?:\((?:aq|s|l|g|dd|r|k)\))?(?![\p{L}\p{N}_])/gu;
  formatted = formatted.replace(formulaPattern, renderChemicalFormula);
  formatted = formatted.replace(/(?<![\p{L}\p{N}_])([1-7][spdf])\^(\d{1,2})(?![\p{L}\p{N}_])/gu, "<span class=\"electron-config\">$1<sup>$2</sup></span>");
  formatted = formatted
    .replace(/^\s*#{1,3}\s+(.+)$/gm, "<strong class=\"block mt-2 text-cyan-200\">$1</strong>")
    .replace(/^\s*---+\s*$/gm, "<hr class=\"my-2 border-slate-600\">")
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/^\s*[*-]\s+/gm, "<span class=\"text-cyan-400 mr-1\">•</span>")
    .replace(/`([^`\n]+)`/g, "<code class=\"chem-inline-code\">$1</code>")
    .replace(/\r?\n/g, "<br>");
  return formatted;
}

function formatChemistryInElement(root) {
  if (!root) return;
  const textNodes = [];
  const collect = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) textNodes.push(walker.currentNode);
  };
  collect(root);

  textNodes.forEach(node => {
    if (!node.nodeValue || !node.nodeValue.trim() || !node.parentElement) return;
    if (node.parentElement.closest("script, style, textarea, select, option, code, .chem-formula, .chem-inline-code, [data-no-chem-format]")) return;
    const formatted = formatChemText(node.nodeValue);
    if (formatted === escapeHtml(node.nodeValue)) return;
    const template = document.createElement("template");
    template.innerHTML = formatted;
    node.replaceWith(template.content);
  });
}

function startGlobalChemistryFormatting() {
  if (!document.body) return;
  formatChemistryInElement(document.body);
  const observer = new MutationObserver(mutations => {
    observer.disconnect();
    const roots = new Set();
    mutations.forEach(mutation => {
      if (mutation.type === "characterData") roots.add(mutation.target);
      mutation.addedNodes.forEach(node => roots.add(node));
    });
    roots.forEach(formatChemistryInElement);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

function switchPeriodicTab(tab) {
  const btnElements = document.getElementById("tab-periodic-elements");
  const btnCompounds = document.getElementById("tab-periodic-compounds");
  const viewElements = document.getElementById("periodic-elements-view");
  const viewCompounds = document.getElementById("periodic-compounds-view");
  if (!btnElements || !btnCompounds || !viewElements || !viewCompounds) return;

  if (tab === "elements") {
    btnElements.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 text-white transition flex items-center gap-1.5";
    btnCompounds.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1.5";
    viewElements.classList.remove("hidden");
    viewCompounds.classList.add("hidden");
  } else {
    btnCompounds.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 text-white transition flex items-center gap-1.5";
    btnElements.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1.5";
    viewCompounds.classList.remove("hidden");
    viewElements.classList.add("hidden");
  }
}
const safetyData = [{
  name: "Axit Sunfuric (H₂SO₄)",
  formula: "H₂SO₄",
  hazard: "Ăn mòn cực mạnh, tỏa nhiệt dữ dội khi pha loãng, gây bỏng sâu",
  ir: "1220, 1050, 912, 580",
  ms: "98, 81, 80",
  icon: "fa-triangle-exclamation",
  color: "text-amber-400"
}, {
  name: "Axit Nitric (HNO₃)",
  formula: "HNO₃",
  hazard: "Axit oxi hóa mạnh, làm ố vàng da, hơi axit độc hại cho đường hô hấp",
  ir: "1326, 1303, 879",
  ms: "63, 46, 30",
  icon: "fa-biohazard",
  color: "text-amber-500"
}, {
  name: "Axit Clohiđric (HCl)",
  formula: "HCl",
  hazard: "Dung dịch ăn mòn, khí HCl bốc hơi gây kích ứng mắt và niêm mạc",
  ir: "2886",
  ms: "36, 38",
  icon: "fa-flask-vial",
  color: "text-yellow-400"
}, {
  name: "Natri Hiđroxit (NaOH)",
  formula: "NaOH",
  hazard: "Bazo mạnh (xút ăn da), gây bỏng nghiêm trọng và hỏng giác mạc",
  ir: "3630, 1640",
  ms: "Không áp dụng (chất ion không bay hơi)",
  icon: "fa-hand-dots",
  color: "text-red-400"
}, {
  name: "Khí Clo (Cl₂)",
  formula: "Cl₂",
  hazard: "Khí độc màu vàng lục gây ngạt, tổn thương phổi và hệ hô hấp",
  ir: "Không hấp thụ IR (phân tử đồng hạt nhân)",
  ms: "70, 72, 74",
  icon: "fa-skull-crossbones",
  color: "text-purple-400"
}, {
  name: "Khí Amoniac (NH₃)",
  formula: "NH₃",
  hazard: "Khí độc có mùi khai hắc, gây kích ứng mạnh mắt, mũi và bỏng hô hấp",
  ir: "3444, 3337, 1627, 950",
  ms: "17, 16, 15",
  icon: "fa-wind",
  color: "text-blue-400"
}, {
  name: "Khí Lưu huỳnh Điôxit (SO₂)",
  formula: "SO₂",
  hazard: "Khí độc hắc, gây mưa axit, kích ứng niêm mạc và đường hô hấp",
  ir: "1361, 1151, 519",
  ms: "64, 48, 32",
  icon: "fa-cloud-showers-heavy",
  color: "text-orange-400"
}, {
  name: "Khí Cacbon Monoxit (CO)",
  formula: "CO",
  hazard: "Khí độc không màu không mùi, liên kết mạnh với Hemoglobin gây ngạt tử vong",
  ir: "2143",
  ms: "28, 16, 12",
  icon: "fa-skull",
  color: "text-red-600"
}, {
  name: "Kali Pemanganat (KMnO₄)",
  formula: "KMnO₄",
  hazard: "Chất oxi hóa mạnh, để lại vết bẩn dai dẳng, nguy cơ cháy khi trộn chất hữu cơ",
  ir: "910, 840, 750",
  ms: "Không áp dụng (muối ion không bay hơi)",
  icon: "fa-atom",
  color: "text-purple-500"
}, {
  name: "Natri (Na)",
  formula: "Na",
  hazard: "Kim loại kiềm phản ứng mãnh liệt với nước, tự bùng cháy nổ",
  ir: "Không áp dụng (nguyên tử không có dao động phân tử)",
  ms: "23",
  icon: "fa-fire",
  color: "text-red-500"
}, {
  name: "Brom nguyên chất (Br₂)",
  formula: "Br₂",
  hazard: "Chất lỏng màu đỏ thẫm cực độc, gây bỏng rát da rất khó lành và độc hô hấp",
  ir: "Không hấp thụ IR (phân tử đồng hạt nhân)",
  ms: "158, 160, 162",
  icon: "fa-flask-skull",
  color: "text-red-400"
}, {
  name: "Bạc Nitrat (AgNO₃)",
  formula: "AgNO₃",
  hazard: "Gây bỏng hóa chất, biến thành vết đen khó rửa khi tiếp xúc ánh sáng",
  ir: "1384, 830, 720",
  ms: "Không áp dụng (muối ion không bay hơi)",
  icon: "fa-circle-exclamation",
  color: "text-slate-300"
}, {
  name: "Phenol (C₆H₅OH)",
  formula: "C₆H₅OH",
  hazard: "Độc tính cao, gây hoại tử da nặng khi tiếp xúc trực tiếp",
  ir: "3500-3200, 1595, 1490, 1220",
  ms: "94, 66, 65",
  icon: "fa-triangle-exclamation",
  color: "text-rose-400"
}, {
  name: "Đồng(II) Sunfat (CuSO₄)",
  formula: "CuSO₄",
  hazard: "Tinh thể màu xanh, độc với sinh vật thủy sinh, gây nôn mửa nếu nuốt phải",
  ir: "3400, 1100, 620",
  ms: "Không áp dụng (muối ion không bay hơi)",
  icon: "fa-gem",
  color: "text-cyan-400"
}, {
  name: "Ancol Etylic (C₂H₅OH)",
  formula: "C₂H₅OH",
  hazard: "Dễ cháy nổ khi đun nóng, ngọn lửa xanh khó phát hiện",
  ir: "3600-3200, 2970, 2930, 1050",
  ms: "31, 45, 46",
  icon: "fa-fire-flame-curved",
  color: "text-amber-300"
}];
function getChatSessionId() {
  let _0x492e6a = sessionStorage.getItem("chem_chat_session_id");
  if (!_0x492e6a) {
    _0x492e6a = "session_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
    sessionStorage.setItem("chem_chat_session_id", _0x492e6a);
  }
  return _0x492e6a;
}
async function generateParamHash(_0x152476, _0x12745b, _0x4480a9, _0x465970, _0x782757, _0xc6d470, _0x363c51, _0x33f65f) {
  const _0xe4a493 = _0x152476.toLowerCase().trim();
  const _0xd36c7c = _0x465970.toLowerCase().trim();
  let _0x2979cf = "";
  if (_0xe4a493 <= _0xd36c7c) {
    _0x2979cf = "A:" + _0xe4a493 + "|VA:" + _0x12745b + "|CA:" + _0x4480a9 + "|B:" + _0xd36c7c + "|VB:" + _0x782757 + "|CB:" + _0xc6d470 + "|T:" + _0x363c51 + "|IND:" + _0x33f65f;
  } else {
    _0x2979cf = "A:" + _0xd36c7c + "|VA:" + _0x782757 + "|CA:" + _0xc6d470 + "|B:" + _0xe4a493 + "|VB:" + _0x12745b + "|CB:" + _0x4480a9 + "|T:" + _0x363c51 + "|IND:" + _0x33f65f;
  }
  const _0x2c0fed = new TextEncoder().encode(_0x2979cf);
  const _0xae4972 = await crypto.subtle.digest("SHA-256", _0x2c0fed);
  const _0x2ddd49 = Array.from(new Uint8Array(_0xae4972));
  return _0x2ddd49.map(_0x31abfd => _0x31abfd.toString(16).padStart(2, "0")).join("");
}
function playBubbleSoundEffect() {
  try {
    const _0x22dad0 = window.AudioContext || window.webkitAudioContext;
    if (!_0x22dad0) {
      return;
    }
    const _0x37e8eb = new _0x22dad0();
    for (let _0xfde9c1 = 0; _0xfde9c1 < 6; _0xfde9c1++) {
      setTimeout(() => {
        const _0x11914e = _0x37e8eb.createOscillator();
        const _0x5e1a45 = _0x37e8eb.createGain();
        _0x11914e.type = "sine";
        _0x11914e.frequency.setValueAtTime(250 + Math.random() * 350, _0x37e8eb.currentTime);
        _0x5e1a45.gain.setValueAtTime(0.04, _0x37e8eb.currentTime);
        _0x5e1a45.gain.exponentialRampToValueAtTime(0.001, _0x37e8eb.currentTime + 0.12);
        _0x11914e.connect(_0x5e1a45);
        _0x5e1a45.connect(_0x37e8eb.destination);
        _0x11914e.start();
        _0x11914e.stop(_0x37e8eb.currentTime + 0.12);
      }, _0xfde9c1 * 180);
    }
  } catch (_0x19bc39) {
    console.log("Audio disabled");
  }
}
function speakPhenomenon() {
  let text = document.getElementById("res-phenomenon").innerText + " " + document.getElementById("res-hazard").innerText;
  if (!text || text.includes("Hãy bấm nút")) {
    return;
  }

  const chemDict = [
    { regex: /\b(H2SO4|H₂SO₄)\b/gi, phonetic: "a-xít sun-phu-ríc" },
    { regex: /\b(HNO3|HNO₃)\b/gi, phonetic: "a-xít ni-tríc" },
    { regex: /\b(HCl)\b/gi, phonetic: "a-xít clo-hi-đríc" },
    { regex: /\b(NaOH)\b/gi, phonetic: "na-tri hi-đrô-xít" },
    { regex: /\b(KOH)\b/gi, phonetic: "ka-li hi-đrô-xít" },
    { regex: /\b(CH3COOH|CH₃COOH)\b/gi, phonetic: "a-xít a-xê-tíc" },
    { regex: /\b(C2H5OH|C₂H₅OH)\b/gi, phonetic: "rượu ê-thi-líc" },
    { regex: /\b(C6H12O6|C₆H₁₂O₆)\b/gi, phonetic: "glu-cô-zơ" },
    { regex: /\b(AgNO3|AgNO₃)\b/gi, phonetic: "bạc ni-trát" },
    { regex: /\b(KMnO4|KMnO₄)\b/gi, phonetic: "ka-li pem-man-ga-nát" },
    { regex: /\b(CuSO4|CuSO₄)\b/gi, phonetic: "đồng hai sun-phát" },
    { regex: /\b(FeSO4|FeSO₄)\b/gi, phonetic: "sắt hai sun-phát" },
    { regex: /\b(H2O|H₂O)\b/gi, phonetic: "nước" },
    { regex: /\b(CO2|CO₂)\b/gi, phonetic: "khí cac-bo-níc" },
    { regex: /\b(SO2|SO₂)\b/gi, phonetic: "khí sun-phu-rơ" },
    { regex: /\b(NO2|NO₂)\b/gi, phonetic: "khí ni-tơ đi-ô-xít" },
    { regex: /\b(Cl2|Cl₂)\b/gi, phonetic: "khí clo" },
    { regex: /\b(O2|O₂)\b/gi, phonetic: "khí ô-xy" },
    { regex: /\b(H2|H₂)\b/gi, phonetic: "khí hi-đrô" },
    { regex: /\b(Zn)\b/g, phonetic: "kẽm" },
    { regex: /\b(Fe)\b/g, phonetic: "sắt" },
    { regex: /\b(Cu)\b/g, phonetic: "đồng" },
    { regex: /\b(Na)\b/g, phonetic: "na-tri" },
    { regex: /\b(K)\b/g, phonetic: "ka-li" },
    { regex: /\b(Al)\b/g, phonetic: "nhôm" },
    { regex: /\b(Ag)\b/g, phonetic: "bạc" }
  ];

  chemDict.forEach(item => {
    text = text.replace(item.regex, item.phonetic);
  });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Trình duyệt của bạn chưa hỗ trợ tính năng đọc giọng nói.");
  }
}
function filterPresetsByGrade() {
  const _0x3452c6 = document.getElementById("gradeFilter").value;
  const _0x56e440 = document.querySelectorAll("#preset-list button");
  _0x56e440.forEach(_0x2f4e59 => {
    const _0x51c7b6 = _0x2f4e59.getAttribute("data-grade");
    if (_0x3452c6 === "all") {
      _0x2f4e59.classList.remove("hidden");
    } else if (_0x3452c6 === _0x51c7b6) {
      _0x2f4e59.classList.remove("hidden");
    } else {
      _0x2f4e59.classList.add("hidden");
    }
  });
}
async function callGeminiAPI(prompt, keys = GEMINI_API_KEYS) {
  const keyList = Array.isArray(keys) ? keys : (typeof keys === "string" ? [keys] : GEMINI_API_KEYS);
  let lastError = null;

  for (const apiKey of keyList) {
    for (const model of GEMINI_MODELS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      try {
        const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey;
        const response = await fetch(url, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const apiMessage = data.error && data.error.message ? data.error.message : "HTTP " + response.status;
          const error = new Error(apiMessage);
          error.status = response.status;
          throw error;
        }
        if (!data.candidates || !data.candidates[0]) {
          const blockReason = data.promptFeedback && data.promptFeedback.blockReason;
          throw new Error(blockReason ? "Yêu cầu bị chặn: " + blockReason : "Gemini không trả về nội dung.");
        }

        const parts = data.candidates[0].content.parts;
        let resultText = "";
        for (let i = parts.length - 1; i >= 0; i--) {
          if (parts[i].text) {
            resultText = parts[i].text;
            break;
          }
        }
        if (resultText) {
          console.log("Gemini đã phản hồi bằng model: " + model);
          return resultText;
        }
      } catch (err) {
        lastError = err.name === "AbortError" ? new Error("Gemini phản hồi quá thời gian 30 giây.") : err;
        console.warn("Model " + model + " thất bại:", lastError.message);
        const keyUnavailable = err.status === 403 || err.status === 429 || /api key|quota|permission/i.test(err.message);
        if (keyUnavailable) break;
      } finally {
        clearTimeout(timeoutId);
      }
    }
  }
  throw lastError || new Error("Tất cả API keys và mô hình Gemini không khả dụng.");
}
function renderSafety(_0x38bfaf) {
  const _0x4262f3 = document.getElementById("safety-grid");
  if (!_0x4262f3) {
    return;
  }
  _0x4262f3.innerHTML = _0x38bfaf.map(_0xc49b83 => "\n                <div class=\"bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-start space-x-3 hover:border-slate-600 transition\">\n                    <i class=\"fa-solid " + (_0xc49b83.icon || "fa-triangle-exclamation") + " " + (_0xc49b83.color || "text-amber-400") + " text-2xl mt-1\"></i>\n                    <div class=\"min-w-0 flex-1\">\n                        <h4 class=\"font-bold text-white text-sm\">" + formatChemText(_0xc49b83.name) + "</h4>\n                        <span class=\"text-xs font-mono text-cyan-400 font-semibold\">" + formatChemText(_0xc49b83.formula) + "</span>\n                        <p class=\"text-xs text-slate-300 mt-1\">" + formatChemText(_0xc49b83.hazard) + "</p>\n                        <div class=\"mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2\">\n                            <div class=\"rounded-lg border border-slate-700 bg-slate-900/70 p-2\">\n                                <span class=\"block text-[10px] font-bold uppercase text-cyan-400\">Phổ IR (cm⁻¹)</span>\n                                <span class=\"mt-0.5 block break-words font-mono text-[11px] text-slate-200\">" + formatChemText(_0xc49b83.ir || "Chưa có dữ liệu") + "</span>\n                            </div>\n                            <div class=\"rounded-lg border border-slate-700 bg-slate-900/70 p-2\">\n                                <span class=\"block text-[10px] font-bold uppercase text-cyan-400\">Phổ MS (m/z)</span>\n                                <span class=\"mt-0.5 block break-words font-mono text-[11px] text-slate-200\">" + formatChemText(_0xc49b83.ms || "Chưa có dữ liệu") + "</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ").join("");
}
function switchTab(_0x2ca658) {
  if (_0x2ca658 === "audit" && !isTeacherAuthed) {
    openTeacherPassModal();
    return;
  }
  ["lab", "tutor", "quiz", "safety", "audit"].forEach(_0x2246cc => {
    const _0x46b1d2 = document.getElementById("content-" + _0x2246cc);
    const _0xfef9ba = document.getElementById("tab-" + _0x2246cc);
    if (_0x46b1d2) {
      _0x46b1d2.classList.add("hidden");
    }
    if (_0xfef9ba) {
      _0xfef9ba.className = _0x2246cc === "audit" ? "px-3.5 py-2 rounded-lg text-sm font-medium transition text-amber-400 hover:bg-slate-700 border border-amber-500/30" : "px-3.5 py-2 rounded-lg text-sm font-medium transition text-slate-300 hover:bg-slate-700";
    }
  });
  const _0x22ba4a = document.getElementById("content-" + _0x2ca658);
  const _0x5b08d4 = document.getElementById("tab-" + _0x2ca658);
  if (_0x22ba4a) {
    _0x22ba4a.classList.remove("hidden");
  }
  if (_0x5b08d4) {
    _0x5b08d4.className = "px-3.5 py-2 rounded-lg text-sm font-medium transition bg-cyan-600 text-white";
  }
  if (_0x2ca658 === "quiz") {
    generateAIQuiz();
  }
  if (_0x2ca658 === "audit") {
    fetchCurrentAuditData();
  }
}
function switchAuditSub(_0xcf103e) {
  currentAuditSub = _0xcf103e;
  const _0x2c5d3b = document.getElementById("audit-sub-chat");
  const _0x2902e6 = document.getElementById("audit-sub-quiz");
  const _0x2de6da = document.getElementById("audit-sub-kahoot");
  const _0x37c2db = document.getElementById("audit-view-chat");
  const _0x1665d0 = document.getElementById("audit-view-quiz");
  const _0x398286 = document.getElementById("audit-view-kahoot");
  const _0x130681 = document.getElementById("audit-filter-box");
  _0x2c5d3b.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition";
  _0x2902e6.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition";
  _0x2de6da.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition";
  _0x37c2db.classList.add("hidden");
  _0x1665d0.classList.add("hidden");
  _0x398286.classList.add("hidden");
  _0x130681.classList.remove("hidden");
  if (_0xcf103e === "chat") {
    _0x2c5d3b.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 transition";
    _0x37c2db.classList.remove("hidden");
  } else if (_0xcf103e === "quiz") {
    _0x2902e6.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 transition";
    _0x1665d0.classList.remove("hidden");
  } else if (_0xcf103e === "kahoot") {
    _0x2de6da.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 transition";
    _0x398286.classList.remove("hidden");
    _0x130681.classList.add("hidden");
  }
  fetchCurrentAuditData();
}
function fetchCurrentAuditData() {
  if (currentAuditSub === "chat") {
    fetchAuditLogs();
  } else if (currentAuditSub === "quiz") {
    fetchAuditQuizLogs();
  }
}
function filterAuditTable() {
  const _0x15a8a1 = document.getElementById("audit-filter-input").value.toLowerCase();
  const _0x63cfca = currentAuditSub === "chat" ? "chat-audit-table" : "quiz-audit-table";
  const _0x4f7586 = document.querySelectorAll("#" + _0x63cfca + " tbody tr");
  _0x4f7586.forEach(_0x599b8f => {
    const _0x384c9c = _0x599b8f.innerText.toLowerCase();
    if (_0x384c9c.includes(_0x15a8a1)) {
      _0x599b8f.classList.remove("hidden");
    } else {
      _0x599b8f.classList.add("hidden");
    }
  });
}
function openTeacherPassModal() {
  document.getElementById("teacher-password-input").value = "";
  document.getElementById("teacher-pass-error").classList.add("hidden");
  document.getElementById("teacher-pass-modal").classList.remove("hidden");
  setTimeout(() => document.getElementById("teacher-password-input").focus(), 100);
}
function closeTeacherPassModal() {
  document.getElementById("teacher-pass-modal").classList.add("hidden");
}
function verifyTeacherPassword() {
  const _0x525bd7 = document.getElementById("teacher-password-input").value.trim();
  const _0x54a2cf = document.getElementById("teacher-pass-error");
  if (_0x525bd7 === TEACHER_PASSWORD) {
    isTeacherAuthed = true;
    closeTeacherPassModal();
    switchTab("audit");
  } else {
    _0x54a2cf.classList.remove("hidden");
  }
}
function lockAuditPortal() {
  isTeacherAuthed = false;
  switchTab("lab");
}
function openPeriodicModal() {
  document.getElementById("periodic-modal").classList.remove("hidden");
}
function closePeriodicModal() {
  document.getElementById("periodic-modal").classList.add("hidden");
}
function selectElement(_0x223148) {
  document.getElementById("inputA").value = _0x223148;
  closePeriodicModal();
}
function updateReactionChart(_0x25e19d, _0x204c7f) {
  const _0x44986d = document.getElementById("reactionChart").getContext("2d");
  if (reactionChartInstance) {
    reactionChartInstance.destroy();
  }
  const _0x38f64e = parseFloat(_0x25e19d) || 7;
  const _0x8cb385 = [1, 1.5, 2, 3.5, _0x38f64e, Math.min(14, _0x38f64e + 0.5), Math.min(14, _0x38f64e + 1)];
  reactionChartInstance = new Chart(_0x44986d, {
    type: "line",
    data: {
      labels: ["0ml", "20ml", "40ml", "60ml", "Đương lượng", "100ml", "120ml"],
      datasets: [{
        label: "Đường cong Chuẩn độ pH",
        data: _0x8cb385,
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.15)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#38bdf8"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.08)"
          },
          ticks: {
            color: "#94a3b8",
            font: {
              size: 10
            }
          }
        },
        y: {
          min: 0,
          max: 14,
          grid: {
            color: "rgba(255, 255, 255, 0.08)"
          },
          ticks: {
            color: "#94a3b8",
            font: {
              size: 10
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: "#e2e8f0",
            font: {
              size: 11
            }
          }
        }
      }
    }
  });
}
function loadReaction(_0x3f9290, _0x837f90, _0x55c689, _0x1dee3b, _0x564e07, _0x1a9750, _0x21f6ed, _0x1764f3) {
  document.getElementById("inputA").value = _0x3f9290;
  document.getElementById("volA").value = _0x837f90;
  document.getElementById("concA").value = _0x55c689;
  document.getElementById("inputB").value = _0x1dee3b;
  document.getElementById("volB").value = _0x564e07;
  document.getElementById("concB").value = _0x1a9750;
  document.getElementById("tempRange").value = _0x21f6ed;
  document.getElementById("tempVal").innerText = _0x21f6ed + " °C";
  document.getElementById("indicatorSelect").value = _0x1764f3 || "none";
  runCustomReaction();
}
function applyKineticAnimationSpeed(_0x474fb3) {
  const _0x5515bd = Math.max(0.3, 1 - (_0x474fb3 - 25) * 0.012);
  document.documentElement.style.setProperty("--anim-speed", _0x5515bd * 2 + "s");
  document.documentElement.style.setProperty("--skitter-speed", _0x5515bd * 2.8 + "s");
  document.documentElement.style.setProperty("--dissolve-speed", _0x5515bd * 4.5 + "s");
}
function renderReactionUI(_0x5d7a07, _0x8eef27, _0x533a1e, _0x117087, _0x5641e0, _0x25c64f, _0x3d2a8b) {
  const _0x310e8f = _0x117087 + _0x5641e0;
  document.getElementById("res-equation").innerHTML = formatChemText(_0x5d7a07.eq);
  document.getElementById("res-phenomenon").innerHTML = formatChemText(_0x5d7a07.phenomenon);
  document.getElementById("res-stoichiometry").innerHTML = _0x5d7a07.stoichiometry;
  formatChemistryInElement(document.getElementById("res-stoichiometry"));
  document.getElementById("res-hazard").innerHTML = formatChemText(_0x5d7a07.hazard);
  document.getElementById("ph-value").innerText = _0x5d7a07.phEstimate || "7.0";
  applyKineticAnimationSpeed(_0x25c64f);
  updateReactionChart(_0x5d7a07.phEstimate, _0x25c64f);
  const _0x35d523 = document.getElementById("wall-coating");
  const _0x1855e5 = document.getElementById("fume-layer");
  const _0x2312c1 = document.getElementById("solid-rod");
  const _0x3b8f26 = document.getElementById("upper-liquid");
  const _0x27a680 = document.getElementById("surface-spark");
  const _0x338b5b = document.getElementById("precipitate");
  const _0x914405 = document.getElementById("gas-layer");
  const _0x4d19a4 = document.getElementById("phenomena-badges");
  const _0x2e28f0 = document.getElementById("liquid");
  _0x914405.innerHTML = "";
  _0x1855e5.innerHTML = "";
  _0x4d19a4.innerHTML = "";
  _0x2e28f0.style.backgroundColor = _0x5d7a07.liquidColor || "rgba(59, 130, 246, 0.3)";
  let _0x158fb9 = "";
  if (_0x5d7a07.isSilverMirror || _0x8eef27.toLowerCase().includes("c6h12o6") && _0x533a1e.toLowerCase().includes("agno3")) {
    _0x35d523.className = "absolute inset-0 pointer-events-none rounded-b-3xl transition-all duration-1000 bg-gradient-to-r from-slate-200/50 via-white/90 to-slate-300/50 border-2 border-slate-100 shadow-[inset_0_0_20px_rgba(255,255,255,0.9)] opacity-100 z-20";
    _0x158fb9 += "<span class=\"bg-cyan-950 text-cyan-300 text-[11px] px-2.5 py-1 rounded-full border border-cyan-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-wand-magic-sparkles text-amber-300\"></i> Tráng bạc thành cốc</span>";
  } else {
    _0x35d523.className = "absolute inset-0 pointer-events-none rounded-b-3xl border-transparent opacity-0 z-20";
  }
  if (_0x5d7a07.hasFume || _0x8eef27.toLowerCase().includes("hno3") || _0x533a1e.toLowerCase().includes("hno3") || _0x8eef27.toLowerCase().includes("kmno4")) {
    const _0x108914 = _0x5d7a07.fumeColor || (_0x8eef27.toLowerCase().includes("hno3") ? "rgba(180, 83, 9, 0.8)" : "rgba(255, 255, 255, 0.7)");
    for (let _0x4f340e = 0; _0x4f340e < 4; _0x4f340e++) {
      let _0x3840af = document.createElement("div");
      _0x3840af.className = "fume-particle";
      _0x3840af.style.width = Math.random() * 25 + 20 + "px";
      _0x3840af.style.height = _0x3840af.style.width;
      _0x3840af.style.backgroundColor = _0x108914;
      _0x3840af.style.left = Math.random() * 60 + 20 + "%";
      _0x3840af.style.animationDelay = Math.random() * 1.2 + "s";
      _0x1855e5.appendChild(_0x3840af);
    }
    _0x158fb9 += "<span class=\"bg-amber-950 text-amber-300 text-[11px] px-2.5 py-1 rounded-full border border-amber-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-smog text-amber-400\"></i> Khí/Khói bốc lên</span>";
  }
  const _0x4db99b = _0x5d7a07.isDissolving || ["zn", "fe", "mg", "al"].includes(_0x8eef27.toLowerCase()) && (_0x533a1e.toLowerCase().includes("h2so4") || _0x533a1e.toLowerCase().includes("hcl") || _0x533a1e.toLowerCase().includes("naoh"));
  if (_0x5d7a07.hasSolidRod || _0x4db99b || _0x8eef27.toLowerCase() === "fe" && _0x533a1e.toLowerCase().includes("cuso4")) {
    _0x2312c1.classList.remove("hidden");
    if (_0x4db99b) {
      _0x2312c1.className = "absolute top-6 left-1/2 -translate-x-1/2 w-3.5 rounded-t-sm shadow-md z-15 border border-slate-500 bg-slate-400 dissolve-rod";
      _0x158fb9 += "<span class=\"bg-amber-950 text-amber-300 text-[11px] px-2.5 py-1 rounded-full border border-amber-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-cloud-arrow-down text-amber-400\"></i> Kim loại tan dần</span>";
    } else {
      _0x2312c1.className = "absolute top-6 left-1/2 -translate-x-1/2 w-3.5 h-36 rounded-t-sm shadow-md z-15 border border-slate-500";
      _0x2312c1.style.backgroundColor = _0x5d7a07.solidRodColor || "#b91c1c";
      _0x158fb9 += "<span class=\"bg-rose-950 text-rose-300 text-[11px] px-2.5 py-1 rounded-full border border-rose-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-cubes text-rose-400\"></i> Đổi màu kim loại</span>";
    }
  } else {
    _0x2312c1.classList.add("hidden");
  }
  if (_0x5d7a07.isImmiscible || _0x8eef27.toLowerCase().includes("ch3cooh") && _0x533a1e.toLowerCase().includes("c2h5oh")) {
    _0x3b8f26.style.height = "35%";
    _0x3b8f26.style.backgroundColor = _0x5d7a07.upperLiquidColor || "rgba(254, 240, 138, 0.6)";
    _0x158fb9 += "<span class=\"bg-yellow-950 text-yellow-300 text-[11px] px-2.5 py-1 rounded-full border border-yellow-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-layer-group text-yellow-400\"></i> Tách 2 lớp dầu</span>";
  } else {
    _0x3b8f26.style.height = "0px";
  }
  if (_0x5d7a07.surfaceSpark || _0x8eef27.toLowerCase() === "na" || _0x533a1e.toLowerCase() === "na") {
    _0x27a680.classList.remove("hidden");
    _0x158fb9 += "<span class=\"bg-amber-950 text-amber-300 text-[11px] px-2.5 py-1 rounded-full border border-amber-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-circle text-amber-200\"></i> Na vo tròn chạy nhảy</span>";
    _0x158fb9 += "<span class=\"bg-red-950 text-red-300 text-[11px] px-2.5 py-1 rounded-full border border-red-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-bolt text-yellow-300\"></i> Lóe sáng bề mặt</span>";
  } else {
    _0x27a680.classList.add("hidden");
  }
  if (_0x3d2a8b === "phenolphthalein" && (_0x5d7a07.phEstimate.includes("Bazo") || _0x5d7a07.phEstimate.includes("13") || _0x5d7a07.phEstimate.includes("12") || _0x5d7a07.phEstimate.includes("11") || _0x8eef27.toLowerCase() === "na")) {
    _0x2e28f0.style.backgroundColor = "rgba(236, 72, 153, 0.75)";
    _0x158fb9 += "<span class=\"bg-pink-950 text-pink-300 text-[11px] px-2.5 py-1 rounded-full border border-pink-700/60 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-palette text-pink-400\"></i> Đổi màu hồng Phenolphthalein</span>";
  }
  if (_0x5d7a07.precipitate) {
    _0x338b5b.style.height = (_0x5d7a07.precipitateHeightPct || 12) + "%";
    _0x338b5b.style.backgroundColor = _0x5d7a07.precipitateColor || "#ffffff";
    _0x338b5b.className = "w-full precipitate-effect rounded-b-2xl z-20";
    _0x158fb9 += "<span class=\"bg-slate-700/80 text-amber-300 text-[11px] px-2.5 py-1 rounded-full border border-amber-500/40 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-snowflake text-amber-200\"></i> Kết tủa lắng</span>";
  } else {
    _0x338b5b.style.height = "0px";
    _0x338b5b.style.backgroundColor = "transparent";
  }
  if (_0x5d7a07.bubbles || _0x8eef27.toLowerCase() === "na" || _0x533a1e.toLowerCase() === "na" || ["zn", "fe", "mg", "al"].includes(_0x8eef27.toLowerCase())) {
    playBubbleSoundEffect();
    const _0x498c22 = _0x5d7a07.bubbleIntensity || 10;
    for (let _0x52a97 = 0; _0x52a97 < _0x498c22; _0x52a97++) {
      let _0x558d4a = document.createElement("div");
      _0x558d4a.className = "bubble";
      _0x558d4a.style.width = Math.random() * 8 + 4 + "px";
      _0x558d4a.style.height = _0x558d4a.style.width;
      _0x558d4a.style.left = Math.random() * 80 + 10 + "%";
      _0x558d4a.style.animationDelay = Math.random() * 1.5 + "s";
      _0x914405.appendChild(_0x558d4a);
    }
    _0x158fb9 += "<span class=\"bg-slate-700/80 text-blue-300 text-[11px] px-2.5 py-1 rounded-full border border-blue-500/40 font-medium shadow flex items-center gap-1\"><i class=\"fa-solid fa-wind text-blue-300\"></i> Sủi bọt khí H₂</span>";
  }
  _0x4d19a4.innerHTML = _0x158fb9;
}
async function runCustomReaction() {
  const _0x3a8f77 = document.getElementById("inputA").value.trim();
  const _0x549dc8 = parseFloat(document.getElementById("volA").value) || 50;
  const _0x9eb6b3 = parseFloat(document.getElementById("concA").value) || 1;
  const _0x3d0d59 = document.getElementById("inputB").value.trim();
  const _0x4829d7 = parseFloat(document.getElementById("volB").value) || 50;
  const _0x5b7d48 = parseFloat(document.getElementById("concB").value) || 1;
  const _0x36ad68 = parseInt(document.getElementById("tempRange").value) || 25;
  const _0x37561c = document.getElementById("indicatorSelect").value;
  const _0x4d682b = document.getElementById("beaker-status");
  const _0x2c8746 = document.getElementById("flame-box");
  const _0x54385e = _0x549dc8 + _0x4829d7;
  if (!_0x3a8f77 || !_0x3d0d59) {
    alert("Vui lòng nhập đầy đủ thông tin hóa chất!");
    return;
  }
  const _0x3f3148 = Math.min(95, Math.max(15, _0x54385e / 250 * 100));
  const _0x1b4aad = document.getElementById("liquid");
  _0x1b4aad.style.height = _0x3f3148 + "%";
  if (_0x36ad68 > 40) {
    _0x2c8746.classList.remove("hidden");
  } else {
    _0x2c8746.classList.add("hidden");
  }
  const _0x1aeea1 = await generateParamHash(_0x3a8f77, _0x549dc8, _0x9eb6b3, _0x3d0d59, _0x4829d7, _0x5b7d48, _0x36ad68, _0x37561c);
  const _0x2b8ef1 = localStorage.getItem(_0x1aeea1);
  if (_0x2b8ef1) {
    try {
      const _0x3336a7 = JSON.parse(_0x2b8ef1);
      renderReactionUI(_0x3336a7, _0x3a8f77, _0x3d0d59, _0x549dc8, _0x4829d7, _0x36ad68, _0x37561c);
      _0x4d682b.innerText = "⚡ Tải từ Trình duyệt (Hash: " + _0x1aeea1.substring(0, 8) + "...) | Thể tích: " + _0x54385e + " ml (" + _0x36ad68 + "°C)";
      return;
    } catch (_0x533d9f) {
      localStorage.removeItem(_0x1aeea1);
    }
  }
  if (supabaseClient) {
    try {
      _0x4d682b.innerText = "🔍 Tra cứu SHA-256 Hash trong Supabase...";
      const {
        data: _0x359230,
        error: _0x5985b5
      } = await supabaseClient.from("experiments").select("result_json").eq("cache_key", _0x1aeea1).maybeSingle();
      if (_0x359230 && _0x359230.result_json) {
        localStorage.setItem(_0x1aeea1, JSON.stringify(_0x359230.result_json));
        renderReactionUI(_0x359230.result_json, _0x3a8f77, _0x3d0d59, _0x549dc8, _0x4829d7, _0x36ad68, _0x37561c);
        _0x4d682b.innerText = "🗄️ Tải từ Supabase Database (Hash: " + _0x1aeea1.substring(0, 8) + "...) | Thể tích: " + _0x54385e + " ml (" + _0x36ad68 + "°C)";
        return;
      }
    } catch (_0x352241) {
      console.warn("⚠️ Bỏ qua Supabase DB, chuyển sang Gemini AI:", _0x352241);
    }
  }
  _0x4d682b.innerText = "ChemAIBuddy đang tính toán phản ứng THPT (" + _0x54385e + " ml | " + _0x36ad68 + "°C)...";
  document.getElementById("res-equation").innerText = "Đang tính toán...";
  document.getElementById("res-phenomenon").innerText = "ChemAIBuddy đang xử lý hiện tượng...";
  document.getElementById("res-stoichiometry").innerHTML = "<div class=\"text-slate-400 italic\">Đang tính toán số mol và nồng độ...</div>";
  const _0x32e8a7 = "Phân tích định lượng phản ứng Hóa học THPT:\n- Chất A: " + _0x3a8f77 + " (" + _0x549dc8 + " ml, nồng độ " + _0x9eb6b3 + " M)\n- Chất B: " + _0x3d0d59 + " (" + _0x4829d7 + " ml, nồng độ " + _0x5b7d48 + " M)\n- Nhiệt độ: " + _0x36ad68 + " °C\n- Chất chỉ thị sử dụng: " + _0x37561c + "\n\nTrả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):\n{\n  \"eq\": \"Phương trình hóa học đầy đủ có cân bằng\",\n  \"phenomenon\": \"Mô tả ngắn gọn hiện tượng nhận biết (kèm theo sự đổi màu của chất chỉ thị " + _0x37561c + " nếu có)\",\n  \"phEstimate\": \"Giá trị pH ước tính dung dịch sau phản ứng (ví dụ: 1.5 - Axit mạnh hoặc 7.0 - Trung tính hoặc 12.5 - Bazo)\",\n  \"stoichiometry\": \"<div class='space-y-1.5 text-xs'><div class='flex flex-wrap gap-2 mb-1'><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Chất A) = ... mol</span><span class='bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50 font-mono'>n(Chất B) = ... mol</span></div><div class='text-slate-300'>• <b>Tỉ lệ & Phản ứng:</b> ...</div><div class='text-slate-300'>• <b>Sản phẩm:</b> ...</div><div class='text-emerald-400 font-medium'>• <b>Nồng độ C<sub>M</sub> sau phản ứng:</b> ...</div></div>\",\n  \"liquidColor\": \"Mã màu rgba đại diện cho dung dịch (phụ thuộc vào tính chất chỉ thị " + _0x37561c + " và pH sau phản ứng)\",\n  \"isSilverMirror\": true nếu đây là phản ứng tráng bạc thành cốc ngược lại false,\n  \"isDissolving\": true nếu có thanh/viên kim loại hay chất rắn bị axit/bazo hòa tan dần ngược lại false,\n  \"hasFume\": true nếu có khói/khí độc bốc lên khỏi miệng cốc ngược lại false,\n  \"fumeColor\": \"Mã rgba màu khói/khí nếu có\",\n  \"hasSolidRod\": true nếu có thanh kim loại cắm vào cốc ngược lại false,\n  \"solidRodColor\": \"Mã hex màu thanh kim loại\",\n  \"isImmiscible\": true nếu dung dịch tách 2 lớp dầu/nước ngược lại false,\n  \"upperLiquidColor\": \"Mã màu rgba lớp trên\",\n  \"surfaceSpark\": true nếu có viên Na/K nóng chảy chạy nhảy lóe sáng trên mặt nước ngược lại false,\n  \"precipitate\": true hoặc false,\n  \"precipitateColor\": \"Mã hex màu kết tủa (#ffffff)\",\n  \"precipitateHeightPct\": 15,\n  \"bubbles\": true hoặc false,\n  \"bubbleIntensity\": 8,\n  \"hazard\": \"Cảnh báo an toàn\"\n}";
  try {
    const _0x4bee27 = await callGeminiAPI(_0x32e8a7);
    const _0x110e3b = _0x4bee27.match(/\{[\s\S]*\}/);
    const _0x188ff9 = JSON.parse(_0x110e3b[0]);
    localStorage.setItem(_0x1aeea1, JSON.stringify(_0x188ff9));
    if (supabaseClient) {
      supabaseClient.from("experiments").upsert({
        cache_key: _0x1aeea1,
        result_json: _0x188ff9
      }).then();
    }
    renderReactionUI(_0x188ff9, _0x3a8f77, _0x3d0d59, _0x549dc8, _0x4829d7, _0x36ad68, _0x37561c);
    _0x4d682b.innerText = "Đã mô phỏng xong | Thể tích: " + _0x54385e + " ml (" + _0x36ad68 + "°C)";
  } catch (_0x5f2cfe) {
    console.error("Lỗi AI:", _0x5f2cfe);
    _0x4d682b.innerText = "Lỗi định lượng | Thể tích: " + _0x54385e + " ml";
  }
}
function exportLabReport() {
  document.getElementById("rpt-date").innerText = new Date().toLocaleString("vi-VN");
  document.getElementById("rpt-a").innerHTML = formatChemText(document.getElementById("inputA").value + " (" + document.getElementById("volA").value + "ml, " + document.getElementById("concA").value + "M)");
  document.getElementById("rpt-b").innerHTML = formatChemText(document.getElementById("inputB").value + " (" + document.getElementById("volB").value + "ml, " + document.getElementById("concB").value + "M)");
  document.getElementById("rpt-temp").innerText = document.getElementById("tempRange").value + " °C";
  document.getElementById("rpt-ph").innerText = document.getElementById("ph-value").innerText;
  document.getElementById("rpt-eq").innerHTML = document.getElementById("res-equation").innerHTML;
  document.getElementById("rpt-phenomenon").innerHTML = document.getElementById("res-phenomenon").innerHTML;
  document.getElementById("rpt-stoich").innerHTML = document.getElementById("res-stoichiometry").innerHTML;
  document.getElementById("rpt-hazard").innerHTML = document.getElementById("res-hazard").innerHTML;

  // Dynamic Chart Base64 Injection for PDF Export
  const rptChartImg = document.getElementById("rpt-chart-img");
  if (reactionChartInstance && rptChartImg) {
    try {
      rptChartImg.src = reactionChartInstance.toBase64Image();
      rptChartImg.style.display = "block";
    } catch (e) {
      console.warn("Chart base64 capture warning:", e);
    }
  } else if (rptChartImg) {
    const canvas = document.getElementById("reactionChart");
    if (canvas) {
      rptChartImg.src = canvas.toDataURL("image/png");
      rptChartImg.style.display = "block";
    }
  }

  const _0xf20c1 = document.getElementById("print-report");
  _0xf20c1.classList.remove("hidden");
  window.print();
  _0xf20c1.classList.add("hidden");
}
async function sendMessage() {
  const _0x4d1cdd = document.getElementById("chat-input");
  const _0x1d7bd1 = _0x4d1cdd.value.trim();
  if (!_0x1d7bd1) {
    return;
  }
  const _0x31793b = document.getElementById("chat-messages");
  _0x31793b.insertAdjacentHTML("beforeend", "\n                <div class=\"flex items-start justify-end space-x-2\">\n                    <div class=\"bg-cyan-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm\">" + formatChemText(_0x1d7bd1) + "</div>\n                </div>\n            ");
  _0x4d1cdd.value = "";
  _0x31793b.scrollTop = _0x31793b.scrollHeight;
  const _0x34e138 = "loading-" + Date.now();
  _0x31793b.innerHTML += "\n                <div id=\"" + _0x34e138 + "\" class=\"flex items-start space-x-2\">\n                    <div class=\"w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-xs\">AI</div>\n                    <div class=\"bg-slate-700/80 text-slate-400 p-3 rounded-2xl rounded-tl-none text-sm animate-pulse\">\n                        <i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>ChemAIBuddy đang suy nghĩ...\n                    </div>\n                </div>\n            ";
  _0x31793b.scrollTop = _0x31793b.scrollHeight;
  try {
    const _0x4a2592 = "Bạn là Gia sư Hóa học ChemAIBuddy chuyên trách Khối THPT (Lớp 10, 11, 12). Trả lời ngắn gọn, chính xác, dễ hiểu; tối đa 6 đoạn hoặc gạch đầu dòng trừ khi người học yêu cầu giải chi tiết. Viết công thức ở dạng H2SO4, ion ở dạng Fe^3+ hoặc SO4^2-, và mũi tên phản ứng bằng -> để giao diện định dạng đúng. Không dùng LaTeX. Câu hỏi:\n" + _0x1d7bd1;
    const _0x1996b4 = await callGeminiAPI(_0x4a2592);
    document.getElementById(_0x34e138).remove();
    _0x31793b.insertAdjacentHTML("beforeend", "\n                    <div class=\"flex items-start space-x-2\">\n                        <div class=\"w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-xs\">AI</div>\n                        <div class=\"bg-slate-700/80 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm leading-relaxed\">" + formatChemText(_0x1996b4) + "</div>\n                    </div>\n                ");
    if (supabaseClient) {
      supabaseClient.from("chat_logs").insert({
        session_id: getChatSessionId(),
        user_message: _0x1d7bd1,
        ai_response: _0x1996b4
      }).then();
    }
  } catch (_0x2fc877) {
    document.getElementById(_0x34e138).remove();
    _0x31793b.insertAdjacentHTML("beforeend", "\n                    <div class=\"flex items-start space-x-2\">\n                        <div class=\"w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-xs\">AI</div>\n                        <div class=\"bg-red-900/50 text-red-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm\">Không thể kết nối Gia sư AI. " + escapeHtml(_0x2fc877.message || "Vui lòng thử lại.") + "</div>\n                    </div>\n                ");
  }
  _0x31793b.scrollTop = _0x31793b.scrollHeight;
}
async function generateAIQuiz() {
  const _0x19a6d = document.getElementById("quiz-question");
  const _0x5ec95e = document.getElementById("quiz-options");
  const _0x445628 = document.getElementById("quiz-feedback");
  _0x19a6d.innerText = "🤖 ChemAIBuddy đang tra cứu / tạo câu hỏi trắc nghiệm...";
  _0x5ec95e.innerHTML = "";
  _0x445628.classList.add("hidden");
  if (supabaseClient) {
    try {
      const {
        data: _0x4c85bf,
        error: _0x18441f
      } = await supabaseClient.from("quiz_questions").select("*");
      if (_0x4c85bf && _0x4c85bf.length > 0) {
        const _0x4d1f9e = _0x4c85bf[Math.floor(Math.random() * _0x4c85bf.length)];
        _0x19a6d.innerHTML = formatChemText(_0x4d1f9e.question);
        _0x5ec95e.innerHTML = _0x4d1f9e.options.map((_0x5a740a, _0x41d676) => "\n                            <button onclick=\"checkQuizAnswer(" + _0x41d676 + ", " + _0x4d1f9e.correct_index + ", '" + encodeURIComponent(_0x4d1f9e.explanation) + "')\" class=\"w-full text-left p-3 bg-slate-700/60 hover:bg-slate-700 rounded-xl border border-slate-600 text-xs transition\">\n                                <strong>" + ["A", "B", "C", "D"][_0x41d676] + ".</strong> " + formatChemText(_0x5a740a) + "\n                            </button>\n                        ").join("");
        return;
      }
    } catch (_0x38e834) {
      console.warn("Bỏ qua Quiz DB Cache:", _0x38e834);
    }
  }
  const _0x290a6a = "Bạn là Chuyên gia tạo đề trắc nghiệm Hóa học THPT (Lớp 10-12) chương trình mới. Dùng công thức dạng H2SO4, ion dạng Fe^3+ hoặc SO4^2-, trạng thái (aq)/(s)/(l)/(g) và mũi tên ->; không dùng LaTeX hay ký tự Unicode chỉ số. \nTạo 1 câu hỏi trắc nghiệm hiện tượng thí nghiệm. Trả về DUY NHẤT một chuỗi JSON theo cấu trúc (không dùng markdown codeblock):\n{\n  \"question\": \"Nội dung câu hỏi...\",\n  \"options\": [\"Đáp án A\", \"Đáp án B\", \"Đáp án C\", \"Đáp án D\"],\n  \"correctIndex\": chỉ số đúng từ 0 đến 3,\n  \"explanation\": \"Giải thích chi tiết tại sao đúng...\"\n}";
  try {
    const _0x3ba993 = await callGeminiAPI(_0x290a6a);
    const _0x317b88 = _0x3ba993.match(/\{[\s\S]*\}/);
    const _0x384a5c = JSON.parse(_0x317b88[0]);
    if (supabaseClient) {
      supabaseClient.from("quiz_questions").upsert({
        question: _0x384a5c.question,
        options: _0x384a5c.options,
        correct_index: _0x384a5c.correctIndex !== undefined ? _0x384a5c.correctIndex : _0x384a5c.correct_index,
        explanation: _0x384a5c.explanation
      }, {
        onConflict: "question",
        ignoreDuplicates: true
      }).then();
    }
    _0x19a6d.innerHTML = formatChemText(_0x384a5c.question);
    _0x5ec95e.innerHTML = _0x384a5c.options.map((_0x3ed096, _0x5c544f) => "\n                    <button onclick=\"checkQuizAnswer(" + _0x5c544f + ", " + _0x384a5c.correctIndex + ", '" + encodeURIComponent(_0x384a5c.explanation) + "')\" class=\"w-full text-left p-3 bg-slate-700/60 hover:bg-slate-700 rounded-xl border border-slate-600 text-xs transition\">\n                        <strong>" + ["A", "B", "C", "D"][_0x5c544f] + ".</strong> " + formatChemText(_0x3ed096) + "\n                    </button>\n                ").join("");
  } catch (_0x3e3703) {
    _0x19a6d.innerText = "❌ Không thể tạo câu hỏi mới lúc này. Vui lòng bấm thử lại!";
  }
}
function checkQuizAnswer(_0x26582c, _0x1f15f5, _0x49b83d) {
  const _0x270a6b = document.getElementById("quiz-feedback");
  const _0x289422 = document.getElementById("quiz-score");
  const _0x2a49d4 = document.getElementById("quiz-streak");
  const _0x1cf109 = document.getElementById("quiz-rank");
  const _0x43469a = decodeURIComponent(_0x49b83d);
  _0x270a6b.classList.remove("hidden");
  if (_0x26582c === _0x1f15f5) {
    quizScore += 10;
    quizStreak += 1;
    _0x270a6b.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/60";
    _0x270a6b.innerHTML = "<strong>🎉 Chính xác! (+10 Điểm)</strong><br>" + formatChemText(_0x43469a);
  } else {
    quizStreak = 0;
    _0x270a6b.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-700/60";
    _0x270a6b.innerHTML = "<strong>❌ Chưa đúng rồi!</strong> Đáp án đúng là <strong>" + ["A", "B", "C", "D"][_0x1f15f5] + "</strong>.<br>" + formatChemText(_0x43469a);
  }
  _0x289422.innerText = quizScore;
  _0x2a49d4.innerText = "🔥 " + quizStreak;
  if (quizScore >= 100) {
    _0x1cf109.innerText = "👑 Bậc thầy Hóa học THPT";
  } else if (quizScore >= 50) {
    _0x1cf109.innerText = "⚡ Chuyên gia Thí nghiệm";
  } else if (quizScore >= 20) {
    _0x1cf109.innerText = "🧪 Học viên Sáng tạo";
  } else {
    _0x1cf109.innerText = "🌱 Tập sự Hóa học";
  }
}
function switchQuizMode(_0x52c24d) {
  const _0x18e708 = document.getElementById("quiz-mode-single");
  const _0x4a0546 = document.getElementById("quiz-mode-kahoot");
  const _0x44f52c = document.getElementById("quiz-single-box");
  const _0x3ff79e = document.getElementById("quiz-kahoot-student-box");
  if (_0x52c24d === "single") {
    _0x18e708.className = "px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 text-white transition";
    _0x4a0546.className = "px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition";
    _0x44f52c.classList.remove("hidden");
    _0x3ff79e.classList.add("hidden");
  } else {
    _0x4a0546.className = "px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 text-white transition";
    _0x18e708.className = "px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition";
    _0x3ff79e.classList.remove("hidden");
    _0x44f52c.classList.add("hidden");
  }
}
async function createKahootRoom() {
  if (!supabaseClient) {
    alert("Vui lòng cấu hình CSDL Supabase để tạo phòng!");
    return;
  }
  hostSelectedSeconds = parseInt(document.getElementById("host-timer-select").value) || 20;
  const _0x3891c9 = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    const {
      data: _0x152e00,
      error: _0x4885bd
    } = await supabaseClient.from("rooms").insert({
      room_pin: _0x3891c9,
      status: "waiting",
      current_question: null
    }).select();
    if (_0x4885bd) {
      throw _0x4885bd;
    }
    currentHostPin = _0x3891c9;
    document.getElementById("host-pin-display").innerText = currentHostPin;
    document.getElementById("kahoot-host-setup").classList.add("hidden");
    document.getElementById("kahoot-host-dashboard").classList.remove("hidden");
    document.getElementById("kahoot-host-summary").classList.add("hidden");
    if (hostPollerInterval) {
      clearInterval(hostPollerInterval);
    }
    hostPollerInterval = setInterval(pollHostRoomData, 2000);
    pollHostRoomData();
  } catch (_0x177afc) {
    alert("Lỗi tạo phòng Kahoot: " + _0x177afc.message);
  }
}
async function pollHostRoomData() {
  if (!currentHostPin || !supabaseClient) {
    return;
  }
  try {
    const {
      data: _0x4c6607,
      error: _0x14e354
    } = await supabaseClient.from("room_participants").select("*").eq("room_pin", currentHostPin).order("score", {
      ascending: false
    });
    if (_0x14e354) {
      throw _0x14e354;
    }
    const _0x1dd798 = document.getElementById("host-participant-count");
    const _0x3237ec = document.getElementById("host-participant-list");
    const _0x397b03 = document.getElementById("host-leaderboard-list");
    _0x1dd798.innerText = _0x4c6607.length + " em";
    if (_0x4c6607.length === 0) {
      _0x3237ec.innerHTML = "<span class=\"text-xs text-slate-500 italic\">Đang chờ học sinh nhập mã phòng...</span>";
      _0x397b03.innerHTML = "<span class=\"text-xs text-slate-500 italic\">Chưa có kết quả điểm.</span>";
      return;
    }
    _0x3237ec.innerHTML = _0x4c6607.map(_0x384db7 => "\n                    <span class=\"bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-semibold flex items-center gap-1.5\">\n                        <i class=\"fa-solid fa-user text-[10px]\"></i> " + _0x384db7.nickname + "\n                    </span>\n                ").join("");
    _0x397b03.innerHTML = _0x4c6607.map((_0x4794fa, _0x38df9c) => "\n                    <div class=\"flex justify-between items-center p-2 rounded bg-slate-800/80 border border-slate-700/60\">\n                        <span class=\"font-bold " + (_0x38df9c === 0 ? "text-amber-400" : _0x38df9c === 1 ? "text-slate-300" : "text-amber-600") + "\">\n                            #" + (_0x38df9c + 1) + " " + _0x4794fa.nickname + "\n                        </span>\n                        <span class=\"font-mono text-emerald-400 font-bold\">" + _0x4794fa.score + " điểm</span>\n                    </div>\n                ").join("");
  } catch (_0x1047a6) {
    console.warn("Lỗi đồng bộ host:", _0x1047a6);
  }
}
async function startKahoot10Game() {
  if (!currentHostPin || !supabaseClient) {
    return;
  }
  const _0x9f02c5 = document.getElementById("btn-start-kahoot-game");
  _0x9f02c5.disabled = true;
  _0x9f02c5.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> Đang chuẩn bị 10 câu hỏi...";
  try {
    kahootQuestionsSet = [];
    const {
      data: _0x58bbb6
    } = await supabaseClient.from("quiz_questions").select("*");
    const _0xb394e8 = _0x58bbb6 || [];
    if (_0xb394e8.length >= 10) {
      console.log("🗄️ Tải bộ 10 câu hỏi từ Supabase DB (0 Token):", _0xb394e8.length);
      kahootQuestionsSet = _0xb394e8.sort(() => 0.5 - Math.random()).slice(0, 10);
    } else {
      const _0x2030cd = 10 - _0xb394e8.length;
      console.log("🤖 CSDL chỉ có " + _0xb394e8.length + " câu. AI tạo bổ sung: " + _0x2030cd + " câu...");
      const _0x34c68d = "Tạo bộ " + _0x2030cd + " câu hỏi trắc nghiệm Hóa THPT (Chương trình mới Lớp 10-12). Dùng công thức dạng H2SO4, ion dạng Fe^3+ hoặc SO4^2-, trạng thái (aq)/(s)/(l)/(g) và mũi tên ->; không dùng LaTeX hay ký tự Unicode chỉ số. \nTrả về DUY NHẤT một mảng JSON có đúng " + _0x2030cd + " phần tử:\n[\n  {\n    \"question\": \"Nội dung câu hỏi...\",\n    \"options\": [\"Đáp án A\", \"Đáp án B\", \"Đáp án C\", \"Đáp án D\"],\n    \"correctIndex\": 0,\n    \"explanation\": \"Lời giải chi tiết...\"\n  }\n]";
      const _0x4bcb9f = await callGeminiAPI(_0x34c68d);
      const _0x54267b = _0x4bcb9f.match(/\[[\s\S]*\]/);
      const _0x4a4b1a = JSON.parse(_0x54267b[0]);
      const _0xe17488 = _0x4a4b1a.map(_0x43fac5 => ({
        question: _0x43fac5.question,
        options: _0x43fac5.options,
        correct_index: _0x43fac5.correctIndex !== undefined ? _0x43fac5.correctIndex : _0x43fac5.correct_index,
        explanation: _0x43fac5.explanation
      }));
      await supabaseClient.from("quiz_questions").upsert(_0xe17488, {
        onConflict: "question",
        ignoreDuplicates: true
      });
      kahootQuestionsSet = [..._0xb394e8, ..._0x4a4b1a].slice(0, 10);
    }
    hostCurrentQIndex = 0;
    _0x9f02c5.classList.add("hidden");
    dispatchKahootQuestion(hostCurrentQIndex);
  } catch (_0x3d1944) {
    alert("Lỗi chuẩn bị bộ câu hỏi: " + _0x3d1944.message);
    _0x9f02c5.disabled = false;
    _0x9f02c5.innerHTML = "<i class=\"fa-solid fa-play\"></i> Thử lại Bắt đầu";
  }
}
async function dispatchKahootQuestion(_0x1f6cb3) {
  if (_0x1f6cb3 >= 10) {
    endKahootRoom();
    return;
  }
  const _0x43c5ab = kahootQuestionsSet[_0x1f6cb3];
  const _0x451e77 = Date.now();
  const _0x1e2c71 = {
    question: _0x43c5ab.question,
    options: _0x43c5ab.options,
    correct_index: _0x43c5ab.correct_index !== undefined ? _0x43c5ab.correct_index : _0x43c5ab.correctIndex,
    explanation: _0x43c5ab.explanation,
    q_num: _0x1f6cb3 + 1,
    total_q: 10,
    time_limit: hostSelectedSeconds,
    start_time: _0x451e77
  };
  await supabaseClient.from("rooms").update({
    status: "active",
    current_question: _0x1e2c71
  }).eq("room_pin", currentHostPin);
  document.getElementById("host-question-progress").innerText = "Tiến trình: Câu " + (_0x1f6cb3 + 1) + "/10";
  if (hostTimerInterval) {
    clearInterval(hostTimerInterval);
  }
  let _0x126f01 = hostSelectedSeconds;
  const _0x501489 = document.getElementById("host-timer-display");
  _0x501489.innerText = "⏰ Còn lại: " + _0x126f01 + "s";
  hostTimerInterval = setInterval(() => {
    _0x126f01--;
    if (_0x126f01 >= 0) {
      _0x501489.innerText = "⏰ Còn lại: " + _0x126f01 + "s";
    } else {
      clearInterval(hostTimerInterval);
      _0x501489.innerText = "⏳ Chờ 5s xem đáp án & sang câu tiếp...";
      setTimeout(() => {
        hostCurrentQIndex++;
        dispatchKahootQuestion(hostCurrentQIndex);
      }, 5000);
    }
  }, 1000);
}
async function endKahootRoom() {
  if (!currentHostPin || !supabaseClient) {
    return;
  }
  if (hostTimerInterval) {
    clearInterval(hostTimerInterval);
  }
  if (hostPollerInterval) {
    clearInterval(hostPollerInterval);
  }
  await supabaseClient.from("rooms").update({
    status: "finished"
  }).eq("room_pin", currentHostPin);
  const {
    data: _0x2b24c3
  } = await supabaseClient.from("room_participants").select("*").eq("room_pin", currentHostPin).order("score", {
    ascending: false
  });
  const _0x221fd0 = _0x2b24c3 || [];
  document.getElementById("kahoot-host-dashboard").classList.add("hidden");
  document.getElementById("kahoot-host-summary").classList.remove("hidden");
  renderHostPodiumAndSummary(_0x221fd0);
}
function renderHostPodiumAndSummary(_0xbe070f) {
  const _0x5ab938 = document.getElementById("host-podium-box");
  const _0x217b75 = document.getElementById("host-summary-full-list");
  if (!_0xbe070f || _0xbe070f.length === 0) {
    _0x5ab938.innerHTML = "<p class=\"text-xs text-slate-400 italic\">Chưa có học sinh tham gia thi đấu.</p>";
    _0x217b75.innerHTML = "<p class=\"text-xs text-slate-400 italic\">Không có dữ liệu điểm.</p>";
    return;
  }
  const _0x17f0b0 = _0xbe070f[0] || null;
  const _0x170b86 = _0xbe070f[1] || null;
  const _0x1c138a = _0xbe070f[2] || null;
  let _0x459c91 = "";
  if (_0x170b86) {
    _0x459c91 += "\n                <div class=\"flex flex-col items-center\">\n                    <span class=\"text-xs font-bold text-slate-300 truncate max-w-[90px]\">" + _0x170b86.nickname + "</span>\n                    <span class=\"text-[10px] text-emerald-400 font-mono font-bold\">" + _0x170b86.score + " điểm</span>\n                    <div class=\"w-20 bg-gradient-to-t from-slate-700 to-slate-500 h-20 rounded-t-xl flex flex-col items-center justify-center text-slate-100 font-black text-xl shadow-lg mt-1 border-t border-slate-300\">\n                        🥈\n                        <span class=\"text-xs font-sans font-bold\">Hạng 2</span>\n                    </div>\n                </div>";
  }
  if (_0x17f0b0) {
    _0x459c91 += "\n                <div class=\"flex flex-col items-center -mt-4\">\n                    <i class=\"fa-solid fa-crown text-amber-300 text-lg mb-0.5 animate-bounce\"></i>\n                    <span class=\"text-xs font-black text-amber-300 truncate max-w-[100px]\">" + _0x17f0b0.nickname + "</span>\n                    <span class=\"text-[10px] text-emerald-400 font-mono font-bold\">" + _0x17f0b0.score + " điểm</span>\n                    <div class=\"w-24 bg-gradient-to-t from-amber-600 to-amber-400 h-28 rounded-t-xl flex flex-col items-center justify-center text-amber-950 font-black text-2xl shadow-xl shadow-amber-500/20 mt-1 border-t-2 border-yellow-200\">\n                        🥇\n                        <span class=\"text-xs font-sans font-bold\">Hạng 1</span>\n                    </div>\n                </div>";
  }
  if (_0x1c138a) {
    _0x459c91 += "\n                <div class=\"flex flex-col items-center\">\n                    <span class=\"text-xs font-bold text-amber-600 truncate max-w-[90px]\">" + _0x1c138a.nickname + "</span>\n                    <span class=\"text-[10px] text-emerald-400 font-mono font-bold\">" + _0x1c138a.score + " điểm</span>\n                    <div class=\"w-20 bg-gradient-to-t from-amber-900 to-amber-700 h-16 rounded-t-xl flex flex-col items-center justify-center text-amber-200 font-black text-lg shadow-lg mt-1 border-t border-amber-500\">\n                        🥉\n                        <span class=\"text-xs font-sans font-bold\">Hạng 3</span>\n                    </div>\n                </div>";
  }
  _0x5ab938.innerHTML = _0x459c91;
  _0x217b75.innerHTML = _0xbe070f.map((_0xd4ad3b, _0x1b9ff8) => "\n                <div class=\"flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-700/60\">\n                    <span class=\"font-semibold " + (_0x1b9ff8 === 0 ? "text-amber-300 font-bold" : _0x1b9ff8 === 1 ? "text-slate-300" : _0x1b9ff8 === 2 ? "text-amber-500" : "text-slate-400") + "\">\n                        <strong>#" + (_0x1b9ff8 + 1) + "</strong> " + _0xd4ad3b.nickname + "\n                    </span>\n                    <span class=\"font-mono text-emerald-400 font-bold\">" + _0xd4ad3b.score + " điểm</span>\n                </div>\n            ").join("");
}
function resetHostKahoot() {
  document.getElementById("kahoot-host-summary").classList.add("hidden");
  document.getElementById("kahoot-host-setup").classList.remove("hidden");
  document.getElementById("btn-start-kahoot-game").classList.remove("hidden");
  document.getElementById("btn-start-kahoot-game").disabled = false;
  document.getElementById("btn-start-kahoot-game").innerHTML = "<i class=\"fa-solid fa-play\"></i> Bắt đầu Đấu (10 Câu)";
  currentHostPin = null;
}
async function studentJoinKahoot() {
  const _0x235380 = document.getElementById("student-pin-input").value.trim();
  const _0x6fdd6a = document.getElementById("student-nickname-input").value.trim();
  if (!_0x235380 || !_0x6fdd6a) {
    alert("Vui lòng nhập đầy đủ Mã PIN và Biệt danh!");
    return;
  }
  if (!supabaseClient) {
    alert("Chưa kết nối CSDL Supabase!");
    return;
  }
  try {
    const {
      data: _0x482ab7,
      error: _0x852a1c
    } = await supabaseClient.from("rooms").select("*").eq("room_pin", _0x235380).neq("status", "finished").maybeSingle();
    if (_0x852a1c || !_0x482ab7) {
      alert("Mã PIN không tồn tại hoặc phòng đã kết thúc!");
      return;
    }
    const {
      data: _0x58b756,
      error: _0x5957f0
    } = await supabaseClient.from("room_participants").insert({
      room_pin: _0x235380,
      nickname: _0x6fdd6a,
      score: 0
    }).select().single();
    if (_0x5957f0) {
      throw _0x5957f0;
    }
    joinedStudentPin = _0x235380;
    joinedStudentNick = _0x6fdd6a;
    joinedParticipantId = _0x58b756.id;
    studentKahootScore = 0;
    studentAnswersHistory = [];
    document.getElementById("lobby-student-name").innerText = _0x6fdd6a;
    document.getElementById("lobby-pin").innerText = _0x235380;
    document.getElementById("kahoot-student-nick-display").innerText = _0x6fdd6a;
    document.getElementById("kahoot-join-form").classList.add("hidden");
    document.getElementById("kahoot-student-summary").classList.add("hidden");
    document.getElementById("kahoot-student-lobby").classList.remove("hidden");
    if (studentPollerInterval) {
      clearInterval(studentPollerInterval);
    }
    studentPollerInterval = setInterval(pollStudentRoomData, 1500);
  } catch (_0xc64a46) {
    alert("Lỗi vào phòng Kahoot: " + _0xc64a46.message);
  }
}
async function pollStudentRoomData() {
  if (!joinedStudentPin || !supabaseClient) {
    return;
  }
  try {
    const {
      data: _0x584926,
      error: _0x309ae5
    } = await supabaseClient.from("rooms").select("*").eq("room_pin", joinedStudentPin).maybeSingle();
    if (_0x309ae5 || !_0x584926) {
      return;
    }
    if (_0x584926.status === "finished") {
      if (studentPollerInterval) {
        clearInterval(studentPollerInterval);
      }
      if (studentTimerInterval) {
        clearInterval(studentTimerInterval);
      }
      renderStudentSummaryScreen();
      return;
    }
    if (_0x584926.status === "active" && _0x584926.current_question) {
      const _0x479897 = _0x584926.current_question;
      if (_0x479897.question !== currentKahootQuestionText) {
        currentKahootQuestionText = _0x479897.question;
        hasAnsweredCurrentKahootQ = false;
        currentStudentQObj = _0x479897;
        document.getElementById("kahoot-student-lobby").classList.add("hidden");
        document.getElementById("kahoot-student-question").classList.remove("hidden");
        renderKahootStudentQuestion(_0x479897);
      }
    }
  } catch (_0x17ed28) {
    console.warn("Lỗi đồng bộ học sinh Kahoot:", _0x17ed28);
  }
}
function renderKahootStudentQuestion(_0x1846d9) {
  document.getElementById("kahoot-q-text").innerHTML = formatChemText(_0x1846d9.question);
  document.getElementById("student-q-index").innerText = "Câu hỏi " + (_0x1846d9.q_num || 1) + "/" + (_0x1846d9.total_q || 10);
  const _0x18ef0f = document.getElementById("kahoot-q-options");
  const _0x8041ff = document.getElementById("kahoot-q-feedback");
  _0x8041ff.classList.add("hidden");
  const _0x126d76 = _0x1846d9.correct_index !== undefined ? _0x1846d9.correct_index : _0x1846d9.correctIndex;
  _0x18ef0f.innerHTML = _0x1846d9.options.map((_0x102df3, _0x1da987) => "\n                <button onclick=\"submitKahootAnswer(" + _0x1da987 + ", " + _0x126d76 + ", '" + encodeURIComponent(_0x1846d9.explanation) + "')\" class=\"kahoot-opt-btn w-full text-left p-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-600 text-xs font-medium transition flex items-center gap-2\">\n                    <span class=\"w-6 h-6 rounded-lg bg-cyan-600 text-white font-bold flex items-center justify-center text-[11px]\">" + ["A", "B", "C", "D"][_0x1da987] + "</span>\n                    <span>" + formatChemText(_0x102df3) + "</span>\n                </button>\n            ").join("");
  if (studentTimerInterval) {
    clearInterval(studentTimerInterval);
  }
  const _0x1f738b = _0x1846d9.time_limit || 20;
  const _0x24905e = _0x1846d9.start_time || Date.now();
  const _0x38f2d3 = document.getElementById("student-timer-countdown");
  studentTimerInterval = setInterval(() => {
    const _0x1017ab = Math.floor((Date.now() - _0x24905e) / 1000);
    const _0x4da73e = Math.max(0, _0x1f738b - _0x1017ab);
    _0x38f2d3.innerText = _0x4da73e;
    if (_0x4da73e <= 0) {
      clearInterval(studentTimerInterval);
      disableKahootStudentButtons();
      if (!hasAnsweredCurrentKahootQ) {
        hasAnsweredCurrentKahootQ = true;
        const _0x3e2e8a = decodeURIComponent(encodeURIComponent(_0x1846d9.explanation));
        studentAnswersHistory.push({
          qNum: _0x1846d9.q_num || studentAnswersHistory.length + 1,
          question: _0x1846d9.question,
          options: _0x1846d9.options,
          selectedIdx: -1,
          correctIdx: _0x126d76,
          explanation: _0x3e2e8a
        });
      }
      _0x8041ff.classList.remove("hidden");
      _0x8041ff.className = "p-4 rounded-xl text-xs font-medium bg-cyan-950/90 text-cyan-200 border border-cyan-700/60";
      _0x8041ff.innerHTML = "<strong>⏰ ĐÃ HẾT THỜI GIAN CÂU HỎI!</strong><br>• Đáp án đúng là: <strong class=\"text-amber-300\">" + ["A", "B", "C", "D"][_0x126d76] + ". " + formatChemText(_0x1846d9.options[_0x126d76]) + "</strong><br>• Lời giải chi tiết: " + formatChemText(_0x1846d9.explanation);
    }
  }, 1000);
}
function disableKahootStudentButtons() {
  const _0x5c0668 = document.querySelectorAll(".kahoot-opt-btn");
  _0x5c0668.forEach(_0x793a4f => {
    _0x793a4f.disabled = true;
    _0x793a4f.classList.add("opacity-50", "cursor-not-allowed");
  });
}
async function submitKahootAnswer(_0x14a3ed, _0x3c49c0, _0x53b316) {
  if (hasAnsweredCurrentKahootQ) {
    return;
  }
  hasAnsweredCurrentKahootQ = true;
  disableKahootStudentButtons();
  const _0x5a3b30 = decodeURIComponent(_0x53b316);
  if (currentStudentQObj) {
    studentAnswersHistory.push({
      qNum: currentStudentQObj.q_num || studentAnswersHistory.length + 1,
      question: currentStudentQObj.question,
      options: currentStudentQObj.options,
      selectedIdx: _0x14a3ed,
      correctIdx: _0x3c49c0,
      explanation: _0x5a3b30
    });
  }
  const _0x4e434a = document.getElementById("kahoot-q-feedback");
  _0x4e434a.classList.remove("hidden");
  if (_0x14a3ed === _0x3c49c0) {
    studentKahootScore += 10;
    _0x4e434a.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/60";
    _0x4e434a.innerHTML = "<strong>🎉 Chính xác! (+10 Điểm)</strong><br><span class=\"text-slate-400 font-normal\">Đáp án chuẩn & lời giải chi tiết sẽ được hiển thị khi hết thời gian đếm ngược.</span>";
  } else {
    _0x4e434a.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-700/60";
    _0x4e434a.innerHTML = "<strong>❌ Chưa chính xác!</strong><br><span class=\"text-slate-400 font-normal\">Đáp án đúng & lời giải chi tiết sẽ được hiển thị khi hết thời gian đếm ngược.</span>";
  }
  document.getElementById("kahoot-student-score-display").innerText = studentKahootScore;
  if (supabaseClient && joinedParticipantId) {
    await supabaseClient.from("room_participants").update({
      score: studentKahootScore,
      updated_at: new Date()
    }).eq("id", joinedParticipantId);
  }
}
async function renderStudentSummaryScreen() {
  document.getElementById("kahoot-student-lobby").classList.add("hidden");
  document.getElementById("kahoot-student-question").classList.add("hidden");
  document.getElementById("kahoot-student-summary").classList.remove("hidden");
  document.getElementById("student-final-score").innerText = studentKahootScore;
  const {
    data: _0x48adce
  } = await supabaseClient.from("room_participants").select("*").eq("room_pin", joinedStudentPin).order("score", {
    ascending: false
  });
  const _0x36dc86 = _0x48adce || [];
  const _0x411990 = _0x36dc86.findIndex(_0x2bb7db => _0x2bb7db.id === joinedParticipantId);
  const _0x236038 = _0x411990 !== -1 ? "#" + (_0x411990 + 1) + " / " + _0x36dc86.length : "#--";
  document.getElementById("student-final-rank").innerText = _0x236038;
  const _0x11f1eb = document.getElementById("student-summary-top3");
  const _0x1c8db5 = _0x36dc86.slice(0, 3);
  if (_0x1c8db5.length === 0) {
    _0x11f1eb.innerHTML = "<span class=\"text-slate-400 italic\">Chưa có kết quả.</span>";
  } else {
    _0x11f1eb.innerHTML = _0x1c8db5.map((_0x1b6698, _0x52ffbd) => "\n                    <div class=\"flex justify-between items-center p-2 rounded bg-slate-800 border border-slate-700\">\n                        <span class=\"font-bold " + (_0x52ffbd === 0 ? "text-amber-300" : _0x52ffbd === 1 ? "text-slate-300" : "text-amber-500") + "\">\n                            " + ["🥇", "🥈", "🥉"][_0x52ffbd] + " #" + (_0x52ffbd + 1) + " " + _0x1b6698.nickname + "\n                        </span>\n                        <span class=\"font-mono text-emerald-400 font-bold\">" + _0x1b6698.score + " điểm</span>\n                    </div>\n                ").join("");
  }
  const _0x274e84 = document.getElementById("student-summary-history");
  if (_0x274e84) {
    if (studentAnswersHistory.length === 0) {
      _0x274e84.innerHTML = "<span class=\"text-slate-400 italic text-xs\">Không có dữ liệu lượt thi.</span>";
    } else {
      _0x274e84.innerHTML = studentAnswersHistory.map((_0x4ad59f, _0x2f103b) => {
        const _0x4c5972 = _0x4ad59f.selectedIdx === _0x4ad59f.correctIdx;
        const _0x3e6a43 = _0x4ad59f.selectedIdx >= 0 ? "<b>" + ["A", "B", "C", "D"][_0x4ad59f.selectedIdx] + ".</b> " + formatChemText(_0x4ad59f.options[_0x4ad59f.selectedIdx]) : "<i class=\"text-rose-400 font-semibold\">Chưa chọn (Hết thời gian)</i>";
        const _0x3e4016 = "<b>" + ["A", "B", "C", "D"][_0x4ad59f.correctIdx] + ".</b> " + formatChemText(_0x4ad59f.options[_0x4ad59f.correctIdx]);
        return "\n                        <div class=\"p-3 bg-slate-800/90 rounded-xl border " + (_0x4c5972 ? "border-emerald-500/40" : "border-rose-500/40") + " text-xs space-y-1.5 text-left\">\n                            <div class=\"flex justify-between items-start font-bold gap-2\">\n                                <span class=\"text-white\">Câu " + (_0x4ad59f.qNum || _0x2f103b + 1) + ": " + formatChemText(_0x4ad59f.question) + "</span>\n                                <span class=\"px-2 py-0.5 rounded text-[10px] whitespace-nowrap " + (_0x4c5972 ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-rose-950 text-rose-300 border border-rose-700") + "\">\n                                    " + (_0x4c5972 ? "✓ Đúng (+10)" : "❌ Sai (0)") + "\n                                </span>\n                            </div>\n                            <div class=\"text-slate-300\">\n                                • Bạn chọn: <span class=\"" + (_0x4c5972 ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold") + "\">" + _0x3e6a43 + "</span>\n                            </div>\n                            " + (!_0x4c5972 ? "<div class=\"text-amber-300\">• Đáp án chính xác: <span>" + _0x3e4016 + "</span></div>" : "") + "\n                            <div class=\"text-slate-400 text-[11px] bg-slate-900/80 p-2 rounded border border-slate-700/60 mt-1\">\n                                💡 <b>Lời giải chi tiết:</b> " + formatChemText(_0x4ad59f.explanation) + "\n                            </div>\n                        </div>\n                        ";
      }).join("");
    }
  }
}
function resetStudentKahoot() {
  document.getElementById("kahoot-student-summary").classList.add("hidden");
  document.getElementById("kahoot-join-form").classList.remove("hidden");
  joinedStudentPin = null;
  joinedStudentNick = null;
  joinedParticipantId = null;
  studentKahootScore = 0;
  studentAnswersHistory = [];
}
async function fetchAuditLogs() {
  const _0x334699 = document.getElementById("audit-chat-table-body");
  _0x334699.innerHTML = "<tr><td colspan=\"4\" class=\"p-4 text-center text-cyan-400 italic\"><i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>Đang tải dữ liệu Chat Log từ Supabase...</td></tr>";
  if (!supabaseClient) {
    _0x334699.innerHTML = "<tr><td colspan=\"4\" class=\"p-4 text-center text-red-400 font-semibold\">Chưa kết nối Supabase DB.</td></tr>";
    return;
  }
  try {
    const {
      data: _0x8ce66e,
      error: _0x1e97e3
    } = await supabaseClient.from("chat_logs").select("*").order("created_at", {
      ascending: false
    }).limit(30);
    if (_0x1e97e3) {
      throw _0x1e97e3;
    }
    if (!_0x8ce66e || _0x8ce66e.length === 0) {
      _0x334699.innerHTML = "<tr><td colspan=\"4\" class=\"p-4 text-center text-slate-400 italic\">Chưa có nhật ký trò chuyện nào được lưu.</td></tr>";
      return;
    }
    _0x334699.innerHTML = _0x8ce66e.map(_0x41dc4b => "\n                    <tr class=\"hover:bg-slate-800/60 transition\">\n                        <td class=\"p-3 text-slate-400 whitespace-nowrap\">" + new Date(_0x41dc4b.created_at).toLocaleString("vi-VN") + "</td>\n                        <td class=\"p-3 font-mono text-cyan-400\">" + escapeHtml(_0x41dc4b.session_id || "N/A") + "</td>\n                        <td class=\"p-3 text-white font-medium\">" + formatChemText(_0x41dc4b.user_message) + "</td>\n                        <td class=\"p-3 text-slate-300 max-w-xs truncate\" title=\"" + escapeHtml(_0x41dc4b.ai_response || "") + "\">" + formatChemText(_0x41dc4b.ai_response) + "</td>\n                    </tr>\n                ").join("");
  } catch (_0x552bd6) {
    console.error("Lỗi Chat Logs:", _0x552bd6);
    _0x334699.innerHTML = "<tr><td colspan=\"4\" class=\"p-4 text-center text-red-400 font-semibold\">Lỗi tải dữ liệu: " + _0x552bd6.message + "</td></tr>";
  }
}
async function fetchAuditQuizLogs() {
  const _0x43917e = document.getElementById("audit-quiz-table-body");
  _0x43917e.innerHTML = "<tr><td colspan=\"5\" class=\"p-4 text-center text-amber-400 italic\"><i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>Đang tải Ngân hàng Trắc nghiệm từ Supabase...</td></tr>";
  if (!supabaseClient) {
    _0x43917e.innerHTML = "<tr><td colspan=\"5\" class=\"p-4 text-center text-red-400 font-semibold\">Chưa kết nối Supabase DB.</td></tr>";
    return;
  }
  try {
    const {
      data: _0x264e51,
      error: _0x5a0575
    } = await supabaseClient.from("quiz_questions").select("*").order("created_at", {
      ascending: false
    }).limit(30);
    if (_0x5a0575) {
      throw _0x5a0575;
    }
    if (!_0x264e51 || _0x264e51.length === 0) {
      _0x43917e.innerHTML = "<tr><td colspan=\"5\" class=\"p-4 text-center text-slate-400 italic\">Chưa có câu hỏi trắc nghiệm nào trong DB.</td></tr>";
      return;
    }
    _0x43917e.innerHTML = _0x264e51.map(_0x582118 => {
      const _0x2e3c63 = Array.isArray(_0x582118.options) ? _0x582118.options.map((_0x593b09, _0x498f6c) => "<b>" + ["A", "B", "C", "D"][_0x498f6c] + ".</b> " + formatChemText(_0x593b09)).join("<br>") : "";
      const _0x5ef10f = ["A", "B", "C", "D"][_0x582118.correct_index] || "N/A";
      return "\n                    <tr class=\"hover:bg-slate-800/60 transition\">\n                        <td class=\"p-3 text-slate-400 whitespace-nowrap\">" + new Date(_0x582118.created_at).toLocaleString("vi-VN") + "</td>\n                        <td class=\"p-3 text-white font-medium max-w-xs\">" + formatChemText(_0x582118.question) + "</td>\n                        <td class=\"p-3 text-slate-300 text-[11px] leading-relaxed max-w-xs\">" + _0x2e3c63 + "</td>\n                        <td class=\"p-3 text-center\"><span class=\"bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-700/50\">" + _0x5ef10f + "</span></td>\n                        <td class=\"p-3 text-slate-300 text-xs max-w-xs\">" + formatChemText(_0x582118.explanation) + "</td>\n                    </tr>\n                    ";
    }).join("");
  } catch (_0x2fd131) {
    console.error("Lỗi Quiz Logs:", _0x2fd131);
    _0x43917e.innerHTML = "<tr><td colspan=\"5\" class=\"p-4 text-center text-red-400 font-semibold\">Lỗi tải dữ liệu: " + _0x2fd131.message + "</td></tr>";
  }
}
function handleKeyPress(_0x1cc2b) {
  if (_0x1cc2b.key === "Enter") {
    sendMessage();
  }
}
async function searchSafety() {
  const _0x1dc2cf = document.getElementById("safety-search").value.trim();
  const _0x5a0c76 = document.getElementById("safety-grid");
  if (!_0x1dc2cf) {
    renderSafety(safetyData);
    return;
  }
  const _0x357965 = safetyData.filter(_0x4a0587 => _0x4a0587.name.toLowerCase().includes(_0x1dc2cf.toLowerCase()) || _0x4a0587.formula.toLowerCase().includes(_0x1dc2cf.toLowerCase()));
  if (_0x357965.length > 0) {
    renderSafety(_0x357965);
    return;
  }
  _0x5a0c76.innerHTML = "\n                <div class=\"col-span-full text-center py-12 bg-slate-800 border border-slate-700 rounded-2xl\">\n                    <i class=\"fa-solid fa-spinner fa-spin text-4xl text-cyan-400 mb-3 block\"></i>\n                    <p class=\"text-sm font-medium text-slate-200\">ChemAIBuddy đang phân tích mức độ an toàn cho \"<span class=\"text-cyan-400\">" + formatChemText(_0x1dc2cf) + "</span>\"...</p>\n                </div>\n            ";
  const _0x2fe9f0 = "Phân tích mức độ an toàn và dữ liệu phổ của hóa chất: \"" + _0x1dc2cf + "\". Trả về kết quả duy nhất dưới dạng JSON, không dùng markdown codeblock. Với chất không có phổ phù hợp, ghi rõ \"Không áp dụng\":\n{\n  \"name\": \"Tên hóa chất\",\n  \"formula\": \"Công thức hóa học\",\n  \"hazard\": \"Tóm tắt ngắn gọn quy tắc an toàn và cảnh báo độc hại/phóng xạ\",\n  \"ir\": \"Các đỉnh hấp thụ IR đặc trưng, chỉ ghi giá trị theo đơn vị cm⁻¹\",\n  \"ms\": \"Các ion mảnh phổ khối lượng đặc trưng, chỉ ghi giá trị m/z\",\n  \"icon\": \"fa-radiation\",\n  \"color\": \"text-red-500\"\n}";
  try {
    const _0x588434 = await callGeminiAPI(_0x2fe9f0);
    const _0x577815 = _0x588434.match(/\{[\s\S]*\}/);
    if (!_0x577815) {
      throw new Error("Không tìm thấy JSON hợp lệ");
    }
    const _0x32013c = JSON.parse(_0x577815[0]);
    renderSafety([_0x32013c]);
  } catch (_0x292944) {
    console.error("Lỗi tra cứu:", _0x292944);
    _0x5a0c76.innerHTML = "\n                    <div class=\"col-span-full text-center py-8 bg-slate-800 border border-red-500/30 rounded-2xl p-4\">\n                        <p class=\"text-sm text-red-400 font-semibold\">Chưa thể hiển thị tra cứu cho \"" + formatChemText(_0x1dc2cf) + "\".</p>\n                        <p class=\"text-xs text-slate-400 mt-1\">Vui lòng thử lại lần nữa!</p>\n                    </div>\n                ";
  }
}
renderSafety(safetyData);

// Auto-initialize Headroom.js on header scroll
document.addEventListener("DOMContentLoaded", function () {
  startGlobalChemistryFormatting();
  const headerElem = document.querySelector("header");
  if (headerElem && typeof Headroom !== "undefined") {
    const headroom = new Headroom(headerElem);
    headroom.init();
  }
});
