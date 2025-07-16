package com.devweb.backendsteam.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.devweb.backendsteam.repository.UserRepository;
import com.devweb.backendsteam.util.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.cors(Customizer.withDefaults()) // usa o CorsConfig configurado
				.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth
				.requestMatchers("/users/login", "/users","/users/cadastro", "/public/**", "/games/**").permitAll()
				.anyRequest().permitAll())
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

}

@Component
class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserRepository userRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			String token = authHeader.substring(7);
			try {
				Claims claims = JwtUtil.parseToken(token).getPayload();
				String email = claims.getSubject();
				UserDetails user = userRepository.findByEmail(email).orElse(null);
				if (user != null) {
					UsernamePasswordAuthenticationToken authentication
							= new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			} catch (JwtException e) {
				// Token inválido, não autentica
			}
		}
		filterChain.doFilter(request, response);
	}
}
