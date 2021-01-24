import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import MonetaryRoutes from './MonetaryRoutes';

const MonetaryIndex = () => {
    let {url} =  useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Monetaries Records</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Monetary Record</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <MonetaryRoutes />
            </PageContent>
        </div>
    )
}

export default MonetaryIndex;