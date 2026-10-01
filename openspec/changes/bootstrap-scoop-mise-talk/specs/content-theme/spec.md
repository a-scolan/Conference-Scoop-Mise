## MODIFIED Requirements

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

### Requirement: Thèmes visuels interchangeables et sélecteur interactif
Le moteur de présentation DOIT (SHALL) supporter la sélection dynamique ou par configuration d'un thème visuel parmi plusieurs feuilles de style prédéfinies (dont un thème neutre par défaut), et fournir un mécanisme de bascule (*theme switch*) interactif dans le code (raccourci clavier `T`, paramètre d'URL `?theme=` ou sélecteur discret d'interface).

#### Scenario: Sélection d'un thème alternatif en cours de session
- **WHEN** L'utilisateur presse la touche `T` ou sélectionne un thème dans le sélecteur d'interface
- **THEN** Le diaporama met à jour l'attribut `data-theme` sur l'élément racine `<html>`, applique instantanément la feuille de variables correspondante, mémorise le choix dans le `localStorage` et réinitialise les styles Mermaid et des blocs terminal.

#### Scenario: Chargement avec un paramètre d'URL explicite
- **WHEN** L'URL contient un paramètre de thème (ex: `?theme=slate-architect`)
- **THEN** Le diaporama applique directement ce thème au chargement sans recourir au thème par défaut.

#### Scenario: Suppression de l'habillage décoratif propriétaire
- **WHEN** La présentation charge avec le thème neutre par défaut
- **THEN** L'injection des polygones décoratifs spécifiques à l'ancien événement est absente, laissant un fond sobre et texturé compatible avec tout type de salle.
