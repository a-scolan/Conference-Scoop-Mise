## Context

L'identité visuelle du deck de conférence quickie (15 min) s'appuie sur une esthétique rétro-informatique (logos ASCII Windows, cadres PETSCII, typographie monospace). Toutefois, l'arrière-plan des diapositives utilisait jusqu'ici une trame de papier millimétré contemporaine (« blueprint »), héritée d'un template précédent.

Voir `proposal.md` pour la motivation détaillée. L'objectif est d'installer une texture rétro-tech authentique évoquant l'époque de Windows 98 et de la demoscene (motif de bureau « Carreaux / Thatches » avec micro-tramage dither 16-bit et ambiance Teal feutrée), tout en préservant le contraste élevé exigé par la vidéoprojection en salle de conférence.

## Goals / Non-Goals

**Goals:**
- Proposer un fond à carreaux biseautés inspiré des textures de bureau et d'installation Windows 98.
- Intégrer un micro-tramage de pixels ordonnés 2×2 (dithering de type matrice de Bayer) à opacité très discrète (< 3.5%) pour conférer un grain cathodique sans moiré.
- Moderniser la teinte mythique « Teal » de Windows 98 (`#008080`) en un fond sombre profond et chaleureux (`#081416` vers `#0b1f22`), assurant un contraste supérieur à 9:1 avec les textes clairs.
- Assurer une compatibilité parfaite avec tous les thèmes (`cli-dark`, `slate-architect`, `cli-light`, `google-blueprint-light`) et le mode `high-contrast`.

**Non-Goals:**
- Pas d'images bitmaps lourdes ou externes (tout est généré en pur CSS et SVG inline ultraléger data-URI).
- Pas d'animations continues (clignotement ou défilement de scanlines) risquant de distraire l'auditoire.
- Pas de modification du contenu des diapositives ni des blocs de démonstration terminal.

## Decisions

### Décision 1 : Génération du micro-dithering 16-bit (SVG Data-URI vs pure CSS gradients)

* **Choix retenu** : SVG data-URI 4×4 pixels avec damier de pixels de 2×2 (`url("data:image/svg+xml,...")`).
* **Justification** : Le rendu des `repeating-conic-gradient` ou gradients CSS à l'échelle du sous-pixel provoque des artefacts de moiré et des scintillements variables selon le ratio de zoom de l'écran ou la mise à l'échelle DPI du vidéoprojecteur. Le SVG data-URI avec motif 4×4 net garantit une répétition déterministe et nette sur tous les moteurs de rendu (Chromium, Gecko, WebKit).
* **Option alternative considérée** : Double gradient CSS pur (`radial-gradient` + `linear-gradient`). Écartée en raison des arrondis flottants imprévisibles sur les dalles 4K et vidéoprojecteurs 1080p créant des bandes de Mach indésirables.

### Décision 2 : Nuance Teal modernisée vs Teal Windows 98 pur (`#008080`)

* **Choix retenu** : Fond sombre enrichi en base Teal sombre (`#081416` au centre vers `#050d0e` en périphérie, avec une lueur douce teal `#008080` à 6-8% d'opacité en halo radial).
* **Justification** : Le Teal d'origine Windows 98 (`#008080`) était conçu pour des écrans cathodiques 640×480 et produit un contraste insuffisant (environ 4.5:1) lorsqu'on y superpose du texte blanc ou jaune, générant une fatigue visuelle rapide en projection. La version modernisée fonce le socle pour dépasser 9:1 de contraste tout en conservant le timbre chromatique vert-bleu inimitable de 1998.
* **Option alternative considérée** : Teal d'origine `#008080` pur en fond plein. Écartée car elle détruit la lisibilité des blocs de code foncés et fatigue excessivement l'audience en conférence.

### Décision 3 : Structure des carreaux biseautés (Thatches / Relief 3D 1px)

* **Choix retenu** : Grille de 40px × 40px combinant un trait clair (highlight 1px `rgba(255,255,255,0.035)`) et un trait sombre (shadow 1px `rgba(0,0,0,0.4)`), complétée par les mires de coins existantes.
* **Justification** : Reproduit la sensation tactile des bordures en biseau 3D caractéristiques de l'UI Windows 98 (boutons `buttonface`, séparateurs `groove` et fonds gaufrés) sans saturer l'espace utile.
* **Option alternative considérée** : Carreaux plats uniformes à un seul trait. Écartée car elle ressemblait trop au papier millimétré actuel sans la touche 1998 recherchée.

## Risks / Trade-offs

- **[Risque] Moiré ou scintillement sur vidéoprojecteur basse résolution (720p / 1080p dégradé)** → **Mitigation** : Opacité du dither plafonnée à 2.5%, taille du damier calée sur 2px entiers et possibilité de désactiver instantanément la trame via le raccourci `C` (mode confort / `high-contrast`) déjà implémenté dans le moteur du deck.
- **[Risque] Conflit de contraste avec les fenêtres terminal et blocs Shiki** → **Mitigation** : Les surfaces terminal (`--surface`, `--surface2`) conservent leur fond opaque semi-élevé (`#121d1f` ou `#162224`), isolant le code de toute texture de fond.

## Migration Plan

1. Mettre à jour les variables de fond dans `presentation/src/styles/themes/cli-dark.css`, `slate-architect.css`, `cli-light.css`, et `google-blueprint-light.css`.
2. Définir les classes et variables de tramage dans `presentation/src/styles/decorations.css` et `tokens.css`.
3. Vérifier le rendu via `node presentation/build-deck.js` et exécuter la suite de validation `npm run verify`.
4. Tester le basculement de thèmes (touche T) et le mode confort (touche C) dans le navigateur.
