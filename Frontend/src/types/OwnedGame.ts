import type { Game } from "./Game";

export interface OwnedGame{
    game: Game;
    price:number
    boughtAt:Date
}