import style from "./style.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  name: string;
  
}

export default function CompatibilidadeUnd(compatibilidade: Props) {
  return (
    <div className={style["Compatibilidade-unidade"]}>
      <div className={style["Compatibilidade-foto"]}>
        <img src={`/${compatibilidade.name}.png`} alt="" />
      </div>
      <div className={style["Compatibilidade-texto"]}>
        <p>{compatibilidade.name}</p>
      </div>
    </div>
  );
}
