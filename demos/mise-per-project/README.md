# Démo 2 : Runtimes Java par projet avec Mise

- **Acte associé :** Acte 2 (Mise, Runtimes par projet)
- **Slide :** Slide 07 (Démo Mise)
- **Durée cible :** 60 secondes
- **Prérequis :**
  - Mise installé (`scoop install mise`).
  - Hook Mise actif dans le profil PowerShell : `mise activate pwsh | Out-String | Invoke-Expression`, puis nouveau terminal.
  - `mise install` lancé une fois dans chaque projet : Java 17 pour `projet-legacy`, Java 21 pour `projet-moderne`.

## Preuve visée

Un `cd` d'un projet à l'autre fait passer `java -version` de 17 à 21, et `JAVA_HOME` suit, sans aucune commande manuelle. La version est déclarée dans le `mise.toml` versionné du projet.

## Commandes à exécuter

```powershell
cd demos\mise-per-project\projet-legacy
java -version
echo $env:JAVA_HOME

cd ..\projet-moderne
java -version
echo $env:JAVA_HOME
```

## Sortie capturée

Trace du 15 octobre 2026, poste de capture, Java installé dans un répertoire Mise isolé (voir [raw-command-outputs.md](./raw-command-outputs.md), section 3).

```text
PS> cd projet-legacy
PS> java -version
openjdk version "17.0.2" 2022-01-18
OpenJDK Runtime Environment (build 17.0.2+8-86)
PS> echo $env:JAVA_HOME
<...>\installs\java\17.0.2

PS> cd ..\projet-moderne
PS> java -version
openjdk version "21.0.2" 2024-01-16
OpenJDK Runtime Environment (build 21.0.2+13-58)
PS> echo $env:JAVA_HOME
<...>\installs\java\21.0.2
```

Sur le poste de démo, les numéros de patch peuvent différer : la preuve porte sur la majeure (17, 21) et sur le changement de `JAVA_HOME`.

## Structure des projets

`projet-legacy/mise.toml` :

```toml
[tools]
java = "17"
```

`projet-moderne/mise.toml` :

```toml
[tools]
java = "21"

[env]
API_URL = "http://localhost:8080"

[tasks.dev]
description = "Démarre le serveur de développement"
run = "java -version"
```

## Plan B

Si le hook ne se déclenche pas après `cd`, le repli est la trace ci-dessus, affichée depuis la slide 07 (sortie enregistrée). Les JDK 17 et 21 doivent être installés avant la session : aucun téléchargement pendant la démo.