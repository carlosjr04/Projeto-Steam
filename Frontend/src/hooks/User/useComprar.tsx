import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import type { OwnedGame } from "../../types/OwnedGame";
import { ENV } from "../../env";

interface ComprarParams {
  OwnedGame: OwnedGame
  token: string;
}

async function comprarJogo({ OwnedGame, token }: ComprarParams) {
  return axios.post(
    `${ENV.API_URL}/owned-games`,
    {
      userId: OwnedGame.userId,
      gameId: OwnedGame.gameId,
      boughtAt: OwnedGame.boughtAt,
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