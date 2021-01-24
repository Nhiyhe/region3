import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import NewMonetaryFormContainer from './NewMonetaryFormContainer';
import MonetaryList from './MonetaryList';
import Payment from './PayMent';
import MonetaryDetail from './MonetaryDetail';

const MonetaryRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={NewMonetaryFormContainer} />
            <Route path={`${path}/lists`} component={MonetaryList} />
            <Route path={`${path}/:id/edit`} component={Payment}/>
            <Route path={`${path}/:id/detail`} component={MonetaryDetail} />
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default MonetaryRoutes;