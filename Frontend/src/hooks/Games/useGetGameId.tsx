import { useEffect, useState } from "react";
import type { Game } from "../../types/Game";
import axios from "axios";
import { ENV } from "../../env";

export function useGetGameId(id: number) {
  const [game, setGames] = useState<Game | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await axios.get(`${ENV.API_URL}/games/${id}`);
        setGames(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Erro ao buscar jogos");
      } finally {
        setLoading(false);
      }
    };
    getGame();
  }, [id]);

  return { game, loading, error };
}