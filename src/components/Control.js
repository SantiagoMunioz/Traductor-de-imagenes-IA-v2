import React, { useContext, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/Control.css";
import { About } from "./About";

const Control = () => {
  const {texts, handleLanguage} = useContext(LanguageContext);
  const {handleTheme, themeConfig} = useContext(ThemeContext);
  const [showControl, setShowControl] = useState(false);
  let themeOptions = <></>;

  themeOptions = <>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="dark">{texts.themeDark}</option>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="darkLightblue">{texts.themeDarkLightblue}</option>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="darkOrange">{texts.themeDarkOrange}</option>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="darkRed">{texts.themeDarkRed}</option>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="light">{texts.themeLight}</option>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="lightLightblue">{texts.themeLightLightblue}</option>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="lightOrange">{texts.themeLightOrange}</option>
    <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="lightRed">{texts.themeLightRed}</option>
  </>;

  return(
    <div className={`controlCont ${ showControl ? "clicked":""}`} onClick={() => setShowControl(!showControl)}>
      <div className="iconControl" style={{ color: themeConfig.color }}>
        {showControl ? 
          <label>X</label>
          :
          <label>⚙</label>
        }
      </div>
      <div className="compCont" style={{ color: themeConfig.color, background: themeConfig.backgroundControl, borderColor: themeConfig.border }}>
        <section className="secTitle">
          <h2 className="cTitle" style={{ color: themeConfig.color }}>{texts.cTitle}</h2>
        </section>
        <section className="secTheme">
          <p className="themeSelected" style={{ color: themeConfig.color }}>{texts.theme}</p>
          <select
            className="selControl"
            style={{
              color: themeConfig.color,
              borderColor: themeConfig.border
            }}
            onChange={handleTheme}
          >
            {themeOptions}
          </select>
        </section>
        <section className="finalSec">
          <h3>{texts.setLanguage}</h3>
          <select
            className="selControl"
            onChange={handleLanguage}
            style={{
              color: themeConfig.color,
              borderColor: themeConfig.border
            }}
          >
            <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="es">Español</option>
            <option style={{ color: themeConfig.color, background: themeConfig.backgroundNav }} value="en">English</option>
          </select>
          <About/>
        </section>
      </div>
    </div>
  );
}

export default Control;