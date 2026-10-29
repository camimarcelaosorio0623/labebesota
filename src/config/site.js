/**
 * Contenido institucional de La Bebesota (lo que NO viene del backend).
 * ÚNICO archivo que hay que tocar cuando lleguen los datos reales: el HTML los toma de aquí
 * (atributos data-site). Un valor null se muestra como «por confirmar».
 * Cada dato lleva su estado en CONTENT_STATUS.md.
 */
export const site = {
  name: 'La Bebesota',
  slogan: 'Mixes Mexas',

  /** PENDIENTE: el Instagram dice 19 Sur 1101 y los flyers 19 Sur 101 altos. Al confirmar, poner note: null. */
  address: {
    street: '19 Sur 1101',
    area: 'La Paz',
    city: 'Puebla',
    note: 'confirmar: los flyers dicen 19 Sur 101 altos, entre 11 y 13 Pte',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=19%20Sur%201101%2C%20La%20Paz%2C%20Puebla',
    /** Mapa embebido (OpenStreetMap). Marcador aproximado: PENDIENTE validar. */
    mapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=-98.2330%2C19.0480%2C-98.2180%2C19.0580&layer=mapnik&marker=19.0530%2C-98.2255',
  },

  /** Horario del Instagram (lun–sáb 11:30 a 00:00). days: 0=domingo … 6=sábado; horas decimales. */
  hours: {
    openDays: [1, 2, 3, 4, 5, 6],
    open: 11.5,
    close: 24,
    openLabel: '11:30',
    closeLabel: '12 de la noche',
    rangeLabel: '11:30 – 00:00',
    label: 'Lun a sáb 11:30 a 00:00',
    schemaOpeningHours: 'Mo-Sa 11:30-24:00',
  },

  instagram: { handle: '@labebesota19', url: 'https://www.instagram.com/labebesota19/' },

  /** true mientras las fotos de public/img sean de muestra. Pasar a false con las reales. */
  samplePhotos: true,
  privacyPolicyUrl: null, // aviso de privacidad (LFPDPPP): PENDIENTE

  /** Reseñas reales de Google (texto, autor, estrellas). Vacío = aviso «aquí van…». Nunca inventar. */
  reviews: [],

  /** Buffet de los flyers: $149, martes a jueves hasta las 6 PM. */
  buffet: {
    price: '$149',
    days: [2, 3, 4],
    until: 18,
    daysLabel: 'Martes a jueves · hasta las 6 PM',
    rules: ['No incluye bebida', 'No aplica para llevar'],
  },

  /** Torneo de billar de los flyers. PENDIENTE: próxima fecha. */
  tournament: {
    fee: '$100',
    prizes: ['🥇 $1,000 + una patona de Bacardí', '🥈 Una botella nacional', '🥉 Yarda de 5 L + ronda de litros'],
    nextDate: null,
  },

  /** Textos del hero según el modo día / noche. */
  heroCopy: {
    dia: { frase: 'De día: <mark>buffet</mark> y billar', sub: 'Come todo lo que puedas por $149 de martes a jueves, juega billar y quédate a la noche.', img: '/img/hero.jpg', cap: 'Mixes Mexas ✦' },
    noche: { frase: 'De noche: perreo, billar <mark>y DJ</mark>', sub: 'Mesas rosas, neón cian, mixes mexas y la banda de siempre. Aparta tu mesa y llega directo.', img: '/img/crowd2.jpg', cap: 'Perreo a oscuras ✦' },
  },

  marquee: ['Mixes Mexas', 'Billar', 'Perreo', 'Buffet $149', 'Neón', 'La Paz, Puebla'],

  reservation: {
    partySizes: ['2', '3-4', '5-8', '9-12', '13+'],
    defaultPartySize: '3-4',
    extras: ['Nada, solo la mesa', 'Es cumpleaños 🎂', 'Vamos al buffet 🍔', 'Queremos billar 🎱'],
  },

  /** DEMO: contenido de los paquetes de grupo por confirmar. */
  groupsNote: 'Contenido de los paquetes',

  faq: [
    ['¿Qué son los Mixes Mexas?', "Nuestros preparados de la casa, bien servidos y pa' compartir. Pregunta por el del día."],
    ['¿El buffet incluye bebida?', 'No. Son $149 por persona, de martes a jueves hasta las 6 PM, y no aplica para llevar.'],
    ['¿Hay billar?', 'Sí, y cada tanto hacemos torneo. Síguenos en Instagram para la próxima fecha.'],
    ['¿Abren los domingos?', 'No: de lunes a sábado de 11:30 a 12 de la noche.'],
  ],
};
