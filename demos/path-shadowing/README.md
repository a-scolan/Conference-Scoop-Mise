# Démo 4 : Le piège du PATH et l'inversion de priorité

- **Acte associé :** Acte 3 (PATH Windows)
- **Slide :** Slide 09 (Démo PATH)
- **Durée cible :** 60 secondes
- **Prérequis :** `demos/prepare-admin.ps1` exécuté **une fois**, dans un PowerShell administrateur, sur le poste de démo. Il crée `C:\Python39\python.cmd` (faux runtime legacy, pas un vrai Python 3.9) et ajoute `C:\Python39` au PATH machine (HKLM).

## Statut de la sortie : simulation

Cette démo **n'est pas capturée**. Modifier HKLM exige des droits administrateur, et le poste de capture n'a pas de Python système devant le shim Mise (voir [raw-command-outputs.md](../raw-command-outputs.md), sections 1 et 5). Les sorties ci-dessous sont celles que produit `prepare-admin.ps1`. Elles doivent être étiquetées « simulation » dans la slide.

## Preuve visée

`where.exe python` montre l'entrée HKLM devant le shim utilisateur. Le préfixe de session remet le shim en tête, sans toucher à HKLM.

## Commandes à exécuter

```powershell
# 1. Constat : l'entrée machine passe en premier
where.exe python

# 2. Parade : shims utilisateur en tête du PATH de la session
$env:PATH = "$env:LOCALAPPDATA\mise\shims;$HOME\scoop\shims;$env:PATH"

# 3. Vérification de l'ordre
where.exe python
```

## Sortie (simulation)

```text
PS> where.exe python
C:\Python39\python.cmd                                   <-- PATH machine (HKLM), en premier
C:\Users\<user>\AppData\Local\mise\shims\python.exe      <-- PATH utilisateur (HKCU), masqué

PS> $env:PATH = "..."
(pas de sortie)

PS> where.exe python
C:\Users\<user>\AppData\Local\mise\shims\python.exe      <-- en premier
C:\Python39\python.cmd
```

L'étape 3 ne lance pas `python --version` : le shim Mise affiche la version configurée dans le projet, et la démo ne doit pas annoncer de version qui n'a pas été vérifiée.

## Limite à annoncer

Le préfixe vaut pour la session (et le profil PowerShell) où il est appliqué. Les applications lancées depuis l'Explorateur ou un IDE déjà ouvert ne le voient pas.

## Plan B

Repli de la slide 09 (sortie de simulation ci-dessus).