export interface Category {
  id: number;
  nome: string;
  slug: string;
  image: string;
  title: string;
  [key: string]: string | number;
}