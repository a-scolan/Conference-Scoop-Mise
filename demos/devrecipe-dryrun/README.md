# Démo 5 : REX DevRecipe — Validation et Dry-Run d'équipe

- **Acte associé :** Acte 4 (DevRecipe, REX & Gouvernance)
- **Slide :** Slide 11 (Démo DevRecipe)
- **Durée cible :** 45 secondes
- **Version DevRecipe de référence :** [a-scolan/DevRecipe](https://github.com/a-scolan/DevRecipe) commit `3b1e9df` / v0.3.0.

## Preuve visée
Montrer qu'un fichier manifeste d'onboarding (`devrecipe.toml`) peut être relu en Pull Request par l'équipe, testé syntaxiquement (`-Validate`), simulé sans risque avec scan de détection des conflits système existants (`-DryRun -Review`), avant toute installation réelle.

## Commandes à exécuter

```powershell
cd demos\devrecipe-dryrun

# 1. Validation de conformité du fichier
devrecipe -Validate

# 2. Simulation avec preflight check
devrecipe -DryRun -Review
```

## Sortie attendue

```text
[OK] Manifest syntax valid (profile: default)
[Preflight] Scanning registry, AppX, and system PATH for potential collisions...
[WARN] Existing system Git detected at 'C:\Program Files\Git\cmd' (version 2.38.1)
[DryRun] Planned installations:
  + Scoop packages : [ripgrep, fzf, jq, lazygit]
  + Mise runtimes  : [node@22.14.0, python@3.12.2]
  + Environment    : Prepend user shims in PowerShell & cmd AutoRun
[OK] DryRun complete (exit code 0). No system modifications applied.
```

## Exemple de manifeste d'équipe (`devrecipe.toml`)

```toml
[meta]
name = "onboarding-equipe-web"
version = "1.0.0"

[profiles.default.scoop]
buckets = ["extras"]
packages = ["ripgrep", "fzf", "jq", "lazygit"]

[profiles.default.mise]
tools = { node = "22.14.0", python = "3.12.2" }

[governance]
require_user_space = true
allow_elevation = false
```
