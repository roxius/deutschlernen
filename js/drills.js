// drills.js — Geradores de exercícios DESAFIADORES (digitação, sem múltipla escolha óbvia)
// para os verbos e fórmulas das notas da Nadine. Cada drill produz um objeto:
//   { type, prompt, fields, accept, solution, tip }
//     - type:   "partizip" | "praeteritum" | "perfekt" | "praesens" | "tekamolo"
//     - fields: descreve os campos de entrada (1 texto, 2 textos, ou blocos do tekamolo)
//     - accept: array de respostas aceitas (por campo, quando houver mais de um)
//     - solution: resposta canônica para mostrar quando errar
//     - tip:    dica/regra mostrada ao errar (HTML leve, como nas notas)

const Drills = (() => {
  const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);
  const sample = (arr, n) => shuffle(arr).slice(0, n);

  // Normaliza para comparação tolerante: minúsculas, sem pontuação nas pontas,
  // espaços colapsados, ß≡ss e ä/ö/ü aceitos como ae/oe/ue.
  function normalize(s) {
    return String(s)
      .trim().toLowerCase()
      .replace(/[.!?,;:]+$/g, "")
      .replace(/\s+/g, " ")
      .replace(/ß/g, "ss")
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue");
  }
  // input casa com algum dos aceitos?
  function check(input, accept) {
    const n = normalize(input);
    return (Array.isArray(accept) ? accept : [accept]).some(a => normalize(a) === n);
  }

  const CHANGE_TIP = {
    "e→i": "Verbo forte com mudança <b>e→i</b> no du/er (ex.: essen → er <b>isst</b>).",
    "e→ie": "Verbo forte com mudança <b>e→ie</b> no du/er (ex.: sehen → er <b>sieht</b>).",
    "a→ä": "Verbo forte com mudança <b>a→ä</b> no du/er (ex.: fahren → er <b>fährt</b>).",
    "au→äu": "Verbo forte com mudança <b>au→äu</b> no du/er (laufen → er <b>läuft</b>).",
    "o→ö": "Verbo forte com mudança <b>o→ö</b> no du/er (stoßen → er <b>stößt</b>).",
  };

  function ppTip(v) {
    if (v.sep) return "Verbo <b>separável</b>: o «ge-» entra no meio → " + v.pp + ".";
    if (v.mixed) return "Forma <b>mista</b>: radical mudado + terminação fraca <b>-t</b> (ex.: brennen → gebrannt).";
    return "Verbo <b>forte/irregular</b>: Partizip II costuma terminar em <b>-en</b> com mudança de radical.";
  }

  function verbByInf(inf) { return (window.VERBS || []).find(v => v.inf === inf); }

  // Frases-exemplo (Präsens) que acompanham a dica, sem revelar a forma do passado.
  function exHtml(inf, max = 2) {
    const ex = (window.VERB_EX || {})[inf];
    if (!ex || !ex.length) return "";
    return ex.slice(0, max).map(([de, pt]) =>
      `<span class="hint-ex">📝 <i>${de}</i> <span class="muted">(${pt})</span></span>`).join("");
  }
  // As MESMAS frases no passado (Perfekt/Präteritum), mostradas DEPOIS de responder.
  function exPastHtml(inf, max = 2) {
    const ex = (window.VERB_EX || {})[inf];
    if (!ex || !ex.length) return "";
    return ex.slice(0, max).filter(e => e[2]).map(([, pt, past]) =>
      `<span class="hint-ex">⏳ <i>${past}</i> <span class="muted">(${pt})</span></span>`).join("");
  }

  // Dicas mostradas ANTES de responder (opt-in): apontam o padrão + a forma "irmã"
  // (a outra coluna da tabela), sem imprimir a própria resposta.
  function partizipHint(v) {
    const padrao = v.sep ? "<b>separável</b> (prefixo + ge + radical)"
      : v.mixed ? "<b>misto</b> (radical muda + termina em <b>-t</b>)"
      : "<b>forte</b> (termina em <b>-en</b>, o radical pode mudar)";
    return `É ${padrao}. Pista — Präteritum: <b>${v.praet}</b>. Auxiliar: <b>${v.aux}</b>.${exHtml(v.inf)}`;
  }
  function praeteritumHint(v) {
    const padrao = v.mixed ? "verbo <b>misto</b>" : "verbo <b>forte</b>";
    return `É ${padrao}. Pista — Partizip II: <b>${v.pp}</b>. A vogal do Präteritum costuma diferir do particípio.${exHtml(v.inf)}`;
  }
  function perfektHint(b) {
    const v = verbByInf(b.inf);
    const praetPista = v ? ` Präteritum de <b>${b.inf}</b>: <b>${v.praet}</b>.` : "";
    return `Escolha o auxiliar: movimento/mudança de estado → <b>sein</b>; senão → <b>haben</b>.${praetPista}${exHtml(b.inf)}`;
  }
  function praesensHint(b) {
    return `Verbo forte: a vogal muda <b>${b.change}</b> no du e er/sie/es; a terminação continua normal (du <b>-st</b>, er <b>-t</b>).${exHtml(b.inf, 1)}`;
  }
  const TEKAMOLO_HINT = "Verbo conjugado em <b>2ª posição</b>; depois os complementos na ordem <b>Te–Ka–Mo–Lo</b> (Temporal → Kausal → Modal → Lokal). Pronomes vêm logo após o verbo.";

  // --- Partizip II (digite) ---
  function makePartizip() {
    const v = sample(window.VERBS, 1)[0];
    return {
      type: "partizip",
      prompt: `Digite o <b>Partizip II</b> de <b>${v.inf}</b> <span class="muted">(${v.pt})</span>:`,
      fields: [{ ph: "Partizip II" }],
      accept: [[v.pp]],
      solution: v.pp,
      hint: partizipHint(v),
      exPast: exPastHtml(v.inf),
      tip: ppTip(v) + ` Auxiliar: <b>${v.aux}</b>.`,
    };
  }

  // --- Präteritum (digite a forma ich/er) ---
  function makePraeteritum() {
    const v = sample(window.VERBS, 1)[0];
    return {
      type: "praeteritum",
      prompt: `Digite o <b>Präteritum</b> (ich/er) de <b>${v.inf}</b> <span class="muted">(${v.pt})</span>:`,
      fields: [{ ph: "Präteritum" }],
      accept: [[v.praet]],
      solution: v.praet,
      hint: praeteritumHint(v),
      exPast: exPastHtml(v.inf),
      tip: `<b>${v.inf} → ${v.praet} → ${v.pp}</b>. O Präteritum (Spalte 2) forma o passado simples; decore as três colunas juntas.`,
    };
  }

  // --- Perfekt: duas lacunas (auxiliar + Partizip II) ---
  function makePerfekt() {
    const b = sample(window.PERFEKT_BANK, 1)[0];
    const sentence = `${b.pre} <span class="blank">___</span> ${b.mid} <span class="blank">___</span>${b.post ? " " + b.post : ""}.`;
    const auxRule = /^(bin|bist|ist|sind|seid|war)/.test(b.aux)
      ? "verbo de <b>movimento/mudança</b> → auxiliar <b>sein</b>"
      : "ação comum → auxiliar <b>haben</b>";
    return {
      type: "perfekt",
      prompt: `Complete no <b>Perfekt</b> <span class="muted">(${b.inf})</span>:<br><span class="ex-sentence">${sentence}</span>`,
      fields: [{ ph: "haben/sein" }, { ph: "Partizip II" }],
      accept: [[b.aux], [b.pp]],
      solution: `${b.aux} … ${b.pp}`,
      hint: perfektHint(b),
      exPast: exPastHtml(b.inf, 1),
      tip: `Perfekt = <b>aux. (haben/sein) + Partizip II</b>. Aqui: ${auxRule}; Partizip II de <b>${b.inf}</b> = <b>${b.pp}</b>.`,
    };
  }

  // --- Präsens com mudança de vogal ---
  function makePraesens() {
    const b = sample(window.PRAESENS_BANK, 1)[0];
    const subj = b.subj ? `${b.subj} (${b.pron})` : b.pron;
    return {
      type: "praesens",
      prompt: `Conjugue <b>${b.inf}</b> no Präsens:<br><span class="ex-sentence">${subj} ____</span>`,
      fields: [{ ph: "forma conjugada" }],
      accept: [[b.form]],
      solution: b.form,
      hint: praesensHint(b),
      exPast: exPastHtml(b.inf, 1),
      tip: CHANGE_TIP[b.change] || "Atenção à mudança de vogal no singular.",
    };
  }

  // --- TeKaMoLo: reordenar blocos ---
  function makeTekamolo() {
    const b = sample(window.TEKAMOLO_BANK, 1)[0];
    // embaralha garantindo que não saia já na ordem correta
    let order = shuffle(b.answer);
    if (order.join("|") === b.answer.join("|") && b.answer.length > 1) order = shuffle(b.answer);
    return {
      type: "tekamolo",
      prompt: `Coloque os blocos na ordem correta:`,
      blocks: order,
      answer: b.answer,
      accept: [[b.answer.join(" ")]],
      solution: b.answer.join(" "),
      hint: TEKAMOLO_HINT,
      tip: `<b>Te–Ka–Mo–Lo</b>: ${b.note}`,
    };
  }

  const GEN = {
    partizip: makePartizip,
    praeteritum: makePraeteritum,
    perfekt: makePerfekt,
    praesens: makePraesens,
    tekamolo: makeTekamolo,
  };

  // metadados para a UI (rótulos dos lançadores)
  const types = [
    { key: "partizip", icon: "🧩", label: "Partizip II", desc: "Digite o particípio dos verbos." },
    { key: "praeteritum", icon: "⏳", label: "Präteritum", desc: "Digite o passado simples (ich/er)." },
    { key: "perfekt", icon: "⏱️", label: "Perfekt", desc: "Monte a frase: haben/sein + Partizip II." },
    { key: "praesens", icon: "🔁", label: "Präsens forte", desc: "Mudança de vogal no du/er." },
    { key: "tekamolo", icon: "📐", label: "TeKaMoLo", desc: "Reordene a frase (Te-Ka-Mo-Lo)." },
  ];

  function generate(type, n = 8) {
    const gen = GEN[type];
    if (!gen) return [];
    const out = [];
    let guard = 0;
    while (out.length < n && guard < n * 12) { guard++; out.push(gen()); }
    return out;
  }

  return { generate, normalize, check, types };
})();

window.Drills = Drills;
