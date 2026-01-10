// Rellena con tu información (conciso y sincero).
window.portfolioData = {
  name: "Angel Valecillos",
  mainSkill: "Programador Java (Junior)",
  location: "Salamanca, Salamanca",
  email: "angel.valecillos1981@gmail.com",
  cvUrl: "assets/CV.pdf",
  photoUrl: "assets/foto.jpg",

  github: "https://github.com/angelvalecillos",
  linkedin: "https://www.linkedin.com/in/angel-eduardo-valecillos-ab4b5b57",
  website: "",

  about:
    "Programador Java sin experiencia laboral, con proyectos Java personales en SQLite y PostgreSQL. Me enfoco en escribir código claro, pruebas básicas y documentación breve.",

  tech: [
    { label: "Java", category: "Backend/frontend" },
    { label: "SQLite", category: "DB" },
    { label: "PostgreSQL", category: "DB" },
    { label: "JDBC", category: "Backend" },
    { label: "Maven/Gradle", category: "Build" },
    { label: "HTML", category: "Web" },
    { label: "CSS", category: "Web" },
    { label: "JavaScript", category: "Web" },
    { label: "Git/GitHub", category: "Tools" }
  ],

  experience: [
    {
      title: "Gestor de Hotel",
      subtitle: "CRUD",
      description:
        "Aplicación en desarrollo construida en Java que se conecta a un servidor PostgreSQL y, al iniciar, verifica y crea automáticamente las tablas necesarias; actualmente gestiona empleados, estadías, procesos de check-in y check-out, y a futuro incorporará el bloqueo de habitaciones sucias o en mantenimiento, el registro y cobro de servicios de comensales, entre otras funcionalidades orientadas a optimizar la operación hotelera.",
      years: "orginal en 2015, recuperando codigo 2025-2026",
      images: [
        "assets/hotel1.png",
        "assets/hotel2.png",
        "assets/hotel3.png"
      ],
      // Lenguajes/herramientas usados
      tech: ["Java", "PostgreSQL", "JDBC"],
      // Código del proyecto
      repoUrl: "https://github.com/angelvalecillos/hotels"
      // demoUrl: "https://tu-demo.com" // opcional
    }
  ],

  projects: [
    {
      title: "Agenda de contactos",
      subtitle: "Java + SQLite",
      description:
        "agenda de contactos basada en el modelo .csv de google contacts capaz de importar, exportar contactos de google contacts. multi idomas y puede generar QR para guardar contactos.",
      tech: ["Java", "SQLite", "JDBC"],
      repoUrl: "https://github.com/angelvalecillos/agenda-de-contactos",
      demoUrl: "",
      imageUrl: "assets/agenda.png",
      imageLayout: "scroll" // ← activa el contenedor con scroll
    },
    {
      title: "Generador QR",
      subtitle: "Java",
      description:
        "es una herramienta en Java que simplifica la transición del mundo físico al digital. Permite transformar URLs, contactos de WhatsApp y enlaces a grupos en códigos QR de alta calidad, listos para imprimir o compartir digitalmente de forma inmediata.",
      tech: ["Java", "Maven"],
      repoUrl: "https://github.com/angelvalecillos/Generador-QR",
      demoUrl: "",
      imageUrl: "assets/qr.png",
      imageLayout: "scroll"
    },
    {
      title: "compilador JAVA ",
      subtitle: "Java, cmd, Windows PowerShell",
      description: "Java Executable Builder convierte archivos .jar en ejecutables de Windows (** .exe**). Crea aplicaciones portátiles o instaladores profesionales de forma rápida, asegurando un despliegue nativo y eficiente.",
      tech: ["Java", "cmd", "Windows PowerShell"],
      repoUrl: "https://github.com/angelvalecillos/compilador-JAVA",
      demoUrl: "",
      imageUrl: "assets/compilador JAVA.png",
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
  learning: ["IA"],
  certifications: ["OPERACIONES AUXILIARES DE MONTAJE Y MANTENIMIENTO DE SISTEMAS MICROINFORMÁTICOS IFCT0108 (370 horas)"],
  hobbies: ["Lectura técnica","Ciclismo"]
};