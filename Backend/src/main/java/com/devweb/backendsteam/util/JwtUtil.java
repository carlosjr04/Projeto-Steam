package com.devweb.backendsteam.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jws;
import javax.crypto.SecretKey;
import java.util.Date;
import com.devweb.backendsteam.model.User;

public class JwtUtil {
	private static final SecretKey key = Keys.hmacShaKeyFor("supersecretkeysupersecretkeysupersecretkey12".getBytes());
	private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24h

	public static String generateToken(User user) {
		return Jwts.builder()
			.subject(user.getEmail())
			.claim("userId", user.getUserId())
			.claim("role", user.getRole())
			.issuedAt(new Date())
			.expiration(new Date(System.currentTimeMillis() + EXPIRATION))
			.signWith(key)
			.compact();
	}

	public static Jws<io.jsonwebtoken.Claims> parseToken(String token) {
		return Jwts.parser()
			.verifyWith(key)
			.build()
			.parseSignedClaims(token);
	}
}
