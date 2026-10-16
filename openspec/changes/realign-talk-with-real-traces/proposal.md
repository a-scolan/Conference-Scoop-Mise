## Why

La relecture du discours et des slides a relevé des écarts entre ce qui est projeté, ce qui est dit et ce que les outils font réellement :

- les sorties de démo (`raw-command-outputs.md`, slides 05, 09, 11) sont des transcriptions inventées, présentées comme « réelles » ;
- la démo Mise mélange Node (verbatim, `mise.toml`) et Java (slide 07, `mvnw`) ;
- des chiffres non mesurés (« 5 ms ») et des formules trop affirmatives (« isolation totale », « règle mathématique immuable », « zéro UAC », « bloque tout binaire illégitime ») ;
- le nom et les options de DevRecipe (`devrecipe`, `devrecipe.toml`, exit code 0 en dry run) ne correspondent pas au dépôt réel (`DevRecipe_windows.ps1`, `DevRecipe_windows.toml`, exit code 3 quand une décision humaine est requise) ;
- le bucket `extras` n'est pas expliqué alors que `lazygit` n'est pas dans le bucket `main` ;
- le sujet « scripts Linux / bash » est posé en accroche mais jamais traité, alors que Scoop fournit les outils GNU (gcc, make, coreutils) en espace utilisateur ;
- le slide 12 présente EDR et AppLocker comme des protections qui « bloquent tout binaire suspect ». AppLocker et WDAC n'appliquent rien tant qu'une stratégie n'est pas déployée ; une stratégie déployée peut bloquer un outil installé dans `%USERPROFILE%`, et l'exception relève de la DSI. C'est une contrainte à expliquer, pas une garantie.

Le spec `demo-scenarios` exige déjà que le repli « rejoue les commandes et leurs sorties réelles, capturées pendant une répétition ». Ce change met le contenu en conformité avec cette exigence.

## What Changes

- Remplacer les sorties inventées par des traces réelles capturées sur le poste (lecture seule, ou dans un répertoire Scoop/Mise isolé pour les installations). Les traces impossibles à capturer sans droits admin sont marquées comme telles.
- Passer la démo Mise au scénario Java : `projet-legacy` en Java 17, `projet-moderne` en Java 21, avec `[tools]`, `[env]` et `[tasks.dev]` dans chaque `mise.toml`.
- Retirer les chiffres non mesurés (« 5 ms ») des slides, du déroulé et des démos.
- Aligner DevRecipe sur le dépôt `a-scolan/DevRecipe` : `DevRecipe_windows.ps1`, `DevRecipe_windows.toml`, `-Validate`, `-DryRun`, `-Review`, exit code 3 ; le manifeste inventé `demos/devrecipe-dryrun/devrecipe.toml` est remplacé par une référence au manifeste du dépôt.
- Expliquer l'ajout du bucket `extras` (où vit `lazygit`, pourquoi ce n'est pas `main`) dans la démo Scoop.
- Ajouter au discours le point GNU/MinGW : `gcc`, `make`, `coreutils` (bash, sed, awk) s'installent en espace utilisateur, sans installer MinGW à la main.
- Reformuler les affirmations trop péremptoires (UAC, isolation, AppLocker/WDAC, PATH « immuable », « ultra-performant », « vérifié »).
- Reformuler le slide 12 : AppLocker et WDAC n'agissent que si la DSI déploie une stratégie ; si elle bloque `%USERPROFILE%\scoop`, la DSI doit autoriser le chemin ou l'éditeur. Ajouter le proxy d'entreprise, exigé par le spec `talk-narrative`.
- Ajouter une slide « DevRecipe : le parcours d'installation » (manifeste, préflight, décision `-Review`, environnement) avant la démo DevRecipe. La démo d'installation réelle est rejouée dans Windows Sandbox, pas sur le poste.
- Mettre à jour le déroulé (`deroule-conference-slides.md`), les notes présentateur, les READMEs de démo, la antisèche du `README.md` et les slides concernées, puis reconstruire le deck et lancer `npm run verify`.

## Capabilities

### New Capabilities

Aucune.

### Modified Capabilities
- `talk-narrative`: le cadre de gouvernance cite AppLocker/WDAC comme contrainte à négocier et le proxy ; le point GNU/MinGW de l'acte 1 est ajouté ; les affirmations chiffrées sont retirées.
- `demo-scenarios`: la démo `mise-per-project` passe au scénario Java 17 / 21 ; la démo `scoop-install` inclut l'ajout du bucket `extras` ; la démo `devrecipe-dryrun` utilise le manifeste et les commandes du dépôt DevRecipe, avec l'exit code 3 comme résultat réel attendu ; les sorties des démos sont celles de traces capturées.

## Impact

- Slides : `presentation/src/slides/03-promesse.html`, `04-scoop-principe.html`, `05-scoop-demo.html`, `06-mise-principe.html`, `07-mise-demo.html`, `08-path-le-piege.html`, `09-path-demo.html`, `10-devrecipe-rex.html`, `11-devrecipe-demo.html`, `12-gouvernance.html`, `13-recap-action.html`.
- Déroulé et notes : `deroule-conference-slides.md`, puis `presentation/public/assets/presenter-data.json` (généré par `npm run build:deck`).
- Démos : `demos/raw-command-outputs.md`, `demos/scoop-install/README.md`, `demos/mise-per-project/` (README et deux `mise.toml`), `demos/mise-tasks/README.md`, `demos/path-shadowing/README.md`, `demos/devrecipe-dryrun/` (README ; `devrecipe.toml` supprimé).
- Documentation : `README.md` (antisèche DevRecipe et Scoop).
- Vérification : `npm run verify` et `npm run build:deck` dans `presentation/`.
- Hors périmètre : le change `add-feedback-qr-last-slide` (déjà terminé, non archivé), le CFP abstract, le contenu de la slide 14, la capture d'un repli vidéo.
