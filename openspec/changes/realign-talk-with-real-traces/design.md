## Context

Le deck est un site statique assemblé depuis `presentation/src/slides/` (HTML) et `deroule-conference-slides.md` (notes présentateur, lues par `npm run build:deck`). `scripts/verify-conference.js` contrôle l'alignement des titres et le nombre d'entrées entre `slides.json`, le déroulé et `presenter-data.json`. Il ne contrôle ni les chiffres, ni les commandes, ni les sorties : la vérification factuelle est donc faite à la main, ici, contre des traces réelles.

Faits établis pendant l'enquête (poste de l'auteur, Windows, Scoop v0.6.0, Mise 2026.10.3, DevRecipe cloné depuis `a-scolan/DevRecipe`) :

- DevRecipe expose `DevRecipe_windows.ps1` et lit `DevRecipe_windows.toml` (schéma v2). Le README et `docs/quick-start.md` documentent `-Validate`, `-List`, `-DryRun`, `-Review` (qui exige un terminal interactif), `-Force`, `-SkipPreflight`, `-Profile`.
- `-DryRun` ne modifie pas l'hôte mais exécute le préflight en lecture seule. Sur ce poste, il retourne le code 3 (« Preflight needs human decisions; no mutation was attempted »).
- `lazygit` n'est pas dans le bucket `main` de Scoop : il vit dans `extras` (version 0.66.0 au moment de la capture).
- Le manifeste DevRecipe installe déjà `gcc`, `make`, `coreutils`, `sed`, `gawk` dans son profil `default`. Le paquet `coreutils` de Scoop décrit bash, make, gawk et grep. `gcc` 15.2.0 et `make` 4.4.1 sont installés ici via Scoop.
- Mise : `mise ls-remote java@17` et `java@21` répondent ; le poste a Java 25 (Temurin) et Mise 26.0.2 pour Java.
- AppLocker n'applique rien tant qu'une stratégie n'est pas déployée. Les règles par défaut autorisent `%windir%\*`, `%programfiles%\*` et les administrateurs (source secondaire : résumé de recherche d'après Microsoft Learn).

## Goals / Non-Goals

**Goals:**
- Chaque sortie projetée est soit une trace réelle capturée (horodatée, avec le code de sortie), soit explicitement marquée comme simulation avec la commande qui la produit.
- Le discours, les slides et le déroulé disent la même chose et ne contiennent aucun chiffre non mesuré.
- DevRecipe est présenté avec ses noms et options réels.
- Le point GNU/MinGW et la contrainte AppLocker sont traités comme des sujets à part entière.

**Non-Goals:**
- Réécrire la narration des actes, ni changer le nombre de slides (15 entrées, dont la slide 14 non touchée).
- Installer sur le poste de l'auteur des paquets ou runtimes pour les démos. Les installations sont faites dans des répertoires isolés (`SCOOP`, `MISE_DATA_DIR`) qui ne modifient ni le PATH ni les shims de la session.
- Modifier le change `add-feedback-qr-last-slide` ou les fichiers non liés déjà modifiés par ailleurs (`components.css`, `decorations.css`, `14-merci.html`, `event.config.json`).
- Capturer la démo `path-shadowing` : elle exige des droits admin pour écrire dans HKLM ; elle reste une simulation préparée par `prepare-admin.ps1`, dont le résultat est décrit tel quel.

## Decisions

- **Traces réelles en lecture seule quand c'est possible.** `where.exe`, `gcc --version`, `make --version`, `scoop info`, `scoop export`, `mise ls`, `DevRecipe_windows.ps1 -Validate` et `-DryRun` sont lancés sur le poste. Leur sortie est reproduite telle quelle, avec le code de sortie.
- **Installations dans un environnement jetable.** `scoop install lazygit` est lancé avec `SCOOP=<tmp>` et `scoop bucket add extras` dans ce même répertoire. Constat de la capture : Scoop ajoute quand même son dossier `shims` au PATH utilisateur persistant. L'entrée temporaire est donc retirée après capture, et le PATH utilisateur est vérifié. Le scénario Java est joué avec `MISE_DATA_DIR` et `MISE_CONFIG_DIR` temporaires, `mise hook-env` appelé après chaque `cd` dans un `powershell -NoProfile` séparé (`pwsh` n'est pas installé sur le poste). Le répertoire temporaire est supprimé après capture.
- **Démo Mise en Java.** `projet-legacy/mise.toml` : `[tools] java = "17"`. `projet-moderne/mise.toml` : `[tools] java = "21"`, `[env] API_URL`, `[tasks.dev]` avec une commande réellement exécutable sur le poste. Node disparaît de la démo, mais reste dans le verbatim de l'acte Mise comme exemple de runtime.
- **Démo DevRecipe sur le dépôt réel.** `demos/devrecipe-dryrun/devrecipe.toml` (format inventé, non schéma v2) est supprimé. La démo clone `a-scolan/DevRecipe` et lance `.\DevRecipe_windows.ps1 -Validate`, puis `-DryRun`. Le résultat projeté est le code 3 avec le message de décision humaine, suivi de l'explication de `-Review` (interactif). Le temps d'exécution du `-DryRun` est mesuré et annoncé dans le README.
- **Pas de chiffre non mesuré.** Les « 5 ms », « 15 secondes » et « ultra-performant » sont retirés. Les durées de démo restent des durées cibles, pas des promesses de performance.
- **AppLocker : conditionnel, pas par défaut.** Le slide 12 dit : AppLocker et WDAC n'agissent que si la DSI déploie une stratégie ; si elle bloque `%USERPROFILE%\scoop`, la DSI doit autoriser le chemin ou l'éditeur. Scoop ne contourne rien. Le verbatim le précise, et rappelle que l'auteur n'a pas rencontré ce blocage sur ses postes.
- **Parcours DevRecipe en slide dédiée.** Les quatre temps (manifeste, préflight, décision `-Review`, environnement) ont leur slide, avant la démo. La démo d'installation réelle n'est pas jouée sur le poste de l'auteur : elle se rejoue dans Windows Sandbox (`demos/sandbox.wsb`).
- **Paquets GNU présentés comme une option.** Le verbatim de l'acte 1 dit que `gcc`, `make` et `coreutils` (bash, sed, awk) s'installent en espace utilisateur ; l'équivalent MinGW à la main reste possible mais n'est plus nécessaire pour les outils courants. Il n'est pas dit que Scoop remplace un environnement Linux complet.
- **Déroulé et slides modifiés ensemble.** Chaque changement de slide est répercuté dans le déroulé (verbatim, mots-clés, substance) avant `npm run build:deck`, pour que `verify-conference.js` reste vert.

## Risks / Trade-offs

- **Installation isolée non représentative.** Un `SCOOP` séparé ne reproduit pas l'état d'un poste de démo (shims déjà sur le PATH). La démo live doit donc être répétée sur le poste de démo avant la session ; les traces du repli sont étiquetées avec la date et le poste de capture.
- **Java 17 et 21 à télécharger.** Le téléchargement dépend du réseau ; la capture est faite une fois et conservée dans `demos/raw-command-outputs.md`.
- **`-DryRun` lent.** Le préflight interroge 44 paquets. Il est exécuté avant la session ; la démo montre le résultat, pas le calcul.
- **Résumé AppLocker secondaire.** Les règles par défaut ont été vérifiées via un résumé Microsoft Learn ; la page officielle n'a pas pu être ouverte depuis l'environnement. À confirmer sur la politique réelle de l'entreprise avant la conférence.
- **Démo PATH non capturable ici.** Sans droits admin, `prepare-admin.ps1` ne peut pas créer l'entrée HKLM. Le slide 09 garde la simulation, décrite comme telle dans le README de démo.
