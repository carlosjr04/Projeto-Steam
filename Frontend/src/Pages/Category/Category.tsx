import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import JogoCard from '../../components/JogoCard/JogoCard';
import { usePaginatedGames } from '../../hooks/Jogo/usePaginatedGames';

const CategoryPage: React.FC = () => {
  // Parâmetros de exemplo, podem ser dinâmicos depois
  const [pagina, setPagina] = useState(0);
  const tamanho = 10;
  const { categoria } = useParams();
  const { data, loading } = usePaginatedGames(pagina, tamanho, '', categoria ?? '');
  const categoryName = categoria ?? 'Categoria';

  return (
    <div className={styles['category-page-container']}>
      <header className={styles['category-header']}>
        <div className={styles['category-header-bg']} />
        <div className={styles['category-header-content']}>
          <h1 className={styles['category-title']}>{categoryName}</h1>
          <p className={styles['category-description']}>Explore os melhores jogos desta categoria na Steam.</p>
        </div>
      </header>

      <main className={styles['category-main']}>
        {loading ? (
          <div>Carregando jogos...</div>
        ) : (
          <div className={`d-flex flex-wrap justify-content-center`} style={{gap: '32px', padding: '0 32px'}}>
            {data?.itens.map(jogo => (
              <JogoCard key={jogo.id} jogo={jogo} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;