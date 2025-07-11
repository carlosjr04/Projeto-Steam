import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import Header from "../../components/GlobalComponents/Header/header";
import Footer from "../../components/GlobalComponents/Footer/footer";

export default function Login() {
  return (
    <div>
      <Header />
      <main className={style.main}>
        <div className={style["main-login"]}>
          <p className={style["login-txt"]}>Iniciar sessão</p>

          <div className={style["login-form"]}>
            <div className={`mb-3 ${style["inputs"]}`}>
              <label
                htmlFor="inputUsername"
                className={`form-label ${style["username-label"]}`}
              >
                Iniciar sessão com o nome de usuário
              </label>
              <input
                className={style["form-control"]}
                id="inputUsername"
                placeholder=""
              />
              <div id="usernameError" className="invalid-feedback"></div>
            </div>

            <div className={`mb-3 ${style["inputs"]}`}>
              <label
                htmlFor="inputPassword"
                className={`form-label ${style["password-label"]}`}
              >
                Senha
              </label>
              <input
                type="password"
                className={style["form-control"]}
                id="inputPassword"
                placeholder=""
              />
              <div id="passwordError" className="invalid-feedback"></div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className={style["form-check-label"]} htmlFor="rememberMe">
                Lembre-me
              </label>
            </div>

            <div className={`mb-5 ${style["form-submit-button"]}`}>
              <button className={style["submit-button"]} type="submit">
                Iniciar sessão
              </button>
            </div>

            <a className={style["not-able-to-autenticate"]} href="#">
              Não consigo iniciar a sessão
            </a>
          </div>
        </div>

        <aside>
          <div
            className="modal fade"
            id="loginProgressModal"
            tabIndex={-1}
            aria-labelledby="loginProgressModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="loginProgressModalLabel">
                    Processando Login
                  </h5>
                </div>
                <div className="modal-body">
                  <p>Aguarde enquanto processamos seu login...</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "0%" }}
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className={style.footer}>
            <div className={style["login_footer_row"]}>
              <div className={style["login_main_row"]}>
                <div className={style["headline"]}>Primeira vez no Steam?</div>
                <a href="#" className={style["register_button"]}>
                  <span>Cadastrar-se</span>
                </a>
              </div>
            
              <div className={style["login_aside_row"]}>
                <div className={style["subtext"]}>
                  É gratuito e fácil. Descubra milhares de jogos para jogar com
                  milhões de novos amigos.
                  <a
                    className={`${style["login_join_desc"]} ${style["about_link"]}`}
                    href="./about.html"
                  >
                    Saiba mais sobre o Steam
                  </a>
                </div>
              </div>
            </div>
            <Footer/>
        </div>
      </main>
    </div>
  );
}
