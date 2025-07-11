import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Requisitos() {
  return (
    <div className={style["requisitos"]}>
      <div className={style["accordion-edit"]} id="accordionExample1">
        <div style={{ cursor: "initial" }}>
          <h2 className={style["accordion-requisitos"]} id="headingTwo">
            <button
              className={`${style["accordion-botao-requisitos"]} ${style["accordion-botao"]}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Requisitos de sistema
              <hr className={`${style["linha"]} ${style["linha-requisito"]}`} />
            </button>
          </h2>

          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample1"
          >
            <div
              className={`${style["accordion-texto"]} ${style["texto-requisito"]}`}
            >
              <div className={style["minimo"]}>
                <p id="titulo-requisito">Mínimos:</p>
                <p>
                  <span>SO: </span> Windows Xp, Vista, 7, 8/8.1, 10
                </p>
                <p>
                  <span>Processador: </span> 2.0 Ghz
                </p>
                <p>
                  <span>Memória: </span> 2.5GB
                </p>
                <p>
                  <span>Hard Disk Space: </span> 200MB
                </p>
                <p>
                  <span>DirectX: </span> 9.0c or Greater
                </p>
                <p>
                  <span>Video Card: </span> 128mb Video Memory, capable of
                  Shader Model 2.0+
                </p>
              </div>

              <div className={style["recomendado"]}>
                <p id="titulo-requisito">Recomendado:</p>
                <p>
                  <span>SO: </span> Windows 7, 8/8.1, 10
                </p>
                <p>
                  <span>Processador: </span> Dual Core 3.0 Ghz
                </p>
                <p>
                  <span>Memória: </span> 4GB
                </p>
                <p>
                  <span>Placa de vídeo: </span> 256mb Video Memory, capable of
                  Shader Model 2.0+
                </p>
                <p>
                  <span>DirectX: </span> 9.0c or Greater
                </p>
                <p>
                  <span>Hard Disk Space: </span> 200MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
