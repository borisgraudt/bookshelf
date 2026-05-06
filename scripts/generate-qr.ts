import { promises as fs } from 'node:fs';
import path from 'node:path';
import booksData from '../data/books.json' with { type: 'json' };
import { bookUrl, encodeBook, payloadToString } from '../src/features/qr/generator';
import type { Book } from '../src/features/bookshelf/types';

const BASE = process.env.QR_BASE_URL ?? 'http://localhost:3000';

async function main() {
  const books = booksData as unknown as Book[];
  const out = path.resolve('data/qr-index.json');
  const entries = books.map((b) => ({
    id: b.id,
    url: bookUrl(BASE, b),
    payload: payloadToString(encodeBook(b)),
  }));
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(entries, null, 2), 'utf8');
  console.log(`wrote ${entries.length} QR entries → ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
