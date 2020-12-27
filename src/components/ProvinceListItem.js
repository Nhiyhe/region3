import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProvinceListItem = ({children, to}) => {
const {isAuthenticated, isProvincePastor} = useContext(AuthContext);
   return (
    <> { isAuthenticated() &&  isProvincePastor() && <li><Link to={to}>{children}</Link></li> }</> 
   )  
}

export default ProvinceListItem;