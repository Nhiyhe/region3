import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import WelfareRoutes from './WelfareRoutes';

const WelfareIndex = () => {
    let {url} =  useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Welfares</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Welfare</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <WelfareRoutes />
            </PageContent>
        </div>
    )
}

export default WelfareIndex;