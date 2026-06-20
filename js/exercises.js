// exercises.js — Gera exercícios automaticamente a partir do conteúdo das Lektionen.
// Tipos: artigo (der/die/das), tradução (de→pt e pt→de), conjugação, du-vs-Sie, Akk/Dativ.

const Exercises = (() => {
  const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  const baseArt = (art) => (art || "").replace(/[()]/g, "").split("/")[0].trim();

  // Coleta o vocabulário (de uma lição específica ou de todas)
  function vocabPool(lessonId) {
    const { LESSONS } = window.DATA;
    const lessons = lessonId ? LESSONS.filter(l => l.id === lessonId) : LESSONS;
    const out = [];
    lessons.forEach(l => (l.vocab || []).forEach(v => out.push({ ...v, lektion: l.id })));
    return out;
  }

  // --- Tipo 1: artigo definido ---
  function makeArticle(pool) {
    const candidates = pool.filter(v => ["der", "die", "das"].includes(baseArt(v.art)));
    if (candidates.length < 1) return null;
    const item = sample(candidates, 1)[0];
    const noun = item.de.replace(/^(der|die|das)\s+/i, "");
    return {
      kind: "article",
      question: `Qual é o artigo de <b>${noun}</b>?`,
      sub: item.pt,
      options: ["der", "die", "das"],
      answer: baseArt(item.art),
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
    };
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
    return {
      kind: "conj",
      question: `Conjugue <b>${t.verb}</b> (${t.meaning}):<br><span class="ex-blank">${PRONOUNS[idx]} ____</span>`,
      options: options.length >= 2 ? options : [correct, "—"],
      answer: correct,
    };
  }

  // --- Tipo 5: du vs Sie (banco fixo curado) ---
  const DU_SIE = [
    { q: "Você fala com o seu médico. Como pergunta o nome?", a: "Wie heißen Sie?", o: ["Wie heißt du?", "Wie heißen Sie?"] },
    { q: "Você fala com uma criança. Como pergunta de onde ela é?", a: "Woher kommst du?", o: ["Woher kommst du?", "Woher kommen Sie?"] },
    { q: "Entrevista de emprego formal. Como pergunta a idade?", a: "Wie alt sind Sie?", o: ["Wie alt bist du?", "Wie alt sind Sie?"] },
    { q: "Com um amigo do curso. Como pergunta como ele está?", a: "Wie geht es dir?", o: ["Wie geht es dir?", "Wie geht es Ihnen?"] },
    { q: "Dando direções a um turista mais velho (formal):", a: "Gehen Sie geradeaus.", o: ["Geh geradeaus.", "Gehen Sie geradeaus."] },
  ];
  function makeDuSie() {
    const item = sample(DU_SIE, 1)[0];
    return { kind: "dusie", question: item.q, options: shuffle(item.o), answer: item.a };
  }

  // --- Tipo 6: Akkusativ vs Dativ (banco fixo curado, Lektion 7) ---
  const KASUS = [
    { q: "___ Supermarkt (estou DENTRO, localização — Wo?)", a: "im", o: ["im", "in den"] },
    { q: "Ich fahre ___ Bus.", a: "mit dem", o: ["mit dem", "mit der", "mit den"] },
    { q: "Ich gehe ___ Arzt.", a: "zum", o: ["zum", "zur", "zu die"] },
    { q: "Die Apotheke: ich gehe ___ Apotheke.", a: "zur", o: ["zum", "zur", "zu der"] },
    { q: "Ich brauche ___ Pullover (Akkusativ, masc.).", a: "den", o: ["der", "den", "dem"] },
  ];
  function makeKasus() {
    const item = sample(KASUS, 1)[0];
    return { kind: "kasus", question: item.q, options: shuffle(item.o), answer: item.a };
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
