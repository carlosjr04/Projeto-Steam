import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './style.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      

      <div className={styles['footer-div']}>
        <div className={styles['footer-content']}>
          <div className={styles.bar}></div>

          <div className={styles.footer_logo}>
            <div className={styles.footer_logo_valve}>
              <img src="/footerLogo_valve_new.png" alt="Valve Logo" />
            </div>
            <div className={styles.footer_logo_steam}>
              <img src="/logo_steam_footer.png" alt="Steam Logo" />
            </div>
          </div>

          <div className={styles['footer-txt']}>
            <p>© 2025 Valve Corporation. Todos os direitos reservados. Todas as marcas comerciais são propriedade dos respetivos proprietários nos E.U.A. e outros países.</p>
            <p>
              IVA incluído em todos os preços onde aplicável.
              <a href="https://store.steampowered.com/privacy_agreement/?snr=1_44_44_" target="_blank" rel="noreferrer">Política de privacidade</a>
              <span aria-hidden="true">|</span>
              <a href="https://store.steampowered.com/legal/?snr=1_44_44_" target="_blank" rel="noreferrer">Termos legais</a>
              <span aria-hidden="true">|</span>
              <a href="https://store.steampowered.com/subscriber_agreement/?snr=1_44_44_" target="_blank" rel="noreferrer">Acordo de Subscrição Steam</a>
              <span aria-hidden="true">|</span>
              <a href="https://store.steampowered.com/steam_refunds/?snr=1_44_44_" target="_blank" rel="noreferrer">Reembolsos</a>
              <span aria-hidden="true">|</span>
              <a href="https://store.steampowered.com/account/cookiepreferences/?snr=1_44_44_" target="_blank" rel="noreferrer">Cookies</a>
            </p>
          </div>

          <br />
          <div className={styles.bar}></div>

          <div className={styles['footer-links']}>
            <a href="http://www.valvesoftware.com/about" target="_blank" rel="noreferrer">Acerca da Valve</a>
            <span aria-hidden="true">|</span>
            <a href="http://www.valvesoftware.com" target="_blank" rel="noreferrer">Carreiras</a>
            <span aria-hidden="true">|</span>
            <a href="http://www.steampowered.com/steamworks/" target="_blank" rel="noreferrer">Steamworks</a>
            <span aria-hidden="true">|</span>
            <a href="https://partner.steamgames.com/steamdirect" target="_blank" rel="noreferrer">Distribuição no Steam</a>
            <span aria-hidden="true">|</span>
            <a href="https://help.steampowered.com/pt/?snr=1_44_44_" target="_blank" rel="noreferrer">Apoio</a>
            <span aria-hidden="true">|</span>
            <a href="https://store.steampowered.com/digitalgiftcards/?snr=1_44_44_" target="_blank" rel="noreferrer">Cartões-Presente</a>
            <span aria-hidden="true">|</span>
            <a href="https://steamcommunity.com/linkfilter/?u=http%3A%2F%2Fwww.facebook.com%2FSteam" target="_blank" rel="noopener noreferrer">
              <img src="https://store.fastly.steamstatic.com/public/images/ico/ico_facebook.png" alt="Facebook: Steam" />
            </a>
            <span aria-hidden="true">|</span>
            <a href="http://twitter.com/steam" target="_blank" rel="noreferrer">
              <img src="https://store.fastly.steamstatic.com/public/images/ico/ico_twitter.png" alt="X: @Steam" />
            </a>
            <span aria-hidden="true">|</span>
            <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fbsky.app%2Fprofile%2Fsteampowered.com" target="_blank" rel="noopener noreferrer">
              <img src="https://store.fastly.steamstatic.com/public/images/ico/ico_bsky.png" alt="Bluesky: Steampowered" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}