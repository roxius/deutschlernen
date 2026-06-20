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

  // Dica de gênero (heurística A1, validada contra todo o vocabulário do app:
  // 67/121 palavras cobertas com 100% de acerto). Ordem: exceções → categoria de
  // pessoa → sufixo morfológico → categoria semântica → dica construtiva.
  // Retorna { art, rule }: art = artigo previsto (ou null se sem regra confiável);
  // rule = frase em PT (HTML leve) usada na dica e na explicação.
  const GEN_EXC = {
    "Käse":  { art: "der", rule: "<b>der Käse</b> é uma exceção — decore o <b>der</b>." },
    "Ei":    { art: "das", rule: "<b>das Ei</b> é exceção ao padrão -ei → die." },
    "Flur":  { art: "der", rule: "<b>der Flur</b> é uma exceção — decore o <b>der</b>." },
    "Wochenende": { art: "das", rule: "Palavras em <b>-ende</b> são neutras: das Ende, <b>das Wochenende</b>." },
    "Schnee": { art: "der", rule: "Fenômenos do clima são masculinos: <b>der</b> Schnee, der Regen, der Wind." },
    "Iran":  { art: "der", rule: "Quase todo país é <b>das</b>, mas <b>der Iran</b> e der Irak são masculinos." },
    "Irak":  { art: "der", rule: "Quase todo país é <b>das</b>, mas der Iran e <b>der Irak</b> são masculinos." },
  };
  // Sufixos morfológicos (min = comprimento mínimo da palavra p/ evitar palavras curtas)
  const GEN_SUF = [
    { re: /zimmer$/i, art: "das", min: 7, rule: () => "Compostos com <b>-zimmer</b> são neutros → <b>das</b> (das Wohnzimmer)." },
    { re: /(ung|heit|keit|schaft|tion|sion|tät|ik)$/i, art: "die", min: 4, rule: (e) => `Palavras em <b>-${e}</b> são femininas → <b>die</b>.` },
    { re: /ei$/i, art: "die", min: 4, rule: () => "Palavras em <b>-ei</b> costumam ser femininas → <b>die</b> (die Bäckerei)." },
    { re: /ur$/i, art: "die", min: 4, rule: () => "Palavras em <b>-ur</b> costumam ser femininas → <b>die</b> (die Natur)." },
    { re: /(chen|lein)$/i, art: "das", min: 5, rule: (e) => `Diminutivos em <b>-${e}</b> são sempre neutros → <b>das</b> (das Mädchen).` },
    { re: /(ment|tum|nis|um|ma)$/i, art: "das", min: 4, rule: (e) => `Palavras em <b>-${e}</b> costumam ser neutras → <b>das</b>.` },
    { re: /(ling|ismus)$/i, art: "der", min: 5, rule: (e) => `Palavras em <b>-${e}</b> são masculinas → <b>der</b>.` },
    { re: /e$/i, art: "die", min: 3, rule: () => "Muitos substantivos terminados em <b>-e</b> são femininos → <b>die</b>." },
  ];
  function genderHint(noun, cat) {
    cat = cat || "";
    // 1) exceções a decorar
    if (GEN_EXC[noun]) return GEN_EXC[noun];
    // 2) profissões/médicos no masculino → der
    if (/Profiss|Médicos/.test(cat))
      return { art: "der", rule: "Profissão no masculino é <b>der</b> (no feminino vira -in → die)." };
    // 3) sufixo morfológico
    for (const r of GEN_SUF) {
      if (noun.length >= r.min && r.re.test(noun)) {
        const end = noun.match(r.re)[0].toLowerCase();
        return { art: r.art, rule: r.rule(end) };
      }
    }
    // 4) categorias semânticas
    if (/Dias da semana|Estações|Tempo/.test(cat))
      return { art: "der", rule: "Dias da semana, estações e o clima são masculinos → <b>der</b>." };
    if (/Línguas/.test(cat))
      return { art: "das", rule: "Nomes de idiomas são neutros → <b>das</b> (das Deutsch)." };
    if (/Países/.test(cat))
      return { art: "das", rule: "A maioria dos nomes de países é neutra → <b>das</b>." };
    // 5) sem regra confiável → dica construtiva (em vez do antigo "é arbitrário")
    if (/Família/.test(cat))
      return { art: null, rule: "Na família o gênero segue o sexo natural: <b>der</b> Vater, <b>die</b> Mutter." };
    return { art: null, rule: "Aqui não há regra de terminação — memorize o artigo <b>junto</b> da palavra (cante \"die Tür\", não só \"Tür\")." };
  }

  // --- Tipo 1: artigo definido (der/die/das) com dica de gênero ---
  function makeArticle(pool) {
    const candidates = pool.filter(v => ["der", "die", "das"].includes(baseArt(v.art)));
    if (candidates.length < 1) return null;
    const item = sample(candidates, 1)[0];
    const noun = nounOnly(item.de);
    const art = baseArt(item.art);
    const gh = genderHint(noun, item.cat);
    const hint = gh.rule;
    // guard defensivo: se a previsão divergir do artigo real, sinaliza exceção
    const mismatch = gh.art && gh.art !== art ? " Atenção: esta palavra é uma exceção ao padrão — decore-a." : "";
    const explain = `<b>${art} ${noun}</b> — ${item.pt}. ${gh.rule}${mismatch}`;
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

  // Tópicos focados para a tela de Treino (e quiz misto)
  const TOPICS = [
    { key: "mixed",   icon: "🎲", label: "Quiz misto",   desc: "Tudo misturado" },
    { key: "article", icon: "🔤", label: "Artigos",      desc: "der · die · das" },
    { key: "trans",   icon: "🔄", label: "Tradução",     desc: "Alemão ⇄ português" },
    { key: "conj",    icon: "🔧", label: "Conjugação",   desc: "Verbos no presente" },
    { key: "dusie",   icon: "🤝", label: "du vs. Sie",   desc: "Formal ou informal" },
    { key: "kasus",   icon: "📦", label: "Akk. / Dativ", desc: "Casos e preposições" },
  ];
  // Quais geradores cada tópico usa
  const TOPIC_GENS = {
    mixed:   ["article", "transDePt", "transPtDe", "conj", "dusie", "kasus"],
    article: ["article"],
    trans:   ["transDePt", "transPtDe"],
    conj:    ["conj"],
    dusie:   ["dusie"],
    kasus:   ["kasus"],
  };

  // Gera um conjunto de N questões variadas para uma lição (ou geral).
  // topic (opcional): chave de TOPIC_GENS para focar num tipo de exercício.
  function generate(lessonId, n = 8, topic = null) {
    const pool = vocabPool(lessonId);
    const tables = conjPool(lessonId);
    const byKey = {
      article: () => makeArticle(pool),
      transDePt: () => makeTransDePt(pool),
      transPtDe: () => makeTransPtDe(pool),
      conj: () => makeConjugation(tables),
      dusie: makeDuSie,
      kasus: makeKasus,
    };

    let keys;
    if (topic && TOPIC_GENS[topic]) {
      keys = TOPIC_GENS[topic];
    } else {
      // Modo padrão (aba Exercícios da lição): misto, com especiais nas lições relevantes
      keys = ["article", "transDePt", "transPtDe", "conj"];
      if (!lessonId || lessonId === 1 || lessonId === 3) keys.push("dusie");
      if (!lessonId || lessonId === 7) keys.push("kasus");
    }
    const generators = keys.map(k => byKey[k]);

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

  return { generate, flashcards, vocabPool, TOPICS };
})();

window.Exercises = Exercises;
