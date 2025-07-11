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
public class Language {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;
	private String slug;
	private String lingua;
	private boolean interfaceIdioma;
	private boolean dublagem;
	private boolean legenda;

	@JsonIgnore
	@ManyToMany(mappedBy = "languages")
	private Set<Game> games = new HashSet<>();

	public Language(String nome, String slug, String lingua, boolean interfaceIdioma, boolean dublagem, boolean legenda) {
		this.nome = nome;
		this.slug = slug;
		this.lingua = lingua;
		this.interfaceIdioma = interfaceIdioma;
		this.dublagem = dublagem;
		this.legenda = legenda;
	}
}
