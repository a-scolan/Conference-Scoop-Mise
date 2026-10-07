## MODIFIED Requirements

### Requirement: Défilement vertical avec accrochage magnétique (Snap-Scroll)
Le conteneur principal du diaporama (`.deck`) DOIT (SHALL) présenter chaque diapositive (`.slide`) en plein écran (100vh / 100vw) avec un accrochage vertical fluide, sans risque de décalage ou de superposition instable.

#### Scenario: Navigation par défilement à la molette
- **WHEN** L'utilisateur fait défiler la page verticalement à l'aide de la molette ou du pavé tactile
- **THEN** Le moteur temporise le défilement et force l'alignement (`snapToNearest`) sur la diapositive la plus proche avec défilement natif direct (`scroll-behavior: auto;`) pour éviter tout conflit avec les transitions.

#### Scenario: Redimensionnement de la fenêtre
- **WHEN** La fenêtre du navigateur est redimensionnée en cours de présentation (ex: déploiement ou masquage de la barre d'outils/onglets Firefox en plein écran)
- **THEN** Le diaporama applique la classe `.is-resizing` pour neutraliser temporairement le snap et les transitions CSS, verrouille la diapositive active via ancrage de défilement synchrone et rAF (`overflow-anchor: auto` sur `.slide.is-current`), et garantit la visibilité immédiate (`.visible`) sans écran noir ni saut intempestif de slide.

---

### Requirement: Contrôle au clavier et navigation tactile
Le moteur DOIT (SHALL) écouter les événements clavier globaux et les gestes tactiles verticaux pour permettre au présentateur de piloter son discours sans souris ni friction, avec prise en charge complète des télécommandes et clickers.

#### Scenario: Avancement à la diapositive suivante
- **WHEN** L'utilisateur presse la touche `Flèche Droite`, `Flèche Bas`, `Espace`, `PageDown`, `Enter`, `N`, ou pavé numérique `+`
- **THEN** Le diaporama bascule immédiatement vers la diapositive suivante si l'index courant est inférieur au total.

#### Scenario: Retour à la diapositive précédente
- **WHEN** L'utilisateur presse la touche `Flèche Gauche`, `Flèche Haut`, `PageUp`, `Backspace`, `P`, ou pavé numérique `-`
- **THEN** Le diaporama revient immédiatement vers la diapositive précédente.

#### Scenario: Saut aux extrémités
- **WHEN** L'utilisateur presse la touche `Home` ou `End`
- **THEN** Le diaporama se positionne instantanément sur la première diapositive (pour `Home`) ou la dernière diapositive (pour `End`).

#### Scenario: Balayage tactile sur appareil mobile ou écran tactile
- **WHEN** L'utilisateur effectue un balayage vertical (`touchstart` / `touchend`) d'une amplitude supérieure à 50 pixels sans geste de zoom actif
- **THEN** Le moteur interprète le vecteur de déplacement pour avancer (swipe haut) ou reculer (swipe bas).

#### Scenario: Isolation des zones interactives
- **WHEN** Le focus utilisateur ou la cible de l'événement se situe à l'intérieur d'un diagramme zoomable (`.mermaid-wrap`), d'une fenêtre de terminal (`.terminal-window`), d'un tableau défilant (`.table-scroll`), d'un bloc de code (`.code-scroll`) ou d'un champ éditable
- **THEN** Les gestes de navigation et raccourcis clavier du diaporama sont isolés afin de préserver l'interaction locale du composant.

## ADDED Requirements

### Requirement: Émetteur de streaming WebRTC pour miroir pupitre (Display Stream Emitter)
Le moteur de diaporama DOIT (SHALL) intégrer une passerelle de capture et diffusion d'écran locale via `getDisplayMedia` et WebRTC (`RTCPeerConnection`), permettant à la console présentateur de recevoir le flux vidéo pixel-perfect de la projection publique à 60 fps.

#### Scenario: Négociation et diffusion du flux d'écran
- **WHEN** La console présentateur envoie un message de demande de flux (`STREAM_REQUEST_OFFER`) ou que l'orateur déclenche le partage d'écran
- **THEN** La fenêtre publique capture le flux de l'onglet (`navigator.mediaDevices.getDisplayMedia`), établit une connexion P2P locale WebRTC et transmet les paquets vidéo haute définition au récepteur pupitre.

#### Scenario: Arrêt de la diffusion d'écran
- **WHEN** L'orateur interrompt le partage d'écran ou ferme la fenêtre
- **THEN** Les pistes vidéo sont arrêtées, la connexion WebRTC est proprement fermée et la console présentateur bascule de manière transparente sur l'aperçu passif de secours.
