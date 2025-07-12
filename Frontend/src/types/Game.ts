import type { Language } from "./Language";
import type { Achievement } from "./Achievement";
import type { Platform } from "./Platform";
import type { Category } from "./Category";
import type { Genre } from "./Genre";

export interface Game {
  id: number;
  image: string;
  titulo: string;
  desenvolvedora: string;
  publicadora: string;
  plataforma: string;
  dataLancamento: string; // formato ISO, ex: "2025-07-12"
  preco: number;
  avaliacao: number;
  descricao: string;
  multiplayer: boolean;
  classificacaoEtaria: string;
  idioma: string;

  // Relacionamentos
  categories: Category[];
  genres: Genre[];
  platforms: Platform[];
  languages: Language[];


  // Campos adicionais para frontend
  desconto: number;
  scenes: string[];
  exemplo: string[];
  compatibilidade: string[];

  about: string;
  title: string;
  cover: string;
  classificacao: string[];

  // Campo gerado no getter manual
  conquista: Achievement[];
}
