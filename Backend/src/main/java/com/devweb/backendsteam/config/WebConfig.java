package com.devweb.backendsteam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.devweb.backendsteam.middleware.AuthInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Autowired
	private AuthInterceptor authInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(authInterceptor)
			.addPathPatterns("/users", "/alguma-rota-protegida"); // Adicione as rotas protegidas aqui
	}
}
