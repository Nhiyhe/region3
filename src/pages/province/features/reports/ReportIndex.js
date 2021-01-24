import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import ReportRoutes from './ReportRoutes';

const ReportIndex = () => {
    let {url} =  useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/pza-allocation`}><h4>PZA Allocation</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/monthly-report`}><h4>Parish Monthly Report</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/attendance/report`}><h4>Attendance Statistics Report</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <ReportRoutes />
            </PageContent>
        </div>
    )
}

export default ReportIndex;