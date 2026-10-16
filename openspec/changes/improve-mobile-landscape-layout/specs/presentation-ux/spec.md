## ADDED Requirements

### Requirement: Lisibilité en paysage compact sans chevauchement ni texte coupé
Le moteur de rendu DOIT (SHALL) garantir qu'en orientation paysage compact (hauteur ≤ 560 px), l'essentiel de chaque diapositive reste lisible : aucun élément décoratif ne recouvre du texte, aucun titre de fenêtre terminal n'est tronqué par ellipse, et aucun bloc ne dépasse les bords de la diapositive. Le défilement interne d'un conteneur est le seul mécanisme toléré pour le contenu qui ne tient pas.

#### Scenario: Cartes de concept en paysage compact
- **WHEN** une diapositive à cartes est affichée en paysage compact (ex. 667×375)
- **THEN** les hachures décoratives (`.card-hatch-strip-wrap`) sont masquées, l'en-tête de chaque carte reste dans les bords de la carte et ses libellés passent à la ligne au besoin.

#### Scenario: Fenêtre terminal en paysage compact
- **WHEN** une diapositive contient un bloc terminal (`.terminal-block`) en paysage compact
- **THEN** le badge décoratif est masqué, le titre est replié sur plusieurs lignes au lieu d'être tronqué, et le bloc reste dans la hauteur de la diapositive, son contenu défilant en interne si nécessaire.

#### Scenario: Diapositive de conclusion en paysage compact
- **WHEN** la diapositive de conclusion est affichée en paysage compact
- **THEN** l'antisèche et les QR codes de support et de feedback tiennent dans la diapositive sans défilement.

#### Scenario: Rendu bureau inchangé
- **WHEN** la présentation est affichée sur un écran de bureau (hauteur > 560 px et largeur > 960 px)
- **THEN** les hachures décoratives restent visibles et la mise en page n'est pas modifiée.
