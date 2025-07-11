package com.devweb.backendsteam.model;

import com.devweb.backendsteam.model.EmbeddedIds.OwnedGameId;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class OwnedGame {
	@EmbeddedId private OwnedGameId id;

	@ManyToOne
	@MapsId("userId")
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User user;

	@ManyToOne
	@MapsId("gameId")
	@JoinColumn(name = "game_id")
	private Game game;

	private LocalDate boughtAt;
	private BigDecimal price;

	public OwnedGame(User user, Game game, LocalDate boughtAt, BigDecimal price) {
		this.user = user;
		this.game = game;
		this.boughtAt = boughtAt;
		this.price = price;
		this.id = new OwnedGameId(user.getUserId(), game.getId());
	}
}
