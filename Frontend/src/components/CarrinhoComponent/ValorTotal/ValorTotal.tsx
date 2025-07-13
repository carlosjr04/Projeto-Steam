import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import { useAuthStore } from "../../../store/authStore";
import { useComprar } from "../../../hooks/User/useComprar";

export default function ValorTotal() {
  const valorTotal = useCarrinhoStore((state) => state.valorTotal);
  const jogos = useCarrinhoStore((state) => state.jogos);
  const userId = useAuthStore((state) => state.userId);
  const token = useAuthStore((state) => state.token);
  const clear = useCarrinhoStore((state) => state.clear);
  const comprarMutation = useComprar();

  async function comprar() {
    const confirmar = confirm("Deseja realizar a compra?");
    if (!confirmar) return;

    if (!userId || !token) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      await Promise.all(
        jogos.map((jogo) => {
          if (!jogo) return;
          return comprarMutation.mutateAsync({
            userId,
            jogo: { ...jogo, id: Number(jogo.id) },
            token,
          });
        })
      );

      alert("Compra realizada com sucesso!");
      clear();
    } catch (error) {
      console.error("Erro ao realizar a compra:", error);
      alert("Ocorreu um erro ao comprar os jogos.");
    }
  }

  return (
    <div className={style.container}>
      <div>
        <p className={style.valor}>Total estimado</p>
        <p className={style.preco}>{`R$ ${valorTotal}`}</p>
      </div>
      <p className={style.texto}>
        O imposto sobre vendas será calculado durante a finalização do pedido
        quando aplicável
      </p>
      <button className={style.botao} onClick={comprar}>
        Continuar para a compra
      </button>
    </div>
  );
}
