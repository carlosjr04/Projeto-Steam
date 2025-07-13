package com.devweb.backendsteam.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devweb.backendsteam.dto.GameCompraDTO;
import com.devweb.backendsteam.dto.LoginRequest;
import com.devweb.backendsteam.dto.LoginResponse;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.OwnedGame;
import com.devweb.backendsteam.model.User;
import com.devweb.backendsteam.service.UserService;
import com.devweb.backendsteam.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    

    @GetMapping
    public List<User> listarTodos() {
        return userService.listarTodos();
    }

    @GetMapping("{userId}")
    public Optional<User> buscarPorUserId(@PathVariable String userId) {
        return userService.buscarPorUserId(userId);
    }

    @PostMapping
    public User adicionar(@RequestBody User user) {
        // user_id sempre será gerado no service
        return userService.adicionar(user);
    }

    @PutMapping
    public User alterar(@RequestBody User user) {
        return userService.alterar(user);
    }

    @PatchMapping("{userId}/add-game")
    public ResponseEntity<?> adicionarOwnedGameAoUsuario(
            @PathVariable String userId,
            @RequestBody GameCompraDTO dto
    ) {
        Optional<User> userOpt = userService.buscarPorUserId(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        Game game = dto.getGame();
        LocalDate boughtAt = dto.getBoughtAt();
        BigDecimal price = dto.getPrice();

        User user = userOpt.get();

        boolean jaPossui = user.getOwnedGames().stream()
                .anyMatch(owned -> owned.getGame().getId().equals(game.getId()));

        if (jaPossui) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já possui este jogo");
        }

        OwnedGame novoOwned = new OwnedGame(user, game, boughtAt, price);
        user.getOwnedGames().add(novoOwned);

        userService.alterar(user);

        return ResponseEntity.ok("Jogo adicionado com sucesso à conta do usuário");
    }

    @DeleteMapping("{userId}")
    public void remover(@PathVariable String userId) {
        userService.buscarPorUserId(userId).ifPresent(u -> userService.remover(u.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userService.buscarPorEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (userService.checkPassword(loginRequest.getPassword(), user.getPassword())) {
                String token = JwtUtil.generateToken(user);
                return ResponseEntity.ok(new LoginResponse(user, token));
            } else {
                return ResponseEntity.status(401).body("Senha incorreta");
            }
        } else {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(HttpServletRequest request) {
        User user = (User) request.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body("Usuário não autenticado");
        }
        return ResponseEntity.ok(user);
    }
}
