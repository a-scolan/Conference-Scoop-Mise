## MODIFIED Requirements

### Requirement: Diffusion d'état et pilotage distant pour mode présentateur
Le moteur d'exécution du diaporama (`SlideEngine`) DOIT (SHALL) émettre ses changements de diapositive vers le canal de communication local `dac-presenter-channel` et accepter les commandes de navigation distantes transmises par la console présentateur.

#### Scenario: Émission d'un changement de diapositive
- **WHEN** La diapositive active change sur l'écran public suite à une interaction locale
- **THEN** Le moteur publie un message `SLIDE_CHANGED` contenant l'index courant, l'identifiant de la slide et le timestamp sur `BroadcastChannel('dac-presenter-channel')` et met à jour la clé `dac_current_slide` dans `localStorage`.

#### Scenario: Réception d'une commande de navigation distante
- **WHEN** Un message `GOTO_SLIDE` avec un index valide est reçu sur le canal de synchronisation
- **THEN** Le diaporama public navigue immédiatement vers la diapositive demandée sans animation perturbatrice et met à jour l'ancre d'URL.

#### Scenario: Raccourci d'ouverture de la console présentateur
- **WHEN** L'orateur appuie sur la touche `V` ou la combinaison `Alt+P` sur la présentation principale
- **THEN** Une nouvelle fenêtre de navigateur est ouverte vers `presenter-view.html` avec les dimensions optimales pour écran secondaire (`width=1280, height=800`).

### Requirement: Contrôle au clavier et navigation tactile
Le moteur DOIT (SHALL) écouter les événements clavier globaux et les gestes tactiles verticaux pour permettre au présentateur de piloter son discours sans souris.

#### Scenario: Avancement à la diapositive suivante
- **WHEN** L'utilisateur presse la touche `Flèche Droite`, `Flèche Bas`, `Espace`, `PageDown`, `Enter`, `N` ou le pavé numérique `+`
- **THEN** Le diaporama bascule immédiatement vers la diapositive suivante si l'index courant est inférieur au total.

#### Scenario: Retour à la diapositive précédente
- **WHEN** L'utilisateur presse la touche `Flèche Gauche`, `Flèche Haut`, `PageUp`, `Backspace`, `P` ou le pavé numérique `-`
- **THEN** Le diaporama revient immédiatement vers la diapositive précédente.

#### Scenario: Saut aux extrémités
- **WHEN** L'utilisateur presse la touche `Home` ou `End`
- **THEN** Le diaporama se positionne instantanément sur la première diapositive (pour `Home`) ou la dernière diapositive (pour `End`).

#### Scenario: Bascule de thème et de lisibilité
- **WHEN** L'utilisateur presse la touche `T` (thème) ou `C` (mode confort / agrandissement)
- **THEN** L'événement est intercepté sans rebond ni double bascule, appliquant respectivement la bascule de thème ou le mode de lisibilité une seule fois.

#### Scenario: Balayage tactile sur appareil mobile ou écran tactile
- **WHEN** L'utilisateur effectue un balayage vertical (`touchstart` / `touchend`) d'une amplitude supérieure à 50 pixels
- **THEN** Le moteur interprète le vecteur de déplacement pour avancer (swipe haut) ou reculer (swipe bas).

#### Scenario: Isolation des zones interactives
- **WHEN** Le focus utilisateur ou la cible de l'événement clavier se situe à l'intérieur d'un diagramme zoomable (`.mermaid-wrap`), d'un tableau défilant (`.table-scroll`), d'un bloc de code (`.code-scroll`) ou d'un champ éditable
- **THEN** Les raccourcis clavier du diaporama sont ignorés afin de préserver l'interaction locale du composant.
