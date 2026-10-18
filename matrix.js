/* ------------------------------------------------------------------
   Fondo "Matrix" del portafolio (2026-10-18)
   ------------------------------------------------------------------
   Dos capas sobre canvas, siempre DETRÁS del contenido y sin bloquear
   clics:
     1) #matrix     -> lluvia de tokens de código (if, for, SELECT, {})
                       con estela, como en la película.
     2) #matrixCode -> líneas de código legibles que bajan muy despacio
                       (Java, HTML, CSS, JS y SQL reales).

   Reglas cumplidas:
     - Sin librerías ni peticiones de red.
     - Respeta prefers-reduced-motion (dibuja un fotograma fijo).
     - Se pausa cuando la pestaña no está visible.
     - Cada 2-3 minutos baja UNA columna en verde brillante con brillo
       (glow), para que resalte entre la lluvia normal.
------------------------------------------------------------------ */
(function () {
  const rain = document.getElementById("matrix");
  const code = document.getElementById("matrixCode");
  if (!rain || !code) return;

  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Paleta: se lee de las variables CSS (cambia con el tema) ---
  let color = "#63e08f";
  let head = "#d9ffe9";
  let hot = "#a6ffcc";
  function readPalette() {
    const s = getComputedStyle(root);
    color = (s.getPropertyValue("--matrix-char") || "").trim() || "#63e08f";
    head = (s.getPropertyValue("--matrix-head") || "").trim() || "#d9ffe9";
    hot = (s.getPropertyValue("--matrix-hot") || "").trim() || "#a6ffcc";
  }

  // --- Tokens que caen (símbolos y palabras reales del oficio) ---
  const TOKENS = [
    "if", "for", "int", "new", "var", "let", "db", "sql", "css", "js",
    "id", "str", "x=0", "i;", "n;", "0;", "()", "{}", "[]", "=>", "==",
    "&&", "||", "++", "--", "div", "px", "<?>", "</>", "s+c", "e();",
  ];

  // --- Líneas de código que flotan lentamente ---
  const SNIPPETS = [
    'public static void main(String[] args)',
    'System.out.println("Hola");',
    'SELECT id, nombre FROM clientes WHERE activo = 1',
    'INSERT INTO pedidos (fecha, total) VALUES (?, ?)',
    'JOIN facturas f ON f.cliente_id = c.id',
    'CREATE TABLE usuario (id INTEGER PRIMARY KEY);',
    '.container { display: flex; gap: 16px; }',
    '@media (max-width: 640px) { ... }',
    '<div class="card"> <h3>Proyecto</h3> </div>',
    'document.getElementById("app")',
    'addEventListener("click", () => {})',
    'const res = await fetch(url);',
    'for (int i = 0; i < n; i++) { ... }',
    'try { ... } catch (Exception e) { ... }',
    'git commit -m "fix: validación de formulario"',
  ];

  const FONT = 15;   // tamaño de letra (px)
  const COL = 54;    // ancho de cada columna de lluvia (px)
  const SPEED_MIN = 0.08;   // celdas por fotograma: caída lenta
  const SPEED_MAX = 0.3;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];

  const rctx = rain.getContext("2d");
  const cctx = code.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let W = 0;
  let H = 0;
  let cols = 0;
  let drops = [];
  let lines = [];
  let raf = 0;
  let last = 0;

  // Reloj propio (en ms de fotogramas) y estado de la columna destacada
  let clock = 0;
  let hotCol = -1;
  let hotUntil = 0;
  // La primera vez baja pronto (12-32 s) para que se vea; luego 2-3 minutos.
  let nextHot = 12000 + Math.random() * 20000;

  function fit(cv, ctx) {
    cv.width = Math.floor(W * dpr);
    cv.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function setup() {
    W = window.innerWidth;
    H = window.innerHeight;
    fit(rain, rctx);
    fit(code, cctx);

    cols = Math.max(6, Math.ceil(W / COL));
    drops = Array.from({ length: cols }, () => ({
      y: rnd(-H, 0),
      acc: 0,
      speed: rnd(SPEED_MIN, SPEED_MAX),
    }));

    // Menos líneas en pantallas pequeñas para no tapar el texto
    const n = W < 720 ? 5 : Math.min(15, Math.round(W / 130));
    lines = Array.from({ length: n }, () => ({
      text: pick(SNIPPETS),
      x: rnd(8, Math.max(9, W - 360)),
      y: rnd(0, H),
      speed: rnd(6, 16),      // px por segundo: baja despacio
      alpha: rnd(0.22, 0.45),
    }));

    rctx.clearRect(0, 0, W, H);
    cctx.clearRect(0, 0, W, H);
  }

  // Una columna cada 2-3 minutos baja en verde brillante con glow.
  function updateHot() {
    if (hotCol >= 0 && clock > hotUntil) {
      drops[hotCol].speed = rnd(SPEED_MIN, SPEED_MAX);
      hotCol = -1;
    }
    if (hotCol < 0 && clock >= nextHot) {
      hotCol = (Math.random() * cols) | 0;
      hotUntil = clock + 5000;                 // cruza la pantalla en ~2-4 s
      drops[hotCol].y = -FONT * 4;             // entra desde arriba
      drops[hotCol].acc = 0;
      drops[hotCol].speed = rnd(0.55, 0.85);   // pasa más rápido para resaltar
      nextHot = clock + 120000 + Math.random() * 60000; // 2 a 3 minutos
    }
  }

  // Capa 1: lluvia. La estela se consigue desvaneciendo lo dibujado.
  function stepRain(dt) {
    rctx.globalCompositeOperation = "destination-out";
    rctx.fillStyle = "rgba(0,0,0,0.05)";
    rctx.fillRect(0, 0, W, H);
    rctx.globalCompositeOperation = "source-over";

    rctx.font = "600 " + FONT + "px Consolas, 'Courier New', monospace";
    rctx.textBaseline = "top";

    for (let i = 0; i < cols; i++) {
      const d = drops[i];
      d.acc += d.speed * (dt / 16.7);
      if (d.acc < 1) continue; // avanza de celda en celda (sin solaparse)
      d.acc = 0;
      d.y += FONT;

      if (d.y > H + FONT * 3) {
        d.y = -FONT * rnd(1, 7);
        d.speed = rnd(SPEED_MIN, SPEED_MAX);
        continue;
      }

      const x = i * COL;
      const tok = pick(TOKENS);
      const esHot = i === hotCol;

      rctx.fillStyle = esHot ? hot : color;          // cuerpo
      rctx.fillText(tok, x, d.y);

      if (esHot) {
        // Resalta de verdad: más grueso + glow
        rctx.font = "800 " + FONT + "px Consolas, 'Courier New', monospace";
        rctx.shadowColor = hot;
        rctx.shadowBlur = 16;
        rctx.globalAlpha = 1;
        rctx.fillText(tok, x, d.y);
        rctx.shadowBlur = 0;
        rctx.font = "600 " + FONT + "px Consolas, 'Courier New', monospace";
      } else {
        rctx.globalAlpha = 0.55;                     // cabeza algo más clara
        rctx.fillStyle = head;
        rctx.fillText(tok, x, d.y);
      }
      rctx.globalAlpha = 1;
    }
  }

  // Capa 2: líneas de código legibles bajando despacio.
  function stepCode(dt) {
    cctx.clearRect(0, 0, W, H);
    cctx.font = "500 " + (FONT - 2) + "px Consolas, 'Courier New', monospace";
    cctx.textBaseline = "top";

    for (let i = 0; i < lines.length; i++) {
      const s = lines[i];
      s.y += s.speed * (dt / 1000);
      if (s.y > H + 24) {
        s.y = rnd(-70, -10);
        s.x = rnd(8, Math.max(9, W - 360));
        s.text = pick(SNIPPETS);
      }
      cctx.globalAlpha = s.alpha;
      cctx.fillStyle = color;
      cctx.fillText(s.text, s.x, s.y);
    }
    cctx.globalAlpha = 1;
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);

    // dt puede salir negativo en el primer fotograma (el timestamp de rAF es
    // el inicio del frame y puede ser anterior a performance.now()), y con el
    // acumulador eso dejaría la lluvia sin dibujar. Se acota siempre.
    let dt = ts - last;
    if (!(dt > 0) || dt > 80) dt = 16.7;
    last = ts;
    clock += dt;

    updateHot();
    stepRain(dt);
    stepCode(dt);
  }

  function start() {
    if (raf || reduce) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  // Con "reduced motion" se dibuja un fotograma fijo: se ve el tema, sin movimiento.
  function still() {
    stop();
    for (let i = 0; i < 90; i++) stepRain(16.7);
    stepCode(16.7);
  }

  document.addEventListener("click", (e) => {
    // Al cambiar de tema hay que releer los colores de las variables CSS
    if (e.target && e.target.id === "themeToggle") {
      setTimeout(() => {
        readPalette();
        if (reduce) {
          setup();
          still();
        }
      }, 0);
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setup();
      if (reduce) still();
    }, 150);
  });

  readPalette();
  setup();
  if (reduce) still();
  else start();
})();
