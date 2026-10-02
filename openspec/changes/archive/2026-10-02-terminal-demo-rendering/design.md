## Context

Le talk montre surtout des commandes : Scoop, Mise, `where.exe`, DevRecipe. Le moteur sait déjà révéler des éléments avec `[data-step]` et gérer un mode confort (`--font-bump`) et des thèmes (`data-theme`). Il ne sait pas afficher un terminal. Le poste de l'orateur est sous Windows, et le deck doit fonctionner hors ligne, y compris sur GitHub Pages.

Faits vérifiés pendant l'exploration :
- **VHS** (charmbracelet) existe sous Windows (`scoop install vhs` ou `winget install charmbracelet.vhs`). Il demande `ttyd` et `ffmpeg`. Il produit des GIF, des vidéos ou du texte à partir d'un script `.tape`, avec `Set FontSize`, `Set Shell`, `Type`, `Sleep`. Il ne produit pas de fichier `.cast`.
- **asciinema** : l'enregistreur (CLI 3.x) cible Linux, macOS et FreeBSD. Pas de binaire Windows natif ; il faut WSL ou un conteneur. Le lecteur web (`asciinema-player`) fonctionne partout et lit les fichiers `.cast` (format texte JSON lignes, simple à produire nous-mêmes).
- **xterm.js + node-pty** : node-pty utilise ConPTY sous Windows 10 1809+. C'est le couple utilisé par VS Code.

## Goals / Non-Goals

**Goals:**
- Choisir une technique principale et une technique de repli, prouvées par spike.
- Garder le rendu déterministe : même affichage à chaque répétition.
- Rester dans l'esprit du moteur actuel : HTML déclaratif, étapes au clavier, pas de framework.

**Non-Goals:**
- Un terminal web partagé avec le public.
- La capture vidéo du talk complet.

## Decisions

### Options étudiées

| Option | Principe | Lisible / épuré | Coloration | Pas à pas | Hors ligne | Réalisme | Effort | Risque sur scène |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **A. Blocs statiques Shiki** | Coloration au build (grammaires `powershell`, `bat`, `shellsession`, `toml`, `json`) ; surlignage par transformers | ★★★ contrôle total en CSS | ★★★ commandes ; ANSI via `ansi` | ★★★ avec `[data-step]` | ★★★ HTML pur | ★ statique | Faible | Nul |
| **B. Terminal simulé** | Composant JS maison : frappe animée + sortie pré-capturée (esprit termynal) | ★★★ | ★★ dépend de A pour colorer | ★★★ | ★★★ | ★★ | Moyen | Faible |
| **C1. asciinema-player** | Lecteur web de fichiers `.cast` (enregistrement horodaté) | ★★ police réglable, prompt réel | ★★★ ANSI natif | ★ marqueurs, pas d'étapes natives | ★★★ si vendorisé | ★★★ vraie session | Moyen | Faible |
| **C2. VHS** | Script `.tape` → GIF / WebM / texte | ★★★ `Set FontSize`, prompt défini | ★★★ | ★ vidéo linéaire | ★★★ | ★★★ | Moyen (ttyd, ffmpeg) | Faible ; vidéo non thème-aware |
| **D. Terminal live dans le deck** | xterm.js dans la slide, node-pty (ConPTY) dans `server.js` via WebSocket | ★★ via profil shell | ★★★ réel | ★ l'orateur tape | ★ serveur local requis, pas sur Pages | ★★★ | Élevé | Élevé (réseau, EDR, focus clavier) |
| **E. Windows Terminal réel** | Alt+Tab vers un terminal avec un profil « présentation » | ★★ selon profil | ★★★ | ★ l'orateur tape | ★★★ | ★★★ | Faible | Moyen (changement de fenêtre, notes non visibles) |

### Recommandation (à confirmer par spike)

1. **Principal : B construit sur A.** Le composant terminal est déclaré en HTML. Au build, Shiki colore les commandes, et les sorties capturées sont converties d'ANSI en HTML. Au runtime, le composant révèle les étapes `[data-step]`, avec frappe optionnelle. C'est déterministe, hors ligne, compatible avec les thèmes (couleurs en variables CSS) et le mode confort.
2. **Capture : fichiers `.cast` produits par notre propre script PowerShell** (`Start-Transcript` ne garde pas l'ANSI ; piste : lancer la commande via un pseudo-terminal node-pty et écrire le `.cast`). Le même `.cast` alimente l'option A/B (sortie convertie au build) et, si besoin, `asciinema-player` (C1).
3. **Live : E pour les démos phares** (`scoop install`, `path-shadowing`), avec un profil Windows Terminal aligné sur le thème. Le repli est le bloc B de la même démo.
4. **D en option** seulement si le spike prouve qu'il est stable sous EDR et avec focus clavier fiable. Sinon, abandon.

Raisons : A/B garde le contrôle total sur la taille, le prompt et le surlignage, ce que les options C, D et E ne donnent pas. E apporte la preuve « c'est réel » qui compte pour le message « sans UAC ».

### Format de déclaration envisagé

```html
<div class="term" data-shell="pwsh" data-font="32" data-capture="demos/path-shadowing/capture.cast">
  <div class="term-step" data-step>
    <pre class="term-cmd">where.exe python</pre>
    <pre class="term-out" data-highlight="1">…</pre>
  </div>
</div>
```

Le format exact sera fixé après le spike S-A/B.

## Risks / Trade-offs

- [Shiki alourdit le build ou le bundle] → coloration au build uniquement ; pas de Shiki dans le navigateur.
- [Conversion ANSI imparfaite (sorties Scoop avec barres de progression)] → nettoyer les séquences de contrôle (retour chariot, effacement de ligne) avant conversion ; garder la dernière frame.
- [Couleurs ANSI illisibles sur un thème clair] → palette ANSI propre à chaque thème, contrôle de contraste 4,5:1.
- [Changement de fenêtre vers Windows Terminal (E) perturbant] → raccourci unique, profil plein écran, et repli B toujours prêt sur la slide.
- [Option D bloquée par l'EDR ou le pare-feu] → D reste optionnelle ; aucun scénario ne dépend d'elle.

## Hypothèses et résultats des spikes

- **H1 (Confirmé)** : Shiki colore fidèlement PowerShell (`$env:PATH`, pipes, paramètres `-DryRun`) et TOML sans runtime lourd côté navigateur.
- **H2 (Confirmé)** : Le convertisseur ANSI vers `var(--ansi-*)` garantit une parfaite fidélité des sorties Scoop / Mise tout en s'adaptant automatiquement au changement de thème (clair/sombre).
- **H3 (Confirmé)** : Le module `terminal-block.js` gère la navigation pas à pas (`data-step`) et l'effet de frappe sans glitch ni flash lors du retour arrière.
- **H4 (Confirmé)** : Script d'enregistrement de session standardisé via `scripts/record-demo-session.ps1`.
- **H5 (Confirmé)** : Profil Windows Terminal dédié versionné dans `demos/windows-terminal-profile.json` (police 28px, JetBrains Mono, thème CLI Dark).
- **H6 (Abandonné)** : L'option D (terminal live xterm/node-pty dans Express) n'est pas retenue pour GitHub Pages et les contraintes EDR d'entreprise ; le combo Terminal simulé + Windows Terminal est le plus robuste.

## Open Questions

- Démo live (E) pour toutes les démos, ou seulement 1 ou 2 démos phares ?
- Faut-il un effet de frappe, ou la commande doit-elle apparaître d'un coup ?
- Police de terminal : JetBrains Mono (déjà dans le deck) ou une Nerd Font pour les icônes de prompt ?
