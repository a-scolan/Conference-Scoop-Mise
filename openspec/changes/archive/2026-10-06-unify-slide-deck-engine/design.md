## Context

Voir `proposal.md` pour la motivation du changement.
Le diaporama de la conférence « Installer ses outils de dev avec Scoop et Mise » utilise un moteur statique vanilla JS assemblé par `presentation/build-deck.js`.
Le projet frère « Diagram as Code 2 » a éprouvé et stabilisé plusieurs couches critiques :
1. Remplacement du double rendu pupitre iframe par un miroir vidéo WebRTC P2P matériellement accéléré.
2. Stabilisation anti-flash lors du redimensionnement de fenêtre et scroll-anchoring CSS natif.
3. Détection et verrouillage d'orientation mobile avec Screen Orientation API et bouton de contournement session.
4. Élargissement des raccourcis clavier pour clickers et télécommandes physiques.

Ces évolutions doivent être portées sur Scoop et Mise tout en garantissant le fonctionnement sans régression du composant terminal déclaratif, des thèmes CLI (`cli-dark`, `cli-light`) et de l'art ASCII.

## Goals / Non-Goals

**Goals:**
- Unifier le socle JavaScript et CSS du moteur de présentation entre les deux conférences.
- Supprimer les tressautements et sauts de diapositives intempestifs causés par la barre de menu ou d'onglets du navigateur.
- Offrir à l'orateur une vue présentateur à 60 fps sans latence avec cadrage optimal et chronomètre résilient aux rafraîchissements.
- Garantir une expérience mobile responsive fluide avec bascule paysage explicite ou bypass portrait mémorisé.
- Maintenir la conformité stricte avec `npm run verify` et `scripts/check-ascii-align.js`.

**Non-Goals:**
- Modifier la narration, la structure des 15 slides ou les verbatims de la conférence.
- Importer des fonctionnalités spécifiques à LikeC4 (split preview, embeds WebGL, diagrammes interactifs).
- Implémenter un relais d'événements synthétiques physiques (Input Digitizer), abandonné pour cause de complexité et de conflits de curseurs.

## Decisions

### 1. Miroir Pupitre : WebRTC P2P local vs Double rendu Iframe vs Input Digitizer
- **Option A (retenue)** : Streaming vidéo WebRTC direct (`getDisplayMedia` sur l'écran public et `<video>` sur le pupitre) avec fallback passif iframe.
  - *Rationale* : Zéro divergence visuelle, zéro recalcul de layout ou de WebGL sur le pupitre, consommation CPU minimale. Pilotage direct au clavier/clicker sans couche d'interception complexe.
- **Option B (rejetée - état actuel)** : Double rendu complet dans une iframe locale.
  - *Rationale* : Double charge processeur, désynchronisation fréquente des animations de frappe terminal et des compteurs.
- **Option C (rejetée - testée sur DAC 2)** : Streaming vidéo avec injecteur synthétique d'événements physiques (Input Digitizer).
  - *Rationale* : Dédoublement de curseurs, conflits d'iframes et latence résiduelle en conditions réelles.

### 2. Stabilisation au redimensionnement : Scroll-Anchoring CSS & rAF vs Scroll Smooth permanent
- **Option A (retenue)** : `scroll-behavior: auto;` sur le deck, classe transitoire `.deck.is-resizing` neutralisant les transitions CSS, application de `overflow-anchor: auto` et `scroll-snap-align: start` uniquement sur `.slide.is-current`, et gestionnaire `handleResize` avec recalage synchrone et rAF.
  - *Rationale* : Neutralise immédiatement les sauts de 20+ slides lors de l'apparition/disparition de la barre d'outils Firefox en plein écran.
- **Option B (rejetée - état actuel)** : `scroll-behavior: smooth;` permanent sur `.deck`.
  - *Rationale* : Entre en conflit avec le recalcul de `scrollTop` lors du redimensionnement et provoque des micro-animations parasites ou des slides blanches.

### 3. Gestion de l'orientation mobile : Screen Orientation API avec bypass vs Overlay CSS bloquant strict
- **Option A (retenue)** : Overlay d'invitation avec bouton principal appelant `screen.orientation.lock('landscape')` couplé au plein écran (`requestFullscreen`), bouton secondaire « Continuer en portrait » avec mémorisation dans `sessionStorage` (`sm_orientation_bypassed`), et message explicite si l'API est restreinte (ex: Safari iOS).
  - *Rationale* : Respecte l'autonomie de l'utilisateur sur mobile tout en guidant fortement vers la meilleure expérience scénique.
- **Option B (rejetée - état actuel)** : Overlay bloquant strict sans aucun bouton d'action ni mémorisation, forçant physiquement la rotation.
  - *Rationale* : Inopérant ou frustrant sur les appareils verrouillés en orientation portrait par le système d'exploitation.

### 4. Pointeur Laser : Neutralisation iframe pupitre & traversée vs Instance universelle
- **Option A (retenue)** : Le laser virtuel est désactivé si `document.documentElement.classList.contains('is-iframe-preview')`, et le gestionnaire `attachIframePointerTracking` traverse de manière transparente les iframes de la projection publique.
  - *Rationale* : Libère 100% du CPU sur le pupitre et évite tout dédoublement avec le curseur système natif de l'orateur.
- **Option B (rejetée)** : Laser actif partout.
  - *Rationale* : Ralentit l'affichage sur les machines portables modestes lors de l'exécution simultanée des deux fenêtres.

## Risks / Trade-offs

- **[Risk]** Autorisation de partage d'écran requise pour le miroir WebRTC : sur certains OS, la boîte de dialogue système peut interrompre le plein écran.
  → *Mitigation* : Le bouton de connexion directe est intégré discrètement dans la vignette du pupitre, et le mode fallback iframe reste actif par défaut tant que le miroir n'est pas engagé.
- **[Risk]** Régression sur le composant terminal déclaratif ou les thèmes CLI (`cli-dark`, `cli-light`).
  → *Mitigation* : Les fichiers de styles de thèmes CLI, `terminal-block.js` et `petscii.css` sont préservés à l'identique. `theme-controller.js` conserve `cli-dark` comme thème par défaut.
- **[Risk]** Erreur de syntaxe ou variable globale non définie lors de l'initialisation du diaporama (`initOrientationLock`).
  → *Mitigation* : La méthode `initOrientationLock` est attachée directement à `SlideEngine.prototype` et sécurisée par le verrou `_isLockingLandscape`.

## Hypothèses à confirmer par validation

- Le partage d'écran P2P local fonctionne hors ligne sans connexion Internet (validé par l'architecture WebRTC `RTCPeerConnection` locale sans serveur STUN externe).
