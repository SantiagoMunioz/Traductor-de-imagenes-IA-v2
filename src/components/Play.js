import { useContext, useEffect } from "react";
import "../styles/Play.css";
import LanguageContext from "../context/LanguageContext";

export const Play = (props) => {
    const {texts} = useContext(LanguageContext);

    useEffect(() => {
        play();
    },[props.speaking])

    const play = _ => {
        let speaking = '';
        if(!props.speaking){ speaking = texts.plAdvice; }
        else{speaking = props.speaking}
        if('speechSynthesis' in window){
            const synth = window.speechSynthesis;
            
            const utterance = new SpeechSynthesisUtterance(speaking);
            utterance.lang = 'en-GB';
            synth.speak(utterance);
            }else{
            console.error('El navegador no puede reproducir el audio');
        }   
    }

    return (
        <button className='replay' onClick={ play }>🔊</button>
    );
}