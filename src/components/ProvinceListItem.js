import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProvinceListItem = ({children, to, rest}) => {
const {isAuthenticated, isProvincePastor} = useContext(AuthContext);
   return (
    <> { isAuthenticated() &&  isProvincePastor() && <li><NavLink {...rest} to={to}>{children}</NavLink></li> }</> 
   )  
}

export default ProvinceListItem;