import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import ZoneEditForm from './ZoneEditForm';
import ZoneFormContainer from './ZoneFormContainer';
import ZoneList from './ZoneList';

const ZoneRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
                <Route path={`${path}/new`} component={ZoneFormContainer} />
                <Route path={`${path}/lists`} component={ZoneList} />
                <Route path={`/zones/:id/edit`} component={ZoneEditForm} />
                <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default ZoneRoutes;