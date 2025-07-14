import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

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
      console.log(usuario)
      const response = await axios.post("http://localhost:8080/users", usuario);
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
