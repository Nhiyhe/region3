import React from 'react';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import {NavLink, useRouteMatch} from 'react-router-dom';
import ZoneRoutes from './ZoneRoutes';
import './ZoneIndex.css';

const ZoneIndex = () => {
    let {url} = useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Zones</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Zone</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <ZoneRoutes />
            </PageContent>
        </div>
    )
}

export default ZoneIndex;