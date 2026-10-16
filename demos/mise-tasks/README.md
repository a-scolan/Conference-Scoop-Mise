# Démo 3 : Variables et tâches d'équipe avec Mise

- **Acte associé :** Acte 2 (Mise)
- **Slide :** Slide 07 (Démo Mise, étape 3)
- **Durée cible :** 30 secondes
- **Prérequis :** être positionné dans `demos/mise-per-project/projet-moderne`, Java 21 installé par `mise install`.

## Preuve visée

`mise run <tâche>` lance une tâche avec les variables de `[env]` et le runtime du projet, sans Makefile, sans fichier `.env` non versionné et sans script bash.

## Commandes à exécuter

```powershell
cd demos\mise-per-project\projet-moderne

# 1. Tâches déclarées pour le projet
mise tasks

# 2. Variables exportées par Mise pour ce dossier
mise env | Select-String API_URL

# 3. Exécution de la tâche dev
mise run dev
```

## Sortie capturée

```text
PS> mise tasks
dev  Démarre le serveur de développement

PS> mise env | Select-String API_URL
${Env:API_URL}='http://localhost:8080'

PS> mise run dev
[dev] $ java -version
openjdk version "21.0.2" 2024-01-16
OpenJDK Runtime Environment (build 21.0.2+13-58)
OpenJDK 64-Bit Server VM (build 21.0.2+13-58, mixed mode, sharing)
exit code : 0
```

La tâche exécute `java -version` pour la démo. Dans le discours, cette commande représente le démarrage réel de l'application (par exemple `./mvnw spring-boot:run`) : ne pas la présenter comme le lancement d'un serveur.

## Plan B

La trace ci-dessus, enregistrée dans [raw-command-outputs.md](./raw-command-outputs.md), section 3.