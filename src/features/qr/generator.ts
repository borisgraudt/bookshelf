import type { Book } from '../bookshelf/types';

export interface QrPayload {
  v: 1;
  id: string;
  shelf: number;
  row: number;
  index: number;
}

export function encodeBook(book: Book): QrPayload {
  return {
    v: 1,
    id: book.id,
    shelf: book.position.shelf,
    row: book.position.row,
    index: book.position.index,
  };
}

export function bookUrl(baseUrl: string, book: Book): string {
  const u = new URL(baseUrl);
  u.searchParams.set('book', book.id);
  return u.toString();
}

export function payloadToString(payload: QrPayload): string {
  return JSON.stringify(payload);
}
