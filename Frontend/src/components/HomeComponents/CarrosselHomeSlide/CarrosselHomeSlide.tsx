import { useEffect, useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from "./style.module.css";
import { useGetGame } from "../../../hooks/Games/useGetGame";

export default function CarrosselHomeSlide() {
  const { games} = useGetGame();
    const [mainImages, setMainImages] = useState<Record<string, string>>({});
  
    useEffect(() => {
      if (games) {
        const inicial = games.reduce((acc, game) => {
          acc[game.id] = game.cover;
          return acc;
        }, {} as Record<string, string>);
  
        setMainImages(inicial);
      }
    }, [games]);
  
    

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
              {game.preco>0?<p className={style.price}>R${game.preco.toFixed(2)}</p>:<p className={style.price}>Gratuito</p>}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
