import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import InstaleSteam from "../../components/AboutComponent/InstaleSteam/InstaleSteam";
import AcesseJogos from "../../components/AboutComponent/AcesseJogos/AcesseJogos";
import FooterAbout from "../../components/AboutComponent/FooterAbout/FooterAbout";

export default function About(){
    return(
        <div>
            <main className={style.main}>
                <InstaleSteam/>
                <AcesseJogos/>
                <FooterAbout/>
            </main>
        </div>
    )
}