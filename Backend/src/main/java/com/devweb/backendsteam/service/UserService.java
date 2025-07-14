package com.devweb.backendsteam.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.devweb.backendsteam.dto.OwnedGameRequestDTO;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.OwnedGame;
import com.devweb.backendsteam.model.User;
import com.devweb.backendsteam.repository.GameRepository;
import com.devweb.backendsteam.repository.OwnedGameRepository;
import com.devweb.backendsteam.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private OwnedGameRepository ownedGameRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public List<User> listarTodos() {
        return userRepository.findAll();
    }

    public Optional<User> buscarPorId(Long id) {
        return userRepository.findById(id);
    }

    public User adicionar(User user) {
        if (user.getUserId() == null || user.getUserId().isEmpty()) {
            user.setUserId(UUID.randomUUID().toString());
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User adicionarUsuarioBase() {
        User user = new User();
        user.setUserId("1");
        user.setName("Admin");
        user.setUsername("admin");
        user.setEmail("admin@backendsteam.com");
        user.setPassword(encoder.encode("admin123"));
        user.setAge(30);
        user.setGenre("admin");
        user.setRole("ADMIN");
        return userRepository.save(user);
    }

    public User alterar(User user) {
        return userRepository.save(user);
    }

    public void remover(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> buscarPorUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Transactional
    public void adicionarOwnedGame(OwnedGameRequestDTO dto) {
        User user = userRepository.findByUserId(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Game game = gameRepository.findById(dto.getGameId())
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado"));

        boolean jaPossui = user.getOwnedGames()
                .stream()
                .anyMatch(ownedGame -> ownedGame.getGame().getId().equals(game.getId()));

        if (jaPossui) {
            throw new RuntimeException("Usuário já possui esse jogo.");
        }

        OwnedGame ownedGame = new OwnedGame();


        ownedGame.setUser(user);
        ownedGame.setGame(game);
        ownedGame.setBoughtAt(dto.getBoughtAt());
        ownedGame.setPrice(dto.getPrice());

        ownedGameRepository.save(ownedGame);

        user.getOwnedGames().add(ownedGame);
        userRepository.save(user);
    }

    public Optional<User> buscarPorEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}
