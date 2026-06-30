// srs.js — Revisão espaçada (Leitner simplificado) para vocabulário e erros comuns.
// Cada card tem um "box" (1..5). Intervalos crescentes; errar volta para o box 1.

const SRS_KEY = "deutschlernen.srs.v1";

const SRS = (() => {
  // Intervalos em dias por box
  const INTERVALS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };

  let deck = load(); // { id: { box, due, front, back, hint, lektion } }

  function load() {
    try { return JSON.parse(localStorage.getItem(SRS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save() {
    localStorage.setItem(SRS_KEY, JSON.stringify(deck));
    window.dispatchEvent(new CustomEvent("srs:change"));
  }
  function today() { return new Date().toISOString().slice(0, 10); }
  function addDays(dateStr, n) {
    const d = new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  // Semeia o deck a partir de todo o vocabulário + erros comuns (idempotente)
  function seed() {
    const { LESSONS, COMMON_MISTAKES } = window.DATA;
    LESSONS.forEach(les => {
      (les.vocab || []).forEach(v => {
        const id = "v:" + les.id + ":" + v.de;
        if (!deck[id]) {
          deck[id] = { box: 1, due: today(), front: v.de, back: v.pt, hint: v.art, lektion: les.id, type: "vocab" };
        }
      });
    });
    COMMON_MISTAKES.forEach((m, i) => {
      const id = "m:" + i;
      if (!deck[id]) {
        deck[id] = { box: 1, due: today(), front: "❌ " + m.errado, back: "✅ " + m.certo, hint: m.titulo, lektion: m.lektion, type: "mistake" };
      }
    });
    // Verbos das notas da Nadine (Infinitiv → Präteritum + Partizip II)
    (window.VERBS || []).forEach(v => {
      const id = "vb:" + v.inf;
      if (!deck[id]) {
        deck[id] = {
          box: 1, due: today(), type: "verb",
          front: v.inf + " (" + v.pt + ")",
          back: "Prät.: " + v.praet + " · Part. II: " + v.pp + " · (" + v.aux + ")",
          hint: v.change || (v.mixed ? "forma mista" : v.aux),
        };
      }
    });
    save();
  }

  function dueCards() {
    const t = today();
    return Object.entries(deck)
      .filter(([, c]) => c.due <= t)
      .map(([id, c]) => ({ id, ...c }));
  }

  function dueCount() { return dueCards().length; }

  function grade(id, remembered) {
    const c = deck[id];
    if (!c) return;
    if (remembered) {
      c.box = Math.min(5, c.box + 1);
    } else {
      c.box = 1;
    }
    c.due = addDays(today(), INTERVALS[c.box]);
    // Se o intervalo é 0 (box 1), agenda para amanhã para não repetir infinitamente na mesma sessão
    if (INTERVALS[c.box] === 0) c.due = addDays(today(), 1);
    save();
    if (window.Progress) window.Progress.recordExercise(remembered);
  }

  function stats() {
    const all = Object.values(deck);
    const byBox = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    all.forEach(c => byBox[c.box]++);
    const learned = all.filter(c => c.box >= 4).length;
    return { total: all.length, learned, byBox, due: dueCount() };
  }

  function reset() { deck = {}; save(); }

  return { seed, dueCards, dueCount, grade, stats, reset, get deck() { return deck; } };
})();

window.SRS = SRS;
