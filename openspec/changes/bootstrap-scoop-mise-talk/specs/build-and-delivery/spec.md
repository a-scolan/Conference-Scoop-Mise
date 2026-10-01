## MODIFIED Requirements

### Requirement: Serveur de présentation local anti-restrictions iframe
Un serveur Node.js / Express minimal (`presentation/server.js`) DOIT (SHALL) servir la présentation sur `http://localhost:4000/` pour contourner les blocages de sécurité des navigateurs (notamment Firefox et Chrome) qui interdisent l'inclusion d'iframes locales sous protocole `file://`.

#### Scenario: Démarrage standard du serveur local
- **WHEN** L'utilisateur lance `npm start` dans le répertoire `presentation/`
- **THEN** Le cycle de vie npm déclenche d'abord `prestart` (`npm run build`) pour générer les QR codes et assembler le deck modulaire dans `presentation/public/`, puis lance le serveur Express qui sert les fichiers statiques depuis `presentation/public` avec `index: 'presentation.html'` et résout automatiquement les extensions HTML.

#### Scenario: Gestion du conflit de port
- **WHEN** Le port demandé est déjà occupé par un autre processus (`EADDRINUSE`)
- **THEN** Le serveur intercepte l'erreur, affiche un message d'aide suggérant une commande alternative (ex: `PORT=4242 node server.js`) et s'interrompt avec un code de retour $1$.

### Requirement: Pipeline d'assemblage modulaire du diaporama
Le système de build du projet DOIT (SHALL) fournir un mécanisme d'assemblage automatisé transformant les fichiers sources modulaires (templates de diapositives, modules JavaScript, styles CSS) en une page HTML finale distribuable dans `presentation/public/presentation.html`.

#### Scenario: Compilation du diaporama complet
- **WHEN** La commande `npm run build:deck` est exécutée
- **THEN** Le pipeline compile les modules JavaScript, injecte les fragments de diapositives ordonnés, fusionne les feuilles de style CSS et génère le fichier HTML autonome dans le répertoire de publication sans erreur.

#### Scenario: Mode développement avec rechargement à chaud
- **WHEN** Le développeur lance `npm run dev:deck`
- **THEN** Un serveur de développement local surveille les modifications apportées aux diapositives et aux styles pour rafraîchir instantanément la présentation dans le navigateur sans rechargement complet manuel.

#### Scenario: Vérification de cohérence
- **WHEN** La commande `npm run verify` est exécutée
- **THEN** Le script `scripts/verify-conference.js` contrôle l'alignement entre `slides.json` et `deroule-conference-slides.md` et sort avec un code non nul en cas d'écart.

## REMOVED Requirements

### Requirement: Compilation des projets LikeC4 en artefacts single-file
**Reason**: Le nouveau talk (Scoop & Mise) n'utilise pas LikeC4. Le script `build-single-assets.js` et les projets `coffee-v1`/`coffee-v2` ont été supprimés lors du nettoyage.
**Migration**: Aucune. L'original reste disponible dans le dépôt `a-scolan/Conference-Diagram-as-Code`.

### Requirement: Scripts d'exportation vers un dépôt de présentation dédié
**Reason**: Le nouveau dépôt du talk sert lui-même le support via GitHub Pages ; un dépôt miroir n'est plus utile. Les scripts `publish-likec4-presentation.{sh,ps1}` ont été supprimés.
**Migration**: Utiliser le workflow `.github/workflows/github-pages.yml` du dépôt du talk.
