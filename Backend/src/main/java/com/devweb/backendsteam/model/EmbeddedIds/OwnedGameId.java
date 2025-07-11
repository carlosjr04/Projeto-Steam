package com.devweb.backendsteam.model.EmbeddedIds;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
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

	@Override
	public int hashCode() {
		return Objects.hash(userId, gameId);
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof OwnedGameId)) return false;
		OwnedGameId that = (OwnedGameId) o;
		return Objects.equals(userId, that.getUserId()) && Objects.equals(gameId, that.getGameId());
	}
}
