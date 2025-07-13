package com.devweb.backendsteam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.devweb.backendsteam.model.Achievement;
import com.devweb.backendsteam.model.Category;
import com.devweb.backendsteam.model.Game;
import com.devweb.backendsteam.model.Language;
import com.devweb.backendsteam.repository.AchievementRepository;
import com.devweb.backendsteam.repository.CategoryRepository;
import com.devweb.backendsteam.repository.GameRepository;
import com.devweb.backendsteam.repository.LanguageRepository;
import com.devweb.backendsteam.service.UserService;

@SpringBootApplication
public class BackendSteamApplication implements CommandLineRunner {

	@Autowired
	private GameRepository gameRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private LanguageRepository languageRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private AchievementRepository achievementRepository;

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
		Category metroidvania = categoryRepository.save(new Category("Metroidvania", "metroidvania", "/cat-metroidvania.webp", "Metroidvania"));
		Category acao = categoryRepository.save(new Category("Ação", "acao", "/action.webp", "Ação"));
		Category mundoAberto = categoryRepository.save(new Category("Mundo Aberto", "mundo-aberto", "/open_world.webp", "Mundo Aberto"));
		Category historiaRica = categoryRepository.save(new Category("História Rica", "historia-rica", "/story_rich.webp", "História Rica"));
		Category anime = categoryRepository.save(new Category("Anime", "anime", "/anime.webp", "Anime"));
		Category gratis = categoryRepository.save(new Category("Grátis", "gratis", "/freetoplay.webp", "Grátis"));
		Category rpg = categoryRepository.save(new Category("RPG", "rpg", "/rpg.webp", "RPG"));
		Category sobrevivencia = categoryRepository.save(new Category("Sobrevivência", "sobrevivencia", "/survival.webp", "Sobrevivência"));
		Category quebraCabeca = categoryRepository.save(new Category("Quebra Cabeça", "quebra-cabeca", "/puzzle.webp", "Quebra Cabeça"));
		Category aventura = categoryRepository.save(new Category("Aventura", "aventura", "/adventure.webp", "Aventura"));
		Category casual = categoryRepository.save(new Category("Casual", "casual", "/casual.webp", "Casual"));
		Category ficcaoCientifica = categoryRepository.save(new Category("Ficção Científica", "ficcao-cientifica", "/science_fiction.webp", "Ficção Científica"));
		Category horror = categoryRepository.save(new Category("Horror", "horror", "/horror.webp", "Horror"));
		Category fantasia = categoryRepository.save(new Category("Fantasia", "fantasia", null, "Fantasia"));
		Category cooperativo = categoryRepository.save(new Category("Cooperativo", "cooperativo", null, "Cooperativo"));
		Category humor = categoryRepository.save(new Category("Humor", "humor", null, "Humor"));
		Category plataforma = categoryRepository.save(new Category("Plataforma", "plataforma", null, "Plataforma"));
		Category doisD = categoryRepository.save(new Category("2D", "dois-d", null, "2D"));
		Category estrategia = categoryRepository.save(new Category("Estratégia", "estrategia", null, "Estratégia"));
		Category roguelike = categoryRepository.save(new Category("Roguelike", "roguelike", "/rogue_like_rogue_lite.webp", "Roguelike"));

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
		hollowKnight.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(metroidvania, doisD, plataforma, acao, mundoAberto)));
		hollowKnight.setAbout("Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.");
		hollowKnight.setDescricao("Sonhos Escondidos - Poderosos inimigos emergem! Novos Chefes. Novos Aprimoramentos. Novas Músicas.Enfrente as profundezas de um reino esquecido. Abaixo da cidade moribunda de Dirtmouth jaz um reino antigo e arruinado. Muitos são atraídos para o subterrâneo em busca de riquezas, glórias ou respostas para antigos segredos. Hollow Knight é uma aventura de ação clássica em estilo 2D por um vasto mundo interligado. Explore cavernas serpenteantes, cidades antigas e ermos mortais; lute contra criaturas malignas e alie-se a insetos bizarros, e solucione mistérios antigos no centro do reino.");
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
		marvelRivals.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(acao, ficcaoCientifica, gratis)));
		marvelRivals.setAbout("Marvel Rivals é um jogo de tiro JxJ em equipe com Super Heróis! Reúna um grupo de estrelas da Marvel, crie estratégias e combine seus poderes para executar poderosas habilidades de equipe. Lute em cenários destrutíveis e campos de batalha dinâmicos pelo universo Marvel em constante evolução.");
		marvelRivals.setDescricao("Marvel Rivals é um jogo de tiro JxJ em equipe com Super Heróis! Reúna um grupo de estrelas da Marvel, crie estratégias e combine seus poderes para executar poderosas habilidades de equipe. Lute em cenários destrutíveis e campos de batalha dinâmicos pelo universo Marvel em constante evolução.Elenco Extenso e Variado de Personagens MarvelEscolha entre vários Super Heróis e Supervilões favoritos dos fãs. como os Vingadores, os Guardiões da Galáxia, os X-Men e muitos outros de todo o Multiverso Marvel. O Teste Alfa começará em maio, quando os jogadores terão acesso a vários Super Heróis e Supervilões jogáveis, incluindo personagens icônicos como Pantera Negra, Homem-Aranha, Magneto e Magia.");
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
		terraria.setClassificacao(new java.util.ArrayList<>(java.util.List.of("10 anos", "Violência")));
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
		terraria.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(sobrevivencia, aventura, doisD, rpg, plataforma, mundoAberto)));
		terraria.setAbout("Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.");
		terraria.setDescricao("Cave, lute, explore, construa! Nada é impossível nesse jogo de aventura cheio de ação. O mundo é a sua tela de pintar e o chão em si é a sua tinta.Pegue suas ferramentas e vá! Faça novas armas para lutar contra uma variedades de inimigos em numerosos biomas. Cave profundamente no subsolo para encontrar acessórios, dinheiro e outras coisas úteis. Reúna recursos para criar tudo o que você precisa para tornar o mundo o seu próprio. Construa uma casa, um forte ou até mesmo um castelo. Pessoas vão se mudar e viver lá e talvez até vender para você diferentes mercadorias para ajudá-lo em sua jornada.Mas cuidado, há ainda mais desafios à sua espera...Você está à altura da tarefa?");
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
		skyrim.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(mundoAberto, aventura, rpg, acao)));
		skyrim.setAbout("Forje seu caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas serpenteantes, lute contra criaturas malignas e alie-se a insetos bizarros num estilo clássico 2D desenhado à mão.");
		skyrim.setDescricao("Vencedor de mais de 200 prémios de Jogo do Ano, The Elder Scrolls V: Skyrim Special Edition dá vida à fantasia épica com um nível de detalhe espantoso. A Special Edition inclui o jogo aclamado pela crítica e suplementos com novas funcionalidades como arte e efeitos remasterizados, raios volumétricos, profundidade de campo dinâmica, reflexos espaciais e muito mais.Skyrim Special Edition também traz todo o poder de Bethesda Game Studios Creations ao PC e às consolas. Novas missões, cenários, personagens, diálogos, armaduras, armas e muito mais: com Creations, não há limites para o que poderás encontrar.");
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

		// --- Additional Games ---
		Game stardewValley = new Game();
		stardewValley.setTitle("Stardew Valley");
		stardewValley.setPreco(new java.math.BigDecimal("24.99"));
		stardewValley.setCover("/stardew-valley-cover.webp");
		stardewValley.setDesconto(0);
		stardewValley.setDesenvolvedora("ConcernedApe");
		stardewValley.setClassificacao(new java.util.ArrayList<>(java.util.List.of("Livre")));
		stardewValley.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines)));
		stardewValley.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
				"Um jogador",
				"Multijogador",
				"Nuvem Steam",
				"Cartas Colecionáveis Steam",
				"Conquistas Steam",
				"Remote play",
				"Compatibilidade em família",
				"Controle de Xbox"
		)));
		stardewValley.setDataLancamento(java.time.LocalDate.of(2016, 2, 26));
		stardewValley.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(rpg, doisD, casual, mundoAberto)));
		stardewValley.setAbout("Stardew Valley é um RPG de simulação agrícola onde você pode construir sua fazenda dos sonhos, explorar cavernas e formar relacionamentos com os habitantes da cidade.");
		stardewValley.setDescricao("Você herdou a antiga fazenda de seu avô em Stardew Valley. Armado com ferramentas de segunda mão e algumas moedas, você começa sua nova vida. Você conseguirá transformar os campos cobertos de mato em uma fazenda próspera? Não será fácil. Desde que a Joja Corporation chegou à cidade, os antigos modos de vida desapareceram. O centro comunitário, outrora o centro mais vibrante da cidade, está agora em ruínas. Mas o vale parece cheio de oportunidades. Com um pouco de dedicação, você pode ser quem restaura Stardew Valley à grandeza!");
		stardewValley.setScenes(new java.util.ArrayList<>(java.util.List.of(
				"/stardew-valley-scene-1.jpg",
				"/stardew-valley-scene-2.jpg",
				"/stardew-valley-scene-3.jpg",
				"/stardew-valley-scene-4.jpg"
		)));
		stardewValley.setExemplo(new java.util.ArrayList<>(java.util.List.of(
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_b887651a93b0525739049eb4194f633de2df75be.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_9ac899fe2cda15d48b0549bba77ef8c4a090a71c.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_4fa0866709ede3753fdf2745349b528d5e8c4054.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_d836f0a5b0447fb6a2bdb0a6ac5f954949d3c41e.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_c32865684c8d45b3f57fbb1e93bfa47c2a845cbf.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_6422d297347258086b389e3d5d9c0e0c698312e4.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_a3ddf22cda3bd722df77dbdd58dbec393906b654.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_5616d9a6c08c6f6c69bead58fda7c0dee05f4edc.116x65.jpg?t=1711128146",
			"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/ss_64d942a86eb527ac817f30cc04406796860a6fc1.116x65.jpg?t=1711128146"
		)));
		gameRepository.save(stardewValley);
		for (int i = 1; i <= 6; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "_stardew.jpg", "Descricao generica", false, stardewValley));
		}

		Game celeste = new Game();
		celeste.setTitle("Celeste");
		celeste.setPreco(new java.math.BigDecimal("39.99"));
		celeste.setCover("/celeste-cover.jpg");
		celeste.setDesconto(0);
		celeste.setDesenvolvedora("Maddy Makes Games");
		celeste.setClassificacao(new java.util.ArrayList<>(java.util.List.of("Livre", "Desafiador")));
		celeste.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano)));
		celeste.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
				"Um jogador",
				"Nuvem Steam",
				"Cartas Colecionáveis Steam",
				"Conquistas Steam",
				"Remote play",
				"Compatibilidade em família",
				"Controle de Xbox"
		)));
		celeste.setDataLancamento(java.time.LocalDate.of(2018, 1, 25));
		celeste.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(plataforma, doisD, anime, quebraCabeca)));
		celeste.setAbout("Ajude Madeline a sobreviver aos seus demônios internos em sua jornada até o topo da montanha Celeste, neste jogo de plataforma super apertado e feito à mão.");
		celeste.setDescricao("Celeste é um jogo de plataforma de ação e aventura que desafia os jogadores a escalar uma montanha cheia de perigos e mistérios. Com controles precisos e uma história emocionante, Celeste é uma experiência inesquecível para jogadores de todas as idades.");
		celeste.setScenes(new java.util.ArrayList<>(java.util.List.of(
				"/celeste-scene-1.jpg",
				"/celeste-scene-2.jpg",
				"/celeste-scene-3.jpg",
				"/celeste-scene-4.jpg"
		)));
		celeste.setExemplo(new java.util.ArrayList<>(java.util.List.of(
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_1ad297c2044cdcf450ee83e56350cafb590da755.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_03bfe6bd5ddac7f747c8d2aa1a4f82cfd53c6dcb.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_4b0f0222341b64a37114033aca9994551f27c161.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_1012b11ad364ad6c138a25a654108de28de56c5f.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_832ef0f27c3d6efdaa4b5d1cc896dce0999bc9e8.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_1098b655a622720cfd549b104736a4eca8948100.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_0eab901ec5c364aa18225fa608ff9cbcc1f432bf.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_3140f6f87aa74c20e142c36d74691f930eda88d5.116x65.jpg?t=1714089525",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/ss_e0159d08620e917e632788c960d9593e5e7f431c.116x65.jpg?t=1714089525"
		)));
		gameRepository.save(celeste);
		for (int i = 1; i <= 5; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "_celeste.jpg", "Descricao generica", false, celeste));
		}

		// The Witcher
		Game theWitcher3 = new Game();
		theWitcher3.setTitle("The Witcher 3: Wild Hunt");
		theWitcher3.setPreco(new java.math.BigDecimal("129.99"));
		theWitcher3.setCover("/the-witcher-3-cover.jpg");
		theWitcher3.setDesconto(10);
		theWitcher3.setDesenvolvedora("CD Projekt Red");
		theWitcher3.setClassificacao(new java.util.ArrayList<>(java.util.List.of("18 anos", "Violência", "Conteúdo Adulto")));
		theWitcher3.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines, russo)));
		theWitcher3.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
				"Um jogador",
				"Nuvem Steam",
				"Cartas Colecionáveis Steam",
				"Conquistas Steam",
				"Remote play",
				"Compatibilidade em família",
				"Controle de Xbox"
		)));
		theWitcher3.setDataLancamento(java.time.LocalDate.of(2015, 5, 19));
		theWitcher3.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(mundoAberto, historiaRica, rpg, aventura, fantasia)));
		theWitcher3.setAbout("The Witcher 3: Wild Hunt é um RPG de mundo aberto com uma história rica e envolvente.");
		theWitcher3.setDescricao("Em The Witcher 3: Wild Hunt, você assume o papel de Geralt de Rívia, um caçador de monstros profissional em busca de sua filha adotiva desaparecida, que está sendo perseguida pela Caçada Selvagem, uma força sobrenatural e destrutiva.");
		theWitcher3.setScenes(new java.util.ArrayList<>(java.util.List.of(
				"/the-witcher-3-scene-1.jpg",
				"/the-witcher-3-scene-2.jpg",
				"/the-witcher-3-scene-3.jpg",
				"/the-witcher-3-scene-4.jpg"
		)));
		theWitcher3.setExemplo(new java.util.ArrayList<>(java.util.List.of(
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.116x65.jpg?t=1749199563",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_0901e64e9d4b8ebaea8348c194e7a3644d2d832d.116x65.jpg?t=1749199563",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_112b1e176c1bd271d8a565eacb6feaf90f240bb2.116x65.jpg?t=1749199563",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_d1b73b18cbcd5e9e412c7a1dead3c5cd7303d2ad.116x65.jpg?t=1749199563",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_107600c1337accc09104f7a8aa7f275f23cad096.116x65.jpg?t=1749199563",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_64eb760f9a2b67f6731a71cce3a8fb684b9af267.116x65.jpg?t=1749199563",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_eda99e7f705a113d04ab2a7a36068f3e7b343d17.116x65.jpg?t=1749199563",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_d5b80eb63c12a6484f26796f3e34410651bba068.116x65.jpg?t=1749199563"
		)));
		gameRepository.save(theWitcher3);
		for (int i = 1; i <= 8; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "_witcher3.jpg", "Descricao generica", false, theWitcher3));
		}

		// Portal 2
		Game portal2 = new Game();
		portal2.setTitle("Portal 2");
		portal2.setPreco(new java.math.BigDecimal("19.99"));
		portal2.setCover("/portal-2-cover.jpg");
		portal2.setDesconto(0);
		portal2.setDesenvolvedora("Valve");
		portal2.setClassificacao(new java.util.ArrayList<>(java.util.List.of("Livre")));
		portal2.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines)));
		portal2.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
				"Um jogador",
				"Multijogador",
				"Nuvem Steam",
				"Cartas Colecionáveis Steam",
				"Conquistas Steam",
				"Remote play",
				"Compatibilidade em família",
				"Controle de Xbox"
		)));
		portal2.setDataLancamento(java.time.LocalDate.of(2011, 4, 18));
		portal2.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(quebraCabeca, ficcaoCientifica, plataforma, cooperativo, aventura)));
		portal2.setAbout("Portal 2 é um jogo de quebra-cabeça e ficção científica que desafia sua mente.");
		portal2.setDescricao("Portal 2 expande a jogabilidade inovadora do original com novos elementos de quebra-cabeça, uma história envolvente e um modo cooperativo que redefine o gênero.");
		portal2.setScenes(new java.util.ArrayList<>(java.util.List.of(
				"/portal-2-scene-1.jpg",
				"/portal-2-scene-2.jpg",
				"/portal-2-scene-3.jpg",
				"/portal-2-scene-4.jpg"
		)));
		portal2.setExemplo(new java.util.ArrayList<>(java.util.List.of(
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_f3f6787d74739d3b2ec8a484b5c994b3d31ef325.116x65.jpg?t=1745363004",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_6a4f5afdaa98402de9cf0b59fed27bab3256a6f4.116x65.jpg?t=1745363004",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_0cdd90fafc160b52d08b303d205f9fd4e83cf164.116x65.jpg?t=1745363004",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_ec35a739b4b33270eb170d9e561c5b016cba50a6.116x65.jpg?t=1745363004",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_3d13161104a04603a0524536770c5f74626db4c0.116x65.jpg?t=1745363004",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_8a772608d29ffd56ac013d2ac7c4388b96e87a21.116x65.jpg?t=1745363004",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_358127df30a766a1516ad139083c2bcec3fe0975.116x65.jpg?t=1745363004",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/ss_410c7955c3cc8ca4a5e3c81daa214f534c9aabc8.116x65.jpg?t=1745363004"
		)));
		gameRepository.save(portal2);
		for (int i = 1; i <= 6; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "_portal2.jpg", "Descricao generica", false, portal2));
		}

		// Dead By Daylight
		Game deadByDaylight = new Game();
		deadByDaylight.setTitle("Dead By Daylight");
		deadByDaylight.setPreco(new java.math.BigDecimal("49.99"));
		deadByDaylight.setCover("/dead-by-daylight-cover.jpg");
		deadByDaylight.setDesconto(0);
		deadByDaylight.setDesenvolvedora("Behaviour Interactive");
		deadByDaylight.setClassificacao(new java.util.ArrayList<>(java.util.List.of("18 anos")));
		deadByDaylight.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol, alemao, frances, italiano, japones, coreano, chines)));
		deadByDaylight.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
				"Multijogador",
				"Nuvem Steam",
				"Cartas Colecionáveis Steam",
				"Conquistas Steam",
				"Remote play",
				"Compatibilidade em família",
				"Controle de Xbox"
		)));
		deadByDaylight.setDataLancamento(java.time.LocalDate.of(2016, 6, 14));
		deadByDaylight.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(horror, cooperativo, sobrevivencia, acao)));
		deadByDaylight.setAbout("Dead By Daylight é um jogo de terror e sobrevivência multijogador.");
		deadByDaylight.setDescricao("Dead By Daylight é um jogo de terror e sobrevivência multijogador onde um jogador assume o papel de um assassino brutal e os outros quatro jogam como sobreviventes tentando escapar do assassino e evitar serem capturados e mortos.");
		deadByDaylight.setScenes(new java.util.ArrayList<>(java.util.List.of(
				"/dead-by-daylight-scene-1.jpg",
				"/dead-by-daylight-scene-2.jpg",
				"/dead-by-daylight-scene-3.jpg",
				"/dead-by-daylight-scene-4.jpg"
		)));
		deadByDaylight.setExemplo(new java.util.ArrayList<>(java.util.List.of(
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_659500624438a4aa77bfdf304cba3ecebcd92ed9.116x65.jpg?t=1750346018",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_ca6b39f2fcac8feb75d23976b1be31290d58d159.116x65.jpg?t=1750346018",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_4075aac79adfe1a5b71665d2cc5ff7d52122650b.116x65.jpg?t=1750346018",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_d3778cc9576bf3457f4ba896a443a114c0455753.116x65.jpg?t=1750346018",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_b142095e4f9e5d9db978270ea09e8b9149db9f18.116x65.jpg?t=1750346018",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_430577c364a68dbe24e8a1d895bd678ea04b87d5.116x65.jpg?t=1750346018",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_969a7841466e12f063c2d9a72520cce1c3b2f331.116x65.jpg?t=1750346018",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/381210/ss_cd57ce3a42d66d90164534ad71388527f1e0cf7b.116x65.jpg?t=1750346018"
		)));
		gameRepository.save(deadByDaylight);
		for (int i = 1; i <= 6; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "_dbd.jpg", "Descricao generica", false, deadByDaylight));
		}

		// R.E.P.O
		Game repo = new Game();
		repo.setTitle("R.E.P.O");
		repo.setPreco(new java.math.BigDecimal("35.99"));
		repo.setCover("/repo-cover.jpg");
		repo.setDesconto(20);
		repo.setDesenvolvedora("Pixelated Milk");
		repo.setClassificacao(new java.util.ArrayList<>(java.util.List.of("16 anos", "Violência")));
		repo.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues, espanhol)));
		repo.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
				"Um jogador",
				"Nuvem Steam",
				"Cartas Colecionáveis Steam",
				"Conquistas Steam",
				"Remote play"
		)));
		repo.setDataLancamento(java.time.LocalDate.of(2023, 3, 15));
		repo.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(horror, cooperativo, acao, ficcaoCientifica, sobrevivencia, humor)));
		repo.setAbout("R.E.P.O é um jogo de ação e sobrevivência em um mundo pós-apocalíptico cheio de desafios.");
		repo.setDescricao("Em R.E.P.O, você assume o papel de um sobrevivente em um mundo devastado, enfrentando inimigos perigosos e resolvendo mistérios enquanto luta para reconstruir a civilização.");
		repo.setScenes(new java.util.ArrayList<>(java.util.List.of(
				"/repo-scene-1.jpg",
				"/repo-scene-2.jpg",
				"/repo-scene-3.jpg",
				"/repo-scene-4.jpg"
		)));
		repo.setExemplo(new java.util.ArrayList<>(java.util.List.of(
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3241660/ss_e6babaab52581f81df91e50768cee6a9334ef6ec.116x65.jpg?t=1750949552",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3241660/ss_af7d8d6302d543d89019bad49ea853a970bb82de.116x65.jpg?t=1750949552",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3241660/ss_a66715d57329c456d91aeb11fbd406e7d8c5dbc7.116x65.jpg?t=1750949552",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3241660/ss_cd332c2299810a65c6aee61c04750197a919692a.116x65.jpg?t=1750949552",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3241660/ss_e4dc1bc0ada8fb7cb164b3ac37be82f51aae5627.116x65.jpg?t=1750949552",
				"https://store.fastly.steamstatic.com/public/images/v5/ico_game_highlight_video.png"
		)));
		gameRepository.save(repo);
		for (int i = 1; i <= 4; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "_repo.jpg", "Descricao generica", false, repo));
		}

		Game balatro = new Game();
		balatro.setTitle("Balatro");
		balatro.setPreco(new java.math.BigDecimal("19.99"));
		balatro.setCover("/balatro-cover.jpg");
		balatro.setDesconto(0);
		balatro.setDesenvolvedora("Balatro Studios");
		balatro.setClassificacao(new java.util.ArrayList<>(java.util.List.of("Livre", "Cartas", "Estratégia")));
		balatro.setIdiomas(new java.util.HashSet<>(java.util.Arrays.asList(ingles, portugues)));
		balatro.setCompatibilidade(new java.util.ArrayList<>(java.util.List.of(
				"Um jogador",
				"Nuvem Steam",
				"Cartas Colecionáveis Steam",
				"Conquistas Steam"
		)));
		balatro.setDataLancamento(java.time.LocalDate.of(2024, 7, 10));
		balatro.setCategories(new java.util.HashSet<>(java.util.Arrays.asList(casual, estrategia, roguelike, doisD)));
		balatro.setAbout("Balatro é um jogo de estratégia baseado em cartas com uma jogabilidade inovadora.");
		balatro.setDescricao("Balatro combina estratégia e construção de baralhos em um jogo de cartas único e desafiador.");
		balatro.setScenes(new java.util.ArrayList<>(java.util.List.of(
				"/balatro-scene-1.jpg",
				"/balatro-scene-2.jpg",
				"/balatro-scene-3.jpg",
				"/balatro-scene-4.jpg"
		)));
		balatro.setExemplo(new java.util.ArrayList<>(java.util.List.of(
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/96208723dbedef49d71bf1b0a74aee1689018c50/ss_96208723dbedef49d71bf1b0a74aee1689018c50.116x65.jpg?t=1752164335",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/ss_4862112e5030f74a5818cd4c31347d699ac5adf3.116x65.jpg?t=1752164335",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/ss_3be65a7dd3be072d567e11883d208861a7e959fa.116x65.jpg?t=1752164335",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/ss_e32ac94d7d1d6be7dd015d78f2b52aeb4cc282ed.116x65.jpg?t=1752164335",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/ss_b8455573ec1fd2c9412f22bd8df05f2d8027a95b.116x65.jpg?t=1752164335",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/ss_075cb45cbfa97d8139fb11f21667d6e35f908640.116x65.jpg?t=1752164335",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/ss_ae055e0e583ac65000920ce33511df73f40814f4.116x65.jpg?t=1752164335",
				"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2379780/ss_204350350761316ad3aa8b0184689f3f93e01f7b.116x65.jpg?t=1752164335"
		)));
		gameRepository.save(balatro);
		for (int i = 1; i <= 5; i++) {
			achievementRepository.save(new Achievement("/conquista" + i + "_balatro.jpg", "Descricao generica", false, balatro));
		}

		userService.adicionarUsuarioBase();
	}
}
