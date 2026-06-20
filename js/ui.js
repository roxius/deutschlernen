// ui.js — Widgets interativos: Quiz (múltipla escolha) e Flashcards (SRS).

const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ============================ QUIZ ============================
const Quiz = (() => {
  function mount(host, lessonId, label, topic = null) {
    const questions = window.Exercises.generate(lessonId, 8, topic);
    if (!questions.length) {
      host.innerHTML = `<section class="card"><p class="muted">Não há exercícios disponíveis aqui ainda.</p></section>`;
      return;
    }
    const state = { i: 0, correct: 0, questions, answered: false };
    render();

    function render() {
      const q = state.questions[state.i];
      const n = state.questions.length;
      if (state.i >= n) return finish();
      host.innerHTML = `
        <section class="card quiz">
          <div class="quiz-top">
            <span class="muted">${esc(label)}</span>
            <span class="muted">${state.i + 1}/${n}</span>
          </div>
          <div class="bar"><div class="bar-fill" style="width:${(state.i / n) * 100}%"></div></div>
          <div class="quiz-q">${q.question}${q.sub ? `<span class="quiz-sub">${esc(q.sub)}</span>` : ""}</div>
          ${q.hint ? `<button class="hint-btn" id="hint-btn" type="button">💡 Dica</button>
          <div class="quiz-hint" id="quiz-hint" hidden>${q.hint}</div>` : ""}
          <div class="quiz-opts">
            ${q.options.map((o, idx) => `<button class="opt" data-idx="${idx}">${esc(o)}</button>`).join("")}
          </div>
          <div class="quiz-feedback" id="qfb"></div>
        </section>`;
      host.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => answer(btn, q)));
      const hb = host.querySelector("#hint-btn");
      if (hb) hb.addEventListener("click", () => {
        host.querySelector("#quiz-hint").hidden = false;
        hb.hidden = true;
      });
    }

    function answer(btn, q) {
      if (state.answered) return;
      state.answered = true;
      const chosen = btn.textContent;
      const ok = chosen === q.answer;
      if (ok) state.correct++;
      try { navigator.vibrate?.(ok ? 14 : [10, 40, 10]); } catch (e) {}
      window.Progress.recordExercise(ok);
      host.querySelectorAll(".opt").forEach(b => {
        b.disabled = true;
        if (b.textContent === q.answer) b.classList.add("is-correct");
        else if (b === btn) b.classList.add("is-wrong");
      });
      // esconde o botão de dica após responder (a explicação já cobre)
      const hb = host.querySelector("#hint-btn");
      if (hb) hb.hidden = true;
      const fb = host.querySelector("#qfb");
      fb.innerHTML = `<div class="fb ${ok ? "fb-ok" : "fb-no"}">${ok ? "✓ Richtig!" : "✗ Falsch. Certo: <b>" + esc(q.answer) + "</b>"}</div>
        ${q.explain ? `<div class="quiz-explain">💡 ${q.explain}</div>` : ""}
        <button class="btn btn-primary" id="next-q">${state.i + 1 >= state.questions.length ? "Ver resultado" : "Próxima →"}</button>`;
      host.querySelector("#next-q").addEventListener("click", () => { state.i++; state.answered = false; render(); });
    }

    function finish() {
      const n = state.questions.length;
      const pct = Math.round((state.correct / n) * 100);
      const msg = pct >= 80 ? "Sehr gut! 🎉" : pct >= 50 ? "Weiter so! 💪" : "Übung macht den Meister! 📚";
      host.innerHTML = `
        <section class="card center">
          <p class="big">${pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</p>
          <h2>${state.correct}/${n} corretas</h2>
          <p class="muted">${msg} · +${state.correct * 5} XP</p>
          <button class="btn btn-primary" id="again">Jogar de novo</button>
        </section>`;
      host.querySelector("#again").addEventListener("click", () => mount(host, lessonId, label, topic));
    }
  }

  return { mount };
})();

// ============================ FLASHCARDS (SRS) ============================
const Flashcards = (() => {
  function mountSRS(host, cards) {
    const state = { i: 0, flipped: false, total: cards.length, reviewed: 0 };
    render();

    function render() {
      if (state.i >= cards.length) return finish();
      const c = cards[state.i];
      host.innerHTML = `
        <section class="card center flash" id="flash">
          <span class="muted">${state.i + 1}/${cards.length} · ${c.type === "mistake" ? "Erro comum" : "Vocabulário L" + c.lektion}</span>
          <div class="flash-card ${state.flipped ? "is-flipped" : ""}" id="fcard">
            <div class="flash-face flash-front">
              ${c.hint ? `<span class="flash-hint">${esc(c.hint)}</span>` : ""}
              <span class="flash-text">${esc(c.front)}</span>
              <span class="flash-tap">toque para virar</span>
            </div>
            <div class="flash-face flash-back">
              <span class="flash-text">${esc(c.back)}</span>
            </div>
          </div>
          ${c.type !== "mistake" ? `<button class="speak-big" id="say">🔊 Ouvir</button>` : ""}
          ${state.flipped ? `
            <div class="flash-actions">
              <button class="btn btn-danger" id="again">Errei</button>
              <button class="btn btn-done" id="got">Acertei</button>
            </div>` : `<p class="muted small">Lembre-se da resposta e vire o card</p>`}
        </section>`;

      host.querySelector("#fcard").addEventListener("click", () => { state.flipped = !state.flipped; render(); });
      const say = host.querySelector("#say");
      if (say) say.addEventListener("click", (e) => { e.stopPropagation(); window.App.speak(cards[state.i].front.replace(/^[^ ]+\s/, "")); });
      const got = host.querySelector("#got");
      const again = host.querySelector("#again");
      if (got) got.addEventListener("click", () => grade(true));
      if (again) again.addEventListener("click", () => grade(false));
    }

    function grade(ok) {
      window.SRS.grade(cards[state.i].id, ok);
      state.reviewed++;
      state.i++;
      state.flipped = false;
      render();
    }

    function finish() {
      const st = window.SRS.stats();
      host.innerHTML = `
        <section class="card center">
          <p class="big">✅</p>
          <h2>Revisão concluída!</h2>
          <p class="muted">${state.reviewed} cards revisados · ${st.learned}/${st.total} dominados</p>
          <a class="btn btn-primary" href="#/">Voltar ao início</a>
        </section>`;
    }
  }

  return { mountSRS };
})();

window.Quiz = Quiz;
window.Flashcards = Flashcards;
