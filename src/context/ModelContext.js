import { createContext, useState } from "react";

const ModelContext = createContext();

const ModelProvider = ({children}) => {
    const [modelOn, setModelOn] = useState(false);

    const data = {modelOn, setModelOn};

    return(
        <ModelContext.Provider value={data}>{children}</ModelContext.Provider>
    );
}

export { ModelProvider };
export default ModelContext;