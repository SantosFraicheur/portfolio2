# MKS Service — catalogue et demandes de devis

- [x] Définir le modèle d’une prestation et les rôles autorisés à la publier.
- [x] Afficher les prestations publiées sur la page publique.
- [x] Ajouter le bouton Demander un devis sur chaque prestation.
- [x] Bloquer la demande sans connexion et proposer inscription/connexion.
- [x] Ajouter le formulaire de devis dans l’espace client.
- [x] Ajouter une gestion de prestations dans les espaces responsable/admin.
- [x] Valider la publication et la demande en mode démonstration.
- [x] Sauvegarder un checkpoint et livrer l’archive mise à jour.

## Améliorations navigation et devis

- [x] Ajouter la recherche instantanée du catalogue.
- [x] Ajouter les filtres par catégorie.
- [x] Ajouter le tableau de suivi des demandes client.
- [x] Ajouter les statuts En attente, Validé et Refusé.
- [x] Ajouter le chargement animé à la soumission.
- [x] Ajouter la confirmation visuelle de succès.
- [x] Sauvegarder un nouveau checkpoint et livrer la mise à jour.

## Suivi avancé des demandes de devis

- [x] Rendre chaque demande cliquable avec une vue détaillée.
- [x] Ajouter le tri par date et par statut dans l’espace client.
- [x] Ajouter les actions Valider et Refuser dans les espaces administratifs.
- [x] Synchroniser les changements de statut entre admin et client.
- [x] Tester les parcours et créer un checkpoint.

## Livraison archive complète

- [x] Vérifier la présence des sources, de la documentation et des fichiers de configuration.
- [x] Exclure `.env`, `node_modules`, `dist`, `.git` et les logs temporaires.
- [x] Revalider le build avant l’archivage.
- [x] Créer et tester l’archive ZIP déployable.

## Design et contenu de la page publique

- [x] Clarifier le positionnement et la promesse dans le hero.
- [x] Renforcer les contenus des domaines et prestations.
- [x] Améliorer les appels à l’action vers le devis et le contact.
- [x] Ajouter des preuves de confiance sans inventer de témoignages.
- [x] Vérifier la lisibilité et le responsive.
- [x] Sauvegarder un checkpoint après livraison.

## Galerie, contact et recherche publique

- [x] Ajouter une galerie de réalisations avec visuels distincts.
- [x] Ajouter un formulaire de contact interactif avec message d’état.
- [x] Confirmer les coordonnées officielles MKS dans le contact.
- [x] Améliorer la recherche rapide et les animations du catalogue.
- [x] Vérifier le responsive et le build.
- [x] Sauvegarder un checkpoint après livraison.

## Modales galerie et validation contact

- [x] Ajouter les données détaillées de chaque réalisation.
- [x] Ajouter une modale accessible pour chaque projet.
- [x] Ajouter les filtres par catégorie de réalisations.
- [x] Ajouter la validation temps réel des champs contact.
- [x] Ajouter l’animation de confirmation d’envoi.
- [x] Valider le responsive, l’accessibilité et le build.
- [x] Sauvegarder un checkpoint après livraison.

## Catalogue full-stack administrable

- [x] Activer le mode full-stack avec base de données, authentification et stockage sécurisé.
- [x] Créer le schéma de données des prestations avec image, prix, description, catégorie et auteur.
- [x] Générer et appliquer la migration de base de données.
- [x] Ajouter les procédures publiques et admin protégées pour consulter, publier, modifier et retirer les prestations.
- [x] Ajouter le téléversement sécurisé des images avec validation de type et de taille.
- [x] Remplacer le catalogue localStorage de l’espace admin par les mutations backend.
- [x] Synchroniser le catalogue public avec la base de données.
- [x] Tester les permissions, les états de chargement/erreur, le build et le responsive.
- [x] Sauvegarder un checkpoint après livraison.

## Corrections de sécurisation full-stack

- [x] Supprimer le contournement sessionStorage de démonstration dans les accès client et admin.
- [x] Finaliser la connexion OAuth réelle dans le formulaire d’accès.
- [x] Ajouter la procédure d’édition d’une prestation côté serveur et dans l’espace admin.
- [x] Ajouter les tests explicites des permissions admin et utilisateur.
- [x] Revalider le responsive du formulaire admin et du catalogue public.

## Informations officielles de l’entreprise

- [x] Ajouter MKS SERVICE, Bénin · Cotonou, téléphone et e-mail dans le pied de page.
- [x] Ajouter une section structurée d’informations d’entreprise sans inventer d’IFU ou de RCCM.
- [x] Vérifier le rendu desktop/mobile et le build.
- [x] Sauvegarder un checkpoint après livraison.

## Base de données, contact et mentions légales

- [x] Vérifier et renforcer la configuration sécurisée de la base de données et de l’API.
- [x] Vérifier les liens cliquables téléphone et e-mail du pied de page.
- [x] Créer la page dédiée aux mentions légales avec les informations connues et les éléments à compléter.
- [x] Ajouter le lien Mentions légales dans le pied de page.
- [x] Tester le routage, les liens, le responsive et le build.
- [x] Sauvegarder un checkpoint après livraison.

## Recherche catalogue et contact WhatsApp

- [x] Ajouter ou renforcer la recherche instantanée du catalogue public.
- [x] Ajouter ou renforcer les filtres par catégorie du catalogue public.
- [x] Ajouter un état vide clair lorsque la recherche ne renvoie aucun produit.
- [x] Ajouter un bouton WhatsApp flottant global vers le contact officiel.
- [x] Vérifier la visibilité, l’accessibilité, le responsive et les destinations des liens.
- [x] Sauvegarder un checkpoint après livraison.

## Migration PostgreSQL et navigation catalogue

- [x] Restaurer le driver MySQL/TiDB comme base active.
- [x] Restaurer le schéma et les helpers DB MySQL/TiDB.
- [x] Générer et vérifier la migration PostgreSQL sans opération destructive.
- [x] Conserver le dossier PostgreSQL autonome et documenter la connexion future.
- [x] Ajouter le filtre par fourchette de prix.
- [x] Ajouter le tri par prix croissant et décroissant.
- [x] Créer une page de détail pour chaque prestation.
- [x] Ajouter les tests, vérifier le build et le responsive.
- [x] Ne pas exécuter la migration PostgreSQL sur la base active MySQL/TiDB.
- [ ] Revalider le catalogue public avec des prestations MySQL/TiDB réelles.
- [ ] Revalider le filtre min/max, le tri prix et la page détail avec données publiées.
- [x] Effectuer un contrôle responsive mobile spécifique du catalogue et de la page détail.
- [ ] Sauvegarder un checkpoint final après revalidation sur une prestation réelle.
- [x] Sauvegarder un checkpoint après livraison.

## Base PostgreSQL autonome

- [x] Créer un fichier SQL PostgreSQL séparé de la base active.
- [x] Documenter les tables, contraintes, index et procédure de connexion ultérieure.
- [x] Vérifier la syntaxe et l’absence d’opérations destructives.
- [x] Sauvegarder un checkpoint postérieur à la création du dossier PostgreSQL autonome.

## Correction WhatsApp officiel

- [x] Aligner le lien WhatsApp sur le numéro officiel MKS Service ou clarifier explicitement le numéro utilisé.
- [x] Revalider explicitement le lien WhatsApp et son rendu responsive.

## Contrôles correctifs avant clôture

- [x] Corriger ou documenter l’erreur runtime dotenv du serveur.
- [x] Renforcer concrètement la configuration DB/API ou documenter l’absence de changement supplémentaire requis.
- [x] Tester la page Mentions légales sur mobile.
- [x] Vérifier explicitement les liens tel, mailto et mentions légales.

## Repositionnement site entreprise MKS Service

- [x] Supprimer ou reformuler les références à un portfolio personnel dans les contenus visibles.
- [x] Renforcer la présentation institutionnelle de MKS Service et ses domaines d’activité.
- [x] Aligner les titres, métadonnées et appels à l’action sur une entreprise de services.
- [x] Effectuer un contrôle visuel desktop explicite de `/` et `/mentions-legales` après le repositionnement institutionnel.
- [x] Vérifier les tests et le build après ce contrôle desktop.
- [ ] Sauvegarder un checkpoint après la validation desktop finale du repositionnement MKS Service.
