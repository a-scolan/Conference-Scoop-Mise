## Purpose

Décrire les démos du quickie : ce que chacune prouve, son environnement, ses préconditions et son plan B. Le but est d'avoir des démos courtes, reproductibles et sans surprise sur scène, même sans réseau.

## ADDED Requirements

### Requirement: Catalogue des démos et preuve attendue
Le projet SHALL documenter chaque démo dans `demos/<id>/README.md`, avec : la preuve visée, les commandes exactes, la sortie attendue, la durée cible et l'acte associé. Le catalogue MUST contenir au minimum ces démos :

| Id | Acte | Preuve visée | Durée cible |
| --- | --- | --- | --- |
| `scoop-install` | 1 | `scoop install` d'un outil sans invite UAC ; l'outil se lance via son shim | 45 s |
| `mise-per-project` | 2 | `cd` entre deux projets : `node --version` change selon `mise.toml` | 60 s |
| `mise-tasks` | 2 | `mise run` lance une tâche avec les variables de `[env]` | 30 s |
| `path-shadowing` | 3 | `where.exe python` montre l'entrée HKLM devant le shim user ; le correctif inverse l'ordre | 60 s |
| `devrecipe-dryrun` | 4 | `-Validate` puis `-DryRun -Review` sur un manifeste, avec rapport de conflits | 45 s |

#### Scenario: Démo documentée
- **WHEN** un relecteur ouvre `demos/<id>/README.md`
- **THEN** il peut rejouer la démo sans aide de l'orateur et obtenir la sortie attendue

### Requirement: Environnement de démo jetable et réinitialisable
Les démos SHALL tourner dans un environnement Windows isolé du poste de travail : Windows Sandbox, VM Hyper-V ou compte utilisateur dédié. Un script `demos/reset.ps1` MUST remettre l'environnement à l'état initial en moins de 2 minutes.

#### Scenario: Réinitialisation entre deux répétitions
- **WHEN** l'orateur lance `demos/reset.ps1`
- **THEN** les outils installés pendant les démos sont retirés, les projets d'exemple sont restaurés et le PATH utilisateur revient à sa valeur de départ

#### Scenario: Conflit PATH reproductible
- **WHEN** la démo `path-shadowing` est préparée
- **THEN** l'environnement contient une installation système d'un runtime (par exemple Python dans `C:\Python3xx` ajouté au PATH machine), créée par un script de préparation lancé une seule fois en admin avant la session

### Requirement: Démos sans dépendance réseau sur scène
Chaque démo SHALL pouvoir s'exécuter sans réseau. Les paquets et runtimes MUST être préchargés (cache Scoop, cache Mise) ou la démo MUST utiliser son repli enregistré.

#### Scenario: Wi-Fi de la salle indisponible
- **WHEN** le réseau est coupé au moment de la démo
- **THEN** la démo se déroule depuis les caches locaux, ou l'orateur bascule sur le repli enregistré en une seule touche

### Requirement: Repli enregistré pour chaque démo
Chaque démo SHALL avoir un repli intégré au deck. Ce repli rejoue les commandes et leurs sorties réelles, capturées pendant une répétition. Le format du repli est défini par la capacité `terminal-display` (change `terminal-demo-rendering`).

#### Scenario: Démo live qui échoue
- **WHEN** une commande live échoue ou dépasse 2 fois sa durée cible
- **THEN** l'orateur affiche le repli de la même démo sans quitter le navigateur et poursuit le discours sans perte de contenu

### Requirement: Commandes de démo dans les notes présentateur
Les commandes de chaque démo SHALL apparaître dans la vue présentateur pour la slide concernée, dans l'ordre d'exécution.

#### Scenario: Trou de mémoire
- **WHEN** l'orateur arrive sur une slide de démo
- **THEN** la vue présentateur affiche la liste des commandes à taper et la sortie clé à commenter
