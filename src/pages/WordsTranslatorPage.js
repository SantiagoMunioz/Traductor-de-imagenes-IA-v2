import { useContext } from "react";
import Words from "../components/Words";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/WordsTranslatorPage.css";

export const WordsTranslatorPage = () => {
  const {texts} = useContext(LanguageContext);
  const {themeConfig} = useContext(ThemeContext);

  return (
    <div className="wordsTr-cont">
      <h2
        className={`wordsTitle ${themeConfig.color === "black" ? "black":"white"}`}
        style={{
          color: themeConfig.color,
          textShadow: `0 0 20px ${themeConfig.backgroundElement}`,
          WebkitTextStroke: `1px ${themeConfig.backgroundElement}` 
        }}
      >
        {texts.wTitle}
      </h2>
      <Words/>
    </div>
  )
}
