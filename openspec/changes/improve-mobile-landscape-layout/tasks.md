---
schema: spec-driven
created: 2026-10-15

---
## 1. Diagnostic

- [x] 1.1 Rendre chaque slide en paysage compact (640×360, 667×375, 844×390) et mesurer débordements, contenus rognés et ellipses.
- [x] 1.2 Identifier la cause des hachures superposées : `petscii.css` forçait `display: block !important` sur `.card-hatch-strip-wrap`.

## 2. Corrections CSS

- [x] 2.1 Retirer `!important` sur le `display` du wrap de hachures dans `presentation/src/styles/petscii.css`.
- [x] 2.2 Synchroniser `--card-pad-x` / `--card-pad-top` avec les paddings compacts des cartes dans `presentation/src/styles/decorations.css`.
- [x] 2.3 Ajouter la section « MOBILE PAYSAGE COMPACT : CARTES ET FENÊTRES TERMINAL » en fin de `decorations.css` (en-têtes de carte, titre et badge terminal, bloc terminal borné, antisèche de conclusion).

## 3. Documentation

- [x] 3.1 Préciser dans `README.md` le rendu paysage compact.

## 4. Vérification

- [x] 4.1 Lancer `npm run build:deck` puis `npm run verify` dans `presentation/`.
- [x] 4.2 Relancer l'audit automatisé à 640×360, 667×375 et 844×390 : aucun débordement hors conteneur défilant, aucune ellipse, aucun contenu rogné.
- [x] 4.3 Contrôle visuel des slides 5, 13 et 15 à 667×375, et contrôle bureau 1280×800 (hachures toujours visibles).
