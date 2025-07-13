import React from 'react';
import styles from './style.module.css';
import { useCategories } from '../../../hooks/Categories/useCategories';
import type { Category } from '../../../types/Category';

// Definir a interface Category
interface CategoryNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ isOpen, onClose }) => {
  const { categories, isLoading, error } = useCategories();

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

      {isLoading && <p className={styles.loadingMessage}>Carregando categorias...</p>}

      {error && <p className={styles.errorMessage}>Erro ao carregar categorias: {error}</p>}

      {categories.length === 0 && !isLoading && (
        <p className={styles.noCategoriesMessage}>Nenhuma categoria encontrada.</p>
      )}

      {categories.length > 0 && (
        <div className={styles['category-columns']}>
          {categories.map((category: Category) => (
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

