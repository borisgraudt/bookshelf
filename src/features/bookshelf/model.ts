import { create } from 'zustand';
import type { Book, ShelfConfig } from './types';
import booksData from '../../../data/books.json';

type BookSource = {
  title: string;
  author: string | null;
  year: number | null;
  genre?: string;
  row?: 'front' | 'back' | 0 | 1;
  shelf?: number;
};
const SOURCE = booksData as BookSource[];

export const SHELF: ShelfConfig = {
  shelves: 3,
  rowsPerShelf: 2,
  shelfWidth: 7.5,
  shelfHeight: 1.6,
  shelfDepth: 1.5,
};

const COLORS = [
  '#5b4636',
  '#2f3e46',
  '#7a3b2e',
  '#3a4d39',
  '#1f3a5f',
  '#6b5b3a',
  '#4a3c5a',
  '#8a7a5e',
  '#3d2f2a',
  '#566e64',
  '#2a3a4a',
  '#7a6a52',
];

function rnd(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function normalizeRow(row: BookSource['row']): 0 | 1 {
  if (row === 'back' || row === 1) return 1;
  return 0;
}

function seedBooks(): Book[] {
  const books: Book[] = [];
  const maxX = SHELF.shelfWidth - 0.2;
  const cursor = new Map<string, { x: number; index: number }>();
  const autoSlots: { shelf: number; row: 0 | 1 }[] = [];
  for (let s = SHELF.shelves - 1; s >= 0; s--) {
    for (let r = 0 as 0 | 1; r < SHELF.rowsPerShelf; r++) {
      autoSlots.push({ shelf: s, row: r });
    }
  }
  let autoPtr = 0;

  const advanceAuto = (w: number): { shelf: number; row: 0 | 1 } | null => {
    while (autoPtr < autoSlots.length) {
      const slot = autoSlots[autoPtr];
      const key = `${slot.shelf}:${slot.row}`;
      const c = cursor.get(key) ?? { x: 0, index: 0 };
      if (c.x + w <= maxX) return slot;
      autoPtr++;
    }
    return null;
  };

  for (let idx = 0; idx < SOURCE.length; idx++) {
    const src = SOURCE[idx];
    const w = 0.07 + rnd(idx * 3 + 1) * 0.11;
    const h = 0.85 + rnd(idx * 7 + 5) * 0.6;

    let shelf: number;
    let row: 0 | 1;
    if (src.shelf != null && src.row != null) {
      shelf = Math.max(0, Math.min(SHELF.shelves - 1, src.shelf));
      row = normalizeRow(src.row);
    } else {
      const slot = advanceAuto(w);
      if (!slot) break;
      shelf = slot.shelf;
      row = slot.row;
    }

    const key = `${shelf}:${row}`;
    const c = cursor.get(key) ?? { x: 0, index: 0 };
    if (c.x + w > maxX) continue;

    books.push({
      id: `b${idx}`,
      title: src.title,
      author: src.author ?? '',
      year: src.year ?? undefined,
      genre: src.genre,
      color: COLORS[idx % COLORS.length],
      width: w,
      height: h,
      position: { shelf, row, index: c.index },
    });
    cursor.set(key, { x: c.x + w + 0.008, index: c.index + 1 });
  }
  return books;
}

export type Direction = 'left' | 'right' | 'up' | 'down';

function pickNeighbor(books: Book[], currentId: string | null, dir: Direction): string | null {
  if (books.length === 0) return null;
  if (!currentId) return books[0].id;
  const cur = books.find((b) => b.id === currentId);
  if (!cur) return books[0].id;

  if (dir === 'left' || dir === 'right') {
    const sameRow = books
      .filter((b) => b.position.shelf === cur.position.shelf && b.position.row === cur.position.row)
      .sort((a, b) => a.position.index - b.position.index);
    const i = sameRow.findIndex((b) => b.id === cur.id);
    if (i === -1) return cur.id;
    const next = dir === 'right' ? sameRow[i + 1] : sameRow[i - 1];
    return next ? next.id : cur.id;
  }

  const targetShelf = dir === 'up' ? cur.position.shelf + 1 : cur.position.shelf - 1;
  const candidates = books
    .filter((b) => b.position.shelf === targetShelf && b.position.row === cur.position.row)
    .sort((a, b) => Math.abs(a.position.index - cur.position.index) - Math.abs(b.position.index - cur.position.index));
  return candidates[0]?.id ?? cur.id;
}

interface BookshelfState {
  books: Book[];
  selectedId: string | null;
  select: (id: string | null) => void;
  navigate: (dir: Direction) => void;
}

export const useBookshelf = create<BookshelfState>((set, get) => ({
  books: seedBooks(),
  selectedId: null,
  select: (id) => set({ selectedId: id }),
  navigate: (dir) => set({ selectedId: pickNeighbor(get().books, get().selectedId, dir) }),
}));
