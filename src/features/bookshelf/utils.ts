import { SHELF } from './model';
import type { Book } from './types';

export function layoutX(books: Book[], shelf: number, row: number): Map<string, number> {
  const onRow = books
    .filter((b) => b.position.shelf === shelf && b.position.row === row)
    .sort((a, b) => a.position.index - b.position.index);
  const map = new Map<string, number>();
  let x = -SHELF.shelfWidth / 2 + 0.1;
  for (const b of onRow) {
    map.set(b.id, x + b.width / 2);
    x += b.width + 0.01;
  }
  return map;
}

export function darken(hex: string, amount = 0.25): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) * (1 - amount));
  const g = Math.max(0, ((n >> 8) & 255) * (1 - amount));
  const b = Math.max(0, (n & 255) * (1 - amount));
  return `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
}
