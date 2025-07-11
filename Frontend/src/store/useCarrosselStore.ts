import { create } from "zustand";

interface CarrosselState {
  paginaAtual: number;
  setpaginaAtual: (num: number) => void;

  avancar: () => void;
  voltar: () => void;
}

export const useCarrosselStore = create<CarrosselState>((set) => ({
  paginaAtual: 0,
  setpaginaAtual: (num: number) => set({ paginaAtual: num }),

  avancar: () =>
    set((state) => ({
      paginaAtual: state.paginaAtual < 4 ? state.paginaAtual + 1 : 0,
    })),

  voltar: () =>
    set((state) => ({
      paginaAtual: state.paginaAtual > 0 ? state.paginaAtual - 1 : 0,
    })),
}));
