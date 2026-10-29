/**
 * DATOS DE DEMOSTRACIÓN — cartelera.
 * - Halloween, torneo y buffet salen de los flyers del Instagram (oct-2026), sin confirmar.
 * - El «(ejemplo)» se genera siempre en el próximo viernes para que la demo tenga un evento
 *   futuro. Es FICTICIO: borrarlo cuando La Bebesota mande su cartelera real.
 * @type {import('../../services/types.js').EventItem[]}
 */
const real = [
  {
    id: 'halloween-party-2026',
    title: 'Halloween Party',
    description: 'Special show by Sensual Dolls vol. 2 · premio al mejor disfraz',
    image: '/img/fl1.jpg',
    startsAt: '2026-10-30T19:00:00-06:00',
    recurring: false,
    status: 'published',
  },
  {
    id: 'torneo-billar-oct-2026',
    title: 'Torneo de billar',
    description: 'Inscripción $100 · 1er lugar $1,000 + patona de Bacardí',
    image: '/img/fl3.jpg',
    startsAt: '2026-10-16T19:00:00-06:00',
    recurring: false,
    status: 'published',
  },
  {
    id: 'buffet-149',
    title: 'Come todo lo que puedas',
    description: 'Martes a jueves hasta las 6 PM · $149 por persona',
    image: '/img/fl2.jpg',
    startsAt: null,
    recurring: true,
    status: 'published',
  },
];

/** Próximo viernes a las 7 PM (hora de Puebla) que no choque con un evento real. */
function nextFreeFriday() {
  const taken = new Set(real.filter((e) => e.startsAt).map((e) => e.startsAt.slice(0, 10)));
  const d = new Date(Date.now() - 6 * 3600e3);
  d.setUTCHours(12, 0, 0, 0);
  while (d.getUTCDay() !== 5 || taken.has(d.toISOString().slice(0, 10))) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

const demo = {
  id: 'viernes-ejemplo',
  title: 'Viernes de DJ (ejemplo)',
  description: 'Evento de ejemplo · DJ invitado por anunciar',
  image: '/img/event.jpg',
  startsAt: `${nextFreeFriday()}T19:00:00-06:00`,
  recurring: false,
  status: 'published',
};

export const eventsMock = [...real, demo];
