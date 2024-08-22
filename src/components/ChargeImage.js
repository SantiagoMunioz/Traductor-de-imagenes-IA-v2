import React, { useContext, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/ChargeImage.css";
import { ChargeImageListCategory } from "./ChargeImageListCategory";

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
            <div className="selCategory">
                <label>{texts.iCategorySel}</label>
                <select
                    id="selCat"
                    className="categorySel"
                    value={catSel}
                    onChange={handleChange}
                    style={{color: themeConfig.color, borderColor: themeConfig.border}}
                >
                    <option value="">{texts.iCategory}</option>
                    <option value="animal">{texts.iCategoryA}</option>
                    <option value="home">{texts.iCategoryH}</option>
                    <option value="school-supplies">{texts.iCategoryS}</option>
                    <option value="vehicle">{texts.iCategoryV}</option>
                </select>
                { catSel ? <ChargeImageListCategory category={catSel}/> : null }
            </div>
        </div>
    );
}

export default ChargeImage;