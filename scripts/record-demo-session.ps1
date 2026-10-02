<#
.SYNOPSIS
  Enregistre les commandes et sorties d'une session de démonstration PowerShell pour mise à jour des replis.
.DESCRIPTION
  Produit un fichier de transcription horodaté ou JSON réutilisable par les blocs terminal du diaporama.
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)]
  [string]$DemoName,

  [string]$OutputDir = "$PSScriptRoot\..\demos\$DemoName"
)

$ErrorActionPreference = 'Stop'
if (-not (Test-Path $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$transcriptFile = Join-Path $OutputDir "capture-session.log"
Write-Host "Démarrage de l'enregistrement de la démo '$DemoName' vers $transcriptFile" -ForegroundColor Cyan
Write-Host "Tapez 'exit' pour terminer l'enregistrement." -ForegroundColor Yellow

Start-Transcript -Path $transcriptFile -Append
try {
  & pwsh.exe -NoLogo
} finally {
  Stop-Transcript
  Write-Host "✓ Session enregistrée dans $transcriptFile" -ForegroundColor Green
}
