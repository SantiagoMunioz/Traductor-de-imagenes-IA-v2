import React, { useContext, useState, useRef, useEffect } from "react";
import "../styles/PhotoMaker.css";
import LanguageContext from "../context/LanguageContext";
import ImageContext from "../context/ImageContext";
import ThemeContext from "../context/ThemeContext";

const d = document, n = navigator;

const PhotoMaker = () => {
    //#region Variables
    const {themeConfig} = useContext(ThemeContext);
    const {texts} = useContext(LanguageContext);
    const {setImageInfo} = useContext(ImageContext);
    const [err, setErr] = useState(false);
    const [camera, setCamera] = useState(null);
    var videoRef = useRef(null);
    var canvasRef = useRef(null);
    //#endregion Variables

    //#region Cámara
    useEffect(() => {
        const getUserMedia = async () => {
            if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
                try {
                    const stream = await n.mediaDevices.getUserMedia({
                        video: { facingMode: 'environment' },
                    });
                    videoRef.current.srcObject = stream;
                    setCamera(true);
                } catch (err) {
                    setCamera(null);
                    setErr(true);
                }
            }else{ setErr(`No se puede acceder a la cámara`); }
        };
        
        getUserMedia();
    },[setImageInfo]);
    //#endregion Cámara

    //#region Foto
    const Photo = () => {
        if(d.getElementById('video') != null && camera === true){
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const photo = canvas.toDataURL('image/png');

            setImageInfo(photo);
        }else{ console.log('¡Not access to camera!'); }
    }
    //#endregion Foto

    return(
        <div className='photoCont' style={{ color: themeConfig.color, backgroundColor: themeConfig.backgroundElement, borderColor: themeConfig.border }}>
            <h2>{texts.pTitle}</h2>
            <div className='err'>
                {err ?
                    <p className='error'> ¡{texts.pErrorMessage1} <br/> {texts.pErrorMessage2} <br/> (<mark>{texts.pErrorError}</mark>)! </p>
                :
                    <div className='videoCont'>
                        <video ref={videoRef} id='video' autoPlay={true}/>
                        <button id='btn-capture' className='tkPhoto' onClick={Photo} style={{ color: themeConfig.color, borderColor: themeConfig.border }}>
                            {texts.pButton}
                        </button>
                        <canvas ref={canvasRef} className='photoCanv' id='canvas'/>
                    </div>
                }
            </div>
        </div>
    );
}

export default PhotoMaker;