import "../styles/GameWords.css";
import { useEffect, useRef, useState } from "react";
import bad from "../assets/sound-effects/bad-sound.mp3";
import win from "../assets/sound-effects/win-sound.mp3";
import lose from "../assets/sound-effects/lose-sound.mp3";
import { useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import WordsDataBase from "../data-bases/GamesDatabase.json";
import { EsWords, EnWords } from "../data-bases/GameWordsDB";

export const GameWords = ({ onClose }) => {
    const {texts, language} = useContext(LanguageContext);
    const [randomWord, setRandomWord] = useState("");
    const [answer, setAnswer] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [word, setWord] = useState("");
    const [life, setLife] = useState(5);
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(true);
    const [valAmount, setValAmount] = useState(0);
    const word1 = useRef(null);
    const txt1 = useRef(null);
    const txt2 = useRef(null);
    const txt3 = useRef(null);
    const txt4 = useRef(null);
    const txt5 = useRef(null);
    const txt6 = useRef(null);
    const txt7 = useRef(null);
    const txt8 = useRef(null);
    const txt9 = useRef(null);
    const txt10 = useRef(null);
    const txt11 = useRef(null);
    const txt12 = useRef(null);
    const txt13 = useRef(null);
    const txt14 = useRef(null);
    const txt15 = useRef(null);
    const txt16 = useRef(null);
    const txt17 = useRef(null);
    const txt18 = useRef(null);
    const txt19 = useRef(null);
    const txt20 = useRef(null);

    useEffect(() => {
        const area = word1.current;

        if(life < 1){
            area.value = `${texts.gWLoseValue} ${answer}, ${answer1}`;
            new Audio(lose).play();
        }
        if( !turn &&  (life <= 3 && life > 0)){ help(); }
    },[life]);

    function help(){
        let size = 0;
        let answerSel = null;

        const textsVals = [
            txt1.current, txt2.current, txt3.current, txt4.current, txt5.current,
            txt6.current, txt7.current, txt8.current, txt9.current, txt10.current,
            txt11.current, txt12.current, txt13.current, txt14.current, txt15.current,
            txt16.current, txt17.current, txt18.current, txt19.current, txt20.current,
        ];

        if( answer.length > answer1.length ){
            size = answer.length;
            answerSel = answer;
        }else{
            size = answer1.length;
            answerSel = answer1;
        }

        for(var i=0; i<size; i++){
            let valBool = Math.floor(Math.random() * 2);
            if(valBool === 1 && (valAmount < (size - 2) || valAmount < 5)){
                textsVals[i].value = answerSel[i];
                setValAmount(valAmount + 1);
            }
        }
    }

    useEffect(() => {
        createRandomWord();
    },[]);

    useEffect(() => {
        if(randomWord && WordsDataBase[language][randomWord]){
            clear();
            const selWords = WordsDataBase[language][randomWord].split('-');
            setWord(randomWord);
            
            if (selWords.length >= 1) {
                setAnswer(selWords[0]);
                
                if (selWords.length === 2) {
                    setAnswer1(selWords[1]);
                } else {
                    setAnswer1("");
                }
            } else {
                console.error(`${texts.gWError}`);
            }
        }
    },[randomWord]);

    function createRandomWord(){
        if(language === "es"){
            const randomVal = Math.floor(Math.random() * EsWords.length);
            setRandomWord(EsWords[randomVal]);
        }
        if(language === "en"){
            const randomVal = Math.floor(Math.random() * EnWords.length);
            setRandomWord(EnWords[randomVal]);
        }
        setAnswer("");
        setAnswer1("");
        setValAmount(0);
    }

    function play(){
        const area = word1.current;
        const textAreas = [
            txt1.current, txt2.current, txt3.current, txt4.current, txt5.current,
            txt6.current, txt7.current, txt8.current, txt9.current, txt10.current,
            txt11.current, txt12.current, txt13.current, txt14.current, txt15.current,
            txt16.current, txt17.current, txt18.current, txt19.current, txt20.current
        ];

        const atLeastOneFieldFilled = textAreas.some(ref => ref.value.trim() !== '');
        
        if(atLeastOneFieldFilled){
            let txtAnswer = "";

            for(var i=0; i<20; i++){
                if(textAreas[i].value !== "" && textAreas[i].value !== null && textAreas[i].value !== undefined){
                    txtAnswer = txtAnswer + textAreas[i].value;
                }
            }
            
            txtAnswer = txtAnswer.toLowerCase();
            
            if(life >= 1){
                if( (txtAnswer === answer && (answer !== undefined || answer !== null || answer !== ""))
                    ||
                    (txtAnswer === answer1 && (answer1 !== undefined || answer1 !== null || answer1 !== ""))
                ){
                    area.value = "correcto";
                    new Audio(win).play();
                    setScore(score + 1);
                    createRandomWord();
                    setTurn(true);
                }else{
                    setLife(life - 1);
                    new Audio(bad).play();
                    setTurn(false);
                }
            }
        }else{
            setLife(life - 1);
            new Audio(bad).play();
            setTurn(false);
        }
    }

    function clear(){
        const area = word1.current;
        const textRefs = [
            txt1, txt2, txt3, txt4, txt5,
            txt6, txt7, txt8, txt9, txt10,
            txt11, txt12, txt13, txt14, txt15,
            txt16, txt17, txt18, txt19, txt20
        ];

        textRefs.forEach((ref) => {
            ref.current.value = null;
        });

        area.value = "";
    }

    function reload(){
        setScore(0);
        setLife(5);
        createRandomWord();
    }

    function closeGameW(){ onClose(); }

    return(
        <div className="wordsGameCont">
            <button className="closeButton" onClick={closeGameW}>X</button>
            <h1 className="gameTitle">{texts.gWTitle}</h1>
            <section className="gameSect">
                <h2 className="scoreCounter">{texts.gWPoints} {score}</h2>
                <h2 className="lifeCounter">{texts.gWLife} {life}</h2>
                <textarea className="txtAreaGame" value={word} ref={word1} readOnly/>
                <section className="answerSect">
                    <label className="answerTitle">{texts.gWInstruction}</label>
                    <textarea className="textAnswer text1" ref={txt1} maxLength={1}/>
                    <textarea className="textAnswer text2" ref={txt2} maxLength={1}/>
                    <textarea className="textAnswer text3" ref={txt3} maxLength={1}/>
                    <textarea className="textAnswer text4" ref={txt4} maxLength={1}/>
                    <textarea className="textAnswer text5" ref={txt5} maxLength={1}/>
                    <textarea className="textAnswer text6" ref={txt6} maxLength={1}/>
                    <textarea className="textAnswer text7" ref={txt7} maxLength={1}/>
                    <textarea className="textAnswer text8" ref={txt8} maxLength={1}/>
                    <textarea className="textAnswer text9" ref={txt9} maxLength={1}/>
                    <textarea className="textAnswer text10" ref={txt10} maxLength={1}/>
                    <textarea className="textAnswer text11" ref={txt11} maxLength={1}/>
                    <textarea className="textAnswer text12" ref={txt12} maxLength={1}/>
                    <textarea className="textAnswer text13" ref={txt13} maxLength={1}/>
                    <textarea className="textAnswer text14" ref={txt14} maxLength={1}/>
                    <textarea className="textAnswer text15" ref={txt15} maxLength={1}/>
                    <textarea className="textAnswer text16" ref={txt16} maxLength={1}/>
                    <textarea className="textAnswer text17" ref={txt17} maxLength={1}/>
                    <textarea className="textAnswer text18" ref={txt18} maxLength={1}/>
                    <textarea className="textAnswer text19" ref={txt19} maxLength={1}/>
                    <textarea className="textAnswer text20" ref={txt20} maxLength={1}/>
                    <button className="playButton" onClick={play}>{texts.gWPlay}</button>
                    { life < 1 ?
                        <>
                            <label className="reloadLabel">{texts.gWLoseMessage}</label>
                            <button className="reloadButton" onClick={reload}>{texts.gWReload}</button>
                        </>
                    :
                        null
                    }
                </section>
            </section>
        </div>
    );
}