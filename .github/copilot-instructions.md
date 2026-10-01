# Copilot Workspace Instructions

Projet : support de la conférence quickie (15 min) « Installer ses outils de dev avec Scoop et Mise ».
Langue de travail : français. Le deck est un site HTML statique assemblé depuis `presentation/src/`.

**Pilotage par OpenSpec :** toute évolution du deck, de la narration ou de l'outillage de démo passe par un change OpenSpec (`openspec/changes/`). Utiliser les skills `openspec-*` de `.github/skills/`.

**Skills utiles :**
- `writing-shape`, `writing-beats`, `writing-guidelines` : narration et verbatim orateur.
- `visual-explainer`, `design-taste-frontend`, `redesign-existing-projects`, `accessibility-compliance` : slides et lisibilité en salle.

**Visual explainer :** quand l'utilisateur demande des correctifs sur les slides, mettre à jour aussi les templates/références du skill `visual-explainer` si la correction est réutilisable (préférer `references/mermaid-layout.md` aux patchs CSS locaux pour Mermaid).

**Context7 MCP** (au besoin) : documentation à jour de Scoop, Mise, Shiki, asciinema, etc.

**Cohérence obligatoire :** `presentation/src/slides/slides.json`, `deroule-conference-slides.md` et les notes présentateur doivent rester alignés. Vérifier avec `npm run verify` dans `presentation/`.

**Documentation :** après chaque changement, mettre à jour `README.md` et le déroulé si concernés.