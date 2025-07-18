
import { Link } from "react-router-dom";
import CarrosselHome from "../../components/HomeComponents/CarrosselHome/carrosselHome";
import CarrosselHomeSlide from "../../components/HomeComponents/CarrosselHomeSlide/CarrosselHomeSlide";
import CarouselCategory from "../../components/HomeComponents/CategoriaCarrossel/CategoriaCarrossel";
import CategoriaSlide from "../../components/HomeComponents/CategoriaSlide/CategoriaSlide";
import style from "./style.module.css";
import { useAuthStore } from "../../store/authStore";

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div>
      <CarrosselHome />
      <CarrosselHomeSlide />

      <div className="d-none d-lg-block">
        <CarouselCategory />
      </div>

      <CategoriaSlide />
      {!isAuthenticated && (
        <div className={style["login-footer"]}>
          <div className={style["login-div"]}>
            <p>Iniciar sessão para ver recomendações personalizadas</p>
            <Link className={style["button-login"]} to="/login">
              <span>Iniciar sessão</span>
            </Link>
            <p>
              Ou <Link to="/cadastro">registre-se</Link> na Steam
              gratuitamente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
