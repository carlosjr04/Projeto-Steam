package com.devweb.backendsteam.repository;

import com.devweb.backendsteam.model.EmbeddedIds.WishlistId;
import com.devweb.backendsteam.model.Wishlist;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, WishlistId> {
	List<Wishlist> findByUser_UserId(String userId);
}