import React, { useContext } from 'react';
import { useRouteMatch, NavLink} from 'react-router-dom';
import { ParishAuthContext } from '../../context/ParishAuthContext';
import SubNavBar from '../../components/SubNavBar';

import ParishDetail from './ParishDetail';
import UsersRoutes from './UsersRoutes';
import PageContent from '../../components/PageContent';
import './UserDashboard.css';


const UserDashboard = () => {
   const {userInfo} = useContext(ParishAuthContext);
   const {url} = useRouteMatch();
    console.log(userInfo);
        return (
            <section className="UserDashboard">
                <SubNavBar>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/monetary/list`}><h4>Monetary</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/pastor`}><h4>Pastor's Detail</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/monetary/new`}><h4>New Remmittance</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/attendance/new`}><h4>New Attendance</h4></NavLink></li>
                </SubNavBar>             
                <PageContent>
                    <div className="UserDashboard-parishDetail">
                        <ParishDetail />
                    </div>                    
                    <UsersRoutes />
                </PageContent>              
            </section>
        )
}

export default UserDashboard;