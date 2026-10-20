export type Modalidad = "presencial" | "virtual";

// Un único tipo para la oferta: los mismos 4 módulos alimentan el carrusel de Áreas y los
// chips del paso 1 de Reserva, así no pueden desincronizarse.
// Un servicio dentro de un área: "nombre" es lo que iba antes de los dos puntos y se
// destaca en la tarjeta; "detalle" es lo que sigue.
export interface ConsultaItem {
  nombre: string;
  detalle: string;
}

export interface Consulta {
  id: string;
  titulo: string;
  resumen: string; // bajada corta (card + chatbot)
  items: ConsultaItem[]; // servicios del área, en lista (reemplaza a la vieja "descripcion")
  media: string; // ruta pública a la imagen/video real, o un texto PLACEHOLDER_* si todavía no llegó
  // Encuadre del recorte (clase object-position de Tailwind). El recuadro de la tarjeta es
  // apaisado en desktop y estas piezas son verticales, así que object-cover recorta arriba
  // y abajo: acá se elige qué franja de la pieza se prioriza. Sin valor = centrado.
  mediaPos?: string;
  // Tamaño real del archivo .webp. Van como width/height en el <img> para que el navegador
  // reserve el espacio antes de bajar la imagen (evita el salto de layout).
  mediaAncho: number;
  mediaAlto: number;
  precio: string;
  calcomEvent: string;
}

export interface Faq {
  id: string;
  pregunta: string;
  respuesta: string;
}

// ---------------------------------------------------------------------------
// Interruptor de datos de prueba / producción. Con MODO_PRUEBA = true, la Reserva usa la
// cuenta de Cal.com y el WhatsApp de prueba de abajo — así se puede probar el flujo
// completo (agendar + confirmar) sin tocar las cuentas reales de Ariana. Para pasar a
// producción: poner MODO_PRUEBA = false (DATOS_PROD ya está completo).
// ---------------------------------------------------------------------------
const MODO_PRUEBA = false;

const DATOS_PRUEBA = {
  calcomUsuario: "emanuel-romo-zmdp6t",
  email: "techresolution24@gmail.com",
  whatsapp: "5493518102405", // 351 810 2405 (Córdoba) en formato internacional
};

// Datos reales de la clienta. Se activan al poner MODO_PRUEBA = false.
const DATOS_PROD = {
  calcomUsuario: "ariana-isaguirre-w0q2ri",
  email: "isaguirreariana@gmail.com", // confirmar con la clienta
  whatsapp: "5493512028790", // internacional, sin + ni espacios (formato wa.me)
};

const activo = MODO_PRUEBA ? DATOS_PRUEBA : DATOS_PROD;

// Dominio del sitio. ÚNICA fuente dentro del código: lo usan los datos estructurados y
// cualquier URL absoluta que haga falta. El index.html y los archivos de public/ (robots,
// sitemap) lo llevan literal porque son estáticos y no pasan por el bundler.
export const SITE_URL = "https://legallycool.com.ar";

// Precio único de la consulta: el mismo para las 4 áreas.
const PRECIO_CONSULTA = "$102.691,80";

// URL de Instagram en una sola constante: la usan tanto marca.instagram (identidad) como
// contacto.instagram (redes del footer), para no tener dos fuentes de verdad que se
// desincronicen al cambiarla.
const INSTAGRAM_URL = "https://www.instagram.com/legallycool_/";

export const config = {
  marca: {
    nombre: "LegallyCool",
    nombreReal: "Ariana Isaguirre",
    matricula: "M.P. 1-43955",
    instagram: INSTAGRAM_URL,
    // Sello circular de marca (monograma). Se usa como marca de agua en el footer. Sigue en
    // PNG (200 KB, con transparencia): no entraba en la tanda de optimización a WebP.
    sello: "/brand/sello-legallycool.png",
    selloAncho: 867,
    selloAlto: 779,
    // Logo real de la diseñadora (PNG, fondo transparente). Logo.tsx lee esta ruta
    // y muestra el archivo automáticamente porque ya no empieza con "PLACEHOLDER"
    // (si en algún momento hay que volver al logotipo tipográfico temporal, alcanza
    // con volver a poner acá un valor que empiece con "PLACEHOLDER").
    logo: "/brand/logo-legallycool.png",
    wordmark: "Legally Cool",
    instagramHandle: "@legallycool_",
    // Taglines oficiales del manual, cada una con su rol. Para cambiarlas por campaña se
    // edita acá y se propaga sola (hero, footer y donde se usen). Van en Cormorant
    // Garamond por ser "frases/conceptos" según el manual — salvo la bajada de apertura,
    // que es texto explicativo y va en DM Sans.
    taglinePrincipal: "Mi creatividad merece protección.", // titular del hero (h1)
    bajadaApertura:
      "Antes de registrar una marca, existe una idea. Antes de proteger un diseño, alguien lo creó.", // bajada del hero
    taglineSecundaria: "Tu idea también tiene derechos.", // reservada para pauta/piezas secundarias (no se usa en el hero)
    taglineCierre: "Derechos que protegen, ideas que transforman.", // línea de cierre del footer
  },
  contacto: {
    email: activo.email,
    whatsapp: activo.whatsapp, // internacional sin +
    linkedin: "#", // PLACEHOLDER: completar con la URL real del perfil/página
    facebook: "#", // PLACEHOLDER: completar con la URL real de la página
    instagram: INSTAGRAM_URL,
  },
  calcom: {
    usuario: activo.calcomUsuario,
    // Interruptor de seguridad: mientras esté en false, Reserva NUNCA embebe el iframe y
    // muestra el placeholder de marca. Poner en true recién cuando los 4 eventos
    // (calcomEvent de cada consulta) existan de verdad en la cuenta de Cal.com; si no,
    // el iframe mostraría el 404 de Cal.com dentro de la página.
    eventosListos: true,
  },

  // Media placeholder (reemplazar en Fase 2/3 con los archivos de public/brand/)
  media: {
    heroVideo: "PLACEHOLDER_VIDEO_HERO",
    // Imagen real del hero (public/brand/hero.png). Hoy es el poster del <video>: como
    // heroVideo sigue siendo un placeholder, el video no carga y queda la imagen fija de
    // fondo. Cuando llegue el video real, esta imagen sigue sirviendo como poster.
    fotoHero: "/brand/hero.webp",
    fotoSobreMi: "/brand/imagen-profesional.webp", // foto real de la sección "Sobre mí"
    fotoSobreMiAncho: 1200,
    fotoSobreMiAlto: 1451,
    textura: "PLACEHOLDER_TEXTURA", // hook para textura real (papel/grain); hoy hay una versión CSS en index.css
  },

  nav: {
    links: [
      { label: "Servicios", href: "#sobre-mi" },
      { label: "Áreas", href: "#areas" },
      { label: "Preguntas", href: "#reserva" },
      { label: "Reservar", href: "#reserva" },
    ],
  },

  hero: {
    // NO SE RENDERIZAN HOY: el titular del hero pasó a ser marca.taglinePrincipal y la
    // bajada marca.bajadaApertura (manual de marca). Se dejan acá por si se quiere volver
    // a este copy o reutilizarlo en otra pieza.
    tituloLinea1: "Dueña de tu marca",
    tituloLinea2Pre: "sin ",
    tituloLinea2Acento: "complicarte",
    subtitulo:
      "Asesoría legal en marcas y propiedad intelectual para creadoras, marcas y negocios que quieren crecer tranquilas.",
    ctaBarTextoDesktop: "Protegé lo que construís. Registrá tu marca.",
    ctaBarTextoMobile: "Protegé tu marca.",
    ctaBoton: "Reservar consulta",
  },

  sobreMi: {
    kicker: "Sobre mí",
    parrafoTop:
      "Hay algo que siempre me fascinó: cómo una idea puede cambiar la forma en que percibimos las cosas. Creo firmemente que las buenas ideas se defienden. Me apasiona acompañar ese momento en el que una visión deja de ser solo un pensamiento y empieza a tomar forma: una marca, una creación, un proyecto o un negocio.",
    // Reemplaza al viejo "parrafoBottom" (párrafo suelto): el mismo lugar del layout ahora
    // lleva un subtítulo + tres líneas de acompañamiento.
    comoTitulo: "¿Cómo te puedo acompañar?",
    comoLista: [
      "Protegiendo tus Marcas y Creaciones.",
      "Redactando y revisando Contratos y estructurando Sociedades.",
      "Asesorando en Derecho Laboral para el crecimiento seguro de tu pyme o emprendimiento.",
    ],
    rol: "Abogada",
    especialidad: "Registro de marcas, PI, contratos y sociedades",
    botonEscribime: "Escribime",
    botonSeguime: "Seguime",
    botonWhatsapp: "WhatsApp",
    // NO SE RENDERIZAN HOY: los botones de LinkedIn y Facebook se sacaron de "Sobre mí"
    // (quedan solo Instagram, WhatsApp y correo). Se dejan los rótulos por si vuelven.
    botonLinkedin: "LinkedIn",
    botonFacebook: "Facebook",
    // NO SE RENDERIZA HOY: era el recuadro punteado con el borrador de bio debajo de la foto.
    // Se quitó de la sección (el nombre y la matrícula ya están junto a los botones). Se deja
    // el texto por si en algún momento se escribe una bio de verdad.
    bioPlaceholder:
      "[Ariana Isaguirre, abogada (M.P. 1-43955). Especializada en registro de marcas y propiedad intelectual. 2-3 líneas de trayectoria y por qué le importa que emprendedoras y creadoras protejan lo suyo.]",
  },

  areas: {
    heading: "Derecho claro que se mueve con tu negocio, no encima de él.",
    ctaTexto: "Reservá tu consulta.",
    ctaBoton: "Reservar",
  },

  reserva: {
    heading: "Reservá tu",
    headingAcento: "consulta",
    bajada:
      "Elegí el área de tu consulta, reservá día y horario, y confirmá por WhatsApp. Las consultas son presenciales.",
    paso1: "¿Qué necesitás?",
    paso2: "¿Cómo querés atenderte?",
    paso3: "Elegí día y horario",
    calendarioTitulo: "Acá vas a elegir día y horario",
    calendarioTexto: "En cuanto esté listo el calendario, vas a poder reservar tu turno acá mismo.",
    calendarioEtiqueta: "Calendario en configuración",
    // Línea chica debajo del calendario: cuándo atiende y en qué modalidad.
    horariosAtencion:
      "Atención de lunes a viernes de 9:00 a 11:00 y de 18:30 a 20:00. Consultas presenciales.",
    // Textos nuevos del layout (no reemplazan a los de arriba).
    paso3Espera: "El calendario aparece cuando elegís el área.",
    // Etiquetas cortas del stepper horizontal (las de arriba son preguntas, muy largas acá).
    stepperServicio: "Servicio",
    stepperModalidad: "Modalidad",
    stepperHorario: "Día y horario",
    stepperConfirmar: "Confirmación",
    // ---- Paso final: confirmación por WhatsApp (reemplazó al paso de pago) ----
    confirmarTitulo: "Confirmá tu turno por WhatsApp",
    confirmarNota:
      "Escribinos para confirmar el turno que reservaste. Te respondemos dentro del horario de atención.",
    confirmarBoton: "Confirmar por WhatsApp",
    // Botón secundario debajo del calendario: el iframe de Cal.com no avisa a la página
    // cuando alguien termina de reservar, así que el paso final se habilita a mano.
    yaReserveBoton: "Ya reservé mi turno",
    // Plantillas del mensaje de WhatsApp. {area} y {fecha} se reemplazan en Reserva.tsx.
    whatsappMensaje: "Hola Ariana, quiero confirmar mi consulta de {area} para el {fecha}.",
    whatsappMensajeSinFecha:
      "Hola Ariana, reservé una consulta de {area} desde la web y quiero confirmarla.",
    // NO SE RENDERIZA HOY: "Cómo funciona" pasó de tarjeta azul a tira fina sin título.
    comoFuncionaTitulo: "Cómo funciona",
    comoFuncionaPasos: [
      "Elegís el área de tu consulta.",
      "Reservás día y horario.",
      "Confirmás por WhatsApp.",
    ],
    comoFuncionaNota:
      "La reserva queda tomada cuando confirmás por WhatsApp dentro del horario de atención.",
  },

  footer: {
    // NO SE RENDERIZA HOY: la línea de cierre del footer pasó a ser marca.taglineCierre.
    tagline: "Protegé lo que construís.",
    descripcion: "Asesoría legal en marcas, contratos y sociedades para quienes crean y emprenden.",
    columnaExplorarTitulo: "Explorar",
    columnaContactoTitulo: "Contacto",
    explorar: [
      { label: "Sobre mí", href: "#sobre-mi" },
      { label: "Áreas", href: "#areas" },
      { label: "Preguntas", href: "#reserva" },
      { label: "Reservar", href: "#reserva" },
    ],
    linkEscribime: "Escribime",
    linkWhatsapp: "WhatsApp",
    linkInstagram: "Instagram",
    linkLinkedin: "LinkedIn",
    linkFacebook: "Facebook",
    columnaSeguimeTitulo: "Seguime",
    // NO SE RENDERIZAN HOY: la franja CTA azul del footer se quitó porque era redundante
    // (el formulario de reserva está justo arriba) y se confundía con la tarjeta "Cómo
    // funciona" de Reserva. Se dejan por si el CTA vuelve en otro lugar.
    ctaTitulo: "¿Empezamos a proteger tu marca?",
    ctaBajada: "Reservá una consulta y definimos juntos el primer paso.",
    ctaBoton: "Reservar consulta",
  },

  // Modalidades ofrecidas. Hoy la consulta es SOLO presencial: al quedar una sola, Reserva
  // la deja preseleccionada, pero el paso se sigue mostrando (decisión de diseño: el stepper
  // conserva sus 3 pasos). Si vuelve la virtual, alcanza con sumarla acá.
  modalidades: [{ id: "presencial" as Modalidad, label: "Presencial" }],

  // Las 4 áreas de práctica. ÚNICA fuente: alimenta tanto el carrusel de Áreas como los
  // chips del paso 1 de Reserva (antes había un array `modulos` aparte que se desincronizó).
  consultas: [
    {
      id: "marcas",
      titulo: "Marcas, diseños & dominios",
      resumen: "Protegé la identidad de tu negocio.",
      items: [
        {
          nombre: "Marcas",
          detalle:
            "estrategia, búsqueda de antecedentes, registro, seguimiento, vigilancia y oposiciones.",
        },
        {
          nombre: "Diseños industriales",
          detalle: "protección de la estética y el aspecto ornamental de tus productos.",
        },
        {
          nombre: "Modelos de utilidad",
          detalle: "protección de mejoras funcionales aplicadas a productos o herramientas.",
        },
        { nombre: "Transferencias", detalle: "compra, venta y cesión de marcas." },
        {
          nombre: "Dominios",
          detalle: "registro, resguardo de tu identidad digital y conflictos por titularidad.",
        },
      ],
      media: "/brand/marcadisenodominio.webp",
      mediaAncho: 1200,
      mediaAlto: 1501,
      // Por encima del centro: así entra el titular completo ("TODO EMPIEZA / CON UNA IDEA")
      // y todavía asoma parte de la lista BRANDING · DESIGN · CONTENT.
      mediaPos: "object-[50%_40%]",
      precio: PRECIO_CONSULTA,
      calcomEvent: "marcas-disenos-dominios",
    },
    {
      id: "autor",
      titulo: "Derecho de autor & creaciones",
      resumen: "Protegé lo que creás.",
      items: [
        {
          nombre: "Derecho de autor",
          detalle:
            "registro de obras, contenidos y producciones creativas, incluyendo fotografía, obras gráficas, ilustraciones y producciones audiovisuales.",
        },
        {
          nombre: "Software",
          detalle: "protección y registro de programas, aplicaciones y desarrollos tecnológicos.",
        },
        {
          nombre: "Música y producciones sonoras",
          detalle:
            "asesoramiento sobre composiciones, grabaciones, interpretaciones y derechos conexos.",
        },
        {
          nombre: "Licencias y cesiones",
          detalle:
            "acuerdos para autorizar, comercializar, transferir y explotar derechos sobre tus creaciones.",
        },
      ],
      media: "/brand/derechodeautor.webp",
      mediaAncho: 1200,
      mediaAlto: 1503,
      // Bajado respecto del centro: el bloque "TU IDEA TAMBIÉN TIENE DERECHOS" está en la
      // mitad inferior de la pieza y con el centrado por defecto se cortaba.
      mediaPos: "object-[50%_60%]",
      precio: PRECIO_CONSULTA,
      calcomEvent: "derecho-de-autor",
    },
    {
      id: "contratos",
      titulo: "Contratos & estructura empresarial",
      resumen: "Ordená jurídicamente tu negocio para hacerlo crecer.",
      items: [
        {
          nombre: "Contratos comerciales",
          detalle: "clientes, proveedores, colaboradores y freelancers.",
        },
        {
          nombre: "Negocios digitales",
          detalle: "términos y condiciones, políticas legales para webs y apps.",
        },
        {
          nombre: "Confidencialidad",
          detalle: "protección de información sensible y know-how.",
        },
        {
          nombre: "Franquicias",
          detalle: "redacción y negociación de contratos para expandir tu negocio.",
        },
        {
          nombre: "Licencias y acuerdos comerciales",
          detalle: "protección de tus intereses en cada operación.",
        },
        {
          nombre: "Sociedades",
          detalle: "constitución de sociedades, pactos de socios y estructuración jurídica.",
        },
        {
          nombre: "Cumplimiento normativo",
          detalle: "asesoramiento para mantener tu empresa jurídicamente ordenada.",
        },
      ],
      media: "/brand/contratos-estructura.webp",
      mediaAncho: 1200,
      mediaAlto: 1502,
      precio: PRECIO_CONSULTA,
      calcomEvent: "contratos-estructura",
    },
    {
      id: "laboral",
      titulo: "Derecho laboral",
      resumen: "Acompañamiento jurídico para las distintas etapas de tu negocio.",
      items: [
        {
          nombre: "Asesoramiento integral",
          detalle:
            "contratación, relaciones laborales, documentación y cumplimiento de la normativa, para prevenir y mitigar riesgos, y para abordar conflictos laborales en instancias extrajudiciales y judiciales.",
        },
        {
          nombre: "Asesoría 1 a 1",
          detalle:
            "consulta personalizada para analizar una situación concreta, detectar necesidades y definir próximos pasos.",
        },
      ],
      media: "/brand/derecholaboral.webp",
      mediaAncho: 1200,
      mediaAlto: 1457,
      precio: PRECIO_CONSULTA,
      calcomEvent: "derecho-laboral",
    },
  ] as Consulta[],

  // 10 PREGUNTAS PILOTO — borrador para revisar con la clienta. NO son asesoramiento
  // legal. No quitar la marca [PILOTO] hasta que ella las valide.
  faqPiloto: [
    {
      id: "q1",
      pregunta: "¿Cómo registro mi marca?",
      respuesta:
        "[PILOTO] Primero hacemos un estudio de antecedentes para ver que esté libre, y después presentamos la solicitud en la clase correcta. En la consulta lo vemos con tu caso.",
    },
    {
      id: "q2",
      pregunta: "¿Puedo registrarla yo sola o necesito abogada?",
      respuesta:
        "[PILOTO] Podés iniciarlo sola, pero un error en la clase o saltearte el estudio previo puede costarte la marca. Por eso conviene hacerlo asesorada.",
    },
    {
      id: "q3",
      pregunta: "¿Y si alguien ya usa un nombre parecido al mío?",
      respuesta:
        "[PILOTO] Hay que analizar si hay riesgo de confusión. Con un estudio de antecedentes lo revisamos antes de presentar, así no perdés tiempo ni plata.",
    },
    {
      id: "q4",
      pregunta: "¿Registrar la marca sale caro? ¿Puedo pagar en cuotas?",
      respuesta:
        "[PILOTO] Se puede abonar en cuotas. En la consulta te paso el detalle de costos y las opciones de pago según tu caso.",
    },
    {
      id: "q5",
      pregunta: "¿Qué conviene registrar: el nombre o el logo?",
      respuesta:
        "[PILOTO] Depende de tu marca. A veces conviene el nombre, a veces el logo y a veces ambos. Lo definimos juntas para que quedes bien protegida.",
    },
    {
      id: "q6",
      pregunta: "¿Puedo perder mi marca si no la registro?",
      respuesta:
        "[PILOTO] Sí: sin registro, otro podría registrarla y usarla. Registrarla es la forma de que sea realmente tuya.",
    },
    {
      id: "q7",
      pregunta: "¿Qué diferencia hay entre marca, patente y derecho de autor?",
      respuesta:
        "[PILOTO] La marca protege tu nombre o logo, la patente una invención y el derecho de autor tus obras. Te digo cuál te sirve según lo que hacés.",
    },
    {
      id: "q8",
      pregunta: "¿Qué contratos necesito para mi emprendimiento?",
      respuesta:
        "[PILOTO] Depende de tu actividad: con clientes, socios o proveedores. Armamos los que de verdad te protegen, sin papeles de más.",
    },
    {
      id: "q9",
      pregunta: "¿Qué tipo de sociedad me conviene?",
      respuesta:
        "[PILOTO] Según socios, responsabilidad y objetivo. La SAS suele ser ágil para emprender, pero lo definimos en la consulta.",
    },
    {
      id: "q10",
      pregunta: "¿Cómo es y cuánto sale una consulta?",
      respuesta:
        "[PILOTO] Elegís el área, reservás un horario y abonás para confirmar el turno. La consulta es presencial. Así de simple.",
    },
  ] as Faq[],

  // Textos legales — redacción base para revisar con Ariana antes de publicar.
  legal: {
    disclaimerBot:
      "Este asistente da información general orientativa, no asesoramiento legal. Cada caso es distinto: para una respuesta a tu medida, reservá una consulta.",
    footerNota: "El contenido de este sitio es informativo y no constituye asesoramiento legal.",
    privacidadTitulo: "Privacidad",
    privacidad: [
      "Tus datos se usan solo para gestionar tu consulta y tu turno.",
      "Reservas: los turnos se gestionan a través de Cal.com. Al reservar, tus datos (nombre, email y horario) los procesa esa plataforma según su propia política de privacidad.",
      "Confirmación: el turno se confirma por WhatsApp. Esa conversación queda en tu cuenta y en la del estudio, según la política de privacidad de WhatsApp.",
      "Este sitio no cuenta con base de datos propia: no guardamos tu información fuera de esas plataformas.",
      "Contacto: para cualquier consulta sobre tus datos, escribinos por los canales que figuran en el pie del sitio.",
    ],
  },
};

export default config;
