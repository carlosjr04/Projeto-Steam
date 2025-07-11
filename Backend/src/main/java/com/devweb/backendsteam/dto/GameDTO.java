package com.devweb.backendsteam.dto;

import com.devweb.backendsteam.model.Game;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameDTO {
	private Long id;
	private String image;
	private String titulo;
	private String desenvolvedora;
	private String publicadora;
	private String plataforma;
	private java.time.LocalDate dataLancamento;
	private java.math.BigDecimal preco;
	private double avaliacao;
	private String descricao;
	private boolean multiplayer;
	private String classificacaoEtaria;
	private String idioma;
	private List<String> categorias;
	// ... outros campos do Game que você quiser expor ...

	public GameDTO(Game game) {
		this.id = game.getId();
		this.image = game.getImage();
		this.titulo = game.getTitulo();
		this.desenvolvedora = game.getDesenvolvedora();
		this.publicadora = game.getPublicadora();
		this.plataforma = game.getPlataforma();
		this.dataLancamento = game.getDataLancamento();
		this.preco = game.getPreco();
		this.avaliacao = game.getAvaliacao();
		this.descricao = game.getDescricao();
		this.multiplayer = game.isMultiplayer();
		this.classificacaoEtaria = game.getClassificacaoEtaria();
		this.idioma = game.getIdioma();
		// Gera a lista de nomes das categorias
		this.categorias = game.getCategories() != null ? game.getCategories().stream().map(c -> c.getName()).toList() : List.of();
		// ... copie outros campos conforme necessário ...
	}
}
