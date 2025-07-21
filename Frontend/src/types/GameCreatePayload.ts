export type GameCreatePayload = {
  title: string;
  preco: number;
  cover: string;
  desconto: number;
  desenvolvedora: string;
  classificacao: string[];
  idiomas: number[];
  compatibilidade: string[];
  dataLancamento: string;
  categories: number[];
  about: string;
  descricao: string;
  scenes: string[];
  exemplo: string[];
  publicadora: string;
  plataforma: string;
  avaliacao: number;
  classificacaoEtaria: string;
  idiomaPrincipal: string;
  conquista: {
    imagem: string;
    descricao: string;
    escondido: boolean;
  }[];
};
