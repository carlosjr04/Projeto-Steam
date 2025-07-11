import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function AcesseJogos() {

  useEffect(() => {
    const gameImages = document.querySelectorAll<HTMLElement>('.' + style['game_image'])

    const updateTransform = () => {
      const scrollOffset = window.scrollY * 0.15
      gameImages.forEach((gameImage) => {
        const speedAttr = gameImage.getAttribute('data-rellax-speed')
        const relativeSpeed = parseFloat(speedAttr || '1')
        const offset = relativeSpeed * 20
        gameImage.style.transform = `translateY(${offset + scrollOffset}px)`
      })
    }

    window.addEventListener('scroll', updateTransform)
    updateTransform() // chamada inicial

    const gamesTxtContent = document.querySelector('.' + style['games-txt-content'])
    let observer: IntersectionObserver | null = null

    if (gamesTxtContent) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          gameImages.forEach((gameImage) => {
            if (entry.isIntersecting) {
              gameImage.classList.add(style['active'])
            } else {
              gameImage.classList.remove(style['active'])
            }
          })
        })
      })

      observer.observe(gamesTxtContent)
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateTransform)
      if (observer && gamesTxtContent) {
        observer.unobserve(gamesTxtContent)
      }
    }
  }, [])
  return (
    <div id="about-games">
      

      <div className={style["about-games-content"]}>
        <div className={style["about-games-gradient"]}></div>
        <div className={style["games-col-left"]}>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="2.3"
          >
            <a href="/Jogo/4">
              <img src="/Skyrim.jpg" style={{ width: "180px" }} />
            </a>
          </div>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="1.5"
          >
            <Link to="/Jogo/2">
              <img src="/MarvelRivals.jpg" style={{ width: "250px" }} />
            </Link>
          </div>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="1.5"
          >
            <Link to="/Jogo/1">
              <img
                src="/hollow-knight-image.jpg"
                style={{ width: "230px" }}
              />
            </Link>
          </div>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="0.8"
          >
            <a href="/Jogo/3">
              <img src="/Terraria.avif" style={{ width: "170px" }} />
            </a>
          </div>
        </div>

        <div className={style["games-col-right"]}>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="3"
          >
            <a href="/Jogo/3">
              <img
                src="/terraria-scene-3.gif"
                style={{ width: "250px" }}
              />
            </a>
          </div>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="1.5"
          >
            <a href="/Jogo/4">
              <img
                src="/skyrim-scene-1.jpg"
                style={{ width: "280px" }}
              />
            </a>
          </div>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="1.5"
          >
            <Link to="/Jogo/1">
              <img
                src="/hollow-knight-scene-4.jpg"
                style={{ width: "310px" }}
              />
            </Link>
          </div>
          <div
            className={style["game_image"]}
            data-rellax-percentage="0.5"
            data-rellax-speed="1.2"
          >
            <Link to="/Jogo/2">
              <img
                src="/MarvelRivals_Scene.jpg"
                style={{ width: "220px" }}
              />
            </Link>
          </div>
        </div>

        <div className={style["games-txt-content"]}>
          <h2>Acesse jogos instantaneamente</h2>
          <div className={style["about-games-txt"]}>
            Temos quase 30.000 jogos, indo de grandes produções até pequenos
            independentes — com bastante coisa no meio. Aproveite as promoções
            exclusivas, atualizações automáticas e outros grandes privilégios.
          </div>

          <div className={style["about-games-btn"]}>
            <Link to="/">Navegue pela loja</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
