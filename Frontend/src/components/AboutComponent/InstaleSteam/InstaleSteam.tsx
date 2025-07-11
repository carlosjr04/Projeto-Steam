import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";

export default function InstaleSteam() {
  return (
    <div className={style["about-header"]}>
      <div className={style["about-header-main"]}>
        <div className={style["about-header-content"]}>
          <div className={style["steam-logo"]}>
            <img src="/logo_steam.svg" alt="Steam Logo" />
          </div>

          <p className={style["subtitle"]}>
            A Steam é o destino perfeito para jogar, criar jogos e conversar.
          </p>

          <div className={style["online-stats"]}>
            <div className={style["online"]}>
              <div
                className={`${style["online-stat-label"]} ${style["players-on-line"]}`}
              >
                on-line
              </div>
              <p>26,375,082</p>
            </div>
            <div className={style["playing"]}>
              <div
                className={`${style["online-stat-label"]} ${style["players-in-game"]}`}
              >
                jogando agora
              </div>
              <p>7,358,989</p>
            </div>
          </div>
        </div>

        <div className={style["about-install-steam"]}>
          <div className={style["about-install"]}>
            <a
              href="https://cdn.fastly.steamstatic.com/client/installer/SteamSetup.exe"
              className={style["about-install-link"]}
            >
              Instale a Steam
            </a>
          </div>

          <div className={style["about-installers"]}>
            <div className={style["available-os"]}>Também disponível para:</div>
            <div className={style["platforms"]}>
              <a
                className={style["platform_icon"]}
                href="https://cdn.fastly.steamstatic.com/client/installer/steam.dmg"
              >
                <img src="/macos.svg" alt="MacOS" />
              </a>
              <a
                className={style["platform_icon"]}
                href="https://cdn.fastly.steamstatic.com/client/installer/steam.deb"
              >
                <img src="/steamdeck.svg" alt="Steam Deck" />
              </a>
              <a
                className={style["platform_icon"]}
                href="https://support.google.com/chromebook?p=steam_on_chromebook"
              >
                <img src="/chromebook.svg" alt="Chromebook" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={style["about-video"]}>
        <video
          width="100%"
          height="auto"
          autoPlay
          muted
          loop
          playsInline
          poster="/about_poster.jpg" // ajuste se tiver poster real
        >
          <source src="/about_hero_loop_web.webm" type="video/webm" />
          <source src="/about_hero_loop_web.mp4" type="video/mp4" />
        </video>
        <div className={style["about-video-gradient"]}></div>
      </div>

      <a className={style["scroll-to"]} href="#about-games">
        Saiba mais
        <span className={style["arrow-down"]}></span>
      </a>
    </div>
  );
}
