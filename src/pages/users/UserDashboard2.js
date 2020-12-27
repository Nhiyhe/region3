import React from 'react';

import AttendanceList from './AttendanceList';
import MonetaryList from './MonetaryList';
import NewAttendanceFormContainer from './NewAttendanceFormContainer';
import ParishDetail from './ParishDetail';

const UserDashboard2 = () => {      
        return (
            <section>
                <ParishDetail />
                <AttendanceList />
                <MonetaryList />
                <NewAttendanceFormContainer />
            </section>
        )
}

export default UserDashboard2;