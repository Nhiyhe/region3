import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LoginContainer from './pages/LoginContainer';
import { AuthContext } from './context/AuthContext';
import ProvinceRoute from './components/ProvinceRoute';
import AdminRoute from './components/AdminRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/users/UserDashboard';
import ProvinceIndex from './pages/province/features/provinces/ProvinceIndex';
import ZoneIndex from './pages/province/features/zones/ZoneIndex';
import CountryIndex from './pages/province/features/countries/CountryIndex';
import ParishIndex from './pages/province/features/parishes/ParishIndex';
import PastorIndex from './pages/province/features/pastors/PastorIndex';
import Home from './pages/Home';
import ParishLogin from './pages/ParishLogin';
import PastorDashboard from './pages/pastors/PastorDashboard';

const Routes =() => {
const {isProvincePastor, isAdmin, isParishPastor} = useContext(AuthContext);

    return(
            <Switch>
            <Route exact path="/login" component={LoginContainer}/>
            <Route exact path="/parish/login" component={ParishLogin} />
            <Route exact path="/home" component={Home}/>
            <AuthenticatedRoute path="/dashboard" render={() => {
                if(isAdmin() || isProvincePastor()){
                    return <AdminDashboard />
                }else if (!isAdmin() && isParishPastor()){
                    return <PastorDashboard />
                }else{
                    return <UserDashboard />
                }
            } } />
            <AdminRoute path="/provinces" component={ProvinceIndex}/>
            <ProvinceRoute path="/zones" component={ZoneIndex} /> 
            <ProvinceRoute path="/countries" component={CountryIndex} />
            <ProvinceRoute path="/parishes" component={ParishIndex}/>
            <ProvinceRoute path="/pastors"  component={PastorIndex}/> 
            <Redirect from="/" to="/home" />            
        </Switch>
    )
}


export default Routes;