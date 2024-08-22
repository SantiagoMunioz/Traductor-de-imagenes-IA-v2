import "../styles/PhotoCont.css";
import { useContext, useState } from "react";
import PhotoMaker from "./PhotoMaker";
import { PhotoMakerAux } from "./PhotoMakerAux";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";

export const PhotoCont = _ => {
    const {texts} = useContext(LanguageContext);
    const {themeConfig} = useContext(ThemeContext);
    const [cameraComponent, setCameraComponent] = useState(true);

    const handleElementChange = _ => {
        if(cameraComponent){ setCameraComponent(false); }
        else{ setCameraComponent(true); }
    }

    return(
        <div className="photoImageCont" style={{ borderColor: themeConfig.border, background: themeConfig.backgroundElement }}>
            <button className="changeButton" style={{ borderColor: themeConfig.border, color: themeConfig.color }} onClick={handleElementChange}>
                {cameraComponent ? texts.pButtonChangeImage : texts.pButtonChangeCamera}
            </button>
            { cameraComponent ? <PhotoMaker/> : <PhotoMakerAux/> }
        </div>
    );
}