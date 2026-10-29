import { $, esc } from '../lib/dom.js';
import { site } from '../config/site.js';

export function renderFaq(sel = '#faq-list') {
  const box = $(sel);
  if (box) box.innerHTML = site.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
}
