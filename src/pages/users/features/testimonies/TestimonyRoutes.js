import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import NewTestimonyForm from './NewTestimonyForm';
import TestimonyLists from './TestimonyLists';
import TestimonyEditForm from './TestimonyEditForm';
import TestimonyDetail from './TestimonyDetail';

const TestimonyRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={NewTestimonyForm} />
            <Route path={`${path}/lists`} component={TestimonyLists} />
            <Route path={`${path}/:id/edit`} component={TestimonyEditForm}/>
            <Route path={`${path}/:id/detail`} component={TestimonyDetail}/>
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default TestimonyRoutes;