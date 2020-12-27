import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthenticatedRoute from './AuthenticatedRoute';


const ProvinceRoute = ({component:Component, render, ...rest}) => {
    const  {isProvincePastor} = useContext(AuthContext);
    return(
        <AuthenticatedRoute {...rest}  render= {props => {
            if(!isProvincePastor()) return <Redirect to="/login" />
            return Component ? <Component /> : render(props) 
        }} />
    )
}

export default ProvinceRoute;