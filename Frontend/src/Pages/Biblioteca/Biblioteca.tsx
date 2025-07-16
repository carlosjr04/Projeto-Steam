import { useEffect, useState } from "react";
import { useGetUserId } from "../../hooks/User/useGetUser";
import style from "./style.module.css"
import type { OwnedGameRequest } from "../../types/OwnedGame";
import BibliotecaGame from "../../components/BibliotecaComponents/BibliotecaGame";

export default function Biblioteca(){
    const [games, setWishlist] = useState<OwnedGameRequest[]>();
      const { user } = useGetUserId();
    
    
      useEffect(() => {
        if (user?.ownedGames) {
          console.log(user)
          setWishlist(user.ownedGames);
        }
      }, [user]);
    return(
        <div style={{marginBottom:"3rem"}}>
      <h1 className={style.titulo}>LISTA DE JOGOS DE {user?.name}</h1>
      <div className={style.jogos}>
         {games
          ? games.map((game) => (
        <BibliotecaGame
        id={game.game.id}
        categories={game.game.categories}
        cover={game.game.cover}
        dataLancamento={game.game.dataLancamento}
        desconto={game.game.desconto}
        boughtAt={game.boughtAt}
        name={game.game.title}
        preco={game.price}
                
        />
         ))
          : null} 
      </div>
    </div>
    )
}