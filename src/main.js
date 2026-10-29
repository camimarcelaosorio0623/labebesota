import './styles/main.css';
import { $, bindSite } from './lib/dom.js';
import { initReveal } from './lib/reveal.js';
import { waLink, wireWhatsAppLinks } from './lib/whatsapp.js';
import { config, isDemo } from './config/env.js';
import { site } from './config/site.js';
import { getWeeklySpecials, getEvents } from './services/index.js';
import { initMode } from './components/mode.js';
import { initStatus, renderHours } from './components/status.js';
import { initBuffet } from './components/buffet.js';
import { renderWeek } from './components/week.js';
import { renderEvents, renderTournament } from './components/events.js';
import { initReservation } from './components/reservation.js';
import { renderFaq } from './components/faq.js';
import { initLocation, injectJsonLd, renderMarquee, initSparkles } from './components/location.js';

const STAGGER = '.flyers,.grupos';

document.getElementById('demo-flag').hidden = !isDemo;
$('#wa-pend').hidden = !config.whatsappPending;
bindSite(site);
injectJsonLd();
initMode();
initStatus();
renderHours();
renderMarquee();
initBuffet();
renderTournament();
renderFaq();
initLocation();
initSparkles();
initReveal(STAGGER);

wireWhatsAppLinks();
const wa = $('#wa');
wa.href = waLink('Holi Bebesota 💖 Tengo una pregunta');
wa.target = '_blank';
wa.rel = 'noopener';

getWeeklySpecials()
  .catch(() => [])
  .then((week) => {
    renderWeek(week);
    initReservation(week);
  });

const flyers = $('#flyers');
getEvents()
  .then((e) => renderEvents(flyers, e))
  .catch(() => renderEvents(flyers, [], 'error'))
  .finally(() => initReveal(STAGGER));
