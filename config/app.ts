export const app = {
  name: 'Bookshelf',
  version: '0.1.0',
  description: 'Spatial 3D index of a personal book collection',
} as const;

export type AppConfig = typeof app;
