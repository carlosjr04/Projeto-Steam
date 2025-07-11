import type { ReactNode } from "react";
import type { Idioma } from "./Idioma";
import type { Conquista } from "./Conquiesta";

export interface Jogo {
  id: string;
  title: string;
  price: number;
  cover: string;
  desconto:number
  DataLancamento: Date;
  compatibilidade: string[];
  idiomas: Idioma[];
  scenes: string[];
  about: string;
  desenvolvedora: string;
  classificacao:string[];
  categorias: string[];
  descricao: ReactNode;
  exemplo: string[];
  conquista:Conquista[];
}