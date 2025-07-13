import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Game } from "../types/Game";

interface CarrinhoState {
  numJogos: number;
  valorTotal: number;
  jogos: Game[];
  adicionar: (jogo: Game | undefined) => void;
  remover: (id: string) => void;
  clear: () => void;
}

export const useCarrinhoStore = create<CarrinhoState>()(
  persist(
    (set, get) => ({
      jogos: [],
      numJogos: 0,
      valorTotal: 0,

      adicionar: (jogo) => {
        if (!jogo) return;

        const jogos = [...get().jogos, jogo];
        set({
          jogos,
          numJogos: jogos.length,
          valorTotal: get().valorTotal + jogo.price,
        });
      },

      remover: (id) => {
        const index = get().jogos.findIndex((j) => j.id.toString() === id);
        if (index === -1) return;

        const jogosAtualizados = [...get().jogos];
        const jogoRemovido = jogosAtualizados.splice(index, 1)[0];

        set({
          jogos: jogosAtualizados,
          numJogos: jogosAtualizados.length,
          valorTotal: get().valorTotal - jogoRemovido.price,
        });
      },
      clear: ()=>{
        set({
          jogos: [],
          numJogos: 0,
          valorTotal: 0,
        });
      }
    }),
    {
      name: 'carrinho-storage', 
      partialize: (state) => ({
        jogos: state.jogos,
        numJogos: state.numJogos,
        valorTotal: state.valorTotal,
      }),
    }
  )
);
