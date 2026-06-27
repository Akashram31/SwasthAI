import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import api from '../api/axios';

const inputClass = 'w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500';
const labelClass = 'block font-semibold text-slate-700 mb-1';
const errorClass = 'text-red-600 text-sm mt-1';

function AssessmentForm() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        setLoading(true);

        setMessage('');

        try {

            const response = await api.post('/assessment/submit', {
			height: parseFloat(data.height),
			weight: parseFloat(data.weight),
			smoking: parseInt(data.smoking),
			alcohol: parseInt(data.alcohol),
			physicalActivity: parseInt(data.physicalActivity),
			fruitsConsumption: parseInt(data.fruitsConsumption),
			veggiesConsumption: parseInt(data.veggiesConsumption),
			generalHealth: parseInt(data.generalHealth),
			difficultyWalking: parseInt(data.difficultyWalking)
});

            reset();

            // Go to result page with assessment id
            navigate('/result/' + response.data.data._id);

        } catch (error) {

      

    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

    setMessage(
        JSON.stringify(error.response?.data || error.message)
    );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className='max-w-2xl mx-auto mt-10 px-4'>

            <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>

                <h3 className='text-center text-xl font-semibold text-slate-800'>
                    🩺 Health Assessment Form
                </h3>

                <p className='text-center text-slate-500 mb-6 mt-1'>
                    Fill in your details below. BMI will be calculated automatically.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                   

                    {/* Height and Weight */}
                    <div className='grid grid-cols-2 gap-4'>

                        <div>
                            <label className={labelClass}>Height (cm)</label>
                            <input
                                type='number'
                                placeholder='e.g. 170'
                                className={inputClass}
                                {...register('height', {
                                    required: 'Height is required'
                                })}
                            />
                            {errors.height &&
                                <p className={errorClass}>{errors.height.message}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Weight (kg)</label>
                            <input
                                type='number'
                                placeholder='e.g. 65'
                                className={inputClass}
                                {...register('weight', {
                                    required: 'Weight is required'
                                })}
                            />
                            {errors.weight &&
                                <p className={errorClass}>{errors.weight.message}</p>}
                        </div>

                    </div>

                    <p className='text-slate-500 text-sm'>
                        ℹ️ BMI will be calculated automatically from height and weight.
                    </p>

                    {/* Smoking */}
                    <div>
                        <label className={labelClass}>Do you smoke?</label>
                        <select
                            className={inputClass}
                            {...register('smoking', {
                                required: 'This field is required'
                            })}
                        >
                            <option value=''>Select</option>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                        {errors.smoking &&
                            <p className={errorClass}>{errors.smoking.message}</p>}
                    </div>

                    {/* Alcohol */}
                    <div>
                        <label className={labelClass}>Do you consume alcohol heavily?</label>
                        <select
                            className={inputClass}
                            {...register('alcohol', {
                                required: 'This field is required'
                            })}
                        >
                            <option value=''>Select</option>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                        {errors.alcohol &&
                            <p className={errorClass}>{errors.alcohol.message}</p>}
                    </div>

                    {/* Physical Activity */}
                    <div>
                        <label className={labelClass}>Do you do physical activity regularly?</label>
                        <select
                            className={inputClass}
                            {...register('physicalActivity', {
                                required: 'This field is required'
                            })}
                        >
                            <option value=''>Select</option>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                        {errors.physicalActivity &&
                            <p className={errorClass}>{errors.physicalActivity.message}</p>}
                    </div>

                    {/* Fruits */}
                    <div>
                        <label className={labelClass}>Do you consume fruits daily?</label>
                        <select
                            className={inputClass}
                            {...register('fruitsConsumption', {
                                required: 'This field is required'
                            })}
                        >
                            <option value=''>Select</option>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                        {errors.fruitsConsumption &&
                            <p className={errorClass}>{errors.fruitsConsumption.message}</p>}
                    </div>

                    {/* Vegetables */}
                    <div>
                        <label className={labelClass}>Do you consume vegetables daily?</label>
                        <select
                            className={inputClass}
                            {...register('veggiesConsumption', {
                                required: 'This field is required'
                            })}
                        >
                            <option value=''>Select</option>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                        {errors.veggiesConsumption &&
                            <p className={errorClass}>{errors.veggiesConsumption.message}</p>}
                    </div>

                    {/* General Health */}
                    <div>
                        <label className={labelClass}>How would you rate your general health?</label>
                        <select
                            className={inputClass}
                            {...register('generalHealth', {
                                required: 'This field is required'
                            })}
                        >
                            <option value=''>Select</option>
                            <option value='1'>Excellent</option>
                            <option value='2'>Very Good</option>
                            <option value='3'>Good</option>
                            <option value='4'>Fair</option>
                            <option value='5'>Poor</option>
                        </select>
                        {errors.generalHealth &&
                            <p className={errorClass}>{errors.generalHealth.message}</p>}
                    </div>

                    {/* Difficulty Walking */}
                    <div>
                        <label className={labelClass}>Do you have difficulty walking or climbing stairs?</label>
                        <select
                            className={inputClass}
                            {...register('difficultyWalking', {
                                required: 'This field is required'
                            })}
                        >
                            <option value=''>Select</option>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                        {errors.difficultyWalking &&
                            <p className={errorClass}>{errors.difficultyWalking.message}</p>}
                    </div>

                    <button
                        className='w-full bg-brand-600 text-white rounded-md py-2.5 font-medium hover:bg-brand-700 transition disabled:opacity-60'
                        disabled={loading}
                    >
                        {loading ? 'Analyzing... Please wait...' : 'Submit Assessment'}
                    </button>

                </form>

                {message &&
                    <p className='mt-3 text-center text-red-600 text-sm'>{message}</p>}

            </div>

        </div>

    );

}

export default AssessmentForm;
