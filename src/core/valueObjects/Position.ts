export interface Position {
  readonly shelf: number;
  readonly row: number;
  readonly index: number;
}

export function positionKey(p: Position): string {
  return `${p.shelf}:${p.row}:${p.index}`;
}

export function samePosition(a: Position, b: Position): boolean {
  return a.shelf === b.shelf && a.row === b.row && a.index === b.index;
}
