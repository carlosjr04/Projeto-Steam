package com.devweb.backendsteam.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.devweb.backendsteam.dto.AchievementDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String image;
// Removido campo titulo, usar apenas title
	private String desenvolvedora;
	private String publicadora;

	private String plataforma;
	private LocalDate dataLancamento;
	private BigDecimal preco;
	private double avaliacao;

	private boolean multiplayer;
	private String classificacaoEtaria;
	private String idioma;

	@Column(columnDefinition = "TEXT")
	private String descricao;

	@ManyToMany
	@JoinTable(
			name = "game_category",
			joinColumns = @JoinColumn(name = "game_id"),
			inverseJoinColumns = @JoinColumn(name = "category_id")
	)
	private Set<Category> categories = new HashSet<>();

	// Removidos relacionamentos de genero e plataforma

	@ManyToMany
	@JoinTable(
			name = "game_language",
			joinColumns = @JoinColumn(name = "game_id"),
			inverseJoinColumns = @JoinColumn(name = "language_id"))
	private Set<Language> languages = new HashSet<>();

	@JsonIgnore
	@OneToMany(mappedBy = "game")
	private List<OwnedGame> gamesOwned;

	@JsonIgnore
	@OneToMany(mappedBy = "game")
	private List<Wishlist> wishlist;

	// Novos campos para compatibilidade, cenas, desconto, conquistas, exemplos, etc.
	private double desconto;
	@ElementCollection
	private List<String> scenes = new ArrayList<>();
	@ElementCollection
	private List<String> exemplo = new ArrayList<>();
	@OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Achievement> achievements = new ArrayList<>();

	@Transient
	private List<AchievementDTO> conquista;

	@Transient
	@JsonProperty("conquista")
	public List<AchievementDTO> getConquista() {
		if (this.conquista == null && this.achievements != null) {
			return this.achievements.stream().map(AchievementDTO::new).toList();
		}
		return this.conquista;
	}

	@ElementCollection
	private List<String> compatibilidade = new ArrayList<>();
	// Ajuste de nomes para refletir o frontend
	@Column(name = "about", columnDefinition = "TEXT")
	private String about;
	// Ajuste de nomes para refletir o frontend
	@Column(name = "title")
	private String title;
	@Column(name = "cover")
	private String cover;
	@Column(name = "classificacao")
	@ElementCollection
	private List<String> classificacao = new ArrayList<>();

	public Game(
		String image,
		String title,
		String desenvolvedora,
		String publicadora,
		String plataforma,
		LocalDate dataLancamento,
		BigDecimal preco,
		double avaliacao,
		String descricao,
		boolean multiplayer,
		String classificacaoEtaria,
		String idioma,
		Set<Language> languages
	) {
		this.image = image;
		this.title = title;
		this.desenvolvedora = desenvolvedora;
		this.publicadora = publicadora;
		this.plataforma = plataforma;
		this.dataLancamento = dataLancamento;
		this.preco = preco;
		this.avaliacao = avaliacao;
		this.descricao = descricao;
		this.multiplayer = multiplayer;
		this.classificacaoEtaria = classificacaoEtaria;
		this.idioma = idioma;
		this.languages = languages;
	}

	@com.fasterxml.jackson.annotation.JsonProperty("idiomas")
	public Set<Language> getIdiomas() {
		return this.languages;
	}

	@com.fasterxml.jackson.annotation.JsonProperty("idiomas")
	public void setIdiomas(Set<Language> idiomas) {
		this.languages = idiomas;
	}
}
