export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** Escapa texto que viene del backend antes de meterlo en HTML. */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/** Solo rutas relativas o http(s): evita javascript: y similares en URLs del backend. */
export function safeUrl(url) {
  if (!url) return '';
  const s = String(url).trim();
  return /^(https?:\/\/|\/|#|tel:|mailto:)/i.test(s) ? s : '';
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Marca un contenedor con uno de los estados de interfaz: loading | ready | empty | error. */
export function setState(el, state) {
  el.dataset.state = state;
  el.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
}

/** Etiqueta que se pinta donde falta un dato del cliente (valor null en site.js). */
export const PENDING = '<span class="pc">por confirmar</span>';

/**
 * Pinta en el HTML los datos de src/config/site.js:
 *   [data-site="ruta.al.dato"]       → texto
 *   [data-site-href="ruta.al.dato"]  → href
 *   [data-site-if="ruta.al.dato"]    → se oculta si el dato es falso o null
 * Si el dato es null se muestra «por confirmar»: al cargar el dato real desaparece solo.
 */
export function bindSite(data, root = document) {
  const get = (path) => path.split('.').reduce((o, k) => o?.[k], data);
  $$('[data-site]', root).forEach((el) => {
    const v = get(el.dataset.site);
    if (v == null) el.innerHTML = PENDING;
    else el.textContent = v;
  });
  $$('[data-site-href]', root).forEach((el) => {
    const v = safeUrl(get(el.dataset.siteHref));
    if (v) el.href = v;
    else el.removeAttribute('href');
  });
  $$('[data-site-if]', root).forEach((el) => (el.hidden = !get(el.dataset.siteIf)));
}
