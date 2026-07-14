import React from "react";

import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const username = localStorage.getItem("username");

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("username");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    🩺 SwasthAI
                </Link>

                <div className="d-flex align-items-center gap-2">

                    {token ? (

                        <>

                            <span className="text-white me-2">
                                Hello, {username}
                            </span>

                            <Link
                                className="btn btn-outline-light btn-sm"
                                to="/assessment"
                            >
                                Take Assessment
                            </Link>

                            <Link
                                className="btn btn-outline-light btn-sm"
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                className="btn btn-outline-light btn-sm"
                                to="/login"
                            >
                                Login
                            </Link>

                            <Link
                                className="btn btn-success btn-sm"
                                to="/register"
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