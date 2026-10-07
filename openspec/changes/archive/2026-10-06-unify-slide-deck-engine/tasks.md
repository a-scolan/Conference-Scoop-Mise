## 1. Stabilisation CSS et Laser Virtuel

- [x] 1.1 Mettre à niveau `presentation/src/styles/deck.css` avec le défilement auto, la classe `.is-resizing`, l'ancrage CSS `overflow-anchor: auto` et le snap align sélectif sur `.slide.is-current`. Vérifier que le compteur `.deck-counter` conserve son style et son positionnement bas-droite.
- [x] 1.2 Mettre à niveau `presentation/src/scripts/laser.js` en désactivant le laser sous `.is-iframe-preview`, en ajoutant la traversée transparente d'iframe (`attachIframePointerTracking`) et le déplacement instantané. Vérifier que les repères PETSCII restent opérationnels.
- [x] 1.3 Mettre à jour `presentation/src/styles/components.css` pour étendre les lignes de code (`.line-highlight`, `.line-add`, etc.) à `width: max-content; min-width: 100%`, et intégrer les styles d'overlay d'orientation mobile (`.orientation-lock-overlay`, `.orientation-lock-actions`, `.orientation-lock-btn`). Vérifier l'absence de régression visuelle sur les fenêtres de terminal.

## 2. Évolution du Moteur de Slide (SlideEngine)

- [x] 2.1 Intégrer dans `presentation/src/scripts/slide-engine.js` l'émetteur de streaming WebRTC (`initStreamEmitter`, `toggleDisplayStream`, `startDisplayStream`, `initWebRtcEmitter`, `handleStreamAnswer`, `handleStreamIceCandidate`, `stopDisplayStream`).
- [x] 2.2 Intégrer dans `presentation/src/scripts/slide-engine.js` le gestionnaire de redimensionnement stabilisé `handleResize` avec recalage synchrone et rAF pour neutraliser les tressautements Firefox.
- [x] 2.3 Étendre les raccourcis clavier pour les télécommandes physiques (`PageUp`/`PageDown`, `Enter`, `N`/`P`, `Backspace`, pavé numérique `+`/`-`) et la synchronisation du mode confort (`C`) dans `slide-engine.js`.
- [x] 2.4 Implémenter `SlideEngine.prototype.initOrientationLock` ainsi que `attemptLockLandscape()` et `bypassOrientationLock()` avec le verrou `_isLockingLandscape` et le stockage `sessionStorage` (`sm_orientation_bypassed`). Conserver `injectBackgroundArt()` pour le filigrane Windows.
- [x] 2.5 Mettre à jour `presentation/build-deck.js` pour injecter le nouveau calque d'orientation mobile avec ses boutons d'actions et le script de détection du contournement session.

## 3. Mise à Niveau de la Console Présentateur

- [x] 3.1 Mettre à niveau `presentation/src/presenter/presenter-view.html` avec le conteneur miroir vidéo direct WebRTC (`<video id="pv-stream-video">`), le bouton d'activation dans la vignette et le fallback automatique sur l'iframe de prévisualisation.
- [x] 3.2 Implémenter le cadrage haut (tiers supérieur) pour l'iframe de la slide suivante afin de visualiser immédiatement le titre et l'accroche dans `presenter-view.html`.
- [x] 3.3 Intégrer la persistance du chronomètre dans `localStorage` (résistance aux rechargements) avec boutons Démarrer/Pause et Reset explicites, ainsi que les contrôles de taille de police `A-` / `A+`.
- [x] 3.4 Vérifier la synchronisation bidirectionnelle du thème et du mode confort, et s'assurer que les thèmes `cli-dark` et `cli-light` sont parfaitement pris en compte.

## 4. Recette Globale et Non-Régression

- [x] 4.1 Compiler le diaporama (`node build-deck.js`) et exécuter la vérification automatisée (`npm run verify` ou `node scripts/verify-conference.js` et `node scripts/check-ascii-align.js`). Vérifier que toutes les assertions passent avec 0 erreur.
- [x] 4.2 Valider le bon fonctionnement de la console présentateur et du diaporama en environnement local (vérification des liaisons d'événements, des classes CSS et de l'intégrité de l'affichage).
