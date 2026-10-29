/**
 * Validación de interfaz (solo en el flujo 'api', cuando la página pide nombre y teléfono).
 * Es ayuda para el usuario: el backend debe validar todo de nuevo.
 */
export const rules = {
  name: (v) => {
    const s = String(v ?? '').trim();
    if (!s) return 'Dinos a nombre de quién.';
    if (s.length < 2) return 'El nombre es muy corto.';
    if (s.length > 80) return 'El nombre es muy largo.';
    return null;
  },
  phone: (v) => {
    const digits = String(v ?? '').replace(/[^\d]/g, '');
    if (!digits) return 'Necesitamos un teléfono para confirmarte.';
    if (digits.length < 10 || digits.length > 13) return 'Revisa el teléfono (10 dígitos, o con lada internacional).';
    return null;
  },
  consent: (v) => (v ? null : 'Necesitamos tu autorización para contactarte.'),
};

/** Normaliza un teléfono mexicano a E.164 (+52…). Si ya trae lada internacional, la respeta. */
export function normalizePhone(v) {
  const raw = String(v ?? '').trim();
  const digits = raw.replace(/[^\d]/g, '');
  if (raw.startsWith('+')) return '+' + digits;
  if (digits.length === 10) return '+52' + digits;
  return '+' + digits;
}

/**
 * Valida un formulario a partir de un mapa campo → validador.
 * Pinta los mensajes en [data-error-for="campo"] y marca aria-invalid.
 * Ignora los campos deshabilitados (los que no aplican en el flujo actual).
 * @returns {boolean} true si todo es válido
 */
export function validateForm(form, schema) {
  let firstInvalid = null;
  for (const [field, check] of Object.entries(schema)) {
    const input = form.elements[field];
    if (!input || input.disabled) continue;
    const msg = check(input.type === 'checkbox' ? input.checked : input.value, form);
    showFieldError(form, field, msg);
    if (msg && !firstInvalid) firstInvalid = input;
  }
  firstInvalid?.focus();
  return !firstInvalid;
}

export function showFieldError(form, field, msg) {
  const input = form.elements[field];
  const out = form.querySelector(`[data-error-for="${field}"]`);
  if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (out) out.textContent = msg || '';
}
