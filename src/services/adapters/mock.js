/**
 * Adaptador MOCK — solo para demostración.
 * - No guarda datos de clientes en ningún lado (ni localStorage ni red).
 * - Nunca confirma una reserva por sí solo: responde "received".
 *   "confirmed" solo aparece con ?mock=confirmado, para revisar ese estado de la interfaz.
 * - Los requestId llevan el prefijo DEMO- para que nadie los confunda con reales.
 */
import { config } from '../../config/env.js';
import { ServiceError } from '../types.js';
import { weeklySpecialsMock } from '../../data/mocks/weekly-specials.js';
import { eventsMock } from '../../data/mocks/events.js';

const scenario = config.mockScenario;
const wait = (ms) => new Promise((r) => setTimeout(r, scenario === 'lento' ? ms * 4 : ms));
const clone = (v) => structuredClone(v);
const demoId = () => 'DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase();

function maybeFail() {
  if (scenario === 'error') throw new ServiceError('server', 'Simulación de error (mock).');
}

export const mockAdapter = {
  async getWeeklySpecials() {
    await wait(150);
    return clone(weeklySpecialsMock);
  },

  async getEvents() {
    await wait(200);
    return scenario === 'vacio' ? [] : clone(eventsMock);
  },

  async submitReservation(/** @type {import('../types.js').ReservationRequest} */ _req) {
    await wait(1000);
    maybeFail();
    return { requestId: demoId(), status: scenario === 'confirmado' ? 'confirmed' : 'received', message: null };
  },

  async getReservationStatus(requestId) {
    await wait(400);
    return { requestId, status: 'pending', message: null };
  },
};
