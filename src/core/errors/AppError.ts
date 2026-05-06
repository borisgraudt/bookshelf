export class AppError extends Error {
  readonly code: string;
  readonly status: number;
  readonly cause?: unknown;

  constructor(code: string, message: string, options: { status?: number; cause?: unknown } = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = options.status ?? 500;
    this.cause = options.cause;
  }
}

export class NotFoundError extends AppError {
  constructor(what: string) {
    super('NOT_FOUND', `${what} not found`, { status: 404 });
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION', message, { status: 400 });
    this.name = 'ValidationError';
  }
}
