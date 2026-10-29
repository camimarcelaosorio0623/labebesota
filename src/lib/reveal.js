import { $, $$ } from './dom.js';

/** Header sólido al bajar. */
export function initHeader(id = '#hdr') {
  const hdr = $(id);
  if (!hdr) return;
  addEventListener('scroll', () => hdr.classList.toggle('solid', scrollY > 30), { passive: true });
}

/**
 * Aparición de los .reveal al entrar en pantalla, con escalonado en los hijos de `staggerSel`.
 * Se puede volver a llamar después de pintar contenido nuevo (carga del backend).
 */
export function initReveal(staggerSel = '') {
  const els = $$('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) return els.forEach((e) => e.classList.add('in'));
  if (staggerSel) $$(staggerSel).forEach((g) => [...g.children].forEach((c, i) => (c.style.transitionDelay = i * 0.1 + 's')));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}
