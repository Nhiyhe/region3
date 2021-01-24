import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import NewAttendanceFormContainer from './NewAttendanceFormContainer';
import AttendanceList from './AttendanceList';
import AttendanceEditForm from './AttendanceEditForm';

const AttendanceRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={NewAttendanceFormContainer} />
            <Route path={`${path}/lists`} component={AttendanceList} />
            <Route path={`${path}/:id/edit`} component={AttendanceEditForm} />
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default AttendanceRoutes;