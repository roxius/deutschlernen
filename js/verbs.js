// verbs.js — Dados de verbos, fórmulas e bancos de frases das notas da Nadine (29/jun).
// Conjunto curado (não os 118 da tabela): stem-changers do Präsens, formas mistas,
// verbos com `sein` e irregulares de alta frequência. Cada verbo:
//   { inf, pt, praet, pp, aux:"haben"|"sein", praes3?, change?, mixed?, sep?, tags:[] }
//   - praes3: forma irregular do "er/sie/es" (só p/ verbos com mudança de vogal)
//   - change: tipo de mudança de vogal no Präsens ("e→i", "e→ie", "a→ä", "au→äu", "o→ö")
//   - mixed: forma mista (radical irregular + terminação fraca -t: gebrannt, gekonnt)
//   - sep:   verbo separável (prefixo destacável)

const VERBS = [
  // — Stem-changers e→i —
  { inf: "essen", pt: "comer", praet: "aß", pp: "gegessen", aux: "haben", praes3: "isst", change: "e→i", tags: ["stem"] },
  { inf: "geben", pt: "dar", praet: "gab", pp: "gegeben", aux: "haben", praes3: "gibt", change: "e→i", tags: ["stem"] },
  { inf: "helfen", pt: "ajudar", praet: "half", pp: "geholfen", aux: "haben", praes3: "hilft", change: "e→i", tags: ["stem"] },
  { inf: "sprechen", pt: "falar", praet: "sprach", pp: "gesprochen", aux: "haben", praes3: "spricht", change: "e→i", tags: ["stem"] },
  { inf: "treffen", pt: "encontrar(-se)", praet: "traf", pp: "getroffen", aux: "haben", praes3: "trifft", change: "e→i", tags: ["stem"] },
  { inf: "nehmen", pt: "pegar/tomar", praet: "nahm", pp: "genommen", aux: "haben", praes3: "nimmt", change: "e→i", tags: ["stem"] },
  { inf: "vergessen", pt: "esquecer", praet: "vergaß", pp: "vergessen", aux: "haben", praes3: "vergisst", change: "e→i", tags: ["stem"] },
  // — Stem-changers e→ie —
  { inf: "sehen", pt: "ver", praet: "sah", pp: "gesehen", aux: "haben", praes3: "sieht", change: "e→ie", tags: ["stem"] },
  { inf: "lesen", pt: "ler", praet: "las", pp: "gelesen", aux: "haben", praes3: "liest", change: "e→ie", tags: ["stem"] },
  { inf: "empfehlen", pt: "recomendar", praet: "empfahl", pp: "empfohlen", aux: "haben", praes3: "empfiehlt", change: "e→ie", tags: ["stem"] },
  // — Stem-changers a→ä —
  { inf: "fahren", pt: "ir (de veículo)", praet: "fuhr", pp: "gefahren", aux: "sein", praes3: "fährt", change: "a→ä", tags: ["stem", "sein"] },
  { inf: "fallen", pt: "cair", praet: "fiel", pp: "gefallen", aux: "sein", praes3: "fällt", change: "a→ä", tags: ["stem", "sein"] },
  { inf: "schlafen", pt: "dormir", praet: "schlief", pp: "geschlafen", aux: "haben", praes3: "schläft", change: "a→ä", tags: ["stem"] },
  { inf: "backen", pt: "assar", praet: "buk", pp: "gebacken", aux: "haben", praes3: "bäckt", change: "a→ä", tags: ["stem"] },
  { inf: "waschen", pt: "lavar", praet: "wusch", pp: "gewaschen", aux: "haben", praes3: "wäscht", change: "a→ä", tags: ["stem"] },
  { inf: "tragen", pt: "carregar/usar", praet: "trug", pp: "getragen", aux: "haben", praes3: "trägt", change: "a→ä", tags: ["stem"] },
  // — Stem-changers au→äu / o→ö —
  { inf: "laufen", pt: "correr/andar", praet: "lief", pp: "gelaufen", aux: "sein", praes3: "läuft", change: "au→äu", tags: ["stem", "sein"] },
  { inf: "stoßen", pt: "empurrar/bater", praet: "stieß", pp: "gestoßen", aux: "haben", praes3: "stößt", change: "o→ö", tags: ["stem"] },
  // — Formas mistas (radical irregular + terminação -t) —
  { inf: "brennen", pt: "queimar", praet: "brannte", pp: "gebrannt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "bringen", pt: "trazer", praet: "brachte", pp: "gebracht", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "denken", pt: "pensar", praet: "dachte", pp: "gedacht", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "kennen", pt: "conhecer", praet: "kannte", pp: "gekannt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "nennen", pt: "nomear/chamar", praet: "nannte", pp: "genannt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "rennen", pt: "correr", praet: "rannte", pp: "gerannt", aux: "sein", mixed: true, tags: ["mixed", "sein"] },
  { inf: "senden", pt: "enviar", praet: "sandte", pp: "gesandt", aux: "haben", mixed: true, tags: ["mixed"] },
  { inf: "wissen", pt: "saber", praet: "wusste", pp: "gewusst", aux: "haben", praes3: "weiß", mixed: true, tags: ["mixed"] },
  // — Modais (mistos) —
  { inf: "dürfen", pt: "poder (permissão)", praet: "durfte", pp: "gedurft", aux: "haben", praes3: "darf", mixed: true, tags: ["mixed", "modal"] },
  { inf: "können", pt: "poder/saber", praet: "konnte", pp: "gekonnt", aux: "haben", praes3: "kann", mixed: true, tags: ["mixed", "modal"] },
  { inf: "müssen", pt: "ter de/precisar", praet: "musste", pp: "gemusst", aux: "haben", praes3: "muss", mixed: true, tags: ["mixed", "modal"] },
  { inf: "mögen", pt: "gostar", praet: "mochte", pp: "gemocht", aux: "haben", praes3: "mag", mixed: true, tags: ["mixed", "modal"] },
  { inf: "wollen", pt: "querer", praet: "wollte", pp: "gewollt", aux: "haben", praes3: "will", mixed: true, tags: ["mixed", "modal"] },
  { inf: "sollen", pt: "dever", praet: "sollte", pp: "gesollt", aux: "haben", praes3: "soll", mixed: true, tags: ["mixed", "modal"] },
  // — Verbos de movimento/mudança (Perfekt com sein) —
  { inf: "gehen", pt: "ir (a pé)", praet: "ging", pp: "gegangen", aux: "sein", tags: ["sein"] },
  { inf: "kommen", pt: "vir", praet: "kam", pp: "gekommen", aux: "sein", tags: ["sein"] },
  { inf: "steigen", pt: "subir", praet: "stieg", pp: "gestiegen", aux: "sein", tags: ["sein"] },
  { inf: "sterben", pt: "morrer", praet: "starb", pp: "gestorben", aux: "sein", praes3: "stirbt", change: "e→i", tags: ["sein", "stem"] },
  { inf: "werden", pt: "tornar-se", praet: "wurde", pp: "geworden", aux: "sein", praes3: "wird", tags: ["sein"] },
  { inf: "bleiben", pt: "ficar/permanecer", praet: "blieb", pp: "geblieben", aux: "sein", tags: ["sein"] },
  { inf: "sein", pt: "ser/estar", praet: "war", pp: "gewesen", aux: "sein", praes3: "ist", tags: ["sein"] },
  { inf: "geschehen", pt: "acontecer", praet: "geschah", pp: "geschehen", aux: "sein", praes3: "geschieht", change: "e→ie", tags: ["sein"] },
  { inf: "aufstehen", pt: "levantar-se", praet: "stand auf", pp: "aufgestanden", aux: "sein", sep: true, tags: ["sein", "sep"] },
  // — Irregulares de alta frequência (haben) —
  { inf: "trinken", pt: "beber", praet: "trank", pp: "getrunken", aux: "haben", tags: ["core"] },
  { inf: "finden", pt: "achar/encontrar", praet: "fand", pp: "gefunden", aux: "haben", tags: ["core"] },
  { inf: "schreiben", pt: "escrever", praet: "schrieb", pp: "geschrieben", aux: "haben", tags: ["core"] },
  { inf: "haben", pt: "ter", praet: "hatte", pp: "gehabt", aux: "haben", praes3: "hat", tags: ["core"] },
  { inf: "verlieren", pt: "perder", praet: "verlor", pp: "verloren", aux: "haben", tags: ["core"] },
];

// ----------------------- Fórmulas (cards de revisão, HTML leve em PT) -----------------------
const VERB_NOTES = [
  {
    icon: "⏱️", title: "Perfekt — a fórmula",
    body: `<p><b>Sujeito + verbo auxiliar (haben/sein) + Partizip II</b> (no fim).</p>
      <p class="ex">Gestern <b>habe</b> ich Pizza <b>gegessen</b>.<br>
      Am Morgen <b>bin</b> ich <b>aufgestanden</b>.</p>
      <p class="muted">O auxiliar fica em 2ª posição; o Partizip II vai para o fim — é o "Satzklammer" (parêntese verbal).</p>`,
  },
  {
    icon: "🔀", title: "haben ou sein?",
    body: `<p>Use <b>sein</b> com:</p>
      <ul>
        <li>verbos de <b>movimento/deslocamento</b>: gehen, kommen, fahren, laufen, fallen, steigen;</li>
        <li>verbos de <b>mudança de estado</b>: werden, sterben;</li>
        <li>e os especiais <b>sein</b> e <b>bleiben</b>.</li>
      </ul>
      <p>Todo o resto usa <b>haben</b>.</p>`,
  },
  {
    icon: "🧩", title: "Partizip II — como formar",
    body: `<p><b>Regular:</b> ge-+radical+-t → machen → <b>ge<u>mach</u>t</b>.</p>
      <p><b>Irregular:</b> ge-+radical (mudado)+-en → essen → <b>ge<u>gess</u>en</b>.</p>
      <p><b>Misto:</b> radical mudado + terminação fraca -t → brennen → <b>gebrannt</b>; können → <b>gekonnt</b>.</p>
      <p class="muted">Verbos separáveis: o "ge-" entra no meio → aufstehen → <b>aufgestanden</b>.</p>`,
  },
  {
    icon: "🔁", title: "Präsens — mudança de vogal (du / er-sie-es)",
    body: `<p>Muitos verbos fortes mudam a vogal só no <b>du</b> e <b>er/sie/es</b>:</p>
      <ul>
        <li><b>e→i</b>: essen → er <b>isst</b>; helfen → <b>hilft</b>; sprechen → <b>spricht</b>; treffen → <b>trifft</b>.</li>
        <li><b>e→ie</b>: sehen → <b>sieht</b>; lesen → <b>liest</b>; empfehlen → <b>empfiehlt</b>.</li>
        <li><b>a→ä</b>: fahren → <b>fährt</b>; schlafen → <b>schläft</b>; fallen → <b>fällt</b>; backen → <b>bäckt</b>.</li>
        <li><b>au→äu</b>: laufen → <b>läuft</b>. &nbsp; <b>o→ö</b>: stoßen → <b>stößt</b>.</li>
      </ul>`,
  },
  {
    icon: "⏪", title: "Plusquamperfekt",
    body: `<p><b>war/hatte + Partizip II</b>. Usa-se para a ação <b>mais antiga</b> quando você já está
      narrando no passado: a ação que aconteceu <i>antes</i> da outra vai no Plusquamperfekt.</p>
      <p class="ex">Die Züge <b>waren ausgefallen</b>, also <b>sind</b> wir mit dem Auto <b>gefahren</b>.</p>`,
  },
  {
    icon: "📐", title: "Satzbau & TeKaMoLo",
    body: `<p>O verbo conjugado fica sempre na <b>2ª posição</b> na oração principal.
      Numa <b>oração subordinada</b> (weil, dass, damit, wenn) o verbo vai para o <b>fim</b>.</p>
      <p class="ex">Ich komme spät, <b>weil</b> ich verschlafen <b>habe</b>.</p>
      <p>Ordem dos complementos: <b>Te–Ka–Mo–Lo</b> (Temporal → Kausal → Modal → Lokal).</p>
      <p class="ex">Ich fahre <b>heute</b> (Te) <b>wegen der Verspätung</b> (Ka) <b>mit dem Auto</b> (Mo) <b>nach München</b> (Lo).</p>
      <p class="muted">Pronomes "furam a fila" (vêm logo após o verbo); no Temporal, do geral ao específico
      (am Freitag um 18 Uhr); a Posição 1 pode receber qualquer elemento para ênfase.</p>`,
  },
];

// ----------------------- Bancos para os drills que precisam de frase pronta -----------------------

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

// Ordem TeKaMoLo: blocos a reordenar. `blocks` está embaralhado; `answer` é a sequência correta.
// `roles` rotula cada bloco (V=verbo, S=sujeito, Te/Ka/Mo/Lo/Pron). `note` explica.
const TEKAMOLO_BANK = [
  {
    answer: ["Ich", "fahre", "heute", "wegen der Verspätung", "mit dem Auto", "nach München"],
    roles: ["S", "V", "Te", "Ka", "Mo", "Lo"],
    note: "Verbo em 2ª posição; complementos em Te–Ka–Mo–Lo.",
  },
  {
    answer: ["Am Freitag", "sind", "wir", "mit dem Auto", "nach München", "gefahren"],
    roles: ["Te", "V", "S", "Mo", "Lo", "PP"],
    note: "Posição 1 = Temporal (ênfase); verbo conjugado em 2ª; Partizip II no fim (Satzklammer).",
  },
  {
    answer: ["Ich", "gebe", "ihm", "heute", "im Büro", "das Geschenk"],
    roles: ["S", "V", "Pron", "Te", "Lo", "Akk"],
    note: "Pronomes furam a fila: vêm logo após o verbo, antes dos elementos Te/Mo/Lo.",
  },
  {
    answer: ["Heute", "trinke", "ich", "im Café", "einen Kaffee"],
    roles: ["Te", "V", "S", "Lo", "Akk"],
    note: "Temporal na Posição 1; verbo em 2ª; sujeito logo depois.",
  },
  {
    answer: ["Wir", "treffen", "uns", "am Freitag", "um 18 Uhr", "vor dem Kino"],
    roles: ["S", "V", "Pron", "Te", "Te", "Lo"],
    note: "No Temporal, do geral ao específico: am Freitag → um 18 Uhr.",
  },
];

// Frases-exemplo úteis por verbo (Präsens, com tradução PT). Em Präsens de propósito:
// assim podem acompanhar as dicas de Partizip II / Präteritum sem revelar a resposta.
// Formato: inf -> [[alemão, português], ...] (1 a 2 por verbo).
const VERB_EX = {
  essen: [["Ich esse gern Käse.", "Como queijo com gosto."], ["Was isst du zum Frühstück?", "O que você come no café da manhã?"]],
  geben: [["Ich gebe dir mein Buch.", "Te dou meu livro."]],
  helfen: [["Ich helfe meiner Mutter.", "Ajudo minha mãe."]],
  sprechen: [["Wir sprechen Deutsch.", "Falamos alemão."]],
  treffen: [["Ich treffe heute Freunde.", "Encontro amigos hoje."]],
  nehmen: [["Ich nehme den Bus.", "Pego o ônibus."]],
  vergessen: [["Ich vergesse oft Namen.", "Esqueço nomes com frequência."]],
  sehen: [["Ich sehe einen Film.", "Vejo um filme."]],
  lesen: [["Ich lese ein Buch.", "Leio um livro."]],
  empfehlen: [["Ich empfehle dir das Restaurant.", "Te recomendo o restaurante."]],
  fahren: [["Ich fahre nach München.", "Vou a Munique (de carro/trem)."]],
  fallen: [["Die Blätter fallen im Herbst.", "As folhas caem no outono."]],
  schlafen: [["Ich schlafe acht Stunden.", "Durmo oito horas."]],
  backen: [["Wir backen einen Kuchen.", "Assamos um bolo."]],
  waschen: [["Ich wasche mir die Hände.", "Lavo as mãos."]],
  tragen: [["Ich trage eine Jacke.", "Uso uma jaqueta."]],
  laufen: [["Ich laufe im Park.", "Corro/ando no parque."]],
  stoßen: [["Ich stoße an den Tisch.", "Bato na mesa."]],
  brennen: [["Die Kerze brennt.", "A vela queima."]],
  bringen: [["Ich bringe Wein mit.", "Trago vinho (comigo)."]],
  denken: [["Ich denke an dich.", "Penso em você."]],
  kennen: [["Ich kenne die Stadt gut.", "Conheço bem a cidade."]],
  nennen: [["Wir nennen ihn Max.", "Nós o chamamos de Max."]],
  rennen: [["Die Kinder rennen schnell.", "As crianças correm rápido."]],
  senden: [["Ich sende dir eine E-Mail.", "Te envio um e-mail."]],
  wissen: [["Ich weiß die Antwort.", "Sei a resposta."]],
  dürfen: [["Darf ich hier rauchen?", "Posso fumar aqui?"]],
  können: [["Ich kann schwimmen.", "Sei nadar."]],
  müssen: [["Ich muss arbeiten.", "Preciso trabalhar."]],
  mögen: [["Ich mag Schokolade.", "Gosto de chocolate."]],
  wollen: [["Ich will nach Hause.", "Quero ir para casa."]],
  sollen: [["Du sollst mehr schlafen.", "Você deveria dormir mais."]],
  gehen: [["Ich gehe ins Kino.", "Vou ao cinema."], ["Wie geht es dir?", "Como você está?"]],
  kommen: [["Ich komme aus Brasilien.", "Venho do Brasil."]],
  steigen: [["Die Preise steigen.", "Os preços sobem."]],
  sterben: [["Die Pflanze stirbt ohne Wasser.", "A planta morre sem água."]],
  werden: [["Es wird kalt.", "Está ficando frio."]],
  bleiben: [["Ich bleibe heute zu Hause.", "Fico em casa hoje."]],
  sein: [["Ich bin müde.", "Estou cansado."], ["Wo bist du?", "Onde você está?"]],
  geschehen: [["Was geschieht hier?", "O que acontece aqui?"]],
  aufstehen: [["Ich stehe früh auf.", "Levanto cedo."]],
  trinken: [["Ich trinke einen Kaffee.", "Bebo um café."]],
  finden: [["Ich finde den Schlüssel nicht.", "Não acho a chave."]],
  schreiben: [["Ich schreibe einen Brief.", "Escrevo uma carta."]],
  haben: [["Ich habe einen Hund.", "Tenho um cachorro."]],
  verlieren: [["Ich verliere oft meinen Schlüssel.", "Perco minha chave com frequência."]],
};

window.VERBS = VERBS;
window.VERB_EX = VERB_EX;
window.VERB_NOTES = VERB_NOTES;
window.PERFEKT_BANK = PERFEKT_BANK;
window.PRAESENS_BANK = PRAESENS_BANK;
window.TEKAMOLO_BANK = TEKAMOLO_BANK;
