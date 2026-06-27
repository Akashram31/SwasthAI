import React from 'react';

import DashboardView from '../components/DashboardView';

import { Navigate } from 'react-router-dom';

function Dashboard() {

    const token = localStorage.getItem('token');

    if (!token) {

        return <Navigate to='/login' />;

    }

    return <DashboardView />;

}

export default Dashboard;
