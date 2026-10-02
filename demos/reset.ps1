<#
.SYNOPSIS
  Remet l'environnement utilisateur à zéro pour une nouvelle répétition ou démonstration.
.DESCRIPTION
  Exécutable en espace utilisateur standard (aucun droit admin requis).
  Durée d'exécution cible : < 30 secondes.
#>
[CmdletBinding()]
param()

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
Write-Host "=== Réinitialisation de l'environnement de démo Scoop & Mise ===" -ForegroundColor Cyan

# 1. Nettoyer les packages Scoop installés pendant la démo
if (Get-Command scoop -ErrorAction SilentlyContinue) {
  $toolsToClean = @('lazygit', 'ripgrep', 'fzf', 'jq')
  foreach ($tool in $toolsToClean) {
    if (Test-Path "$HOME\scoop\apps\$tool") {
      Write-Host "Nettoyage package Scoop : $tool..." -ForegroundColor Yellow
      scoop uninstall $tool *>$null
    }
  }
}

# 2. Restaurer les dossiers projets d'exemple
$demosRoot = $PSScriptRoot
$legacyMise = Join-Path $demosRoot "mise-per-project\projet-legacy\mise.toml"
$moderneMise = Join-Path $demosRoot "mise-per-project\projet-moderne\mise.toml"

Set-Content -Path $legacyMise -Value @'
[tools]
node = "18"
'@ -Encoding UTF8

Set-Content -Path $moderneMise -Value @'
[tools]
node = "22"

[env]
API_URL = "http://localhost:8080"

[tasks.dev]
description = "Démarre le serveur de développement"
run = "node -e 'console.log(`[dev] Serveur démarré avec ${process.env.API_URL} sous Node ${process.version}`)'"
'@ -Encoding UTF8

# 3. Réinitialiser les variables de session utilisateur
$userPathKey = 'HKCU:\Environment'
$userPath = (Get-ItemProperty -Path $userPathKey -Name Path -ErrorAction SilentlyContinue).Path
if ($userPath) {
  # S'assurer que scoop\shims et mise\shims sont présents dans le PATH User
  $scoopShim = "$HOME\scoop\shims"
  $miseShim = "$env:LOCALAPPDATA\mise\shims"
  $paths = $userPath -split ';' | Where-Object { $_ -ne '' -and (Test-Path $_) }
  if ($paths -notcontains $scoopShim -and (Test-Path $scoopShim)) { $paths = ,$scoopShim + $paths }
  if ($paths -notcontains $miseShim -and (Test-Path $miseShim)) { $paths = ,$miseShim + $paths }
  Set-ItemProperty -Path $userPathKey -Name Path -Value ($paths -join ';')
}

$stopwatch.Stop()
$elapsed = $stopwatch.Elapsed.TotalSeconds.ToString('0.0')
Write-Host "Environnement réinitialisé en $elapsed secondes !" -ForegroundColor Green
