import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import { useAuthStore } from "../../../store/authStore";
import { useComprar } from "../../../hooks/User/useComprar";
import SteamConfirmModal from '../../GlobalComponents/SteamConfirmModal/SteamConfirmModal';
import { useGetUserId } from "../../../hooks/User/useGetUser";
import type { Game } from "../../../types/Game";

interface ValorTotalProps {
  onOpenCompra: () => void;
  onSetMsg: (msg: string | null) => void;
  setLoading: (b: boolean) => void;
  loading: boolean;
  modalCompra: boolean;
  setModalCompra: (b: boolean) => void;
}

export default function ValorTotal({ onOpenCompra, onSetMsg, setLoading, loading, modalCompra, setModalCompra }: ValorTotalProps) {
  const valorTotal = useCarrinhoStore((state) => state.valorTotal);
  const jogos = useCarrinhoStore((state) => state.jogos);
  const userId = useAuthStore((state) => state.userId);
  const token = useAuthStore((state) => state.token);
  const clear = useCarrinhoStore((state) => state.clear);
  const { user } = useGetUserId()
  const comprarMutation = useComprar();

  async function comprar() {
    if (!userId || !token) {
      onSetMsg("Usuário não autenticado.");
      return;
    }
    if (!jogos || jogos.length === 0) {
      onSetMsg("Nenhum jogo selecionado para compra.");
      return;
    }
    setLoading(true);
    try {
      // Remove jogos repetidos pelo id
      const jogosUnicos = jogos.filter((jogo, idx, arr) =>
        jogo && arr.findIndex(j => j && j.id === jogo.id) === idx
      );
      const promises = jogosUnicos
        .filter((jogo: Game) => {
          if (!jogo) return false;
          // Exclude games the user already owns
          if (user?.ownedGames && Array.isArray(user.ownedGames)) {
            return !user.ownedGames.some((owned) => owned?.game?.id == jogo.id);
          }
          return true;
        })
        .map((jogo: Game) => {
          return comprarMutation.mutateAsync({
            OwnedGame: {
              boughtAt: new Date().toISOString().substring(0, 10),
              gameId: Number(jogo.id),
              price: jogo.preco,
              userId: userId,
            },
            token,
          });
        });
      console.log(promises)
      await Promise.all(promises);
      onSetMsg("Compra realizada com sucesso!");
      clear();
    } catch (error) {
      onSetMsg("Ocorreu um erro ao comprar os jogos.");
      console.error("Erro ao realizar a compra:", error);
    } finally {
      setLoading(false);
      setModalCompra(false);
    }
  }

  return (
    <div className={style.container}>
      <div>
        <p className={style.valor}>Total estimado</p>
        <p className={style.preco}>{`R$ ${(typeof valorTotal === 'number' && !isNaN(valorTotal) ? valorTotal : 0).toFixed(2)}`}</p>
      </div>
      <p className={style.texto}>
        O imposto sobre vendas será calculado durante a finalização do pedido
        quando aplicável
      </p>
      <button className={style.botao} onClick={onOpenCompra}>
        Continuar para a compra
      </button>
      <SteamConfirmModal
        isOpen={modalCompra}
        title="Confirmar compra"
        message="Deseja realizar a compra?"
        confirmText="Comprar"
        cancelText="Cancelar"
        loading={loading}
        onConfirm={comprar}
        onCancel={() => setModalCompra(false)}
      />
    </div>
  );
}
