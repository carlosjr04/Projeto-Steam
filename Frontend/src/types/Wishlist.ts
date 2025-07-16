import type { GameUser } from "./Game";

export interface Wishlist {
  userId:string
    gameId: number;
    priority:number
    listedAt: string;
}

export interface WishlistGame {
    id?: number
    game: GameUser;
    priority:number
    listedAt: string;
}