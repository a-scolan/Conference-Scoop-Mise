## MODIFIED Requirements

### Requirement: Pointeur laser virtuel haute précision
Le diaporama DOIT (SHALL) intégrer un pointeur laser virtuel (`.laser-pointer`) qui remplace le curseur natif sur les périphériques de type souris ou stylet afin de faciliter l'accroche visuelle en salle de conférence, sans consommer de ressources sur les fenêtres de prévisualisation pupitre.

#### Scenario: Activation sur déplacement du pointeur
- **WHEN** L'utilisateur déplace la souris sur la fenêtre (`pointermove`)
- **THEN** Le curseur natif du document est masqué (`cursor: none`), la classe `laser-cursor-enabled` est activée, et le disque laser suit les coordonnées du pointeur avec une synchronisation par `requestAnimationFrame`.

#### Scenario: Effet d'impulsion au clic
- **WHEN** L'utilisateur appuie sur le bouton de la souris (`pointerdown`)
- **THEN** L'élément laser reçoit la classe `.is-active`, son échelle visuelle est augmentée (facteur $1.06$), et l'anneau lumineux externe s'intensifie pour simuler l'appui sur une télécommande laser de scène.

#### Scenario: Masquage automatique sur écran tactile ou sortie de fenêtre
- **WHEN** L'interaction provient d'un écran tactile (`pointerType === 'touch'`), que le curseur quitte la fenêtre (`mouseout`) ou que la page perd le focus (`blur`, `pagehide`)
- **THEN** Le laser est instantanément masqué (`is-visible` retiré) et le curseur natif est restauré.

#### Scenario: Désactivation en mode prévisualisation pupitre
- **WHEN** Le document s'exécute dans un contexte de prévisualisation pupitre (`.is-iframe-preview`)
- **THEN** Le laser virtuel est complètement désactivé pour libérer 100% des ressources processeur et laisser le curseur système natif opérant sur le pupitre.

#### Scenario: Traversée transparente des iframes
- **WHEN** Le curseur survole une iframe intégrée dans une diapositive
- **THEN** Le document hôte intercepte les mouvements de pointeur au sein du document enfant, masque le curseur natif interne et maintient la projection continue du disque laser aux coordonnées exactes de l'écran hôte.

---

### Requirement: Mise en exergue dynamique du code et conteneurs auto-redimensionnables
Les fenêtres d'aperçu de code et de scripts terminaux DOIVENT (SHALL) permettre l'accentuation visuelle de lignes spécifiques (`.line-highlight`, `.line-add`, `.line-mod`) avec persistance visuelle sur toute la largeur de défilement horizontal.

#### Scenario: Présentation d'un extrait de modèle C4
- **WHEN** L'orateur commente une section spécifique du modèle `.c4` ou d'un fichier de configuration
- **THEN** Les lignes ciblées sont mises en valeur par une surbrillance contrastée (`line-highlight`), tandis que le reste du bloc est légèrement estompé pour guider le regard de l'auditoire. L'élément de surbrillance s'étend sur `100%` de la largeur `max-content` du conteneur de code.

## ADDED Requirements

### Requirement: Support responsive mobile avec Screen Orientation API et verrouillage d'orientation paysage
Le moteur de rendu DOIT (SHALL) privilégier l'orientation paysage sur les écrans mobiles de petite taille (`@media (orientation: portrait) and (max-width: 899px)`), en proposant un forçage programmatique via la Screen Orientation API (`screen.orientation.lock('landscape')`), un calque d'invitation avec repli explicite, et une option de contournement contrôlée par l'utilisateur.

#### Scenario: Ouverture sur smartphone en mode portrait avec détection et forçage
- **WHEN** La page est consultée sur un écran mobile en orientation portrait
- **THEN** Un calque bloquant plein écran (`.orientation-lock-overlay`) s'affiche au premier plan avec l'animation de rotation, un bouton primaire permettant d'invoquer la Screen Orientation API couplée au plein écran (`attemptLockLandscape()`), un bouton secondaire permettant de continuer en portrait (`is-bypassed`), et un texte pédagogique invitant à pivoter l'appareil si le forçage automatique n'est pas permis.

#### Scenario: Mémorisation du choix de contournement portrait
- **WHEN** L'utilisateur clique sur le bouton « Continuer en portrait »
- **THEN** La classe `.is-bypassed` est immédiatement appliquée à l'overlay, l'état est mémorisé dans `sessionStorage` (`sm_orientation_bypassed = '1'`), et les rechargements ultérieurs dans la même session n'affichent plus l'overlay bloquant.
