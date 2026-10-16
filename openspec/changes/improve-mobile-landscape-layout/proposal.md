## Why

En mode paysage sur petit écran (téléphone, hauteur ≤ 560 px), plusieurs slides étaient illisibles : les hachures décoratives des cartes se superposaient au texte, le titre des fenêtres terminal était tronqué (« MS... »), le bloc terminal de la slide « 3 réflexes » sortait de la slide, et les en-têtes de carte débordaient de leur cadre. La spec `presentation-ux` prévoit déjà un layout compact, mais une règle CSS plus tardive annulait le masquage des hachures.

## What Changes

- Corriger la cascade des hachures : `presentation/src/styles/petscii.css` n'impose plus `display: block !important` sur `.card-hatch-strip-wrap`, pour que le masquage mobile de `decorations.css` s'applique.
- Synchroniser les variables `--card-pad-x` / `--card-pad-top` avec les paddings compacts des cartes, pour que les en-têtes de carte ne débordent plus.
- En-têtes de carte compacts : les libellés passent à la ligne au lieu de déborder.
- Fenêtres terminal en paysage compact : badge décoratif masqué, titre replié sur deux lignes au lieu d'être tronqué, bloc borné à la hauteur de la slide avec défilement interne si nécessaire.
- Antisèche de la slide de conclusion réduite en paysage compact pour tenir sans défilement.
- Aucune modification du rendu bureau ni du verrouillage portrait.

## Capabilities

### New Capabilities
- Aucune.

### Modified Capabilities
- `presentation-ux` : garanties de lisibilité en paysage compact (pas de chevauchement, pas de texte coupé, défilement interne en dernier recours).

## Impact

- `presentation/src/styles/petscii.css` (cascade des hachures).
- `presentation/src/styles/decorations.css` (bloc paysage compact : variables de carte, section terminal et cartes).
- `presentation/public/presentation.html`, `presenter-view.html`, `presenter-data.json` régénérés par le build.
- `README.md` : précision sur le rendu paysage compact.
- Le déroulé et les notes présentateur ne changent pas (aucun changement de contenu ni de narration).
