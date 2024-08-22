import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { WindowResize } from "../functions/WindowResize";
import "../styles/Navbar.css";
import Control from "./Control";

export const Navbar = () => {
  const {texts} = useContext(LanguageContext);
  const {themeConfig} = useContext(ThemeContext);
  const wResize = WindowResize();
  let menu = <></>;

  menu = <>
    <Link className="navLink" to="/translate-words" style={{ color: themeConfig.color }}>{texts.wTitle}</Link>
    <Link className="navLink" to="/translate-images" style={{ color: themeConfig.color }}>{texts.rTitle}</Link>
    <Link className="navLink" to="/games" style={{ color: themeConfig.color }}>{texts.gTitle}</Link>
  </>

  return (
    <nav
      className={`navCont ${wResize < 720 ? "reduced" : ""}`}
      style={{
        background: themeConfig.backgroundNav,
        borderColor: themeConfig.border
      }}
    >
      <p className="menu-resized" style={{ color: themeConfig.color }}>≡</p>
      <div className="links-cont">
        <section className="sect home">
          <h2 className="cTitle" style={{ color: themeConfig.color }}>{texts.headerTitle}</h2>
          <Link className="navLink" to="/">🏠</Link>
        </section>
        <section className="sect links">
          {menu}
        </section>
        <Control/>
      </div>
    </nav>
  )
}
