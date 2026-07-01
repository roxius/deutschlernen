// content.js — Conteúdo da ementa "Einfach gut! Deutsch für die Integration" A1.1 + A1.2.
// Bilíngue: cada string de EXPLICAÇÃO é um par { pt, en } (lido por tr()); o alemão fica.
// Vocabulário: cada item tem `pt` e `en` (lido por mean()).

const COURSE = {
  title: "Einfach gut! Deutsch für die Integration",
  level: "A1.1 + A1.2",
  parts: [
    { id: "a1.1", title: "A1.1", subtitle: { pt: "Lektionen 1–6", en: "Lektionen 1–6" }, lessons: [1, 2, 3, 4, 5, 6] },
    { id: "a1.2", title: "A1.2", subtitle: { pt: "Lektionen 7–12", en: "Lektionen 7–12" }, lessons: [7, 8, 9, 10, 11, 12] },
  ],
};

// Helper para tabelas de conjugação (meaning/note são pares {pt,en})
const conj = (verb, meaning, forms, note) => ({ verb, meaning, forms, note });

const LESSONS = [
  // ============================ LEKTION 1 ============================
  {
    id: 1,
    part: "a1.1",
    title: "Hallo! Wie geht's?",
    icon: "👋",
    lernziele: [
      { pt: "Cumprimentar e se despedir de forma adequada (formal vs informal)", en: "Greet and say goodbye appropriately (formal vs informal)" },
      { pt: "Apresentar-se dizendo nome e origem", en: "Introduce yourself with your name and origin" },
      { pt: "Perguntar o nome e a origem de outra pessoa", en: "Ask someone's name and where they are from" },
      { pt: "Dizer quais línguas fala e perguntar sobre as línguas de outra pessoa", en: "Say which languages you speak and ask about someone else's" },
      { pt: "Usar corretamente as formas de tratamento du (informal) e Sie (formal)", en: "Correctly use the forms of address du (informal) and Sie (formal)" },
      { pt: "Perguntar e responder como está (Wie geht es Ihnen/dir?)", en: "Ask and answer how someone is doing (Wie geht es Ihnen/dir?)" },
    ],
    redemittel: [
      { group: { pt: "Saudações", en: "Greetings" }, items: [
        ["Guten Tag!", { pt: "Bom dia/Boa tarde (formal, durante o dia)", en: "Good day (formal, during the day)" }],
        ["Guten Morgen!", { pt: "Bom dia (até ~10h)", en: "Good morning (until ~10am)" }],
        ["Guten Abend!", { pt: "Boa noite (a partir das 18h)", en: "Good evening (from 6pm)" }],
        ["Hallo! / Hi!", { pt: "Olá (informal, amigos e colegas jovens)", en: "Hello / Hi (informal, friends and young colleagues)" }],
        ["Tag! / Morgen!", { pt: "Oi (muito informal, só com conhecidos)", en: "Hi / Morning (very informal, only with people you know)" }],
      ]},
      { group: { pt: "Despedidas", en: "Farewells" }, items: [
        ["Auf Wiedersehen!", { pt: "Até logo (formal)", en: "Goodbye (formal)" }],
        ["Tschüss!", { pt: "Tchau (informal, mais comum)", en: "Bye (informal, most common)" }],
        ["Bis morgen! / Bis bald! / Bis später!", { pt: "Até amanhã / Até logo / Até mais", en: "See you tomorrow / soon / later" }],
        ["Gute Nacht!", { pt: "Boa noite (ao dormir)", en: "Good night (when going to sleep)" }],
      ]},
      { group: { pt: "Apresentação", en: "Introducing yourself" }, items: [
        ["Guten Tag, mein Name ist … / Ich heiße …", { pt: "Meu nome é… / Eu me chamo…", en: "My name is… / I'm called…" }],
        ["Wie heißen Sie? (formal) / Wie heißt du? (informal)", { pt: "Como o(a) senhor(a) se chama? / Como você se chama?", en: "What's your name? (formal / informal)" }],
        ["Entschuldigung, wie bitte?", { pt: "Desculpe, como?", en: "Sorry, what was that?" }],
      ]},
      { group: { pt: "Origem e línguas", en: "Origin and languages" }, items: [
        ["Woher kommen Sie? / Woher kommst du?", { pt: "De onde o(a) senhor(a) vem? / De onde você vem?", en: "Where are you from? (formal / informal)" }],
        ["Ich komme aus Brasilien / aus dem Iran / aus Polen…", { pt: "Eu venho do Brasil / do Irã / da Polônia…", en: "I'm from Brazil / Iran / Poland…" }],
        ["Welche Sprache sprechen Sie? / sprichst du?", { pt: "Que língua o(a) senhor(a) fala? / você fala?", en: "Which language do you speak? (formal / informal)" }],
        ["Ich spreche Portugiesisch, ein bisschen Deutsch und Englisch.", { pt: "Eu falo português, um pouco de alemão e inglês.", en: "I speak Portuguese, a little German and English." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "A. Verbos no Presente (Indikativ Präsens)", en: "A. Verbs in the present (Indikativ Präsens)" },
        body: { pt: "Os verbos mais importantes desta Lektion são: heißen, kommen, sein, sprechen.", en: "The most important verbs in this Lektion are: heißen, kommen, sein, sprechen." },
        tables: [
          conj("heißen", { pt: "chamar-se", en: "to be called" }, ["ich heiße", "du heißt", "er/sie/es heißt", "wir heißen", "ihr heißt", "sie/Sie heißen"], { pt: 'Ex.: "Mein Name ist Ella Krüger." / "Ich heiße Karim Moussa."', en: 'E.g.: "Mein Name ist Ella Krüger." / "Ich heiße Karim Moussa."' }),
          conj("kommen", { pt: "vir / ser de", en: "to come / be from" }, ["ich komme", "du kommst", "er/sie/es kommt", "wir kommen", "ihr kommt", "sie/Sie kommen"], { pt: 'Ex.: "Ich komme aus Polen." / "Woher kommen Sie?"', en: 'E.g.: "Ich komme aus Polen." / "Woher kommen Sie?"' }),
          conj("sein", { pt: "ser/estar", en: "to be" }, ["ich bin", "du bist", "er/sie/es ist", "wir sind", "ihr seid", "sie/Sie sind"], { pt: 'Ex.: "Ich bin Laura Salewska." / "Wer ist das?"', en: 'E.g.: "Ich bin Laura Salewska." / "Wer ist das?"' }),
          conj("sprechen", { pt: "falar", en: "to speak" }, ["ich spreche", "du sprichst", "er/sie/es spricht", "wir sprechen", "ihr sprecht", "sie/Sie sprechen"], { pt: 'Mudança e→i no singular. Ex.: "Welche Sprache sprechen Sie?"', en: 'Vowel change e→i in the singular. E.g.: "Welche Sprache sprechen Sie?"' }),
        ],
      },
      {
        heading: { pt: "B. Uso de du vs Sie", en: "B. Using du vs Sie" },
        body: { pt: "du = você (informal): amigos, familiares, colegas da mesma idade ou mais jovens, crianças.\nSie = o senhor / a senhora (formal): pessoas mais velhas, desconhecidos, situações profissionais, professores, médicos, etc.", en: "du = informal 'you': friends, family, colleagues your age or younger, children.\nSie = formal 'you': older people, strangers, professional situations, teachers, doctors, etc." },
      },
    ],
    atencao: { pt: 'No Brasil usamos "você" para quase todo mundo. Em alemão isso pode soar muito informal ou até rude. Quando em dúvida, comece sempre com Sie e espere a outra pessoa oferecer o "du" (comum entre jovens: "Wir können du sagen").', en: 'In English there is only one "you", so the du/Sie distinction is easy to forget. Using du with the wrong person can sound too casual or even rude. When in doubt, start with Sie and wait for the other person to offer the "du" (common among young people: "Wir können du sagen").' },
    vocab: [
      { de: "Brasilien", pt: "Brasil", en: "Brazil", art: "(das)", cat: "Países" },
      { de: "der Iran", pt: "Irã", en: "Iran", art: "der", cat: "Países" },
      { de: "der Irak", pt: "Iraque", en: "Iraq", art: "der", cat: "Países" },
      { de: "Polen", pt: "Polônia", en: "Poland", art: "(das)", cat: "Países" },
      { de: "Syrien", pt: "Síria", en: "Syria", art: "(das)", cat: "Países" },
      { de: "die Türkei", pt: "Turquia", en: "Turkey", art: "die", cat: "Países" },
      { de: "die Ukraine", pt: "Ucrânia", en: "Ukraine", art: "die", cat: "Países" },
      { de: "Deutschland", pt: "Alemanha", en: "Germany", art: "(das)", cat: "Países" },
      { de: "Afghanistan", pt: "Afeganistão", en: "Afghanistan", art: "(das)", cat: "Países" },
      { de: "Eritrea", pt: "Eritreia", en: "Eritrea", art: "(das)", cat: "Países" },
      { de: "Deutsch", pt: "alemão (língua)", en: "German (language)", art: "das", cat: "Línguas" },
      { de: "Englisch", pt: "inglês", en: "English", art: "das", cat: "Línguas" },
      { de: "Portugiesisch", pt: "português", en: "Portuguese", art: "das", cat: "Línguas" },
      { de: "Arabisch", pt: "árabe", en: "Arabic", art: "das", cat: "Línguas" },
      { de: "Französisch", pt: "francês", en: "French", art: "das", cat: "Línguas" },
      { de: "Türkisch", pt: "turco", en: "Turkish", art: "das", cat: "Línguas" },
      { de: "Russisch", pt: "russo", en: "Russian", art: "das", cat: "Línguas" },
      { de: "Farsi", pt: "persa", en: "Farsi (Persian)", art: "das", cat: "Línguas" },
    ],
    prompts: [
      { title: { pt: "Gramática + Exemplos", en: "Grammar + Examples" }, text: { pt: "Atue como professor de alemão para brasileiros no nível A1. Explique detalhadamente a diferença entre 'du' e 'Sie' com pelo menos 8 exemplos de situações reais do dia a dia. Depois crie um pequeno diálogo de apresentação onde uma pessoa usa Sie e depois oferece o du.", en: "Act as a German teacher for English speakers at level A1. Explain in detail the difference between 'du' and 'Sie' with at least 8 examples of real everyday situations. Then create a short introduction dialogue where one person uses Sie and later offers the du." } },
      { title: { pt: "Speaking Practice", en: "Speaking Practice" }, text: { pt: "Crie um role-play de 10 linhas entre duas pessoas que se conhecem pela primeira vez em um curso de alemão. Uma pessoa é formal no início. Inclua: cumprimento, nome, origem, línguas que fala e como está. Eu serei o estudante. Corrija meus erros de forma construtiva no final.", en: "Create a 10-line role-play between two people meeting for the first time in a German course. One person is formal at first. Include: greeting, name, origin, languages spoken and how they are. I'll be the student. Correct my mistakes constructively at the end." } },
    ],
  },

  // ============================ LEKTION 2 ============================
  {
    id: 2,
    part: "a1.1",
    title: "Meine Familie und ich",
    icon: "👨‍👩‍👧",
    lernziele: [
      { pt: "Apresentar e descrever os membros da família", en: "Introduce and describe family members" },
      { pt: "Usar corretamente os artigos possessivos mein / meine", en: "Correctly use the possessive articles mein / meine" },
      { pt: "Usar o verbo sein no presente com singular e plural", en: "Use the verb sein in the present, singular and plural" },
      { pt: "Dizer números de 0 a 20 e a idade", en: "Say numbers 0–20 and ages" },
      { pt: 'Diferenciar "Das ist…" (singular) e "Das sind…" (plural)', en: 'Tell apart "Das ist…" (singular) and "Das sind…" (plural)' },
    ],
    redemittel: [
      { group: { pt: "Família e idade", en: "Family and age" }, items: [
        ["Das ist mein Bruder.", { pt: "Este é meu irmão.", en: "This is my brother." }],
        ["Das sind meine Eltern.", { pt: "Estes são meus pais.", en: "These are my parents." }],
        ["Wie alt bist du? / Wie alt sind Sie?", { pt: "Quantos anos você tem? / o(a) senhor(a) tem?", en: "How old are you? (informal / formal)" }],
        ["Ich bin 30 Jahre alt.", { pt: "Eu tenho 30 anos.", en: "I'm 30 years old." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "A. Artigos Possessivos (mein / meine)", en: "A. Possessive articles (mein / meine)" },
        body: { pt: "O possessivo muda conforme o gênero e número do substantivo:\nmein + masculino/neutro: mein Vater, mein Sohn, mein Kind\nmeine + feminino/plural: meine Mutter, meine Schwester, meine Eltern, meine Kinder", en: "The possessive changes with the gender and number of the noun:\nmein + masculine/neuter: mein Vater, mein Sohn, mein Kind\nmeine + feminine/plural: meine Mutter, meine Schwester, meine Eltern, meine Kinder" },
      },
      {
        heading: { pt: "B. Verbo sein — conjugação completa", en: "B. The verb sein — full conjugation" },
        tables: [
          conj("sein", { pt: "ser/estar", en: "to be" }, ["ich bin", "du bist", "er/sie/es ist", "wir sind", "ihr seid", "sie/Sie sind"], { pt: '"Das ist mein Bruder." (sing.) vs "Das sind meine Eltern." (plur.)', en: '"Das ist mein Bruder." (sing.) vs "Das sind meine Eltern." (plur.)' }),
        ],
      },
    ],
    atencao: { pt: 'Em português dizemos "meu pai", "minha mãe", "meus pais". Em alemão é mein Vater / meine Mutter / meine Eltern — o plural sempre usa "meine". E muitos alunos erram dizendo "Das ist meine Eltern": o correto é "Das sind meine Eltern" porque Eltern é plural.', en: 'English "my" never changes, but German does: mein Vater / meine Mutter / meine Eltern — the plural always uses "meine". A common mistake is "Das ist meine Eltern": the correct form is "Das sind meine Eltern" because Eltern is plural.' },
    vocab: [
      { de: "der Vater", pt: "pai", en: "father", art: "der", plural: "die Väter", cat: "Família" },
      { de: "die Mutter", pt: "mãe", en: "mother", art: "die", plural: "die Mütter", cat: "Família" },
      { de: "der Sohn", pt: "filho", en: "son", art: "der", plural: "die Söhne", cat: "Família" },
      { de: "die Tochter", pt: "filha", en: "daughter", art: "die", plural: "die Töchter", cat: "Família" },
      { de: "das Kind", pt: "criança/filho(a)", en: "child", art: "das", plural: "die Kinder", cat: "Família" },
      { de: "der Bruder", pt: "irmão", en: "brother", art: "der", plural: "die Brüder", cat: "Família" },
      { de: "die Schwester", pt: "irmã", en: "sister", art: "die", plural: "die Schwestern", cat: "Família" },
      { de: "die Eltern", pt: "pais", en: "parents", art: "die", plural: "(sempre plural)", cat: "Família" },
      { de: "die Geschwister", pt: "irmãos (em geral)", en: "siblings", art: "die", plural: "(sempre plural)", cat: "Família" },
      { de: "die Frau", pt: "mulher/esposa", en: "woman / wife", art: "die", plural: "die Frauen", cat: "Família" },
      { de: "der Mann", pt: "homem/marido", en: "man / husband", art: "der", plural: "die Männer", cat: "Família" },
    ],
    numbers: { title: { pt: "Números 0–20", en: "Numbers 0–20" }, list: [
      ["0", "null"], ["1", "eins"], ["2", "zwei"], ["3", "drei"], ["4", "vier"], ["5", "fünf"],
      ["6", "sechs"], ["7", "sieben"], ["8", "acht"], ["9", "neun"], ["10", "zehn"],
      ["11", "elf"], ["12", "zwölf"], ["13", "dreizehn"], ["14", "vierzehn"], ["15", "fünfzehn"],
      ["16", "sechzehn"], ["17", "siebzehn"], ["18", "achtzehn"], ["19", "neunzehn"], ["20", "zwanzig"],
    ]},
    prompts: [
      { title: { pt: "Família + possessivos", en: "Family + possessives" }, text: { pt: "Atue como professor de alemão A1 para brasileiros. Crie 12 frases sobre uma família fictícia usando mein/meine corretamente, misturando singular e plural, e explique cada escolha do artigo possessivo.", en: "Act as an A1 German teacher for English speakers. Create 12 sentences about a fictional family using mein/meine correctly, mixing singular and plural, and explain each choice of possessive article." } },
    ],
  },

  // ============================ LEKTION 3 ============================
  {
    id: 3,
    part: "a1.1",
    title: "Im Deutschkurs",
    icon: "🏫",
    lernziele: [
      { pt: "Perguntar o nome de objetos e coisas na sala de aula", en: "Ask the names of objects and things in the classroom" },
      { pt: "Usar corretamente as formas de pergunta com du e Sie", en: "Correctly use question forms with du and Sie" },
      { pt: "Fazer e responder perguntas sobre identidade (Wer bist du? / Wer sind Sie?)", en: "Ask and answer questions about identity (Wer bist du? / Wer sind Sie?)" },
      { pt: "Praticar o alfabeto alemão, especialmente ä, ö, ü e ß", en: "Practise the German alphabet, especially ä, ö, ü and ß" },
    ],
    redemittel: [
      { group: { pt: "Perguntas na sala", en: "Classroom questions" }, items: [
        ["Wer bist du? / Wer sind Sie?", { pt: "Quem é você? / Quem é o(a) senhor(a)?", en: "Who are you? (informal / formal)" }],
        ["Wie heißt das auf Deutsch?", { pt: "Como se diz isso em alemão?", en: "What's that called in German?" }],
        ["Wie schreibt man das?", { pt: "Como se escreve isso?", en: "How do you spell that?" }],
        ["Was ist das?", { pt: "O que é isso?", en: "What is that?" }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "Perguntas (W-Fragen) mais importantes", en: "Most important question words (W-Fragen)" },
        body: { pt: "Wer …? (quem) · Wie …? (como) · Was …? (o quê). Note a diferença du/Sie na forma do verbo: Wer bist du? vs Wer sind Sie?", en: "Wer …? (who) · Wie …? (how) · Was …? (what). Note the du/Sie difference in the verb form: Wer bist du? vs Wer sind Sie?" },
      },
    ],
    atencao: { pt: "O alfabeto alemão tem letras especiais. Treine bem os sons de ä, ö, ü e ß — eles mudam o significado das palavras.", en: "The German alphabet has special letters. Practise the sounds of ä, ö, ü and ß carefully — they change the meaning of words." },
    alphabet: {
      title: { pt: "Alfabeto Alemão", en: "German alphabet" },
      special: [
        ["ä", { pt: 'como "é" em português', en: 'like the "e" in "bed"' }, "Mädchen, Käse"],
        ["ö", { pt: 'som entre "e" e "o"', en: 'like the "i" in "bird" (rounded lips)' }, "schön, hören"],
        ["ü", { pt: 'como "i" com lábios arredondados', en: 'say "ee" with rounded lips' }, "über, Müller"],
        ["ß", { pt: '"ss" — nunca no início de palavra', en: '"ss" — never at the start of a word' }, "Straße, groß"],
      ],
    },
    vocab: [
      { de: "der Tisch", pt: "mesa", en: "table", art: "der", plural: "die Tische", cat: "Sala de aula" },
      { de: "der Stuhl", pt: "cadeira", en: "chair", art: "der", plural: "die Stühle", cat: "Sala de aula" },
      { de: "das Buch", pt: "livro", en: "book", art: "das", plural: "die Bücher", cat: "Sala de aula" },
      { de: "der Kugelschreiber", pt: "caneta", en: "pen", art: "der", plural: "die Kugelschreiber", cat: "Sala de aula" },
      { de: "der Bleistift", pt: "lápis", en: "pencil", art: "der", plural: "die Bleistifte", cat: "Sala de aula" },
      { de: "die Tafel", pt: "quadro/lousa", en: "board", art: "die", plural: "die Tafeln", cat: "Sala de aula" },
      { de: "das Heft", pt: "caderno", en: "notebook", art: "das", plural: "die Hefte", cat: "Sala de aula" },
      { de: "die Tür", pt: "porta", en: "door", art: "die", plural: "die Türen", cat: "Sala de aula" },
    ],
    prompts: [
      { title: { pt: "Soletrar e perguntar", en: "Spelling and asking" }, text: { pt: "Atue como professor de alemão A1. Faça um exercício comigo de soletrar 10 palavras alemãs com ä, ö, ü e ß usando o alfabeto. Depois me faça perguntas 'Wie heißt das auf Deutsch?' sobre objetos da sala de aula.", en: "Act as an A1 German teacher. Do a spelling exercise with me: 10 German words with ä, ö, ü and ß using the alphabet. Then ask me 'Wie heißt das auf Deutsch?' about classroom objects." } },
    ],
  },

  // ============================ LEKTION 4 ============================
  {
    id: 4,
    part: "a1.1",
    title: "Im Supermarkt",
    icon: "🛒",
    lernziele: [
      { pt: "Falar sobre alimentos que gosta e não gosta", en: "Talk about foods you like and dislike" },
      { pt: "Usar os verbos mögen e essen com as mudanças de vogal", en: "Use the verbs mögen and essen with their vowel changes" },
      { pt: "Formar o plural de alimentos corretamente", en: "Form the plural of foods correctly" },
      { pt: "Usar artigos definidos (der/die/das) e indefinidos (ein/eine/ein) no nominativo", en: "Use definite (der/die/das) and indefinite (ein/eine/ein) articles in the nominative" },
    ],
    redemittel: [
      { group: { pt: "Gostos", en: "Likes" }, items: [
        ["Magst du Obstsalat?", { pt: "Você gosta de salada de frutas?", en: "Do you like fruit salad?" }],
        ["Ja, aber ich mag keine Äpfel.", { pt: "Sim, mas não gosto de maçãs.", en: "Yes, but I don't like apples." }],
        ["Was isst du gern?", { pt: "O que você gosta de comer?", en: "What do you like to eat?" }],
        ["Ich esse gern Tomaten.", { pt: "Eu gosto de comer tomates.", en: "I like eating tomatoes." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "A. Verbos com mudança de vogal", en: "A. Verbs with a vowel change" },
        tables: [
          conj("mögen", { pt: "gostar", en: "to like" }, ["ich mag", "du magst", "er/sie/es mag", "wir mögen", "ihr mögt", "sie/Sie mögen"], { pt: "Mudança ö→a no singular.", en: "Vowel change ö→a in the singular." }),
          conj("essen", { pt: "comer", en: "to eat" }, ["ich esse", "du isst", "er/sie/es isst", "wir essen", "ihr esst", "sie/Sie essen"], { pt: "Mudança e→i no singular (du, er/sie/es).", en: "Vowel change e→i in the singular (du, er/sie/es)." }),
        ],
      },
      {
        heading: { pt: "B. Plural de alimentos (padrões comuns)", en: "B. Plural of foods (common patterns)" },
        body: { pt: "-e: der Apfel → die Äpfel (com Umlaut)\n-en: die Banane → die Bananen\n-s: das Auto → die Autos\nsem terminação + Umlaut: der Apfel → die Äpfel\nMuitos alimentos no plural têm Umlaut: Äpfel, Möhren, etc.", en: "-e: der Apfel → die Äpfel (with Umlaut)\n-en: die Banane → die Bananen\n-s: das Auto → die Autos\nno ending + Umlaut: der Apfel → die Äpfel\nMany foods take an Umlaut in the plural: Äpfel, Möhren, etc." },
      },
      {
        heading: { pt: "C. Artigos no Nominativo", en: "C. Articles in the nominative" },
        body: { pt: "Definidos: der (masc) / die (fem) / das (neutro) / die (plural)\nIndefinidos: ein (masc/neutro) / eine (fem) / — (plural não tem indefinido)\nEx.: das Brot, ein Brot · die Tomate, eine Tomate · die Äpfel (sem indefinido).", en: "Definite: der (masc) / die (fem) / das (neuter) / die (plural)\nIndefinite: ein (masc/neuter) / eine (fem) / — (no indefinite plural)\nE.g.: das Brot, ein Brot · die Tomate, eine Tomate · die Äpfel (no indefinite)." },
      },
    ],
    atencao: { pt: 'Muitos alimentos no plural ganham Umlaut. Não diga "die Apfel" — o correto é "die Äpfel".', en: 'Many foods take an Umlaut in the plural. Don\'t say "die Apfel" — the correct form is "die Äpfel".' },
    vocab: [
      { de: "der Apfel", pt: "maçã", en: "apple", art: "der", plural: "die Äpfel", cat: "Alimentos" },
      { de: "die Banane", pt: "banana", en: "banana", art: "die", plural: "die Bananen", cat: "Alimentos" },
      { de: "die Tomate", pt: "tomate", en: "tomato", art: "die", plural: "die Tomaten", cat: "Alimentos" },
      { de: "die Möhre", pt: "cenoura", en: "carrot", art: "die", plural: "die Möhren", cat: "Alimentos" },
      { de: "das Brot", pt: "pão", en: "bread", art: "das", plural: "die Brote", cat: "Alimentos" },
      { de: "der Käse", pt: "queijo", en: "cheese", art: "der", plural: "die Käse", cat: "Alimentos" },
      { de: "die Milch", pt: "leite", en: "milk", art: "die", plural: "—", cat: "Alimentos" },
      { de: "das Ei", pt: "ovo", en: "egg", art: "das", plural: "die Eier", cat: "Alimentos" },
      { de: "das Wasser", pt: "água", en: "water", art: "das", plural: "—", cat: "Alimentos" },
    ],
    prompts: [
      { title: { pt: "Compras e gostos", en: "Shopping and tastes" }, text: { pt: "Atue como vendedor de supermercado alemão (A1). Faça um diálogo comigo onde eu digo o que gosto e não gosto de comer, usando mögen e essen corretamente. Corrija as mudanças de vogal e os plurais que eu errar.", en: "Act as a German supermarket clerk (A1). Have a dialogue with me where I say what I like and dislike eating, using mögen and essen correctly. Correct the vowel changes and plurals I get wrong." } },
    ],
  },

  // ============================ LEKTION 5 ============================
  {
    id: 5,
    part: "a1.1",
    title: "Von morgens bis abends",
    icon: "⏰",
    lernziele: [
      { pt: "Dizer as horas de forma precisa", en: "Tell the time precisely" },
      { pt: "Falar sobre a rotina diária", en: "Talk about your daily routine" },
      { pt: "Usar preposições temporais (um, von…bis, am, im)", en: "Use time prepositions (um, von…bis, am, im)" },
      { pt: "Fazer e responder perguntas sobre horários", en: "Ask and answer questions about times/schedules" },
    ],
    redemittel: [
      { group: { pt: "Horas", en: "Telling the time" }, items: [
        ["Es ist 8 Uhr.", { pt: "São 8:00", en: "It's 8:00" }],
        ["Es ist halb 9.", { pt: "São 8:30", en: "It's 8:30 ('half to 9')" }],
        ["Es ist Viertel vor 9.", { pt: "São 8:45", en: "It's 8:45 (quarter to 9)" }],
        ["Es ist Viertel nach 8.", { pt: "São 8:15", en: "It's 8:15 (quarter past 8)" }],
        ["Es ist zwanzig nach 8.", { pt: "São 8:20", en: "It's 8:20 (twenty past 8)" }],
        ["Es ist fünf vor halb 9.", { pt: "São 8:25", en: "It's 8:25 ('five before half 9')" }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "Preposições Temporais", en: "Time prepositions" },
        body: { pt: "um + hora: um 9 Uhr, um halb 10\nvon … bis: von 8 bis 12 Uhr\nam + dia: am Montag, am 15. Juli\nim + mês/estação: im Juli, im Sommer", en: "um + clock time: um 9 Uhr, um halb 10\nvon … bis: von 8 bis 12 Uhr\nam + day: am Montag, am 15. Juli\nim + month/season: im Juli, im Sommer" },
      },
    ],
    atencao: { pt: 'Atenção ao "halb": em alemão halb 9 = 8:30 (meia hora PARA as 9), não 9:30. É diferente do português!', en: 'Watch out for "halb": in German halb 9 = 8:30 (half an hour TO 9), not 9:30. It counts toward the next hour, unlike English "half past".' },
    vocab: [
      { de: "der Montag", pt: "segunda-feira", en: "Monday", art: "der", cat: "Dias da semana" },
      { de: "der Dienstag", pt: "terça-feira", en: "Tuesday", art: "der", cat: "Dias da semana" },
      { de: "der Mittwoch", pt: "quarta-feira", en: "Wednesday", art: "der", cat: "Dias da semana" },
      { de: "der Donnerstag", pt: "quinta-feira", en: "Thursday", art: "der", cat: "Dias da semana" },
      { de: "der Freitag", pt: "sexta-feira", en: "Friday", art: "der", cat: "Dias da semana" },
      { de: "der Samstag", pt: "sábado", en: "Saturday", art: "der", cat: "Dias da semana" },
      { de: "der Sonntag", pt: "domingo", en: "Sunday", art: "der", cat: "Dias da semana" },
      { de: "aufstehen", pt: "levantar-se", en: "to get up", art: "(Verb)", cat: "Rotina" },
      { de: "frühstücken", pt: "tomar café da manhã", en: "to have breakfast", art: "(Verb)", cat: "Rotina" },
      { de: "arbeiten", pt: "trabalhar", en: "to work", art: "(Verb)", cat: "Rotina" },
      { de: "schlafen", pt: "dormir", en: "to sleep", art: "(Verb)", cat: "Rotina" },
    ],
    prompts: [
      { title: { pt: "Minha rotina", en: "My routine" }, text: { pt: "Atue como professor de alemão A1. Me pergunte sobre minha rotina diária (a que horas eu acordo, trabalho, almoço, durmo) e corrija meu uso das horas e das preposições um/von…bis/am/im.", en: "Act as an A1 German teacher. Ask me about my daily routine (what time I wake up, work, have lunch, sleep) and correct my use of the clock times and the prepositions um/von…bis/am/im." } },
    ],
  },

  // ============================ LEKTION 6 ============================
  {
    id: 6,
    part: "a1.1",
    title: "Auf Wohnungssuche",
    icon: "🏠",
    lernziele: [
      { pt: "Descrever uma casa ou apartamento", en: "Describe a house or apartment" },
      { pt: "Usar preposições locativas com o caso correto (Dativ)", en: "Use location prepositions with the correct case (Dativ)" },
      { pt: "Falar sobre móveis e eletrodomésticos", en: "Talk about furniture and appliances" },
      { pt: "Escrever um e-mail simples sobre uma visita", en: "Write a simple email about a visit" },
    ],
    redemittel: [
      { group: { pt: "Descrever moradia", en: "Describing a home" }, items: [
        ["Das Sofa steht im Wohnzimmer.", { pt: "O sofá fica na sala.", en: "The sofa is in the living room." }],
        ["Der Tisch steht in der Küche.", { pt: "A mesa fica na cozinha.", en: "The table is in the kitchen." }],
        ["Die Wohnung hat drei Zimmer.", { pt: "O apartamento tem três cômodos.", en: "The apartment has three rooms." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "Preposições Locativas + Dativ", en: "Location prepositions + Dativ" },
        body: { pt: "in + Dativ → im / in der: im Wohnzimmer, in der Küche\nauf + Dativ → auf dem: auf dem Tisch, auf dem Boden\nunter + Dativ → unter dem: unter dem Bett\nneben + Dativ → neben dem/der: neben dem Schrank\nhinter + Dativ → hinter der Tür\nvor + Dativ → vor dem Haus\nzwischen + Dativ → zwischen dem Bett und dem Schrank", en: "in + Dativ → im / in der: im Wohnzimmer, in der Küche\nauf + Dativ → auf dem: auf dem Tisch, auf dem Boden\nunter + Dativ → unter dem: unter dem Bett\nneben + Dativ → neben dem/der: neben dem Schrank\nhinter + Dativ → hinter der Tür\nvor + Dativ → vor dem Haus\nzwischen + Dativ → zwischen dem Bett und dem Schrank" },
      },
    ],
    atencao: { pt: "Para LOCALIZAÇÃO (Wo? — onde algo está), use Dativ: im Wohnzimmer, auf dem Tisch. Não confunda com direção (Wohin?), que vem na Lektion 7.", en: "For LOCATION (Wo? — where something is), use the Dativ: im Wohnzimmer, auf dem Tisch. Don't confuse it with direction (Wohin?), which comes in Lektion 7." },
    vocab: [
      { de: "das Wohnzimmer", pt: "sala de estar", en: "living room", art: "das", cat: "Cômodos" },
      { de: "das Schlafzimmer", pt: "quarto", en: "bedroom", art: "das", cat: "Cômodos" },
      { de: "die Küche", pt: "cozinha", en: "kitchen", art: "die", cat: "Cômodos" },
      { de: "das Bad", pt: "banheiro", en: "bathroom", art: "das", cat: "Cômodos" },
      { de: "der Flur", pt: "corredor", en: "hallway", art: "der", cat: "Cômodos" },
      { de: "der Balkon", pt: "varanda", en: "balcony", art: "der", cat: "Cômodos" },
      { de: "das Bett", pt: "cama", en: "bed", art: "das", cat: "Móveis" },
      { de: "der Tisch", pt: "mesa", en: "table", art: "der", cat: "Móveis" },
      { de: "der Stuhl", pt: "cadeira", en: "chair", art: "der", cat: "Móveis" },
      { de: "der Schrank", pt: "armário", en: "wardrobe / cupboard", art: "der", cat: "Móveis" },
      { de: "das Sofa", pt: "sofá", en: "sofa", art: "das", cat: "Móveis" },
      { de: "der Fernseher", pt: "televisão", en: "television", art: "der", cat: "Móveis" },
      { de: "die Waschmaschine", pt: "máquina de lavar", en: "washing machine", art: "die", cat: "Eletrodomésticos" },
      { de: "der Kühlschrank", pt: "geladeira", en: "fridge", art: "der", cat: "Eletrodomésticos" },
      { de: "die Spülmaschine", pt: "lava-louças", en: "dishwasher", art: "die", cat: "Eletrodomésticos" },
    ],
    prompts: [
      { title: { pt: "Descrever meu apartamento", en: "Describe my apartment" }, text: { pt: "Atue como professor de alemão A1. Vou descrever onde estão os móveis no meu apartamento. Corrija meu uso das preposições locativas com Dativ (im, in der, auf dem, unter dem, neben dem…).", en: "Act as an A1 German teacher. I'll describe where the furniture is in my apartment. Correct my use of the location prepositions with Dativ (im, in der, auf dem, unter dem, neben dem…)." } },
    ],
  },

  // ============================ LEKTION 7 ============================
  {
    id: 7,
    part: "a1.2",
    title: "In der Stadt unterwegs",
    icon: "🚆",
    highlight: { pt: "A mais importante do A1.2", en: "The most important one in A1.2" },
    lernziele: [
      { pt: "Falar sobre meios de transporte e preferências", en: "Talk about means of transport and preferences" },
      { pt: "Usar fahren e nehmen com os casos corretos (Dativ e Akkusativ)", en: "Use fahren and nehmen with the correct cases (Dativ and Akkusativ)" },
      { pt: "Perguntar e dar direções na cidade", en: "Ask for and give directions in the city" },
      { pt: "Usar preposições locais com o caso correto", en: "Use location prepositions with the correct case" },
      { pt: "Usar o imperativo formal (Sie-Form)", en: "Use the formal imperative (Sie-Form)" },
    ],
    redemittel: [
      { group: { pt: "Direções", en: "Directions" }, items: [
        ["Gehen Sie hier immer geradeaus.", { pt: "Vá sempre em frente.", en: "Go straight ahead here." }],
        ["An der Kreuzung / Ampel gehen Sie links / rechts.", { pt: "No cruzamento / semáforo vire à esquerda / direita.", en: "At the crossroads / traffic light go left / right." }],
        ["Nehmen Sie die erste / zweite / dritte Straße links.", { pt: "Pegue a primeira / segunda / terceira rua à esquerda.", en: "Take the first / second / third street on the left." }],
        ["Nach ungefähr 400 Metern sehen Sie den Bahnhof.", { pt: "Depois de uns 400 metros você vê a estação.", en: "After about 400 metres you'll see the station." }],
        ["Die Bushaltestelle ist gegenüber der Bank.", { pt: "O ponto de ônibus é em frente ao banco.", en: "The bus stop is opposite the bank." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "A. fahren e nehmen (conjugação completa)", en: "A. fahren and nehmen (full conjugation)" },
        tables: [
          conj("fahren", { pt: "dirigir / ir de transporte", en: "to drive / go by vehicle" }, ["ich fahre", "du fährst", "er/sie/es fährt", "wir fahren", "ihr fahrt", "sie/Sie fahren"], { pt: 'Mudança a→ä. Ex.: "Ich fahre mit der Straßenbahn." / "Fährst du mit dem Bus?"', en: 'Vowel change a→ä. E.g.: "Ich fahre mit der Straßenbahn." / "Fährst du mit dem Bus?"' }),
          conj("nehmen", { pt: "pegar / usar transporte", en: "to take (transport)" }, ["ich nehme", "du nimmst", "er/sie/es nimmt", "wir nehmen", "ihr nehmt", "sie/Sie nehmen"], { pt: 'Mudança e→i. Ex.: "Wir nehmen die U-Bahn." / "Nimmst du den Bus um 8 Uhr?"', en: 'Vowel change e→i. E.g.: "Wir nehmen die U-Bahn." / "Nimmst du den Bus um 8 Uhr?"' }),
        ],
      },
      {
        heading: { pt: "B. Preposições Locais — Casos", en: "B. Location prepositions — cases" },
        body: { pt: "Regra de ouro: localização (Wo?) → Dativ; direção/movimento (Wohin?) → Akkusativ (em algumas preposições).\nSempre Dativ:\nmit + Dativ: mit dem Bus, mit der U-Bahn, mit dem Auto\nzu + Dativ: zum Arzt, zur Apotheke (zu+dem=zum / zu+der=zur)\nin + Dativ: im Supermarkt, in der Apotheke\nan + Dativ: am Bahnhof, an der Bushaltestelle\nbei + Dativ: beim Arzt, bei der Ärztin\nneben / hinter / vor / unter / über + Dativ", en: "Golden rule: location (Wo?) → Dativ; direction/movement (Wohin?) → Akkusativ (with some prepositions).\nAlways Dativ:\nmit + Dativ: mit dem Bus, mit der U-Bahn, mit dem Auto\nzu + Dativ: zum Arzt, zur Apotheke (zu+dem=zum / zu+der=zur)\nin + Dativ: im Supermarkt, in der Apotheke\nan + Dativ: am Bahnhof, an der Bushaltestelle\nbei + Dativ: beim Arzt, bei der Ärztin\nneben / hinter / vor / unter / über + Dativ" },
      },
      {
        heading: { pt: "C. Imperativo (Sie-Form) — dar instruções", en: "C. Imperative (Sie-Form) — giving instructions" },
        body: { pt: "Gehen Sie hier immer geradeaus.\nNehmen Sie die erste Straße links.\nFahren Sie mit der Linie 2 bis zum Hauptbahnhof.\nÉ mais educado que o imperativo informal — muito usado para direções.", en: "Gehen Sie hier immer geradeaus.\nNehmen Sie die erste Straße links.\nFahren Sie mit der Linie 2 bis zum Hauptbahnhof.\nIt's more polite than the informal imperative — very common for directions." },
      },
    ],
    atencao: { pt: "Não esqueça a mudança de vogal: ich fahre / du fährst, ich nehme / du nimmst. E confira o caso depois de zu (zum/zur).", en: "Don't forget the vowel change: ich fahre / du fährst, ich nehme / du nimmst. And check the case after zu (zum/zur)." },
    vocab: [
      { de: "der Bus", pt: "ônibus", en: "bus", art: "der", cat: "Transporte" },
      { de: "die Straßenbahn", pt: "bonde", en: "tram", art: "die", cat: "Transporte" },
      { de: "die U-Bahn", pt: "metrô", en: "underground / subway", art: "die", cat: "Transporte" },
      { de: "der Zug", pt: "trem", en: "train", art: "der", cat: "Transporte" },
      { de: "das Auto", pt: "carro", en: "car", art: "das", cat: "Transporte" },
      { de: "das Fahrrad", pt: "bicicleta", en: "bicycle", art: "das", cat: "Transporte" },
      { de: "der Bahnhof", pt: "estação de trem", en: "train station", art: "der", cat: "Cidade" },
      { de: "die Bushaltestelle", pt: "ponto de ônibus", en: "bus stop", art: "die", cat: "Cidade" },
      { de: "die Kreuzung", pt: "cruzamento", en: "crossroads", art: "die", cat: "Cidade" },
      { de: "die Ampel", pt: "semáforo", en: "traffic light", art: "die", cat: "Cidade" },
      { de: "die Apotheke", pt: "farmácia", en: "pharmacy", art: "die", cat: "Cidade" },
      { de: "die Bank", pt: "banco", en: "bank", art: "die", cat: "Cidade" },
    ],
    prompts: [
      { title: { pt: "Pedir direções", en: "Asking for directions" }, text: { pt: "Atue como morador de uma cidade alemã. Vou perguntar como chegar a lugares (Bahnhof, Apotheke, Supermarkt). Responda com imperativo Sie-Form e preposições corretas. Depois inverta: eu dou as direções e você corrige.", en: "Act as a resident of a German city. I'll ask how to get to places (Bahnhof, Apotheke, Supermarkt). Answer with the Sie-Form imperative and correct prepositions. Then switch: I give the directions and you correct me." } },
      { title: { pt: "Transportes", en: "Transport" }, text: { pt: "Atue como professor A1. Faça um exercício comigo usando fahren e nehmen com diferentes meios de transporte, cobrando a mudança de vogal e o caso correto (mit dem/der, den/die).", en: "Act as an A1 teacher. Do an exercise with me using fahren and nehmen with different means of transport, checking the vowel change and the correct case (mit dem/der, den/die)." } },
    ],
  },

  // ============================ LEKTION 8 ============================
  {
    id: 8,
    part: "a1.2",
    title: "Mein Beruf",
    icon: "💼",
    lernziele: [
      { pt: "Falar sobre profissão atual e desejada", en: "Talk about your current and desired job" },
      { pt: "Ler e entender anúncios de emprego simples", en: "Read and understand simple job ads" },
      { pt: "Fazer uma ligação para se candidatar a uma vaga", en: "Make a phone call to apply for a job" },
      { pt: "Descrever condições de trabalho usando o verbo haben", en: "Describe working conditions using the verb haben" },
    ],
    redemittel: [
      { group: { pt: "Trabalho", en: "Work" }, items: [
        ["Ich bin von Beruf Krankenpfleger.", { pt: "Sou enfermeiro de profissão.", en: "I'm a nurse by profession." }],
        ["Ich habe oft Stress.", { pt: "Tenho estresse com frequência.", en: "I'm often stressed." }],
        ["Ich habe manchmal frei.", { pt: "Às vezes tenho folga.", en: "I sometimes have a day off." }],
        ["Ich habe nie Nachtdienst.", { pt: "Nunca tenho plantão noturno.", en: "I never work night shifts." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "Verbo haben", en: "The verb haben" },
        tables: [
          conj("haben", { pt: "ter", en: "to have" }, ["ich habe", "du hast", "er/sie/es hat", "wir haben", "ihr habt", "sie/Sie haben"], { pt: "Uso: Ich habe (oft) Stress. / Ich habe (nie) Nachtdienst.", en: "Use: Ich habe (oft) Stress. / Ich habe (nie) Nachtdienst." }),
        ],
      },
    ],
    atencao: { pt: "Em alemão a profissão vem sem artigo após 'sein': Ich bin Lehrer (não 'ein Lehrer'). E muitas profissões têm forma feminina com -in: Lehrer → Lehrerin.", en: "In German a profession takes no article after 'sein': Ich bin Lehrer (not 'ein Lehrer'), unlike English 'I'm a teacher'. Many jobs have a feminine form with -in: Lehrer → Lehrerin." },
    vocab: [
      { de: "der Arzt / die Ärztin", pt: "médico(a)", en: "doctor", art: "der/die", cat: "Profissões" },
      { de: "der Lehrer / die Lehrerin", pt: "professor(a)", en: "teacher", art: "der/die", cat: "Profissões" },
      { de: "der Verkäufer / die Verkäuferin", pt: "vendedor(a)", en: "salesperson", art: "der/die", cat: "Profissões" },
      { de: "der Automechaniker / die Automechanikerin", pt: "mecânico(a)", en: "car mechanic", art: "der/die", cat: "Profissões" },
      { de: "der Fahrer / die Fahrerin", pt: "motorista", en: "driver", art: "der/die", cat: "Profissões" },
      { de: "der Koch / die Köchin", pt: "cozinheiro(a)", en: "cook / chef", art: "der/die", cat: "Profissões" },
      { de: "der Bürokaufmann / die Bürokauffrau", pt: "auxiliar administrativo", en: "office administrator", art: "der/die", cat: "Profissões" },
    ],
    prompts: [
      { title: { pt: "Candidatura por telefone", en: "Phone application" }, text: { pt: "Atue como recrutador de uma empresa alemã. Simule uma ligação onde eu me candidato a uma vaga: pergunte minha profissão, experiência e disponibilidade. Eu uso haben para descrever condições de trabalho. Corrija no final.", en: "Act as a recruiter at a German company. Simulate a call where I apply for a job: ask about my profession, experience and availability. I use haben to describe working conditions. Correct me at the end." } },
    ],
  },

  // ============================ LEKTION 9 ============================
  {
    id: 9,
    part: "a1.2",
    title: "Beim Arzt",
    icon: "🩺",
    lernziele: [
      { pt: "Descrever sintomas e dores", en: "Describe symptoms and pain" },
      { pt: "Marcar e remarcar consultas médicas", en: "Make and reschedule doctor's appointments" },
      { pt: "Entender instruções médicas simples", en: "Understand simple medical instructions" },
      { pt: "Comunicar ausência no trabalho por motivo de saúde (Krankmeldung)", en: "Report a sick day at work (Krankmeldung)" },
    ],
    redemittel: [
      { group: { pt: "Sintomas", en: "Symptoms" }, items: [
        ["Ich habe Kopfschmerzen.", { pt: "Estou com dor de cabeça.", en: "I have a headache." }],
        ["Ich habe Fieber.", { pt: "Estou com febre.", en: "I have a fever." }],
        ["Ich habe eine Erkältung.", { pt: "Estou resfriado(a).", en: "I have a cold." }],
        ["Mir tut der Bauch weh.", { pt: "Minha barriga dói.", en: "My stomach hurts." }],
        ["Ich möchte einen Termin machen.", { pt: "Quero marcar uma consulta.", en: "I'd like to make an appointment." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: 'Expressões com "haben" para sintomas', en: 'Expressions with "haben" for symptoms' },
        body: { pt: "Ich habe Kopfschmerzen / Halsschmerzen / Rückenschmerzen / Ohrenschmerzen / Zahnschmerzen.\nIch habe Fieber. / Ich habe eine Erkältung. / Ich habe Schnupfen.\nMir tut der Kopf / der Bauch / der Rücken weh.", en: "Ich habe Kopfschmerzen / Halsschmerzen / Rückenschmerzen / Ohrenschmerzen / Zahnschmerzen.\nIch habe Fieber. / Ich habe eine Erkältung. / Ich habe Schnupfen.\nMir tut der Kopf / der Bauch / der Rücken weh." },
      },
    ],
    atencao: { pt: 'Use "Ich habe …schmerzen" para dores específicas, ou "Mir tut … weh" para uma parte do corpo. Os dois são comuns na consulta.', en: 'Use "Ich habe …schmerzen" for specific aches, or "Mir tut … weh" for a body part. Both are common at the doctor\'s.' },
    vocab: [
      { de: "der Hausarzt", pt: "clínico geral", en: "family doctor / GP", art: "der", cat: "Médicos" },
      { de: "der Zahnarzt", pt: "dentista", en: "dentist", art: "der", cat: "Médicos" },
      { de: "der HNO-Arzt", pt: "otorrino", en: "ENT doctor", art: "der", cat: "Médicos" },
      { de: "der Orthopäde", pt: "ortopedista", en: "orthopaedist", art: "der", cat: "Médicos" },
      { de: "der Frauenarzt", pt: "ginecologista", en: "gynaecologist", art: "der", cat: "Médicos" },
      { de: "der Kinderarzt", pt: "pediatra", en: "paediatrician", art: "der", cat: "Médicos" },
      { de: "die Kopfschmerzen", pt: "dor de cabeça", en: "headache", art: "die", cat: "Sintomas" },
      { de: "das Fieber", pt: "febre", en: "fever", art: "das", cat: "Sintomas" },
      { de: "die Erkältung", pt: "resfriado", en: "cold", art: "die", cat: "Sintomas" },
      { de: "der Schnupfen", pt: "coriza", en: "runny nose", art: "der", cat: "Sintomas" },
    ],
    prompts: [
      { title: { pt: "Na consulta", en: "At the doctor's" }, text: { pt: "Atue como médico(a) alemão(ã). Vou descrever meus sintomas usando 'Ich habe …schmerzen' e 'Mir tut … weh'. Faça perguntas, dê instruções simples e me ajude a marcar um Termin. Corrija meus erros.", en: "Act as a German doctor. I'll describe my symptoms using 'Ich habe …schmerzen' and 'Mir tut … weh'. Ask questions, give simple instructions and help me book a Termin. Correct my mistakes." } },
    ],
  },

  // ============================ LEKTION 10 ============================
  {
    id: 10,
    part: "a1.2",
    title: "Gestern und heute (Wie war der Urlaub?)",
    icon: "🧳",
    lernziele: [
      { pt: "Falar sobre experiências passadas recentes (férias, fim de semana)", en: "Talk about recent past experiences (holidays, weekend)" },
      { pt: "Usar o pretérito dos verbos sein e haben", en: "Use the past tense (Präteritum) of sein and haben" },
      { pt: "Contar onde esteve e o que fez de forma simples", en: "Say where you were and what you did in a simple way" },
    ],
    redemittel: [
      { group: { pt: "Passado", en: "The past" }, items: [
        ["Ich war letztes Wochenende in Berlin.", { pt: "Estive em Berlim no fim de semana passado.", en: "I was in Berlin last weekend." }],
        ["Wir waren vier Tage am Meer.", { pt: "Ficamos quatro dias na praia.", en: "We were at the seaside for four days." }],
        ["Das Wetter war super.", { pt: "O tempo estava ótimo.", en: "The weather was great." }],
        ["Ich war noch nie in den Bergen.", { pt: "Nunca estive nas montanhas.", en: "I've never been to the mountains." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "Pretérito de sein e haben", en: "Präteritum of sein and haben" },
        tables: [
          conj("sein (Präteritum)", { pt: "ser/estar (passado)", en: "to be (past)" }, ["ich war", "du warst", "er/sie/es war", "wir waren", "ihr wart", "sie/Sie waren"], { pt: "Para dizer onde você esteve.", en: "To say where you were." }),
          conj("haben (Präteritum)", { pt: "ter (passado)", en: "to have (past)" }, ["ich hatte", "du hattest", "er/sie/es hatte", "wir hatten", "ihr hattet", "sie/Sie hatten"], { pt: "Para dizer o que você teve/tinha.", en: "To say what you had." }),
        ],
      },
    ],
    atencao: { pt: "Para falar do passado no A1, sein e haben usam o Präteritum (war / hatte), não o Perfekt. Os outros verbos virão depois no nível A2.", en: "To talk about the past at A1, sein and haben use the Präteritum (war / hatte), not the Perfekt. The other verbs come later at A2." },
    vocab: [
      { de: "der Urlaub", pt: "férias", en: "holiday / vacation", art: "der", cat: "Viagem" },
      { de: "das Meer", pt: "mar", en: "sea", art: "das", cat: "Viagem" },
      { de: "die Berge", pt: "montanhas", en: "mountains", art: "die", cat: "Viagem" },
      { de: "das Wetter", pt: "tempo (clima)", en: "weather", art: "das", cat: "Viagem" },
      { de: "das Wochenende", pt: "fim de semana", en: "weekend", art: "das", cat: "Viagem" },
      { de: "die Reise", pt: "viagem", en: "trip / journey", art: "die", cat: "Viagem" },
    ],
    prompts: [
      { title: { pt: "Como foram suas férias?", en: "How was your holiday?" }, text: { pt: "Atue como amigo(a) alemão(ã). Pergunte como foi meu último fim de semana ou férias. Eu respondo usando war e hatte. Corrija meu uso do pretérito de sein e haben.", en: "Act as a German friend. Ask how my last weekend or holiday was. I answer using war and hatte. Correct my use of the Präteritum of sein and haben." } },
    ],
  },

  // ============================ LEKTION 11 ============================
  {
    id: 11,
    part: "a1.2",
    title: "Wir gehen shoppen",
    icon: "🛍️",
    lernziele: [
      { pt: "Falar sobre roupas, tamanhos e preços", en: "Talk about clothes, sizes and prices" },
      { pt: "Usar adjetivos para descrever roupas (zu eng, zu weit, zu klein…)", en: "Use adjectives to describe clothes (zu eng, zu weit, zu klein…)" },
      { pt: "Pedir para trocar um produto", en: "Ask to exchange a product" },
      { pt: "Dar opinião sobre aparência", en: "Give an opinion about appearance" },
    ],
    redemittel: [
      { group: { pt: "Compras", en: "Shopping" }, items: [
        ["Der Pullover ist zu eng.", { pt: "O suéter está apertado demais.", en: "The jumper is too tight." }],
        ["Die Hose ist zu weit.", { pt: "A calça está larga demais.", en: "The trousers are too loose." }],
        ["Ich möchte das umtauschen.", { pt: "Quero trocar isto.", en: "I'd like to exchange this." }],
        ["Was kostet das?", { pt: "Quanto custa isto?", en: "How much does this cost?" }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "A. Adjetivos para roupas", en: "A. Adjectives for clothes" },
        body: { pt: "Tamanho: eng / weit, klein / groß, kurz / lang\nPreço: teuer / günstig\nAparência: schön / hässlich, passend / nicht passend\nEx.: 'Der Pullover ist zu eng.' / 'Die Hose ist zu weit.'", en: "Size: eng / weit, klein / groß, kurz / lang\nPrice: teuer / günstig\nAppearance: schön / hässlich, passend / nicht passend\nE.g.: 'Der Pullover ist zu eng.' / 'Die Hose ist zu weit.'" },
      },
      {
        heading: { pt: "B. Verbos com Akkusativ", en: "B. Verbs with the Akkusativ" },
        body: { pt: "brauchen + Akkusativ\nnehmen + Akkusativ\nsuchen + Akkusativ\numtauschen + Akkusativ\nkaufen + Akkusativ", en: "brauchen + Akkusativ\nnehmen + Akkusativ\nsuchen + Akkusativ\numtauschen + Akkusativ\nkaufen + Akkusativ" },
      },
    ],
    atencao: { pt: "No Akkusativ, o masculino muda: der → den. Ex.: Ich brauche den Pullover. Os outros gêneros não mudam (die/das ficam iguais).", en: "In the Akkusativ, only the masculine changes: der → den. E.g.: Ich brauche den Pullover. The other genders stay the same (die/das are unchanged)." },
    vocab: [
      { de: "der Pullover", pt: "suéter", en: "jumper / sweater", art: "der", cat: "Roupas" },
      { de: "die Hose", pt: "calça", en: "trousers / pants", art: "die", cat: "Roupas" },
      { de: "das Hemd", pt: "camisa", en: "shirt", art: "das", cat: "Roupas" },
      { de: "das T-Shirt", pt: "camiseta", en: "T-shirt", art: "das", cat: "Roupas" },
      { de: "der Rock", pt: "saia", en: "skirt", art: "der", cat: "Roupas" },
      { de: "das Kleid", pt: "vestido", en: "dress", art: "das", cat: "Roupas" },
      { de: "die Schuhe", pt: "sapatos", en: "shoes", art: "die", cat: "Roupas" },
      { de: "die Jacke", pt: "jaqueta", en: "jacket", art: "die", cat: "Roupas" },
      { de: "eng", pt: "apertado", en: "tight", art: "(Adj)", cat: "Adjetivos" },
      { de: "weit", pt: "largo", en: "loose / wide", art: "(Adj)", cat: "Adjetivos" },
      { de: "teuer", pt: "caro", en: "expensive", art: "(Adj)", cat: "Adjetivos" },
      { de: "günstig", pt: "barato", en: "cheap / good value", art: "(Adj)", cat: "Adjetivos" },
    ],
    prompts: [
      { title: { pt: "Na loja", en: "At the shop" }, text: { pt: "Atue como vendedor(a) de uma loja de roupas alemã. Eu provo roupas e comento usando adjetivos (zu eng, zu weit, zu teuer). Ajude-me a pedir uma troca (umtauschen). Corrija o Akkusativ (den).", en: "Act as an assistant in a German clothes shop. I try on clothes and comment using adjectives (zu eng, zu weit, zu teuer). Help me ask for an exchange (umtauschen). Correct the Akkusativ (den)." } },
    ],
  },

  // ============================ LEKTION 12 ============================
  {
    id: 12,
    part: "a1.2",
    title: "Endlich Frühling",
    icon: "🌷",
    lernziele: [
      { pt: "Falar sobre o tempo e as estações do ano", en: "Talk about the weather and the seasons" },
      { pt: "Usar números ordinais (der erste, der zweite…)", en: "Use ordinal numbers (der erste, der zweite…)" },
      { pt: "Convidar para uma festa e responder a convites", en: "Invite someone to a party and reply to invitations" },
      { pt: "Escrever mensagens e e-mails curtos sobre eventos", en: "Write short messages and emails about events" },
    ],
    redemittel: [
      { group: { pt: "Convites", en: "Invitations" }, items: [
        ["Kommst du auch?", { pt: "Você vem também?", en: "Are you coming too?" }],
        ["Wir möchten dich einladen.", { pt: "Queremos te convidar.", en: "We'd like to invite you." }],
        ["Vielen Dank für die Einladung. Ich komme gerne.", { pt: "Obrigado pelo convite. Eu venho com prazer.", en: "Thanks for the invitation. I'd love to come." }],
        ["Leider kann ich nicht kommen.", { pt: "Infelizmente não posso ir.", en: "Unfortunately I can't come." }],
      ]},
    ],
    grammar: [
      {
        heading: { pt: "A. Números Ordinais (1º ao 10º)", en: "A. Ordinal numbers (1st to 10th)" },
        body: { pt: "1. der erste · 2. der zweite · 3. der dritte · 4. der vierte · 5. der fünfte\n6. der sechste · 7. der siebte · 8. der achte · 9. der neunte · 10. der zehnte\nCom datas: 'Der fünfte Juli' (nominativo) / 'am fünften Juli' (am + Dativ).", en: "1. der erste · 2. der zweite · 3. der dritte · 4. der vierte · 5. der fünfte\n6. der sechste · 7. der siebte · 8. der achte · 9. der neunte · 10. der zehnte\nWith dates: 'Der fünfte Juli' (nominative) / 'am fünften Juli' (am + Dativ)." },
      },
      {
        heading: { pt: "B. Estações e Tempo", en: "B. Seasons and weather" },
        body: { pt: "der Frühling (primavera) — warm, die Sonne scheint, die Blumen blühen\nder Sommer — heiß, man geht schwimmen\nder Herbst — kühl, die Blätter fallen\nder Winter — kalt, es schneit", en: "der Frühling (spring) — warm, die Sonne scheint, die Blumen blühen\nder Sommer (summer) — heiß, man geht schwimmen\nder Herbst (autumn) — kühl, die Blätter fallen\nder Winter (winter) — kalt, es schneit" },
      },
    ],
    atencao: { pt: 'Com datas e preposição use a forma com -en: "am fünften Juli", não "am fünf Juli".', en: 'With dates and a preposition, use the -en form: "am fünften Juli", not "am fünf Juli".' },
    vocab: [
      { de: "der Frühling", pt: "primavera", en: "spring", art: "der", cat: "Estações" },
      { de: "der Sommer", pt: "verão", en: "summer", art: "der", cat: "Estações" },
      { de: "der Herbst", pt: "outono", en: "autumn / fall", art: "der", cat: "Estações" },
      { de: "der Winter", pt: "inverno", en: "winter", art: "der", cat: "Estações" },
      { de: "die Sonne", pt: "sol", en: "sun", art: "die", cat: "Tempo" },
      { de: "der Regen", pt: "chuva", en: "rain", art: "der", cat: "Tempo" },
      { de: "der Schnee", pt: "neve", en: "snow", art: "der", cat: "Tempo" },
      { de: "die Einladung", pt: "convite", en: "invitation", art: "die", cat: "Festa" },
      { de: "die Party", pt: "festa", en: "party", art: "die", cat: "Festa" },
      { de: "das Fest", pt: "festa/celebração", en: "celebration / festival", art: "das", cat: "Festa" },
    ],
    prompts: [
      { title: { pt: "Convite para festa", en: "Party invitation" }, text: { pt: "Atue como amigo(a) alemão(ã). Me convide para uma festa por mensagem e eu respondo aceitando ou recusando. Depois inverta. Cobre os números ordinais nas datas (am fünften Juli) e o vocabulário de estações.", en: "Act as a German friend. Invite me to a party by message and I'll reply accepting or declining. Then switch. Check the ordinal numbers in dates (am fünften Juli) and the seasons vocabulary." } },
    ],
  },
];

// Banco central de erros comuns (adaptado para falantes de inglês)
const COMMON_MISTAKES = [
  { titulo: { pt: "du vs Sie", en: "du vs Sie" }, errado: { pt: 'Usar "du" com todo mundo', en: 'Using "du" with everyone' }, certo: { pt: "Soa rude em situações formais; comece com Sie", en: "Sounds rude in formal situations; start with Sie" }, lektion: 1 },
  { titulo: { pt: "Artigos possessivos", en: "Possessive articles" }, errado: { pt: "mein Eltern", en: "mein Eltern" }, certo: { pt: "meine Eltern", en: "meine Eltern" }, lektion: 2 },
  { titulo: { pt: "sein no plural", en: "sein in the plural" }, errado: { pt: "Das ist meine Kinder", en: "Das ist meine Kinder" }, certo: { pt: "Das sind meine Kinder", en: "Das sind meine Kinder" }, lektion: 2 },
  { titulo: { pt: "Preposições + caso", en: "Prepositions + case" }, errado: { pt: "Confundir Akkusativ e Dativ", en: "Mixing up Akkusativ and Dativ" }, certo: { pt: "in den Supermarkt (direção) vs im Supermarkt (local)", en: "in den Supermarkt (direction) vs im Supermarkt (location)" }, lektion: 7 },
  { titulo: { pt: "fahren / nehmen", en: "fahren / nehmen" }, errado: { pt: "Esquecer a mudança de vogal", en: "Forgetting the vowel change" }, certo: { pt: "ich fahre → du fährst", en: "ich fahre → du fährst" }, lektion: 7 },
  { titulo: { pt: "Números ordinais", en: "Ordinal numbers" }, errado: { pt: "am fünf Juli", en: "am fünf Juli" }, certo: { pt: "am fünften Juli", en: "am fünften Juli" }, lektion: 12 },
  { titulo: { pt: "Plural sem Umlaut", en: "Plural without Umlaut" }, errado: { pt: "die Apfel", en: "die Apfel" }, certo: { pt: "die Äpfel", en: "die Äpfel" }, lektion: 4 },
];

// Dicas finais de estudo
const STUDY_TIPS = [
  { pt: "Faça 1 Lektion por dia no ritmo atual (15–18 páginas).", en: "Do 1 Lektion a day at a steady pace (15–18 pages)." },
  { pt: "Depois de cada Lektion, use os prompts com a IA para speaking.", en: "After each Lektion, use the AI prompts for speaking practice." },
  { pt: "Grave-se falando e compare com os modelos.", en: "Record yourself speaking and compare with the models." },
  { pt: "Revise os erros comuns toda semana.", en: "Review the common mistakes every week." },
  { pt: "Faça uma revisão geral das 12 Lektionen ao terminar o A1.2.", en: "Do a full review of the 12 Lektionen when you finish A1.2." },
  { pt: "Viel Erfolg beim Lernen! Você vai conseguir! 💪", en: "Viel Erfolg beim Lernen! You've got this! 💪" },
];

window.DATA = { COURSE, LESSONS, COMMON_MISTAKES, STUDY_TIPS };
