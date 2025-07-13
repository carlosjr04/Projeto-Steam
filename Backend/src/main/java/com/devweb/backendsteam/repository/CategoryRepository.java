package com.devweb.backendsteam.repository;

import com.devweb.backendsteam.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	Optional<Category> findBySlug(String slug);
}
