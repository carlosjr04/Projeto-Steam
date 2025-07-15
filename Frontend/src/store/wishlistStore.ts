import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistoState {
  numJogos: number;
  adicionar: () => void;
  clear: () => void;
}

export const wishlistStore = create<WishlistoState>()(
  persist(
    (set, get) => ({
      numJogos: 0,

      adicionar: () => {
        set({
          numJogos: get().numJogos + 1,
        });
      },

      clear: () => {
        set({
          numJogos: 0,
        });
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        numJogos: state.numJogos,
      }),
    }
  )
);
