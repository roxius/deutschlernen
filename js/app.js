// app.js — Roteador por hash e renderização de todas as telas.

// ---------- Tema (claro/escuro/sistema) ----------
const Theme = {
  KEY: "deutschlernen.theme",
  get() { return localStorage.getItem(this.KEY) || "light"; },
  set(v) { localStorage.setItem(this.KEY, v); this.apply(); },
  effective() {
    const v = this.get();
    if (v === "system") return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return v;
  },
  apply() {
    const eff = this.effective();
    document.documentElement.setAttribute("data-theme", eff);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = eff === "dark" ? "#1a1a2e" : "#ffffff";
  },
};

// ---------- Preferência de movimento ----------
const Motion = {
  KEY: "deutschlernen.motion",
  isReduced() { return localStorage.getItem(this.KEY) === "reduced"; },
  toggle() { localStorage.setItem(this.KEY, this.isReduced() ? "full" : "reduced"); this.apply(); },
  apply() { document.documentElement.classList.toggle("reduce-motion", this.isReduced()); },
};

function haptic(pattern) { try { navigator.vibrate?.(pattern); } catch (e) {} }

const App = (() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const view = () => document.getElementById("view");
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Componentes reutilizáveis ----------
  function progressBar(pct) {
    // width:0 + data-w → animação de preenchimento disparada após o render
    return `<div class="bar"><div class="bar-fill" style="width:0" data-w="${pct}"></div></div>`;
  }

  function lessonById(id) { return window.DATA.LESSONS.find(l => l.id === id); }

  // ---------- Tela: Início ----------
  function renderHome() {
    const P = window.Progress;
    const lvl = P.level();
    const done = P.completedCount();
    const total = window.DATA.LESSONS.length;
    const overallPct = Math.round((done / total) * 100);
    const due = window.SRS.dueCount();
    // Alvo do card "Continuar": primeira Lektion não concluída; se todas feitas, revisar
    const lessonsByOrder = window.DATA.LESSONS.slice().sort((a, b) => a.id - b.id);
    const nextTodo = lessonsByOrder.find(l => !P.isLessonDone(l.id));
    const target = nextTodo || (P.state.lastLessonId ? lessonById(P.state.lastLessonId) : lessonsByOrder[0]);
    const ctaEyebrow = done === 0 ? "Começar" : nextTodo ? "Continuar" : "Revisar";
    const greeting = (() => {
      const h = new Date().getHours();
      if (h < 10) return "Guten Morgen";
      if (h < 18) return "Guten Tag";
      return "Guten Abend";
    })();

    view().innerHTML = `
      <header class="hero">
        <div class="hero-top">
          <p class="hero-greet">${greeting}! 👋</p>
          <a class="icon-btn" href="#/config" aria-label="Configurações">⚙️</a>
        </div>
        <h1>Sua jornada no alemão</h1>
        <p class="hero-sub">${esc(window.DATA.COURSE.title)} · ${window.DATA.COURSE.level}</p>
      </header>

      <div class="stat-row">
        <div class="stat-card ${P.state.streak ? "streak-on" : ""}">
          <span class="stat-icon">🔥</span>
          <span class="stat-num">${P.state.streak}</span>
          <span class="stat-lbl">dias seguidos</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${lvl.icon}</span>
          <span class="stat-num">${P.state.xp}</span>
          <span class="stat-lbl">XP · ${esc(lvl.name)}</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📚</span>
          <span class="stat-num">${done}/${total}</span>
          <span class="stat-lbl">lições</span>
        </div>
      </div>

      <section class="card">
        <div class="card-head">
          <h2>Nível ${esc(lvl.name)} ${lvl.icon}</h2>
          ${lvl.next ? `<span class="muted">${lvl.toNext} XP p/ ${esc(lvl.next.name)}</span>` : `<span class="muted">Nível máximo!</span>`}
        </div>
        ${progressBar(lvl.pct)}
      </section>

      <section class="card">
        <div class="card-head"><h2>Progresso geral</h2><span class="muted">${overallPct}%</span></div>
        ${progressBar(overallPct)}
      </section>

      <div class="cta-grid">
        <a class="cta cta-primary" href="#/licao/${target.id}">
          <span class="cta-eyebrow">${ctaEyebrow}</span>
          <span class="cta-title">${target.icon} L${target.id} · ${esc(target.title)}</span>
        </a>
        <a class="cta ${due ? "cta-alert" : ""}" href="#/revisao">
          <span class="cta-eyebrow">Revisão (SRS)</span>
          <span class="cta-title">🔁 ${due ? due + " cards para revisar" : "Em dia ✓"}</span>
        </a>
        <a class="cta" href="#/treino">
          <span class="cta-eyebrow">Treino rápido</span>
          <span class="cta-title">🧠 Quiz misto</span>
        </a>
      </div>

      <section class="card tips">
        <h2>💡 Dica de estudo</h2>
        <p>${esc(window.DATA.STUDY_TIPS[new Date().getDate() % window.DATA.STUDY_TIPS.length])}</p>
      </section>
    `;
  }

  // ---------- Tela: Trilha ----------
  function renderTrack() {
    const P = window.Progress;
    const parts = window.DATA.COURSE.parts.map(part => {
      const lessons = part.lessons.map(id => {
        const l = lessonById(id);
        const doneL = P.isLessonDone(id);
        return `
          <a class="lesson-row ${doneL ? "is-done" : ""}" href="#/licao/${id}">
            <span class="lesson-ico">${l.icon}</span>
            <span class="lesson-body">
              <span class="lesson-title">L${id} · ${esc(l.title)}</span>
              ${l.highlight ? `<span class="badge-hot">★ ${esc(l.highlight)}</span>` : ""}
            </span>
            <span class="lesson-state">${doneL ? "✓" : "›"}</span>
          </a>`;
      }).join("");
      const partDone = part.lessons.filter(P.isLessonDone).length;
      return `
        <section class="part">
          <div class="part-head">
            <h2>${esc(part.title)}</h2>
            <span class="muted">${esc(part.subtitle)} · ${partDone}/${part.lessons.length}</span>
          </div>
          ${progressBar(Math.round((partDone / part.lessons.length) * 100))}
          <div class="lesson-list">${lessons}</div>
        </section>`;
    }).join("");

    view().innerHTML = `<header class="page-head"><h1>Trilha de aprendizado</h1></header>${parts}`;
  }

  // ---------- Tela: Lição ----------
  const TABS = [
    { key: "objetivos", label: "Objetivos" },
    { key: "frases", label: "Frases" },
    { key: "gramatica", label: "Gramática" },
    { key: "vocab", label: "Vocabulário" },
    { key: "exercicios", label: "Exercícios" },
  ];

  // Navegação para frente no rodapé da lição
  function nextNav(id) {
    if (id >= 12) return `<a class="btn btn-ghost" href="#/trilha">Concluir trilha 🎉</a>`;
    const nx = lessonById(id + 1);
    return `<a class="btn btn-ghost" href="#/licao/${id + 1}">Próxima → L${id + 1} · ${esc(nx.title)}</a>`;
  }

  function renderLesson(id, tab = "objetivos") {
    const l = lessonById(id);
    if (!l) return renderHome();
    const P = window.Progress;
    P.setLastLesson(id);
    const done = P.isLessonDone(id);

    const tabsHtml = TABS.map(t =>
      `<button class="tab ${t.key === tab ? "is-active" : ""}" data-tab="${t.key}">${t.label}</button>`
    ).join("");

    view().innerHTML = `
      <header class="lesson-hero">
        <a class="back" href="#/trilha">‹ Trilha</a>
        <div class="lesson-hero-main">
          <span class="lesson-hero-ico">${l.icon}</span>
          <div>
            <p class="muted">Lektion ${l.id}</p>
            <h1>${esc(l.title)}</h1>
          </div>
        </div>
        ${l.highlight ? `<span class="badge-hot">★ ${esc(l.highlight)}</span>` : ""}
      </header>
      <nav class="tabs">${tabsHtml}</nav>
      <div id="tab-content"></div>
      <div class="lesson-footer">
        <button id="toggle-done" class="btn ${done ? "btn-done" : "btn-primary"}">
          ${done ? "✓ Concluída — desmarcar" : "Marcar Lektion como concluída (+50 XP)"}
        </button>
        ${nextNav(id)}
      </div>
    `;

    renderTabContent(l, tab);

    view().querySelectorAll(".tab").forEach(btn => {
      btn.addEventListener("click", () => {
        location.hash = `#/licao/${id}/${btn.dataset.tab}`;
      });
    });
    $("#toggle-done").addEventListener("click", () => {
      if (P.isLessonDone(id)) { P.uncompleteLesson(id); renderLesson(id, tab); }
      else {
        P.completeLesson(id);
        haptic([12, 30, 12]);
        // avança automaticamente: próxima Lektion, ou Trilha se for a última
        location.hash = id < 12 ? `#/licao/${id + 1}` : "#/trilha";
      }
    });
  }

  function renderTabContent(l, tab) {
    const box = $("#tab-content");
    let html = "";

    if (tab === "objetivos") {
      html = `
        <section class="card">
          <h2>🎯 Lernziele — Objetivos</h2>
          <ul class="goals">${l.lernziele.map(g => `<li>${esc(g)}</li>`).join("")}</ul>
        </section>
        ${l.atencao ? `<section class="card warn"><h2>⚠️ Atenção para brasileiros</h2><p>${esc(l.atencao)}</p></section>` : ""}
        ${(l.prompts || []).length ? `
        <section class="card">
          <h2>🤖 Prompts para estudar com IA</h2>
          ${l.prompts.map(p => `
            <div class="prompt">
              <div class="prompt-head"><strong>${esc(p.title)}</strong><button class="copy" data-copy="${esc(p.text)}">Copiar</button></div>
              <p>${esc(p.text)}</p>
            </div>`).join("")}
        </section>` : ""}
      `;
    }

    if (tab === "frases") {
      html = (l.redemittel || []).map(group => `
        <section class="card">
          <h2>${esc(group.group)}</h2>
          <div class="phrase-list">
            ${group.items.map(([de, pt]) => `
              <div class="phrase">
                <span class="phrase-de">${esc(de)}</span>
                <span class="phrase-pt">${esc(pt)}</span>
                <button class="speak" data-say="${esc(de)}" title="Ouvir">🔊</button>
              </div>`).join("")}
          </div>
        </section>`).join("") || emptyMsg("Sem frases nesta seção.");
    }

    if (tab === "gramatica") {
      html = (l.grammar || []).map(g => `
        <section class="card">
          <h2>${esc(g.heading)}</h2>
          ${g.body ? `<p class="pre">${esc(g.body)}</p>` : ""}
          ${(g.tables || []).map(t => `
            <div class="conj">
              <div class="conj-head">${esc(t.verb)} — <span class="muted">${esc(t.meaning)}</span></div>
              <div class="conj-grid">${t.forms.map(f => `<span>${esc(f)}</span>`).join("")}</div>
              ${t.note ? `<p class="conj-note">${esc(t.note)}</p>` : ""}
            </div>`).join("")}
        </section>`).join("");

      if (l.numbers) html += `<section class="card"><h2>🔢 ${esc(l.numbers.title)}</h2>
        <div class="num-grid">${l.numbers.list.map(([n, w]) => `<span class="num"><b>${n}</b> ${esc(w)} <button class="speak" data-say="${esc(w)}">🔊</button></span>`).join("")}</div></section>`;
      if (l.alphabet) html += `<section class="card"><h2>🔤 ${esc(l.alphabet.title)}</h2>
        <div class="alpha">${l.alphabet.special.map(([c, s, ex]) => `<div class="alpha-row"><span class="alpha-char">${esc(c)}</span><span>${esc(s)} <em>(${esc(ex)})</em></span><button class="speak" data-say="${esc(ex)}">🔊</button></div>`).join("")}</div></section>`;
      if (!html) html = emptyMsg("Sem gramática nesta lição.");
    }

    if (tab === "vocab") {
      const cats = {};
      (l.vocab || []).forEach(v => (cats[v.cat] = cats[v.cat] || []).push(v));
      html = Object.entries(cats).map(([cat, items]) => `
        <section class="card">
          <h2>${esc(cat)}</h2>
          <div class="vocab-list">
            ${items.map(v => `
              <div class="vocab">
                <div class="vocab-main">
                  <span class="vocab-de">${esc(v.de)}</span>
                  <button class="speak" data-say="${esc(v.de.replace(/\s*\/.*/, ''))}">🔊</button>
                </div>
                <span class="vocab-pt">${esc(v.pt)}</span>
                ${v.plural ? `<span class="vocab-meta">Plural: ${esc(v.plural)}</span>` : ""}
              </div>`).join("")}
          </div>
        </section>`).join("") || emptyMsg("Sem vocabulário nesta lição.");
    }

    if (tab === "exercicios") {
      box.innerHTML = `<div id="quiz-host"></div>`;
      Quiz.mount($("#quiz-host"), l.id, `Exercícios — L${l.id}`);
      return;
    }

    box.innerHTML = html;
    wireCommon(box);
  }

  function emptyMsg(t) { return `<section class="card"><p class="muted">${esc(t)}</p></section>`; }

  // Liga botões de copiar e falar (+ acessibilidade)
  function wireCommon(root) {
    root.querySelectorAll(".copy").forEach(b => {
      b.setAttribute("aria-label", "Copiar texto");
      b.addEventListener("click", () => {
        navigator.clipboard?.writeText(b.dataset.copy);
        b.textContent = "Copiado ✓";
        haptic(8);
        setTimeout(() => (b.textContent = "Copiar"), 1500);
      });
    });
    root.querySelectorAll(".speak").forEach(b => {
      b.setAttribute("aria-label", "Ouvir em alemão");
      b.addEventListener("click", () => {
        speak(b.dataset.say);
        b.classList.add("speaking");
        setTimeout(() => b.classList.remove("speaking"), 700);
      });
    });
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  // ---------- Tela: Treino (escolha de tópico → quiz) ----------
  function renderTreino(topic) {
    const topics = window.Exercises.TOPICS;

    // Sem tópico: mostra o seletor
    if (!topic) {
      view().innerHTML = `
        <header class="page-head"><a class="back" href="#/">‹ Início</a><h1>🧠 Treino</h1>
          <p class="muted">Escolha um tópico para focar — ou faça o quiz misto.</p></header>
        <div class="topic-grid">
          ${topics.map(t => `
            <a class="topic-card" href="#/treino/${t.key}">
              <span class="topic-ico">${t.icon}</span>
              <span class="topic-title">${esc(t.label)}</span>
              <span class="topic-desc">${esc(t.desc)}</span>
            </a>`).join("")}
        </div>`;
      return;
    }

    // Com tópico: monta o quiz focado
    const t = topics.find(x => x.key === topic) || topics[0];
    view().innerHTML = `
      <header class="page-head"><a class="back" href="#/treino">‹ Tópicos</a><h1>${t.icon} ${esc(t.label)}</h1>
        <p class="muted">${esc(t.desc)}</p></header>
      <div id="quiz-host"></div>`;
    Quiz.mount($("#quiz-host"), null, t.label, t.key === "mixed" ? null : t.key);
  }

  // ---------- Tela: Revisão (SRS) ----------
  function renderRevisao() {
    window.SRS.seed();
    const due = window.SRS.dueCards();
    const st = window.SRS.stats();
    if (!due.length) {
      view().innerHTML = `<header class="page-head"><a class="back" href="#/">‹ Início</a><h1>🔁 Revisão</h1></header>
        <section class="card center">
          <p class="big">🎉</p><h2>Tudo em dia!</h2>
          <p class="muted">Você não tem cards para revisar agora. Volte amanhã.</p>
          <div class="srs-stats">
            <span>${st.learned}/${st.total} dominados</span>
          </div>
        </section>`;
      return;
    }
    view().innerHTML = `<header class="page-head"><a class="back" href="#/">‹ Início</a><h1>🔁 Revisão</h1>
      <p class="muted">${due.length} cards · método de repetição espaçada</p></header>
      <div id="srs-host"></div>`;
    Flashcards.mountSRS($("#srs-host"), due);
  }

  // ---------- Tela: Conquistas ----------
  function renderConquistas() {
    const P = window.Progress;
    const list = P.achievementsView();
    const got = list.filter(a => a.unlocked).length;
    view().innerHTML = `
      <header class="page-head"><a class="back" href="#/">‹ Início</a><h1>🏆 Conquistas</h1>
        <p class="muted">${got}/${list.length} desbloqueadas · Melhor ofensiva: ${P.state.bestStreak} dias</p></header>
      <div class="ach-grid">
        ${list.map(a => `
          <div class="ach ${a.unlocked ? "is-on" : "is-off"}">
            <span class="ach-ico">${a.icon}</span>
            <span class="ach-title">${esc(a.title)}</span>
            <span class="ach-desc">${esc(a.desc)}</span>
          </div>`).join("")}
      </div>
      <section class="card">
        <h2>📊 Estatísticas</h2>
        <div class="kv"><span>Exercícios respondidos</span><b>${P.state.exerciseStats.answered}</b></div>
        <div class="kv"><span>Acertos</span><b>${P.state.exerciseStats.correct}</b></div>
        <div class="kv"><span>XP total</span><b>${P.state.xp}</b></div>
      </section>
      <section class="card">
        <h2>⚠️ Erros comuns para revisar</h2>
        ${window.DATA.COMMON_MISTAKES.map(m => `<div class="mistake"><b>${esc(m.titulo)}</b> <span class="x">${esc(m.errado)}</span> → <span class="ok">${esc(m.certo)}</span></div>`).join("")}
      </section>
      <a class="btn" href="#/config">⚙️ Configurações</a>
    `;
  }

  // ---------- Tela: Configurações ----------
  function renderConfig() {
    const curr = Theme.get();
    const reduced = Motion.isReduced();
    const themeBtn = (val, ico, label) =>
      `<button data-theme-val="${val}" class="${curr === val ? "is-active" : ""}" aria-pressed="${curr === val}"><span class="seg-ico">${ico}</span>${label}</button>`;

    view().innerHTML = `
      <header class="page-head"><a class="back" href="#/">‹ Início</a><h1>⚙️ Configurações</h1></header>
      <section class="card">
        <h2>🎨 Tema</h2>
        <div class="seg" id="theme-seg" role="group" aria-label="Escolher tema">
          ${themeBtn("light", "☀️", "Claro")}
          ${themeBtn("dark", "🌙", "Escuro")}
          ${themeBtn("system", "🖥️", "Sistema")}
        </div>
      </section>
      <section class="card">
        <h2>✨ Animações</h2>
        <div class="row-toggle">
          <div><div>Reduzir animações</div><div class="rt-desc">Desativa transições e efeitos de movimento (acessibilidade).</div></div>
          <button class="switch ${reduced ? "on" : ""}" id="motion-switch" role="switch" aria-checked="${reduced}" aria-label="Reduzir animações"></button>
        </div>
      </section>
      <section class="card">
        <h2>🔊 Pronúncia</h2>
        <div class="row-toggle">
          <div><div>Voz em alemão</div><div class="rt-desc" id="voice-status">Verificando…</div></div>
          <button class="btn" style="width:auto;padding:10px 16px" id="test-voice">Testar 🔊</button>
        </div>
      </section>
      <section class="card danger">
        <h2>Zerar progresso</h2>
        <p class="muted">Apaga todo o seu progresso, XP e revisões neste dispositivo.</p>
        <button id="reset-btn" class="btn btn-danger">Apagar tudo</button>
      </section>
      <p class="muted center small">Deutsch lernen · A1 — Einfach gut! 🇩🇪</p>
    `;

    view().querySelectorAll("#theme-seg button").forEach(b =>
      b.addEventListener("click", () => { Theme.set(b.dataset.themeVal); haptic(8); renderConfig(); }));
    $("#motion-switch").addEventListener("click", () => { Motion.toggle(); renderConfig(); });
    $("#test-voice").addEventListener("click", () => speak("Guten Tag! Wie geht es Ihnen?"));
    $("#reset-btn").addEventListener("click", () => {
      if (confirm("Tem certeza? Isso apaga todo o seu progresso.")) {
        window.Progress.reset(); window.SRS.reset(); location.hash = "#/";
      }
    });
    updateVoiceStatus();
  }

  function updateVoiceStatus() {
    const el = $("#voice-status");
    if (!el) return;
    if (!("speechSynthesis" in window)) { el.textContent = "Não suportado neste navegador."; return; }
    const check = () => {
      const hasDe = speechSynthesis.getVoices().some(v => v.lang && v.lang.toLowerCase().startsWith("de"));
      el.textContent = hasDe ? "Voz alemã disponível ✓" : "Usando a voz padrão do sistema.";
    };
    check();
    speechSynthesis.onvoiceschanged = check;
  }

  // ---------- Roteador ----------
  function route() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/").filter(Boolean);
    window.scrollTo(0, 0);

    if (parts.length === 0) renderHome();
    else if (parts[0] === "trilha") renderTrack();
    else if (parts[0] === "licao") renderLesson(parseInt(parts[1], 10), parts[2] || "objetivos");
    else if (parts[0] === "treino") renderTreino(parts[1] || null);
    else if (parts[0] === "revisao") renderRevisao();
    else if (parts[0] === "conquistas") renderConquistas();
    else if (parts[0] === "config") renderConfig();
    else renderHome();

    updateNav(parts[0] || "");
    animateBars();
  }

  // Dispara o preenchimento animado das barras de progresso após o render
  function animateBars() {
    requestAnimationFrame(() => {
      view().querySelectorAll(".bar-fill[data-w]").forEach(el => { el.style.width = el.dataset.w + "%"; });
    });
  }

  function updateNav(active) {
    document.querySelectorAll(".nav-item").forEach(n => {
      n.classList.toggle("is-active", n.dataset.route === active || (!active && n.dataset.route === ""));
    });
    // badge de revisão
    const badge = document.getElementById("nav-srs-badge");
    if (badge) {
      const due = window.SRS.dueCount();
      badge.textContent = due || "";
      badge.style.display = due ? "flex" : "none";
    }
  }

  // ---------- Toast de conquista ----------
  function toast(a) {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="toast-ico">${a.icon}</span><div><b>Conquista desbloqueada!</b><br>${esc(a.title)}</div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 3200);
  }

  function init() {
    Theme.apply();
    Motion.apply();
    // Atualiza o tema automaticamente quando o sistema muda (modo "Sistema")
    matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
      if (Theme.get() === "system") Theme.apply();
    });
    window.SRS.seed();
    window.Progress.reconcileStreak();
    window.addEventListener("hashchange", route);
    window.addEventListener("progress:change", () => updateNav(location.hash.replace(/^#\//, "").split("/")[0]));
    window.addEventListener("srs:change", () => updateNav(location.hash.replace(/^#\//, "").split("/")[0]));
    window.addEventListener("achievement:unlock", e => toast(e.detail));
    route();
  }

  return { init, speak, wireCommon };
})();

window.App = App;
document.addEventListener("DOMContentLoaded", () => App.init());
