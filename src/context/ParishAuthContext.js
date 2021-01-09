import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const ParishAuthContext = createContext();

const ParishAuthProvider = ({children}) => {
    const history = useHistory();
    const uInfo = localStorage.getItem('userInfo');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userInfo, setUserInfo] = useState(uInfo ? JSON.parse(uInfo) : {});

    const setAuthState = ({token, decodeUserInfo}) => {
        console.log(token, decodeUserInfo);
        setToken(token);
        setUserInfo(decodeUserInfo)
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(decodeUserInfo));       
    }

    const isAuthenticated = () => {
      if(!token || !userInfo.iat){
        return false;
      }
        return new Date().getTime() / 1000 > userInfo.iat;     
      // return !!userInfo.iat || !!userInfo.iat    
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setToken(null);
        setUserInfo({});
        history.push('/login')
      }

    return (
        <ParishAuthContext.Provider value={{token, userInfo, setAuthState, isAuthenticated, logout}}>
            {children}
        </ParishAuthContext.Provider>
    )

}

export default ParishAuthProvider;