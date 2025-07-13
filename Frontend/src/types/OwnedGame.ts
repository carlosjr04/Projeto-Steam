import type { Game } from "./Game";

export interface OwnedGame{
    userId:string
    gameId: number;
    price:number
    boughtAt: string;
}