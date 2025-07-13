import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import styles from './style.module.css';
import JogoCard from '../../components/JogoCard/JogoCard';
import { usePaginatedGames } from '../../hooks/Games/usePaginatedGames';
import type { Game } from '../../types/Game';

function formatCategoryName(slug?: string) {
  if (!slug) return 'Categoria';
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

const CategoryPage: React.FC = () => {
  const [pagina, setPagina] = useState(0);
  const [jogos, setJogos] = useState<Game[]>([]);
  const tamanho = 4;
  const { categoria } = useParams();
  const { data, loading } = usePaginatedGames(pagina, tamanho, '', categoria ?? '');
  const { ref, inView } = useInView(); // Hook para detectar visibilidade
   const categoryName = formatCategoryName(categoria);

  useEffect(() => {
  if (data?.itens) {
    setJogos((prevJogos) => {
      const novosJogos = data.itens.filter(
        (novoJogo) => !prevJogos.some((jogoExistente) => jogoExistente.id === novoJogo.id)
      );
      return [...prevJogos, ...novosJogos];
    });
  }
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inView && !loading && pagina < (data?.totalDePaginas ?? 0) - 1) {
        setPagina((prevPagina) => prevPagina + 1);
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(timeout);
  }, [inView, loading, pagina, data]);

  return (
    <div className={styles['category-page-container']}>
      <header className={styles['category-header']}>
        <div className={styles['category-header-bg']} />
        <div className={styles['category-header-content']}>
          <h1 className={styles['category-title']}>{categoryName}</h1>
          {!loading && jogos.length > 0 && (
            <p className={styles['category-description']}>
              Explore os melhores jogos desta categoria na Steam.
            </p>
          )}
        </div>
      </header>

      <main className={styles['category-main']}>
        {jogos.length === 0 && !loading ? (
          <div style={{ textAlign: 'center', fontSize: '24px', marginTop: '50px' }}>
            Ainda não há jogos nesta categoria
          </div>
        ) : (
          <div className={`d-flex flex-wrap justify-content-center`} style={{ gap: '32px', padding: '0 32px' }}>
            {jogos.map((jogo) => (
              <JogoCard key={jogo.id} jogo={jogo} />
            ))}
          </div>
        )}
        {loading && <div>Carregando jogos...</div>}
        {/* Elemento que dispara o carregamento ao ficar visível */}
        <div ref={ref} style={{ height: '50px', backgroundColor: 'transparent' }} />
      </main>
    </div>
  );
};

export default CategoryPage;