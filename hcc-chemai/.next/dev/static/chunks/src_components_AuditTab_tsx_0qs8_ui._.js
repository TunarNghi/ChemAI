(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AuditTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanChemicalLatex",
    ()=>cleanChemicalLatex,
    "default",
    ()=>AuditTab,
    "formatMarkdownToHTML",
    ()=>formatMarkdownToHTML
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Card/Card.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/CardContent/CardContent.js [app-client] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Chip/Chip.js [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Dialog/Dialog.js [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogActions/DialogActions.js [app-client] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogContent/DialogContent.js [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/MenuItem/MenuItem.js [app-client] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Select/Select.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Stack/Stack.js [app-client] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Table/Table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableBody/TableBody.js [app-client] (ecmascript) <export default as TableBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableCell/TableCell.js [app-client] (ecmascript) <export default as TableCell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableHead/TableHead.js [app-client] (ecmascript) <export default as TableHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TableRow/TableRow.js [app-client] (ecmascript) <export default as TableRow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/TextField/TextField.js [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-client] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-stop.js [app-client] (ecmascript) <export default as StopCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StudentProgressManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/StudentProgressManager.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function cleanChemicalLatex(text) {
    if (!text) return "";
    const makeOverset = (above, base)=>{
        const cleanAbove = (above || "").replace(/\\text\{([^}]+)\}/g, "$1").replace(/t\^[0o\circ]/g, "t°").replace(/\^0|\^\circ|\^o|^˚$|^\circ$|^o$/g, "0");
        const cleanBase = (base || "").replace(/\\text\{([^}]+)\}/g, "$1");
        if (cleanAbove === "0") return cleanBase;
        return `<span style="display:inline-block;text-align:center;vertical-align:baseline;line-height:1.1;margin:0;"><span style="display:block;font-size:0.65em;font-weight:bold;color:#38bdf8;line-height:1;margin-bottom:-0.12em;">${cleanAbove}</span><span>${cleanBase}</span></span>`;
    };
    const unicodeSuperMap = {
        "⁺": "+",
        "⁻": "-",
        "⁰": "0",
        "¹": "1",
        "²": "2",
        "³": "3",
        "⁴": "4",
        "⁵": "5",
        "⁶": "6",
        "⁷": "7",
        "⁸": "8",
        "⁹": "9"
    };
    let res = text.replace(/H_?\{?20\}?/g, "H<sub>2</sub>O").replace(/3Fe\+\}/g, "Fe<sup>3+</sup>").replace(/reduse\s*\(khử\)/gi, "khử")// Convert unicode superscripts on ions (e.g. Fe³⁺, NO₃⁻, SO₄²⁻, H⁺)
    .replace(/([⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (match)=>{
        const converted = match.split("").map((c)=>unicodeSuperMap[c] || c).join("");
        return `<sup>${converted}</sup>`;
    })// Polyatomic and Monatomic ions without caret (e.g. Fe3+, Fe2+, Cu2+, SO4 2-, NO3-, OH-, H+)
    .replace(/\b(SO4|SO3|CO3|Cr2O7|CrO4|SiO3|S2O3)\s*(\^?\{?(?:2-|2\+|-2|\+2)\}?|2-|2\+)/g, "$1<sup>2-</sup>").replace(/\b(PO4|PO3)\s*(\^?\{?(?:3-|3\+|-3|\+3)\}?|3-|3\+)/g, "$1<sup>3-</sup>").replace(/\b(NO3|NO2|OH|HCO3|HSO4|H2PO4|CH3COO|ClO|ClO2|ClO3|ClO4|MnO4|F|Cl|Br|I)\s*(\^?\{?(?:-|\+|-1|\+1)\}?|-|\+)(?!\d)/g, "$1<sup>$2</sup>").replace(/\b(NH4|H3O)\s*(\^?\{?(?:\+|\+1)\}?|\+)(?!\d)/g, "$1<sup>+</sup>").replace(/\b(Fe|Cu|Zn|Mg|Ca|Ba|Pb|Sn|Mn|Ni|Hg|Sr|Pt|Co)\s*(2\+|\+2)/g, "$1<sup>2+</sup>").replace(/\b(Al|Cr|Fe)\s*(3\+|\+3)/g, "$1<sup>3+</sup>").replace(/\b(Na|K|Ag|Li|Cs)\s*(\+|\+1)(?!\d)/g, "$1<sup>+</sup>").replace(/\b(H)\s*(\+|\+1)(?!\d)/g, "$1<sup>+</sup>").replace(/([0-9]*[A-Za-z\(\)]+(?:<sub>[0-9]+<\/sub>|_\{?[0-9]+\}?)?)\s*\^\s*\{?([0-9]*[+-]|[+-][0-9]*)\}?/g, "$1<sup>$2</sup>").replace(/([0-9]*e)\s*([0-9]+\s*[×x])/gi, "$1<br/>$2").replace(/\\?begin\{array\}\{?[^}]*\}?([\s\S]*?)\\?end\{array\}/gi, (_, content)=>{
        const rows = content.trim().split("\n").map((r)=>r.replace(/\\\\$/, "").trim()).filter(Boolean);
        let tableRowsHTML = "";
        for (const row of rows){
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
    }).replace(/\\?(?:mathbf|textbf)\{([^}]+)\}/g, '<b style="color:#fbbf24;font-weight:bold;">$1</b>').replace(/\\?times\b/gi, "×").replace(/\\?cdot\b/gi, "·").replace(/\\?frac\{([^}]+)\}\{([^}]+)\}/g, "($1/$2)").replace(/\\?(?:approx|approxeq)\b/gi, "≈").replace(/\\?neq\b/gi, "≠").replace(/\\?(?:le|leq)\b/gi, "≤").replace(/\\?(?:ge|geq)\b/gi, "≥").replace(/\\?pm\b/gi, "±").replace(/\\?alpha\b/gi, "α").replace(/\\?beta\b/gi, "β").replace(/\\?gamma\b/gi, "γ").replace(/\\?pi\b/gi, "π").replace(/\\?Delta\b/gi, "Δ").replace(/\\?(?:degree|circ)\b/gi, "°").replace(/\\text\{([^}]+)\}/g, "$1").replace(/\\ce\{([^}]+)\}/g, "$1").replace(/\\mathrm\{([^}]+)\}/g, "$1").replace(/\\(?:left|right|big|Big|gt|lt)/g, "").replace(/([A-Z][a-z]*)?\\?overset\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, above, base)=>{
        return (prefix || "") + makeOverset(above, base);
    }).replace(/([A-Z][a-z]*)?\\?underset\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, below, base)=>{
        const p = prefix || "";
        const cleanBelow = (below || "").replace(/\\text\{([^}]+)\}/g, "$1");
        const cleanBase = (base || "").replace(/\\text\{([^}]+)\}/g, "$1");
        return `${p}<span style="display:inline-block;text-align:center;vertical-align:baseline;line-height:1.1;margin:0 1px;"><span>${cleanBase}</span><span style="display:block;font-size:0.68em;color:#94a3b8;line-height:1;margin-top:1px;">${cleanBelow}</span></span>`;
    }).replace(/([A-Z][a-z]*)?\\?stackrel\{([^}]+)\}\{([^}]+)\}/g, (_, prefix, above, base)=>{
        return (prefix || "") + makeOverset(above, base);
    }).replace(/\b(?:\+|-|0)?([+-]?[0-9]+)\s*(Fe|N|O|Cu|Zn|Al|Mg|Cl|S|P|Mn|Cr|Na|K|Ca|Ba|Ag|H)\b/g, (match, num, elem)=>{
        if (match.startsWith("4H") || match.startsWith("2H") || match.startsWith("3H") || match.startsWith("6H")) {
            return match;
        }
        const sign = num.startsWith("-") ? num : num === "0" ? "0" : "+" + num.replace(/^\+/, "");
        return makeOverset(sign, elem);
    }).replace(/([A-Z][a-z]?)\s*(?:\^\{?([+-]?[0-9]+|0|\\circ|o)\}?|˚)/g, (_, elem, oxid1)=>{
        return makeOverset(oxid1 || "0", elem);
    }).replace(/(?:\\?xrightarrow(?:\[([^\]]*)\])?\{([^}]*)\}|➔\s*\(([^)]+)\)|->\s*\(([^)]+)\)|([tT][\^˚\circ0o]+)\s*➔|➔\s*([tT][\^˚\circ0o]+))/g, (_, below, above, c1, c2, c3, c4)=>{
        const cond = above || c1 || c2 || c3 || c4 || "t°";
        const cleanAbove = cond.replace(/\\text\{([^}]+)\}/g, "$1").replace(/t\^?[0o\circ˚]|t0|to/gi, "t°").replace(/\^0|\^\circ|\^o/g, "°");
        const cleanBelow = (below || "").replace(/\\text\{([^}]+)\}/g, "$1");
        if (cleanBelow) {
            return `<span style="display:inline-block;text-align:center;vertical-align:middle;margin:0 6px;"><span style="display:block;font-size:0.7em;font-weight:600;color:#38bdf8;line-height:1;margin-bottom:-0.2em;">${cleanAbove}</span><span style="font-size:1.1em;line-height:1;">➔</span><span style="display:block;font-size:0.7em;color:#94a3b8;line-height:1;margin-top:1px;">${cleanBelow}</span></span>`;
        }
        return `<span style="display:inline-block;text-align:center;vertical-align:middle;margin:0 6px;"><span style="display:block;font-size:0.7em;font-weight:600;color:#38bdf8;line-height:1;margin-bottom:-0.2em;">${cleanAbove}</span><span style="font-size:1.1em;line-height:1;">➔</span></span>`;
    }).replace(/\\uparrow/g, " ↑ ").replace(/\\downarrow/g, " ↓ ").replace(/\\rightarrow|\\longrightarrow|\\to|->|arrow/gi, " ➔ ").replace(/\\rightleftharpoons|\\leftrightarrow|\\Leftrightarrow/g, " ⇌ ").replace(/\$([^\$]+)\$/g, "$1").replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>").replace(/_\{([^}]+)\}/g, "<sub>$1</sub>").replace(/_([a-zA-Z0-9+\-]+)/g, "<sub>$1</sub>").replace(/\\\\/g, "<br/>").replace(/\\/g, "");
    res = res.replace(/([A-Z][a-z]?|\))([0-9]+)(?![<0-9\+\-])/g, "$1<sub>$2</sub>");
    res = res.replace(/([^\n<]+)\s*\n+\s*(<span[^>]*>[^<]*t°[^<]*➔[^<]*<\/span>|➔|→|⇌)\s*\n+\s*([^\n<]+)/gi, "$1 $2 $3");
    return res;
}
function formatMarkdownToHTML(text) {
    if (!text) return "";
    const cleanedText = cleanChemicalLatex(text);
    let html = cleanedText// Replace <br> strings or newlines
    .replace(/<br\s*\/?>/gi, "\n")// Bold **text**
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")// Italic *text*
    .replace(/\*(.*?)\*/g, "<em>$1</em>")// Headings ###
    .replace(/^#### (.*$)/gim, '<h4 style="color:#38bdf8;font-size:13px;margin:8px 0 4px;">$1</h4>').replace(/^### (.*$)/gim, '<h3 style="color:#38bdf8;font-size:14px;margin:10px 0 4px;">$1</h3>').replace(/^## (.*$)/gim, '<h2 style="color:#38bdf8;font-size:16px;margin:12px 0 6px;">$1</h2>').replace(/^# (.*$)/gim, '<h1 style="color:#38bdf8;font-size:18px;margin:14px 0 8px;">$1</h1>');
    // Convert markdown tables & lists
    const lines = html.split("\n");
    let inTable = false;
    let tableHTML = "";
    const resultLines = [];
    for (let line of lines){
        const trimmed = line.trim();
        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
            if (trimmed.includes("---")) continue;
            const cells = trimmed.split("|").filter((_, idx, arr)=>idx > 0 && idx < arr.length - 1);
            if (!inTable) {
                tableHTML += '<table style="width:100%;border-collapse:collapse;margin:10px 0;border:1px solid rgba(255,255,255,0.1);"><thead><tr style="background:#1e293b;color:#f59e0b;">' + cells.map((c)=>`<th style="border:1px solid rgba(255,255,255,0.1);padding:6px;text-align:left;">${c.trim()}</th>`).join("") + "</tr></thead><tbody>";
                inTable = true;
            } else {
                tableHTML += "<tr>" + cells.map((c)=>`<td style="border:1px solid rgba(255,255,255,0.1);padding:6px;">${c.trim()}</td>`).join("") + "</tr>";
            }
        } else {
            if (inTable) {
                tableHTML += "</tbody></table>";
                resultLines.push(tableHTML);
                tableHTML = "";
                inTable = false;
            }
            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                resultLines.push(`<div style="padding-left:14px;margin:2px 0;">• ${trimmed.substring(2)}</div>`);
            } else if (/^\d+\.\s/.test(trimmed)) {
                resultLines.push(`<div style="padding-left:14px;margin:2px 0;">${trimmed}</div>`);
            } else {
                resultLines.push(line);
            }
        }
    }
    if (inTable) {
        tableHTML += "</tbody></table>";
        resultLines.push(tableHTML);
    }
    return resultLines.join("<br/>");
}
function AuditTab() {
    _s();
    const [isAuthed, setIsAuthed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [openModal, setOpenModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [subTab, setSubTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("students");
    const [filterText, setFilterText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Data States
    const [chatLogs, setChatLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [quizBank, setQuizBank] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Kahoot Host State
    const [timerSec, setTimerSec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [hostPin, setHostPin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [participants, setParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [gameStatus, setGameStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle"); // idle | waiting | active | finished
    const [kahootHistory, setKahootHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedStudent, setSelectedStudent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuditTab.useEffect": ()=>{
            fetchKahootHistory();
        }
    }["AuditTab.useEffect"], []);
    const fetchKahootHistory = async ()=>{
        try {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("experiments").select("*").like("cache_key", "kahoot_history_%").order("created_at", {
                ascending: false
            }).limit(10);
            if (data) {
                setKahootHistory(data.map((item)=>item.result_json));
            }
        } catch (e) {
            console.warn("Fetch Kahoot history error:", e);
        }
    };
    const handleVerify = ()=>{
        const expectedPassword = ("TURBOPACK compile-time value", "chemai2026") || "chemai2026";
        if (password === expectedPassword) {
            setIsAuthed(true);
            setOpenModal(false);
            fetchCurrentSubData("chat");
        } else {
            setErrorMsg(true);
        }
    };
    const fetchCurrentSubData = async (type = subTab)=>{
        setIsLoading(true);
        try {
            if (type === "chat") {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("chat_logs").select("*").order("created_at", {
                    ascending: false
                }).limit(40);
                setChatLogs(data || []);
            } else if (type === "quiz") {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("quiz_questions").select("*").order("created_at", {
                    ascending: false
                }).limit(40);
                setQuizBank(data || []);
            }
        } catch (e) {
            console.error("Fetch audit data error:", e);
        } finally{
            setIsLoading(false);
        }
    };
    const handleCreateKahootRoom = async ()=>{
        const pin = Math.floor(100000 + Math.random() * 900000).toString();
        try {
            let { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("rooms").insert({
                room_pin: pin,
                status: "waiting",
                current_question: null,
                timer_sec: timerSec
            });
            // Fallback if timer_sec column does not exist in Supabase DB schema
            if (error && error.message?.includes("timer_sec")) {
                const fallback = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("rooms").insert({
                    room_pin: pin,
                    status: "waiting",
                    current_question: null
                });
                error = fallback.error;
            }
            if (error) throw error;
            setHostPin(pin);
            setGameStatus("waiting");
            fetchCurrentSubData("quiz");
            pollParticipants(pin);
        } catch (e) {
            alert("Lỗi tạo phòng Kahoot: " + e.message);
        }
    };
    const pollParticipants = async (pinStr)=>{
        try {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("room_participants").select("*").eq("room_pin", pinStr).order("score", {
                ascending: false
            });
            setParticipants(data || []);
            // Auto finish match on teacher host side when all participants finished 10 questions OR room status is finished
            const allFinished = data && data.length > 0 && data.every((p)=>p.answers && Object.keys(p.answers).length >= 10);
            const { data: roomData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("rooms").select("status").eq("room_pin", pinStr).maybeSingle();
            if (roomData && roomData.status === "finished" || allFinished) {
                if (gameStatus !== "finished") {
                    setGameStatus("finished");
                    // Save Kahoot leaderboard history to DB automatically
                    const leaderData = {
                        room_pin: pinStr,
                        ended_at: new Date().toISOString(),
                        leaderboard: (data || []).sort((a, b)=>b.score - a.score)
                    };
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("experiments").upsert({
                        cache_key: `kahoot_history_${pinStr}_${Date.now()}`,
                        result_json: leaderData
                    });
                    if (roomData && roomData.status !== "finished") {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("rooms").update({
                            status: "finished"
                        }).eq("room_pin", pinStr);
                    }
                    fetchKahootHistory();
                }
            }
        } catch (e) {
            console.warn("Poll participants error:", e);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuditTab.useEffect": ()=>{
            let interval = null;
            if (hostPin && (gameStatus === "waiting" || gameStatus === "active")) {
                // Immediate poll
                pollParticipants(hostPin);
                // Auto poll every 2 seconds
                interval = setInterval({
                    "AuditTab.useEffect": ()=>{
                        pollParticipants(hostPin);
                    }
                }["AuditTab.useEffect"], 2000);
            }
            return ({
                "AuditTab.useEffect": ()=>{
                    if (interval) clearInterval(interval);
                }
            })["AuditTab.useEffect"];
        }
    }["AuditTab.useEffect"], [
        hostPin,
        gameStatus
    ]);
    const filteredChatLogs = chatLogs.filter((row)=>!filterText || row.user_message?.toLowerCase().includes(filterText.toLowerCase()) || row.session_id?.toLowerCase().includes(filterText.toLowerCase()));
    const filteredQuizBank = quizBank.filter((row)=>!filterText || row.question?.toLowerCase().includes(filterText.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
        sx: {
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.1)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
            sx: {
                p: {
                    xs: 1.5,
                    sm: 2,
                    md: 3
                }
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row"
                    },
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center"
                    },
                    gap: 1.5,
                    mb: 2.5,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                    color: "#f59e0b",
                                    size: 22
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 456,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "h6",
                                    fontWeight: "bold",
                                    sx: {
                                        fontSize: {
                                            xs: '15px',
                                            sm: '18px'
                                        }
                                    },
                                    children: "Cổng Kiểm Duyệt Audit & Kahoot Host"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 457,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 455,
                            columnNumber: 11
                        }, this),
                        isAuthed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                            direction: "row",
                            spacing: 1,
                            alignItems: "center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                    label: "Đã Xác Thực",
                                    color: "success",
                                    size: "small",
                                    sx: {
                                        height: 22,
                                        fontSize: 11
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 464,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    size: "small",
                                    variant: "outlined",
                                    color: "error",
                                    onClick: ()=>setIsAuthed(false),
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuditTab.tsx",
                                        lineNumber: 470,
                                        columnNumber: 28
                                    }, this),
                                    sx: {
                                        textTransform: "none",
                                        fontSize: "12px"
                                    },
                                    children: "Khóa cổng"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 465,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 463,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuditTab.tsx",
                    lineNumber: 447,
                    columnNumber: 9
                }, this),
                !isAuthed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                    sx: {
                        p: {
                            xs: 2.5,
                            sm: 4
                        },
                        bgcolor: "#0f172a",
                        borderRadius: 2,
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "body2",
                            color: "text.secondary",
                            mb: 2,
                            sx: {
                                fontSize: {
                                    xs: "13px",
                                    sm: "14px"
                                }
                            },
                            children: "Vui lòng nhập mật khẩu quản trị dành cho Giáo viên để xem nhật ký thao tác AI, Ngân hàng câu hỏi trắc nghiệm & Quản lý điều hành phòng đấu Kahoot Multiplayer."
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 488,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                            variant: "contained",
                            color: "warning",
                            onClick: ()=>setOpenModal(true),
                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/AuditTab.tsx",
                                lineNumber: 497,
                                columnNumber: 26
                            }, this),
                            sx: {
                                fontWeight: "bold",
                                textTransform: "none",
                                fontSize: {
                                    xs: "13.5px",
                                    sm: "14.5px"
                                }
                            },
                            children: "Nhập Mật Khẩu Đăng Nhập"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 493,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuditTab.tsx",
                    lineNumber: 480,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                            flexWrap: "wrap",
                            gap: 1,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    direction: "row",
                                    spacing: 1,
                                    flexWrap: "wrap",
                                    gap: 0.8,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            size: "small",
                                            variant: subTab === "students" ? "contained" : "outlined",
                                            color: "warning",
                                            onClick: ()=>setSubTab("students"),
                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 520,
                                                columnNumber: 30
                                            }, this),
                                            sx: {
                                                textTransform: "none",
                                                fontWeight: "bold"
                                            },
                                            children: "Sổ Học Sinh & Năng Lực"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 515,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            size: "small",
                                            variant: subTab === "chat" ? "contained" : "outlined",
                                            color: "warning",
                                            onClick: ()=>{
                                                setSubTab("chat");
                                                fetchCurrentSubData("chat");
                                            },
                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 533,
                                                columnNumber: 30
                                            }, this),
                                            sx: {
                                                textTransform: "none",
                                                fontWeight: "bold"
                                            },
                                            children: "Chat Logs AI"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            size: "small",
                                            variant: subTab === "quiz" ? "contained" : "outlined",
                                            color: "warning",
                                            onClick: ()=>{
                                                setSubTab("quiz");
                                                fetchCurrentSubData("quiz");
                                            },
                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 546,
                                                columnNumber: 30
                                            }, this),
                                            sx: {
                                                textTransform: "none",
                                                fontWeight: "bold"
                                            },
                                            children: "Quiz Bank (Ngân hàng)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 538,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            size: "small",
                                            variant: subTab === "kahoot" ? "contained" : "outlined",
                                            color: "warning",
                                            onClick: ()=>setSubTab("kahoot"),
                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 556,
                                                columnNumber: 30
                                            }, this),
                                            sx: {
                                                textTransform: "none",
                                                fontWeight: "bold"
                                            },
                                            children: "Kahoot Host Portal"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 551,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 514,
                                    columnNumber: 15
                                }, this),
                                subTab !== "kahoot" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    size: "small",
                                    onClick: ()=>fetchCurrentSubData(),
                                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuditTab.tsx",
                                        lineNumber: 567,
                                        columnNumber: 30
                                    }, this),
                                    children: "Tải Lại CSDL"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 564,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 506,
                            columnNumber: 13
                        }, this),
                        subTab !== "kahoot" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            mb: 2,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                fullWidth: true,
                                size: "small",
                                placeholder: "🔍 Nhập từ khóa tìm kiếm (Tên hóa chất, Session ID, câu hỏi...)...",
                                value: filterText,
                                onChange: (e)=>setFilterText(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AuditTab.tsx",
                                lineNumber: 577,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 576,
                            columnNumber: 15
                        }, this),
                        subTab === "students" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                mt: 1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StudentProgressManager$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/components/AuditTab.tsx",
                                lineNumber: 590,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 589,
                            columnNumber: 15
                        }, this),
                        subTab === "chat" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            sx: {
                                bgcolor: "#0f172a",
                                borderRadius: 2,
                                overflowX: "auto",
                                border: "1px solid rgba(255,255,255,0.08)"
                            },
                            className: "custom-scrollbar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                size: "small",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                                        sx: {
                                            bgcolor: "#1e293b"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#38bdf8",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: "Thời gian"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#38bdf8",
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: "Session ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#38bdf8",
                                                        fontWeight: "bold",
                                                        minWidth: 160
                                                    },
                                                    children: "Câu hỏi Học sinh"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#38bdf8",
                                                        fontWeight: "bold",
                                                        minWidth: 280
                                                    },
                                                    children: "AI Trả lời"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 617,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 607,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuditTab.tsx",
                                        lineNumber: 606,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                                        children: filteredChatLogs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                colSpan: 4,
                                                align: "center",
                                                sx: {
                                                    color: "text.secondary",
                                                    py: 3
                                                },
                                                children: "Chưa có dữ liệu Chat Log được ghi nhận trên Supabase."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 625,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 624,
                                            columnNumber: 23
                                        }, this) : filteredChatLogs.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "text.secondary",
                                                            fontSize: "11px",
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: new Date(row.created_at).toLocaleString("vi-VN")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 636,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "cyan",
                                                            fontSize: "11px",
                                                            fontFamily: "monospace",
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: row.session_id || "N/A"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "common.white",
                                                            fontSize: "12px"
                                                        },
                                                        children: row.user_message
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 655,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "text.secondary",
                                                            fontSize: "12px",
                                                            minWidth: 280
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                "& h1, & h2, & h3, & h4": {
                                                                    color: "#38bdf8",
                                                                    fontWeight: "bold",
                                                                    fontSize: "13px",
                                                                    my: 0.5
                                                                },
                                                                "& p": {
                                                                    my: 0.5
                                                                },
                                                                "& table": {
                                                                    width: "100%",
                                                                    borderCollapse: "collapse",
                                                                    my: 1,
                                                                    border: "1px solid rgba(255,255,255,0.1)"
                                                                },
                                                                "& th, & td": {
                                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                                    p: 0.8,
                                                                    textAlign: "left",
                                                                    fontSize: "11px"
                                                                },
                                                                "& th": {
                                                                    bgcolor: "#1e293b",
                                                                    color: "#f59e0b"
                                                                },
                                                                "& strong, & b": {
                                                                    color: "#fbbf24"
                                                                }
                                                            },
                                                            dangerouslySetInnerHTML: {
                                                                __html: formatMarkdownToHTML(row.ai_response || "")
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 660,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, row.id, true, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 635,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuditTab.tsx",
                                        lineNumber: 622,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AuditTab.tsx",
                                lineNumber: 605,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 596,
                            columnNumber: 15
                        }, this),
                        subTab === "quiz" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            sx: {
                                bgcolor: "#0f172a",
                                borderRadius: 2,
                                overflowX: "auto",
                                border: "1px solid rgba(255,255,255,0.08)"
                            },
                            className: "custom-scrollbar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                size: "small",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                                        sx: {
                                            bgcolor: "#1e293b"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#f59e0b",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Thời gian"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#f59e0b",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Nội dung Câu hỏi"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#f59e0b",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Đáp án Lựa chọn"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 729,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    align: "center",
                                                    sx: {
                                                        color: "#f59e0b",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Đúng"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    sx: {
                                                        color: "#f59e0b",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Lời Giải thích"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 738,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 722,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuditTab.tsx",
                                        lineNumber: 721,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                                        children: filteredQuizBank.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                colSpan: 5,
                                                align: "center",
                                                sx: {
                                                    color: "text.secondary",
                                                    py: 3
                                                },
                                                children: "Chưa có câu hỏi trắc nghiệm nào trong Ngân hàng CSDL Supabase."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 746,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 745,
                                            columnNumber: 23
                                        }, this) : filteredQuizBank.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "text.secondary",
                                                            fontSize: "11px",
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: new Date(row.created_at).toLocaleString("vi-VN")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "common.white",
                                                            fontSize: "12px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: row.question
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "text.secondary",
                                                            fontSize: "11px"
                                                        },
                                                        children: Array.isArray(row.options) ? row.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                        children: [
                                                                            [
                                                                                "A",
                                                                                "B",
                                                                                "C",
                                                                                "D"
                                                                            ][i],
                                                                            "."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                        lineNumber: 782,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    " ",
                                                                    opt
                                                                ]
                                                            }, i, true, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 781,
                                                                columnNumber: 33
                                                            }, this)) : ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        align: "center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                            label: [
                                                                "A",
                                                                "B",
                                                                "C",
                                                                "D"
                                                            ][row.correct_index] || "A",
                                                            color: "success",
                                                            size: "small",
                                                            sx: {
                                                                fontWeight: "bold"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 788,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 787,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            color: "text.secondary",
                                                            fontSize: "11px"
                                                        },
                                                        children: row.explanation
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 797,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, row.id, true, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 757,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuditTab.tsx",
                                        lineNumber: 743,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AuditTab.tsx",
                                lineNumber: 720,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 711,
                            columnNumber: 15
                        }, this),
                        subTab === "kahoot" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            sx: {
                                p: 3,
                                bgcolor: "#0f172a",
                                borderRadius: 2,
                                border: "1px solid rgba(255,255,255,0.08)"
                            },
                            children: [
                                gameStatus === "idle" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    textAlign: "center",
                                    py: 3,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                            color: "#f59e0b",
                                            size: 48,
                                            className: "mx-auto mb-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 822,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "h6",
                                            fontWeight: "bold",
                                            color: "common.white",
                                            mb: 1,
                                            children: "Tạo Phòng Đấu Kahoot Hóa Học (Bộ 10 Câu)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 823,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            color: "text.secondary",
                                            mb: 3,
                                            maxWidth: 500,
                                            mx: "auto",
                                            children: "Hệ thống tự động kết hợp câu hỏi bám sát SGK Hóa 10 từ Dify AI & Gemini AI, tự động lưu vào Supabase DB."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 831,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 2,
                                            mb: 3,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "caption",
                                                    color: "text.secondary",
                                                    children: "Thời gian/câu:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 849,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                    size: "small",
                                                    value: timerSec,
                                                    onChange: (e)=>setTimerSec(e.target.value),
                                                    sx: {
                                                        bgcolor: "#1e293b",
                                                        color: "#f59e0b",
                                                        fontWeight: "bold"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                            value: 10,
                                                            children: "10 giây"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 862,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                            value: 15,
                                                            children: "15 giây"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 863,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                            value: 20,
                                                            children: "20 giây (Khuyên dùng)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 864,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                            value: 30,
                                                            children: "30 giây"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 865,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 852,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 842,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                            variant: "contained",
                                            color: "warning",
                                            onClick: handleCreateKahootRoom,
                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 873,
                                                columnNumber: 34
                                            }, this),
                                            sx: {
                                                fontWeight: "bold",
                                                py: 1.2,
                                                px: 4
                                            },
                                            children: "Khởi Tạo Mã Phòng Mới 🚀"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 869,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 821,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            p: 2,
                                            bgcolor: "#1e293b",
                                            borderRadius: 2,
                                            mb: 3,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "caption",
                                                            color: "text.secondary",
                                                            children: "MÃ PIN KAHOOT PHÒNG LỚP:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 891,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            variant: "h4",
                                                            fontWeight: "bold",
                                                            color: "amber",
                                                            fontFamily: "monospace",
                                                            children: hostPin
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 894,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                    direction: "row",
                                                    spacing: 1,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            variant: "contained",
                                                            color: gameStatus === "finished" ? "secondary" : gameStatus === "active" ? "info" : "success",
                                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 908,
                                                                columnNumber: 38
                                                            }, this),
                                                            disabled: gameStatus === "finished",
                                                            onClick: async ()=>{
                                                                if (!hostPin) return;
                                                                try {
                                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("rooms").update({
                                                                        status: "active",
                                                                        current_question: 1
                                                                    }).eq("room_pin", hostPin);
                                                                    setGameStatus("active");
                                                                } catch (e) {
                                                                    alert("Lỗi bắt đầu trận đấu: " + e.message);
                                                                }
                                                            },
                                                            sx: {
                                                                fontWeight: "bold"
                                                            },
                                                            children: gameStatus === "finished" ? "🏁 TRẬN ĐẤU ĐÃ HOÀN THÀNH" : gameStatus === "active" ? "Đang Đấu (Trận đấu Đang Diễn Ra)" : "Bắt Đầu Đấu (10 Câu)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 905,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            variant: "outlined",
                                                            color: "error",
                                                            onClick: async ()=>{
                                                                if (hostPin) {
                                                                    // Save Kahoot leaderboard history to DB
                                                                    const leaderData = {
                                                                        room_pin: hostPin,
                                                                        ended_at: new Date().toISOString(),
                                                                        leaderboard: participants.sort((a, b)=>b.score - a.score)
                                                                    };
                                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("experiments").upsert({
                                                                        cache_key: `kahoot_history_${hostPin}_${Date.now()}`,
                                                                        result_json: leaderData
                                                                    });
                                                                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("rooms").update({
                                                                        status: "finished"
                                                                    }).eq("room_pin", hostPin);
                                                                }
                                                                setGameStatus("idle");
                                                                fetchKahootHistory();
                                                            },
                                                            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__["StopCircle"], {
                                                                size: 16
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 958,
                                                                columnNumber: 38
                                                            }, this),
                                                            children: "Kết Thúc & Lưu BXH"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 933,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 904,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 881,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            container: true,
                                            spacing: 2,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    item: true,
                                                    xs: 12,
                                                    md: 6,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        p: 2,
                                                        bgcolor: "#1e293b",
                                                        borderRadius: 2,
                                                        height: "100%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                mb: 1.5,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "subtitle2",
                                                                        fontWeight: "bold",
                                                                        color: "cyan",
                                                                        children: "👥 Học sinh đã tham gia"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                        lineNumber: 979,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                        label: `${participants.length} em`,
                                                                        size: "small",
                                                                        color: "primary"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                        lineNumber: 986,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 973,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                display: "flex",
                                                                flexWrap: "wrap",
                                                                gap: 1,
                                                                children: participants.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    color: "text.secondary",
                                                                    children: "Đang chờ học sinh nhập mã PIN vào phòng..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                                    lineNumber: 995,
                                                                    columnNumber: 31
                                                                }, this) : participants.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                        label: p.nickname,
                                                                        color: "secondary",
                                                                        variant: "outlined",
                                                                        onClick: ()=>setSelectedStudent(p),
                                                                        sx: {
                                                                            cursor: "pointer",
                                                                            "&:hover": {
                                                                                bgcolor: "rgba(217, 70, 239, 0.2)"
                                                                            }
                                                                        }
                                                                    }, p.id, false, {
                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                        lineNumber: 1003,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 993,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    item: true,
                                                    xs: 12,
                                                    md: 6,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        p: 2,
                                                        bgcolor: "#1e293b",
                                                        borderRadius: 2,
                                                        height: "100%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "subtitle2",
                                                                fontWeight: "bold",
                                                                color: "amber",
                                                                mb: 1.5,
                                                                children: "🏆 Bảng Xếp Hạng & Chi Tiết Học Sinh (Click Xem Chi Tiết)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 1029,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                                spacing: 1,
                                                                children: participants.map((p, idx)=>{
                                                                    const isCorrect = p.score > 0;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        p: 1,
                                                                        bgcolor: "#0f172a",
                                                                        borderRadius: 1,
                                                                        onClick: ()=>setSelectedStudent(p),
                                                                        sx: {
                                                                            cursor: "pointer",
                                                                            transition: "all 0.2s",
                                                                            "&:hover": {
                                                                                bgcolor: "#1e293b",
                                                                                border: "1px solid #f59e0b"
                                                                            }
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                gap: 1,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                                        variant: "caption",
                                                                                        fontWeight: "bold",
                                                                                        color: idx === 0 ? "amber" : "common.white",
                                                                                        children: [
                                                                                            "#",
                                                                                            idx + 1,
                                                                                            " ",
                                                                                            p.nickname
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                                        lineNumber: 1065,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                                        label: isCorrect ? "✓ Đúng (+10đ)" : "Chờ / Chưa chọn",
                                                                                        color: isCorrect ? "success" : "default",
                                                                                        size: "small",
                                                                                        sx: {
                                                                                            fontSize: "10px",
                                                                                            height: 20
                                                                                        }
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                                        lineNumber: 1074,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                                lineNumber: 1060,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                                                size: "small",
                                                                                variant: "text",
                                                                                color: "warning",
                                                                                sx: {
                                                                                    fontSize: "11px",
                                                                                    textTransform: "none",
                                                                                    fontWeight: "bold"
                                                                                },
                                                                                children: [
                                                                                    p.score,
                                                                                    "đ ➔ Xem bài"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                                lineNumber: 1085,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, p.id, true, {
                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                        lineNumber: 1042,
                                                                        columnNumber: 33
                                                                    }, this);
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 1038,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 1023,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 1022,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 965,
                                            columnNumber: 21
                                        }, this),
                                        gameStatus === "finished" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            mt: 3,
                                            p: 2,
                                            bgcolor: "#1e293b",
                                            borderRadius: 2,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "subtitle2",
                                                    fontWeight: "bold",
                                                    color: "cyan",
                                                    mb: 1.5,
                                                    children: "📊 Báo Cáo & Thống Kê Chi Tiết Đáp Án Học Sinh Chọn (Hoàn Thành Trận Đấu)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                    spacing: 2,
                                                    children: quizBank.slice(0, 10).map((q, qIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                            sx: {
                                                                p: 2,
                                                                bgcolor: "#0f172a",
                                                                borderRadius: 2,
                                                                border: "1px solid rgba(255,255,255,0.08)"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "body2",
                                                                    fontWeight: "bold",
                                                                    color: "common.white",
                                                                    mb: 1.5,
                                                                    children: [
                                                                        "Câu ",
                                                                        qIdx + 1,
                                                                        ": ",
                                                                        q.question
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                                    lineNumber: 1126,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                                    container: true,
                                                                    spacing: 1.5,
                                                                    mb: 2,
                                                                    children: Array.isArray(q.options) && q.options.map((opt, optIdx)=>{
                                                                        const isCorrectOpt = optIdx === q.correct_index;
                                                                        // Count students who picked this option
                                                                        const pickedStudents = participants.filter((p)=>p.answers && p.answers[qIdx] === optIdx);
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                                            item: true,
                                                                            xs: 12,
                                                                            sm: 6,
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                                p: 1,
                                                                                bgcolor: isCorrectOpt ? "rgba(16, 185, 129, 0.15)" : "rgba(255,255,255,0.03)",
                                                                                borderRadius: 1.5,
                                                                                border: `1px solid ${isCorrectOpt ? "#10b981" : "rgba(255,255,255,0.08)"}`,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                                        display: "flex",
                                                                                        justifyContent: "space-between",
                                                                                        alignItems: "center",
                                                                                        mb: 0.5,
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                                                variant: "caption",
                                                                                                color: isCorrectOpt ? "#10b981" : "common.white",
                                                                                                fontWeight: "bold",
                                                                                                children: [
                                                                                                    [
                                                                                                        "A",
                                                                                                        "B",
                                                                                                        "C",
                                                                                                        "D"
                                                                                                    ][optIdx],
                                                                                                    ".",
                                                                                                    " ",
                                                                                                    opt,
                                                                                                    " ",
                                                                                                    isCorrectOpt && "✓ (Đáp án chuẩn)"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                                                lineNumber: 1163,
                                                                                                columnNumber: 45
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                                                label: `${pickedStudents.length} học sinh`,
                                                                                                size: "small",
                                                                                                color: isCorrectOpt ? "success" : pickedStudents.length > 0 ? "error" : "default",
                                                                                                sx: {
                                                                                                    height: 20,
                                                                                                    fontSize: "10px",
                                                                                                    fontWeight: "bold"
                                                                                                }
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                                                lineNumber: 1176,
                                                                                                columnNumber: 45
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                                        lineNumber: 1157,
                                                                                        columnNumber: 43
                                                                                    }, this),
                                                                                    pickedStudents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                                                        direction: "row",
                                                                                        spacing: 0.5,
                                                                                        flexWrap: "wrap",
                                                                                        mt: 0.5,
                                                                                        children: pickedStudents.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                                                label: p.nickname,
                                                                                                size: "small",
                                                                                                variant: "outlined",
                                                                                                color: isCorrectOpt ? "success" : "error",
                                                                                                sx: {
                                                                                                    height: 18,
                                                                                                    fontSize: "9px"
                                                                                                }
                                                                                            }, p.id, false, {
                                                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                                                lineNumber: 1201,
                                                                                                columnNumber: 49
                                                                                            }, this))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                                        lineNumber: 1194,
                                                                                        columnNumber: 45
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                                lineNumber: 1147,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        }, optIdx, false, {
                                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                                            lineNumber: 1146,
                                                                            columnNumber: 39
                                                                        }, this);
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 31
                                                                }, this),
                                                                (()=>{
                                                                    const pending = participants.filter((p)=>!p.answers || p.answers[qIdx] === undefined);
                                                                    if (pending.length === 0) return null;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "caption",
                                                                        color: "text.secondary",
                                                                        display: "block",
                                                                        children: [
                                                                            "⏳ ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: [
                                                                                    pending.length,
                                                                                    " em chưa chọn:"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                                lineNumber: 1238,
                                                                                columnNumber: 39
                                                                            }, this),
                                                                            " ",
                                                                            pending.map((p)=>p.nickname).join(", ")
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                        lineNumber: 1233,
                                                                        columnNumber: 35
                                                                    }, this);
                                                                })()
                                                            ]
                                                        }, q.id || qIdx, true, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 1117,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 1115,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 23
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 880,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    mt: 4,
                                    pt: 2,
                                    borderTop: "1px dashed rgba(255,255,255,0.1)",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "subtitle2",
                                            fontWeight: "bold",
                                            color: "amber",
                                            mb: 1.5,
                                            children: "📜 Lịch Sử Bảng Xếp Hạng Các Trận Đấu Kahoot Đã Lưu CSDL"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 1253,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                            spacing: 1.5,
                                            children: kahootHistory.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                children: "Chưa có lịch sử kết quả trận đấu Kahoot nào được lưu."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 1263,
                                                columnNumber: 23
                                            }, this) : kahootHistory.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                    sx: {
                                                        p: 2,
                                                        bgcolor: "#1e293b",
                                                        borderRadius: 2
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            mb: 1,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "subtitle2",
                                                                    fontWeight: "bold",
                                                                    color: "cyan",
                                                                    children: [
                                                                        "🏆 Trận đấu PIN #",
                                                                        h.room_pin
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                                    lineNumber: 1278,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    variant: "caption",
                                                                    color: "text.secondary",
                                                                    children: [
                                                                        "Thời gian:",
                                                                        " ",
                                                                        new Date(h.ended_at).toLocaleString("vi-VN")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                                    lineNumber: 1285,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 1272,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                            direction: "row",
                                                            spacing: 2,
                                                            flexWrap: "wrap",
                                                            children: h.leaderboard?.slice(0, 3).map((player, pIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                    label: `#${pIdx + 1} ${player.nickname}: ${player.score}đ`,
                                                                    color: pIdx === 0 ? "warning" : pIdx === 1 ? "primary" : "secondary",
                                                                    size: "small",
                                                                    sx: {
                                                                        fontWeight: "bold"
                                                                    }
                                                                }, pIdx, false, {
                                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                                    lineNumber: 1297,
                                                                    columnNumber: 33
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 1293,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 1268,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 1261,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 1252,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 812,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuditTab.tsx",
                    lineNumber: 504,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                    open: openModal,
                    onClose: ()=>setOpenModal(false),
                    maxWidth: "xs",
                    fullWidth: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                            sx: {
                                bgcolor: "#0f172a",
                                color: "amber"
                            },
                            children: "Xác Thực Quyền Giáo Viên"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 1329,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                            sx: {
                                bgcolor: "#0f172a"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "caption",
                                    color: "text.secondary",
                                    display: "block",
                                    mb: 2,
                                    children: "Vui lòng nhập mật khẩu quản trị để truy cập cổng Audit & Kahoot Host"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 1333,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                    fullWidth: true,
                                    type: "password",
                                    size: "small",
                                    label: "Mật khẩu",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    onKeyDown: (e)=>e.key === "Enter" && handleVerify(),
                                    error: errorMsg,
                                    helperText: errorMsg ? "Mật khẩu không chính xác!" : ""
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 1342,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 1332,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                            sx: {
                                bgcolor: "#0f172a"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    onClick: ()=>setOpenModal(false),
                                    children: "Hủy"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 1355,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                    variant: "contained",
                                    color: "warning",
                                    onClick: handleVerify,
                                    children: "Xác Nhận"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 1356,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 1354,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuditTab.tsx",
                    lineNumber: 1323,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                    open: Boolean(selectedStudent),
                    onClose: ()=>setSelectedStudent(null),
                    maxWidth: "md",
                    fullWidth: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                            sx: {
                                bgcolor: "#0f172a",
                                color: "#38bdf8",
                                fontWeight: "bold"
                            },
                            children: [
                                "👤 Chi Tiết Bài Làm Học Sinh: ",
                                selectedStudent?.nickname,
                                " (Tổng điểm: ",
                                selectedStudent?.score,
                                "đ)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 1368,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                            sx: {
                                bgcolor: "#0f172a"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "body2",
                                    color: "text.secondary",
                                    mb: 2,
                                    children: [
                                        "Phân tích đáp án học sinh ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: selectedStudent?.nickname
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuditTab.tsx",
                                            lineNumber: 1376,
                                            columnNumber: 41
                                        }, this),
                                        " đã chọn trên tất cả 10 câu hỏi của trận đấu Kahoot:"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 1375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                    spacing: 2,
                                    children: (()=>{
                                        const list = quizBank.slice(0, 10).filter((_, qIdx)=>gameStatus === 'finished' || selectedStudent?.answers && selectedStudent.answers[qIdx] !== undefined);
                                        if (list.length === 0) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                sx: {
                                                    p: 3,
                                                    bgcolor: '#1e293b',
                                                    textAlign: 'center',
                                                    borderRadius: 2
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body2",
                                                    color: "text.secondary",
                                                    children: [
                                                        "⏳ Học sinh ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: selectedStudent?.nickname
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AuditTab.tsx",
                                                            lineNumber: 1390,
                                                            columnNumber: 36
                                                        }, this),
                                                        " chưa thực hiện trả lời câu hỏi nào trong trận đấu này."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                    lineNumber: 1389,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 1388,
                                                columnNumber: 21
                                            }, this);
                                        }
                                        return list.map((q, qIdx)=>{
                                            const studentAnsIdx = selectedStudent?.answers ? selectedStudent.answers[qIdx] : undefined;
                                            const isCorrect = studentAnsIdx === q.correct_index;
                                            const hasAnswered = studentAnsIdx !== undefined;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                                                sx: {
                                                    p: 2,
                                                    bgcolor: "#1e293b",
                                                    borderRadius: 2,
                                                    border: `1px solid ${isCorrect ? "#10b981" : hasAnswered ? "#ef4444" : "rgba(255,255,255,0.1)"}`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        mb: 1,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "subtitle2",
                                                                fontWeight: "bold",
                                                                color: "common.white",
                                                                children: [
                                                                    "Câu ",
                                                                    qIdx + 1,
                                                                    ": ",
                                                                    q.question
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 1419,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                                label: isCorrect ? "✓ Trả lời Đúng (+10đ)" : hasAnswered ? `❌ Chọn sai (${[
                                                                    "A",
                                                                    "B",
                                                                    "C",
                                                                    "D"
                                                                ][studentAnsIdx]})` : "⏳ Chưa chọn",
                                                                color: isCorrect ? "success" : hasAnswered ? "error" : "default",
                                                                size: "small",
                                                                sx: {
                                                                    fontWeight: "bold"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 1426,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 1413,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                        container: true,
                                                        spacing: 1,
                                                        mt: 1,
                                                        children: Array.isArray(q.options) && q.options.map((opt, optIdx)=>{
                                                            const isCorrectOpt = optIdx === q.correct_index;
                                                            const isStudentOpt = optIdx === studentAnsIdx;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                                item: true,
                                                                xs: 12,
                                                                sm: 6,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                                    p: 1,
                                                                    bgcolor: isStudentOpt ? isCorrectOpt ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)" : isCorrectOpt ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                                                                    borderRadius: 1,
                                                                    border: `1px solid ${isStudentOpt ? isCorrectOpt ? "#10b981" : "#ef4444" : isCorrectOpt ? "rgba(16, 185, 129, 0.5)" : "rgba(255,255,255,0.05)"}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                        variant: "caption",
                                                                        color: isStudentOpt ? isCorrectOpt ? "#10b981" : "#f87171" : isCorrectOpt ? "#10b981" : "text.secondary",
                                                                        fontWeight: isStudentOpt || isCorrectOpt ? "bold" : "normal",
                                                                        children: [
                                                                            [
                                                                                "A",
                                                                                "B",
                                                                                "C",
                                                                                "D"
                                                                            ][optIdx],
                                                                            ". ",
                                                                            opt,
                                                                            " ",
                                                                            isStudentOpt && "👈 (Em đã chọn)",
                                                                            " ",
                                                                            isCorrectOpt && "✓ (Đáp án chuẩn)"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                                        lineNumber: 1468,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AuditTab.tsx",
                                                                    lineNumber: 1454,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, optIdx, false, {
                                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                                lineNumber: 1453,
                                                                columnNumber: 31
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AuditTab.tsx",
                                                        lineNumber: 1446,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, q.id || qIdx, true, {
                                                fileName: "[project]/src/components/AuditTab.tsx",
                                                lineNumber: 1404,
                                                columnNumber: 21
                                            }, this);
                                        });
                                    })()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuditTab.tsx",
                                    lineNumber: 1380,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 1374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                            sx: {
                                bgcolor: "#0f172a"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "contained",
                                color: "primary",
                                onClick: ()=>setSelectedStudent(null),
                                children: "Đóng Xem Chi Tiết"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AuditTab.tsx",
                                lineNumber: 1501,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuditTab.tsx",
                            lineNumber: 1500,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuditTab.tsx",
                    lineNumber: 1362,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AuditTab.tsx",
            lineNumber: 446,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AuditTab.tsx",
        lineNumber: 439,
        columnNumber: 5
    }, this);
}
_s(AuditTab, "JGRGpaf4v+2fiHUqMBkGCuJAids=");
_c = AuditTab;
var _c;
__turbopack_context__.k.register(_c, "AuditTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_AuditTab_tsx_0qs8_ui._.js.map