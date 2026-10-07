## 1. Harmonisation ASCII et calage des boutons dans slide-engine.js

- [x] 1.1 Pérenniser le calage des boutons `[ _ ][ X ]` sur la bordure supérieure de `win98Html` dans `presentation/src/scripts/slide-engine.js` en utilisant `╔════════════════════════════════════[ _ ][ X ]═╗` (largeur exacte de 49 caractères) et vérifier que toutes les lignes de `win98Html` font rigoureusement 49 caractères.
- [x] 1.2 Remplacer le tracé de `javaHtml` dans `presentation/src/scripts/slide-engine.js` par une tasse de café Java en ASCII dense avec remplissages texturés dans le style graphique du logo Windows 98, aligner la bordure supérieure `╔════════════════════════════════════[ _ ][ X ]═╗`, et vérifier que toutes les lignes font rigoureusement 49 caractères.

## 2. Recompilation et validation

- [x] 2.1 Recompiler le deck via `node presentation/build-deck.js` et vérifier que `presentation/public/presentation.html` contient les nouveaux blocs avec alignement parfait des bordures.
- [x] 2.2 Exécuter `node scripts/verify-conference.js` pour s'assurer de l'alignement global du diaporama.
