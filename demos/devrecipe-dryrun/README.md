# Démo 5 : Lancement DevRecipe, préflight et choix

- **Acte associé :** Acte 4 (DevRecipe : fonctionnement)
- **Slide :** Slide 11 (Démo DevRecipe)
- **Durée cible :** 60 secondes. Le log défile : on ne lit pas chaque ligne. Le préflight prend plusieurs minutes : la commande est lancée avant la session, le journal est présenté ensuite.
- **Dépôt de référence :** [a-scolan/DevRecipe](https://github.com/a-scolan/DevRecipe).
- **Manifeste de démo :** profil `default`, avec `grep` (Scoop) et `java = "11"` (Mise). Le fichier exact n'est pas encore versionné dans `demos/` : à ajouter pour rejouer la démo à l'identique.

## Preuve visée

Le préflight signale un écart entre le manifeste et le poste : Mise déclare Java 11, alors que le poste a déjà Java 21.0.2 et 26.0.2. Une liste à cocher demande ce qui doit être forcé. Rien n'est coché par défaut. Après validation, DevRecipe installe, configure les shims et résume.

## Commande à exécuter

```powershell
.\DevRecipe_windows.ps1
```

Dans la liste : `Espace` coche `java`, `Tab` puis `Entrée` valident. Sans coche, `Entrée` valide une liste vide : rien n'est forcé.

## Comment lire le préflight

- `provider-conflict` : l'écart entre la version déclarée (`declared-version=11`) et les versions installées (`installed-version=21.0.2,26.0.2`).
- `evidence` : une ligne par trace trouvée, avec le chemin du fichier ou la clé registre.
- Les traces ne sont pas toutes pertinentes : `java-coffee-cup-logo.jpg.lnk` est un raccourci dont le nom est proche de `java`. DevRecipe le signale ; c'est à la personne de trancher.

## Sortie capturée

Journal fourni par l'auteur le 16 octobre 2026, à 11 h 55 (voir [raw-command-outputs.md](./raw-command-outputs.md), section 4c). Les passages coupés dans la slide sont indiqués par « ... ».

## Plan B

Le journal complet est dans `raw-command-outputs.md`, section 4c. Pour une démo sans attente, lancer la commande avant la session et afficher le log.