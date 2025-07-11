package com.devweb.backendsteam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "\"user\"")
public class User implements org.springframework.security.core.userdetails.UserDetails {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_id", unique = true)
	private String userId;

	@Column(unique = true, nullable = false)
	private String email;

	private String name;
	private String username;
	private String password; // Password Hash
	private Integer age;
	private String genre;
	private String role;

	@CreationTimestamp
	@Column(updatable = false)
	private LocalDate createdAt;

	@UpdateTimestamp private LocalDate updatedAt;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<OwnedGame> ownedGames;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Wishlist> wishlist;

	public User(
		String name,
		String username,
		String email,
		String password,
		Integer age,
		String genre,
		String role,
		LocalDate createdAt,
		LocalDate updatedAt
		) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.age = age;
		this.genre = genre;
		this.role = role;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public String getUserDisplayName() {
	return this.username;
	}

	@Override
	public java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> getAuthorities() {
		// Retorna a role do usuário como GrantedAuthority
		return java.util.Collections.singletonList(
			new org.springframework.security.core.authority.SimpleGrantedAuthority(this.role != null ? this.role : "USER")
		);
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() { return true; }

	@Override
	public boolean isAccountNonLocked() { return true; }

	@Override
	public boolean isCredentialsNonExpired() { return true; }

	@Override
	public boolean isEnabled() { return true; }
}
