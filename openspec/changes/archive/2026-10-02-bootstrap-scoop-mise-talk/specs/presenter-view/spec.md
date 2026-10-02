## MODIFIED Requirements

### Requirement: Checklist de préparation avant-scène
La console présentateur DOIT (SHALL) présenter une checklist interactive de préparation avant-scène directement apparente sur la première diapositive (Slide 1 / Titre) et accessible à tout moment via un bouton dédié dans la barre d'en-tête, permettant de ne rien oublier même une fois l'écran public connecté et occupé.

#### Scenario: Affichage automatique sur la première diapositive
- **WHEN** La console présentateur est sur la diapositive d'ouverture (Slide 1 / Titre)
- **THEN** Un panneau "Checklist Avant-Scène" s'affiche automatiquement en tête de la colonne de notes avec les points de contrôle suivants : navigateur plein écran F11 ; environnement de démo réinitialisé (`demos/reset.ps1`) ; terminal de démo ouvert avec le profil « présentation » (gros corps, prompt épuré) ; caches Scoop et Mise préchargés ou réseau vérifié ; replis enregistrés testés dans le deck ; pas d'interruptions (Teams/Outlook, veille écran/PC) ; alimentation secteur et bouteille d'eau. Le chronomètre est présent dans la vue speaker, aucun smartphone n'est requis.

#### Scenario: Interaction et persistance de la checklist
- **WHEN** L'orateur coche ou décoche des éléments de la checklist
- **THEN** L'état est instantanément sauvegardé dans `localStorage`, le compteur d'avancement se met à jour (badge vert `N/N ✅ Prêt !`), et un bouton de réinitialisation permet de remettre la liste à zéro pour une nouvelle répétition ou session.

#### Scenario: Repli progressif des éléments cochés
- **WHEN** L'orateur coche des points de contrôle au fil de sa préparation
- **THEN** Les éléments cochés se replient automatiquement dans un élément accordéon "Terminé (X)" compact en pied de carte, libérant immédiatement la hauteur verticale pour rendre visibles sans défilement les indications scéniques, mots-clés et verbatims situés juste en dessous. L'orateur peut déplier cet élément à tout moment pour inspecter ou décocher un point validé.

### Requirement: Harmonisation et suivi du thème visuel (Light / Dark)
La console présentateur DOIT (SHALL) s'adapter visuellement au thème actif du diaporama (`cli-dark`, `cli-light`, `google-blueprint-light` ou `slate-architect`), répercuter instantanément les bascules de thème déclenchées depuis le diaporama public ou la console, et maintenir la synchronisation du thème dans ses prévisualisations intégrées.

#### Scenario: Suivi automatique du thème du diaporama
- **WHEN** Le thème du diaporama est modifié (via la touche `T`, le paramètre URL `?theme=`, ou la sélection locale)
- **THEN** La console présentateur adapte immédiatement son habillage (`data-theme`), ses couleurs d'interface (fonds, cartes, textes, badges) et met à jour ses iframes de prévisualisation via `postMessage`.

#### Scenario: Bascule du thème depuis la console présentateur
- **WHEN** L'orateur clique sur le bouton de thème de l'en-tête de la console ou appuie sur la touche `T`
- **THEN** La console bascule entre les variantes claire et sombre de la famille active (`cli-light` ↔ `cli-dark`, ou `google-blueprint-light` ↔ `slate-architect`), et propage l'événement au diaporama public via `BroadcastChannel` et `localStorage`.