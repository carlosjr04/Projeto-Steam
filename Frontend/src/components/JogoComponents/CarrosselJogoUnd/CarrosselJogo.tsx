import type { Jogo } from "../../../Utils/gameData";
import { useCarrosselStore } from "../../../store/useCarrosselStore";
import style from "./style.module.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

interface Props{
    exemplo:string[]
}

export default function CarrosselJogoUnd(jogo: Props) {
     const { paginaAtual} = useCarrosselStore();
  return (
    <div className={style.row}>
      <div
        className="col-3"
        style={{ padding: "0px", paddingRight: " 7.4px", width: "auto" }}
      >
        <img
          src={jogo.exemplo[0+paginaAtual]}
          className="d-block w-100 imagem"
          alt="Imagem 1"
        ></img>
      </div>
      <div
        className="col-3"
        style={{ padding: "0px", paddingRight: " 7.4px", width: "auto" }}
      >
        <img
          src={jogo.exemplo[1+paginaAtual]}
          className="d-block w-100 imagem"
          alt="Imagem 5"
        ></img>
      </div>
      <div
        className="col-3"
        style={{ padding: "0px", paddingRight: " 7.4px", width: "auto" }}
      >
        <img
        src={jogo.exemplo[2+paginaAtual]}
          className="d-block w-100 imagem"
          alt="Imagem 6"
        ></img>
      </div>
      <div
        className="col-3"
        style={{ padding: "0px", paddingRight: " 7.4px", width: "auto" }}
      >
        <img
        src={jogo.exemplo[3+paginaAtual]}
          className="d-block w-100 imagem"
          alt="Imagem 1"
        ></img>
      </div>
      <div
        className="col-3"
        style={{ padding: "0px", paddingRight: " 7.4px", width: "auto" }}
      >
        <img
        src={jogo.exemplo[4+paginaAtual]}
          className="d-block w-100 imagem"
          alt="Imagem 1"
        ></img>
      </div>
    </div>
  );
}

