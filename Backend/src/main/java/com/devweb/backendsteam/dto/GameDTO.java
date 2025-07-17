package com.devweb.backendsteam.dto;

import java.util.List;
import java.util.Set;

import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.Language;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameDTO {

	private String id;
	private String title;
	private double preco;
	private String cover;
	private double desconto;
	private java.time.LocalDate DataLancamento;
	private List<String> compatibilidade;
	private List<String> idiomas; // nomes dos idiomas
	private List<String> scenes;
	private String about;
	private String desenvolvedora;
	private List<String> classificacao;
	private List<String> categories;
	private Object descricao; // ReactNode no frontend, aqui pode ser String
	private List<String> exemplo;
	private List<AchievementDTO> conquista; // Conquista DTO
	private Set<Language> languages;
	// Campos extras do modelo Game
	private String publicadora;
	private String plataforma;
	private double avaliacao;
	private String classificacaoEtaria;
	private String idiomaPrincipal;

	public GameDTO(Game game) {
		this.id = game.getId() != null ? game.getId().toString() : null;
		this.title = game.getTitle();
		this.preco = game.getPreco() != null ? game.getPreco().doubleValue() : 0.0;
		this.cover = game.getCover();
		this.desconto = game.getDesconto();
		this.DataLancamento = game.getDataLancamento();
		this.compatibilidade = game.getCompatibilidade();
		this.idiomas = game.getIdiomas() != null ? game.getIdiomas().stream().map(l -> l.getNome()).toList() : List.of();
		this.languages = game.getLanguages() != null ? game.getLanguages() : Set.of();
		this.scenes = game.getScenes();
		this.about = game.getAbout();
		this.desenvolvedora = game.getDesenvolvedora();
		this.classificacao = game.getClassificacao();
		this.categories = game.getCategories() != null ? game.getCategories().stream().map(c -> c.getName()).toList() : List.of();
		this.descricao = game.getDescricao();
		this.exemplo = game.getExemplo();
		this.conquista = game.getAchievements() != null ? game.getAchievements().stream().map(a -> new com.devweb.backendsteam.dto.AchievementDTO(a)).toList() : List.of();
		// Extras
		this.publicadora = game.getPublicadora();
		this.plataforma = game.getPlataforma();
		this.avaliacao = game.getAvaliacao();
		this.classificacaoEtaria = game.getClassificacaoEtaria();
		this.idiomaPrincipal = game.getIdioma();
	}
}
