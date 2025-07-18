import axios from "axios";
import { useState } from "react";
import { ENV } from "../../env";
import type { GameUser } from "../../types/Game";

export function useEditGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editGame = async (id: number, updatedGame: Partial<GameUser>) => {
    setLoading(true);
    setError(null);
    try {
      // Remove campos vazios ou undefined para otimizar a requisição PATCH
      const cleanedGame = Object.fromEntries(
        Object.entries(updatedGame).filter(([_, value]) => {
          if (value === null || value === undefined) return false;
          if (typeof value === 'string' && value.trim() === '') return false;
          if (Array.isArray(value) && value.length === 0) return false;
          return true;
        })
      );
      
      console.log('Dados limpos enviados:', cleanedGame);
      const response = await axios.patch(`${ENV.API_URL}/games/${id}`, cleanedGame);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Erro ao editar jogo";
      setError(errorMessage);
      console.error('Erro ao editar jogo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editGame, loading, error };
}