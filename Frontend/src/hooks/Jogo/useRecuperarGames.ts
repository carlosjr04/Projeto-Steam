import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiBaseUrl';
import type { Jogo } from '../../types/Jogo';

export function useRecuperarGames() {
  const [games, setGames] = useState<Jogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Jogo[]>(`${API_BASE_URL}/games`)
      .then(res => setGames(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { games, loading, error };
}
