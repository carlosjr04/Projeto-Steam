import { useEffect, useState } from "react";
import axios from "axios";
import { ENV } from "../../env";
import type { User } from "../../types/User";
import { useAuthStore } from "../../store/authStore";

export function useGetUserId() {
  const [user, setUsers] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = useAuthStore((state)=>state.userId)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${ENV.API_URL}/users/${id}`);
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar jogos");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  return { user, loading, error };
}