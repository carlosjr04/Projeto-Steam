import { useState } from "react";

export default function Skyrim() {
  const [mostrarTudo, setMostrarTudo] = useState(false);

  return (
    <div style={{ color: "#acb2b8", fontSize: "16px", marginTop: "2rem" }}>
      <img
        src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/extras/Skyrim-AnnivEdition_Steam_MainCapsule_616x353-01.jpg?t=1721923149"
        alt="Skyrim Anniversary Edition"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        }}
      />

      <p>
        A Anniversary Edition inclui uma década de conteúdo: o aclamado jogo
        principal e complementos de Skyrim Special Edition, além de conteúdos do
        Creation Club lançados até 11 de novembro de 2021, incluindo missões,
        masmorras, chefes, armas, feitiços e mais.
      </p>

      {!mostrarTudo ? (
        <button
          onClick={() => setMostrarTudo(true)}
          className="btn btn-primary mt-2"
        >
          Saiba mais
        </button>
      ) : (
        <>
          <p>
            Vencedor de mais de 200 prêmios de Jogo do Ano, The Elder Scrolls V:
            Skyrim Special Edition dá vida à fantasia épica com um nível de
            detalhe espantoso. A Special Edition inclui o jogo aclamado pela
            crítica e suplementos com novas funcionalidades como arte e efeitos
            remasterizados, raios volumétricos, profundidade de campo dinâmica,
            reflexos espaciais e muito mais.
          </p>

          <p>
            Skyrim Special Edition também traz todo o poder de Bethesda Game
            Studios Creations ao PC e às consolas. Novas missões, cenários,
            personagens, diálogos, armaduras, armas e muito mais: com Creations,
            não há limites para o que poderás encontrar.
          </p>

          <button
            onClick={() => setMostrarTudo(false)}
            className="btn btn-secondary mt-2"
          >
            Ver menos ▲
          </button>
        </>
      )}
    </div>
  );
}
