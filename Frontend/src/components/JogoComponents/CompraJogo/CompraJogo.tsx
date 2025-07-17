
import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import { useGetGameId } from "../../../hooks/Games/useGetGameId";
import SteamModal from "../../GlobalComponents/SteamModal/SteamModal";
import { useState } from "react";
import { useComprar } from '../../../hooks/User/useComprar';
import { useAuthStore } from '../../../store/authStore';

interface Props {
  id: number;
}


export default function CompraJogo(jogo: Props) {
  const jogos = useCarrinhoStore((state) => state.jogos);
  const adicionarJogo = useCarrinhoStore((state) => state.adicionar);
  const { game } = useGetGameId(jogo.id);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("Sucesso!");
  const comprarMutation = useComprar();
  const userId = useAuthStore((state) => state.userId);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);

  function pegarJogoId(id: number): boolean {
    const jogoEncontrado = jogos.find((jogo) => jogo.id == Number(id));
    return jogoEncontrado ? false : true;
  }

  async function handleAddToCart() {
    if (!game) return;
    if (game.preco > 0) {
      if (pegarJogoId(jogo.id)) {
        adicionarJogo(game);
        setModalTitle("Sucesso!");
        setModalMsg("Jogo adicionado ao carrinho!");
        setShowModal(true);
      }
    } else {
      // Gratuito: adiciona direto à biblioteca
      if (!userId || !token) {
        setModalTitle("Erro");
        setModalMsg("Usuário não autenticado.");
        setShowModal(true);
        return;
      }
      setLoading(true);
      try {
        await comprarMutation.mutateAsync({
          OwnedGame: {
            boughtAt: new Date().toISOString().substring(0, 10),
            gameId: Number(game.id),
            price: 0,
            userId: userId,
          },
          token,
        });
        setModalTitle("Sucesso!");
        setModalMsg("Jogo adicionado à sua biblioteca!");
        setShowModal(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error?.response?.status === 409) {
          setModalTitle("Informação");
          setModalMsg("Este jogo já está na sua biblioteca.");
        } else {
          setModalTitle("Erro");
          setModalMsg("Ocorreu um erro ao adicionar o jogo à biblioteca.");
          console.error(error);
        }
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className={style["div-compra"]}>
      <h1>Comprar {game?.title}</h1>
      <div className={style["carrinho"]}>
        <p>{game && game?.preco > 0 ? `R$${game?.preco.toFixed(2)}` : "Gratuito"}</p>
        <button
          type="button"
          onClick={handleAddToCart}
          className={style["botao-compra"]}
          disabled={loading}
          style={{minWidth: '60px'}}
        >
          {game && game.preco > 0 ? '+ Carrinho' : 'Jogar'}
        </button>

        <SteamModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalTitle}
          message={modalMsg ?? ""}
        />

        {/* Toast de loja indisponível mantido para referência futura */}
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
