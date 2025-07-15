import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import { useAuthStore } from "../../../store/authStore";
import { useComprar } from "../../../hooks/User/useComprar";
import type { OwnedGame } from "../../../types/OwnedGame";
import axios from "axios";

interface ComprarParams {
  OwnedGame: OwnedGame;
  token: string;
}

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

  if (!jogos || jogos.length === 0) {
    alert("Nenhum jogo selecionado para compra.");
    return;
  }

  try {
    const promises = jogos
      .filter(jogo => jogo) 
      .map(jogo => {
        const ownedGame: OwnedGame = {
          boughtAt: new Date().toISOString().substring(0, 10),
          gameId: Number(jogo.id),
          price: jogo.price,
          userId: userId,
        };
        console.log(ownedGame)
        return axios.post(
          `http://localhost:8080/owned-games`,
          ownedGame, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

    // Aguarda todas as requisições finalizarem
    await Promise.all(promises);

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
