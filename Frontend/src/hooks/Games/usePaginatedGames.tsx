import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ENV } from '../../env';
import type { Game } from '../../types/Game';
import type { ResultadoPaginado } from '../../types/ResultadoPaginado';


export function usePaginatedGames(pagina: number, tamanho: number, nome: string = '', slugCategory: string = '') {
  const [data, setData] = useState<ResultadoPaginado<Game> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get<ResultadoPaginado<Game>>(`${ENV.API_URL}/games/paginacao`, {
        params: { pagina, tamanho, nome, slugCategory }
      })
      .then(res => {
        setData(res.data)
      })
      .finally(() => setLoading(false));
  }, [pagina, tamanho, nome, slugCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}
