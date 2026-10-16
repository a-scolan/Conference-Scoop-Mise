## MODIFIED Requirements

### Requirement: Cadre de gouvernance explicite
Le talk SHALL dire clairement que l'installation en user space ne sert pas à contourner la politique de sécurité de l'entreprise. Le cadre MUST citer au moins : buckets ou sources approuvés, EDR et AppLocker/WDAC, proxy d'entreprise. Le cadre MUST présenter AppLocker et WDAC comme des contrôles qui n'agissent que si la DSI déploie une stratégie ; une stratégie déployée peut bloquer les outils installés dans `%USERPROFILE%`, et la levée de ce blocage relève de la DSI (autorisation d'un chemin ou d'un éditeur), jamais de l'orateur. Le cadre MUST préciser que Scoop ne modifie pas la politique WDAC, et que la politique peut en revanche bloquer Scoop (scripts en Constrained Language Mode, binaires non signés dans un chemin utilisateur).

#### Scenario: Question « c'est du shadow IT ? »
- **WHEN** un participant demande si cette approche contourne la DSI
- **THEN** l'orateur répond avec une slide de gouvernance déjà prévue dans l'acte 4, et non par une improvisation

#### Scenario: Question « AppLocker ou WDAC bloquent-ils Scoop ? »
- **WHEN** un participant demande si une politique d'application empêche l'usage de Scoop
- **THEN** l'orateur explique qu'une politique déployée peut bloquer l'installation ou l'exécution, que Scoop n'en modifie pas les règles, et qu'une exception se demande à la DSI

## ADDED Requirements

### Requirement: Outils GNU en espace utilisateur dans l'acte Scoop
L'acte 1 SHALL dire que les outils GNU courants (`gcc`, `make`, `coreutils` avec bash, sed et awk) s'installent en espace utilisateur avec Scoop, sans installer MinGW à la main. Le talk MUST présenter ce point comme une réponse à l'erreur « scripts Linux / bash » de l'accroche, et MUST NOT affirmer que Scoop reproduit un environnement Linux complet.

#### Scenario: Question « les scripts bash marchent-ils ? »
- **WHEN** l'accroche « This script is only supported on Linux/macOS » a été projetée
- **THEN** l'acte 1 indique les paquets GNU installables avec Scoop et la limite (pas d'environnement Linux complet)

### Requirement: Affirmations vérifiables uniquement
Le déroulé, les slides et les notes SHALL ne contenir aucun chiffre de performance ni de durée qui n'ait été mesuré sur le poste de capture. Les formules absolues (« isolation totale », « zéro UAC », « règle immuable », « bloque tout ») MUST être remplacées par la formulation exacte du comportement observé.

#### Scenario: Relecture du déroulé
- **WHEN** `npm run verify` et une relecture manuelle sont effectués
- **THEN** aucun « 5 ms », « 15 secondes » ou formule absolue non vérifiée ne subsiste dans les slides ni dans le déroulé

### Requirement: Mécanisme Mise expliqué avant la démo
L'acte 2 SHALL expliquer sur une slide ou un bloc le choix de version : détection du `mise.toml` du dossier courant et de ses parents, déclenchement par le hook du shell à chaque `cd` et prompt, effet sur PATH, `[env]` et JAVA_HOME, et repli par shims pour `cmd.exe`. La démo qui suit MUST préciser que le fichier du dossier décide de la version.

#### Scenario: Question « pourquoi Mise change de JVM ? »
- **WHEN** la démo Mise montre `java -version` qui passe de 17 à 21
- **THEN** la slide indique que c'est le `mise.toml` du dossier courant qui fixe la version, et l'orateur peut citer le fichier

### Requirement: Commande unique d'installation
La slide de clôture SHALL donner une seule commande PowerShell pour installer Scoop puis Mise, sans sortie simulée. La commande MUST suivre la documentation officielle : `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`, puis `irm get.scoop.sh | iex`, puis `scoop install mise`. Elle MUST être présentée comme vérifiée contre la documentation, et non comme exécutée sur un poste vierge.

#### Scenario: Terminal de clôture
- **WHEN** la slide de clôture est affichée
- **THEN** le terminal montre la commande unique et aucune ligne de sortie

### Requirement: Fonctionnement DevRecipe sur une slide
L'acte 4 SHALL présenter DevRecipe sur une seule slide en quatre étapes : manifeste validé (`-Validate`), préflight en lecture seule (`-DryRun`), décision par action (`-Review`), environnement installé. La démo qui suit MUST reprendre ces étapes, sans redondance de slide.

#### Scenario: Slide DevRecipe avant la démo
- **WHEN** l'acte 4 commence
- **THEN** la slide « DevRecipe : fonctionnement » précède la slide « Démo DevRecipe » et ne répète pas son contenu