import type { Game } from "./Game";

export interface Wishlist {
  id: string;
  game: Game[];
  listedAt: string; // formato ISO: "2025-07-12"
  priority: number;
}