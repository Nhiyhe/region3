import React from 'react';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import ParishRoutes from './ParishRoutes';
import {NavLink, useRouteMatch} from 'react-router-dom';
import './ParishIndex.css';

const ParishIndex = () => {
    let {url} = useRouteMatch();
    return (
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Parishes</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Parish</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <ParishRoutes/>
            </PageContent>
        </div>
    )
}

export default ParishIndex;