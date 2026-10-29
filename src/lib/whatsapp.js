import { config } from '../config/env.js';

export const waLink = (text) => `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;

export function openWhatsApp(text) {
  window.open(waLink(text), '_blank', 'noopener');
}

/** Convierte los enlaces [data-wa="mensaje"] en enlaces de WhatsApp con ese mensaje. */
export function wireWhatsAppLinks(root = document) {
  root.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });
}
