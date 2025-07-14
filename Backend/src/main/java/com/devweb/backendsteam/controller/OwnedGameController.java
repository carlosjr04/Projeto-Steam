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

import com.devweb.backendsteam.dto.OwnedGameRequestDTO;
import com.devweb.backendsteam.model.EmbeddedIds.OwnedGameId;
import com.devweb.backendsteam.model.OwnedGame;
import com.devweb.backendsteam.service.OwnedGameService;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("owned-games")
public class OwnedGameController {

	@Autowired
	private OwnedGameService ownedGameService;

	@GetMapping
	public List<OwnedGame> listarTodos() {
		return ownedGameService.listarTodos();
	}
	
	@GetMapping("/user/{userId}/game/{gameId}")
	public OwnedGame buscarPorId(@PathVariable Long id) {
		
		return ownedGameService.buscarPorId(id);
	}

	@GetMapping("/user/{userId}")
	public List<OwnedGame> listarPorUsuario(@PathVariable String userId) {
		return ownedGameService.listarPorUsuario(userId);
	}

	@PostMapping(value = "", consumes = "application/json")
	public OwnedGame adicionar(@RequestBody OwnedGameRequestDTO ownedGame) {
		return ownedGameService.adicionar(ownedGame);
	}

	@DeleteMapping("/user/{userId}/game/{gameId}")
	public void remover(@PathVariable Long id) {
		ownedGameService.remover(id);
	}
}