import { useContext, useEffect, useState } from "react";
import "../styles/Announcement.css";
import LanguageContext from "../context/LanguageContext";
import { Play } from "./Play";

export const Announcement = ({type, title, text, onClose}) => {
    const {texts} = useContext(LanguageContext);
    const [borderColor, setBorderColor] = useState('white');
    const [titleColor, setTitleColor] = useState('white');
    const [aTitle, setATitle] = useState("");
    const [advicement, setAdvicement] = useState("");

    useEffect(() => {
        if( type === "Warning" ){
            setATitle(texts.aTitleW);
            setBorderColor('red');
            setTitleColor('red');
            setAdvicement(texts.plAdvicement);
        }
        else{
            setATitle(title);
            setBorderColor('white');
            setTitleColor('white');
        }
    },[text]);
    
    function closeAnnounce(){ onClose(); }

    return(
        <div className="announceCont" style={{borderColor}}>
            <h1 className="announceTitle" style={{color : titleColor}}>{aTitle}</h1>
            <hr style={{borderColor}}/>
            <div className="textCont">
                <p className="announceText">{text}</p>
            </div>
            <div className="divButton">
                <button className="announceButton" style={{borderColor, color : titleColor}} onClick={closeAnnounce}>X</button>
            </div>
            {advicement ? <Play speaking={advicement}/> : null}
        </div>
    );
}