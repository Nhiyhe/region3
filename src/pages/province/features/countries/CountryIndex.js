import React from 'react';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import CountryRoutes from './CountryRoutes';
import {NavLink, useRouteMatch} from 'react-router-dom';
import './CountryIndex.css';

const CountryIndex = () => {
    let {url} = useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Countries</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Country</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <CountryRoutes />
            </PageContent>
        </div>
    )
}

export default CountryIndex;