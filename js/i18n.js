// i18n.js — Camada de idioma (inglês padrão + português). Carregado ANTES dos demais.
// Princípio: traduz-se a língua de EXPLICAÇÃO (en/pt). O texto-alvo em ALEMÃO e o
// feedback alemão ("Richtig!/Falsch") permanecem em alemão nos dois idiomas.
//
// Três ajudantes globais:
//   Lang.get()/set()  — idioma atual ("en" padrão | "pt"), persistido em localStorage.
//   tr(x)             — x é objeto {pt,en} → string no idioma atual; string → passa direto.
//   mean(v)           — açúcar p/ vocabulário/verbos (itens têm `pt` e novo `en`).
//   t(ptKey, params)  — strings de UI escritas em PT como chave; mapeadas p/ EN via UI_EN.

const Lang = {
  KEY: "deutschlernen.lang",
  list: ["en", "pt"],
  get() {
    const v = localStorage.getItem(this.KEY);
    return v === "pt" || v === "en" ? v : "en"; // padrão: inglês
  },
  set(v) { localStorage.setItem(this.KEY, v === "pt" ? "pt" : "en"); },
};

function tr(x) {
  if (x && typeof x === "object" && !Array.isArray(x)) {
    const l = Lang.get();
    return x[l] != null ? x[l] : (x.en != null ? x.en : x.pt);
  }
  return x;
}

function mean(v) {
  if (!v) return "";
  const l = Lang.get();
  return v[l] != null ? v[l] : v.pt;
}

// Strings de UI: a CHAVE é o texto em português; o valor é a tradução em inglês.
// Em pt devolvemos a própria chave; em en devolvemos UI_EN[chave] (fallback = chave).
const UI_EN = {
  // — Navegação / genéricos —
  "Início": "Home",
  "Trilha": "Path",
  "Treino": "Practice",
  "Revisão": "Review",
  "Troféus": "Trophies",
  "Navegação principal": "Main navigation",
  "Configurações": "Settings",
  "‹ Início": "‹ Home",
  "‹ Trilha": "‹ Path",
  "‹ Tópicos": "‹ Topics",
  "‹ Verben": "‹ Verben",
  "Voltar ao início": "Back to home",
  "Próxima →": "Next →",
  "Ver resultado": "See result",
  "Verificar": "Check",
  "💡 Dica": "💡 Hint",
  "resposta": "answer",
  "revisados": "reviewed",
  "Jogar de novo": "Play again",
  "Treinar de novo": "Practice again",
  "corretas": "correct",

  // — Início (Home) —
  "Guten Morgen": "Guten Morgen",
  "Sua jornada no alemão": "Your German journey",
  "dias seguidos": "day streak",
  "XP · ": "XP · ",
  "lições": "lessons",
  "Nível ": "Level ",
  "XP p/ ": "XP to ",
  "Nível máximo!": "Max level!",
  "Progresso geral": "Overall progress",
  "Continuar": "Continue",
  "Começar": "Start",
  "Revisar": "Review",
  "Revisão (SRS)": "Review (SRS)",
  "cards para revisar": "cards to review",
  "Em dia ✓": "All caught up ✓",
  "Treino rápido": "Quick practice",
  "Quiz misto": "Mixed quiz",
  "Notas da Nadine": "Nadine's notes",
  "Verben — verbos & Perfekt": "Verben — verbs & Perfekt",
  "Verben — verbos, fórmulas e treinos →": "Verben — verbs, formulas & drills →",
  "💡 Dica de estudo": "💡 Study tip",

  // — Trilha —
  "Trilha de aprendizado": "Learning path",

  // — Lição —
  "Objetivos": "Goals",
  "Frases": "Phrases",
  "Gramática": "Grammar",
  "Vocabulário": "Vocabulary",
  "Exercícios": "Exercises",
  "🎯 Lernziele — Objetivos": "🎯 Lernziele — Goals",
  "⚠️ Atenção para brasileiros": "⚠️ Heads-up for learners",
  "🤖 Prompts para estudar com IA": "🤖 Prompts to study with AI",
  "Copiar": "Copy",
  "Copiado ✓": "Copied ✓",
  "Marcar Lektion como concluída (+50 XP)": "Mark Lektion as complete (+50 XP)",
  "✓ Concluída — desmarcar": "✓ Completed — undo",
  "Concluir trilha 🎉": "Finish path 🎉",
  "Números": "Numbers",
  "Alfabeto Alemão": "German alphabet",
  "Ouvir": "Listen",
  "Plural: ": "Plural: ",
  "Sem frases nesta seção.": "No phrases in this section.",
  "Sem gramática nesta lição.": "No grammar in this lesson.",
  "Sem vocabulário nesta lição.": "No vocabulary in this lesson.",
  "Exercícios — L": "Exercises — L",

  // — Treino / Verben —
  "🧠 Treino": "🧠 Practice",
  "Escolha um tópico para focar — ou faça o quiz misto.": "Pick a topic to focus on — or take the mixed quiz.",
  "📝 Verben": "📝 Verben",
  "Verbos, fórmulas e treinos a partir das notas da aula com a Nadine.": "Verbs, formulas and drills from the lesson notes with Nadine.",
  "Referência": "Reference",
  "📋 Tabela de verbos (Infinitiv · Präteritum · Partizip II)": "📋 Verb table (Infinitiv · Präteritum · Partizip II)",
  "Fórmulas": "Formulas",
  "🧠 Perfekt, Partizip II, haben/sein, TeKaMoLo…": "🧠 Perfekt, Partizip II, haben/sein, TeKaMoLo…",
  "Treinos desafiadores": "Challenging drills",
  "digite a resposta": "type the answer",
  "📋 Tabela de verbos": "📋 Verb table",
  "Buscar verbo (alemão ou português)…": "Search verb (German or English)…",
  "Buscar verbo": "Search verb",
  "🧠 Fórmulas": "🧠 Formulas",
  "Sem exercícios aqui ainda.": "No exercises here yet.",
  "Não há exercícios disponíveis aqui ainda.": "No exercises available here yet.",

  // — Drill / Quiz —
  "Sua frase": "Your sentence",
  "toque nos blocos abaixo na ordem certa": "tap the blocks below in the correct order",
  "Resposta: ": "Answer: ",
  "No passado:": "In the past:",
  "A mesma frase no passado:": "The same sentence in the past:",
  "Richtig!": "Richtig!",
  "Falsch": "Falsch",
  "você escreveu: ": "you wrote: ",
  "Certo: ": "Correct: ",

  // — Revisão (SRS) —
  "🔁 Revisão": "🔁 Review",
  "mista": "mixed",
  "Tudo em dia!": "All caught up!",
  "Você não tem cards para revisar agora. Volte amanhã.": "You have no cards to review right now. Come back tomorrow.",
  "cards · método de repetição espaçada": "cards · spaced repetition method",
  "cards": "cards",
  "dominados": "mastered",
  "Erro comum": "Common mistake",
  "Verbo": "Verb",
  "Vocabulário L": "Vocabulary L",
  "toque para virar": "tap to flip",
  "Lembre-se da resposta e vire o card": "Recall the answer and flip the card",
  "Errei": "Missed",
  "Acertei": "Got it",
  "🔊 Ouvir": "🔊 Listen",
  "Revisão concluída!": "Review complete!",
  "cards revisados": "cards reviewed",

  // — Conquistas —
  "🏆 Conquistas": "🏆 Achievements",
  "Conquista desbloqueada!": "Achievement unlocked!",
  "desbloqueadas": "unlocked",
  "Melhor ofensiva: ": "Best streak: ",
  "dias": "days",
  "📊 Estatísticas": "📊 Statistics",
  "Exercícios respondidos": "Exercises answered",
  "Acertos": "Correct",
  "XP total": "Total XP",
  "⚠️ Erros comuns para revisar": "⚠️ Common mistakes to review",

  // — Configurações —
  "⚙️ Configurações": "⚙️ Settings",
  "🌐 Idioma": "🌐 Language",
  "Escolher idioma": "Choose language",
  "Inglês": "English",
  "Português": "Português",
  "🎨 Tema": "🎨 Theme",
  "Escolher tema": "Choose theme",
  "Claro": "Light",
  "Escuro": "Dark",
  "Sistema": "System",
  "✨ Animações": "✨ Animations",
  "Reduzir animações": "Reduce animations",
  "Desativa transições e efeitos de movimento (acessibilidade).": "Turns off transitions and motion effects (accessibility).",
  "🔊 Pronúncia": "🔊 Pronunciation",
  "Voz em alemão": "German voice",
  "Verificando…": "Checking…",
  "Testar 🔊": "Test 🔊",
  "Não suportado neste navegador.": "Not supported in this browser.",
  "Voz alemã disponível ✓": "German voice available ✓",
  "Usando a voz padrão do sistema.": "Using the system default voice.",
  "Zerar progresso": "Reset progress",
  "Apaga todo o seu progresso, XP e revisões neste dispositivo.": "Erases all your progress, XP and reviews on this device.",
  "Apagar tudo": "Erase everything",
  "Tem certeza? Isso apaga todo o seu progresso.": "Are you sure? This erases all your progress.",

  // — Categorias de vocabulário —
  "Países": "Countries",
  "Línguas": "Languages",
  "Família": "Family",
  "Sala de aula": "Classroom",
  "Alimentos": "Food",
  "Dias da semana": "Days of the week",
  "Cômodos": "Rooms",
  "Móveis": "Furniture",
  "Eletrodomésticos": "Appliances",
  "Transporte": "Transport",
  "Cidade": "City",
  "Profissões": "Professions",
  "Médicos": "Doctors",
  "Sintomas": "Symptoms",
  "Viagem": "Travel",
  "Roupas": "Clothes",
  "Adjetivos": "Adjectives",
  "Estações": "Seasons",
  "Tempo": "Weather",
  "Festa": "Party",
  "Rotina": "Routine",

  // — Resultado do quiz/drill —
  "Sehr gut! 🎉": "Sehr gut! 🎉",
  "Weiter so! 💪": "Weiter so! 💪",
  "Stark! 🎉": "Stark! 🎉",
  "Übung macht den Meister! 📚": "Übung macht den Meister! 📚",
};

function t(ptKey, params) {
  let s = Lang.get() === "en" ? (UI_EN[ptKey] != null ? UI_EN[ptKey] : ptKey) : ptKey;
  if (params) for (const k in params) s = s.split("{" + k + "}").join(params[k]);
  return s;
}

window.Lang = Lang;
window.tr = tr;
window.mean = mean;
window.t = t;
window.UI_EN = UI_EN;
