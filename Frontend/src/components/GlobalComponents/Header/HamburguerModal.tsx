import { useAuthStore } from '../../../store/authStore';
import styles from './HamburguerModal.module.css';
import { Link } from 'react-router-dom';

interface HamburguerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  userName?: string;
  numJogos: number;
  handleLogout: () => void;
}

export default function HamburguerModal({
  isOpen,
  onClose,
  isAuthenticated,
  userName,
  numJogos,
  handleLogout,
}: HamburguerModalProps) {
  if (!isOpen) return null;
    const cargo = useAuthStore((state)=>state.cargo)
  
  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{
          zIndex: 100,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'auto',
        }}
        onClick={onClose}
      />
      <div
        className={`modal d-block ${styles['modal-header-home']}`}
        tabIndex={-1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          margin: 0,
          zIndex: 200,
          pointerEvents: 'none',
        }}
      >
        <div
          className={`modal-dialog`}
          style={{
            width: '250px',
            margin: 0,
            zIndex: 201,
            pointerEvents: 'auto',
          }}
        >
          <div
            className={styles['modal-content']}
            style={{ position: 'relative', zIndex: 202 }}
            onClick={e => e.stopPropagation()}
          >
            <button type="button" className="btn-close position-absolute end-0 m-2" aria-label="Fechar" onClick={onClose} style={{ zIndex: 300 }} />
            <div className={styles["main-content-modal"]}>
              <div className={styles["modal-header"]}>
                {isAuthenticated ? (
                  <Link
                    to="/biblioteca"
                    className="modal-title text-decoration-none h5"
                    id="menuModalLabel"
                    style={{ textAlign: "start", color: 'rgb(189, 189, 189)', marginLeft: '4px', fontWeight: '200', fontSize: '1.5rem' }}
                    onClick={onClose}
                  >
                    {userName || 'Minha Biblioteca'}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="modal-title text-decoration-none h5"
                    id="menuModalLabel"
                    style={{ textAlign: "start", color: 'rgb(189, 189, 189)', marginLeft: '4px', fontWeight: '200', fontSize: '1.5rem' }}
                    onClick={onClose}
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
                        <li><Link className="dropdown-item" to="/">Home</Link></li>
                        <li><Link className="dropdown-item" to="/inConstrution">Discovery Queue</Link></li>
                        <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>
                      </ul>
                    </div>
                  </li>
                  <li><Link to="/inConstrution" className="text-decoration-none">Comunidade</Link></li>
                  <li><Link to="/carrinho" className="text-decoration-none">{`Carrinho(${numJogos})`}</Link></li>
                  <li><Link to="/about" className="text-decoration-none">Sobre</Link></li>
                  <li><Link to="/inConstrution" className="text-decoration-none">Suporte</Link></li>
                  {cargo=="ADMIN"?<li><Link to="/admin/jogo" className="text-decoration-none">Administrador</Link></li>:null}
                  {isAuthenticated && (
                    <li>
                      <a
                        href="#"
                        className="text-decoration-none"
                        onClick={e => { e.preventDefault(); handleLogout(); }}
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
    </>
  );
}
