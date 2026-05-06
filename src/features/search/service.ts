import type { Book } from '../bookshelf/types';
import { searchBooks, type SearchHit } from './engine';

export class SearchService {
  constructor(private readonly source: () => Book[]) {}

  query(q: string, limit = 8): SearchHit[] {
    return searchBooks(this.source(), q).slice(0, limit);
  }

  byGenre(genre: string): Book[] {
    return this.source().filter((b) => b.genre?.toLowerCase() === genre.toLowerCase());
  }

  byAuthor(author: string): Book[] {
    const a = author.toLowerCase();
    return this.source().filter((b) => b.author.toLowerCase().includes(a));
  }
}
