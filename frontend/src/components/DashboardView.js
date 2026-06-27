import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

import api from '../api/axios';

const riskBadgeClasses = {
    Low: 'bg-emerald-100 text-emerald-700',
    Moderate: 'bg-amber-100 text-amber-700',
    High: 'bg-red-100 text-red-700'
};

function DashboardView() {

    const [assessments, setAssessments] = useState([]);

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const fetchAssessments = async () => {

        try {

            const response = await api.get('/assessment/myassessments');

            setAssessments(response.data.data || []);

        } catch (error) {

            setMessage(error.response?.data?.message || 'Could not load your assessments.');

        }

    };

    useEffect(() => {

        fetchAssessments();

    }, []);

    // Prepare chart data - risk probability over time
    const chartData = assessments
    .map((a, index) => ({
        assessment: 'Assessment ' + (assessments.length - index),
        riskProbability: a.riskProbability ?? 0,
        date: a.createdAt
            ? new Date(a.createdAt).toLocaleDateString()
            : '-'
    }))
    .reverse();

    const getRiskBadge = (level) => riskBadgeClasses[level] || riskBadgeClasses.High;

    return (

        <div className='max-w-4xl mx-auto mt-10 px-4'>

            <h3 className='text-xl font-semibold text-slate-800 mb-4'>📊 My Health Dashboard</h3>

            {assessments.length === 0 ? (

                <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center'>
                    <p className='text-slate-500 mb-4'>No assessments found. Take your first assessment!</p>
                    <button
                        className='bg-brand-600 text-white px-4 py-2 rounded-md font-medium hover:bg-brand-700 transition'
                        onClick={() => navigate('/assessment')}
                    >
                        Take Assessment
                    </button>
                </div>

            ) : (

                <>

                    {/* Risk Trend Chart */}
                    <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6'>

                        <h5 className='font-semibold text-slate-800 mb-3'>📈 Risk Probability Trend</h5>

                        <ResponsiveContainer width='100%' height={250}>

                            <LineChart data={chartData}>

                                <CartesianGrid strokeDasharray='3 3' />

                                <XAxis dataKey='date' />

                                <YAxis domain={[0, 100]} />

                                <Tooltip />

                                <Line
                                    type='monotone'
                                    dataKey='riskProbability'
                                    stroke='#1e5fce'
                                    strokeWidth={2}
                                    name='Risk %'
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                    {/* Assessment History Table */}
                    <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-5'>

                        <h5 className='font-semibold text-slate-800 mb-3'>📋 Assessment History</h5>

                        <div className='overflow-x-auto'>

                            <table className='w-full text-left border-collapse'>

                                <thead>
                                    <tr className='border-b border-slate-200 text-slate-600 text-sm'>
                                        <th className='py-2 pr-4'>#</th>
                                        <th className='py-2 pr-4'>Date</th>
                                        <th className='py-2 pr-4'>BMI</th>
                                        <th className='py-2 pr-4'>Risk Level</th>
                                        <th className='py-2 pr-4'>Risk Probability</th>
                                        <th className='py-2 pr-4'>View Details</th>
                                    </tr>
                                </thead>

                                <tbody>

								{assessments.map((a, index) => (

									<tr key={a._id} className='border-b border-slate-100'>

										<td className='py-2 pr-4'>{index + 1}</td>

										<td className='py-2 pr-4'>
											{a.createdAt
												? new Date(a.createdAt).toLocaleDateString()
												: "-"}
										</td>

										<td className='py-2 pr-4'>
											{a.bmi ?? "-"}
										</td>

										<td className='py-2 pr-4'>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadge(
													a.riskLevel || "High"
												)}`}
											>
												{a.riskLevel ?? "N/A"}
											</span>
										</td>

										<td className='py-2 pr-4'>
											{a.riskProbability != null
												? `${a.riskProbability}%`
												: "-"}
										</td>

										<td className='py-2 pr-4'>
											<button
												className='bg-brand-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-brand-700 transition'
												onClick={() => navigate('/result/' + a._id)}
											>
												View
											</button>
										</td>

									</tr>

								))}

							</tbody>

                            </table>

                        </div>

                    </div>

                </>

            )}

            {message &&
                <p className='text-center text-red-600 mt-4'>{message}</p>}

        </div>

    );

}

export default DashboardView;
