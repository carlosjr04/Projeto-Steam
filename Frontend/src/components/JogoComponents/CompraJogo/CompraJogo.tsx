import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import { games, type Jogo } from "../../../Utils/gameData";

interface Props {
  id: string;
  title: string;
  price: number;
}

export default function CompraJogo(jogo: Props) {
  const jogos = useCarrinhoStore((state) => state.jogos);
  const adicionarJogo = useCarrinhoStore((state) => state.adicionar);

  function pegarJogoId(id: string): Jogo | undefined {
    const jogoEncontrado = games.find((jogo) => jogo.id == id);
    const jogoDuplicado = jogos.find((jogo) => jogo.id === jogoEncontrado?.id);
    return jogoDuplicado ? undefined : jogoEncontrado;
  }

  
  return (
    <div className={style["div-compra"]}>
      <h1>Comprar {jogo.title}</h1>
      <div className={style["carrinho"]}>
        <p>{jogo.price>0?`R$${jogo.price}`:"Gratuito"}</p>
        <button
          type="button"
          onClick={() => {
            if (pegarJogoId(jogo.id)) {
              adicionarJogo(pegarJogoId(jogo.id));
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
              Loja indisponível no momento. :(
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
