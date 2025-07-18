import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './style.module.css';
import type { GameCreatePayload } from '../../types/GameCreatePayload';
import type { Category } from '../../types/Category';
import { useLanguages } from '../../hooks/Languages/useLanguages';
import { useCategories } from '../../hooks/Categories/useCategories';
import { MultiSelectDropdown } from '../MultiSelectDropdown/MultiSelectDropdown';
import SteamModal from '../GlobalComponents/SteamModal/SteamModal';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (game: GameCreatePayload) => Promise<void>;
  isLoading?: boolean;
}

const COMPATIBILIDADE_OPCOES = [
  'Um jogador',
  'Conquistas Steam',
  'Cooperativo on-line',
  'Multijogador multiplataforma',
  'Cartas Colecionáveis Steam',
  'Compras em aplicativo',
  'Compatibilidade em família',
  'Nuvem Steam',
];

const steps = [
  'Dados principais',
  'Listas e IDs',
  'Descrição e mídias',
];

const gameSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  preco: z.number().min(0, 'Preço deve ser maior ou igual a 0'),
  cover: z.url('URL da capa inválida'),
  desconto: z.number().min(0).max(100).optional(),
  desenvolvedora: z.string().min(1, 'Desenvolvedora é obrigatória'),
  dataLancamento: z.coerce.date().min(1, 'Data de lançamento é obrigatória'),
  about: z.string(),
  classificacao: z
    .union([
      z.string(),
      z.array(z.string())
    ])
    .transform((val) =>
      Array.isArray(val)
        ? val.map((s) => String(s).trim()).filter(Boolean)
        : String(val).split(',').map((s) => s.trim()).filter(Boolean)
    )
    .refine((arr) => arr.length > 0, 'Classificação deve conter pelo menos 1 elemento'),
  idiomas: z.array(z.number()).min(1, 'Selecione pelo menos um idioma'),
  categories: z.array(z.number()).min(1, 'Selecione pelo menos uma categoria'),
  compatibilidade: z.array(z.string()).min(1, 'Selecione pelo menos uma compatibilidade'),
  descricao: z.string().min(1),
  scenes: z
    .union([
      z.string(),
      z.array(z.string())
    ])
    .transform((val) =>
      Array.isArray(val)
        ? val.map((s) => String(s).trim()).filter(Boolean)
        : String(val).split(',').map((s) => s.trim()).filter(Boolean)
    )
    .refine((arr) => arr.length === 4, 'Cenas devem conter exatamente 4 elementos'),
  exemplo: z
    .union([
      z.string(),
      z.array(z.string())
    ])
    .transform((val) =>
      Array.isArray(val)
        ? val.map((s) => String(s).trim()).filter(Boolean)
        : String(val).split(',').map((s) => s.trim()).filter(Boolean)
    )
    .refine((arr) => arr.length >= 6, 'Exemplo deve conter exatamente 6 elementos'),
});

const AddGameModal: React.FC<AddGameModalProps> = ({ isOpen, onClose, onAdd, isLoading }) => {
  const [step, setStep] = useState(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: '',
      preco: 0,
      cover: '',
      desconto: 0,
      desenvolvedora: '',
      dataLancamento: '',
      about: '',
      classificacao: '',
      idiomas: [],
      categories: [],
      compatibilidade: [],
      descricao: '',
      scenes: '',
      exemplo: '',
    },
  });
  const { categories: categorias = [] } = useCategories() || {};
  const idiomas = useLanguages();

  // Ajustar o mapeamento de idiomas para garantir compatibilidade total com MultiSelectOption
  const idiomasOptions = idiomas.map((idioma) => ({
    id: idioma.id,
    nome: idioma.nome,
    lingua: idioma.lingua || '',
    interfaceDisponivel: idioma.interfaceDisponivel ? 'true' : 'false',
    dublagem: idioma.dublagem ? 'true' : 'false',
    legenda: idioma.legenda ? 'true' : 'false',
  }));

  // Ajustar tipos explicitamente para garantir compatibilidade
  const selectedIdiomas = Array.isArray(watch('idiomas'))
    ? watch('idiomas').flat().filter((id): id is number => typeof id === 'number')
    : [];

  const selectedCategorias = Array.isArray(watch('categories'))
    ? watch('categories').flat().filter((id): id is number => typeof id === 'number')
    : [];

  const selectedCompatibilidades = Array.isArray(watch('compatibilidade'))
    ? (watch('compatibilidade') ?? []).flat().filter((c): c is string => typeof c === 'string')
    : [];


  // Schemas por passo
  const stepSchemas = [
    z.object({
      title: gameSchema.shape.title,
      preco: gameSchema.shape.preco,
      cover: gameSchema.shape.cover,
      desenvolvedora: gameSchema.shape.desenvolvedora,
      dataLancamento: gameSchema.shape.dataLancamento,
    }),
    z.object({
      classificacao: gameSchema.shape.classificacao,
      idiomas: gameSchema.shape.idiomas,
      categories: gameSchema.shape.categories,
      compatibilidade: gameSchema.shape.compatibilidade,
    }),
    z.object({
      descricao: gameSchema.shape.descricao,
      scenes: gameSchema.shape.scenes,
      exemplo: gameSchema.shape.exemplo,
    }),
  ];

  // Validação por passo usando o schema Zod
  const validateStep = async (step: number, data: Record<string, unknown>): Promise<boolean> => {
    try {
      await stepSchemas[step].parseAsync(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setModalMessage('Ocorreu um erro de validação');
      }
      return false;
    }
  };


  const nextStep = async () => {
    const currentData = watch();
    const isValid = await validateStep(step, currentData);
    if (isValid) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

    const prevStep = () => setStep((s) => Math.max(s - 1, 0));


  const onSubmit = async (data: Record<string, unknown>) => {
    // Valida todos os campos do schema completo antes de enviar
    try {
      await gameSchema.parseAsync(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setModalMessage(error.issues[0]?.message || 'Erro de validação');
      }
      return;
    }

    const payload: GameCreatePayload = {
      title: String(data.title).trim(),
      preco: parseFloat(String(data.preco)),
      cover: String(data.cover).trim(),
      desconto: Number(data.desconto) || 0,
      desenvolvedora: String(data.desenvolvedora).trim(),
      classificacao: data.classificacao
        ? String(data.classificacao)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      idiomas: Array.isArray(data.idiomas)
        ? data.idiomas.map((id) => Number(id))
        : [],
      compatibilidade: Array.isArray(data.compatibilidade)
        ? data.compatibilidade.map((c) => String(c))
        : [],
      dataLancamento: data.dataLancamento as string,
      categories: Array.isArray(data.categories)
        ? data.categories.map((id) => Number(id))
        : [],
      about: String(data.about).trim(),
      descricao: String(data.descricao).trim(),
      scenes: Array.isArray(data.scenes)
        ? data.scenes
        : data.scenes
        ? String(data.scenes)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      exemplo: Array.isArray(data.exemplo)
        ? data.exemplo
        : data.exemplo
        ? String(data.exemplo)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };

    await onAdd(payload);
    reset();
    setStep(0);
  };

  if (!isOpen) return null;

  return (
    <>
      <SteamModal
        isOpen={!!modalMessage}
        onClose={() => setModalMessage(null)}
        message={modalMessage || ''}
        type="neutral"
      />
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h3 className={styles.title}>Adicionar Novo Jogo</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 0 && (
              <>
                {errors.title && <span className={styles.error}>{errors.title.message}</span>}
                <input type="text" placeholder="Título do jogo" {...register('title', { required: true })} className={styles.input} disabled={isLoading} />

                {errors.preco && <span className={styles.error}>{errors.preco.message}</span>}
                <input type="number" placeholder="Preço" {...register('preco', { required: true, valueAsNumber: true })} className={styles.input} disabled={isLoading} min="0" step="0.01" />

                {errors.cover && <span className={styles.error}>{errors.cover.message}</span>}
                <input type="text" placeholder="URL da capa (cover)" {...register('cover', { required: true })} className={styles.input} disabled={isLoading} />

                {errors.desconto && <span className={styles.error}>{errors.desconto.message}</span>}
                <input type="number" placeholder="Desconto (%)" {...register('desconto', { valueAsNumber: true })} className={styles.input} disabled={isLoading} min="0" max="100" />

                {errors.desenvolvedora && <span className={styles.error}>{errors.desenvolvedora.message}</span>}
                <input type="text" placeholder="Desenvolvedora" {...register('desenvolvedora', { required: true })} className={styles.input} disabled={isLoading} />

                {errors.dataLancamento && <span className={styles.error}>{errors.dataLancamento.message}</span>}
                <input type="date" placeholder="Data de Lançamento" {...register('dataLancamento', { required: true })} className={styles.input} disabled={isLoading} />

                <input type="text" placeholder="Sobre (about)" {...register('about')} className={styles.input} disabled={isLoading} />
              </>
            )}
            {step === 1 && (
              <div className={styles.stepOne}>
                {errors.classificacao && <span className={styles.error}>{errors.classificacao.message}</span>}
                <input type="text" placeholder="Classificação (separar por vírgula)" {...register('classificacao')} className={styles.inputClass} disabled={isLoading} />
                
                {errors.idiomas && <span className={styles.error}>{errors.idiomas.message}</span>}
                <div className={styles.inputDiv}>
                  <label className={styles.label}>Idiomas:</label>
                  <MultiSelectDropdown
                    options={idiomasOptions}
                    selected={selectedIdiomas}
                    onChange={(values) => setValue('idiomas', values.filter((v): v is number => typeof v === 'number'))}
                    labelKey="nome"
                    valueKey="id"
                    placeholder="Selecione os idiomas"
                    disabled={isLoading}
                  />
                </div>
                
                {errors.categories && <span className={styles.error}>{errors.categories.message}</span>}
                <div className={styles.inputDiv}>
                  <label className={styles.label}>Categorias:</label>
                  <MultiSelectDropdown
                    options={categorias as Category[]}
                    selected={selectedCategorias}
                    onChange={(values) => setValue('categories', values.filter((v): v is number => typeof v === 'number'))}
                    labelKey="nome"
                    valueKey="id"
                    placeholder="Selecione as categorias"
                    disabled={isLoading}
                  />
                </div>

                {errors.compatibilidade && <span className={styles.error}>{errors.compatibilidade.message}</span>}
                <div className={styles.inputDiv}>
                  <label className={styles.label}>Compatibilidade:</label>
                  <MultiSelectDropdown
                    options={COMPATIBILIDADE_OPCOES.map((opt) => ({ id: opt, nome: opt }))}
                    selected={selectedCompatibilidades}
                    onChange={(values) => setValue('compatibilidade', values.filter((v): v is string => typeof v === 'string'))}
                    labelKey="nome"
                    valueKey="id"
                    placeholder="Selecione as compatibilidades"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <>
                {errors.descricao && <span className={styles.error}>{errors.descricao.message}</span>}
                <textarea placeholder="Descrição longa" {...register('descricao')} className={styles.input} disabled={isLoading} />

                {errors.scenes && <span className={styles.error}>{errors.scenes.message}</span>}
                <input type="text" placeholder="Scenes (URLs separadas por vírgula)" {...register('scenes')} className={styles.input} disabled={isLoading} />

                {errors.exemplo && <span className={styles.error}>{errors.exemplo.message}</span>}
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
    </>
  );
};

export default AddGameModal;
