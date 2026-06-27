import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';

import Login from './pages/Login';

import Register from './pages/Register';

import Assessment from './pages/Assessment';

import Dashboard from './pages/Dashboard';

import Result from './pages/Result';

function App() {

    return (

        <div>

            <Navbar />

            <Routes>

                <Route
                    path='/'
                    element={<Home />}
                ></Route>

                <Route
                    path='/login'
                    element={<Login />}
                ></Route>

                <Route
                    path='/register'
                    element={<Register />}
                ></Route>

                <Route
                    path='/assessment'
                    element={<Assessment />}
                ></Route>

                <Route
                    path='/dashboard'
                    element={<Dashboard />}
                ></Route>

                <Route
                    path='/result/:id'
                    element={<Result />}
                ></Route>

            </Routes>

        </div>

    );

}

export default App;
