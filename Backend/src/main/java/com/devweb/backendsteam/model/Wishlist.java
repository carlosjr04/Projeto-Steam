package com.devweb.backendsteam.model;

import com.devweb.backendsteam.model.EmbeddedIds.WishlistId;
import jakarta.persistence.*;
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
public class Wishlist {
	@EmbeddedId private WishlistId id;

	@ManyToOne
	@MapsId("userId")
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User user;

	@ManyToOne
	@MapsId("gameId")
	@JoinColumn(name = "game_id")
	private Game game;

	private LocalDate listedAt;
	private int priority;

	public Wishlist(User user, Game game, LocalDate listedAt, int priority) {
		this.user = user;
		this.game = game;
		this.listedAt = listedAt;
		this.priority = priority;
		this.id = new WishlistId(user.getUserId(), game.getId());
	}
}
