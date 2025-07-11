import { useState } from "react";

export default function Terraria() {
  const [mostrarTudo, setMostrarTudo] = useState(false);

  return (
    <div style={{ color: "#acb2b8", fontSize: "16px", marginTop: "2rem" }}>
      <p>
        Cave, lute, explore, construa! Nada é impossível nesse jogo de aventura
        cheio de ação. O mundo é a sua tela de pintar e o chão em si é a sua
        tinta. Pegue suas ferramentas e vá! Faça novas armas para lutar contra
        uma variedades de inimigos em numerosos biomas. Cave profundamente no
        subsolo para encontrar acessórios, dinheiro e outras coisas úteis.
        Reúna recursos para criar tudo o que você precisa para tornar o mundo o
        seu próprio. Construa uma casa, um forte ou até mesmo um castelo.
        Pessoas vão se mudar e viver lá e talvez até vender para você
        diferentes mercadorias para ajudá-lo em sua jornada. Mas cuidado, há
        ainda mais desafios à sua espera... Você está à altura da tarefa?
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
          <br />
          <span
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Principais características:
          </span>
          <ul style={{ paddingLeft: "1.2rem", color: "#acb2b8" }}>
            <li>Sandbox Play (características de mundo livre)</li>
            <li>Mundos criados aleatoriamente</li>
            <li>Atualizações gratuitas de conteúdo</li>
          </ul>

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
