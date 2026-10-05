/* Modèle "Kiné" — remplit la page à partir de window.SITE (config.js). */
(function () {
  "use strict";

  var S = window.SITE || {};
  var P = S.practitioner || {};
  var R = S.googleRating || {};
  var HV = S.homeVisits || {};
  var F = S.faq || {};
  // Chemin d'une image du dossier ./images (ou version intégrée si window.SITE_ASSETS existe)
  function asset(f) { return (window.SITE_ASSETS && window.SITE_ASSETS[f]) || "images/" + f; }
  var SHOW_PH = S.showPlaceholders !== false; // false = masque ce qui manque au lieu d'afficher "[...]"

  // ---------- Utilitaires ----------
  function $(id) { return document.getElementById(id); }
  function qsa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "text") node.textContent = v;
        else if (k === "html") node.innerHTML = v; // uniquement pour les icônes internes
        else if (k === "class") node.className = v;
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function filled(v) {
    if (Array.isArray(v)) return v.length > 0;
    return v !== undefined && v !== null && String(v).trim() !== "";
  }

  // Espace réservé visible "[...]" (ou rien si showPlaceholders = false)
  function ph(label) { return SHOW_PH ? el("span", { class: "placeholder", text: "[" + label + "]" }) : null; }
  function val(v, label) { return filled(v) ? document.createTextNode(String(v)) : ph(label); }

  function setChildren(node, children) {
    if (!node) return;
    node.textContent = "";
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
  }

  function lazyImg(file, alt) {
    return el("img", { src: asset(file), alt: alt || "", loading: "lazy", decoding: "async" });
  }

  var phoneDigits = String(S.phone || "").replace(/[^\d+]/g, "");
  var waDigits = String(S.whatsapp || "").replace(/\D/g, "");
  function waLink(text) {
    return "https://wa.me/" + waDigits + "?text=" + encodeURIComponent(text || S.whatsappMessage || "Bonjour");
  }

  // ---------- Icônes (traits, 24×24) ----------
  var ICONS = {
    bone: '<path d="M8.2 5.3a2.4 2.4 0 1 0-2.9 2.9 2.4 2.4 0 1 0 2.6 3.4l4.5 4.5a2.4 2.4 0 1 0 3.4 2.6 2.4 2.4 0 1 0 2.9-2.9 2.4 2.4 0 1 0-2.6-3.4L11.6 7.9a2.4 2.4 0 1 0-3.4-2.6Z"/>',
    spine: '<rect x="8" y="2.5" width="8" height="4" rx="1.6"/><rect x="7.5" y="7.5" width="9" height="4" rx="1.6"/><rect x="7.5" y="12.5" width="9" height="4" rx="1.6"/><rect x="8" y="17.5" width="8" height="4" rx="1.6"/>',
    sport: '<circle cx="15.5" cy="4.5" r="1.8"/><path d="m6 21 3.2-5.2 3.3 2.2.8-5.8-3.8-1.7L6.6 13M13.3 12.2l2.4 2.6 3.6-.6M6.5 8.5l3-2.5h4.2l1.8 3"/>',
    neuro: '<circle cx="12" cy="12" r="3"/><path d="M12 9V4.5M15 12h4.5M12 15v4.5M9 12H4.5M14.1 9.9l3.2-3.2M9.9 14.1l-3.2 3.2"/><circle cx="12" cy="3.5" r="1"/><circle cx="20.5" cy="12" r="1"/><circle cx="12" cy="20.5" r="1"/><circle cx="3.5" cy="12" r="1"/>',
    lotus: '<path d="M12 20c-4.4 0-8-2.6-8-7.2 3.2 0 6.2 1.6 8 4.2 1.8-2.6 4.8-4.2 8-4.2 0 4.6-3.6 7.2-8 7.2Z"/><path d="M12 17c-2.2-2.6-2.6-6.4 0-11.5 2.6 5.1 2.2 8.9 0 11.5Z"/>',
    lungs: '<path d="M12 3.5v7.5M12 11l-2.6 2M12 11l2.6 2"/><path d="M8.6 6.8C6 6.8 4 11 4 15.6 4 18.2 5.1 20 7 20c2 0 2.6-1.4 2.6-3.4V8.6c0-1-.4-1.8-1-1.8ZM15.4 6.8c2.6 0 4.6 4.2 4.6 8.8 0 2.6-1.1 4.4-3 4.4-2 0-2.6-1.4-2.6-3.4V8.6c0-1 .4-1.8 1-1.8Z"/>',
    drop: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
    senior: '<circle cx="10" cy="4.5" r="1.8"/><path d="M10 8v6l-2.2 7M10 14l3 3v4M10 9.2 7 12.5M10 9.2l3.8 2.3h1.7M16.5 11.5V21"/>',
    hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6.5a1.5 1.5 0 0 1 3 0V14c0 4-2.6 7-6.2 7-2.4 0-4-1-5.4-3l-1.6-3.1a1.5 1.5 0 0 1 2.5-1.7L8 15"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    home: '<path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="M8.6 13.4 7 21l5-2.6 5 2.6-1.6-7.6"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z"/>',
    doc: '<path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function icon(name, cls) {
    if (name === "phone" || name === "wa") { // symboles définis dans index.html
      return el("span", { class: "ico " + (cls || ""), "aria-hidden": "true", html: '<svg viewBox="0 0 24 24"><use href="#i-' + name + '"/></svg>' });
    }
    return el("span", {
      class: "ico " + (cls || ""), "aria-hidden": "true",
      html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.hand) + "</svg>"
    });
  }
  qsa("[data-icon]").forEach(function (n) { n.appendChild(icon(n.getAttribute("data-icon"))); });

  // ---------- Couleurs ----------
  var C = S.colors || {};
  var root = document.documentElement;
  [["--g1", C.green], ["--g2", C.greenLight], ["--gold", C.gold], ["--cream", C.cream]].forEach(function (p) {
    if (filled(p[1])) root.style.setProperty(p[0], p[1]);
  });

  // ---------- Logo ----------
  var mark = filled(S.logoMarkSvg) ? S.logoMarkSvg : "";
  qsa("[data-mark]").forEach(function (n) {
    if (mark) n.innerHTML = mark;
    else if (S.logo && S.logo.light) n.appendChild(el("img", { src: asset(S.logo.light), alt: "" }));
    else n.hidden = true;
  });
  if (filled(S.favicon)) {
    document.head.appendChild(el("link", { rel: "icon", href: asset(S.favicon) }));
  } else if (mark) {
    var fav = mark.replace("currentColor", C.green || "#123F36");
    document.head.appendChild(el("link", { rel: "icon", href: "data:image/svg+xml," + encodeURIComponent(fav) }));
  }

  // ---------- Thème clair / sombre ----------
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---------- Méta / textes communs ----------
  var siteName = S.name || "Cabinet de kinésithérapie";
  var place = [S.neighborhood, S.city].filter(filled).join(", ");
  document.title = siteName + " — " + (S.tagline || "Kinésithérapie") + (place ? ", " + place : "");
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", [siteName, P.name && P.title ? P.name + ", " + P.title.toLowerCase() : P.name, place].filter(filled).join(" · "));

  qsa("[data-bind]").forEach(function (n) {
    var key = n.getAttribute("data-bind");
    setChildren(n, [val(S[key], key === "name" ? "nom du cabinet ici" : "sous-titre ici")]);
  });

  // Logotype (nom dessiné) : rendu en masque CSS pour prendre la couleur du thème
  var wm = filled(S.logoWordmarkSvg) ? S.logoWordmarkSvg : "";
  var wmRatio = 0;
  if (wm) {
    var vb = (wm.match(/viewBox="([^"]+)"/) || [])[1];
    if (vb) { vb = vb.split(/\s+/).map(Number); wmRatio = vb[2] / vb[3]; }
    root.style.setProperty("--wm", 'url("data:image/svg+xml,' + encodeURIComponent(wm) + '")');
    if (wmRatio) root.style.setProperty("--wm-ratio", wmRatio.toFixed(4));
  }
  // Le logotype porte lui-même le nom (role="img") : aucun texte caché derrière
  function wordmark() { return wm && wmRatio ? el("span", { class: "wordmark", role: "img", "aria-label": S.name || "" }) : null; }
  qsa("[data-wordmark]").forEach(function (n) {
    if (!wm || !wmRatio || !filled(S.name)) return;
    n.textContent = "";
    n.classList.add("has-wordmark");
    n.appendChild(wordmark());
  });

  // ---------- En-tête : état au défilement + menu mobile ----------
  var header = $("site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = document.querySelector(".menu-toggle");
  function setMenu(open) {
    document.body.classList.toggle("nav-open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    }
  }
  if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(!document.body.classList.contains("nav-open")); });
  qsa("#main-nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // ---------- 1. Accueil ----------
  setChildren($("hero-eyebrow"), place ? [icon("pin"), el("span", { text: place })] : [ph("quartier ici")]);
  // Slogan : la partie après la première virgule est mise en valeur
  var slogan = $("hero-slogan");
  if (filled(S.slogan)) {
    var cut = S.slogan.indexOf(",");
    var a = cut > -1 ? S.slogan.slice(0, cut + 1) : S.slogan;
    var b = cut > -1 ? S.slogan.slice(cut + 1).trim() : "";
    setChildren(slogan, [el("span", { class: "slogan-a", text: a }), b ? document.createTextNode(" ") : null, b ? el("em", { class: "slogan-b", text: b }) : null]);
  } else if (slogan) slogan.remove();

  var heroCall = $("hero-call");
  if (heroCall) { if (phoneDigits) heroCall.href = "tel:" + phoneDigits; else heroCall.remove(); }

  var heroRating = $("hero-rating");
  if (heroRating) {
    if (filled(R.score)) {
      if (filled(R.url)) heroRating.href = R.url;
      setChildren(heroRating, [
        el("span", { class: "stars", "aria-hidden": "true", text: "★★★★★" }),
        el("strong", { class: "num", text: R.score + "/5" }),
        document.createTextNode(" · Avis Google")
      ]);
      heroRating.setAttribute("aria-label", "Note Google : " + R.score + " sur 5. Voir les avis");
    } else if (SHOW_PH) {
      setChildren(heroRating, [ph("note Google ici")]);
    } else heroRating.remove();
  }

  // ---------- Points clés ----------
  var hl = [];
  if (filled(P.yearsExperience)) hl.push({ i: "award", big: P.yearsExperience + " ans", small: "d'expérience" });
  if (filled(R.score)) hl.push({ i: "star", big: R.score + "/5", small: "note Google", href: R.url });
  if (HV.offered === true) hl.push({ i: "home", big: "À domicile", small: filled(HV.area) ? HV.area : "sur rendez-vous" });
  if (filled(S.insuranceShort)) hl.push({ i: "shield", big: S.insuranceShort, small: "acceptées" });
  var hlWrap = $("essentiel");
  if (hl.length >= 2) {
    setChildren($("highlights"), hl.slice(0, 4).map(function (h) {
      var inner = [icon(h.i), el("span", { class: "hl-text" }, [el("strong", { class: /^\d/.test(h.big) ? "num" : null, text: h.big }), el("span", { text: h.small })])];
      return el("li", null, [h.href ? el("a", { href: h.href, target: "_blank", rel: "noopener" }, inner) : el("div", null, inner)]);
    }));
  } else if (hlWrap) hlWrap.remove();

  // ---------- 2. Spécialités ----------
  var specs = (S.specialties || []).filter(function (s) { return s && filled(s.title); });
  var list = $("specialties-list");
  if (specs.length) {
    setChildren(list, specs.map(function (s) {
      return el("a", { class: "card reveal", href: "#contact", "data-specialty": s.title }, [
        icon(s.icon || "hand", "card-icon"),
        el("h3", { text: s.title }),
        filled(s.text) ? el("p", { text: s.text }) : (SHOW_PH ? el("p", null, [ph("description ici")]) : null),
        el("span", { class: "card-more" }, ["Prendre rendez-vous", icon("arrow")])
      ]);
    }));
  } else if (SHOW_PH) {
    setChildren(list, [1, 2, 3].map(function () {
      return el("div", { class: "card" }, [icon("hand", "card-icon"), el("h3", null, [ph("spécialité ici")]), el("p", null, [ph("description ici")])]);
    }));
  }

  // ---------- 3. Praticien ----------
  function brandCard(note) {
    return el("div", { class: "brand-card" }, [
      el("span", { class: "brand-card-mark", html: mark }),
      el("p", { class: "brand-card-name gt" + (wordmark() ? " has-wordmark" : "") }, wordmark() ? [wordmark()] : [val(S.name, "nom du cabinet ici")]),
      filled(S.tagline) ? el("p", { class: "brand-card-title", text: S.tagline }) : null,
      note ? el("span", { class: "brand-card-note" }, [note]) : null
    ]);
  }
  var media = $("practitioner-media");
  if (filled(P.video)) {
    setChildren(media, [el("video", {
      src: asset(P.video), controls: true, preload: "none", playsinline: true,
      poster: filled(P.videoPoster) ? asset(P.videoPoster) : (filled(P.photo) ? asset(P.photo) : null),
      "aria-label": "Vidéo de présentation" + (P.name ? " de " + P.name : "")
    })]);
  } else if (filled(P.photo)) {
    setChildren(media, [lazyImg(P.photo, P.name ? "Portrait de " + P.name : "Portrait")]);
  } else {
    setChildren(media, [brandCard(ph("photo ou vidéo à venir"))]);
  }
  setChildren($("practitioner-name"), [val(P.name, "nom ici")]);
  setChildren($("practitioner-title"), [val(P.title, "titre ici")]);
  setChildren($("practitioner-experience"), filled(P.yearsExperience)
    ? [el("strong", { class: "num", text: P.yearsExperience }), el("span", { text: "ans d'expérience" })]
    : [ph("années d'expérience ici")]);
  var quals = (P.qualifications || []).filter(filled);
  setChildren($("practitioner-qualifications"), quals.length
    ? [el("h3", { text: "Formation et qualifications" }), el("ul", { class: "check-list" }, quals.map(function (q) { return el("li", { text: q }); }))]
    : SHOW_PH ? [el("h3", { text: "Formation et qualifications" }), el("ul", { class: "check-list" }, [el("li", null, [ph("diplômes et formations ici")])])] : []);

  // ---------- 4. Cabinet ----------
  var photos = (S.cabinetPhotos || []).filter(function (p) { return p && filled(p.file); });
  if (photos.length) {
    setChildren($("cabinet-gallery"), photos.map(function (p, i) {
      return el("figure", { class: "reveal" + (i === 0 ? " wide" : "") }, [lazyImg(p.file, p.caption || "Le cabinet"), filled(p.caption) ? el("figcaption", { text: p.caption }) : null]);
    }));
  } else if (SHOW_PH) {
    var slots = [];
    for (var i = 0; i < (S.cabinetPhotoSlots || 4); i++) {
      slots.push(el("figure", { class: "photo-slot" + (i === 0 ? " wide" : "") }, [el("span", { class: "slot-mark", html: mark }), ph("photo du cabinet à venir")]));
    }
    setChildren($("cabinet-gallery"), slots);
  } else {
    var cab = $("cabinet"); if (cab) cab.remove();
    qsa('[data-nav="cabinet"]').forEach(function (a) { a.remove(); });
  }

  // ---------- 5. Infos pratiques ----------
  var DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var hours = (S.hours || []).filter(function (h) { return h && filled(h.label || h.days); });
  function hoursText(h) {
    if (h.closed) return "Fermé";
    if (filled(h.open) && filled(h.close)) return h.open + " – " + h.close;
    return h.time || "";
  }
  setChildren($("hours-list"), hours.length
    ? hours.reduce(function (acc, h) {
        acc.push(el("dt", { text: h.label || h.days }));
        acc.push(el("dd", { class: h.closed ? "closed" : "" }, [val(hoursText(h), "horaires ici")]));
        return acc;
      }, [])
    : [el("dt", null, [ph("jours ici")]), el("dd", null, [ph("horaires ici")])]);

  // Badge "Ouvert maintenant" (heure de Casablanca)
  (function () {
    var badge = $("open-badge");
    var sched = hours.filter(function (h) { return Array.isArray(h.days) && (h.closed || (filled(h.open) && filled(h.close))); });
    if (!badge || !sched.length) return;
    var now;
    try {
      var parts = new Intl.DateTimeFormat("en-GB", { timeZone: S.timeZone || "Africa/Casablanca", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      now = { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday), min: (+o.hour) * 60 + (+o.minute) };
    } catch (e) { var d = new Date(); now = { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() }; }
    function toMin(t) { var a = String(t).split(":"); return (+a[0]) * 60 + (+a[1] || 0); }
    function slotFor(day) { for (var k = 0; k < sched.length; k++) if (sched[k].days.indexOf(day) > -1 && !sched[k].closed) return sched[k]; return null; }
    var today = slotFor(now.day);
    if (today && now.min >= toMin(today.open) && now.min < toMin(today.close)) {
      badge.textContent = "Ouvert · jusqu'à " + today.close;
      badge.className = "open-badge is-open";
    } else {
      var label = "";
      for (var k = 0; k < 8; k++) {
        var day = (now.day + k) % 7, s = slotFor(day);
        if (s && (k > 0 || now.min < toMin(s.open))) {
          label = "Fermé · ouvre " + (k === 0 ? "à " : k === 1 ? "demain à " : DAYS[day] + " à ") + s.open;
          break;
        }
      }
      badge.textContent = label || "Fermé";
      badge.className = "open-badge is-closed";
    }
    badge.hidden = false;
  })();

  setChildren($("address-block"), [
    el("span", { class: "line strong" }, [val(S.address, "adresse exacte ici")]),
    el("span", { class: "line" }, [place ? document.createTextNode(place) : ph("quartier ici")])
  ]);
  setChildren($("access-block"), filled(S.access) ? [el("p", { class: "muted", text: S.access })] : []);
  var dir = $("directions-link");
  if (dir && filled(S.mapLink)) { dir.href = S.mapLink; dir.hidden = false; }

  var hvCard = $("home-visits");
  if (HV.offered === true) {
    setChildren(hvCard, [document.createTextNode("Oui, " + (filled(HV.area) ? HV.area : "sur rendez-vous") + ". Précisez-le dans votre demande de rendez-vous.")]);
  } else if (HV.offered === false) {
    setChildren(hvCard, [document.createTextNode("Les séances ont lieu uniquement au cabinet.")]);
  } else if (SHOW_PH) {
    setChildren(hvCard, [ph("visites à domicile : oui / non")]);
  } else if (hvCard) hvCard.closest(".info-card").remove();

  var mapBlock = $("map-block");
  if (filled(S.mapEmbedUrl)) {
    setChildren(mapBlock, [el("iframe", {
      src: S.mapEmbedUrl, title: "Plan d'accès — " + siteName, loading: "lazy",
      referrerpolicy: "no-referrer-when-downgrade", allowfullscreen: true
    })]);
  } else if (SHOW_PH) {
    setChildren(mapBlock, [el("div", { class: "photo-slot map-slot" }, [ph("carte Google Maps ici")])]);
  } else if (mapBlock) mapBlock.remove();

  // ---------- 6. Questions fréquentes ----------
  var faqs = [
    { q: "Faut-il une ordonnance ?", a: F.prescription, label: "réponse ici" },
    { q: "Combien de temps dure une séance ?", a: F.sessionLength, label: "durée d'une séance ici" },
    { q: "Quelles assurances sont acceptées ?", a: F.insurance, label: "assurances acceptées ici" }
  ].concat((F.extra || []).filter(function (x) { return x && filled(x.q); }))
   .filter(function (f) { return filled(f.a) || SHOW_PH; });
  setChildren($("faq-list"), faqs.map(function (f, idx) {
    return el("details", idx === 0 ? { open: true } : null, [el("summary", { text: f.q }), el("div", { class: "faq-a" }, [el("p", null, [val(f.a, f.label || "réponse ici")])])]);
  }));
  if (!faqs.length) { var fq = $("faq"); if (fq) fq.remove(); }
  var faqWa = $("faq-wa");
  if (faqWa) { if (waDigits) faqWa.href = waLink("Bonjour, j'ai une question : "); else { var fm = $("faq-more"); if (fm) fm.remove(); } }

  // ---------- 7. Contact ----------
  function contactItem(ic, label, value, href, ext) {
    var body = [icon(ic), el("span", { class: "ci-text" }, [el("span", { class: "ci-label", text: label }), value])];
    return el("li", null, [href ? el("a", { href: href, target: ext ? "_blank" : null, rel: ext ? "noopener" : null }, body) : el("div", null, body)]);
  }
  var contacts = [];
  if (phoneDigits) contacts.push(contactItem("phone", "Téléphone", el("strong", { text: S.phone }), "tel:" + phoneDigits));
  else if (SHOW_PH) contacts.push(contactItem("phone", "Téléphone", ph("numéro de téléphone ici")));
  if (waDigits) contacts.push(contactItem("wa", "WhatsApp", el("strong", { text: S.whatsappDisplay || "+" + waDigits }), waLink(), true));
  else if (SHOW_PH) contacts.push(contactItem("wa", "WhatsApp", ph("numéro WhatsApp ici")));
  if (filled(S.instagram)) {
    var handle = String(S.instagram).replace(/\/+$/, "").split("/").pop();
    contacts.push(contactItem("instagram", "Instagram", el("strong", { text: "@" + handle }), S.instagram, true));
  }
  setChildren($("contact-list"), contacts);

  // Pied de page
  setChildren($("footer-address"), [
    el("p", { class: "footer-title", text: "Adresse" }),
    el("p", null, [val(S.address, "adresse ici")]),
    place ? el("p", { text: place }) : null,
    hours.length ? el("p", { class: "muted", text: hours.map(function (h) { return (h.label || h.days) + " : " + hoursText(h); }).join(" · ") }) : null
  ]);
  var links = [];
  function footLink(ic, href, text, ext) { return el("a", { href: href, target: ext ? "_blank" : null, rel: ext ? "noopener" : null }, [icon(ic), text]); }
  if (phoneDigits) links.push(footLink("phone", "tel:" + phoneDigits, S.phone));
  if (waDigits) links.push(footLink("wa", waLink(), "WhatsApp", true));
  if (filled(S.instagram)) links.push(footLink("instagram", S.instagram, "Instagram", true));
  if (filled(R.url)) links.push(footLink("star", R.url, "Avis Google", true));
  setChildren($("footer-links"), [el("p", { class: "footer-title", text: "Contact" })].concat(links.map(function (a) { return el("p", null, [a]); })));
  setChildren($("footer-copy"), [document.createTextNode("© " + new Date().getFullYear() + " " + siteName + (place ? " · " + place : ""))]);

  // Barre d'action fixe
  var fab = $("whatsapp-fab");
  if (fab) fab.href = waLink();
  var barCall = $("bar-call");
  if (barCall) { if (phoneDigits) barCall.href = "tel:" + phoneDigits; else barCall.remove(); }

  // ---------- Formulaire → WhatsApp ----------
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

  qsa("[data-specialty]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (select) { select.value = a.getAttribute("data-specialty"); updateHint(); }
    });
  });

  var form = $("rdv-form");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var spec = form.elements.specialty.value;
    var msg = form.elements.message.value.trim();
    var home = !!(form.elements.home && form.elements.home.checked && homeWrap && !homeWrap.hidden);
    var err = $("form-error");
    var missing = [];
    if (!name) missing.push("votre nom");
    if (!phone) missing.push("votre téléphone");
    if (!spec) missing.push("le motif de consultation");
    if (spec === OTHER && !msg) missing.push("une description de votre problème");
    if (missing.length) { err.textContent = "Merci d'indiquer " + missing.join(", ") + "."; err.hidden = false; return; }
    err.hidden = true;
    var lines = [S.whatsappMessage || "Bonjour, je souhaite prendre rendez-vous.", "", "Nom : " + name, "Téléphone : " + phone, "Motif : " + spec];
    if (msg) lines.push("Description : " + msg);
    if (home) lines.push("Séance à domicile souhaitée : oui");
    var a = el("a", { href: waLink(lines.join("\n")), target: "_blank", rel: "noopener" });
    document.body.appendChild(a); a.click(); a.remove();
  });

  // Alternance des fonds (après suppression éventuelle de sections)
  qsa("main > .section:not(.contact-section)").forEach(function (sec, idx) { sec.classList.toggle("section-tint", idx % 2 === 1); });

  // ---------- Fond animé de l'accueil : « Light Cables » (WebGL) ----------
  // Port en JavaScript simple de l'effet Light Cables (Originkit), réglages du preset fourni.
  // Couleurs reprises de la palette. Mode clair : câbles vert sur fond crème.
  (function () {
    var hero = document.querySelector(".hero");
    if (!hero || S.heroEffect === "none") return;
    var O = S.cables || {};
    function n(v, fb) { return typeof v === "number" && isFinite(v) ? v : fb; }
    function cl(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
    function rgb(hex, fb) {
      var m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
      if (!m) return fb;
      var x = parseInt(m[1], 16);
      return [(x >> 16 & 255) / 255, (x >> 8 & 255) / 255, (x & 255) / 255];
    }
    var cfg = {
      speed: cl(n(O.speed, 13), 0, 100) / 50,
      hover: cl(n(O.hover, 120), 0, 200) / 100,
      grab: cl(n(O.grab, 97), 10, 300) / 100,
      count: Math.round(cl(n(O.count, 35), 4, 48)),
      bend: cl(n(O.bend, 0), 0, 150) / 100,
      spread: cl(n(O.spread, 155), 10, 300) / 100,
      thick: cl(n(O.thickness, 123), 20, 400) / 100,
      wStart: cl(n(O.widthStart, 0), 0, 300) / 100,
      wEnd: cl(n(O.widthEnd, 300), 0, 300) / 100,
      flow: cl(n(O.flow, 300), 0, 300) / 100,
      pulses: cl(n(O.pulses, 2), 1, 12),
      posX: cl(n(O.positionX, -13), -100, 100) / 100,
      posY: cl(n(O.positionY, -21), -100, 100) / 100,
      dir: O.direction || "btt"
    };
    var axis = cfg.dir === "ttb" || cfg.dir === "btt" ? 1 : 0;
    var dirSign = cfg.dir === "rtl" || cfg.dir === "ttb" ? -1 : 1;
    var COL = {
      bg: rgb(C.green, [0.071, 0.247, 0.212]),
      base: rgb(C.greenLight, [0.165, 0.42, 0.361]),
      accent: rgb(C.gold, [0.769, 0.604, 0.271]),
      high: rgb(C.cream, [0.91, 0.863, 0.769]),
      lightBg: [0.969, 0.945, 0.902],
      ink: rgb(C.greenLight, [0.165, 0.42, 0.361])
    };

    var canvas = document.createElement("canvas");
    canvas.className = "hero-canvas";
    canvas.setAttribute("aria-hidden", "true");
    var gl = null;
    try { gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, powerPreference: "low-power" }); } catch (e) {}
    if (!gl) return; // pas de WebGL : on garde le fond dégradé

    var VERT = "attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}";
    var FRAG = [
      "#ifdef GL_FRAGMENT_PRECISION_HIGH", "precision highp float;", "#else", "precision mediump float;", "#endif",
      "uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;uniform float uHover;",
      "uniform vec3 uBg;uniform vec3 uBase;uniform vec3 uAccent;uniform vec3 uHigh;",
      "uniform float uCount;uniform float uBend;uniform float uSpread;uniform float uWStart;uniform float uWEnd;",
      "uniform float uAxis;uniform float uDir;uniform float uPosX;uniform float uPosY;uniform float uThick;",
      "uniform float uFlow;uniform float uPulses;uniform float uGrab;uniform float uGrain;",
      "uniform float uLight;uniform vec3 uLightBg;uniform vec3 uInk;",
      "float sat(float x){return clamp(x,0.0,1.0);}",
      "float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+34.56);return fract(p.x*p.y);}",
      "float vnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);float a=h21(i),b=h21(i+vec2(1.0,0.0));float c=h21(i+vec2(0.0,1.0)),d=h21(i+vec2(1.0,1.0));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}",
      "float fbm3(vec2 p){float s=0.0,a=0.5;for(int i=0;i<3;i++){s+=a*vnoise(p);p=p*2.07+vec2(4.1,2.3);a*=0.5;}return s;}",
      "void main(){",
      " float ar=uRes.x/max(uRes.y,1.0);vec2 uv=gl_FragCoord.xy/uRes;vec2 p=(uv-0.5)*vec2(ar,1.0);float t=uTime;",
      " vec2 pAdj=p-vec2(uPosX*ar,uPosY)*0.5;",
      " vec3 glow=vec3(0.0);vec2 sm=p-vec2(-0.05,-0.28);",
      " glow+=uBase*exp(-pow(length(sm*vec2(0.75,1.9))/0.42,1.7))*0.50*(0.6+0.6*fbm3(p*2.4+vec2(t*0.05,0.0)));",
      " float extent=mix(ar,1.0,uAxis);float along=mix(pAdj.x,pAdj.y,uAxis)*uDir;float across=mix(pAdj.y,pAdj.x,uAxis);",
      " float s01=sat((along+extent*0.5)/max(extent,0.001));",
      " vec2 ptrRaw=(uMouse-0.5)*vec2(ar,1.0);float ptrAlong=mix(ptrRaw.x,ptrRaw.y,uAxis)*uDir;float ptrAcross=mix(ptrRaw.y,ptrRaw.x,uAxis);",
      " float kAlong=-0.18;float kAcross=0.10;vec3 acc=vec3(0.0);float surge=0.0;",
      " for(int i=0;i<48;i++){",
      "  if(float(i)>=uCount)break;",
      "  float fi=float(i)/max(uCount-1.0,1.0);float o=fi-0.5;float rnd=h21(vec2(fi*7.31,2.0));",
      "  float kAlongi=kAlong+o*0.10+(rnd-0.5)*0.03;float bi=uBend*(0.88+0.24*rnd);",
      "  float spread=uSpread*mix(uWStart,uWEnd,s01)*(0.090+0.34*sat((along-kAlong)*0.85+0.25));",
      "  float bendAlong=sqrt((along-kAlongi)*(along-kAlongi)+0.0035);",
      "  float yy=kAcross+o*spread-bi*bendAlong+0.008*sin(along*3.0+fi*19.0);",
      "  float gx=exp(-pow((along-ptrAlong)/max(uGrab*0.30,0.02),2.0));",
      "  yy=mix(yy,ptrAcross+o*spread*0.55,gx*0.60*uHover);",
      "  float dd=(across-yy)/(uThick*0.0038);float core=1.0/(1.0+dd*dd*9.0);float sheath=1.0/(1.0+dd*dd*0.6);",
      "  float ph=s01*uPulses-t*uFlow*0.55-rnd*0.22;float f=fract(ph);float pulse=exp(-pow((f-0.55)/0.15,2.0));",
      "  float w=(0.22+1.60*pulse)*(0.55+0.45*rnd);",
      "  acc+=(uHigh*core*1.45+uAccent*sheath*0.20)*w;surge+=core*gx;",
      " }",
      " float feed=smoothstep(0.0,0.09,s01)*smoothstep(1.02,0.30,s01);",
      " glow+=acc*feed*0.20;glow+=uHigh*surge*0.05*uHover;",
      " float grain=(h21(gl_FragCoord.xy+fract(uTime)*71.0)-0.5)*uGrain;",
      " vec3 dark=uBg+glow+grain;",
      " float lum=dot(glow,vec3(0.40,0.45,0.15));",
      " vec3 light=mix(uLightBg,uInk,sat(lum*1.25))+grain*0.6;",
      " gl_FragColor=vec4(max(mix(dark,light,uLight),0.0),1.0);",
      "}"
    ].join("\n");

    function sh(type, src) {
      var x = gl.createShader(type); gl.shaderSource(x, src); gl.compileShader(x);
      if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) { gl.deleteShader(x); return null; }
      return x;
    }
    var vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = {};
    function u(name) { if (!(name in U)) U[name] = gl.getUniformLocation(prog, name); return U[name]; }

    hero.insertBefore(canvas, hero.firstChild);
    hero.classList.add("has-canvas");

    // Uniformes fixes
    gl.uniform3fv(u("uBg"), COL.bg); gl.uniform3fv(u("uBase"), COL.base);
    gl.uniform3fv(u("uAccent"), COL.accent); gl.uniform3fv(u("uHigh"), COL.high);
    gl.uniform3fv(u("uLightBg"), COL.lightBg); gl.uniform3fv(u("uInk"), COL.ink);
    gl.uniform1f(u("uCount"), cfg.count); gl.uniform1f(u("uBend"), cfg.bend); gl.uniform1f(u("uSpread"), cfg.spread);
    gl.uniform1f(u("uWStart"), cfg.wStart); gl.uniform1f(u("uWEnd"), cfg.wEnd);
    gl.uniform1f(u("uAxis"), axis); gl.uniform1f(u("uDir"), dirSign);
    gl.uniform1f(u("uPosX"), cfg.posX); gl.uniform1f(u("uPosY"), cfg.posY);
    gl.uniform1f(u("uThick"), cfg.thick); gl.uniform1f(u("uFlow"), cfg.flow);
    gl.uniform1f(u("uPulses"), cfg.pulses); gl.uniform1f(u("uGrab"), cfg.grab); gl.uniform1f(u("uGrain"), 0.012);

    var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, on: 0, target: 0 };
    var raf = 0, last = performance.now(), clock = 4.0, visible = true, lightMix = isDark() ? 0 : 1;

    function frame(now) {
      raf = 0;
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!reduce) clock = (clock + dt * cfg.speed) % 3600;
      var k = 1 - Math.exp(-6 * dt);
      ptr.on += (ptr.target - ptr.on) * k;
      ptr.x += ((ptr.target > 0 ? ptr.tx : 0.5) - ptr.x) * k;
      ptr.y += ((ptr.target > 0 ? ptr.ty : 0.5) - ptr.y) * k;
      var lt = isDark() ? 0 : 1;
      lightMix = reduce ? lt : lightMix + (lt - lightMix) * Math.min(1, dt * 6);

      // Résolution limitée pour rester fluide sur téléphone
      var small = window.innerWidth < 768;
      var dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : 1.5) * (small ? 0.85 : 1);
      var cw = hero.clientWidth || 1, ch = hero.clientHeight || 1;
      var bw = Math.max(1, Math.round(cw * dpr)), bh = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== bw || canvas.height !== bh) { canvas.width = bw; canvas.height = bh; }
      gl.viewport(0, 0, bw, bh);
      gl.uniform2f(u("uRes"), bw, bh);
      gl.uniform1f(u("uTime"), clock);
      gl.uniform2f(u("uMouse"), ptr.x, 1 - ptr.y);
      gl.uniform1f(u("uHover"), Math.min(1, ptr.on) * cfg.hover);
      gl.uniform1f(u("uLight"), lightMix);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }

    function track(e) {
      var r = hero.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      ptr.tx = cl((e.clientX - r.left) / r.width, 0, 1);
      ptr.ty = cl((e.clientY - r.top) / r.height, 0, 1);
      ptr.target = 1;
      if (reduce) kick();
    }
    hero.addEventListener("pointermove", track, { passive: true });
    hero.addEventListener("pointerenter", track, { passive: true });
    hero.addEventListener("pointerleave", function () { ptr.target = 0; });

    // Pause quand l'accueil n'est plus visible ou l'onglet est caché
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) kick(); }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) kick(); });
    window.addEventListener("resize", kick);
    if (themeBtn) themeBtn.addEventListener("click", function () { kick(); if (reduce) setTimeout(kick, 30); });
    if (window.matchMedia) {
      var mqd = window.matchMedia("(prefers-color-scheme: dark)");
      if (mqd.addEventListener) mqd.addEventListener("change", kick);
    }
    kick();
  })();

  // ---------- Apparition au défilement ----------
  var reveals = qsa(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (n) { io.observe(n); });
  } else reveals.forEach(function (n) { n.classList.add("in"); });
})();
