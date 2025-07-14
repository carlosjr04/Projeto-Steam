package com.devweb.backendsteam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.backendsteam.model.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
	List<Wishlist> findByUser_UserId(String userId);
}