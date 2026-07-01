// drills.js — Geradores de exercícios DESAFIADORES (digitação) para os verbos e fórmulas.
// Bilíngue: as explicações usam L(pt,en) conforme o idioma; o alemão permanece.

const Drills = (() => {
  const L = (pt, en) => (window.Lang.get() === "en" ? en : pt); // escolhe idioma
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
  function check(input, accept) {
    const n = normalize(input);
    return (Array.isArray(accept) ? accept : [accept]).some(a => normalize(a) === n);
  }

  function changeTip(change) {
    const ex = { "e→i": "essen → er <b>isst</b>", "e→ie": "sehen → er <b>sieht</b>", "a→ä": "fahren → er <b>fährt</b>", "au→äu": "laufen → er <b>läuft</b>", "o→ö": "stoßen → er <b>stößt</b>" }[change] || "";
    return L(`Verbo forte com mudança <b>${change}</b> no du/er (ex.: ${ex}).`,
             `Strong verb with a <b>${change}</b> change in du/er (e.g.: ${ex}).`);
  }

  function ppTip(v) {
    if (v.sep) return L("Verbo <b>separável</b>: o «ge-» entra no meio → " + v.pp + ".",
                        "<b>Separable</b> verb: the «ge-» goes in the middle → " + v.pp + ".");
    if (v.mixed) return L("Forma <b>mista</b>: radical mudado + terminação fraca <b>-t</b> (ex.: brennen → gebrannt).",
                          "<b>Mixed</b> form: changed stem + weak ending <b>-t</b> (e.g.: brennen → gebrannt).");
    return L("Verbo <b>forte/irregular</b>: Partizip II costuma terminar em <b>-en</b> com mudança de radical.",
             "<b>Strong/irregular</b> verb: the Partizip II usually ends in <b>-en</b> with a stem change.");
  }

  function verbByInf(inf) { return (window.VERBS || []).find(v => v.inf === inf); }

  // Frases-exemplo (Präsens) que acompanham a dica, sem revelar a forma do passado.
  function exHtml(inf, max = 2) {
    const ex = (window.VERB_EX || {})[inf];
    if (!ex || !ex.length) return "";
    return ex.slice(0, max).map(e =>
      `<span class="hint-ex">📝 <i>${e[0]}</i> <span class="muted">(${window.tr(e[1])})</span></span>`).join("");
  }
  // As MESMAS frases no passado (Perfekt/Präteritum), mostradas DEPOIS de responder.
  function exPastHtml(inf, max = 2) {
    const ex = (window.VERB_EX || {})[inf];
    if (!ex || !ex.length) return "";
    return ex.slice(0, max).filter(e => e[2]).map(e =>
      `<span class="hint-ex">⏳ <i>${e[2]}</i> <span class="muted">(${window.tr(e[1])})</span></span>`).join("");
  }

  // Nota do Ersatzinfinitiv (modais).
  function modalNote(v) {
    if (!(v.tags && v.tags.includes("modal"))) return "";
    return L(
      ` <span class="drill-note">⚠️ <b>Modal:</b> use <b>${v.pp}</b> quando o modal é o verbo principal (<i>Ich habe das ${v.pp}</i>). Com um segundo verbo, ele vira o <b>Ersatzinfinitiv</b> = infinitivo <b>${v.inf}</b>: <i>Ich habe schwimmen <b>${v.inf}</b></i>.</span>`,
      ` <span class="drill-note">⚠️ <b>Modal:</b> use <b>${v.pp}</b> when the modal is the main verb (<i>Ich habe das ${v.pp}</i>). With a second verb it becomes the <b>Ersatzinfinitiv</b> = the infinitive <b>${v.inf}</b>: <i>Ich habe schwimmen <b>${v.inf}</b></i>.</span>`);
  }

  // Dicas mostradas ANTES de responder (padrão + forma "irmã", sem revelar a resposta).
  function partizipHint(v) {
    const padrao = v.sep ? L("<b>separável</b> (prefixo + ge + radical)", "<b>separable</b> (prefix + ge + stem)")
      : v.mixed ? L("<b>misto</b> (radical muda + termina em <b>-t</b>)", "<b>mixed</b> (stem changes + ends in <b>-t</b>)")
      : L("<b>forte</b> (termina em <b>-en</b>, o radical pode mudar)", "<b>strong</b> (ends in <b>-en</b>, the stem may change)");
    return L(`É ${padrao}. Pista — Präteritum: <b>${v.praet}</b>. Auxiliar: <b>${v.aux}</b>.`,
             `It's ${padrao}. Clue — Präteritum: <b>${v.praet}</b>. Auxiliary: <b>${v.aux}</b>.`) + exHtml(v.inf, 1);
  }
  function praeteritumHint(v) {
    const padrao = v.mixed ? L("verbo <b>misto</b>", "a <b>mixed</b> verb") : L("verbo <b>forte</b>", "a <b>strong</b> verb");
    return L(`É ${padrao}. Pista — Partizip II: <b>${v.pp}</b>. A vogal do Präteritum costuma diferir do particípio.`,
             `It's ${padrao}. Clue — Partizip II: <b>${v.pp}</b>. The Präteritum vowel usually differs from the participle.`) + exHtml(v.inf, 1);
  }
  function perfektHint(b) {
    const v = verbByInf(b.inf);
    const praetPista = v ? L(` Präteritum de <b>${b.inf}</b>: <b>${v.praet}</b>.`, ` Präteritum of <b>${b.inf}</b>: <b>${v.praet}</b>.`) : "";
    return L(`Escolha o auxiliar: movimento/mudança de estado → <b>sein</b>; senão → <b>haben</b>.`,
             `Choose the auxiliary: movement/change of state → <b>sein</b>; otherwise → <b>haben</b>.`) + praetPista + exHtml(b.inf, 1);
  }
  function praesensHint(b) {
    return L(`Verbo forte: a vogal muda <b>${b.change}</b> no du e er/sie/es; a terminação continua normal (du <b>-st</b>, er <b>-t</b>).`,
             `Strong verb: the vowel changes <b>${b.change}</b> in du and er/sie/es; the ending stays normal (du <b>-st</b>, er <b>-t</b>).`) + exHtml(b.inf, 1);
  }
  const tekamoloHint = () => L(
    "Verbo conjugado em <b>2ª posição</b>; depois os complementos na ordem <b>Te–Ka–Mo–Lo</b> (Temporal → Kausal → Modal → Lokal). Pronomes vêm logo após o verbo.",
    "Conjugated verb in <b>2nd position</b>; then the complements in <b>Te–Ka–Mo–Lo</b> order (Time → Cause → Manner → Place). Pronouns come right after the verb.");

  // --- Partizip II (digite) ---
  function makePartizip() {
    const v = sample(window.VERBS, 1)[0];
    return {
      type: "partizip",
      prompt: L(`Digite o <b>Partizip II</b> de <b>${v.inf}</b> <span class="muted">(${window.mean(v)})</span>:`,
                `Type the <b>Partizip II</b> of <b>${v.inf}</b> <span class="muted">(${window.mean(v)})</span>:`),
      fields: [{ ph: "Partizip II" }],
      accept: [[v.pp]],
      solution: v.pp,
      hint: partizipHint(v),
      exPast: exPastHtml(v.inf, 1),
      tip: ppTip(v) + L(` Auxiliar: <b>${v.aux}</b>.`, ` Auxiliary: <b>${v.aux}</b>.`) + modalNote(v),
    };
  }

  // --- Präteritum (digite a forma ich/er) ---
  function makePraeteritum() {
    const v = sample(window.VERBS, 1)[0];
    return {
      type: "praeteritum",
      prompt: L(`Digite o <b>Präteritum</b> (ich/er) de <b>${v.inf}</b> <span class="muted">(${window.mean(v)})</span>:`,
                `Type the <b>Präteritum</b> (ich/er) of <b>${v.inf}</b> <span class="muted">(${window.mean(v)})</span>:`),
      fields: [{ ph: "Präteritum" }],
      accept: [[v.praet]],
      solution: v.praet,
      hint: praeteritumHint(v),
      exPast: exPastHtml(v.inf, 1),
      tip: L(`<b>${v.inf} → ${v.praet} → ${v.pp}</b>. O Präteritum (Spalte 2) forma o passado simples; decore as três colunas juntas.`,
             `<b>${v.inf} → ${v.praet} → ${v.pp}</b>. The Präteritum (column 2) forms the simple past; memorise the three columns together.`),
    };
  }

  // --- Perfekt: duas lacunas (auxiliar + Partizip II) ---
  function makePerfekt() {
    const b = sample(window.PERFEKT_BANK, 1)[0];
    const sentence = `${b.pre} <span class="blank">___</span> ${b.mid} <span class="blank">___</span>${b.post ? " " + b.post : ""}.`;
    const isSein = /^(bin|bist|ist|sind|seid|war)/.test(b.aux);
    const auxRule = isSein
      ? L("verbo de <b>movimento/mudança</b> → auxiliar <b>sein</b>", "verb of <b>movement/change</b> → auxiliary <b>sein</b>")
      : L("ação comum → auxiliar <b>haben</b>", "ordinary action → auxiliary <b>haben</b>");
    return {
      type: "perfekt",
      prompt: L(`Complete no <b>Perfekt</b> <span class="muted">(${b.inf})</span>:<br><span class="ex-sentence">${sentence}</span>`,
                `Complete in the <b>Perfekt</b> <span class="muted">(${b.inf})</span>:<br><span class="ex-sentence">${sentence}</span>`),
      fields: [{ ph: "haben/sein" }, { ph: "Partizip II" }],
      accept: [[b.aux], [b.pp]],
      solution: `${b.aux} … ${b.pp}`,
      hint: perfektHint(b),
      exPast: exPastHtml(b.inf, 1),
      tip: L(`Perfekt = <b>aux. (haben/sein) + Partizip II</b>. Aqui: ${auxRule}; Partizip II de <b>${b.inf}</b> = <b>${b.pp}</b>.`,
             `Perfekt = <b>aux. (haben/sein) + Partizip II</b>. Here: ${auxRule}; Partizip II of <b>${b.inf}</b> = <b>${b.pp}</b>.`),
    };
  }

  // --- Präsens com mudança de vogal ---
  function makePraesens() {
    const b = sample(window.PRAESENS_BANK, 1)[0];
    const subj = b.subj ? `${b.subj} (${b.pron})` : b.pron;
    return {
      type: "praesens",
      prompt: L(`Conjugue <b>${b.inf}</b> no Präsens:<br><span class="ex-sentence">${subj} ____</span>`,
                `Conjugate <b>${b.inf}</b> in the Präsens:<br><span class="ex-sentence">${subj} ____</span>`),
      fields: [{ ph: L("forma conjugada", "conjugated form") }],
      accept: [[b.form]],
      solution: b.form,
      hint: praesensHint(b),
      exPast: exPastHtml(b.inf, 1),
      tip: changeTip(b.change),
    };
  }

  // --- TeKaMoLo: reordenar blocos ---
  function makeTekamolo() {
    const b = sample(window.TEKAMOLO_BANK, 1)[0];
    let order = shuffle(b.answer);
    if (order.join("|") === b.answer.join("|") && b.answer.length > 1) order = shuffle(b.answer);
    return {
      type: "tekamolo",
      prompt: L("Coloque os blocos na ordem correta:", "Put the blocks in the correct order:"),
      blocks: order,
      answer: b.answer,
      accept: [[b.answer.join(" ")]],
      solution: b.answer.join(" "),
      hint: tekamoloHint(),
      tip: `<b>Te–Ka–Mo–Lo</b>: ${window.tr(b.note)}`,
    };
  }

  const GEN = { partizip: makePartizip, praeteritum: makePraeteritum, perfekt: makePerfekt, praesens: makePraesens, tekamolo: makeTekamolo };

  // metadados para a UI (rótulos localizados na hora do uso)
  const types = [
    { key: "partizip", icon: "🧩", label: { pt: "Partizip II", en: "Partizip II" }, desc: { pt: "Digite o particípio dos verbos.", en: "Type the past participle of verbs." } },
    { key: "praeteritum", icon: "⏳", label: { pt: "Präteritum", en: "Präteritum" }, desc: { pt: "Digite o passado simples (ich/er).", en: "Type the simple past (ich/er)." } },
    { key: "perfekt", icon: "⏱️", label: { pt: "Perfekt", en: "Perfekt" }, desc: { pt: "Monte a frase: haben/sein + Partizip II.", en: "Build the sentence: haben/sein + Partizip II." } },
    { key: "praesens", icon: "🔁", label: { pt: "Präsens forte", en: "Strong Präsens" }, desc: { pt: "Mudança de vogal no du/er.", en: "Vowel change in du/er." } },
    { key: "tekamolo", icon: "📐", label: { pt: "TeKaMoLo", en: "TeKaMoLo" }, desc: { pt: "Reordene a frase (Te-Ka-Mo-Lo).", en: "Reorder the sentence (Te-Ka-Mo-Lo)." } },
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
