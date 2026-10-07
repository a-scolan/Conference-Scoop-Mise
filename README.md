# Installer ses outils de dev avec Scoop et Mise

Support du quickie (15 min) : comment installer et gérer les outils de son poste Windows d'entreprise **sans droits admin**.

- **Scoop** installe les outils dans le profil utilisateur (user space), sans invite UAC.
- **Mise** gère les versions des runtimes (Node, Python, Java…) par projet, avec un `mise.toml` versionné.
- **PATH Windows** : le PATH machine (HKLM) passe avant le PATH utilisateur (HKCU). Ce piège peut masquer les outils installés en user space.
- **REX [DevRecipe](https://github.com/a-scolan/DevRecipe)** : un manifeste TOML relu en PR, un preflight des conflits, puis l'installation.

L'abstract du CFP est dans [Installer ses outils de dev avec scoop et mise.md](./Installer%20ses%20outils%20de%20dev%20avec%20scoop%20et%20mise.md).

## Démarrer la présentation

Prérequis : Node.js 20 ou plus.

```bash
cd presentation
npm install
npm start          # build complet, puis serveur sur http://localhost:4000/presentation.html
```

Autres commandes, à lancer dans `presentation/` :

| Commande | Effet |
| --- | --- |
| `npm run build` | Génère les QR codes et assemble le deck dans `public/`. |
| `npm run build:deck` | Réassemble seulement les slides et les notes présentateur. |
| `npm run dev:deck` | Rechargement automatique pendant l'édition des slides. |
| `npm run verify` | Contrôle l'alignement entre `slides.json` et le déroulé. |

## Raccourcis et fonctionnalités en séance

| Touche / Contrôle | Effet |
| --- | --- |
| `→` / `↓` / `Espace` / `PageDown` / `Enter` / `N` / Pavé `+` | Étape suivante, puis slide suivante (compatible télécommandes de présentation) |
| `←` / `↑` / `PageUp` / `Backspace` / `P` / Pavé `-` | Étape précédente, puis slide précédente (compatible télécommandes de présentation) |
| `V` ou `Alt+P` | Ouvre la console présentateur double écran (`presenter-view.html`) synchronisée (`V` pour *View*, `P` seul étant réservé au recul télécommande) |
| Bouton Miroir ou touche `M` | Démarre/arrête le miroir vidéo direct P2P WebRTC 60 fps sur le pupitre |
| `C` | Mode confort / agrandissement texte et fort contraste (synchronisé en temps réel avec le pupitre) |
| `T` | Bascule de thème visuel (`cli-dark`, `cli-light`, blueprints) |
| `B` ou `.` | Écran noir public (Blackout) |
| Clic sur le chrono ou `R` | Démarre / suspend / réinitialise le chronomètre persistant (mémorisé dans le navigateur) |

### Nouveautés ergonomiques du moteur

- **Miroir Vidéo Direct WebRTC 60fps** : La console présentateur s'affranchit du double rendu iframe pour afficher directement le flux vidéo matériel de la projection publique sans latence, avec cadrage supérieur de la slide suivante pour anticiper le flux narratif.
- **Stabilisation et Scroll-Anchoring** : Recalage instantané au redimensionnement sans saut intempestif de slide (résistant aux barres d'outils et menus auto-rétractables des navigateurs comme Firefox en plein écran).
- **Adaptation Mobile & Screen Orientation API** : Détection du mode portrait sur mobile avec calque d'invitation au plein écran paysage ou bouton de contournement utilisateur mémorisé en session.

## Structure du dépôt

| Chemin | Contenu |
| --- | --- |
| `presentation/src/slides/` | Une slide HTML par fichier, ordonnées par `slides.json` |
| `presentation/src/scripts/`, `src/styles/` | Moteur du deck (navigation, étapes, thèmes, Mermaid) |
| `presentation/event.config.json` | Événement, orateur, URL du support et du feedback |
| `deroule-conference-slides.md` | Notes présentateur : verbatim, action scénique, mots-clés (format strict, lu par le build) |
| `openspec/` | Specs et changes OpenSpec (objectifs, exigences, tâches) |
| `scripts/verify-conference.js` | Vérification de cohérence slides / déroulé |

## Travailler avec OpenSpec

Les spécifications et l'historique des changements sont décrits dans `openspec/` :

- `openspec/specs/` : spécifications canoniques à jour (`talk-narrative`, `demo-scenarios`, `content-theme`, `presenter-view`, `terminal-display`, `build-and-delivery`).
- `openspec/changes/archive/` : historique des changes appliqués et validés.

## 📋 Antisèche pratique : Scoop, Mise & Sources

### 1. Scoop (Gestionnaire d'outils CLI en espace utilisateur)

- **Annuaire des paquets disponibles :** [https://scoop.sh/#/apps](https://scoop.sh/#/apps)
- **Rechercher un outil :** `scoop search <nom>`
- **Installer un paquet :** `scoop install <nom>` *(ex: `scoop install lazygit ripgrep fzf jq`)*
- **Tout mettre à jour :** `scoop update *`
- **Figer une version (anti-régression) :** `scoop hold <nom>` *(défiger : `scoop unhold <nom>`)*
- **Désinstaller proprement :** `scoop uninstall <nom>`
- **Ajouter une source de paquets (bucket Git) :**
  - Outils communautaires étendus : `scoop bucket add extras`
  - Anciennes versions de runtimes/outils : `scoop bucket add versions`
  - Polices pour développeurs : `scoop bucket add nerd-fonts`
  - Dépôt privé d'entreprise : `scoop bucket add mon-equipe https://gitlab.mon-entreprise.com/dev/scoop-bucket.git`

### 2. Mise (Gestionnaire polyglotte de runtimes par projet)

- **Annuaire & documentation :** [https://mise.jdx.dev](https://mise.jdx.dev)
- **Explorer le registre des outils :** `mise registry` ou `mise ls-remote <runtime>`
- **Associer un runtime au projet courant :** `mise use node@22 python@3.12` *(génère ou met à jour `mise.toml`)*
- **Installer les runtimes déclarés :** `mise install`
- **Mettre à niveau les runtimes :** `mise upgrade`
- **Lister les versions installées :** `mise ls`
- **Lancer une tâche d'équipe :** `mise run <nom-tâche>` *(défini dans `[tasks]`)*
- **Ajouter des sources ou backends alternatifs :**
  - Plugins asdf/mise : `mise plugin install <nom> <url>`
  - Backends directs dans `mise.toml` : `[tools] "npm:@biomejs/biome" = "latest"`, `aqua:sharkdp/fd = "latest"`, `cargo:...`

### 3. DevRecipe (Orchestrateur déclaratif d'équipe)

- **Dépôt officiel :** [https://github.com/a-scolan/DevRecipe](https://github.com/a-scolan/DevRecipe)
- **Valider la syntaxe du manifeste :** `devrecipe -Validate`
- **Simulation avec contrôle préalable des conflits :** `devrecipe -DryRun -Review`
- **Installation complète sans droit admin :** `devrecipe`

## Origine

Le moteur du deck vient de la conférence [Diagram as Code](https://github.com/a-scolan/Conference-Diagram-as-Code). Le contenu LikeC4 de ce talk a été retiré.