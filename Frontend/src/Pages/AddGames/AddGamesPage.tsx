import React from 'react';
import styles from './style.module.css';
import { usePaginatedGames } from '../../hooks/Games/usePaginatedGames';
import AddGameModal from '../../components/AddGameModal/AddGameModal';
import SteamModal from '../../components/GlobalComponents/SteamModal/SteamModal';
import { useAddGame } from '../../hooks/Games/useAddGame';

const PAGE_SIZE = 4;

const AddGamesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, loading } = usePaginatedGames(currentPage - 1, PAGE_SIZE);
  const jogos = data?.itens || [];
  const totalPages = data?.totalDePaginas || 1;
  const [modalOpen, setModalOpen] = React.useState(false);
  const [steamModalOpen, setSteamModalOpen] = React.useState(false);
  const [steamModalMsg, setSteamModalMsg] = React.useState('');
  const { addGame, isLoading: isAdding } = useAddGame();

  return (
    <div className={styles['add-games-container']}>
      <div className={styles['header-row']}>
        <h2>Adicionar Jogos</h2>
        <button
          className={styles['add-btn-icon']}
          title="Adicionar novo jogo"
          onClick={() => setModalOpen(true)}
        >
          +
        </button>
      </div>
      {loading ? (
        <p>Carregando jogos...</p>
      ) : (
        <>
          <ul className={styles['games-list']}>
            {jogos.map(jogo => (
              <li key={jogo.id} className={styles['game-item']}>
                <span>{jogo.title}</span>
                <div className={styles['actions']}>
                  <button className={styles['edit-btn']} onClick={() => alert(`Editar jogo ${jogo.title}`)}>Editar</button>
                  <button className={styles['remove-btn']} onClick={() => alert(`Remover jogo ${jogo.title}`)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles['pagination']}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Próxima
            </button>
          </div>
        </>
      )}

      <AddGameModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={async game => {
          const result = await addGame(game);
          setSteamModalMsg(result.success ? `Jogo adicionado: ${game.title}` : result.message);
          setSteamModalOpen(true);
          setModalOpen(false);
        }}
        isLoading={isAdding}
      />

      <SteamModal
        isOpen={steamModalOpen}
        onClose={() => setSteamModalOpen(false)}
        message={steamModalMsg}
        type="success"
      />
    </div>
  );
};

export default AddGamesPage;
