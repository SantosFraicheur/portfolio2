# MKS Service — Architecture métier intégrée

MKS Service est une interface frontend qui transforme le schéma d’architecture fourni en une expérience web interactive et responsive. Le site présente les six grands espaces de la plateforme : site principal, espace client, plateforme RH, gestion financière, espace employé et administration.

## Ce qui est inclus

La page principale comprend un noyau visuel des plateformes connectées, une sélection interactive des domaines métiers, le parcours complet de la demande à la facturation, la discussion intégrée, les contrôles de sécurité, une vue cockpit pour l’admin principal et un contact direct MKS Service.

La documentation fonctionnelle se trouve dans `docs/ARCHITECTURE_MKS_SERVICE.md`. Les instructions de déploiement se trouvent dans `docs/DEPLOYMENT.md`.

## Installation et développement

```bash
npm install
npm run check
npm run dev
```

Pour générer les fichiers de production :

```bash
npm run build
```

Le dossier frontend généré est `dist/public`.

## Architecture des fichiers

```text
client/
  public/
    mks-favicon.svg
  src/
    pages/Home.tsx          # présentation MKS Service et interactions métier
    App.tsx                 # route principale
    index.css               # design system et responsive
    components/ui/          # composants shadcn/ui du template
server/
  index.ts                  # serveur de preview/production du template
shared/
  const.ts
 docs/
  ARCHITECTURE_MKS_SERVICE.md
  DEPLOYMENT.md
```

## Limite importante

Cette version est un frontend de présentation et de démonstration. Elle ne crée pas encore d’utilisateurs, de commandes, de paiements, d’employés ou de mouvements financiers persistants. Pour la production métier, il faudra connecter une API backend, PostgreSQL, l’authentification, les permissions par rôle, le stockage privé des documents et les journaux d’audit.

## Déploiement

Pour Render Static Site, utilisez :

```text
Build command: npm run build
Publish directory: dist/public
```

Pour un Web Service ou Railway, utilisez `npm run build` puis `npm start` avec le serveur fourni par le template.
