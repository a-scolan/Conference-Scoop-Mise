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
    - Scoop · Mise · DevRecipe
- **Verbatim oral (25 s) :**
  > « Bonjour à toutes et à tous ! Bienvenue à ce quickie de 15 minutes. Aujourd'hui, on va parler d'un sujet qui nous concerne tous au quotidien quand on développe sous Windows en entreprise : comment installer, versionner et partager ses outils de dev sans jamais avoir besoin d'appeler la DSI ni d'ouvrir un ticket administrateur. »
- **Substance & Preuve :** Promesse d'autonomie complète en User Space.
- **Beat narratif :** Accroche bienveillante et promesse concrète.

### Slide 01 — Speaker
- **Fichier :** [presentation/src/slides/01-speaker.html](presentation/src/slides/01-speaker.html)
- **Action scénique :** Rythme vif, posture de praticien terrain.
- **Mots-clés :**
    - Alexis Scolan · Architecte technique onepoint
    - Créateur de DevRecipe
- **Verbatim oral (30 s) :**
  > « Je m'appelle Alexis Scolan, je suis architecte technique chez onepoint. J'accompagne des équipes de développement sur des postes Windows souvent très verrouillés par des politiques de sécurité strictes. Tout ce que je vous présente aujourd'hui est issu de retours d'expérience réels et de l'outil DevRecipe qu'on utilise pour fluidifier l'onboarding des développeurs. »
- **Substance & Preuve :** Crédibilité terrain et confrontation aux contraintes réelles.
- **Beat narratif :** Praticien parlant à des praticiens.

### Slide 02 — Les 4 erreurs du quotidien
- **Fichier :** [presentation/src/slides/02-les-4-erreurs.html](presentation/src/slides/02-les-4-erreurs.html)
- **Action scénique :** Faire lever la main dans la salle sur les messages affichés.
- **Mots-clés :**
    - UAC · Command not found · Conflit de versions · Linux only
    - Identification immédiate de la douleur
- **Verbatim oral (45 s) :**
  > « Levez la main si vous avez déjà vu au moins deux de ces quatre écrans : la fameuse popup UAC jaune demandant un compte admin le vendredi à 17h, la commande installée qui reste introuvable dans le terminal, le conflit de version Node entre deux projets, ou le script bash qui refuse de tourner sous Windows. On a tous perdu des heures entières là-dessus. »
- **Substance & Preuve :** 4 messages d'erreur textuels issus du vécu de chaque développeur.
- **Beat narratif :** Diagnostic partagé, connivence avec la salle.

### Slide 03 — La promesse
- **Fichier :** [presentation/src/slides/03-promesse.html](presentation/src/slides/03-promesse.html)
- **Action scénique :** Balayer les 4 réponses d'un geste clair de la main.
- **Mots-clés :**
    - Scoop (User Space) · Mise (Projet) · Shims (PATH) · DevRecipe (PR)
- **Verbatim oral (40 s) :**
  > « La bonne nouvelle, c'est qu'il existe un écosystème moderne pour régler définitivement chacun de ces 4 points : Scoop pour installer sans admin dans son profil, Mise pour switcher automatiquement de version au 'cd', la maîtrise des shims pour dompter le PATH Windows, et DevRecipe pour formaliser tout ça dans une Pull Request relue en équipe. Voyons comment ça marche. »
- **Substance & Preuve :** Contrat de la conférence : 4 problèmes, 4 solutions.
- **Beat narratif :** Bascule du problème vers la solution.

### Slide 04 — Scoop : Le User Space
- **Fichier :** [presentation/src/slides/04-scoop-principe.html](presentation/src/slides/04-scoop-principe.html)
- **Action scénique :** Insister sur la simplicité des shims et l'absence d'élévation de privilèges.
- **Mots-clés :**
    - Scoop · User Space · Zéro UAC · Shims · Buckets Git
    - « Mes outils s'installent dans mon profil, sans admin. »
- **Verbatim oral (60 s) :**
  > « Premier réflexe : Scoop. Contrairement aux installeurs traditionnels ou aux gestionnaires système, Scoop part d'un principe radical : installer vos outils dans votre dossier utilisateur, typiquement ~/scoop/apps. Aucun droit administrateur n'est requis. Pour rendre les exécutables disponibles partout, Scoop utilise des 'shims', des petits proxys légers regroupés dans un dossier unique ajouté à votre PATH utilisateur. Et les paquets viennent de simples manifests JSON hébergés sur Git. »
- **Substance & Preuve :** Démonstration du mécanisme d'isolation en espace utilisateur.
- **Beat narratif :** Découverte du premier pilier d'émancipation.

### Slide 05 — Démo Scoop
- **Fichier :** [presentation/src/slides/05-scoop-demo.html](presentation/src/slides/05-scoop-demo.html)
- **Action scénique :** Montrer l'exécution de la commande et la création instantanée du shim.
- **Mots-clés :**
    - scoop install · lazygit · where.exe · shim vérifié
- **Verbatim oral (50 s) :**
  > « Regardez en direct : je lance un simple 'scoop install lazygit' dans mon PowerShell standard. Scoop télécharge l'archive, vérifie son empreinte SHA256, extrait les binaires dans mon profil, et crée automatiquement le shim dans ~/scoop/shims/lazygit.exe. La commande where.exe le confirme immédiatement : lazygit est prêt à l'emploi, sans que Windows n'ait jamais demandé un mot de passe administrateur. »
- **Substance & Preuve :** Démo concrète d'installation sans popup UAC.
- **Beat narratif :** Preuve par l'exemple en direct.

### Slide 06 — Mise : Runtimes par projet
- **Fichier :** [presentation/src/slides/06-mise-principe.html](presentation/src/slides/06-mise-principe.html)
- **Action scénique :** Opposer la gestion globale manuelle et la gestion contextuelle par dossier.
- **Mots-clés :**
    - Mise · Runtimes polyglottes · mise.toml · env & tasks
    - « La version du runtime suit le projet, pas le poste. »
- **Verbatim oral (60 s) :**
  > « Maintenant qu'on a nos outils CLI, comment gère-t-on les langages ? Pendant des années, on a empilé nvm pour Node, pyenv pour Python, sdkman pour Java. Mise regroupe tout cela en un seul binaire écrit en Rust, ultra-performant. Le secret ? Un fichier 'mise.toml' placé à la racine du dépôt Git. Quand vous naviguez dans vos dossiers, Mise ajuste instantanément les versions de vos runtimes et vos variables d'environnement, sans aucune friction. »
- **Substance & Preuve :** Fichier de configuration déclaratif traçable dans Git.
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
    - CreateEnvironmentBlock · HKLM avant HKCU · Shadowing · Masquage
    - « Le PATH machine passe avant le PATH utilisateur. »
- **Verbatim oral (60 s) :**
  > « Mais attention, sous Windows, il y a un piège que beaucoup ignorent : la priorité du PATH. Lors de la création d'une session, Windows appelle CreateEnvironmentBlock qui fusionne toujours le PATH Machine (dans HKLM) AVANT le PATH Utilisateur (dans HKCU). Si votre poste d'entreprise a un vieux Python système ou un vieux Git déployé dans C:\Python, vos shims utilisateur seront silencieusement masqués ! »
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
- **Action scénique :** Présenter DevRecipe comme le liant d'industrialisation d'équipe.
- **Mots-clés :**
    - DevRecipe · devrecipe.toml · Code Review · Preflight · Dry-Run
    - « L'onboarding devient une commande relue en PR. »
- **Verbatim oral (55 s) :**
  > « Pour ne pas demander à chaque nouvel arrivant d'exécuter ces étapes à la main, nous avons créé DevRecipe. C'est un orchestrateur open-source léger. Dans devrecipe.toml, vous déclarez vos paquets Scoop, vos runtimes Mise, vos profils. Le gros avantage ? Quand un projet a besoin d'un nouvel outil, le dev fait une Pull Request sur le manifeste. Ses pairs la relisent, la valident, et toute l'équipe met à jour son poste en une seule commande. »
- **Substance & Preuve :** Retour d'expérience d'industrialisation collaborative.
- **Beat narratif :** Passage de l'astuce individuelle à la pratique d'équipe.

### Slide 11 — Démo DevRecipe
- **Fichier :** [presentation/src/slides/11-devrecipe-demo.html](presentation/src/slides/11-devrecipe-demo.html)
- **Action scénique :** Montrer le scan preflight et l'absence d'altération en mode dry-run.
- **Mots-clés :**
    - devrecipe -Validate · -DryRun -Review · Preflight scan · 0 surprise
- **Verbatim oral (50 s) :**
  > « Regardons le preflight check : avant toute installation, DevRecipe inspecte le poste. Il détecte par exemple un vieux Git système déjà installé et émet un avertissement. Avec le commutateur -DryRun, il affiche le plan complet d'exécution sans toucher à votre machine. Zéro surprise, zéro régression, vous gardez la maîtrise intégrale de votre environnement. »
- **Substance & Preuve :** Preflight déterministe avec rapport d'impact avant exécution.
- **Beat narratif :** Sérénité et professionnalisme de l'outillage.

### Slide 12 — Gouvernance & Sécurité
- **Fichier :** [presentation/src/slides/12-gouvernance.html](presentation/src/slides/12-gouvernance.html)
- **Action scénique :** Rassurer fermement sur la sécurité d'entreprise, désamorcer l'objection du 'Shadow IT'.
- **Mots-clés :**
    - User Space != Shadow IT · EDR & AppLocker respectés · Buckets approuvés · Audit
- **Verbatim oral (50 s) :**
  > « Une question revient souvent : est-ce que cette approche contourne la DSI ? Absolument pas. L'espace utilisateur respecte scrupuleusement les politiques de sécurité : l'EDR, l'antivirus et AppLocker restent 100 % actifs et bloqueront tout binaire suspect. Mieux : l'entreprise peut héberger son propre bucket Git privé avec des manifests audités, et scoop export fournit un inventaire complet pour les revues de conformité. »
- **Substance & Preuve :** Compatibilité totale avec les règles de cybersécurité d'entreprise.
- **Beat narratif :** Légitimité institutionnelle et sérénité DSI.

### Slide 13 — Démarrer dès aujourd'hui
- **Fichier :** [presentation/src/slides/13-recap-action.html](presentation/src/slides/13-recap-action.html)
- **Action scénique :** Pointer la commande de démarrage en bas de slide, donner une impulsion d'action.
- **Mots-clés :**
    - 3 réflexes · User Space first · Mise dans le repo · irm get.scoop.sh
    - « Commencez dès aujourd'hui : une ligne de commande. »
- **Verbatim oral (40 s) :**
  > « Pour récapituler : adoptez le User Space pour tous vos outils en ligne de commande, versionnez vos runtimes dans vos dépôts avec Mise, et surveillez la priorité de vos shims. Votre première action dès ce soir : une seule ligne PowerShell pour installer Scoop et Mise, et commencer à vous simplifier la vie. »
- **Substance & Preuve :** Commande d'installation vérifiée exécutable immédiatement sans admin.
- **Beat narratif :** Passage à l'action immédiat.

### Slide 14 — Merci
- **Fichier :** [presentation/src/slides/14-merci.html](presentation/src/slides/14-merci.html)
- **Action scénique :** Afficher le QR code, remercier la salle, inviter chaleureusement aux questions.
- **Mots-clés :**
    - Questions / Réponses · QR Code · Support complet en ligne
- **Verbatim oral (20 s) :**
  > « Merci infiniment pour votre attention ! Retrouvez l'intégralité du support de présentation, les manifests et le code source via le QR code affiché à l'écran. Je suis à votre écoute pour toutes vos questions ! »
- **Substance & Preuve :** Support et ressources disponibles en ligne immédiatement.
- **Beat narratif :** Clôture élégante et ouverture des échanges.
