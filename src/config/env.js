/**
 * Configuración pública del frontend.
 * Solo valores que pueden vivir en el navegador: nada de tokens ni claves.
 * Ver .env.example.
 */
const env = import.meta.env;
const params = new URLSearchParams(window.location.search);

/** Número que se usa mientras no se configure VITE_WHATSAPP_NUMBER. Número FICTICIO 52 000 000 0000: no existe, solo para la demo. PENDIENTE el real. */
export const WHATSAPP_PLACEHOLDER = '520000000000';

export const config = {
  /** 'mock' = datos de demostración · 'http' = API de Agentia */
  dataSource: env.VITE_DATA_SOURCE === 'http' ? 'http' : 'mock',
  apiBaseUrl: (env.VITE_API_BASE_URL || '').replace(/\/$/, ''),
  /** 'whatsapp' = abre WhatsApp y registra en segundo plano · 'api' = formulario con estados (ver src/lib/reservation.js) */
  reservationFlow: env.VITE_RESERVATION_FLOW === 'api' ? 'api' : 'whatsapp',
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER || WHATSAPP_PLACEHOLDER).replace(/\D/g, ''),
  whatsappPending: !env.VITE_WHATSAPP_NUMBER,
  siteUrl: env.VITE_SITE_URL || window.location.origin,
  requestTimeoutMs: 12000,

  /**
   * Banderas de la demo (solo por URL y solo con el mock):
   *  ?mock=error       → los envíos fallan (para ver el estado de error)
   *  ?mock=confirmado  → el mock responde "confirmada" (para ver ese estado)
   *  ?mock=lento       → el mock tarda más (para ver estados de carga)
   *  ?mock=vacio       → no hay eventos ni promociones (para ver los estados vacíos)
   */
  mockScenario: params.get('mock') || 'normal',
};

export const isDemo = config.dataSource === 'mock';
