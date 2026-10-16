## ADDED Requirements

### Requirement: QR de feedback sur la diapositive de remerciement
La diapositive de remerciement (`Merci`) SHALL afficher, dans le même panneau, deux QR codes côte à côte ou empilés : le QR du support de présentation et le QR de feedback OpenFeedback. Chaque QR MUST disposer d'un libellé lisible à distance. L'image du QR de feedback MUST provenir de `event.config.json` (`feedback.qrImage`).

#### Scenario: Affichage des deux QR codes
- **WHEN** La diapositive `Merci` est affichée
- **THEN** Le QR du support (`presentation-qr.png`) et le QR de feedback (`feedback-qr.png`) sont visibles simultanément, chacun avec un libellé distinct (support / feedback).

#### Scenario: Chemin de l'image feedback issu de la configuration
- **WHEN** `event.config.json` définit `feedback.qrImage`
- **THEN** La diapositive `Merci` affiche cette image sans modification manuelle du balisage après compilation.

#### Scenario: Lisibilité en salle
- **WHEN** Le QR de feedback est affiché sur un vidéoprojecteur en 1920×1080
- **THEN** Chaque QR code occupe au moins 140 px de côté à l'écran et son libellé est affiché en texte lisible.

#### Scenario: Écartement des deux QR codes
- **WHEN** La diapositive `Merci` est affichée sur un écran large ou en mobile paysage compact
- **THEN** Les deux QR codes sont séparés d'au moins 40 px sur grand écran et d'au moins 20 px en mobile paysage, sans chevauchement ni débordement de la carte.
