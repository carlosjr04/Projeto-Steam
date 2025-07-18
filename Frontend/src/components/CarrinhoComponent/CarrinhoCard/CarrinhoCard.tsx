import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import type { Game } from "../../../types/Game";
import { Link } from "react-router-dom";
import { useRecuperarGames } from "../../../hooks/Games/useRecuperarGames";

interface CarrinhoProps {
  id: number;
  cover: string;
  title: string;
  preco: number;
  desconto: number;
  buyed: boolean;
}

export default function CarrinhoCard(carrinho: CarrinhoProps & { index?: number }) {
  const [estado, setEstado] = useState<"Para minha conta" | "Para presente">(
    "Para minha conta"
  );
  const jogos = useCarrinhoStore((state) => state.jogos);
  const removerJogo = useCarrinhoStore((state) => state.remover);
  const adicionarJogo = useCarrinhoStore((state) => state.adicionar);
  const { games } = useRecuperarGames()

  useEffect(() => {
    // Descobre todos os índices desse jogo
    const indicesMesmoJogo = jogos
      .map((jogo, idx) => ({ id: Number(jogo.id), idx, title: jogo.title }))
      .filter(j => j.id === Number(carrinho.id));
    // Descobre o índice deste card
    const minhaPosicao = typeof carrinho.index === 'number' ? carrinho.index : jogos.findIndex((j) => Number(j.id) === Number(carrinho.id) && j.title === carrinho.title);

    if (indicesMesmoJogo.length > 1 && minhaPosicao !== indicesMesmoJogo[0].idx || carrinho.buyed) {
      setEstado("Para presente");
    } else {
      setEstado("Para minha conta");
    }
  }, [jogos, carrinho.id, carrinho.title, carrinho.index, carrinho.buyed]);

  function calcularPrecoComDesconto(preco: number, desconto: number): string {
    if (preco == 0) {
      return "Gratuito";
    }
    const valorComDesconto = preco - (preco * desconto) / 100;

    return `R$${valorComDesconto.toFixed(2)}`;
  }

  

  function pegarJogoId(id: number): Game | undefined {
    const jogoEncontrado = games.find((jogo) => jogo.id == id);
    return jogoEncontrado;
  }

  return (
    <div className={style.container}>
      <Link to={`/Jogo/${carrinho.id}`}><img src={carrinho.cover} className={style.cover} /></Link>
      
      <div className={style.detalhe}>
        <div className={style.esquerda}>
          <div className={style.titulo}>
            <Link to={`/Jogo/${carrinho.id}`}>{carrinho.title}</Link>
            <img src="/window_carrinho.png" alt="" />
          </div>
          {(() => {
            const indicesMesmoJogo = jogos
              .map((jogo, idx) => ({ id: Number(jogo.id), idx, title: jogo.title }))
              .filter(j => j.id === Number(carrinho.id));
            const minhaPosicao = typeof carrinho.index === 'number' ? carrinho.index : jogos.findIndex((j) => Number(j.id) === Number(carrinho.id) && j.title === carrinho.title);
            if (indicesMesmoJogo.length > 1 && minhaPosicao !== indicesMesmoJogo[0].idx || carrinho.buyed) {
              // Repetido: só mostra 'Para presente' sem dropdown
              return (
                <div className={style.dropDown}>
                  <a className={style.dropDownLink}>{estado}</a>
                </div>
              );
            } else {
              // Primeiro: mostra dropdown
              return (
                <div className={`dropdown ${style.dropDown}`}>
                  <a
                    className={`dropdown-toggle ${style.dropDownLink}`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {estado}
                  </a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                    width="24"
                    height="24"
                    role="presentation"
                  >
                    <polygon
                      fill="#189cff"
                      points="50 59.49 13.21 22.89 4.74 31.39 50 76.41 95.26 31.39 86.79 22.89 50 59.49"
                    />
                  </svg>{" "}
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setEstado("Para minha conta")}
                      >
                        Para minha conta
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => setEstado("Para presente")}
                      >
                        Para presente
                      </a>
                    </li>
                  </ul>
                </div>
              );
            }
          })()}
        </div>
        <div className={style.direita}>
          <div className={style.preco}>
            {carrinho.desconto > 0 ? (
              <div className={style.desconto}>
                <p>{`${carrinho.desconto}%`}</p>
              </div>
            ) : null}

            <div>
              {carrinho.desconto > 0 ? (
                <p className={style.precoDesconto}>{`R$${carrinho.preco.toFixed(
                  2
                )}`}</p>
              ) : null}
              <h1>
                {calcularPrecoComDesconto(carrinho.preco, carrinho.desconto)}
              </h1>
            </div>
          </div>
          <div className={style.botoes}>
            <button
              className={style.botao}
              onClick={() => {
                const jogo = pegarJogoId(carrinho.id);
                console.log(jogo)
                if (jogo) {
                  adicionarJogo(jogo);
                }
              }}
            >
              adicionar
            </button>
            <p className={style.botao}> | </p>
            <button
              className={style.botao}
              onClick={() => {
                if (pegarJogoId(carrinho.id)) {
                  removerJogo(carrinho.id.toString());
                }
              }}
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
