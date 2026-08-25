# Direction artistique — Portfolio professionnel

## Trois directions explorées

### 1. Atelier éditorial

**Very Brief Intro:** Un portfolio à l’esthétique magazine indépendante, tactile et calme, qui met le travail au premier plan avec une matière ivoire, une typographie de caractère et des compositions décalées.

**Probability:** 0.07

### 2. Signal brut

**Very Brief Intro:** Une direction plus expérimentale inspirée des affiches culturelles et des interfaces de studio, avec une structure monochrome, des annotations techniques et des accents orange signal.

**Probability:** 0.04

### 3. Chambre noire

**Very Brief Intro:** Une identité sombre et cinématographique pour présenter les projets comme des scènes, avec des contrastes profonds, des images pleine largeur et une navigation silencieuse.

**Probability:** 0.02

## Approche choisie — Atelier éditorial

### Design Movement

Néo-modernisme éditorial, à mi-chemin entre une revue indépendante, un portfolio de direction artistique et un carnet de fabrication numérique.

### Core Principles

1. **Le travail avant le décor :** les projets sont les preuves centrales, avec des légendes précises et des aperçus généreux.
2. **Asymétrie maîtrisée :** les blocs se décalent, les colonnes respirent et les rythmes évitent la grille uniforme.
3. **Matière calme, accent vif :** un fond ivoire et une encre presque noire donnent de la durée; un vert laurier devient la signature active.
4. **Le détail comme preuve :** chaque interaction, statut, numéro de projet et microcopie exprime méthode et exigence.

### Color Philosophy

La base ivoire évoque le papier d’édition et diminue la fatigue visuelle; l’encre brune-noire assure une lecture chaleureuse plutôt que clinique. Le vert laurier est la couleur propriétaire : il suggère la précision, la croissance et l’attention sans tomber dans le bleu technologique ou le violet générique. Un rouge argile très ponctuel signale les actions ou les moments de tension.

### Layout Paradigm

Une architecture en **ruban vertical** : une colonne latérale fixe nomme le portfolio et donne le contexte, tandis que le contenu défile en séquences éditoriales asymétriques. Les projets alternent une entrée manifeste, une fiche factuelle et une image de respiration. Sur mobile, la colonne devient une barre haute compacte et les décalages se transforment en empilement fluide.

### Signature Elements

- Une numérotation éditoriale `01—04` avec une ligne fine qui relie les sections.
- Des encadrés « rôle / stack / impact » traités comme des fiches de production, jamais comme des cartes génériques.
- Un curseur-boussole circulaire et une petite marque laurier utilisés avec parcimonie pour les points d’attention.

### Interaction Philosophy

Les interactions doivent être sobres et intentionnelles : un lien se souligne comme une annotation, une image se décale de quelques pixels comme une feuille que l’on saisit, et un bouton confirme son action par une pression courte. Aucun effet ne doit ralentir la lecture ou masquer le contenu.

### Animation

Les entrées utilisent un fondu et une translation verticale de 12 à 20 px, en 420 ms avec une courbe `cubic-bezier(0.23, 1, 0.32, 1)`. Les listes sont décalées de 50 ms par élément. Les survols de projets font glisser l’image de 1.015 et révèlent une légende; les transitions restent sous 260 ms. Les animations non essentielles sont désactivées pour `prefers-reduced-motion: reduce`.

### Typography System

- **Titres :** `DM Serif Display`, italique utilisé seulement pour les mots de positionnement.
- **Texte et interface :** `Manrope`, avec des graisses 400, 600 et 700.
- **Métadonnées :** `IBM Plex Mono`, en petites capitales simulées et espacement augmenté.
- **Hiérarchie :** titres hero 72–112 px desktop, titres de section 42–64 px, texte courant 16–18 px avec une largeur de 62 caractères maximum.

### Brand Essence

**Positionnement :** un portfolio de développeur-créateur pour des marques et produits qui veulent une présence numérique précise, sensible et réellement construite.

**Personnalité :** précis, calme, curieux.

### Brand Voice

Les titres sont courts, assurés et concrets. Les CTA invitent à examiner ou à échanger plutôt qu’à « commencer ». La microcopie indique le contexte et l’état sans exagération.

Exemples :

- « Des interfaces qui savent pourquoi elles existent. »
- « Voir le projet, de l’intention jusqu’au dernier détail. »

### Wordmark & Logo

Le wordmark utilise une composition typographique personnalisée avec `LUMIÈRE / STUDIO` en capitales fines et une barre oblique comme signe de méthode. Le symbole est une feuille de laurier géométrique formée de deux arcs asymétriques, sans texte, conçue pour fonctionner comme favicon et repère de navigation.

### Signature Brand Color

**Laurel Signal — `#587A68`**. Un vert sourd, botanique et contemporain, assez distinctif pour signer les actions et les liens sans prendre le dessus sur les projets.

## Style Decisions

- Le portfolio doit privilégier une sensation de revue indépendante plutôt qu’un dashboard SaaS.
- Les visuels projet sont des preuves de travail, pas des décorations répétées.
- Les données textuelles incomplètes doivent être formulées prudemment et rester éditables.
- La couleur `#587A68` est réservée aux liens actifs, badges de statut et petits repères de navigation.
