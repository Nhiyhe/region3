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
import AttendanceIndex from  './pages/users/features/attendances/AttendanceIndex';
import MonetaryIndex from './pages/users/features/monetaries/MonetaryIndex';
import TestimonyIndex from './pages/users/features/testimonies/TestimonyIndex';
import OutreachIndex from './pages/users/features/outreaches/OutreachIndex';
import WelfareIndex from './pages/users/features/welfare/WelfareIndex';
import ReportIndex from './pages/province/features/financial-reports/ReportIndex';
import NonFinancialReportIndex from './pages/province/features/non-financial-reports/NonFinancialReportIndex';

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
            <AdminRoute path="/zones" component={ZoneIndex} /> 
            <AdminRoute path="/countries" component={CountryIndex} />
            <AdminRoute path="/parishes" component={ParishIndex}/>
            <AdminRoute path="/pastors"  component={PastorIndex}/> 
            <ProvinceRoute path="/financial/reports"  component={ReportIndex}/> 
            <ProvinceRoute path="/non-financial/reports"  component={NonFinancialReportIndex}/> 
            <AuthenticatedRoute path="/parish/attendances" component={ AttendanceIndex} /> 
            <AuthenticatedRoute path="/parish/monetaries" component={ MonetaryIndex} /> 
            <AuthenticatedRoute path="/parish/testimonies" component={ TestimonyIndex} /> 
            <AuthenticatedRoute path="/parish/outreaches" component={ OutreachIndex} /> 
            <AuthenticatedRoute path="/parish/welfares" component={ WelfareIndex} /> 
            <Redirect from="/" to="/home" />            
        </Switch>
    )
}


export default Routes;