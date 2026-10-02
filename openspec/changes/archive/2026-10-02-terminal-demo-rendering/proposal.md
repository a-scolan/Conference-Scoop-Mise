## Why

Le talk repose sur des lignes de commande : `scoop install`, `mise use`, `where.exe`, DevRecipe. Le moteur actuel ne sait afficher que du code statique. Or, sur scène, il faut que les commandes soient :
- lisibles du fond de la salle ;
- épurées : pas de prompt long, de chemin ou de bruit ;
- colorées comme dans un vrai terminal ;
- révélées pas à pas, au clavier ;
- disponibles sans réseau.

Plusieurs techniques existent, mais aucune n'est évidente sous Windows. Il faut donc les explorer avant de choisir.

## Objectifs et résultats attendus

| Objectif | Résultat observable |
| --- | --- |
| Lisibilité en salle | Une commande de 60 caractères tient sur une ligne en 1920×1080, à 28 px minimum. Test de lecture à 10 m (ou capture réduite au quart). |
| Rendu épuré | Le prompt affiché fait au plus 2 caractères (`>` ou `❯`). Pas de chemin, d'utilisateur ni d'horodatage. |
| Coloration fidèle | PowerShell, cmd, TOML et JSON sont colorés. Les sorties ANSI (couleurs de Scoop, Mise) sont conservées. |
| Révélation pas à pas | Chaque appui sur → révèle la commande suivante, puis sa sortie. ← revient en arrière sans glitch. |
| Mise en évidence | Un token ou une ligne de sortie peut être surligné (ex. le chemin HKLM dans `where.exe`). |
| Robustesse | Le rendu fonctionne hors ligne et suit les thèmes (T) et le mode confort (C). |
| Repli de démo | Une démo live a un repli rejouable dans le deck, issu d'une vraie capture. |

## What Changes

- Ajouter au deck un composant « bloc terminal » déclaratif, utilisable dans une slide HTML.
- Choisir, après spike, une technique de rendu principale et une technique de repli parmi 5 options (voir `design.md`).
- Ajouter un outil de capture qui transforme une vraie session de démo en données rejouables dans le deck.
- Ajouter un profil de terminal « présentation » pour les démos live : Windows Terminal, police, prompt minimal, schéma de couleurs aligné sur le thème du deck.
- Exposer les commandes d'un bloc terminal dans les notes présentateur.

## Capabilities

### New Capabilities
- `terminal-display` : affichage de commandes et de sorties de terminal dans les slides (statique, rejoué ou live), avec exigences de lisibilité, d'épuration, de coloration, de révélation pas à pas et de fonctionnement hors ligne.

### Modified Capabilities
_Aucune pour l'instant._ La spec `presentation-ux` (« Mise en exergue dynamique du code ») pourra être généralisée après le choix de la technique.

## Hors périmètre

- Le contenu des démos (change `bootstrap-scoop-mise-talk`, spec `demo-scenarios`).
- L'export vidéo du talk.
- Un terminal accessible au public (lien partagé, multi-utilisateur).
- L'édition de code dans les slides (la fonction « live coding » de l'ancien talk est supprimée).

## Impact

- `presentation/src/scripts/` : nouveau module de rendu terminal, branché sur les étapes `[data-step]` du moteur.
- `presentation/src/styles/` : styles du bloc terminal, liés aux tokens de thème.
- `presentation/build-deck.js` : éventuel pré-rendu de la coloration au build.
- `presentation/package.json` : nouvelles dépendances possibles (Shiki, xterm.js, asciinema-player), à vendoriser pour le hors ligne.
- `demos/` : fichiers de capture (`.cast` ou JSON).
- `presentation/server.js` : uniquement si l'option terminal live est retenue (WebSocket + pseudo-terminal).
