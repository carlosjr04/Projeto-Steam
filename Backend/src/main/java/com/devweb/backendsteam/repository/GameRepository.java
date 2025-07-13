package com.devweb.backendsteam.repository;

import com.devweb.backendsteam.model.Game;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GameRepository extends JpaRepository<Game, Long> {

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("select p from Game p left join fetch p.categories where p.id = :id")
	Optional<Game> recuperarGamePorIdComLock(@Param("id") Long id);

	@Query("select p from Game p left join fetch p.categories order by p.id")
	List<Game> recuperarGamesComCategory();

	@Query("select p from Game p left join fetch p.categories where p.id = :id")
	Optional<Game> recuperarGamePorId(@Param("id") Long id);

	@Query("""
		select distinct g from Game g
		left join fetch g.categories
		left join fetch g.languages
		where g.id = :id
	""")
	Optional<Game> recuperarGameComTudo(@Param("id") Long id);

	@Query(
		value =
			"select p from Game p where p.title like :nome order by p.id",
		countQuery = "select count(p) from Game p where p.title like :nome")
	Page<Game> recuperarGamesComPaginacao(Pageable pageable, @Param("nome") String nome);

	@Query(
		"select p from Game p "
			+ "left join fetch p.categories c "
			+ "where c.slug = :slugCategory "
			+ "order by p.id")
	List<Game> recuperarGamesPorSlugCategory(@Param("slugCategory") String slugCategory);
	
	@Query(
		value = "select p from Game p left join p.categories c where p.title like :nome and c.slug = :slugCategory order by p.id",
		countQuery = "select count(p) from Game p left join p.categories c where p.title like :nome and c.slug = :slugCategory")
	Page<Game> recuperarGamesComPaginacaoPorCategoria(Pageable pageable, @Param("nome") String nome, @Param("slugCategory") String slugCategory);
}
