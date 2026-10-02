# Démo 4 : Le piège du PATH et inversion de précédence

- **Acte associé :** Acte 3 (PATH Windows)
- **Slide :** Slide 09 (Démo PATH)
- **Durée cible :** 60 secondes
- **Prérequis :** Script `demos/prepare-admin.ps1` exécuté une fois au préalable (ou simulation locale).

## Preuve visée
Montrer le comportement interne de Windows où le PATH Machine (HKLM) prend le pas sur le PATH Utilisateur (HKCU), provoquant un masquage silencieux du runtime utilisateur. Montrer ensuite comment rétablir la priorité aux shims utilisateur dans la session courante sans droits administrateur.

## Commandes à exécuter

```powershell
# 1. Constat du masquage : l'exécutable système HKLM s'affiche en premier
where.exe python

# 2. Application de la parade DevRecipe (shims en tête de PATH)
$env:PATH = "$env:LOCALAPPDATA\mise\shims;$HOME\scoop\shims;$env:PATH"

# 3. Validation de l'inversion de précédence
where.exe python
python --version
```

## Sortie attendue

```text
# Avant :
C:\Python39\python.exe
C:\Users\<user>\AppData\Local\mise\shims\python.exe

# Après :
C:\Users\<user>\AppData\Local\mise\shims\python.exe
C:\Python39\python.exe
Python 3.12.2
```
