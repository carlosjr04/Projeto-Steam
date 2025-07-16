import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import type { Game } from "../../types/Game";

interface JogoCardProps {
  jogo: Game;
}

const JogoCard: React.FC<JogoCardProps> = ({ jogo }) => {
  return (
    <div className={styles.saleSectionCtn}>
      <div className={styles.carouselPanel}>
        {/* Imagem/vídeo principal */}
        <div className={styles.mediaRow}>
          {jogo.scenes && jogo.scenes.length > 0 ? (
            jogo.scenes[0].endsWith(".mp4") || jogo.scenes[0].endsWith(".webm") ? (
              <video className={styles.media} controls poster={jogo.cover}>
                <source src={jogo.scenes[0]} type="video/mp4" />
              </video>
            ) : (
              <img className={styles.media} src={jogo.cover} alt={jogo.title} />
            )
          ) : (
            <img className={styles.media} src={jogo.cover} alt={jogo.title} />
          )}
        </div>
        {/* Informações do jogo */}
        <div className={styles.infoSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.gameTitle}>{jogo.title}</h2>
            <span className={styles.developer}>{jogo.desenvolvedora}</span>
          </div>
          <div className={styles.tagsRow}>
            {jogo.categories.map((cat, index) => (
              <span key={`${cat}-${index}`} className={styles.tag}>{cat}</span>
            ))}
            {jogo.classificacao.map((cls, index) => (
              <span key={`${cls}-${index}`} className={styles.tag}>{cls}</span>
            ))}
          </div>
          <div className={styles.aboutRow}>{jogo.about}</div>
          <div className={styles.priceRow}>
            {jogo.desconto > 0 ? (
              <>
                <span className={styles.discount}>-{jogo.desconto}%</span>
                <span className={styles.oldPrice}>R$ {(jogo.preco).toFixed(2)}</span>
                <span className={styles.price}>
                  {jogo.preco * (1 - jogo.desconto / 100) === 0 ? 'Grátis' : `R$ ${(jogo.preco * (1 - jogo.desconto / 100)).toFixed(2)}`}
                </span>
              </>
            ) : (
              <span className={styles.price}>{jogo.preco === 0 ? 'Grátis' : `R$ ${jogo.preco.toFixed(2)}`}</span>
            )}
          </div>
          <div className={styles.redirectButtonRow} style={{ marginTop: '20px' }}>
            <Link
              to={`/Jogo/${jogo.id}`}
              className={styles.redirectButton}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#304e7a',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1f3555';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#304e7a';
              }}
            >
              Ver mais detalhes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JogoCard;
