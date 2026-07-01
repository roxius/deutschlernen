// verbs.js — Dados de verbos, fórmulas e bancos de frases (notas da Nadine, 29/jun).
// Bilíngue: significados (`pt`+`en`, lidos por mean()), notas de fórmula {pt,en} (tr()),
// e traduções das frases-exemplo {pt,en}. O alemão permanece.
//   { inf, pt, en, praet, pp, aux, praes3?, change?, mixed?, sep?, tags:[] }

const VERBS = [
  // — Stem-changers e→i —
  { inf: "essen", pt: "comer", en: "to eat", praet: "aß", pp: "gegessen", aux: "haben", praes3: "isst", change: "e→i", tags: ["stem"] },
  { inf: "geben", pt: "dar", en: "to give", praet: "gab", pp: "gegeben", aux: "haben", praes3: "gibt", change: "e→i", tags: ["stem"] },
  { inf: "helfen", pt: "ajudar", en: "to help", praet: "half", pp: "geholfen", aux: "haben", praes3: "hilft", change: "e→i", tags: ["stem"] },
  { inf: "sprechen", pt: "falar", en: "to speak", praet: "sprach", pp: "gesprochen", aux: "haben", praes3: "spricht", change: "e→i", tags: ["stem"] },
  { inf: "treffen", pt: "encontrar(-se)", en: "to meet", praet: "traf", pp: "getroffen", aux: "haben", praes3: "trifft", change: "e→i", tags: ["stem"] },
  { inf: "nehmen", pt: "pegar/tomar", en: "to take", praet: "nahm", pp: "genommen", aux: "haben", praes3: "nimmt", change: "e→i", tags: ["stem"] },
  { inf: "vergessen", pt: "esquecer", en: "to forget", praet: "vergaß", pp: "vergessen", aux: "haben", praes3: "vergisst", change: "e→i", tags: ["stem"] },
  // — Stem-changers e→ie —
  { inf: "sehen", pt: "ver", en: "to see", praet: "sah", pp: "gesehen", aux: "haben", praes3: "sieht", change: "e→ie", tags: ["stem"] },
  { inf: "lesen", pt: "ler", en: "to read", praet: "las", pp: "gelesen", aux: "haben", praes3: "liest", change: "e→ie", tags: ["stem"] },
  { inf: "empfehlen", pt: "recomendar", en: "to recommend", praet: "empfahl", pp: "empfohlen", aux: "haben", praes3: "empfiehlt", change: "e→ie", tags: ["stem"] },
  // — Stem-changers a→ä —
  { inf: "fahren", pt: "ir (de veículo)", en: "to go (by vehicle)", praet: "fuhr", pp: "gefahren", aux: "sein", praes3: "fährt", change: "a→ä", tags: ["stem", "sein"] },
  { inf: "fallen", pt: "cair", en: "to fall", praet: "fiel", pp: "gefallen", aux: "sein", praes3: "fällt", change: "a→ä", tags: ["stem", "sein"] },
  { inf: "schlafen", pt: "dormir", en: "to sleep", praet: "schlief", pp: "geschlafen", aux: "haben", praes3: "schläft", change: "a→ä", tags: ["stem"] },
  { inf: "backen", pt: "assar", en: "to bake", praet: "buk", pp: "gebacken", aux: "haben", praes3: "bäckt", change: "a→ä", tags: ["stem"] },
  { inf: "waschen", pt: "lavar", en: "to wash", praet: "wusch", pp: "gewaschen", aux: "haben", praes3: "wäscht", change: "a→ä", tags: ["stem"] },
  { inf: "tragen", pt: "carregar/usar", en: "to carry / wear", praet: "trug", pp: "getragen", aux: "haben", praes3: "trägt", change: "a→ä", tags: ["stem"] },
  // — Stem-changers au→äu / o→ö —
  { inf: "laufen", pt: "correr/andar", en: "to run / walk", praet: "lief", pp: "gelaufen", aux: "sein", praes3: "läuft", change: "au→äu", tags: ["stem", "sein"] },
  { inf: "stoßen", pt: "empurrar/bater", en: "to push / bump", praet: "stieß", pp: "gestoßen", aux: "haben", praes3: "stößt", change: "o→ö", tags: ["stem"] },
  // — Formas mistas (radical irregular + terminação -t) —
  { inf: "brennen", pt: "queimar", en: "to burn", praet: "brannte", pp: "gebrannt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "bringen", pt: "trazer", en: "to bring", praet: "brachte", pp: "gebracht", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "denken", pt: "pensar", en: "to think", praet: "dachte", pp: "gedacht", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "kennen", pt: "conhecer", en: "to know (be familiar with)", praet: "kannte", pp: "gekannt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "nennen", pt: "nomear/chamar", en: "to name / call", praet: "nannte", pp: "genannt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "rennen", pt: "correr", en: "to run", praet: "rannte", pp: "gerannt", aux: "sein", mixed: true, tags: ["mixed", "sein"] },
  { inf: "senden", pt: "enviar", en: "to send", praet: "sandte", pp: "gesandt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "wissen", pt: "saber", en: "to know (a fact)", praet: "wusste", pp: "gewusst", aux: "haben", praes3: "weiß", mixed: true, tags: ["mixed"] },
  // — Modais (mistos) —
  { inf: "dürfen", pt: "poder (permissão)", en: "may / to be allowed to", praet: "durfte", pp: "gedurft", aux: "haben", praes3: "darf", mixed: true, tags: ["mixed", "modal"] },
  { inf: "können", pt: "poder/saber", en: "can / to be able to", praet: "konnte", pp: "gekonnt", aux: "haben", praes3: "kann", mixed: true, tags: ["mixed", "modal"] },
  { inf: "müssen", pt: "ter de/precisar", en: "must / to have to", praet: "musste", pp: "gemusst", aux: "haben", praes3: "muss", mixed: true, tags: ["mixed", "modal"] },
  { inf: "mögen", pt: "gostar", en: "to like", praet: "mochte", pp: "gemocht", aux: "haben", praes3: "mag", mixed: true, tags: ["mixed", "modal"] },
  { inf: "wollen", pt: "querer", en: "to want", praet: "wollte", pp: "gewollt", aux: "haben", praes3: "will", mixed: true, tags: ["mixed", "modal"] },
  { inf: "sollen", pt: "dever", en: "should / to be supposed to", praet: "sollte", pp: "gesollt", aux: "haben", praes3: "soll", mixed: true, tags: ["mixed", "modal"] },
  // — Verbos de movimento/mudança (Perfekt com sein) —
  { inf: "gehen", pt: "ir (a pé)", en: "to go (on foot)", praet: "ging", pp: "gegangen", aux: "sein", tags: ["sein"] },
  { inf: "kommen", pt: "vir", en: "to come", praet: "kam", pp: "gekommen", aux: "sein", tags: ["sein"] },
  { inf: "steigen", pt: "subir", en: "to climb / rise", praet: "stieg", pp: "gestiegen", aux: "sein", tags: ["sein"] },
  { inf: "sterben", pt: "morrer", en: "to die", praet: "starb", pp: "gestorben", aux: "sein", praes3: "stirbt", change: "e→i", tags: ["sein", "stem"] },
  { inf: "werden", pt: "tornar-se", en: "to become", praet: "wurde", pp: "geworden", aux: "sein", praes3: "wird", tags: ["sein"] },
  { inf: "bleiben", pt: "ficar/permanecer", en: "to stay / remain", praet: "blieb", pp: "geblieben", aux: "sein", tags: ["sein"] },
  { inf: "sein", pt: "ser/estar", en: "to be", praet: "war", pp: "gewesen", aux: "sein", praes3: "ist", tags: ["sein"] },
  { inf: "geschehen", pt: "acontecer", en: "to happen", praet: "geschah", pp: "geschehen", aux: "sein", praes3: "geschieht", change: "e→ie", tags: ["sein"] },
  { inf: "aufstehen", pt: "levantar-se", en: "to get up", praet: "stand auf", pp: "aufgestanden", aux: "sein", sep: true, tags: ["sein", "sep"] },
  // — Irregulares de alta frequência (haben) —
  { inf: "trinken", pt: "beber", en: "to drink", praet: "trank", pp: "getrunken", aux: "haben", tags: ["core"] },
  { inf: "finden", pt: "achar/encontrar", en: "to find", praet: "fand", pp: "gefunden", aux: "haben", tags: ["core"] },
  { inf: "schreiben", pt: "escrever", en: "to write", praet: "schrieb", pp: "geschrieben", aux: "haben", tags: ["core"] },
  { inf: "haben", pt: "ter", en: "to have", praet: "hatte", pp: "gehabt", aux: "haben", praes3: "hat", tags: ["core"] },
  { inf: "verlieren", pt: "perder", en: "to lose", praet: "verlor", pp: "verloren", aux: "haben", tags: ["core"] },
];

// ----------------------- Fórmulas (cards de revisão, HTML leve) -----------------------
const VERB_NOTES = [
  {
    icon: "⏱️", title: { pt: "Perfekt — a fórmula", en: "Perfekt — the formula" },
    body: {
      pt: `<p><b>Sujeito + verbo auxiliar (haben/sein) + Partizip II</b> (no fim).</p>
      <p class="ex">Gestern <b>habe</b> ich Pizza <b>gegessen</b>.<br>
      Am Morgen <b>bin</b> ich <b>aufgestanden</b>.</p>
      <p class="muted">O auxiliar fica em 2ª posição; o Partizip II vai para o fim — é o "Satzklammer" (parêntese verbal).</p>`,
      en: `<p><b>Subject + auxiliary verb (haben/sein) + Partizip II</b> (at the end).</p>
      <p class="ex">Gestern <b>habe</b> ich Pizza <b>gegessen</b>.<br>
      Am Morgen <b>bin</b> ich <b>aufgestanden</b>.</p>
      <p class="muted">The auxiliary sits in 2nd position; the Partizip II goes to the end — the "Satzklammer" (sentence bracket).</p>`,
    },
  },
  {
    icon: "🔀", title: { pt: "haben ou sein?", en: "haben or sein?" },
    body: {
      pt: `<p>Use <b>sein</b> com:</p>
      <ul>
        <li>verbos de <b>movimento/deslocamento</b>: gehen, kommen, fahren, laufen, fallen, steigen;</li>
        <li>verbos de <b>mudança de estado</b>: werden, sterben;</li>
        <li>e os especiais <b>sein</b> e <b>bleiben</b>.</li>
      </ul>
      <p>Todo o resto usa <b>haben</b>.</p>`,
      en: `<p>Use <b>sein</b> with:</p>
      <ul>
        <li>verbs of <b>movement</b>: gehen, kommen, fahren, laufen, fallen, steigen;</li>
        <li>verbs of <b>change of state</b>: werden, sterben;</li>
        <li>and the special cases <b>sein</b> and <b>bleiben</b>.</li>
      </ul>
      <p>Everything else uses <b>haben</b>.</p>`,
    },
  },
  {
    icon: "🧩", title: { pt: "Partizip II — como formar", en: "Partizip II — how to form it" },
    body: {
      pt: `<p><b>Regular:</b> ge-+radical+-t → machen → <b>ge<u>mach</u>t</b>.</p>
      <p><b>Irregular:</b> ge-+radical (mudado)+-en → essen → <b>ge<u>gess</u>en</b>.</p>
      <p><b>Misto:</b> radical mudado + terminação fraca -t → brennen → <b>gebrannt</b>; können → <b>gekonnt</b>.</p>
      <p class="muted">Verbos separáveis: o "ge-" entra no meio → aufstehen → <b>aufgestanden</b>.</p>`,
      en: `<p><b>Regular:</b> ge-+stem+-t → machen → <b>ge<u>mach</u>t</b>.</p>
      <p><b>Irregular (strong):</b> ge-+(changed) stem+-en → essen → <b>ge<u>gess</u>en</b>.</p>
      <p><b>Mixed:</b> changed stem + weak ending -t → brennen → <b>gebrannt</b>; können → <b>gekonnt</b>.</p>
      <p class="muted">Separable verbs: the "ge-" goes in the middle → aufstehen → <b>aufgestanden</b>.</p>`,
    },
  },
  {
    icon: "🔁", title: { pt: "Präsens — mudança de vogal (du / er-sie-es)", en: "Präsens — vowel change (du / er-sie-es)" },
    body: {
      pt: `<p>Muitos verbos fortes mudam a vogal só no <b>du</b> e <b>er/sie/es</b>:</p>
      <ul>
        <li><b>e→i</b>: essen → er <b>isst</b>; helfen → <b>hilft</b>; sprechen → <b>spricht</b>; treffen → <b>trifft</b>.</li>
        <li><b>e→ie</b>: sehen → <b>sieht</b>; lesen → <b>liest</b>; empfehlen → <b>empfiehlt</b>.</li>
        <li><b>a→ä</b>: fahren → <b>fährt</b>; schlafen → <b>schläft</b>; fallen → <b>fällt</b>; backen → <b>bäckt</b>.</li>
        <li><b>au→äu</b>: laufen → <b>läuft</b>. &nbsp; <b>o→ö</b>: stoßen → <b>stößt</b>.</li>
      </ul>`,
      en: `<p>Many strong verbs change the vowel only in <b>du</b> and <b>er/sie/es</b>:</p>
      <ul>
        <li><b>e→i</b>: essen → er <b>isst</b>; helfen → <b>hilft</b>; sprechen → <b>spricht</b>; treffen → <b>trifft</b>.</li>
        <li><b>e→ie</b>: sehen → <b>sieht</b>; lesen → <b>liest</b>; empfehlen → <b>empfiehlt</b>.</li>
        <li><b>a→ä</b>: fahren → <b>fährt</b>; schlafen → <b>schläft</b>; fallen → <b>fällt</b>; backen → <b>bäckt</b>.</li>
        <li><b>au→äu</b>: laufen → <b>läuft</b>. &nbsp; <b>o→ö</b>: stoßen → <b>stößt</b>.</li>
      </ul>`,
    },
  },
  {
    icon: "⏪", title: { pt: "Plusquamperfekt", en: "Plusquamperfekt (past perfect)" },
    body: {
      pt: `<p><b>war/hatte + Partizip II</b>. Usa-se para a ação <b>mais antiga</b> quando você já está
      narrando no passado: a ação que aconteceu <i>antes</i> da outra vai no Plusquamperfekt.</p>
      <p class="ex">Die Züge <b>waren ausgefallen</b>, also <b>sind</b> wir mit dem Auto <b>gefahren</b>.</p>`,
      en: `<p><b>war/hatte + Partizip II</b>. Used for the <b>earlier</b> action when you are already
      narrating in the past: the action that happened <i>before</i> the other one goes in the Plusquamperfekt.</p>
      <p class="ex">Die Züge <b>waren ausgefallen</b>, also <b>sind</b> wir mit dem Auto <b>gefahren</b>.</p>`,
    },
  },
  {
    icon: "📐", title: { pt: "Satzbau & TeKaMoLo", en: "Word order & TeKaMoLo" },
    body: {
      pt: `<p>O verbo conjugado fica sempre na <b>2ª posição</b> na oração principal.
      Numa <b>oração subordinada</b> (weil, dass, damit, wenn) o verbo vai para o <b>fim</b>.</p>
      <p class="ex">Ich komme spät, <b>weil</b> ich verschlafen <b>habe</b>.</p>
      <p>Ordem dos complementos: <b>Te–Ka–Mo–Lo</b> (Temporal → Kausal → Modal → Lokal).</p>
      <p class="ex">Ich fahre <b>heute</b> (Te) <b>wegen der Verspätung</b> (Ka) <b>mit dem Auto</b> (Mo) <b>nach München</b> (Lo).</p>
      <p class="muted">Pronomes "furam a fila" (vêm logo após o verbo); no Temporal, do geral ao específico
      (am Freitag um 18 Uhr); a Posição 1 pode receber qualquer elemento para ênfase.</p>`,
      en: `<p>The conjugated verb always sits in <b>2nd position</b> in a main clause.
      In a <b>subordinate clause</b> (weil, dass, damit, wenn) the verb goes to the <b>end</b>.</p>
      <p class="ex">Ich komme spät, <b>weil</b> ich verschlafen <b>habe</b>.</p>
      <p>Order of the complements: <b>Te–Ka–Mo–Lo</b> (Time → Cause → Manner → Place).</p>
      <p class="ex">Ich fahre <b>heute</b> (Te) <b>wegen der Verspätung</b> (Ka) <b>mit dem Auto</b> (Mo) <b>nach München</b> (Lo).</p>
      <p class="muted">Pronouns "jump the queue" (right after the verb); within Time, general before specific
      (am Freitag um 18 Uhr); Position 1 can take any element for emphasis.</p>`,
    },
  },
];

// ----------------------- Bancos para os drills -----------------------

// Construtor de Perfekt: lacunas [aux] ... [Partizip II]. `inf` é a dica do verbo.
const PERFEKT_BANK = [
  { pre: "Am Morgen", mid: "ich", post: "", inf: "aufstehen", aux: "bin", pp: "aufgestanden" },
  { pre: "Gestern", mid: "ich Pizza", post: "", inf: "essen", aux: "habe", pp: "gegessen" },
  { pre: "Am Wochenende", mid: "wir Freunde", post: "", inf: "treffen", aux: "haben", pp: "getroffen" },
  { pre: "Danach", mid: "ich im Park spazieren", post: "", inf: "gehen", aux: "bin", pp: "gegangen" },
  { pre: "Am Freitag", mid: "wir nach München", post: "", inf: "fahren", aux: "sind", pp: "gefahren" },
  { pre: "Heute", mid: "ich einen Kaffee", post: "", inf: "trinken", aux: "habe", pp: "getrunken" },
  { pre: "Am Abend", mid: "ich früh", post: "", inf: "schlafen", aux: "habe", pp: "geschlafen" },
  { pre: "Im Park", mid: "ich meine E-Mails", post: "", inf: "lesen", aux: "habe", pp: "gelesen" },
  { pre: "Nachts", mid: "wir bei Freunden", post: "", inf: "ankommen", aux: "sind", pp: "angekommen" },
  { pre: "Am Sonntag", mid: "ich in der Bibliothek", post: "", inf: "lernen", aux: "habe", pp: "gelernt" },
];

// Präsens com mudança de vogal: verbo + pronome → forma conjugada.
const PRAESENS_BANK = [
  { inf: "fahren", pron: "du", form: "fährst", change: "a→ä" },
  { inf: "fahren", pron: "er", form: "fährt", change: "a→ä" },
  { inf: "essen", pron: "du", form: "isst", change: "e→i" },
  { inf: "essen", pron: "er", form: "isst", change: "e→i" },
  { inf: "lesen", pron: "du", form: "liest", change: "e→ie" },
  { inf: "sehen", pron: "du", form: "siehst", change: "e→ie" },
  { inf: "sehen", pron: "er", form: "sieht", change: "e→ie" },
  { inf: "helfen", pron: "du", form: "hilfst", change: "e→i" },
  { inf: "sprechen", pron: "du", form: "sprichst", change: "e→i" },
  { inf: "treffen", pron: "er", form: "trifft", change: "e→i" },
  { inf: "empfehlen", pron: "du", form: "empfiehlst", change: "e→ie" },
  { inf: "schlafen", pron: "er", form: "schläft", change: "a→ä" },
  { inf: "laufen", pron: "du", form: "läufst", change: "au→äu" },
  { inf: "stoßen", pron: "du", form: "stößt", change: "o→ö" },
  { inf: "nehmen", pron: "du", form: "nimmst", change: "e→i" },
  { inf: "nehmen", pron: "er", form: "nimmt", change: "e→i" },
  { inf: "backen", pron: "sie (ela)", form: "bäckt", change: "a→ä", subj: "Meine Mutter" },
];

// Ordem TeKaMoLo: blocos a reordenar. `note` é bilíngue.
const TEKAMOLO_BANK = [
  {
    answer: ["Ich", "fahre", "heute", "wegen der Verspätung", "mit dem Auto", "nach München"],
    roles: ["S", "V", "Te", "Ka", "Mo", "Lo"],
    note: { pt: "Verbo em 2ª posição; complementos em Te–Ka–Mo–Lo.", en: "Verb in 2nd position; complements in Te–Ka–Mo–Lo order." },
  },
  {
    answer: ["Am Freitag", "sind", "wir", "mit dem Auto", "nach München", "gefahren"],
    roles: ["Te", "V", "S", "Mo", "Lo", "PP"],
    note: { pt: "Posição 1 = Temporal (ênfase); verbo conjugado em 2ª; Partizip II no fim (Satzklammer).", en: "Position 1 = Time (emphasis); conjugated verb in 2nd; Partizip II at the end (Satzklammer)." },
  },
  {
    answer: ["Ich", "gebe", "ihm", "heute", "im Büro", "das Geschenk"],
    roles: ["S", "V", "Pron", "Te", "Lo", "Akk"],
    note: { pt: "Pronomes furam a fila: vêm logo após o verbo, antes dos elementos Te/Mo/Lo.", en: "Pronouns jump the queue: they come right after the verb, before the Te/Mo/Lo elements." },
  },
  {
    answer: ["Heute", "trinke", "ich", "im Café", "einen Kaffee"],
    roles: ["Te", "V", "S", "Lo", "Akk"],
    note: { pt: "Temporal na Posição 1; verbo em 2ª; sujeito logo depois.", en: "Time in Position 1; verb in 2nd; subject right after." },
  },
  {
    answer: ["Wir", "treffen", "uns", "am Freitag", "um 18 Uhr", "vor dem Kino"],
    roles: ["S", "V", "Pron", "Te", "Te", "Lo"],
    note: { pt: "No Temporal, do geral ao específico: am Freitag → um 18 Uhr.", en: "Within Time, general before specific: am Freitag → um 18 Uhr." },
  },
];

// Frases-exemplo por verbo. Cada exemplo: [presente_DE, {pt,en}, passado_DE].
const VERB_EX = {
  essen: [["Ich esse gern Käse.", { pt: "Como/comi queijo com gosto.", en: "I like/liked eating cheese." }, "Ich habe gern Käse gegessen."], ["Was isst du zum Frühstück?", { pt: "O que você come/comeu no café da manhã?", en: "What do/did you eat for breakfast?" }, "Was hast du zum Frühstück gegessen?"]],
  geben: [["Ich gebe dir mein Buch.", { pt: "Te dou/dei meu livro.", en: "I give/gave you my book." }, "Ich habe dir mein Buch gegeben."]],
  helfen: [["Ich helfe meiner Mutter.", { pt: "Ajudo/ajudei minha mãe.", en: "I help/helped my mother." }, "Ich habe meiner Mutter geholfen."]],
  sprechen: [["Wir sprechen Deutsch.", { pt: "Falamos/falávamos alemão.", en: "We speak/spoke German." }, "Wir haben Deutsch gesprochen."]],
  treffen: [["Ich treffe heute Freunde.", { pt: "Encontro/encontrei amigos.", en: "I meet/met friends." }, "Ich habe Freunde getroffen."]],
  nehmen: [["Ich nehme den Bus.", { pt: "Pego/peguei o ônibus.", en: "I take/took the bus." }, "Ich habe den Bus genommen."]],
  vergessen: [["Ich vergesse oft Namen.", { pt: "Esqueço/esqueci nomes.", en: "I often forget/forgot names." }, "Ich habe den Namen vergessen."]],
  sehen: [["Ich sehe einen Film.", { pt: "Vejo/vi um filme.", en: "I watch/watched a film." }, "Ich habe einen Film gesehen."]],
  lesen: [["Ich lese ein Buch.", { pt: "Leio/li um livro.", en: "I read a book." }, "Ich habe ein Buch gelesen."]],
  empfehlen: [["Ich empfehle dir das Restaurant.", { pt: "Te recomendo/recomendei o restaurante.", en: "I recommend/recommended the restaurant to you." }, "Ich habe dir das Restaurant empfohlen."]],
  fahren: [["Ich fahre nach München.", { pt: "Vou/fui a Munique.", en: "I go/went to Munich." }, "Ich bin nach München gefahren."]],
  fallen: [["Die Blätter fallen im Herbst.", { pt: "As folhas caem/caíram no outono.", en: "The leaves fall/fell in autumn." }, "Die Blätter sind im Herbst gefallen."]],
  schlafen: [["Ich schlafe acht Stunden.", { pt: "Durmo/dormi oito horas.", en: "I sleep/slept eight hours." }, "Ich habe acht Stunden geschlafen."]],
  backen: [["Wir backen einen Kuchen.", { pt: "Assamos/assei um bolo.", en: "We bake/baked a cake." }, "Wir haben einen Kuchen gebacken."]],
  waschen: [["Ich wasche mir die Hände.", { pt: "Lavo/lavei as mãos.", en: "I wash/washed my hands." }, "Ich habe mir die Hände gewaschen."]],
  tragen: [["Ich trage eine Jacke.", { pt: "Uso/usei uma jaqueta.", en: "I wear/wore a jacket." }, "Ich habe eine Jacke getragen."]],
  laufen: [["Ich laufe im Park.", { pt: "Corro/corri no parque.", en: "I run/ran in the park." }, "Ich bin im Park gelaufen."]],
  stoßen: [["Ich stoße an den Tisch.", { pt: "Bato/bati na mesa.", en: "I bump/bumped into the table." }, "Ich habe mich an den Tisch gestoßen."]],
  brennen: [["Die Kerze brennt.", { pt: "A vela queima/queimou.", en: "The candle is/was burning." }, "Die Kerze hat gebrannt."]],
  bringen: [["Ich bringe Wein mit.", { pt: "Trago/trouxe vinho.", en: "I bring/brought wine." }, "Ich habe Wein mitgebracht."]],
  denken: [["Ich denke an dich.", { pt: "Penso/pensei em você.", en: "I think/thought of you." }, "Ich habe an dich gedacht."]],
  kennen: [["Ich kenne die Stadt gut.", { pt: "Conheço/conhecia bem a cidade.", en: "I know/knew the city well." }, "Ich habe die Stadt gut gekannt."]],
  nennen: [["Wir nennen ihn Max.", { pt: "Nós o chamamos/chamávamos de Max.", en: "We call/called him Max." }, "Wir haben ihn Max genannt."]],
  rennen: [["Die Kinder rennen schnell.", { pt: "As crianças correm/correram rápido.", en: "The children run/ran fast." }, "Die Kinder sind schnell gerannt."]],
  senden: [["Ich sende dir eine E-Mail.", { pt: "Te envio/enviei um e-mail.", en: "I send/sent you an email." }, "Ich habe dir eine E-Mail gesandt."]],
  wissen: [["Ich weiß die Antwort.", { pt: "Sei/sabia a resposta.", en: "I know/knew the answer." }, "Ich habe die Antwort gewusst."]],
  dürfen: [["Darf ich hier rauchen?", { pt: "Posso/podia fumar aqui?", en: "May/might I smoke here?" }, "Durfte ich hier rauchen?"]],
  können: [["Ich kann schwimmen.", { pt: "Sei/sabia nadar.", en: "I can/could swim." }, "Ich konnte schwimmen."]],
  müssen: [["Ich muss arbeiten.", { pt: "Preciso/precisei trabalhar.", en: "I have/had to work." }, "Ich musste arbeiten."]],
  mögen: [["Ich mag Schokolade.", { pt: "Gosto/gostava de chocolate.", en: "I like/liked chocolate." }, "Ich mochte Schokolade."]],
  wollen: [["Ich will nach Hause.", { pt: "Quero/queria ir para casa.", en: "I want/wanted to go home." }, "Ich wollte nach Hause."]],
  sollen: [["Du sollst mehr schlafen.", { pt: "Você deve/devia dormir mais.", en: "You should/should have slept more." }, "Du solltest mehr schlafen."]],
  gehen: [["Ich gehe ins Kino.", { pt: "Vou/fui ao cinema.", en: "I go/went to the cinema." }, "Ich bin ins Kino gegangen."], ["Wie geht es dir?", { pt: "Como você está/estava?", en: "How are/were you?" }, "Wie ist es dir gegangen?"]],
  kommen: [["Ich komme aus Brasilien.", { pt: "Venho/vim do Brasil.", en: "I come/came from Brazil." }, "Ich bin aus Brasilien gekommen."]],
  steigen: [["Die Preise steigen.", { pt: "Os preços sobem/subiram.", en: "Prices rise/rose." }, "Die Preise sind gestiegen."]],
  sterben: [["Die Pflanze stirbt ohne Wasser.", { pt: "A planta morre/morreu sem água.", en: "The plant dies/died without water." }, "Die Pflanze ist ohne Wasser gestorben."]],
  werden: [["Es wird kalt.", { pt: "Está/ficou frio.", en: "It is/became cold." }, "Es ist kalt geworden."]],
  bleiben: [["Ich bleibe heute zu Hause.", { pt: "Fico/fiquei em casa.", en: "I stay/stayed home." }, "Ich bin zu Hause geblieben."]],
  sein: [["Ich bin müde.", { pt: "Estou/estive cansado.", en: "I am/was tired." }, "Ich bin müde gewesen."], ["Wo bist du?", { pt: "Onde você está/esteve?", en: "Where are/were you?" }, "Wo bist du gewesen?"]],
  geschehen: [["Was geschieht hier?", { pt: "O que acontece/aconteceu aqui?", en: "What is/was happening here?" }, "Was ist hier geschehen?"]],
  aufstehen: [["Ich stehe früh auf.", { pt: "Levanto/levantei cedo.", en: "I get/got up early." }, "Ich bin früh aufgestanden."]],
  trinken: [["Ich trinke einen Kaffee.", { pt: "Bebo/bebi um café.", en: "I drink/drank a coffee." }, "Ich habe einen Kaffee getrunken."]],
  finden: [["Ich finde den Schlüssel nicht.", { pt: "Não acho/achei a chave.", en: "I can't/couldn't find the key." }, "Ich habe den Schlüssel nicht gefunden."]],
  schreiben: [["Ich schreibe einen Brief.", { pt: "Escrevo/escrevi uma carta.", en: "I write/wrote a letter." }, "Ich habe einen Brief geschrieben."]],
  haben: [["Ich habe einen Hund.", { pt: "Tenho/tinha um cachorro.", en: "I have/had a dog." }, "Ich habe einen Hund gehabt."]],
  verlieren: [["Ich verliere oft meinen Schlüssel.", { pt: "Perco/perdi minha chave.", en: "I often lose/lost my key." }, "Ich habe meinen Schlüssel verloren."]],
  // usados em frases do PERFEKT_BANK (não estão na tabela principal de verbos)
  ankommen: [["Wir kommen am Bahnhof an.", { pt: "Chegamos/chegamos à estação.", en: "We arrive/arrived at the station." }, "Wir sind am Bahnhof angekommen."]],
  lernen: [["Ich lerne Deutsch.", { pt: "Aprendo/aprendi alemão.", en: "I learn/learned German." }, "Ich habe Deutsch gelernt."]],
};

window.VERBS = VERBS;
window.VERB_EX = VERB_EX;
window.VERB_NOTES = VERB_NOTES;
window.PERFEKT_BANK = PERFEKT_BANK;
window.PRAESENS_BANK = PRAESENS_BANK;
window.TEKAMOLO_BANK = TEKAMOLO_BANK;
