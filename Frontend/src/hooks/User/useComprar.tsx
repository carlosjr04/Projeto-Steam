import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { OwnedGame } from "../../types/OwnedGame";

interface ComprarParams {
  OwnedGame: OwnedGame
  token: string;
}

async function comprarJogo({ OwnedGame, token }: ComprarParams) {
  return axios.patch(
    `http://localhost:8080/users/addGame`,
    {
      userId: OwnedGame.userId,
      gameId: OwnedGame.gameId,
      boughtAt: new Date().toISOString().substring(0, 10), 
      price: OwnedGame.price,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function useComprar() {
  return useMutation({
    mutationFn: comprarJogo,
  });
}