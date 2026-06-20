// progress.js — Persistência de progresso, streak diário, XP/níveis e conquistas (localStorage)

const STORE_KEY = "deutschlernen.progress.v1";

const DEFAULT_STATE = {
  completedLessons: {},     // { "1": true, ... }
  completedSections: {},    // { "1": { lernziele:true, vocab:true, ... } }
  xp: 0,
  streak: 0,
  lastStudyDate: null,      // "YYYY-MM-DD"
  bestStreak: 0,
  achievements: {},         // { id: timestamp }
  exerciseStats: { answered: 0, correct: 0 },
  lastLessonId: null,
};

const Progress = (() => {
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      return Object.assign(structuredClone(DEFAULT_STATE), JSON.parse(raw));
    } catch (e) {
      return structuredClone(DEFAULT_STATE);
    }
  }

  function save() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("progress:change"));
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function daysBetween(a, b) {
    const da = new Date(a + "T00:00:00");
    const db = new Date(b + "T00:00:00");
    return Math.round((db - da) / 86400000);
  }

  // Chamado em qualquer atividade de estudo → mantém o streak
  function touchStreak() {
    const today = todayStr();
    if (state.lastStudyDate === today) return;
    if (state.lastStudyDate) {
      const diff = daysBetween(state.lastStudyDate, today);
      state.streak = diff === 1 ? state.streak + 1 : 1;
    } else {
      state.streak = 1;
    }
    state.lastStudyDate = today;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    save();
    checkAchievements();
  }

  // Se passou mais de 1 dia sem estudar, zera o streak ao abrir o app
  function reconcileStreak() {
    if (!state.lastStudyDate) return;
    const diff = daysBetween(state.lastStudyDate, todayStr());
    if (diff > 1) { state.streak = 0; save(); }
  }

  function addXp(amount) {
    state.xp += amount;
    save();
    checkAchievements();
  }

  const LEVELS = [
    { name: "Anfänger", min: 0, icon: "🌱" },
    { name: "Lerner", min: 100, icon: "📘" },
    { name: "Fortgeschritten", min: 300, icon: "🚀" },
    { name: "Könner", min: 600, icon: "⭐" },
    { name: "Profi", min: 1000, icon: "🏆" },
    { name: "Meister", min: 1600, icon: "👑" },
  ];

  function level() {
    let lvl = LEVELS[0], idx = 0;
    LEVELS.forEach((l, i) => { if (state.xp >= l.min) { lvl = l; idx = i; } });
    const next = LEVELS[idx + 1] || null;
    const floor = lvl.min;
    const ceil = next ? next.min : lvl.min;
    const pct = next ? Math.round(((state.xp - floor) / (ceil - floor)) * 100) : 100;
    return { ...lvl, index: idx, next, pct, toNext: next ? next.min - state.xp : 0 };
  }

  function isLessonDone(id) { return !!state.completedLessons[id]; }

  function completeLesson(id) {
    if (!state.completedLessons[id]) {
      state.completedLessons[id] = true;
      state.xp += 50;
    }
    state.lastLessonId = id;
    save();
    touchStreak();
    checkAchievements();
  }

  function uncompleteLesson(id) {
    if (state.completedLessons[id]) {
      delete state.completedLessons[id];
      state.xp = Math.max(0, state.xp - 50);
      save();
    }
  }

  function setLastLesson(id) { state.lastLessonId = id; save(); }

  function toggleSection(lessonId, section) {
    const s = state.completedSections[lessonId] || (state.completedSections[lessonId] = {});
    s[section] = !s[section];
    save();
    touchStreak();
  }
  function isSectionDone(lessonId, section) {
    return !!(state.completedSections[lessonId] && state.completedSections[lessonId][section]);
  }

  function recordExercise(correct) {
    state.exerciseStats.answered++;
    if (correct) { state.exerciseStats.correct++; state.xp += 5; }
    save();
    touchStreak();
    checkAchievements();
  }

  function completedCount() { return Object.keys(state.completedLessons).length; }

  // ---- Conquistas ----
  const ACHIEVEMENTS = [
    { id: "first_lesson", icon: "🎯", title: "Primeiro passo", desc: "Conclua a sua primeira Lektion", test: () => completedCount() >= 1 },
    { id: "a11_done", icon: "📗", title: "A1.1 completo", desc: "Conclua as Lektionen 1 a 6", test: () => [1,2,3,4,5,6].every(isLessonDone) },
    { id: "a12_done", icon: "📘", title: "A1.2 completo", desc: "Conclua as Lektionen 7 a 12", test: () => [7,8,9,10,11,12].every(isLessonDone) },
    { id: "all_done", icon: "🎓", title: "A1 completo!", desc: "Conclua todas as 12 Lektionen", test: () => completedCount() >= 12 },
    { id: "streak_3", icon: "🔥", title: "Ofensiva de 3 dias", desc: "Estude 3 dias seguidos", test: () => state.bestStreak >= 3 },
    { id: "streak_7", icon: "🔥", title: "Uma semana!", desc: "Estude 7 dias seguidos", test: () => state.bestStreak >= 7 },
    { id: "xp_300", icon: "🚀", title: "300 XP", desc: "Alcance 300 pontos de experiência", test: () => state.xp >= 300 },
    { id: "ex_50", icon: "🧠", title: "Treinador", desc: "Responda 50 exercícios", test: () => state.exerciseStats.answered >= 50 },
    { id: "ex_100correct", icon: "💯", title: "100 acertos", desc: "Acerte 100 exercícios", test: () => state.exerciseStats.correct >= 100 },
  ];

  function checkAchievements() {
    let unlocked = false;
    ACHIEVEMENTS.forEach(a => {
      if (!state.achievements[a.id] && a.test()) {
        state.achievements[a.id] = Date.now();
        unlocked = true;
        window.dispatchEvent(new CustomEvent("achievement:unlock", { detail: a }));
      }
    });
    if (unlocked) save();
  }

  function achievementsView() {
    return ACHIEVEMENTS.map(a => ({ ...a, unlocked: !!state.achievements[a.id] }));
  }

  function reset() {
    state = structuredClone(DEFAULT_STATE);
    save();
  }

  return {
    get state() { return state; },
    save, touchStreak, reconcileStreak, addXp, level, LEVELS,
    isLessonDone, completeLesson, uncompleteLesson, setLastLesson,
    toggleSection, isSectionDone, recordExercise, completedCount,
    achievementsView, checkAchievements, reset,
  };
})();

window.Progress = Progress;
