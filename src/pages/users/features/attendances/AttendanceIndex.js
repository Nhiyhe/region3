import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PageContent from '../../../../components/PageContent';
import SubNavBar from '../../../../components/SubNavBar';
import AttendanceRoutes from '../attendances/AttendanceRoutes';

const AttendanceIndex = () => {
    let {url} = useRouteMatch();
    return(
        <div>
            <SubNavBar>
                <li><NavLink exact activeClassName="active-link" to={`${url}/lists`}><h4>Show Attendances</h4></NavLink></li>
                <li><NavLink exact activeClassName="active-link" to={`${url}/new`}><h4>New Attendance Record</h4></NavLink></li>
            </SubNavBar>
            <PageContent>
                <AttendanceRoutes />
            </PageContent>
        </div>
    )
}

export default AttendanceIndex;