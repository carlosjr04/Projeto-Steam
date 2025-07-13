package com.devweb.backendsteam.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.devweb.backendsteam.model.Game;

public class GameCompraDTO {
    private Game game;
    private LocalDate boughtAt;
    private BigDecimal price;

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
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

