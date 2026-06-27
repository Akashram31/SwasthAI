import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import api from '../api/axios';

function LoginForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            const response = await api.post('/auth/login', data);

            const result = response.data;

            if (result.token) {

                localStorage.setItem('token', result.token);

                localStorage.setItem('username', result.user.name);
				localStorage.setItem('userId', result.user.id);
                navigate('/dashboard');

            }

            setMessage(result.message);

            reset();

        } catch (error) {

            setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');

        }

    };

    return (

        <div className='max-w-md mx-auto mt-12 px-4'>

            <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>

                <h3 className='text-center text-xl font-semibold mb-4 text-slate-800'>
                    Login to SwasthAI
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>

                    <div>
                        <input
                            type='email'
                            placeholder='Enter email'
                            className='w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500'
                            {...register('email', {
                                required: 'Email is required'
                            })}
                        />

                        {errors.email &&
                            <p className='text-red-600 text-sm mt-1'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type='password'
                            placeholder='Enter password'
                            className='w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500'
                            {...register('password', {
                                required: 'Password is required'
                            })}
                        />

                        {errors.password &&
                            <p className='text-red-600 text-sm mt-1'>{errors.password.message}</p>}
                    </div>

                    <button className='w-full bg-brand-600 text-white rounded-md py-2 font-medium hover:bg-brand-700 transition'>
                        Login
                    </button>

                </form>

                {message &&
                    <p className='mt-3 text-center text-emerald-600 text-sm'>{message}</p>}

            </div>

        </div>

    );

}

export default LoginForm;
