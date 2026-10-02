## Purpose

Afficher des commandes et des sorties de terminal dans les slides, de façon lisible en salle, épurée, colorée et révélée pas à pas. Le rendu doit fonctionner hors ligne et suivre les thèmes du deck. Il sert aussi de repli quand une démo live échoue.

## Requirements

### Requirement: Bloc terminal déclaratif
Le deck SHALL fournir un bloc terminal déclaré dans le HTML d'une slide. Le bloc MUST accepter : le shell (`pwsh`, `cmd`, `bash`), une liste ordonnée de commandes, la sortie de chaque commande et un titre optionnel. L'auteur MUST NOT écrire de JavaScript pour ajouter un bloc.

#### Scenario: Ajout d'un bloc dans une slide
- **WHEN** l'auteur ajoute un bloc terminal avec 3 commandes et leurs sorties dans une slide HTML
- **THEN** après `npm run build`, la slide affiche un terminal avec ces 3 commandes, sans code JavaScript propre à la slide

### Requirement: Lisibilité réglable
Le texte d'un bloc terminal SHALL faire au moins 28 px en 1920×1080. La taille MUST être réglable par bloc. Elle MUST aussi augmenter avec le mode confort (touche C, variable `--font-bump`).

#### Scenario: Commande longue
- **WHEN** un bloc affiche une commande de 60 caractères en 1920×1080
- **THEN** la commande tient sur une ligne, sans défilement horizontal

#### Scenario: Mode confort
- **WHEN** l'orateur presse C
- **THEN** la taille du texte du bloc augmente comme le reste du deck

### Requirement: Rendu épuré
Le bloc SHALL afficher un prompt de 2 caractères au plus. Il MUST masquer le chemin, l'utilisateur, la machine et l'horodatage. Le cadre du terminal (titre, boutons de fenêtre) MUST être optionnel.

#### Scenario: Prompt par défaut
- **WHEN** un bloc `pwsh` est affiché sans option de prompt
- **THEN** chaque commande est précédée de `>` uniquement

### Requirement: Coloration syntaxique et sorties ANSI
Les commandes SHALL être colorées selon leur langage (PowerShell, cmd, bash). Les fichiers affichés MUST être colorés selon leur format (TOML, JSON). Les sorties issues d'une capture MUST conserver les couleurs ANSI d'origine.

#### Scenario: Sortie colorée de Scoop
- **WHEN** un bloc affiche la sortie capturée de `scoop install`
- **THEN** les couleurs de la sortie réelle (vert pour le succès, jaune pour les avertissements) sont visibles

### Requirement: Révélation pas à pas au clavier
Le bloc SHALL utiliser les étapes `[data-step]` du moteur. Chaque étape MUST révéler une commande, puis sa sortie. La navigation arrière MUST masquer la dernière étape sans recharger le bloc.

#### Scenario: Avancer puis reculer
- **WHEN** l'orateur presse → deux fois, puis ← une fois
- **THEN** la première commande et sa sortie restent visibles, la deuxième commande est masquée, et aucun flash n'est visible

#### Scenario: Effet de frappe optionnel
- **WHEN** l'effet de frappe est activé sur un bloc
- **THEN** la commande apparaît caractère par caractère en moins de 1,5 s, puis la sortie apparaît d'un coup

### Requirement: Mise en évidence de tokens et de lignes
L'auteur SHALL pouvoir surligner une ligne de sortie ou un token précis. Il MUST aussi pouvoir estomper le reste du bloc.

#### Scenario: Chemin masquant dans `where.exe`
- **WHEN** le bloc affiche la sortie de `where.exe python`, avec la ligne `C:\Python3xx\python.exe` marquée
- **THEN** cette ligne est surlignée et les autres lignes sont estompées

### Requirement: Fonctionnement hors ligne et suivi du thème
Le bloc SHALL fonctionner sans réseau : toutes les dépendances MUST être servies depuis `public/assets/`. Les couleurs du bloc MUST dériver des tokens du thème actif et changer avec la touche T.

#### Scenario: Réseau coupé
- **WHEN** le deck est ouvert sans réseau
- **THEN** les blocs terminal s'affichent et se colorent normalement

#### Scenario: Changement de thème
- **WHEN** l'orateur presse T
- **THEN** le fond, le texte et la palette ANSI du bloc suivent le nouveau thème, avec un contraste d'au moins 4,5:1 pour le texte

### Requirement: Rejeu d'une capture réelle
Le projet SHALL fournir un moyen de transformer une vraie session de démo en données rejouables par le bloc. La capture MUST conserver les commandes, les sorties et les couleurs ANSI.

#### Scenario: Mise à jour d'un repli
- **WHEN** l'orateur rejoue une démo dans l'environnement de démo avec l'outil de capture
- **THEN** le fichier de capture est mis à jour dans `demos/<id>/` et le bloc du deck affiche la nouvelle sortie après `npm run build`

### Requirement: Commandes dans les notes présentateur
La vue présentateur SHALL lister les commandes du bloc terminal de la slide courante, dans l'ordre, avec l'étape courante mise en évidence.

#### Scenario: Suivi de l'étape
- **WHEN** l'orateur est à l'étape 2 d'un bloc de 4 commandes
- **THEN** la vue présentateur montre les 4 commandes et met en évidence la deuxième
