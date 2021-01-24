import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserListItem = ({children, to, rest}) => {
const {isAuthenticated, isProvincePastor, isParishPastor} = useContext(AuthContext);
   return (
    <> { isAuthenticated() &&  !isProvincePastor() && !isParishPastor() && <li><NavLink {...rest} to={to}>{children}</NavLink></li> }</> 
   )  
}

export default UserListItem;