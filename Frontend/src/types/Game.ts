import type { Achievement } from "./Achievement";

export interface Game {
  id: string; // pode ser number no backend, mas está vindo como string aqui
  title: string;
  about: string;
  avaliacao: number;

  categorias: string[];
  classificacao: string[];
  classificacaoEtaria: string | null;

  compatibilidade: string[];
  conquista: Achievement[];

  cover: string;
  dataLancamento: string; // formato ISO: "YYYY-MM-DD"

  desconto: number;
  descricao: string | null;
  desenvolvedora: string;

  exemplo: string[];
  generos: string[];

  idiomaPrincipal: string | null;
  idiomas: string[];

  plataforma: string | null;
  plataformas: string[];

  price: number;
  publicadora: string | null;

  scenes: string[];
}
