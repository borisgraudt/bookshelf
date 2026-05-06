export const logger = {
  level: (process.env.LOG_LEVEL ?? 'info') as 'debug' | 'info' | 'warn' | 'error',
  pretty: process.env.NODE_ENV !== 'production',
} as const;

export type LoggerConfig = typeof logger;
