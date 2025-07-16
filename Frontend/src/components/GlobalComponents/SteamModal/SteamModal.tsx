import React from 'react';
import styles from './style.module.css';

interface SteamModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'neutral';
}

const SteamModal: React.FC<SteamModalProps> = ({ isOpen, onClose, title, message, type = 'success' }) => {
  if (!isOpen) return null;

  let modalClass = styles.success;
  let defaultTitle = 'Sucesso';
  if (type === 'error') {
    modalClass = styles.error;
    defaultTitle = 'Erro';
  } else if (type === 'neutral') {
    modalClass = styles.neutral;
    defaultTitle = 'Aviso';
  }

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${modalClass}`}>
        <div className={styles.header}>
          <h2>{title || defaultTitle}</h2>
        </div>
        <div className={styles.body}>
          <p>{message}</p>
        </div>
        <div className={styles.footer}>
          <button className={styles.button} onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default SteamModal;
