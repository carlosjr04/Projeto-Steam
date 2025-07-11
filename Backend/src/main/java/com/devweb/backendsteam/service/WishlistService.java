package com.devweb.backendsteam.service;

import com.devweb.backendsteam.model.Wishlist;
import com.devweb.backendsteam.model.EmbeddedIds.WishlistId;
import com.devweb.backendsteam.repository.WishlistRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistService {

	@Autowired
	private WishlistRepository wishlistRepository;

	public List<Wishlist> listarTodos() {
		return wishlistRepository.findAll();
	}

	public Wishlist buscarPorId(WishlistId id) {
		return wishlistRepository.findById(id).orElse(null);
	}

	public List<Wishlist> listarPorUsuario(String userId) {
		return wishlistRepository.findByUser_UserId(userId);
	}

	public Wishlist adicionar(Wishlist wishlist) {
		return wishlistRepository.save(wishlist);
	}

	public void remover(WishlistId id) {
		wishlistRepository.deleteById(id);
	}
}