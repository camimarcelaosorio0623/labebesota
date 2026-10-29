/**
 * Fechas en hora de Puebla (UTC-6; México no usa horario de verano desde 2022),
 * sin importar dónde esté quien mira. Los Date que devuelve guardan la hora de Puebla
 * en sus campos UTC: se leen con getUTCDay(), getUTCHours(), etc.
 */
const OFFSET_MS = 6 * 3600e3;

export const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
export const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
export const MONTHS_SHORT = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export const pueblaDate = (ms = Date.now()) => new Date(ms - OFFSET_MS);

export function nowInPuebla(ms = Date.now()) {
  const d = pueblaDate(ms);
  return {
    date: d,
    dow: d.getUTCDay(),
    hour: d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600,
    ymd: d.toISOString().slice(0, 10),
  };
}

/** Mediodía (hora de Puebla) del próximo día de la semana `dow`, hoy incluido. */
export function nextDow(dow, from = Date.now()) {
  const d = pueblaDate(from);
  d.setUTCHours(12, 0, 0, 0);
  return new Date(d.getTime() + ((dow - d.getUTCDay() + 7) % 7) * 864e5);
}

/** ISO 8601 con zona → Date con la hora de Puebla en sus campos UTC. */
export const fromIso = (iso) => pueblaDate(new Date(iso).getTime());

/** Date de Puebla → 'YYYY-MM-DD'. */
export const ymdOf = (d) => d.toISOString().slice(0, 10);

/** 'Vie 31 oct' */
export const shortDate = (d) => `${DAYS_SHORT[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]}`;

/** 'viernes 31 de oct' */
export const longDate = (d) => `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} de ${MONTHS_SHORT[d.getUTCMonth()]}`;

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
