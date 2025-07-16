import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthStore } from "../../../store/authStore";
import { useWishlist } from "../../../hooks/User/useWishlist";
import { wishlistStore } from "../../../store/wishlistStore";
import SteamModal from '../../GlobalComponents/SteamModal/SteamModal';
import React from 'react';

interface Props {
  id: number;
}

export default function WishlistButton(jogo: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.userId);
  const token = useAuthStore((state) => state.token);
  const adicionar = wishlistStore((state)=>state.adicionar)
  const { mutateAsync: adicionarWishlist } = useWishlist(userId ?? undefined);

  const [modal, setModal] = React.useState<{ open: boolean; type: 'success' | 'error' | 'neutral'; message: string }>({ open: false, type: 'success', message: '' });

  const handleWishlist = async () => {
    if (!userId || !token || !isAuthenticated) {
      setModal({ open: true, type: 'error', message: 'Você deve estar logado.' });
      return;
    }
    try {
      await adicionarWishlist({
        Wishlist: {
          userId: userId,
          gameId: jogo.id,
          priority: 1,
          listedAt:new Date().toISOString().substring(0, 10)
        },
        token,
      });
      setModal({ open: true, type: 'success', message: 'Adicionado à wishlist com sucesso!' });
      adicionar();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Erro ao adicionar:', error);
      if (error?.response?.status === 409) {
        setModal({ open: true, type: 'neutral', message: 'Este jogo já está na sua wishlist.' });
      } else {
        setModal({ open: true, type: 'error', message: 'Erro ao adicionar à wishlist.' });
      }
    }
  };

  return (
    <>
      <button onClick={handleWishlist} className={style.botao}>
        + Lista de desejo
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
