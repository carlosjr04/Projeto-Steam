import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import IdiomaUnd from "./IdiomaUnd";
import { useState } from "react";
import type { Language } from "../../../types/Language";

interface IdiomaProps {
  idiomas: Language[];
}

export default function Idioma({ idiomas }: IdiomaProps) {
  const [verMais, setVerMais] = useState<boolean>(false);
  const isValidArray = Array.isArray(idiomas) && idiomas.length > 0;
  return (
    <div className={style.idiomas}>
      <span className={style["idiomas-texto"]}>Idiomas</span>
      <div>
        <div className={style.colunas}>
          <span className={style["idiomas-texto"]}>Interface</span>
          <span className={style["idiomas-texto"]}>Dublagem</span>
          <span className={style["idiomas-texto"]}>Legendas</span>
        </div>

        {isValidArray && idiomas.slice(0, 4).map((idioma, index) => (
          <div key={`idioma-main-${idioma.lingua}-${index}`}>
            <IdiomaUnd
              lingua={idioma.lingua}
              interface={idioma.interface}
              dublagem={idioma.dublagem}
              legenda={idioma.legenda}
            />
          </div>
        ))}

        {!verMais && isValidArray && idiomas.length > 4 && (
          <button
            onClick={() => setVerMais(true)}
            className={`${style.mais_idiomas} btn btn-primary mt-2`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#idiomasCollapse"
            aria-expanded={verMais}
            aria-controls="idiomasCollapse"
          >
            {`Ver todos os ${idiomas.length - 2} idiomas disponíveis`}
          </button>
        )}

        <div className="collapse" id="idiomasCollapse">
          {isValidArray && idiomas.slice(2).map((idioma, index) => (
            <div key={`idioma-collapse-${idioma.lingua}-${index}`}>
              <IdiomaUnd
                lingua={idioma.lingua}
                interface={idioma.interface}
                dublagem={idioma.dublagem}
                legenda={idioma.legenda}
              />
            </div>
          ))}
          {verMais && (
            <button
              onClick={() => setVerMais(false)}
              className={`${style.mais_idiomas} btn btn-primary mt-2`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#idiomasCollapse"
              aria-expanded={verMais}
              aria-controls="idiomasCollapse"
            >
              Ver menos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
