---
schema: spec-driven
created: 2026-10-15

---
## 1. Diagnostic

- [x] 1.1 Reproduire sur la démo Scoop (slide 6, 667×375) : un clic sur la console ne change pas `data-active-step`, et les boutons sont à gauche du titre.

## 2. Interaction des consoles

- [x] 2.1 Ajouter dans `presentation/src/scripts/terminal-block.js` la classe `is-advanceable` sur les consoles ayant une étape restante.
- [x] 2.2 Ajouter le listener `click` délégué qui passe à l'étape suivante via `window.deckEngine.setSlideStep`, sans changer de slide, et ignore les liens et contrôles de formulaire.

## 3. Boutons de fenêtre

- [x] 3.1 Placer `.terminal-block__controls` à droite de la barre de titre (ordre flex) dans `presentation/src/styles/components.css`, en bureau comme en mobile.
- [x] 3.2 Ajouter le curseur en main pour `.terminal-block.is-advanceable`.

## 4. Documentation

- [x] 4.1 Ajouter la ligne « clic ou tap sur une fenêtre de console » au tableau des contrôles de `README.md`.

## 5. Vérification

- [x] 5.1 `node --check` sur `terminal-block.js`, puis `npm run build:deck` et `npm run verify` dans `presentation/`.
- [x] 5.2 Sur les 5 slides à consoles, à 667×375 : chaque clic avance d'une étape jusqu'à la dernière, sans changer de slide.
- [x] 5.3 Sur les 5 slides à consoles, à 667×375 et 1280×800 : les boutons sont à droite du titre.
