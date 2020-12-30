import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import CountryList from './CountryList';
import CountryFormContainer from './CountryFormContainer';

const CountryRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={CountryFormContainer} />
            <Route path={`${path}/lists`} component={CountryList} />
            <Route path={`/countries/:id/edit`} render={() => <h2>Edit form</h2>} />
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default CountryRoutes;