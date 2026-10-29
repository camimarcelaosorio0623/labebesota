import { $, esc, safeUrl, setState, PENDING } from '../lib/dom.js';
import { pueblaDate, shortDate } from '../lib/time.js';
import { waLink } from '../lib/whatsapp.js';
import { site } from '../config/site.js';

const ms = (iso) => new Date(iso).getTime();

/**
 * Cartelera: próximos primero; los pasados se marcan «Ya pasó».
 * @param {import('../services/types.js').EventItem[]} events
 */
export function renderEvents(box, events, state = events.length ? 'ready' : 'empty') {
  setState(box, state);
  if (state !== 'ready') {
    box.innerHTML = `<p class="vacio">${state === 'error' ? 'No pudimos cargar la cartelera.' : 'Estamos armando la cartelera.'} Checa <a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.handle}</a>.</p>`;
    return;
  }
  const now = Date.now();
  const list = events
    .map((e) => ({ ...e, past: !e.recurring && e.startsAt && ms(e.startsAt) + 5 * 3600e3 < now }))
    .sort((a, b) => (a.past - b.past) || ((a.startsAt ? ms(a.startsAt) : 0) - (b.startsAt ? ms(b.startsAt) : 0)));
  box.innerHTML = list.map((e) => {
    const tag = e.recurring ? 'Todas las semanas' : e.past ? 'Ya pasó' : shortDate(pueblaDate(ms(e.startsAt)));
    return `<article class="fly reveal${e.past ? ' pas' : ''}"><div class="ph"><span class="tag">${tag}</span><img src="${esc(safeUrl(e.image))}" alt="Flyer ${esc(e.title)}" loading="lazy"></div><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p></article>`;
  }).join('');
}

/** Bloque del torneo de billar (datos de site.js). */
export function renderTournament() {
  const t = site.tournament;
  $('#torneo-fee').textContent = t.fee;
  $('#premios').innerHTML = t.prizes.map((p) => `<span>${esc(p)}</span>`).join('');
  $('#torneo-fecha').innerHTML = t.nextDate ? esc(t.nextDate) : `se anuncia en Instagram ${PENDING}`;
  const a = $('#torneo-cta');
  a.href = waLink('Holi Bebesota 🎱 Quiero inscribir a mi dupla al próximo torneo de billar');
}
