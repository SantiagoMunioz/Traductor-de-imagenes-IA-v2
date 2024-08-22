import { createContext, useState } from "react";
import Translations from "../data-bases/ContextTranslations.json";

const initialLanguage = "es";

const LanguageContext = createContext();

const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState(initialLanguage);
    const [texts, setTexts] = useState(Translations[language]);

    const handleLanguage = (e) => {
        if(e.target.value === "es"){
            setTexts(Translations.es);
            setLanguage("es");
        }else{
            setTexts(Translations.en);
            setLanguage("en");
        }
    };

    const data = { texts, handleLanguage, language };

    return (
        <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
    );
}

export { LanguageProvider };
export default LanguageContext;