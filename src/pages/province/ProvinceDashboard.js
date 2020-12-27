import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProvinceDashboard = () => {
    const {userInfo} = useContext(AuthContext);
    console.log(userInfo);
    return <h2>Province Dashboard</h2>
}

export default ProvinceDashboard;