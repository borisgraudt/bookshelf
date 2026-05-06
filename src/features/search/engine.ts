import type { Book } from '../bookshelf/types';

export interface SearchHit {
  book: Book;
  score: number;
}

export function searchBooks(books: Book[], query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/);
  const hits: SearchHit[] = [];
  for (const book of books) {
    const haystack = [book.title, book.author, book.genre ?? '', String(book.year ?? '')]
      .join(' ')
      .toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (!haystack.includes(t)) {
        score = 0;
        break;
      }
      if (book.title.toLowerCase().includes(t)) score += 3;
      if (book.author.toLowerCase().includes(t)) score += 2;
      score += 1;
    }
    if (score > 0) hits.push({ book, score });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 8);
}
