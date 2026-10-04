# Sites one-page — commerces locaux (Casablanca)

HTML, CSS et JavaScript simples : aucun framework, aucune étape de build.
Chaque site est un dossier statique qui s'ouvre en double-cliquant sur `index.html`.

```
templates/
  kine/          modèle cabinet de kinésithérapie
clients/
  aura-plaza/    Aura Plaza by Wafaa Jemrani (copie du modèle kine)
```

## Créer un nouveau client

1. Copier le dossier du modèle : `templates/kine` → `clients/<nom-du-client>`.
2. Modifier uniquement `config.js` (nom, praticien, couleurs, spécialités, horaires, adresse, contact…).
3. Déposer les photos, la vidéo et le logo dans `images/`, puis indiquer leurs noms de fichier dans `config.js`.

Tout champ laissé vide affiche un espace réservé visible du type `[adresse exacte ici]`.
S'il n'y a pas encore de photos, des blocs neutres sont affichés à la place.

## Fonctionnalités du modèle kiné

- Sections : accueil, spécialités, praticien, cabinet, infos pratiques, questions fréquentes, contact.
- Mode clair et mode sombre (selon l'appareil, avec un bouton pour changer).
- Formulaire de rendez-vous : choix de la spécialité, description du problème, envoi d'un message pré-rempli sur WhatsApp.
- Bouton WhatsApp fixe en bas de l'écran.
- Conçu d'abord pour un écran de 360 px, puis adapté au bureau. Images et carte chargées à la demande.
