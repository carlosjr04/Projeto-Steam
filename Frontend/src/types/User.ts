import type { Game } from "./Game";
import type { Wishlist } from "./Wishlist";

export interface User {
  id: number;
  userId: string;

  email: string;
  name: string;
  username: string;
  password: string;

  age: number;
  genre: string;
  role: string;

  createdAt: string; 
  updatedAt: string;

  ownedGames?: Game[];
  wishlist?: Wishlist[];
}