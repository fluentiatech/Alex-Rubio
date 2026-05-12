LANDING PAGE — DELANTERO EXPLOSIVO
===================================

CONCEPTO
--------
Landing page para un delantero joven, pequeño y explosivo.
La web no informa — impacta.
Todo gira en torno a dos ideas absolutas: velocidad y gol.
Cada sección debe sentirse como un sprint: entrada rápida, tensión, remate.


IDENTIDAD VISUAL
----------------
- Paleta base: negro total. Un único color de acento que cambia por equipo.
- Tipografía: sans-serif extendida, pesada, casi condensada.
- Los números de estadísticas van en display font ultranegra.
- Nunca más de 2 fuentes. Nunca degradados gratuitos.
- Nunca texto sobre imagen sin capa de contraste suficiente.
- El scroll cuenta una historia: el hero es el saque, el perfil
  es la llegada al área, las estadísticas son el descanso analítico,
  los highlights son el segundo tiempo.


SECCIÓN 1 — HERO DINÁMICO
--------------------------
- Fondo negro total. Sin distracciones.
- Loop de vídeo o secuencia de goles en alta resolución,
  sin bordes — el jugador irrumpe desde el borde de pantalla.
- Nombre del jugador en tipografía masiva con entrada desde
  la derecha, como si fuera disparado.
- Contador de goles en la temporada con efecto flip numérico al cargar.
- Hover sobre cada clip: overlay con minuto, rival y tipo de gol.
  Texto blanco puro sobre negro. Solo datos.
- Al hacer scroll: el vídeo colapsa en una línea de luz horizontal
  que se desliza hacia arriba. La transición marca el cambio de ritmo.


SECCIÓN 2 — PERFIL DEL JUGADOR
--------------------------------
- Dos columnas: texto editorial a la izquierda, galería deslizable
  a la derecha.
- Las fotos son en altísima calidad: céspedes perfectos, luz de estadio,
  instantes congelados de acción.
- El texto no es una biografía. Es una declaración. Frases cortas
  y directas. "No necesita espacio. Se lo crea."
- Paralaje en la galería: la foto de fondo se mueve a velocidad
  distinta que la de primer plano.
- Animación de entrada del texto: las líneas aparecen una a una
  con 80ms de retraso entre ellas, como si se escribieran en vivo.
- En mobile: galería a ancho completo, paginación táctil, puntos
  de navegación en el color de acento del equipo actual.


SECCIÓN 3 — CARRERA / EQUIPOS
-------------------------------
- Timeline horizontal deslizable. Cada nodo es un club.
- Al entrar en un club: toda la sección cambia — color de acento,
  escudo, tipografía de fondo en marca de agua, foto con ese uniforme.
  Todo en 400ms con ease-out.
- Cada parada muestra: club, temporadas, goles, asistencias
  y una frase sobre ese período.
  Ejemplo: "En este club descubrió que el área pequeña le pertenecía."
- Hover sobre cada gol: clip de tres segundos, sin audio, en loop.
  Sin slow motion — se siente la urgencia.
- El número de goles de cada etapa cuenta desde cero al entrar en foco.
  Al llegar al máximo, vibración sutil — como el golpe al palo.


SECCIÓN 4 — ESTADÍSTICAS AVANZADAS
-------------------------------------
- Fondo blanco o crema. Contraste total con el resto de la web.
- Fotos del jugador en blanco y negro con granulado de película.
  Concentración, calentamiento, detalle de botas. Sin celebraciones.
- Métricas como monumentos tipográficos: xG, distancia recorrida,
  sprints por partido, remates al arco, duelos ganados.
  Cada número ocupa su propio espacio. Sin tablas.
- Barras de progreso animadas al entrar en viewport.
  Aceleración inicial fuerte, desaceleración al final.
- Comparativa contra la media de liga: el dato del jugador
  en el color de acento, la media en gris. Sin leyendas complicadas.
- Una cita del jugador o entrenador en cursiva sobre una foto
  en blanco y negro, al 60% del ancho. Solo texto y foto.


SECCIÓN 5 — HIGHLIGHTS / FORMATO VERTICAL
-------------------------------------------
- Grid de vídeos cortos en 9:16, tarjetas verticales
  tipo carrete de redes sociales.
- Hover arranca el vídeo al instante. Sin botón, sin espera.
  La interacción es la velocidad.
- Esquina inferior izquierda de cada tarjeta: rival, competición
  y etiqueta del tipo de jugada.
  Opciones: Velocidad / Último segundo / Hat-trick / Fuera de serie.
  En pill con el color de acento.
- Clic: modal a pantalla completa, controles mínimos,
  swipe o flecha para pasar al siguiente.
- Cierre de sección: número total de goles de carrera animado,
  en grande, con una frase que conecta con el hero.


ANIMACIONES — CRITERIO DE USO
-------------------------------
Cada animación tiene una razón. Ninguna es decorativa.

  Entrada de letras disparadas
  → imita la velocidad del jugador

  Contador flip de goles
  → genera tensión desde el primer segundo

  Cambio de color en la timeline
  → hace tangible el paso del tiempo entre clubes

  Vídeo que arranca en hover
  → elimina fricción, velocidad como principio de interacción

  Vibración al llegar al número máximo
  → el dato se celebra igual que un gol

  Colapso del hero en línea de luz
  → el scroll tiene peso físico


PRINCIPIO DE FOCO VISUAL
--------------------------
En cada sección hay una sola cosa que pedir al ojo:
el número, el vídeo, la foto.
El ruido visual es el enemigo de un delantero — y también del diseño.

TECNOLOGÍA — LANDING PAGE DELANTERO EXPLOSIVO
===============================================

STACK BASE
----------
- Next.js 14 (App Router)
  Framework principal. SSR para carga rápida en hero,
  rutas limpias, optimización de imágenes nativa.

- TypeScript
  Todo tipado. Sin sorpresas en runtime.

- Tailwind CSS
  Utilidades para layout, espaciado y tipografía base.
  El color de acento por equipo se inyecta como variable CSS
  en el root y Tailwind lo consume dinámicamente.


ANIMACIONES — LIBRERÍA PRINCIPAL
----------------------------------
- GSAP (GreenSock Animation Platform)
  El estándar de la industria para animaciones de alto rendimiento.
  Se usa para todo lo que necesita control quirúrgico:

    · Entrada del nombre del jugador disparado desde la derecha
      → gsap.from() con x: 200 y ease: "power4.out"

    · Colapso del hero en línea de luz al hacer scroll
      → ScrollTrigger + scaleY del vídeo hasta 2px de alto

    · Contador flip de goles
      → gsap.to() animando un valor numérico con snap: 1

    · Vibración al llegar al número máximo en estadísticas
      → gsap.to() con x: [-4, 4, -2, 2, 0] en 0.3s

    · Barras de progreso en estadísticas
      → ScrollTrigger + scaleX desde 0 con ease: "expo.out"

    · Líneas de texto del perfil apareciendo una a una
      → gsap.from() en stagger de 0.08s sobre cada línea

- GSAP ScrollTrigger (plugin oficial)
  Vincula cada animación al scroll con precisión de píxel.
  Sin scroll jank. Sin event listeners manuales.


TRANSICIONES ENTRE SECCIONES
------------------------------
- Framer Motion
  Se usa exclusivamente para las transiciones de página
  y el cambio de estado completo en la sección de equipos
  (color, foto, escudo, texto) — AnimatePresence gestiona
  la salida del equipo anterior y la entrada del nuevo
  en paralelo, ambos en 400ms con easeOut.


VÍDEO
------
- Video nativo HTML5 con atributo muted + autoplay + loop + playsInline
  para los clips del hero y los goles en hover.
  Sin librerías externas — el navegador lo maneja directamente.

- Para los highlights en formato vertical (sección 5):
  Cloudinary o Mux como hosting de vídeo.
  Mux tiene player propio con controles mínimos,
  precarga inteligente y soporte nativo de 9:16.


GALERÍA E IMÁGENES
-------------------
- Next.js Image (next/image)
  Optimización automática, lazy load, tamaños responsivos.
  Las fotos de alta calidad del perfil y las de blanco y negro
  en estadísticas se sirven en WebP con fallback JPEG.

- Embla Carousel
  Para la galería deslizable del perfil.
  Ligero, sin dependencias, táctil nativo.
  El paralaje entre capas se implementa manualmente
  con su API onScroll + transform CSS.


TIPOGRAFÍA VARIABLE
--------------------
- Variable font cargada vía next/font o @font-face local.
  La display font ultranegra para números se carga solo
  en las secciones que la usan (font-display: swap).


LÍNEA DE TIEMPO DE EQUIPOS
----------------------------
- Estado gestionado con Zustand (store global del equipo activo).
  Cuando cambia el equipo: Zustand actualiza el acento,
  Framer Motion anima la salida/entrada del contenido,
  GSAP lanza el contador de goles desde cero.

- El deslizamiento horizontal del timeline usa Embla Carousel
  también, en modo