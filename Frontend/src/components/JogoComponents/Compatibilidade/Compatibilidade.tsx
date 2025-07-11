import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import CompatibilidadeUnd from "./CompatibilidadeUnd";

interface Props {
  compatibilidades: string[];
  
}

export default function Compatibilidade(jogo: Props) {
    return(
        <div className={style.Compatibilidade}>
            {jogo.compatibilidades.map((comp)=>(
                <CompatibilidadeUnd
                name={comp}/>
            ))}
        </div>
    )
}