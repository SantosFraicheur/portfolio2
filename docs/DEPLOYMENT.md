# Déployer MKS Service

## Pré-requis

Le projet est une application frontend React/Vite. La version actuelle ne dépend pas d’une base de données et ne nécessite aucune variable secrète pour afficher l’architecture interactive.

## Installation locale

```bash
npm install
npm run check
npm run build
npm run dev
```

Le site local est ensuite disponible sur `http://localhost:3000`.

## Déploiement Render

Créez un **Static Site** connecté au dépôt GitHub du projet. Utilisez les paramètres suivants :

| Paramètre | Valeur |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist/public` |
| Pull request previews | Facultatif |
| Environment variables | Aucune pour cette version frontend |
|

Si Render est configuré en Web Service plutôt qu’en Static Site, utilisez `npm run build` comme commande de build et `npm start` comme commande de démarrage. Pour ce site purement frontend, le Static Site est préférable.

## Déploiement Railway

Créez un service depuis le dépôt GitHub et configurez :

```text
Build command: npm run build
Start command: npm start
```

Le fichier `server/index.ts` fourni par le template sert le dossier `dist/public` après compilation. Pour un hébergement statique Railway, vous pouvez également publier le dossier `dist/public` avec le fournisseur de votre choix.

## Contrôles avant publication

```bash
npm run check
npm run build
```

Vérifiez ensuite les sections suivantes dans le navigateur : l’architecture globale, les onglets des espaces métier, le processus de demande, la section sécurité et les liens de contact.

## Évolution vers la plateforme complète

La version actuelle est une démonstration frontend. Pour rendre les espaces réellement opérationnels, ajoutez une API backend, PostgreSQL, l’authentification et l’autorisation par rôle, un stockage privé pour les documents, un service de notifications et des journaux d’audit. Les données de démonstration présentes dans l’interface devront alors être remplacées par des réponses API validées côté serveur.
