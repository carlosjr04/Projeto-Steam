import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  classificacao: string[]
}



export default function Classificacao(jogo: Props) {
    const classificacaoSafe = Array.isArray(jogo.classificacao) ? jogo.classificacao : [];
    if (!classificacaoSafe.length) return null;
    return(
        <div className={style.classificacao}>
            <h1>{`Classificação Indicativa: ${classificacaoSafe[0]}`}</h1>
            <div>
                <img src={`/${classificacaoSafe[0]}.png`} alt=""></img>
                {classificacaoSafe.slice(1).map((classificacao, idx) => (
                    <span key={`classificacao-${classificacao}-${idx}`} className={style["classificacao-texto"]}>{classificacao}</span>
                ))}
            </div>
            <span className={style["classificacao-texto"]}>Classificação etária: Coordenação de Classificação
                Indicativa</span>
        </div>
    )
}