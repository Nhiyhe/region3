import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import OutreachRoutes from './OutreachRoutes';

const OutreachIndex = () => {
    let {url} =  useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Outreaches</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Outreach</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <OutreachRoutes />
            </PageContent>
        </div>
    )
}

export default OutreachIndex;