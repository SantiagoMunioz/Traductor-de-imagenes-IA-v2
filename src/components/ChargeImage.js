import React, { useContext, useState } from "react";
import "../styles/ChargeImage.css";
import LanguageContext from "../context/LanguageContext";
import { ChargeImageListCategorie } from "./ChargeImageListCategorie";
import ThemeContext from "../context/ThemeContext";

const ChargeImage = () => {
    const {texts} = useContext(LanguageContext);
    const {themeConfig} = useContext(ThemeContext);
    const [catSel, setCatSel] = useState("");

    const handleChange = (e) => {
        setCatSel(e.target.value);
    }

    return(
        <div className="imageCont" style={{ backgroundColor: themeConfig.backgroundElement, color: themeConfig.color, borderColor: themeConfig.border }}>
            <h2>{texts.iTitle}</h2>
            <div className="selCategorie">
                <label>{texts.iCategorieSel}</label>
                <select
                    id="selCat"
                    className="categorieSel"
                    value={catSel}
                    onChange={handleChange}
                    style={{color: themeConfig.color, borderColor: themeConfig.border}}
                >
                    <option value="">{texts.iCategorie}</option>
                    <option value="animal">{texts.iCategorieA}</option>
                    <option value="home">{texts.iCategorieH}</option>
                    <option value="school-supplies">{texts.iCategorieS}</option>
                    <option value="vehicle">{texts.iCategorieV}</option>
                </select>
                { catSel ? <ChargeImageListCategorie categorie={catSel}/> : null }
            </div>
        </div>
    );
}

export default ChargeImage;