'use client';

import { useEffect } from 'react';
import { useBookshelf } from '@/features/bookshelf/model';

export function Hotkeys() {
  const { selectedId, select, navigate } = useBookshelf();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>('input[data-search-input]');
        input?.focus();
        input?.select();
        return;
      }

      if (e.key === 'Escape') {
        if (isTyping) (target as HTMLInputElement).blur();
        else if (selectedId) select(null);
        return;
      }

      if (isTyping) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          navigate('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigate('right');
          break;
        case 'ArrowUp':
          e.preventDefault();
          navigate('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          navigate('down');
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, select, navigate]);

  return null;
}
