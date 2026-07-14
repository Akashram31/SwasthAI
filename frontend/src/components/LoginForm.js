import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, Link } from 'react-router-dom';

import api from '../api/axios';


function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const [message, setMessage] = useState('');

    const [messageType, setMessageType] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const onSubmit = async (data) => {

        setMessage('');

        setMessageType('');

        setLoading(true);


        try {

            const response = await api.post(
                '/auth/login',
                data
            );

            const result = response.data;


            if (result.token) {

                localStorage.setItem(
                    'token',
                    result.token
                );

                localStorage.setItem(
                    'username',
                    result.user.name
                );

                localStorage.setItem(
                    'userId',
                    result.user.id
                );


                setMessage(
                    result.message || 'Login successful.'
                );

                setMessageType('success');


                navigate('/dashboard');

            }


        } catch (error) {

            const errorMessage =
                error.response?.data?.message ||
                'Something went wrong. Please try again.';


            setMessage(errorMessage);

            setMessageType('error');

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-sm border">

                        <div className="card-body p-4">


                            <h3 className="text-center mb-4">
                                Login to SwasthAI
                            </h3>


                            <form onSubmit={handleSubmit(onSubmit)}>


                                {/* EMAIL */}

                                <div className="mb-3">

                                    <input

                                        type="email"

                                        placeholder="Enter email"

                                        className={`form-control ${
                                            errors.email
                                                ? 'is-invalid'
                                                : ''
                                        }`}

                                        {...register('email', {

                                            required:
                                                'Email is required',

                                            pattern: {

                                                value:
                                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                                                message:
                                                    'Please enter a valid email address.'

                                            }

                                        })}

                                    />


                                    {errors.email && (

                                        <p className="text-danger mt-1 mb-0">

                                            {errors.email.message}

                                        </p>

                                    )}

                                </div>


                                {/* PASSWORD */}

                                <div className="mb-3">

                                    <input

                                        type="password"

                                        placeholder="Enter password"

                                        className={`form-control ${
                                            errors.password
                                                ? 'is-invalid'
                                                : ''
                                        }`}

                                        {...register('password', {

                                            required:
                                                'Password is required'

                                        })}

                                    />


                                    {errors.password && (

                                        <p className="text-danger mt-1 mb-0">

                                            {errors.password.message}

                                        </p>

                                    )}

                                </div>


                                {/* LOGIN BUTTON */}

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {loading
                                        ? 'Logging in...'
                                        : 'Login'}

                                </button>


                            </form>


                            {/* BACKEND MESSAGE */}

                            {message && (

                                <p
                                    className={`text-center mt-3 mb-0 ${
                                        messageType === 'success'
                                            ? 'text-success'
                                            : 'text-danger'
                                    }`}
                                >

                                    {message}

                                </p>

                            )}


                            {/* REGISTER LINK */}

                            <p className="text-center mt-3 mb-0">

                                Don't have an account?{' '}

                                <Link to="/register">

                                    Register here

                                </Link>

                            </p>


                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default LoginForm;