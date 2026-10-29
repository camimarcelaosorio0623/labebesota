# CONTENT_STATUS — La Bebesota

Actualizado: 29-oct-2026 · Frontend v2

Todo lo que no está en «✅ Del cliente» es **de prueba** y se reemplaza sin tocar código de componentes (ver README).

## ✅ Del cliente (Instagram @labebesota19 y flyers, oct-2026)

| Dato | Dónde vive |
|---|---|
| Nombre, «Mixes Mexas», La Paz, Puebla | `index.html`, `site.js` |
| Horario lun–sáb 11:30 a 00:00 | `site.js → hours` |
| Buffet $149, martes a jueves hasta las 6 PM, sin bebida, no para llevar | `site.js → buffet` |
| Torneo de billar: inscripción $100 y premios | `site.js → tournament` |
| Nombres de los días (Guglunes, Mamartes, Miercolitro, Juevebes, Sabadrink) | `data/mocks/weekly-specials.js` |
| Flyers: Halloween Party (Sensual Dolls vol. 2), torneo, buffet | `data/mocks/events.js`, `public/img/fl1-3.jpg` |

## 🧪 De prueba / por confirmar

| Dato | Estado en el sitio | Dónde se cambia |
|---|---|---|
| **WhatsApp** | **Ficticio** `52 000 000 0000` + aviso «por confirmar» | `VITE_WHATSAPP_NUMBER` |
| Dirección: 19 Sur 1101 vs 19 Sur 101 altos | Visible con nota «confirmar» | `site.js → address` (`note: null` al confirmar) |
| Coordenadas del mapa | Aproximadas | `site.js → address.mapEmbed` |
| Próxima fecha del torneo | «por confirmar» | `site.js → tournament.nextDate` |
| «Viernes de DJ (ejemplo)» | **Ficticio**, siempre en el próximo viernes | borrar `demo` en `data/mocks/events.js` |
| Descripciones de cada día | Propuesta | `data/mocks/weekly-specials.js` |
| Contenido de los paquetes de grupo | «por confirmar» | `site.js → groupsNote` (null para quitar el aviso) |
| Reseñas de Google | Aviso «aquí van tres reseñas reales» | `site.js → reviews` (nunca inventar) |
| FAQ, textos del hero día/noche | Propuesta | `site.js → faq, heroCopy` |
| Aviso de privacidad | No hay | `site.js → privacyPolicyUrl` |

## 🖼️ Fotos

| Archivo | Uso | Estado |
|---|---|---|
| `public/img/fl1-3.jpg`, `logo.jpg` | Flyers, favicon, avatar del chat | Del Instagram |
| `public/img/hero.jpg`, `crowd*.jpg`, `detail.jpg`, `event.jpg` | Hero, photobooth, evento de ejemplo | Muestra |

Con las fotos reales: reemplazar con el mismo nombre y `samplePhotos: false`.
