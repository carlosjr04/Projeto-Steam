import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ENV } from '../../env';
import type { Game } from '../../types/Game';

export function useRecuperarGames() {
  const { data, isLoading, error } = useQuery<Game[], Error>({
    queryKey: ['games'],
    queryFn: async () => {
      const res = await axios.get<Game[]>(`${ENV.API_URL}/games`);
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minuto
    retry: 2,
  });

  return {
    games: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  };
}
