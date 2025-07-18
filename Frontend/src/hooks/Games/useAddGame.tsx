

import { useMutation } from '@tanstack/react-query';
import { ENV } from '../../env';
import type { GameCreatePayload } from '../../types/GameCreatePayload';
import axios from 'axios';

interface UseAddGameResult {
  addGame: (jogo: GameCreatePayload) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
  error: string | null;
}


export function useAddGame(): UseAddGameResult {
  const mutation = useMutation<{ success: boolean; message: string }, Error, GameCreatePayload>({
    mutationFn: async (jogo: GameCreatePayload) => {
      await axios.post(`${ENV.API_URL}/games`, jogo);
      return { success: true, message: 'Jogo adicionado com sucesso!' };
    }
  });

  const addGame = async (jogo: GameCreatePayload) => {
    try {
      return await mutation.mutateAsync(jogo);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      return { success: false, message: errorMsg };
    }
  };

  return {
    addGame,
    isLoading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
  };
}

