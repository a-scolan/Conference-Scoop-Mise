## Context

Voir `proposal.md`.
L'art ASCII du logo Windows 98 utilise un ensemble de caractères denses (`.`, `,`, `:`, `;`, `!`, `t`, `z`, `3`, `E`, `Z`, `Q`, `F`, `L`, `V`, `@`, `#`, `$`, `*`) répartis en blocs colorés quadri-chromie.
Le logo Java doit adopter la même densité de remplissage et le même vocabulaire de caractères tout en conservant la forme immédiatement identifiable de la tasse de café Java.

## Goals / Non-Goals

**Goals:**
- Construire une tasse de café Java en ASCII dense avec remplissages texturés dans le style du logo Windows 98.
- Utiliser la même palette de couleurs (rouge, or/ambre, bleu, vert) pour les différentes parties de la tasse.
- Reporter dans `presentation/src/scripts/slide-engine.js` le calage exact des boutons `[ _ ][ X ]` (36 caractères `═` avant le bouton, 1 après).
- Garantir 47 colonnes utiles strictes à l'intérieur du cadre et 49 caractères sur chaque ligne.

**Non-Goals:**
- Modifier le logo Windows 98 (qui est déjà centré et validé).
- Modifier les règles CSS de positionnement de `.petscii-bg-art`.

## Decisions

### 1. Composition texturée de la tasse Java (Remplissage dense)
- **Option A (retenue) : Stylisation matricielle artisanale harmonisée avec Windows 98**
  - Vapeur : volutes denses texturées en rouge vif (`#ff3333`) et or (`#ffb900`) utilisant `:t3Zz.`, `tt:::tt33EE`, `!t3EE`.
  - Rebord : ligne supérieure fluide en bleu vif (`#58a6ff`).
  - Surface café : liquide dense en or/ambre (`#ffb900`) avec `EEEEEEEEEEEEEEEEEEEEEEEEEEEE)`.
  - Corps de tasse : céramique texturée en bleu profond (`#1084d0`) avec trame dense `:Et:::zt333333333333tz:::tE.`.
  - Anse : boucle texturée en vert (#00aa00) avec `;EE@.`, `:EEEE3`, `$EEEEF`, harmonisant les 4 couleurs de la palette rétro.
  - Soucoupe : double lisière en bleu vif (`#58a6ff`).
  *Avantages* : Cohérence visuelle parfaite entre les deux logos rétro du diaporama.
- **Option B : Remplissage uniforme par pavés pleins Unicode (█, ▓, ▒)**
  *Inconvénients* : Rendu trop moderne ou lourd, en rupture avec la texture fine du logo Windows 98.

### 2. Pérennisation du calage des boutons de fenêtre
- La bordure supérieure `╔════════════════════════════════════[ _ ][ X ]═╗` comporte 36 `═`, 10 caractères pour `[ _ ][ X ]`, 1 `═` et les deux coins `╔` et `╗`, pour un total de 49 caractères, identique à la largeur totale de chaque ligne `║...║` et `╚═══════════════════════════════════════════════╝`.

## Risks / Trade-offs

- **[Risque] Trop forte présence visuelle du logo rempli** → *Atténuation* : L'opacité générale fixée en CSS (`0.28` en mode sombre, `0.22` en mode clair) assure que l'ornement reste en filigrane discret sans gêner la lecture des diapositives.
