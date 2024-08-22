import { useContext } from "react";
import ChargeImage from "../components/ChargeImage";
import { ChargeScreen } from '../components/ChargeScreen';
import { ModelLoader } from "../components/ModelLoader";
import { PhotoCont } from "../components/PhotoCont";
import LanguageContext from "../context/LanguageContext";
import ModelContext from "../context/ModelContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/ImageTranslationPage.css";

export const ImageTranslationPage = _ => {
  const {texts} = useContext(LanguageContext);
  const {themeConfig} = useContext(ThemeContext);
  const {modelOn} = useContext(ModelContext);

  return(
    <div className="imageTCont">
      <h2
        className="imagesTitle"
        style={{
          color: themeConfig.color,
          textShadow: `0 0 20px ${themeConfig.backgroundElement}`,
          WebkitTextStroke: `1px ${themeConfig.backgroundElement}`
        }}
      >
        {texts.iPTitle}
      </h2>
      {modelOn ? <></> : <ChargeScreen/>}
      <PhotoCont/>
      <ChargeImage/>
      <ModelLoader/>
    </div>
  );
}