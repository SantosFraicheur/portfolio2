# Déploiement du portfolio

## Vercel

Le projet est une application React/Vite avec une sortie de build dans `dist/public`. Le fichier `vercel.json` configure automatiquement l’installation avec pnpm, la commande `pnpm build`, le dossier de sortie et le fallback SPA nécessaire aux routes côté client.

Dans Vercel, importer le dépôt GitHub, laisser le framework `Vite` détecté, puis utiliser les paramètres suivants si Vercel les demande :

- Build command : `pnpm build`
- Output directory : `dist/public`
- Install command : `pnpm install --frozen-lockfile`

Les images, le logo et le CV sont inclus dans `client/public/assets/portfolio/` et référencés avec des chemins publics relatifs comme `/assets/portfolio/portfolio-hero-editorial.webp`. Ils sont donc versionnés avec le dépôt et ne dépendent pas d’un stockage interne Manus.

## Lovable

Lovable peut importer directement le dépôt GitHub et reconnaître la structure React/Vite. Aucun fichier propriétaire Lovable supplémentaire n’est nécessaire. Après import, vérifier que le script `build` est `pnpm build` et que le dossier de sortie est `dist/public`.

## CV

Le bouton CV utilise le fichier public `client/public/assets/portfolio/cv-metchri-jerome-serge.pdf`. Aucun remplacement d’URL n’est nécessaire après import sur Vercel ou Lovable.

## Vérifications avant publication

Exécuter `pnpm check`, `pnpm test` puis `pnpm build`. Vérifier également que les URLs `/assets/portfolio/*.webp`, `/assets/portfolio/laurel-mark.svg` et `/assets/portfolio/cv-metchri-jerome-serge.pdf` répondent avec un statut HTTP 200. Vérifier la page d’accueil, les routes client-side, le téléchargement du CV, le lien WhatsApp et le lien GitHub. Le profil GitHub public utilisé par le portfolio est `https://github.com/SantosFraicheur`. Le dépôt du projet est `https://github.com/SantosFraicheur/portfolio2`.
