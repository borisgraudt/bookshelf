import type { Book } from './types';
import { SHELF } from './model';
import { layoutX } from './utils';

export interface RenderedShelf {
  shelf: number;
  rows: { row: number; books: { book: Book; x: number }[] }[];
}

export function buildLayout(books: Book[]): RenderedShelf[] {
  const out: RenderedShelf[] = [];
  for (let s = 0; s < SHELF.shelves; s++) {
    const rows: RenderedShelf['rows'] = [];
    for (let r = 0; r < SHELF.rowsPerShelf; r++) {
      const xs = layoutX(books, s, r);
      const onRow = books
        .filter((b) => b.position.shelf === s && b.position.row === r)
        .map((b) => ({ book: b, x: xs.get(b.id) ?? 0 }))
        .sort((a, b) => a.book.position.index - b.book.position.index);
      rows.push({ row: r, books: onRow });
    }
    out.push({ shelf: s, rows });
  }
  return out;
}

export function findBookAt(books: Book[], shelf: number, row: number, index: number): Book | undefined {
  return books.find(
    (b) => b.position.shelf === shelf && b.position.row === row && b.position.index === index,
  );
}
