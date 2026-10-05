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

Champs vides : avec `showPlaceholders: true`, un espace réservé visible s'affiche (ex. `[adresse exacte ici]`) ;
avec `showPlaceholders: false`, l'élément ou la section est masqué proprement (ex. la section « Le cabinet » sans photos).

## Partager un aperçu (un seul fichier)

Facultatif : `python3 tools/apercu-fichier-unique.py clients/aura-plaza aura-plaza-apercu.html`
regroupe le site en un seul fichier HTML, pratique à ouvrir sur un téléphone ou à envoyer par WhatsApp.

## Fonctionnalités du modèle kiné

- Sections : accueil plein écran, points clés, spécialités (avec icônes), praticien, cabinet, infos pratiques, questions fréquentes, contact.
- Mode clair et mode sombre (selon l'appareil, avec un bouton pour changer). Couleurs reprises du logo.
- Badge « Ouvert / Fermé » calculé à l'heure de Casablanca à partir des horaires.
- Menu plein écran sur mobile, animations discrètes (désactivées si l'appareil le demande).
- Formulaire de rendez-vous : choix de la spécialité, description du problème, envoi d'un message pré-rempli sur WhatsApp.
- Bouton WhatsApp fixe en bas de l'écran.
- Conçu d'abord pour un écran de 360 px, puis adapté au bureau. Images et carte chargées à la demande.
