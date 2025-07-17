

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';
import type { GameCreatePayload } from '../../types/GameCreatePayload';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (game: GameCreatePayload) => void;
  isLoading?: boolean;
}



const steps = [
  'Dados principais',
  'Listas e IDs',
  'Descrição e mídias',
];

const AddGameModal: React.FC<AddGameModalProps> = ({ isOpen, onClose, onAdd, isLoading }) => {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: Record<string, any>) => {
    // Monta o payload conforme GameCreatePayload
    const payload: GameCreatePayload = {
      title: data.title.trim(),
      preco: parseFloat(data.preco),
      cover: data.cover.trim(),
      desconto: Number(data.desconto) || 0,
      desenvolvedora: data.desenvolvedora.trim(),
      classificacao: data.classificacao ? data.classificacao.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      idiomas: data.idiomas ? data.idiomas.split(',').map((s: string) => Number(s.trim())).filter((n: number) => !isNaN(n)) : [],
      compatibilidade: data.compatibilidade ? data.compatibilidade.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      dataLancamento: data.dataLancamento,
      categories: data.categories ? data.categories.split(',').map((s: string) => Number(s.trim())).filter((n: number) => !isNaN(n)) : [],
      about: data.about.trim(),
      descricao: data.descricao.trim(),
      scenes: data.scenes ? data.scenes.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      exemplo: data.exemplo ? data.exemplo.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    };
    onAdd(payload);
    reset();
    setStep(0);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Adicionar Novo Jogo</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <>
              <input type="text" placeholder="Título do jogo" {...register('title', { required: true })} className={styles.input} disabled={isLoading} />
              <input type="number" placeholder="Preço" {...register('preco', { required: true })} className={styles.input} disabled={isLoading} min="0" step="0.01" />
              <input type="text" placeholder="URL da capa (cover)" {...register('cover', { required: true })} className={styles.input} disabled={isLoading} />
              <input type="number" placeholder="Desconto (%)" {...register('desconto')} className={styles.input} disabled={isLoading} min="0" max="100" />
              <input type="text" placeholder="Desenvolvedora" {...register('desenvolvedora', { required: true })} className={styles.input} disabled={isLoading} />
              <input type="date" placeholder="Data de Lançamento" {...register('dataLancamento', { required: true })} className={styles.input} disabled={isLoading} />
              <input type="text" placeholder="Sobre (about)" {...register('about')} className={styles.input} disabled={isLoading} />
            </>
          )}
          {step === 1 && (
            <>
              <input type="text" placeholder="Classificação (separar por vírgula)" {...register('classificacao')} className={styles.input} disabled={isLoading} />
              <input type="text" placeholder="Idiomas (IDs separados por vírgula)" {...register('idiomas')} className={styles.input} disabled={isLoading} />
              <input type="text" placeholder="Compatibilidade (separar por vírgula)" {...register('compatibilidade')} className={styles.input} disabled={isLoading} />
              <input type="text" placeholder="Categorias (IDs separados por vírgula)" {...register('categories')} className={styles.input} disabled={isLoading} />
            </>
          )}
          {step === 2 && (
            <>
              <textarea placeholder="Descrição longa" {...register('descricao')} className={styles.input} disabled={isLoading} />
              <input type="text" placeholder="Scenes (URLs separadas por vírgula)" {...register('scenes')} className={styles.input} disabled={isLoading} />
              <input type="text" placeholder="Exemplo (URLs separadas por vírgula)" {...register('exemplo')} className={styles.input} disabled={isLoading} />
            </>
          )}
          <div className={styles.actions}>
            {step > 0 && (
              <button type="button" className={styles.cancelBtn} onClick={prevStep} disabled={isLoading}>
                Voltar
              </button>
            )}
            {step < steps.length - 1 && (
              <button type="button" className={styles.addBtn} onClick={nextStep} disabled={isLoading}>
                Próximo
              </button>
            )}
            {step === steps.length - 1 && (
              <button type="submit" className={styles.addBtn} disabled={isLoading}>
                {isLoading ? 'Adicionando...' : 'Adicionar'}
              </button>
            )}
            <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGameModal;
