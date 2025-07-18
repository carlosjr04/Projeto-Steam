import { useEffect } from "react";
import style from "./style.module.css";
import { useGetGameId } from "../../hooks/Games/useGetGameId";
import type { Category } from "../../types/Category";
import { useCarrinhoStore } from "../../store/useCarrinhoStore";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  cover: string;
  name: string;
  preco: number;
  desconto: number;
  dataLancamento: string;
  boughtAt: Date;
  categories: Category[];
}

export default function BibliotecaGame(wishlist: Props) {
  const { game } = useGetGameId(wishlist.id);
  const adicionarJogo = useCarrinhoStore((state) => state.adicionar);
  useEffect(()=>(
  console.log(game)

  ),[game])

  function calcularPrecoComDesconto(preco: number, desconto: number): string {
    if (preco == 0) {
      return "Gratuito";
    }
    const valorComDesconto = preco - (preco * desconto) / 100;

    return `R$${valorComDesconto.toFixed(2)}`;
  }

  return (
    <div className={style.container}>
      <div className={style.cover}>
        <img src={wishlist.cover} alt="" />
      </div>
      <div className={style.infos}>
        <h1 className={style.name}>{wishlist.name}</h1>
        <div className={style.dados}>
          <div className={style.DadosEsquerda}>
            <p className={style.dataLancamento}>
              Análises em geral:{" "}
              <span style={{ color: "#66c0f4" }}>Muito positivas</span>
            </p>
            <p className={style.dataLancamento}>
              DATA DE LANÇAMENTO: {wishlist.dataLancamento}
            </p>
          </div>
          <div className={style.DadosDireita}>
            <div className={style.preco}>
              
              <button
                className={style.carrinho}
              >
                DOWNLOAD
              </button>
            </div>
          </div>
        </div>
        <img className={style.plataforma} src="/window_carrinho.png" alt="" />
        <div className={style.categorias}>
          {wishlist.categories.map((categoria) => (
            <Link to={`/category/${categoria.slug || categoria.nome.toLowerCase().replace(/ /g, '-')}`} className={style["botao-genero"]}>{categoria.nome}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
