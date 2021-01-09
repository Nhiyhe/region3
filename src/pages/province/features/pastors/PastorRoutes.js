import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import PastorFormContainer from './PastorFormContainer';
import PastorFormEditContainer from './PastorFormEditContainer';
import PastorList from './PastorList';

const PastorRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={PastorFormContainer} />
            <Route path={`${path}/lists`} component={PastorList} />
            <Route path={`/pastors/:id/edit`} component={PastorFormEditContainer}/>
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}
export default PastorRoutes;