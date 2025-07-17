import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import styles from './style.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useCarrinhoStore } from '../../../store/useCarrinhoStore'
import { useAuthStore } from '../../../store/authStore'
import { useGetUserId } from '../../../hooks/User/useGetUser';


export default function Header() {
  const numJogos = useCarrinhoStore((state) => state.numJogos)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useGetUserId();

  function handleLogout() {
    logout();
    navigate('/');
    setMenuOpen(false);
  }

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav className={`navbar navbar-dark navbar-expand-lg d-flex justify-content-between align-items-center ${styles['home-header-nav']}`}> 
        <div className={`d-flex justify-content-flex-start ${styles['brand-hamburguer']}`}> 
          <Link to="/" className={`navbar-brand order-2 order-lg-1 ${styles.brand}`}>
            <img src="/header_steam.png" style={{ height: 48 }} alt="Steam" />
          </Link>

          <button
            className="navbar-toggler order-1 order-lg-2"
            type="button"
            aria-label="Botão de navegação"
            onClick={openMenu}
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
                <li><Link className="dropdown-item" to="/">Home</Link></li>
                <li><Link className="dropdown-item" to="/inConstrution">Discovery Queue</Link></li>
                <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>
              </ul>
            </div>
            <Link to="/biblioteca" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Biblioteca</Link>

            <Link to="/inConstrution" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Comunidade</Link>
            <Link to="/about" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Sobre</Link>
            <Link to="/inConstrution" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Suporte</Link>
            {isAuthenticated && (
              <button
                className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}
                style={{ height: 40 }}
                onClick={handleLogout}
                type="button"
              >
                Sair
              </button>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className={`modal-backdrop fade show ${styles['modal-header-home']}`} style={{zIndex: 1040}} onClick={closeMenu} />
        )}
        {menuOpen && (
          <div className={`modal d-block ${styles['modal-header-home']}`} tabIndex={-1} style={{zIndex: 1050}}>
            <div className={`modal-dialog ${styles['modal-header-home']} position-absolute top-0 start-0`}>
              <div className={styles['modal-content']} onClick={e => e.stopPropagation()} style={{position: 'relative'}}>
                <button type="button" className="btn-close position-absolute end-0 m-2" aria-label="Fechar" onClick={closeMenu} style={{zIndex: 10}} />
                <div className={styles["main-content-modal"]}>
                  <div className={styles["modal-header"]}>
                    {isAuthenticated ? (
                      <Link
                        to="/biblioteca"
                        className="modal-title text-decoration-none h5"
                        id="menuModalLabel"
                        style={{ textAlign: "start", color: 'rgb(189, 189, 189)', marginLeft: '4px', fontWeight: '200', fontSize: '1.5rem' }}
                        onClick={closeMenu}
                      >
                        {user?.name ? user.name : 'Minha Biblioteca'}
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="modal-title text-decoration-none h5"
                        id="menuModalLabel"
                        style={{ textAlign: "start", color: 'rgb(189, 189, 189)', marginLeft: '4px', fontWeight: '200', fontSize: '1.5rem' }}
                        onClick={closeMenu}
                      >
                        Iniciar sessão
                      </Link>
                    )}
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
                            onClick={e => e.preventDefault()}
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
                      {isAuthenticated && (
                        <li>
                          <a
                            href="#"
                            className="text-decoration-none"
                            onClick={e => { e.preventDefault(); e.stopPropagation(); handleLogout(); }}
                            style={{ textAlign: 'left', cursor: 'pointer', color: '#fff' }}
                          >
                            Sair
                          </a>
                        </li>
                      )}
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
        )}
      </nav>
    </header>
  )
}