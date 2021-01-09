import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import SubNavBar from '../../components/SubNavBar';
import PageContent from '../../components/PageContent';
import PastorRoutes from './PastorRoutes';

const PastorIndex = () => {

    let {url} = useRouteMatch();
    return(
        <div>
        <SubNavBar>
            <li><NavLink exact activeClassName="active-link" to={`${url}/pastor/profile`}><h4>Profile</h4></NavLink></li>
            <li><NavLink exact activeClassName="active-link" to={`${url}/pastor/details`}><h4>Edit Profile</h4></NavLink></li>
            <li><NavLink exact activeClassName="active-link" to={`${url}/pastor/password/reset`}><h4>Change Password</h4></NavLink></li>

        </SubNavBar>
        <PageContent>
            <PastorRoutes />
        </PageContent>
    </div>
    )
}

export default PastorIndex;