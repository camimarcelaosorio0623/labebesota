import { $ } from '../lib/dom.js';
import { pueblaDate, nowInPuebla, ymdOf, DAYS, DAYS_SHORT, MONTHS_SHORT } from '../lib/time.js';
import { reservationForm } from '../lib/reservation.js';
import { site } from '../config/site.js';

/**
 * Reserva con vista previa del chat: día + cuántos + algo más.
 * @param {import('../services/types.js').WeeklySpecial[]} week pretexto de cada día
 */
export function initReservation(week) {
  const form = $('#form');
  const t = nowInPuebla();
  const dias = [];
  for (let k = 0; dias.length < 6 && k < 14; k++) {
    const dw = (t.dow + k) % 7;
    if (site.hours.openDays.includes(dw)) dias.push({ k, dw });
  }
  const { partySizes: PPL, defaultPartySize, extras: EX } = site.reservation;
  const st = { dia: 0, ppl: defaultPartySize, extra: EX[0] };

  const dateOf = (d) => new Date(pueblaDate().getTime() + d.k * 864e5);
  const fecha = (d) => {
    const x = dateOf(d);
    return { c: DAYS_SHORT[d.dw], n: `${x.getUTCDate()} ${MONTHS_SHORT[x.getUTCMonth()]}`, l: `${d.k === 0 ? 'hoy ' : d.k === 1 ? 'mañana ' : 'el '}${DAYS[d.dw]} ${x.getUTCDate()}` };
  };
  const mk = (el, arr, key, fmt) => {
    el.innerHTML = '';
    arr.forEach((v, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = fmt(v);
      b.onclick = () => { st[key] = key === 'dia' ? i : v; paint(true); };
      el.appendChild(b);
    });
  };
  mk($('#c-dia'), dias, 'dia', (d) => `<small>${d.k === 0 ? 'Hoy' : d.k === 1 ? 'Mañana' : fecha(d).c}</small>${fecha(d).n}`);
  mk($('#c-ppl'), PPL, 'ppl', (p) => p);
  mk($('#c-extra'), EX, 'extra', (e) => e);

  const dayName = (d) => week.find((s) => s.dayOfWeek === d.dw)?.name || DAYS[d.dw];
  const isNothing = () => st.extra === EX[0];
  const msg = () => {
    const d = dias[st.dia];
    return `Holi Bebesota 💖 Quiero apartar mesa para ${fecha(d).l} (${dayName(d)}), somos ${st.ppl}.${isNothing() ? '' : ' ' + st.extra}`;
  };

  let tmr;
  function paint(anim) {
    [...$('#c-dia').children].forEach((b, i) => b.setAttribute('aria-pressed', i === st.dia));
    [...$('#c-ppl').children].forEach((b, i) => b.setAttribute('aria-pressed', PPL[i] === st.ppl));
    [...$('#c-extra').children].forEach((b, i) => b.setAttribute('aria-pressed', EX[i] === st.extra));
    $('#mi-msg').textContent = msg();
    if (anim) {
      clearTimeout(tmr);
      $('#typing').classList.add('on');
      tmr = setTimeout(() => $('#typing').classList.remove('on'), 1200);
    }
  }
  paint(false);

  const sender = reservationForm(form);
  form.onsubmit = (e) => {
    e.preventDefault();
    const d = dias[st.dia];
    /** @type {import('../services/types.js').ReservationRequest} */
    const payload = {
      type: 'table',
      date: ymdOf(dateOf(d)),
      dayName: dayName(d),
      partySize: st.ppl,
      extra: isNothing() ? null : st.extra,
    };
    sender.send(payload, msg());
  };
}
