'use client';

import { SHELF, useBookshelf } from '../model';
import { layoutX } from '../utils';
import { ACCENT } from '@/ui/theme';

export function HighlightBeam() {
  const { books, selectedId } = useBookshelf();
  if (!selectedId) return null;
  const book = books.find((b) => b.id === selectedId);
  if (!book) return null;

  const xMap = layoutX(books, book.position.shelf, book.position.row);
  const x = xMap.get(book.id) ?? 0;
  const z = book.position.row === 0 ? 0.37 : -0.37;
  const totalH = SHELF.shelves * SHELF.shelfHeight;
  const yMarker = (book.position.shelf + 1) * SHELF.shelfHeight + 1.4;

  return (
    <group position={[0, -totalH / 2, 0]}>
      <mesh position={[x, yMarker, z]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.13, 0.36, 24]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}
