import { $ } from '../lib/dom.js';
import { nowInPuebla } from '../lib/time.js';
import { site } from '../config/site.js';

/** Día / noche: automático por la hora de Puebla (7 AM – 6 PM = día), con interruptor manual. */
let modo;
try { modo = sessionStorage.getItem('beb-modo'); } catch { /* sin storage */ }
if (!modo) { const t = nowInPuebla(); modo = t.hour >= 7 && t.hour < 18 ? 'dia' : 'noche'; }

export function applyMode(m, anim) {
  modo = m;
  document.documentElement.dataset.modo = m;
  $('#sw-i').textContent = m === 'dia' ? '☀' : '☾';
  const c = site.heroCopy[m];
  $('#frase').innerHTML = c.frase;
  $('#sub').textContent = c.sub;
  $('#pol-cap').textContent = c.cap;
  const im = $('#pol-img');
  if (anim) { im.style.opacity = 0; setTimeout(() => { im.src = c.img; im.style.opacity = 1; }, 300); }
  else im.src = c.img;
  try { sessionStorage.setItem('beb-modo', m); } catch { /* sin storage */ }
}

export function initMode() {
  applyMode(modo, false);
  $('#switch').onclick = () => applyMode(modo === 'dia' ? 'noche' : 'dia', true);
  // Photobooth: flash
  $('#foto').onclick = () => {
    const f = $('#flash');
    f.classList.add('go');
    requestAnimationFrame(() => requestAnimationFrame(() => f.classList.remove('go')));
  };
}
