import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";


// Bootstrap Classes
const inputClass = "form-control";
const selectClass = "form-select";
const labelClass = "form-label fw-semibold";
const errorClass = "text-danger mt-1 mb-0";


function AssessmentForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const onSubmit = async (data) => {

        setLoading(true);

        setMessage("");


        try {

            const assessmentData = {

                age: Number(data.age),

                height: Number(data.height),

                weight: Number(data.weight),

                highBP: Number(data.highBP),

                highChol: Number(data.highChol),

                smoking: Number(data.smoking),

                alcohol: Number(data.alcohol),

                physicalActivity: Number(data.physicalActivity),

                fruitsConsumption: Number(data.fruitsConsumption),

                veggiesConsumption: Number(data.veggiesConsumption),

                generalHealth: Number(data.generalHealth),

                difficultyWalking: Number(data.difficultyWalking)

            };


            const response = await api.post(
                "/assessment/submit",
                assessmentData
            );


            reset();


            navigate(
                "/result/" + response.data.data._id
            );


        } catch (error) {

            console.error(
                "Assessment Error:",
                error.response?.data || error.message
            );


            setMessage(
                error.response?.data?.message ||
                "Something went wrong while processing your assessment. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow-sm border">

                        <div className="card-body p-4">


                            <h3 className="text-center mb-2">
                                Health Assessment Form
                            </h3>


                            <p className="text-center text-muted mb-4">

                                Fill in your current health details below.
                                BMI will be calculated automatically.

                            </p>


                            <form onSubmit={handleSubmit(onSubmit)}>


                                {/* AGE */}

                                <div className="mb-3">

                                    <label className={labelClass}>
                                        Current Age
                                    </label>


                                    <input

                                        type="number"

                                        placeholder="e.g. 25"

                                        className={
                                            errors.age
                                                ? `${inputClass} is-invalid`
                                                : inputClass
                                        }

                                        {...register("age", {

                                            required:
                                                "Age is required.",

                                            valueAsNumber: true,

                                            min: {

                                                value: 18,

                                                message:
                                                    "Age must be at least 18 years."

                                            },

                                            max: {

                                                value: 120,

                                                message:
                                                    "Age cannot be greater than 120 years."

                                            },

                                            validate: {

                                                wholeNumber: (value) =>

                                                    Number.isInteger(value) ||

                                                    "Age must be a whole number."

                                            }

                                        })}

                                    />


                                    {errors.age && (

                                        <p className={errorClass}>
                                            {errors.age.message}
                                        </p>

                                    )}

                                </div>


                                {/* HEIGHT AND WEIGHT */}

                                <div className="row">


                                    <div className="col-md-6 mb-3">

                                        <label className={labelClass}>
                                            Height (cm)
                                        </label>


                                        <input

                                            type="number"

                                            step="0.1"

                                            placeholder="e.g. 170"

                                            className={
                                                errors.height
                                                    ? `${inputClass} is-invalid`
                                                    : inputClass
                                            }

                                            {...register("height", {

                                                required:
                                                    "Height is required.",

                                                valueAsNumber: true,

                                                min: {

                                                    value: 1,

                                                    message:
                                                        "Height must be greater than 0 cm."

                                                },

                                                max: {

                                                    value: 300,

                                                    message:
                                                        "Height cannot be greater than 300 cm."

                                                }

                                            })}

                                        />


                                        {errors.height && (

                                            <p className={errorClass}>
                                                {errors.height.message}
                                            </p>

                                        )}

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className={labelClass}>
                                            Weight (kg)
                                        </label>


                                        <input

                                            type="number"

                                            step="0.1"

                                            placeholder="e.g. 65"

                                            className={
                                                errors.weight
                                                    ? `${inputClass} is-invalid`
                                                    : inputClass
                                            }

                                            {...register("weight", {

                                                required:
                                                    "Weight is required.",

                                                valueAsNumber: true,

                                                min: {

                                                    value: 1,

                                                    message:
                                                        "Weight must be greater than 0 kg."

                                                },

                                                max: {

                                                    value: 500,

                                                    message:
                                                        "Weight cannot be greater than 500 kg."

                                                }

                                            })}

                                        />


                                        {errors.weight && (

                                            <p className={errorClass}>
                                                {errors.weight.message}
                                            </p>

                                        )}

                                    </div>

                                </div>


                                <p className="text-muted mb-4">

                                    BMI will be calculated automatically from
                                    your height and weight.

                                </p>


                                {/* HIGH BLOOD PRESSURE */}

                                <div className="mb-3">

                                    <label className={labelClass}>

                                        Have you ever been told by a healthcare
                                        professional that you have high blood pressure?

                                    </label>


                                    <select

                                        className={
                                            errors.highBP
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register("highBP", {

                                            required:
                                                "Please select Yes or No."

                                        })}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.highBP && (

                                        <p className={errorClass}>
                                            {errors.highBP.message}
                                        </p>

                                    )}

                                </div>


                                {/* HIGH CHOLESTEROL */}

                                <div className="mb-3">

                                    <label className={labelClass}>

                                        Have you ever been told by a healthcare
                                        professional that you have high cholesterol?

                                    </label>


                                    <select

                                        className={
                                            errors.highChol
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register("highChol", {

                                            required:
                                                "Please select Yes or No."

                                        })}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.highChol && (

                                        <p className={errorClass}>
                                            {errors.highChol.message}
                                        </p>

                                    )}

                                </div>


                                {/* SMOKING */}

                                <div className="mb-3">

                                    <label className={labelClass}>
                                        Do you smoke?
                                    </label>


                                    <select

                                        className={
                                            errors.smoking
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register("smoking", {

                                            required:
                                                "Please select Yes or No."

                                        })}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.smoking && (

                                        <p className={errorClass}>
                                            {errors.smoking.message}
                                        </p>

                                    )}

                                </div>


                                {/* ALCOHOL */}

                                <div className="mb-3">

                                    <label className={labelClass}>
                                        Do you consume alcohol heavily?
                                    </label>


                                    <select

                                        className={
                                            errors.alcohol
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register("alcohol", {

                                            required:
                                                "Please select Yes or No."

                                        })}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.alcohol && (

                                        <p className={errorClass}>
                                            {errors.alcohol.message}
                                        </p>

                                    )}

                                </div>


                                {/* PHYSICAL ACTIVITY */}

                                <div className="mb-3">

                                    <label className={labelClass}>

                                        Do you do physical activity regularly?

                                    </label>


                                    <select

                                        className={
                                            errors.physicalActivity
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register(
                                            "physicalActivity",
                                            {

                                                required:
                                                    "Please select Yes or No."

                                            }
                                        )}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.physicalActivity && (

                                        <p className={errorClass}>
                                            {errors.physicalActivity.message}
                                        </p>

                                    )}

                                </div>


                                {/* FRUIT CONSUMPTION */}

                                <div className="mb-3">

                                    <label className={labelClass}>

                                        Do you consume fruits daily?

                                    </label>


                                    <select

                                        className={
                                            errors.fruitsConsumption
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register(
                                            "fruitsConsumption",
                                            {

                                                required:
                                                    "Please select Yes or No."

                                            }
                                        )}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.fruitsConsumption && (

                                        <p className={errorClass}>
                                            {errors.fruitsConsumption.message}
                                        </p>

                                    )}

                                </div>


                                {/* VEGETABLE CONSUMPTION */}

                                <div className="mb-3">

                                    <label className={labelClass}>

                                        Do you consume vegetables daily?

                                    </label>


                                    <select

                                        className={
                                            errors.veggiesConsumption
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register(
                                            "veggiesConsumption",
                                            {

                                                required:
                                                    "Please select Yes or No."

                                            }
                                        )}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.veggiesConsumption && (

                                        <p className={errorClass}>
                                            {errors.veggiesConsumption.message}
                                        </p>

                                    )}

                                </div>


                                {/* GENERAL HEALTH */}

                                <div className="mb-3">

                                    <label className={labelClass}>

                                        How would you rate your general health?

                                    </label>


                                    <select

                                        className={
                                            errors.generalHealth
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register("generalHealth", {

                                            required:
                                                "Please select your general health."

                                        })}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Excellent
                                        </option>

                                        <option value="2">
                                            Very Good
                                        </option>

                                        <option value="3">
                                            Good
                                        </option>

                                        <option value="4">
                                            Fair
                                        </option>

                                        <option value="5">
                                            Poor
                                        </option>

                                    </select>


                                    {errors.generalHealth && (

                                        <p className={errorClass}>
                                            {errors.generalHealth.message}
                                        </p>

                                    )}

                                </div>


                                {/* DIFFICULTY WALKING */}

                                <div className="mb-4">

                                    <label className={labelClass}>

                                        Do you have difficulty walking or
                                        climbing stairs?

                                    </label>


                                    <select

                                        className={
                                            errors.difficultyWalking
                                                ? `${selectClass} is-invalid`
                                                : selectClass
                                        }

                                        defaultValue=""

                                        {...register(
                                            "difficultyWalking",
                                            {

                                                required:
                                                    "Please select Yes or No."

                                            }
                                        )}

                                    >

                                        <option value="" disabled>
                                            Select
                                        </option>

                                        <option value="1">
                                            Yes
                                        </option>

                                        <option value="0">
                                            No
                                        </option>

                                    </select>


                                    {errors.difficultyWalking && (

                                        <p className={errorClass}>
                                            {errors.difficultyWalking.message}
                                        </p>

                                    )}

                                </div>


                                {/* SUBMIT BUTTON */}

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {loading
                                        ? "Analyzing... Please wait..."
                                        : "Submit Assessment"}

                                </button>


                            </form>


                            {/* BACKEND ERROR MESSAGE */}

                            {message && (

                                <p className="text-center text-danger mt-3 mb-0">

                                    {message}

                                </p>

                            )}


                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default AssessmentForm;