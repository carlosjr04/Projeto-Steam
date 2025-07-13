package com.devweb.backendsteam.model;

import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;
	private String slug;
	private String image;
	private String title;

	@JsonIgnore
	@ManyToMany(mappedBy = "categories")
	private Set<Game> games = new java.util.HashSet<>();

	public Category(String nome, String slug, String image, String title) {
		this.nome = nome;
		this.slug = slug;
		this.image = image;
		this.title = title;
	}

	public String getName() {
		return this.nome;
	}

	public Set<Game> getGames() {
		return games;
	}

	public void setGames(Set<Game> games) {
		this.games = games;
	}
}
