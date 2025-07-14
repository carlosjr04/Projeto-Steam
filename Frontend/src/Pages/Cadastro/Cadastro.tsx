import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import Header from "../../components/GlobalComponents/Header/header";
import Footer from "../../components/GlobalComponents/Footer/footer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/User/useLogin";
import { useCadastrarUsuario } from "../../hooks/User/useCadastro";

type FormData = {
  email: string;
  password: string;
  username: string;
  age: number;
  genre: string;
  name: string;
  role: "CLIENTE";
};

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const { cadastrar, isLoading } = useCadastrarUsuario();

  const onSubmit = (data: FormData) => {
  // Adiciona o campo fixo role
  const dataComRole = { ...data, role: "CLIENTE" };

  console.log("Dados enviados:", dataComRole); // agora incluirá "role"

  cadastrar(dataComRole, {
    onSuccess: () => {
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    },
    onError: () => {
      alert("Erro ao cadastrar usuário.");
    },
  });
};
  return (
    <div>
      <Header />
      <main className={style.main}>
        <div className={style["main-login"]}>
          <p className={style["login-txt"]}>Cadastre-se</p>

          <div className={style["login-form"]}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`mb-3 ${style["inputs"]}`}>
                <label
                  htmlFor="inputUsername"
                  className={`form-label ${style["username-label"]}`}
                >
                  Email
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
              <div className={`mb-3 ${style["inputs"]}`}>
                <label
                  htmlFor="inputPassword"
                  className={`form-label ${style["password-label"]}`}
                >
                  Nome
                </label>
                <input
                  type="name"
                  className={style["form-control"]}
                  id="name"
                  placeholder=""
                  {...register("name", {
                    required: "Nome é obrigatório",
                  })}
                />
                {errors.name && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div className={`mb-3 ${style["inputs"]}`}>
                <label
                  htmlFor="inputPassword"
                  className={`form-label ${style["password-label"]}`}
                >
                  Username
                </label>
                <input
                  type="username"
                  className={style["form-control"]}
                  id="username"
                  placeholder=""
                  {...register("username", {
                    required: "username é obrigatório",
                  })}
                />
                {errors.username && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.username.message}
                  </div>
                )}
              </div>
              <div className={`mb-3 ${style["inputs"]}`}>
                <label
                  htmlFor="inputPassword"
                  className={`form-label ${style["password-label"]}`}
                >
                  Idade
                </label>
                <input
                  type="number"
                  className={style["form-control"]}
                  id="age"
                  placeholder=""
                  {...register("age", {
                    required: "idade é obrigatório",
                    valueAsNumber: true, // 👈 ESSA LINHA FAZ TODA A DIFERENÇA
                  })}
                />
                {errors.age && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.age.message}
                  </div>
                )}
              </div>
              <div className={`mb-3 ${style["inputs"]}`}>
                <label
                  htmlFor="genre"
                  className={`form-label ${style["password-label"]}`}
                >
                  Gênero
                </label>
                <select
                  id="genre"
                  className={`${style["form-control"]} form-select`}
                  {...register("genre", { required: "Gênero é obrigatório" })}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.genre && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    {errors.genre.message}
                  </div>
                )}
              </div>

              <div className={`mb-5 ${style["form-submit-button"]}`}>
                <button
                  className={style["submit-button"]}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar-se"}
                </button>
              </div>
            </form>
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
      </main>
    </div>
  );
}
