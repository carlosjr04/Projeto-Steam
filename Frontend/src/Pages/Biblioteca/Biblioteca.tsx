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

    console.log(user?.ownedGames)
    return(
        <div style={{marginBottom:"3rem"}}>
      <h1 className={style.titulo}>Lista de jogos de {user?.name}</h1>
      <div className={style.jogos}>
        {games && games.length > 0 ? (
          games.map((game) => (
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
        ) : (
          <p style={{ textAlign: 'center', width: '100%', marginTop: '2rem', fontSize: '1.2rem', color: '#aaa' }}>
            <img src="/empty_library.png" alt="Biblioteca vazia" style={{ width: 120, marginBottom: 16, opacity: 0.7 }} />
            <br />
            Você não tem jogos na sua biblioteca.
          </p>
        )}
      </div>
    </div>
    )
}