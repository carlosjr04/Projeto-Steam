import { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useGetGame } from "../../../hooks/Games/useGetGame";

export default function CarrosselHome() {
  const {games,loading,error} = useGetGame()
  const [mainImages, setMainImages] = useState(
    
    (games ?? []).reduce((acc, game) => {
      acc[game.id] = game.cover;
      return acc;
    }, {} as Record<string, string>)
  );

  const handleMouseOver = (gameId: string, sceneUrl: string) => {
    setMainImages((prev) => ({ ...prev, [gameId]: sceneUrl }));
  };

  const handleMouseOut = (gameId: string) => {
    const originalCover = games ? games.find((g) => g.id === gameId)?.cover : undefined;
    setMainImages((prev) => ({ ...prev, [gameId]: originalCover! }));
  };

  
  

  return (
    <div className={`container ${style["main-container"]} mb-5`}>
      <div className={`mb-3 ${style.related}`}>
        <p>Recomendados e em Destaque</p>
      </div>

      <div
        id="carousel"
        className={`carousel slide d-flex row ${style["games-carousel"]}`}
        data-bs-ride="carousel"
      >
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        
        <div className={`carousel-inner ${style.grow}`}>
          {games && games.map((game, index) => (
            <Link to={`/Jogo/${game.id}`} className={style.verMais}>
            
            <div
              key={game.id}
              style={{
                width: "initial",
                left: "50%",
                transform: "translate(-50%)",
                minWidth: "70%",
                transition: "none",
                cursor: "pointer",
              }}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                className={style["game-specs"]}
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title={game.title}
              >
                <div
                  className={style["game-figure"]}
                  style={{
                    backgroundImage: `url(${mainImages[game.id]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    cursor: "pointer",
                  }}
                  
                ></div>

                <div className={style["game-asides"]}>
                  <h3 className={style["game-title"]}>{game.title}</h3>
                  <div className={style["side-div"]}>
                    {game.scenes.map((scene, i) => (
                      <div
                        key={i}
                        className={style["game-scenes"]}
                        style={{
                          backgroundImage: `url(${scene})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          cursor: "pointer",
                        }}
                        onMouseOver={() => handleMouseOver(game.id, scene)}
                        onMouseOut={() => handleMouseOut(game.id)}
                      />
                    ))}
                  </div>
                  <p className={style["price"]}>{game.price>0?`R$${game.price}`:"Gratuito"}</p>
                </div>
              </div>
            </div>
             </Link>
          ))}
        </div>
       

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
