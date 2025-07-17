package com.devweb.backendsteam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.backendsteam.dto.OwnedGameRequestDTO;
import com.devweb.backendsteam.exception.GameNotFoundException;
import com.devweb.backendsteam.exception.OwnedGameAlreadyExistsException;
import com.devweb.backendsteam.exception.UserNotFoundException;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.OwnedGame;
import com.devweb.backendsteam.model.User;
import com.devweb.backendsteam.repository.GameRepository;
import com.devweb.backendsteam.repository.OwnedGameRepository;
import com.devweb.backendsteam.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class OwnedGameService {

	@Autowired
	private OwnedGameRepository ownedGameRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GameRepository gameRepository;

	public List<OwnedGame> listarTodos() {
		return ownedGameRepository.findAll();
	}

	public OwnedGame buscarPorId(Long id) {
		return ownedGameRepository.findById(id).orElse(null);
	}

	public List<OwnedGame> listarPorUsuario(String userId) {
		return ownedGameRepository.findByUser_UserId(userId);
	}

	@Transactional
	public OwnedGame adicionar(OwnedGameRequestDTO ownedGameDto) {
		User user = userRepository.findByUserId(ownedGameDto.getUserId())
				.orElseThrow(() -> new UserNotFoundException("Usuário com ID " + ownedGameDto.getUserId() + " não encontrado."));

		Game game = gameRepository.findById(ownedGameDto.getGameId())
				.orElseThrow(() -> new GameNotFoundException("Jogo com ID " + ownedGameDto.getGameId() + " não encontrado."));

		boolean jaPossui = user.getOwnedGames()
				.stream()
				.anyMatch(ownedGame -> ownedGame.getGame().getId().equals(game.getId()));

		if (jaPossui) {
			throw new OwnedGameAlreadyExistsException("Usuário já possui esse jogo.");
		}

		OwnedGame ownedGame = new OwnedGame();
		ownedGame.setUser(user);
		ownedGame.setGame(game);
		ownedGame.setBoughtAt(ownedGameDto.getBoughtAt());
		ownedGame.setPrice(ownedGameDto.getPrice());

		OwnedGame saved = ownedGameRepository.save(ownedGame);
		user.getOwnedGames().add(saved);
		userRepository.save(user);
		return saved;
	}

	public void remover(Long id) {
		ownedGameRepository.deleteById(id);
	}
}
