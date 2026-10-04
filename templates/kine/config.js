/*
 * CONFIGURATION DU SITE — modèle "Kiné"
 * --------------------------------------
 * Tout le contenu propre au client se trouve ici.
 * Laissez une valeur vide ("") ou une liste vide ([]) pour afficher
 * automatiquement un espace réservé visible du type "[vos tarifs ici]".
 * Les images sont cherchées dans le dossier ./images/ (nom du fichier seul).
 */
window.SITE = {
  // Identité
  name: "",                       // Nom du cabinet
  tagline: "Cabinet de kinésithérapie",
  practitioner: {
    name: "",
    title: "Kinésithérapeute",
    yearsExperience: "",          // ex. "20"
    qualifications: [],           // ex. ["Diplôme d'État de kinésithérapie", "..."]
    photo: "",                    // ex. "praticienne.jpg"
    video: "",                    // ex. "praticienne.mp4" (optionnel, remplace la photo)
    videoPoster: ""               // image affichée avant la lecture de la vidéo
  },

  // Couleurs (reprises du logo). "dark" = palette du mode sombre.
  colors: {
    primary: "#2f5d50",
    accent: "#d9cbb0",
    dark: { background: "#16241e", surface: "#1e3129", primary: "#d9cbb0", accent: "#8fb3a3" }
  },

  // Logos et icône
  logo: { light: "", dark: "" },  // logo affiché sur fond clair / sur fond sombre
  favicon: "",

  // Spécialités : une carte courte par spécialité
  specialties: [
    // { title: "Rééducation du dos", text: "Courte description." }
  ],

  // Le cabinet : photos des salles et du matériel
  cabinetPhotos: [
    // { file: "salle-1.jpg", caption: "Salle de rééducation" }
  ],
  cabinetPhotoSlots: 4,           // nombre d'emplacements affichés s'il n'y a pas encore de photos

  // Infos pratiques
  neighborhood: "",
  address: "",
  city: "Casablanca",
  mapEmbedUrl: "",                // URL d'intégration Google Maps (iframe src)
  mapLink: "",                    // lien "Ouvrir dans Google Maps"
  access: "",                     // accès / stationnement — laissez vide pour masquer
  homeVisits: { offered: null, area: "" }, // offered: true / false / null (inconnu)
  hours: [
    // { days: "Lundi – Vendredi", time: "09:00 – 18:00" },
  ],

  // Questions fréquentes (réponses = texte libre)
  faq: {
    prescription: "",
    sessionLength: "",
    insurance: "",
    extra: []                     // [{ q: "Question ?", a: "Réponse." }]
  },

  // Contact
  phone: "",                      // affichage, ex. "05 22 00 00 00"
  whatsapp: "",                   // format international sans + ni espaces, ex. "212600000000"
  whatsappMessage: "Bonjour, je souhaite prendre rendez-vous.",
  instagram: "",
  googleRating: { score: "", url: "" } // ex. score "4,8"
};
