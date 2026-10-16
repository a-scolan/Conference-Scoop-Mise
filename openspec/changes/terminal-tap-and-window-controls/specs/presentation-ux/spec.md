## ADDED Requirements

### Requirement: Avancée des consoles de démo au clic ou tap
Le moteur de diaporama DOIT (SHALL) faire passer une console de démo (`.terminal-block`) à son étape suivante lorsqu'un utilisateur clique ou tape dessus, sans changer de diapositive. Une console qui n'a plus d'étape à révéler NE DOIT PAS réagir au clic.

#### Scenario: Tap sur une console avec étapes restantes (mobile)
- **WHEN** l'utilisateur tape sur une console dont il reste au moins une étape masquée
- **THEN** l'étape suivante de cette console s'affiche, la diapositive courante reste la même, et la console porte la classe `is-advanceable` tant qu'il reste une étape.

#### Scenario: Tap sur une console arrivée à sa dernière étape
- **WHEN** l'utilisateur tape sur une console dont toutes les étapes sont affichées
- **THEN** rien ne change : la console ne porte plus `is-advanceable` et la diapositive ne change pas.

#### Scenario: Clic sur un lien ou un contrôle à l'intérieur d'une console
- **WHEN** l'utilisateur clique sur un lien, un bouton ou un champ situé dans une console
- **THEN** l'étape de la console ne change pas.

### Requirement: Boutons de fenêtre à droite de la barre de titre
Les boutons de fenêtre `_ □ ✕` d'une console de démo DOIVENT (SHALL) être placés à droite de la barre de titre, après le titre et le badge, sur écran de bureau comme sur écran mobile, comme sous Windows.

#### Scenario: Barre de titre en mobile paysage
- **WHEN** une console de démo est affichée en paysage compact (ex. 667×375)
- **THEN** le titre est à gauche, et les boutons `_ □ ✕` sont à l'extrême droite de la barre.

#### Scenario: Barre de titre en bureau
- **WHEN** une console de démo est affichée sur un écran de bureau (ex. 1280×800)
- **THEN** le titre est à gauche, le badge au centre, et les boutons `_ □ ✕` à l'extrême droite de la barre.
