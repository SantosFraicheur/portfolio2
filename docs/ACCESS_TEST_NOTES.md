# Vérifications d’accès — 24 août 2026

Le hash `#rh` affiche bien un écran « Accès réservé » lorsque aucune session de démonstration n’est présente. L’écran propose les liens « Se connecter » et « Retour au site public ».

La route `/login` affiche le formulaire de connexion avec e-mail, mot de passe, création de compte et avertissement indiquant qu’il s’agit d’une démonstration frontend.

Le formulaire accepte les données de test non sensibles et crée une session de démonstration dans `sessionStorage`. Cette logique ne constitue pas une authentification réelle : elle devra être remplacée par une API et des permissions backend avant production.

La soumission du formulaire de démonstration redirige vers `#client` et affiche l’espace client. Avec cette session active, `#admin-principal` affiche la vue interne dédiée et indique que les permissions réelles devront être vérifiées côté backend.
