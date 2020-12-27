import React, { createContext, useState } from "react";

export const ParishContext = createContext();

const ParishProvider = ({children}) => {

    const [parishId, setParishId] = useState("");
    return (
        <ParishContext.Provider value={{parishId, setParishId}}>
            {children}
        </ParishContext.Provider>
    )

}

export default ParishProvider;