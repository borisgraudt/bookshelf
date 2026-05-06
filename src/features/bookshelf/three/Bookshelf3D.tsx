'use client';

import { useMemo } from 'react';
import { SHELF, useBookshelf } from '../model';
import { layoutX } from '../utils';
import { BookMesh } from './BookMesh';

const SHELF_WOOD = '#ededf0';
const BACK_PANEL = '#f4f4f7';

function ShelfBoard({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0]} castShadow receiveShadow>
      <boxGeometry args={[SHELF.shelfWidth + 0.4, 0.06, SHELF.shelfDepth]} />
      <meshStandardMaterial color={SHELF_WOOD} roughness={0.7} />
    </mesh>
  );
}

export function Bookshelf3D() {
  const books = useBookshelf((s) => s.books);
  const positions = useMemo(() => {
    const m = new Map<string, number>();
    for (let s = 0; s < SHELF.shelves; s++) {
      for (let r = 0; r < SHELF.rowsPerShelf; r++) {
        for (const [id, x] of layoutX(books, s, r)) m.set(`${id}|${r}`, x);
      }
    }
    return m;
  }, [books]);

  const totalH = SHELF.shelves * SHELF.shelfHeight;
  const W = SHELF.shelfWidth + 0.4;

  return (
    <group position={[0, -totalH / 2, 0]}>
      {/* back panel */}
      <mesh position={[0, totalH / 2, -SHELF.shelfDepth / 2 - 0.05]} receiveShadow>
        <boxGeometry args={[W, totalH + 0.4, 0.06]} />
        <meshStandardMaterial color={BACK_PANEL} roughness={0.9} />
      </mesh>
      {/* sides */}
      <mesh position={[-W / 2 - 0.05, totalH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, totalH + 0.4, SHELF.shelfDepth + 0.06]} />
        <meshStandardMaterial color={SHELF_WOOD} roughness={0.75} />
      </mesh>
      <mesh position={[W / 2 + 0.05, totalH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, totalH + 0.4, SHELF.shelfDepth + 0.06]} />
        <meshStandardMaterial color={SHELF_WOOD} roughness={0.75} />
      </mesh>
      {/* boards */}
      {Array.from({ length: SHELF.shelves + 1 }).map((_, i) => (
        <ShelfBoard key={i} y={i * SHELF.shelfHeight} />
      ))}
      {/* books */}
      {books.map((b) => (
        <BookMesh key={b.id} book={b} x={positions.get(`${b.id}|${b.position.row}`) ?? 0} />
      ))}
    </group>
  );
}