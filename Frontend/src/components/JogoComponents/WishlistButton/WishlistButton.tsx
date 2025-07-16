import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthStore } from "../../../store/authStore";
import { useWishlist } from "../../../hooks/User/useWishlist";
import { wishlistStore } from "../../../store/wishlistStore";
import SteamModal from '../../GlobalComponents/SteamModal/SteamModal';
import React from 'react';
import { useGetUserId } from "../../../hooks/User/useGetUser";


interface Props {
  id: number;
}

export default function WishlistButton(jogo: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.userId);
  const token = useAuthStore((state) => state.token);
  const adicionar = wishlistStore((state) => state.adicionar);
  // Tenta pegar a wishlist do Zustand, se existir
  const { user } = useGetUserId();
  const { mutateAsync: adicionarWishlist } = useWishlist(userId ?? undefined);

  const [modal, setModal] = React.useState<{ open: boolean; type: 'success' | 'error' | 'neutral'; message: string }>({ open: false, type: 'success', message: '' });

  const jaNaWishlist = user?.wishlist?.some((item) => Number(item.game.id) === Number(jogo.id)) ?? false;


  const handleWishlist = async () => {
    if (!userId || !token || !isAuthenticated) {
      setModal({ open: true, type: 'error', message: 'Você deve estar logado.' });
      return;
    }
    if (jaNaWishlist) {
      setModal({ open: true, type: 'neutral', message: 'Este jogo já está na sua wishlist.' });
      return;
    }
    try {
      await adicionarWishlist({
        Wishlist: {
          userId: userId,
          gameId: jogo.id,
          priority: 1,
          listedAt: new Date().toISOString().substring(0, 10)
        },
        token,
      });
      setModal({ open: true, type: 'success', message: 'Adicionado à wishlist com sucesso!' });
      adicionar();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setModal({ open: true, type: 'neutral', message: 'Este jogo já está na sua wishlist.' });
      } else {
        setModal({ open: true, type: 'error', message: 'Erro ao adicionar à wishlist.' });
      }
    }
  };

  return (
    <>
      <button
        onClick={handleWishlist}
        className={jaNaWishlist ? `${style.botao} ${style.botaoAtivo}` : style.botao}
        disabled={jaNaWishlist}
        style={jaNaWishlist ? { backgroundColor: '#5ca3d6', color: '#fff' } : {}}
      >
        {jaNaWishlist ? <><span style={{ marginRight: 6, display: 'inline-flex', verticalAlign: 'middle', marginTop: '-2px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="4" fill="#5ca3d6"/>
            <path d="M6 10.5L9 13.5L14 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span> Adicionado</> : '+ Lista de desejo'}
      </button>
      <SteamModal
        isOpen={modal.open}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        type={modal.type}
        message={modal.message}
        title={'Wishlist'}
      />
    </>
  );
}
