import axios from "axios";
import type { Wishlist } from "../../types/Wishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENV } from "../../env";

interface WishParams {
  Wishlist: Wishlist;
  token?: string;
}

async function adicionarWishlist({ Wishlist, token }: WishParams) {
  try {
    const response = await axios.post(
      `${ENV.API_URL}/wishlists`,
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao adicionar à wishlist:", error.response?.data || error.message);
    } else {
      console.error("Erro ao adicionar à wishlist:", error);
    }
    throw error;
  }
}

export function useWishlist(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adicionarWishlist,
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
      }
    },
  });
}