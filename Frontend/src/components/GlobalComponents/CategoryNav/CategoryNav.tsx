import React, { useState, useEffect } from 'react';
import styles from './style.module.css';

// Definir a interface Category
interface Category {
  id: number;
  nome: string;
  slug: string;
  image: string;
  title: string;
}

interface CategoryNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ isOpen, onClose }) => {
  // Dados de exemplo para usar enquanto o backend não está pronto ou para desenvolvimento
  const exampleCategories: Category[] = [
    { id: 1, nome: 'Ação', slug: 'acao', image: '', title: '' },
    { id: 2, nome: 'Aventura', slug: 'aventura', image: '', title: '' },
    { id: 3, nome: 'Casual', slug: 'casual', image: '', title: '' },
    { id: 4, nome: 'Estratégia', slug: 'estrategia', image: '', title: '' },
    { id: 5, nome: 'Indie', slug: 'indie', image: '', title: '' },
    { id: 6, nome: 'RPG', slug: 'rpg', image: '', title: '' },
    { id: 7, nome: 'Simulação', slug: 'simulacao', image: '', title: '' },
    { id: 8, nome: 'Esportes', slug: 'esportes', image: '', title: '' },
    { id: 9, nome: 'Corrida', slug: 'corrida', image: '', title: '' },
    { id: 10, nome: 'Multijogador', slug: 'multijogador', image: '', title: '' },
    { id: 11, nome: 'Single-player', slug: 'single-player', image: '', title: '' },
    { id: 12, nome: 'Puzzle', slug: 'puzzle', image: '', title: '' },
    { id: 13, nome: 'Terror', slug: 'terror', image: '', title: '' },
    { id: 14, nome: 'Mundo Aberto', slug: 'mundo-aberto', image: '', title: '' },
    { id: 15, nome: 'Ficção Científica', slug: 'ficcao-cientifica', image: '', title: '' },
    { id: 16, nome: 'Fantasia', slug: 'fantasia', image: '', title: '' },
    { id: 17, nome: 'Familiar', slug: 'familiar', image: '', title: '' },
    { id: 18, nome: 'Educativo', slug: 'educativo', image: '', title: '' },
    { id: 19, nome: 'VR', slug: 'vr', image: '', title: '' },
    { id: 20, nome: 'Metroidvania', slug: 'metroidvania', image: '', title: '' },
  ];

  const [categories, setCategories] = useState<Category[]>([]);
  // Não precisamos de loading ou error states se estivermos usando dados estáticos.
  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Em um cenário real, você faria o fetch aqui.
    // Para este exemplo, apenas definimos as categorias de exemplo.
    setCategories(exampleCategories);
    // setIsLoading(false);
  }, []); // Array de dependências vazio para rodar apenas uma vez

  if (!isOpen) {
    return null; // Não renderiza nada se o dropdown não estiver aberto
  }

  return (
    <div className={`${styles['category-nav-container']} ${styles.open}`}>
      <div className={styles['category-nav-content']}>
        <h3>Explorar Categorias</h3>
        <button className={styles['close-button']} onClick={onClose}>
          X
        </button>
      </div>
      {/* Removidos os estados de loading e erro, pois estamos usando dados estáticos */}
        
        {categories.length === 0 && (
          <p className={styles.noCategoriesMessage}>Nenhuma categoria encontrada.</p>
        )}

        {categories.length > 0 && (
          <div className={styles['category-columns']}>
            {categories.map((category) => (
              <div key={category.id} className={styles['category-item']}>
                <a href={`/category/${category.slug || category.nome.toLowerCase().replace(/ /g, '-')}`}>
                  {category.nome}
                </a>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default CategoryNav;

