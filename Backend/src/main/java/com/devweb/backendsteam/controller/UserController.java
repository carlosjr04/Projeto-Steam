package com.devweb.backendsteam.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.devweb.backendsteam.dto.LoginRequest;
import com.devweb.backendsteam.dto.LoginResponse;
import com.devweb.backendsteam.dto.OwnedGameRequestDTO;
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

    @PostMapping("/cadastro")
    public User adicionar(@RequestBody User user) {
        return userService.adicionar(user);
    }

    @PutMapping
    public User alterar(@RequestBody User user) {
        return userService.alterar(user);
    }

    @PatchMapping("/add-game")
    public ResponseEntity<?> adicionarOwnedGame(@RequestBody OwnedGameRequestDTO dto) {
        try {
            userService.adicionarOwnedGame(dto);
            return ResponseEntity.ok("Jogo adicionado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
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
