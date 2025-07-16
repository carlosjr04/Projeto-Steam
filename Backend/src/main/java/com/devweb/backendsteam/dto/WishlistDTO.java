package com.devweb.backendsteam.dto;

import java.time.LocalDate;

public class WishlistDTO {
	private String userId;
private Long gameId;
	private LocalDate listedAt;
	private int priority;

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

	public LocalDate getListedAt() {
		return listedAt;
	}

	public void setListedAt(LocalDate listedAt) {
		this.listedAt = listedAt;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}
}
