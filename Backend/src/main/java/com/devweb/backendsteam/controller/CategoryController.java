package com.devweb.backendsteam.controller;

import com.devweb.backendsteam.model.Category;
import com.devweb.backendsteam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping("paginacao")
	public Page<Category> paginacaoCategorias(
			@RequestParam(value = "pagina", defaultValue = "0") int pagina,
			@RequestParam(value = "tamanho", defaultValue = "4") int tamanho) {
		Pageable pageable = PageRequest.of(pagina, tamanho);
		return categoryService.paginacaoCategorias(pageable);
	}

	@GetMapping
	public List<Category> listarCategorias() {
		return categoryService.listarCategorias();
	}

	@GetMapping("{id}")
	public Category buscarPorId(@PathVariable Long id) {
		return categoryService.buscarPorId(id);
	}

	@PostMapping
	public Category criarCategoria(@RequestBody Category categoria) {
		return categoryService.criarCategoria(categoria);
	}

	@PutMapping("{id}")
	public Category atualizarCategoria(@PathVariable Long id, @RequestBody Category categoria) {
		return categoryService.atualizarCategoria(id, categoria);
	}

	@DeleteMapping("{id}")
	public void deletarCategoria(@PathVariable Long id) {
		categoryService.deletarCategoria(id);
	}

	@GetMapping("slug/{slug}")
	public Category buscarPorSlug(@PathVariable String slug) {
		return categoryService.buscarPorSlug(slug);
	}
}
