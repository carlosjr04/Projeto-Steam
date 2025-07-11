import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import type { ReactNode } from "react";

interface Props {
  descricao: ReactNode;
}

export default function SobreJogo(jogo: Props) {
  return (
    <div className={style["sobre-jogo"]}>
        <div className={style["accordion-edit"]} id="accordionExample">
          <div>
            <h2 className={style["accordion-titulo"]} id="headingOne">
              <button
                className={style["accordion-botao"]}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Sobre o Jogo
              </button>
            </h2>
            <div
              id="collapseOne"
              style={{ cursor: "initial" }}
              className="accordion-collapse collapse "
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className={style["accordion-texto"]}>{jogo.descricao}</div>
            </div>
          </div>
          
        </div>
    </div>
  );
}
