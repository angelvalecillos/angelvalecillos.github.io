/* ==========================================================================
   MODELO 2026-10-22 — lógica de la web de contratación
   Pinta las secciones desde content.js / content.en.js (mismos datos que el
   portafolio) y añade lo nuevo: menú de especialidades, filtros de proyectos,
   formulario y traductor en vivo.

   El idioma vive en i18n.js. Aquí sólo se pregunta con t("clave") y se vuelve
   a pintar todo cuando llega el evento "langchange"; los listeners de los
   contenedores se enganchan una sola vez para no duplicarse.
   ========================================================================== */
(function () {
  const d = document;
  const root = d.documentElement;
  if (!window.portfolioData) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (id) => d.getElementById(id);
  const t = (key, vars) => (typeof window.t === "function" ? window.t(key, vars) : key);
  const lang = () => (typeof window.getLang === "function" ? window.getLang() : "es");
  const DATA = () =>
    lang() === "en" && window.portfolioDataEN ? window.portfolioDataEN : window.portfolioData;
  const externo = (url) => /^https?:/i.test(url || "");

  /* ---------- Tema claro / oscuro ---------- */
  if (localStorage.getItem("theme") === "light") root.classList.add("light");
  d.addEventListener("click", (e) => {
    if (!e.target.closest("#themeToggle")) return;
    root.classList.toggle("light");
    localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  });

  /* ---------- Etiquetas ---------- */
  const CATS = ["todos", "web", "gestion", "escritorio", "juegos"];
  const catLabel = (id) => (id === "todos" ? t("cat.all") : t("cat." + id));

  // Igual que en el portafolio: demoLabel manda; si no, .pdf = manual.
  const etiquetaDemo = (item) =>
    item.demoLabel ||
    (item.demoUrl && item.demoUrl.toLowerCase().endsWith(".pdf") ? t("proj.manual") : t("proj.site"));

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

  /* ---------- Elementos ---------- */
  const photo = el("photo");
  const photoAlt = el("photoAlt");
  const drop = el("mDrop");
  const dropBtn = el("mDropBtn");
  const mega = el("megaEsp");
  const servGrid = el("mServGrid");
  const extraServ = el("mExtraServ");
  const filters = el("mFilters");
  const grid = el("mProjGrid");
  const count = el("mCount");
  const bio = el("mBio");
  const techBox = el("mTech");
  const cv = el("mCv");
  const form = el("mForm");

  let current = "todos";
  let services = [];
  let all = [];

  /* ---------- Datos según el idioma ---------- */
  const buildData = () => {
    const data = DATA();
    services = data.services || [];
    // Se juntan terminados y en marcha en una lista ordenada por `rank`
    // (1 = primero). `category` decide el filtro.
    all = [
      ...(data.projects || []).map((p) => ({ ...p, category: p.category || "escritorio" })),
      ...(data.experience || []).map((e) => ({ ...e, category: e.category || "web" }))
    ].sort((a, b) => (a.rank || 99) - (b.rank || 99));
    return data;
  };

  /* ---------- Hero ---------- */
  const pintarHero = (data) => {
    const heroName = el("mHeroName");
    if (heroName) heroName.textContent = data.name;
    if (photo && data.photoUrl) photo.src = data.photoUrl;
  };

  // Segunda foto del avatar: fundido cada X segundos (igual que el portafolio).
  const montarAvatar = () => {
    const data = DATA();
    if (!photoAlt || !data.photoUrl2) return;
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
  };

  /* ---------- Menú de especialidades ---------- */
  const pintarMega = () => {
    if (!mega || !services.length) return;
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
         <a class="m-link" href="#especialidades">${t("spec.all")}</a>
         <a class="btn" href="#contacto">${t("nav.cta")}</a>
       </div>`;
  };

  const openDrop = () => {
    if (!drop || !dropBtn) return;
    drop.classList.add("is-open");
    dropBtn.setAttribute("aria-expanded", "true");
  };
  const closeDrop = () => {
    if (!drop || !dropBtn) return;
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
    burger.setAttribute("aria-label", t("burger.open"));
  };

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? t("burger.close") : t("burger.open"));
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
  const pintarServicios = () => {
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
        <a class="m-link" href="#proyectos" data-jump="${s.anchor}">${t("spec.examples")}</a>
      </article>`
        )
        .join("");
    }

    const data = DATA();
    if (extraServ && data.serviceExtras) {
      extraServ.innerHTML = data.serviceExtras
        .map((x) => `<li><span class="badge">${x}</span></li>`)
        .join("");
    }
  };

  /* ---------- Proyectos clasificados ---------- */
  const statusClass = (s) => {
    const v = (s || "").toLowerCase();
    if (v.includes("desarrollo") || v.includes("progress")) return "status-wip";
    if (v.includes("terminado") || v.includes("done")) return "status-ok";
    return "status-info";
  };

  const renderProjects = (filter) => {
    if (!grid) return;
    const list = filter === "todos" ? all : all.filter((p) => p.category === filter);

    grid.innerHTML = list
      .map((p) => {
        const img = p.imageUrl || (Array.isArray(p.images) ? p.images[0] : "");
        const catLabelTxt = CATS.includes(p.category) ? catLabel(p.category) : p.category;
        const status = p.status
          ? `<span class="status ${statusClass(p.status)}">${p.status}</span>`
          : "";
        const tags = (p.tech || []).slice(0, 4).map((x) => `<span class="m-tag">${x}</span>`).join("");
        const demo = p.demoUrl
          ? `<a class="btn-outline" href="${p.demoUrl}"${
              externo(p.demoUrl) ? ' target="_blank" rel="noopener"' : ""
            }>${etiquetaDemo(p)}</a>`
          : "";
        // Todas las fichas llevan a la vez al formulario de contacto.
        const pedir = `<a class="btn" href="#contacto" data-demo="${p.title}" data-cat="${p.category}">${t(
          "proj.demo"
        )}</a>`;
        const link = p.demoUrl;
        const mediaClass = "m-proj-media" + (p.imageFit === "contain" ? " is-contain" : "");
        const alt = t("proj.imgAlt", { title: p.title });
        const media = img
          ? `<img src="${img}" alt="${alt}" loading="lazy" />`
          : `<span class="m-proj-noimg"><small>${t("proj.noimg")}</small><strong>${p.title}</strong></span>`;

        // Con vídeo, la captura abre el reproductor; el juego sigue en los botones.
        const badge = p.videoUrl
          ? `<span class="m-play"><span class="m-play-ico" aria-hidden="true">▶</span>${p.videoLabel || "▶"}</span>`
          : "";
        const mediaBlock = p.videoUrl
          ? `<button type="button" class="${mediaClass} is-video" data-video="${p.videoUrl}" data-poster="${p.videoPoster || ""}" data-video-title="${p.title}" aria-label="${t(
              "proj.videoAria",
              { title: p.title }
            )}">${media}${badge}</button>`
          : link
            ? `<a class="${mediaClass}" href="${link}"${
                externo(link) ? ' target="_blank" rel="noopener"' : ""
              } aria-label="${
                externo(link) ? t("proj.newtab", { title: p.title }) : p.title
              }">${media}</a>`
            : `<div class="${mediaClass}">${media}</div>`;

        return `
        <article class="m-proj">
          ${mediaBlock}
          <div class="m-proj-body">
            <div class="m-proj-meta">
              <span class="m-cat">${catLabelTxt}</span>
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
      count.textContent = `${list.length} ${list.length === 1 ? t("proj.countOne") : t("proj.countMany")}`;
    }
  };

  const setFilter = (id) => {
    if (!CATS.includes(id)) id = "todos";
    current = id;
    if (filters) {
      Array.from(filters.children).forEach((b) => {
        const on = b.dataset.filter === id;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
    }
    renderProjects(id);
  };

  const pintarFiltros = () => {
    if (!filters || !grid) return;
    if (!CATS.includes(current)) current = "todos";

    filters.innerHTML = CATS.map((id) => {
      const n = id === "todos" ? all.length : all.filter((p) => p.category === id).length;
      const on = id === current;
      return `<button type="button" class="m-filter${on ? " is-active" : ""}" data-filter="${id}" aria-pressed="${on}">${catLabel(
        id
      )} <span>${n}</span></button>`;
    }).join("");

    renderProjects(current);
  };

  if (filters) {
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (btn) setFilter(btn.dataset.filter);
    });
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
  const ORDEN_TIPO = { web: 0, gestion: 1, escritorio: 2, juegos: 3 };
  let mensajeDemo = "";

  if (grid) {
    grid.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-demo]");
      if (!a) return;

      const tipo = el("fTipo");
      const msg = el("fMsg");
      const indice = ORDEN_TIPO[a.dataset.cat];
      if (tipo && typeof indice === "number") tipo.selectedIndex = indice;

      if (msg) {
        const texto = msg.value.trim();
        // Sólo se sustituye si está vacío o sigue siendo el mensaje automático.
        if (!texto || texto === mensajeDemo) {
          mensajeDemo = t("form.demoMsg", { title: a.dataset.demo });
          msg.value = mensajeDemo;
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

  /* ---------- Vídeo de la ficha ----------
     El MP4 NO se descarga al cargar la página: se pide al abrir el
     reproductor y, al cerrarlo, se suelta de la memoria. */
  let vDlg = null;
  let vVideo = null;

  const montarVideo = () => {
    vDlg = document.createElement("dialog");
    vDlg.className = "m-video";
    vDlg.setAttribute("aria-label", t("video.aria"));
    vDlg.innerHTML = `
      <div class="m-video-box">
        <div class="m-video-frame">
          <video controls playsinline preload="none" width="1080" height="1920"></video>
          <button type="button" class="m-video-x" aria-label="${t("video.close")}">✕</button>
        </div>
        <p class="m-video-cap"></p>
      </div>`;
    document.body.appendChild(vDlg);
    vVideo = vDlg.querySelector("video");

    vDlg.querySelector(".m-video-x").addEventListener("click", () => vDlg.close());
    // Un clic en el fondo oscuro (fuera de la caja) también cierra.
    vDlg.addEventListener("click", (e) => {
      if (!e.target.closest(".m-video-box")) vDlg.close();
    });
    vDlg.addEventListener("close", () => {
      vVideo.pause();
      vVideo.removeAttribute("src");
      vVideo.load();
      document.documentElement.classList.remove("video-abierto");
    });
  };

  const abrirVideo = (src, poster, titulo) => {
    if (!vDlg) montarVideo();
    vVideo.poster = poster || "";
    vVideo.src = src;
    vDlg.querySelector(".m-video-cap").textContent = titulo;
    document.documentElement.classList.add("video-abierto");
    if (typeof vDlg.showModal === "function") vDlg.showModal();
    else vDlg.setAttribute("open", "");
    const intento = vVideo.play();
    // Si el navegador bloquea la reproducción automática, quedan los controles.
    if (intento && intento.catch) intento.catch(() => {});
  };

  if (grid) {
    grid.addEventListener("click", (e) => {
      const vid = e.target.closest("[data-video]");
      if (!vid) return;
      e.preventDefault();
      abrirVideo(vid.dataset.video, vid.dataset.poster, vid.dataset.videoTitle);
    });
  }

  /* ---------- Sobre mí ---------- */
  const pintarBio = () => {
    if (bio) bio.textContent = t("about.bio");
    if (cv) {
      const data = DATA();
      if (data.cvUrl) cv.href = data.cvUrl;
      else cv.style.display = "none";
    }
  };

  // Tecnologías, agrupadas por tipo (como el resto de la página).
  const pintarTech = () => {
    const data = DATA();
    if (!techBox || !Array.isArray(data.tech)) return;

    const order = [];
    const groups = {};
    data.tech.forEach((item) => {
      const key = item.category || "Otros";
      if (!groups[key]) {
        groups[key] = [];
        order.push(key);
      }
      groups[key].push(item.label);
    });

    techBox.innerHTML = order
      .map(
        (key) => `
      <div class="m-tech-group">
        <span class="m-tech-cat">${t("tech." + key)}</span>
        <div class="m-chips">${groups[key].map((l) => `<span class="badge">${l}</span>`).join("")}</div>
      </div>`
      )
      .join("");
  };

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

  const pintarContacto = () => {
    const data = DATA();

    if (data.email) {
      setLink("mEmail", `mailto:${data.email}`, data.email);
      setLink("mFooterEmail", `mailto:${data.email}`, t("footer.email"));
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

    const note = el("mFormNote");
    if (note) note.textContent = "";
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = el("mFormNote");

      if (!form.checkValidity()) {
        form.reportValidity();
        if (note) note.textContent = t("form.missing");
        return;
      }

      const data = DATA();
      const nombre = el("fNombre").value.trim();
      const correo = el("fEmail").value.trim();
      const tipo = el("fTipo").value;
      const msg = el("fMsg").value.trim();

      const subject = t("form.subject", { tipo, nombre });
      const body =
        `${t("form.bodyName")}: ${nombre}\n` +
        `${t("form.bodyEmail")}: ${correo}\n` +
        `${t("form.bodyType")}: ${tipo}\n\n` +
        `${msg}\n`;

      window.location.href =
        `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (note) note.textContent = t("form.sent", { email: data.email });
    });
  }

  /* ---------- Prueba en vivo: traductor ----------
     Mismo mecanismo que la app de la iglesia: el endpoint público de Google
     Translate (sin clave) y las banderas dibujadas en SVG (Windows no tiene
     emoji de banderas). El texto se envía a ese servicio y no se guarda.
     El idioma de origen sigue al de la web: español → inglés, y al revés. */
  const IDIOMAS = [
    { id: "en", nombre: "English", voz: "en-US" },
    { id: "es", nombre: "Español", voz: "es-ES" },
    { id: "de", nombre: "Deutsch", voz: "de-DE" },
    { id: "ro", nombre: "Română", voz: "ro-RO" },
    { id: "pl", nombre: "Polski", voz: "pl-PL" },
    { id: "pt", nombre: "Português", voz: "pt-BR" }
  ];

  const BANDERAS = {
    en:
      '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="9"/><path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" stroke-width="4"/><path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="13"/><path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="7"/></svg>',
    es:
      '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/><path d="M14 17h7v9h-7z" fill="#AA151B" opacity=".85"/><path d="M23 19h5v5h-5z" fill="#AA151B" opacity=".5"/></svg>',
    de:
      '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="14" fill="#000"/><rect y="13" width="60" height="14" fill="#DD0000"/><rect y="26" width="60" height="14" fill="#FFCE00"/></svg>',
    ro:
      '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="20" height="40" fill="#002B7F"/><rect x="20" width="20" height="40" fill="#FCD116"/><rect x="40" width="20" height="40" fill="#CE1126"/></svg>',
    pl:
      '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="20" fill="#fff"/><rect y="20" width="60" height="20" fill="#DC143C"/></svg>',
    pt:
      '<svg viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#009C3B"/><path d="M30 4 57 20 30 36 3 20Z" fill="#FFDF00"/><circle cx="30" cy="20" r="9.5" fill="#002776"/><path d="M20.6 18.2c6-3 12.8-2.6 18.8.7-6 3.2-12.8 2.9-18.8-.7Z" fill="#fff"/></svg>'
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
    let origen = "es";
    let idioma = "en";
    let temporizador = null;
    let peticion = null;
    let pedido = "";
    let defaultActual = null;

    const destinos = () => IDIOMAS.filter((x) => x.id !== origen);
    const datosIdioma = (id) => IDIOMAS.find((x) => x.id === id) || IDIOMAS[0];

    const marcarIdioma = () => {
      Array.from(dLangs.children).forEach((b) => {
        const on = b.dataset.lang === idioma;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (dLangLabel) dLangLabel.textContent = datosIdioma(idioma).nombre;
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
      const desde = origen;
      pedido = original;

      if (!original) {
        pintar(t("try.waiting"), "espera");
        ponerEstado(t("try.ready"));
        actualizar();
        return;
      }

      if (peticion) peticion.abort();
      peticion = new AbortController();
      const senal = peticion.signal;

      pintar(t("try.translating"), "espera");
      ponerEstado(t("try.translating"));
      actualizar();

      const destino = idioma === "pt" ? "pt-BR" : idioma;
      const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
        desde +
        "&tl=" +
        destino +
        "&dt=t&q=" +
        encodeURIComponent(original);

      try {
        const res = await fetch(url, { signal: senal });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const datos = await res.json();
        if (pedido !== original) return;
        const texto = (datos[0] || [])
          .map((trozo) => (trozo && trozo[0]) || "")
          .join("")
          .trim();
        if (!texto) throw new Error("Respuesta vacía");
        pintar(texto);
        ponerEstado(t("try.done"));
      } catch (err) {
        if (err && err.name === "AbortError") return;
        // Igual que en la app real: si el servicio falla, se queda el original.
        pintar(original, "error");
        ponerEstado(t("try.error"), true);
      }
      actualizar();
    };

    // Rehace las banderas y el texto de ejemplo cuando cambia el idioma.
    const pintarDemo = () => {
      origen = lang() === "en" ? "en" : "es";
      const lista = destinos();
      if (!lista.some((x) => x.id === idioma)) idioma = lista[0].id;

      dLangs.innerHTML = lista
        .map(
          (x) =>
            `<button type="button" class="m-lang" data-lang="${x.id}" aria-pressed="false">${BANDERAS[x.id]}${x.nombre}</button>`
        )
        .join("");
      marcarIdioma();

      const nuevo = t("try.defaultText");
      const actual = dTexto.value.trim();
      if (defaultActual === null || !actual || actual === defaultActual) dTexto.value = nuevo;
      defaultActual = nuevo;

      if (dCopiar) dCopiar.textContent = t("try.copy");
      detenerVoz();
      actualizar();
      traducir();
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
        voz.lang = datosIdioma(idioma).voz;
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
        dCopiar.textContent = t("try.copied");
        setTimeout(() => {
          dCopiar.textContent = t("try.copy");
        }, 1600);
      });
    }

    d.addEventListener("langchange", pintarDemo);
    // Se pinta al cargar: así el bloque ya está listo cuando el visitante llega.
    window.setTimeout(pintarDemo, 0);
  }

  /* ---------- Pinta todo (y repinta al cambiar de idioma) ---------- */
  const pintarTodo = () => {
    const data = buildData();
    pintarHero(data);
    pintarMega();
    pintarServicios();
    pintarFiltros();
    pintarBio();
    pintarTech();
    pintarContacto();
  };

  d.addEventListener("langchange", pintarTodo);

  montarAvatar();
  pintarTodo();
})();
