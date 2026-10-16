## Context

`14-merci.html` place un unique bloc `.outro-qr-card` dans `.outro-qr-pane`, colonne droite de la grille `.slide--outro .slide__inner` (ratio 1.25fr / 0.85fr, puis 1.25fr / 0.75fr avec la surcharge de `decorations.css`). Cette surcharge réduit déjà le QR à 65–85 px sur les écrans à hauteur contrainte. Le QR de feedback doit tenir dans la même colonne sans déborder verticalement.

## Options

1. **Deux cartes empilées verticalement** : chaque QR garde sa carte. Simple, mais double la hauteur de la colonne. Risque de dépassement sur les écrans compacts (`max-height: 94vh`) où la surcharge réduit déjà la taille.
2. **Une carte unique avec deux QR côte à côte** (retenu) : la hauteur reste celle d'une carte, la largeur de 420 px suffit pour deux QR de 150–180 px avec libellé court (« Support » / « Feedback »). Modification limitée à `14-merci.html` et à un petit bloc de style.

Choix : option 2. Hypothèse à confirmer par un spike navigateur : à la taille compacte de `decorations.css`, deux QR de 65–85 px restent scannables sur vidéoprojecteur. Si non, basculer en option 1 pour ce seul format.

## Décisions

- Le QR feedback est une image statique (`public/assets/feedback-qr.png`), copiée depuis le fichier fourni par l'orateur. `generate-qr.js` ne régénère pas cette image car `feedback.url` reste vide dans la configuration.
- `feedback.qrImage` dans `event.config.json` passe de `./assets/presentation-qr.png` à `./assets/feedback-qr.png` (correction d'une erreur de copie).
- La note présentateur (slide 14) mentionne le QR feedback ; `presenter-data.json` est régénéré par `npm run build`, pas édité à la main.
- Pas de nouveau JavaScript : `updateMerciQrSpotlightPosition` ne cible que `.slide__aside--feedback`, absent de cette slide.
