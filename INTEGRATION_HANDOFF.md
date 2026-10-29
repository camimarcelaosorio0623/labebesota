# INTEGRATION_HANDOFF — La Bebesota

**Para:** equipo de backend / agentes de Agentia Labs
**De:** Marce (frontend)
**Fecha:** 29-oct-2026 · Frontend v2

> Las rutas y formatos son una **propuesta**: ninguna API está implementada. El frontend se ajusta en un solo archivo (`src/services/adapters/http.js`).

## 1. Cómo se conecta

1. `VITE_DATA_SOURCE=http` y `VITE_API_BASE_URL=https://…`.
2. Ajustar `ENDPOINTS` en `src/services/adapters/http.js`.
3. Elegir el flujo de reservas con `VITE_RESERVATION_FLOW` (§4).
4. Los componentes no se tocan: solo consumen `src/services/index.js`.

Reglas que el frontend ya cumple: sin credenciales en el navegador, todo texto del backend escapado, URLs filtradas, validación solo de ayuda (**el backend valida de nuevo**), nunca inventa IDs ni confirma por su cuenta.

## 2. Módulos que requieren backend

| Módulo | Función | Necesita | Estado |
|---|---|---|---|
| La semana (bolas de billar) | `getWeeklySpecials()` | Pretexto/promo de cada día | Mock (nombres de los flyers) |
| Cartelera | `getEvents()` | Flyers publicados (fechados o recurrentes) | Mock (3 del Instagram + 1 de ejemplo) |
| Reservas | `submitReservation()`, `getReservationStatus()` | Recibir solicitud, confirmación por el agente | Mock |
| WhatsApp | `VITE_WHATSAPP_NUMBER` | Número oficial + agente | **Ficticio** `520000000000` |
| Cotizaciones de grupo y torneo | enlaces `data-wa` en `index.html` | Solo WhatsApp (conversación con el agente) | Activos |
| CRM / analítica | `track()` en `src/lib/track.js` | Destino de eventos | Emite `CustomEvent('bebesota:track')` |

El buffet, el torneo y el horario viven en `site.js` (contenido estable). Si prefieren administrarlos desde el backend, se mueven a la capa de servicios con el mismo patrón.

## 3. Estructuras de datos

Fuente de verdad: `src/services/types.js`.

```ts
WeeklySpecial { dayOfWeek: 0..6; name: string; description: string; color: string /*hex de la bola*/; closed: boolean }

EventItem {
  id: string; title: string; description: string|null; image: string|null;
  startsAt: string|null;      // ISO 8601 con zona; null si es recurrente
  recurring: boolean;         // true = «Todas las semanas»
  status: 'draft'|'published'|'cancelled'
}

ReservationRequest {
  type: 'table';
  date: 'YYYY-MM-DD';         // hora de Puebla
  dayName: string;            // pretexto del día, ej. 'Miercolitro'
  partySize: '2'|'3-4'|'5-8'|'9-12'|'13+';
  extra: string|null;         // 'Es cumpleaños 🎂' | 'Vamos al buffet 🍔' | 'Queremos billar 🎱' | null
  name: string|null; phone: string|null;   // null en flujo whatsapp
  consent: boolean;
  channel: 'whatsapp'|'web'
}
ReservationResult { requestId: string; status: 'received'|'pending'|'confirmed'|'rejected'|'cancelled'; message?: string|null }
```

## 4. Flujos de reserva (`VITE_RESERVATION_FLOW`)

**`whatsapp` (por defecto):** el formulario abre WhatsApp con el mensaje (el mismo que se ve en la vista previa del chat) y en paralelo hace `POST /reservations` con `channel: "whatsapp"`. Los CTA del buffet y de cada día también abren WhatsApp (evento `cta_whatsapp_click {cta}`).

```
Holi Bebesota 💖 Quiero apartar mesa para mañana viernes 30 (Viernes de evento), somos 5-8. Es cumpleaños 🎂
```

**`api`:** el formulario pide nombre, teléfono y autorización, envía y muestra el estado. Los CTA del buffet y de los días llevan al formulario.

## 5. Operaciones de API propuestas

| Método y ruta | Respuesta |
|---|---|
| `GET /weekly-specials` | `200 WeeklySpecial[]` (los 7 días; el frontend los ordena lun→dom) |
| `GET /events?status=published` | `200 EventItem[]` |
| `POST /reservations` | `201 ReservationResult` |
| `GET /reservations/{requestId}` | `200 ReservationResult` *(preparado)* |

Errores: 400/422 → `validation` (`fields`: `name`, `phone`, `consent`) · 404 → `not_found` · 5xx / red / timeout 12 s → error con enlace a WhatsApp.

## 6. Eventos de analítica

`window` → `bebesota:track`: `cta_whatsapp_click {cta}`, `reservation_whatsapp_opened {type}`, `reservation_log_failed {code}`, `reservation_submitted {type,status}`, `reservation_failed {type,code}`.

## 7. Dependencias pendientes

- [ ] **WhatsApp real** → `VITE_WHATSAPP_NUMBER` (bloquea el lanzamiento: hoy el número es ficticio).
- [ ] Contratos API · CORS (dominio + `localhost:3034`).
- [ ] Destino de `track()`.
- [ ] Aviso de privacidad → `privacyPolicyUrl`.
- [ ] Hosting de flyers.
- [ ] Dominio definitivo.

## 8. Preguntas técnicas

1. ¿El buffet tiene cupo? Si sí, disponibilidad por día.
2. ¿Inscripción al torneo con pago? Hoy es solo WhatsApp.
3. ¿Anti-spam en el flujo `api`?
