import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const username = localStorage.getItem('username');

    const handleLogout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('username');

        navigate('/login');

    };

    return (

        <nav className='bg-slate-900 px-4 py-3'>

            <div className='max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-3'>

                <Link className='text-white text-lg font-semibold' to='/'>
                    🩺 SwasthAI
                </Link>

                <div className='flex items-center gap-2'>

                    {token ? (

                        <>

                            <span className='text-white mr-2'>
                                Hello, {username}
                            </span>

                            <Link
                                className='bg-slate-100 text-slate-900 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white'
                                to='/assessment'
                            >
                                Take Assessment
                            </Link>

                            <Link
                                className='bg-slate-100 text-slate-900 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white'
                                to='/dashboard'
                            >
                                Dashboard
                            </Link>

                            <button
                                className='bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-700'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                className='bg-slate-100 text-slate-900 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white'
                                to='/login'
                            >
                                Login
                            </Link>

                            <Link
                                className='bg-emerald-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-700'
                                to='/register'
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );

}

export default Navbar;
