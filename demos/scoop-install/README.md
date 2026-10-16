# Démo 1 : Installer git avec Scoop, puis voir qui répond

- **Acte associé :** Acte 1 (Scoop, espace utilisateur)
- **Slide :** Slide 05 (Démo Scoop)
- **Durée cible :** 60 secondes (l'installation a pris 45 s sur le poste de capture, réseau compris)
- **Prérequis :**
  - Scoop installé dans le profil utilisateur (sans droits administrateur).
  - Git **natif** déjà installé sur le poste (c'est le cas sur le poste de capture) : la démo montre qu'il masque le shim Scoop.
  - Aucune version Scoop de git installée au départ : `scoop list git` doit être vide.

## Preuve visée

Un outil s'installe sans élévation et se lance via son shim. Scoop ne vérifie pas ce qui est déjà présent sur la machine : `where.exe` et `git --version` le montrent. Le préflight de DevRecipe (slides suivantes) sert à cela.

## Commandes à exécuter (slide 05 : seule la première est projetée)

```powershell
scoop install git
where.exe git
git --version
scoop uninstall git
```

## Sortie capturée

Trace du 16 octobre 2026, poste de capture (voir [raw-command-outputs.md](./raw-command-outputs.md), section 2). Les chemins sont ceux du poste de l'auteur, abrégés avec `~`.

```text
PS> scoop install git
Installing 'git' (2.56.0.2) [64bit] from 'main' bucket
Checking hash of PortableGit-2.56.0.2-64-bit.7z.exe... OK.
Extracting PortableGit-2.56.0.2-64-bit.7z.exe... Done.
Linking ~\scoop\apps\git\current => ~\scoop\apps\git\2.56.0.2
Creating shim for 'git'.
'git' (2.56.0.2) was installed successfully!

PS> where.exe git
C:\Program Files\Git\cmd\git.exe          <-- Git natif, en premier
~\scoop\shims\git.exe                     <-- shim Scoop, masqué
~\AppData\Local\Programs\Git\cmd\git.exe

PS> git --version
git version 2.53.0.windows.2              <-- le natif répond, pas la 2.56 Scoop

PS> scoop uninstall git
'git' was uninstalled.
```

## Pourquoi `main` ici, et `extras` ailleurs

`git` est dans le bucket `main`. Pour `lazygit` (non utilisé dans cette démo), il faut `scoop bucket add extras` avant `scoop install`. Un bucket est un dépôt Git de manifestes JSON.

## Effets de bord à connaître

- Au premier `scoop install`, Scoop ajoute son dossier `shims` au PATH utilisateur. Il crée aussi la variable `GIT_INSTALL_ROOT` (HKCU), que `scoop uninstall` retire.
- `scoop uninstall git` conserve `~/scoop/persist/git` (configuration sauvegardée) : le supprimer à la main après la session si nécessaire.

## Plan B

- Précharger la veille : `scoop install git` une fois, pour remplir le cache, puis désinstaller.
- Si le réseau de la salle tombe : repli de la slide 05 (sortie enregistrée ci-dessus).