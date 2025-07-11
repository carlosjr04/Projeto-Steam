package com.devweb.backendsteam.dto;

import com.devweb.backendsteam.model.Achievement;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AchievementDTO {
	private String imagem;
	private String descricao;
	private boolean escondido;

	public AchievementDTO(Achievement achievement) {
		this.imagem = achievement.getImagem();
		this.descricao = achievement.getDescricao();
		this.escondido = achievement.isEscondido();
	}
}
