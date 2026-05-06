import { promises as fs } from 'node:fs';
import path from 'node:path';

const SAMPLE = [
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', year: 1999, genre: 'Software' },
  { title: 'Clean Code', author: 'Robert C. Martin', year: 2008, genre: 'Software' },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', year: 2017, genre: 'Software' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011, genre: 'History' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: 2011, genre: 'Psychology' },
];

async function main() {
  const out = path.resolve('data/books.json');
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(SAMPLE, null, 2), 'utf8');
  console.log(`seeded ${SAMPLE.length} books → ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
