package com.devweb.backendsteam.repository;

import com.devweb.backendsteam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserId(String userId);
	Optional<User> findByEmail(String email);
}
