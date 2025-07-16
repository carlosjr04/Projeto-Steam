import { useAuthStore } from "../../store/authStore";
import { ENV } from "../../env";
import type { User } from "../../types/User";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetUserId() {
  const id = useAuthStore((state) => state.userId);

  const fetchUser = async () => {
    const response = await axios.get(`${ENV.API_URL}/users/${id}`);
    return response.data as User;
  };

  const {
    data: user,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: fetchUser,
    enabled: !!id,
  });

  return { user, loading, error, refetch };
}