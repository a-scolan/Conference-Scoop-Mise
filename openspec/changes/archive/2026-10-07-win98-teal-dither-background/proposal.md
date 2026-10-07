## Why

Le fond actuel des diapositives repose sur un quadrillage générique de papier millimétré moderne ("blueprint"), qui manque d'évocation d'époque et d'authenticité visuelle pour un talk centré sur l'outillage développeur sous Windows (Scoop, PATH, variable d'environnement, registres, batch/PowerShell).

L'orateur et le public bénéficient grandement d'une identité rétro-tech assumée, inspirée de l'âge d'or de Windows 98 et de la culture demoscene/PC des années 90, tout en garantissant une lisibilité irréprochable des blocs de code, des sorties terminal et des diagrammes lors d'une projection sur vidéoprojecteur en salle de conférence.

## What Changes

- **Fond de slide à carreaux typé Windows 98** : Remplacement du papier millimétré contemporain par un quadrillage de carreaux inspiré des motifs d'installation et de bureau Windows 98 ("Thatches" / "Carreaux"), avec de très discrets biseaux 3D (arêtes 1px claires et sombres).
- **Tramage 16-bit / Dithering (Setup.bmp)** : Intégration d'une micro-trame en damier de pixels ordonnés 2×2 (dithering de type matrice de Bayer en SVG data-URI) à opacité très basse (2% à 3%), conférant une texture feutrée d'écran cathodique (CRT) sans moiré.
- **Teinte de fond Teal 98 modernisée** : Substitution ou enrichissement de la couleur de fond des diapositives avec une nuance inspirée du bureau par défaut de Windows 98 (`#008080`), adoucie et assombrie (`#0a1818` à `#0d1e20` en dark mode, dégradé subtil vers le noir terminal) afin d'assurer un contraste textuel supérieur à 8:1 (WCAG AAA).
- **Déclinaison thématique cohérente** : Adaptation harmonieuse de cette texture sur les thèmes de la présentation (`cli-dark`, `slate-architect`, et thèmes clairs) sans détériorer la lisibilité fond de salle ni le mode haut contraste (`data-readability="high-contrast"`).

### Hors périmètre

- Aucune modification de la structure narrative du talk ni du contenu textuel des 15 slides.
- Aucune modification des composants interactifs de démo terminal (Asciinema, Shiki, tabs de configuration).
- Pas d'effets visuels animés lourds ou distrayants (pas de copper bar en mouvement continu, pas de scanlines clignotantes).

## Capabilities

### New Capabilities
<!-- Aucune nouvelle capability globale introduite -->

### Modified Capabilities
- `content-theme`: Mise à jour des spécifications d'habillage géométrique et de motifs de fond (`Habillage géométrique et éléments décoratifs de fond`) pour substituer la trame papier millimétré par le motif de carreaux biseautés Windows 98 et micro-dithering 16-bit sur ambiance Teal modernisée.

## Impact

- **Fichiers de style impactés** :
  - `presentation/src/styles/decorations.css` : Définition des classes de trame et d'arrière-plan de slides.
  - `presentation/src/styles/themes/cli-dark.css`, `slate-architect.css`, `google-blueprint-light.css`, `cli-light.css` : Déclaration des tokens de fond (`--bg`, `--blueprint-grid`, `--blueprint-grid-size`).
  - `presentation/src/styles/tokens.css` : Tokens utilitaires de texture rétro et préservation du mode `high-contrast`.
- **Rendu & Vérification** :
  - Pipeline de build `node presentation/build-deck.js`.
  - Vérification automatisée `npm run verify` dans `presentation/`.
