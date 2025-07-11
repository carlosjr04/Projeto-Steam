package com.devweb.backendsteam.service;

import com.devweb.backendsteam.model.OwnedGame;
import com.devweb.backendsteam.model.EmbeddedIds.OwnedGameId;
import com.devweb.backendsteam.repository.OwnedGameRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnedGameService {

	@Autowired
	private OwnedGameRepository ownedGameRepository;

	public List<OwnedGame> listarTodos() {
		return ownedGameRepository.findAll();
	}

	public OwnedGame buscarPorId(OwnedGameId id) {
	return ownedGameRepository.findById(id).orElse(null);
	}

	public List<OwnedGame> listarPorUsuario(String userId) {
		return ownedGameRepository.findByUser_UserId(userId);
	}

	public OwnedGame adicionar(OwnedGame ownedGame) {
	return ownedGameRepository.save(ownedGame);
	}

	public void remover(OwnedGameId id) {
	ownedGameRepository.deleteById(id);
	}
}