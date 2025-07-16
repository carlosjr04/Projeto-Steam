import type { GameUser } from "./Game";

export interface OwnedGame{
    userId:string
    gameId: number;
    price:number
    boughtAt: string;
}

export interface OwnedGameRequest{
    game:GameUser
    price:number
    boughtAt:Date
}