## Why

Le moteur de présentation de la conférence « Diagram as Code 2 » a connu des avancées majeures en conditions réelles de scène : streaming vidéo direct WebRTC pour le pupitre (zéro divergence d'affichage, 60fps), stabilisation drastique du redimensionnement (élimination des sauts intempestifs de slides lors de l'apparition de barres d'outils comme sous Firefox), gestion de l'orientation mobile avec Screen Orientation API, raccourcis télécommandes enrichis et persistance du chronomètre.
La conférence « Installer ses outils de dev avec Scoop et Mise » partage le même socle technique mais accuse un retard sur ces fonctionnalités stabilisées. Ce changement unifie le moteur entre les deux conférences sans régression pour Scoop et Mise (maintien du composant terminal déclaratif, des thèmes CLI, du logo filigrane Windows et de la structure 15 min Quickie).

## What Changes

- **Console Présentateur & Miroir Vidéo WebRTC 60fps** : Remplacement du double rendu iframe de la slide courante par un récepteur vidéo P2P WebRTC matériellement accéléré avec bouton d'activation en un clic dans la vignette, cadrage intelligent de la slide suivante sur le tiers supérieur (titre/accroche), et persistance du chronomètre dans le stockage local (`localStorage`).
- **Stabilisation du Moteur de Slide & Scroll Anchoring** : Désactivation du `scroll-behavior: smooth` au niveau CSS du deck (`auto`), ancrage natif via `overflow-anchor: auto`, application sélective du `scroll-snap-align: start` sur la seule diapositive active (`.slide.is-current`), et recalage synchrone/rAF lors des variations de fenêtre (menu/onglets du navigateur).
- **Contrôles d'Orientation Mobile (Screen Orientation API)** : Détection du mode portrait sur mobile avec calque d'invitation ergonomique proposant un bouton d'activation plein écran paysage (`attemptLockLandscape`) et un bouton de contournement (`bypassOrientationLock`) mémorisé en session.
- **Raccourcis Télécommande & Digipads** : Support exhaustif des touches courantes de télécommandes de présentation (`PageDown`/`PageUp`, `Enter`, `N`/`P`, `Backspace`, pavé numérique `+`/`-`).
- **Laser Virtuel Optimisé** : Désactivation du laser virtuel en mode prévisualisation pupitre (`is-iframe-preview`) pour libérer 100% des ressources CPU, et traversée transparente des iframes.
- **Surbrillance de Code Étendue** : Adaptation des surbrillances de lignes de code (`.line-highlight`, `.line-add`, etc.) à `width: max-content; min-width: 100%` pour un affichage continu lors du défilement horizontal.

## Hors périmètre

- Aucune modification du contenu des diapositives, de la narration ou des notes orateur de « Scoop et Mise ».
- Aucune altération des spécificités graphiques de la conférence : le composant déclaratif terminal (`terminal-block.js`), le filigrane Windows en pleine hauteur, les styles rétro PETSCII et les thèmes `cli-dark` et `cli-light` sont strictement sanctuarisés.
- Pas de réintroduction du numériseur d'événements physiques synthétiques (*Input Digitizer*), déprécié sur DAC 2 en raison de latences et de conflits de curseurs.

## Capabilities

### Modified Capabilities
- `slide-engine`: Intégration de l'émetteur WebRTC, du gestionnaire de redimensionnement anti-flash Firefox, du scroll anchoring CSS natif, de l'initialisation de l'orientation mobile et de la prise en charge étendue des télécommandes.
- `presenter-view`: Remplacement du double rendu par le récepteur de flux vidéo direct WebRTC 60fps, cadrage haut de la slide suivante, persistance du chronomètre et contrôles de zoom typographique.
- `presentation-ux`: Détection et verrouillage d'orientation mobile via Screen Orientation API avec contournement utilisateur, et persistance de la surbrillance de code en défilement horizontal.

## Impact

- `presentation/src/scripts/slide-engine.js` : Émetteur WebRTC, `handleResize` stabilisé, bindings télécommande, initialisation de l'orientation mobile.
- `presentation/src/presenter/presenter-view.html` : Remplacement du scaler iframe par le récepteur vidéo WebRTC, cadrage slide suivante, persistance chrono, raccourcis et zoom typo.
- `presentation/src/scripts/laser.js` : Désactivation en mode pupitre et traversée d'iframe.
- `presentation/build-deck.js` : Nouveau calque d'orientation avec boutons d'actions et pré-chargement du contournement session.
- `presentation/src/styles/deck.css` : Règles d'ancrage scroll et neutralisation des transitions pendant le redimensionnement.
- `presentation/src/styles/components.css` : Styles de l'overlay mobile et extension `max-content` sur les surbrillances de code.
