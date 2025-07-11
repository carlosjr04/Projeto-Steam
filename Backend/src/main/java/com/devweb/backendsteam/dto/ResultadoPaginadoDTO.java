package com.devweb.backendsteam.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultadoPaginadoDTO<T> {
	private long totalItens;
	private int totalPaginas;
	private int paginaCorrente;
	private List<T> itens;

	public ResultadoPaginadoDTO(long totalItens, int totalPaginas, int paginaCorrente, List<T> itens) {
		this.totalItens = totalItens;
		this.totalPaginas = totalPaginas;
		this.paginaCorrente = paginaCorrente;
		this.itens = itens;
	}
}
