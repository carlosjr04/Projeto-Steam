import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiBaseUrl';
import type { Jogo } from '../../types/Jogo';
import type { ResultadoPaginado } from '../../types/ResultadoPaginado';


export function usePaginatedGames(pagina: number, tamanho: number, nome: string = '', slugCategory: string = '') {
  const [data, setData] = useState<ResultadoPaginado<Jogo> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<ResultadoPaginado<Jogo>>(`${API_BASE_URL}/games/paginacao`, {
        params: { pagina, tamanho, nome, slugCategory }
      })
      .then(res => {
        setData(res.data)
        console.log(res.data)
      })
      .finally(() => setLoading(false));
  }, [pagina, tamanho, nome, slugCategory]);

  return { data, loading };
}
