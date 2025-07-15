import type { Game } from "./Game";

export interface Wishlist {
  userId:string
    gameId: number;
    priority:number
    listedAt: string;
}

export interface WishlistGame {
    game: Game;
    priority:number
    listedAt: string;
}