import React, { createContext, useState } from 'react';
export const ProvinceContext = createContext();

const ProvinceContextProvider = ({children}) => {
    const [provId, setProvId] = useState("");
    return (
    <ProvinceContext.Provider value={{provinceId: provId, setProvId}}>
        {children}
    </ProvinceContext.Provider>
    )
}

export default ProvinceContextProvider;