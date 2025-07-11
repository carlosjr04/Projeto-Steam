import { useState } from "react";

const spanStyle = {
  fontSize: "22px",
  color: "#2f89bc",
  
  letterSpacing: "0px",
};


export default function Marvel() {
  const [mostrarTudo, setMostrarTudo] = useState(false);

  return (
    <div style={{ color: "#acb2b8", fontSize: "16px", marginTop: "2rem" }}>
      <img
        src="/sobre-gif1.gif"
        alt="Marvel Rivals"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
        }}
      />

      <p>
        <strong>Marvel Rivals</strong> é um jogo de tiro JxJ em equipe com Super Heróis!
        Reúna um grupo de estrelas da Marvel, crie estratégias e combine seus poderes
        para executar poderosas habilidades de equipe. Lute em cenários destrutíveis e
        campos de batalha dinâmicos pelo universo Marvel em constante evolução.
      </p>

      <p>
        <span style={spanStyle}>Elenco Extenso e Variado de Personagens Marvel</span>
        <br />
        Escolha entre vários Super Heróis e Supervilões favoritos dos fãs, como os
        Vingadores, os Guardiões da Galáxia, os X-Men e muitos outros de todo o
        Multiverso Marvel. O Teste Alfa começará em maio, quando os jogadores terão
        acesso a vários Super Heróis e Supervilões jogáveis, incluindo personagens
        icônicos como Pantera Negra, Homem-Aranha, Magneto e Magia.
      </p>

      <p>
        <span style={spanStyle}>Partidas Dinâmicas com Ação 6x6 Ágil e Divertida</span>
        <br />
        Com ambientes detalhados, jogabilidade ágil e campos de batalha sempre
        dinâmicos, emoção é o que não vai faltar em Marvel Rivals! Lute como Super
        Heróis e Supervilões com habilidades extraordinárias e combine esses poderes
        para criar resultados divertidos e inesperados no campo de batalha.
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
            <span style={spanStyle}>Sinergia Entre os Heróis</span>
            <br />
            Coordene as habilidades dos personagens para criar combinações únicas e
            ativar habilidades de equipe surpreendentes! Libere a sinergia entre os
            poderes e crie novas táticas que podem mudar os rumos do combate. Por
            exemplo, suba nas costas do Groot como Rocket Racoon e forme uma dupla
            letal para detonar os inimigos, ou use os raios gamas liberados pelo Hulk
            para carregar a armadura do Homem de Ferro e causar um dano devastador,
            entre muitos outros!
          </p>

          <p>
            <span style={spanStyle}>Destrua o Cenário com Criatividade</span>
            <br />
            Abra caminho através do cenário destrutível em vários mundos icônicos da
            Marvel. De Asgard à Tóquio de 2099, use seus superpoderes e altere o
            ambiente. Modifique o terreno e crie vantagens estratégicas no campo de
            batalha! Use o cenário como cobertura para evitar ataques ou como arma
            improvisada para derrubar inimigos. Há mil e uma maneiras de usar o
            ambiente para conquistar a vitória.
          </p>

          <p>
            <span style={spanStyle}>
              Universo em Constante Evolução e Robustas Atualizações Pós-lançamento
            </span>
            <br />
            No Multiverso Marvel, as possibilidades são infinitas! Cada temporada vai
            trazer novos Super Heróis ao campo de batalha, além de mapas diversos e
            desafiadores! Desbloqueie novos conteúdos e use-os estrategicamente nos
            vários modos de jogo. Viva a ação frenética e as possibilidades sem fim em
            ousadas batalhas em equipe!
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

