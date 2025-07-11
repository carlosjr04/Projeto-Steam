import { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from "./style.module.css";
import { games } from "../../../Utils/gameData";

export default function CarrosselHomeSlide() {
  // Estado que armazena para cada jogo a imagem principal atual
  const [mainImages, setMainImages] = useState(
    games.reduce((acc, game) => {
      acc[game.id] = game.cover;
      return acc;
    }, {} as Record<string, string>)
  );

  const handleMouseOver = (gameId: string, sceneUrl: string) => {
    setMainImages((prev) => ({ ...prev, [gameId]: sceneUrl }));
  };

  const handleMouseOut = (gameId: string) => {
    const originalCover = games.find((g) => g.id === gameId)?.cover;
    setMainImages((prev) => ({ ...prev, [gameId]: originalCover! }));
  };

  const handleClick = (title: string) => {
    const firstWord = title
      .split(" ")[0]
      .toLowerCase()
      .replace(/[^a-z0-9\-]/g, "");
    const fileName = `${firstWord}.html`;
    window.location.href = `./src/${fileName}`;
  };

  return (
    <div className={style["md-main-games-div"]}>
      <div className={`mb-3 ${style.related}`}>
        <p>Recomendados e em Destaque</p>
      </div>

      <div className={style["md-games-div"]}>
        {games.map((game) => (
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
              <p className={style.price}>{game.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
