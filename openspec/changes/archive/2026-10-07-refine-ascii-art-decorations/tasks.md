## 1. Calibrage des chaînes ASCII Art et centrage des motifs

- [x] 1.1 Mettre à jour `win98Html` dans `presentation/src/scripts/slide-engine.js` : décaler le motif du logo Windows vers la droite pour un centrage parfait, fixer le libellé inférieur à `[ WIN32 USER-SPACE ]` centré, aligner strictement la bordure droite `║` sur 47 colonnes utiles et vérifier que chaque ligne mesure 49 caractères au total.
- [x] 1.2 Remplacer `javaHtml` dans `presentation/src/scripts/slide-engine.js` : concevoir une tasse de café Java en ASCII complexe et détaillée (multiples volutes de vapeur entrelacées rouge/ambre, ouverture 3D, corps de tasse texturé avec inscription, anse 3D, soucoupe double niveau), centrer rigoureusement le motif sur 47 colonnes utiles, fixer le libellé inférieur à `[ SWITCH AUTOMATIQUE SELON DOSSIER ]` centré, et vérifier l'alignement strictement vertical des bordures latérales.

## 2. Ajustement du positionnement CSS et validation

- [x] 2.1 Modifier le positionnement de `.petscii-bg-art` dans `presentation/src/styles/petscii.css` pour ancrer l'élément en haut à droite avec `top: clamp(24px, 4.5vh, 64px)` et `right: clamp(16px, 2.5vw, 48px)` au lieu du centrage vertical `top: 50%`.
- [x] 2.2 Recompiler le deck via `node build-deck.js` dans `presentation/` et vérifier la conformité via `node scripts/verify-conference.js` et le rendu visuel dans le navigateur.
