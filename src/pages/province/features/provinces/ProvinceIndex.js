import React from 'react';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import {NavLink, useRouteMatch} from 'react-router-dom';
import ProvinceRoutes from './ProvinceRoutes';

const ProvinceIndex = () => {
    let {url} = useRouteMatch();
    return (
        <div>
            <SubNavBar >
                <li><NavLink exact activeClassName="active" to={`${url}/lists`}><h4>Show Provinces</h4></NavLink></li>
                <li><NavLink exact activeClassName="active" to={`${url}/new`}><h4>Create New Province</h4></NavLink></li>
        </SubNavBar>
        <PageContent>
            <ProvinceRoutes />
        </PageContent>
        </div>
    )
}

export default ProvinceIndex;