# Base PostgreSQL autonome — MKS Service

Ce dossier contient une base PostgreSQL indépendante de la base actuellement configurée dans l’environnement. Le script `mks_service_schema.sql` crée les tables `users` et `services`, l’énumération des rôles, les contraintes d’intégrité et les index du catalogue.

## Exécution contrôlée

N’exécutez le script que sur une base PostgreSQL dédiée, après avoir vérifié la cible et effectué une sauvegarde si elle contient déjà des données :

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f database/postgresql/mks_service_schema.sql
```

Le fichier utilise `CREATE TABLE IF NOT EXISTS`, ne contient aucun `DROP TABLE`, et ne doit pas être appliqué à l’ancienne base `mysql://`. La commande nécessite une URL `postgres://` ou `postgresql://`, idéalement avec `sslmode=require`.

## Connexion de l’application

Après création et vérification de la base, configurez `DATABASE_URL` dans les secrets de l’hébergeur. L’application utilise alors le driver `pg` et Drizzle PostgreSQL côté serveur. Ne placez jamais cette URL dans une variable `VITE_*`, dans le frontend ou dans le dépôt Git.

Le champ `price_amount` est prévu pour les filtres et tris numériques. `price_label` conserve l’affichage commercial, par exemple `À partir de 100 000 FCFA` ou `Sur devis`. Les fichiers image restent dans le stockage objet sécurisé ; la base conserve uniquement `image_key` et `image_url`.

## Vérifications recommandées

Vérifiez que la connexion cible bien PostgreSQL, que les tables existent et que l’utilisateur applicatif possède uniquement les privilèges nécessaires. Testez ensuite la publication admin, la lecture publique, le filtre de prix, le tri et la page de détail avant de basculer définitivement l’environnement de production.
