// Rellena con tu información (conciso y sincero).
window.portfolioData = {
  name: "Angel Valecillos",
  mainSkill: "Programador Java (Junior)",
  location: "Salamanca, Salamanca",
  email: "angel.valecillos1981@gmail.com",
  cvUrl: "assets/CV.pdf",
  photoUrl: "assets/foto.jpg",
  photoUrl2: "assets/foto2-avatar.jpg", // 2ª foto del avatar (entra con fundido)
  photoIntervalMs: 7000,                // cada cuánto alterna (7 s)

  github: "https://github.com/angelvalecillos",
  linkedin: "https://www.linkedin.com/in/angel-eduardo-valecillos-ab4b5b57",
  website: "",

  about:
    "Programador Java Junior con proyectos terminados en escritorio (SQLite, PostgreSQL) y desarrollo web front-end (HTML/CSS/JS + Firebase), incluyendo una landing de cliente real en producción. Me enfoco en código claro, pruebas básicas y documentación breve. NO SOY VIBE CODING: escribo y entiendo cada línea de mi código.",

  tech: [
    { label: "Java", category: "Backend/frontend" },
    { label: "Swing", category: "Desktop" },
    { label: "SQLite", category: "DB" },
    { label: "PostgreSQL", category: "DB" },
    { label: "JDBC", category: "Backend" },
    { label: "HikariCP", category: "Backend" },
    { label: "jBCrypt", category: "Backend" },
    { label: "Maven", category: "Build" },
    { label: "Ant / NetBeans", category: "Build" },
    { label: "jpackage / Launch4j", category: "Deploy" },
    { label: "GitHub Pages", category: "Deploy" },
    { label: "Cloudflare", category: "Deploy" },
    { label: "HTML", category: "Web" },
    { label: "CSS", category: "Web" },
    { label: "JavaScript", category: "Web" },
    { label: "Canvas HTML5", category: "Web" },
    { label: "Firebase", category: "Web" },
    { label: "OpenCode (IA)", category: "Tools" },
    { label: "Git/GitHub", category: "Tools" }
  ],

  experience: [
    {
      title: "Sistema Gestión Hotelera",
      subtitle: "Java + PostgreSQL — En desarrollo",
      status: "En desarrollo",
      description:
        "Aplicación en desarrollo construida en Java que se conecta a un servidor PostgreSQL y, al iniciar, verifica y crea automáticamente las tablas necesarias; actualmente gestiona empleados, estadías, procesos de check-in y check-out, y a futuro incorporará el bloqueo de habitaciones sucias o en mantenimiento, el registro y cobro de servicios de comensales, entre otras funcionalidades orientadas a optimizar la operación hotelera. Versión legacy funcional (hoteles24, Java+Swing+Ant) y rewrite moderno del backend (HotelProyect: Java 24, Maven, HikariCP, jBCrypt, GUI pendiente).",
      years: "original en 2015, recuperando código 2025-2026",
      images: [
        "assets/hotel1.png",
        "assets/hotel2.png",
        "assets/hotel3.png"
      ],
      // Lenguajes/herramientas usados
      tech: ["Java", "PostgreSQL", "JDBC", "HikariCP"],
      // Código del proyecto
      repoUrl: "https://github.com/angelvalecillos/hotels"
      // demoUrl: "https://tu-demo.com" // opcional
    },
    {
      title: "Family Chat Room",
      subtitle: "HTML/CSS/JS + Firebase — En desarrollo",
      status: "En desarrollo",
      description:
        "Chat web familiar estilo MSN con login, registro y dashboard. Front completo en vanilla JS + Firebase; pendiente configurar credenciales y desplegar la demo.",
      years: "2026 · proyecto familiar",
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      repoUrl: "https://github.com/angelvalecillos/family-chat-room"
    },
    {
      title: "Aleen Fotografía",
      subtitle: "Landing HTML/CSS/JS — En desarrollo",
      status: "En desarrollo",
      description:
        "Landing bilingüe ES/EN para fotógrafa (cliente real), publicada en Cloudflare Pages con panel privado propio: sube, borra y reordena las fotos y edita los textos sin tocar código. Pendiente: ciudad, precios y condiciones de la clienta.",
      years: "2026 · cliente real (fotógrafa)",
      tech: ["HTML", "CSS", "JavaScript", "Cloudflare Pages"],
      repoUrl: "https://github.com/angelvalecillos/aleen-fotografia",
      demoUrl: "https://eyeleanphotography.com",
      // Capturas nuevas (2026-10-18): banner de escritorio, vista móvil
      // (en inglés, para que se vea el conmutador ES/EN) y página completa.
      images: [
        "assets/aleen-pc.jpg",
        "assets/aleen-movil.jpg",
        "assets/aleen-completa.jpg"
      ]
    }
  ],

  projects: [
    {
      title: "Agenda de contactos",
      subtitle: "Java + SQLite",
      status: "Terminado",
      description:
        "Agenda basada en el modelo .csv de Google Contacts: importa/exporta contactos, multi-idioma (en/fr/pt) y genera QR. Instalador Windows + manual de usuario.",
      tech: ["Java", "SQLite", "JDBC"],
      repoUrl: "https://github.com/angelvalecillos/agenda-de-contactos",
      demoUrl: "assets/Manual-agenda.pdf",
      imageUrl: "assets/agenda.png",
      imageLayout: "scroll"
    },
    {
      title: "Generador QR",
      subtitle: "Java",
      status: "Terminado",
      description:
        "Transforma URLs, contactos de WhatsApp y enlaces a grupos en códigos QR listos para imprimir o compartir. Instalador Windows + manual.",
      tech: ["Java", "Maven"],
      repoUrl: "https://github.com/angelvalecillos/Generador-QR",
      demoUrl: "assets/Manual-qr.pdf",
      imageUrl: "assets/qr.png",
      imageLayout: "scroll"
    },
    {
      title: "Java Exe Builder",
      subtitle: "Java, cmd, Windows PowerShell",
      status: "Terminado",
      description: "Convierte .jar en .exe portátiles o instaladores con jpackage y firma con SignTool. Antes llamado compilador JAVA.",
      tech: ["Java", "cmd", "Windows PowerShell"],
      repoUrl: "https://github.com/angelvalecillos/java-exe-builder",
      demoUrl: "assets/Manual-compilador.pdf",
      imageUrl: "assets/compilador-java.png",
      imageLayout: "scroll"
    },
    {
      title: "Notario Yare — Alabama",
      subtitle: "Landing ES/EN móvil",
      status: "Terminado",
      description:
        "Landing bilingüe para notario móvil con acordeón de servicios, tarifas, botón WhatsApp y versión cliente/móvil. Cliente real, EN PRODUCCIÓN con Cloudflare.",
      tech: ["HTML", "CSS", "JavaScript"],
      repoUrl: "https://github.com/angelvalecillos/notario-yare",
      demoUrl: "https://yareimanotary.com/",
      imageUrl: "assets/notario.png",
      imageLayout: "scroll"
    },
    {
      title: "Zorro y la Gallina",
      subtitle: "Juego de mesa HTML5",
      status: "Terminado",
      description:
        "Juego de mesa venezolano (2 zorros vs 20 gallinas) en HTML5 puro sin dependencias. 2 jugadores o contra IA, con apodos por bando, sonido, soplo, pantalla completa y reglas en pantalla. Funciona en PC y móvil.",
      tech: ["HTML", "CSS", "JavaScript"],
      repoUrl: "https://github.com/angelvalecillos/zorro-y-la-gallina",
      imageUrl: "assets/zorro.jpg",
      imageLayout: "scroll"
    },
    {
      title: "Calculadora Básica",
      subtitle: "Java + Swing",
      status: "Terminado (básico)",
      description:
        "Calculadora de escritorio con historial en .txt. Ejercicio junior de 4 clases; sin Maven ni tests.",
      tech: ["Java", "Swing"],
      imageUrl: "assets/calculadora.png",
      imageLayout: "scroll"
    }
  ],

  education: [
    {
      title: "Universidad Nacional Experimental de las Fuerzas Armadas (Venezuela)",
      subtitle: "Ingeniero de Sistemas",
      description: "diseña, desarrolla, implementa y mantiene soluciones tecnológicas, abarcando desde la creación de software y aplicaciones hasta la gestión de redes, bases de datos y ciberseguridad, optimizando sistemas complejos para que funcionen de manera eficiente, segura y alineada a las necesidades de una organización",
      years: "2015",
      imageUrl: "assets/unefa.png"
    }
  ],

  languages: ["Español (nativo)", "Inglés (B2)"],
  learning: ["IA", "OpenCode", "Firebase", "Despliegue web", "Cloudflare"],
  certifications: ["OPERACIONES AUXILIARES DE MONTAJE Y MANTENIMIENTO DE SISTEMAS MICROINFORMÁTICOS IFCT0108 (370 horas)", "ECI Diploma (ver assets/eciDiploma.pdf)", "Curso de Iniciación al Desarrollo con IA (MourDev)"],
  hobbies: ["Lectura técnica","Ciclismo"]
};