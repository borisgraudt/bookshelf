import type { Position } from '../valueObjects/Position';

export interface Book {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly year?: number;
  readonly genre?: string;
  readonly color: string;
  readonly width: number;
  readonly height: number;
  readonly position: Position;
}
