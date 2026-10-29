import { $ } from '../lib/dom.js';
import { nowInPuebla, DAYS, DAYS_SHORT, capitalize } from '../lib/time.js';
import { wireReserveCta } from './cta.js';

/**
 * La semana en bolas de billar.
 * @param {import('../services/types.js').WeeklySpecial[]} week
 */
export function renderWeek(week) {
  const box = $('#bolas'), hoy = nowInPuebla().dow;
  box.innerHTML = '';
  if (!week.length) { $('.dia-info').hidden = true; return; }
  week.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'bola' + (s.dayOfWeek === hoy ? ' hoy' : '');
    b.style.setProperty('--c', s.color);
    b.dataset.n = s.closed ? 8 : i + 1;
    b.innerHTML = `<small>${DAYS_SHORT[s.dayOfWeek]}</small>`;
    b.setAttribute('aria-label', `${DAYS[s.dayOfWeek]}: ${s.name}`);
    b.onclick = () => paint(i);
    box.appendChild(b);
  });
  function paint(i) {
    const s = week[i];
    [...box.children].forEach((b, j) => b.setAttribute('aria-pressed', j === i));
    $('#d-nm').textContent = s.name;
    $('#d-tx').textContent = (s.dayOfWeek === hoy ? 'Hoy · ' : capitalize(DAYS[s.dayOfWeek]) + ' · ') + s.description;
    const c = $('#d-cta');
    c.hidden = !!s.closed;
    wireReserveCta(c, `Holi Bebesota 💖 Quiero apartar mesa para el ${s.name} (${DAYS[s.dayOfWeek]})`, 'semana');
  }
  paint(Math.max(0, week.findIndex((s) => s.dayOfWeek === hoy)));
}
