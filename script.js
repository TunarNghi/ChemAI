const GEMINI_API_KEYS_ENCODED = [
  "QVEuQWI4Uk42SWdTLUd4VUNVTlZWaGRTUUJzRE1RWHQwN2FWUDFsN0VvOWt0bUtHZGRiNWc=",
  "QVEuQWI4Uk42TDdQSUoyMHlPaDFmdjM1OGV5bVd3ajg5TzFDVFdYaklWUy1MRGdFZVpaeg==",
  "QVEuQWI4Uk42Sjh4N1RCTFV1N0s3TTlyRkZ4NXJ2VTBmNHJ0UkszeUhuSDQ4M25LQ0ZyalE=",
  "QVEuQWI4Uk42SzNLbW5ObVZFREdhbmVkMjhWaUxmQm9MMnNSSzlyNXQ5a0FYcGJOaEs3Ync=",
  "QVEuQWI4Uk42S25FMk10a0NyZkFLbk9nUjVfTWlsQlpuOVNuSWpaQmgxX3EwQlF5T25NbVE=",
  "QVEuQWI4Uk42TFA3QUtYdS1mbUpmOW5yR0x3VW43ampNdXo2UzV2NHltSkNVakk2b3VwSGc="
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
let pendingTeacherTab = "audit";
let currentAuditSub = "chat";
let quizScore = 0;
let quizStreak = 0;
let hasAnsweredCurrentQuiz = false;
let currentQuizQuestion = null;
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
const _0xdeobfuscate = (str) => {
  try {
    return atob(str).split('').reverse().join('');
  } catch (e) {
    return '';
  }
};

// Cấu hình CSDL Supabase Chính & Cấu hình Tạm thời (Được mã hóa an toàn)
const _SUPABASE_PRIMARY_CONFIG = {
  url: _0xdeobfuscate("b2MuZXNhYmFwdXMub2FvamhxdG5qYnV5eWJqdHVob2MvLzpzcHR0aA=="),
  anonKey: _0xdeobfuscate("QzhJQVduYUNfd0trdlIwekVIR216QnE0TURqQU9Hbl9lbGJhaHNpbGJ1cF9icw==")
};

const _SUPABASE_TEMP_CONFIG = {
  url: _0xdeobfuscate("b2MuZXNhYmFwdXMuaWtkamxyY2tuZ3p5ZnhlbXdtZ3gvLzpzcHR0aA=="),
  publishableKey: _0xdeobfuscate("NURBbmt2aDBfd0tiUVNzZ21EREpQMGhqVmNLMTVBc19lbGJhaHNpbGJ1cF9icw=="),
  secretKey: _0xdeobfuscate("RlVnT2o0THFfUVNIS1lRdWs1eV9iVmtuekZhdjVhYV90ZXJjZXNfYnM="),
  jwksUrl: _0xdeobfuscate("bm9zai5za3dqL253b25rLWxsZXcuLzF2L2h0dWEvb2MuZXNhYmFwdXMuaWtkamxyY2tuZ3p5ZnhlbXdtZ3gvLzpzcHR0aA==")
};

// Cờ khóa tạm / kích hoạt Supabase tạm thời (tự động chuyển đổi khi hệ thống chính được cấp quyền)
let isUsingTemporarySupabase = true;
const SUPABASE_URL = isUsingTemporarySupabase ? _SUPABASE_TEMP_CONFIG.url : _SUPABASE_PRIMARY_CONFIG.url;
const SUPABASE_ANON_KEY = isUsingTemporarySupabase ? _SUPABASE_TEMP_CONFIG.publishableKey : _SUPABASE_PRIMARY_CONFIG.anonKey;
const SUPABASE_SECRET_KEY = _SUPABASE_TEMP_CONFIG.secretKey;
const SUPABASE_JWKS_URL = _SUPABASE_TEMP_CONFIG.jwksUrl;

let supabaseClient = null;
try {
  if (typeof window !== "undefined" && typeof window.supabase !== "undefined" && SUPABASE_URL && !SUPABASE_URL.includes("your-supabase")) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (_supaErr) {
  console.warn("Lỗi khởi tạo Supabase Client:", _supaErr);
}

const GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest"];
const DIFY_API_KEY = _0xdeobfuscate("TkFJWXJ4djVvaEN3T2RvNmV5MmNhYXpKLXBwYQ==");
const DIFY_API_URL = _0xdeobfuscate("c2VnYXNzZW0tdGFoYy8xdi9pYS55ZmlkLmlwYS8vOnNwdHRo");
let reactionChartInstance = null;
let irSpectrumChartInstance = null;
let irSpectrumSlides = [];
let irSpectrumSlideIndex = 0;

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

function formatMarkdownTableCell(cell) {
  return escapeHtml(cell)
    .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
    .replace(/&lt;(strong|b)&gt;/gi, "<strong>")
    .replace(/&lt;\/(strong|b)&gt;/gi, "</strong>")
    .replace(/&lt;(em|i)&gt;/gi, "<em>")
    .replace(/&lt;\/(em|i)&gt;/gi, "</em>");
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
      "<th scope=\"col\" class=\"sticky top-0 z-10 border border-slate-600 bg-slate-800 px-3 py-2 font-semibold text-cyan-300 " + alignments[index] + "\">" + formatMarkdownTableCell(cell) + "</th>"
    ).join("");
    const bodyHtml = bodyRows.map(row =>
      "<tr class=\"transition-colors even:bg-slate-800/45 hover:bg-cyan-950/50\">" + row.map((cell, index) =>
        "<td class=\"border border-slate-700 px-3 py-2 align-top text-slate-200 tabular-nums " + alignments[index] + "\">" + formatMarkdownTableCell(cell) + "</td>"
      ).join("") + "</tr>"
    ).join("");
    output.push("<div class=\"my-3 overflow-auto rounded-lg border border-slate-600 bg-slate-950 shadow-inner\"><table class=\"min-w-full border-collapse text-xs text-slate-200\"><thead><tr>" + headHtml + "</tr></thead><tbody class=\"bg-slate-900/60\">" + bodyHtml + "</tbody></table></div>");
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
  name: "Sulfuric Acid (H₂SO₄)",
  formula: "H₂SO₄",
  hazard: "Ăn mòn cực mạnh, tỏa nhiệt dữ dội khi pha loãng, gây bỏng sâu",
  ir: "1220, 1050, 912, 580",
  ms: "98, 81, 80",
  icon: "fa-triangle-exclamation",
  color: "text-amber-400"
}, {
  name: "Nitric Acid (HNO₃)",
  formula: "HNO₃",
  hazard: "Axit oxi hóa mạnh, làm ố vàng da, hơi axit độc hại cho đường hô hấp",
  ir: "1326, 1303, 879",
  ms: "63, 46, 30",
  icon: "fa-biohazard",
  color: "text-amber-500"
}, {
  name: "Hydrochloric Acid (HCl)",
  formula: "HCl",
  hazard: "Dung dịch ăn mòn, khí HCl bốc hơi gây kích ứng mắt và niêm mạc",
  ir: "2886",
  ms: "36, 38",
  icon: "fa-flask-vial",
  color: "text-yellow-400"
}, {
  name: "Sodium Hydroxide (NaOH)",
  formula: "NaOH",
  hazard: "Bazo mạnh (xút ăn da), gây bỏng nghiêm trọng và hỏng giác mạc",
  ir: "3630, 1640",
  ms: "Không áp dụng (chất ion không bay hơi)",
  icon: "fa-hand-dots",
  color: "text-red-400"
}, {
  name: "Chlorine Gas (Cl₂)",
  formula: "Cl₂",
  hazard: "Khí độc màu vàng lục gây ngạt, tổn thương phổi và hệ hô hấp",
  ir: "Không hấp thụ IR (phân tử đồng hạt nhân)",
  ms: "70, 72, 74",
  icon: "fa-skull-crossbones",
  color: "text-purple-400"
}, {
  name: "Ammonia (NH₃)",
  formula: "NH₃",
  hazard: "Khí độc có mùi khai hắc, gây kích ứng mạnh mắt, mũi và bỏng hô hấp",
  ir: "3444, 3337, 1627, 950",
  ms: "17, 16, 15",
  icon: "fa-wind",
  color: "text-blue-400"
}, {
  name: "Sulfur Dioxide (SO₂)",
  formula: "SO₂",
  hazard: "Khí độc hắc, gây mưa axit, kích ứng niêm mạc và đường hô hấp",
  ir: "1361, 1151, 519",
  ms: "64, 48, 32",
  icon: "fa-cloud-showers-heavy",
  color: "text-orange-400"
}, {
  name: "Carbon Monoxide (CO)",
  formula: "CO",
  hazard: "Khí độc không màu không mùi, liên kết mạnh với Hemoglobin gây ngạt tử vong",
  ir: "2143",
  ms: "28, 16, 12",
  icon: "fa-skull",
  color: "text-red-600"
}, {
  name: "Potassium Permanganate (KMnO₄)",
  formula: "KMnO₄",
  hazard: "Chất oxi hóa mạnh, để lại vết bẩn dai dẳng, nguy cơ cháy khi trộn chất hữu cơ",
  ir: "910, 840, 750",
  ms: "Không áp dụng (muối ion không bay hơi)",
  icon: "fa-atom",
  color: "text-purple-500"
}, {
  name: "Sodium (Na)",
  formula: "Na",
  hazard: "Kim loại kiềm phản ứng mãnh liệt với nước, tự bùng cháy nổ",
  ir: "Không áp dụng (nguyên tử không có dao động phân tử)",
  ms: "23",
  icon: "fa-fire",
  color: "text-red-500"
}, {
  name: "Bromine (Br₂)",
  formula: "Br₂",
  hazard: "Chất lỏng màu đỏ thẫm cực độc, gây bỏng rát da rất khó lành và độc hô hấp",
  ir: "Không hấp thụ IR (phân tử đồng hạt nhân)",
  ms: "158, 160, 162",
  icon: "fa-skull-crossbones",
  color: "text-red-400"
}, {
  name: "Silver Nitrate (AgNO₃)",
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
  name: "Copper(II) Sulfate (CuSO₄)",
  formula: "CuSO₄",
  hazard: "Tinh thể màu xanh, độc với sinh vật thủy sinh, gây nôn mửa nếu nuốt phải",
  ir: "3400, 1100, 620",
  ms: "Không áp dụng (muối ion không bay hơi)",
  icon: "fa-gem",
  color: "text-cyan-400"
}, {
  name: "Ethanol (C₂H₅OH)",
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
async function callDifyAPI(query, conversationId = "") {
  const normalizedQuery = String(query || "").trim();
  if (!normalizedQuery) {
    throw new Error("Dify query cannot be empty.");
  }
  if (!DIFY_API_KEY || DIFY_API_KEY === "YOUR_DIFY_API_KEY") {
    throw new Error("Dify API key chưa được cấu hình.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(DIFY_API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${DIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: {},
        query: normalizedQuery,
        response_mode: "blocking",
        user: getChatSessionId(),
        conversation_id: conversationId
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const apiMessage = data.message || (data.error && data.error.message) || (data.code ? data.code : "HTTP " + response.status);
      const error = new Error("Dify API error: " + apiMessage);
      error.status = response.status;
      throw error;
    }
    if (!data.answer || typeof data.answer !== "string") {
      throw new Error("Dify API không trả về data.answer.");
    }
    return data.answer;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Dify phản hồi quá thời gian 30 giây.");
    }
    if (error instanceof TypeError) {
      throw new Error("Không thể kết nối Dify API. Kiểm tra mạng hoặc CORS.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
let geminiKeyIndex = 0;

async function callGeminiAPI(prompt, keys = GEMINI_API_KEYS) {
  const rawKeys = Array.isArray(keys) ? keys : (typeof keys === "string" ? [keys] : GEMINI_API_KEYS);
  if (!rawKeys || !rawKeys.length) {
    throw new Error("Không có Gemini API Key.");
  }

  // Rải đều key (Round-Robin load balancing)
  const startIndex = geminiKeyIndex % rawKeys.length;
  geminiKeyIndex = (geminiKeyIndex + 1) % rawKeys.length;

  const keyList = [
    ...rawKeys.slice(startIndex),
    ...rawKeys.slice(0, startIndex)
  ];

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
          console.log("Gemini đã phản hồi bằng model: " + model + " (Key #" + (startIndex + 1) + ")");
          return resultText;
        }
      } catch (err) {
        lastError = err.name === "AbortError" ? new Error("Gemini phản hồi quá thời gian 30 giây.") : err;
        console.warn("Model " + model + " hoặc Key bận/lỗi:", lastError.message);
        const keyUnavailable = err.status === 403 || err.status === 429 || /api key|quota|permission|busy/i.test(err.message);
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
function openFeaturesModal() {
  const modal = document.getElementById("features-modal");
  const teacherItem = document.getElementById("modal-teacher-item");
  const auditItem = document.getElementById("modal-audit-item");

  const isTeacher = Boolean(isTeacherAuthed && !currentStudentProfile);

  // CHỈ KHI THAM GIA VỚI ROLE GIÁO VIÊN thì 2 nút "Góc giáo viên" và "Audit & Host" mới hiển thị
  if (teacherItem) {
    if (isTeacher) teacherItem.classList.remove("hidden");
    else teacherItem.classList.add("hidden");
  }
  if (auditItem) {
    if (isTeacher) auditItem.classList.remove("hidden");
    else auditItem.classList.add("hidden");
  }

  if (modal) modal.classList.remove("hidden");
}

function closeFeaturesModal() {
  const modal = document.getElementById("features-modal");
  if (modal) modal.classList.add("hidden");
}

function selectFeatureFromModal(tabId) {
  closeFeaturesModal();
  handleHomeFeatureClick(tabId);
}

function switchTab(tabId) {
  // Nếu là tài khoản học sinh, chặn truy cập vào tab Giáo viên và Audit
  if (currentStudentProfile && (tabId === "audit" || tabId === "teacher")) {
    alert("Tài khoản Học sinh không có quyền truy cập Góc Giáo viên hoặc Cổng Audit!");
    switchTab("home");
    return;
  }

  if ((tabId === "audit" || tabId === "teacher") && !isTeacherAuthed) {
    pendingTeacherTab = tabId;
    openTeacherPassModal();
    return;
  }

  const allTabs = ["home", "lab", "tutor", "quiz", "safety", "leaderboard", "teacher", "audit"];
  allTabs.forEach(t => {
    const content = document.getElementById("content-" + t);
    if (content) content.classList.add("hidden");
  });

  const activeContent = document.getElementById("content-" + tabId);
  if (activeContent) activeContent.classList.remove("hidden");

  // Cập nhật trạng thái hiển thị 3 nút trên thanh Header
  const tabHome = document.getElementById("tab-home");
  const headerFeaturesBtn = document.getElementById("header-features-btn");

  if (tabHome) {
    if (tabId === "home") {
      tabHome.className = "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition bg-cyan-600 text-white whitespace-nowrap shadow shadow-cyan-600/30 flex items-center gap-1.5";
    } else {
      tabHome.className = "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition text-slate-300 hover:bg-slate-700/80 hover:text-white whitespace-nowrap flex items-center gap-1.5";
    }
  }

  if (headerFeaturesBtn) {
    if (tabId !== "home") {
      headerFeaturesBtn.className = "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition bg-cyan-950/90 text-cyan-300 border border-cyan-400/50 whitespace-nowrap flex items-center gap-1.5 shadow shadow-cyan-500/10";
    } else {
      headerFeaturesBtn.className = "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 whitespace-nowrap flex items-center gap-1.5 shadow";
    }
  }

  if (tabId === "quiz") generateAIQuiz();
  if (tabId === "audit") fetchCurrentAuditData();
  if (tabId === "leaderboard") loadKahootLeaderboards();
  if (tabId === "teacher") loadTeacherClassroom();
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
    if (currentStudentProfile) {
      currentStudentProfile = null;
      try { localStorage.removeItem(CHEM_LOCAL_KEYS.session); } catch (_error) {}
    }
    closeTeacherPassModal();
    updateRoleUI();
    renderDrawerProfile();
    switchTab(pendingTeacherTab || "teacher");
  } else {
    _0x54a2cf.classList.remove("hidden");
  }
}
function lockAuditPortal() {
  isTeacherAuthed = false;
  updateRoleUI();
  switchTab("home");
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

const ENGLISH_CHEMICAL_NAMES = {
  H2SO4: "Sulfuric Acid",
  HNO3: "Nitric Acid",
  HCL: "Hydrochloric Acid",
  NAOH: "Sodium Hydroxide",
  KOH: "Potassium Hydroxide",
  CL2: "Chlorine Gas",
  NH3: "Ammonia",
  SO2: "Sulfur Dioxide",
  CO: "Carbon Monoxide",
  KMNO4: "Potassium Permanganate",
  NA: "Sodium",
  BR2: "Bromine",
  AGNO3: "Silver Nitrate",
  C6H5OH: "Phenol",
  CUSO4: "Copper(II) Sulfate",
  C2H5OH: "Ethanol",
  CH3COOH: "Acetic Acid",
  H2O: "Water",
  CO2: "Carbon Dioxide",
  NO2: "Nitrogen Dioxide",
  O2: "Oxygen Gas",
  H2: "Hydrogen Gas",
  FE: "Iron",
  CU: "Copper",
  ZN: "Zinc",
  AL: "Aluminum",
  AG: "Silver",
  BR: "Bromine",
  CL: "Chlorine"
};

function normalizeChemicalFormulaForName(formula) {
  return String(formula || "")
    .replace(/[₀-₉]/g, digit => String("₀₁₂₃₄₅₆₇₈₉".indexOf(digit)))
    .replace(/\s+/g, "")
    .replace(/\((?:aq|s|l|g)\)$/i, "")
    .toUpperCase();
}

function translateIRSpectrumTerm(value) {
  const translations = {
    solid: "rắn",
    liquid: "lỏng",
    gas: "khí",
    solution: "dung dịch",
    strong: "mạnh",
    medium: "trung bình",
    weak: "yếu",
    broad: "rộng",
    sharp: "sắc",
    "ATR-FTIR": "ATR-FTIR",
    transmission: "truyền qua",
    "gas cell": "buồng khí"
  };
  return translations[String(value)] || String(value);
}

function normalizeIRSpectrumData(data, fallbackCompound) {
  data = data && typeof data === "object" ? data : {};
  const rawRange = Array.isArray(data.rangeCm1) ? data.rangeCm1.map(Number).filter(Number.isFinite) : [];
  const high = Math.max(rawRange[0] || 4000, rawRange[1] || 400);
  const low = Math.min(rawRange[0] || 4000, rawRange[1] || 400);
  const peaks = (Array.isArray(data.peaks) ? data.peaks : []).map(peak => {
    const wavenumber = Number(peak.wavenumber ?? peak.waveNumber ?? peak.position);
    const intensity = Number(peak.intensity ?? peak.strength ?? 0.5);
    const widthCm1 = Number(peak.widthCm1 ?? peak.width ?? 18);
    return {
      wavenumber,
      intensity: Number.isFinite(intensity) ? Math.min(1, Math.max(0.05, intensity)) : 0.5,
      widthCm1: Number.isFinite(widthCm1) ? Math.min(220, Math.max(8, widthCm1)) : 18,
      band: translateIRSpectrumTerm(peak.band || "medium"),
      assignment: String(peak.assignment || peak.functionalGroup || "Đỉnh hấp thụ đặc trưng")
    };
  }).filter(peak => Number.isFinite(peak.wavenumber) && peak.wavenumber >= low && peak.wavenumber <= high)
    .sort((left, right) => right.wavenumber - left.wavenumber);

  return {
    compound: ENGLISH_CHEMICAL_NAMES[normalizeChemicalFormulaForName(data.formula)] || String(data.compound || fallbackCompound || "Unknown compound"),
    formula: String(data.formula || ""),
    sampleState: translateIRSpectrumTerm(data.sampleState || "Not specified"),
    technique: translateIRSpectrumTerm(data.technique || "ATR-FTIR"),
    rangeCm1: [high, low],
    resolutionCm1: Number(data.resolutionCm1) || 4,
    scans: Number(data.scans) || 32,
    peaks,
    functionalGroups: Array.isArray(data.functionalGroups) ? data.functionalGroups.map(String).slice(0, 12) : [],
    interpretation: String(data.interpretation || "Diễn giải đỉnh hấp thụ tham chiếu do AI tạo."),
    referenceNote: String(data.referenceNote || "Phổ tham chiếu do AI ước tính; cần đối chiếu với phổ đo thực nghiệm.")
  };
}

function renderIRSlides(spectra) {
  irSpectrumSlides = Array.isArray(spectra) ? spectra : [];
  const controls = document.getElementById("ir-slide-controls");
  const selector = document.getElementById("ir-slide-select");
  if (!irSpectrumSlides.length) {
    if (controls) controls.classList.add("hidden");
    return;
  }
  if (controls) controls.classList.remove("hidden");
  if (selector) {
    selector.innerHTML = irSpectrumSlides.map((spectrum, index) =>
      "<option value=\"" + index + "\">" + escapeHtml(spectrum.compound + (spectrum.formula ? " (" + spectrum.formula + ")" : "")) + "</option>"
    ).join("");
  }
  selectIRSlide(0);
}

function selectIRSlide(index) {
  if (!irSpectrumSlides.length) return;
  irSpectrumSlideIndex = Math.max(0, Math.min(irSpectrumSlides.length - 1, Number(index) || 0));
  const selector = document.getElementById("ir-slide-select");
  if (selector) selector.value = String(irSpectrumSlideIndex);
  renderIRSpectrum(irSpectrumSlides[irSpectrumSlideIndex]);
}

function renderIRSpectrum(data, fallbackCompound) {
  const chartCanvas = document.getElementById("irSpectrumChart");
  const meta = document.getElementById("ir-spectrum-meta");
  const peakTable = document.getElementById("ir-spectrum-peaks");
  const groups = document.getElementById("ir-spectrum-groups");
  const interpretation = document.getElementById("ir-spectrum-interpretation");
  const note = document.getElementById("ir-spectrum-note");
  const slideTitle = document.getElementById("ir-slide-title");
  if (!chartCanvas || typeof Chart === "undefined") return;

  const spectrum = normalizeIRSpectrumData(data, fallbackCompound);
  if (slideTitle) slideTitle.innerText = "Đồ thị IR của NT " + spectrum.compound;
  const [high, low] = spectrum.rangeCm1;
  const peakTransmittance = peak => {
    const dip = peak.intensity * (18 + peak.intensity * 68);
    return Math.max(3, 98 - dip);
  };
  const steps = Math.min(520, Math.max(240, Math.round((high - low) / 8)));
  const step = (high - low) / steps;
  const transmittanceAt = wavenumber => {
    let value = 98;
    spectrum.peaks.forEach(peak => {
      const sigma = peak.widthCm1 / 2.355;
      const distance = (wavenumber - peak.wavenumber) / sigma;
      const dip = peak.intensity * (18 + peak.intensity * 68);
      value -= dip * Math.exp(-0.5 * distance * distance);
    });
    return Math.max(0, Math.min(100, value));
  };
  const curve = [];
  for (let index = 0; index <= steps; index++) {
    const wavenumber = high - index * step;
    curve.push({ x: Number(wavenumber.toFixed(2)), y: Number(transmittanceAt(wavenumber).toFixed(2)) });
  }
  const peakPoints = spectrum.peaks.map(peak => ({ x: peak.wavenumber, y: peakTransmittance(peak) }));

  if (irSpectrumChartInstance) irSpectrumChartInstance.destroy();
  irSpectrumChartInstance = new Chart(chartCanvas.getContext("2d"), {
    type: "line",
    data: {
      datasets: [{
        label: "Độ truyền qua IR",
        data: curve,
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.14)",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.12,
        parsing: false
      }, {
        type: "scatter",
        label: "Đỉnh đặc trưng",
        data: peakPoints,
        backgroundColor: "#fbbf24",
        borderColor: "#fef3c7",
        borderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6,
        parsing: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: "nearest", intersect: false },
      scales: {
        x: {
          type: "linear",
          min: low,
          max: high,
          reverse: true,
          title: { display: true, text: "Số sóng (cm⁻¹)", color: "#cbd5e1", font: { size: 11, weight: "600" } },
          grid: { color: "rgba(148, 163, 184, 0.16)" },
          ticks: { color: "#94a3b8", maxTicksLimit: 9, callback: value => Number(value).toLocaleString("en-US") }
        },
        y: {
          min: 0,
          max: 100,
          title: { display: true, text: "Độ truyền qua (%)", color: "#cbd5e1", font: { size: 11, weight: "600" } },
          grid: { color: "rgba(148, 163, 184, 0.16)" },
          ticks: { color: "#94a3b8", callback: value => value + "%" }
        }
      },
      plugins: {
        legend: { labels: { color: "#e2e8f0", usePointStyle: true, boxWidth: 8, font: { size: 10 } } },
        tooltip: {
          callbacks: {
            label: context => context.datasetIndex === 1 ?
              ("Đỉnh: " + context.parsed.x.toFixed(0) + " cm⁻¹") :
              ("Độ truyền qua: " + context.parsed.y.toFixed(1) + "%")
          }
        }
      }
    }
  });

  if (meta) {
    const [rangeHigh, rangeLow] = spectrum.rangeCm1;
    meta.innerHTML = [
      ["Hợp chất", spectrum.compound + (spectrum.formula ? " (" + spectrum.formula + ")" : "")],
      ["Phương pháp", spectrum.technique],
      ["Trạng thái mẫu", spectrum.sampleState],
      ["Khoảng đo", rangeHigh + "–" + rangeLow + " cm⁻¹"],
      ["Độ phân giải", spectrum.resolutionCm1 + " cm⁻¹"],
      ["Số lần quét", String(spectrum.scans)]
    ].map(([label, value]) => "<div class=\"rounded-lg border border-slate-700 bg-slate-900/70 px-2.5 py-2\"><span class=\"block text-[10px] font-semibold uppercase text-slate-400\">" + escapeHtml(label) + "</span><span class=\"mt-0.5 block text-xs font-semibold text-cyan-200\">" + formatChemText(value) + "</span></div>").join("");
  }
  if (peakTable) {
    peakTable.innerHTML = spectrum.peaks.length ? spectrum.peaks.map(peak =>
      "<tr class=\"border-t border-slate-700 hover:bg-slate-800/70\"><td class=\"px-2.5 py-2 font-mono text-amber-300\">" + peak.wavenumber.toFixed(0) + "</td><td class=\"px-2.5 py-2 text-slate-300\">" + escapeHtml(peak.band) + "</td><td class=\"px-2.5 py-2 font-mono text-cyan-200\">" + (peak.intensity * 100).toFixed(0) + "%</td><td class=\"px-2.5 py-2 text-slate-200\">" + formatChemText(peak.assignment) + "</td></tr>"
    ).join("") : "<tr><td colspan=\"4\" class=\"px-2.5 py-3 text-center text-slate-400\">Chưa có đỉnh đặc trưng.</td></tr>";
  }
  if (groups) groups.innerHTML = spectrum.functionalGroups.length ? spectrum.functionalGroups.map(group => "<span class=\"rounded-full border border-cyan-700/60 bg-cyan-950/60 px-2 py-1 text-[11px] text-cyan-200\">" + formatChemText(group) + "</span>").join("") : "<span class=\"text-xs text-slate-400\">Chưa có tóm tắt nhóm chức.</span>";
  if (interpretation) interpretation.innerHTML = formatChemText(spectrum.interpretation);
  if (note) note.innerHTML = "<i class=\"fa-solid fa-circle-info mr-1\"></i>" + formatChemText(spectrum.referenceNote);
}

async function analyzeIRSpectrum() {
  const input = document.getElementById("ir-compound-input");
  const button = document.getElementById("ir-spectrum-submit");
  const status = document.getElementById("ir-spectrum-status");
  const query = input ? input.value.trim() : "";
  if (!query) {
    if (status) status.innerText = "Hãy nhập tên chất tiếng Anh hoặc công thức.";
    return;
  }
  if (status) status.innerText = "Gemini đang chuẩn bị phổ IR tham chiếu...";
  if (button) button.disabled = true;
  const prompt = "You are a senior analytical chemist. Analyze the compound requested below and return ONLY valid JSON, without markdown. Use an English chemical name, but write peak assignments and interpretation in Vietnamese. The plotted spectrum is a reference estimate, never claim it is measured data. Use wavenumbers in cm^-1, a range from 4000 to 400 cm^-1, peak intensity from 0 to 1, and include all diagnostically useful peaks.\n\nCompound request: " + query + "\n\nJSON schema:\n{\n  \"compound\": \"English compound name\",\n  \"formula\": \"ASCII chemical formula\",\n  \"sampleState\": \"solid, liquid, gas, or solution\",\n  \"technique\": \"ATR-FTIR, transmission, or gas cell\",\n  \"rangeCm1\": [4000, 400],\n  \"resolutionCm1\": 4,\n  \"scans\": 32,\n  \"peaks\": [{\"wavenumber\": 1700, \"intensity\": 0.8, \"widthCm1\": 25, \"band\": \"strong\", \"assignment\": \"Gán đỉnh bằng tiếng Việt\"}],\n  \"functionalGroups\": [\"Tên nhóm chức\"],\n  \"interpretation\": \"Diễn giải ngắn bằng tiếng Việt\",\n  \"referenceNote\": \"Ghi chú tham chiếu bằng tiếng Việt\"\n}";
  try {
    const response = await callGeminiAPI(prompt);
    const match = response.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No valid IR JSON found");
    const data = JSON.parse(match[0]);
    const normalized = normalizeIRSpectrumData(data, query);
    if (!normalized.peaks.length) throw new Error("No characteristic peaks returned");
    renderIRSlides([normalized]);
    if (status) status.innerText = "Đã tạo phổ IR tham chiếu. Hãy đối chiếu với kết quả đo trước khi báo cáo.";
  } catch (error) {
    console.error("IR spectrum analysis error:", error);
    if (status) status.innerText = "Chưa thể tạo phổ IR. Vui lòng thử lại.";
  } finally {
    if (button) button.disabled = false;
  }
}

function isIRQuestion(question) {
  const normalizedQuestion = String(question || "").normalize("NFC");
  const explicitIRTerms = [
    /\b(?:IR|FT-?IR|ATR-?FTIR|NIR|MIR|infra-?red)\b/i,
    /(?:quang\s*)?phổ\s+hồng\s+ngoại/i,
    /phổ\s+(?:IR|FT-?IR|dao\s+động|rung)/i,
    /hồng\s+ngoại/i
  ];
  if (explicitIRTerms.some(pattern => pattern.test(normalizedQuestion))) {
    return true;
  }

  const hasIRMeasurement = /(?:số\s*sóng|đỉnh|dải|vạch)\s*(?:hấp\s*thụ)?|cm\s*(?:\^\s*)?(?:[-−]\s*1|⁻¹)|độ\s+truyền\s+qua|transmittance/i.test(normalizedQuestion);
  const hasIRContext = /phổ|hấp\s*thụ|nhóm\s+chức|liên\s+kết|dao\s+động|rung|đồ\s+thị/i.test(normalizedQuestion);
  return hasIRMeasurement && hasIRContext;
}

async function analyzeIRSpectraFromQuestion(question) {
  const status = document.getElementById("ir-spectrum-status");
  if (status) status.innerText = "Gemini đang nhận diện các chất trong câu hỏi để tạo slide phổ IR...";
  const prompt = [
    "You are an analytical chemistry assistant.",
    "Read the Vietnamese question below and identify every distinct chemical compound or elemental substance discussed in an IR context.",
    "Treat a substance mentioned with IR bands, absorption peaks, wavenumbers, vibrations, bonds, or functional groups as a spectrum target even when the user does not explicitly ask to draw it.",
    "Return ONLY valid JSON, without markdown, with at most 6 spectra. Do not invent unrelated substances.",
    "Use English chemical names, Vietnamese peak assignments and interpretation, wavenumbers in cm^-1, range [4000, 400], intensity from 0 to 1, technique, sample state, resolution and scans.",
    "If no chemical target is present, return an empty spectra array.",
    "Question:",
    question,
    "Schema:",
    "{\"spectra\":[{\"compound\":\"English compound name\",\"formula\":\"ASCII formula\",\"sampleState\":\"solid, liquid, gas, or solution\",\"technique\":\"ATR-FTIR, transmission, or gas cell\",\"rangeCm1\":[4000,400],\"resolutionCm1\":4,\"scans\":32,\"peaks\":[{\"wavenumber\":1700,\"intensity\":0.8,\"widthCm1\":25,\"band\":\"strong\",\"assignment\":\"Gán đỉnh bằng tiếng Việt\"}],\"functionalGroups\":[\"Tên nhóm chức\"],\"interpretation\":\"Diễn giải bằng tiếng Việt\",\"referenceNote\":\"Ghi chú tham chiếu bằng tiếng Việt\"}]}"
  ].join("\n");
  try {
    const response = await callGeminiAPI(prompt);
    const arrayMatch = response.match(/\[[\s\S]*\]/);
    const objectMatch = response.match(/\{[\s\S]*\}/);
    if (!arrayMatch && !objectMatch) throw new Error("No valid IR spectra JSON found");
    const parsed = JSON.parse(arrayMatch ? arrayMatch[0] : objectMatch[0]);
    const rawSpectra = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.spectra) ? parsed.spectra : [parsed]);
    const spectra = rawSpectra.slice(0, 6).map(item => normalizeIRSpectrumData(item, question)).filter(item => item.peaks.length);
    if (!spectra.length) throw new Error("No chemical IR targets found");
    renderIRSlides(spectra);
    if (status) status.innerText = "Đã tạo " + spectra.length + " đồ thị IR. Dùng danh sách slide để chuyển chất.";
  } catch (error) {
    console.error("Multi-IR analysis error:", error);
    if (status) status.innerText = "Không nhận diện được chất cần vẽ phổ IR trong câu hỏi.";
  }
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
  _0x31793b.insertAdjacentHTML("beforeend", "\n                <div id=\"" + _0x34e138 + "\" class=\"flex items-start space-x-2\">\n                    <div class=\"w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-xs\">AI</div>\n                    <div class=\"bg-slate-700/80 text-slate-400 p-3 rounded-2xl rounded-tl-none text-sm animate-pulse\">\n                        <i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>ChemAIBuddy đang suy nghĩ...\n                    </div>\n                </div>\n            ");
  _0x31793b.scrollTop = _0x31793b.scrollHeight;
  if (isIRQuestion(_0x1d7bd1)) {
    void analyzeIRSpectraFromQuestion(_0x1d7bd1);
  }
  try {
    const _0x4a2592 = "Bạn là Gia sư Hóa học ChemAIBuddy chuyên trách Khối THPT (Lớp 10, 11, 12). Trả lời ngắn gọn, chính xác, dễ hiểu; tối đa 6 đoạn hoặc gạch đầu dòng trừ khi người học yêu cầu giải chi tiết. Dùng tên hóa chất bằng tiếng Anh chuẩn (ví dụ: sulfuric acid, sodium hydroxide), viết công thức ở dạng H2SO4, ion ở dạng Fe^3+ hoặc SO4^2-, và mũi tên phản ứng bằng -> để giao diện định dạng đúng. Không dùng LaTeX. Khi người học hỏi về phổ IR, nêu số sóng cm^-1, nhóm chức, cường độ, phương pháp đo, trạng thái mẫu, khoảng đo, độ phân giải và số lần quét; nhắc rõ dữ liệu tham chiếu cần đối chiếu phổ thực nghiệm. Câu hỏi:\n" + _0x1d7bd1;
    let _0x1996b4 = await findTutorCache(_0x1d7bd1);
    if (_0x1996b4) {
      console.log("Tutor cache hit");
    } else {
      try {
        _0x1996b4 = await callDifyAPI(_0x1d7bd1);
        console.log("Dify response received");
      } catch (_0xdifyError) {
        console.warn("Dify failed, using Gemini fallback:", _0xdifyError.message);
        _0x1996b4 = await callGeminiAPI(_0x4a2592);
      }
      await saveTutorCache(_0x1d7bd1, _0x1996b4);
    }
    document.getElementById(_0x34e138).remove();
    _0x31793b.insertAdjacentHTML("beforeend", "\n                    <div class=\"flex items-start space-x-2\">\n                        <div class=\"w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-xs\">AI</div>\n                        <div class=\"bg-slate-700/80 text-slate-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm leading-relaxed\">" + formatChemText(_0x1996b4) + "</div>\n                    </div>\n                ");
    saveChatLogToDatastore(getChatSessionId(), _0x1d7bd1, _0x1996b4);
  } catch (_0x2fc877) {
    document.getElementById(_0x34e138).remove();
    _0x31793b.insertAdjacentHTML("beforeend", "\n                    <div class=\"flex items-start space-x-2\">\n                        <div class=\"w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-xs\">AI</div>\n                        <div class=\"bg-red-900/50 text-red-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm\">Không thể kết nối Gia sư AI. " + escapeHtml(_0x2fc877.message || "Vui lòng thử lại.") + "</div>\n                    </div>\n                ");
  }
  _0x31793b.scrollTop = _0x31793b.scrollHeight;
}
function renderAIQuizQuestion(quizData) {
  const questionElement = document.getElementById("quiz-question");
  const optionsElement = document.getElementById("quiz-options");
  const options = Array.isArray(quizData.options) ? quizData.options : [];
  const correctIndex = Number(quizData.correct_index !== undefined ? quizData.correct_index : quizData.correctIndex);

  currentQuizQuestion = {
    ...quizData,
    options,
    correctIndex
  };
  hasAnsweredCurrentQuiz = false;
  questionElement.innerHTML = formatChemText(quizData.question);
  optionsElement.innerHTML = options.map((option, index) => "\n        <button onclick=\"checkQuizAnswer(" + index + ")\" class=\"quiz-option-btn w-full text-left p-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-600 text-xs font-medium transition flex items-center gap-2\">\n            <span class=\"quiz-option-label w-7 h-7 shrink-0 rounded-lg bg-cyan-700 text-white font-bold flex items-center justify-center text-[11px]\">" + (['A', 'B', 'C', 'D'][index] || index + 1) + "</span><span>" + formatChemText(option) + "</span>\n        </button>\n    ").join("");
  document.getElementById("quiz-feedback").classList.add("hidden");
  document.getElementById("quiz-next-button").classList.add("hidden");
}

async function generateAIQuiz() {
  const _0x19a6d = document.getElementById("quiz-question");
  const _0x5ec95e = document.getElementById("quiz-options");
  const _0x445628 = document.getElementById("quiz-feedback");
  const nextButton = document.getElementById("quiz-next-button");
  const previousQuestionText = currentQuizQuestion ? currentQuizQuestion.question : null;
  hasAnsweredCurrentQuiz = true;
  currentQuizQuestion = null;
  _0x19a6d.innerText = "🤖 ChemAIBuddy đang tra cứu / tạo câu hỏi trắc nghiệm...";
  _0x5ec95e.innerHTML = "";
  _0x445628.classList.add("hidden");
  nextButton.classList.add("hidden");
  if (supabaseClient) {
    try {
      const {
        data: _0x4c85bf,
        error: _0x18441f
      } = await supabaseClient.from("quiz_questions").select("*");
      if (_0x18441f) {
        throw _0x18441f;
      }
      if (_0x4c85bf && _0x4c85bf.length > 0) {
        const differentQuestions = previousQuestionText ? _0x4c85bf.filter(question => question.question !== previousQuestionText) : [];
        const newQuestions = differentQuestions.length > 0 ? differentQuestions : _0x4c85bf;
        const _0x4d1f9e = newQuestions[Math.floor(Math.random() * newQuestions.length)];
        renderAIQuizQuestion(_0x4d1f9e);
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
    renderAIQuizQuestion(_0x384a5c);
  } catch (_0x3e3703) {
    _0x19a6d.innerText = "❌ Không thể tạo câu hỏi mới lúc này. Vui lòng bấm thử lại!";
    nextButton.classList.remove("hidden");
    nextButton.innerHTML = "<i class=\"fa-solid fa-rotate-right mr-1.5\"></i> Thử tải lại câu hỏi";
  }
}
function checkQuizAnswer(selectedIndex) {
  if (hasAnsweredCurrentQuiz || !currentQuizQuestion) {
    return;
  }
  hasAnsweredCurrentQuiz = true;
  const _0x270a6b = document.getElementById("quiz-feedback");
  const _0x289422 = document.getElementById("quiz-score");
  const _0x2a49d4 = document.getElementById("quiz-streak");
  const _0x1cf109 = document.getElementById("quiz-rank");
  const nextButton = document.getElementById("quiz-next-button");
  const correctIndex = currentQuizQuestion.correctIndex;
  const answerLabels = ["A", "B", "C", "D"];
  const optionButtons = document.querySelectorAll(".quiz-option-btn");

  optionButtons.forEach((optionButton, index) => {
    const optionLabel = optionButton.querySelector(".quiz-option-label");
    optionButton.disabled = true;
    if (index === correctIndex) {
      optionButton.className = "quiz-option-btn w-full text-left p-3.5 bg-emerald-600 border border-emerald-300 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-default";
      optionLabel.className = "quiz-option-label w-7 h-7 shrink-0 rounded-lg bg-emerald-800 text-white font-bold flex items-center justify-center text-[11px]";
    } else if (index === selectedIndex) {
      optionButton.className = "quiz-option-btn w-full text-left p-3.5 bg-rose-600 border border-rose-300 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-rose-500/20 cursor-default";
      optionLabel.className = "quiz-option-label w-7 h-7 shrink-0 rounded-lg bg-rose-800 text-white font-bold flex items-center justify-center text-[11px]";
    } else {
      optionButton.className = "quiz-option-btn w-full text-left p-3.5 bg-slate-800 border border-slate-700 text-slate-500 rounded-xl text-xs font-medium transition flex items-center gap-2 opacity-60 cursor-default";
      optionLabel.className = "quiz-option-label w-7 h-7 shrink-0 rounded-lg bg-cyan-900 text-slate-400 font-bold flex items-center justify-center text-[11px]";
    }
  });

  _0x270a6b.classList.remove("hidden");
  if (selectedIndex === correctIndex) {
    quizScore += 10;
    quizStreak += 1;
    _0x270a6b.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/60";
    _0x270a6b.innerHTML = "<strong><i class=\"fa-solid fa-circle-check mr-1\"></i> Chính xác! (+10 Điểm)</strong><div class=\"mt-1.5 leading-relaxed\">• Đáp án: <strong>" + (answerLabels[correctIndex] || correctIndex + 1) + ". " + formatChemText(currentQuizQuestion.options[correctIndex]) + "</strong><br>• Giải thích: " + formatChemText(currentQuizQuestion.explanation) + "</div>";
  } else {
    quizStreak = 0;
    _0x270a6b.className = "p-4 rounded-xl text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-700/60";
    _0x270a6b.innerHTML = "<strong><i class=\"fa-solid fa-circle-xmark mr-1\"></i> Chưa đúng rồi!</strong><div class=\"mt-1.5 leading-relaxed\">• Đáp án đúng: <strong class=\"text-amber-300\">" + (answerLabels[correctIndex] || correctIndex + 1) + ". " + formatChemText(currentQuizQuestion.options[correctIndex]) + "</strong><br>• Giải thích: " + formatChemText(currentQuizQuestion.explanation) + "</div>";
  }
  saveStudentProgress(selectedIndex === correctIndex ? 10 : 0, selectedIndex === correctIndex);
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
  nextButton.innerHTML = "<i class=\"fa-solid fa-arrow-right mr-1.5\"></i> Câu tiếp theo";
  nextButton.classList.remove("hidden");
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

function normalizeKahootQuestion(rawQuestion) {
  if (!rawQuestion || typeof rawQuestion !== "object") return null;

  const question = String(rawQuestion.question || "").trim();
  const options = Array.isArray(rawQuestion.options) ? rawQuestion.options.map(option => String(option || "").trim()) : [];
  let correctIndex = rawQuestion.correctIndex !== undefined ? rawQuestion.correctIndex : rawQuestion.correct_index;
  if (typeof correctIndex === "string" && /^[A-D]$/i.test(correctIndex.trim())) {
    correctIndex = correctIndex.trim().toUpperCase().charCodeAt(0) - 65;
  }
  correctIndex = Number(correctIndex);

  const uniqueOptions = new Set(options.map(option => option.toLocaleLowerCase("vi-VN")));
  if (!question || options.length !== 4 || options.some(option => !option) || uniqueOptions.size !== 4 ||
      !Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
    return null;
  }

  return {
    question,
    options,
    correct_index: correctIndex,
    explanation: String(rawQuestion.explanation || "Chưa có lời giải chi tiết.").trim()
  };
}

function getKahootQuestionIdentity(question) {
  return String(question && question.question || "")
    .normalize("NFKC")
    .toLocaleLowerCase("vi-VN")
    .replace(/[?!.,;:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeKahootQuestions(questions) {
  const seenQuestions = new Set();
  const result = [];
  (Array.isArray(questions) ? questions : []).forEach(rawQuestion => {
    const question = normalizeKahootQuestion(rawQuestion);
    if (!question) return;
    const identity = getKahootQuestionIdentity(question);
    if (!identity || seenQuestions.has(identity)) return;
    seenQuestions.add(identity);
    result.push(question);
  });
  return result;
}

function parseKahootQuestionsResponse(responseText) {
  const cleanedResponse = String(responseText || "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  let parsedResponse;
  try {
    parsedResponse = JSON.parse(cleanedResponse);
  } catch (error) {
    const firstBracket = cleanedResponse.indexOf("[");
    const lastBracket = cleanedResponse.lastIndexOf("]");
    if (firstBracket < 0 || lastBracket <= firstBracket) {
      throw new Error("AI không trả về mảng JSON câu hỏi hợp lệ.");
    }
    parsedResponse = JSON.parse(cleanedResponse.slice(firstBracket, lastBracket + 1));
  }

  const rawQuestions = Array.isArray(parsedResponse)
    ? parsedResponse
    : (parsedResponse && Array.isArray(parsedResponse.questions) ? parsedResponse.questions : []);
  const questions = dedupeKahootQuestions(rawQuestions);
  if (!questions.length) {
    throw new Error("AI không tạo được câu hỏi Kahoot hợp lệ.");
  }
  return questions;
}

function buildKahootQuestionPrompt(provider, count, excludedQuestions = []) {
  const providerInstruction = provider === "dify"
    ? "Ưu tiên khai thác kho tri thức đã cấu hình trong Dify và các dạng kiến thức, bài tập, thí nghiệm bám sát SGK Hóa học THPT; diễn đạt lại, không sao chép nguyên văn."
    : "Ưu tiên câu hỏi vận dụng đa dạng về hiện tượng, tính toán, an toàn thí nghiệm và liên hệ giữa các chuyên đề để bổ sung cho nhóm câu bám sát SGK.";
  const excludedList = dedupeKahootQuestions(excludedQuestions)
    .slice(0, 30)
    .map((question, index) => (index + 1) + ". " + question.question)
    .join("\n");

  return [
    "Bạn là chuyên gia biên soạn câu hỏi Kahoot Hóa học THPT theo chương trình mới Lớp 10, 11 và 12.",
    providerInstruction,
    "Tạo đúng " + count + " câu trắc nghiệm, mỗi câu có đúng 4 lựa chọn và chỉ một đáp án đúng.",
    "Phân bố câu hỏi giữa lý thuyết, hiện tượng thí nghiệm, phương trình phản ứng, nhận biết, tính toán và hóa học hữu cơ.",
    "Dùng công thức dạng H2SO4, ion dạng Fe^3+ hoặc SO4^2-, trạng thái (aq)/(s)/(l)/(g) và mũi tên ->. Không dùng LaTeX hoặc ký tự Unicode chỉ số.",
    "Giải thích đáp án rõ ràng, chính xác và phù hợp học sinh THPT.",
    excludedList ? "Không tạo lại các câu sau:\n" + excludedList : "Không lặp câu hỏi trong cùng bộ.",
    "Trả về DUY NHẤT JSON, không dùng markdown, theo cấu trúc:",
    "[{\"question\":\"Nội dung câu hỏi\",\"options\":[\"Đáp án A\",\"Đáp án B\",\"Đáp án C\",\"Đáp án D\"],\"correctIndex\":0,\"explanation\":\"Lời giải chi tiết\"}]"
  ].join("\n");
}

async function generateKahootQuestionsWithProvider(provider, count, excludedQuestions = []) {
  if (count <= 0) return [];
  const prompt = buildKahootQuestionPrompt(provider, count, excludedQuestions);
  const response = provider === "dify" ? await callDifyAPI(prompt) : await callGeminiAPI(prompt);
  return parseKahootQuestionsResponse(response).slice(0, count);
}

function shuffleKahootQuestions(questions) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const targetIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[targetIndex]] = [shuffled[targetIndex], shuffled[index]];
  }
  return shuffled;
}

async function generateHybridKahootQuestions(totalCount, cachedQuestions = []) {
  const normalizedCache = dedupeKahootQuestions(cachedQuestions);
  const difyTarget = Math.ceil(totalCount / 2);
  const geminiTarget = totalCount - difyTarget;
  const [difyResult, geminiResult] = await Promise.allSettled([
    generateKahootQuestionsWithProvider("dify", difyTarget, normalizedCache),
    generateKahootQuestionsWithProvider("gemini", geminiTarget, normalizedCache)
  ]);

  const difyQuestions = difyResult.status === "fulfilled" ? difyResult.value : [];
  const geminiQuestions = geminiResult.status === "fulfilled" ? geminiResult.value : [];
  if (difyResult.status === "rejected") {
    console.warn("Dify tạo câu hỏi Kahoot thất bại, Gemini sẽ tạo bù:", difyResult.reason);
  }
  if (geminiResult.status === "rejected") {
    console.warn("Gemini tạo nhóm câu hỏi Kahoot ban đầu thất bại:", geminiResult.reason);
  }

  let generatedQuestions = dedupeKahootQuestions([...difyQuestions, ...geminiQuestions]);
  let missingCount = totalCount - generatedQuestions.length;
  if (missingCount > 0) {
    try {
      const geminiReplacements = await generateKahootQuestionsWithProvider(
        "gemini",
        missingCount,
        [...normalizedCache, ...generatedQuestions]
      );
      generatedQuestions = dedupeKahootQuestions([...generatedQuestions, ...geminiReplacements]);
    } catch (error) {
      console.warn("Gemini không thể tạo đủ số câu thay thế; chuyển sang ngân hàng Supabase:", error);
    }
  }

  let finalQuestions = dedupeKahootQuestions([...generatedQuestions, ...shuffleKahootQuestions(normalizedCache)]);
  missingCount = totalCount - finalQuestions.length;
  if (missingCount > 0) {
    try {
      const finalGeminiFill = await generateKahootQuestionsWithProvider("gemini", missingCount, finalQuestions);
      generatedQuestions = dedupeKahootQuestions([...generatedQuestions, ...finalGeminiFill]);
      finalQuestions = dedupeKahootQuestions([...generatedQuestions, ...shuffleKahootQuestions(normalizedCache)]);
    } catch (error) {
      console.warn("Gemini không thể hoàn tất bộ câu hỏi Kahoot:", error);
    }
  }

  if (finalQuestions.length < totalCount) {
    throw new Error("Không đủ " + totalCount + " câu hỏi hợp lệ từ Dify, Gemini và Supabase.");
  }
  console.log("Kahoot AI:", difyQuestions.length + " câu Dify, " +
    (generatedQuestions.length - difyQuestions.length) + " câu Gemini, " +
    Math.max(0, totalCount - generatedQuestions.length) + " câu Supabase.");
  return {
    questions: shuffleKahootQuestions(finalQuestions).slice(0, totalCount),
    generatedQuestions
  };
}

async function startKahoot10Game() {
  if (!currentHostPin || !supabaseClient) {
    return;
  }
  const _0x9f02c5 = document.getElementById("btn-start-kahoot-game");
  _0x9f02c5.disabled = true;
  _0x9f02c5.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> Dify + Gemini đang tạo 10 câu...";
  try {
    kahootQuestionsSet = [];
    const {
      data: _0x58bbb6,
      error: _0x2e5d63
    } = await supabaseClient.from("quiz_questions").select("*");
    if (_0x2e5d63) {
      console.warn("Không tải được ngân hàng Supabase, tiếp tục bằng AI:", _0x2e5d63);
    }
    const _0x4fc10c = await generateHybridKahootQuestions(10, _0x58bbb6 || []);
    kahootQuestionsSet = _0x4fc10c.questions;
    if (_0x4fc10c.generatedQuestions.length) {
      const { error: _0x32ab73 } = await supabaseClient.from("quiz_questions").upsert(_0x4fc10c.generatedQuestions, {
        onConflict: "question",
        ignoreDuplicates: true
      });
      if (_0x32ab73) {
        console.warn("Không thể lưu câu hỏi AI mới vào Supabase:", _0x32ab73);
      }
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
    saveStudentProgress(10, true);
    _0x4e434a.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/60";
    _0x4e434a.innerHTML = "<strong>🎉 Chính xác! (+10 Điểm)</strong><br><span class=\"text-slate-400 font-normal\">Đáp án chuẩn & lời giải chi tiết sẽ được hiển thị khi hết thời gian đếm ngược.</span>";
  } else {
    saveStudentProgress(0, false);
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
  let _0x36dc86 = [];
  if (supabaseClient && joinedStudentPin) {
    try {
      const { data: _0x48adce } = await supabaseClient.from("room_participants").select("*").eq("room_pin", joinedStudentPin).order("score", { ascending: false });
      _0x36dc86 = _0x48adce || [];
    } catch (_error) {
      console.warn("Không tải được bảng tổng kết Kahoot:", _error);
    }
  }
  if (!_0x36dc86.length && joinedStudentNick) _0x36dc86 = [{ id: joinedParticipantId, nickname: joinedStudentNick, score: studentKahootScore }];
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

async function loadKahootLeaderboards(mode = currentLeaderboardMode) {
  currentLeaderboardMode = mode === "exp" ? "exp" : "streak";
  const body = document.getElementById("leaderboard-body");
  if (!body) return;
  const column = currentLeaderboardMode === "exp" ? "kahoot_exp" : "kahoot_streak";
  
  const tabStreak = document.getElementById("leaderboard-tab-streak");
  const tabExp = document.getElementById("leaderboard-tab-exp");
  if (tabStreak) tabStreak.className = currentLeaderboardMode === "streak" ? "rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-white transition flex items-center gap-1.5 shadow" : "rounded-lg bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1.5";
  if (tabExp) tabExp.className = currentLeaderboardMode === "exp" ? "rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-white transition flex items-center gap-1.5 shadow" : "rounded-lg bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1.5";

  let rows = getLocalAccounts();
  if (supabaseClient) {
    try {
      const result = await Promise.race([
        supabaseClient.from("student_profiles").select("id,username,class_name,school_name,kahoot_streak,kahoot_exp").order(column, { ascending: false }).limit(50),
        new Promise(resolve => setTimeout(() => resolve({ data: null }), 2500))
      ]);
      if (result?.data?.length) rows = result.data;
    } catch (_error) {
      console.warn("Chuyển sang dữ liệu bảng xếp hạng local:", _error);
    }
  }

  rows = (rows || []).sort((a, b) => Number(b[column] || 0) - Number(a[column] || 0)).slice(0, 50);

  if (!rows.length) {
    body.innerHTML = "<tr><td colspan=\"3\" class=\"p-5 text-center text-slate-400 italic\">Chưa có dữ liệu xếp hạng học sinh.</td></tr>";
    return;
  }

  body.innerHTML = rows.map((item, index) => {
    const rankDisplay = index === 0 ? "🥇 #1" : index === 1 ? "🥈 #2" : index === 2 ? "🥉 #3" : "#" + (index + 1);
    const rankColor = index === 0 ? "text-amber-300 font-black" : index === 1 ? "text-slate-300 font-bold" : index === 2 ? "text-amber-500 font-bold" : "text-slate-400 font-semibold";
    const valueSuffix = currentLeaderboardMode === "exp" ? " EXP" : " câu đúng";
    const infoText = [item.class_name, item.school_name].filter(Boolean).join(" - ");

    return `
      <tr class="border-b border-slate-700/60 transition hover:bg-slate-800/60">
        <td class="p-3.5 font-mono ${rankColor}">${rankDisplay}</td>
        <td class="p-3.5 text-white font-medium">
          <span>${escapeHtml(item.username || "Học sinh")}</span>
          ${infoText ? `<span class="ml-2 text-[11px] text-slate-400 font-normal">(${escapeHtml(infoText)})</span>` : ""}
        </td>
        <td class="p-3.5 text-right font-mono text-cyan-300 font-bold">
          ${Number(item[column] || 0)}${valueSuffix}
        </td>
      </tr>`;
  }).join("");
}

async function loadTeacherClassroom() {
  if (!isTeacherAuthed) { pendingTeacherTab = "teacher"; openTeacherPassModal(); return; }
  const list = document.getElementById("teacher-student-list");
  if (!list) return;
  let rows = getLocalAccounts();
  if (supabaseClient) {
    try {
      const result = await Promise.race([
        supabaseClient.from("student_profiles").select("*").order("username"),
        new Promise(resolve => setTimeout(() => resolve({ data: null }), 2500))
      ]);
      if (result?.data?.length) rows = result.data;
    } catch (_error) {}
  }
  window.__teacherStudents = rows || [];
  if (!rows.length) {
    list.innerHTML = "<tr><td colspan=\"6\" class=\"p-5 text-center text-slate-400 italic\">Chưa có tài khoản học sinh trong hệ thống.</td></tr>";
    return;
  }

  list.innerHTML = rows.map((student, index) => `
    <tr class="border-b border-slate-700/60 hover:bg-slate-800/50 transition">
      <td class="p-3 font-mono text-slate-400">${index + 1}</td>
      <td class="p-3 font-bold text-white">${escapeHtml(student.username)}</td>
      <td class="p-3 text-slate-300">${escapeHtml(student.class_name || "-")}</td>
      <td class="p-3 text-slate-400 text-xs">${escapeHtml(student.school_name || "-")}</td>
      <td class="p-3 font-medium text-amber-300">${escapeHtml(student.teacher_badge || "Chưa đặt")}</td>
      <td class="p-3 text-right">
        <button onclick="showStudentDetail('${encodeURIComponent(student.id)}')" class="rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition shadow">
          <i class="fa-solid fa-eye mr-1"></i> Xem chi tiết
        </button>
      </td>
    </tr>`).join("");
}

async function showStudentDetail(encodedId) {
  const targetId = decodeURIComponent(encodedId);
  const student = (window.__teacherStudents || []).find(item => String(item.id) === targetId);
  const detail = document.getElementById("teacher-student-detail");
  if (!student || !detail) return;

  detail.classList.remove("hidden");
  detail.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
      <div class="flex items-center gap-3">
        <button onclick="hideStudentDetail()" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition flex items-center justify-center" title="Quay lại danh sách học sinh">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h4 class="font-bold text-white text-base flex items-center gap-2">
            ${escapeHtml(student.username)}
            <span class="text-xs font-normal text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800/60 font-mono">${escapeHtml(student.class_name || "Chưa chọn lớp")}</span>
          </h4>
          <p class="text-xs text-slate-400 mt-0.5"><i class="fa-solid fa-school mr-1 text-slate-500"></i>${escapeHtml(student.school_name || "Trường THPT")}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <button onclick="assignStudentBadge('${encodeURIComponent(student.id)}')" class="rounded-xl bg-amber-500 hover:bg-amber-600 px-3.5 py-2 text-xs font-bold text-slate-950 transition shadow shadow-amber-500/20 flex items-center gap-1.5">
          <i class="fa-solid fa-award"></i> Đặt / Sửa Danh Hiệu Custom
        </button>
        <button onclick="exportStudentReportPDF('${encodeURIComponent(student.id)}')" class="rounded-xl bg-slate-700 hover:bg-slate-600 px-3.5 py-2 text-xs font-bold text-cyan-300 border border-slate-600 transition flex items-center gap-1.5">
          <i class="fa-solid fa-file-pdf"></i> Xuất Báo Cáo PDF
        </button>
      </div>
    </div>

    <!-- Dashboard Thống Kê Học Sinh -->
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1 text-xs">
      <div class="rounded-xl bg-slate-800/90 border border-slate-700 p-3">
        <span class="text-slate-400 block text-[11px]">Điểm danh học</span>
        <b class="text-emerald-400 text-sm mt-0.5 block"><i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i>Đã tham gia</b>
      </div>
      <div class="rounded-xl bg-slate-800/90 border border-slate-700 p-3">
        <span class="text-slate-400 block text-[11px]">Chuỗi ngày học</span>
        <b class="text-amber-300 text-sm font-mono mt-0.5 block">${Number(student.login_streak || 1)} ngày</b>
      </div>
      <div class="rounded-xl bg-slate-800/90 border border-slate-700 p-3">
        <span class="text-slate-400 block text-[11px]">Chuỗi đúng Kahoot</span>
        <b class="text-cyan-300 text-sm font-mono mt-0.5 block">${Number(student.kahoot_streak || 0)}</b>
      </div>
      <div class="rounded-xl bg-slate-800/90 border border-slate-700 p-3">
        <span class="text-slate-400 block text-[11px]">Kinh nghiệm EXP</span>
        <b class="text-emerald-300 text-sm font-mono mt-0.5 block">${Number(student.kahoot_exp || 0)} EXP</b>
      </div>
      <div class="rounded-xl bg-slate-800/90 border border-slate-700 p-3">
        <span class="text-slate-400 block text-[11px]">Danh hiệu GV gắn</span>
        <b class="text-amber-200 text-sm mt-0.5 block truncate">${escapeHtml(student.teacher_badge || "Chưa đặt")}</b>
      </div>
    </div>`;

  detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideStudentDetail() {
  const detail = document.getElementById("teacher-student-detail");
  if (detail) detail.classList.add("hidden");
}

async function assignStudentBadge(encodedId) {
  const targetId = decodeURIComponent(encodedId);
  const student = (window.__teacherStudents || []).find(item => String(item.id) === targetId);
  if (!student) return;

  const newBadge = window.prompt("Nhập Danh hiệu Custom do Giáo viên đặt cho học sinh (" + student.username + "):", student.teacher_badge || "");
  if (newBadge === null) return;

  student.teacher_badge = newBadge.trim();

  // UPSERT to Local Accounts
  const accounts = getLocalAccounts();
  const index = accounts.findIndex(item => String(item.id) === String(student.id));
  if (index >= 0) {
    accounts[index].teacher_badge = student.teacher_badge;
    setLocalAccounts(accounts);
  }

  // UPSERT to Supabase if connected
  if (supabaseClient && !String(student.id).startsWith("local_")) {
    try {
      await supabaseClient.from("student_profiles").upsert({
        id: student.id,
        teacher_badge: student.teacher_badge,
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });
    } catch (_err) {
      console.warn("UPSERT teacher badge database warning:", _err);
    }
  }

  loadTeacherClassroom();
  showStudentDetail(encodedId);
}

function exportStudentReportPDF(encodedId) {
  const targetId = decodeURIComponent(encodedId);
  const student = (window.__teacherStudents || []).find(item => String(item.id) === targetId);
  if (!student) return;

  const contentHtml = `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <h2 style="color: #0284c7; margin-bottom: 5px;">BÁO CÁO KẾT QUẢ HỌC TẬP & GAMIFICATION</h2>
      <p><b>Họ và tên Học sinh:</b> ${escapeHtml(student.username)}</p>
      <p><b>Lớp:</b> ${escapeHtml(student.class_name || "Chưa xếp lớp")} | <b>Trường:</b> ${escapeHtml(student.school_name || "THPT")}</p>
      <hr style="border: 0.5px solid #cbd5e1; margin: 15px 0;" />
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px;">
        <tr style="background-color: #f1f5f9;">
          <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left;">Chỉ số Đánh giá</th>
          <th style="border: 1px solid #cbd5e1; padding: 8px; text-align: right;">Giá trị Thực tế</th>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">Chuỗi ngày học (Login Streak)</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: bold;">${Number(student.login_streak || 1)} ngày</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">Tổng điểm số Kahoot</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: bold; color: #16a34a;">${Number(student.kahoot_score || 0)} điểm</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">Chuỗi câu trả lời đúng (Streak)</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: bold; color: #0284c7;">${Number(student.kahoot_streak || 0)} câu</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">Điểm kinh nghiệm (EXP)</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: bold; color: #d97706;">${Number(student.kahoot_exp || 0)} EXP</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">Danh hiệu Kahoot hệ thống</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: bold;">${escapeHtml(student.kahoot_badge || "Tân binh")}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">Danh hiệu do Giáo viên gắn (Custom Badge)</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: bold; color: #b45309;">${escapeHtml(student.teacher_badge || "Chưa đặt")}</td>
        </tr>
      </table>
      
      <div style="margin-top: 25px; padding: 12px; background-color: #f8fafc; border-left: 4px solid #0284c7; font-size: 12px;">
        <b>Đánh giá chung của Giáo viên:</b> Học sinh có thái độ học tập tích cực, duy trì chuỗi tham gia thí nghiệm ảo và thử thách Kahoot đều đặn.
      </div>
    </div>`;

  printTeacherDocumentContent(contentHtml, "Báo Cáo Học Sinh - " + student.username);
}

async function generateTeacherLesson() {
  if (!isTeacherAuthed) { pendingTeacherTab = "teacher"; openTeacherPassModal(); return; }
  const topic = document.getElementById("teacher-lesson-topic")?.value.trim();
  const constraints = document.getElementById("teacher-lesson-constraints")?.value.trim();
  const output = document.getElementById("teacher-lesson-output");
  if (!topic || !output) {
    alert("Vui lòng nhập chủ đề kiến thức bài học!");
    return;
  }

  output.classList.remove("hidden");
  output.innerHTML = "<p class=\"text-cyan-400 font-semibold animate-pulse\"><i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>ChemAIBuddy Agent đang lập kế hoạch bài giảng...</p>";

  const prompt = [
    "Bạn là Trợ lý AI chuyên trách lập Kế hoạch bài giảng & Soạn giáo án Hóa học THPT (Lớp 10, 11, 12).",
    "Hãy soạn một giáo án thực tế hoàn chỉnh, bám sát SGK mới với cấu trúc chuẩn sau:",
    "1. MỤC TIÊU BÀI HỌC (Năng lực Hóa học, Phẩm chất, Kỹ năng)",
    "2. CHUẨN BỊ THÍ NGHIỆM & THIẾT BỊ DẠY HỌC (Gợi ý dùng Thí nghiệm ảo ChemAIBuddy)",
    "3. NHIỆM VỤ HỌC TẬP & HOẠT ĐỘNG TRÊN LỚP (Khởi động, Khám phá, Củng cố, Vận dụng)",
    "4. ĐÁNH GIÁ VÀ CẢNH BÁO AN TOÀN HÓA CHẤT",
    "Trình bày mạch lạc bằng Markdown rich text, công thức dạng H2SO4, ion dạng Fe^3+.",
    "Chủ đề bài học: " + topic,
    constraints ? "Yêu cầu bổ sung: " + constraints : ""
  ].join("\n");

  try {
    const result = await callGeminiAPI(prompt);
    output.innerHTML = formatChemText(result);
  } catch (error) {
    output.innerHTML = "<p class=\"text-rose-400 font-semibold\">Không thể tạo giáo án: " + escapeHtml(error.message || "Vui lòng thử lại.") + "</p>";
  }
}

async function readTeacherFile(file) {
  if (!file) return "";
  const type = file.type || "";
  if (type.includes("text") || /\.txt$/i.test(file.name)) return file.text();
  if (type === "application/pdf" && window.pdfjsLib) {
    try {
      const buffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
      let text = "";
      for (let pageNumber = 1; pageNumber <= Math.min(pdf.numPages, 20); pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
      }
      return text;
    } catch (_e) {
      console.warn("Lỗi đọc PDF:", _e);
    }
  }
  if (window.mammoth && /\.docx$/i.test(file.name)) {
    try {
      const result = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
      return result.value;
    } catch (_e) {
      console.warn("Lỗi đọc Docx:", _e);
    }
  }
  return "Tài liệu " + file.name + " (Xử lý trực tiếp).";
}

async function analyzeTeacherResource() {
  if (!isTeacherAuthed) { pendingTeacherTab = "teacher"; openTeacherPassModal(); return; }
  const output = document.getElementById("teacher-resource-output");
  const file = document.getElementById("teacher-resource-file")?.files?.[0];
  const question = document.getElementById("teacher-resource-question")?.value.trim();

  if (!output || (!file && !question)) {
    alert("Vui lòng upload tài liệu hoặc nhập câu hỏi tư vấn!");
    return;
  }

  output.classList.remove("hidden");
  output.innerHTML = "<p class=\"text-emerald-400 font-semibold animate-pulse\"><i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>ChemAIBuddy AI đang phân tích tài liệu và tư vấn sư phạm...</p>";

  try {
    const fileContent = file ? await readTeacherFile(file) : "";
    const prompt = [
      "Bạn là Cố vấn Phát triển Chuyên môn Sư phạm Hóa học THPT.",
      "Nhiệm vụ: Tóm tắt nội dung chính, đề xuất phương pháp giảng dạy đổi mới (PBL, STEM, Thí nghiệm ảo), gợi ý câu hỏi phát triển tư duy và việc cần cải thiện.",
      fileContent ? "Nội dung tài liệu upload:\n" + fileContent.slice(0, 25000) : "",
      question ? "Câu hỏi/Chủ đề tư vấn trực tiếp:\n" + question : "",
      "Trình bày rõ ràng bằng Markdown rich text."
    ].filter(Boolean).join("\n\n");

    const result = await callGeminiAPI(prompt);
    output.innerHTML = formatChemText(result);
  } catch (error) {
    output.innerHTML = "<p class=\"text-rose-400 font-semibold\">Không thể phân tích: " + escapeHtml(error.message || "Lỗi xử lý.") + "</p>";
  }
}

function printTeacherDocumentContent(contentHtml, title) {
  const printElem = document.getElementById("print-report");
  if (!printElem) return;
  const previous = printElem.innerHTML;
  printElem.classList.remove("hidden");
  printElem.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #0f172a; line-height: 1.6;">
      <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="font-size: 18px; font-weight: bold; margin: 0; color: #0284c7; text-transform: uppercase;">${escapeHtml(title)}</h1>
        <p style="font-size: 12px; color: #475569; margin: 4px 0 0 0;">Hệ thống Quản lý & Trợ lý Giáo dục Hóa học THPT ChemAIBuddy</p>
        <p style="font-size: 11px; color: #64748b; margin: 2px 0 0 0;">Thời gian xuất: ${new Date().toLocaleString("vi-VN")}</p>
      </div>
      <div style="font-size: 13px;">${contentHtml}</div>
      <div style="margin-top: 40px; padding-top: 15px; border-top: 1px solid #cbd5e1; display: flex; justify-content: space-between; font-size: 12px; color: #475569;">
        <div><b>Xác nhận Giáo viên bộ môn</b></div>
        <div><b>Ban Giám Hiệu / Tổ Trưởng</b></div>
      </div>
    </div>`;
  window.print();
  printElem.innerHTML = previous;
  printElem.classList.add("hidden");
}

function printTeacherDocument(elementId, title) {
  const source = document.getElementById(elementId);
  if (!source || !source.innerHTML.trim()) {
    alert("Chưa có nội dung để xuất file PDF!");
    return;
  }
  printTeacherDocumentContent(source.innerHTML, title);
}

const CHEM_LOCAL_KEYS = Object.freeze({
  accounts: "chem_student_accounts_v2",
  session: "chem_student_session_v2",
  cache: "chem_tutor_cache_v2",
  chatLogs: "chem_chat_logs_cache_v2",
  quizQuestions: "chem_quiz_questions_cache_v2"
});
let currentStudentProfile = null;
let studentAuthMode = "login";
let currentLeaderboardMode = "streak";

function safeStorageRead(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch (_error) { return fallback; }
}
function safeStorageWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_error) { return false; }
}
function getLocalAccounts() { return safeStorageRead(CHEM_LOCAL_KEYS.accounts, []); }
function setLocalAccounts(accounts) { safeStorageWrite(CHEM_LOCAL_KEYS.accounts, accounts.slice(-500)); }
function normalizeStudentName(name) { return String(name || "").trim().toLowerCase().replace(/\s+/g, " "); }
function todayKey() { return new Date().toISOString().slice(0, 10); }
function updateStudentLoginStreak(profile) {
  const today = todayKey();
  if (profile.last_login_on === today) return profile;
  const previous = profile.last_login_on ? new Date(profile.last_login_on + "T00:00:00Z") : null;
  const diff = previous ? Math.round((Date.now() - previous.getTime()) / 86400000) : 99;
  profile.login_streak = diff === 1 ? Number(profile.login_streak || 0) + 1 : 1;
  profile.last_login_on = today;
  return profile;
}
function persistStudentProfile(profile) {
  const accounts = getLocalAccounts();
  const index = accounts.findIndex(item => item.id === profile.id);
  if (index >= 0) accounts[index] = profile; else accounts.push(profile);
  setLocalAccounts(accounts);
  safeStorageWrite(CHEM_LOCAL_KEYS.session, profile);
  currentStudentProfile = profile;
  updateRoleUI();
  renderDrawerProfile();
  void syncStudentProfileToDatabase(profile);
}
let studentDatabaseSyncInFlight = false;
function studentEmailForUsername(username) { return String(username || "").trim().toLowerCase().replace(/[^a-z0-9._-]/g, "_") + "@student.chemaibuddy.local"; }
async function syncStudentProfileToDatabase(profile) {
  if (studentDatabaseSyncInFlight || !supabaseClient || !profile?.username) return;
  studentDatabaseSyncInFlight = true;
  try {
    const email = studentEmailForUsername(profile.username);
    let authResult = await supabaseClient.auth.signInWithPassword({ email, password: profile.password || "" });
    if (authResult.error && profile.password) authResult = await supabaseClient.auth.signUp({ email, password: profile.password, options: { data: { role: "student", username: profile.username } } });
    const userId = authResult?.data?.user?.id || profile.db_id;
    if (userId) {
      const payload = { id: userId, username: profile.username, class_name: profile.class_name, school_name: profile.school_name, login_streak: profile.login_streak, last_login_on: profile.last_login_on, kahoot_score: profile.kahoot_score, kahoot_streak: profile.kahoot_streak, kahoot_exp: profile.kahoot_exp, kahoot_badge: profile.kahoot_badge, teacher_badge: profile.teacher_badge, updated_at: new Date().toISOString() };
      await supabaseClient.from("student_profiles").upsert(payload, { onConflict: "id" });
      if (profile.db_id !== userId) { profile.db_id = userId; safeStorageWrite(CHEM_LOCAL_KEYS.session, profile); }
    }
  } catch (_error) {
    console.warn("Student database sync skipped:", _error.message || _error);
  } finally {
    studentDatabaseSyncInFlight = false;
  }
}

function updateRoleUI() {
  const teacherTab = document.getElementById("tab-teacher");
  const auditTab = document.getElementById("tab-audit");
  const drawerTeacherSection = document.getElementById("drawer-teacher-section");
  const headerStudentBtn = document.getElementById("header-student-btn");
  const homeActiveRoleBox = document.getElementById("home-active-role-box");
  const homeUnauthedContainer = document.getElementById("home-unauthed-role-container");
  const homeFeaturesSubtitle = document.getElementById("home-features-subtitle");
  const featBadges = document.querySelectorAll(".feat-badge");

  const isStudent = Boolean(currentStudentProfile);
  const isTeacher = Boolean(isTeacherAuthed && !currentStudentProfile);
  const hasActiveRole = isStudent || isTeacher;

  // 1. Cập nhật Hộp vai trò trên Trang chủ
  if (hasActiveRole) {
    if (homeUnauthedContainer) homeUnauthedContainer.classList.add("hidden");
    if (homeActiveRoleBox) {
      homeActiveRoleBox.classList.remove("hidden");
      if (isStudent) {
        homeActiveRoleBox.innerHTML = `
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-cyan-500/30 shrink-0">
                <i class="fa-solid fa-user-graduate"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Đang tham gia: Học Sinh
                  </span>
                </div>
                <h3 class="text-lg sm:text-xl font-extrabold text-white mt-1 flex items-center gap-2 flex-wrap">
                  ${escapeHtml(currentStudentProfile.username)}
                  <span class="text-xs font-normal text-slate-300 font-sans">(${escapeHtml(currentStudentProfile.school_name || "THPT")} – Lớp ${escapeHtml(currentStudentProfile.class_name || "Mới")})</span>
                </h3>
                <div class="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300">
                  <span><i class="fa-solid fa-fire text-amber-400 mr-1"></i>Chuỗi: <strong class="text-amber-300 font-mono">${Number(currentStudentProfile.login_streak || 1)} ngày</strong></span>
                  <span><i class="fa-solid fa-star text-amber-400 mr-1"></i>EXP: <strong class="text-amber-300 font-mono">${Number(currentStudentProfile.kahoot_exp || 0)}</strong></span>
                  <span><i class="fa-solid fa-trophy text-cyan-400 mr-1"></i>Danh hiệu: <strong class="text-cyan-300">${escapeHtml(currentStudentProfile.kahoot_badge || "Tân binh")}</strong></span>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
              <button onclick="openStudentProfileModal()" class="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow shadow-cyan-500/20">
                <i class="fa-solid fa-id-card-clip"></i> Xem Hồ Sơ
              </button>
              <button onclick="logoutActiveRole()" class="px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Đổi Vai Trò / Đăng Xuất
              </button>
            </div>
          </div>`;
      } else if (isTeacher) {
        homeActiveRoleBox.innerHTML = `
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-500/30 shrink-0">
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Đang tham gia: Giáo Viên
                  </span>
                </div>
                <h3 class="text-lg sm:text-xl font-extrabold text-white mt-1">
                  Tài Khoản Giáo Viên Hóa Học
                </h3>
                <p class="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <i class="fa-solid fa-shield-check text-emerald-400"></i> Đã mở khóa quyền Giáo viên (Góc giáo viên & Cổng Audit / Host Kahoot trong Danh Sách Chức Năng)
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0">
              <button onclick="logoutActiveRole()" class="px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition shadow shadow-rose-950/40">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Đăng Xuất
              </button>
            </div>
          </div>`;
      }
    }
  } else {
    if (homeUnauthedContainer) homeUnauthedContainer.classList.remove("hidden");
    if (homeActiveRoleBox) homeActiveRoleBox.classList.add("hidden");
  }

  // 2. Cập nhật trạng thái các thẻ tính năng (Khi chưa có role -> Chế độ xem trước, ấn không có phản ứng)
  if (homeFeaturesSubtitle) {
    homeFeaturesSubtitle.innerText = hasActiveRole
      ? "Nhấp vào bất kỳ tính năng nào bên dưới để truy cập và trải nghiệm ngay"
      : "Chế độ xem trước (Vui lòng chọn vai trò Học sinh hoặc Giáo viên để kích hoạt tính năng)";
  }

  featBadges.forEach(badge => {
    badge.innerHTML = hasActiveRole
      ? `<span class="text-cyan-400 font-semibold flex items-center gap-1">Khám phá <i class="fa-solid fa-arrow-right text-[9px]"></i></span>`
      : `<span class="text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700 font-normal"><i class="fa-solid fa-eye mr-1 text-[9px]"></i>Xem trước</span>`;
  });

  // 3. Phân quyền trên Header và Menu điều hướng
  if (isStudent) {
    if (teacherTab) teacherTab.classList.add("hidden");
    if (auditTab) auditTab.classList.add("hidden");
    if (drawerTeacherSection) drawerTeacherSection.classList.add("hidden");

    if (headerStudentBtn) {
      headerStudentBtn.innerHTML = `<i class="fa-solid fa-user-graduate text-cyan-400 mr-1.5"></i><span class="max-w-[100px] truncate inline-block align-bottom">${escapeHtml(currentStudentProfile.username)}</span>`;
      headerStudentBtn.className = "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition bg-cyan-950/90 text-cyan-300 hover:bg-cyan-900 border border-cyan-400/50 whitespace-nowrap shadow shadow-cyan-500/10 flex items-center gap-1.5";
    }
  } else {
    if (drawerTeacherSection) drawerTeacherSection.classList.remove("hidden");

    if (headerStudentBtn) {
      if (isTeacher) {
        headerStudentBtn.innerHTML = `<i class="fa-solid fa-user-tie text-emerald-400 mr-1.5"></i>Giáo Viên`;
        headerStudentBtn.className = "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition bg-emerald-950/90 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40 whitespace-nowrap flex items-center gap-1.5 shadow shadow-emerald-500/10";
      } else {
        headerStudentBtn.innerHTML = `<i class="fa-solid fa-user-circle mr-1.5"></i>Profile`;
        headerStudentBtn.className = "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition text-cyan-300 hover:bg-slate-700/80 border border-cyan-500/30 whitespace-nowrap flex items-center gap-1.5 shadow";
      }
    }
  }
}

function handleHomeFeatureClick(tabId) {
  const hasActiveRole = Boolean(currentStudentProfile || isTeacherAuthed);
  if (!hasActiveRole) {
    alert("⚠️ Bạn đang ở chế độ xem trước.\nVui lòng tham gia dưới vai trò 'Học sinh' hoặc 'Giáo viên' ở trên để mở khóa và sử dụng tính năng!");
    const roleSection = document.getElementById("home-role-section");
    if (roleSection) roleSection.scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (tabId === "periodic") {
    openPeriodicModal();
    return;
  }
  switchTab(tabId);
}

function logoutActiveRole() {
  currentStudentProfile = null;
  isTeacherAuthed = false;
  try { localStorage.removeItem(CHEM_LOCAL_KEYS.session); } catch (_error) {}
  closeStudentProfileModal();
  updateRoleUI();
  renderDrawerProfile();
  switchTab("home");
}

function handleHeaderStudentClick() {
  if (currentStudentProfile) {
    openStudentProfileModal();
  } else if (isTeacherAuthed) {
    logoutActiveRole();
  } else {
    openStudentAuthModal("login");
  }
}

function openStudentProfileModal() {
  if (!currentStudentProfile) {
    openStudentAuthModal("login");
    return;
  }
  const p = currentStudentProfile;
  const content = document.getElementById("student-profile-modal-content");
  if (content) {
    const teacherBadgeText = p.teacher_badge && p.teacher_badge.trim() ? p.teacher_badge.trim() : "Chưa có";
    content.innerHTML = `
      <div class="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80">
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-xl font-black text-white shadow-lg shadow-cyan-500/30">
          ${escapeHtml(p.username.slice(0, 1).toUpperCase())}
        </div>
        <div class="min-w-0 flex-1">
          <h4 class="font-extrabold text-white text-base truncate">${escapeHtml(p.username)}</h4>
          <p class="text-xs text-cyan-300 font-medium truncate mt-0.5"><i class="fa-solid fa-school text-cyan-400 mr-1.5"></i>${escapeHtml(p.school_name || "THPT")} – Lớp ${escapeHtml(p.class_name || "Mới")}</p>
          <span class="inline-block mt-1 text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-semibold border border-cyan-500/30">Tài khoản Học sinh</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 text-xs">
        <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
          <span class="text-slate-400 text-[11px] block"><i class="fa-solid fa-fire text-amber-400 mr-1"></i>Chuỗi học tập</span>
          <b class="text-amber-300 font-mono text-sm">${Number(p.login_streak || 1)} Ngày</b>
        </div>
        <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60 space-y-1">
          <span class="text-slate-400 text-[11px] block"><i class="fa-solid fa-star text-amber-400 mr-1"></i>Điểm Kahoot EXP</span>
          <b class="text-amber-300 font-mono text-sm">${Number(p.kahoot_exp || 0)} EXP</b>
        </div>
      </div>

      <div class="space-y-2 text-xs">
        <div class="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
          <span class="text-slate-400"><i class="fa-solid fa-trophy text-cyan-400 mr-1.5"></i>Danh hiệu Kahoot:</span>
          <b class="text-cyan-300">${escapeHtml(p.kahoot_badge || "Tân binh")}</b>
        </div>
        <div class="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
          <span class="text-slate-400"><i class="fa-solid fa-bolt text-emerald-400 mr-1.5"></i>Chuỗi đúng hiện tại:</span>
          <b class="text-emerald-300 font-mono">${Number(p.kahoot_streak || 0)} câu liên tiếp</b>
        </div>
        <div class="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
          <span class="text-slate-400"><i class="fa-solid fa-award text-amber-300 mr-1.5"></i>Danh hiệu GV gắn:</span>
          <b class="text-amber-200">${escapeHtml(teacherBadgeText)}</b>
        </div>
      </div>
    `;
  }
  document.getElementById("student-profile-modal")?.classList.remove("hidden");
}

function closeStudentProfileModal() {
  document.getElementById("student-profile-modal")?.classList.add("hidden");
}

function renderDrawerProfile() {
  const container = document.getElementById("drawer-profile");
  if (!container) return;
  if (!currentStudentProfile) {
    container.innerHTML = `
      <div class="rounded-xl border border-slate-700 bg-slate-800 p-4 text-xs text-slate-300">
        <p class="font-bold text-cyan-300 text-sm">Chưa đăng nhập Học sinh</p>
        <p class="text-slate-400 text-[11px] mt-1">Đăng nhập để lưu chuỗi ngày học và điểm số Kahoot.</p>
        <button onclick="openStudentAuthModal('login')" class="mt-3 w-full rounded-lg bg-cyan-600 py-2.5 font-bold text-white shadow hover:bg-cyan-500 transition">
          <i class="fa-solid fa-right-to-bracket mr-1.5"></i>Đăng nhập / Đăng ký
        </button>
      </div>`;
    return;
  }
  const p = currentStudentProfile;
  const teacherBadgeText = p.teacher_badge && p.teacher_badge.trim() ? p.teacher_badge.trim() : "Chưa có";
  container.innerHTML = `
    <div class="rounded-xl border border-slate-700 bg-slate-800 p-4 text-xs space-y-3">
      <!-- 1. Tên người dùng -->
      <div class="flex items-center gap-3 border-b border-slate-700/80 pb-2.5">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-base font-black text-white shadow">
          ${escapeHtml(p.username.slice(0, 1).toUpperCase())}
        </div>
        <div class="min-w-0 flex-1">
          <h3 class="font-bold text-white text-sm truncate">${escapeHtml(p.username)}</h3>
          <!-- 2. Trường – Lớp -->
          <p class="text-[11px] text-slate-400 truncate"><i class="fa-solid fa-school text-cyan-400 mr-1"></i>${escapeHtml(p.school_name || "THPT")} – ${escapeHtml(p.class_name || "Lớp mới")}</p>
        </div>
      </div>
      
      <div class="space-y-2 text-slate-200">
        <!-- 3. Chuỗi ngày đăng nhập -->
        <div class="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-700/60">
          <span class="text-slate-400"><i class="fa-solid fa-fire text-amber-400 mr-1.5"></i>Chuỗi ngày đăng nhập:</span>
          <b class="text-amber-300 font-mono">${Number(p.login_streak || 1)} ngày</b>
        </div>
        
        <!-- 4. Danh hiệu Kahoot + Chuỗi đúng hiện có -->
        <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-700/60 space-y-1">
          <div class="flex justify-between items-center">
            <span class="text-slate-400"><i class="fa-solid fa-trophy text-cyan-400 mr-1.5"></i>Danh hiệu Kahoot:</span>
            <b class="text-cyan-300">${escapeHtml(p.kahoot_badge || "Tân binh")}</b>
          </div>
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-400">🔥 Chuỗi đúng hiện tại:</span>
            <b class="text-emerald-400 font-mono">${Number(p.kahoot_streak || 0)}</b>
          </div>
          <div class="flex justify-between items-center text-[11px]">
            <span class="text-slate-400">⭐ Kinh nghiệm tích lũy:</span>
            <b class="text-amber-300 font-mono">${Number(p.kahoot_exp || 0)} EXP</b>
          </div>
        </div>

        <!-- 5. Danh hiệu do Giáo viên gắn (Custom Badge) -->
        <div class="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-700/60">
          <span class="text-slate-400"><i class="fa-solid fa-award text-amber-300 mr-1.5"></i>Danh hiệu Giáo viên gắn:</span>
          <b class="text-amber-200">${escapeHtml(teacherBadgeText)}</b>
        </div>
      </div>

      <!-- 6. Nút Đăng xuất -->
      <button onclick="studentLogout()" class="mt-2 w-full rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 py-2 font-bold text-rose-300 text-xs transition">
        <i class="fa-solid fa-right-from-bracket mr-1.5"></i>Đăng xuất
      </button>
    </div>`;
}

function toggleNavigationDrawer(open) {
  document.getElementById("navigation-drawer")?.classList.toggle("open", Boolean(open));
  document.getElementById("drawer-backdrop")?.classList.toggle("open", Boolean(open));
  if (open) renderDrawerProfile();
}

function drawerSwitchTab(tab) { toggleNavigationDrawer(false); if (tab === "home") { switchTab("home"); } else { handleHomeFeatureClick(tab); } }

function openStudentAuthModal(mode = "login") {
  switchStudentAuthMode(mode);
  document.getElementById("student-auth-modal")?.classList.remove("hidden");
  setTimeout(() => document.getElementById("student-auth-username")?.focus(), 100);
}

function closeStudentAuthModal() {
  document.getElementById("student-auth-modal")?.classList.add("hidden");
}

function switchStudentAuthMode(mode) {
  studentAuthMode = mode === "signup" ? "signup" : "login";
  
  const loginTab = document.getElementById("student-auth-login-tab");
  const signupTab = document.getElementById("student-auth-signup-tab");
  if (loginTab) loginTab.className = studentAuthMode === "login" ? "flex-1 rounded-lg bg-cyan-600 py-2 text-xs font-bold text-white transition" : "flex-1 rounded-lg bg-slate-800 py-2 text-xs font-bold text-slate-300 hover:text-white transition";
  if (signupTab) signupTab.className = studentAuthMode === "signup" ? "flex-1 rounded-lg bg-cyan-600 py-2 text-xs font-bold text-white transition" : "flex-1 rounded-lg bg-slate-800 py-2 text-xs font-bold text-slate-300 hover:text-white transition";

  const schoolInput = document.getElementById("student-auth-school");
  const confirmInput = document.getElementById("student-auth-confirm");
  if (schoolInput) schoolInput.classList.toggle("hidden", studentAuthMode !== "signup");
  if (confirmInput) confirmInput.classList.toggle("hidden", studentAuthMode !== "signup");
  
  const errorElem = document.getElementById("student-auth-error");
  if (errorElem) errorElem.classList.add("hidden");
}

async function submitStudentAuth() {
  const username = document.getElementById("student-auth-username")?.value.trim();
  const className = document.getElementById("student-auth-class")?.value.trim();
  const schoolName = document.getElementById("student-auth-school")?.value.trim();
  const password = document.getElementById("student-auth-password")?.value || "";
  const confirm = document.getElementById("student-auth-confirm")?.value || "";
  const errorElement = document.getElementById("student-auth-error");
  const fail = message => { if (errorElement) { errorElement.textContent = message; errorElement.classList.remove("hidden"); } };

  if (!username || !className || password.length < 4) {
    return fail("Vui lòng nhập Tên, Lớp và Mật khẩu (tối thiểu 4 ký tự).");
  }

  const accounts = getLocalAccounts();
  const existing = accounts.find(item => normalizeStudentName(item.username) === normalizeStudentName(username));

  if (studentAuthMode === "signup") {
    if (!schoolName) return fail("Vui lòng nhập tên Trường học.");
    if (existing) return fail("Tên người dùng đã tồn tại. Vui lòng chọn tên khác hoặc chuyển sang Đăng nhập.");
    if (password !== confirm) return fail("Mật khẩu xác nhận không khớp.");

    const profileId = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
    const profile = updateStudentLoginStreak({
      id: "local_" + profileId,
      username,
      class_name: className,
      school_name: schoolName,
      password,
      login_streak: 1,
      kahoot_score: 0,
      kahoot_streak: 0,
      kahoot_exp: 0,
      kahoot_badge: "Tân binh",
      teacher_badge: "",
      last_login_on: todayKey(),
      updated_at: new Date().toISOString()
    });
    persistStudentProfile(profile);
    closeStudentAuthModal();
    return;
  }

  // Student Login Flow: Check Tên + Lớp + Mật khẩu
  if (!existing) {
    return fail("Tài khoản chưa tồn tại. Bấm 'Tạo tài khoản' để đăng ký mới.");
  }
  if (existing.password !== password) {
    return fail("Mật khẩu không chính xác.");
  }
  if (normalizeStudentName(existing.class_name) !== normalizeStudentName(className)) {
    return fail("Thông tin Lớp học không khớp với tài khoản đã đăng ký.");
  }

  persistStudentProfile(updateStudentLoginStreak({ ...existing }));
  closeStudentAuthModal();
}

function studentLogout() {
  logoutActiveRole();
}

function loadStudentSession() {
  const session = safeStorageRead(CHEM_LOCAL_KEYS.session, null);
  if (session) {
    currentStudentProfile = updateStudentLoginStreak(session);
    persistStudentProfile(currentStudentProfile);
  } else {
    updateRoleUI();
    renderDrawerProfile();
  }
}

function saveStudentProgress(deltaScore, correct) {
  if (!currentStudentProfile) return;
  const next = {
    ...currentStudentProfile,
    kahoot_score: Number(currentStudentProfile.kahoot_score || 0) + Number(deltaScore || 0),
    kahoot_exp: Number(currentStudentProfile.kahoot_exp || 0) + (correct ? 5 : 0),
    kahoot_streak: correct ? Number(currentStudentProfile.kahoot_streak || 0) + 1 : 0
  };
  next.kahoot_badge = next.kahoot_exp >= 100 ? "Chuyên gia" : next.kahoot_exp >= 40 ? "Nhà thám hiểm" : "Tân binh";
  persistStudentProfile(next);
}

function normalizeTutorQueryText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateQuestionSimilarity(q1, q2) {
  const norm1 = normalizeTutorQueryText(q1);
  const norm2 = normalizeTutorQueryText(q2);
  if (!norm1 || !norm2) return 0;
  if (norm1 === norm2) return 1.0;
  const words1 = new Set(norm1.split(" ").filter(Boolean));
  const words2 = new Set(norm2.split(" ").filter(Boolean));
  if (!words1.size || !words2.size) return 0;
  let intersectionCount = 0;
  words1.forEach(w => { if (words2.has(w)) intersectionCount++; });
  const unionSize = new Set([...words1, ...words2]).size;
  return intersectionCount / unionSize;
}

async function findTutorCache(query) {
  const norm = normalizeTutorQueryText(query);
  if (!norm) return "";
  const local = safeStorageRead(CHEM_LOCAL_KEYS.cache, []);
  const localMatch = local.find(item => calculateQuestionSimilarity(query, item.query || item.normalized) >= 0.85);
  if (localMatch?.answer) return localMatch.answer;

  if (supabaseClient) {
    try {
      const { data } = await supabaseClient.from("chat_logs").select("user_message,ai_response").order("created_at", { ascending: false }).limit(100);
      const dbMatch = (data || []).find(item => calculateQuestionSimilarity(query, item.user_message || "") >= 0.85);
      if (dbMatch?.ai_response) return dbMatch.ai_response;
    } catch (_error) {
      console.warn("Database cache search fallback:", _error);
    }
  }
  return "";
}

async function saveTutorCache(query, answer) {
  const norm = normalizeTutorQueryText(query);
  if (!norm) return;
  const cache = safeStorageRead(CHEM_LOCAL_KEYS.cache, []).filter(item => calculateQuestionSimilarity(query, item.query || item.normalized) < 0.95);
  cache.push({ normalized: norm, query, answer, updated_at: new Date().toISOString() });
  safeStorageWrite(CHEM_LOCAL_KEYS.cache, cache.slice(-100));
}
const DEFAULT_CHAT_LOGS = [
  {
    session_id: "CHEM_GDPT18_01",
    user_message: "Cho 50ml dung dịch NaOH 1M phản ứng với 50ml dung dịch HCl 1M. Tính pH của dung dịch sau phản ứng.",
    ai_response: "Phản ứng trung hòa hoàn toàn giữa bazơ mạnh và axit mạnh: NaOH + HCl -> NaCl + H2O.\nSố mol NaOH = 0.05 mol, số mol HCl = 0.05 mol. Cả hai chất phản ứng vừa đủ, muối NaCl sinh ra không bị thủy phân nên môi trường trung tính với pH = 7 ở 25°C.",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    session_id: "CHEM_GDPT18_02",
    user_message: "Nêu hiện tượng và viết phương trình hóa học khi sục khí SO2 vào dung dịch nước vôi trong Ca(OH)2 dư.",
    ai_response: "Hiện tượng: Xuất hiện kết tủa trắng làm dung dịch bị vẩn đục.\nPhương trình: SO2 + Ca(OH)2 -> CaSO3↓ (trắng) + H2O. Nếu tiếp tục sục SO2 đến dư, kết tủa sẽ tan dần tạo Ca(HSO3)2 trong suốt.",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    session_id: "CHEM_GDPT18_03",
    user_message: "Làm thế nào để phân biệt 3 dung dịch mất nhãn: NaCl, Na2SO4, NaNO3 chỉ bằng một thuốc thử?",
    ai_response: "Dùng thuốc thử dung dịch BaCl2:\n1. Mẫu thử xuất hiện kết tủa trắng không tan trong axit là Na2SO4 (BaSO4↓).\n2. Hai mẫu còn lại (NaCl, NaNO3) không hiện tượng. Tiếp tục nhỏ AgNO3 vào 2 mẫu này: mẫu xuất hiện kết tủa trắng là NaCl (AgCl↓), mẫu không hiện tượng là NaNO3.",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    session_id: "CHEM_GDPT18_04",
    user_message: "Đặc trưng của phổ hồng ngoại (IR) đối với nhóm chức Carbonyl (C=O) trong hợp chất hữu cơ là gì?",
    ai_response: "Nhóm chức Carbonyl (C=O) cho một tín hiệu hấp thụ rất mạnh và sắc nét trong khoảng tần số 1650 - 1750 cm⁻¹ trên phổ hồng ngoại IR, là dấu hiệu nhận biết quan trọng của aldehyde, ketone, axit carboxylic và ester.",
    created_at: new Date(Date.now() - 3600000 * 36).toISOString()
  },
  {
    session_id: "CHEM_GDPT18_05",
    user_message: "Tại sao cồn 70 độ có tác dụng sát trùng tốt hơn cồn 90 độ?",
    ai_response: "Cồn 90 độ làm đông vón protein ở màng ngoài tế bào vi khuẩn quá nhanh, tạo thành lớp vỏ bảo vệ vi khuẩn bên trong. Trong khi đó, cồn 70 độ có tỷ lệ nước thích hợp làm chậm quá trình đông vón, giúp cồn ngấm sâu vào bên trong tế bào vi khuẩn và tiêu diệt triệt để.",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const DEFAULT_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Hiện tượng xảy ra khi nhỏ vài giọt dung dịch phenolphthalein vào ống nghiệm chứa dung dịch NaOH là gì?",
    options: ["Dung dịch chuyển sang màu hồng cánh sen", "Dung dịch chuyển sang màu xanh thẫm", "Xuất hiện kết tủa màu trắng đục", "Không có hiện tượng gì xảy ra"],
    correct_index: 0,
    explanation: "Dung dịch kiềm (NaOH có pH > 8.3) làm chất chỉ thị phenolphthalein chuyển sang màu hồng cánh sen đặc trưng.",
    created_at: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 2,
    question: "Chất nào sau đây tác dụng với dung dịch HCl sinh ra khí Hydro (H2)?",
    options: ["Cu", "Ag", "Fe", "Au"],
    correct_index: 2,
    explanation: "Fe là kim loại đứng trước Hydro trong dãy hoạt động hóa học nên phản ứng với axit HCl giải phóng khí H2: Fe + 2HCl -> FeCl2 + H2↑.",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 3,
    question: "Khi sục khí SO2 vào dung dịch nước vôi trong Ca(OH)2 dư, hiện tượng quan sát được là gì?",
    options: ["Dung dịch đổi sang màu đỏ", "Xuất hiện kết tủa trắng CaSO3", "Có kết tủa màu nâu đỏ", "Không có hiện tượng"],
    correct_index: 1,
    explanation: "Khí SO2 phản ứng với Ca(OH)2 tạo kết tủa trắng canxi sunfit: SO2 + Ca(OH)2 -> CaSO3↓ + H2O.",
    created_at: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    id: 4,
    question: "Trong phản ứng trung hòa giữa axit HCl và dung dịch NaOH, pH của dung dịch tại điểm tương đương là bao nhiêu ở 25°C?",
    options: ["pH = 1", "pH = 7", "pH = 14", "pH = 3"],
    correct_index: 1,
    explanation: "Phản ứng giữa axit mạnh (HCl) và bazơ mạnh (NaOH) tạo muối trung hòa NaCl có môi trường trung tính với pH = 7 ở 25°C.",
    created_at: new Date(Date.now() - 3600000 * 42).toISOString()
  },
  {
    id: 5,
    question: "Chất rắn nào sau đây khi tác dụng với dung dịch axit sunfuric loãng sinh ra dung dịch có màu xanh lam?",
    options: ["CuO", "Fe2O3", "Al2O3", "MgO"],
    correct_index: 0,
    explanation: "CuO (màu đen) tan trong H2SO4 loãng tạo dung dịch muối đồng(II) sunfat CuSO4 có màu xanh lam đặc trưng: CuO + H2SO4 -> CuSO4 + H2O.",
    created_at: new Date(Date.now() - 3600000 * 54).toISOString()
  },
  {
    id: 6,
    question: "Tín hiệu hấp thụ đặc trưng của liên kết O-H trong phân tử alcohol trên phổ hồng ngoại (IR) nằm trong vùng nào?",
    options: ["1650 - 1750 cm⁻¹", "3200 - 3600 cm⁻¹", "2100 - 2260 cm⁻¹", "1050 - 1150 cm⁻¹"],
    correct_index: 1,
    explanation: "Liên kết O-H dạng liên kết hydro trong alcohol có mũi hấp thụ rộng (broad peak) rất đặc trưng ở vùng 3200 - 3600 cm⁻¹.",
    created_at: new Date(Date.now() - 3600000 * 60).toISOString()
  }
];

function getLocalChatLogs() {
  const cached = safeStorageRead(CHEM_LOCAL_KEYS.chatLogs, null);
  if (Array.isArray(cached) && cached.length > 0) return cached;
  safeStorageWrite(CHEM_LOCAL_KEYS.chatLogs, DEFAULT_CHAT_LOGS);
  return DEFAULT_CHAT_LOGS;
}

function saveChatLogToDatastore(sessionId, userMessage, aiResponse) {
  const newLog = {
    session_id: sessionId || "CHEM_SESSION",
    user_message: userMessage,
    ai_response: aiResponse,
    created_at: new Date().toISOString()
  };
  const currentLogs = getLocalChatLogs();
  currentLogs.unshift(newLog);
  safeStorageWrite(CHEM_LOCAL_KEYS.chatLogs, currentLogs.slice(0, 100));

  if (supabaseClient) {
    supabaseClient.from("chat_logs").insert(newLog).catch(err => console.warn("Supabase background chat sync:", err));
  }
}

function getLocalQuizQuestions() {
  const cached = safeStorageRead(CHEM_LOCAL_KEYS.quizQuestions, null);
  if (Array.isArray(cached) && cached.length > 0) return cached;
  safeStorageWrite(CHEM_LOCAL_KEYS.quizQuestions, DEFAULT_QUIZ_QUESTIONS);
  return DEFAULT_QUIZ_QUESTIONS;
}

function saveQuizQuestionToDatastore(questionObj) {
  if (!questionObj || !questionObj.question) return;
  const current = getLocalQuizQuestions();
  const exists = current.some(q => q.question === questionObj.question);
  if (!exists) {
    const item = {
      ...questionObj,
      created_at: questionObj.created_at || new Date().toISOString()
    };
    current.unshift(item);
    safeStorageWrite(CHEM_LOCAL_KEYS.quizQuestions, current.slice(0, 100));
  }

  if (supabaseClient) {
    supabaseClient.from("quiz_questions").upsert({
      question: questionObj.question,
      options: questionObj.options,
      correct_index: questionObj.correct_index !== undefined ? questionObj.correct_index : questionObj.correctIndex,
      explanation: questionObj.explanation
    }, { onConflict: "question", ignoreDuplicates: true }).catch(err => console.warn("Supabase background quiz sync:", err));
  }
}

async function fetchAuditLogs() {
  const tbody = document.getElementById("audit-chat-table-body");
  if (!tbody) return;
  tbody.innerHTML = "<tr><td colspan=\"4\" class=\"p-4 text-center text-cyan-400 italic\"><i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>Đang kiểm tra & đồng bộ dữ liệu Chat Log...</td></tr>";

  let logs = [];
  let isCloud = false;

  // Thử tải từ Supabase Client (bắt lỗi an toàn, không làm crash giao diện)
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from("chat_logs").select("*").order("created_at", { ascending: false }).limit(50);
      if (!error && Array.isArray(data) && data.length > 0) {
        logs = data;
        isCloud = true;
        safeStorageWrite(CHEM_LOCAL_KEYS.chatLogs, logs);
      }
    } catch (_e) {
      console.warn("Supabase fetch chat_logs fallback to local datastore:", _e);
    }
  }

  // Nếu Supabase chưa có bảng hoặc offline -> Sử dụng kho dữ liệu đồng bộ nội bộ / cache
  if (!logs || logs.length === 0) {
    logs = getLocalChatLogs();
  }

  if (!logs || logs.length === 0) {
    tbody.innerHTML = "<tr><td colspan=\"4\" class=\"p-4 text-center text-slate-400 italic\">Chưa có nhật ký trò chuyện nào.</td></tr>";
    return;
  }

  const statusBadge = isCloud
    ? "<span class=\"inline-flex items-center gap-1 text-[10px] bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full font-medium\"><i class=\"fa-solid fa-cloud text-emerald-400\"></i> Supabase Cloud</span>"
    : "<span class=\"inline-flex items-center gap-1 text-[10px] bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 px-2 py-0.5 rounded-full font-medium\"><i class=\"fa-solid fa-database text-cyan-400\"></i> Đồng bộ Kép</span>";

  tbody.innerHTML = logs.map(item => `
    <tr class="hover:bg-slate-800/60 transition border-b border-slate-800/40">
      <td class="p-3 text-slate-400 whitespace-nowrap text-xs">
        ${new Date(item.created_at || Date.now()).toLocaleString("vi-VN")}
        <div class="mt-1">${statusBadge}</div>
      </td>
      <td class="p-3 font-mono text-cyan-400 text-xs font-semibold">${escapeHtml(item.session_id || "CHEM_SESSION")}</td>
      <td class="p-3 text-white font-medium text-xs max-w-xs">${formatChemText(item.user_message)}</td>
      <td class="p-3 text-slate-300 text-xs max-w-sm" title="${escapeHtml(item.ai_response || "")}">${formatChemText(item.ai_response)}</td>
    </tr>
  `).join("");
}

async function fetchAuditQuizLogs() {
  const tbody = document.getElementById("audit-quiz-table-body");
  if (!tbody) return;
  tbody.innerHTML = "<tr><td colspan=\"5\" class=\"p-4 text-center text-amber-400 italic\"><i class=\"fa-solid fa-spinner fa-spin mr-2\"></i>Đang kiểm tra & đồng bộ Ngân hàng Trắc nghiệm...</td></tr>";

  let questions = [];
  let isCloud = false;

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from("quiz_questions").select("*").order("created_at", { ascending: false }).limit(50);
      if (!error && Array.isArray(data) && data.length > 0) {
        questions = data;
        isCloud = true;
        safeStorageWrite(CHEM_LOCAL_KEYS.quizQuestions, questions);
      }
    } catch (_e) {
      console.warn("Supabase fetch quiz_questions fallback to local datastore:", _e);
    }
  }

  if (!questions || questions.length === 0) {
    questions = getLocalQuizQuestions();
  }

  if (!questions || questions.length === 0) {
    tbody.innerHTML = "<tr><td colspan=\"5\" class=\"p-4 text-center text-slate-400 italic\">Chưa có câu hỏi trắc nghiệm nào trong kho.</td></tr>";
    return;
  }

  const statusBadge = isCloud
    ? "<span class=\"inline-flex items-center gap-1 text-[10px] bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full font-medium\"><i class=\"fa-solid fa-cloud text-emerald-400\"></i> Supabase Cloud</span>"
    : "<span class=\"inline-flex items-center gap-1 text-[10px] bg-amber-950/90 text-amber-300 border border-amber-700/60 px-2 py-0.5 rounded-full font-medium\"><i class=\"fa-solid fa-database text-amber-400\"></i> Đồng bộ Kép</span>";

  tbody.innerHTML = questions.map(q => {
    const opts = Array.isArray(q.options) ? q.options.map((opt, idx) => `<b>${["A", "B", "C", "D"][idx]}.</b> ${formatChemText(opt)}`).join("<br>") : "";
    const correctLabel = ["A", "B", "C", "D"][q.correct_index] || "N/A";
    return `
      <tr class="hover:bg-slate-800/60 transition border-b border-slate-800/40">
        <td class="p-3 text-slate-400 whitespace-nowrap text-xs">
          ${new Date(q.created_at || Date.now()).toLocaleString("vi-VN")}
          <div class="mt-1">${statusBadge}</div>
        </td>
        <td class="p-3 text-white font-medium text-xs max-w-xs">${formatChemText(q.question)}</td>
        <td class="p-3 text-slate-300 text-[11px] leading-relaxed max-w-xs">${opts}</td>
        <td class="p-3 text-center"><span class="bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-700/50 text-xs">${correctLabel}</span></td>
        <td class="p-3 text-slate-300 text-xs max-w-xs">${formatChemText(q.explanation)}</td>
      </tr>
    `;
  }).join("");
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
  const _0x2fe9f0 = "Phân tích mức độ an toàn và dữ liệu phổ của hóa chất: \"" + _0x1dc2cf + "\". Dùng tên hóa chất chuẩn bằng tiếng Anh. Trả về kết quả duy nhất dưới dạng JSON, không dùng markdown codeblock. Với chất không có phổ phù hợp, ghi rõ \"Không áp dụng\":\n{\n  \"name\": \"Standard English chemical name (with formula)\",\n  \"formula\": \"Chemical formula\",\n  \"hazard\": \"Tóm tắt ngắn gọn quy tắc an toàn và cảnh báo độc hại/phóng xạ\",\n  \"ir\": \"Các đỉnh hấp thụ IR đặc trưng, chỉ ghi giá trị theo đơn vị cm⁻¹\",\n  \"ms\": \"Các ion mảnh phổ khối lượng đặc trưng, chỉ ghi giá trị m/z\",\n  \"icon\": \"fa-radiation\",\n  \"color\": \"text-red-500\"\n}";
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

// Auto-initialize Headroom.js and default Home view on page load
document.addEventListener("DOMContentLoaded", function () {
  startGlobalChemistryFormatting();
  loadStudentSession();
  switchTab("home");
  updateRoleUI();
  const headerElem = document.querySelector("header");
  if (headerElem && typeof Headroom !== "undefined") {
    const headroom = new Headroom(headerElem);
    headroom.init();
  }
});
