import React from 'react';

import { useNavigate } from 'react-router-dom';

const features = [
    { icon: '🤖', title: 'AI Risk Prediction', desc: 'Machine learning model trained on 250,000+ records' },
    { icon: '🔍', title: 'Explainable AI', desc: 'SHAP shows which factors drive your risk' },
    { icon: '💡', title: 'Personalized Tips', desc: 'Lifestyle recommendations based on your profile' },
    { icon: '📊', title: 'Health Dashboard', desc: 'Track your risk trend over time' }
];

function Home() {

    const navigate = useNavigate();

    return (

        <div className='max-w-5xl mx-auto mt-12 px-4 text-center'>

            <h1 className='text-4xl font-bold text-slate-900 mb-2'>🩺 SwasthAI</h1>

            <h4 className='text-slate-500 text-lg mb-3'>
                An Explainable AI-Based Preventive Healthcare Platform
            </h4>

            <p className='text-slate-700 mb-10'>
                Detect Early. Prevent Better. Live Healthier.
            </p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>

                {features.map((f) => (

                    <div key={f.title} className='bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center'>
                        <h2 className='text-3xl mb-2'>{f.icon}</h2>
                        <h6 className='font-semibold text-slate-800'>{f.title}</h6>
                        <p className='text-slate-500 text-sm mt-1'>{f.desc}</p>
                    </div>

                ))}

            </div>

            <div className='flex justify-center gap-4'>

                <button
                    className='bg-brand-600 text-white text-lg px-6 py-3 rounded-md font-medium hover:bg-brand-700 transition'
                    onClick={() => navigate('/register')}
                >
                    Get Started
                </button>

                <button
                    className='border border-brand-600 text-brand-600 text-lg px-6 py-3 rounded-md font-medium hover:bg-brand-50 transition'
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>

            </div>

            <p className='text-slate-500 text-sm mt-12'>
                ⚠️ SwasthAI provides risk assessment only, not medical diagnosis.
                Always consult a healthcare professional.
            </p>

        </div>

    );

}

export default Home;
