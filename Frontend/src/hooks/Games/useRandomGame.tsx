import { useState, useEffect } from 'react';
import { ENV } from '../../env';
import axios from 'axios';
import type { Game } from '../../types/Game';

export function useRandomGame() {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    axios.get<Game>(`${ENV.API_URL}/games/random`)
      .then((res) => {
        setGame(res.data);
      })
      .catch(() => setGame(null));
  }, []);

  return game;
}
