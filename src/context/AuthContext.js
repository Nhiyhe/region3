import React, { createContext, useState } from "react";
import {useHistory} from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const uInfo = localStorage.getItem('userInfo');

    const history = useHistory();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userInfo, setUserInfo] = useState(uInfo ? JSON.parse(uInfo) : {});

    const setAuthState = ({token, decodeUserInfo}) => {
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

    const isAdmin = () => {
      return userInfo.isAdmin
    }

    const isProvincePastor = () => {
      return userInfo.position ? userInfo.position.toLowerCase() === "province pastor" : ''
    }

    const isParishPastor = () => {
      return userInfo.position ? userInfo.position.toLowerCase() === "parish pastor" : ''
    }

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      setToken(null);
      setUserInfo({});
      history.push('/home')
    }

  return <AuthContext.Provider value={{token, userInfo, isAuthenticated, setAuthState, logout, isAdmin, isProvincePastor, isParishPastor}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
