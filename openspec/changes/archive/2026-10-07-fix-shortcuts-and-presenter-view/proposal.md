## Why

Lors de l'unification récente du moteur avec Diagram as Code 2, deux régressions ont été introduites :
1. Les raccourcis clavier `C` (mode confort / agrandissement texte) et `T` (bascule de thème sombre / clair) s'annulent immédiatement lors de la frappe en raison d'un double écouteur d'événements (`theme-controller.js` et `slide-engine.js`). De surcroît, le style `[data-readability="high-contrast"]` forçait une couleur de texte noire (`#000000`), ce qui rendait le texte invisible sur le thème sombre `cli-dark`.
2. Le raccourci d'ouverture de la vue présentateur a été déporté de `P` vers `V` (ou `Alt+P`) pour permettre aux télécommandes de scène d'utiliser `P` pour *Previous* (précédent), mais ce choix n'est pas cohérent avec l'affichage d'aide en bas de slide (`this.hints` affichant encore `P`), la spécification d'origine et la documentation.

Cette proposition pérennise et officialise la touche `V` (View) pour la vue présentateur tout en assurant une cohérence complète (code, hints, doc, spec) et rétablit le bon fonctionnement unique des touches `C` et `T`.

## What Changes

- **Suppression du double écouteur clavier** : Centralisation des raccourcis clavier dans `slide-engine.js` et suppression de l'écouteur redondant dans `theme-controller.js`. La frappe de `C` ou `T` ne déclenche plus qu'une seule fois l'action sans rebond.
- **Cohérence du raccourci Présentateur sur `V`** :
  - Mise à jour du bandeau d'aide visuel du diaporama (`hints`) : affichage de `V` au lieu de `P` (`← → ↓ ↑ · scroll · touch · V`).
  - Maintien du support de `Alt+P` en raccourci alternatif.
  - Préservation de la touche `P` pour la navigation précédente (télécommandes sans fil).
- **Adaptation du mode de lisibilité et confort (C) au thème actif** :
  - Définition d'un contraste élevé adapté pour les thèmes sombres (`cli-dark`, `slate-architect` : texte blanc pur `#ffffff` et bordures accentuées) en plus des thèmes clairs (`cli-light`, `google-blueprint-light` : texte noir `#000000`).
  - Maintien de l'agrandissement de corps via `--font-bump: 6.5px`.
- **Alignement documentaire et spécifications** :
  - Mise à jour de `openspec/specs/slide-engine/spec.md` pour acter formellement `V` (et `Alt+P`) comme raccourci d'ouverture.
  - Mise à jour de `README.md` pour clarifier le tableau des raccourcis.

## Hors périmètre

- Aucune modification de l'ordonnancement ou du contenu textuel des 15 slides.
- Aucun changement sur le flux WebRTC miroir ou le chronomètre persistant.

## Capabilities

### Modified Capabilities
- `slide-engine`: Mise à jour du scénario d'ouverture de la console présentateur (touche `V` et `Alt+P`), correction de la temporisation et de la centralisation des raccourcis `C` et `T`, et actualisation du message d'aide `hints`.
- `presentation-ux`: Définition du contraste élevé adaptatif selon le thème actif (sombre ou clair) pour le mode de confort fond de salle (`[data-readability="high-contrast"]`).

## Impact

- `presentation/src/scripts/theme-controller.js` : retrait de l'écouteur global `keydown` dupliqué.
- `presentation/src/scripts/slide-engine.js` : mise à jour du texte de `this.hints` pour refléter `V`.
- `presentation/src/styles/tokens.css` : déclinaison de `[data-readability="high-contrast"]` pour thèmes sombres et clairs.
- `openspec/specs/slide-engine/spec.md` : scénario console présentateur mis à jour.
- `README.md` : documentation des touches mise à jour.
- `presentation/public/presentation.html` : recompilation via `npm run build:deck`.
