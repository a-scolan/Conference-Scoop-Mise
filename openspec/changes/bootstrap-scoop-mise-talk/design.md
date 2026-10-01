## Context

Le dépôt vient d'être nettoyé : il ne reste que le moteur du deck (slides HTML modulaires, vue présentateur, thèmes, Mermaid) et 3 slides squelettes. Le talk est un quickie de 15 min. Il s'adresse à des développeurs et tech leads sous Windows en entreprise. Le contenu s'appuie sur le REX de [DevRecipe](https://github.com/a-scolan/DevRecipe) : Scoop pour les paquets, Mise pour les runtimes, sans UAC, avec un manifeste TOML et un preflight des conflits.

Contraintes :
- 15 minutes : pas de temps pour une installation réseau en direct ni pour un dépannage sur scène.
- Poste d'entreprise : EDR, proxy et politiques de groupe peuvent bloquer une démo. La démo ne doit pas dépendre du poste de l'orateur.
- Le moteur actuel parse le déroulé dans un format strict (`### Slide N — Titre`, champs en gras). On garde ce format.

## Goals / Non-Goals

**Goals:**
- Une trame en 6 actes, avec budget de temps et message clé par acte.
- 5 démos courtes, documentées, réinitialisables et avec repli enregistré.
- Un deck et des specs sans trace de LikeC4.

**Non-Goals:**
- Choisir la technique de rendu des commandes dans les slides (change `terminal-demo-rendering`).
- Les améliorations du moteur issues de la conférence précédente (futur change `stage-feedback-improvements`).
- Couvrir macOS/Linux, winget ou Chocolatey en détail. Une seule slide de comparaison suffit.

## Decisions

### D1. Trame : « problème → outil → piège → industrialisation »
- **Option A (retenue)** : partir des 4 erreurs de l'abstract, puis Scoop, Mise, PATH, DevRecipe. Chaque acte résout une erreur montrée dans l'accroche. Avantage : fil rouge clair, promesse tenue de façon visible.
- **Option B** : partir de DevRecipe (« voici notre outil ») puis détailler ses briques. Inconvénient : le public voit un outil maison avant de comprendre le problème ; risque d'effet « pitch produit ».
- **Option C** : comparatif winget / Chocolatey / Scoop, puis nvm / pyenv / Mise. Inconvénient : trop long pour 15 min, et le message « sans admin » se dilue.

### D2. PATH placé après Mise et avant DevRecipe
Le piège du PATH apparaît quand on combine Scoop et Mise sur un poste qui a déjà des runtimes système. Le montrer après Mise donne un moment « ah, c'est pour ça ». DevRecipe arrive ensuite comme réponse industrialisée : reshim, ordre du PATH user, `AutoRun` pour cmd.exe, preflight des conflits.

### D3. Environnement de démo
- **Option A (proposée)** : Windows Sandbox avec un fichier `.wsb` qui monte `demos/` et lance un script de préparation. Avantages : jetable, réinitialisé à chaque ouverture, aucun impact sur le poste. Risques : Sandbox doit être activé (édition Pro/Entreprise, droits admin à l'activation), et le démarrage prend environ 30 s.
- **Option B** : VM Hyper-V avec un snapshot. Avantages : état exact, préparation lourde possible. Inconvénients : machine plus lourde, Hyper-V pas toujours disponible sur un poste d'entreprise.
- **Option C** : compte Windows local dédié. Avantages : léger. Inconvénients : la démo `path-shadowing` modifie le PATH machine, donc tout le poste.

Choix final après le spike S1 (voir tâches). Les caches Scoop et Mise doivent être préremplis dans l'option choisie.

### D4. Démo live ou enregistrée
- **Option A (proposée)** : démo live dans l'environnement de démo, avec un repli enregistré intégré au deck pour chaque démo.
- **Option B** : uniquement des enregistrements. Plus sûr, mais moins convaincant : le message « sans UAC » est plus fort en direct.

### D5. Dossier `demos/` à la racine
Chaque démo a son dossier : `README.md` (preuve, commandes, sortie attendue, durée), fichiers d'exemple (`mise.toml`, manifeste DevRecipe), et un script de vérification optionnel. `demos/reset.ps1` et `demos/prepare-admin.ps1` gèrent le cycle de vie.

## Risks / Trade-offs

- [Le réseau de la salle est absent ou filtré] → caches préchargés et repli enregistré (spec `demo-scenarios`).
- [DevRecipe évolue entre la rédaction et le talk] → figer une version (tag ou commit) citée dans `demos/devrecipe-dryrun/README.md`.
- [La démo `path-shadowing` demande un droit admin pour préparer HKLM] → préparation unique avant la session, jamais sur scène.
- [Trop de contenu pour 15 min] → les budgets par acte sont mesurés en répétition. Si un acte déborde, couper d'abord `mise-tasks`, puis la slide comparatif.
- [Effet « pitch produit » sur DevRecipe] → présenter DevRecipe comme REX open source et montrer d'abord les commandes Scoop/Mise natives.

## Hypothèses à confirmer par spike

- **H1** : Windows Sandbox est disponible sur le poste de présentation et Scoop s'y installe sans UAC. → Spike S1.
- **H2** : les caches Scoop (`~/scoop/cache`) et Mise permettent une installation hors ligne des outils choisis. → Spike S2.
- **H3** : un `C:\Python3xx` ajouté au PATH machine masque bien le shim Mise de Python dans un nouveau terminal, et le correctif DevRecipe inverse l'ordre. → Spike S3.
- **H4** : `mise` sous Windows bascule bien la version de Node au `cd` dans PowerShell 7 avec `mise activate pwsh`. → Spike S2.

## Migration Plan

Pas de migration de données. Le retrait des exigences LikeC4 est déjà appliqué dans le code. L'archivage du change mettra à jour les specs principales.

## Open Questions

- Nom du dépôt GitHub du talk (pour `event.config.json` et le QR).
- Événement cible et date (le CFP vise un quickie ; échéance du premier jet : 12/10/2026).
- Quels outils montrer avec Scoop : un outil visuel (ex. `bat`, `lazygit`) ou un outil métier ?
- Points PATH du REX à ajouter au-delà de DevRecipe (alias d'exécution App Store, longueur max du PATH, `WM_SETTINGCHANGE`).
