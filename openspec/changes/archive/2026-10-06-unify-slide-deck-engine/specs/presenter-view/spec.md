## MODIFIED Requirements

### Requirement: Console de présentation multi-volets (Presenter Console)
Le système DOIT (SHALL) fournir une interface de contrôle dédiée pour le présentateur (`presenter-view.html`) articulée autour de 4 zones principales : miroir vidéo direct de la diapositive active ou récepteur de secours, prévisualisation cadrée de la diapositive suivante, panneau des notes et didascalies scéniques, et barre d'état temporelle avec chronomètre persistant.

#### Scenario: Affichage initial de la console présentateur
- **WHEN** L'orateur ouvre `presenter-view.html` dans une fenêtre ou sur un moniteur secondaire
- **THEN** La console charge les métadonnées et notes de la présentation, affiche la diapositive courante via son conteneur miroir vidéo direct (avec bouton d'activation en un clic) ou son scaler passif, prévisualise la diapositive suivante cadrée sur son tiers supérieur (titre et accroche), et affiche les notes orateur associées avec leurs balises scéniques.

#### Scenario: Rendu des notes et consignes de scène
- **WHEN** La diapositive courante change
- **THEN** Le volet de notes affiche le verbatim oral exact, la durée cible estimée, le beat narratif et met en évidence visuelle les consignes scéniques critiques.

#### Scenario: Proportions de texte adaptées au pupitre
- **WHEN** La console présentateur est affichée sur l'écran d'ordinateur portable
- **THEN** Le corps de texte du verbatim et des notes d'orateur adopte une taille confortable par défaut avec contraste renforcé, et propose des boutons d'ajustement dynamique de taille de police (A- / A+).

#### Scenario: Gestion du chronomètre et de l'heure courante
- **WHEN** La session est démarrée
- **THEN** L'en-tête de la console affiche l'horloge système en temps réel, le temps total écoulé depuis le début de la conférence avec persistance automatique dans `localStorage` (résistance aux rechargements ou fermetures accidentelles d'onglets), et des boutons Démarrer/Pause et Réinitialiser explicites.

## ADDED Requirements

### Requirement: Miroir vidéo P2P WebRTC matériellement accéléré (Display Stream Mirror)
La console présentateur DOIT (SHALL) recevoir le flux vidéo temps réel de la fenêtre de projection publique via WebRTC P2P local (`<video id="pv-stream-video">`), assurant un retour visuel 60fps identique au pixel près sans coût de double rendu pour les démos et animations.

#### Scenario: Réception et bascule fluide sur le flux vidéo
- **WHEN** Le flux d'écran WebRTC est initialisé depuis la console ou le diaporama
- **THEN** L'élément vidéo s'active automatiquement (`.is-active`), affiche la projection publique à 60 fps avec cadrage 16:9 sans déformation, masque le fallback iframe, et passe le voyant d'état en mode connecté (« Actif »).

#### Scenario: Repli transparent en l'absence de partage d'écran (Graceful Fallback)
- **WHEN** Le partage de flux vidéo direct n'est pas activé par l'utilisateur
- **THEN** Le conteneur vidéo affiche une vignette d'invitation avec un bouton d'activation direct, tout en maintenant l'iframe de prévisualisation passive opérationnelle.
