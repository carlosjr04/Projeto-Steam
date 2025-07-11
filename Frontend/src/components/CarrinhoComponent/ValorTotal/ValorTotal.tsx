import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";

export default function ValorTotal(){
    const valorTotal = useCarrinhoStore((state) => state.valorTotal);
    const clear = useCarrinhoStore((state) => state.clear);
    function comprar(){
        const confirmar = confirm("Deseja realizar a compra?")
        if (confirmar) clear();
    }
    return(
        <div className={style.container}>
            <div>
                <p className={style.valor}>Total estimado</p>
                <p className={style.preco}>{`R$ ${valorTotal}`}</p>
            </div>
            <p className={style.texto}>O imposto sobre vendas será calculado durante a finalização do pedido quando aplicável</p>
            <button className={style.botao} onClick={comprar}>Continuar para a compra</button>
        </div>
    )
}