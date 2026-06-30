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
          <span class="muted">${state.i + 1}/${cards.length} · ${c.type === "mistake" ? "Erro comum" : c.type === "verb" ? "Verbo" : "Vocabulário L" + c.lektion}</span>
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
      if (say) say.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = cards[state.i];
        // verbo: fala o infinitivo (antes do parêntese); vocab: remove o artigo inicial
        const text = card.type === "verb" ? card.front.replace(/\s*\(.*$/, "") : card.front.replace(/^[^ ]+\s/, "");
        window.App.speak(text);
      });
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

// ============================ DRILL (digitação, desafiador) ============================
const Drill = (() => {
  function mount(host, items, label) {
    if (!items || !items.length) {
      host.innerHTML = `<section class="card"><p class="muted">Sem exercícios aqui ainda.</p></section>`;
      return;
    }
    const state = { i: 0, correct: 0, answered: false, items };
    render();

    function render() {
      const q = state.items[state.i];
      const n = state.items.length;
      if (state.i >= n) return finish();
      host.innerHTML = `
        <section class="card drill">
          <div class="quiz-top">
            <span class="muted">${esc(label || "Treino")}</span>
            <span class="muted">${state.i + 1}/${n}</span>
          </div>
          <div class="bar"><div class="bar-fill" style="width:${(state.i / n) * 100}%"></div></div>
          <div class="quiz-q">${q.prompt}</div>
          ${q.type === "tekamolo" ? blocksHtml(q) : fieldsHtml(q)}
          <button class="btn btn-primary" id="check">Verificar</button>
          <div class="quiz-feedback" id="dfb"></div>
        </section>`;
      if (q.type === "tekamolo") wireBlocks(q);
      else {
        const first = host.querySelector(".drill-input");
        if (first) first.focus();
        host.querySelectorAll(".drill-input").forEach(inp =>
          inp.addEventListener("keydown", e => { if (e.key === "Enter") submit(q); }));
      }
      host.querySelector("#check").addEventListener("click", () => submit(q));
    }

    function fieldsHtml(q) {
      return `<div class="drill-blanks">${q.fields.map((f, i) =>
        `<input class="drill-input" data-i="${i}" type="text" inputmode="text"
          autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false"
          placeholder="${esc(f.ph || "")}" aria-label="${esc(f.ph || "resposta")}" />`).join("")}</div>`;
    }

    // TeKaMoLo: blocos clicáveis montam a frase na ordem escolhida
    function blocksHtml(q) {
      return `
        <div class="drill-answer" id="answer" aria-label="Sua frase"></div>
        <div class="drill-chips" id="pool">
          ${q.blocks.map((b, i) => `<button class="chip" data-i="${i}" type="button">${esc(b)}</button>`).join("")}
        </div>`;
    }
    function wireBlocks(q) {
      const pool = host.querySelector("#pool");
      const answer = host.querySelector("#answer");
      const sync = () => { q._picked = Array.from(answer.querySelectorAll(".chip")).map(c => c.textContent); };
      pool.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => {
        if (state.answered || chip.classList.contains("is-used")) return;
        chip.classList.add("is-used");
        const tag = document.createElement("button");
        tag.className = "chip chip-picked";
        tag.type = "button";
        tag.textContent = chip.textContent;
        tag.addEventListener("click", () => { // remover devolve o bloco ao pool
          if (state.answered) return;
          tag.remove();
          chip.classList.remove("is-used");
          sync();
        });
        answer.appendChild(tag);
        sync();
      }));
    }

    function submit(q) {
      if (state.answered) return;
      let ok;
      let given;
      if (q.type === "tekamolo") {
        given = (q._picked || []).join(" ");
        ok = window.Drills.check(given, q.accept[0]);
      } else {
        const inputs = Array.from(host.querySelectorAll(".drill-input"));
        if (inputs.some(inp => !inp.value.trim())) { inputs.find(inp => !inp.value.trim()).focus(); return; }
        ok = inputs.every((inp, i) => window.Drills.check(inp.value, q.accept[i]));
        given = inputs.map(inp => inp.value.trim()).join(" … ");
      }
      state.answered = true;
      if (ok) state.correct++;
      try { navigator.vibrate?.(ok ? 14 : [10, 40, 10]); } catch (e) {}
      window.Progress.recordExercise(ok);

      host.querySelectorAll(".drill-input").forEach(inp => { inp.disabled = true; inp.classList.add(ok ? "is-correct" : "is-wrong"); });
      host.querySelectorAll("#pool .chip, #answer .chip").forEach(c => c.disabled = true);
      const fb = host.querySelector("#dfb");
      fb.innerHTML = `
        <div class="fb ${ok ? "fb-ok" : "fb-no"}">${ok ? "✓ Richtig!" : "✗ Falsch — você escreveu: <b>" + esc(given || "—") + "</b>"}</div>
        ${ok ? "" : `<div class="drill-solution">Resposta: <b>${esc(q.solution)}</b></div>`}
        ${q.tip ? `<div class="drill-tip">💡 ${q.tip}</div>` : ""}
        <button class="btn btn-primary" id="next-d">${state.i + 1 >= state.items.length ? "Ver resultado" : "Próxima →"}</button>`;
      host.querySelector("#check").disabled = true;
      host.querySelector("#next-d").addEventListener("click", () => { state.i++; state.answered = false; render(); });
    }

    function finish() {
      const n = state.items.length;
      const pct = Math.round((state.correct / n) * 100);
      const msg = pct >= 80 ? "Stark! 🎉" : pct >= 50 ? "Weiter so! 💪" : "Übung macht den Meister! 📚";
      host.innerHTML = `
        <section class="card center">
          <p class="big">${pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</p>
          <h2>${state.correct}/${n} corretas</h2>
          <p class="muted">${msg} · +${state.correct * 5} XP</p>
          <button class="btn btn-primary" id="again">Treinar de novo</button>
        </section>`;
      host.querySelector("#again").addEventListener("click", () => mount(host, window.Drills.generate(state.items[0].type, n), label));
    }
  }

  return { mount };
})();

window.Quiz = Quiz;
window.Flashcards = Flashcards;
window.Drill = Drill;
