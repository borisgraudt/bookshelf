export interface Position {
  shelf: number;
  row: number;
  index: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number;
  genre?: string;
  color: string;
  width: number;
  height: number;
  position: Position;
}

export interface ShelfConfig {
  shelves: number;
  rowsPerShelf: number;
  shelfWidth: number;
  shelfHeight: number;
  shelfDepth: number;
}
