package com.devweb.backendsteam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devweb.backendsteam.exception.GameNaoEncontradoException;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.repository.GameRepository;

@Service
public class GameService {

	@Autowired private GameRepository gameRepository;

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

	@Transactional
	public Game editarGame(long id, Game gameAtualizado) {
		Game gameExistente = gameRepository
			.recuperarGamePorIdComLock(id)
			.orElseThrow(
				() -> new GameNaoEncontradoException("Game número " + id + " não encontrado."));
		
		// Atualiza apenas os campos que não são nulos/vazios
		if (gameAtualizado.getTitle() != null && !gameAtualizado.getTitle().isBlank()) {
			gameExistente.setTitle(gameAtualizado.getTitle());
		}
		if (gameAtualizado.getDesenvolvedora() != null && !gameAtualizado.getDesenvolvedora().isBlank()) {
			gameExistente.setDesenvolvedora(gameAtualizado.getDesenvolvedora());
		}
		if (gameAtualizado.getPublicadora() != null && !gameAtualizado.getPublicadora().isBlank()) {
			gameExistente.setPublicadora(gameAtualizado.getPublicadora());
		}
		if (gameAtualizado.getPlataforma() != null && !gameAtualizado.getPlataforma().isBlank()) {
			gameExistente.setPlataforma(gameAtualizado.getPlataforma());
		}
		if (gameAtualizado.getDataLancamento() != null) {
			gameExistente.setDataLancamento(gameAtualizado.getDataLancamento());
		}
		if (gameAtualizado.getPreco() != null) {
			gameExistente.setPreco(gameAtualizado.getPreco());
		}
		if (gameAtualizado.getAvaliacao() != 0.0) {
			gameExistente.setAvaliacao(gameAtualizado.getAvaliacao());
		}
		if (gameAtualizado.getDescricao() != null && !gameAtualizado.getDescricao().isBlank()) {
			gameExistente.setDescricao(gameAtualizado.getDescricao());
		}
		if (gameAtualizado.getAbout() != null && !gameAtualizado.getAbout().isBlank()) {
			gameExistente.setAbout(gameAtualizado.getAbout());
		}
		if (gameAtualizado.getClassificacaoEtaria() != null && !gameAtualizado.getClassificacaoEtaria().isBlank()) {
			gameExistente.setClassificacaoEtaria(gameAtualizado.getClassificacaoEtaria());
		}
		if (gameAtualizado.getIdioma() != null && !gameAtualizado.getIdioma().isBlank()) {
			gameExistente.setIdioma(gameAtualizado.getIdioma());
		}
		if (gameAtualizado.getIdiomaPrincipal() != null && !gameAtualizado.getIdiomaPrincipal().isBlank()) {
			gameExistente.setIdiomaPrincipal(gameAtualizado.getIdiomaPrincipal());
		}
		if (gameAtualizado.getImage() != null && !gameAtualizado.getImage().isBlank()) {
			gameExistente.setImage(gameAtualizado.getImage());
		}
		if (gameAtualizado.getCover() != null && !gameAtualizado.getCover().isBlank()) {
			gameExistente.setCover(gameAtualizado.getCover());
		}
		if (gameAtualizado.getDesconto() != 0.0) {
			gameExistente.setDesconto(gameAtualizado.getDesconto());
		}
		// Atualiza boolean independente do valor
		gameExistente.setMultiplayer(gameAtualizado.isMultiplayer());
		
		// Atualiza listas apenas se não forem nulas ou vazias
		if (gameAtualizado.getScenes() != null && !gameAtualizado.getScenes().isEmpty()) {
			gameExistente.setScenes(gameAtualizado.getScenes());
		}
		if (gameAtualizado.getExemplo() != null && !gameAtualizado.getExemplo().isEmpty()) {
			gameExistente.setExemplo(gameAtualizado.getExemplo());
		}
		if (gameAtualizado.getCompatibilidade() != null && !gameAtualizado.getCompatibilidade().isEmpty()) {
			gameExistente.setCompatibilidade(gameAtualizado.getCompatibilidade());
		}
		if (gameAtualizado.getClassificacao() != null && !gameAtualizado.getClassificacao().isEmpty()) {
			gameExistente.setClassificacao(gameAtualizado.getClassificacao());
		}
		if (gameAtualizado.getCategories() != null && !gameAtualizado.getCategories().isEmpty()) {
			gameExistente.setCategories(gameAtualizado.getCategories());
		}
		if (gameAtualizado.getLanguages() != null && !gameAtualizado.getLanguages().isEmpty()) {
			gameExistente.setLanguages(gameAtualizado.getLanguages());
		}
		
		return gameRepository.save(gameExistente);
	}
}
