import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MonetaryList from './MonetaryList';
import NewAttendanceFormContainer from './NewAttendanceFormContainer';
import NewMonetaryFormContainer from './NewMonetaryFormContainer';
import ParishPastorDetail from './ParishPastorDetail';

const UsersRoutes = () =>{
    let {path} = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} component={MonetaryList} />
            <Route path={`${path}/monetary/new`} component={NewMonetaryFormContainer} />
            <Route path={`${path}/monetary/List`} component={MonetaryList} />
            <Route path={`${path}/attendance/new`} component={NewAttendanceFormContainer} />
            <Route path={`${path}/parish/pastor`} component={ParishPastorDetail} />
        </Switch>
    )
}

export default UsersRoutes;