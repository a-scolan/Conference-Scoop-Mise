## Why

Sur mobile, les consoles de démo (`.terminal-block`) ne réagissaient pas au toucher : seul un balayage vertical changeait d'étape, ce que les lecteurs ne découvrent pas. Par ailleurs, les boutons de fenêtre `_ □ ✕` étaient à gauche du titre, contrairement à Windows.

## What Changes

- Un clic ou tap sur une console (`.terminal-block`) affiche l'étape suivante de cette console, sans changer de slide. Le clic est sans effet quand la console n'a plus d'étape à révéler.
- La classe `is-advanceable` marque une console qui a encore une étape ; elle affiche un curseur en main.
- Les boutons de fenêtre `_ □ ✕` sont placés à droite de la barre de titre, après le titre et le badge, en bureau comme en mobile.
- Aucune modification du contenu, de la narration ni du déroulé.

## Capabilities

### New Capabilities
- Aucune.

### Modified Capabilities
- `presentation-ux` : interaction tactile des consoles de démo et ordre des boutons de fenêtre.

## Impact

- `presentation/src/scripts/terminal-block.js` : listener `click` délégué et classe `is-advanceable`.
- `presentation/src/styles/components.css` : ordre flex de la barre de titre et curseur.
- `presentation/public/*` régénérés par le build.
- `README.md` : ligne du tableau des contrôles.
