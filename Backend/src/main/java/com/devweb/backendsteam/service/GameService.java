package com.devweb.backendsteam.service;

import com.devweb.backendsteam.exception.GameNaoEncontradoException;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.repository.GameRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	public Page<Game> recuperarGamesComPaginacao(Pageable pageable, String nome) {
		return gameRepository.recuperarGamesComPaginacao(pageable, "%" + nome + "%");
	}

	public List<Game> recuperarGamesPorSlugCategory(String slugCategory) {
		return gameRepository.recuperarGamesPorSlugCategory(slugCategory);
	}
}
