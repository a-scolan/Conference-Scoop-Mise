## 1. Dédoublonnage des raccourcis C et T et gestion du contraste élevé

- [x] 1.1 Supprimer l'écouteur `keydown` redondant dans `presentation/src/scripts/theme-controller.js` pour éviter le double-basculement immédiat
- [x] 1.2 Adapter la règle `[data-readability="high-contrast"]` dans `presentation/src/styles/tokens.css` pour supporter le contraste élevé en thèmes sombres (`cli-dark`) et clairs (`cli-light`)

## 2. Cohérence de la touche Présentateur sur V

- [x] 2.1 Mettre à jour `this.hints` dans `presentation/src/scripts/slide-engine.js` pour afficher `V` au lieu de `P`
- [x] 2.2 Vérifier que `SlideEngine.prototype.bindEvents` mappe `V` et `Alt+P` vers `self.openPresenterView()`, et conserve `p`/`P` dans `isPrev` pour télécommandes

## 3. Alignement des spécifications, documentation et validation

- [x] 3.1 Mettre à jour `openspec/specs/slide-engine/spec.md` et `openspec/specs/presentation-ux/spec.md`
- [x] 3.2 Mettre à jour le tableau des raccourcis dans `README.md`
- [x] 3.3 Recompiler le diaporama avec `npm run build:deck` et valider avec `npm run verify`
