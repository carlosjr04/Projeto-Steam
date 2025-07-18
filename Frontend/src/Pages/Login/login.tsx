import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import Header from "../../components/GlobalComponents/Header/header";
import Footer from "../../components/GlobalComponents/Footer/footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/User/useLogin";
import SteamModal from "../../components/GlobalComponents/SteamModal/SteamModal";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const [showError, setShowError] = useState(false);

  const aoEnviar = (dados: { email: string; password: string }) => {
    login(dados, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        setShowError(true);
        console.error(error);
      },
    });
  };
  return (
    <div>
      <Header />
      <main className={style.main}>
        <SteamModal
          isOpen={showError}
          onClose={() => setShowError(false)}
          title="Erro ao entrar"
          message="E-mail ou senha inválidos."
          type="error"
        />
        <div className={style["main-login"]}>
          <p className={style["login-txt"]}>Iniciar sessão</p>

          <div className={style["login-form"]}>
            <form onSubmit={handleSubmit(aoEnviar)}>
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
                  {...register("email", { required: "Email é obrigatório" })}
                />
                {errors.email && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.email.message}
                  </div>
                )}
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
                  {...register("password", { required: "Senha é obrigatória" })}
                />
                {errors.password && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label
                  className={style["form-check-label"]}
                  htmlFor="rememberMe"
                >
                  Lembre-me
                </label>
              </div>

              <div className={`mb-5 ${style["form-submit-button"]}`}>
                <button
                  className={style["submit-button"]}
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Entrando..." : "Iniciar sessão"}
                </button>
              </div>
            </form>

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
              <Link to="/cadastro" className={style["register_button"]}>
                <span>Cadastrar-se</span>
              </Link>
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
          <Footer />
        </div>
      </main>
    </div>
  );
}
