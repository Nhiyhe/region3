import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import NFPzaAllocation from './NFPzaAllocation';
import ParishAttendanceMonthlyReport from './ParishAttendanceMonthlyReport';
import TestimonyReport from './TestimonyReport';
import WelfareReport from './WelfareReport';
import WelfareReportDetail from './WelfareReportDetail';

const ReportRoutes = () => {
  const {path} =  useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/monthly-report`} component={ParishAttendanceMonthlyReport} />
            <Route path={`${path}/pza-allocation`} component={NFPzaAllocation}/>
            <Route path={`${path}/welfare`} component={WelfareReport}/>
            <Route path={`${path}/testimony`} component={TestimonyReport}/>
            <Route path={`${path}/:id/read`} component={WelfareReportDetail}/>
            <Redirect from={path} to={`${path}/pza-allocation`} />
        </Switch>
    )
}

export default ReportRoutes;