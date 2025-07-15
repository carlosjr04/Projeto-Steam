import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import CarrinhoCard from "../../components/CarrinhoComponent/CarrinhoCard/CarrinhoCard";
import ValorTotal from "../../components/CarrinhoComponent/ValorTotal/ValorTotal";
import { useCarrinhoStore } from "../../store/useCarrinhoStore";

export default function Carrinho() {
 
  const jogos = useCarrinhoStore((state) => state.jogos);
  return (
    <div>
      
      <div className={style.background}></div>
      <div className={style.container}>
        
        <div className={style.jogos}>
          <h1 className={style.titulo}>Carrinho de compra</h1>
          {jogos.map((jogo) => (
            <CarrinhoCard
            id={jogo.id}
              cover={jogo.cover}
              desconto={jogo.desconto}
              preco={jogo.price}
              title={jogo.title}
            />
          ))}
        </div>
        <ValorTotal/>
      </div>
    </div>
  );
}
