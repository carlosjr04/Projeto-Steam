import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { games, type Jogo } from "../../Utils/gameData";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import CarrosselJogoUnd from "../../components/JogoComponents/CarrosselJogoUnd/CarrosselJogo";
import { useCarrosselStore } from "../../store/useCarrosselStore";
import CompraJogo from "../../components/JogoComponents/CompraJogo/CompraJogo";
import SobreJogo from "../../components/JogoComponents/SobreJogo/SobreJogo";
import Requisitos from "../../components/JogoComponents/Requisitos/Requisito";
import Compatibilidade from "../../components/JogoComponents/Compatibilidade/Compatibilidade";
import Idioma from "../../components/JogoComponents/Idioma/Idioma";
import Classificacao from "../../components/JogoComponents/Classificacao/Classificacao";
import Conquistas from "../../components/JogoComponents/Conquista/Conquista";

export default function Jogo() {
  const { jogoID } = useParams();
  const [jogo, setJogo] = useState<Jogo | null>(null);
  const { paginaAtual, avancar, voltar } = useCarrosselStore();

  function getHighDef(): string {
    const highResSrc = jogo?.exemplo[paginaAtual].replace(
      /(\d+)x(\d+)/,
      "600x338"
    );
    console.log(paginaAtual);
    if (highResSrc) {
      return highResSrc;
    } else {
      return "";
    }
  }
  useEffect(() => {
    const carousel = document.getElementById("carouselExample");

    const handleSlide = (event: any) => {
      const from = event.from;
      const to = event.to;
      const totalSlides =
        carousel?.querySelectorAll(".carousel-item").length || 0;

      const avancou = to > from || (from === totalSlides - 1 && to === 0);
      const voltou = to < from || (from === 0 && to === totalSlides - 1);

      if (avancou) {
        avancar();
      } else if (voltou) {
        voltar();
      }
    };

    carousel?.addEventListener("slide.bs.carousel", handleSlide);

    return () => {
      carousel?.removeEventListener("slide.bs.carousel", handleSlide);
    };
  }, [avancar, voltar]);
  useEffect(() => {
    const jogoTemp = games.find((jogo) => jogo.id === jogoID);
    if (jogoTemp) {
      setJogo(jogoTemp);
    } else {
      setJogo(null);
    }
  }, [jogoID]);

  return (
    <div>
      <div className={style["infos-iniciais"]}>
        <div className={style["inicio-jogo"]}>
          <div className={style["titulo"]}>
            <nav
              style={{ ["--bs-breadcrumb-divider" as any]: "'>'" }}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb">
                <li
                  className={`breadcrumb-item ${style["caminho-jogo"]}`}
                  aria-current="page"
                >
                  Todos os jogos
                </li>
                <li
                  className={`breadcrumb-item ${style["caminho-jogo"]}`}
                  aria-current="page"
                >
                  {jogo?.categorias[1]}
                </li>
                <li
                  className={`breadcrumb-item ${style["caminho-jogo"]}`}
                  aria-current="page"
                >
                  {jogo?.title}
                </li>
              </ol>
            </nav>
            <h1 className={style["titulo-jogo"]}>{jogo?.title}</h1>
          </div>

          <img
            id="carousel-preview"
            className={style["imagem-exemplo"]}
            src={getHighDef()}
            alt="Imagem do carrossel"
          />

          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ maxWidth: "100%", width: "100%" }}
          >
            <div className="carousel-inner">
              <div
                className="carousel-item active"
                style={{ backgroundColor: "transparent" }}
              >
                {jogo ? <CarrosselJogoUnd exemplo={jogo.exemplo} /> : null}
              </div>
              <div className="carousel-item ">
                {jogo ? <CarrosselJogoUnd exemplo={jogo.exemplo} /> : null}
              </div>
              <div className="carousel-item ">
                {jogo ? <CarrosselJogoUnd exemplo={jogo.exemplo} /> : null}
              </div>
              <div className="carousel-item ">
                {jogo ? <CarrosselJogoUnd exemplo={jogo.exemplo} /> : null}
              </div>
              <div className="carousel-item ">
                {jogo ? <CarrosselJogoUnd exemplo={jogo.exemplo} /> : null}
              </div>
            </div>

            <div
              className="carousel-indicators"
              style={{
                position: "static",

                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
                className={style["botao-voltar"]}
              >
                <span className={style["carrosel-voltar"]}></span>
              </button>

              {[0, 1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide-to={i}
                  className={`${i === 0 ? "active" : ""} ${style["botao"]}`}
                  aria-current={i === 0 ? "true" : undefined}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}

              <button
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
                className={style["botao-avancar"]}
              >
                <span className={style["carrosel-avancar"]}></span>
              </button>
            </div>
          </div>
        </div>

        <div className={style["infos-direita"]} style={{ minWidth: "30%" }}>
          <div className={style["imagem-direita"]}>
            <img src={jogo?.cover} alt="" />
          </div>

          <div className={style["texto-direita"]}>
            <p>{jogo?.about}</p>
            <br />
            <span className={style["analise"]}>
              Análise Recentes:{" "}
              <span className={style["analise-azul"]}>
                {" "}
                Extremamente positivas
              </span>
            </span>
            <br />
            <span className={style["analise"]}>
              Todas as Análises:{" "}
              <span className={style["analise-azul"]}>Muito positivas</span>
            </span>
            <br />
            <br />
            <span
              className={style["analise"]}
              style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
            >
              Data de lançamento:{" "}
              <span>{`${jogo?.DataLancamento.getDate()
                .toString()
                .padStart(2, "0")}/${jogo?.DataLancamento.getMonth()
                .toString()
                .padStart(
                  2,
                  "0"
                )}/${jogo?.DataLancamento.getFullYear()}`}</span>
            </span>
            <br />
            <br />
            <span className={style["analise"]}>
              Desenvolvedor:{" "}
              <span className={style["analise-azul"]}>
                {jogo?.desenvolvedora}
              </span>
            </span>
            <br />
            <span className={style["analise"]}>
              Distribuidora:{" "}
              <span className={style["analise-azul"]}>
                {jogo?.desenvolvedora}
              </span>
            </span>
            <br />
            <br />
            <span className={style["analise"]}>
              Marcadores populares para este produto:
            </span>
            <br />
            {jogo?.categorias.map((categoria) => (
              <button className={style["botao-genero"]}>{categoria}</button>
            ))}
            <button className={style["botao-genero"]}>+</button>
          </div>
        </div>
      </div>
      <div className={style["jogo-bottom"]}>
        <div className={style["esquerda"]}>
          {jogo ? <CompraJogo id={jogo.id} price={jogo?.price} title={jogo?.title} /> : null}
          {jogo ? <SobreJogo descricao={jogo?.descricao} /> : null}
          {jogo ? <Requisitos /> : null}
        </div>
        <div className={style["direita"]}>
          {jogo ? <Compatibilidade compatibilidades={jogo.compatibilidade} /> : null}
          {jogo ? <Idioma idiomas={jogo.idiomas} /> : null}
          {jogo ? <Classificacao classificacao={jogo.classificacao} /> : null}
          {jogo ? <Conquistas conquistas={jogo.conquista} /> : null}
        </div>
      </div>
    </div>
  );
}
