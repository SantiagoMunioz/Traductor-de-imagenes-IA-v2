import React, { useContext, useRef, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import DictionaryEnEs from "../data-bases/TranslatedWords.json";
import { SearchWords } from "../functions/SearchWords";
import { TranslationMMT } from "../functions/TranslationMMT";
import "../styles/Words.css";
import { Announcement } from "./Announcement";
import { Play } from "./Play";

const Words = () => {
    const {themeConfig} = useContext(ThemeContext);
    const {texts} = useContext(LanguageContext);
    const areaRef = useRef(null);
    const boxRef = useRef(null);
    const [langText, setLangText] = useState("es|en");
    const [langTextAux, setLangTextAux] = useState("en");
    const [tWTr, setTWTr] = useState("");
    const [tWTrR, setTWTrR] = useState("");
    const [trltng, setTrltng] = useState(false);
    const [badW, setBadW] = useState("");

    const handleLangChange = (e) => {
        setLangText(e.target.value);
        handleLangChangeAux(e.target.value);
    }

    function handleLangChangeAux(lang){
        if(lang === "es|en"){ setLangTextAux("en"); }
        else{ setLangTextAux("es"); }
    }

    function clearBox(){
        const box = boxRef.current;
        const area = areaRef.current;

        if(box && area){
            box.value = "";
            area.value = "";
            setTWTrR("");
            setTWTr("");
        }
    }

    function translateMMT(){
        setTrltng(true);
        if(tWTr !== null && tWTr !== undefined && tWTr !== ""){
            if(SearchWords(tWTr)){
                console.log(`${texts.wWarningText}, ${tWTr}`);
                setBadW("Warning");
                setTrltng(false);
            }else{
                const box = boxRef.current;
                TranslationMMT(tWTr, langText).then((translatedText) => {
                    const jsonResponse = JSON.parse(translatedText);
                    setTWTrR(jsonResponse.responseData.translatedText);
                    box.value = tWTrR;
                    setTrltng(false);
                }).catch((error) => {
                    console.error('Error al traducir', error);
                    translate();
                });
            }
        }
    }

    function translate(){
        const area = areaRef.current;
        const box = boxRef.current;
        let translationWords = "";
        setTWTr(area.value);
        const words = tWTr.split(' ');
        words.forEach((word) => {
            for(var i = 0; i < words.length; i++){
                word = word.toLowerCase();
                word = word.replace(',', '');
                word = word.replace('.', '');
            }
            if(DictionaryEnEs[langText][word]){
                translationWords += DictionaryEnEs[langTextAux][word] + " ";
            }else{
                translationWords += word + " ";
            }
        });

        setTWTrR(translationWords.trim());
        box.value = tWTrR;
    }

    function closeAnnounce(){
        setBadW("");
    }

    return(
        <div className="wordsCont" style={{ color: themeConfig.color, backgroundColor: themeConfig.backgroundElement, borderColor: themeConfig.border }}>
            <h2 className="wTitle">{texts.wTitle1}</h2>
            <section className="wTrSect">
                <textarea
                    ref={areaRef}
                    className="trArea"
                    rows="4" cols="20"
                    onChange={(e) => setTWTr(e.target.value)}
                    placeholder={`${texts.wPlaceholderTxt} (${langText === "es|en" ? texts.wLangSelTxtEs : texts.wLangSelTxtEn})`}
                    style={{ color: themeConfig.color, borderColor: themeConfig.border }}
                />
                <textarea
                    ref={boxRef}
                    className="trArea"
                    placeholder={`${texts.wPlaceholderTxtR} (${langText === "es|en" ? texts.wLangSelTxtEn : texts.wLangSelTxtEs})`}
                    readOnly
                    value={tWTrR}
                    style={{ color: themeConfig.color, borderColor: themeConfig.border }}
                />
                <button className="wBtn" onClick={translateMMT} style={{ color: themeConfig.color, borderColor: themeConfig.border }}>
                    {texts.wButtonTr}
                </button>
                {trltng && <label className="translating" style={{ color: themeConfig.color }}> ⬜ </label>}
                <button className="wBtn" onClick={clearBox} style={{ color: themeConfig.color, borderColor: themeConfig.border }}>
                    {texts.wButtonClr}
                </button>
                <Play speaking={tWTrR}/>
                <label className="selLang" style={{color: themeConfig.color}}>{texts.setLanguage}</label>
                <select onChange={handleLangChange} defaultValue="es|en" style={{color: themeConfig.color, borderColor: themeConfig.border}}>
                    <option value="es|en">{texts.wLangSeEn}</option>
                    <option value="en|es">{texts.wLangSeEs}</option>
                </select>
            </section>
            {badW && <Announcement type={badW} title={badW} text={texts.wWarningText} onClose={closeAnnounce}/>}
        </div>
    );
}

export default Words;