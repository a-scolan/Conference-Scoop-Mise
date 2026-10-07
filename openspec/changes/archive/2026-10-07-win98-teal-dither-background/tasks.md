## 1. Définition des tokens et textures rétro Windows 98

- [x] 1.1 Déclarer le motif SVG de micro-tramage dither 2×2 et les variables de carreaux biseautés dans `presentation/src/styles/tokens.css` et vérifier la validité de la syntaxe CSS.
- [x] 1.2 Définir la palette de fond Teal modernisée (`--bg`, lueur radiale d'ambiance et contrastes texte > 9:1) dans `presentation/src/styles/themes/cli-dark.css` et `slate-architect.css`, puis vérifier l'absence d'erreurs de syntaxe.
- [x] 1.3 Adapter la déclinaison claire équivalente dans `presentation/src/styles/themes/cli-light.css` et `google-blueprint-light.css` avec une teinte teal feutrée très claire et vérifier la cohérence des variables.

## 2. Intégration du fond à carreaux et tramage dans le moteur de styles

- [x] 2.1 Mettre à jour `presentation/src/styles/decorations.css` pour superposer les carreaux biseautés Windows 98 (« Thatches ») et le micro-dithering sur `.deck` et `.slide`, puis vérifier que les surfaces de cartes/code restent opaques et lisibles.
- [x] 2.2 Configurer l'atténuation complète de la texture de fond sous le mode confort `[data-readability="high-contrast"]` dans `presentation/src/styles/tokens.css` et vérifier le rendu à contraste maximal.

## 3. Compilation du deck et validation globale

- [x] 3.1 Recompiler le bundle de présentation complet avec `node presentation/build-deck.js` et vérifier que `presentation/public/presentation.html` est régénéré sans avertissement.
- [x] 3.2 Exécuter les tests de conformité et de synchronisation des sources avec `npm run verify` dans `presentation/` et vérifier que tous les checks passent au vert.
- [x] 3.3 Valider visuellement le rendu en conditions réelles (alternance des 4 thèmes avec la touche `T`, mode confort avec `C`, lisibilité des blocs de code et du texte en fond de salle).
