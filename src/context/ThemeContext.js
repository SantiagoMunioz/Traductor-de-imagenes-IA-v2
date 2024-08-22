import { createContext, useState } from "react";
import Theme from "../data-bases/ContextTheme.json";

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("dark");
    const [themeConfig, setThemeConfig] = useState(Theme[theme]);

    const handleTheme = (e) => {
        if(e.target.value === "dark"){
            setThemeConfig(Theme.dark);
            setTheme("dark");
        }else if(e.target.value === "darkLightblue") {
            setThemeConfig(Theme.darkLightblue);
            setTheme("darkLightblue");
        }else if(e.target.value === "darkOrange") {
            setThemeConfig(Theme.darkOrange);
            setTheme("darkOrange");
        }else if(e.target.value === "darkRed") {
            setThemeConfig(Theme.darkRed);
            setTheme("darkRed");
        }else if(e.target.value === "light") {
            setThemeConfig(Theme.light);
            setTheme("light");
        }else if(e.target.value === "lightLightblue") {
            setThemeConfig(Theme.lightLightblue);
            setTheme("lightLightblue");
        }else if(e.target.value === "lightOrange") {
            setThemeConfig(Theme.lightOrange);
            setTheme("lightOrange");
        }else if(e.target.value === "lightRed") {
            setThemeConfig(Theme.lightRed);
            setTheme("lightRed");
        }
    };

    const data = { theme, themeConfig, handleTheme };

    return(
        <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
    );
}

export { ThemeProvider };
export default ThemeContext;