import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENV } from '../../env';
import type { Game } from '../../types/Game';

export function useRecuperarGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Game[]>(`${ENV.API_URL}/games`)
      .then(res => setGames(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { games, loading, error };
}
