package com.devweb.backendsteam.controller;

import com.devweb.backendsteam.model.OwnedGame;
import com.devweb.backendsteam.model.EmbeddedIds.OwnedGameId;
import com.devweb.backendsteam.service.OwnedGameService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
	public OwnedGame buscarPorId(@PathVariable String userId, @PathVariable Long gameId) {
		OwnedGameId id = new OwnedGameId(userId, gameId);
		return ownedGameService.buscarPorId(id);
	}

	@GetMapping("/user/{userId}")
	public List<OwnedGame> listarPorUsuario(@PathVariable String userId) {
		return ownedGameService.listarPorUsuario(userId);
	}

	@PostMapping
	public OwnedGame adicionar(@RequestBody OwnedGame ownedGame) {
		return ownedGameService.adicionar(ownedGame);
	}

	@DeleteMapping("/user/{userId}/game/{gameId}")
	public void remover(@PathVariable String userId, @PathVariable Long gameId) {
		OwnedGameId id = new OwnedGameId(userId, gameId);
		ownedGameService.remover(id);
	}
}