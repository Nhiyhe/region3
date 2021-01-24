import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import MonetaryList from './features/monetaries/MonetaryList';
import NewAttendanceFormContainer from './features/attendances/NewAttendanceFormContainer';
import NewMonetaryFormContainer from './features/monetaries/NewMonetaryFormContainer';
import NewOutreachForm from './features/outreaches/NewOutreachForm';
import NewTestimonyForm from './features/testimonies/NewTestimonyForm';
import ParishPastorDetail from './features/parish/ParishPastorDetail';
import PayMent from './features/monetaries/PayMent';
import TestimonyEditForm from './features/testimonies/TestimonyEditForm';
import TestimonyLists from './features/testimonies/TestimonyLists';

const UsersRoutes = () =>{
    let {path} = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/parish/monetary/new`} component={NewMonetaryFormContainer} />
            <Route path={`${path}/parish/monetary/list`} component={MonetaryList} />
            <Route path={`${path}/parish/monetary/:id/edit`} component={PayMent} />
            <Route path={`${path}/parish/attendance/new`} component={NewAttendanceFormContainer} />
            <Route path={`${path}/parish/pastor`} component={ParishPastorDetail} />
            <Route path={`${path}/parish/testimony/new`} component={NewTestimonyForm} />
            <Route path={`${path}/parish/testimony/list`} component={TestimonyLists} />
            <Route path={`${path}/parish/outreach/list`} render={() => <h2>Outreach Lists</h2>} />
            <Route path={`${path}/parish/outreach/new`} component={NewOutreachForm} />
            <Route path={`${path}/parish/testimony/:id/edit`} component={TestimonyEditForm} />
            <Redirect from={path} to={`${path}/parish/monetary/list`} />

        </Switch>
    )
}

export default UsersRoutes;