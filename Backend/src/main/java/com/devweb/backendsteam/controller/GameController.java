package com.devweb.backendsteam.controller;

import com.devweb.backendsteam.dto.GameDTO;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.ResultadoPaginado;
import com.devweb.backendsteam.service.GameService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("games") // http://localhost:8080/games
public class GameController {

	@Autowired private GameService gameService;

	@GetMapping // Requisição do tipo GET para http://localhost:8080/games
	public List<GameDTO> recuperarGames() {
		return gameService.recuperarGames().stream().map(GameDTO::new).toList();
	}

	// Rota para retornar um jogo aleatório
	@GetMapping("random")
	public GameDTO recuperarGameAleatorio() {
		List<Game> games = gameService.recuperarGames();
		if (games.isEmpty()) {
			throw new RuntimeException("Nenhum jogo cadastrado.");
		}
		int idx = (int) (Math.random() * games.size());
		return new GameDTO(games.get(idx));
	}

	// Requisição do tipo GET para http://localhost:8080/games/1
	@GetMapping("{idGame}")
	public GameDTO recuperarGamePorId(@PathVariable("idGame") long id) {
		return new GameDTO(gameService.recuperarGamePorId(id));
	}

	// Requisição do tipo GET para http://localhost:8080/games/category/aventura
	@GetMapping("category/{slugCategory}")
	public List<GameDTO> recuperarGamesPorSlugCategory(
		@PathVariable("slugCategory") String slugCategory) {
		return gameService.recuperarGamesPorSlugCategory(slugCategory).stream().map(GameDTO::new).toList();
	}

	@PostMapping
	public Game cadastraGame(@RequestBody Game game) {
		return gameService.cadastrarGame(game);
	}

	@PutMapping
	public Game alterarGame(@RequestBody Game game) {
		return gameService.alterarGame(game);
	}

	@DeleteMapping("{idGame}") // http://localhost:8080/games/1
	public void removerGame(@PathVariable("idGame") long id) {
		gameService.removerGame(id);
	}

	// Entradas
	// - pagina corrente
	// - tamanho da página
	// Saídas:
	// - total de itens
	// - total de páginas
	// - pagina corrente
	// - itens da página corrente

	// Requisição do tipo GET para
	// http://localhost:8080/games/paginacao?pagina=0&tamanho=5&nome=ce
	@GetMapping("paginacao")
	public ResultadoPaginado<GameDTO> recuperarGamesComPaginacao(
		@RequestParam(value = "pagina", defaultValue = "0") int pagina,
		@RequestParam(value = "tamanho", defaultValue = "5") int tamanho,
		@RequestParam(value = "nome", defaultValue = "") String nome) {
		Pageable pageable = PageRequest.of(pagina, tamanho);
		Page<Game> page = gameService.recuperarGamesComPaginacao(pageable, nome);
		ResultadoPaginado<GameDTO> resultadoPaginado =
			new ResultadoPaginado<>(
				page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getContent().stream().map(GameDTO::new).toList());
		return resultadoPaginado;
	}
}
