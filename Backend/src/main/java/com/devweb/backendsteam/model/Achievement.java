package com.devweb.backendsteam.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Achievement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String imagem;
	private String descricao;
	private boolean escondido;

	@ManyToOne
	@JoinColumn(name = "game_id")
	private Game game;

	public Achievement(String imagem, String descricao, boolean escondido, Game game) {
		this.imagem = imagem;
		this.descricao = descricao;
		this.escondido = escondido;
		this.game = game;
	}
}
