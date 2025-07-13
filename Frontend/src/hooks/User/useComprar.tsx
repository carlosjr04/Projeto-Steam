import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ComprarParams = {
  userId: string;
  jogo: { id: number; price: number };
  token: string;
};

async function comprarJogo({ userId, jogo, token }: ComprarParams) {
  return axios.patch(
    `http://localhost:8080/users/${userId}/add-game`,
    {
      game: { id: jogo.id },
      boughtAt: new Date().toISOString().substring(0, 10),
      price: jogo.price,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function useComprar() {
  return useMutation({
    mutationFn: comprarJogo,
  });
}