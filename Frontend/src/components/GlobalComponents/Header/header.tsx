import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './style.module.css'
import { Link } from 'react-router-dom'
import { useCarrinhoStore } from '../../../store/useCarrinhoStore'

export default function Header() {
  const numJogos = useCarrinhoStore((state) => state.numJogos)
  return (
    <header className={styles.header}>
      <nav className={`navbar navbar-dark navbar-expand-md d-flex justify-content-start justify-content-md-center ${styles['home-header-nav']}`}>
        <div className={`d-flex justify-content-flex-start ${styles['brand-hamburguer']}`}>
          <Link to="/" className={`navbar-brand order-2 order-md-1 ${styles.brand}`}>
            <img src="/header_steam.png" style={{ height: 48 }} alt="Steam" />
          </Link>

          <button
            className="navbar-toggler order-1 order-md-2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#menuModal"
            aria-label="Botão de navegação"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse order-2">
          <div className={`navbar-nav mr-auto d-flex align-items-center ${styles['div-header-nav']}`}>
            <div className="dropdown">
              <a
                className={`dropdown-toggle fw-bolder fs-5 nav-link nav-item ${styles.store} ${styles['header-text']}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Loja
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><Link className="dropdown-item" to="/inConstrution">Home</Link></li>
                <li><Link className="dropdown-item" to="/inConstrution">Discovery Queue</Link></li>
                <li><Link className="dropdown-item" to="/WISHLIST">Wishlist</Link></li>
              </ul>
            </div>

            <Link to="/inConstrution" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Comunidade</Link>
            <Link to="/about" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Sobre</Link>
            <Link to="/inConstrution" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Suporte</Link>
          </div>
        </div>

        <div
          className={`modal fade ${styles['modal-header-home']}`}
          id="menuModal"
          tabIndex={-1}
          aria-labelledby="menuModalLabel"
          aria-hidden="true"
        >
          <div className={`modal-dialog ${styles['modal-header-home']} position-absolute top-0 start-0`}>
            <div className={styles['modal-content']}>
              <div className={styles["main-content-modal"]}>
                <div className={styles["modal-header"]}>
                  <h5 style={{textAlign:"start"}} className="modal-title" id="menuModalLabel">Iniciar sessão</h5>
                </div>
                <div className={styles["modal-body"]}>
                  <ul className={styles["list-unstyled"]}>
                    <li>
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle text-decoration-none"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Loja
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                          <li><Link className="dropdown-item" to="/inConstrution">Home</Link></li>
                          <li><Link className="dropdown-item" to="/inConstrution">Discovery Queue</Link></li>
                          <li><Link className="dropdown-item" to="/inConstrution">Wishlist</Link></li>
                        </ul>
                      </div>
                    </li>
                    <li><Link to="/inConstrution" className="text-decoration-none">Comunidade</Link></li>
                    <li><Link to="/carrinho" className="text-decoration-none">{`Carrinho(${numJogos})`}</Link></li>
                    <li><Link to="/about" className="text-decoration-none">Sobre</Link></li>
                    <li><Link to="/inConstrution" className="text-decoration-none">Suporte</Link></li>
                    <li>
                      <Link to="/inConstrution" className="text-decoration-none">Alterar idioma</Link>
                      <Link to="/inConstrution" className="text-decoration-none">Baixe o aplicativo móvel</Link>
                      <Link to="/inConstrution" className="text-decoration-none">Ver versão para computadores</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles['footer-modal-home']}>
                © Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
                <span>
                  <a href="https://store.steampowered.com/privacy_agreement/?snr=1_4_4__global-responsive-menu" target="_blank" rel="noreferrer">Privacy Policy</a>
                  &nbsp;|&nbsp;
                  <a href="http://www.valvesoftware.com/legal.htm" target="_blank" rel="noreferrer">Legal</a>
                  &nbsp;|&nbsp;
                  <a href="https://store.steampowered.com/subscriber_agreement/?snr=1_4_4__global-responsive-menu" target="_blank" rel="noreferrer">Steam Subscriber Agreement</a>
                  &nbsp;|&nbsp;
                  <a href="https://store.steampowered.com/steam_refunds/?snr=1_4_4__global-responsive-menu" target="_blank" rel="noreferrer">Refunds</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}