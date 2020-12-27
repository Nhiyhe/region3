import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProvinceFormContainer from './ProvinceFormContainer';

const ProvinceRoutes = () => {
  const {path} =   useRouteMatch();
    return(
        <Switch>
            <Route path={path} component={ProvinceFormContainer} />
        </Switch>
    )
}

export default ProvinceRoutes;