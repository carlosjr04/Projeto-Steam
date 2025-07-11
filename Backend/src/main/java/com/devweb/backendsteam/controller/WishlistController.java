package com.devweb.backendsteam.controller;

import com.devweb.backendsteam.model.Wishlist;
import com.devweb.backendsteam.model.EmbeddedIds.WishlistId;
import com.devweb.backendsteam.service.WishlistService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("wishlists")
public class WishlistController {

	@Autowired
	private WishlistService wishlistService;

	@GetMapping
	public List<Wishlist> listarTodos() {
		return wishlistService.listarTodos();
	}

	@GetMapping("/user/{userId}/game/{gameId}")
	public Wishlist buscarPorId(@PathVariable String userId, @PathVariable Long gameId) {
		WishlistId id = new WishlistId(userId, gameId);
		return wishlistService.buscarPorId(id);
	}

	@GetMapping("/user/{userId}")
	public List<Wishlist> listarPorUsuario(@PathVariable String userId) {
		return wishlistService.listarPorUsuario(userId);
	}

	@PostMapping
	public Wishlist adicionar(@RequestBody Wishlist wishlist) {
		return wishlistService.adicionar(wishlist);
	}

	@DeleteMapping("/user/{userId}/game/{gameId}")
	public void remover(@PathVariable String userId, @PathVariable Long gameId) {
		WishlistId id = new WishlistId(userId, gameId);
		wishlistService.remover(id);
	}
}