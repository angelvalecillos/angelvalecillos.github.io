/* ==========================================================================
   MODELO 2026-10-22 — lógica de la web de contratación
   Pinta las secciones desde content.js (mismos datos que el portafolio) y
   añade lo nuevo: menú de especialidades, filtros de proyectos y formulario.
   ========================================================================== */
(function () {
  const d = document;
  const root = d.documentElement;
  const data = window.portfolioData;
  if (!data) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (id) => d.getElementById(id);

  /* ---------- Tema claro / oscuro ---------- */
  if (localStorage.getItem("theme") === "light") root.classList.add("light");
  d.addEventListener("click", (e) => {
    if (!e.target.closest("#themeToggle")) return;
    root.classList.toggle("light");
    localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  });

  /* ---------- Etiquetas ---------- */
  const CATS = [
    { id: "todos", label: "Todos" },
    { id: "web", label: "Web" },
    { id: "gestion", label: "Gestión" },
    { id: "escritorio", label: "Escritorio" },
    { id: "juegos", label: "Juegos" }
  ];
  const TECH_LABEL = {
    "Backend/frontend": "Java y backend",
    Backend: "Backend",
    Desktop: "Escritorio",
    DB: "Bases de datos",
    Build: "Compilación",
    Deploy: "Despliegue",
    Web: "Web",
    Tools: "Herramientas"
  };
  // Igual que en el portafolio: demoLabel manda; si no, .pdf = manual.
  const etiquetaDemo = (item) =>
    item.demoLabel ||
    (item.demoUrl && item.demoUrl.toLowerCase().endsWith(".pdf") ? "Ver manual" : "Ver sitio");

  const ICONS = {
    web:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M6.6 6.6h.01M9.2 6.6h.01"/></svg>',
    db:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5.6" rx="7.4" ry="2.9"/><path d="M4.6 5.6v6c0 1.7 3.3 3 7.4 3s7.4-1.3 7.4-3v-6"/><path d="M4.6 11.6v6c0 1.7 3.3 3 7.4 3s7.4-1.3 7.4-3v-6"/></svg>',
    app:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.4h18M6.8 12h5.4M6.8 15.4h3.6"/></svg>',
    game:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.6" y="7" width="18.8" height="10" rx="5"/><path d="M7 10v4M5 12h4"/><circle cx="15.8" cy="11" r=".9" fill="currentColor" stroke="none"/><circle cx="18" cy="13.2" r=".9" fill="currentColor" stroke="none"/></svg>'
  };

  /* ---------- Hero ---------- */
  const heroName = el("mHeroName");
  if (heroName) heroName.textContent = data.name;

  const photo = el("photo");
  const photoAlt = el("photoAlt");
  if (photo && data.photoUrl) photo.src = data.photoUrl;

  // Segunda foto del avatar: fundido cada X segundos (igual que el portafolio).
  if (photoAlt && data.photoUrl2) {
    photoAlt.src = data.photoUrl2;
    const ms = Number(data.photoIntervalMs) > 999 ? Number(data.photoIntervalMs) : 7000;
    if (reduce) photoAlt.classList.add("no-fade");

    let timer = 0;
    const swap = () => photoAlt.classList.toggle("visible");
    const start = () => {
      if (!timer) timer = setInterval(swap, ms);
    };
    const stop = () => {
      clearInterval(timer);
      timer = 0;
    };
    start();
    d.addEventListener("visibilitychange", () => (d.hidden ? stop() : start()));
  }

  /* ---------- Menú de especialidades ---------- */
  const drop = el("mDrop");
  const dropBtn = el("mDropBtn");
  const mega = el("megaEsp");
  const services = data.services || [];

  if (mega && services.length) {
    mega.innerHTML =
      services
        .map(
          (s) => `
        <div class="m-mega-group">
          <p class="m-mega-title">${s.kicker}</p>
          <a class="m-mega-main" href="#especialidades">${s.title}</a>
          <ul>${(s.items || []).map((x) => `<li>${x}</li>`).join("")}</ul>
        </div>`
        )
        .join("") +
      `<div class="m-mega-foot">
         <a class="m-link" href="#especialidades">Ver todas las especialidades →</a>
         <a class="btn" href="#contacto">Hablemos</a>
       </div>`;
  }

  const openDrop = () => {
    drop.classList.add("is-open");
    dropBtn.setAttribute("aria-expanded", "true");
  };
  const closeDrop = () => {
    drop.classList.remove("is-open");
    dropBtn.setAttribute("aria-expanded", "false");
  };

  if (drop && dropBtn) {
    dropBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      drop.classList.contains("is-open") ? closeDrop() : openDrop();
    });

    // En escritorio se abre también al pasar el ratón (con margen para llegar).
    let hoverTimer = 0;
    drop.addEventListener("mouseenter", () => {
      if (!window.matchMedia("(hover: hover) and (min-width: 901px)").matches) return;
      clearTimeout(hoverTimer);
      openDrop();
    });
    drop.addEventListener("mouseleave", () => {
      if (!window.matchMedia("(hover: hover) and (min-width: 901px)").matches) return;
      hoverTimer = setTimeout(closeDrop, 140);
    });

    mega.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeDrop();
    });
  }

  /* ---------- Menú móvil ---------- */
  const burger = el("mBurger");
  const navLinks = el("mNav");
  const closeNav = () => {
    if (!navLinks) return;
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menú");
  };

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeNav();
    });
  }

  d.addEventListener("click", (e) => {
    if (drop && !drop.contains(e.target)) closeDrop();
    if (navLinks && navLinks.classList.contains("is-open") && !navLinks.contains(e.target) && !burger.contains(e.target)) {
      closeNav();
    }
  });
  d.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeDrop();
    closeNav();
  });

  /* ---------- Especialidades ---------- */
  const servGrid = el("mServGrid");
  if (servGrid) {
    servGrid.innerHTML = services
      .map(
        (s, i) => `
      <article class="m-serv">
        <div class="m-serv-top">
          <span class="m-serv-num">0${i + 1}</span>
          <span class="m-serv-ico" aria-hidden="true">${ICONS[s.icon] || ICONS.web}</span>
        </div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <ul class="m-serv-list">${(s.items || []).map((x) => `<li>${x}</li>`).join("")}</ul>
        <a class="m-link" href="#proyectos" data-jump="${s.anchor}">Ver ejemplos →</a>
      </article>`
      )
      .join("");
  }

  const extraServ = el("mExtraServ");
  if (extraServ && data.serviceExtras) {
    extraServ.innerHTML = data.serviceExtras.map((x) => `<li><span class="badge">${x}</span></li>`).join("");
  }

  /* ---------- Proyectos clasificados ---------- */
  // Se juntan los terminados y los que están en desarrollo en una sola lista
  // ordenada por `rank` (1 = primero). `category` decide el filtro.
  const all = [
    ...(data.projects || []).map((p) => ({ ...p, category: p.category || "escritorio" })),
    ...(data.experience || []).map((e) => ({ ...e, category: e.category || "web" }))
  ].sort((a, b) => (a.rank || 99) - (b.rank || 99));

  const filters = el("mFilters");
  const grid = el("mProjGrid");
  const count = el("mCount");
  let current = "todos";

  const statusClass = (s) => {
    const t = (s || "").toLowerCase();
    if (t.includes("desarrollo")) return "status-wip";
    if (t.includes("terminado")) return "status-ok";
    return "status-info";
  };

  const renderProjects = (filter) => {
    const list = filter === "todos" ? all : all.filter((p) => p.category === filter);

    grid.innerHTML = list
      .map((p) => {
        const img = p.imageUrl || (Array.isArray(p.images) ? p.images[0] : "");
        const catLabel = (CATS.find((c) => c.id === p.category) || {}).label || p.category;
        const status = p.status ? `<span class="status ${statusClass(p.status)}">${p.status}</span>` : "";
        const tags = (p.tech || []).slice(0, 4).map((t) => `<span class="m-tag">${t}</span>`).join("");
        const demo = p.demoUrl
          ? `<a class="btn-outline" href="${p.demoUrl}" target="_blank" rel="noopener">${etiquetaDemo(p)}</a>`
          : "";
        // Todas las fichas llevan a la vez al formulario de contacto.
        const pedir = `<a class="btn" href="#contacto" data-demo="${p.title}" data-cat="${p.category}">Pedir demo</a>`;
        const link = p.demoUrl;
        const mediaClass = "m-proj-media" + (p.imageFit === "contain" ? " is-contain" : "");
        const media = img
          ? `<img src="${img}" alt="Captura de ${p.title}" loading="lazy" />`
          : `<span class="m-proj-noimg"><small>Sin captura todavía</small><strong>${p.title}</strong></span>`;

        return `
        <article class="m-proj">
          ${
            link
              ? `<a class="${mediaClass}" href="${link}" target="_blank" rel="noopener" aria-label="${p.title} (se abre en otra pestaña)">${media}</a>`
              : `<div class="${mediaClass}">${media}</div>`
          }
          <div class="m-proj-body">
            <div class="m-proj-meta">
              <span class="m-cat">${catLabel}</span>
              ${status}
            </div>
            <h3>${p.title}</h3>
            <p>${p.summary || p.description}</p>
            ${tags ? `<div class="m-tags">${tags}</div>` : ""}
            <div class="m-proj-actions">${pedir}${demo}</div>
          </div>
        </article>`;
      })
      .join("");

    if (count) {
      count.textContent = `${list.length} ${list.length === 1 ? "proyecto" : "proyectos"}`;
    }
  };

  const setFilter = (id) => {
    if (!CATS.some((c) => c.id === id)) id = "todos";
    current = id;
    Array.from(filters.children).forEach((b) => {
      const on = b.dataset.filter === id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    renderProjects(id);
  };

  if (filters && grid) {
    filters.innerHTML = CATS.map((c) => {
      const n = c.id === "todos" ? all.length : all.filter((p) => p.category === c.id).length;
      return `<button type="button" class="m-filter${c.id === "todos" ? " is-active" : ""}" data-filter="${c.id}" aria-pressed="${c.id === "todos"}">${c.label} <span>${n}</span></button>`;
    }).join("");

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (btn) setFilter(btn.dataset.filter);
    });

    renderProjects(current);
  }

  // "Ver ejemplos →" de cada especialidad: filtra y baja a los proyectos.
  if (servGrid) {
    servGrid.addEventListener("click", (e) => {
      const a = e.target.closest("[data-jump]");
      if (!a) return;
      e.preventDefault();
      setFilter(a.dataset.jump);
      const target = el("proyectos");
      if (target) target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }

  // "Pedir demo": baja al formulario, marca el tipo de proyecto y escribe el mensaje.
  if (grid) {
    const ORDEN_TIPO = { web: 0, gestion: 1, escritorio: 2, juegos: 3 };

    grid.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-demo]");
      if (!a) return;

      const tipo = el("fTipo");
      const msg = el("fMsg");
      const indice = ORDEN_TIPO[a.dataset.cat];
      if (tipo && typeof indice === "number") tipo.selectedIndex = indice;

      if (msg) {
        const texto = msg.value.trim();
        if (!texto || /^Me interesa una demo de/.test(texto)) {
          msg.value = `Me interesa una demo de «${a.dataset.demo}».`;
        }
      }

      // El foco se pone cuando el navegador ya ha saltado al formulario.
      window.setTimeout(() => {
        const nombre = el("fNombre");
        const correo = el("fEmail");
        const foco = nombre && !nombre.value.trim() ? nombre : correo && !correo.value.trim() ? correo : msg;
        if (foco) foco.focus({ preventScroll: true });
      }, 500);
    });
  }

  /* ---------- Sobre mí ---------- */
  const bio = el("mBio");
  if (bio) {
    bio.textContent =
      "Soy programador Java y web, Ingeniero de Sistemas (UNEFA, 2015). Tengo proyectos de " +
      "escritorio terminados con SQLite y PostgreSQL, y dos webs de clientes reales en producción. " +
      "Trabajo con código claro, pruebas básicas y documentación breve, y entrego instalado o " +
      "publicado según lo que necesites. Si algo no sé hacer, te lo digo antes de empezar.";
  }

  const cv = el("mCv");
  if (cv) {
    if (data.cvUrl) cv.href = data.cvUrl;
    else cv.style.display = "none";
  }

  // Tecnologías, agrupadas por tipo (como el resto de la página).
  const techBox = el("mTech");
  if (techBox && Array.isArray(data.tech)) {
    const order = [];
    const groups = {};
    data.tech.forEach((t) => {
      const key = t.category || "Otros";
      if (!groups[key]) {
        groups[key] = [];
        order.push(key);
      }
      groups[key].push(t.label);
    });

    techBox.innerHTML = order
      .map(
        (key) => `
      <div class="m-tech-group">
        <span class="m-tech-cat">${TECH_LABEL[key] || key}</span>
        <div class="m-chips">${groups[key].map((l) => `<span class="badge">${l}</span>`).join("")}</div>
      </div>`
      )
      .join("");
  }

  /* ---------- Contacto ---------- */
  const setLink = (id, href, text) => {
    const a = el(id);
    if (!a) return;
    a.href = href;
    a.textContent = text;
    if (href.startsWith("mailto:")) {
      a.removeAttribute("target");
      a.removeAttribute("rel");
    }
  };

  if (data.email) {
    setLink("mEmail", `mailto:${data.email}`, data.email);
    setLink("mFooterEmail", `mailto:${data.email}`, "Correo");
  }
  if (data.github) {
    const short = data.github.replace(/^https?:\/\//, "").replace(/\/$/, "");
    setLink("mGithub", data.github, short);
    setLink("mFooterGithub", data.github, "GitHub");
  }
  if (data.linkedin) {
    const short = data.linkedin.replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/\?.*$/, "");
    setLink("mLinkedin", data.linkedin, short);
    setLink("mFooterLinkedin", data.linkedin, "LinkedIn");
  }
  if (el("mFooterName")) el("mFooterName").textContent = data.name;
  if (el("mFooterCv") && data.cvUrl) el("mFooterCv").href = data.cvUrl;
  if (el("mYear")) el("mYear").textContent = String(new Date().getFullYear());

  const form = el("mForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = el("mFormNote");

      if (!form.checkValidity()) {
        form.reportValidity();
        if (note) note.textContent = "Faltan datos: escribe tu nombre, tu correo y qué necesitas.";
        return;
      }

      const nombre = el("fNombre").value.trim();
      const correo = el("fEmail").value.trim();
      const tipo = el("fTipo").value;
      const msg = el("fMsg").value.trim();

      const subject = `Proyecto: ${tipo} — ${nombre}`;
      const body =
        `Nombre: ${nombre}\n` +
        `Correo: ${correo}\n` +
        `Tipo de proyecto: ${tipo}\n\n` +
        `${msg}\n`;

      window.location.href =
        `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (note) {
        note.textContent =
          "Se ha abierto tu programa de correo con el mensaje escrito. Si no se abre, escríbeme a " +
          data.email +
          ".";
      }
    });
  }
  /* ---------- Prueba en vivo: traductor ----------
     Mismo mecanismo que la app de la iglesia: el endpoint público de Google
     Translate (sin clave) y las banderas dibujadas en SVG (Windows no tiene
     emoji de banderas). El texto se envía a ese servicio y no se guarda. */
  const DEMO = {
    en: { nombre: "English", voz: "en-US" },
    de: { nombre: "Deutsch", voz: "de-DE" },
    ro: { nombre: "Română", voz: "ro-RO" },
    pl: { nombre: "Polski", voz: "pl-PL" },
    pt: { nombre: "Português", voz: "pt-BR" }
  };

  const BANDERAS = {
    en: '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="9"/><path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" stroke-width="4"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/><path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="7"/></svg>',
    de: '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="14" fill="#000"/><rect y="13" width="60" height="14" fill="#DD0000"/><rect y="26" width="60" height="14" fill="#FFCE00"/></svg>',
    ro: '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="20" height="40" fill="#002B7F"/><rect x="20" width="20" height="40" fill="#FCD116"/><rect x="40" width="20" height="40" fill="#CE1126"/></svg>',
    pl: '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#DC143C"/></svg>',
    pt: '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#009C3B"/><path d="M30 4 57 20 30 36 3 20Z" fill="#FFDF00"/><circle cx="30" cy="20" r="9.5" fill="#002776"/><path d="M20.6 18.2c6-3 12.8-2.6 18.8.7-6 3.2-12.8 2.9-18.8-.7Z" fill="#fff"/></svg>'
  };

  const dTexto = el("demoTexto");
  const dSalida = el("demoSalida");
  const dEstado = el("demoEstado");
  const dCuenta = el("demoCuenta");
  const dLangs = el("demoLangs");
  const dLangLabel = el("demoLangLabel");
  const dEscuchar = el("demoEscuchar");
  const dCopiar = el("demoCopiar");

  if (dTexto && dSalida && dLangs) {
    let idioma = "en";
    let temporizador = null;
    let peticion = null;
    let pedido = "";

    dLangs.innerHTML = Object.keys(DEMO)
      .map(
        (k) =>
          `<button type="button" class="m-lang" data-lang="${k}" aria-pressed="false">${BANDERAS[k]}${DEMO[k].nombre}</button>`
      )
      .join("");

    const marcarIdioma = () => {
      Array.from(dLangs.children).forEach((b) => {
        const on = b.dataset.lang === idioma;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (dLangLabel) dLangLabel.textContent = DEMO[idioma].nombre;
    };

    const ponerEstado = (texto, error) => {
      if (!dEstado) return;
      dEstado.textContent = texto;
      dEstado.classList.toggle("is-error", Boolean(error));
    };

    const pintar = (texto, modo) => {
      dSalida.textContent = texto;
      dSalida.classList.toggle("is-waiting", modo === "espera");
      dSalida.classList.toggle("is-error", modo === "error");
    };

    // Los botones solo se activan cuando hay una traducción válida delante.
    const actualizar = () => {
      if (dCuenta) dCuenta.textContent = dTexto.value.length + "/400";
      const listo =
        Boolean(dSalida.textContent.trim()) &&
        !dSalida.classList.contains("is-waiting") &&
        !dSalida.classList.contains("is-error");
      if (dCopiar) dCopiar.disabled = !listo;
      if (dEscuchar) dEscuchar.disabled = !listo;
    };

    const detenerVoz = () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };

    const traducir = async () => {
      const original = dTexto.value.trim();
      pedido = original;

      if (!original) {
        pintar("Escribe algo en español y lo verás aquí.", "espera");
        ponerEstado("Listo para traducir");
        actualizar();
        return;
      }

      if (peticion) peticion.abort();
      peticion = new AbortController();
      const senal = peticion.signal;

      pintar("Traduciendo…", "espera");
      ponerEstado("Traduciendo…");
      actualizar();

      const destino = idioma === "pt" ? "pt-BR" : idioma;
      const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=" +
        destino +
        "&dt=t&q=" +
        encodeURIComponent(original);

      try {
        const res = await fetch(url, { signal: senal });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const datos = await res.json();
        if (pedido !== original) return;
        const texto = (datos[0] || [])
          .map((t) => (t && t[0]) || "")
          .join("")
          .trim();
        if (!texto) throw new Error("Respuesta vacía");
        pintar(texto);
        ponerEstado("Traducido en vivo");
      } catch (err) {
        if (err && err.name === "AbortError") return;
        // Igual que en la app real: si el servicio falla, se queda el original.
        pintar(original, "error");
        ponerEstado("No se pudo traducir ahora mismo", true);
      }
      actualizar();
    };

    dTexto.addEventListener("input", () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(traducir, 650);
      actualizar();
    });

    dLangs.addEventListener("click", (e) => {
      const boton = e.target.closest("button[data-lang]");
      if (!boton || boton.dataset.lang === idioma) return;
      idioma = boton.dataset.lang;
      marcarIdioma();
      detenerVoz();
      clearTimeout(temporizador);
      traducir();
    });

    if (dEscuchar) {
      dEscuchar.addEventListener("click", () => {
        const texto = dSalida.textContent.trim();
        if (!texto || dEscuchar.disabled || !("speechSynthesis" in window)) return;
        detenerVoz();
        const voz = new SpeechSynthesisUtterance(texto);
        voz.lang = DEMO[idioma].voz;
        voz.rate = 0.95;
        window.speechSynthesis.speak(voz);
      });
    }

    if (dCopiar) {
      dCopiar.addEventListener("click", async () => {
        const texto = dSalida.textContent.trim();
        if (!texto) return;
        try {
          await navigator.clipboard.writeText(texto);
        } catch (err) {
          const area = document.createElement("textarea");
          area.value = texto;
          area.setAttribute("readonly", "");
          area.style.position = "fixed";
          area.style.opacity = "0";
          document.body.appendChild(area);
          area.select();
          try {
            document.execCommand("copy");
          } catch (e2) {}
          area.remove();
        }
        const antes = dCopiar.textContent;
        dCopiar.textContent = "Copiado";
        setTimeout(() => {
          dCopiar.textContent = antes;
        }, 1600);
      });
    }

    marcarIdioma();
    actualizar();
    // Se traduce al cargar: así el bloque ya está listo cuando el visitante llega.
    traducir();
  }
})();
