import  { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./style.module.css";
import CategoriaCard from "../CategoriaCard/CategoriaCard";

import type { Category } from "../../../types/Category";
import { useCategories } from "../../../hooks/Categories/useCategories";

export default function CategoriaSlide() {
  const [slides, setSlides] = useState<Category[]>([]);
  const { categories } = useCategories();
  useEffect(() => setSlides(categories), [categories]);

  return (
    <div className={`container ${styles["container"]}`}>
      <div className={`${styles["category-div-md"]} pb-4`}>
        {slides.map((categoria) => (
          <CategoriaCard
            key={categoria.id}
            title={categoria.title}
            image={categoria.image}
            slug={categoria.slug}
            nome={categoria.nome}
          />
        ))}
      </div>
    </div>
  );
}
