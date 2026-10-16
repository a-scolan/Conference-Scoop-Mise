## MODIFIED Requirements

### Requirement: Catalogue des démos et preuve attendue
Le projet SHALL documenter chaque démo dans `demos/<id>/README.md`, avec : la preuve visée, les commandes exactes, la sortie attendue issue d'une trace capturée (date, poste, code de sortie), la durée cible et l'acte associé. Le catalogue MUST contenir au minimum ces démos :

| Id | Acte | Preuve visée | Durée cible |
| --- | --- | --- | --- |
| `scoop-install` | 1 | `scoop install git` sans élévation ; `where.exe git` montre le Git natif devant le shim Scoop ; `git --version` le confirme ; `scoop uninstall git` | 60 s |
| `mise-per-project` | 2 | `cd` entre deux projets : `java -version` passe de 17 à 21 selon `mise.toml` | 60 s |
| `mise-tasks` | 2 | `mise run dev` lance une tâche avec les variables de `[env]` | 30 s |
| `path-shadowing` | 3 | `where.exe python` montre l'entrée HKLM devant le shim user ; le correctif inverse l'ordre | 60 s |
| `devrecipe-dryrun` | 4 | Lancement sans option : le préflight signale un écart de version (Mise déclare Java 11, le poste a 21 et 26), une liste à cocher demande la décision, rien n'est forcé par défaut | 60 s |

#### Scenario: Démo documentée
- **WHEN** un relecteur ouvre `demos/<id>/README.md`
- **THEN** il peut rejouer la démo sans aide de l'orateur et obtenir la sortie attendue

#### Scenario: Démo jouée en Java
- **WHEN** la démo `mise-per-project` est jouée
- **THEN** `projet-legacy/mise.toml` déclare `java = "17"`, `projet-moderne/mise.toml` déclare `java = "21"`, et aucune démo ne dépend de Node pour illustrer la bascule

#### Scenario: Journal réel défilant
- **WHEN** la démo `devrecipe-dryrun` est projetée
- **THEN** le terminal défile un journal réel de DevRecipe, passages coupés par « ... », avec la liste à cocher et la décision ; le journal complet est dans `raw-command-outputs.md`, section 4c

## ADDED Requirements

### Requirement: Sorties de démo tracées et étiquetées
Toute sortie de commande projetée dans une slide ou un repli SHALL être soit une trace réelle capturée (commande, date, poste et code de sortie consignés dans `demos/raw-command-outputs.md`), soit explicitement étiquetée comme simulation avec la commande qui la prépare. Aucune sortie MUST être présentée comme réelle si elle n'a pas été capturée.

#### Scenario: Trace impossible à capturer
- **WHEN** une démo exige des droits administrateur non disponibles sur le poste de capture (par exemple `path-shadowing`)
- **THEN** la sortie est étiquetée « simulation préparée par `prepare-admin.ps1` » dans la slide, le README de démo et `raw-command-outputs.md`

#### Scenario: Installation de démo sur le poste de l'auteur
- **WHEN** une démo installe un paquet pour capturer sa sortie sur le poste de l'auteur
- **THEN** le paquet est désinstallé à la fin de la capture, et la variable d'environnement ou l'entrée PATH ajoutée est retirée si elle persiste

### Requirement: DevRecipe présenté avec ses noms réels
Les slides, le déroulé et les READMEs SHALL utiliser les noms et options du dépôt `a-scolan/DevRecipe` : `DevRecipe_windows.ps1`, `DevRecipe_windows.toml`, `-Validate`, `-DryRun`, `-Force`, `-Review`. Un manifeste d'exemple MUST NOT être présenté comme un manifeste DevRecipe s'il ne suit pas le schéma du dépôt.

#### Scenario: Démo DevRecipe
- **WHEN** la slide « Démo DevRecipe » est affichée
- **THEN** la sortie projetée provient des commandes du dépôt, avec le préflight qui signale l'écart de version Java (manifeste 11, poste 21 et 26), la liste à cocher et la décision explicite