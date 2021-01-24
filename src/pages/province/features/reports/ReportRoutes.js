import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ParishAttendanceMonthlyReport from './ParishAttendanceMonthlyReport';
import ParishMonthlyReport from './ParishMonthlyReport';
import PzaAllocation from './PzaAllocation';

const ReportRoutes = () => {
  const {path} =  useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/monthly-report`} component={ParishMonthlyReport} />
            <Route path={`${path}/pza-allocation`} component={PzaAllocation} />
            <Route path={`${path}/attendance/report`} component={ParishAttendanceMonthlyReport} />
            <Redirect from={path} to={`${path}/monthly-report`} />
        </Switch>
    )
}

export default ReportRoutes;