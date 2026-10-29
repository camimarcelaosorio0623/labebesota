/**
 * fetch con timeout y errores normalizados (ServiceError). Lo usa el adaptador HTTP.
 * Sin credenciales: si la API necesita autenticación, debe resolverse en el servidor
 * (cookies httpOnly, proxy, etc.), nunca con un token en el navegador.
 */
import { config } from '../../config/env.js';
import { ServiceError } from '../types.js';

export async function request(path, { method = 'GET', body } = {}) {
  if (!config.apiBaseUrl) throw new ServiceError('unknown', 'Falta VITE_API_BASE_URL.');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), config.requestTimeoutMs);
  let res;
  try {
    res = await fetch(config.apiBaseUrl + path, {
      method,
      headers: body ? { 'Content-Type': 'application/json', Accept: 'application/json' } : { Accept: 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
      credentials: 'omit',
    });
  } catch (err) {
    throw new ServiceError(err.name === 'AbortError' ? 'timeout' : 'network', 'No pudimos conectar con el servidor.');
  } finally {
    clearTimeout(timer);
  }

  const data = await res.json().catch(() => null);
  if (res.ok) return data;
  if (res.status === 422 || res.status === 400) {
    throw new ServiceError('validation', data?.message || 'Revisa los datos enviados.', data?.fields);
  }
  if (res.status === 404) throw new ServiceError('not_found', data?.message || 'No encontrado.');
  throw new ServiceError('server', data?.message || 'El servidor no respondió como esperábamos.');
}
