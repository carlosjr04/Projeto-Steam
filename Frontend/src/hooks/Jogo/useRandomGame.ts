import { useState, useEffect } from 'react';
import API_BASE_URL from '../../config/apiBaseUrl';
import axios from 'axios';
import type { Jogo } from '../../types/Jogo';

export function useRandomGame() {
  const [game, setGame] = useState<Jogo | null>(null);

  useEffect(() => {
    axios.get<Jogo>(`${API_BASE_URL}/games/random`)
      .then((res) => {
        setGame(res.data);
      })
      .catch(() => setGame(null));
  }, []);

  return game;
}
