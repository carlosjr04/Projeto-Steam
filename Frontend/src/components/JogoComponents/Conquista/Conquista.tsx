import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Achievement } from "../../../types/Achievement";

interface Props {
  conquistas: Achievement[];
}

export default function Conquistas(jogo: Props) {
  const conquistasSafe = Array.isArray(jogo.conquistas) ? jogo.conquistas : [];
  if (!conquistasSafe.length) return null;
  return (
    <div className={style.conquistas}>
      <span>{`Inclui ${conquistasSafe.length} Conquistas Steam`}</span>
      <div>
        {conquistasSafe.slice(0, 3).map((conquista, idx) => (
          <img
            key={`conquista-${conquista.imagem}-${idx}`}
            src={conquista.imagem}
            onError={(e) => {
              e.currentTarget.onerror = null; // evita loop caso /conquista.png também falhe
              e.currentTarget.src = "/conquista.png";
            }}
            alt=""
          ></img>
        ))}
        <button>{`Ver todas as ${conquistasSafe.length} `}</button>
      </div>
    </div>
  );
}
