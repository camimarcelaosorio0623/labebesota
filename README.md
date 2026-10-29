# La Bebesota · Mixes Mexas — Frontend v2

Sitio de **La Bebesota**, bar de barrio en La Paz, Puebla. Concepto: neón Y2K chrome con **modo día / noche** (automático por la hora de Puebla + interruptor).
Frontend completo, en modo demostración, listo para que Agentia conecte backend, agentes y canales.

- Vista previa: https://labebesita.netlify.app/
- Documento para integración: [`INTEGRATION_HANDOFF.md`](INTEGRATION_HANDOFF.md)
- Estado de contenidos (qué es real y qué es de prueba): [`CONTENT_STATUS.md`](CONTENT_STATUS.md)

## Stack

| Pieza | Versión | Por qué |
|---|---|---|
| HTML + CSS + JavaScript (ES modules), sin framework | — | Conserva el diseño aprobado (v1.1) sin reconstruirlo. |
| [Vite](https://vite.dev) | 8.3.5 | Servidor de desarrollo, build de producción y variables `VITE_*`. |
| Node.js | ≥ 20.19 (Netlify usa 22) | Requisito de Vite 8. |

Misma arquitectura que El Güero (`el-guero-web`): capa de servicios + mocks + adaptador HTTP.

## Comandos

```bash
npm install
cp .env.example .env.local   # opcional; sin él corre en modo demo
npm run dev                  # http://localhost:3034
npm run build                # → dist/
npm run preview              # sirve dist/ en http://localhost:4173
```

**Despliegue:** Netlify publica solo con cada push a `main` usando `netlify.toml` (`npm ci && npm run build`, carpeta `dist`). En Cloudflare Pages: mismo comando y carpeta.

## Dónde se cambian los datos (para reemplazar los de prueba)

| Qué | Archivo |
|---|---|
| Dirección, mapa, horario, buffet, torneo, textos del hero día/noche, opciones de reserva, reseñas, FAQ, aviso de privacidad | `src/config/site.js` — el HTML los toma de aquí. Un `null` se ve como «por confirmar». |
| Número de WhatsApp (hoy **ficticio**) | `VITE_WHATSAPP_NUMBER` (o `WHATSAPP_PLACEHOLDER` en `src/config/env.js`) |
| Promo de cada día (bolas de billar) y cartelera (mientras no haya backend) | `src/data/mocks/weekly-specials.js`, `src/data/mocks/events.js` |
| Fotos | `public/img/` — reemplazar con el mismo nombre. Con las reales: `samplePhotos: false`. |
| Textos de diseño | `index.html` |

## Estructura

```
index.html                 Estructura de todas las secciones (datos del cliente desde site.js)
src/
  main.js                  Punto de entrada
  config/env.js, site.js   Configuración pública y datos del cliente
  services/                index.js (puerta única), types.js, adapters/{mock,http,request}.js
  data/mocks/              weekly-specials.js, events.js
  components/
    mode.js                Modo día / noche + flash del photobooth
    status.js              Abierto / cerrado y tabla de horario (hora de Puebla)
    buffet.js              Cuenta regresiva del buffet
    week.js                La semana en bolas de billar
    events.js              Cartelera + torneo de billar
    reservation.js         Reserva con vista previa del chat → WhatsApp o API
    cta.js                 CTA «apartar» según el flujo
    location.js            Mapa, reseñas, JSON-LD, marquesina, destellos
    faq.js
  lib/                     dom (escape, bindSite), time (hora de Puebla), reservation (flujos whatsapp/api),
                           validation, whatsapp, track (analítica), reveal
  styles/main.css
public/img/                Flyers (del Instagram), logo y fotos de muestra
```

## Variables de entorno

Ver [`.env.example`](.env.example). Todas son **públicas**: nunca poner tokens ni claves.

| Variable | Por defecto | Uso |
|---|---|---|
| `VITE_DATA_SOURCE` | `mock` | `mock` = demo · `http` = API de Agentia |
| `VITE_API_BASE_URL` | vacío | URL base de la API |
| `VITE_RESERVATION_FLOW` | `whatsapp` | `whatsapp` = abre WhatsApp y registra en segundo plano · `api` = pide nombre/teléfono y muestra el estado |
| `VITE_WHATSAPP_NUMBER` | vacío → `520000000000` | **Ficticio** (no existe). Mientras esté vacío se ve «Número de WhatsApp por confirmar». |
| `VITE_SITE_URL` | `https://labebesita.netlify.app` | URL pública |

## Banderas de demostración (solo con el mock)

`?mock=error` · `?mock=confirmado` · `?mock=lento` · `?mock=vacio` (sin cartelera).
En modo mock aparece la cinta «Modo demostración · datos de prueba».

## Pruebas hechas (29-oct-2026)

Navegador (Playwright) a 390 y 1366 px, en ambos flujos: sin errores de consola propios (solo el aviso de WebGL del mapa de OpenStreetMap en navegador sin GPU), sin scroll horizontal (se corrigió el desborde del header en móvil que venía de la v1), semana/cartelera/torneo desde la capa de servicios y `site.js`, flujo `whatsapp` con el mensaje correcto, flujo `api` con validación y «Solicitud recibida», `?mock=error` con su estado.
