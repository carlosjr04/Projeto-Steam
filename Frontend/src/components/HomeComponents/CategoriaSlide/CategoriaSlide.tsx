import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "./style.module.css"; // ou "CategoryGrid.module.css"
import CategoriaCard from "../CategoriaCard/CategoriaCard"; // reutiliza o mesmo

// Supondo que você vá importar essas categorias de forma centralizada
import { categorias } from "../../../Utils/categoriaData";

export default function CategoriaSlide() {
  return (
    <div className="container">
        <div className={`${styles["category-div-md"]} pb-4`}>
          {categorias.map((categoria) => (
            <CategoriaCard
              key={categoria.id}
              title={categoria.title}
              image={categoria.image}
            />
          ))}
        </div>
    </div>
  );
}