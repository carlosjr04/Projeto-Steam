import type { Game, GameUser } from "./Game";

export interface Wishlist {
  userId:string
    gameId: number;
    priority:number
    listedAt: string;
}

export interface WishlistGame {
    game: GameUser;
    priority:number
    listedAt: string;
}