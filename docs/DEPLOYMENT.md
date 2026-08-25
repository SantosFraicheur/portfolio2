# Déployer MKS Service

## Pré-requis

Le projet est une application React/Vite avec serveur Express, tRPC, authentification Manus OAuth, base MySQL/TiDB via Drizzle et stockage objet sécurisé pour les images. Un schéma PostgreSQL autonome est conservé séparément dans `database/postgresql/` pour une migration future optionnelle.

## Installation locale

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm dev
```

Le site local est ensuite disponible sur `http://localhost:3000`.

## Variables d’environnement

Configurez les variables secrètes dans l’environnement de l’hébergeur, sans créer ni committer de fichier `.env` contenant des valeurs de production. La plateforme fournit notamment `DATABASE_URL`, `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, ainsi que les variables du stockage intégré.

`DATABASE_URL` reste strictement côté serveur. Pour l’application active, utilisez l’URL MySQL/TiDB fournie par l’hébergeur avec TLS activé, un compte applicatif à privilèges limités et une base séparée de la base de développement. Le schéma PostgreSQL autonome n’est pas exécuté par l’application active. Ne placez jamais `DATABASE_URL`, `JWT_SECRET` ou une clé de stockage dans une variable `VITE_*`, car ces variables peuvent être intégrées au bundle client.

## Base de données et API

Le schéma Drizzle doit être généré puis appliqué avant le démarrage de la version de production :

```bash
pnpm drizzle-kit generate
pnpm db:push
```

Les appels du catalogue passent par les procédures tRPC. Les lectures publiques sont séparées des procédures administratives protégées par `adminProcedure`, avec validation Zod des champs. Les octets d’image ne sont pas stockés en base : seule la référence S3, l’URL et les métadonnées nécessaires sont conservées.

## Déploiement Render

Créez un **Web Service** connecté au dépôt GitHub du projet. Utilisez les paramètres suivants :

| Paramètre | Valeur |
|---|---|
| Build command | `pnpm build` |
| Start command | `pnpm start` |
| Variables obligatoires | `DATABASE_URL`, secrets OAuth et secrets système fournis par Manus |
| Base de données | MySQL/TiDB compatible avec Drizzle |

N’exposez pas le service de base de données publiquement. Activez TLS côté fournisseur et limitez les privilèges de l’utilisateur applicatif.

## Déploiement Railway

Créez un service depuis le dépôt GitHub et configurez :

```text
Build command: pnpm build
Start command: pnpm start
```

Ajoutez les variables d’environnement dans le panneau Railway. N’ajoutez jamais les secrets dans le dépôt ou dans le frontend.

## Contrôles avant publication

```bash
pnpm check
pnpm test
pnpm build
```

Vérifiez ensuite la page publique, les liens `tel:` et `mailto:`, la page `/mentions-legales`, le catalogue synchronisé, l’authentification OAuth et le refus des opérations admin pour un compte standard.

## Informations légales

Le schéma PostgreSQL autonome est disponible dans `database/postgresql/mks_service_schema.sql` et n’est pas appliqué à la base active MySQL/TiDB.

La page `/mentions-legales` affiche les informations officiellement fournies : **MKS SERVICE**, **Bénin · Cotonou**, **+229 01 61 75 10 53** et **mkservicegroupe23@gmail.com**. Les champs IFU et RCCM sont explicitement indiqués comme « À compléter » tant que les numéros officiels ne sont pas fournis.
