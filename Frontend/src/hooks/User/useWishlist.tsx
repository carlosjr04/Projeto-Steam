import axios from "axios";
import type { Wishlist } from "../../types/Wishlist";
import { useMutation } from "@tanstack/react-query";

interface WishParams {
  Wishlist: Wishlist
  token?: string;
}

async function adicionarWishlist({ Wishlist, token }: WishParams) {
  try {
    const response = await axios.post(
      `http://localhost:8080/wishlists`,
      {
        userId: Wishlist.userId,
        gameId: Wishlist.gameId,
        listedAt: new Date().toISOString().substring(0, 10),
        priority: Wishlist.priority,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar à wishlist:", error);
    throw error; 
  }
}

export function useWishlist() {
  return useMutation({
    mutationFn: adicionarWishlist,
    onSuccess: () => {
      console.log("Adicionado à wishlist com sucesso.");
    },
    onError: (error: any) => {
      console.error("Erro no mutation:", error?.response?.data || error.message);
      alert("Ocorreu um erro ao adicionar à wishlist.");
    },
  });
}