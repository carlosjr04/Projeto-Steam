import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import JogoCard from '../../components/JogoCard/JogoCard';
import { usePaginatedGames } from '../../hooks/Games/usePaginatedGames';
import type { Game } from '../../types/Game';

const SearchPage: React.FC = () => {
  const { gameId } = useParams<{ gameId?: string }>();
  const [pagina, setPagina] = useState(0);
  const [jogos, setJogos] = useState<Game[]>([]);
  const [search, setSearch] = useState(gameId ? decodeURIComponent(gameId) : '');
  const [input, setInput] = useState(gameId ? decodeURIComponent(gameId) : '');
  const tamanho = 4;
  const { data, loading } = usePaginatedGames(pagina, tamanho, search, '');
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  // Atualiza search e input se gameId mudar na URL
  useEffect(() => {
    setSearch(gameId ? decodeURIComponent(gameId) : '');
    setInput(gameId ? decodeURIComponent(gameId) : '');
  }, [gameId]);

  useEffect(() => {
    setJogos([]);
    setPagina(0);
  }, [search]);

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
    }, 300);
    return () => clearTimeout(timeout);
  }, [inView, loading, pagina, data]);

  useEffect(() => {
    const ajustarAlturaDosCards = () => {
      const cards = document.querySelectorAll(`.${styles['search-main']} .JogoCard`);
      let alturaMaxima = 0;
      cards.forEach((card) => {
        const altura = card.getBoundingClientRect().height;
        if (altura > alturaMaxima) {
          alturaMaxima = altura;
        }
      });
      cards.forEach((card) => {
        (card as HTMLElement).style.height = `${alturaMaxima}px`;
      });
    };
    ajustarAlturaDosCards();
    window.addEventListener('resize', ajustarAlturaDosCards);
    return () => {
      window.removeEventListener('resize', ajustarAlturaDosCards);
    };
  }, [jogos]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    setSearch(trimmed);
    setInput('');
    navigate(trimmed ? `/games/${encodeURIComponent(trimmed)}` : '/games');
  };

  return (
    <div className={styles['search-page-container']}>
      <header className={styles['search-header']}>
        <div className={styles['search-header-bg']} />
        <div className={styles['search-header-content']}>
          <h1 className={styles['search-title']}>Pesquise o jogo desejado</h1>
          <form onSubmit={handleSearch} className={styles['search-form']} style={{ marginTop: 16, marginBottom: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Buscar jogos..."
              className={styles['search-input']}
              style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 220 }}
            />
            <button type="submit" className={styles['search-btn']} style={{ marginLeft: 8, padding: '8px 16px', borderRadius: 4 }}>
              Pesquisar
            </button>
          </form>
        </div>
      </header>
      <main className={styles['search-main']}>
        {jogos.length === 0 && !loading ? (
          <div style={{ textAlign: 'center', fontSize: '24px', marginTop: '50px' }}>
            Nenhum jogo encontrado para sua busca
          </div>
        ) : (
          <div className={`d-flex flex-wrap justify-content-center`} style={{ gap: '32px', padding: '0 32px' }}>
            {jogos.map((jogo) => (
              <JogoCard key={jogo.id} jogo={jogo} />
            ))}
          </div>
        )}
        {loading && <div>Carregando jogos...</div>}
        <div ref={ref} style={{ height: '50px', backgroundColor: 'transparent' }} />
      </main>
    </div>
  );
};

export default SearchPage;
