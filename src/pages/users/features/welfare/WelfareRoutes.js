import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import NewWelfareForm from './NewWelfareForm';
import WelfareEditForm from './WelfareEditForm';
import WelfareList from './WelfareList';

const WelfareRoutes = () => {
    let {path} = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={NewWelfareForm} />
            <Route path={`${path}/lists`} component={WelfareList} />
            <Route path={`${path}/:id/edit`} component={WelfareEditForm}/>
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default WelfareRoutes;