import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { ENV } from "../../env"

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
  type: string;
  userId: number;
  cargo: 'ADMIN' | 'CLIENTE';
}

export function useLogin() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  return useMutation<TokenResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const response = await axios.post<TokenResponse>(`${ENV.API_URL}/users/login`, data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuthenticated({
        token: data.token,
        userId: data.userId,
        cargo: data.cargo,
      });
    },
  });
}