import { useContext, useState } from "react";
import { GameWords } from "../components/GameWords";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/GamesPage.css";

export const GamesPage = _ => {
  const {texts} = useContext(LanguageContext);
  const {themeConfig} = useContext(ThemeContext);
  const [wordsGame, setWordsGame] = useState(false);

  function closeGameW(){ setWordsGame(false); }

  return(
    <div className="gamesCont" >
      <h1
        style={{
          color: themeConfig.color,
          textShadow: `0 0 20px ${themeConfig.backgroundElement}`,
          WebkitTextStroke: `1px ${themeConfig.backgroundElement}`
        }}
      >
        {texts.gTitle}
      </h1>
      <button
        className="game one"
        style={{
          color: themeConfig.color,
          borderColor: themeConfig.border,
          background: themeConfig.backgroundElement
        }}
        onClick={() => setWordsGame(true)}
      >
        {texts.gWTitle1}
      </button>
      { wordsGame ? <GameWords onClose={ closeGameW }/> : null }
    </div>
  );
}