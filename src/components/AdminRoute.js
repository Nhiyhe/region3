import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProvinceRoute from './ProvinceRoute';


const AdminRoute = ({component:Component, render, ...rest}) => {
    const  {isAdmin} = useContext(AuthContext);
    return(
        <ProvinceRoute {...rest} render= {props => {
            if(!isAdmin())return <Redirect to="/login"/>
            return Component ? <Component /> : render(props)
        }} />
    )
}

export default AdminRoute;
