import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import PastorEditForm from './PastorEditForm';
import PastorPasswordReset from './PastorPasswordReset';
import PastorProfile from './PastorProfile';

const PastorRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/pastor/profile`} component={PastorProfile} />
            <Route path={`${path}/pastor/details`} component={PastorEditForm} />
            <Route path={`${path}/pastor/password/reset`} component={PastorPasswordReset} />
            <Redirect from={path} to={`${path}/pastor/details`} />
        </Switch>
    )
}
export default PastorRoutes;