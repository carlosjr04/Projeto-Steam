package com.devweb.backendsteam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.backendsteam.dto.WishlistDTO;
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
		try {
            User user = userRepository.findByUserId(wishlistDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("Usuário com ID " + wishlistDTO.getUserId() + " não encontrado."));

            Game game = gameRepository.findById(wishlistDTO.getGameId())
                    .orElseThrow(() -> new RuntimeException("Jogo com ID " + wishlistDTO.getGameId() + " não encontrado."));

            // Verifica se o usuário já possui o jogo
            boolean jaPossui = user.getWishlist()
                    .stream()
                    .anyMatch(wishlist -> wishlist.getGame().getId().equals(game.getId()));

            if (jaPossui) {
                throw new RuntimeException("Usuário já possui esse jogo.");
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

        } catch (Exception e) {
            // Log do erro (recomendo usar um logger real em produção)
            System.err.println("Erro ao adicionar jogo ao usuário: " + e.getMessage());
            e.printStackTrace();

            // Lança exceção genérica controlada para evitar erro 500
            throw new RuntimeException("Erro ao adicionar jogo ao usuário. Verifique os dados informados.");
        }
	}

	public void remover(Long id) {
		wishlistRepository.deleteById(id);
	}
}