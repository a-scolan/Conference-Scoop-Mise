<#
.SYNOPSIS
  Prépare l'environnement de démo en injectant un runtime legacy dans HKLM (simule le poste d'entreprise).
.DESCRIPTION
  Nécessite des privilèges Administrateur. À exécuter une seule fois avant la répétition.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

Write-Host "=== Préparation Admin de la Démo (Simulation HKLM) ===" -ForegroundColor Cyan

# 1. Vérifier élévation
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
  Write-Warning "Ce script doit être exécuté dans un terminal PowerShell Administrateur pour modifier HKLM."
  exit 1
}

# 2. Créer un faux binaire Python legacy dans C:\Python39
$fakePythonDir = 'C:\Python39'
if (-not (Test-Path $fakePythonDir)) {
  New-Item -ItemType Directory -Path $fakePythonDir | Out-Null
}

$fakePythonExe = Join-Path $fakePythonDir 'python.cmd'
$cmdContent = "@echo off`necho Python 3.9.7 (Legacy Enterprise System Image HKLM)"
Set-Content -Path $fakePythonExe -Value $cmdContent -Encoding ASCII

# 3. Injecter C:\Python39 dans le PATH Machine (HKLM)
$machinePathKey = 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment'
$currentMachinePath = (Get-ItemProperty -Path $machinePathKey -Name Path).Path

if ($currentMachinePath -notlike "*$fakePythonDir*") {
  $newMachinePath = "$fakePythonDir;$currentMachinePath"
  Set-ItemProperty -Path $machinePathKey -Name Path -Value $newMachinePath
  Write-Host "✓ Ajouté '$fakePythonDir' au PATH Machine (HKLM)." -ForegroundColor Green
  # Notifier le système du changement
  if (-not ([System.Management.Automation.PSTypeName]'Win32Env').Type) {
    Add-Type -Namespace Win32 -Name NativeMethods -MemberDefinition @"
[System.Runtime.InteropServices.DllImport("user32.dll", SetLastError = true, CharSet = System.Runtime.InteropServices.CharSet.Auto)]
public static extern System.IntPtr SendMessageTimeout(System.IntPtr hWnd, uint Msg, System.UIntPtr wParam, string lParam, uint fuFlags, uint uTimeout, out System.UIntPtr lpdwResult);
"@
  }
} else {
  Write-Host "✓ '$fakePythonDir' déjà présent dans le PATH Machine (HKLM)." -ForegroundColor Yellow
}

Write-Host "Préparation terminée. Ouvrez un terminal standard pour lancer la démo." -ForegroundColor Green
