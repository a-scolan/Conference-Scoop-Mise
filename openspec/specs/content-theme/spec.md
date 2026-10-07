# Spécification : Thème Visuel et Identité Graphique (Content & Theme)

## Purpose
Cette spécification définit l'identité visuelle de la présentation, son système de tokens de design, la typographie, la signalétique colorée par partie, la famille de thèmes CLI/Terminal (clair et sombre), ainsi que les points d'ancrage requis pour adapter le thème à d'autres événements ou conférences.

## Requirements

### Requirement: Système de tokens de couleur (Design Tokens)
L'apparence de la présentation repose sur des variables CSS déclarées à la racine (`:root`), composant une palette contrastée avec des couleurs d'accentuation fonctionnelles.

#### Scenario: Palette de base du thème actuel (Electric Navy)
- **WHEN** Le diaporama est rendu avec son thème par défaut
- **THEN** Les variables fondamentales suivantes sont appliquées :
  - Fond d'écran sombre : `--bg: #080d2a`
  - Surfaces et cartes : `--surface: #0c1238`, `--surface2: #101848`, `--surface-elevated: #162058`
  - Textes : `--text: #e8f0f8` (primaire), `--text-dim: #c1d5e8` (secondaire), `--text-subtitle: #d7e5f2`
  - Accent jaune électrique principal : `--accent: #fbfe7a`
  - Accents secondaires : `--accent2: #f08848` (orange), `--accent3: #38b4e8` (cyan/bleu ciel), `--accent4: #f43f5e` (rose/framboise), `--green: #5cc038` (vert validation).

#### Scenario: Adaptation en vue d'un rethémage futur (Theming Hook)
- **WHEN** L'utilisateur souhaite adapter le jeu de diapositives à une autre conférence (ex: Devoxx, BreizhCamp, Paris JUG)
- **THEN** La modification des seules variables CSS `:root` et du logo permet de transformer l'ambiance visuelle sans avoir à modifier le balisage individuel des diapositives.

---

### Requirement: Typographie hiérarchisée
La présentation DOIT (SHALL) employer une combinaison typographique claire et lisible à distance, séparant distinctement le texte éditorial du code technique.

#### Scenario: Utilisation de la police sans-serif moderne pour le contenu
- **WHEN** Des titres, sous-titres, étiquettes ou paragraphes sont affichés
- **THEN** La famille `Poppins` (graisses 300, 400, 700, 900) est appliquée avec un espacement adapté et des tailles dynamiques basées sur `clamp()`.

#### Scenario: Utilisation de la police à chasse fixe pour le code et les DSL
- **WHEN** Un bloc de code, un fichier de configuration (`mise.toml`, manifeste TOML, JSON Scoop), un diagramme Mermaid ou une commande terminal est affiché
- **THEN** La police `JetBrains Mono` est employée pour garantir l'alignement strict des indentations et des symboles.

### Requirement: Signalétique colorimétrique par partie (Section Mapping)
Chaque grande partie de la conférence DOIT (SHALL) posséder un code couleur d'identification unique répercuté sur le numéro de partie, les étiquettes, la barre d'onglets et les points de navigation.

#### Scenario: Affectation des couleurs de section
- **WHEN** Le moteur construit la table des sections (`buildSectionMap`)
- **THEN** Les correspondances suivantes sont appliquées aux indicateurs :
  - **Partie 0 (Accroche : les 4 erreurs) :** Gris neutre (`--part0-neutral-gray`, `#b4bdc8`)
  - **Partie 1 (Scoop, user space) :** Jaune vif (`--accent`, `#fbfe7a`)
  - **Partie 2 (Mise, runtimes par projet) :** Bleu cyan (`--accent3`, `#38b4e8`)
  - **Partie 3 (PATH Windows) :** Orange vif (`--accent2`, `#f08848`)
  - **Partie 4 (DevRecipe, REX & gouvernance) :** Vert clair (`--green`, `#5cc038`)
  - **Partie 5 (Clôture) :** Framboise (`--accent4`, `#f43f5e`).

### Requirement: Habillage géométrique et éléments décoratifs de fond (Blueprint & Calibration)
Le système visuel DOIT (SHALL) habiller les fonds de diapositives avec une trame géométrique inspirée de l'ère Windows 98 et des motifs de bureau (« Thatches » / « Carreaux ») combinée à un micro-dithering 16-bit (tramage ordonné 2×2) et une ambiance Teal rétro modernisée, tout en maintenant un contraste et une lisibilité supérieurs aux normes d'accessibilité en vidéoprojection.

#### Scenario: Rendu des fonds de diapositives
- **WHEN** Une diapositive de contenu est affichée
- **THEN** Le fond applique une double texture composée d'un quadrillage de carreaux subtilement biseautés et d'un micro-tramage de pixels en damier 2×2 à opacité contenue (inférieure ou égale à 4%), sur une base de couleur intégrant des nuances Teal rétro estompées (`#0a1818` à `#0d1e20` en thème sombre), combinant un dégradé radial d'ambiance et des repères techniques aux angles.

#### Scenario: Réglettes d'étalonnage sur les composants de cartes
- **WHEN** Une carte de contenu (`.concept-card`, `.benefit-card`, etc.) est injectée
- **THEN** Une barrette de micro-hachures biseautées bicolores (`.card-calibration-strip`) ou des bordures biseautées rétro sont apposées pour rappeler l'esthétique d'ingénierie logicielle et d'étalonnage technique.

---

### Requirement: Configuration centralisée des métadonnées de conférence
Le projet DOIT (SHALL) isoler l'ensemble des données contextuelles liées à l'événement et à l'orateur dans un fichier de configuration standardisé (`event.config.json`).

#### Scenario: Remplacement des informations de conférence
- **WHEN** L'utilisateur modifie le nom de l'événement, la date ou l'URL de feedback dans `event.config.json`
- **THEN** Le diaporama met à jour automatiquement la slide de titre, le bandeau de présentation du speaker et la slide finale de remerciement lors de la compilation sans modification manuelle du balisage.

---

### Requirement: Thèmes visuels interchangeables et sélecteur interactif
Le moteur de présentation DOIT (SHALL) supporter la sélection dynamique ou par configuration d'un thème visuel parmi plusieurs feuilles de style prédéfinies : `cli-dark` (par défaut), `cli-light`, `google-blueprint-light` et `slate-architect`. Il DOIT fournir un mécanisme de bascule (*theme switch*) interactif (raccourci clavier `T`, paramètre d'URL `?theme=` ou sélecteur discret d'interface). La touche `T` DOIT (SHALL) basculer entre les variantes claire et sombre de la famille active : `cli-light` ↔ `cli-dark`, ou `google-blueprint-light` ↔ `slate-architect`.

#### Scenario: Sélection d'un thème alternatif en cours de session
- **WHEN** L'utilisateur presse la touche `T` ou sélectionne un thème dans le sélecteur d'interface
- **THEN** Le diaporama met à jour l'attribut `data-theme` sur l'élément racine `<html>`, applique instantanément la feuille de variables correspondante, mémorise le choix dans le `localStorage` et réinitialise les styles Mermaid et des blocs terminal.

#### Scenario: Bascule dans la famille CLI
- **WHEN** Le thème actif est `cli-dark` et l'utilisateur presse `T`
- **THEN** Le thème `cli-light` est appliqué ; une nouvelle pression sur `T` revient à `cli-dark`

#### Scenario: Chargement avec un paramètre d'URL explicite
- **WHEN** L'URL contient un paramètre de thème (ex: `?theme=slate-architect`)
- **THEN** Le diaporama applique directement ce thème au chargement sans recourir au thème par défaut.

#### Scenario: Premier chargement sans préférence
- **WHEN** Le diaporama est ouvert sans paramètre `?theme=` et sans thème mémorisé dans le `localStorage`
- **THEN** Le thème `cli-dark` est appliqué

#### Scenario: Suppression de l'habillage décoratif propriétaire
- **WHEN** La présentation charge avec le thème neutre par défaut
- **THEN** L'injection des polygones décoratifs spécifiques à l'ancien événement est absente, laissant un fond sobre et texturé compatible avec tout type de salle.

### Requirement: Famille de thèmes CLI/Terminal
Le deck SHALL fournir une famille de thèmes « CLI/Terminal », simple et élégante, en variantes claire (`cli-light`) et sombre (`cli-dark`). Elle donne une ambiance de terminal sans nuire à la lisibilité. Chaque variante MUST :
- employer `JetBrains Mono` pour les titres, les étiquettes et les numéros de partie ; `Poppins` reste la police du texte courant ;
- proposer des motifs de terminal discrets : prompt `❯` devant les titres de section, curseur clignotant sur la slide de titre ;
- désactiver les ornements blueprint (coins, réglettes de calibration) ;
- déclarer une palette ANSI en variables CSS (`--ansi-black` … `--ansi-white` et leurs variantes vives), réutilisable par les blocs terminal ;
- conserver une couleur distincte par partie, prise dans la palette du thème.

#### Scenario: Contraste
- **WHEN** une slide de contenu ou un bloc de code est affiché en `cli-light` ou en `cli-dark`
- **THEN** le texte et le code ont un contraste d'au moins 4,5:1 avec leur fond

#### Scenario: Animation réduite
- **WHEN** le système de l'utilisateur active `prefers-reduced-motion`
- **THEN** le curseur ne clignote pas et reste affiché en continu

#### Scenario: Pas d'ornements blueprint
- **WHEN** une slide de contenu est affichée avec un thème CLI
- **THEN** aucun élément `.blueprint-deco` ni `.card-calibration-strip` n'est visible

#### Scenario: Palette ANSI partagée
- **WHEN** un composant lit `var(--ansi-green)` sous un thème CLI
- **THEN** il obtient la valeur définie par la variante active, et cette valeur change quand l'utilisateur presse `T`
