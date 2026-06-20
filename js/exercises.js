// exercises.js — Gera exercícios automaticamente a partir do conteúdo das Lektionen.
// Tipos: artigo (der/die/das, com dica de gênero), tradução (de→pt e pt→de),
//        conjugação, du-vs-Sie, Akk/Dativ.
// Cada questão pode trazer:
//   - hint:    pista curta, mostrada sob demanda ANTES de responder (não revela a resposta).
//   - explain: explicação/regra, mostrada DEPOIS de responder (HTML confiável, como `question`).

const Exercises = (() => {
  const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  const baseArt = (art) => (art || "").replace(/[()]/g, "").split("/")[0].trim();
  const nounOnly = (de) => de.replace(/^(der|die|das)\s+/i, "").replace(/\s*\/.*/, "").trim();
  const GENERO = { der: "masculino (der)", die: "feminino (die)", das: "neutro (das)" };

  // Coleta o vocabulário (de uma lição específica ou de todas)
  function vocabPool(lessonId) {
    const { LESSONS } = window.DATA;
    const lessons = lessonId ? LESSONS.filter(l => l.id === lessonId) : LESSONS;
    const out = [];
    lessons.forEach(l => (l.vocab || []).forEach(v => out.push({ ...v, lektion: l.id })));
    return out;
  }

  // Dica de gênero por terminação (heurística A1, útil para brasileiros)
  const GENDER_RULES = [
    { re: /(ung|heit|keit|schaft|tion|sion|ei|ik|ur)$/i, art: "die", tip: "die" },
    { re: /(chen|lein|um|ment|ma)$/i, art: "das", tip: "das" },
    { re: /(ling|ismus|or|ig)$/i, art: "der", tip: "der" },
    { re: /e$/i, art: "die", tip: "die" }, // muitos (não todos) substantivos em -e são femininos
  ];
  function genderHint(noun) {
    for (const r of GENDER_RULES) {
      if (r.re.test(noun)) {
        const end = noun.match(r.re)[0].toLowerCase();
        return { art: r.art, tip: `Palavras terminadas em <b>-${end}</b> costumam ser <b>${r.tip}</b>.` };
      }
    }
    return null;
  }

  // --- Tipo 1: artigo definido (der/die/das) com dica de gênero ---
  function makeArticle(pool) {
    const candidates = pool.filter(v => ["der", "die", "das"].includes(baseArt(v.art)));
    if (candidates.length < 1) return null;
    const item = sample(candidates, 1)[0];
    const noun = nounOnly(item.de);
    const art = baseArt(item.art);
    const gh = genderHint(noun);
    const hint = gh
      ? gh.tip
      : "Em alemão o gênero é, em geral, arbitrário — tente lembrar o artigo que você memorizou junto da palavra.";
    const explain = gh && gh.art === art
      ? `<b>${art} ${noun}</b> — ${item.pt}. ${gh.tip}`
      : `<b>${art} ${noun}</b> — ${item.pt}. É ${GENERO[art]}. O gênero costuma ser arbitrário: memorize sempre o artigo junto do substantivo.`;
    return {
      kind: "article",
      question: `Qual é o artigo de <b>${noun}</b>?`,
      sub: item.pt,
      options: ["der", "die", "das"],
      answer: art,
      hint,
      explain,
    };
  }

  // --- Tipo 2: tradução de→pt (múltipla escolha) ---
  function makeTransDePt(pool) {
    if (pool.length < 4) return null;
    const [item, ...rest] = sample(pool, 4);
    const options = shuffle([item.pt, ...rest.map(r => r.pt)]);
    return {
      kind: "trans",
      question: `O que significa <b>${item.de}</b>?`,
      options,
      answer: item.pt,
      hint: item.cat ? `Categoria: <b>${item.cat}</b>.` : "Pense no contexto em que você viu essa palavra.",
      explain: pairExplain(item),
    };
  }

  // --- Tipo 3: tradução pt→de (múltipla escolha) ---
  function makeTransPtDe(pool) {
    if (pool.length < 4) return null;
    const [item, ...rest] = sample(pool, 4);
    const options = shuffle([item.de, ...rest.map(r => r.de)]);
    return {
      kind: "trans",
      question: `Como se diz <b>${item.pt}</b> em alemão?`,
      options,
      answer: item.de,
      hint: item.cat ? `Categoria: <b>${item.cat}</b>.` : "Pense no contexto em que você viu essa palavra.",
      explain: pairExplain(item),
    };
  }

  function pairExplain(item) {
    let s = `<b>${item.de}</b> = ${item.pt}`;
    if (item.plural && !/^[—(]/.test(item.plural)) s += ` · plural: ${item.plural}`;
    return s + ".";
  }

  // --- Tipo 4: conjugação (a partir das tabelas de gramática) ---
  const PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
  function conjPool(lessonId) {
    const { LESSONS } = window.DATA;
    const lessons = lessonId ? LESSONS.filter(l => l.id === lessonId) : LESSONS;
    const out = [];
    lessons.forEach(l => (l.grammar || []).forEach(g => (g.tables || []).forEach(t => {
      if (t.forms && t.forms.length === 6) out.push(t);
    })));
    return out;
  }
  function makeConjugation(tables) {
    if (!tables.length) return null;
    const t = sample(tables, 1)[0];
    const idx = Math.floor(Math.random() * 6);
    const full = t.forms[idx];                       // ex.: "du fährst"
    const correct = full.replace(/^[^ ]+\s+/, "");   // remove o pronome → "fährst"
    const distract = new Set();
    sample(t.forms.filter((_, i) => i !== idx), 3).forEach(f => distract.add(f.replace(/^[^ ]+\s+/, "")));
    // completa com formas de outras tabelas se faltar
    while (distract.size < 3 && tables.length > 1) {
      const t2 = sample(tables, 1)[0];
      const f2 = sample(t2.forms, 1)[0].replace(/^[^ ]+\s+/, "");
      if (f2 !== correct) distract.add(f2);
    }
    const options = shuffle([correct, ...distract]);
    const changeNote = /muda|→|mudança|a→ä|e→i|ö→a/i.test(t.note || "")
      ? "Atenção: este verbo muda a vogal no singular."
      : `Lembre da conjugação de <b>${t.verb}</b>.`;
    const table = t.forms.map(f => f === full ? `<b>${f}</b>` : f).join(" · ");
    return {
      kind: "conj",
      question: `Conjugue <b>${t.verb}</b> (${t.meaning}):<br><span class="ex-blank">${PRONOUNS[idx]} ____</span>`,
      options: options.length >= 2 ? options : [correct, "—"],
      answer: correct,
      hint: changeNote,
      explain: `<b>${full}</b>.<br>${table}${t.note ? `<br><span class="muted">${t.note}</span>` : ""}`,
    };
  }

  // --- Tipo 5: du vs Sie (banco curado, ~10 itens) ---
  const DU_SIE = [
    { q: "Você fala com o seu médico. Como pergunta o nome?", a: "Wie heißen Sie?", o: ["Wie heißt du?", "Wie heißen Sie?"], e: "Com um médico (situação formal) use <b>Sie</b>: <b>Wie heißen Sie?</b>" },
    { q: "Você fala com uma criança. Como pergunta de onde ela é?", a: "Woher kommst du?", o: ["Woher kommst du?", "Woher kommen Sie?"], e: "Com crianças use sempre <b>du</b>: <b>Woher kommst du?</b>" },
    { q: "Entrevista de emprego formal. Como pergunta a idade?", a: "Wie alt sind Sie?", o: ["Wie alt bist du?", "Wie alt sind Sie?"], e: "Em contexto profissional, <b>Sie</b>: <b>Wie alt sind Sie?</b>" },
    { q: "Com um amigo do curso. Como pergunta como ele está?", a: "Wie geht es dir?", o: ["Wie geht es dir?", "Wie geht es Ihnen?"], e: "Entre amigos use <b>du</b> → forma dativa <b>dir</b>: <b>Wie geht es dir?</b>" },
    { q: "Dando direções a um turista mais velho (formal):", a: "Gehen Sie geradeaus.", o: ["Geh geradeaus.", "Gehen Sie geradeaus."], e: "Imperativo formal usa <b>Sie</b>: <b>Gehen Sie geradeaus.</b>" },
    { q: "Você cumprimenta a sua vizinha idosa de manhã:", a: "Guten Morgen! Wie geht es Ihnen?", o: ["Guten Morgen! Wie geht es Ihnen?", "Morgen! Wie geht's dir?"], e: "Com pessoas mais velhas/desconhecidas, <b>Sie</b> → dativo <b>Ihnen</b>." },
    { q: "Seu chefe pergunta se você pode trabalhar amanhã. Forma educada:", a: "Können Sie morgen arbeiten?", o: ["Kannst du morgen arbeiten?", "Können Sie morgen arbeiten?"], e: "No trabalho, com o chefe, use <b>Sie</b>: <b>Können Sie…?</b>" },
    { q: "Você conhece um colega jovem na festa e quer o nome dele:", a: "Wie heißt du?", o: ["Wie heißt du?", "Wie heißen Sie?"], e: "Entre jovens, em contexto informal, <b>du</b>: <b>Wie heißt du?</b>" },
    { q: "No balcão, o atendente (formal) pergunta o que você deseja:", a: "Was möchten Sie?", o: ["Was möchtest du?", "Was möchten Sie?"], e: "Atendimento ao público costuma ser <b>Sie</b>: <b>Was möchten Sie?</b>" },
    { q: "Você oferece o tratamento informal a um novo colega da mesma idade:", a: "Wir können du sagen.", o: ["Wir können du sagen.", "Wir können Sie sagen."], e: "A frase fixa para oferecer informalidade é <b>Wir können du sagen.</b>" },
  ];
  function makeDuSie() {
    const item = sample(DU_SIE, 1)[0];
    return {
      kind: "dusie", question: item.q, options: shuffle(item.o), answer: item.a,
      hint: "Formal / desconhecido / mais velho → <b>Sie</b>. Amigo / criança / jovem → <b>du</b>.",
      explain: item.e,
    };
  }

  // --- Tipo 6: Akkusativ vs Dativ (banco curado, ~10 itens) ---
  const KASUS = [
    { q: "___ Supermarkt (estou DENTRO, localização — Wo?)", a: "im", o: ["im", "in den"], e: "<b>Wo?</b> (localização) pede Dativ: <b>im</b> Supermarkt (in + dem)." },
    { q: "Ich fahre ___ Bus.", a: "mit dem", o: ["mit dem", "mit der", "mit den"], e: "<b>mit</b> sempre pede Dativ; Bus é masculino → <b>mit dem</b> Bus." },
    { q: "Ich gehe ___ Arzt.", a: "zum", o: ["zum", "zur", "zu die"], e: "<b>zu</b> pede Dativ; Arzt é masculino → zu + dem = <b>zum</b>." },
    { q: "Ich gehe ___ Apotheke.", a: "zur", o: ["zum", "zur", "zu der"], e: "<b>zu</b> + feminino (die Apotheke) → zu + der = <b>zur</b>." },
    { q: "Ich brauche ___ Pullover (Akkusativ, masc.).", a: "den", o: ["der", "den", "dem"], e: "Objeto direto (Akkusativ) no masculino: der → <b>den</b> Pullover." },
    { q: "Die Bushaltestelle ist ___ Bahnhof. (localização)", a: "am", o: ["am", "an den", "an die"], e: "<b>Wo?</b> com <b>an</b> → Dativ: an + dem = <b>am</b> Bahnhof." },
    { q: "Wir nehmen ___ U-Bahn. (Akkusativ, fem.)", a: "die", o: ["die", "der", "den"], e: "Objeto direto feminino fica igual ao nominativo: <b>die</b> U-Bahn." },
    { q: "Der Termin ist ___ Ärztin. (estar na consulta — bei)", a: "bei der", o: ["bei der", "bei dem", "bei die"], e: "<b>bei</b> pede Dativ; Ärztin é feminino → <b>bei der</b> Ärztin." },
    { q: "Ich wohne ___ Stadt. (localização, fem.)", a: "in der", o: ["in der", "in die", "im"], e: "<b>Wo?</b> + feminino → Dativ: <b>in der</b> Stadt." },
    { q: "Nimm ___ Apfel! (Akkusativ, masc.)", a: "den", o: ["der", "den", "dem"], e: "Objeto direto masculino: der Apfel → <b>den</b> Apfel." },
  ];
  function makeKasus() {
    const item = sample(KASUS, 1)[0];
    return {
      kind: "kasus", question: item.q, options: shuffle(item.o), answer: item.a,
      hint: "<b>Wo?</b> (onde está) → Dativ. <b>Wohin?</b> (para onde) → Akkusativ. <b>mit/zu/bei/aus</b> sempre Dativ.",
      explain: item.e,
    };
  }

  // Gera um conjunto de N questões variadas para uma lição (ou geral)
  function generate(lessonId, n = 8) {
    const pool = vocabPool(lessonId);
    const tables = conjPool(lessonId);
    const generators = [
      () => makeArticle(pool),
      () => makeTransDePt(pool),
      () => makeTransPtDe(pool),
      () => makeConjugation(tables),
    ];
    // exercícios especiais sempre disponíveis no modo geral ou nas lições relevantes
    if (!lessonId || lessonId === 1 || lessonId === 3) generators.push(makeDuSie);
    if (!lessonId || lessonId === 7) generators.push(makeKasus);

    const out = [];
    let guard = 0;
    while (out.length < n && guard < n * 12) {
      guard++;
      const gen = sample(generators, 1)[0];
      const q = gen();
      if (q && q.options && q.options.length >= 2) out.push(q);
    }
    return out;
  }

  // Flashcards simples de vocabulário (frente DE / verso PT)
  function flashcards(lessonId) {
    return shuffle(vocabPool(lessonId)).map(v => ({
      front: v.de, back: v.pt, hint: v.art, cat: v.cat,
    }));
  }

  return { generate, flashcards, vocabPool };
})();

window.Exercises = Exercises;
