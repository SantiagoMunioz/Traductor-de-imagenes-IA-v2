import { useContext, useRef, useState } from "react";
import "../styles/PhotoMakerAux.css";
import ImageContext from "../context/ImageContext";
import ThemeContext from "../context/ThemeContext";

export const PhotoMakerAux = () => {
    const {themeConfig} = useContext(ThemeContext);
    const {setImageInfo} = useContext(ImageContext);
    const [imageUrl, setImageUrl] = useState("");
    const [camErrMes, setCamErrMes] = useState(null);
    const camErr = useRef(null);

    //#region Cámara/Imagen auxiliar
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        catchImageData(file);
    }

    function catchImageData(file){
        if(file){
            const reader = new FileReader();
            reader.onload = handleFileRead;
            reader.readAsDataURL(file);
        };
    }

    const handleFileRead = (event) => {
        const content = event.target.result;
        setImageUrl(content);
        setImageInfo(content);
    }
    
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];

        if(!file){
            console.log('No se han cargado imágenes');
            return;
        }

        if(event.target.files.length === 0){
            setCamErrMes('!El acceso a la cámara ha sido denegado!');
            return;
        }

        handleFileChange(event);
    }
    //#endregion Cámara/Imagen auxiliar

    return(
        <div className={`camSec ${themeConfig.filter ? 'inverted' : ''}`}>
            <input
                className='secCam'
                type='file'
                accept='image/*'
                capture='camera'
                ref={camErr}
                onChange={handleFileInputChange}
            />
            <div className="imgCont">
                <img src={imageUrl} alt=""/>
            </div>
            <p> {camErrMes} </p>
        </div>
    );
}