package com.devweb.backendsteam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devweb.backendsteam.model.Wishlist;
import com.devweb.backendsteam.service.WishlistService;

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
	public Wishlist buscarPorId(@PathVariable Long id) {
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
	public void remover(@PathVariable Long id) {
		wishlistService.remover(id);
	}
}