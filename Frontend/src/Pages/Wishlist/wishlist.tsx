import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useGetUserId } from "../../hooks/User/useGetUser";
import type { WishlistGame } from "../../types/Wishlist";
import WishlistCard from "../../components/WishlistComponent/WishlistCard/wishlistCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistGame[]>();
  const { user, refetch } = useGetUserId();

  useEffect(() => {
    if (user?.wishlist) {
      setWishlist(user.wishlist);
    }
  }, [user]);

  const handleRemove = () => {
    refetch();
  };

  return (
    <div style={{ minHeight: "53.6vh", display: "flex", flexDirection: "column", marginBottom: 0 }}>
      <h1 className={style.titulo}>Lista de desejos de {user?.name}</h1>
      <div style={{ flex: 1 }} className={style.jogos}>
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((game) => (
            <WishlistCard
              id={game.game.id}
              categories={game.game.categories}
              cover={game.game.cover}
              dataLancamento={game.game.dataLancamento}
              desconto={game.game.desconto}
              listedAt={game.listedAt}
              name={game.game.title}
              preco={game.game.preco}
              wishlistId={game.id}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              marginTop: "2rem",
              color: "#888",
            }}
          >
            Nenhum jogo na sua lista de desejos.
          </div>
        )}
      </div>
      {/* O footer real da aplicação deve estar fora deste componente, mas se estiver aqui, ele ficará no final */}
    </div>
  );
}
