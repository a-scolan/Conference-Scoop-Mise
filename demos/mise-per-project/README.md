# Démo 2 : Gestion de versions par projet avec Mise

- **Acte associé :** Acte 2 (Mise, Runtimes par projet)
- **Slide :** Slide 07 (Démo Mise)
- **Durée cible :** 60 secondes
- **Prérequis :** Mise installé via Scoop (`scoop install mise`) et hook actif dans PowerShell (`mise activate --shims`).

## Preuve visée
Démontrer que le changement de répertoire (`cd`) ajuste la version active de Node.js en moins de 10 millisecondes sans aucune commande manuelle, grâce au fichier `mise.toml` versionné.

## Commandes à exécuter

```powershell
# 1. Projet Legacy : utilise Node 18
cd demos\mise-per-project\projet-legacy
node --version

# 2. Projet Moderne : utilise Node 22
cd ..\projet-moderne
node --version
```

## Sortie attendue

```text
v18.20.4
v22.14.0
```

## Structure des projets

- `projet-legacy/mise.toml` :
  ```toml
  [tools]
  node = "18"
  ```
- `projet-moderne/mise.toml` :
  ```toml
  [tools]
  node = "22"
  ```

## Plan B (Repli hors ligne)
Runtimes Node 18 et 22 pré-installés dans `~/.local/share/mise/installs/node`. Aucun accès réseau requis pendant la démo.
