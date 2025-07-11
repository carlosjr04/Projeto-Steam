import { useState } from "react";

const spanStyle = {
  width: "40px",
  marginTop: "18px",
  marginBottom: "0px",
  backgroundImage: "none",
  fontSize: "22px",
  color: "#2f89bc",

  letterSpacing: "0px",
};

export default function Hollow() {
  const [mostrarTudo, setMostrarTudo] = useState(false);

  return (
    <div style={{ marginTop: "2rem", color: "#acb2b8", fontSize: "16px" }}>
      <img
        src="/sobreHollow1.png"
        alt="Descrição"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        }}
      />
      <p style={{ marginTop: "2rem" }}>
        A Trupe Grimm - Acenda a Lanterna do Pesadelo. Invoque a Trupe. Nova
        Grande Missão. Novos Chefes. Novos Amuletos. Novos Inimigos. Novos
        Amigos.
      </p>

      <p style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Sonhos Escondidos - Poderosos inimigos emergem! Novos Chefes. Novos
        Aprimoramentos. Novas Músicas.
      </p>

      {!mostrarTudo ? (
        <button
          onClick={() => setMostrarTudo(true)}
          className="btn btn-primary mt-2"
        >
          Ver mais...
        </button>
      ) : (
        <>
          <span style={spanStyle}>
            Enfrente as profundezas de um reino esquecido
          </span>
          <br />
          <p>
            Abaixo da cidade moribunda de Dirtmouth jaz um reino antigo e
            arruinado. Muitos são atraídos para o subterrâneo em busca de
            riquezas, glórias ou respostas para antigos segredos. Hollow Knight
            é uma aventura de ação clássica em estilo 2D por um vasto mundo
            interligado. Explore cavernas serpenteantes, cidades antigas e ermos
            mortais; lute contra criaturas malignas e alie-se a insetos
            bizarros, e solucione mistérios antigos no centro do reino.
          </p>
          <img
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            src="/sobreHollow2.png"
            alt=""
          />
          <span style={spanStyle}>Um mundo evocativo feito à mão</span>
          <p style={{ marginBottom: "2rem" }}>
            O mundo de Hollow Knight ganha vida em detalhes significativos, suas
            cavernas ficam cheia de vida com criaturas bizarras e terríveis,
            todas animadas manualmente em estilo 2D tradicional. Cada nova área
            que você descobrir é lindamente exclusiva e peculiar, cheia de novos
            personagens e criaturas. Explore e descubra os segredos ocultos do
            caminho em ruínas. Se você gosta de jogos clássicos, personagens
            fofos mas assustadores, aventuras épicas e mundos lindos e góticos,
            Hollow Knight estará à sua espera!
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
