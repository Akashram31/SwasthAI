import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";


function RegisterForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const onSubmit = async (data) => {

        setMessage("");
        setMessageType("");
        setLoading(true);

        try {

            const registrationData = {

                name: data.name,

                email: data.email,

                password: data.password,

                // 0 = Female, 1 = Male
                gender: data.gender === "Male" ? 1 : 0

            };


            const response = await api.post(
                "/auth/register",
                registrationData
            );


            setMessage(
                response.data.message ||
                "Registration successful. You can now log in."
            );

            setMessageType("success");

            reset();


            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

            setMessageType("error");

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
                                Create Account
                            </h3>


                            <form onSubmit={handleSubmit(onSubmit)}>


                                {/* NAME */}

                                <div className="mb-3">

                                    <input

                                        type="text"

                                        placeholder="Enter Full Name"

                                        className={
                                            errors.name
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }

                                        {...register("name", {

                                            required:
                                                "Name is required.",

                                            minLength: {

                                                value: 2,

                                                message:
                                                    "Name must contain at least 2 characters."

                                            }

                                        })}

                                    />


                                    {errors.name && (

                                        <p className="text-danger mt-1 mb-0">

                                            {errors.name.message}

                                        </p>

                                    )}

                                </div>


                                {/* EMAIL */}

                                <div className="mb-3">

                                    <input

                                        type="email"

                                        placeholder="Enter Email"

                                        className={
                                            errors.email
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }

                                        {...register("email", {

                                            required:
                                                "Email is required.",

                                            pattern: {

                                                value:
                                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                                                message:
                                                    "Please enter a valid email address."

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

                                        placeholder="Enter Password"

                                        className={
                                            errors.password
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }

                                        {...register("password", {

                                            required:
                                                "Password is required.",

                                            minLength: {

                                                value: 6,

                                                message:
                                                    "Password must contain at least 6 characters."

                                            }

                                        })}

                                    />


                                    {errors.password && (

                                        <p className="text-danger mt-1 mb-0">

                                            {errors.password.message}

                                        </p>

                                    )}

                                </div>


                                {/* GENDER */}

                                <div className="mb-3">

                                    <select

                                        className={
                                            errors.gender
                                                ? "form-select is-invalid"
                                                : "form-select"
                                        }

                                        defaultValue=""

                                        {...register("gender", {

                                            required:
                                                "Please select your gender."

                                        })}

                                    >

                                        <option value="" disabled>
                                            Select Gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                    </select>


                                    {errors.gender && (

                                        <p className="text-danger mt-1 mb-0">

                                            {errors.gender.message}

                                        </p>

                                    )}

                                </div>


                                {/* REGISTER BUTTON */}

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {loading
                                        ? "Registering..."
                                        : "Register"}

                                </button>


                            </form>


                            {/* BACKEND MESSAGE */}

                            {message && (

                                <p
                                    className={`text-center mt-3 mb-0 ${
                                        messageType === "success"
                                            ? "text-success"
                                            : "text-danger"
                                    }`}
                                >

                                    {message}

                                </p>

                            )}


                            {/* LOGIN LINK */}

                            <p className="text-center mt-3 mb-0">

                                Already have an account?{" "}

                                <Link to="/login">
                                    Login here
                                </Link>

                            </p>


                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default RegisterForm;