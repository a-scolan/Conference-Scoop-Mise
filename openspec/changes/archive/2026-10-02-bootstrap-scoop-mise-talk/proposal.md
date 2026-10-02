## Why

Le dépôt hérite du moteur de slides de la conférence « Diagram as Code ». Ce moteur fonctionne bien, mais le contenu, les specs et le pipeline LikeC4 ne servent plus. Il faut maintenant fixer les objectifs du quickie « Installer ses outils de dev avec Scoop et Mise ». Il faut aussi fixer les résultats attendus et les démos nécessaires. Le premier jet est attendu pour le 12/10/2026.

## Objectifs et résultats attendus

| Objectif | Résultat observable |
| --- | --- |
| Faire reconnaître la douleur | En moins de 90 s, la salle se reconnaît dans au moins 2 des 4 messages de l'abstract : `UAC`, `Command not found`, `Required node version`, `only available on Linux`. Mesure : mains levées. |
| Montrer qu'on installe sans admin | Une démo installe un outil avec Scoop, sans invite UAC, puis le lance dans un nouveau terminal. |
| Montrer des versions par projet | Une démo change de dossier : la version de Node (ou Python) change seule, grâce à un `mise.toml` versionné. |
| Démystifier le PATH Windows | Le public repart avec une règle : le PATH machine (HKLM) passe avant le PATH utilisateur (HKCU). Une démo `where.exe` montre un runtime système qui masque le runtime utilisateur, puis le correctif. |
| Industrialiser pour l'équipe | DevRecipe apparaît comme REX : un manifeste TOML relu en PR, un dry run avec preflight des conflits, puis l'installation. Message : l'onboarding devient une commande. |
| Donner une ambiance dev-friendly | Le thème CLI/Terminal s'affiche par défaut. Le texte et le code ont un contraste d'au moins 4,5:1 sur les deux variantes. T bascule CLI clair ↔ CLI sombre sans recharger la page. |
| Tenir 15 min | Le déroulé chronométré tient en 14 min ± 30 s en répétition, avec 1 min de marge pour la clôture. |

## What Changes

- Définir la trame narrative du quickie : actes, timing, messages clés et appel à l'action. Elle s'appuie sur le REX DevRecipe.
- Définir les scénarios de démo : ce que chacun prouve, ses préconditions, son environnement jetable et son repli hors ligne.
- Reconfigurer le deck : sections et couleurs par partie, checklist avant-scène adaptée aux démos terminal, slides squelettes par acte.
- Ajouter une famille de thèmes « CLI/Terminal » (`cli-light`, `cli-dark`), simple et élégante, pour donner une ambiance dev au talk. Elle devient la famille par défaut : T bascule entre ses variantes claire et sombre. Blueprint et Slate restent accessibles via `?theme=`.
- **BREAKING** : retirer du périmètre les exigences LikeC4 (compilation single-file, scripts de publication miroir). Le code correspondant a déjà été supprimé pendant le nettoyage initial.
- Nettoyer le moteur des branches propres aux anciennes slides (`slide--live-coding`, `slide--c2-unified`, `slide--pr-review`, `slide--c2-evolution`) et du CSS LikeC4 devenu mort.
- Rendre la sortie du build neutre : `presentation.html` remplace `presentation-diagram-as-code.html`. C'est déjà fait dans le code ; la spec doit s'aligner.

## Capabilities

### New Capabilities
- `talk-narrative` : objectifs, structure en actes, timing, messages clés et clôture du quickie.
- `demo-scenarios` : catalogue des démos (Scoop, Mise, PATH, DevRecipe), avec preuves attendues, environnement reproductible et replis.

### Modified Capabilities
- `build-and-delivery` : suppression des exigences LikeC4 et des scripts de publication miroir ; sortie renommée en `presentation.html`.
- `content-theme` : nouvelle signalétique par partie (Accroche, Scoop, Mise, PATH, DevRecipe, Clôture) ; famille de thèmes CLI/Terminal par défaut ; plus de réinitialisation LikeC4 au changement de thème.
- `presenter-view` : la checklist avant-scène cible les démos terminal (environnement de démo prêt, terminal de secours, réseau coupé ou non) ; la console suit les 4 thèmes.

## Hors périmètre

- Le mode de rendu des lignes de commande dans les slides. Il est traité par le change `terminal-demo-rendering`.
- Les retours de la conférence précédente sur le moteur. Ils sont à traiter dans un futur change, `stage-feedback-improvements` :
  - mode miroir des clics ou bindings de touches (digipad, combinaisons) ;
  - départ du chrono ;
  - flashs et retours arrière lors d'un redimensionnement ou d'un changement de slide ;
  - molette trop sensible ;
  - taille du texte des slides denses.
- La posture orateur (regard salle, gestuelle, mémorisation des tournures clés). C'est du travail de répétition, pas de spec.
- La publication du nouveau repo GitHub et de GitHub Pages. Le dépôt reste local (`git init`) tant que le nom n'est pas choisi.
- macOS et Linux. DevRecipe les supporte, mais le talk cible Windows.

## Impact

- `presentation/src/slides/`, `slides.json`, `deroule-conference-slides.md` : nouvelles slides par acte.
- `presentation/src/scripts/slide-engine.js` : retrait des branches mortes.
- `presentation/src/styles/components.css`, `slides.css` : retrait du CSS LikeC4 et des anciennes slides.
- `presentation/src/presenter/presenter-view.html` : checklist avant-scène, suivi des thèmes CLI.
- `presentation/src/styles/themes/` : nouvelles feuilles `cli-light.css` et `cli-dark.css`.
- `presentation/src/scripts/theme-controller.js` : thème par défaut, cycle de T, valeurs de `?theme=`.
- `openspec/specs/` : 2 nouvelles specs, 3 specs modifiées.
- Dépendance de contenu : le dépôt public [a-scolan/DevRecipe](https://github.com/a-scolan/DevRecipe) est la source de vérité du REX (doc preflight, gouvernance, précédence des shims).
