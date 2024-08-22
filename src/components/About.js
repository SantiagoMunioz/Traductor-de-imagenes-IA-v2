import { useContext, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import ThemeContext from "../context/ThemeContext";
import "../styles/About.css";
import { Announcement } from "./Announcement";

export const About = _ =>{
    const {texts, language} = useContext(LanguageContext);
    const {themeConfig} = useContext(ThemeContext);
    const [aboutV, setAboutV] = useState("");
    const [type, setType] = useState("about");
    const [abTitle, setAbTitle] = useState("about");
    const [showAnnounce, setShowAnnounce] = useState(false);
    
    const readFile = async() =>{
        try{
            const response = await fetch(`${process.env.PUBLIC_URL}/About/${language}.txt`);
            if(!response.ok){ throw new Error('No se puede obtener el archivo'); }
            const fileContent = await response.text();
            setAboutV(fileContent);
            setAbTitle(texts.aAATitle);
        }catch(error){
            setAboutV(`${texts.aAError}, ${error}`);
            setType("Warning");
        }
        setShowAnnounce(true);
    }

    function closeAnnounce(){ setShowAnnounce(false); }

    return(
        <div className="aboutCont">
            <button className="aboutButton" onClick={readFile} style={{ color: themeConfig.color }}>{texts.aAAbout}</button>
            {showAnnounce && <Announcement type={type} title={abTitle} text={aboutV} onClose={closeAnnounce}/>}
        </div>
    );
}