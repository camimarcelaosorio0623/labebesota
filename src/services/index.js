/**
 * Capa de servicios: el ÚNICO punto por el que los componentes piden o envían datos.
 * Los componentes no saben si detrás hay un mock o la API de Agentia.
 *
 * Para conectar el backend: VITE_DATA_SOURCE=http + VITE_API_BASE_URL, y ajustar
 * src/services/adapters/http.js a los contratos definitivos.
 */
import { config } from '../config/env.js';
import { mockAdapter } from './adapters/mock.js';
import { httpAdapter } from './adapters/http.js';

const adapter = config.dataSource === 'http' ? httpAdapter : mockAdapter;

/** Siempre devuelve la semana de lunes a domingo.
 *  @returns {Promise<import('./types.js').WeeklySpecial[]>} */
export async function getWeeklySpecials() {
  const week = await adapter.getWeeklySpecials();
  return [...week].sort((a, b) => ((a.dayOfWeek + 6) % 7) - ((b.dayOfWeek + 6) % 7));
}

/** @returns {Promise<import('./types.js').EventItem[]>} */
export async function getEvents() {
  const events = await adapter.getEvents();
  return events.filter((e) => e.status === 'published');
}

/** @param {import('./types.js').ReservationRequest} req
 *  @returns {Promise<import('./types.js').ReservationResult>} */
export const submitReservation = (req) => adapter.submitReservation(req);

/** @returns {Promise<import('./types.js').ReservationResult>} */
export const getReservationStatus = (id) => adapter.getReservationStatus(id);
