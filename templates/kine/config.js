/*
 * CONFIGURATION DU SITE — modèle "Kiné"
 * --------------------------------------
 * Tout le contenu propre au client se trouve ici. Les images vont dans ./images/
 * (indiquez seulement le nom du fichier).
 *
 * Champ vide ("") ou liste vide ([]) :
 *   - showPlaceholders: true  → un espace réservé visible s'affiche, ex. "[adresse exacte ici]"
 *   - showPlaceholders: false → l'élément (ou la section) est simplement masqué
 */
window.SITE = {
  showPlaceholders: true,

  // Identité
  name: "",                       // Nom du cabinet
  tagline: "Cabinet de kinésithérapie",
  practitioner: {
    name: "",
    title: "Kinésithérapeute",
    yearsExperience: "",          // ex. "15"
    qualifications: [],           // ex. ["Diplôme d'État de kinésithérapie", "..."]
    photo: "",                    // ex. "praticien.jpg" (format portrait 4:5 idéal)
    video: "",                    // ex. "presentation.mp4" (prioritaire sur la photo)
    videoPoster: ""               // image affichée avant la lecture
  },

  // Palette : green → greenLight = dégradé de fond, gold = titres (mode sombre), cream = texte (mode sombre)
  // En mode clair, le fond devient crème et les titres prennent le dégradé vert.
  colors: { green: "#123F36", greenLight: "#2A6B5C", gold: "#C49A45", cream: "#E8DCC4" },

  // Logo : symbole en SVG (utilise currentColor) — sinon logo.light (image) est utilisé
  logoMarkSvg: "",
  logo: { light: "", dark: "" },
  favicon: "",                    // vide = icône générée depuis logoMarkSvg

  // Spécialités. Icônes disponibles :
  // bone, spine, sport, neuro, lotus, lungs, drop, senior, hand
  specialties: [
    // { icon: "spine", title: "Douleurs du dos", text: "Courte description." }
  ],

  // Le cabinet : photos des salles et du matériel (la première est affichée en grand)
  cabinetPhotos: [
    // { file: "salle-1.jpg", caption: "Salle de rééducation" }
  ],
  cabinetPhotoSlots: 4,           // emplacements affichés sans photo (si showPlaceholders)

  // Infos pratiques
  neighborhood: "",
  address: "",
  city: "Casablanca",
  timeZone: "Africa/Casablanca",
  mapEmbedUrl: "",                // URL d'intégration Google Maps (src de l'iframe)
  mapLink: "",                    // lien "Itinéraire"
  access: "",                     // accès / stationnement — vide = masqué
  homeVisits: { offered: null, area: "" }, // offered : true / false / null (inconnu)
  // days : 0 = dimanche, 1 = lundi … 6 = samedi (sert au badge "Ouvert / Fermé")
  hours: [
    // { label: "Lundi – Vendredi", days: [1, 2, 3, 4, 5], open: "09:00", close: "18:00" },
    // { label: "Samedi – Dimanche", days: [6, 0], closed: true }
  ],
  insuranceShort: "",             // ex. "Toutes assurances" (points clés)

  // Questions fréquentes
  faq: {
    prescription: "",
    sessionLength: "",
    insurance: "",
    extra: []                     // [{ q: "Question ?", a: "Réponse." }]
  },

  // Contact
  phone: "",                      // affichage, ex. "05 22 00 00 00"
  whatsapp: "",                   // format international sans + ni espaces, ex. "212600000000"
  whatsappDisplay: "",            // affichage optionnel, ex. "06 00 00 00 00"
  whatsappMessage: "Bonjour, je souhaite prendre rendez-vous.",
  instagram: "",
  googleRating: { score: "", url: "" } // ex. score "4,8"
};
