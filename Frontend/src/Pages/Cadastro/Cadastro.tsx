import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import Header from "../../components/GlobalComponents/Header/header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCadastrarUsuario } from "../../hooks/User/useCadastro";
import SteamModal from "../../components/GlobalComponents/SteamModal/SteamModal";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
  username: string;
  age: number;
  genre: string;
  name: string;
  role: "CLIENTE";
};

type ModalType = 'success' | 'error' | 'neutral';

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const { cadastrar, isLoading } = useCadastrarUsuario();
  const [modal, setModal] = useState<{ open: boolean; type: ModalType; message: string }>({ open: false, type: 'success', message: '' });

  const onSubmit = (data: FormData) => {
    const dataComRole = { ...data, role: "CLIENTE" };
    cadastrar(dataComRole, {
      onSuccess: () => {
        setModal({ open: true, type: 'success', message: 'Cadastro realizado com sucesso!' });
        setTimeout(() => {
          setModal({ ...modal, open: false });
          navigate("/login");
        }, 1800);
      },
      onError: (error: unknown) => {
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).response?.status === 409
        ) {
          setModal({ open: true, type: 'neutral', message: 'Já existe usuário com mesmo email registrado' });
        } else {
          setModal({ open: true, type: 'error', message: 'Erro ao cadastrar usuário.' });
        }
      },
    });
  };
  return (
    <div>
      <Header />
      <main className={style.main}>
        <SteamModal
          isOpen={modal.open}
          onClose={() => setModal({ ...modal, open: false })}
          title={
            modal.type === 'success'
              ? 'Cadastro realizado'
              : modal.type === 'neutral'
                ? 'Atenção'
                : 'Erro ao cadastrar'
          }
          message={modal.message}
          type={modal.type}
        />
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
                    valueAsNumber: true, 
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isLoading ? '#1b2838' : undefined,
                    filter: isLoading ? 'brightness(0.85)' : undefined,
                    cursor: isLoading ? 'not-allowed' : undefined,
                  }}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: 8 }}></span>
                  ) : null}
                  {isLoading ? '' : 'Cadastrar-se'}
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
