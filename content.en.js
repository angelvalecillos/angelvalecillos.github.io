/* English version of the portfolio data.
   It reuses everything that is language-neutral (URLs, images, tech names)
   from content.js, so there is only one place to edit when a project changes. */
window.portfolioDataEN = Object.assign({}, window.portfolioData, {
  mainSkill: "Java and web developer",
  about:
    "Junior Java developer with finished desktop projects (SQLite, PostgreSQL) and front-end web work (HTML/CSS/JS + Firebase), including a real client landing in production. I focus on clear code, basic tests and short documentation. I AM NOT VIBE CODING: I write and understand every line of my code.",

  services: [
    {
      kicker: "Web",
      icon: "web",
      title: "Websites for your business",
      anchor: "web",
      description:
        "A clear website, in Spanish and English if needed, that explains what you do and takes the client to WhatsApp or the form.",
      items: ["One-page website", "Bilingual ES/EN", "Form and WhatsApp", "Built for mobile"]
    },
    {
      kicker: "Management",
      icon: "db",
      title: "Management software",
      anchor: "gestion",
      description:
        "Programs that really keep employees, clients, bookings or stock in order, with a database and users with permissions.",
      items: ["Java + PostgreSQL or SQLite", "Create, edit and search", "Reports and export", "Users and permissions"]
    },
    {
      kicker: "Desktop",
      icon: "app",
      title: "Desktop applications",
      anchor: "escritorio",
      description:
        "Internal Windows tools delivered with an installer and a manual, so nobody has to depend on you to open them.",
      items: ["Java (Swing)", ".exe installer", "Signed executable", "User manual"]
    },
    {
      kicker: "Games",
      icon: "game",
      title: "HTML5 games and experiences",
      anchor: "juegos",
      description:
        "Games that run in the browser, on PC and on mobile, with nothing to install and no external dependencies.",
      items: ["HTML5 + Canvas", "Vs AI or 2 players", "Published on itch.io", "No dependencies"]
    }
  ],

  serviceExtras: [
    "Domain and DNS (Cloudflare)",
    "Hosting and SSL certificate",
    "Backups",
    "Changes and maintenance"
  ],

  experience: [
    {
      title: "Hotel Management System",
      subtitle: "Java + PostgreSQL — In progress",
      status: "In progress",
      description:
        "Application in progress built in Java that connects to a PostgreSQL server and checks and creates the required tables on start-up; it currently handles employees, stays and the check-in and check-out process, and will later add blocking dirty or out-of-service rooms, registering and charging guest services, and other features aimed at improving hotel operations. Working legacy version (hoteles24, Java+Swing+Ant) and a modern backend rewrite (HotelProyect: Java 24, Maven, HikariCP, jBCrypt, GUI pending).",
      years: "originally 2015, recovering the code 2025-2026",
      category: "gestion",
      rank: 3,
      summary:
        "Full hotel management: employees, stays, check-in/check-out and rooms, on PostgreSQL.",
      images: ["assets/hotel1.png", "assets/hotel2.png", "assets/hotel3.png"],
      tech: ["Java", "PostgreSQL", "JDBC", "HikariCP"],
      repoUrl: "https://github.com/angelvalecillos/hotels"
    },
    {
      title: "Family Chat Room",
      subtitle: "HTML/CSS/JS + Firebase — In progress",
      status: "In progress",
      description:
        "MSN-style family chat room with login, sign-up and a dashboard. Front end complete in vanilla JS + Firebase; credentials and the public demo are still pending.",
      years: "2026 · family project",
      category: "web",
      rank: 9,
      summary:
        "MSN-style family chat with login, sign-up and admin panel, in JavaScript and Firebase.",
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      imageUrl: "assets/family-chat.jpg",
      repoUrl: "https://github.com/angelvalecillos/family-chat-room"
    }
  ],

  projects: [
    {
      title: "Aleen Photography",
      subtitle: "HTML/CSS/JS landing — In progress",
      status: "In progress",
      description:
        "Bilingual ES/EN landing page for a photographer (real client), published on Cloudflare Pages with its own private panel: she uploads, deletes and reorders photos and edits the texts without touching code. Pending: city, prices and the client's terms.",
      years: "2026 · real client (photographer)",
      category: "web",
      rank: 2,
      summary:
        "Bilingual website for a photographer, with a private panel to upload photos and edit texts without touching code.",
      tech: ["HTML", "CSS", "JavaScript", "Cloudflare Pages"],
      repoUrl: "https://github.com/angelvalecillos/aleen-fotografia",
      demoUrl: "https://eyeleanphotography.com",
      images: ["assets/aleen-pc.jpg", "assets/aleen-movil.jpg", "assets/aleen-completa.jpg"],
      videoUrl: "assets/promo-aleen.mp4",
      videoPoster: "assets/promo-aleen-poster.jpg",
      videoLabel: "Watch the video · 12 s"
    },
    {
      title: "Contact book",
      subtitle: "Java + SQLite",
      status: "Done",
      description:
        "Contact book based on the Google Contacts .csv model: imports and exports contacts, multi-language (en/fr/pt) and generates QR codes. Windows installer + user manual.",
      tech: ["Java", "SQLite", "JDBC"],
      repoUrl: "https://github.com/angelvalecillos/agenda-de-contactos",
      demoUrl: "assets/Manual-agenda.pdf",
      imageUrl: "assets/agenda.png",
      imageLayout: "scroll",
      category: "escritorio",
      rank: 6,
      summary: "Contact book with CSV import, several languages, QR codes and a Windows installer.",
      videoUrl: "assets/promo-agenda.mp4",
      videoPoster: "assets/promo-agenda-poster.jpg",
      videoLabel: "Watch the video · 12 s"
    },
    {
      title: "QR Generator",
      subtitle: "Java",
      status: "Done",
      description:
        "Turns URLs, WhatsApp contacts and group links into QR codes ready to print or share. Windows installer + manual.",
      tech: ["Java", "Maven"],
      repoUrl: "https://github.com/angelvalecillos/Generador-QR",
      demoUrl: "assets/Manual-qr.pdf",
      imageUrl: "assets/qr.png",
      imageLayout: "scroll",
      category: "escritorio",
      rank: 7,
      summary: "QR code generator for links, WhatsApp contacts and groups, ready to print.",
      videoUrl: "assets/promo-qr.mp4",
      videoPoster: "assets/promo-qr-poster.jpg",
      videoLabel: "Watch the video · 12 s"
    },
    {
      title: "Java Exe Builder",
      subtitle: "Java, cmd, Windows PowerShell",
      status: "Done",
      description:
        "Turns .jar files into portable .exe programs or installers with jpackage, and signs them with SignTool. Formerly called compilador JAVA.",
      tech: ["Java", "cmd", "Windows PowerShell"],
      repoUrl: "https://github.com/angelvalecillos/java-exe-builder",
      demoUrl: "assets/Manual-compilador.pdf",
      imageUrl: "assets/compilador-java.png",
      imageLayout: "scroll",
      category: "escritorio",
      rank: 8,
      summary: "Turns any .jar into a portable .exe or a signed installer, with a Windows wizard.",
      videoUrl: "assets/promo-compilador.mp4",
      videoPoster: "assets/promo-compilador-poster.jpg",
      videoLabel: "Watch the video · 12 s"
    },
    {
      title: "Notary Yare — Alabama",
      subtitle: "ES/EN mobile landing",
      status: "Done",
      description:
        "Bilingual landing page for a mobile notary with a services accordion, rates, WhatsApp button and a client/mobile view. Real client, LIVE on Cloudflare.",
      tech: ["HTML", "CSS", "JavaScript"],
      repoUrl: "https://github.com/angelvalecillos/notario-yare",
      demoUrl: "https://yareimanotary.com/",
      imageUrl: "assets/notario.png",
      imageLayout: "scroll",
      category: "web",
      rank: 1,
      summary: "Bilingual landing page for a mobile notary in Alabama: services, rates and direct WhatsApp.",
      videoUrl: "assets/promo-notario.mp4",
      videoPoster: "assets/promo-notario-poster.jpg",
      videoLabel: "Watch the video · 12 s"
    },
    {
      title: "Zorro y la Gallina",
      subtitle: "HTML5 board game",
      status: "Done",
      description:
        "Venezuelan board game (2 foxes vs 20 hens) in pure HTML5 with no dependencies. 2 players or against the AI, with team nicknames, sound, 'soplo', full screen and the rules on screen. Works on PC and mobile, is published on itch.io, now has its own playable page inside the portfolio and a variant ready for portals with the Poki and CrazyGames SDKs.",
      tech: ["HTML", "CSS", "JavaScript"],
      repoUrl: "https://github.com/angelvalecillos/zorro-y-la-gallina",
      demoUrl: "juego/",
      demoLabel: "Play here",
      imageUrl: "assets/zorro.jpg",
      imageLayout: "scroll",
      videoUrl: "assets/zorro-promo.mp4",
      videoPoster: "assets/zorro-promo-poster.jpg",
      videoLabel: "Watch the video · 18 s",
      category: "juegos",
      rank: 4,
      summary: "Venezuelan board game for 2 players or against the AI, in the browser and on mobile."
    },
    {
      title: "Church translator",
      subtitle: "Live captions and voice · 6 languages",
      status: "Done",
      description:
        "App for the service: the preacher speaks and every phone reads and listens to the translation in Spanish, English, German, Romanian, Polish or Brazilian Portuguese. Three views (speaker, listener and a screen for OBS), a glossary so proper names are not translated, undo and a PWA. The speaker signs in with an account and listeners need no registration; browser speech recognition, Google's public translator and Firebase with no fees. Running with a real church.",
      tech: ["HTML", "CSS", "JavaScript", "Firebase", "Web Speech API"],
      demoUrl: "https://iglesia-traductor-fd5b8.web.app",
      demoLabel: "Open app",
      imageUrl: "assets/iglesia-oyente.jpg",
      imageFit: "contain",
      imageLayout: "scroll",
      category: "web",
      rank: 5,
      summary: "Live captions and voice in 6 languages: the preacher speaks and every phone reads and listens.",
      videoUrl: "assets/promo-iglesia.mp4",
      videoPoster: "assets/promo-iglesia-poster.jpg",
      videoLabel: "Watch the video · 12 s"
    },
    {
      title: "Basic Calculator",
      subtitle: "Java + Swing",
      status: "Done (basic)",
      description:
        "Desktop calculator with history saved to a .txt file. Junior exercise with 4 classes; no Maven, no tests.",
      tech: ["Java", "Swing"],
      imageUrl: "assets/calculadora.png",
      imageLayout: "scroll",
      category: "escritorio",
      rank: 10,
      summary: "Desktop calculator with history, to practise structure and events in Java.",
      videoUrl: "assets/promo-calculadora.mp4",
      videoPoster: "assets/promo-calculadora-poster.jpg",
      videoLabel: "Watch the video · 12 s"
    },
    {
      title: "Portfolio Manager",
      subtitle: "Java 25 + Swing · local JSON",
      status: "Done",
      description:
        "My own desktop tool to keep clients, emails, phone numbers, documents, projects, payments and hosting platforms in a single JSON file. Create, delete and search, cascading deletes and field validation. Shipped as a .exe made with jpackage, with a code guide in PDF. Working MVP: no database and no automatic version control.",
      tech: ["Java", "Swing", "jpackage", "JSON"],
      imageUrl: "assets/gestor-portafolio.jpg",
      demoUrl: "assets/guia-gestor.pdf",
      demoLabel: "View guide",
      category: "gestion",
      rank: 11,
      summary: "Keeps clients, projects, payments and credentials in one file, with a Windows .exe and a code guide."
    },
    {
      title: "Dead City FPS",
      subtitle: "Three.js + Rapier + Socket.io",
      status: "In progress",
      description:
        "Technical prototype of a multiplayer open-world zombie FPS: a city split into sectors loaded on demand, Rapier physics in WASM, server-validated movement and shooting, AI zombies, PvP, damage, headshots, death and respawn. Vite + TypeScript client, Node/Socket.io server at 20 ticks/s and Firebase account or guest login. v0.2.0: working combat; loot, inventory, crafting and audio are still to come.",
      tech: ["TypeScript", "Three.js", "Node.js", "Socket.io"],
      imageUrl: "assets/dead-city-fps.jpg",
      category: "juegos",
      rank: 12,
      summary: "Multiplayer 3D FPS with a sector-based city, physics, AI zombies and server-authoritative PvPvE combat."
    },
    {
      title: "GRIME · gift calendar",
      subtitle: "Private web app + Firebase",
      status: "Done",
      description:
        "A personal advent calendar from 1 to 21 December with 21 gifts of text, photos, audio, video and links. It opens with a code that is never sent: only its SHA-256 hash travels, and Firestore rules unlock each day when its date arrives. Includes a PWA, an animated acrostic and gift playback. Private project: its link is not published so the surprise stays intact.",
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      imageUrl: "assets/grime.jpg",
      category: "web",
      rank: 13,
      summary: "Private 21-gift calendar with a hashed code, date-based unlocks, a PWA and Firestore rules."
    }
  ],

  education: [
    {
      title: "Universidad Nacional Experimental de las Fuerzas Armadas (Venezuela)",
      subtitle: "Systems Engineer",
      description:
        "designs, develops, implements and maintains technology solutions, from building software and applications to managing networks, databases and cybersecurity, optimising complex systems so they run efficiently, safely and in line with an organisation's needs",
      years: "2015",
      imageUrl: "assets/unefa.png"
    }
  ],

  languages: ["Spanish (native)", "English (B2)"],
  learning: ["AI", "OpenCode", "Firebase", "Web deployment", "Cloudflare"],
  certifications: [
    "Computer systems assembly and maintenance (IFCT0108, 370 hours)",
    "ECI Diploma (see assets/eciDiploma.pdf)",
    "Introduction to AI-assisted Development (MourDev)"
  ],
  hobbies: ["Technical reading", "Cycling"]
});
