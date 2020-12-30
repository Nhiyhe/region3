import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminListItem = ({children, to, rest}) => {
const {isAuthenticated, isProvincePastor, isAdmin} = useContext(AuthContext);
   return (
    <> { isAuthenticated() &&  isProvincePastor() && isAdmin() && <li><NavLink {...rest} to={to}>{children}</NavLink></li> }</> 
   )  
}

export default AdminListItem;

