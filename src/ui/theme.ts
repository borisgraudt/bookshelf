import type { CSSProperties } from 'react';

export const ACCENT = '#2f6bff';
export const ACCENT_DEEP = '#1f4ed8';
export const INK = '#0a0a0a';
export const MUTED = '#6b7280';
export const LINE = '#ececef';
export const SURFACE = 'rgba(255,255,255,0.85)';
export const BG = '#fafafa';

export const CARD: CSSProperties = {
  background: SURFACE,
  border: `1px solid ${LINE}`,
  borderRadius: 20,
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  boxShadow:
    '0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 40px rgba(10,10,10,0.06), 0 2px 6px rgba(10,10,10,0.04)',
};
