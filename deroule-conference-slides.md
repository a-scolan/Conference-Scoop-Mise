# Déroulé de la conférence — Installer ses outils de dev avec Scoop et Mise (quickie 15 min)

Source : [presentation/src/slides/slides.json](presentation/src/slides/slides.json) compilé dans [presentation/public/presentation.html](presentation/public/presentation.html).

Ce fichier alimente la vue présentateur (`npm run build:deck` extrait chaque bloc `### Slide NN — Titre`).
Format strict des champs en gras requis pour la validation automatisée (`npm run verify`) :
- `Action scénique :`
- `Mots-clés :`
- `Verbatim oral (durée) :`
- `Substance & Preuve :`
- `Beat narratif :`

---

### Slide 00 — Titre
- **Fichier :** [presentation/src/slides/00-titre.html](presentation/src/slides/00-titre.html)
- **Action scénique :** Accueil de la salle, regard direct vers le public, attendre le calme avant de déclencher le chrono.
- **Mots-clés :**
    - Quickie 15 min · Outillage dev Windows
    - Scoop · Mise · DevRecipe · Espace Utilisateur
- **Verbatim oral (28 s) :**
  > « Bonjour à toutes et à tous ! Bienvenue à ce quickie de 15 minutes. Aujourd'hui, on va parler d'un sujet qui nous concerne tous au quotidien quand on développe sous Windows en entreprise : comment installer, versionner et partager ses outils de dev sans jamais avoir besoin d'appeler la DSI ni d'ouvrir un ticket administrateur. »
- **Substance & Preuve :** Promesse d'autonomie complète en espace utilisateur.
- **Beat narratif :** Accroche bienveillante et promesse concrète.

### Slide 01 — Speaker
- **Fichier :** [presentation/src/slides/01-speaker.html](presentation/src/slides/01-speaker.html)
- **Action scénique :** Rythme vif, posture de praticien terrain.
- **Mots-clés :**
    - Alexis Scolan · Architecte technique onepoint
    - Modernisations progressives · Pratiques de conception
- **Verbatim oral (36 s) :**
  > « Je m'appelle Alexis Scolan. Architecte technique, je mets mon bagage d'expertise à profit dans des modernisations progressives et judicieuses des systèmes et des pratiques de conception. Je travaille sur des postes Windows souvent très verrouillés par les politiques de sécurité, et ce que je vous présente vient de retours d'expérience réels, dont l'outil DevRecipe que j'ai créé pour l'onboarding des équipes. »
- **Substance & Preuve :** Crédibilité terrain, ancrée dans les contraintes réelles.
- **Beat narratif :** Praticien parlant à des praticiens.
### Slide 02 — Les 4 erreurs du quotidien
- **Fichier :** [presentation/src/slides/02-les-4-erreurs.html](presentation/src/slides/02-les-4-erreurs.html)
- **Action scénique :** Faire lever la main dans la salle sur les messages affichés.
- **Mots-clés :**
    - UAC · Commande introuvable · Conflit de versions · Scripts Linux
    - Diagnostic partagé de la douleur
- **Verbatim oral (31 s) :**
  > « Levez la main si vous avez déjà vu au moins deux de ces quatre écrans : la fameuse popup UAC jaune demandant un compte admin le vendredi à 17h, la commande installée qui reste introuvable dans le terminal, le conflit de version Node entre deux projets, ou le script bash qui refuse de tourner sous Windows. On a tous perdu des heures entières là-dessus. »
- **Substance & Preuve :** 4 messages d'erreur textuels issus du vécu de chaque développeur.
- **Beat narratif :** Diagnostic partagé, connivence avec la salle.

### Slide 03 — La promesse : déléguer le PATH et l'espace utilisateur, rendre l'équipe reproductible
- **Fichier :** [presentation/src/slides/03-promesse.html](presentation/src/slides/03-promesse.html)
- **Action scénique :** Balayer les réponses une à une, en les reliant à leur blocage.
- **Mots-clés :**
    - Scoop (Espace utilisateur) · Mise (Projet) · Shims (PATH) · Outils GNU · DevRecipe (équipe)
- **Verbatim oral (32 s) :**
  > « La bonne nouvelle, c'est qu'on peut déléguer ces tâches. Scoop prend en charge l'espace utilisateur, sans admin. Mise prend en charge les versions, et les relais du PATH qui vont avec. Pour les scripts Linux, Scoop fournit les outils GNU. Et DevRecipe rend le tout reproductible : le poste se décrit dans un manifeste, relu en revue d'équipe. Voyons comment ça marche. »
- **Substance & Preuve :** Contrat de la conférence : chaque réponse vise un blocage de la slide précédente (UAC, PATH, versions, scripts Linux) ; DevRecipe répond au besoin d'équipe.
- **Beat narratif :** Bascule du problème vers la solution.

### Slide 04 — Scoop : Le User Space
- **Fichier :** [presentation/src/slides/04-scoop-principe.html](presentation/src/slides/04-scoop-principe.html)
- **Action scénique :** Insister sur l'absence d'élévation pour ces paquets, et sur ce que Scoop ne contourne pas.
- **Mots-clés :**
    - Scoop · Espace utilisateur · Pas d'UAC pour Scoop · Shims (Relais) · Buckets Git
    - scoop.sh/#/apps · scoop bucket add · scoop search
    - « Mes outils s'installent dans mon profil, sans admin. »
- **Verbatim oral (109 s) :**
  > « Premier réflexe : Scoop. Contrairement aux installeurs traditionnels ou aux gestionnaires système, Scoop installe tout dans votre profil utilisateur, typiquement ~/scoop/apps. Aucun droit administrateur n'est requis pour ces paquets. Pour trouver des paquets parmi des milliers d'outils, la commande 'scoop search' ou le site scoop.sh/#/apps liste l'ensemble de l'écosystème. Scoop s'appuie sur des dépôts Git appelés 'buckets'. Le bucket principal ne suffit pas toujours : certains outils communautaires vivent dans 'extras'. On l'ajoute avec 'scoop bucket add extras'. En entreprise, ce peut être un dépôt privé approuvé par la DSI. Et au quotidien, la maintenance est triviale : 'scoop update *' met tout à jour, et 'scoop hold' fige une version pour éviter les régressions. Et ce n'est pas réservé aux petits outils : gcc, make et coreutils, qui fournit bash, sed et awk, s'installent aussi dans votre profil. Plus besoin de monter MinGW à la main pour compiler ou lancer un script shell : c'est ce qui rend l'outillage quasi natif pour les agents et les LLM en ligne de commande. Première limite cependant : Scoop ne sait pas ce qui est déjà installé ailleurs sur votre machine. »
- **Substance & Preuve :** Installation en espace utilisateur, buckets, et première limite identifiée.
- **Beat narratif :** Découverte du premier pilier d'émancipation.

### Slide 05 — Démo Scoop
- **Fichier :** [presentation/src/slides/05-scoop-demo.html](presentation/src/slides/05-scoop-demo.html)
- **Action scénique :** Lancer l'installation de git, sans commentaire sur le résultat.
- **Mots-clés :**
    - scoop install git
    - « Mes outils s'installent dans mon profil, sans admin. »
- **Verbatim oral (27 s) :**
  > « En direct, dans mon PowerShell standard : scoop install git. Scoop télécharge l'archive, vérifie son empreinte, l'extrait dans mon profil et crée le relais dans ~/scoop/shims. Aucune élévation n'a été demandée. Scoop ne regarde pas ce qui est déjà installé sur la machine : on verra ce point avec DevRecipe. »
- **Substance & Preuve :** Installation sans élévation dans le profil utilisateur.
- **Beat narratif :** Preuve par l'exemple, la limite est annoncée pour plus tard.

### Slide 06 — Mise : Runtimes par projet
- **Fichier :** [presentation/src/slides/06-mise-principe.html](presentation/src/slides/06-mise-principe.html)
- **Action scénique :** Dérouler le bloc « comment Mise choisit la version », point par point, sans démo.
- **Mots-clés :**
    - Mise · Runtimes polyglottes · mise.toml · env & tasks
    - Détection · Hook · Shims · cmd.exe
    - mise.jdx.dev · mise registry · mise upgrade
    - « La version du runtime suit le projet, pas le poste. »
- **Verbatim oral (68 s) :**
  > « Maintenant qu'on a nos outils CLI, comment gère-t-on les langages ? Pendant des années, on a empilé nvm pour Node, pyenv pour Python, sdkman pour Java. Mise regroupe cela dans un seul binaire écrit en Rust. Le principe tient en trois points. Un : Mise lit le mise.toml du dossier, puis ceux des dossiers parents. Deux : Mise s'accroche au shell, PowerShell, bash ou zsh. Le shell le relance après chaque commande et à chaque cd. Résultat : le PATH, les variables [env] et JAVA_HOME sont réglés pour ce dossier. Trois : cmd.exe n'a pas de hook. On ajoute alors le dossier des shims au PATH, et chaque shim appelle mise pour choisir la version. Pour les montées de version, un simple 'mise upgrade'. La limite à connaître : un IDE déjà ouvert garde l'environnement qu'il avait au lancement. »
- **Substance & Preuve :** Un fichier versionné, un hook, des shims. Le mécanisme tient en trois points, et sa limite shell est identifiée.
- **Beat narratif :** Deuxième pilier : fin du casse-tête multi-versions.

### Slide 07 — Démo Mise
- **Fichier :** [presentation/src/slides/07-mise-demo.html](presentation/src/slides/07-mise-demo.html)
- **Action scénique :** Pointer le mise.toml de chaque dossier : c'est lui qui décide de la JVM, pas le cd lui-même.
- **Mots-clés :**
    - cd projet · java -version · mise.toml · mise run dev
    - « Le fichier du dossier décide de la version. »
- **Verbatim oral (42 s) :**
  > « Démonstration : je suis dans projet-legacy. Mise lit son mise.toml, qui demande Java 17 : java -version affiche 17, et JAVA_HOME pointe sur ce runtime. Je fais cd projet-moderne. Le hook relance Mise, qui trouve le mise.toml de ce dossier, lequel demande Java 21 : java -version affiche 21, sans rien toucher. Et mise run dev lance la tâche avec les variables de [env] et le bon runtime. Tout est transparent pour l'équipe, parce que la version est dans le dépôt et non dans ma mémoire. »
- **Substance & Preuve :** Bascule de Java 17 à 21 au changement de répertoire, JAVA_HOME compris, pilotée par le mise.toml du dossier.
- **Beat narratif :** L'effet « magique », expliqué par un fichier qu'on peut lire.
### Slide 08 — Le piège du PATH Windows
- **Fichier :** [presentation/src/slides/08-path-le-piege.html](presentation/src/slides/08-path-le-piege.html)
- **Action scénique :** Hausser le ton sur le piège HKLM vs HKCU, moment révélateur pour la salle.
- **Mots-clés :**
    - CreateEnvironmentBlock · HKLM avant HKCU · Masquage système
    - « Le PATH machine passe avant le PATH utilisateur. »
- **Verbatim oral (52 s) :**
  > « Mais attention, sous Windows, il y a un piège que beaucoup ignorent : la priorité du PATH. Lors de la création d'une session, Windows assemble l'environnement : le PATH machine (dans HKLM) vient d'abord, suivi du PATH utilisateur (dans HKCU). C'est la fonction CreateEnvironmentBlock qui construit ce bloc. Si votre poste d'entreprise possède un vieux Python 3.9 système dans C:\Python39, vos versions modernes installées en espace utilisateur sont masquées dans un terminal ordinaire : where.exe le montre immédiatement. Et ni Scoop ni Mise seuls ne peuvent modifier HKLM sans droits administrateur. »
- **Substance & Preuve :** Ordre de fusion du PATH, souvent méconnu.
- **Beat narratif :** Révélation de l'obstacle caché.

### Slide 09 — Démo PATH
- **Fichier :** [presentation/src/slides/09-path-demo.html](presentation/src/slides/09-path-demo.html)
- **Action scénique :** Montrer where.exe avant et après : la commande redéfinit le PATH de la session, les shims Mise et Scoop passent en tête.
- **Mots-clés :**
    - where.exe · masquage identifié · PATH redéfini · AutoRun cmd
    - « Le PATH de la session est réordonné, HKLM reste intact. »
- **Verbatim oral (42 s) :**
  > « Sur le poste préparé pour cette démo, observons le masquage avec where.exe : le Python machine apparaît en première ligne, notre version Mise en deuxième. Pour compenser sans modifier HKLM, on redéfinit le PATH de la session : les shims Mise, puis ceux de Scoop, passent en tête, avant le reste du PATH. On fait de même dans le profil PowerShell, et via la clé AutoRun de cmd.exe. Après cette commande, where.exe confirme que notre runtime moderne passe devant, dans cette session. »
- **Substance & Preuve :** Inversion de l'ordre de résolution dans la session, sur le poste préparé. HKLM n'est pas modifié.
- **Beat narratif :** Compenser la contrainte.

### Slide 10 — DevRecipe : fonctionnement
- **Fichier :** [presentation/src/slides/10-devrecipe-rex.html](presentation/src/slides/10-devrecipe-rex.html)
- **Action scénique :** Dérouler les quatre étapes du diagramme, sans taper de commande.
- **Mots-clés :**
    - DevRecipe · DevRecipe_windows.toml · Préflight · Choix (cocher) · Environnement
    - « Le manifeste décrit le poste ; le préflight dit ce qui existe déjà. »
- **Verbatim oral (72 s) :**
  > « Scoop et Mise ne se parlent pas, et aucun des deux ne vérifie ce qui est déjà installé. DevRecipe ajoute une couche, en quatre étapes. Un : un manifeste, DevRecipe_windows.toml, relu en pull request, qui liste les paquets Scoop et les runtimes Mise par profil. -Validate contrôle la syntaxe. Deux : le préflight cherche les traces d'installations existantes dans le registre, AppX, les services et les tâches. Il ne modifie rien. Trois : votre choix. Si une installation existe, une liste s'affiche : vous cochez ce que vous voulez forcer, et rien n'est forcé par défaut. Sans terminal interactif, DevRecipe s'arrête. Quatre : l'environnement se monte, paquets Scoop, runtimes Mise, et les shims passent en tête de PATH dans PowerShell et dans cmd.exe. Dans la démo suivante, le poste a Java 21 et 26 alors que mon manifeste déclare Java 11 : je coche Java 11 et je force. »
- **Substance & Preuve :** Parcours du dépôt DevRecipe : validation, préflight en lecture seule, choix explicite par conflit, puis installation Scoop et Mise.
- **Beat narratif :** Donner le modèle mental avant de montrer la commande.

### Slide 11 — Démo DevRecipe
- **Fichier :** [presentation/src/slides/11-devrecipe-demo.html](presentation/src/slides/11-devrecipe-demo.html)
- **Action scénique :** Lancer `.\DevRecipe_windows.ps1`, puis laisser le log défiler. Ne pas lire chaque ligne : pointer la décision (liste à cocher, Java 11 coché) et l'avertissement de version.
- **Mots-clés :**
    - Préflight · provider-conflict · Java 21 et 26 déjà là · liste à cocher
    - « Le préflight signale, la décision reste humaine. »
- **Verbatim oral (51 s) :**
  > « Voici un lancement réel de DevRecipe, passages coupés. Je lance l'installation sans option. Le préflight compte deux paquets : grep, et java à la version 11. Pour Java, il trouve une conséquence : Mise déclare 11, mais le poste a déjà Java 21 et 26. C'est un conflit de versions entre le manifeste et ce qui est installé. Il me présente la liste à cocher : je coche java 11, je valide. Rien n'est forcé par défaut. Ensuite, DevRecipe installe grep, installe Java 11 avec Mise, configure les shims dans les shells, puis résume ce qui a été fait. Le préflight signale, c'est moi qui décide. »
- **Substance & Preuve :** Log réel de DevRecipe, dans un terminal qui défile. Le conflit est un écart de version Mise, plus parlant qu'une simple installation présente.
- **Beat narratif :** Sérénité : l'outil montre, l'humain décide.

### Slide 12 — Gouvernance & Sécurité
- **Fichier :** [presentation/src/slides/12-gouvernance.html](presentation/src/slides/12-gouvernance.html)
- **Action scénique :** Rassurer sans promettre : dire que ces contrôles n'existent que si la DSI les active, et désamorcer l'objection du 'Shadow IT'.
- **Mots-clés :**
    - Espace utilisateur != Shadow IT · EDR & AppLocker à négocier · Dépôts approuvés · Proxy · Audit
- **Verbatim oral (54 s) :**
  > « Une question revient souvent : est-ce que cette approche contourne la DSI ? Non. Scoop et Mise ne contournent aucune règle : l'EDR et l'antivirus restent actifs. AppLocker ou WDAC n'agissent que si la DSI a déployé une stratégie. Dans ce cas, un outil installé dans votre profil peut être bloqué, et la levée du blocage relève de la DSI : autoriser un chemin ou un éditeur précis. Sur les postes que j'ai utilisés, je n'ai pas eu ce blocage : c'est une vérification à faire avec votre DSI, pas une fatalité. Côté entreprise, un dépôt Git privé de manifests audités, un proxy configuré, et scoop export pour l'inventaire des revues de conformité. »
- **Substance & Preuve :** Compatibilité avec les règles de cybersécurité, y compris là où elles bloquent et doivent être négociées.
- **Beat narratif :** Légitimité institutionnelle et sérénité DSI.

### Slide 13 — Démarrer dès aujourd'hui
- **Fichier :** [presentation/src/slides/13-recap-action.html](presentation/src/slides/13-recap-action.html)
- **Action scénique :** Pointer la commande de démarrage en bas de slide, donner une impulsion d'action.
- **Mots-clés :**
    - 3 réflexes · Espace utilisateur d'abord · Mise dans le dépôt · irm get.scoop.sh
    - « Commencez dès aujourd'hui : une ligne de commande. »
- **Verbatim oral (31 s) :**
  > « Pour récapituler nos 3 règles d'or : 1) privilégiez l'espace utilisateur pour vos outils CLI, 2) versionnez vos runtimes dans vos dépôts avec Mise, et 3) surveillez la priorité de vos relais avec where.exe. Votre première action dès ce soir : une seule ligne PowerShell pour installer Scoop et Mise, et commencer à reprendre le contrôle de votre poste. »
- **Substance & Preuve :** Commande unique pour Scoop puis Mise, sans droits admin. Vérifiée contre la documentation officielle ; à rejouer sur un poste vierge avant la session.
- **Beat narratif :** Passage à l'action immédiat.

### Slide 14 — Merci
- **Fichier :** [presentation/src/slides/14-merci.html](presentation/src/slides/14-merci.html)
- **Action scénique :** Pointer l'antisèche de commandes à gauche, les liens Scoop, Mise et DevRecipe, puis les deux QR codes à droite (support à gauche, feedback à droite). Ouvrir aux questions.
- **Mots-clés :**
    - Questions / Réponses · QR Support · QR Feedback · scoop.sh · mise.jdx.dev · github.com/a-scolan/DevRecipe · Antisèche commandes
- **Verbatim oral (37 s) :**
  > « Merci infiniment pour votre attention ! Vous avez sur cette slide l'antisèche des commandes essentielles, et les trois liens à garder : scoop.sh et mise.jdx.dev pour piocher vos paquets et vos runtimes, et le dépôt DevRecipe pour brancher vos propres recettes d'entreprise. Retrouvez l'intégralité du support et le code source via le premier QR code, et donnez-moi votre avis via le second. Je suis à votre écoute pour toutes vos questions ! »
- **Substance & Preuve :** Antisèche de commandes concrètes, annuaires officiels et dépôt DevRecipe directement projetés.
- **Beat narratif :** Clôture élégante et ouverture des échanges.
