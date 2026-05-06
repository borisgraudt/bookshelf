import { promises as fs } from 'node:fs';
import path from 'node:path';
import { env } from '../../../config/env';
import { NotFoundError } from '../../core/errors/AppError';

export class JsonRepository<T> {
  constructor(private readonly file: string) {}

  private get fullPath() {
    return path.resolve(env.dataDir, this.file);
  }

  async readAll(): Promise<T[]> {
    try {
      const raw = await fs.readFile(this.fullPath, 'utf8');
      return JSON.parse(raw) as T[];
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw err;
    }
  }

  async writeAll(items: T[]): Promise<void> {
    await fs.mkdir(path.dirname(this.fullPath), { recursive: true });
    await fs.writeFile(this.fullPath, JSON.stringify(items, null, 2), 'utf8');
  }

  async findBy(predicate: (item: T) => boolean): Promise<T | undefined> {
    const items = await this.readAll();
    return items.find(predicate);
  }

  async require(predicate: (item: T) => boolean, label: string): Promise<T> {
    const found = await this.findBy(predicate);
    if (!found) throw new NotFoundError(label);
    return found;
  }
}
