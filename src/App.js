import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ScrollbarGrownUp } from "./components/ScrollbarGrownUp";
import { ScrollbarSimple } from "./components/ScrollbarSimple";
import ThemeContext from "./context/ThemeContext";
import { GamesPage } from "./pages/GamesPage";
import { ImageTranslationPage } from "./pages/ImageTranslationPage";
import Main from "./pages/Main";
import { WordsTranslatorPage } from "./pages/WordsTranslatorPage";

function App() {
  const {themeConfig} = useContext(ThemeContext);

  return (
    <div className="App" style={{backgroundColor: themeConfig.background}}>
      <ScrollbarGrownUp/>
      <ScrollbarSimple/>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/translate-words" element={<WordsTranslatorPage/>}></Route>
        <Route path="/translate-images" element={<ImageTranslationPage/>}></Route>
        <Route path="/games" element={<GamesPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;