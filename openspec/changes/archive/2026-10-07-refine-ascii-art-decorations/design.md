## Context

Voir `proposal.md` pour la motivation et les objectifs.
Les diapositives du deck HTML injectent via `injectBackgroundArt()` dans `slide-engine.js` un bloc d'arrière-plan `.petscii-bg-art`. Ce bloc est actuellement stylisé dans `presentation/src/styles/petscii.css` avec `top: 50%` et `transform: translateY(-50%)`, ce qui le centre verticalement sur le bord droit de l'écran.

## Goals / Non-Goals

**Goals:**
- Proposer un dessin ASCII de tasse de café Java immédiatement identifiable en projection (vapeur ondulante, rebord, corps de tasse, anse et soucoupe), colorisé selon la charte Java (orange/rouge chaud et bleu/cyan).
- Recentrer harmonieusement les motifs Windows 98 et Java à l'intérieur du cadre de fenêtre (largeur interne exacte de 47 colonnes, bordures `║` droites).
- Mettre à jour les libellés de pied de cadre : `[ WIN32 USER-SPACE ]` et `[ SWITCH AUTOMATIQUE SELON DOSSIER ]`.
- Remonter et caler les blocs décoratifs en haut à droite pour dégager l'axe de lecture principal et les cartes.

**Non-Goals:**
- Modifier la logique conditionnelle d'attribution des diapositives (`nav.indexOf('Mise')` vs `nav.indexOf('Scoop')`, etc.).
- Modifier les thèmes de couleurs ou les tokens CSS globaux.

## Decisions

### 1. Style et composition du logo Java ASCII
- **Option A (retenue) : Dessin ASCII complexe, texturé et ombré haute précision**
  Conception d'une tasse de café Java en ASCII riche et architecturée :
  - Volutes de vapeur multi-panaches avec ondulations entrelacées (`(`, `)`, `/`, `\`) colorées en rouge vif (`#ff5555`) et ambre chaud (`#ffb900`).
  - Rebord supérieur à double lisière et ouverture 3D.
  - Corps de tasse avec lettrage texturé `* J A V A *`, cartouche `( R U N T I M E )`, lignes de séparation et vagues de liquide chaud (`~ ~ ~ ~`).
  - Anse profilée en 3D avec bordures renforcées et jonction intégrée au corps.
  - Soucoupe à double niveau avec chanfrein et bordures arrondies.
  *Avantages* : Impact visuel fort, authenticité rétro-terminal indéniable, lisibilité immédiate en salle tout en offrant une finesse de détails valorisante.
- **Option B : Schéma minimaliste ou filaire simple**
  Tasse simplifiée à contours droits.
  *Inconvénients* : Manque de relief et de caractère pour un filigrane de conférence tech.

### 2. Géométrie du cadre console et centrage horizontal
- **Option A (retenue) : Largeur fixe stricte de 47 caractères internes avec calcul des marges**
  Toutes les lignes entre `╔` et `╚` mesurent exactement 49 caractères au total (1 `║` + 47 espaces/texte + 1 `║`).
  Pour le logo Windows 98, décalage du motif de 4 espaces vers la droite pour équilibrer les marges gauche/droite.
  Pour le logo Java, composition centrée sur les 47 colonnes.
  Les libellés inférieurs sont également centrés avec des espaces symétriques.
- **Option B : Encadrement dynamique par bordure CSS `border: 2px solid`**
  *Inconvénients* : Casse le style authentique PETSCII / CP437 des fenêtres MS-DOS avec les boutons `[ _ ][ X ]` en caractères ASCII.

### 3. Repositionnement spatial via CSS
- **Option A (retenue) : Déplacement vers le quadrant supérieur droit**
  Remplacement de `top: 50%; transform: translateY(-50%)` par `top: clamp(24px, 4.5vh, 64px)` et `right: clamp(16px, 2.5vw, 48px)`.
  *Avantages* : Libère le tiers médian où sont concentrées les cartes de contenu, s'aligne harmonieusement avec la marge supérieure des diapositives.
- **Option B : Positionnement statique dans le flux HTML**
  *Inconvénients* : Perturbe le layout flex/grid des diapositives et les contraintes de hauteur.

## Risks / Trade-offs

- **[Risque] Chevauchement avec les en-têtes ou badges de diapositives longues** → *Atténuation* : Les éléments `.petscii-bg-art` ont `z-index: 0`, `pointer-events: none` et une opacité réduite (`0.28` en dark, `0.22` en light). De plus, l'ancrage `right` garantit qu'ils restent dans la marge droite sans entrer en collision avec les titres alignés à gauche.
- **[Hypothèse à confirmer par spike]** : Vérifier sur les slides 06 (Mise principe) et 08 (PATH piège) que le bloc ne gêne aucun élément visuel en résolution 1920x1080 et 1366x768.

## Migration Plan

1. Éditer `presentation/src/scripts/slide-engine.js` pour calibrer les chaînes `win98Html` et `javaHtml`.
2. Éditer `presentation/src/styles/petscii.css` pour ajuster la position de `.petscii-bg-art`.
3. Exécuter `npm run build` dans `presentation/` pour régénérer `presentation/public/presentation.html`.
4. Contrôler le rendu visuel et exécuter `npm run verify`.
