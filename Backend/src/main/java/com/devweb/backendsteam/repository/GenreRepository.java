package com.devweb.backendsteam.repository;

import com.devweb.backendsteam.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {}
