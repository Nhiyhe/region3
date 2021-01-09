import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ParishEditForm from './ParishEditForm';
import ParishForm from './ParishForm';
import ParishList from './ParishList';

const ParishRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={ParishForm} />
            <Route path={`${path}/lists`} component={ParishList} />
            <Route path={`/parishes/:id/edit`} component={ParishEditForm}/>
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}
export default ParishRoutes;