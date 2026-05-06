'use client';

import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { SHELF, useBookshelf } from '../model';
import type { Book } from '../types';
import { darken } from '../utils';
import { ACCENT } from '@/ui/theme';

const BOOK_DEPTH = 0.72;
const PAGE_COLOR = '#f6f3ec';
const LABEL_COLOR = '#f7f7fa';

export function BookMesh({ book, x }: { book: Book; x: number }) {
  const { selectedId, select } = useBookshelf();
  const isSelected = selectedId === book.id;
  const [hovered, setHovered] = useState(false);

  const z = book.position.row === 0 ? 0.37 : -0.37;
  const riser = book.position.row === 1 ? 0.22 : 0;
  const y = book.position.shelf * SHELF.shelfHeight + book.height / 2 + 0.08 + riser;

  const groupRef = useRef<THREE.Group>(null);
  const coverMatRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const stripeMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (!groupRef.current || !coverMatRef.current) return;

    const slide = (isSelected ? 0.18 : 0) + (hovered && !isSelected ? 0.06 : 0);
    const targetZ = z + (book.position.row === 0 ? slide : -slide);
    const k = Math.min(1, delta * 9);
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * k;

    const targetEm = isSelected ? 0.55 : hovered ? 0.18 : 0;
    coverMatRef.current.emissiveIntensity +=
      (targetEm - coverMatRef.current.emissiveIntensity) * Math.min(1, delta * 8);

    if (stripeMatRef.current) {
      const target = isSelected ? 1 : hovered ? 0.6 : 0;
      stripeMatRef.current.emissiveIntensity +=
        (target - stripeMatRef.current.emissiveIntensity) * Math.min(1, delta * 8);
    }
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    select(book.id);
  };
  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  const onOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const pageInset = 0.012;
  const pw = book.width - pageInset * 2;
  const ph = book.height - pageInset * 2;
  const pd = BOOK_DEPTH - 0.02;

  const trim = darken(book.color, 0.35);
  const stripeY = -book.height / 2 + book.height * 0.18;
  const labelW = book.width - 0.018;

  return (
    <group
      ref={groupRef}
      position={[x, y, z]}
      onClick={onClick}
      onPointerOver={onOver}
      onPointerOut={onOut}
    >
      {/* page block */}
      <mesh position={[0, 0, -0.005]}>
        <boxGeometry args={[pw, ph, pd]} />
        <meshStandardMaterial color={PAGE_COLOR} roughness={1} />
      </mesh>

      {/* cover */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[book.width, book.height, BOOK_DEPTH]} />
        <meshPhysicalMaterial
          ref={coverMatRef}
          color={book.color}
          emissive={ACCENT}
          emissiveIntensity={0}
          roughness={0.55}
          clearcoat={0.35}
          clearcoatRoughness={0.45}
          reflectivity={0.18}
        />
      </mesh>

      {/* top page edge */}
      <mesh position={[0, book.height / 2 - 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[pw, pd]} />
        <meshStandardMaterial color={PAGE_COLOR} roughness={1} />
      </mesh>
      {/* bottom page edge */}
      <mesh position={[0, -book.height / 2 + 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[pw, pd]} />
        <meshStandardMaterial color={PAGE_COLOR} roughness={1} />
      </mesh>

      {/* spine accent stripe */}
      <mesh position={[0, stripeY, BOOK_DEPTH / 2 + 0.001]}>
        <planeGeometry args={[labelW, 0.014]} />
        <meshStandardMaterial
          ref={stripeMatRef}
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* subtle top trim */}
      <mesh position={[0, book.height / 2 - 0.014, BOOK_DEPTH / 2 + 0.001]}>
        <planeGeometry args={[labelW, 0.006]} />
        <meshStandardMaterial color={trim} roughness={0.85} />
      </mesh>

      {/* title */}
      <Text
        position={[0, book.height * 0.06, BOOK_DEPTH / 2 + 0.003]}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={Math.min(book.width * 0.34, 0.046)}
        maxWidth={book.height * 0.55}
        lineHeight={1.05}
        color={LABEL_COLOR}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        overflowWrap="break-word"
        letterSpacing={-0.02}
        fontWeight={500}
        clipRect={[-(book.height * 0.55) / 2, -labelW / 2, (book.height * 0.55) / 2, labelW / 2]}
      >
        {book.title}
      </Text>
    </group>
  );
}
