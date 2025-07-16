import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import { useGetGameId } from "../../../hooks/Games/useGetGameId";

interface Props {
  id: number;
 
}

export default function CompraJogo(jogo: Props) {
  const jogos = useCarrinhoStore((state) => state.jogos);
  const adicionarJogo = useCarrinhoStore((state) => state.adicionar);
  const {game} = useGetGameId(jogo.id)

  function pegarJogoId(id: number): boolean {
    const jogoEncontrado = jogos.find((jogo) => jogo.id == Number(id));
    return jogoEncontrado ? false : true;
  }

  
  return (
    <div className={style["div-compra"]}>
      <h1>Comprar {game?.title}</h1>
      <div className={style["carrinho"]}>
        <p>{game && game?.preco>0 ?`R$${game?.preco}`:"Gratuito"}</p>
        <button
          type="button"
          onClick={() => {
            if (pegarJogoId(jogo.id)) {
              adicionarJogo(game);
            }
          }}
          className={style["botao-compra"]}
        >
          + Carrinho
        </button>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <img
                src="/assets/logo_steam_footer.png"
                className="rounded me-2"
                alt="Steam logo"
              />
              <strong className="me-auto toast-texto2">Steam</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body toast-texto1">
              Loja indisponível no momento. 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
