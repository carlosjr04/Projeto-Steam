import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import styles from './style.module.css'

import { Link, useNavigate } from 'react-router-dom'
import { useCarrinhoStore } from '../../../store/useCarrinhoStore'
import { useAuthStore } from '../../../store/authStore'
import { useGetUserId } from '../../../hooks/User/useGetUser';
import HamburguerModal from './HamburguerModal';


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
  const cargo = useAuthStore((state)=>state.cargo)
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
            {cargo=="ADMIN"?<Link to="/admin/jogo" className={`text-decoration-none text-light fw-bold fs-5 nav-link nav-item ${styles['header-text']}`}>Administrador</Link>:null}
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

      <HamburguerModal
        isOpen={menuOpen}
        onClose={closeMenu}
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        numJogos={numJogos}
        handleLogout={handleLogout}
      />
      </nav>
    </header>
  )
}