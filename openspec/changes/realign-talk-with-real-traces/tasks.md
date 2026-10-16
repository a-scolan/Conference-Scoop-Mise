## 1. Capturer les traces réelles

- [x] 1.1 Capturer en lecture seule sur le poste : `where.exe python`, `where.exe lazygit`, `gcc --version`, `make --version`, `scoop info lazygit`, `scoop export`, `mise ls`, `java -version`
- [x] 1.2 Cloner `a-scolan/DevRecipe` dans un répertoire temporaire et capturer `.\DevRecipe_windows.ps1 -Validate` (code de sortie) et `.\DevRecipe_windows.ps1 -DryRun` (code de sortie, durée mesurée)
- [x] 1.3 Capturer l'installation de `lazygit` dans un `SCOOP` temporaire (`scoop bucket add extras` puis `scoop install lazygit`), sans modifier le PATH de la session ni `~/scoop`
- [x] 1.4 Capturer la bascule Java 17 → 21 dans un `MISE_DATA_DIR` temporaire, avec `mise activate pwsh` dans un `pwsh -NoProfile` séparé, puis supprimer le répertoire temporaire
- [x] 1.5 Réécrire `demos/raw-command-outputs.md` : chaque bloc porte la commande, la date, le poste, le code de sortie ; les sorties non capturables sont étiquetées « simulation préparée par `prepare-admin.ps1` »

## 2. Démos

- [x] 2.1 `demos/mise-per-project/projet-legacy/mise.toml` : `[tools] java = "17"` ; `projet-moderne/mise.toml` : `[tools] java = "21"`, `[env] API_URL`, `[tasks.dev]` exécutable ; retirer Node du scénario
- [x] 2.2 Mettre à jour `demos/mise-per-project/README.md` (commandes Java, sortie capturée, plan B) et `demos/mise-tasks/README.md` (tâche `dev` réelle)
- [x] 2.3 Mettre à jour `demos/scoop-install/README.md` : étape `scoop bucket add extras` avec explication (lazygit n'est pas dans `main`), sortie capturée, version courante
- [x] 2.4 Supprimer `demos/devrecipe-dryrun/devrecipe.toml` (format non conforme au schéma du dépôt) et réécrire `demos/devrecipe-dryrun/README.md` avec `.\DevRecipe_windows.ps1 -Validate` et `-DryRun` sur le manifeste du dépôt, code 3 attendu, `-Review` interactif
- [x] 2.5 Mettre à jour `demos/path-shadowing/README.md` : étiqueter la sortie comme simulation préparée par `prepare-admin.ps1` (fichier `python.cmd` réellement créé), sans prétendre à une capture

## 3. Slides HTML

- [x] 3.1 `03-promesse.html` : retirer « Zéro UAC » et « aucune altération du système » au profit de formulations vérifiables
- [x] 3.2 `04-scoop-principe.html` : reformuler « Zéro UAC », « isolation totale », « désinstallation propre sans résidu » ; préciser que Scoop ajoute `~/scoop/shims` au PATH utilisateur
- [x] 3.3 `05-scoop-demo.html` : ajouter l'étape `scoop bucket add extras`, remplacer la sortie d'installation par la trace capturée, retirer « en 15 secondes » du titre
- [x] 3.4 `06-mise-principe.html` : retirer « 5 ms » (badge et carte), « ultra-performant » ; préciser l'activation (PowerShell et bash/zsh avec hook, cmd.exe via shims, nouveau terminal requis)
- [x] 3.5 `07-mise-demo.html` : scénario Java 17 → 21, sortie capturée, retirer « 5 ms » (sortie et statusbar), remplacer le libellé `LATENCY` par une information vérifiable
- [x] 3.6 `08-path-le-piege.html` : remplacer « règle mathématique immuable » et « impossible d'inverser » par la description de la concaténation HKLM puis HKCU et de l'absence de droits pour modifier HKLM
- [x] 3.7 `09-path-demo.html` : sortie alignée sur `prepare-admin.ps1` (`python.cmd`) et étiquetée « simulation » dans la slide ; retirer « Victoire technique »
- [x] 3.8 `10-devrecipe-rex.html` : noms réels (`DevRecipe_windows.toml`, `DevRecipe_windows.ps1`, `-Validate`, `-DryRun`, `-Review`) ; préflight décrit selon le README du dépôt (registre, App Paths, AppX, services, tâches)
- [x] 3.9 `11-devrecipe-demo.html` : sortie réelle de `-Validate` (code 0) et `-DryRun` (code 3, « no mutation was attempted ») ; retirer « [OK] DryRun complete (exit code 0) » et « zéro régression »
- [x] 3.10 `12-gouvernance.html` : AppLocker/WDAC comme règles s'appliquant au profil (blocage possible, exception à demander à la DSI) ; proxy d'entreprise ; `scoop export` comme liste des paquets (pas « état complet »)
- [x] 3.11 `13-recap-action.html` : retirer « commande vérifiée » ; garder la commande de démarrage

## 4. Déroulé et documentation

- [x] 4.1 `deroule-conference-slides.md` : mettre à jour verbatim, mots-clés, substance et beat des slides 03 à 13 selon les slides ; ajouter le point GNU/MinGW à l'acte 1 et l'explication du bucket `extras` ; recalculer les durées annoncées
- [x] 4.2 `README.md` : antisèche DevRecipe (noms réels), ajout `scoop bucket add extras` expliqué, passage `java` dans les exemples Mise si pertinent
- [x] 4.3 Rechercher les formules à retirer dans `presentation/src`, `deroule-conference-slides.md`, `README.md` et `demos/` (« 5 ms », « 15 secondes », « devrecipe -», « devrecipe.toml », « immuable », « isolation totale », « Zéro UAC », « exit code 0 » pour DryRun)

## 5. Vérification

- [x] 5.1 `npm run build:deck` puis `npm run verify` dans `presentation/` : alignement des 15 slides
- [x] 5.2 `openspec validate realign-talk-with-real-traces` sans erreur
- [x] 5.3 Contrôle visuel (débordement de texte) : mesure DOM sur les 16 slides, sans débordement ; captures de la slide parcours et de la démo DevRecipe via Chrome DevTools
- [x] 5.4 Supprimer les répertoires temporaires créés (clone DevRecipe, `SCOOP` et `MISE_DATA_DIR` de capture) et vérifier `git status`

## 6. Corrections de relecture (titres, AppLocker, parcours DevRecipe)

- [x] 6.1 Slide 08 : titres reformulés (« HKLM passe avant HKCU », « Masquage silencieux »), deck reconstruit
- [x] 6.2 Slide 12 et déroulé : AppLocker et WDAC n'agissent que si une stratégie est déployée ; retrait de « par défaut bloque »
- [x] 6.3 Slide « parcours » créée puis fusionnée dans la slide REX (`10-devrecipe-rex.html`, titre « DevRecipe : fonctionnement ») ; `10b-devrecipe-parcours.html` supprimée
- [x] 6.4 `slides.json` et déroulé : 15 slides après fusion, numérotation continue, durée des verbatims recalculée
- [x] 6.5 `demos/devrecipe-dryrun/README.md` : parcours complet (`-Validate`, `-DryRun`, `-Review`, `-Force`, codes), à rejouer dans Windows Sandbox ; `raw-command-outputs.md` : section non capturée mise à jour
- [x] 6.6 Mettre à jour proposal, design, deltas `talk-narrative` et `demo-scenarios`
- [x] 6.7 Parcours complet : installation réelle de git via DevRecipe `-Force` sur le poste de l'auteur (manifeste réduit, clone temporaire), désinstallée ensuite ; sandbox non utilisée

## 7. Relecture 2 (démo git, Mise, DevRecipe fusionné, clôture, WDAC)

- [x] 7.1 Slide 1 : bloc ASCII titre simplifié (« SCOOP + MISE » sur deux lignes), cadre aligné à 108 colonnes
- [x] 7.2 Slide 2 : phrase de présentation remplacée (« modernisations progressives », accord corrigé), ASCII de droite retiré, déroulé aligné
- [x] 7.3 Slide 5 : démo `git` au lieu de `lazygit` ; sorties réelles : `scoop install git`, `where.exe git` (Git natif en premier), `git --version` (2.53), `scoop uninstall git`
- [x] 7.4 Slide 6 : bloc « comment Mise choisit la version » (détection, hook, effet, repli shims) ; déroulé mis à jour
- [x] 7.5 Slide 7 : sous-titre expliquant que le `mise.toml` du dossier décide de la JVM ; verbatim mis à jour
- [x] 7.6 Slides 10 et 11 fusionnées : une slide « DevRecipe : fonctionnement » (quatre étapes) ; titre sans formule ; démo en trois étapes (`-Validate`, `-DryRun` code 3, `-Force` installation de git) ; remplacée en 8.1
- [x] 7.7 `demos/devrecipe-dryrun/README.md` : manifeste réduit à git (clone temporaire), commandes, sorties capturées ; remplacé en 8.4 (grep + java 11)
- [x] 7.8 `demos/scoop-install/README.md` : réécrit pour git ; `raw-command-outputs.md` : sections 2, 4 et 6 mises à jour
- [x] 7.9 Slide 14 (clôture) : une seule commande `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; irm get.scoop.sh | iex; scoop install mise`, sortie retirée, badge « [OK] » retiré ; vérifiée contre une synthèse de la doc Scoop (source primaire non ouverte) et la doc Mise (Context7 `/jdx/mise`, `scoop install mise`)
- [x] 7.10 Déroulé, README racine, `demos/reset.ps1` : `lazygit` remplacé par `git` là où la démo le référence
- [x] 7.11 Slide 13 (gouvernance) : non modifiée, à la demande ; réponse WDAC donnée dans la conversation (Scoop ne modifie pas WDAC, mais une politique peut bloquer Scoop)
- [ ] 7.12 Scoop : vérifier sur un poste vierge (ou Windows Sandbox) la commande unique de la clôture avant la session
- [ ] 7.13 Décider si la ligne de rôle « Architecte technique @Onepoint » fait doublon avec la phrase de présentation (slide 2)

## 8. Lancement DevRecipe réel (log fourni par l'auteur)

- [x] 8.1 Slide 11 (démo DevRecipe) : terminal déroulant (`terminal-block--scroll`, étapes qui poussent les anciennes lignes hors du cadre) avec le log réel, passages coupés par « ... »
- [x] 8.2 Slide 11 : titre « En direct : Java 21 et 26 sont déjà là, je force Java 11 » ; statut `2 PAQUETS : GREP, JAVA 11`
- [x] 8.3 Slide 14 (fin) : liens cliquables vers scoop.sh, mise.jdx.dev, dépôt DevRecipe et dépôt du talk
- [x] 8.4 Déroulé (slides 11 et 14), `demos/devrecipe-dryrun/README.md`, `raw-command-outputs.md` section 4c
- [ ] 8.5 Fournir le manifeste exact utilisé (`grep` + `java = "11"`) pour l'ajouter à `demos/`, afin de rejouer la démo à l'identique