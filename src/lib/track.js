/**
 * Punto único de analítica. No envía nada: Agentia conecta aquí su herramienta (CRM/analítica)
 * escuchando window → 'bebesota:track'. Nunca incluir datos personales en estos eventos.
 */
export function track(name, props = {}) {
  window.dispatchEvent(new CustomEvent('bebesota:track', { detail: { name, ...props } }));
}
