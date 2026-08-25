# Déploiement du portfolio

## Vercel

Le projet est une application React/Vite avec une sortie de build dans `dist/public`. Le fichier `vercel.json` configure automatiquement l’installation avec pnpm, la commande `pnpm build`, le dossier de sortie et le fallback SPA nécessaire aux routes côté client.

Dans Vercel, importer le dépôt GitHub, laisser le framework `Vite` détecté, puis utiliser les paramètres suivants si Vercel les demande :

- Build command : `pnpm build`
- Output directory : `dist/public`
- Install command : `pnpm install --frozen-lockfile`

Le portfolio actuel utilise des assets persistants référencés par leurs chemins `/manus-storage/...`. Pour un déploiement indépendant de Manus, ces assets devront être remplacés par des fichiers hébergés sur un stockage public ou par le système d’assets de la plateforme cible.

## Lovable

Lovable peut importer directement le dépôt GitHub et reconnaître la structure React/Vite. Aucun fichier propriétaire Lovable supplémentaire n’est nécessaire. Après import, vérifier que le script `build` est `pnpm build` et que le dossier de sortie est `dist/public`.

## CV

Le bouton CV utilise un asset persistant généré après validation du document. Si le projet est déployé hors de Manus, remplacer le chemin `/manus-storage/...pdf` par l’URL publique du PDF hébergé sur la plateforme cible.

## Vérifications avant publication

Exécuter `pnpm check` puis `pnpm build`. Vérifier la page d’accueil, les routes client-side, le téléchargement du CV, le lien WhatsApp et le lien GitHub. Le profil GitHub public utilisé par le portfolio est `https://github.com/SantosFraicheur`. Le dépôt du projet est `https://github.com/SantosFraicheur/portfolio2`.
