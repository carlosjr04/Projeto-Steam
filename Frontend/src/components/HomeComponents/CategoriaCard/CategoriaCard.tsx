import { useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import { Link } from "react-router-dom";

interface CategoriaCardProps {
  title: string;
  image: string;
  slug:string;
  nome:string
}
const imagensAleatorias = [
  
  "horror.webp",
  "science_fiction.webp",
  "survival.webp",
  "puzzle.webp",
  "adventure.webp",
  "casual.webp",
  "rogue_like_rogue_lite.webp",
  "action.webp",
];
export default function CategoriaCard({ title, image, slug }: CategoriaCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    card.style.backgroundPosition = `${percentX}% ${percentY}%`;
  }
  const getImagemAleatoria = () => {
    const index = Math.floor(Math.random() * imagensAleatorias.length);
    return `/${imagensAleatorias[index]}`;
  };
  function resetBackground() {
    const card = cardRef.current;
    if (card) card.style.backgroundPosition = "center";
  }
  
  return (
    <Link
      ref={cardRef}
      to={`/category/${slug }`}
      className={style.categories}
      style={{
        backgroundImage: `url(${
          image && image.trim() !== "" ? image : getImagemAleatoria()
        })`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetBackground}
    >
      <div className={style["label_div"]}>
        <p className={style.label}>{title}</p>
      </div>
      <div className={style.gradient}></div>
    </Link>
  );
}
