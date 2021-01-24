import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import NewOutreachForm from './NewOutreachForm';
import OutreachEditForm from './OutreachEditForm';
import OutreachList from './OutreachList';

const OutreachRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={NewOutreachForm} />
            <Route path={`${path}/lists`} component={OutreachList} />
            <Route path={`${path}/:id/edit`} component={OutreachEditForm}/>
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default OutreachRoutes;