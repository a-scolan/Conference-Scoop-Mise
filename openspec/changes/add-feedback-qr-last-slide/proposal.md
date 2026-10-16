## Why

La diapositive finale (`14-merci.html`) n'affiche qu'un QR code vers le support de présentation. Le talk-narrative (acte 5) et `event.config.json` prévoient aussi un QR de feedback (OpenFeedback), absent du rendu. Le public ne peut donc pas donner son retour à la fin de la conférence, au moment où il est le plus disponible.

## What Changes

- Ajouter un second QR code de feedback sur la diapositive `Merci`, à côté du QR code de support, avec un libellé explicite (« Donnez votre feedback »).
- Utiliser l'image de QR feedback fournie par l'orateur, copiée dans `presentation/public/assets/feedback-qr.png`.
- Corriger `presentation/event.config.json` : `feedback.qrImage` pointe aujourd'hui vers `presentation-qr.png` (le QR support) ; il doit pointer vers `feedback-qr.png`.
- Mettre à jour la note présentateur de la slide 14 (`deroule-conference-slides.md`) pour mentionner le QR de feedback, et régénérer `presenter-data.json` par le build.

## Capabilities

### New Capabilities
- Aucune.

### Modified Capabilities
- `presentation-ux` : ajout d'une exigence sur l'affichage simultané du QR support et du QR feedback sur la diapositive de remerciement.

## Impact

- `presentation/src/slides/14-merci.html` : second bloc QR dans `.outro-qr-pane`.
- `presentation/public/assets/feedback-qr.png` : nouvel asset (image fournie).
- `presentation/event.config.json` : correction du chemin `feedback.qrImage`. `feedback.url` reste vide : `generate-qr.js` ne régénère pas l'image et conserve celle de l'orateur.
- `deroule-conference-slides.md` et `presentation/public/assets/presenter-data.json` (généré) : note présentateur de la slide 14.
- Styles : `presentation/src/styles/components.css` (et `decorations.css` si nécessaire) pour la mise en page des deux QR.

## Hors périmètre

- Création ou modification de l'URL du formulaire de feedback (le QR fourni est utilisé tel quel).
- Refonte de la slide 14 (antisèche, titre, sous-titre).
- Modification de la logique de `updateMerciQrSpotlightPosition`.
