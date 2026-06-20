# Deutsch lernen · A1 — Einfach gut! 🇩🇪

PWA (Progressive Web App) para acompanhar minha jornada de aprendizado de alemão,
cobrindo toda a ementa **A1.1 + A1.2** do material *Einfach gut! Deutsch für die Integration*
(baseado nos livros oficiais telc 2022).

App estático em **HTML/CSS/JS puro**, sem dependências e sem build. Instalável no
celular/desktop e funciona **offline**.

## Funcionalidades

- **12 Lektionen completas** — A1.1 (1–6) e A1.2 (7–12), cada uma com:
  - 🎯 Objetivos (Lernziele)
  - 🗣️ Frases úteis (Redemittel) com áudio (text-to-speech em alemão)
  - 📖 Gramática com tabelas de conjugação, números, alfabeto
  - 📚 Vocabulário com artigo, plural e tradução
  - ⚠️ "Atenção para brasileiros" (erros comuns)
  - 🤖 Prompts prontos para estudar com IA
- **Exercícios interativos** gerados do conteúdo: artigos (der/die/das),
  tradução, conjugação, du vs Sie, Akkusativ/Dativ.
- **Revisão espaçada (SRS)** estilo Leitner para vocabulário e erros comuns.
- **Senso de progresso:**
  - ✅ Lições concluídas + barras de progresso
  - 🔥 Streak diário (ofensiva)
  - ⭐ XP e níveis (Anfänger → Meister)
  - 🏆 Conquistas/badges

## Como usar

Abra `index.html` em qualquer navegador, ou publique no GitHub Pages.
O progresso é salvo localmente (localStorage) no dispositivo.

### Publicar no GitHub Pages

1. Settings → Pages → Source: branch desejada, pasta `/ (root)`.
2. Acesse a URL gerada e use "Adicionar à tela inicial" para instalar como app.

## Estrutura

```
index.html              # shell do app (SPA)
manifest.webmanifest    # configuração do PWA
sw.js                   # service worker (offline)
css/styles.css          # design system
js/content.js           # todo o conteúdo das 12 Lektionen
js/progress.js          # conclusão, streak, XP, conquistas
js/srs.js               # revisão espaçada
js/exercises.js         # geração de exercícios
js/ui.js                # widgets de quiz e flashcards
js/app.js               # roteamento e renderização
icons/                  # ícones do PWA
```

*Viel Erfolg beim Lernen! 💪*
