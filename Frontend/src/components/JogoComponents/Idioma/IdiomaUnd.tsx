import type { Idioma } from "../../../Utils/gameData";
import style from "./style.module.css";



export default function IdiomaUnd(idioma:Idioma) {
  return (

    <div>
        
        <div className={style["linha"]}>
          <span className={style["idiomas-textoUnd"]} style={{width: "34.5%"}}>
            {idioma.lingua}
          </span>
          <div>
            {idioma.interface?
            <img src="/positive.png"></img>:<img src="/positive_trans.png"></img>}
          </div>
          <div>
            {idioma.dublagem?
            <img src="/positive.png"></img>:<img src="/positive_trans.png"></img>}
          </div>
          <div>
            {idioma.legenda?
            <img src="/positive.png"></img>:<img src="/positive_trans.png"></img>}
          </div>
        </div>
    </div>
  );
}
