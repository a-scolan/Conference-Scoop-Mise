## 1. Spikes de faisabilité

- [ ] 1.1 Spike S1 : créer un `.wsb` Windows Sandbox qui monte `demos/` ; installer Scoop sans UAC. Vérifier : capture sans invite UAC, temps de démarrage noté dans `design.md`.
- [ ] 1.2 Spike S2 : précharger les caches Scoop et Mise, couper le réseau, installer `node@20` et `node@22` ; vérifier que `cd` bascule la version sous `pwsh` avec `mise activate`. Vérifier : sortie `node --version` dans deux dossiers, réseau coupé.
- [ ] 1.3 Spike S3 : ajouter `C:\Python3xx` au PATH machine, installer Python via Mise, ouvrir un nouveau terminal. Vérifier : `where.exe python` montre HKLM en premier, puis l'ordre inversé après le correctif.
- [ ] 1.4 Consigner les résultats des spikes et le choix d'environnement (D3) dans `design.md`. Vérifier : section « Hypothèses » mise à jour (H1 à H4 confirmées ou infirmées).

## 2. Nettoyage du moteur

- [x] 2.1 Retirer de `slide-engine.js` les branches `slide--live-coding`, `slide--c2-unified`, `slide--pr-review`, `slide--c2-evolution` et la modale diff LikeC4. Vérifier : `npm run build` sans erreur, navigation clavier OK, 0 erreur console.
- [x] 2.2 Retirer le CSS mort (LikeC4, anciennes slides) de `components.css` et `slides.css`. Vérifier : recherche `likec4|c2-|pr-review` sans résultat ; rendu visuel des 3 slides inchangé.
- [x] 2.3 Réécrire la checklist avant-scène de `presenter-view.html` selon la spec `presenter-view`. Vérifier : la checklist affiche les nouveaux points et le compteur `N/N`.
- [x] 2.4 Mettre à jour la table des sections (`buildSectionMap`) avec les 6 parties de la spec `content-theme`. Vérifier : couleur correcte sur le fil d'Ariane de chaque partie.

## 3. Trame et slides squelettes

- [ ] 3.1 Créer une slide squelette par acte (titre, message clé, emplacement démo) dans `presentation/src/slides/` et `slides.json`. Vérifier : `npm run build` OK.
- [ ] 3.2 Compléter `deroule-conference-slides.md` : une entrée par slide avec verbatim, durée, action scénique et mots-clés (dont le message clé de l'acte). Vérifier : `npm run verify` OK.
- [ ] 3.3 Rédiger la slide d'accroche : 4 erreurs → acte qui les résout. Vérifier : relecture contre la spec `talk-narrative`.
- [ ] 3.4 Rédiger la slide gouvernance (acte 4) et la slide clôture (commande de démarrage, URL, QR). Vérifier : données issues de `event.config.json`.

## 4. Démos

- [ ] 4.1 Créer `demos/` avec un `README.md` par démo du catalogue (preuve, commandes, sortie attendue, durée, acte). Vérifier : relecture par une autre personne qui rejoue une démo.
- [ ] 4.2 Écrire `demos/prepare-admin.ps1` (préparation HKLM, une fois) et `demos/reset.ps1` (retour à l'état initial en moins de 2 min). Vérifier : chronométrer `reset.ps1`.
- [ ] 4.3 Ajouter les commandes de chaque démo dans les notes présentateur des slides concernées. Vérifier : visibles dans la vue présentateur (touche P).
- [ ] 4.4 Figer la version DevRecipe utilisée (tag ou commit) dans `demos/devrecipe-dryrun/README.md`. Vérifier : la commande `-DryRun -Review` produit le rapport attendu.

## 5. Thème CLI/Terminal

- [x] 5.1 Créer `src/styles/themes/cli-light.css` et `cli-dark.css` : tokens de base, palette `--ansi-*`, couleurs des 6 parties. Vérifier : contraste ≥ 4,5:1 pour le texte et le code sur les deux variantes (outil de contraste ou Lighthouse).
- [x] 5.2 Mettre à jour `theme-controller.js` : défaut `cli-dark`, familles de thèmes, T dans la famille active, `?theme=` pour les 4 thèmes. Vérifier : chacun des 4 thèmes se charge par URL ; T alterne `cli-dark` ↔ `cli-light`.
- [x] 5.3 Ajouter les motifs terminal (titres en JetBrains Mono, prompt `❯`, curseur) et masquer les ornements blueprint sous les thèmes CLI. Vérifier : rendu des slides titre, contenu et clôture ; curseur fixe avec `prefers-reduced-motion`.
- [x] 5.4 Faire suivre les 4 thèmes à la vue présentateur (habillage, bascule T dans la famille). Vérifier : T depuis la console et depuis le deck, les deux fenêtres restent synchronisées.
- [x] 5.5 Test de projection (ou capture réduite au quart) des deux variantes CLI. Vérifier : choix du thème par défaut consigné dans `design.md` (H5).

## 6. Vérification

- [ ] 6.1 Lancer `npm run build` puis `npm run verify` dans `presentation/`. Vérifier : code de sortie 0.
- [ ] 6.2 Contrôle navigateur sur `http://localhost:4000/presentation.html` : navigation, vue présentateur, les 4 thèmes (T et `?theme=`), confort (C). Vérifier : 0 erreur console.
- [ ] 6.3 Répétition chronométrée complète. Vérifier : durée entre 13 min 30 et 14 min 30, aucun acte au-delà de +30 s.
- [ ] 6.4 `openspec validate bootstrap-scoop-mise-talk --strict`. Vérifier : aucune erreur.
