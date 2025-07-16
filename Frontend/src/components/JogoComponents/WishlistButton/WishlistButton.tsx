import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthStore } from "../../../store/authStore";
import { useWishlist } from "../../../hooks/User/useWishlist";
import { wishlistStore } from "../../../store/wishlistStore";

interface Props {
  id: number;
}

export default function WishlistButton(jogo: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.userId);
  const token = useAuthStore((state) => state.token);
  const adicionar = wishlistStore((state)=>state.adicionar)

  const { mutateAsync: adicionarWishlist } = useWishlist();

  const handleWishlist = async () => {
    if (!userId || !token) {
      alert("Você deve estar logado.");
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
      alert("Adicionado à wishlist com sucesso!");
      adicionar()
    } catch (error) {
      console.error("Erro ao adicionar:", error);
      alert("Erro ao adicionar à wishlist.");
    }
  };

  return (
    <button onClick={handleWishlist} className={style.botao}>
      + Lista de desejo
    </button>
  );
}
