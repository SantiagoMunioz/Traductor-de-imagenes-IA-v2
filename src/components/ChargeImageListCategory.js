import React, { useContext, useRef, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import { ImageData } from "../data-bases/ImageData";
import "../styles/ChargeImageListCategory.css";
import { ChargeImageId } from "./ChargeImageId";

export const ChargeImageListCategory = ({category}) => {
    const {texts} = useContext(LanguageContext);
    const {themeConfig} = useContext(ThemeContext);
    const cateImg = ImageData.filter( image => image.category === category );
    const selImgRef = useRef(null);
    const [idSel, setIdSel] = useState("");

    const handleChange = (e) => {
        setIdSel(e.target.value);
    }

    return (
        <div className="catImgSel" style={{color: themeConfig.color}}>
            <label>{texts.iImage}</label>
            <select
                className="chImLsCtSl"
                id="selImage"
                ref={selImgRef}
                onChange={handleChange}
                style={{
                    color: themeConfig.color,
                    borderColor: themeConfig.border
                }}
            >
                <option defaultValue="" value="">{texts.iSelImage}</option>
                {cateImg.map((image) => (
                    <option key={image.id} value={image.id}>
                        {image.name}
                    </option>
                ))}
            </select>
            { idSel && < ChargeImageId category={category} imageId={idSel} /> }
        </div>
    );
};