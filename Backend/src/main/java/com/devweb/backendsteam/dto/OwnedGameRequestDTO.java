package com.devweb.backendsteam.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class OwnedGameRequestDTO {

	private String userId;
	private Long gameId;
	private LocalDate boughtAt;
	private BigDecimal price;

	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long game) {
		this.gameId = game;
	}
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public LocalDate getBoughtAt() {
		return boughtAt;
	}

	public void setBoughtAt(LocalDate boughtAt) {
		this.boughtAt = boughtAt;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
}

