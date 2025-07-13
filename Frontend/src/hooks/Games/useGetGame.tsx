import { useEffect, useState } from "react";
import type { Game } from "../../types/Game";
import axios from "axios";
import { ENV } from "../../env";

export function useGetGame() {
  const [games, setGames] = useState<Game[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get(`${ENV.API_URL}/games`);
        setGames(response.data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar jogos");
      } finally {
        setLoading(false);
      }
    };
    getGames();
  }, []);

  return { games, loading, error };
}