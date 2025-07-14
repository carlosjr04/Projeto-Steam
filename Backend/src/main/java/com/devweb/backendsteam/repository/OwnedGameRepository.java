package com.devweb.backendsteam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.backendsteam.model.OwnedGame;

public interface OwnedGameRepository extends JpaRepository<OwnedGame,  Long> {
	List<OwnedGame> findByUser_UserId(String userId);
}