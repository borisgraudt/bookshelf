'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Bookshelf3D } from './three/Bookshelf3D';
import { HighlightBeam } from './three/HighlightBeam';
import { Hotkeys } from '@/ui/Hotkeys';
import { InfoPanel } from '@/ui/InfoPanel';
import { SearchPanel } from '@/ui/SearchPanel';
import { Toolbar } from '@/ui/Toolbar';

export function Scene() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background:
          'radial-gradient(120% 80% at 50% 25%, #ffffff 0%, #f4f5f8 55%, #e9eaee 100%)',
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.6, 11], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#f6f7fa']} />
        <fog attach="fog" args={['#f6f7fa', 16, 32]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[5, 9, 6]}
          intensity={1.05}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-6, 5, 4]} intensity={0.35} />
        <Bookshelf3D />
        <HighlightBeam />
        <ContactShadows
          position={[0, -2.45, 0]}
          opacity={0.35}
          scale={16}
          blur={2.6}
          far={4}
          resolution={1024}
          color="#0a0a0a"
        />
        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={6}
          maxDistance={22}
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 1.9}
          target={[0, 1.2, 0]}
        />
      </Canvas>
      <Toolbar />
      <InfoPanel />
      <SearchPanel />
      <Hotkeys />
    </div>
  );
}

