export interface Language {
  id: number;
  nome: string;
  lingua?: string;
  interfaceDisponivel?: boolean;
  dublagem?: boolean;
  legenda?: boolean;
  [key: string]: string | number | boolean | undefined;
}