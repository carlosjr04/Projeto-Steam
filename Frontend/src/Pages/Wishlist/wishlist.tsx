import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useGetUserId } from "../../hooks/User/useGetUser";
import type { WishlistGame } from "../../types/Wishlist";
import WishlistCard from "../../components/WishlistComponent/WishlistCard/wishlistCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistGame[]>();
  const { user } = useGetUserId();

  useEffect(() => {
    if (user?.wishlist) {
      setWishlist(user.wishlist);
    }
  }, [user]);
  

  return (
    <div style={{marginBottom:"3rem"}}>
      <h1 className={style.titulo}>LISTA DE DESEJOS DE {user?.name}</h1>
      <div className={style.jogos}>
        {wishlist
          ? wishlist.map((game) => (
              <WishlistCard
              id={game.game.id}
                categorias={game.game.categorias}
                cover={game.game.cover}
                dataLancamento={game.game.dataLancamento}
                desconto={game.game.desconto}
                listedAt={game.listedAt}
                name={game.game.title}
                preco={game.game.price}
              />
            ))
          : null}
      </div>
    </div>
  );
}
