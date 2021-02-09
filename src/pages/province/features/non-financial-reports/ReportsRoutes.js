import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import NFPzaAllocation from './NFPzaAllocation';
import OutrechDetailReport from './OutreachDetailReport';
import OutrechReport from './OutreachReport';
import ParishAttendanceMonthlyReport from './ParishAttendanceMonthlyReport';
import ParishDetailReport from './ParishDetailReport';
import ParishReport from './ParishReport';
import TestimonyReport from './TestimonyReport';
import TestimonyReportDetail from './TestimonyReportDetail';
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
            <Route path={`${path}/outreach`} component={OutrechReport}/>
            <Route path={`${path}/parish`} component={ParishReport}/>
            <Route path={`${path}/:id/parish/detail`} component={ParishDetailReport}/>
            <Route path={`${path}/:id/outreach/detail`} component = {OutrechDetailReport}/>
            <Route path={`${path}/:id/testimony/read`} component={TestimonyReportDetail}/>
            <Route path={`${path}/:id/read`} component={WelfareReportDetail}/>
            <Redirect from={path} to={`${path}/pza-allocation`} />
        </Switch>
    )
}

export default ReportRoutes;