package com.devweb.backendsteam.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class GameCreateDTO {
	@NotBlank
	public String title;
	@NotNull
	public BigDecimal preco;
	@NotBlank
	public String cover;
	@NotNull
	public Integer desconto;
	@NotBlank
	public String desenvolvedora;
	@NotNull
	@Size(min = 1)
	public List<@NotBlank String> classificacao;
	@NotNull
	@Size(min = 1)
	public List<@NotNull Long> idiomas;
	@NotNull
	@Size(min = 1)
	public List<@NotBlank String> compatibilidade;
	@NotNull
	public LocalDate dataLancamento;
	@NotNull
	@Size(min = 1)
	public List<@NotNull Long> categories;
	@NotBlank
	public String about;
	@NotBlank
	public String descricao;
	@NotNull
	@Size(min = 1)
	public List<@NotBlank String> scenes;
	@NotNull
	@Size(min = 1)
	public List<@NotBlank String> exemplo;
	@NotBlank
	public String publicadora;

	@NotBlank
	public String plataforma;

	@NotNull
	public Double avaliacao;

	@NotBlank
	public String classificacaoEtaria;

	@NotBlank
	public String idiomaPrincipal;

	@NotNull
	@Size(min = 0)
	public List<AchievementDTO> conquista;
}
