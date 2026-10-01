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
