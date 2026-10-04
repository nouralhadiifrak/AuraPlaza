/*
 * CONFIGURATION — Aura Plaza by Wafaa Jemrani
 * Modèle : templates/kine
 * Laissez une valeur vide ("") ou une liste vide ([]) pour afficher un espace réservé visible.
 */
window.SITE = {
  // Identité
  name: "Aura Plaza",
  tagline: "Cabinet de kinésithérapie",
  practitioner: {
    name: "Wafaa Jemrani",
    title: "Kinésithérapeute",
    yearsExperience: "20",
    qualifications: [],           // À compléter : diplômes et formations
    photo: "",                    // À ajouter dans ./images/
    video: "",                    // ex. "wafaa-jemrani.mp4" une fois la vidéo ajoutée dans ./images/
    videoPoster: ""
  },

  // Couleurs reprises du logo : vert profond + sable
  colors: {
    primary: "#254538",
    accent: "#d9cbb0",
    dark: { background: "#18302a", surface: "#203b32", primary: "#d9cbb0", accent: "#7fa593" }
  },

  logo: { light: "logo-clair.png", dark: "logo-sombre.png" },
  favicon: "favicon.png",

  // Spécialités — liste provisoire, à valider avec le cabinet
  specialties: [
    { title: "Rééducation orthopédique", text: "Après une fracture, une entorse, une luxation ou une opération (prothèse, ligaments, ménisque)." },
    { title: "Douleurs du dos et du cou", text: "Lombalgies, sciatiques, cervicalgies et troubles posturaux." },
    { title: "Rééducation du sportif", text: "Reprise après blessure musculaire, tendineuse ou articulaire." },
    { title: "Rééducation neurologique", text: "Accompagnement après un AVC ou en cas de maladie neurologique." },
    { title: "Rééducation périnéale", text: "Après l'accouchement ou en cas de troubles urinaires." },
    { title: "Kinésithérapie respiratoire", text: "Désencombrement bronchique et travail du souffle." },
    { title: "Drainage lymphatique", text: "Prise en charge des œdèmes et des jambes lourdes." },
    { title: "Rééducation de la personne âgée", text: "Équilibre, marche et prévention des chutes." }
  ],

  // Photos du cabinet — à ajouter dans ./images/
  cabinetPhotos: [
    // { file: "salle-1.jpg", caption: "Salle de rééducation" }
  ],
  cabinetPhotoSlots: 6,

  // Infos pratiques
  neighborhood: "Maârif",
  address: "400, boulevard Zerktouni, 3e étage",
  city: "Casablanca",
  mapEmbedUrl: "https://maps.google.com/maps?q=33.5995003,-7.6385892&z=17&output=embed",
  mapLink: "https://www.google.com/maps/place/centre+de+kin%C3%A9+plaza/@33.5995047,-7.6411641,629m/data=!3m2!1e3!4b1!4m6!3m5!1s0xda7d2f153638f9f:0x1fc223e5e85f72db!8m2!3d33.5995003!4d-7.6385892!16s%2Fg%2F11g6pgzmf1",
  access: "",                     // Volontairement non affiché
  homeVisits: { offered: true, area: "partout à Casablanca" },
  hours: [
    { days: "Lundi – Vendredi", time: "09:00 – 15:00" },
    { days: "Samedi – Dimanche", time: "Fermé" }
  ],

  // Questions fréquentes
  faq: {
    prescription: "Non, l'ordonnance n'est pas obligatoire : vous pouvez prendre rendez-vous directement. Si vous en avez une, apportez-la à la première séance.",
    sessionLength: "Une séance dure entre 30 et 45 minutes selon les soins.",
    insurance: "Tous les types d'assurance et de mutuelle sont acceptés.",
    extra: []
  },

  // Contact
  phone: "05 22 27 35 75",
  whatsapp: "212662217852",
  whatsappDisplay: "06 62 21 78 52",
  whatsappMessage: "Bonjour, je souhaite prendre rendez-vous au cabinet Aura Plaza.",
  instagram: "https://www.instagram.com/auraplazabywafaajemrani/",
  googleRating: {
    score: "4,8",
    url: "https://www.google.com/maps/place/centre+de+kin%C3%A9+plaza/@33.5995047,-7.6411641,629m/data=!3m2!1e3!4b1!4m6!3m5!1s0xda7d2f153638f9f:0x1fc223e5e85f72db!8m2!3d33.5995003!4d-7.6385892!16s%2Fg%2F11g6pgzmf1"
  }
};
