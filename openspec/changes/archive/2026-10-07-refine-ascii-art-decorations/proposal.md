## Why

Les filigranes décoratifs en art ASCII injectés en arrière-plan des diapositives (logo Windows 98 pour les slides Scoop/PATH/erreurs/DevRecipe et logo Java pour les slides Mise) renforcent l'ambiance rétro-informatique de la conférence. Cependant, plusieurs défauts visuels diminuent leur impact et leur lisibilité :
- Le logo Java actuel est abstrait, tronqué et difficilement identifiable comme la célèbre tasse de café Java.
- Les logos à l'intérieur de leur cadre de fenêtre console sont décentrés vers la gauche et les bordures latérales présentent des décalages d'alignement.
- Les libellés de bas de cadre comportent des mentions trop longues ou obsolètes (« MICROSOFT WINDOWS 98 // WIN32 USER-SPACE » au lieu de « WIN32 USER-SPACE », et « JAVA RUNTIME // SWITCH AUTOMATIQUE AU CD » au lieu du switch automatique selon le dossier).
- La position globale de ces ornements (actuellement centrée verticalement à droite) empiète parfois sur les cartes de contenu et gagnerait à être calée plus haut et plus à droite.

## What Changes

- **Remplacement de l'art ASCII Java** : intégration d'un dessin ASCII complexe, détaillé et fidèle de la tasse de café Java avec de multiples volutes de vapeur ascendantes en dégradé chaud, un rebord 3D en ellipse, un corps de tasse texturé avec inscription, des vagues de café chaud, une anse ergonomique 3D et une soucoupe à double lisière.
- **Centrage des logos dans les fenêtres ASCII** : recalibrage des espaces internes des motifs Windows 98 et Java pour un centrage parfait et une largeur de ligne uniforme (47 colonnes utiles, bordures `║` parfaitement verticales).
- **Mise à jour des libellés de fenêtres ASCII** :
  - Remplacement de `[ MICROSOFT WINDOWS 98 // WIN32 USER-SPACE ]` par `[ WIN32 USER-SPACE ]` (avec centrage).
  - Remplacement de `[ JAVA RUNTIME // SWITCH AUTOMATIQUE AU CD ]` par `[ SWITCH AUTOMATIQUE SELON DOSSIER ]` (avec centrage).
- **Repositionnement CSS en haut à droite** : ajustement de `.petscii-bg-art` dans `presentation/src/styles/petscii.css` pour pousser les blocs décoratifs vers le coin supérieur droit (remplacement du centrage vertical `top: 50%` par un calage supérieur `top: clamp(...)` et marge droite resserrée) sans masquer les titres de diapositives.
- **Régénération du deck assemblé** : recompilation via `build-deck.js` et vérification de la cohérence globale.

## Hors périmètre

- Aucune modification de la structure des diapositives, de la pagination, de la narration ou des notes orateur (`slides.json`, `deroule-conference-slides.md`).
- Aucune modification des règles de masquage responsive (les arts ASCII restent masqués sous 960px).
- Aucun impact sur les scripts d'animation ou les contrôles interactifs (laser, zoom, navigation).

## Capabilities

### New Capabilities
*(Aucune)*

### Modified Capabilities
- `presentation-ux`: affinage des ornements ASCII Art rétro (libellés clarifiés, glyphe de tasse Java réaliste, centrage géométrique dans le cadre de fenêtre et positionnement en haut à droite).

## Impact

- Fichiers modifiés :
  - `presentation/src/scripts/slide-engine.js` (génération HTML de `win98Html` et `javaHtml`, recalibrage des largeurs et centrage).
  - `presentation/src/styles/petscii.css` (positionnement CSS de `.petscii-bg-art`).
  - `presentation/public/presentation.html` (recompilation via `build-deck.js`).
- Résultat observable pour le public et l'orateur :
  - Les spectateurs identifient instantanément la tasse Java sur les slides Mise.
  - Les fenêtres ASCII rétro apparaissent nettes, avec des bordures droites et des visuels bien centrés.
  - Les ornements sont déportés dans l'espace vide en haut à droite, dégageant ainsi le contenu central des diapositives.
