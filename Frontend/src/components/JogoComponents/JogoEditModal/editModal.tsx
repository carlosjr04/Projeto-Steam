import { useEffect, useState } from "react";
import { useCategories } from "../../../hooks/Categories/useCategories";
import style from "./style.module.css";
import type { Game, GameUser } from "../../../types/Game";
import { useEditGame } from "../../../hooks/Games/useEditGame";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameUser;
  onSave: (updatedGame: Game) => void;
}

export default function EditModal({
  isOpen,
  onClose,
  game,
  onSave,
}: EditModalProps) {
  const { categories, isLoading } = useCategories();
  const { editGame, loading, error } = useEditGame();
  const [editedGame, setEditedGame] = useState<GameUser>(
    game ?? ({} as GameUser)
  );

  useEffect(() => {
    if (isOpen && game) setEditedGame(game);
  }, [isOpen, game]);

  const handleChange = (field: keyof GameUser, value: any) => {
    setEditedGame((prev) => ({ ...prev, [field]: value }));
  };

  // Adiciona/remover elementos de arrays de string
  const handleArrayChange = (
    field: keyof GameUser,
    value: string,
    action: "add" | "remove"
  ) => {
    setEditedGame((prev) => {
      const arr = Array.isArray(prev[field])
        ? [...(prev[field] as string[])]
        : [];
      if (action === "add" && value && !arr.includes(value)) arr.push(value);
      if (action === "remove")
        return { ...prev, [field]: arr.filter((v) => v !== value) };
      return { ...prev, [field]: arr };
    });
  };

  // Atualiza categorias
  const handleCategoryToggle = (category: (typeof categories)[0]) => {
    setEditedGame((prev) => {
      const exists = prev.categories.some((c) => c.id === category.id);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c.id !== category.id)
          : [...prev.categories, category],
      };
    });
  };

  const handleSave = async () => {
    // Lista dos campos válidos que o backend aceita
    const validFields = [
      'title', 'about', 'avaliacao', 'categories', 'classificacao', 
      'classificacaoEtaria', 'compatibilidade', 'cover', 'dataLancamento', 
      'desconto', 'descricao', 'desenvolvedora', 'exemplo', 'generos', 
      'idiomaPrincipal', 'idiomas', 'languages', 'plataforma', 'preco', 
      'publicadora', 'scenes'
    ];

    // Filtra apenas os campos válidos e que foram realmente editados
    const updatedFields: Partial<GameUser> = {};
    
    for (const field of validFields) {
      const key = field as keyof GameUser;
      if (editedGame[key] !== undefined && editedGame[key] !== game[key]) {
        updatedFields[key] = editedGame[key] as any;
      }
    }

    try {
      console.log('Campos que serão enviados:', updatedFields);
      await editGame(game.id, updatedFields);
      onSave({ ...game, ...updatedFields } as Game);
      onClose();
    } catch (e) {
      // Erro já tratado pelo hook
    }
  };

  if (!isOpen || !game) return null;

  return (
    <div className={style.overlay}>
      {game ? (
        <div className={style.modal}>
          <h2>Editar Jogo</h2>
          <div className={style.form}>
            <label>
              Título:
              <input
                value={editedGame.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </label>
            <label>
              Sobre:
              <textarea
                value={editedGame.about}
                onChange={(e) => handleChange("about", e.target.value)}
              />
            </label>
            <label>
              Publicadora:
              <textarea
                value={editedGame.publicadora ?? ""}
                onChange={(e) => handleChange("publicadora", e.target.value)}
              />
            </label>
            <label>
              Plataforma:
              <textarea
                value={editedGame.plataforma ?? ""}
                onChange={(e) => handleChange("plataforma", e.target.value)}
              />
            </label>
            <label>
              Idioma Principal:
              <textarea
                value={editedGame.idiomaPrincipal ?? ""}
                onChange={(e) => handleChange("idiomaPrincipal", e.target.value)}
              />
            </label>
            
            <label>
              Preço:
              <input
                type="number"
                step="0.01"
                value={Number(editedGame.preco).toFixed(2)}
                onChange={(e) => handleChange("preco", Number(e.target.value))}
              />
            </label>
            
            <label>
              Desconto (%):
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={editedGame.desconto ?? 0}
                onChange={(e) => handleChange("desconto", Number(e.target.value))}
              />
            </label>
            
            <label>
              Avaliação (0-10):
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={editedGame.avaliacao ?? 0}
                onChange={(e) => handleChange("avaliacao", Number(e.target.value))}
              />
            </label>
            
            <label>
              Data de Lançamento:
              <input
                type="date"
                value={editedGame.dataLancamento ? new Date(editedGame.dataLancamento).toISOString().split('T')[0] : ""}
                onChange={(e) => handleChange("dataLancamento", e.target.value)}
              />
            </label>
            
            <label>
              Idioma(s):
              <textarea
                value={editedGame.idiomas ? editedGame.idiomas.join(', ') : ""}
                onChange={(e) => handleChange("idiomas", e.target.value.split(',').map(s => s.trim()))}
                placeholder="Ex: Português, Inglês, Espanhol"
              />
            </label>
            
            <label>
              Descrição:
              <textarea
                rows={4}
                value={editedGame.descricao ?? ""}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />
            </label>
            
            <label>
              Capa (URL):
              <input
                type="url"
                value={editedGame.cover ?? ""}
                onChange={(e) => handleChange("cover", e.target.value)}
                placeholder="https://exemplo.com/capa.jpg"
              />
            </label>
            <label>
              Desenvolvedora:
              <input
                value={editedGame.desenvolvedora}
                onChange={(e) => handleChange("desenvolvedora", e.target.value)}
              />
            </label>
            <label>
              Classificação Etária:
              <input
                value={editedGame.classificacaoEtaria || ""}
                onChange={(e) =>
                  handleChange("classificacaoEtaria", e.target.value)
                }
              />
            </label>
            <label>
              Categorias:
              {isLoading ? (
                <span>Carregando...</span>
              ) : (
                <div className={style.categoriesGrid}>
                  {Array.from({ length: Math.ceil(categories.length / 4) }).map(
                    (_, rowIdx) => (
                      <div key={rowIdx} className={style.categoriesRow}>
                        {categories
                          .slice(rowIdx * 4, rowIdx * 4 + 4)
                          .map((cat) => (
                            <label key={cat.id} className={style.categoryItem}>
                              <input
                                type="checkbox"
                                checked={
                                  Array.isArray(editedGame.categories) &&
                                  editedGame.categories.some(
                                    (c) => c.id === cat.id
                                  )
                                }
                                onChange={() => handleCategoryToggle(cat)}
                              />
                              {cat.nome}
                            </label>
                          ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </label>
            <label>
              Classificação:
              <div>
                {(editedGame.classificacao ?? []).map((item, idx) => (
                  <span key={idx} className={style.arrayItem}>
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayChange("classificacao", item, "remove")
                      }
                    >
                      x
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Adicionar"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleArrayChange(
                        "classificacao",
                        e.currentTarget.value,
                        "add"
                      );
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </label>
            
            <label>
              Cenas (URLs das imagens):
              <div>
                {(editedGame.scenes ?? []).map((item, idx) => (
                  <span key={idx} className={style.arrayItem}>
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayChange("scenes", item, "remove")
                      }
                    >
                      x
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="URL da imagem"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleArrayChange(
                        "scenes",
                        e.currentTarget.value,
                        "add"
                      );
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </label>
            
            <label>
              Exemplos:
              <div>
                {(editedGame.exemplo ?? []).map((item, idx) => (
                  <span key={idx} className={style.arrayItem}>
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayChange("exemplo", item, "remove")
                      }
                    >
                      x
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Adicionar exemplo"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleArrayChange(
                        "exemplo",
                        e.currentTarget.value,
                        "add"
                      );
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </label>
            
            <label>
              Compatibilidade:
              <div>
                {(editedGame.compatibilidade ?? []).map((item, idx) => (
                  <span key={idx} className={style.arrayItem}>
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayChange("compatibilidade", item, "remove")
                      }
                    >
                      x
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Ex: Controle de Xbox"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleArrayChange(
                        "compatibilidade",
                        e.currentTarget.value,
                        "add"
                      );
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </label>
            
            <label>
              Gêneros:
              <div>
                {(editedGame.generos ?? []).map((item, idx) => (
                  <span key={idx} className={style.arrayItem}>
                    {item}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayChange("generos", item, "remove")
                      }
                    >
                      x
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Ex: Ação, Aventura"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleArrayChange(
                        "generos",
                        e.currentTarget.value,
                        "add"
                      );
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </label>
            
            {/* Repita para outros arrays de string conforme necessário */}
          </div>
          <div className={style.actions}>
            <button onClick={handleSave} className={style.botao} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button onClick={onClose} className={style.botao}>Cancelar</button>
            {error && <div className={style.error}>{error}</div>}
          </div>
        </div>
      ) : null}
    </div>
  );
}
