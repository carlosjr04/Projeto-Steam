package com.devweb.backendsteam.service;

import com.devweb.backendsteam.model.Language;
import com.devweb.backendsteam.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LanguageService {
	@Autowired
	private LanguageRepository languageRepository;

	public List<Language> listarIdiomas() {
		return languageRepository.findAll();
	}
}
