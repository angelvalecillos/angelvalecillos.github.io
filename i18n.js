/* ==========================================================================
   I18N — español / inglés
   Un solo HTML, dos diccionarios. El idioma se decide así:
     1. ?lang=es / ?lang=en en la URL
     2. el que el visitante eligió antes (localStorage)
     3. el del navegador (inglés si empieza por "en", si no español)
   Los elementos del HTML se traducen con atributos:
     data-i18n            → textContent
     data-i18n-html       → innerHTML (textos con <strong>, <span>…)
     data-i18n-aria       → aria-label
     data-i18n-title      → title
     data-i18n-placeholder→ placeholder
     data-i18n-alt        → alt
   modelo.js usa t("clave") para lo que pinta por JavaScript y se vuelve a
   pintar al recibir el evento "langchange".
   ========================================================================== */
(function () {
  "use strict";

  const DICT = {
    /* ===================== ESPAÑOL ===================== */
    es: {
      "meta.title": "Angel Valecillos — Programador Java y web | Software a medida",
      "meta.desc":
        "Programador Java y web en Salamanca. Webs para negocios, software de gestión, aplicaciones de escritorio y juegos HTML5. Trato directo, presupuesto antes de empezar.",

      "skip": "Saltar al contenido",
      "brand.aria": "Angel Valecillos, inicio",
      "brand.role": "Programador Java y web",
      "nav.aria": "Principal",
      "nav.spec": "Especialidades",
      "nav.region": "Especialidades",
      "nav.projects": "Proyectos",
      "nav.try": "Pruébalo",
      "nav.process": "Cómo trabajo",
      "nav.about": "Sobre mí",
      "nav.cta": "Hablemos",
      "theme.aria": "Cambiar entre tema oscuro y claro",
      "theme.title": "Cambiar tema",
      "burger.open": "Abrir menú",
      "burger.close": "Cerrar menú",
      "lang.aria": "Idioma / Language",

      "hero.kicker": "Disponible para nuevos proyectos",
      "hero.h1":
        'Tu web o tu programa, <span class="m-hl">hecho a mano</span> y sin intermediarios.',
      "hero.lead":
        'Soy <strong id="mHeroName">Angel Valecillos</strong>, programador Java y web en Salamanca. Construyo webs para negocios, software de gestión y juegos HTML5. Hablas siempre con la persona que escribe el código.',
      "hero.cta1": "Hablemos de tu proyecto",
      "hero.cta2": "Ver proyectos",
      "hero.fact1": "Salamanca · remoto",
      "hero.fact2": "Respuesta en 24 h",
      "hero.fact3": "Presupuesto antes de empezar",
      "hero.photoAlt": "Retrato de Angel Valecillos",
      "hero.photoTag": "En Salamanca, disponible en remoto",

      "spec.kicker": "[ Especialidades ]",
      "spec.h2": "Todo lo que puedo hacer por tu negocio, agrupado y sin humo.",
      "spec.lead":
        "Cuatro formas de trabajar juntos. Si tu caso no encaja en ninguna, escríbeme igual: probablemente también se pueda.",
      "spec.extra": "También me encargo de",
      "spec.examples": "Ver ejemplos →",
      "spec.all": "Ver todas las especialidades →",

      "proj.kicker": "[ Proyectos ]",
      "proj.h2": "Trabajos reales, clasificados por tipo.",
      "proj.lead":
        "Proyectos terminados o en marcha. Filtra por lo que necesites: web, gestión, escritorio o juegos.",
      "proj.filterAria": "Filtrar proyectos por tipo",
      "proj.countOne": "proyecto",
      "proj.countMany": "proyectos",
      "proj.demo": "Pedir demo",
      "proj.manual": "Ver manual",
      "proj.site": "Ver sitio",
      "proj.noimg": "Sin captura todavía",
      "proj.imgAlt": "Captura de {title}",
      "proj.videoAria": "Ver el vídeo de {title}",
      "proj.newtab": "{title} (se abre en otra pestaña)",
      "cat.all": "Todos",
      "cat.web": "Web",
      "cat.gestion": "Gestión",
      "cat.escritorio": "Escritorio",
      "cat.juegos": "Juegos",
      "tech.Backend/frontend": "Java y backend",
      "tech.Backend": "Backend",
      "tech.Desktop": "Escritorio",
      "tech.DB": "Bases de datos",
      "tech.Build": "Compilación",
      "tech.Deploy": "Despliegue",
      "tech.Web": "Web",
      "tech.Tools": "Herramientas",

      "try.kicker": "[ Pruébalo ]",
      "try.h2": "Esto no es una captura: funciona aquí mismo.",
      "try.lead":
        "Una versión pequeña y real del traductor que hice para una iglesia. Escribe en español, elige el idioma y míralo traducir en vivo.",
      "try.title": "Traductor en vivo",
      "try.tag": "6 idiomas",
      "try.inputLabel": "Escribes en español",
      "try.defaultText": "Ánimo, no estás solo. Hoy hablamos del amor de Dios.",
      "try.ready": "Listo para traducir",
      "try.waiting": "Escribe algo en español y lo verás aquí.",
      "try.translating": "Traduciendo…",
      "try.done": "Traducido en vivo",
      "try.error": "No se pudo traducir ahora mismo",
      "try.listen": "Escuchar",
      "try.copy": "Copiar",
      "try.copied": "Copiado",
      "try.langsAria": "Idioma de destino",
      "try.foot":
        "Traduce con el servicio público de Google, sin claves, igual que la app real. El texto se envía a ese servicio y no se guarda.",
      "try.link": "Ver el proyecto completo →",

      "proc.kicker": "[ Cómo trabajo ]",
      "proc.h2": "Cuatro pasos, sin sorpresas.",
      "proc.lead":
        "Así es trabajar conmigo, de la primera conversación a la entrega. Sin reuniones que no llevan a nada.",
      "proc.s1t": "Hablamos",
      "proc.s1p": "Me cuentas qué necesitas y para cuándo. Te digo si se puede, cómo lo haría y qué hace falta.",
      "proc.s2t": "Propuesta",
      "proc.s2p": "Qué incluye, cuánto cuesta y qué necesito de ti. Todo por escrito antes de empezar.",
      "proc.s3t": "Desarrollo",
      "proc.s3p": "Entregas parciales para que lo veas funcionar desde el principio y corrijamos a tiempo.",
      "proc.s4t": "Entrega y soporte",
      "proc.s4p": "Publicado o instalado, con manual. Y cambios después, cuando los necesites.",

      "about.kicker": "[ Sobre mí ]",
      "about.h2": "Quién escribe el código.",
      "about.quote": "«No soy “vibe coding”: escribo y entiendo cada línea de mi código.»",
      "about.bio":
        "Soy programador Java y web, Ingeniero de Sistemas (UNEFA, 2015). Tengo proyectos de escritorio terminados con SQLite y PostgreSQL, y dos webs de clientes reales en producción. Trabajo con código claro, pruebas básicas y documentación breve, y entrego instalado o publicado según lo que necesites. Si algo no sé hacer, te lo digo antes de empezar.",
      "about.cv": "Descargar CV (PDF)",
      "about.loc": "Ubicación",
      "about.locv": "Salamanca, España · trabajo en remoto",
      "about.edu": "Formación",
      "about.eduv": "Ingeniero de Sistemas · UNEFA (2015)",
      "about.langs": "Idiomas",
      "about.langsv": "Español (nativo) · Inglés (B2)",
      "about.certs": "Certificaciones",
      "about.certsv":
        "Montaje y mantenimiento de sistemas microinformáticos (IFCT0108, 370 h) · ECI Diploma · Desarrollo con IA (MourDev)",
      "about.avail": "Disponibilidad",
      "about.availv": "Proyectos nuevos · respuesta en 24 h",
      "about.tech": "Tecnologías con las que trabajo",

      "contact.kicker": "[ Contacto ]",
      "contact.h2": "Cuéntame qué necesitas.",
      "contact.lead":
        "Escríbeme y te contesto en menos de 24 horas con una primera idea y un precio orientativo, sin compromiso.",
      "contact.email": "Correo",
      "contact.note":
        "Sin formularios que se pierden: el formulario abre tu correo con el mensaje ya escrito, así sabes exactamente qué me llega.",
      "form.name": "Tu nombre",
      "form.email": "Tu correo",
      "form.type": "Qué necesitas",
      "form.msg": "Cuéntame el proyecto",
      "form.msgPh": "Qué quieres conseguir, para cuándo y si ya tienes algo hecho.",
      "form.send": "Enviar por correo",
      "form.opt1": "Una web para mi negocio",
      "form.opt2": "Software de gestión",
      "form.opt3": "Una aplicación de escritorio",
      "form.opt4": "Un juego HTML5",
      "form.opt5": "Otra cosa",
      "form.missing": "Faltan datos: escribe tu nombre, tu correo y qué necesitas.",
      "form.sent":
        "Se ha abierto tu programa de correo con el mensaje escrito. Si no se abre, escríbeme a {email}.",
      "form.subject": "Proyecto: {tipo} — {nombre}",
      "form.bodyName": "Nombre",
      "form.bodyEmail": "Correo",
      "form.bodyType": "Tipo de proyecto",
      "form.demoMsg": "Me interesa una demo de «{title}».",

      "footer.line": "Programador Java y web · Salamanca",
      "footer.linksAria": "Enlaces de contacto",
      "footer.email": "Correo",
      "footer.cv": "CV",
      "footer.fine": "Hecho a mano, sin plantillas.",

      "video.aria": "Vídeo promocional",
      "video.close": "Cerrar el vídeo"
    },

    /* ===================== ENGLISH ===================== */
    en: {
      "meta.title": "Angel Valecillos — Java and web developer | Custom software",
      "meta.desc":
        "Java and web developer in Salamanca. Business websites, management software, desktop applications and HTML5 games. Direct contact, a quote before we start.",

      "skip": "Skip to content",
      "brand.aria": "Angel Valecillos, home",
      "brand.role": "Java and web developer",
      "nav.aria": "Main",
      "nav.spec": "Specialties",
      "nav.region": "Specialties",
      "nav.projects": "Projects",
      "nav.try": "Try it",
      "nav.process": "How I work",
      "nav.about": "About me",
      "nav.cta": "Let's talk",
      "theme.aria": "Switch between dark and light theme",
      "theme.title": "Switch theme",
      "burger.open": "Open menu",
      "burger.close": "Close menu",
      "lang.aria": "Language / Idioma",

      "hero.kicker": "Available for new projects",
      "hero.h1":
        'Your website or your program, <span class="m-hl">handmade</span> and with no middlemen.',
      "hero.lead":
        'I am <strong id="mHeroName">Angel Valecillos</strong>, a Java and web developer in Salamanca. I build business websites, management software and HTML5 games. You always talk to the person who writes the code.',
      "hero.cta1": "Let's talk about your project",
      "hero.cta2": "See projects",
      "hero.fact1": "Salamanca · remote",
      "hero.fact2": "Reply within 24 h",
      "hero.fact3": "Quote before we start",
      "hero.photoAlt": "Portrait of Angel Valecillos",
      "hero.photoTag": "Based in Salamanca, available remotely",

      "spec.kicker": "[ Specialties ]",
      "spec.h2": "Everything I can do for your business, grouped and with no hype.",
      "spec.lead":
        "Four ways to work together. If your case fits none of them, write to me anyway: it can probably be done too.",
      "spec.extra": "I also take care of",
      "spec.examples": "See examples →",
      "spec.all": "See all specialties →",

      "proj.kicker": "[ Projects ]",
      "proj.h2": "Real work, sorted by type.",
      "proj.lead":
        "Finished or ongoing projects. Filter by what you need: web, management, desktop or games.",
      "proj.filterAria": "Filter projects by type",
      "proj.countOne": "project",
      "proj.countMany": "projects",
      "proj.demo": "Request a demo",
      "proj.manual": "See manual",
      "proj.site": "See site",
      "proj.noimg": "No screenshot yet",
      "proj.imgAlt": "Screenshot of {title}",
      "proj.videoAria": "Watch the video for {title}",
      "proj.newtab": "{title} (opens in a new tab)",
      "cat.all": "All",
      "cat.web": "Web",
      "cat.gestion": "Management",
      "cat.escritorio": "Desktop",
      "cat.juegos": "Games",
      "tech.Backend/frontend": "Java & backend",
      "tech.Backend": "Backend",
      "tech.Desktop": "Desktop",
      "tech.DB": "Databases",
      "tech.Build": "Build",
      "tech.Deploy": "Deployment",
      "tech.Web": "Web",
      "tech.Tools": "Tools",

      "try.kicker": "[ Try it ]",
      "try.h2": "This is not a screenshot: it works right here.",
      "try.lead":
        "A small, real version of the translator I built for a church. Write in English, pick a language and watch it translate live.",
      "try.title": "Live translator",
      "try.tag": "6 languages",
      "try.inputLabel": "You write in English",
      "try.defaultText": "Take heart, you are not alone. Today we talk about God's love.",
      "try.ready": "Ready to translate",
      "try.waiting": "Write something in English and you will see it here.",
      "try.translating": "Translating…",
      "try.done": "Translated live",
      "try.error": "Could not translate right now",
      "try.listen": "Listen",
      "try.copy": "Copy",
      "try.copied": "Copied",
      "try.langsAria": "Target language",
      "try.foot":
        "Translated with Google's public service, no keys, just like the real app. The text is sent to that service and is not stored.",
      "try.link": "See the full project →",

      "proc.kicker": "[ How I work ]",
      "proc.h2": "Four steps, no surprises.",
      "proc.lead":
        "This is what working with me looks like, from the first conversation to delivery. No meetings that lead nowhere.",
      "proc.s1t": "Let's talk",
      "proc.s1p": "You tell me what you need and by when. I tell you if it can be done, how I would do it and what it takes.",
      "proc.s2t": "Proposal",
      "proc.s2p": "What it includes, how much it costs and what I need from you. All in writing before we start.",
      "proc.s3t": "Development",
      "proc.s3p": "Partial deliveries so you see it working from the start and we can fix things in time.",
      "proc.s4t": "Delivery and support",
      "proc.s4p": "Published or installed, with a manual. And changes later, whenever you need them.",

      "about.kicker": "[ About me ]",
      "about.h2": "Who writes the code.",
      "about.quote": "«I am not “vibe coding”: I write and understand every line of my code.»",
      "about.bio":
        "I am a Java and web developer and a Systems Engineer (UNEFA, 2015). I have finished desktop projects with SQLite and PostgreSQL, and two real client websites in production. I work with clear code, basic tests and short documentation, and I deliver installed or published depending on what you need. If I don't know how to do something, I tell you before we start.",
      "about.cv": "Download CV (PDF)",
      "about.loc": "Location",
      "about.locv": "Salamanca, Spain · working remotely",
      "about.edu": "Education",
      "about.eduv": "Systems Engineer · UNEFA (2015)",
      "about.langs": "Languages",
      "about.langsv": "Spanish (native) · English (B2)",
      "about.certs": "Certifications",
      "about.certsv":
        "Computer systems assembly and maintenance (IFCT0108, 370 h) · ECI Diploma · AI-assisted development (MourDev)",
      "about.avail": "Availability",
      "about.availv": "New projects · reply within 24 h",
      "about.tech": "Technologies I work with",

      "contact.kicker": "[ Contact ]",
      "contact.h2": "Tell me what you need.",
      "contact.lead":
        "Write to me and I will reply in under 24 hours with a first idea and an indicative price, no commitment.",
      "contact.email": "Email",
      "contact.note":
        "No forms that get lost: the form opens your email app with the message already written, so you know exactly what reaches me.",
      "form.name": "Your name",
      "form.email": "Your email",
      "form.type": "What you need",
      "form.msg": "Tell me about the project",
      "form.msgPh": "What you want to achieve, by when, and whether you already have something built.",
      "form.send": "Send by email",
      "form.opt1": "A website for my business",
      "form.opt2": "Management software",
      "form.opt3": "A desktop application",
      "form.opt4": "An HTML5 game",
      "form.opt5": "Something else",
      "form.missing": "Missing details: write your name, your email and what you need.",
      "form.sent":
        "Your email app has opened with the message written. If it does not open, write to me at {email}.",
      "form.subject": "Project: {tipo} — {nombre}",
      "form.bodyName": "Name",
      "form.bodyEmail": "Email",
      "form.bodyType": "Project type",
      "form.demoMsg": "I'd like a demo of “{title}”.",

      "footer.line": "Java and web developer · Salamanca",
      "footer.linksAria": "Contact links",
      "footer.email": "Email",
      "footer.cv": "CV",
      "footer.fine": "Handmade, no templates.",

      "video.aria": "Promotional video",
      "video.close": "Close the video"
    }
  };

  const ATTRS = [
    ["data-i18n", "textContent"],
    ["data-i18n-html", "innerHTML"],
    ["data-i18n-aria", "aria-label"],
    ["data-i18n-title", "title"],
    ["data-i18n-placeholder", "placeholder"],
    ["data-i18n-alt", "alt"]
  ];

  let lang = "es";

  const fill = (texto, vars) => {
    let out = String(texto);
    if (vars) {
      Object.keys(vars).forEach((k) => {
        out = out.split("{" + k + "}").join(vars[k]);
      });
    }
    // {year} siempre con el año actual, para no tener que tocarlo cada enero.
    return out.split("{year}").join(String(new Date().getFullYear()));
  };

  const t = (key, vars) => {
    const table = DICT[lang] || DICT.es;
    const value = Object.prototype.hasOwnProperty.call(table, key) ? table[key] : DICT.es[key];
    return fill(value === undefined ? key : value, vars);
  };

  const applyI18n = () => {
    const root = document.documentElement;
    root.lang = lang;

    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));

    ATTRS.forEach(([attr, prop]) => {
      document.querySelectorAll("[" + attr + "]").forEach((node) => {
        const key = node.getAttribute(attr);
        if (!key || !Object.prototype.hasOwnProperty.call(DICT[lang] || {}, key)) return;
        const value = t(key);
        if (prop === "textContent" || prop === "innerHTML") node[prop] = value;
        else node.setAttribute(prop, value);
      });
    });
  };

  const setLang = (next, save) => {
    lang = next === "en" ? "en" : "es";

    if (save !== false) {
      try {
        localStorage.setItem("lang", lang);
      } catch (e) {
        // modo privado: se ignora
      }
      // Se deja en la URL para poder compartir el enlace en el idioma elegido.
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.history.replaceState(null, "", url.toString());
      } catch (e) {}
    }

    applyI18n();

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const on = btn.getAttribute("data-lang-btn") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  };

  /* ---------- Idioma inicial ---------- */
  let query = "";
  try {
    query = new URLSearchParams(window.location.search).get("lang") || "";
  } catch (e) {}

  let saved = "";
  try {
    saved = localStorage.getItem("lang") || "";
  } catch (e) {}

  const browser = (navigator.language || "es").toLowerCase();
  const initial =
    query === "es" || query === "en"
      ? query
      : saved === "es" || saved === "en"
        ? saved
        : browser.startsWith("en")
          ? "en"
          : "es";

  /* ---------- API pública ---------- */
  window.t = t;
  window.getLang = () => lang;
  window.applyI18n = applyI18n;
  window.setLang = setLang;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang-btn]");
    if (btn) setLang(btn.getAttribute("data-lang-btn"));
  });

  setLang(initial, false);
})();
