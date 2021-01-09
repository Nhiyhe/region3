import React from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';
import SubNavBar from '../../../../components/SubNavBar';
import PastorRoutes from './PastorRoutes';
import PageContent from '../../../../components/PageContent';

const PastorIndex = () => {
    let {url} = useRouteMatch();

    return(
        <div>
        <SubNavBar>
            <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Pastors</h4></NavLink></li>
            <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Pastor</h4></NavLink></li>
        </SubNavBar>
        <PageContent>
            <PastorRoutes />
        </PageContent>
    </div>
    )
}

export default PastorIndex;