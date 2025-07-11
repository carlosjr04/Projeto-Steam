import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  classificacao: string[]
}



export default function Classificacao(jogo: Props) {
    return(
        <div className={style.classificacao}>
                    <h1>{`Classificação Indicativa: ${jogo.classificacao[0]}`}</h1>
                    <div>
                        <img src={`/${jogo.classificacao[0]}.png`} alt=""></img>
                        {jogo.classificacao.slice(1).map((classificacao)=>(
                            <span className={style["classificacao-texto"]}>{classificacao}</span>
                        ))}
                        
                    </div>
                    <span className={style["classificacao-texto"]}>Classificação etária: Coordenação de Classificação
                        Indicativa</span>
                </div>
    )
}