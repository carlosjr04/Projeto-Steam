package com.devweb.backendsteam.middleware;

import com.devweb.backendsteam.model.User;
import com.devweb.backendsteam.repository.UserRepository;
import com.devweb.backendsteam.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.server.ResponseStatusException;

@Component
public class AuthInterceptor implements HandlerInterceptor {
	@Autowired
	private UserRepository userRepository;

	@Override
	public boolean preHandle(HttpServletRequest request, jakarta.servlet.http.HttpServletResponse response, Object handler) {
		String authHeader = request.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token não informado");
		}
		String token = authHeader.substring(7);
		try {
			Jws<Claims> claimsJws = JwtUtil.parseToken(token);
			String email = claimsJws.getPayload().getSubject();
			User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não encontrado"));
			request.setAttribute("user", user);
			return true;
		} catch (JwtException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token inválido");
		}
	}
}
