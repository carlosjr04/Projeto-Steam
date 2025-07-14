package com.devweb.backendsteam.service;

import com.devweb.backendsteam.model.Category;
import com.devweb.backendsteam.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	public Page<Category> paginacaoCategorias(Pageable pageable) {
		return categoryRepository.findAll(pageable);
	}

	public List<Category> listarCategorias() {
		return categoryRepository.findAll();
	}

	public Category buscarPorId(Long id) {
		return categoryRepository.findById(id).orElse(null);
	}

	public Category criarCategoria(Category categoria) {
		return categoryRepository.save(categoria);
	}

	public Category atualizarCategoria(Long id, Category categoria) {
		categoria.setId(id);
		return categoryRepository.save(categoria);
	}

	public void deletarCategoria(Long id) {
		categoryRepository.deleteById(id);
	}

	public Category buscarPorSlug(String slug) {
	return categoryRepository.findBySlug(slug).orElse(null);
	}

	public List<Category> listarCategoriasComImagem() {
		return categoryRepository.findAll().stream()
			.filter(categoria -> categoria.getImage() != null)
			.toList();
	}
}
