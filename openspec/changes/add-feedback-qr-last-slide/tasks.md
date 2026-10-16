---
schema: spec-driven
created: 2026-10-15

---
## 1. Préparation des assets et de la configuration

- [x] 1.1 Copier l'image du QR feedback fournie par l'orateur vers `presentation/public/assets/feedback-qr.png`.
- [x] 1.2 Corriger `feedback.qrImage` dans `presentation/event.config.json` (`./assets/feedback-qr.png`).

## 2. Diapositive Merci

- [x] 2.1 Dans `presentation/src/slides/14-merci.html`, placer les deux QR (support et feedback) dans une seule `.outro-qr-card`, avec un libellé court sous chaque QR.
- [x] 2.2 Ajouter le style minimal de la rangée de deux QR dans `presentation/src/styles/components.css` (et la surcharge compacte dans `decorations.css` si nécessaire).

## 3. Notes présentateur

- [x] 3.1 Mettre à jour la slide 14 de `deroule-conference-slides.md` (mots-clés, action scénique, verbatim) pour citer le QR de feedback.
- [x] 3.2 Vérifier que `README.md` ne décrit pas un unique QR sur la slide finale ; corriger si besoin.

## 4. Vérification

- [x] 4.1 Lancer `npm run build` dans `presentation/` pour régénérer `presenter-data.json` et `presentation.html`.
- [x] 4.2 Lancer `npm run verify` et corriger les écarts éventuels.
- [x] 4.3 Contrôle navigateur sur `presentation.html` (slide 14) à 1920×1080 et à une hauteur compacte : les deux QR sont visibles, non rognés, et leurs libellés sont lisibles.
