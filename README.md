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

## Raccourcis en séance

| Touche | Effet |
| --- | --- |
| → / Espace / télécommande | Étape suivante, puis slide suivante |
| P | Ouvre la vue présentateur (chrono, notes, slide suivante) |
| C | Mode confort et fort contraste pour vidéoprojecteur délavé |
| T | Change de thème visuel |
| B ou . | Écran noir |

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

Les objectifs et les besoins sont décrits dans `openspec/changes/` :

- `bootstrap-scoop-mise-talk` : trame en 6 actes, catalogue des démos, nettoyage du moteur.
- `terminal-demo-rendering` : exploration du rendu des lignes de commande dans les slides.

```bash
openspec list                       # changes en cours
openspec show <change>              # lire un change
openspec validate <change> --strict # valider
```

## Origine

Le moteur du deck vient de la conférence [Diagram as Code](https://github.com/a-scolan/Conference-Diagram-as-Code). Le contenu LikeC4 de ce talk a été retiré.