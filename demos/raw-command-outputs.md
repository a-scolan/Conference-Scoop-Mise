# Traces de commandes des démos

Ce fichier ne contient que des sorties réellement capturées, sauf les blocs explicitement marqués « simulation ».

Capture : 15 octobre 2026, poste de l'auteur (Windows, Scoop v0.6.0, Mise 2026.10.3, DevRecipe `790b737` cloné depuis `a-scolan/DevRecipe`).
PowerShell 7 (`pwsh`) n'est pas installé sur ce poste : les traces PowerShell sont produites avec Windows PowerShell 5.1 (`powershell.exe`). Les démos prévues en PowerShell 7 doivent être rejouées une fois sur le poste de démo.

Les installations de capture (Scoop, Mise) sont faites dans des répertoires temporaires isolés (`SCOOP`, `MISE_DATA_DIR`, `MISE_CONFIG_DIR`). Scoop ajoute toutefois son dossier `shims` au PATH utilisateur persistant : l'entrée temporaire a été retirée après capture, et le PATH utilisateur a été vérifié (un seul élément retiré).

---

## 1. Poste de capture (lecture seule)

```text
PS> where.exe python
C:\Users\ascolan\AppData\Local\mise\shims\python.exe
C:\Users\ascolan\AppData\Local\Programs\Python\Python315\python.exe
C:\Users\ascolan\AppData\Local\Microsoft\WindowsApps\python.exe

PS> where.exe node
C:\Users\ascolan\AppData\Local\mise\shims\node.exe
C:\Users\ascolan\NodeJS\Node25\node.exe

PS> where.exe lazygit
Information : impossible de trouver des fichiers pour le(s) modèle(s) spécifié(s).
   (lazygit n'est pas installé sur ce poste)

PS> where.exe gcc
C:\Users\ascolan\scoop\apps\gcc\current\bin\gcc.exe

PS> gcc --version
gcc.exe (GCC) 15.2.0

PS> make --version
GNU Make 4.4.1

PS> scoop info lazygit
Name        : lazygit
Version     : 0.66.0
Source      : extras
Binaries    : lazygit.exe

PS> mise --version
2026.10.3 windows-x64 (2026-10-05)
```

Constats :
- `where.exe python` liste le shim Mise en premier, puis Python 3.15. Aucun Python système ne masque ici : la démo `path-shadowing` ne se reproduit pas sur ce poste sans préparation admin.
- `where.exe node` liste le shim Mise, mais `node --version` affiche v25.5.0 (installation NodeJS25), alors que `mise current node` répond « Plugin node does not have a version set ». Le shim ne reflète pas la version affichée par `mise ls` : c'est une friction réelle, à ne pas montrer en démo sans la préparer.

## 2. Scoop : installation de git (poste de capture, 16 octobre 2026)

Commandes lancées dans un PowerShell standard, sans élévation. Aucune version Scoop de git n'était installée au départ.

```text
PS> scoop install git
Installing 'git' (2.56.0.2) [64bit] from 'main' bucket
Checking hash of PortableGit-2.56.0.2-64-bit.7z.exe... OK.
Extracting PortableGit-2.56.0.2-64-bit.7z.exe... Done.
Linking ~\scoop\apps\git\current => ~\scoop\apps\git\2.56.0.2
Creating shim for 'sh'.
Creating shim for 'git'.
Creating shim for 'gitk'.
Setting user environment variable: GIT_INSTALL_ROOT = C:\Users\ascolan\scoop\apps\git\current
'git' (2.56.0.2) was installed successfully!
Durée : 45 s

PS> where.exe git
C:\Program Files\Git\cmd\git.exe
C:\Users\ascolan\scoop\shims\git.exe
C:\Users\ascolan\AppData\Local\Programs\Git\cmd\git.exe

PS> git --version
git version 2.53.0.windows.2

PS> scoop uninstall git
Removing shim 'git.exe'.
Removing user environment variable: GIT_INSTALL_ROOT
'git' was uninstalled.
```

Constats :
- Le Git natif (Program Files) passe avant le shim Scoop : `git --version` répond 2.53, pas 2.56.
- `scoop uninstall` retire la variable `GIT_INSTALL_ROOT` et les shims. Il laisse `~/scoop/persist/git` (supprimé à la main après la session).
- Les trois dernières lignes du log d'installation (`git config --system credential.helper manager`) sont des consignes affichées, non exécutées.

## Trace isolée antérieure (lazygit)

Une première capture (16 octobre, `SCOOP` temporaire) a validé le mécanisme `scoop bucket add extras` puis `scoop install lazygit` (version 0.66.1, `extras`). Elle n'est plus utilisée par les démos.

---

## 3. Mise : bascule Java 17 → 21 (dossiers de démo copiés, runtimes isolés)

Installation (répertoire `MISE_DATA_DIR` temporaire) :

```text
PS> mise install            # dans projet-legacy
mise ✓ java@17.0.2  12.0s  openjdk-17.0.2_windows-x64_bin.zip

PS> mise install            # dans projet-moderne
mise ✓ java@21.0.2  13.9s  openjdk-21.0.2_windows-x64_bin.zip
```

Bascule avec le hook (`mise hook-env -s pwsh` appelé après chaque `cd`, comme le fait le prompt activé ; exécuté dans `powershell.exe -NoProfile`) :

```text
PS> cd projet-legacy
PS> java -version
openjdk version "17.0.2" 2022-01-18
OpenJDK Runtime Environment (build 17.0.2+8-86)
OpenJDK 64-Bit Server VM (build 17.0.2+8-86, mixed mode, sharing)
PS> echo $env:JAVA_HOME
<tmp>\data\installs\java\17.0.2

PS> cd ..\projet-moderne
PS> java -version
openjdk version "21.0.2" 2024-01-16
OpenJDK Runtime Environment (build 21.0.2+13-58)
OpenJDK 64-Bit Server VM (build 21.0.2+13-58, mixed mode, sharing)
PS> echo $env:JAVA_HOME
<tmp>\data\installs\java\21.0.2

PS> mise run dev
[dev] $ java -version
openjdk version "21.0.2" 2024-01-16
OpenJDK Runtime Environment (build 21.0.2+13-58)
OpenJDK 64-Bit Server VM (build 21.0.2+13-58, mixed mode, sharing)
exit code : 0

PS> mise tasks
dev  Démarre le serveur de développement

PS> mise env | Select-String API_URL
${Env:API_URL}='http://localhost:8080'
```

Constats :
- `JAVA_HOME` suit le runtime du projet : aucune variable à régler à la main.
- Une première exécution de `mise run dev` a aussi installé Rust, Python 3.15 et Claude Code : elle lisait encore la config globale de l'utilisateur. La trace ci-dessus est la seconde exécution, avec `mise config ls` ne listant que le `mise.toml` du projet.
- Versions réelles : 17.0.2 et 21.0.2 (et non 17.0.12 / 21.0.4 comme les slides précédentes).

## 4. DevRecipe : préflight et installation forcée (clone de démo, 16 octobre 2026)

Clone de `a-scolan/DevRecipe` (commit `790b737`), manifeste `DevRecipe_windows.toml` **remplacé** par un manifeste réduit à `git` (profil `default`). Le manifeste du dépôt n'a pas été lancé en `-Force`.

```text
PS> .\DevRecipe_windows.ps1 -Validate
Valid manifest: DevRecipe_windows.toml (DevRecipe v2 contract).
(code 0)

PS> .\DevRecipe_windows.ps1 -DryRun
[1/1 (100%)] git
--- PREFLIGHT CHECK: git ---
Traces found for 'git':
  evidence | query=git | source=os-installation-record:registry | scope=user | location=HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall\Git_is1 | matched=Git
  evidence | query=git | source=os-installation-record:registry | scope=machine | location=HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Uninstall\Git_is1 | matched=Git
  evidence | query=git | source=os-location-metadata | scope=user | location=<AppData>\Claude\git-worktrees.json | matched=git-worktrees.json
--- PREFLIGHT COVERAGE NOTE (read-only) ---
  coverage | incomplete-checks=3
Preflight needs human decisions; no mutation was attempted.
(code 3, 108 s)

PS> .\DevRecipe_windows.ps1 -DryRun -Force
  decision=force (pre-approved via -Force) | application=git
--- DRY-RUN PLAN (no changes) ---
Scoop: if absent, run the remote bootstrap Invoke-RestMethod https://get.scoop.sh | Invoke-Expression.
Scoop: add the extras bucket if absent.
Scoop: add the versions bucket if absent.
Scoop: scoop install git
(code 0, 140 s)

PS> .\DevRecipe_windows.ps1 -Force
Installing 'git' (2.56.0.2) [64bit] from 'main' bucket
'git' (2.56.0.2) was installed successfully!
--- SUBMITTED ENTRIES ---
Profile Provider Identifier Version
default Scoop    git        latest
INSTALLATION SUMMARY
Installed:
  - git (latest)
Full execution log: logs/devrecipe-windows-20261016-105033.log
(code 0, 244 s)
```

Constats :
- Le préflight trouve Git dans le registre, machine et utilisateur : c'est le code 3.
- `-DryRun -Force` montre le plan avant écriture : Scoop présent, buckets présents, puis `scoop install git`.
- Le journal complet d'exécution est écrit dans `logs/` du clone de démo.

Trace antérieure (manifeste complet du dépôt, 44 paquets, `-DryRun` seul) : code 3, 64 s, même conflit Git. Elle n'est plus projetée.

---

## 4b. DevRecipe : installation interactive dans un pseudo-terminal (16 octobre 2026)

Lancée avec `.\DevRecipe_windows.ps1` (sans option) dans un pseudo-terminal ConPTY, manifeste réduit à `git`. Les touches envoyées : `Espace` (cocher git), `Tab`, `Entrée`. Le texte ci-dessous est extrait de la sortie brute : codes de progression et d'animation retirés, lignes dédupliquées, aucune ligne ajoutée.

```text
--- PREFLIGHT CHECK: git ---
Traces found for 'git':
  evidence | query=git | source=os-installation-record:registry | scope=user | location=HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall\Git_is1 | matched=Git | reason=case-insensitive exact match | similarity=100/100 | threshold=90/100
  evidence | query=git | source=os-installation-record:registry | scope=machine | location=HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Uninstall\Git_is1 | matched=Git | reason=case-insensitive exact match | similarity=100/100 | threshold=90/100
  evidence | query=git | source=os-location-metadata | scope=user | location=<AppData>\Claude\git-worktrees.json | matched=git-worktrees.json | reason=generated separator-flexible prefix match | similarity=100/100 | threshold=90/100
--- PREFLIGHT COVERAGE NOTE (read-only) ---
  coverage | incomplete-checks=3
--- PREFLIGHT CONFLICT SELECTION ---
Detected existing system installations. Check tools to force Mise/Scoop installation and supersede existing installs (unchecked are declined):
Up/Down: move/scroll | Space: toggle | A: all | Left/Right or Tab: buttons | Enter: confirm | Escape: cancel
> [ ] packages | os | git | latest  [ Force selected (0) ]  [ Cancel ]
> [x] packages | os | git | latest  [ Force selected (1) ]  [ Cancel ]
  decision=force | application=git
--- FINAL INSTALLATION PLAN AFTER PREFLIGHT ---
Installing 'git' (2.56.0.2) [64bit] from 'main' bucket
Linking ~\scoop\apps\git\current => ~\scoop\apps\git\2.56.0.2
'git' (2.56.0.2) was installed successfully!
INSTALLATION SUMMARY
Installed:
  - git (latest)
Full execution log: logs/devrecipe-windows-20261016-114909.log
```

Constats :
- La sélection est une liste à cocher dans la console, et non une question texte : c'est elle qui est projetée.
- `git-worktrees.json` est un faux positif du préflight (similarité de nom).
- Une première tentative a répondu à la mauvaise question (texte `y`) et s'est arrêtée à la liste sans rien installer ; elle a été interrompue.
- Après la capture : `scoop uninstall git`, `GIT_INSTALL_ROOT` retiré, `persist\git` supprimé.
---

## 4c. DevRecipe : lancement complet fourni par l'auteur (16 octobre 2026, 11 h 55)

Journal copié tel que fourni (aucune ligne modifiée). Le manifeste utilisé : `grep` (Scoop) et `java = "11"` (Mise), profil `default`. Sur la slide, les chemins `C:\Users\ascolan\...` sont abrégés en `~\...` et les passages longs sont coupés par `...`.

```text
.\DevRecipe_windows.ps1

--- PREFLIGHT CONFLICT EVIDENCE (read-only) ---                                                                                    
Scanning requested tools and checking your system for existing traces to prevent installation conflicts.                           
threshold=90/100; potential collisions resolved from name similarity
[1/2 (50%)] grep                                                                                                                   
[2/2 (100%)] java                                                                                                                  
                                                                                                                                   
--- PREFLIGHT CHECK: java ---
  provider-conflict | provider=Mise | application=java | declared-version=11 | installed-version=21.0.2,26.0.2 | reason=provider-version-mismatch
Traces found for 'java':
  evidence | query=java | source=os-location-metadata | scope=user | location=<AppData>\Microsoft\Windows\Recent\java-coffee-cup-logo.jpg.lnk | matched=java-coffee-cup-logo.jpg.lnk | reason=generated separator-flexible prefix match | similarity=100/100 | threshold=90/100
  evidence | query=java | source=os-location-metadata | scope=user | location=<LocalAppData>\DBeaver\jre\bin\java.dll | matched=java.dll | reason=generated separator-flexible prefix match | similarity=100/100 | threshold=90/100
  evidence | query=java | source=os-location-metadata | scope=user | location=<LocalAppData>\DBeaver\jre\bin\java.exe | matched=java.exe | reason=generated separator-flexible prefix match | similarity=100/100 | threshold=90/100

--- PREFLIGHT COVERAGE NOTE (read-only) ---
  coverage | source=os-location-metadata | scopes=machine | incomplete-checks=3 | note=some approved filesystem metadata checks were incomplete; no action is required unless matching evidence is shown

--- PREFLIGHT CONFLICT SELECTION ---
Detected existing system installations. Check tools to force Mise/Scoop installation and supersede existing installs (unchecked are declined):
Up/Down: move/scroll | Space: toggle | A: all | Left/Right or Tab: buttons | Enter: confirm | Escape: cancel
                                                                                                                                  
  [x] runtimes | mise | java | 11                                                                                                 
                                                                                                                                  
> [ Force selected (1) ]  [ Cancel ]                                                                                              

  decision=force | application=java                                                                                                
                                                                                                                                   
--- FINAL INSTALLATION PLAN AFTER PREFLIGHT ---
Scoop: if absent, run the remote bootstrap Invoke-RestMethod https://get.scoop.sh | Invoke-Expression.
Scoop: add the extras bucket if absent.
Scoop: add the versions bucket if absent.
Scoop: scoop install grep
Mise: if absent after the Scoop bootstrap, install the provider with scoop install mise.
Mise: mise install java@11
Mise: mise reshim.
Mise: add %LOCALAPPDATA%\mise\shims to the user PATH for cmd.exe and new processes.
Command Processor: configure AutoRun in HKCU to prepend Mise and Scoop shims for cmd.exe and sub-processes.
Shell startup files: add Mise shims activation commands for available compatible shells: PowerShell, Nushell, Bash, Zsh, Fish, Elvish, and Xonsh.
Open a new terminal after installation; already-running processes keep their existing PATH.
Selected profiles: default
[1/2 (50%)] grep
Installing 'grep' (3.11) [64bit] from 'main' bucket
Loading grep-3.11-x64.exe from cache
Checking hash of grep-3.11-x64.exe... OK.
Linking ~\scoop\apps\grep\current => ~\scoop\apps\grep\3.11
'grep' (3.11) was installed successfully!
[2/2 (100%)] java
mise by @jdx – installing 1 tool
mise █░░░░░░░░░░░░░░░ 0/1 · 3.0s
  java@11.0.2  downloading  3.0s  20.6/187.4 MB · 19.6 MB/s
mise █████░░░░░░░░░░░ 0/1 · 6.0s
  java@11.0.2  downloading  6.0s  87.8/187.4 MB · 21.6 MB/s
mise █████████░░░░░░░ 0/1 · 9.0s
  java@11.0.2  downloading  9.0s  162.5/187.4 MB · 23.0 MB/s
mise ███████████░░░░░ 0/1 · 12.0s
  java@11.0.2  extracting  12.0s
mise ███████████░░░░░ 0/1 · 15.0s
  java@11.0.2  extracting  15.0s
mise ███████████░░░░░ 0/1 · 18.0s
  java@11.0.2  extracting  18.0s
mise █████████████░░░ 0/1 · 21.1s
  java@11.0.2  java -version  21.0s
mise java@11.0.2 openjdk version "11.0.2" 2019-01-15
mise java@11.0.2 OpenJDK Runtime Environment 18.9 (build 11.0.2+9)
mise java@11.0.2 OpenJDK 64-Bit Server VM 18.9 (build 11.0.2+9, mixed mode)
mise ✓ java@11.0.2  22.2s  openjdk-11.0.2_windows-x64_bin.zip
mise ████████████████ 1/1 · installed 1 tool in 22.2s
Global activation skipped for 'java': existing installation or configuration detected.
Mise shims path is already first in the user PATH: C:\Users\ascolan\AppData\Local\mise\shims.
Mise shims activation is already present in C:\Users\ascolan\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1.
Mise shims activation is already present in C:\Users\ascolan\AppData\Roaming\nushell\env.nu.
Mise shims activation is already present in C:\Users\ascolan\AppData\Roaming\nushell\config.nu.
Mise shims activation configured for available compatible shells. Open new shell sessions to use Mise-managed commands.
cmd.exe AutoRun already contains DevRecipe shim precedence.

--- SUBMITTED ENTRIES ---

--- DECLARED ENTRIES ---

Profile Provider Identifier Version
------- -------- ---------- -------
default Scoop    grep       latest 
default Mise     java       11     


This list comes only from the manifest; no provider was queried.

============================================================
INSTALLATION SUMMARY
============================================================
Installed:
  - grep (latest)
  - java (11)

Updated:
  (none)

Current / Unchanged:
  (none)

Full execution log: logs/devrecipe-windows-20261016-115523.log
```

---

## 5. Démo PATH (simulation, non capturée)

Ces sorties sont produites par `demos/prepare-admin.ps1` sur un poste préparé en administrateur (écriture dans HKLM). Elles ne sont pas capturées sur le poste de l'auteur, qui n'a pas de Python système devant le shim Mise.

```text
[simulation] PS> where.exe python
C:\Python39\python.cmd                                  <-- PATH machine (HKLM), en premier
C:\Users\<user>\AppData\Local\mise\shims\python.exe      <-- PATH utilisateur (HKCU), masqué

[simulation] PS> $env:PATH = "$env:LOCALAPPDATA\mise\shims;$HOME\scoop\shims;$env:PATH"
(pas de sortie)

[simulation] PS> where.exe python
C:\Users\<user>\AppData\Local\mise\shims\python.exe      <-- en premier
C:\Python39\python.cmd
```

Le faux runtime est un `python.cmd` qui affiche « Python 3.9.7 (Legacy Enterprise System Image HKLM) ». Ce n'est pas un vrai Python 3.9.

## 6. Non capturé

- Démo PATH réelle (droits admin requis) : à rejouer sur le poste de démo après `prepare-admin.ps1`.
- Démos PowerShell 7 (`pwsh`) : non installé sur le poste de capture. Les traces ci-dessus sont en Windows PowerShell 5.1.
- Démo complète sur un poste vierge (Scoop absent, Git absent) : à rejouer dans Windows Sandbox (`demos/sandbox.wsb`) avant la session.
- Commande unique d'installation de Scoop puis Mise (slide 14) : vérifiée contre la documentation officielle (Scoop : `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`, `irm get.scoop.sh | iex` ; Mise : `scoop install mise`, bucket `main`). Non exécutée sur un poste vierge.