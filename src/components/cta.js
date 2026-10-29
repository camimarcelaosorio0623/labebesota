import { waLink } from '../lib/whatsapp.js';
import { track } from '../lib/track.js';
import { config } from '../config/env.js';

/**
 * CTA de «apartar»: en el flujo 'whatsapp' abre WhatsApp con el mensaje;
 * en 'api' lleva al formulario de reserva (que registra la solicitud).
 */
export function wireReserveCta(a, message, cta) {
  if (config.reservationFlow === 'api') { a.href = '#reserva'; a.removeAttribute('target'); return; }
  a.href = waLink(message);
  a.target = '_blank';
  a.rel = 'noopener';
  a.onclick = () => track('cta_whatsapp_click', { cta });
}
