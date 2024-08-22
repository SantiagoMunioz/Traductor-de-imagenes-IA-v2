//#region Info Translation
    /** Componente Translation
     * Se encarga de realizar la traducción según la información recibida
     * del componente ModelLoader
     * 
     * Este componente solo puede realizar una traducción puntual de la información
     * recibida, por lo que no puede formar frases, y cuenta con una base de datos
     * limitada de tipo JSON (es.json)
     */
//#endregion Info Translation

import { useContext, useEffect, useState } from "react";
import '../styles/Translation.css';
import Dictionary from "../data-bases/TranslatedWords.json";
import ThemeContext from "../context/ThemeContext";

const Translation = (props) =>{
    const {themeConfig} = useContext(ThemeContext);
    const [phrase, setPhrase] = useState("");

    useEffect(() => {
        function translate(){
            const words = props.word.split(' ');
            let translatePhrase = "";
            words.forEach((word) => {
                for ( var i = 0; i < words.length; i++){
                    word = word.toLowerCase();
                    word = word.replace(',', '');
                }
                if(Dictionary[word]){
                    translatePhrase += Dictionary[word] + " ";
                }else{
                    translatePhrase += word + " ";
                }
            });
            setPhrase(translatePhrase.trim());
        };

        translate();
    },[props.word]);

    return (
        <div className="translation" style={{color: themeConfig.color}}>
            {phrase ? <h2 className="trasnWord">{phrase}</h2> : null}
        </div>
    );
}

export default Translation;