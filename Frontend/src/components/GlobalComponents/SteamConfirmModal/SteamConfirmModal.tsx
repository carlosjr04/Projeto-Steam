import styles from "./style.module.css";

interface SteamConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function SteamConfirmModal({
  isOpen,
  title = "Confirmação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}: SteamConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          <button
            className={styles.confirm}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Aguarde..." : confirmText}
          </button>
          <button className={styles.cancel} onClick={onCancel} disabled={loading}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
