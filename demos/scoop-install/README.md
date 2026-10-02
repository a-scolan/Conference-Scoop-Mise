# Démo 1 : Installation en User Space sans UAC avec Scoop

- **Acte associé :** Acte 1 (Scoop, User Space)
- **Slide :** Slide 05 (Démo Scoop)
- **Durée cible :** 45 secondes
- **Prérequis :** Scoop installé dans `~/scoop` (aucun droit admin requis).

## Preuve visée
Prouver qu'un développeur sous Windows peut installer un outil CLI complet (`lazygit` ou `ripgrep`) sans aucune invite UAC, avec vérification immédiate du hash et génération automatique d'un shim dans le PATH utilisateur.

## Commandes à exécuter

```powershell
# 1. Vérification : l'outil n'est pas encore installé
where.exe lazygit

# 2. Installation directe en espace utilisateur
scoop install lazygit

# 3. Validation de l'exécutable et du shim
where.exe lazygit
lazygit --version
```

## Sortie attendue

```text
Installing 'lazygit' (0.44.1) [64bit] from 'extras' bucket
Checking hash of lazygit_0.44.1_Windows_x86_64.zip ... ok.
Extracting lazygit_0.44.1_Windows_x86_64.zip ... done.
Linking ~\scoop\apps\lazygit\current => ~\scoop\apps\lazygit\0.44.1
Creating shim for 'lazygit' in ~\scoop\shims\lazygit.exe
'lazygit' (0.44.1) was installed successfully!

C:\Users\<user>\scoop\shims\lazygit.exe
commit=..., buildDate=..., buildSource=binaryRelease, version=0.44.1
```

## Plan B (Repli hors ligne)
Si le réseau de la salle est coupé ou ralenti :
- Scoop puise dans le cache local `~/scoop/cache` préalablement rempli.
- Si le cache est absent, basculer sur la slide 05 du deck qui projette la session capturée.
