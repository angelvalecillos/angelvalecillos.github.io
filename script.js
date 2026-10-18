(function () {
  const d = document;
  const root = d.documentElement;

  // Dark/Light
  const stored = localStorage.getItem("theme");
  if (stored === "light") root.classList.add("light");
  d.addEventListener("click", (e) => {
    if (e.target.id === "themeToggle") {
      root.classList.toggle("light");
      localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
    }
  });

  const data = window.portfolioData;

  // Color de la píldora según estado (codifica información, no decora)
  const statusClass = (s) => {
    const t = (s || "").toLowerCase();
    if (t.includes("desarrollo")) return "status-wip";
    if (t.includes("avanzado")) return "status-adv";
    if (t.includes("terminado")) return "status-ok";
    return "status-info";
  };

  // Header
  d.getElementById("name").textContent = data.name;
  d.getElementById("mainSkill").textContent = data.mainSkill;
  d.getElementById("location").textContent = data.location;
  d.getElementById("footerName").textContent = data.name;

  const photo = d.getElementById("photo");
  if (data.photoUrl) photo.src = data.photoUrl;

  // Segunda foto del avatar: aparece con un fundido sobre la primera cada
  // cierto tiempo (por defecto 7 s). Si no hay segunda foto, no hace nada.
  const photoAlt = d.getElementById("photoAlt");
  if (photoAlt && data.photoUrl2) {
    photoAlt.src = data.photoUrl2;

    const ms = Number(data.photoIntervalMs) > 999 ? Number(data.photoIntervalMs) : 7000;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      photoAlt.classList.add("no-fade"); // sin animación si el usuario lo pide
    }

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

  // Contact chips
  const contacts = d.getElementById("contacts");
  const footerContacts = d.getElementById("footerContacts");
  const chip = (href, text, icon = "🔗") => {
    const a = d.createElement("a");
    a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.className = "contact-chip"; a.textContent = `${icon} ${text}`;
    return a;
  };
  if (data.email) contacts.appendChild(chip(`mailto:${data.email}`, data.email, "✉️"));
  if (data.github) contacts.appendChild(chip(data.github, "GitHub", "🐙"));
  if (data.linkedin) contacts.appendChild(chip(data.linkedin, "LinkedIn", "💼"));
  if (data.website) contacts.appendChild(chip(data.website, "Web", "🌐"));
  footerContacts.innerHTML = contacts.innerHTML;

  // CV button
  const cvBtn = d.getElementById("cvButton");
  cvBtn.disabled = !data.cvUrl;
  cvBtn.addEventListener("click", () => data.cvUrl && window.open(data.cvUrl, "_blank"));

  // About
  d.getElementById("about").textContent = data.about;

  // Tech badges
  const techBadges = d.getElementById("techBadges");
  data.tech.forEach((t) => {
    const span = d.createElement("span");
    span.className = "badge";
    span.textContent = `${t.label} · ${t.category}`;
    techBadges.appendChild(span);
  });

  // Experiencia: tarjetas con tags (tech), estado y acciones (Código/Demo)
  const expList = d.getElementById("experienceList");
  data.experience.forEach((e) => {
    const card = d.createElement("div");
    card.className = "card";

    const tags = (e.tech || []).map((t) => `<span class="tag">${t}</span>`).join("");
    const status = e.status ? `<span class="status ${statusClass(e.status)}">${e.status}</span>` : "";
    const years = e.years ? `<div class="muted">${e.years}</div>` : "";

    card.innerHTML = `
      <h3>${e.title} ${status}</h3>
      <p class="subtitle">${e.subtitle}</p>
      <p class="description">${e.description}</p>
      ${tags ? `<div class="tag-row">${tags}</div>` : ""}
      ${years}
    `;

    // Imágenes (viewports verticales)
    if (Array.isArray(e.images) && e.images.length) {
      const stack = d.createElement("div");
      stack.className = "exp-row";

      e.images.slice(0, 3).forEach((src, idx) => {
        if (!src) return;

        const box = d.createElement("div");
        box.className = "media-viewport";

        const img = d.createElement("img");
        img.className = "project-media";
        img.alt = `Imagen ${idx + 1} de ${e.title}`;
        img.src = src;

        box.appendChild(img);
        stack.appendChild(box);
      });

      card.appendChild(stack);
    }

    // Acciones (Código/Demo)
    if (e.repoUrl || e.demoUrl) {
      const actions = d.createElement("div");
      actions.className = "card-actions";

      if (e.repoUrl) {
        const codeLink = d.createElement("a");
        codeLink.className = "btn-outline";
        codeLink.href = e.repoUrl;
        codeLink.target = "_blank";
        codeLink.rel = "noopener";
        codeLink.textContent = "Código";
        actions.appendChild(codeLink);
      }

      if (e.demoUrl) {
        const demoLink = d.createElement("a");
        demoLink.className = "btn";
        demoLink.href = e.demoUrl;
        demoLink.target = "_blank";
        demoLink.rel = "noopener";
        // Misma etiqueta que en Proyectos: si es un PDF es el manual, si no, el sitio.
        demoLink.textContent = e.demoUrl.toLowerCase().endsWith(".pdf") ? "Manual.pdf" : "Ver sitio";
        actions.appendChild(demoLink);
      }

      card.appendChild(actions);
    }

    expList.appendChild(card);
  });

  // Proyectos
  const projList = document.getElementById("projectList");
  data.projects.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    const tags = (p.tech || []).map((t) => `<span class="tag">${t}</span>`).join("");
    const status = p.status ? `<span class="status ${statusClass(p.status)}">${p.status}</span>` : "";

    const media =
      p.imageUrl
        ? (p.imageLayout === "scroll"
            ? `<div class="media-viewport"><img class="project-media" alt="Imagen del proyecto ${p.title}" src="${p.imageUrl}" /></div>`
            : `<img class="project-media" alt="Imagen del proyecto ${p.title}" src="${p.imageUrl}" />`)
        : "";

    const demoLabel = p.demoUrl && p.demoUrl.toLowerCase().endsWith(".pdf") ? "Manual.pdf" : "Ver sitio";
    const actions = `
      <div class="card-actions">
        ${p.repoUrl ? `<a class="btn-outline" href="${p.repoUrl}" target="_blank" rel="noopener">Código</a>` : ""}
        ${p.demoUrl ? `<a class="btn" href="${p.demoUrl}" target="_blank" rel="noopener">${demoLabel}</a>` : ""}
      </div>
    `;

    card.innerHTML = `
      <h3>${p.title} ${status}</h3>
      <p class="subtitle">${p.subtitle}</p>
      <p class="description">${p.description}</p>
      <div class="tag-row">${tags}</div>
      ${media}
      ${actions}
    `;

    projList.appendChild(card);
  });

  // Render listas extra incluyendo contribuciones/blog si existen
  const renderExtra = (id, arr, renderItem) => {
    const ul = d.getElementById(id);
    if (!ul || !arr) return;
    ul.innerHTML = arr
      .map((item) =>
        typeof item === "string"
          ? `<li>${item}</li>`
          : `<li><a href="${item.url}" target="_blank" rel="noopener">${item.label}</a></li>`
      )
      .join("");
  };

  // Formación
  const eduList = d.getElementById("educationList");
  data.education.forEach((e) => {
    const card = d.createElement("div");
    card.className = e.imageUrl ? "card card-edu" : "card";

    const media = e.imageUrl
      ? `<div class="edu-media">
           <img class="edu-image" alt="Logo/imagen de ${e.title}" src="${e.imageUrl}" />
         </div>`
      : "";

    card.innerHTML = `
      <div class="edu-content">
        <h3>${e.title}</h3>
        <p class="subtitle">${e.subtitle}</p>
        <p class="description">${e.description}</p>
        <div class="muted">${e.years}</div>
      </div>
      ${media}
    `;

    eduList.appendChild(card);
  });

  // Extra lists
  const fill = (id, arr) => {
    const ul = d.getElementById(id);
    if (!ul || !arr) return;
    ul.innerHTML = arr.map((item) => `<li>${item}</li>`).join("");
  };
  fill("languages", data.languages);
  fill("learning", data.learning);
  fill("certifications", data.certifications);
  fill("hobbies", data.hobbies);
  renderExtra("contributions", data.contributions);
  renderExtra("blog", data.blog);
})();