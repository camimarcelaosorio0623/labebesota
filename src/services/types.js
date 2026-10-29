/**
 * Modelo de datos que el frontend espera del backend.
 * Es la fuente de verdad de INTEGRATION_HANDOFF.md: si cambia aquí, se actualiza allá.
 *
 * @typedef {Object} WeeklySpecial  «Cada día tiene su pretexto» (bolas de billar)
 * @property {number} dayOfWeek   0=domingo … 6=sábado
 * @property {string} name        ej. 'Mamartes'
 * @property {string} description
 * @property {string} color       Color de la bola (hex)
 * @property {boolean} closed     true = ese día no abre (bola 8)
 *
 * @typedef {Object} EventItem  Flyer de la cartelera
 * @property {string} id
 * @property {string} title
 * @property {string|null} description
 * @property {string|null} image
 * @property {string|null} startsAt   ISO 8601 con zona. null si es recurrente.
 * @property {boolean} recurring      true = «Todas las semanas» (no caduca)
 * @property {'draft'|'published'|'cancelled'} status
 *
 * @typedef {Object} ReservationRequest
 * @property {'table'} type
 * @property {string} date            'YYYY-MM-DD' (hora de Puebla)
 * @property {string} dayName         Pretexto del día (ej. 'Miercolitro')
 * @property {string} partySize       Rango elegido: '2' | '3-4' | '5-8' | '9-12' | '13+'
 * @property {string|null} extra      'Es cumpleaños 🎂' | 'Vamos al buffet 🍔' | 'Queremos billar 🎱' | null
 * @property {string|null} name
 * @property {string|null} phone      E.164 (+52…). null en el flujo 'whatsapp' (el número llega por WhatsApp).
 * @property {boolean} consent        Autorización de tratamiento de datos (LFPDPPP). false en el flujo 'whatsapp'.
 * @property {'whatsapp'|'web'} channel
 *
 * @typedef {'received'|'pending'|'confirmed'|'rejected'|'cancelled'} ReservationStatus
 *
 * @typedef {Object} ReservationResult
 * @property {string} requestId  Generado por el backend. El frontend nunca lo inventa.
 * @property {ReservationStatus} status
 * @property {string|null} [message]
 */

/** Error normalizado de la capa de servicios. */
export class ServiceError extends Error {
  /**
   * @param {'network'|'timeout'|'validation'|'not_found'|'server'|'unknown'} code
   * @param {string} message
   * @param {Record<string,string>} [fields] errores por campo devueltos por el backend
   */
  constructor(code, message, fields) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.fields = fields || null;
  }
}
