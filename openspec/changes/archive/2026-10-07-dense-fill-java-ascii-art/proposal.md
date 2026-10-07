## Why

Le logo Windows 98 en art ASCII utilise un style graphique particulier et iconique avec des remplissages denses composés de caractères typographiques variés (`.`, `,`, `:`, `;`, `!`, `t`, `z`, `3`, `E`, `Z`, `Q`, `F`, `L`, `V`, `@`, `#`, `$`, `*`).
En comparaison, le logo Java actuel (rendu en contour filaire) manque de cohérence visuelle avec l'esprit et la texture du logo Windows 98.
De plus, les boutons de fenêtre `[ _ ][ X ]` sur la bordure supérieure ont été ajustés manuellement dans `presentation/public/presentation.html` pour combler un décalage horizontal (36 caractères `═` avant le bouton). Cette correction doit être pérennisée dans la source de vérité `presentation/src/scripts/slide-engine.js` afin d'éviter toute régression lors des compilations futures.

## What Changes

- **Harmonisation stylistique du logo Java** : refonte intégrale de la tasse de café Java en ASCII dense avec remplissages texturés dans le style exact du logo Windows 98 (volutes de vapeur denses, rebord, corps de tasse rempli, anse et soucoupe), colorisé en rouge (#ff3333), ambre (#ffb900), bleu (#1084d0 / #58a6ff) et vert (#00aa00).
- **Pérennisation du calage des boutons de cadre de fenêtre** : alignement de la bordure supérieure `╔════════════════════════════════════[ _ ][ X ]═╗` (exactement 36 `═` avant les boutons et 1 `═` après, totalisant 49 caractères) dans `win98Html` et `javaHtml` au sein de `slide-engine.js`.
- **Maintien de l'alignement géométrique strict** : 47 colonnes utiles intérieures, bordures latérales `║` parfaitement verticales, libellé `[ SWITCH AUTOMATIQUE SELON DOSSIER ]` centré.

## Hors périmètre

- Aucune modification du contenu des diapositives, des notes orateur ou du manifeste de présentation.
- Aucune modification du positionnement CSS `.petscii-bg-art` (déjà calé en haut à droite).

## Capabilities

### New Capabilities
*(Aucune)*

### Modified Capabilities
- `presentation-ux`: affinage des remplissages ASCII pour le logo Java (style matriciel dense harmonisé avec Windows 98) et alignement pérenne des boutons de contrôle de fenêtre `[ _ ][ X ]`.

## Impact

- Fichiers modifiés :
  - `presentation/src/scripts/slide-engine.js` (mise à jour de `win98Html` et `javaHtml`).
  - `presentation/public/presentation.html` (recompilation via `build-deck.js`).
- Résultat observable pour le public et l'orateur :
  - La tasse Java possède désormais la même texture graphique dense et colorée que le logo Windows 98, créant une unité visuelle parfaite.
  - Les boutons de fenêtre `[ _ ][ X ]` restent impeccablement calés à droite sans décalage.
