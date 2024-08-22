import { useContext } from "react";
import "../styles/ChargeScreen.css";
import LanguageContext from "../context/LanguageContext";

export const ChargeScreen = _ => {
    const {texts} = useContext(LanguageContext);
    return(
        <div className="chargeScreenCont">
            <div className="loader1"></div>
            <div className="loader2"></div>
            <div className="loader3"></div>
            <label className="chargeText">{texts.chargingScreen}</label>
        </div>
    );
}