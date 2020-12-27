import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminListItem = ({children, to}) => {
const {isAuthenticated, isProvincePastor, isAdmin} = useContext(AuthContext);
   return (
    <> { isAuthenticated() &&  isProvincePastor() && isAdmin() && <li><Link to={to}>{children}</Link></li> }</> 
   )  
}

export default AdminListItem;

