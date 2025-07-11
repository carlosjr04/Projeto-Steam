package com.devweb.backendsteam.repository;

import com.devweb.backendsteam.model.EmbeddedIds.OwnedGameId;
import com.devweb.backendsteam.model.OwnedGame;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnedGameRepository extends JpaRepository<OwnedGame, OwnedGameId> {
	List<OwnedGame> findByUser_UserId(String userId);
}