import { useEffect } from "react";
import { useGetGameId } from "../../../hooks/Games/useGetGameId";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import style from "./style.module.css";

interface Props {
  id: number;
  cover: string;
  name: string;
  preco: number;
  desconto: number;
  dataLancamento: string;
  listedAt: string;
  categorias: string[];
}

export default function WishlistCard(wishlist: Props) {
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
              {wishlist.desconto > 0 ? (
                <div className={style.preco}>
                  <div className={style.descontoVerde}>
                    -{wishlist.desconto}%
                  </div>

                  <div className={style.descontoPrecos}>
                    <p className={style.precoDesconto}>
                      {`R$${wishlist.preco.toFixed(2)}`}
                    </p>
                    <h1 className={style.precoValor}>
                      {calcularPrecoComDesconto(
                        wishlist.preco,
                        wishlist.desconto
                      )}
                    </h1>
                  </div>
                </div>
              ) : (
                <h1 className={style.precoValor}>
                  {calcularPrecoComDesconto(wishlist.preco, wishlist.desconto)}
                </h1>
              )}
              <button
                className={style.carrinho}
                onClick={() => {
                  const confirmar = confirm("Deseja realizar a compra?");
                  if (!confirmar) return;
                  adicionarJogo(game);
                }}
              >
                + Carrinho
              </button>
            </div>
          </div>
        </div>
        <img className={style.plataforma} src="/window_carrinho.png" alt="" />
        <div className={style.categorias}>
          {wishlist.categorias.map((categoria) => (
            <button className={style["botao-genero"]}>{categoria}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
