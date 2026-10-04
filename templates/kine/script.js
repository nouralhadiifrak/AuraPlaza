/* Modèle "Kiné" — remplit la page à partir de window.SITE (config.js). */
(function () {
  "use strict";

  var S = window.SITE || {};
  var P = S.practitioner || {};
  var IMG = "images/";

  // ---------- Utilitaires ----------
  function $(id) { return document.getElementById(id); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) return;
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function filled(v) {
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== null && String(v).trim() !== "";
  }

  // Espace réservé visible : "[vos tarifs ici]"
  function ph(label) { return el("span", { class: "placeholder", text: "[" + label + "]" }); }

  // Valeur ou espace réservé
  function val(v, label) { return filled(v) ? document.createTextNode(String(v)) : ph(label); }

  function setChildren(node, children) {
    if (!node) return;
    node.textContent = "";
    children.forEach(function (c) { if (c) node.appendChild(c); });
  }

  // Bloc neutre en attendant une photo
  function photoSlot(label, extraClass) {
    return el("div", { class: "photo-slot " + (extraClass || ""), role: "img", "aria-label": label }, [
      el("span", { text: "[" + label + "]" })
    ]);
  }

  function lazyImg(file, alt, extraClass) {
    return el("img", { src: IMG + file, alt: alt || "", loading: "lazy", decoding: "async", class: extraClass || "" });
  }

  function waLink(text) {
    var num = String(S.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text || S.whatsappMessage || "Bonjour");
  }

  // ---------- Thème (couleurs + mode sombre) ----------
  var C = S.colors || {};
  var root = document.documentElement;
  if (C.primary) root.style.setProperty("--brand", C.primary);
  if (C.accent) root.style.setProperty("--brand-accent", C.accent);
  if (C.dark) {
    if (C.dark.background) root.style.setProperty("--d-bg", C.dark.background);
    if (C.dark.surface) root.style.setProperty("--d-surface", C.dark.surface);
    if (C.dark.primary) root.style.setProperty("--d-brand", C.dark.primary);
    if (C.dark.accent) root.style.setProperty("--d-brand-accent", C.dark.accent);
  }

  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function renderLogo() {
    var box = $("hero-logo");
    if (!box) return;
    var L = S.logo || {};
    var file = isDark() ? (L.dark || L.light) : (L.light || L.dark);
    setChildren(box, file ? [el("img", { src: IMG + file, alt: "Logo " + (S.name || ""), width: "240" })] : []);
    box.hidden = !file;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) { meta = el("meta", { name: "theme-color" }); document.head.appendChild(meta); }
    meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim() || "#ffffff");
  }

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      renderLogo();
    });
  }
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) mq.addEventListener("change", renderLogo);
  }

  // ---------- En-tête / méta ----------
  var siteName = S.name || "Cabinet de kinésithérapie";
  document.title = siteName + " — " + (S.tagline || "Kinésithérapie") + (S.city ? ", " + S.city : "");
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", siteName + " · " + [P.name, P.title, S.neighborhood, S.city].filter(filled).join(", "));
  if (S.favicon) document.head.appendChild(el("link", { rel: "icon", href: IMG + S.favicon }));

  Array.prototype.forEach.call(document.querySelectorAll("[data-bind]"), function (n) {
    var key = n.getAttribute("data-bind");
    setChildren(n, [val(S[key], key === "name" ? "nom du cabinet ici" : "slogan ici")]);
  });

  // ---------- 1. Hero ----------
  renderLogo();
  setChildren($("hero-practitioner"), [
    val(P.name, "nom du praticien ici"), document.createTextNode(" — "), val(P.title, "titre ici")
  ]);
  var meta = [];
  meta.push(el("span", null, [val(S.neighborhood, "quartier ici"), document.createTextNode(S.city ? ", " + S.city : "")]));
  if (filled(P.yearsExperience)) meta.push(el("span", { text: P.yearsExperience + " ans d'expérience" }));
  setChildren($("hero-meta"), meta);

  var R = S.googleRating || {};
  var heroRating = $("hero-rating");
  if (heroRating) {
    if (filled(R.score)) {
      heroRating.href = R.url || "#";
      setChildren(heroRating, [
        el("span", { class: "stars", "aria-hidden": "true", text: "★" }),
        el("strong", { text: R.score + "/5" }),
        el("span", { text: " sur Google" })
      ]);
      heroRating.setAttribute("aria-label", "Note Google : " + R.score + " sur 5 — voir les avis");
    } else {
      heroRating.removeAttribute("href");
      setChildren(heroRating, [ph("note Google ici")]);
    }
  }

  // ---------- 2. Spécialités ----------
  var specs = (S.specialties || []).filter(function (s) { return s && filled(s.title); });
  if (specs.length) {
    setChildren($("specialties-list"), specs.map(function (s) {
      var link = el("a", { class: "card-link", href: "#contact", "data-specialty": s.title, text: "Prendre rendez-vous" });
      return el("article", { class: "card" }, [
        el("h3", { text: s.title }),
        el("p", null, [val(s.text, "description ici")]),
        link
      ]);
    }));
  } else {
    setChildren($("specialties-list"), [1, 2, 3].map(function () {
      return el("article", { class: "card" }, [el("h3", null, [ph("spécialité ici")]), el("p", null, [ph("description ici")])]);
    }));
  }

  // ---------- 3. Le praticien ----------
  var media = $("practitioner-media");
  if (filled(P.video)) {
    setChildren(media, [el("video", {
      src: IMG + P.video, controls: true, preload: "none", playsinline: true,
      poster: filled(P.videoPoster) ? IMG + P.videoPoster : null,
      "aria-label": "Vidéo de présentation de " + (P.name || "la praticienne")
    })]);
  } else if (filled(P.photo)) {
    setChildren(media, [lazyImg(P.photo, P.name ? "Portrait de " + P.name : "Portrait du praticien")]);
  } else {
    setChildren(media, [photoSlot("photo ou vidéo à venir", "portrait")]);
  }
  setChildren($("practitioner-name"), [val(P.name, "nom ici"), document.createTextNode(" · "), val(P.title, "titre ici")]);
  setChildren($("practitioner-experience"), filled(P.yearsExperience)
    ? [el("strong", { text: P.yearsExperience }), document.createTextNode(" ans d'expérience")]
    : [ph("années d'expérience ici")]);
  var quals = (P.qualifications || []).filter(filled);
  setChildren($("practitioner-qualifications"), quals.length
    ? quals.map(function (q) { return el("li", { text: q }); })
    : [el("li", null, [ph("diplômes et formations ici")])]);

  // ---------- 4. Le cabinet ----------
  var photos = (S.cabinetPhotos || []).filter(function (p) { return p && filled(p.file); });
  if (photos.length) {
    setChildren($("cabinet-gallery"), photos.map(function (p) {
      return el("figure", null, [lazyImg(p.file, p.caption || "Le cabinet"), filled(p.caption) ? el("figcaption", { text: p.caption }) : null]);
    }));
  } else {
    var n = S.cabinetPhotoSlots || 4, slots = [];
    for (var i = 0; i < n; i++) slots.push(el("figure", null, [photoSlot("photo du cabinet à venir")]));
    setChildren($("cabinet-gallery"), slots);
  }

  // ---------- 5. Infos pratiques ----------
  var hours = (S.hours || []).filter(function (h) { return h && filled(h.days); });
  setChildren($("hours-list"), hours.length
    ? hours.reduce(function (acc, h) {
        acc.push(el("dt", { text: h.days }));
        acc.push(el("dd", { class: /ferm/i.test(h.time || "") ? "closed" : "" }, [val(h.time, "horaires ici")]));
        return acc;
      }, [])
    : [el("dt", null, [ph("jours ici")]), el("dd", null, [ph("horaires ici")])]);

  setChildren($("address-block"), [
    el("span", { class: "line" }, [val(S.address, "adresse exacte ici")]),
    el("span", { class: "line" }, [val(S.neighborhood, "quartier ici"), document.createTextNode(S.city ? ", " + S.city : "")])
  ]);
  setChildren($("access-block"), filled(S.access) ? [el("h3", { text: "Accès et stationnement" }), el("p", { text: S.access })] : []);

  var HV = S.homeVisits || {};
  setChildren($("home-visits"), HV.offered === true
    ? [document.createTextNode("Oui" + (filled(HV.area) ? " — " + HV.area + "." : ".") + " Précisez-le dans votre demande de rendez-vous.")]
    : HV.offered === false ? [document.createTextNode("Les séances ont lieu uniquement au cabinet.")]
    : [ph("visites à domicile : oui / non")]);

  var mapBlock = $("map-block");
  if (filled(S.mapEmbedUrl)) {
    setChildren(mapBlock, [
      el("iframe", {
        src: S.mapEmbedUrl, title: "Plan d'accès — " + siteName, loading: "lazy",
        referrerpolicy: "no-referrer-when-downgrade", allowfullscreen: true
      }),
      filled(S.mapLink) ? el("a", { class: "map-link", href: S.mapLink, target: "_blank", rel: "noopener", text: "Ouvrir dans Google Maps" }) : null
    ]);
  } else {
    setChildren(mapBlock, [photoSlot("carte Google Maps ici", "map-slot")]);
  }

  // ---------- 6. Questions fréquentes ----------
  var F = S.faq || {};
  var faqs = [
    { q: "Faut-il une ordonnance ?", a: F.prescription, label: "réponse ici" },
    { q: "Combien de temps dure une séance ?", a: F.sessionLength, label: "durée d'une séance ici" },
    { q: "Quelles assurances sont acceptées ?", a: F.insurance, label: "assurances acceptées ici" }
  ].concat((F.extra || []).filter(function (x) { return x && filled(x.q); }));
  setChildren($("faq-list"), faqs.map(function (f) {
    return el("details", null, [el("summary", { text: f.q }), el("p", null, [val(f.a, f.label || "réponse ici")])]);
  }));

  // ---------- 7. Contact ----------
  var contacts = [];
  contacts.push(el("li", null, [el("span", { class: "label", text: "Téléphone" }),
    filled(S.phone) ? el("a", { href: "tel:" + String(S.phone).replace(/[^\d+]/g, ""), text: S.phone }) : ph("numéro de téléphone ici")]));
  contacts.push(el("li", null, [el("span", { class: "label", text: "WhatsApp" }),
    filled(S.whatsapp) ? el("a", { href: waLink(), target: "_blank", rel: "noopener", text: "+" + String(S.whatsapp).replace(/\D/g, "") }) : ph("numéro WhatsApp ici")]));
  if (filled(S.instagram)) {
    var handle = String(S.instagram).replace(/\/+$/, "").split("/").pop();
    contacts.push(el("li", null, [el("span", { class: "label", text: "Instagram" }),
      el("a", { href: S.instagram, target: "_blank", rel: "noopener", text: "@" + handle })]));
  }
  if (filled(R.score)) {
    contacts.push(el("li", null, [el("span", { class: "label", text: "Avis Google" }),
      el("a", { href: R.url || "#", target: "_blank", rel: "noopener", text: R.score + "/5 — voir les avis" })]));
  }
  setChildren($("contact-list"), contacts);

  var footerLinks = [];
  if (filled(S.instagram)) footerLinks.push(el("a", { href: S.instagram, target: "_blank", rel: "noopener", text: "Instagram" }));
  if (filled(R.url)) footerLinks.push(el("a", { href: R.url, target: "_blank", rel: "noopener", text: "Google Maps" }));
  var fl = $("footer-links");
  if (fl) { fl.textContent = ""; footerLinks.forEach(function (a, i) { if (i) fl.appendChild(document.createTextNode(" · ")); fl.appendChild(a); }); }

  // Bouton WhatsApp fixe
  var fab = $("whatsapp-fab");
  if (fab) fab.href = waLink();

  // Formulaire → message WhatsApp pré-rempli
  var OTHER = "Autre / je ne sais pas";
  var select = $("f-specialty");
  if (select) {
    select.appendChild(el("option", { value: "", text: "Choisissez un motif…" }));
    specs.forEach(function (s) { select.appendChild(el("option", { value: s.title, text: s.title })); });
    select.appendChild(el("option", { value: OTHER, text: OTHER }));
    select.addEventListener("change", updateHint);
  }
  var homeWrap = $("f-home-wrap");
  if (homeWrap) homeWrap.hidden = HV.offered !== true;

  function updateHint() {
    var hint = $("f-message-hint");
    if (hint) hint.textContent = select && select.value === OTHER ? "(obligatoire)" : "(facultatif)";
  }

  // Les boutons "Prendre rendez-vous" des cartes pré-sélectionnent la spécialité
  Array.prototype.forEach.call(document.querySelectorAll("[data-specialty]"), function (a) {
    a.addEventListener("click", function () {
      if (select) { select.value = a.getAttribute("data-specialty"); updateHint(); }
    });
  });

  var form = $("rdv-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.trim();
      var spec = form.elements.specialty.value;
      var msg = form.elements.message.value.trim();
      var home = form.elements.home && form.elements.home.checked && !homeWrap.hidden;
      var err = $("form-error");
      var missing = [];
      if (!name) missing.push("votre nom");
      if (!phone) missing.push("votre téléphone");
      if (!spec) missing.push("le motif de consultation");
      if (spec === OTHER && !msg) missing.push("une description de votre problème");
      if (missing.length) {
        err.textContent = "Merci d'indiquer " + missing.join(", ") + ".";
        err.hidden = false;
        return;
      }
      err.hidden = true;
      var lines = [
        (S.whatsappMessage || "Bonjour, je souhaite prendre rendez-vous."),
        "",
        "Nom : " + name,
        "Téléphone : " + phone,
        "Motif : " + spec
      ];
      if (msg) lines.push("Description : " + msg);
      if (home) lines.push("Séance à domicile souhaitée : oui");
      var a = el("a", { href: waLink(lines.join("\n")), target: "_blank", rel: "noopener" });
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
})();
