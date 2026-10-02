# Démo 3 : Standardisation des variables et tâches avec Mise

- **Acte associé :** Acte 2 (Mise)
- **Slide :** Slide 07 (Démo Mise)
- **Durée cible :** 30 secondes
- **Prérequis :** Être positionné dans `demos/mise-per-project/projet-moderne`.

## Preuve visée
Montrer que `mise run <tâche>` injecte automatiquement les variables déclarées dans `[env]` sans dépendre de Makefile, de fichiers `.env` non versionnés ou de scripts bash incompatibles sous Windows.

## Commandes à exécuter

```powershell
cd demos\mise-per-project\projet-moderne

# 1. Lister les tâches déclarées pour le projet
mise tasks

# 2. Exécuter la tâche dev
mise run dev
```

## Sortie attendue

```text
Tasks:
dev  Serveur de développement moderne

[dev] API=http://localhost:8080 sous Node v22.14.0
```
