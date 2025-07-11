import { useRef } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from "./style.module.css"

interface CategoriaCardProps {
  
  title: string;
  image: string;
}

export default function CategoriaCard({ title, image }: CategoriaCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // posição X do mouse dentro do elemento
    const y = e.clientY - rect.top;  // posição Y do mouse dentro do elemento

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    card.style.backgroundPosition = `${percentX}% ${percentY}%`;
  }

  function resetBackground() {
    const card = cardRef.current;
    if (card) card.style.backgroundPosition = "center";
  }
  
    return (
    <a
      ref={cardRef}
      href="#"
      className={style.categories}
      style={{ backgroundImage: `url(${image})` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetBackground}
    >
      <div className={style['label_div']}>
        <p className={style.label}>{title}</p>
      </div>
      <div className={style.gradient}></div>
    </a>
  );
}