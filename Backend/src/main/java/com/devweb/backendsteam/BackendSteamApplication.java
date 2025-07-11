package com.devweb.backendsteam;

import com.devweb.backendsteam.model.*;
import com.devweb.backendsteam.repository.*;
import com.devweb.backendsteam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendSteamApplication implements CommandLineRunner {

	@Autowired private GameRepository gameRepository;
	@Autowired private CategoryRepository categoryRepository;
	@Autowired private LanguageRepository languageRepository;
	@Autowired private UserService userService;
	@Autowired private AchievementRepository achievementRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendSteamApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Clean up existing games and achievements
		achievementRepository.deleteAll();
		gameRepository.deleteAll();

		// --- Languages ---
		Language ingles = languageRepository.save(new Language("inglês", "ingles", "Inglês", true, true, true));
		Language portugues = languageRepository.save(new Language("português (Brasil)", "portugues-br", "Português (Brasil)", true, true, true));
		Language espanhol = languageRepository.save(new Language("espanhol (Espanha)", "espanhol-es", "Espanhol (Espanha)", true, false, true));
		Language alemao = languageRepository.save(new Language("alemão", "alemao", "Alemão", true, false, true));
		Language frances = languageRepository.save(new Language("francês", "frances", "Francês", true, false, true));
		Language italiano = languageRepository.save(new Language("italiano", "italiano", "Italiano", true, false, true));
		Language japones = languageRepository.save(new Language("japonês", "japones", "Japonês", true, false, true));
		Language coreano = languageRepository.save(new Language("coreano", "coreano", "Coreano", true, false, true));
		Language chines = languageRepository.save(new Language("chinês (simplificado)", "chines-simplificado", "Chinês (Simplificado)", true, false, true));
		Language russo = languageRepository.save(new Language("russo", "russo", "Russo", true, false, false));
		Language polones = languageRepository.save(new Language("polonês", "polones", "Polonês", true, false, false));
		Language turco = languageRepository.save(new Language("turco", "turco", "Turco", true, false, false));
		Language arabe = languageRepository.save(new Language("árabe", "arabe", "Árabe", true, false, true));
		Language hindi = languageRepository.save(new Language("hindi", "hindi", "Hindi", true, false, true));

		// --- Categories ---
		Category metroidvania = categoryRepository.save(new Category("Metroidvania", "metroidvania", "/cat-metroidvania.jpg", "Metroidvania"));
		Category soulslike = categoryRepository.save(new Category("Soulslike", "soulslike", "/cat-soulslike.jpg", "Soulslike"));
		Category plataforma = categoryRepository.save(new Category("Plataforma", "plataforma", "/cat-plataforma.jpg", "Plataforma"));
		Category doisD = categoryRepository.save(new Category("2D", "2d", "/cat-2d.jpg", "2D"));

		// --- Games ---
		Game hollowKnight = new Game();
		hollowKnight.setTitle("Hollow Knight");
		hollowKnight.setPreco(new java.math.BigDecimal("46.99"));
		hollowKnight.setCover("/hollow-knight-image.jpg");
		hollowKnight.setDesconto(0);
		hollowKnight.setDesenvolvedora("Team Cherry");
		hollowKnight.setClassificacao(new java.util.ArrayList<>(java.util.List.of("Livre", "Violência")));
		hollowKnight.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines)));
		hollowKnight.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
			"Um jogador",
			"Nuvem Steam",
			"Cartas Colecionáveis Steam",
			"Conquistas Steam",
			"Remote play",
			"Compatibilidade em família",
			"Controle de Xbox"
		)));
		hollowKnight.setDataLancamento(java.time.LocalDate.of(2017, 2, 24));
		hollowKnight.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(metroidvania, soulslike, plataforma, doisD)));
		hollowKnight.setAbout("Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.");
		hollowKnight.setScenes(new java.util.ArrayList<>(java.util.List.of(
			"/hollow-knight-scene-1.jpg",
			"/hollow-knight-scene-2.jpg",
			"/hollow-knight-scene-3.webp",
			"/hollow-knight-scene-4.jpg"
		)));
		hollowKnight.setExemplo(new java.util.ArrayList<>(java.util.List.of(
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_5384f9f8b96a0b9934b2bc35a4058376211636d2.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_d5b6edd94e77ba6db31c44d8a3c09d807ab27751.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_a81e4231cc8d55f58b51a4a938898af46503cae5.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_62e10cf506d461e11e050457b08aa0e2a1c078d0.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_bd76bd88bc5334ee56ae3d5f0d8dec4455e8e3b8.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_33a645903d6dd9beec39f272a3daf57174a6cc26.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_47f3523dbea462aff2ca4bc9f605faaf80a792b2.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_92c7e8f34c00bdb455070ecdd5b746f0d2f6d808.116x65.jpg?t=1695270428",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/ss_5384f9f8b96a0b9934b2bc35a4058376211636d2.116x65.jpg?t=1695270428"
		)));
		gameRepository.save(hollowKnight);
		for (int i = 1; i <= 11; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "H.jpg", "Descricao generia", false, hollowKnight));
		}

		// Marvel Rivals
		Game marvelRivals = new Game();
		marvelRivals.setTitle("Marvel Rivals");
		marvelRivals.setPreco(new java.math.BigDecimal("0.00"));
		marvelRivals.setCover("/MarvelRivals.jpg");
		marvelRivals.setDesconto(0);
		marvelRivals.setDesenvolvedora("Team Cherry");
		marvelRivals.setClassificacao(new java.util.ArrayList<>(java.util.List.of("10 anos", "Violência")));
		marvelRivals.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines, russo, polones, turco, arabe, hindi)));
		marvelRivals.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
			"JXJ on-line",
			"Cooperativo on-line",
			"Multijogador multiplataforma",
			"Conquistas Steam",
			"Compras em aplicativo",
			"Controle de Xbox"
		)));
		marvelRivals.setDataLancamento(java.time.LocalDate.of(2017, 2, 24));
		marvelRivals.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(metroidvania, soulslike, plataforma, doisD)));
		marvelRivals.setAbout("Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.");
		marvelRivals.setScenes(new java.util.ArrayList<>(java.util.List.of(
			"/imagem_maior.jpg",
			"/imagem_maior2.jpg",
			"/MarvelRivals_Scene-1.jpg",
			"/MarvelRivals_Scene.jpg"
		)));
		marvelRivals.setExemplo(new java.util.ArrayList<>(java.util.List.of(
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/90d61838fa6270a5a5e52ce4da63866de1f15067/ss_90d61838fa6270a5a5e52ce4da63866de1f15067.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/9e810af14b1c53fbeb0802fdee46ade039677318/ss_9e810af14b1c53fbeb0802fdee46ade039677318.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/bc26795fdb621e7d7cf1c5d7edc8a48e266df8cc/ss_bc26795fdb621e7d7cf1c5d7edc8a48e266df8cc.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/afe033093bc10dedb2fb966607c237b5a10f6c70/ss_afe033093bc10dedb2fb966607c237b5a10f6c70.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/2bf7258c3e9584807e854921f83baa694f4b41d5/ss_2bf7258c3e9584807e854921f83baa694f4b41d5.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/c89c5a5874ec7b5eaaa1319c72842e1c72876e42/ss_c89c5a5874ec7b5eaaa1319c72842e1c72876e42.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/ss_87923a8e7d294db69069e3451664115bb373013d.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/ss_51dfe5152a8dcaf375a71d0d07433af334bf7a84.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/ss_719f339a932cb46a9e3e780f27b588ad2e3c4885.116x65.jpg?t=1744365532",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2767030/90d61838fa6270a5a5e52ce4da63866de1f15067/ss_90d61838fa6270a5a5e52ce4da63866de1f15067.116x65.jpg?t=1744365532"
		)));
		gameRepository.save(marvelRivals);
		for (int i = 1; i <= 8; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "H.jpg", "Descricao generia", false, marvelRivals));
		}

		// Terraria
		Game terraria = new Game();
		terraria.setTitle("Terraria");
		terraria.setPreco(new java.math.BigDecimal("32.99"));
		terraria.setCover("/Terraria.avif");
		terraria.setDesconto(0);
		terraria.setDesenvolvedora("Team Cherry");
		terraria.setClassificacao(new java.util.ArrayList<>(java.util.List.of("10 anos", "Violência", "Violência")));
		terraria.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines, russo, polones, turco)));
		terraria.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
			"Um jogador",
			"Nuvem Steam",
			"Cartas Colecionáveis Steam",
			"Conquistas Steam",
			"Remote play",
			"Compatibilidade em família",
			"Controle de Xbox"
		)));
		terraria.setDataLancamento(java.time.LocalDate.of(2017, 2, 24));
		terraria.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(metroidvania, soulslike, plataforma, doisD)));
		terraria.setAbout("Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.");
		terraria.setScenes(new java.util.ArrayList<>(java.util.List.of(
			"/terraria-scene.webp",
			"/terraria-scene-1.png",
			"/terraria-scene-2.webp",
			"/terraria-scene-3.gif"
		)));
		terraria.setExemplo(new java.util.ArrayList<>(java.util.List.of(
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_8c03886f214d2108cafca13845533eaa3d87d83f.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_ae168a00ab08104ba266dc30232654d4b3c919e5.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_9edd98caaf9357c2f40758f354475a56e356e8b0.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_75ea9a7e39eb34b40efa1e6dfd2536098dc4734b.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_782374517c1792debd74d24856203b876eba3a5d.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_04dd9f0a5773b686a452ba480b951f83b3ed5061.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_26c4a091c482be28efe1ecf4dfb498273e5a9107.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_830aa37570410b80947636785ff62096c0bf276f.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_0d805c81ef85dfd2a7a8b25da96f8066017fb3b3.116x65.jpg?t=1731252354",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/ss_8c03886f214d2108cafca13845533eaa3d87d83f.116x65.jpg?t=1731252354"
		)));
		gameRepository.save(terraria);
		for (int i = 1; i <= 8; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "H.jpg", "Descricao generia", false, terraria));
		}

		// Skyrim
		Game skyrim = new Game();
		skyrim.setTitle("Skyrim");
		skyrim.setPreco(new java.math.BigDecimal("149.00"));
		skyrim.setCover("/Skyrim.jpg");
		skyrim.setDesconto(20);
		skyrim.setDesenvolvedora("Team Cherry");
		skyrim.setClassificacao(new java.util.ArrayList<>(java.util.List.of("10 anos", "Violência")));
		skyrim.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines, russo, polones)));
		skyrim.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
			"Um jogador",
			"Nuvem Steam",
			"Cartas Colecionáveis Steam",
			"Conquistas Steam",
			"Remote play",
			"Compatibilidade em família",
			"Controle de Xbox"
		)));
		skyrim.setDataLancamento(java.time.LocalDate.of(2017, 2, 24));
		skyrim.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(metroidvania, soulslike, plataforma, doisD)));
		skyrim.setAbout("Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.");
		skyrim.setScenes(new java.util.ArrayList<>(java.util.List.of(
			"/skyrim-scene-1.jpg",
			"/skyrim-scene-2.webp",
			"/skyrim-scene-3.jpg",
			"/skyrim-scene-4.jpg"
		)));
		skyrim.setExemplo(new java.util.ArrayList<>(java.util.List.of(
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_73c1a0bb7e1720c8a1847186c3ddd837d3ca7a8d.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_d64b646612ab1402bdda8e400672aa0dbcb352ea.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_b6bb6f79278505b3f48567f08c21f7a0eb171c68.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_921ccea650df936a0b14ebd5dd4ecc73c1d2a12d.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_8c7ecd394afb581b9b2137a3de04433f78fdf4ea.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_50c3da9e29e9b0368889379cdd03a71aba8d614c.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_2ca72f4ecc42a18dd4bf056c539a9794c2b2493d.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_5d19c69d33abca6f6271d75f371d4241c0d6b2d1.116x65.jpg?t=1721923149",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/489830/ss_73c1a0bb7e1720c8a1847186c3ddd837d3ca7a8d.116x65.jpg?t=1721923149"
		)));
		gameRepository.save(skyrim);
		for (int i = 1; i <= 7; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "H.jpg", "Descricao generia", false, skyrim));
		}

		userService.adicionarUsuarioBase();
	}
}