import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Convert age to number
            data.age = Number(data.age);

            // Convert gender to numeric value for ML
            data.gender = data.gender === "Male" ? 1 : 0;

            const response = await api.post("/auth/register", data);

            setMessage(response.data.message);

            reset();

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 px-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">

                <h3 className="text-center text-xl font-semibold mb-5 text-slate-800">
                    Create Account
                </h3>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    {/* Name */}

                    <div>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />

                        {errors.name && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}

                    <div>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}

                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password should be at least 6 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Age */}

                    <div>
                        <input
                            type="number"
                            placeholder="Enter Age"
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            {...register("age", {
                                required: "Age is required",
                                min: {
                                    value: 18,
                                    message: "Age must be at least 18",
                                },
                                max: {
                                    value: 120,
                                    message: "Enter a valid age",
                                },
                            })}
                        />

                        {errors.age && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.age.message}
                            </p>
                        )}
                    </div>

                    {/* Gender */}

                    <div>
                        <select
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            defaultValue=""
                            {...register("gender", {
                                required: "Gender is required",
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
                            <p className="text-red-600 text-sm mt-1">
                                {errors.gender.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white rounded-md py-2 font-medium hover:bg-emerald-700 transition"
                    >
                        Register
                    </button>

                </form>

                {message && (
                    <p className="mt-4 text-center text-red-600 text-sm">
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
}

export default RegisterForm;