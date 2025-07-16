import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Achievement } from "../../../types/Achievement";

interface Props {
  conquistas: Achievement[];
}

export default function Conquistas(jogo: Props) {
  console.log(jogo);
  return (
    <div className={style.conquistas}>
      <span>{`Inclui ${jogo.conquistas.length} Conquistas Steam`}</span>
      <div>
        {jogo.conquistas.slice(0, 3).map((conquista) => (
          <img
            src={conquista.imagem}
            onError={(e) => {
              e.currentTarget.onerror = null; // evita loop caso /conquista.png também falhe
              e.currentTarget.src = "/conquista.png";
            }}
            alt=""
          ></img>
        ))}
        <button>{`Ver todas as ${jogo.conquistas.length} `}</button>
      </div>
    </div>
  );
}
