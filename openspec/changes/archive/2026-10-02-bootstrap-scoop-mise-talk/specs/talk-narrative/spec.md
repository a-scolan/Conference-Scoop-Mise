## Purpose

Définir la trame du quickie de 15 minutes « Installer ses outils de dev avec Scoop et Mise ». La trame fixe les actes, leur durée, le message clé de chacun et la promesse faite au public. Elle sert de référence aux slides, au déroulé orateur et aux démos.

## ADDED Requirements

### Requirement: Structure en actes chronométrés
Le talk SHALL suivre 6 actes dans cet ordre, avec un budget de temps par acte. La somme des budgets MUST être de 14 minutes, ce qui laisse 1 minute de marge.

| Acte | Contenu | Budget |
| --- | --- | --- |
| 0. Accroche | Les 4 messages d'erreur de l'abstract, mains levées | 1 min 30 |
| 1. Scoop | Installer en user space, sans UAC ; shims, buckets, export/import | 3 min |
| 2. Mise | Runtimes par projet : `mise.toml`, `[env]`, `[tasks]` | 3 min 30 |
| 3. PATH Windows | HKLM avant HKCU, shims masqués, correctifs | 2 min 30 |
| 4. DevRecipe | REX : manifeste TOML en PR, preflight, dry run, gouvernance | 2 min 30 |
| 5. Clôture | 3 messages à retenir, lien du support, QR feedback | 1 min |

#### Scenario: Répétition chronométrée
- **WHEN** l'orateur fait une répétition complète avec le chrono de la vue présentateur
- **THEN** la durée totale est entre 13 min 30 et 14 min 30
- **AND** aucun acte ne dépasse son budget de plus de 30 s

#### Scenario: Alignement du déroulé et des slides
- **WHEN** `npm run verify` est exécuté
- **THEN** chaque slide de `slides.json` a une entrée dans `deroule-conference-slides.md`, avec un titre identique et une durée de verbatim

### Requirement: Un message clé par acte
Chaque acte SHALL porter un seul message clé, formulé en une phrase. Le message clé MUST être visible sur au moins une slide de l'acte et repris dans les mots-clés du déroulé.

#### Scenario: Messages clés attendus
- **WHEN** le public quitte la salle
- **THEN** il peut restituer ces messages :
  - Scoop : « Mes outils s'installent dans mon profil, sans admin. »
  - Mise : « La version du runtime suit le projet, pas le poste. »
  - PATH : « Le PATH machine passe avant le PATH utilisateur. »
  - DevRecipe : « L'onboarding devient une commande relue en PR. »

### Requirement: Accroche fondée sur les 4 erreurs de l'abstract
L'acte 0 SHALL montrer les 4 messages de l'abstract (`UAC`, `Command not found`, `Required node version`, `only available on Linux`). Chaque message MUST être relié à l'acte qui le résout.

#### Scenario: Promesse de résolution
- **WHEN** l'acte 0 se termine
- **THEN** une slide associe chaque message à sa réponse : UAC → Scoop ; Command not found → shims et PATH ; Required node version → Mise ; only available on Linux → Mise (backends) et scripts multiplateformes

### Requirement: Cadre de gouvernance explicite
Le talk SHALL dire clairement que l'installation en user space ne sert pas à contourner la politique de sécurité de l'entreprise. Le cadre MUST citer au moins : buckets ou sources approuvés, EDR et AppLocker/WDAC qui restent actifs, proxy d'entreprise.

#### Scenario: Question « c'est du shadow IT ? »
- **WHEN** un participant demande si cette approche contourne la DSI
- **THEN** l'orateur répond avec une slide de gouvernance déjà prévue dans l'acte 4, et non par une improvisation

### Requirement: Clôture actionnable
L'acte 5 SHALL donner une première action faisable le jour même, le lien du support et un QR de feedback. Ces éléments MUST venir de `event.config.json`.

#### Scenario: Première action
- **WHEN** la slide de clôture est affichée
- **THEN** elle montre une commande de démarrage (`irm get.scoop.sh | iex`, puis `scoop install mise`) et l'URL du dépôt du talk
