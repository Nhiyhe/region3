import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ProvinceEditFormContainer from './ProvinceEditFormContainer';
import ProvinceFormContainer from './ProvinceFormContainer';
import ProvinceList from './ProvinceList';

const ProvinceRoutes = () => {
  const {path} =  useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/new`} component={ProvinceFormContainer} />
            <Route path={`${path}/lists`} component={ProvinceList} />
            <Route path={`/provinces/:id/edit`} component={ProvinceEditFormContainer} />
            <Redirect from={path} to={`${path}/lists`} />
        </Switch>
    )
}

export default ProvinceRoutes;