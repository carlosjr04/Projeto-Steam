package com.devweb.backendsteam.model.EmbeddedIds;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Embeddable
public class OwnedGameId implements Serializable {
	private String userId;  
	private Long gameId;

	public OwnedGameId(String userId, Long gameId) {
		this.userId = userId;
		this.gameId = gameId;
	}

	// Getters e setters
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

	// equals e hashCode (importante para funcionar no JPA)

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof OwnedGameId that)) return false;
		return Objects.equals(userId, that.userId) && Objects.equals(gameId, that.gameId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId, gameId);
	}
}
