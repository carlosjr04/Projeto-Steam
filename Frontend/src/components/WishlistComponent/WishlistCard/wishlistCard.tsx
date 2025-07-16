import { useGetGameId } from "../../../hooks/Games/useGetGameId";
import { useCarrinhoStore } from "../../../store/useCarrinhoStore";
import style from "./style.module.css";
import type { Category } from "../../../types/Category";
import { Link } from "react-router-dom";
import { useRemoveWishlistItem } from '../../../hooks/Wishlist/useRemoveWishlistItem';
import React from 'react';
import SteamConfirmModal from '../../GlobalComponents/SteamConfirmModal/SteamConfirmModal';

interface Props {
  id: number;
  cover: string;
  name: string;
  preco: number;
  desconto: number;
  dataLancamento: string;
  listedAt: string;
  categories: Category[];
  wishlistId?: number;
  onRemove?: () => void;
}

export default function WishlistCard(wishlist: Props) {
  const { game } = useGetGameId(wishlist.id);
  const adicionarJogo = useCarrinhoStore((state) => state.adicionar);
  const { mutate: removeWishlistItem, isPending: isRemoving } = useRemoveWishlistItem();

  const [modalCompra, setModalCompra] = React.useState(false);
  const [modalRemover, setModalRemover] = React.useState(false);

  function calcularPrecoComDesconto(preco: number, desconto: number): string {
    if (preco == 0) {
      return "Gratuito";
    }
    const valorComDesconto = preco - (preco * desconto) / 100;
    return `R$${valorComDesconto.toFixed(2)}`;
  }

  return (
    <div className={style.container}>
      <div className={style.cover}>
        <img src={wishlist.cover} alt="" />
      </div>
      <div className={style.infos}>
        <h1 className={style.name}>{wishlist.name}</h1>
        <div className={style.dados}>
          <div className={style.DadosEsquerda}>
            <p className={style.dataLancamento}>
              Análises em geral: <span style={{ color: "#66c0f4" }}>Muito positivas</span>
            </p>
            <p className={style.dataLancamento}>
              DATA DE LANÇAMENTO: {wishlist.dataLancamento}
            </p>
          </div>
          <div className={style.DadosDireita}>
            <div className={style.preco}>
              {wishlist.desconto > 0 ? (
                <div className={style.preco}>
                  <div className={style.descontoVerde}>
                    -{wishlist.desconto}%
                  </div>
                  <div className={style.descontoPrecos}>
                    <p className={style.precoDesconto}>
                      {`R$${wishlist.preco.toFixed(2)}`}
                    </p>
                    <h1 className={style.precoValor}>
                      {calcularPrecoComDesconto(wishlist.preco, wishlist.desconto)}
                    </h1>
                  </div>
                </div>
              ) : (
                <h1 className={style.precoValor}>
                  {calcularPrecoComDesconto(wishlist.preco, wishlist.desconto)}
                </h1>
              )}
              <button
                className={style.carrinho}
                onClick={() => setModalCompra(true)}
              >
                + Carrinho
              </button>
            </div>
          </div>
        </div>
        <img className={style.plataforma} src="/window_carrinho.png" alt="" />
        <div className={style.footer}>
          <div className={style.categorias}>
            {wishlist.categories.map((categoria) => (
              <Link
                to={`/category/${categoria.slug || categoria.nome.toLowerCase().replace(/ /g, '-')}`}
                className={style["botao-genero"]}
              >
                {categoria.nome}
              </Link>
            ))}
          </div>
          <button
            className={style.remover}
            disabled={isRemoving}
            onClick={() => setModalRemover(true)}
          >
            {isRemoving ? 'Removendo...' : 'REMOVER'}
          </button>
        </div>
      </div>
      <SteamConfirmModal
        isOpen={modalCompra}
        title="Confirmar compra"
        message="Deseja realizar a compra?"
        confirmText="Comprar"
        cancelText="Cancelar"
        onConfirm={() => {
          adicionarJogo(game);
          setModalCompra(false);
        }}
        onCancel={() => setModalCompra(false)}
      />
      <SteamConfirmModal
        isOpen={modalRemover}
        title="Remover da wishlist"
        message="Deseja remover este item da wishlist?"
        confirmText="Remover"
        cancelText="Cancelar"
        loading={isRemoving}
        onConfirm={() => {
          if (!wishlist.wishlistId) return;
          removeWishlistItem(wishlist.wishlistId, {
            onSuccess: () => {
              if (wishlist.onRemove) wishlist.onRemove();
            },
          });
          setModalRemover(false);
        }}
        onCancel={() => setModalRemover(false)}
      />
    </div>
  );
}
