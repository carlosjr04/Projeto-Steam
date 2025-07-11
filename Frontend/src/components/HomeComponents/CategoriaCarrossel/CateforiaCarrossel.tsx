import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "./style.module.css";
import CategoriaCard from "../CategoriaCard/CategoriaCard";
import { categorias } from "../../../Utils/categoriaData";

export default function CarouselCategory() {
  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < categorias.length; i += chunkSize) {
    slides.push(categorias.slice(i, i + chunkSize));
  }

  return (
    <div className={styles.container}>
      <div className={styles.related}>
        <p>Explorar por categoria</p>
      </div>

      <div
        id="carouselExampleIndicators"
        className={`carousel `}
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{backgroundColor:"transparent"}}>
          {slides.map((grupo, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "3rem",
                }}
              >
                {grupo.map((categoria) => (
                  <CategoriaCard
                    key={categoria.id}
                    title={categoria.title}
                    image={categoria.image}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className={`carousel-control-prev ${styles.carouselBtn}`}
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
          style={{left:"10rem"}}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className={`carousel-control-next ${styles.carouselBtn}`}
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
          style={{right:"10rem"}}
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
        <div style={{ position: "initial" }} className="carousel-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : undefined}
              aria-label={`Slide ${idx + 1}`}
              style={{
                width: "15px",
                height: "9px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                border: "none",
                transition: "background-color 0.3s ease",
                marginTop: "2rem",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
