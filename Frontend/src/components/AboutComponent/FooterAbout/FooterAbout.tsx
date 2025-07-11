import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";


export default function FooterAbout() {

 
  return (
    <div className={style['about-steam-area']}>
      <div className={style['about-steam-container']}>
        
        <div className={style['community']} id="community">
          <div className={style['community-txt-content']}>
            <h2>Participe da Comunidade</h2>
            <div className={style['about-community-txt']}>
              Conheça novas pessoas, entre em grupos, forme clãs, converse enquanto joga e muito mais! Com mais de 100
              milhões de prováveis amigos (ou inimigos), a diversão nunca acaba.
            </div>
            <div className={style['about-community-btn']}>
              <a href="#community">Visite a Comunidade</a>
            </div>
          </div>

          <div className={style['community-image']}>
            <img src="/community-image.png" alt="Comunidade" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>

        {/* Hardware */}
        <div className={style['hardware']} id="hardware">
          <div className={style['hardware-image']}>
            <img src="/hardware-image.png" alt="Hardware" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>

          <div className={style['hardware-txt-content']}>
            <h2>Experimente hardwares Steam</h2>
            <div className={style['about-hardware-txt']}>
              Criamos o Steam Deck e o headset do Valve Index para tornar ainda melhor a experiência de jogar no
              computador.
            </div>
            <div className={style['about-hardware-btn']}>
              <a href="#hardware">Experimente hardwares Steam</a>
            </div>
          </div>
        </div>

        {/* Steamworks */}
        <div className={style['steamworks']} id="steamworks">
          <div className={style['steamworks-txt-content']}>
            <h2>Experimente hardwares Steam</h2>
            <div className={style['about-steamworks-txt']}>
              Criamos o Steam Deck e o headset do Valve Index para tornar ainda melhor a experiência de jogar no
              computador.
            </div>
            <div className={style['about-steamworks-btn']}>
              <a href="#steamworks">Experimente hardwares Steam</a>
            </div>
          </div>

          <div className={style['steamworks-image']}>
            <img src="/steamworks.png" alt="Steamworks" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
