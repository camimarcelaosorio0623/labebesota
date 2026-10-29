/**
 * Envío común de las solicitudes de reserva / preventa. Dos flujos (VITE_RESERVATION_FLOW):
 *
 *  'whatsapp' (por defecto): se abre WhatsApp con el mensaje listo — antes de cualquier await,
 *     para que el navegador no bloquee la ventana — y la solicitud se registra en el backend
 *     en segundo plano (channel: 'whatsapp'), para que el agente la reconozca al contestar.
 *  'api': la página pide nombre, teléfono y autorización de datos, envía la solicitud y muestra el estado:
 *     sending → received | confirmed | error. "confirmed" SOLO si el backend lo responde.
 */
import { config } from '../config/env.js';
import { submitReservation } from '../services/index.js';
import { openWhatsApp, waLink } from './whatsapp.js';
import { rules, validateForm, normalizePhone, showFieldError } from './validation.js';
import { track } from './track.js';

const MESSAGES = {
  sending: 'Enviando tu solicitud…',
  received: 'Solicitud recibida. Todavía no está confirmada: te escribimos por WhatsApp para confirmarte.',
  confirmed: '¡Listo! Tu reserva está confirmada.',
  error: 'No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.',
};

/**
 * Prepara un formulario: los campos [data-api-only] solo se muestran (y se exigen) en el flujo 'api',
 * y el botón con [data-api-label] cambia su texto (deja de decir «WhatsApp»).
 * @returns {{ send(payload: object, message: string): Promise<void> }}
 */
export function reservationForm(form) {
  const api = config.reservationFlow === 'api';
  form.querySelectorAll('[data-api-only]').forEach((el) => {
    el.hidden = !api;
    el.querySelectorAll('input').forEach((i) => (i.disabled = !api));
  });
  const out = form.querySelector('[data-res-msg]');
  const btn = form.querySelector('[data-api-label]');
  if (api && btn) btn.textContent = btn.dataset.apiLabel;

  const setState = (state, extra = '') => {
    form.dataset.state = state;
    if (!out) return;
    out.textContent = MESSAGES[state] || '';
    if (extra) out.append(' ', extra);
  };

  return {
    async send(payload, message) {
      if (!api) {
        openWhatsApp(message);
        track('reservation_whatsapp_opened', { type: payload.type });
        submitReservation({ ...payload, name: payload.name || null, phone: null, consent: false, channel: 'whatsapp' })
          .catch((err) => track('reservation_log_failed', { code: err.code || 'unknown' }));
        return;
      }

      if (!validateForm(form, { name: rules.name, phone: rules.phone, consent: rules.consent })) return;
      const f = form.elements;
      setState('sending');
      try {
        const res = await submitReservation({
          ...payload,
          name: f.name.value.trim(),
          phone: normalizePhone(f.phone.value),
          consent: f.consent.checked,
          channel: 'web',
        });
        setState(res.status === 'confirmed' ? 'confirmed' : 'received');
        track('reservation_submitted', { type: payload.type, status: res.status });
      } catch (err) {
        if (err.code === 'validation' && err.fields) Object.entries(err.fields).forEach(([k, m]) => showFieldError(form, k, m));
        const link = Object.assign(document.createElement('a'), { href: waLink(message), target: '_blank', rel: 'noopener', textContent: 'Abrir WhatsApp' });
        setState('error', link);
        track('reservation_failed', { type: payload.type, code: err.code || 'unknown' });
      }
    },
  };
}
