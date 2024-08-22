import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import "../styles/ScrollbarGrownUp.css";

const d = document;

export const ScrollbarGrownUp = _ => {
  const {themeConfig} = useContext(ThemeContext);
  const [scrollPercent, setScrollPercent] = useState(0);

  const updateScrollPercent = () => {
    const scroll = d.documentElement.scrollTop;
    const wh = window.innerHeight;
    const dh = d.documentElement.scrollHeight;

    const calcScrollPercent = (scroll / ( dh - wh )) * 100;
    setScrollPercent(calcScrollPercent);
  }

  useEffect(() => {
    window.addEventListener('scroll', updateScrollPercent);
    return () => {
      window.removeEventListener('scroll', updateScrollPercent);
    }
  },[]);

//   const progressBarStyle = {
//     height: `${scrollPercent}%`
//   };

  return(
    <div className="barCont" >
      <div
        className="progressBar"
        style={{
          background: themeConfig.backgroundElement,
          height: `${scrollPercent}%`
        }}
      />
    </div>
  );
}