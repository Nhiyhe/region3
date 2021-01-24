import React from 'react';
import { useRouteMatch, NavLink} from 'react-router-dom';
import SubNavBar from '../../components/SubNavBar';
import ParishDetail from './features/parish/ParishDetail';
import UsersRoutes from './UsersRoutes';
import PageContent from '../../components/PageContent';
import './UserDashboard.css';


const UserDashboard = () => {
   const {url} = useRouteMatch();
        return (
            <section className="UserDashboard">
                {/* <SubNavBar>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/monetary/list`}><h4>Monetary</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/parish/pastor`}><h4>Our Pastor</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/monetary/new`}><h4>New Remmittance</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/attendance/new`}><h4>New Attendance</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/testimony/new`}><h4>New Testimony</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/testimony/list`}><h4>Testimonies</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/outreach/new`}><h4>New Outreach</h4></NavLink></li>
                        <li><NavLink exact activeClassName="active-link" to={`${url}/parish/outreach/list`}><h4>Outreaches</h4></NavLink></li>
                </SubNavBar>              */}
                <PageContent>
                    <div className="UserDashboard-parishDetail">
                        <ParishDetail />
                    </div>                    
                    {/* <UsersRoutes /> */}
                </PageContent>              
            </section>
        )
}

export default UserDashboard;