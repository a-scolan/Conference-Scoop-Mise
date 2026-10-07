## MODIFIED Requirements

### Requirement: Calibrage typographique pour visibilité en grand amphithéâtre
Le système de rendu du diaporama DOIT (SHALL) garantir des dimensions de police lisibles sans effort à plus de 15 mètres de distance sur vidéoprojecteur standard lors d'une projection sur grand écran, et proposer un mode confort/lisibilité renforcée adaptable au thème visuel actif.

#### Scenario: Rendu d'une diapositive de contenu en salle plénière
- **WHEN** Une diapositive de texte ou de concept est projetée sur un écran large ($\ge 1024$px)
- **THEN** Le corps de texte respecte une taille minimale absolue de 24 pixels (`clamp(24px, 2.2vw, 36px)`) et les titres principaux atteignent au minimum 48 pixels.

#### Scenario: Activation du mode confort et contraste élevé
- **WHEN** L'utilisateur active le mode lisibilité via la touche `C` ou la commande dédiée
- **THEN** L'attribut `data-readability="high-contrast"` est appliqué, majorant la taille de police (`--font-bump: 6.5px`) et adaptant les couleurs de contraste à la nature du thème actif (texte blanc pur sur fond sombre en `cli-dark`, texte noir pur sur fond clair en `cli-light`).
