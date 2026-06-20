// content.js — Todo o conteúdo da ementa "Einfach gut! Deutsch für die Integration" A1.1 + A1.2
// Estruturado a partir da Ementa Detalhada v2 (baseada nos livros oficiais telc 2022).
// Cada Lektion: lernziele, redemittel, grammar (com tabelas), vocab, atencao, prompts.

const COURSE = {
  title: "Einfach gut! Deutsch für die Integration",
  level: "A1.1 + A1.2",
  parts: [
    { id: "a1.1", title: "A1.1", subtitle: "Lektionen 1–6", lessons: [1, 2, 3, 4, 5, 6] },
    { id: "a1.2", title: "A1.2", subtitle: "Lektionen 7–12", lessons: [7, 8, 9, 10, 11, 12] },
  ],
};

// Helper para tabelas de conjugação
const conj = (verb, meaning, forms, note) => ({ verb, meaning, forms, note });

const LESSONS = [
  // ============================ LEKTION 1 ============================
  {
    id: 1,
    part: "a1.1",
    title: "Hallo! Wie geht's?",
    icon: "👋",
    lernziele: [
      "Cumprimentar e se despedir de forma adequada (formal vs informal)",
      "Apresentar-se dizendo nome e origem",
      "Perguntar o nome e a origem de outra pessoa",
      "Dizer quais línguas fala e perguntar sobre as línguas de outra pessoa",
      "Usar corretamente as formas de tratamento du (informal) e Sie (formal)",
      "Perguntar e responder como está (Wie geht es Ihnen/dir?)",
    ],
    redemittel: [
      { group: "Saudações", items: [
        ["Guten Tag!", "Bom dia/Boa tarde (formal, durante o dia)"],
        ["Guten Morgen!", "Bom dia (até ~10h)"],
        ["Guten Abend!", "Boa noite (a partir das 18h)"],
        ["Hallo! / Hi!", "Olá (informal, amigos e colegas jovens)"],
        ["Tag! / Morgen!", "Oi (muito informal, só com conhecidos)"],
      ]},
      { group: "Despedidas", items: [
        ["Auf Wiedersehen!", "Até logo (formal)"],
        ["Tschüss!", "Tchau (informal, mais comum)"],
        ["Bis morgen! / Bis bald! / Bis später!", "Até amanhã / Até logo / Até mais"],
        ["Gute Nacht!", "Boa noite (ao dormir)"],
      ]},
      { group: "Apresentação", items: [
        ["Guten Tag, mein Name ist … / Ich heiße …", "Meu nome é… / Eu me chamo…"],
        ["Wie heißen Sie? (formal) / Wie heißt du? (informal)", "Como o(a) senhor(a) se chama? / Como você se chama?"],
        ["Entschuldigung, wie bitte?", "Desculpe, como?"],
      ]},
      { group: "Origem e línguas", items: [
        ["Woher kommen Sie? / Woher kommst du?", "De onde o(a) senhor(a) vem? / De onde você vem?"],
        ["Ich komme aus Brasilien / aus dem Iran / aus Polen…", "Eu venho do Brasil / do Irã / da Polônia…"],
        ["Welche Sprache sprechen Sie? / sprichst du?", "Que língua o(a) senhor(a) fala? / você fala?"],
        ["Ich spreche Portugiesisch, ein bisschen Deutsch und Englisch.", "Eu falo português, um pouco de alemão e inglês."],
      ]},
    ],
    grammar: [
      {
        heading: "A. Verbos no Presente (Indikativ Präsens)",
        body: "Os verbos mais importantes desta Lektion são: heißen, kommen, sein, sprechen.",
        tables: [
          conj("heißen", "chamar-se", ["ich heiße", "du heißt", "er/sie/es heißt", "wir heißen", "ihr heißt", "sie/Sie heißen"], 'Ex.: "Mein Name ist Ella Krüger." / "Ich heiße Karim Moussa."'),
          conj("kommen", "vir / ser de", ["ich komme", "du kommst", "er/sie/es kommt", "wir kommen", "ihr kommt", "sie/Sie kommen"], 'Ex.: "Ich komme aus Polen." / "Woher kommen Sie?"'),
          conj("sein", "ser/estar", ["ich bin", "du bist", "er/sie/es ist", "wir sind", "ihr seid", "sie/Sie sind"], 'Ex.: "Ich bin Laura Salewska." / "Wer ist das?"'),
          conj("sprechen", "falar", ["ich spreche", "du sprichst", "er/sie/es spricht", "wir sprechen", "ihr sprecht", "sie/Sie sprechen"], 'Mudança e→i no singular. Ex.: "Welche Sprache sprechen Sie?"'),
        ],
      },
      {
        heading: "B. Uso de du vs Sie",
        body: "du = você (informal): amigos, familiares, colegas da mesma idade ou mais jovens, crianças.\nSie = o senhor / a senhora (formal): pessoas mais velhas, desconhecidos, situações profissionais, professores, médicos, etc.",
      },
    ],
    atencao: 'No Brasil usamos "você" para quase todo mundo. Em alemão isso pode soar muito informal ou até rude. Quando em dúvida, comece sempre com Sie e espere a outra pessoa oferecer o "du" (comum entre jovens: "Wir können du sagen").',
    vocab: [
      { de: "Brasilien", pt: "Brasil", art: "(das)", cat: "Países" },
      { de: "der Iran", pt: "Irã", art: "der", cat: "Países" },
      { de: "der Irak", pt: "Iraque", art: "der", cat: "Países" },
      { de: "Polen", pt: "Polônia", art: "(das)", cat: "Países" },
      { de: "Syrien", pt: "Síria", art: "(das)", cat: "Países" },
      { de: "die Türkei", pt: "Turquia", art: "die", cat: "Países" },
      { de: "die Ukraine", pt: "Ucrânia", art: "die", cat: "Países" },
      { de: "Deutschland", pt: "Alemanha", art: "(das)", cat: "Países" },
      { de: "Afghanistan", pt: "Afeganistão", art: "(das)", cat: "Países" },
      { de: "Eritrea", pt: "Eritreia", art: "(das)", cat: "Países" },
      { de: "Deutsch", pt: "alemão (língua)", art: "das", cat: "Línguas" },
      { de: "Englisch", pt: "inglês", art: "das", cat: "Línguas" },
      { de: "Portugiesisch", pt: "português", art: "das", cat: "Línguas" },
      { de: "Arabisch", pt: "árabe", art: "das", cat: "Línguas" },
      { de: "Französisch", pt: "francês", art: "das", cat: "Línguas" },
      { de: "Türkisch", pt: "turco", art: "das", cat: "Línguas" },
      { de: "Russisch", pt: "russo", art: "das", cat: "Línguas" },
      { de: "Farsi", pt: "persa", art: "das", cat: "Línguas" },
    ],
    prompts: [
      { title: "Gramática + Exemplos", text: "Atue como professor de alemão para brasileiros no nível A1. Explique detalhadamente a diferença entre 'du' e 'Sie' com pelo menos 8 exemplos de situações reais do dia a dia. Depois crie um pequeno diálogo de apresentação onde uma pessoa usa Sie e depois oferece o du." },
      { title: "Speaking Practice", text: "Crie um role-play de 10 linhas entre duas pessoas que se conhecem pela primeira vez em um curso de alemão. Uma pessoa é formal no início. Inclua: cumprimento, nome, origem, línguas que fala e como está. Eu serei o estudante. Corrija meus erros de forma construtiva no final." },
    ],
  },

  // ============================ LEKTION 2 ============================
  {
    id: 2,
    part: "a1.1",
    title: "Meine Familie und ich",
    icon: "👨‍👩‍👧",
    lernziele: [
      "Apresentar e descrever os membros da família",
      "Usar corretamente os artigos possessivos mein / meine",
      "Usar o verbo sein no presente com singular e plural",
      "Dizer números de 0 a 20 e a idade",
      'Diferenciar "Das ist…" (singular) e "Das sind…" (plural)',
    ],
    redemittel: [
      { group: "Família e idade", items: [
        ["Das ist mein Bruder.", "Este é meu irmão."],
        ["Das sind meine Eltern.", "Estes são meus pais."],
        ["Wie alt bist du? / Wie alt sind Sie?", "Quantos anos você tem? / o(a) senhor(a) tem?"],
        ["Ich bin 30 Jahre alt.", "Eu tenho 30 anos."],
      ]},
    ],
    grammar: [
      {
        heading: "A. Artigos Possessivos (mein / meine)",
        body: "O possessivo muda conforme o gênero e número do substantivo:\nmein + masculino/neutro: mein Vater, mein Sohn, mein Kind\nmeine + feminino/plural: meine Mutter, meine Schwester, meine Eltern, meine Kinder",
      },
      {
        heading: "B. Verbo sein — conjugação completa",
        tables: [
          conj("sein", "ser/estar", ["ich bin", "du bist", "er/sie/es ist", "wir sind", "ihr seid", "sie/Sie sind"], '"Das ist mein Bruder." (sing.) vs "Das sind meine Eltern." (plur.)'),
        ],
      },
    ],
    atencao: 'Em português dizemos "meu pai", "minha mãe", "meus pais". Em alemão é mein Vater / meine Mutter / meine Eltern — o plural sempre usa "meine". E muitos alunos erram dizendo "Das ist meine Eltern": o correto é "Das sind meine Eltern" porque Eltern é plural.',
    vocab: [
      { de: "der Vater", pt: "pai", art: "der", plural: "die Väter", cat: "Família" },
      { de: "die Mutter", pt: "mãe", art: "die", plural: "die Mütter", cat: "Família" },
      { de: "der Sohn", pt: "filho", art: "der", plural: "die Söhne", cat: "Família" },
      { de: "die Tochter", pt: "filha", art: "die", plural: "die Töchter", cat: "Família" },
      { de: "das Kind", pt: "criança/filho(a)", art: "das", plural: "die Kinder", cat: "Família" },
      { de: "der Bruder", pt: "irmão", art: "der", plural: "die Brüder", cat: "Família" },
      { de: "die Schwester", pt: "irmã", art: "die", plural: "die Schwestern", cat: "Família" },
      { de: "die Eltern", pt: "pais", art: "die", plural: "(sempre plural)", cat: "Família" },
      { de: "die Geschwister", pt: "irmãos (em geral)", art: "die", plural: "(sempre plural)", cat: "Família" },
      { de: "die Frau", pt: "mulher/esposa", art: "die", plural: "die Frauen", cat: "Família" },
      { de: "der Mann", pt: "homem/marido", art: "der", plural: "die Männer", cat: "Família" },
    ],
    numbers: { title: "Números 0–20", list: [
      ["0", "null"], ["1", "eins"], ["2", "zwei"], ["3", "drei"], ["4", "vier"], ["5", "fünf"],
      ["6", "sechs"], ["7", "sieben"], ["8", "acht"], ["9", "neun"], ["10", "zehn"],
      ["11", "elf"], ["12", "zwölf"], ["13", "dreizehn"], ["14", "vierzehn"], ["15", "fünfzehn"],
      ["16", "sechzehn"], ["17", "siebzehn"], ["18", "achtzehn"], ["19", "neunzehn"], ["20", "zwanzig"],
    ]},
    prompts: [
      { title: "Família + possessivos", text: "Atue como professor de alemão A1 para brasileiros. Crie 12 frases sobre uma família fictícia usando mein/meine corretamente, misturando singular e plural, e explique cada escolha do artigo possessivo." },
    ],
  },

  // ============================ LEKTION 3 ============================
  {
    id: 3,
    part: "a1.1",
    title: "Im Deutschkurs",
    icon: "🏫",
    lernziele: [
      "Perguntar o nome de objetos e coisas na sala de aula",
      "Usar corretamente as formas de pergunta com du e Sie",
      "Fazer e responder perguntas sobre identidade (Wer bist du? / Wer sind Sie?)",
      "Praticar o alfabeto alemão, especialmente ä, ö, ü e ß",
    ],
    redemittel: [
      { group: "Perguntas na sala", items: [
        ["Wer bist du? / Wer sind Sie?", "Quem é você? / Quem é o(a) senhor(a)?"],
        ["Wie heißt das auf Deutsch?", "Como se diz isso em alemão?"],
        ["Wie schreibt man das?", "Como se escreve isso?"],
        ["Was ist das?", "O que é isso?"],
      ]},
    ],
    grammar: [
      {
        heading: "Perguntas (W-Fragen) mais importantes",
        body: "Wer …? (quem) · Wie …? (como) · Was …? (o quê). Note a diferença du/Sie na forma do verbo: Wer bist du? vs Wer sind Sie?",
      },
    ],
    atencao: "O alfabeto alemão tem letras especiais. Treine bem os sons de ä, ö, ü e ß — eles mudam o significado das palavras.",
    alphabet: {
      title: "Alfabeto Alemão",
      special: [
        ["ä", 'como "é" em português', "Mädchen, Käse"],
        ["ö", 'som entre "e" e "o"', "schön, hören"],
        ["ü", 'como "i" com lábios arredondados', "über, Müller"],
        ["ß", '"ss" — nunca no início de palavra', "Straße, groß"],
      ],
    },
    vocab: [
      { de: "der Tisch", pt: "mesa", art: "der", plural: "die Tische", cat: "Sala de aula" },
      { de: "der Stuhl", pt: "cadeira", art: "der", plural: "die Stühle", cat: "Sala de aula" },
      { de: "das Buch", pt: "livro", art: "das", plural: "die Bücher", cat: "Sala de aula" },
      { de: "der Kugelschreiber", pt: "caneta", art: "der", plural: "die Kugelschreiber", cat: "Sala de aula" },
      { de: "der Bleistift", pt: "lápis", art: "der", plural: "die Bleistifte", cat: "Sala de aula" },
      { de: "die Tafel", pt: "quadro/lousa", art: "die", plural: "die Tafeln", cat: "Sala de aula" },
      { de: "das Heft", pt: "caderno", art: "das", plural: "die Hefte", cat: "Sala de aula" },
      { de: "die Tür", pt: "porta", art: "die", plural: "die Türen", cat: "Sala de aula" },
    ],
    prompts: [
      { title: "Soletrar e perguntar", text: "Atue como professor de alemão A1. Faça um exercício comigo de soletrar 10 palavras alemãs com ä, ö, ü e ß usando o alfabeto. Depois me faça perguntas 'Wie heißt das auf Deutsch?' sobre objetos da sala de aula." },
    ],
  },

  // ============================ LEKTION 4 ============================
  {
    id: 4,
    part: "a1.1",
    title: "Im Supermarkt",
    icon: "🛒",
    lernziele: [
      "Falar sobre alimentos que gosta e não gosta",
      "Usar os verbos mögen e essen com as mudanças de vogal",
      "Formar o plural de alimentos corretamente",
      "Usar artigos definidos (der/die/das) e indefinidos (ein/eine/ein) no nominativo",
    ],
    redemittel: [
      { group: "Gostos", items: [
        ["Magst du Obstsalat?", "Você gosta de salada de frutas?"],
        ["Ja, aber ich mag keine Äpfel.", "Sim, mas não gosto de maçãs."],
        ["Was isst du gern?", "O que você gosta de comer?"],
        ["Ich esse gern Tomaten.", "Eu gosto de comer tomates."],
      ]},
    ],
    grammar: [
      {
        heading: "A. Verbos com mudança de vogal",
        tables: [
          conj("mögen", "gostar", ["ich mag", "du magst", "er/sie/es mag", "wir mögen", "ihr mögt", "sie/Sie mögen"], "Mudança ö→a no singular."),
          conj("essen", "comer", ["ich esse", "du isst", "er/sie/es isst", "wir essen", "ihr esst", "sie/Sie essen"], "Mudança e→i no singular (du, er/sie/es)."),
        ],
      },
      {
        heading: "B. Plural de alimentos (padrões comuns)",
        body: "-e: der Apfel → die Äpfel (com Umlaut)\n-en: die Banane → die Bananen\n-s: das Auto → die Autos\nsem terminação + Umlaut: der Apfel → die Äpfel\nMuitos alimentos no plural têm Umlaut: Äpfel, Möhren, etc.",
      },
      {
        heading: "C. Artigos no Nominativo",
        body: "Definidos: der (masc) / die (fem) / das (neutro) / die (plural)\nIndefinidos: ein (masc/neutro) / eine (fem) / — (plural não tem indefinido)\nEx.: das Brot, ein Brot · die Tomate, eine Tomate · die Äpfel (sem indefinido).",
      },
    ],
    atencao: 'Muitos alimentos no plural ganham Umlaut. Não diga "die Apfel" — o correto é "die Äpfel".',
    vocab: [
      { de: "der Apfel", pt: "maçã", art: "der", plural: "die Äpfel", cat: "Alimentos" },
      { de: "die Banane", pt: "banana", art: "die", plural: "die Bananen", cat: "Alimentos" },
      { de: "die Tomate", pt: "tomate", art: "die", plural: "die Tomaten", cat: "Alimentos" },
      { de: "die Möhre", pt: "cenoura", art: "die", plural: "die Möhren", cat: "Alimentos" },
      { de: "das Brot", pt: "pão", art: "das", plural: "die Brote", cat: "Alimentos" },
      { de: "der Käse", pt: "queijo", art: "der", plural: "die Käse", cat: "Alimentos" },
      { de: "die Milch", pt: "leite", art: "die", plural: "—", cat: "Alimentos" },
      { de: "das Ei", pt: "ovo", art: "das", plural: "die Eier", cat: "Alimentos" },
      { de: "das Wasser", pt: "água", art: "das", plural: "—", cat: "Alimentos" },
    ],
    prompts: [
      { title: "Compras e gostos", text: "Atue como vendedor de supermercado alemão (A1). Faça um diálogo comigo onde eu digo o que gosto e não gosto de comer, usando mögen e essen corretamente. Corrija as mudanças de vogal e os plurais que eu errar." },
    ],
  },

  // ============================ LEKTION 5 ============================
  {
    id: 5,
    part: "a1.1",
    title: "Von morgens bis abends",
    icon: "⏰",
    lernziele: [
      "Dizer as horas de forma precisa",
      "Falar sobre a rotina diária",
      "Usar preposições temporais (um, von…bis, am, im)",
      "Fazer e responder perguntas sobre horários",
    ],
    redemittel: [
      { group: "Horas", items: [
        ["Es ist 8 Uhr.", "São 8:00"],
        ["Es ist halb 9.", "São 8:30"],
        ["Es ist Viertel vor 9.", "São 8:45"],
        ["Es ist Viertel nach 8.", "São 8:15"],
        ["Es ist zwanzig nach 8.", "São 8:20"],
        ["Es ist fünf vor halb 9.", "São 8:25"],
      ]},
    ],
    grammar: [
      {
        heading: "Preposições Temporais",
        body: "um + hora: um 9 Uhr, um halb 10\nvon … bis: von 8 bis 12 Uhr\nam + dia: am Montag, am 15. Juli\nim + mês/estação: im Juli, im Sommer",
      },
    ],
    atencao: 'Atenção ao "halb": em alemão halb 9 = 8:30 (meia hora PARA as 9), não 9:30. É diferente do português!',
    vocab: [
      { de: "der Montag", pt: "segunda-feira", art: "der", cat: "Dias da semana" },
      { de: "der Dienstag", pt: "terça-feira", art: "der", cat: "Dias da semana" },
      { de: "der Mittwoch", pt: "quarta-feira", art: "der", cat: "Dias da semana" },
      { de: "der Donnerstag", pt: "quinta-feira", art: "der", cat: "Dias da semana" },
      { de: "der Freitag", pt: "sexta-feira", art: "der", cat: "Dias da semana" },
      { de: "der Samstag", pt: "sábado", art: "der", cat: "Dias da semana" },
      { de: "der Sonntag", pt: "domingo", art: "der", cat: "Dias da semana" },
      { de: "aufstehen", pt: "levantar-se", art: "(Verb)", cat: "Rotina" },
      { de: "frühstücken", pt: "tomar café da manhã", art: "(Verb)", cat: "Rotina" },
      { de: "arbeiten", pt: "trabalhar", art: "(Verb)", cat: "Rotina" },
      { de: "schlafen", pt: "dormir", art: "(Verb)", cat: "Rotina" },
    ],
    prompts: [
      { title: "Minha rotina", text: "Atue como professor de alemão A1. Me pergunte sobre minha rotina diária (a que horas eu acordo, trabalho, almoço, durmo) e corrija meu uso das horas e das preposições um/von…bis/am/im." },
    ],
  },

  // ============================ LEKTION 6 ============================
  {
    id: 6,
    part: "a1.1",
    title: "Auf Wohnungssuche",
    icon: "🏠",
    lernziele: [
      "Descrever uma casa ou apartamento",
      "Usar preposições locativas com o caso correto (Dativ)",
      "Falar sobre móveis e eletrodomésticos",
      "Escrever um e-mail simples sobre uma visita",
    ],
    redemittel: [
      { group: "Descrever moradia", items: [
        ["Das Sofa steht im Wohnzimmer.", "O sofá fica na sala."],
        ["Der Tisch steht in der Küche.", "A mesa fica na cozinha."],
        ["Die Wohnung hat drei Zimmer.", "O apartamento tem três cômodos."],
      ]},
    ],
    grammar: [
      {
        heading: "Preposições Locativas + Dativ",
        body: "in + Dativ → im / in der: im Wohnzimmer, in der Küche\nauf + Dativ → auf dem: auf dem Tisch, auf dem Boden\nunter + Dativ → unter dem: unter dem Bett\nneben + Dativ → neben dem/der: neben dem Schrank\nhinter + Dativ → hinter der Tür\nvor + Dativ → vor dem Haus\nzwischen + Dativ → zwischen dem Bett und dem Schrank",
      },
    ],
    atencao: "Para LOCALIZAÇÃO (Wo? — onde algo está), use Dativ: im Wohnzimmer, auf dem Tisch. Não confunda com direção (Wohin?), que vem na Lektion 7.",
    vocab: [
      { de: "das Wohnzimmer", pt: "sala de estar", art: "das", cat: "Cômodos" },
      { de: "das Schlafzimmer", pt: "quarto", art: "das", cat: "Cômodos" },
      { de: "die Küche", pt: "cozinha", art: "die", cat: "Cômodos" },
      { de: "das Bad", pt: "banheiro", art: "das", cat: "Cômodos" },
      { de: "der Flur", pt: "corredor", art: "der", cat: "Cômodos" },
      { de: "der Balkon", pt: "varanda", art: "der", cat: "Cômodos" },
      { de: "das Bett", pt: "cama", art: "das", cat: "Móveis" },
      { de: "der Tisch", pt: "mesa", art: "der", cat: "Móveis" },
      { de: "der Stuhl", pt: "cadeira", art: "der", cat: "Móveis" },
      { de: "der Schrank", pt: "armário", art: "der", cat: "Móveis" },
      { de: "das Sofa", pt: "sofá", art: "das", cat: "Móveis" },
      { de: "der Fernseher", pt: "televisão", art: "der", cat: "Móveis" },
      { de: "die Waschmaschine", pt: "máquina de lavar", art: "die", cat: "Eletrodomésticos" },
      { de: "der Kühlschrank", pt: "geladeira", art: "der", cat: "Eletrodomésticos" },
      { de: "die Spülmaschine", pt: "lava-louças", art: "die", cat: "Eletrodomésticos" },
    ],
    prompts: [
      { title: "Descrever meu apartamento", text: "Atue como professor de alemão A1. Vou descrever onde estão os móveis no meu apartamento. Corrija meu uso das preposições locativas com Dativ (im, in der, auf dem, unter dem, neben dem…)." },
    ],
  },

  // ============================ LEKTION 7 ============================
  {
    id: 7,
    part: "a1.2",
    title: "In der Stadt unterwegs",
    icon: "🚆",
    highlight: "A mais importante do A1.2",
    lernziele: [
      "Falar sobre meios de transporte e preferências",
      "Usar fahren e nehmen com os casos corretos (Dativ e Akkusativ)",
      "Perguntar e dar direções na cidade",
      "Usar preposições locais com o caso correto",
      "Usar o imperativo formal (Sie-Form)",
    ],
    redemittel: [
      { group: "Direções", items: [
        ["Gehen Sie hier immer geradeaus.", "Vá sempre em frente."],
        ["An der Kreuzung / Ampel gehen Sie links / rechts.", "No cruzamento / semáforo vire à esquerda / direita."],
        ["Nehmen Sie die erste / zweite / dritte Straße links.", "Pegue a primeira / segunda / terceira rua à esquerda."],
        ["Nach ungefähr 400 Metern sehen Sie den Bahnhof.", "Depois de uns 400 metros você vê a estação."],
        ["Die Bushaltestelle ist gegenüber der Bank.", "O ponto de ônibus é em frente ao banco."],
      ]},
    ],
    grammar: [
      {
        heading: "A. fahren e nehmen (conjugação completa)",
        tables: [
          conj("fahren", "dirigir / ir de transporte", ["ich fahre", "du fährst", "er/sie/es fährt", "wir fahren", "ihr fahrt", "sie/Sie fahren"], 'Mudança a→ä. Ex.: "Ich fahre mit der Straßenbahn." / "Fährst du mit dem Bus?"'),
          conj("nehmen", "pegar / usar transporte", ["ich nehme", "du nimmst", "er/sie/es nimmt", "wir nehmen", "ihr nehmt", "sie/Sie nehmen"], 'Mudança e→i. Ex.: "Wir nehmen die U-Bahn." / "Nimmst du den Bus um 8 Uhr?"'),
        ],
      },
      {
        heading: "B. Preposições Locais — Casos",
        body: "Regra de ouro: localização (Wo?) → Dativ; direção/movimento (Wohin?) → Akkusativ (em algumas preposições).\nSempre Dativ:\nmit + Dativ: mit dem Bus, mit der U-Bahn, mit dem Auto\nzu + Dativ: zum Arzt, zur Apotheke (zu+dem=zum / zu+der=zur)\nin + Dativ: im Supermarkt, in der Apotheke\nan + Dativ: am Bahnhof, an der Bushaltestelle\nbei + Dativ: beim Arzt, bei der Ärztin\nneben / hinter / vor / unter / über + Dativ",
      },
      {
        heading: "C. Imperativo (Sie-Form) — dar instruções",
        body: "Gehen Sie hier immer geradeaus.\nNehmen Sie die erste Straße links.\nFahren Sie mit der Linie 2 bis zum Hauptbahnhof.\nÉ mais educado que o imperativo informal — muito usado para direções.",
      },
    ],
    atencao: "Não esqueça a mudança de vogal: ich fahre / du fährst, ich nehme / du nimmst. E confira o caso depois de zu (zum/zur).",
    vocab: [
      { de: "der Bus", pt: "ônibus", art: "der", cat: "Transporte" },
      { de: "die Straßenbahn", pt: "bonde", art: "die", cat: "Transporte" },
      { de: "die U-Bahn", pt: "metrô", art: "die", cat: "Transporte" },
      { de: "der Zug", pt: "trem", art: "der", cat: "Transporte" },
      { de: "das Auto", pt: "carro", art: "das", cat: "Transporte" },
      { de: "das Fahrrad", pt: "bicicleta", art: "das", cat: "Transporte" },
      { de: "der Bahnhof", pt: "estação de trem", art: "der", cat: "Cidade" },
      { de: "die Bushaltestelle", pt: "ponto de ônibus", art: "die", cat: "Cidade" },
      { de: "die Kreuzung", pt: "cruzamento", art: "die", cat: "Cidade" },
      { de: "die Ampel", pt: "semáforo", art: "die", cat: "Cidade" },
      { de: "die Apotheke", pt: "farmácia", art: "die", cat: "Cidade" },
      { de: "die Bank", pt: "banco", art: "die", cat: "Cidade" },
    ],
    prompts: [
      { title: "Pedir direções", text: "Atue como morador de uma cidade alemã. Vou perguntar como chegar a lugares (Bahnhof, Apotheke, Supermarkt). Responda com imperativo Sie-Form e preposições corretas. Depois inverta: eu dou as direções e você corrige." },
      { title: "Transportes", text: "Atue como professor A1. Faça um exercício comigo usando fahren e nehmen com diferentes meios de transporte, cobrando a mudança de vogal e o caso correto (mit dem/der, den/die)." },
    ],
  },

  // ============================ LEKTION 8 ============================
  {
    id: 8,
    part: "a1.2",
    title: "Mein Beruf",
    icon: "💼",
    lernziele: [
      "Falar sobre profissão atual e desejada",
      "Ler e entender anúncios de emprego simples",
      "Fazer uma ligação para se candidatar a uma vaga",
      "Descrever condições de trabalho usando o verbo haben",
    ],
    redemittel: [
      { group: "Trabalho", items: [
        ["Ich bin von Beruf Krankenpfleger.", "Sou enfermeiro de profissão."],
        ["Ich habe oft Stress.", "Tenho estresse com frequência."],
        ["Ich habe manchmal frei.", "Às vezes tenho folga."],
        ["Ich habe nie Nachtdienst.", "Nunca tenho plantão noturno."],
      ]},
    ],
    grammar: [
      {
        heading: "Verbo haben",
        tables: [
          conj("haben", "ter", ["ich habe", "du hast", "er/sie/es hat", "wir haben", "ihr habt", "sie/Sie haben"], "Uso: Ich habe (oft) Stress. / Ich habe (nie) Nachtdienst."),
        ],
      },
    ],
    atencao: "Em alemão a profissão vem sem artigo após 'sein': Ich bin Lehrer (não 'ein Lehrer'). E muitas profissões têm forma feminina com -in: Lehrer → Lehrerin.",
    vocab: [
      { de: "der Arzt / die Ärztin", pt: "médico(a)", art: "der/die", cat: "Profissões" },
      { de: "der Lehrer / die Lehrerin", pt: "professor(a)", art: "der/die", cat: "Profissões" },
      { de: "der Verkäufer / die Verkäuferin", pt: "vendedor(a)", art: "der/die", cat: "Profissões" },
      { de: "der Automechaniker / die Automechanikerin", pt: "mecânico(a)", art: "der/die", cat: "Profissões" },
      { de: "der Fahrer / die Fahrerin", pt: "motorista", art: "der/die", cat: "Profissões" },
      { de: "der Koch / die Köchin", pt: "cozinheiro(a)", art: "der/die", cat: "Profissões" },
      { de: "der Bürokaufmann / die Bürokauffrau", pt: "auxiliar administrativo", art: "der/die", cat: "Profissões" },
    ],
    prompts: [
      { title: "Candidatura por telefone", text: "Atue como recrutador de uma empresa alemã. Simule uma ligação onde eu me candidato a uma vaga: pergunte minha profissão, experiência e disponibilidade. Eu uso haben para descrever condições de trabalho. Corrija no final." },
    ],
  },

  // ============================ LEKTION 9 ============================
  {
    id: 9,
    part: "a1.2",
    title: "Beim Arzt",
    icon: "🩺",
    lernziele: [
      "Descrever sintomas e dores",
      "Marcar e remarcar consultas médicas",
      "Entender instruções médicas simples",
      "Comunicar ausência no trabalho por motivo de saúde (Krankmeldung)",
    ],
    redemittel: [
      { group: "Sintomas", items: [
        ["Ich habe Kopfschmerzen.", "Estou com dor de cabeça."],
        ["Ich habe Fieber.", "Estou com febre."],
        ["Ich habe eine Erkältung.", "Estou resfriado(a)."],
        ["Mir tut der Bauch weh.", "Minha barriga dói."],
        ["Ich möchte einen Termin machen.", "Quero marcar uma consulta."],
      ]},
    ],
    grammar: [
      {
        heading: 'Expressões com "haben" para sintomas',
        body: "Ich habe Kopfschmerzen / Halsschmerzen / Rückenschmerzen / Ohrenschmerzen / Zahnschmerzen.\nIch habe Fieber. / Ich habe eine Erkältung. / Ich habe Schnupfen.\nMir tut der Kopf / der Bauch / der Rücken weh.",
      },
    ],
    atencao: 'Use "Ich habe …schmerzen" para dores específicas, ou "Mir tut … weh" para uma parte do corpo. Os dois são comuns na consulta.',
    vocab: [
      { de: "der Hausarzt", pt: "clínico geral", art: "der", cat: "Médicos" },
      { de: "der Zahnarzt", pt: "dentista", art: "der", cat: "Médicos" },
      { de: "der HNO-Arzt", pt: "otorrino", art: "der", cat: "Médicos" },
      { de: "der Orthopäde", pt: "ortopedista", art: "der", cat: "Médicos" },
      { de: "der Frauenarzt", pt: "ginecologista", art: "der", cat: "Médicos" },
      { de: "der Kinderarzt", pt: "pediatra", art: "der", cat: "Médicos" },
      { de: "die Kopfschmerzen", pt: "dor de cabeça", art: "die", cat: "Sintomas" },
      { de: "das Fieber", pt: "febre", art: "das", cat: "Sintomas" },
      { de: "die Erkältung", pt: "resfriado", art: "die", cat: "Sintomas" },
      { de: "der Schnupfen", pt: "coriza", art: "der", cat: "Sintomas" },
    ],
    prompts: [
      { title: "Na consulta", text: "Atue como médico(a) alemão(ã). Vou descrever meus sintomas usando 'Ich habe …schmerzen' e 'Mir tut … weh'. Faça perguntas, dê instruções simples e me ajude a marcar um Termin. Corrija meus erros." },
    ],
  },

  // ============================ LEKTION 10 ============================
  {
    id: 10,
    part: "a1.2",
    title: "Gestern und heute (Wie war der Urlaub?)",
    icon: "🧳",
    lernziele: [
      "Falar sobre experiências passadas recentes (férias, fim de semana)",
      "Usar o pretérito dos verbos sein e haben",
      "Contar onde esteve e o que fez de forma simples",
    ],
    redemittel: [
      { group: "Passado", items: [
        ["Ich war letztes Wochenende in Berlin.", "Estive em Berlim no fim de semana passado."],
        ["Wir waren vier Tage am Meer.", "Ficamos quatro dias na praia."],
        ["Das Wetter war super.", "O tempo estava ótimo."],
        ["Ich war noch nie in den Bergen.", "Nunca estive nas montanhas."],
      ]},
    ],
    grammar: [
      {
        heading: "Pretérito de sein e haben",
        tables: [
          conj("sein (Präteritum)", "ser/estar (passado)", ["ich war", "du warst", "er/sie/es war", "wir waren", "ihr wart", "sie/Sie waren"], "Para dizer onde você esteve."),
          conj("haben (Präteritum)", "ter (passado)", ["ich hatte", "du hattest", "er/sie/es hatte", "wir hatten", "ihr hattet", "sie/Sie hatten"], "Para dizer o que você teve/tinha."),
        ],
      },
    ],
    atencao: "Para falar do passado no A1, sein e haben usam o Präteritum (war / hatte), não o Perfekt. Os outros verbos virão depois no nível A2.",
    vocab: [
      { de: "der Urlaub", pt: "férias", art: "der", cat: "Viagem" },
      { de: "das Meer", pt: "mar", art: "das", cat: "Viagem" },
      { de: "die Berge", pt: "montanhas", art: "die", cat: "Viagem" },
      { de: "das Wetter", pt: "tempo (clima)", art: "das", cat: "Viagem" },
      { de: "das Wochenende", pt: "fim de semana", art: "das", cat: "Viagem" },
      { de: "die Reise", pt: "viagem", art: "die", cat: "Viagem" },
    ],
    prompts: [
      { title: "Como foram suas férias?", text: "Atue como amigo(a) alemão(ã). Pergunte como foi meu último fim de semana ou férias. Eu respondo usando war e hatte. Corrija meu uso do pretérito de sein e haben." },
    ],
  },

  // ============================ LEKTION 11 ============================
  {
    id: 11,
    part: "a1.2",
    title: "Wir gehen shoppen",
    icon: "🛍️",
    lernziele: [
      "Falar sobre roupas, tamanhos e preços",
      "Usar adjetivos para descrever roupas (zu eng, zu weit, zu klein…)",
      "Pedir para trocar um produto",
      "Dar opinião sobre aparência",
    ],
    redemittel: [
      { group: "Compras", items: [
        ["Der Pullover ist zu eng.", "O suéter está apertado demais."],
        ["Die Hose ist zu weit.", "A calça está larga demais."],
        ["Ich möchte das umtauschen.", "Quero trocar isto."],
        ["Was kostet das?", "Quanto custa isto?"],
      ]},
    ],
    grammar: [
      {
        heading: "A. Adjetivos para roupas",
        body: "Tamanho: eng / weit, klein / groß, kurz / lang\nPreço: teuer / günstig\nAparência: schön / hässlich, passend / nicht passend\nEx.: 'Der Pullover ist zu eng.' / 'Die Hose ist zu weit.'",
      },
      {
        heading: "B. Verbos com Akkusativ",
        body: "brauchen + Akkusativ\nnehmen + Akkusativ\nsuchen + Akkusativ\numtauschen + Akkusativ\nkaufen + Akkusativ",
      },
    ],
    atencao: "No Akkusativ, o masculino muda: der → den. Ex.: Ich brauche den Pullover. Os outros gêneros não mudam (die/das ficam iguais).",
    vocab: [
      { de: "der Pullover", pt: "suéter", art: "der", cat: "Roupas" },
      { de: "die Hose", pt: "calça", art: "die", cat: "Roupas" },
      { de: "das Hemd", pt: "camisa", art: "das", cat: "Roupas" },
      { de: "das T-Shirt", pt: "camiseta", art: "das", cat: "Roupas" },
      { de: "der Rock", pt: "saia", art: "der", cat: "Roupas" },
      { de: "das Kleid", pt: "vestido", art: "das", cat: "Roupas" },
      { de: "die Schuhe", pt: "sapatos", art: "die", cat: "Roupas" },
      { de: "die Jacke", pt: "jaqueta", art: "die", cat: "Roupas" },
      { de: "eng", pt: "apertado", art: "(Adj)", cat: "Adjetivos" },
      { de: "weit", pt: "largo", art: "(Adj)", cat: "Adjetivos" },
      { de: "teuer", pt: "caro", art: "(Adj)", cat: "Adjetivos" },
      { de: "günstig", pt: "barato", art: "(Adj)", cat: "Adjetivos" },
    ],
    prompts: [
      { title: "Na loja", text: "Atue como vendedor(a) de uma loja de roupas alemã. Eu provo roupas e comento usando adjetivos (zu eng, zu weit, zu teuer). Ajude-me a pedir uma troca (umtauschen). Corrija o Akkusativ (den)." },
    ],
  },

  // ============================ LEKTION 12 ============================
  {
    id: 12,
    part: "a1.2",
    title: "Endlich Frühling",
    icon: "🌷",
    lernziele: [
      "Falar sobre o tempo e as estações do ano",
      "Usar números ordinais (der erste, der zweite…)",
      "Convidar para uma festa e responder a convites",
      "Escrever mensagens e e-mails curtos sobre eventos",
    ],
    redemittel: [
      { group: "Convites", items: [
        ["Kommst du auch?", "Você vem também?"],
        ["Wir möchten dich einladen.", "Queremos te convidar."],
        ["Vielen Dank für die Einladung. Ich komme gerne.", "Obrigado pelo convite. Eu venho com prazer."],
        ["Leider kann ich nicht kommen.", "Infelizmente não posso ir."],
      ]},
    ],
    grammar: [
      {
        heading: "A. Números Ordinais (1º ao 10º)",
        body: "1. der erste · 2. der zweite · 3. der dritte · 4. der vierte · 5. der fünfte\n6. der sechste · 7. der siebte · 8. der achte · 9. der neunte · 10. der zehnte\nCom datas: 'Der fünfte Juli' (nominativo) / 'am fünften Juli' (am + Dativ).",
      },
      {
        heading: "B. Estações e Tempo",
        body: "der Frühling (primavera) — warm, die Sonne scheint, die Blumen blühen\nder Sommer — heiß, man geht schwimmen\nder Herbst — kühl, die Blätter fallen\nder Winter — kalt, es schneit",
      },
    ],
    atencao: 'Com datas e preposição use a forma com -en: "am fünften Juli", não "am fünf Juli".',
    vocab: [
      { de: "der Frühling", pt: "primavera", art: "der", cat: "Estações" },
      { de: "der Sommer", pt: "verão", art: "der", cat: "Estações" },
      { de: "der Herbst", pt: "outono", art: "der", cat: "Estações" },
      { de: "der Winter", pt: "inverno", art: "der", cat: "Estações" },
      { de: "die Sonne", pt: "sol", art: "die", cat: "Tempo" },
      { de: "der Regen", pt: "chuva", art: "der", cat: "Tempo" },
      { de: "der Schnee", pt: "neve", art: "der", cat: "Tempo" },
      { de: "die Einladung", pt: "convite", art: "die", cat: "Festa" },
      { de: "die Party", pt: "festa", art: "die", cat: "Festa" },
      { de: "das Fest", pt: "festa/celebração", art: "das", cat: "Festa" },
    ],
    prompts: [
      { title: "Convite para festa", text: "Atue como amigo(a) alemão(ã). Me convide para uma festa por mensagem e eu respondo aceitando ou recusando. Depois inverta. Cobre os números ordinais nas datas (am fünften Juli) e o vocabulário de estações." },
    ],
  },
];

// Banco central de erros comuns de falantes de português
const COMMON_MISTAKES = [
  { titulo: "du vs Sie", errado: 'Usar "du" com todo mundo', certo: "Soa rude em situações formais; comece com Sie", lektion: 1 },
  { titulo: "Artigos possessivos", errado: "mein Eltern", certo: "meine Eltern", lektion: 2 },
  { titulo: "sein no plural", errado: "Das ist meine Kinder", certo: "Das sind meine Kinder", lektion: 2 },
  { titulo: "Preposições + caso", errado: "Confundir Akkusativ e Dativ", certo: "in den Supermarkt (direção) vs im Supermarkt (local)", lektion: 7 },
  { titulo: "fahren / nehmen", errado: "Esquecer a mudança de vogal", certo: "ich fahre → du fährst", lektion: 7 },
  { titulo: "Números ordinais", errado: "am fünf Juli", certo: "am fünften Juli", lektion: 12 },
  { titulo: "Plural sem Umlaut", errado: "die Apfel", certo: "die Äpfel", lektion: 4 },
];

// Dicas finais de estudo (da ementa)
const STUDY_TIPS = [
  "Faça 1 Lektion por dia no ritmo atual (15–18 páginas).",
  "Depois de cada Lektion, use os prompts com a IA para speaking.",
  "Grave-se falando e compare com os modelos.",
  "Revise os erros comuns toda semana.",
  "Faça uma revisão geral das 12 Lektionen ao terminar o A1.2.",
  "Viel Erfolg beim Lernen! Você vai conseguir! 💪",
];

window.DATA = { COURSE, LESSONS, COMMON_MISTAKES, STUDY_TIPS };
