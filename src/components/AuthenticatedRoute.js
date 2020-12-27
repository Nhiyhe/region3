import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const AuthenticatedRoute = ({component:Component, render, ...rest}) => {
    const  {isAuthenticated} = useContext(AuthContext);
    return(
        <Route {...rest}  render= {props => {
            if(!isAuthenticated()) return <Redirect to="/login" />
            return Component ? <Component /> : render(props) 
        }} />
    )
}

export default AuthenticatedRoute;