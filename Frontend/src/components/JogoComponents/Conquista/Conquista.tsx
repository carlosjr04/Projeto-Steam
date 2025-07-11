import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Conquista } from "../../../Utils/gameData";

interface Props {
  conquistas: Conquista[];
}

export default function Conquistas(jogo: Props) {
  return (
    <div className={style.conquistas}>
      <span>{`Inclui ${jogo.conquistas.length} Conquistas Steam`}</span>
      <div>
        {jogo.conquistas.slice(0,3).map((conquista) => (
          <img src={conquista.imagem} alt=""></img>
        ))}
        <button>{`Ver todas as ${jogo.conquistas.length} `}</button>
      </div>
    </div>
  );
}
