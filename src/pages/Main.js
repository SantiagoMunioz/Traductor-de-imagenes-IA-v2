import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/Main.css";

const Main = _ =>{
  const {texts} = useContext(LanguageContext);
  const {themeConfig} = useContext(ThemeContext);
  return(
    <div className="mainCont">
      <section
        className="sect words"
        style={{
          borderColor: themeConfig.borderMSect,
          background: themeConfig.backgroundElement
        }}
      >
        <p className="sectText words" style={{ color: themeConfig.color }}>
          {texts.hTextW1}
          <br/>
          {texts.hTextw2}
        </p>
        <Link className="btnLink" to="/translate-words" style={{ color: themeConfig.color, borderColor: themeConfig.borderMSect }}>{texts.wTitle}</Link>
      </section>
      <section
        className="sect images"
        style={{
          borderColor: themeConfig.borderMSect,
          background: themeConfig.backgroundElement
        }}
      >
        <Link className="btnLink" to="/translate-images" style={{ color: themeConfig.color, borderColor: themeConfig.borderMSect }}>{texts.rTitle}</Link>
        <p className="sectText images" style={{ color: themeConfig.color }}>
          {texts.hTextI1}
          <br/>
          {texts.hTextI2}
          {texts.hTextI3}
        </p>
      </section>
      <section
        className="sect games"
        style={{
          borderColor: themeConfig.borderMSect,
          background: themeConfig.backgroundElement
        }}
      >
        <p className="sectText games" style={{ color: themeConfig.color }}>
          {texts.hTextG}
        </p>
        <Link className="btnLink" to="/games" style={{ color: themeConfig.color, borderColor: themeConfig.borderMSect }}>{texts.gTitle}</Link>
      </section>
    </div>
  );
}

export default Main;