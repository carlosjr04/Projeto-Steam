import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Idioma } from "../../../Utils/gameData";
import IdiomaUnd from "./IdiomaUnd";
import { useState } from "react";

interface Props {
  idiomas: Idioma[];
}

export default function Idioma(idiomas: Props) {
  const [verMais, setVerMais] = useState<boolean>(false);

  return (
    <div className={style.idiomas}>
      <span className={style["idiomas-texto"]}>Idiomas</span>
      <div>
        <div className={style.colunas}>
          <span className={style["idiomas-texto"]}>Interface</span>
          <span className={style["idiomas-texto"]}>Dublagem</span>
          <span className={style["idiomas-texto"]}>Legendas</span>
        </div>
        {idiomas.idiomas.slice(0, 5).map((idioma) => (
          <div>
            
            <IdiomaUnd
              lingua={idioma.lingua}
              interface={idioma.interface}
              dublagem={idioma.dublagem}
              legenda={idioma.legenda}
            />
          </div>
        ))}

        {!verMais ? (
          <button
            onClick={() => setVerMais(!verMais)}
            className={`${style.mais_idiomas} btn btn-primary mt-2`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#idiomasCollapse"
            aria-expanded={verMais}
            aria-controls="idiomasCollapse"
          >
            {`Ver todos os ${idiomas.idiomas.length - 5} idiomas disponíveis`}
          </button>
        ) : null}
        
        <div className="collapse " id="idiomasCollapse">
          {idiomas.idiomas.slice(5).map((idioma) => (
            <div>
              
              <IdiomaUnd
                lingua={idioma.lingua}
                interface={idioma.interface}
                dublagem={idioma.dublagem}
                legenda={idioma.legenda}
              />
            </div>
          ))}
          {verMais ? (
            <button
              onClick={() => setVerMais(!verMais)}
              className={`${style.mais_idiomas} btn btn-primary mt-2`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#idiomasCollapse"
              aria-expanded={verMais}
              aria-controls="idiomasCollapse"
            >
              {`Ver menos`}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
