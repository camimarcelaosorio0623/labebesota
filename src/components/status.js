import { $ } from '../lib/dom.js';
import { nowInPuebla, DAYS, capitalize } from '../lib/time.js';
import { site } from '../config/site.js';

const h = site.hours;

export const isOpen = (t = nowInPuebla()) => h.openDays.includes(t.dow) && t.hour >= h.open && t.hour < h.close;

/** Primer día abierto a partir de mañana. */
function nextOpenDay(dow) {
  let k = 1;
  while (k < 8 && !h.openDays.includes((dow + k) % 7)) k++;
  return { k, dow: (dow + k) % 7 };
}

export function initStatus() {
  const paint = () => {
    const t = nowInPuebla(), on = isOpen(t);
    let tx;
    if (on) tx = `Abierto · hasta las ${h.closeLabel}`;
    else if (h.openDays.includes(t.dow) && t.hour < h.open) tx = `Abrimos hoy a las ${h.openLabel}`;
    else {
      const n = nextOpenDay(t.dow);
      const when = n.k === 1 ? 'mañana' : `el ${DAYS[n.dow]}`;
      tx = h.openDays.includes(t.dow) ? `Cerrado · ${when} ${h.openLabel}` : `Hoy cerramos · ${when} abrimos ${h.openLabel}`;
    }
    $('#estado').innerHTML = `<span class="dot ${on ? 'on' : ''}"></span>${tx}`;
  };
  paint();
  setInterval(paint, 60000);
}

export function renderHours() {
  const d = nowInPuebla().dow;
  $('#hrs').innerHTML = [1, 2, 3, 4, 5, 6, 0].map((k) =>
    `<li class="${k === d ? 'hoy' : ''}"><span>${capitalize(DAYS[k])}${k === d ? ' · hoy' : ''}</span><span>${h.openDays.includes(k) ? h.rangeLabel : 'Cerrado'}</span></li>`).join('');
}
