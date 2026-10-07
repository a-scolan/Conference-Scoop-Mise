## Context

Voir `proposal.md` pour la motivation et l'historique des régressions constatées suite à l'unification avec Diagram as Code 2.
Le deck est composé de modules scripts assemblés lors du build (`build-deck.js`) : `theme-controller.js`, `slide-engine.js`, etc. Deux écouteurs d'événements `keydown` sur `document` coexistaient, provoquant un double déclenchement immédiat pour `C` et `T`. De plus, `V` est le raccourci choisi pour la vue présentateur afin de libérer `P` pour les télécommandes, mais l'overlay d'aide et les spécifications n'avaient pas été réalignés.

## Goals / Non-Goals

**Goals :**
- Unifier la gestion des raccourcis clavier sous la responsabilité exclusive de `SlideEngine.prototype.bindEvents`.
- Valider que l'appui sur `C` ou `T` n'exécute le toggle associé qu'une seule fois.
- Garantir que le mode lisibilité `[data-readability="high-contrast"]` offre un rendu à contraste élevé tant en thème sombre (`cli-dark`) qu'en thème clair (`cli-light`).
- Aligner l'affichage du bandeau d'aide `this.hints`, les spécifications et la documentation sur la touche `V` (et `Alt+P`) pour la console présentateur.

**Non-Goals :**
- Refactoriser l'architecture modulaire du build ou le composant terminal.
- Modifier l'implémentation de la transmission P2P WebRTC.

## Decisions

### Décision 1 : Emplacement de l'écouteur clavier pour C et T
- **Option A (Choisie)** : Supprimer l'écouteur `keydown` direct dans `theme-controller.js` et déléguer l'écoute à `SlideEngine.prototype.bindEvents`. `SlideEngine` appelle les fonctions globales exposées `window.toggleDeckTheme()` et `window.toggleReadabilityMode()`.
  - *Rationale* : `SlideEngine` filtre déjà intelligemment les événements sur les conteneurs interactifs (code, mermaid, champs de saisie) et gère l'effacement de l'aide visuelle (`fadeHints()`). Avoir une boucle d'événements clavier unique évite toute interférence.
- **Option B** : Conserver l'écouteur dans `theme-controller.js` et retirer `c` et `t` de `SlideEngine`.
  - *Rejeté* : `theme-controller.js` n'isole pas les zones de code ni les diagrammes zoomables et n'efface pas les hints du deck.

### Décision 2 : Raccourci pour la Vue Présentateur
- **Option A (Choisie)** : Officialiser `V` (View) comme raccourci principal et `Alt+P` comme raccourci secondaire, en conservant `P` dans `isPrev` pour les télécommandes sans fil de présentation.
  - *Rationale* : Les télécommandes physiques envoient souvent des touches figées en dur (`PageDown`/`PageUp` ou `N`/`P`). Pour ne pas briser la navigation des orateurs équipés de télécommandes, `V` devient la touche mnémotechnique claire (*View* / Présentateur). Tous les canaux (hints, spec, readme) doivent afficher `V`.
- **Option B** : Reprendre `P` pour la vue présentateur et retirer `p`/`P` de `isPrev`.
  - *Rejeté* : L'utilisateur a explicitement validé que la vue présentateur peut être `V`, à condition d'une consistance totale dans le projet.

### Décision 3 : Implémentation du contraste élevé adaptatif
- **Option A (Choisie)** : Scoper les variables de texte et de bordures de `[data-readability="high-contrast"]` en fonction de l'attribut `data-theme` parent dans `tokens.css`.
  - *Rationale* : Permet de conserver une seule source de vérité pour les tokens tout en assurant que `cli-dark` reçoit `--text: #ffffff` et `cli-light` reçoit `--text: #000000`.
- **Option B** : Créer un jeu de classes distinctes (`data-readability-dark` / `data-readability-light`).
  - *Rejeté* : Alourdit l'automate d'états dans `theme-controller.js` et casse les synchronisations BroadcastChannel existantes.

## Risks / Trade-offs

- **[Risk]** Risque que `window.toggleReadabilityMode` ou `window.toggleDeckTheme` ne soient pas encore initialisés lors de la liaison de `SlideEngine`.
  - **Mitigation** : `theme-controller.js` est concaténé avant `slide-engine.js` dans `build-deck.js`, et les appels sont gardés par un test de présence de la fonction.

## Hypothèses à confirmer

- *Aucune incertitude critique* : l'ordre de chargement des scripts dans `presentation/build-deck.js` a été vérifié (`theme-controller.js` précède `slide-engine.js`).
