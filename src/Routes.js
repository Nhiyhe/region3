import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginContainer from './pages/LoginContainer';
import ZoneFormContainer from './pages/province/ZoneFormContainer';
import CountryFormContainer from './pages/province/CountryFormContainer';
import ParishFormContainer from './pages/province/ParishFormContainer';
import PastorFormContainer from './pages/province/PastorFormContainer';
import ProvinceFormContainer from './pages/province/features/provinces/ProvinceFormContainer';
import { AuthContext } from './context/AuthContext';
import ProvinceRoute from './components/ProvinceRoute';
import AdminRoute from './components/AdminRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/users/UserDashboard';
import ProvinceDashboard from './pages/province/ProvinceDashboard';
import ProvinceIndex from './pages/province/features/provinces/ProvinceIndex';

const Routes =() => {
const {isProvincePastor, isAdmin} = useContext(AuthContext);

    return(
            <Switch>
            <Route exact path="/login" component={LoginContainer}/>
            <AuthenticatedRoute path="/dashboard" render={() => {
                if(isAdmin()){
                    return <AdminDashboard />
                }else if (!isAdmin() && isProvincePastor()){
                    return <ProvinceDashboard />
                }else{
                    return <UserDashboard />
                }
            } } />
            <AdminRoute path="/provinces" component={ProvinceIndex}/>
            <ProvinceRoute exact path="/zones" component={ZoneFormContainer} /> 
            <ProvinceRoute exact path="/country" component={CountryFormContainer} />
            <ProvinceRoute exact path="/parish" component={ParishFormContainer}/>
            <ProvinceRoute exact path="/pastors"  component={PastorFormContainer}/> 
            <Redirect from="/" to="/login" />            
        </Switch>
    )
}


export default Routes;