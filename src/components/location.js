import { $, esc, safeUrl } from '../lib/dom.js';
import { site } from '../config/site.js';

/** Mapa embebido y reseñas (si ya hay reseñas reales cargadas en site.js). */
export function initLocation() {
  const map = $('#mapa');
  const src = safeUrl(site.address.mapEmbed);
  if (src) map.src = src;
  else map.hidden = true;
  if (site.reviews.length) {
    $('#resenas').innerHTML = site.reviews.map((r) => `<blockquote><p>${'⭐'.repeat(r.stars || 5)} ${esc(r.text)}</p><cite>${esc(r.author)}</cite></blockquote>`).join('');
  }
}

/** Datos estructurados para buscadores, a partir de site.js. */
export function injectJsonLd() {
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: site.name,
    slogan: site.slogan,
    address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: 'Puebla', addressRegion: 'Puebla', addressCountry: 'MX' },
    openingHours: site.hours.schemaOpeningHours,
    sameAs: [site.instagram.url],
  });
  document.head.appendChild(s);
}

export function renderMarquee() {
  const h = site.marquee.map((x) => `<span>${esc(x)}</span><span>✦</span>`).join('');
  $('#mq').innerHTML = h + h;
}

/** Destellos del hero. */
export function initSparkles() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = $('#destellos');
  for (let i = 0; i < 22; i++) {
    const e = document.createElement('i');
    const z = 10 + Math.random() * 16;
    e.style.width = e.style.height = z + 'px';
    e.style.left = Math.random() * 100 + '%';
    e.style.top = Math.random() * 100 + '%';
    e.style.animationDuration = 2.4 + Math.random() * 3 + 's';
    e.style.animationDelay = -Math.random() * 5 + 's';
    c.appendChild(e);
  }
}

