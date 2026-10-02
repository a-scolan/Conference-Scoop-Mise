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
- **Verbatim oral (25 s) :**
  > « Bonjour à toutes et à tous ! Bienvenue à ce quickie de 15 minutes. Aujourd'hui, on va parler d'un sujet qui nous concerne tous au quotidien quand on développe sous Windows en entreprise : comment installer, versionner et partager ses outils de dev sans jamais avoir besoin d'appeler la DSI ni d'ouvrir un ticket administrateur. »
- **Substance & Preuve :** Promesse d'autonomie complète en espace utilisateur.
- **Beat narratif :** Accroche bienveillante et promesse concrète.

### Slide 01 — Speaker
- **Fichier :** [presentation/src/slides/01-speaker.html](presentation/src/slides/01-speaker.html)
- **Action scénique :** Rythme vif, posture de praticien terrain.
- **Mots-clés :**
    - Alexis Scolan · Architecte technique onepoint
    - Créateur de DevRecipe · REX poste de travail
- **Verbatim oral (30 s) :**
  > « Je m'appelle Alexis Scolan, je suis architecte technique chez onepoint. J'accompagne des équipes de développement sur des postes Windows souvent très verrouillés par des politiques de sécurité strictes. Tout ce que je vous présente aujourd'hui est issu de retours d'expérience réels et de l'outil DevRecipe qu'on utilise pour fluidifier l'intégration des développeurs sur leurs projets. »
- **Substance & Preuve :** Crédibilité terrain et confrontation aux contraintes réelles.
- **Beat narratif :** Praticien parlant à des praticiens.

### Slide 02 — Les 4 erreurs du quotidien
- **Fichier :** [presentation/src/slides/02-les-4-erreurs.html](presentation/src/slides/02-les-4-erreurs.html)
- **Action scénique :** Faire lever la main dans la salle sur les messages affichés.
- **Mots-clés :**
    - UAC · Commande introuvable · Conflit de versions · Scripts Linux
    - Diagnostic partagé de la douleur
- **Verbatim oral (45 s) :**
  > « Levez la main si vous avez déjà vu au moins deux de ces quatre écrans : la fameuse popup UAC jaune demandant un compte admin le vendredi à 17h, la commande installée qui reste introuvable dans le terminal, le conflit de version Node entre deux projets, ou le script bash qui refuse de tourner sous Windows. On a tous perdu des heures entières là-dessus. »
- **Substance & Preuve :** 4 messages d'erreur textuels issus du vécu de chaque développeur.
- **Beat narratif :** Diagnostic partagé, connivence avec la salle.

### Slide 03 — La promesse
- **Fichier :** [presentation/src/slides/03-promesse.html](presentation/src/slides/03-promesse.html)
- **Action scénique :** Balayer les 4 réponses d'un geste clair de la main.
- **Mots-clés :**
    - Scoop (Espace utilisateur) · Mise (Projet) · Shims (PATH) · DevRecipe (PR)
- **Verbatim oral (40 s) :**
  > « La bonne nouvelle, c'est qu'il existe un écosystème moderne pour régler définitivement chacun de ces 4 points : Scoop pour installer sans admin dans son profil, Mise pour basculer automatiquement de version au changement de dossier, la maîtrise des relais pour dompter le PATH Windows, et DevRecipe pour formaliser tout ça dans une revue d'équipe. Voyons comment ça marche. »
- **Substance & Preuve :** Contrat de la conférence : 4 problèmes, 4 solutions.
- **Beat narratif :** Bascule du problème vers la solution.

### Slide 04 — Scoop : Le User Space
- **Fichier :** [presentation/src/slides/04-scoop-principe.html](presentation/src/slides/04-scoop-principe.html)
- **Action scénique :** Insister sur la simplicité des shims et l'absence d'élévation de privilèges.
- **Mots-clés :**
    - Scoop · Espace utilisateur · Zéro UAC · Shims (Relais) · Buckets Git
    - scoop.sh/#/apps · scoop bucket add · scoop search
    - « Mes outils s'installent dans mon profil, sans admin. »
- **Verbatim oral (60 s) :**
  > « Premier réflexe : Scoop. Contrairement aux installeurs traditionnels ou aux gestionnaires système, Scoop installe tout dans votre profil utilisateur, typiquement ~/scoop/apps. Aucun droit administrateur n'est requis. Pour trouver des paquets parmi des milliers d'outils, la commande 'scoop search' ou le site scoop.sh/#/apps liste l'ensemble de l'écosystème. Scoop s'appuie sur des dépôts Git appelés 'buckets' : on ajoute en une ligne les outils complémentaires avec 'scoop bucket add extras', ou le dépôt privé Git de votre entreprise. Et au quotidien, la maintenance est triviale : 'scoop update *' met tout à jour, et 'scoop hold' fige une version pour éviter les régressions. Première limite cependant : Scoop ne sait pas ce qui est déjà installé ailleurs sur votre machine. »
- **Substance & Preuve :** Démonstration du mécanisme d'isolation en espace utilisateur et première limite identifiée.
- **Beat narratif :** Découverte du premier pilier d'émancipation.

### Slide 05 — Démo Scoop
- **Fichier :** [presentation/src/slides/05-scoop-demo.html](presentation/src/slides/05-scoop-demo.html)
- **Action scénique :** Montrer l'exécution de la commande et la création instantanée du shim.
- **Mots-clés :**
    - scoop install · lazygit · where.exe · shim vérifié
- **Verbatim oral (50 s) :**
  > « Regardez en direct : je lance un simple 'scoop install lazygit' dans mon PowerShell standard. Scoop télécharge l'archive, vérifie son empreinte SHA256, extrait les binaires dans mon profil, et crée automatiquement le relais dans ~/scoop/shims/lazygit.exe. La commande where.exe le confirme immédiatement : lazygit est prêt à l'emploi, sans que Windows n'ait jamais demandé un mot de passe administrateur. »
- **Substance & Preuve :** Démo concrète d'installation sans popup UAC.
- **Beat narratif :** Preuve par l'exemple en direct.

### Slide 06 — Mise : Runtimes par projet
- **Fichier :** [presentation/src/slides/06-mise-principe.html](presentation/src/slides/06-mise-principe.html)
- **Action scénique :** Opposer la gestion globale manuelle et la gestion contextuelle par dossier.
- **Mots-clés :**
    - Mise · Runtimes polyglottes · mise.toml · env & tasks
    - mise.jdx.dev · mise registry · mise upgrade
    - « La version du runtime suit le projet, pas le poste. »
- **Verbatim oral (60 s) :**
  > « Maintenant qu'on a nos outils CLI, comment gère-t-on les langages ? Pendant des années, on a empilé nvm pour Node, pyenv pour Python, sdkman pour Java. Mise regroupe tout cela en un seul binaire écrit en Rust, ultra-performant. Pour explorer les langages et outils supportés, le site mise.jdx.dev et la commande 'mise registry' référencent l'ensemble des runtimes. On peut aussi déclarer des plugins ou backends personnalisés comme aqua ou npm directement dans son fichier. Le secret ? Un fichier 'mise.toml' placé à la racine du dépôt Git. Quand vous naviguez dans vos dossiers, Mise ajuste instantanément les versions de vos runtimes et vos variables d'environnement. Et pour les montées de versions : un simple 'mise upgrade'. Mais attention à sa limite sous Windows : Mise fonctionne grâce à un hook dans votre shell, mais il ne s'active pas dans cmd.exe ni pour les outils qui appellent directement des processus fils. »
- **Substance & Preuve :** Fichier de configuration déclaratif traçable dans Git et limite shell identifiée.
- **Beat narratif :** Deuxième pilier : fin du casse-tête multi-versions.

### Slide 07 — Démo Mise
- **Fichier :** [presentation/src/slides/07-mise-demo.html](presentation/src/slides/07-mise-demo.html)
- **Action scénique :** Pointer la commande 'cd' et le changement de version automatique de Node.
- **Mots-clés :**
    - cd projet · node --version · mise.toml · mise run dev
- **Verbatim oral (55 s) :**
  > « Démonstration : je suis dans projet-legacy, node --version m'affiche Node 18. Je fais simplement 'cd projet-moderne', et sans rien toucher, node --version bascule automatiquement sur Node 22.14. Mieux encore : la commande 'mise run dev' lit notre bloc [tasks] pour exécuter le serveur de dev avec les bonnes variables d'environnement. Tout est transparent et standardisé pour l'équipe. »
- **Substance & Preuve :** Bascule instantanée en 5 ms au changement de répertoire.
- **Beat narratif :** L'effet 'magique' mais robuste pour le développeur.

### Slide 08 — Le piège du PATH Windows
- **Fichier :** [presentation/src/slides/08-path-le-piege.html](presentation/src/slides/08-path-le-piege.html)
- **Action scénique :** Hausser le ton sur le piège HKLM vs HKCU, moment révélateur pour la salle.
- **Mots-clés :**
    - CreateEnvironmentBlock · HKLM avant HKCU · Masquage système
    - « Le PATH machine passe avant le PATH utilisateur. »
- **Verbatim oral (60 s) :**
  > « Mais attention, sous Windows, il y a un piège que beaucoup ignorent : la priorité du PATH. Lors de la création d'une session, Windows appelle CreateEnvironmentBlock qui applique une règle mathématique immuable : PATH effectif = PATH Machine (dans HKLM) suivi du PATH Utilisateur (dans HKCU). Si votre poste d'entreprise possède un vieux Python 3.9 système dans C:\Python39, vos versions modernes installées proprement en espace utilisateur seront silencieusement masquées ! Et ni Scoop ni Mise seuls ne peuvent modifier HKLM sans droits administrateur. »
- **Substance & Preuve :** Règle interne de Windows documentée et méconnue.
- **Beat narratif :** Révélation de l'obstacle caché.

### Slide 09 — Démo PATH
- **Fichier :** [presentation/src/slides/09-path-demo.html](presentation/src/slides/09-path-demo.html)
- **Action scénique :** Montrer la sortie de where.exe avant et après la parade des shims.
- **Mots-clés :**
    - where.exe · masquage identifié · AutoRun cmd · $env:PATH prepend
- **Verbatim oral (55 s) :**
  > « Observons ce masquage avec where.exe : le Python machine apparaît en première ligne, notre version Mise est ignorée en deuxième ligne. Pour contourner cette fatalité sans modifier HKLM, la solution consiste à préfixer nos shims au tout début du PATH de session : dans le profil PowerShell, et via la clé AutoRun de cmd.exe. Après injection, where.exe confirme que notre runtime moderne reprend immédiatement la priorité absolue. »
- **Substance & Preuve :** Inversion prouvée de l'ordre de résolution par injection en début de session.
- **Beat narratif :** Victoire technique sur la contrainte système.

### Slide 10 — DevRecipe : L'onboarding en PR
- **Fichier :** [presentation/src/slides/10-devrecipe-rex.html](presentation/src/slides/10-devrecipe-rex.html)
- **Action scénique :** Présenter DevRecipe comme le liant qui comble les limites de Scoop et Mise.
- **Mots-clés :**
    - DevRecipe · devrecipe.toml · Revue de code · Contrôle préalable · Précédence
    - « L'onboarding devient une commande relue en PR. »
- **Verbatim oral (60 s) :**
  > « Vous voyez le tableau : Scoop et Mise sont deux excellents outils, mais ils travaillent chacun de leur côté. Ni l'un ni l'autre ne vérifient si votre machine a déjà un outil en conflit, et aucun ne résout la priorité pour l'ensemble des terminaux. DevRecipe a été créé précisément pour combler ces trois manques : 1) un manifeste d'équipe unique qui réunit Scoop et Mise dans une Pull Request ; 2) un contrôle préalable ou 'preflight check' qui inspecte le registre et le PATH avant d'installer ; 3) l'injection automatique des shims en tête de PATH dans PowerShell ET dans cmd.exe via AutoRun. »
- **Substance & Preuve :** Justification claire du rôle de DevRecipe pour compléter la suite d'outils.
- **Beat narratif :** Synthèse d'ingénierie : passer des astuces isolées à une chaîne complète.

### Slide 11 — Démo DevRecipe
- **Fichier :** [presentation/src/slides/11-devrecipe-demo.html](presentation/src/slides/11-devrecipe-demo.html)
- **Action scénique :** Montrer le scan préalable et l'absence d'altération en simulation à blanc.
- **Mots-clés :**
    - devrecipe -Validate · -DryRun -Review · Bilan préalable · Simulation sans risque
- **Verbatim oral (50 s) :**
  > « Regardons le contrôle préalable : avant toute installation, DevRecipe inspecte le poste. Il détecte par exemple un vieux Git système déjà installé et émet un avertissement. Avec le commutateur -DryRun, il affiche le plan complet d'exécution sans toucher à votre machine. Zéro surprise, zéro régression, vous gardez la maîtrise intégrale de votre environnement. »
- **Substance & Preuve :** Démonstration d'audit préalable déterministe avant exécution.
- **Beat narratif :** Sérénité et professionnalisme de l'outillage.

### Slide 12 — Gouvernance & Sécurité
- **Fichier :** [presentation/src/slides/12-gouvernance.html](presentation/src/slides/12-gouvernance.html)
- **Action scénique :** Rassurer fermement sur la sécurité d'entreprise, désamorcer l'objection du 'Shadow IT'.
- **Mots-clés :**
    - Espace utilisateur != Shadow IT · EDR & AppLocker respectés · Dépôts approuvés · Audit
- **Verbatim oral (50 s) :**
  > « Une question revient souvent : est-ce que cette approche contourne la DSI ? Absolument pas. L'espace utilisateur respecte scrupuleusement les politiques de sécurité : l'EDR, l'antivirus et AppLocker restent 100 % actifs et bloqueront tout binaire suspect. Mieux : l'entreprise peut héberger son propre dépôt de paquets Git privé avec des manifests audités, et scoop export fournit un inventaire complet pour les revues de conformité. »
- **Substance & Preuve :** Compatibilité totale avec les règles de cybersécurité d'entreprise.
- **Beat narratif :** Légitimité institutionnelle et sérénité DSI.

### Slide 13 — Démarrer dès aujourd'hui
- **Fichier :** [presentation/src/slides/13-recap-action.html](presentation/src/slides/13-recap-action.html)
- **Action scénique :** Pointer la commande de démarrage en bas de slide, donner une impulsion d'action.
- **Mots-clés :**
    - 3 réflexes · Espace utilisateur d'abord · Mise dans le dépôt · irm get.scoop.sh
    - « Commencez dès aujourd'hui : une ligne de commande. »
- **Verbatim oral (40 s) :**
  > « Pour récapituler nos 3 règles d'or : 1) privilégiez l'espace utilisateur pour vos outils CLI, 2) versionnez vos runtimes dans vos dépôts avec Mise, et 3) surveillez la priorité de vos relais avec where.exe. Votre première action dès ce soir : une seule ligne PowerShell pour installer Scoop et Mise, et commencer à reprendre le contrôle de votre poste. »
- **Substance & Preuve :** Commande d'installation vérifiée exécutable immédiatement sans admin.
- **Beat narratif :** Passage à l'action immédiat.

### Slide 14 — Merci
- **Fichier :** [presentation/src/slides/14-merci.html](presentation/src/slides/14-merci.html)
- **Action scénique :** Pointer l'antisèche de commandes affichée à gauche, montrer le QR code à droite, ouvrir chaleureusement aux questions.
- **Mots-clés :**
    - Questions / Réponses · QR Code · scoop.sh/#/apps · mise.jdx.dev · Antisèche commandes
- **Verbatim oral (25 s) :**
  > « Merci infiniment pour votre attention ! Vous avez sur cette slide récapitulative l'antisèche des commandes essentielles, les deux annuaires pour piocher vos paquets — scoop.sh et mise.jdx.dev —, et comment brancher vos propres dépôts de recettes d'entreprise. Retrouvez l'intégralité du support et le code source via le QR code. Je suis à votre écoute pour toutes vos questions ! »
- **Substance & Preuve :** Antisèche de commandes concrètes et annuaires officiels directement projetés.
- **Beat narratif :** Clôture élégante et ouverture des échanges.
