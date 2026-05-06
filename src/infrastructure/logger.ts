import { logger as cfg } from '../../config/logger';

const levels = { debug: 10, info: 20, warn: 30, error: 40 } as const;
type Level = keyof typeof levels;

function emit(level: Level, msg: string, meta?: unknown) {
  if (levels[level] < levels[cfg.level]) return;
  const ts = new Date().toISOString();
  const line = `[${ts}] ${level.toUpperCase()} ${msg}`;
  const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  if (meta !== undefined) fn(line, meta);
  else fn(line);
}

export const log = {
  debug: (m: string, meta?: unknown) => emit('debug', m, meta),
  info: (m: string, meta?: unknown) => emit('info', m, meta),
  warn: (m: string, meta?: unknown) => emit('warn', m, meta),
  error: (m: string, meta?: unknown) => emit('error', m, meta),
};
