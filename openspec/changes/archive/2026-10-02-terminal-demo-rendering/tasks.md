## 1. Spikes

- [x] 1.1 Spike S-A : script Node qui colore avec Shiki une commande PowerShell, un `mise.toml` et une sortie ANSI de `scoop install` ; produire une page HTML de test. Vérifier : capture d'écran jointe dans `design.md`, H1 et H2 notées.
- [x] 1.2 Spike S-B : prototype de bloc terminal à 6 étapes branché sur `[data-step]`, avec frappe optionnelle. Vérifier : avant/arrière sans flash dans le navigateur, H3 notée.
- [x] 1.3 Spike S-C : script de capture node-pty → `.cast` pour une session `pwsh`, puis lecture dans `asciinema-player` vendorisé. Vérifier : couleurs conservées, H4 notée.
- [x] 1.4 Spike S-E : profil Windows Terminal « présentation » (police, prompt minimal, schéma de couleurs). Vérifier : capture projetée ou réduite au quart, lisible ; H5 notée.
- [x] 1.5 (Optionnel) Spike S-D : xterm.js + node-pty via `server.js`. Vérifier : session stable 5 min avec l'EDR actif ; sinon, abandon noté.
- [x] 1.6 Mettre à jour `design.md` avec le choix final et le format de déclaration. Vérifier : section « Recommandation » marquée « confirmée ».

## 2. Composant bloc terminal

- [x] 2.1 Ajouter la coloration au build dans `build-deck.js` (Shiki + ANSI → HTML), sans Shiki dans le navigateur. Vérifier : `npm run build` OK, taille du bundle notée.
- [x] 2.2 Créer le module runtime `src/scripts/terminal-block.js` (étapes, frappe optionnelle, surlignage). Vérifier : scénarios « Avancer puis reculer » et « Effet de frappe » OK.
- [x] 2.3 Créer les styles du bloc, liés aux tokens de thème et à `--font-bump`, avec palette ANSI par thème. Vérifier : contraste ≥ 4,5:1 sur chaque thème, touche C et T OK.
- [x] 2.4 Afficher les commandes du bloc dans la vue présentateur, avec l'étape courante en évidence. Vérifier : scénario « Suivi de l'étape » OK.

## 3. Capture et profil live

- [x] 3.1 Industrialiser le script de capture retenu dans `scripts/` et documenter son usage dans `README.md`. Vérifier : une capture de `scoop-install` est rejouée dans le deck.
- [x] 3.2 Versionner le profil Windows Terminal « présentation » (fragment JSON) et documenter son installation. Vérifier : profil appliqué sur un poste neuf.
- [x] 3.3 Mettre à jour les instructions du skill `visual-explainer` si le bloc terminal devient un pattern réutilisable. Vérifier : référence ajoutée.

## 4. Vérification

- [x] 4.1 `npm run build` puis `npm run verify` dans `presentation/`. Vérifier : code de sortie 0.
- [x] 4.2 Contrôle navigateur réseau coupé : slide de démo avec bloc terminal, thèmes, mode confort, vue présentateur. Vérifier : 0 erreur console, 0 requête réseau externe.
- [x] 4.3 `openspec validate terminal-demo-rendering --strict`. Vérifier : aucune erreur.
