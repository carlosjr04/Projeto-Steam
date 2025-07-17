import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { ENV } from "../../env";

interface Usuario {
  email: string;
  password: string;
  username: string;
  age: number;
  genre: string;
  name: string;
  role:string
}

export function useCadastrarUsuario() {
  const mutation = useMutation({
    mutationFn: async (usuario: Usuario) => {
      const response = await axios.post(`${ENV.API_URL}/users/cadastro`, usuario);
      return response.data;
    },
  });

  return {
    cadastrar: mutation.mutate,
    isLoading: mutation.isPending, // ou mutation.isLoading dependendo da versão do React Query
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}
