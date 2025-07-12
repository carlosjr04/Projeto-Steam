import React from 'react';
import styles from './style.module.css';
import JogoCard from '../../components/JogoCard/JogoCard';
import type { Jogo } from '../../types/Jogo';

const CategoryPage: React.FC = () => {
  // Dados estáticos para exibição dos cards

  // Exemplo de dados estáticos
  const jogos: Jogo[] = [
    {
      id: '1',
      title: 'Destiny 2',
      price: 0,
      cover: 'https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1085660/capsule_616x353.jpg?t=1751994224',
      desconto: 0,
      DataLancamento: new Date('2017-08-28'),
      compatibilidade: ['Windows', 'Mac'],
      idiomas: [],
      scenes: [
        'https://video.fastly.steamstatic.com//store_trailers/steam/apps/1085660/718096/c8a667f1fae46a878f5202c183a79ceaefe35657/1750614754/microtrailer.mp4',
        'https://shared.fastly.steamstatic.com//store_item_assets/steam/apps/1085660/ss_7fcc82f468fcf8278c7ffa95cebf949bfc6845fc.jpg?t=1751994224'
      ],
      about: 'Destiny 2 é um MMO de ação com um mundo único em evolução, que se pode jogar a qualquer hora e em qualquer lugar com os amigos, inteiramente de graça.',
      desenvolvedora: 'Bungie',
      classificacao: ['Ação', 'Aventura', 'Gratuito para Jogar', 'MMORPG'],
      categorias: ['Multijogador', 'Mundo Aberto'],
      descricao: 'Jogo de tiro em primeira pessoa com elementos de RPG.',
      exemplo: [],
      conquista: [],
    },
    {
      id: '2',
      title: 'Hollow Knight',
      price: 49.99,
      cover: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg',
      desconto: 20,
      DataLancamento: new Date('2017-02-24'),
      compatibilidade: ['Windows', 'Mac', 'Linux'],
      idiomas: [],
      scenes: [
        'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_7e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpg',
      ],
      about: 'Explore cavernas, enfrente criaturas e descubra mistérios em Hallownest.',
      desenvolvedora: 'Team Cherry',
      classificacao: ['Ação', 'Aventura', 'Indie'],
      categorias: ['Metroidvania', 'Exploração'],
      descricao: 'Jogo de plataforma e ação com mundo aberto.',
      exemplo: [],
      conquista: [],
    },
  ];
  const categoryName = 'Exemplo de Categoria';

  return (
    <div className={styles['category-page-container']}>
      <header className={styles['category-header']}>
        <div className={styles['category-header-bg']} />
        <div className={styles['category-header-content']}>
          <h1 className={styles['category-title']}>{categoryName}</h1>
          <p className={styles['category-description']}>Explore os melhores jogos desta categoria na Steam.</p>
        </div>
      </header>

      <main className={styles['category-main']}>
        <div className={styles['games-grid']}>
          {jogos.map(jogo => (
            <JogoCard key={jogo.id} jogo={jogo} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;