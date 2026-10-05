/*
 * CONFIGURATION — Aura Plaza by Wafaa Jemrani
 * Modèle : templates/kine (voir ce fichier pour la description de chaque champ)
 */
window.SITE = {
  // false = ce qui manque est masqué (pas de "[...]") — passer à true pour voir les manques
  showPlaceholders: false,

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

  // Palette : dégradé #123F36 → #2A6B5C, titres or #C49A45, texte crème #E8DCC4 (mode sombre)
  // En mode clair : fond crème, titres en dégradé vert
  colors: { green: "#123F36", greenLight: "#2A6B5C", gold: "#C49A45", cream: "#E8DCC4" },

  // Symbole du logo (vectorisé depuis le logo fourni)
  logoMarkSvg: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="225 98 381 395"><path fill="currentColor" fill-rule="evenodd" d="M386.7,488.9C376.7,487.6 370.1,486.2 366.0,484.5C362.7,483.1 354.8,480.3 348.3,478.1C334.3,473.5 324.6,469.3 318.2,464.9C315.6,463.1 309.0,458.6 303.5,454.9C269.0,431.9 238.1,388.6 228.6,349.6C219.9,314.4 220.1,274.4 229.2,239.5C237.4,207.6 263.0,169.4 291.8,146.0C304.5,135.7 318.9,126.0 325.6,123.4C328.2,122.4 335.2,119.2 341.1,116.3C362.1,106.2 384.0,102.0 416.3,102.0C448.3,102.0 470.1,106.1 489.0,115.5C493.7,117.8 500.9,121.2 505.0,123.0C529.1,133.5 563.8,164.7 578.1,188.9C580.9,193.6 585.0,200.4 587.1,204.0C609.6,242.2 615.3,298.9 602.0,352.3C596.1,375.8 578.6,406.3 558.5,427.9C531.7,456.8 503.2,473.4 458.0,486.5C442.3,491.0 411.3,492.0 386.7,488.9ZM364.4,441.0C377.5,434.7 382.5,420.7 376.0,408.1C373.4,402.9 359.2,386.3 352.5,380.5C344.7,373.8 328.7,355.1 324.0,347.0C315.2,332.2 311.6,315.5 312.2,293.2C312.9,271.0 318.1,256.2 329.6,244.5C338.1,235.9 347.6,233.2 355.6,237.0C366.4,242.3 365.5,254.7 352.4,279.8C343.5,296.8 341.6,303.6 342.2,316.7C343.4,344.3 362.6,351.5 389.5,334.4C409.3,321.8 416.0,319.2 431.0,318.3C450.3,317.2 458.0,323.4 458.0,340.1C458.0,352.9 455.8,359.6 443.9,382.7C433.1,403.9 432.7,404.7 432.2,412.2C431.6,421.8 433.0,427.2 437.8,433.5C458.0,460.3 503.2,433.0 531.5,377.1C541.0,358.3 550.6,332.0 552.0,320.9C556.9,281.4 544.7,244.2 517.1,214.8C497.2,193.5 482.9,186.5 467.4,190.3C454.8,193.4 449.5,200.2 449.6,213.0C449.6,224.5 452.6,229.2 473.5,250.8C501.4,279.6 509.5,292.3 513.2,313.2C515.6,327.2 515.3,352.9 512.5,362.0C504.3,389.0 475.4,405.3 466.5,388.0C463.2,381.6 466.1,370.5 479.1,339.8C491.3,310.8 492.8,297.8 484.4,292.3C482.0,290.8 479.9,290.5 471.0,290.8C448.5,291.5 433.7,285.7 422.9,272.1C416.2,263.7 412.1,264.3 408.6,273.9C403.0,289.6 386.0,292.5 376.9,279.2C372.2,272.3 373.9,265.0 385.1,242.6C394.8,223.4 396.1,213.8 390.5,202.5C383.2,187.5 361.3,185.9 341.8,198.9C328.4,207.9 308.6,228.4 301.4,240.5C293.2,254.6 285.2,289.0 284.3,314.5C283.8,328.6 284.0,330.5 287.0,345.5C292.2,371.7 301.1,397.2 308.9,408.3C310.5,410.6 313.4,415.1 315.3,418.2C322.3,429.3 330.8,436.6 342.6,441.6C349.9,444.6 357.2,444.4 364.4,441.0ZM434.2,189.4C440.8,187.3 447.1,182.1 450.5,175.9C456.8,164.5 453.8,145.3 444.4,137.1C429.3,123.8 410.0,128.4 401.4,147.3C394.7,162.2 398.7,183.4 409.4,189.2C414.7,192.1 425.3,192.2 434.2,189.4Z"/></svg>',
  logo: { light: "logo-clair.png", dark: "logo-sombre.png" },
  favicon: "",

  // Spécialités — liste provisoire, à valider avec le cabinet
  specialties: [
    { icon: "bone", title: "Rééducation orthopédique", text: "Après une fracture, une entorse ou une opération (prothèse, ligaments, ménisque)." },
    { icon: "spine", title: "Douleurs du dos et du cou", text: "Lombalgies, sciatiques, cervicalgies et troubles posturaux." },
    { icon: "sport", title: "Rééducation du sportif", text: "Reprise après une blessure musculaire, tendineuse ou articulaire." },
    { icon: "neuro", title: "Rééducation neurologique", text: "Accompagnement après un AVC ou en cas de maladie neurologique." },
    { icon: "lotus", title: "Rééducation périnéale", text: "Après l'accouchement ou en cas de troubles urinaires." },
    { icon: "lungs", title: "Kinésithérapie respiratoire", text: "Désencombrement bronchique et travail du souffle." },
    { icon: "drop", title: "Drainage lymphatique", text: "Prise en charge des œdèmes et des jambes lourdes." },
    { icon: "senior", title: "Rééducation de la personne âgée", text: "Équilibre, marche et prévention des chutes." }
  ],

  // Photos du cabinet — à ajouter dans ./images/ (la première s'affiche en grand)
  cabinetPhotos: [
    // { file: "salle-1.jpg", caption: "Salle de rééducation" }
  ],
  cabinetPhotoSlots: 4,

  // Infos pratiques
  neighborhood: "Maârif",
  address: "400, boulevard Zerktouni, 3e étage",
  city: "Casablanca",
  timeZone: "Africa/Casablanca",
  mapEmbedUrl: "https://maps.google.com/maps?q=33.5995003,-7.6385892&z=17&output=embed",
  mapLink: "https://www.google.com/maps/place/centre+de+kin%C3%A9+plaza/@33.5995047,-7.6411641,629m/data=!3m2!1e3!4b1!4m6!3m5!1s0xda7d2f153638f9f:0x1fc223e5e85f72db!8m2!3d33.5995003!4d-7.6385892!16s%2Fg%2F11g6pgzmf1",
  access: "",
  homeVisits: { offered: true, area: "partout à Casablanca" },
  hours: [
    { label: "Lundi – Vendredi", days: [1, 2, 3, 4, 5], open: "09:00", close: "15:00" },
    { label: "Samedi – Dimanche", days: [6, 0], closed: true }
  ],
  insuranceShort: "Toutes assurances",

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
  googleRating: { score: "4,8", url: "https://www.google.com/maps/place/centre+de+kin%C3%A9+plaza/@33.5995047,-7.6411641,629m/data=!3m2!1e3!4b1!4m6!3m5!1s0xda7d2f153638f9f:0x1fc223e5e85f72db!8m2!3d33.5995003!4d-7.6385892!16s%2Fg%2F11g6pgzmf1" }
};
