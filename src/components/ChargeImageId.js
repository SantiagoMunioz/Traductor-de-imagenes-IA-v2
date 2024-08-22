import React, { useContext, useEffect, useState } from "react";
import ImageContext from "../context/ImageContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/ChargeImageId.css";

export const ChargeImageId = ({category, imageId}) => {
    const {setImageInfo} = useContext(ImageContext);
    const {themeConfig} = useContext(ThemeContext);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        setImageUrl(`${process.env.PUBLIC_URL}/images/${category}/${imageId}.jpg`); // Images were downloaded from pexels.com
    }, [category, imageId]);

    const handleImageLoad = () => {
        setImageInfo(imageUrl);
    }

    return (
        <section style={{color: themeConfig.color}}>
            <img alt={category} src={imageUrl} href={imageUrl} onLoad={handleImageLoad}></img>
            <label>{imageId}</label>
        </section>
    );
};