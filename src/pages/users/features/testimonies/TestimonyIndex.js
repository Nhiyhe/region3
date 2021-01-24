import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import TestimonyRoutes from './TestimonyRoutes';

const TestimonyIndex = () => {
    let {url} =  useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Testimonies</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Testimony</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <TestimonyRoutes />
            </PageContent>
        </div>
    )
}

export default TestimonyIndex;