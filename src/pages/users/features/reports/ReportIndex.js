import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import OutreachRoutes from './OutreachRoutes';

const ReportIndex = () => {
    let {url} =  useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>PZA Allocation</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>Parish Monthly Report</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <OutreachRoutes />
            </PageContent>
        </div>
    )
}

export default ReportIndex;