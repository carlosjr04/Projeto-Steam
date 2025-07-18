package com.devweb.backendsteam.service;

import com.devweb.backendsteam.dto.GameCreateDTO;
import com.devweb.backendsteam.exception.CategoryNotFoundException;
import com.devweb.backendsteam.exception.GameNaoEncontradoException;
import com.devweb.backendsteam.exception.LanguageNotFoundException;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.Language;
import com.devweb.backendsteam.model.Category;
import com.devweb.backendsteam.repository.GameRepository;
import com.devweb.backendsteam.repository.LanguageRepository;
import com.devweb.backendsteam.repository.CategoryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GameService {

	@Autowired private GameRepository gameRepository;
	@Autowired private LanguageRepository languageRepository;
	@Autowired private CategoryRepository categoryRepository;

	public List<Game> recuperarGames() {
		return gameRepository.recuperarGamesComCategory();
	}

	public Game cadastrarGame(Game game) {
		return gameRepository.save(game);
	}

	@Transactional
	public Game alterarGame(Game game) {
		gameRepository
			.recuperarGamePorIdComLock(game.getId())
			.orElseThrow(
				() ->
					new GameNaoEncontradoException("Game número " + game.getId() + " não encontrado."));
		return gameRepository.save(game);
	}

	@Transactional(rollbackFor = Exception.class)
	public void removerGame(long id) {
		gameRepository.deleteById(id);
	}

	public Game recuperarGamePorId(long id) {
		return gameRepository
			.recuperarGamePorId(id)
			.orElseThrow(
				() -> new GameNaoEncontradoException("Game número " + id + " não encontrado."));
	}

	public Page<Game> recuperarGamesComPaginacao(Pageable pageable, String nome, String slugCategory) {
		String filtro = (nome == null || nome.isBlank()) ? "%" : "%" + nome + "%";
		if (slugCategory == null || slugCategory.isBlank()) {
			return gameRepository.recuperarGamesComPaginacao(pageable, filtro);
		} else {
			return gameRepository.recuperarGamesComPaginacaoPorCategoria(pageable, filtro, slugCategory);
		}
	}

	public List<Game> recuperarGamesPorSlugCategory(String slugCategory) {
		return gameRepository.recuperarGamesPorSlugCategory(slugCategory);
	}

	public Game cadastrarGameComDTO(GameCreateDTO dto) {
		Game game = new Game();
		game.setTitle(dto.title);
		game.setPreco(dto.preco);
		game.setCover(dto.cover);
		game.setDesconto(dto.desconto);
		game.setDesenvolvedora(dto.desenvolvedora);
		game.setClassificacao(dto.classificacao);
		game.setCompatibilidade(dto.compatibilidade);
		game.setDataLancamento(dto.dataLancamento);
		game.setAbout(dto.about);
		game.setDescricao(dto.descricao);
		game.setScenes(dto.scenes);
		game.setExemplo(dto.exemplo);
		// Idiomas
		List<Language> idiomas = languageRepository.findAllById(dto.idiomas);
		if (idiomas.size() != dto.idiomas.size()) {
			throw new LanguageNotFoundException("Um ou mais idiomas não encontrados.");
		}
		game.setIdiomas(new java.util.HashSet<>(idiomas));
		// Categorias
		List<Category> categorias = categoryRepository.findAllById(dto.categories);
		if (categorias.size() != dto.categories.size()) {
			throw new CategoryNotFoundException("Uma ou mais categorias não encontradas.");
		}
		game.setCategories(new java.util.HashSet<>(categorias));
		return gameRepository.save(game);
	}
}
