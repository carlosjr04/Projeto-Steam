import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import Header from "../../components/GlobalComponents/Header/header";
import Footer from "../../components/GlobalComponents/Footer/footer";

export default function InConstrution() {
  return (
    <div>
        <Header/>
        <div className={style.main}>
            
          <div className={style["in_construction"]}>
            <p>Em</p>
            <p>breve</p>
          </div>
          <div className={`${style["spinner-grow"]} spinner-grow text-light" text-light`} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer/>
    </div>
  );
}
