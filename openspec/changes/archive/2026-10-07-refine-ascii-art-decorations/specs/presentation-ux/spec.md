## ADDED Requirements

### Requirement: Filigranes décoratifs rétro en art ASCII
Le moteur de diaporama DOIT (SHALL) injecter dynamiquement en arrière-plan des diapositives de contenu un bloc décoratif rétro en art ASCII (`.petscii-bg-art`), encadré par une fenêtre console stylisée, afin de renforcer l'identité d'outillage système sans gêner la lisibilité du contenu principal.

#### Scenario: Rendu de l'art ASCII sur les diapositives thématiques Scoop et Windows
- **WHEN** Une diapositive liée aux thématiques Scoop, PATH, erreurs d'environnement ou DevRecipe est affichée sur écran large ($\gt 960$px)
- **THEN** Un bloc ASCII représentant le logo Windows 98 quadri-couleur centré dans un cadre console avec le libellé inférieur `[ WIN32 USER-SPACE ]` est injecté en arrière-plan (`z-index: 0`, `pointer-events: none`).

#### Scenario: Rendu de l'art ASCII sur les diapositives thématiques Mise et Java
- **WHEN** Une diapositive liée aux thématiques Mise ou gestion des versions Java est affichée sur écran large ($\gt 960$px)
- **THEN** Un bloc ASCII représentant une tasse de café Java complexe et détaillée (volutes de vapeur multi-panaches rouge/ambre, ouverture de tasse elliptique, corps texturé, anse 3D, soucoupe biseautée), centré dans un cadre console avec le libellé inférieur `[ SWITCH AUTOMATIQUE SELON DOSSIER ]`, est injecté en arrière-plan.

#### Scenario: Calibrage géométrique et alignement vertical des bordures
- **WHEN** Le bloc ASCII est généré
- **THEN** Toutes les lignes internes du cadre possèdent une largeur utile strictement uniforme de 47 caractères délimitée par des bordures latérales `║` parfaitement verticales, et le motif graphique est centré horizontalement à l'intérieur du cadre.

#### Scenario: Positionnement en coin supérieur droit
- **WHEN** Le bloc décoratif est affiché en grand écran
- **THEN** Le conteneur `.petscii-bg-art` est positionné dans la zone supérieure droite de la diapositive via `top: clamp(...)` et `right: clamp(...)`, dégageant l'axe central et les cartes de contenu de la diapositive.
