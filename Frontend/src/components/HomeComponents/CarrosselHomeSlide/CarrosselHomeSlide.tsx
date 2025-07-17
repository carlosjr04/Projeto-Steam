import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from "./style.module.css";
import { useGetGame } from "../../../hooks/Games/useGetGame";

export default function CarrosselHomeSlide() {
  const { games } = useGetGame();
  const navigate = useNavigate();
  
    

  return (
    <div className={style["md-main-games-div"]}>
      <div className={`mb-3 ${style.related}`}>
        <p>Recomendados e em Destaque</p>
      </div>

      <div className={style["md-games-div"]}>
        {games?.map((game) => (
          <div
            key={game.id}
            className={style["game-specs"]}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title={game.title}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/jogo/${game.id}`)}
          >
            <div
              className={style["game-figure"]}
              data-original-image={game.cover}
              style={{
                backgroundImage: `url(${game.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            <div className={style["game-asides"]}>
              <h3 className={style["game-title"]}>{game.title}</h3>
              {game.preco > 0 ? (
                <p className={style.price}>R${game.preco.toFixed(2)}</p>
              ) : (
                <p className={style.price}>Gratuito</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
