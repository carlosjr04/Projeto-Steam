
import React from 'react';
import styles from './style.module.css';
import { usePaginatedGames } from '../../hooks/Games/usePaginatedGames';
import AddGameModal from '../../components/AddGameModal/AddGameModal';
import SteamModal from '../../components/GlobalComponents/SteamModal/SteamModal';
import SteamConfirmModal from '../../components/GlobalComponents/SteamConfirmModal/SteamConfirmModal';
import { useAddGame } from '../../hooks/Games/useAddGame';
import { useDeleteGame } from '../../hooks/Games/useDeleteGame';
import React from "react";
import styles from "./style.module.css";
import { usePaginatedGames } from "../../hooks/Games/usePaginatedGames";
import AddGameModal from "../../components/AddGameModal/AddGameModal";
import { useAddGame } from "../../hooks/Games/useAddGame";
import type { Game } from "../../types/Game";
import { useGetGameId } from "../../hooks/Games/useGetGameId";
import EditModal from "../../components/JogoComponents/JogoEditModal/editModal";

const PAGE_SIZE = 4;

const AddGamesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [gameToDelete, setGameToDelete] = React.useState<number | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState("");
  const [modalType, setModalType] = React.useState<
    "success" | "error" | "neutral"
  >("success");

  const { data, loading, refetch } = usePaginatedGames(
    currentPage - 1,
    PAGE_SIZE
  );
  const jogos = data?.itens || [];
  const totalPages = data?.totalDePaginas || 1;

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [gameToEdit, setGameToEdit] = React.useState<Game | null>(null);

  const [steamModalOpen, setSteamModalOpen] = React.useState(false);
  const [steamModalMsg, setSteamModalMsg] = React.useState('');
  const [steamModalType, setSteamModalType] = React.useState<'success' | 'error' | 'neutral'>('success');

  const { data, loading, refetch } = usePaginatedGames(currentPage - 1, PAGE_SIZE);
  const jogos = data?.itens || [];
  const totalPages = data?.totalDePaginas || 1;
  const [steamModalMsg, setSteamModalMsg] = React.useState("");
  const { addGame, isLoading: isAdding } = useAddGame();
  const { deleteGame, loading: deleting } = useDeleteGame();


const handleEdit = (gameId: number) => {
  const jogoTemp = jogos.find((jogo) => jogo.id === gameId);
  if (jogoTemp) {    
    setGameToEdit(jogoTemp);
    setEditModalOpen(true);
  }
};

  const handleSaveEdit = async (updatedGame: Game) => {
    // Aqui você pode chamar a função de update no backend
    // await updateGame(updatedGame);
    setEditModalOpen(false);
    setGameToEdit(null);
    refetch(); // Atualiza a lista após editar
  };
  const handleAskDelete = (id: number) => {
    setGameToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (gameToDelete !== null) {
      try {
        await deleteGame(gameToDelete);
        setSteamModalMsg('Jogo removido com sucesso!');
        setSteamModalType('success');
        setSteamModalOpen(true);
        refetch();
      } catch {
        setSteamModalMsg('Erro ao remover jogo.');
        setSteamModalType('error');
        setSteamModalOpen(true);
      }
      setConfirmOpen(false);
      setGameToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setGameToDelete(null);
  };

  return (
    <div className={styles["add-games-container"]}>
      <SteamModal
        isOpen={steamModalOpen}
        onClose={() => setSteamModalOpen(false)}
        message={steamModalMsg}
        type={steamModalType}
      />
      <SteamConfirmModal
        isOpen={confirmOpen}
        title="Remover jogo"
        message="Tem certeza que deseja remover este jogo?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleting}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        game={gameToEdit as Game}
        onSave={handleSaveEdit}
      />
      <div className={styles["header-row"]}>
        <h2>Adicionar Jogos</h2>
        <button
          className={styles["add-btn-icon"]}
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
          <ul className={styles["games-list"]}>
            {jogos.map((jogo) => (
              <li key={jogo.id} className={styles["game-item"]}>
                <span>{jogo.title}</span>
                <div className={styles["actions"]}>
                  <button
                    className={styles["edit-btn"]}
                    onClick={() => handleEdit(jogo.id)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles["remove-btn"]}
                    disabled={deleting}
                    onClick={() => handleAskDelete(jogo.id)}
                  >
                    {deleting ? "Removendo..." : "Remover"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles["pagination"]}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
          console.log(game)
        onAdd={async (game) => {
          const result = await addGame(game);
          setSteamModalMsg(result.success ? `Jogo adicionado: ${game.title}` : result.message);
          setSteamModalType(result.success ? 'success' : 'error');
          setSteamModalMsg(
            result.success ? `Jogo adicionado: ${game.title}` : result.message
          );
          setSteamModalOpen(true);
          setModalOpen(false);
          if (result.success) refetch();
        }}
        isLoading={isAdding}
      />


    </div>
  );
};

export default AddGamesPage;
