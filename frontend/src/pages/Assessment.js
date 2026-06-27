import React from 'react';

import AssessmentForm from '../components/AssessmentForm';

import { Navigate } from 'react-router-dom';

function Assessment() {

    const token = localStorage.getItem('token');

    if (!token) {

        return <Navigate to='/login' />;

    }

    return <AssessmentForm />;

}

export default Assessment;
