import {  useState } from "react";
import axios from "axios";
import { ENV } from "../../env";

export function useDeleteGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteGame = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${ENV.API_URL}/games/${id}`);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar jogo");
    } finally {
      setLoading(false);
    }
  };

  return { deleteGame, loading, error };
}