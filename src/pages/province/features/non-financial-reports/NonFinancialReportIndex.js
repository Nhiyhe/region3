import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import ReportRoutes from './ReportsRoutes';

const NonFinancialReportIndex = () => {
    let {url} =  useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/pza-allocation`}><h4>Data Records by Country</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/monthly-report`}><h4>Data Record by Parish</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/welfare`}><h4>Welfare</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/outreach`}><h4>Outreach</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/testimony`}><h4>Testimony</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/parish`}><h4>Parish</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <ReportRoutes />
            </PageContent>
        </div>
    )
}

export default NonFinancialReportIndex;