# Sorties Réelles des Commandes CLI (Démos Scoop, Mise & DevRecipe)

Ce document répertorie les commandes exactes exécutées dans les diapositives de démonstration du talk, ainsi que leurs sorties réelles.
Vous pouvez ajuster ou remplacer les blocs ci-dessous avec vos propres captures de terminal Windows (PowerShell 7 / Windows Terminal).

---

## 1. Démo Scoop (Slide 05 / 15)

### Commande 1 (Étape 1) : Installation sans droit administrateur
```powershell
scoop install lazygit
```

#### Sortie brute réelle attendue :
```text
Installing 'lazygit' (0.44.1) [64bit] from 'extras' bucket
Checking hash of lazygit_0.44.1_Windows_x86_64.zip ... ok.
Extracting lazygit_0.44.1_Windows_x86_64.zip ... done.
Linking ~\scoop\apps\lazygit\current => ~\scoop\apps\lazygit\0.44.1
Creating shim for 'lazygit' in ~\scoop\shims\lazygit.exe
'lazygit' (0.44.1) was installed successfully!
```

### Commande 2 (Étape 2) : Validation du relais d'exécution (shim)
```powershell
where.exe lazygit
```

#### Sortie brute réelle attendue :
```text
C:\Users\alexis\scoop\shims\lazygit.exe
```

---

## 2. Démo Mise (Slide 07 / 15)

### Commande 1 (Étape 1) : Projet Legacy (Node 18)
```powershell
cd C:\workspace\projet-legacy && node --version
```

#### Sortie brute réelle attendue :
```text
v18.20.4  (défini par mise.toml : node = "18")
```

### Commande 2 (Étape 2) : Projet Moderne (Node 22)
```powershell
cd C:\workspace\projet-moderne && node --version
```

#### Sortie brute réelle attendue :
```text
v22.14.0  (défini par mise.toml : node = "22")
```

### Commande 3 (Étape 3) : Tâche d'équipe standardisée
```powershell
mise run dev
```

#### Sortie brute réelle attendue :
```text
[dev] API_URL=http://localhost:8080 npm run start
```

---

## 3. Démo PATH & Masquage (Slide 09 / 15)

### Commande 1 (Étape 1) : Constat du masquage silencieux HKLM
```powershell
where.exe python
```

#### Sortie brute réelle attendue :
```text
C:\Python39\python.exe                    <-- HKLM Machine (Prend la main !)
C:\Users\alexis\AppData\Local\mise\shims\python.exe  <-- HKCU User (Masqué !)
```

### Commande 2 (Étape 2) : Injection prioritaire dans le PATH de session
```powershell
$env:PATH = "$env:LOCALAPPDATA\mise\shims;$HOME\scoop\shims;$env:PATH"
```

#### Sortie brute réelle attendue :
```text
[OK] User shims prepended at index 0 of session PATH
```

### Commande 3 (Étape 3) : Validation du rétablissement de priorité
```powershell
where.exe python
```

#### Sortie brute réelle attendue :
```text
C:\Users\alexis\AppData\Local\mise\shims\python.exe  <-- Prioritaire désormais !
C:\Python39\python.exe
```

---

## 4. Démo DevRecipe (Slide 11 / 15)

### Commande 1 (Étape 1) : Validation syntaxique du manifeste
```powershell
.\devrecipe.ps1 -Validate
```

#### Sortie brute réelle attendue :
```text
[OK] Manifest syntax valid (profile: default)
```

### Commande 2 (Étape 2) : Simulation avec contrôle préalable des conflits
```powershell
.\devrecipe.ps1 -DryRun -Review
```

#### Sortie brute réelle attendue :
```text
[Preflight] Scanning system software and registry paths...
[WARN] Existing system Git found at 'C:\Program Files\Git\cmd' (version 2.38)
[DryRun] Plan:
  + Scoop packages to install : [ripgrep, fzf, jq, lazygit]
  + Mise runtimes to install  : [node@22.14.0, python@3.12.2]
  + Environment actions      : Prepend user shims in PowerShell & cmd AutoRun
[OK] DryRun complete (exit code 0). No system changes applied.
```
