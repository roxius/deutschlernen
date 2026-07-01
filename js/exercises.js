// exercises.js — Gera exercícios automaticamente a partir do conteúdo das Lektionen.
// Bilíngue: significados via mean(); explicações via L(pt,en); alemão permanece.
//   - hint:    pista curta, mostrada ANTES de responder.
//   - explain: explicação/regra, mostrada DEPOIS de responder.

const Exercises = (() => {
  const L = (pt, en) => (window.Lang.get() === "en" ? en : pt);
  const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  const baseArt = (art) => (art || "").replace(/[()]/g, "").split("/")[0].trim();
  const nounOnly = (de) => de.replace(/^(der|die|das)\s+/i, "").replace(/\s*\/.*/, "").trim();
  const GENERO = () => ({
    der: L("masculino (der)", "masculine (der)"),
    die: L("feminino (die)", "feminine (die)"),
    das: L("neutro (das)", "neuter (das)"),
  });

  function vocabPool(lessonId) {
    const { LESSONS } = window.DATA;
    const lessons = lessonId ? LESSONS.filter(l => l.id === lessonId) : LESSONS;
    const out = [];
    lessons.forEach(l => (l.vocab || []).forEach(v => out.push({ ...v, lektion: l.id })));
    return out;
  }

  // Dica de gênero (heurística A1). Retorna { art, rule } com rule bilíngue via L().
  const GEN_EXC = {
    "Käse":  { art: "der", rule: () => L("<b>der Käse</b> é uma exceção — decore o <b>der</b>.", "<b>der Käse</b> is an exception — just memorise the <b>der</b>.") },
    "Ei":    { art: "das", rule: () => L("<b>das Ei</b> é exceção ao padrão -ei → die.", "<b>das Ei</b> is an exception to the -ei → die pattern.") },
    "Flur":  { art: "der", rule: () => L("<b>der Flur</b> é uma exceção — decore o <b>der</b>.", "<b>der Flur</b> is an exception — just memorise the <b>der</b>.") },
    "Wochenende": { art: "das", rule: () => L("Palavras em <b>-ende</b> são neutras: das Ende, <b>das Wochenende</b>.", "Words ending in <b>-ende</b> are neuter: das Ende, <b>das Wochenende</b>.") },
    "Schnee": { art: "der", rule: () => L("Fenômenos do clima são masculinos: <b>der</b> Schnee, der Regen, der Wind.", "Weather phenomena are masculine: <b>der</b> Schnee, der Regen, der Wind.") },
    "Iran":  { art: "der", rule: () => L("Quase todo país é <b>das</b>, mas <b>der Iran</b> e der Irak são masculinos.", "Almost every country is <b>das</b>, but <b>der Iran</b> and der Irak are masculine.") },
    "Irak":  { art: "der", rule: () => L("Quase todo país é <b>das</b>, mas der Iran e <b>der Irak</b> são masculinos.", "Almost every country is <b>das</b>, but der Iran and <b>der Irak</b> are masculine.") },
  };
  const GEN_SUF = [
    { re: /zimmer$/i, art: "das", min: 7, rule: () => L("Compostos com <b>-zimmer</b> são neutros → <b>das</b> (das Wohnzimmer).", "Compounds with <b>-zimmer</b> are neuter → <b>das</b> (das Wohnzimmer).") },
    { re: /(ung|heit|keit|schaft|tion|sion|tät|ik)$/i, art: "die", min: 4, rule: (e) => L(`Palavras em <b>-${e}</b> são femininas → <b>die</b>.`, `Words ending in <b>-${e}</b> are feminine → <b>die</b>.`) },
    { re: /ei$/i, art: "die", min: 4, rule: () => L("Palavras em <b>-ei</b> costumam ser femininas → <b>die</b> (die Bäckerei).", "Words ending in <b>-ei</b> are usually feminine → <b>die</b> (die Bäckerei).") },
    { re: /ur$/i, art: "die", min: 4, rule: () => L("Palavras em <b>-ur</b> costumam ser femininas → <b>die</b> (die Natur).", "Words ending in <b>-ur</b> are usually feminine → <b>die</b> (die Natur).") },
    { re: /(chen|lein)$/i, art: "das", min: 5, rule: (e) => L(`Diminutivos em <b>-${e}</b> são sempre neutros → <b>das</b> (das Mädchen).`, `Diminutives in <b>-${e}</b> are always neuter → <b>das</b> (das Mädchen).`) },
    { re: /(ment|tum|nis|um|ma)$/i, art: "das", min: 4, rule: (e) => L(`Palavras em <b>-${e}</b> costumam ser neutras → <b>das</b>.`, `Words ending in <b>-${e}</b> are usually neuter → <b>das</b>.`) },
    { re: /(ling|ismus)$/i, art: "der", min: 5, rule: (e) => L(`Palavras em <b>-${e}</b> são masculinas → <b>der</b>.`, `Words ending in <b>-${e}</b> are masculine → <b>der</b>.`) },
    { re: /e$/i, art: "die", min: 3, rule: () => L("Muitos substantivos terminados em <b>-e</b> são femininos → <b>die</b>.", "Many nouns ending in <b>-e</b> are feminine → <b>die</b>.") },
  ];
  function genderHint(noun, cat) {
    cat = cat || "";
    if (GEN_EXC[noun]) return { art: GEN_EXC[noun].art, rule: GEN_EXC[noun].rule() };
    if (/Profiss|Médicos/.test(cat))
      return { art: "der", rule: L("Profissão no masculino é <b>der</b> (no feminino vira -in → die).", "A profession in the masculine is <b>der</b> (feminine adds -in → die).") };
    for (const r of GEN_SUF) {
      if (noun.length >= r.min && r.re.test(noun)) {
        const end = noun.match(r.re)[0].toLowerCase();
        return { art: r.art, rule: r.rule(end) };
      }
    }
    if (/Dias da semana|Estações|Tempo/.test(cat))
      return { art: "der", rule: L("Dias da semana, estações e o clima são masculinos → <b>der</b>.", "Days of the week, seasons and weather are masculine → <b>der</b>.") };
    if (/Línguas/.test(cat))
      return { art: "das", rule: L("Nomes de idiomas são neutros → <b>das</b> (das Deutsch).", "Language names are neuter → <b>das</b> (das Deutsch).") };
    if (/Países/.test(cat))
      return { art: "das", rule: L("A maioria dos nomes de países é neutra → <b>das</b>.", "Most country names are neuter → <b>das</b>.") };
    if (/Família/.test(cat))
      return { art: null, rule: L("Na família o gênero segue o sexo natural: <b>der</b> Vater, <b>die</b> Mutter.", "In the family, gender follows natural sex: <b>der</b> Vater, <b>die</b> Mutter.") };
    return { art: null, rule: L("Aqui não há regra de terminação — memorize o artigo <b>junto</b> da palavra (cante \"die Tür\", não só \"Tür\").", "There's no ending rule here — memorise the article <b>together</b> with the word (say \"die Tür\", not just \"Tür\").") };
  }

  // --- Tipo 1: artigo (der/die/das) ---
  function makeArticle(pool) {
    const candidates = pool.filter(v => ["der", "die", "das"].includes(baseArt(v.art)));
    if (candidates.length < 1) return null;
    const item = sample(candidates, 1)[0];
    const noun = nounOnly(item.de);
    const art = baseArt(item.art);
    const gh = genderHint(noun, item.cat);
    const mismatch = gh.art && gh.art !== art
      ? L(" Atenção: esta palavra é uma exceção ao padrão — decore-a.", " Note: this word is an exception to the pattern — memorise it.") : "";
    const explain = `<b>${art} ${noun}</b> — ${window.mean(item)}. ${gh.rule}${mismatch}`;
    return {
      kind: "article",
      question: L(`Qual é o artigo de <b>${noun}</b>?`, `What is the article of <b>${noun}</b>?`),
      sub: window.mean(item),
      options: ["der", "die", "das"],
      answer: art,
      hint: gh.rule,
      explain,
    };
  }

  const catLabel = (cat) => window.t(cat);

  // --- Tipo 2: tradução de→(idioma) ---
  function makeTransDePt(pool) {
    if (pool.length < 4) return null;
    const [item, ...rest] = sample(pool, 4);
    const options = shuffle([window.mean(item), ...rest.map(r => window.mean(r))]);
    return {
      kind: "trans",
      question: L(`O que significa <b>${item.de}</b>?`, `What does <b>${item.de}</b> mean?`),
      options,
      answer: window.mean(item),
      hint: item.cat ? L(`Categoria: <b>${catLabel(item.cat)}</b>.`, `Category: <b>${catLabel(item.cat)}</b>.`) : L("Pense no contexto em que você viu essa palavra.", "Think of the context where you saw this word."),
      explain: pairExplain(item),
    };
  }

  // --- Tipo 3: tradução (idioma)→de ---
  function makeTransPtDe(pool) {
    if (pool.length < 4) return null;
    const [item, ...rest] = sample(pool, 4);
    const options = shuffle([item.de, ...rest.map(r => r.de)]);
    return {
      kind: "trans",
      question: L(`Como se diz <b>${window.mean(item)}</b> em alemão?`, `How do you say <b>${window.mean(item)}</b> in German?`),
      options,
      answer: item.de,
      hint: item.cat ? L(`Categoria: <b>${catLabel(item.cat)}</b>.`, `Category: <b>${catLabel(item.cat)}</b>.`) : L("Pense no contexto em que você viu essa palavra.", "Think of the context where you saw this word."),
      explain: pairExplain(item),
    };
  }

  function pairExplain(item) {
    let s = `<b>${item.de}</b> = ${window.mean(item)}`;
    if (item.plural && !/^[—(]/.test(item.plural)) s += ` · plural: ${item.plural}`;
    return s + ".";
  }

  // --- Tipo 4: conjugação ---
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
    const full = t.forms[idx];
    const correct = full.replace(/^[^ ]+\s+/, "");
    const distract = new Set();
    sample(t.forms.filter((_, i) => i !== idx), 3).forEach(f => distract.add(f.replace(/^[^ ]+\s+/, "")));
    while (distract.size < 3 && tables.length > 1) {
      const t2 = sample(tables, 1)[0];
      const f2 = sample(t2.forms, 1)[0].replace(/^[^ ]+\s+/, "");
      if (f2 !== correct) distract.add(f2);
    }
    const options = shuffle([correct, ...distract]);
    const noteStr = window.tr(t.note) || "";
    const changeNote = /muda|→|mudança|a→ä|e→i|ö→a|change/i.test(noteStr)
      ? L("Atenção: este verbo muda a vogal no singular.", "Careful: this verb changes its vowel in the singular.")
      : L(`Lembre da conjugação de <b>${t.verb}</b>.`, `Recall the conjugation of <b>${t.verb}</b>.`);
    const table = t.forms.map(f => f === full ? `<b>${f}</b>` : f).join(" · ");
    return {
      kind: "conj",
      question: L(`Conjugue <b>${t.verb}</b> (${window.tr(t.meaning)}):`, `Conjugate <b>${t.verb}</b> (${window.tr(t.meaning)}):`) + `<br><span class="ex-blank">${PRONOUNS[idx]} ____</span>`,
      options: options.length >= 2 ? options : [correct, "—"],
      answer: correct,
      hint: changeNote,
      explain: `<b>${full}</b>.<br>${table}${noteStr ? `<br><span class="muted">${noteStr}</span>` : ""}`,
    };
  }

  // --- Tipo 5: du vs Sie (banco curado bilíngue) ---
  const DU_SIE = [
    { q: { pt: "Você fala com o seu médico. Como pergunta o nome?", en: "You're speaking to your doctor. How do you ask their name?" }, a: "Wie heißen Sie?", o: ["Wie heißt du?", "Wie heißen Sie?"], e: { pt: "Com um médico (situação formal) use <b>Sie</b>: <b>Wie heißen Sie?</b>", en: "With a doctor (formal) use <b>Sie</b>: <b>Wie heißen Sie?</b>" } },
    { q: { pt: "Você fala com uma criança. Como pergunta de onde ela é?", en: "You're speaking to a child. How do you ask where they're from?" }, a: "Woher kommst du?", o: ["Woher kommst du?", "Woher kommen Sie?"], e: { pt: "Com crianças use sempre <b>du</b>: <b>Woher kommst du?</b>", en: "With children always use <b>du</b>: <b>Woher kommst du?</b>" } },
    { q: { pt: "Entrevista de emprego formal. Como pergunta a idade?", en: "A formal job interview. How do you ask someone's age?" }, a: "Wie alt sind Sie?", o: ["Wie alt bist du?", "Wie alt sind Sie?"], e: { pt: "Em contexto profissional, <b>Sie</b>: <b>Wie alt sind Sie?</b>", en: "In a professional context, <b>Sie</b>: <b>Wie alt sind Sie?</b>" } },
    { q: { pt: "Com um amigo do curso. Como pergunta como ele está?", en: "With a friend from your course. How do you ask how they are?" }, a: "Wie geht es dir?", o: ["Wie geht es dir?", "Wie geht es Ihnen?"], e: { pt: "Entre amigos use <b>du</b> → forma dativa <b>dir</b>: <b>Wie geht es dir?</b>", en: "Among friends use <b>du</b> → dative form <b>dir</b>: <b>Wie geht es dir?</b>" } },
    { q: { pt: "Dando direções a um turista mais velho (formal):", en: "Giving directions to an older tourist (formal):" }, a: "Gehen Sie geradeaus.", o: ["Geh geradeaus.", "Gehen Sie geradeaus."], e: { pt: "Imperativo formal usa <b>Sie</b>: <b>Gehen Sie geradeaus.</b>", en: "The formal imperative uses <b>Sie</b>: <b>Gehen Sie geradeaus.</b>" } },
    { q: { pt: "Você cumprimenta a sua vizinha idosa de manhã:", en: "You greet your elderly neighbour in the morning:" }, a: "Guten Morgen! Wie geht es Ihnen?", o: ["Guten Morgen! Wie geht es Ihnen?", "Morgen! Wie geht's dir?"], e: { pt: "Com pessoas mais velhas/desconhecidas, <b>Sie</b> → dativo <b>Ihnen</b>.", en: "With older people/strangers, <b>Sie</b> → dative <b>Ihnen</b>." } },
    { q: { pt: "Seu chefe pergunta se você pode trabalhar amanhã. Forma educada:", en: "Your boss asks if you can work tomorrow. Polite form:" }, a: "Können Sie morgen arbeiten?", o: ["Kannst du morgen arbeiten?", "Können Sie morgen arbeiten?"], e: { pt: "No trabalho, com o chefe, use <b>Sie</b>: <b>Können Sie…?</b>", en: "At work, with your boss, use <b>Sie</b>: <b>Können Sie…?</b>" } },
    { q: { pt: "Você conhece um colega jovem na festa e quer o nome dele:", en: "You meet a young peer at a party and want their name:" }, a: "Wie heißt du?", o: ["Wie heißt du?", "Wie heißen Sie?"], e: { pt: "Entre jovens, em contexto informal, <b>du</b>: <b>Wie heißt du?</b>", en: "Among young people, informally, <b>du</b>: <b>Wie heißt du?</b>" } },
    { q: { pt: "No balcão, o atendente (formal) pergunta o que você deseja:", en: "At the counter, the (formal) clerk asks what you'd like:" }, a: "Was möchten Sie?", o: ["Was möchtest du?", "Was möchten Sie?"], e: { pt: "Atendimento ao público costuma ser <b>Sie</b>: <b>Was möchten Sie?</b>", en: "Customer service is usually <b>Sie</b>: <b>Was möchten Sie?</b>" } },
    { q: { pt: "Você oferece o tratamento informal a um novo colega da mesma idade:", en: "You offer the informal form to a new peer your age:" }, a: "Wir können du sagen.", o: ["Wir können du sagen.", "Wir können Sie sagen."], e: { pt: "A frase fixa para oferecer informalidade é <b>Wir können du sagen.</b>", en: "The set phrase to offer the informal is <b>Wir können du sagen.</b>" } },
  ];
  function makeDuSie() {
    const item = sample(DU_SIE, 1)[0];
    return {
      kind: "dusie", question: window.tr(item.q), options: shuffle(item.o), answer: item.a,
      hint: L("Formal / desconhecido / mais velho → <b>Sie</b>. Amigo / criança / jovem → <b>du</b>.", "Formal / stranger / older → <b>Sie</b>. Friend / child / young → <b>du</b>."),
      explain: window.tr(item.e),
    };
  }

  // --- Tipo 6: Akkusativ vs Dativ (banco curado bilíngue) ---
  const KASUS = [
    { q: { pt: "___ Supermarkt (estou DENTRO, localização — Wo?)", en: "___ Supermarkt (I'm INSIDE, location — Wo?)" }, a: "im", o: ["im", "in den"], e: { pt: "<b>Wo?</b> (localização) pede Dativ: <b>im</b> Supermarkt (in + dem).", en: "<b>Wo?</b> (location) takes the Dativ: <b>im</b> Supermarkt (in + dem)." } },
    { q: { pt: "Ich fahre ___ Bus.", en: "Ich fahre ___ Bus." }, a: "mit dem", o: ["mit dem", "mit der", "mit den"], e: { pt: "<b>mit</b> sempre pede Dativ; Bus é masculino → <b>mit dem</b> Bus.", en: "<b>mit</b> always takes the Dativ; Bus is masculine → <b>mit dem</b> Bus." } },
    { q: { pt: "Ich gehe ___ Arzt.", en: "Ich gehe ___ Arzt." }, a: "zum", o: ["zum", "zur", "zu die"], e: { pt: "<b>zu</b> pede Dativ; Arzt é masculino → zu + dem = <b>zum</b>.", en: "<b>zu</b> takes the Dativ; Arzt is masculine → zu + dem = <b>zum</b>." } },
    { q: { pt: "Ich gehe ___ Apotheke.", en: "Ich gehe ___ Apotheke." }, a: "zur", o: ["zum", "zur", "zu der"], e: { pt: "<b>zu</b> + feminino (die Apotheke) → zu + der = <b>zur</b>.", en: "<b>zu</b> + feminine (die Apotheke) → zu + der = <b>zur</b>." } },
    { q: { pt: "Ich brauche ___ Pullover (Akkusativ, masc.).", en: "Ich brauche ___ Pullover (Akkusativ, masc.)." }, a: "den", o: ["der", "den", "dem"], e: { pt: "Objeto direto (Akkusativ) no masculino: der → <b>den</b> Pullover.", en: "Direct object (Akkusativ) in the masculine: der → <b>den</b> Pullover." } },
    { q: { pt: "Die Bushaltestelle ist ___ Bahnhof. (localização)", en: "Die Bushaltestelle ist ___ Bahnhof. (location)" }, a: "am", o: ["am", "an den", "an die"], e: { pt: "<b>Wo?</b> com <b>an</b> → Dativ: an + dem = <b>am</b> Bahnhof.", en: "<b>Wo?</b> with <b>an</b> → Dativ: an + dem = <b>am</b> Bahnhof." } },
    { q: { pt: "Wir nehmen ___ U-Bahn. (Akkusativ, fem.)", en: "Wir nehmen ___ U-Bahn. (Akkusativ, fem.)" }, a: "die", o: ["die", "der", "den"], e: { pt: "Objeto direto feminino fica igual ao nominativo: <b>die</b> U-Bahn.", en: "A feminine direct object looks like the nominative: <b>die</b> U-Bahn." } },
    { q: { pt: "Der Termin ist ___ Ärztin. (estar na consulta — bei)", en: "Der Termin ist ___ Ärztin. (at the appointment — bei)" }, a: "bei der", o: ["bei der", "bei dem", "bei die"], e: { pt: "<b>bei</b> pede Dativ; Ärztin é feminino → <b>bei der</b> Ärztin.", en: "<b>bei</b> takes the Dativ; Ärztin is feminine → <b>bei der</b> Ärztin." } },
    { q: { pt: "Ich wohne ___ Stadt. (localização, fem.)", en: "Ich wohne ___ Stadt. (location, fem.)" }, a: "in der", o: ["in der", "in die", "im"], e: { pt: "<b>Wo?</b> + feminino → Dativ: <b>in der</b> Stadt.", en: "<b>Wo?</b> + feminine → Dativ: <b>in der</b> Stadt." } },
    { q: { pt: "Nimm ___ Apfel! (Akkusativ, masc.)", en: "Nimm ___ Apfel! (Akkusativ, masc.)" }, a: "den", o: ["der", "den", "dem"], e: { pt: "Objeto direto masculino: der Apfel → <b>den</b> Apfel.", en: "Masculine direct object: der Apfel → <b>den</b> Apfel." } },
  ];
  function makeKasus() {
    const item = sample(KASUS, 1)[0];
    return {
      kind: "kasus", question: window.tr(item.q), options: shuffle(item.o), answer: item.a,
      hint: L("<b>Wo?</b> (onde está) → Dativ. <b>Wohin?</b> (para onde) → Akkusativ. <b>mit/zu/bei/aus</b> sempre Dativ.", "<b>Wo?</b> (where it is) → Dativ. <b>Wohin?</b> (where to) → Akkusativ. <b>mit/zu/bei/aus</b> always Dativ."),
      explain: window.tr(item.e),
    };
  }

  // Tópicos focados (rótulos bilíngues)
  const TOPICS = [
    { key: "mixed",   icon: "🎲", label: { pt: "Quiz misto", en: "Mixed quiz" },     desc: { pt: "Tudo misturado", en: "Everything mixed" } },
    { key: "article", icon: "🔤", label: { pt: "Artigos", en: "Articles" },          desc: { pt: "der · die · das", en: "der · die · das" } },
    { key: "trans",   icon: "🔄", label: { pt: "Tradução", en: "Translation" },      desc: { pt: "Alemão ⇄ português", en: "German ⇄ English" } },
    { key: "conj",    icon: "🔧", label: { pt: "Conjugação", en: "Conjugation" },    desc: { pt: "Verbos no presente", en: "Verbs in the present" } },
    { key: "dusie",   icon: "🤝", label: { pt: "du vs. Sie", en: "du vs. Sie" },     desc: { pt: "Formal ou informal", en: "Formal or informal" } },
    { key: "kasus",   icon: "📦", label: { pt: "Akk. / Dativ", en: "Akk. / Dativ" }, desc: { pt: "Casos e preposições", en: "Cases and prepositions" } },
  ];
  const TOPIC_GENS = {
    mixed:   ["article", "transDePt", "transPtDe", "conj", "dusie", "kasus"],
    article: ["article"],
    trans:   ["transDePt", "transPtDe"],
    conj:    ["conj"],
    dusie:   ["dusie"],
    kasus:   ["kasus"],
  };

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

  function flashcards(lessonId) {
    return shuffle(vocabPool(lessonId)).map(v => ({
      front: v.de, back: window.mean(v), hint: v.art, cat: v.cat,
    }));
  }

  return { generate, flashcards, vocabPool, TOPICS };
})();

window.Exercises = Exercises;
