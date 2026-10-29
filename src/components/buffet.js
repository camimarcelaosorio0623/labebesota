import { $ } from '../lib/dom.js';
import { nowInPuebla, DAYS_SHORT } from '../lib/time.js';
import { site } from '../config/site.js';
import { wireReserveCta } from './cta.js';

/** Cuenta regresiva al cierre del buffet de hoy, o cuándo es el próximo. */
export function initBuffet() {
  const b = site.buffet, open = site.hours.open;
  const p = (n) => String(n).padStart(2, '0');
  const f = () => {
    const t = nowInPuebla();
    if (b.days.includes(t.dow) && t.hour >= open && t.hour < b.until) {
      const s = Math.floor((b.until - t.hour) * 3600);
      $('#buf-t').textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
      $('#buf-l').textContent = 'para que cierre el buffet de hoy';
      return;
    }
    let k = t.hour < open && b.days.includes(t.dow) ? 0 : 1;
    while (k < 8 && !b.days.includes((t.dow + k) % 7)) k++;
    $('#buf-t').textContent = k === 0 ? 'Hoy' : DAYS_SHORT[(t.dow + k) % 7];
    $('#buf-l').textContent = k === 0 ? `buffet desde las ${site.hours.openLabel}` : 'es el próximo día de buffet';
  };
  f();
  setInterval(f, 1000);
  $('#buf-reglas').innerHTML = b.rules.map((r) => `<span>${r}</span>`).join('');
  wireReserveCta($('#buf-cta'), `Holi Bebesota 🍔 Quiero apartar mesa pa'l buffet de ${b.price}`, 'buffet');
}
