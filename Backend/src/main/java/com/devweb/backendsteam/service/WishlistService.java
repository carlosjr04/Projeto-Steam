package com.devweb.backendsteam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.backendsteam.dto.WishlistDTO;
import com.devweb.backendsteam.exception.GameNotFoundException;
import com.devweb.backendsteam.exception.UserNotFoundException;
import com.devweb.backendsteam.exception.WishlistAlreadyExistsException;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.User;
import com.devweb.backendsteam.model.Wishlist;
import com.devweb.backendsteam.repository.GameRepository;
import com.devweb.backendsteam.repository.UserRepository;
import com.devweb.backendsteam.repository.WishlistRepository;

@Service
public class WishlistService {

	@Autowired
	private WishlistRepository wishlistRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GameRepository gameRepository;

	public List<Wishlist> listarTodos() {
		return wishlistRepository.findAll();
	}

	public Wishlist buscarPorId(Long id) {
		return wishlistRepository.findById(id).orElse(null);
	}

	public List<Wishlist> listarPorUsuario(String userId) {
		return wishlistRepository.findByUser_UserId(userId);
	}

	public Wishlist adicionar(WishlistDTO wishlistDTO) {
		User user = userRepository.findByUserId(wishlistDTO.getUserId())
				.orElseThrow(() -> new UserNotFoundException("Usuário com ID " + wishlistDTO.getUserId() + " não encontrado."));

		Game game = gameRepository.findById(wishlistDTO.getGameId())
				.orElseThrow(() -> new GameNotFoundException("Jogo com ID " + wishlistDTO.getGameId() + " não encontrado."));

		// Verifica se já existe uma wishlist para esse userId e gameId
		boolean jaPossui = wishlistRepository.findByUser_UserIdAndGame_Id(wishlistDTO.getUserId(), wishlistDTO.getGameId()).isPresent();
		if (jaPossui) {
			throw new WishlistAlreadyExistsException("Usuário já possui esse jogo na wishlist.");
		}

		// Cria o objeto
		Wishlist wishlist = new Wishlist();
		wishlist.setUser(user);
		wishlist.setGame(game);
		wishlist.setListedAt(wishlistDTO.getListedAt());
		wishlist.setPriority(wishlistDTO.getPriority());

		// Salva no repositório
		Wishlist saved = wishlistRepository.save(wishlist);

		// Atualiza a lista de jogos do usuário (opcional, depende do cascade)
		user.getWishlist().add(saved);
		userRepository.save(user);

		return saved;
	}

	public void remover(Long id) {
		wishlistRepository.deleteById(id);
	}
}