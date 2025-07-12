export interface ResultadoPaginado<T> {
  totalItens: number;
  totalPaginas: number;
  paginaCorrente: number;
  itens: T[];
}
