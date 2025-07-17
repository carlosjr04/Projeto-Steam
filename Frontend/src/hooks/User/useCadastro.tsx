import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: async (usuario: Usuario) => {
      const response = await axios.post(`${ENV.API_URL}/users/cadastro`, usuario);
      setLoading(false);
      return response.data;
    },
  });

  return {
    cadastrar: mutation.mutate,
    isLoading: loading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}
