import { createContext, useState } from "react";

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
    const [imageInfo, setImageInfo] = useState("");

    return(
        <ImageContext.Provider value={{ imageInfo, setImageInfo}}>
            {children}
        </ImageContext.Provider>
    );
}

export { ImageProvider };
export default ImageContext;