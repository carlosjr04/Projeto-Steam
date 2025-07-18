import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Language } from '../../types/Language';
import { ENV } from '../../env';


export function useLanguages(): Language[] {
  const { data } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const res = await axios.get(`${ENV.API_URL}/languages`);
      return res.data as Language[];
    },
  });
  return data ?? [];
}
