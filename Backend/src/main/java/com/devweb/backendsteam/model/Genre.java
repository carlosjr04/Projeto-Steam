package com.devweb.backendsteam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Genre {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;
	private String slug;
	private String nomeGenero;

	@JsonIgnore
	@ManyToMany(mappedBy = "genres")
	private Set<Game> games = new HashSet<>();

	public Genre(String nome, String slug, String nomeGenero) {
		this.nome = nome;
		this.slug = slug;
		this.nomeGenero = nomeGenero;
	}
}
