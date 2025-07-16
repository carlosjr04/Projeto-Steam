import type { Achievement } from "./Achievement";
import type { Category } from "./Category";
import type { Language } from "./Language";

export interface Game {
  id: number; 
  title: string;
  about: string;
  avaliacao: number;

  categories: string[];
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
    languages:Language[]


  plataforma: string | null;
  plataformas: string[];

  preco: number;
  publicadora: string | null;

  scenes: string[];
}

export interface GameUser {
  id: number; 
  title: string;
  about: string;
  avaliacao: number;

  categories: Category[];
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

  preco: number;
  publicadora: string | null;

  scenes: string[];
}
