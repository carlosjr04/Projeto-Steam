import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import CarrinhoCard from "../../components/CarrinhoComponent/CarrinhoCard/CarrinhoCard";
import ValorTotal from "../../components/CarrinhoComponent/ValorTotal/ValorTotal";
import React from 'react';
import SteamConfirmModal from '../../components/GlobalComponents/SteamConfirmModal/SteamConfirmModal';
import { useCarrinhoStore } from "../../store/useCarrinhoStore";
import { useGetUserId } from "../../hooks/User/useGetUser";

export default function Carrinho() {
  const jogos = useCarrinhoStore((state) => state.jogos);
  const [modalCompra, setModalCompra] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState<string | null>(null);
  const { user } = useGetUserId()
  const gameOwned = user?.ownedGames
  console.log(jogos)

  return (
    <div>
      <div className={style.background}></div>
      <div className={style.container}>
        <div className={style.jogos}>
          <h1 className={style.titulo}>Carrinho de compra</h1>
          {jogos.map((jogo, idx) => (
            <CarrinhoCard
              key={jogo.id + '-' + idx}
              id={jogo.id}
              cover={jogo.cover}
              desconto={jogo.desconto}
              preco={jogo.preco}
              title={jogo.title}
              index={idx}
              buyed={gameOwned?.find((game) => game.game.id == jogo.id) != null}
            />
          ))}
        </div>
        <ValorTotal
          onOpenCompra={() => setModalCompra(true)}
          onSetMsg={setModalMsg}
          setLoading={setLoading}
          loading={loading}
          modalCompra={modalCompra}
          setModalCompra={setModalCompra}
        />
      </div>
      <SteamConfirmModal
        isOpen={modalMsg !== null}
        title="Compra"
        message={modalMsg || ''}
        onConfirm={() => setModalMsg(null)}
        onCancel={() => setModalMsg(null)}
        singleButton={true}
        singleButtonText="OK"
      />
    </div>
  );
}
