## MODIFIED Requirements

### Requirement: Habillage géométrique et éléments décoratifs de fond (Blueprint & Calibration)
Le système visuel DOIT (SHALL) habiller les fonds de diapositives avec une trame géométrique inspirée de l'ère Windows 98 et des motifs de bureau (« Thatches » / « Carreaux ») combinée à un micro-dithering 16-bit (tramage ordonné 2×2) et une ambiance Teal rétro modernisée, tout en maintenant un contraste et une lisibilité supérieurs aux normes d'accessibilité en vidéoprojection.

#### Scenario: Rendu des fonds de diapositives
- **WHEN** Une diapositive de contenu est affichée
- **THEN** Le fond applique une double texture composée d'un quadrillage de carreaux subtilement biseautés et d'un micro-tramage de pixels en damier 2×2 à opacité contenue (inférieure ou égale à 4%), sur une base de couleur intégrant des nuances Teal rétro estompées (`#0a1818` à `#0d1e20` en thème sombre), combinant un dégradé radial d'ambiance et des repères techniques aux angles.

#### Scenario: Réglettes d'étalonnage sur les composants de cartes
- **WHEN** Une carte de contenu (`.concept-card`, `.benefit-card`, etc.) est injectée
- **THEN** Une barrette de micro-hachures biseautées bicolores (`.card-calibration-strip`) ou des bordures biseautées rétro sont apposées pour rappeler l'esthétique d'ingénierie logicielle et d'étalonnage technique.
