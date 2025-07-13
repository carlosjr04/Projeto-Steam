package com.devweb.backendsteam.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.devweb.backendsteam.model.User;
import com.devweb.backendsteam.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

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

	public Optional<User> buscarPorEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public boolean checkPassword(String rawPassword, String encodedPassword) {
		return encoder.matches(rawPassword, encodedPassword);
	}
}