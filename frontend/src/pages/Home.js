import React from "react";

import { useNavigate } from "react-router-dom";

const features = [

    {
        icon: "🤖",
        title: "AI Risk Prediction",
        desc: "Machine learning model trained on 250,000+ records"
    },

    {
        icon: "🔍",
        title: "Explainable AI",
        desc: "SHAP shows which factors drive your risk"
    },

    {
        icon: "💡",
        title: "Personalized Tips",
        desc: "Lifestyle recommendations based on your profile"
    },

    {
        icon: "📊",
        title: "Health Dashboard",
        desc: "Track your risk trend over time"
    }

];

function Home() {

    const navigate = useNavigate();

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-lg-10 text-center">

                    <h1 className="display-4 fw-bold mb-2">
                        🩺 SwasthAI
                    </h1>

                    <h4 className="text-muted mb-3">
                        An Explainable AI-Based Preventive Healthcare Platform
                    </h4>

                    <p className="mb-5">
                        Detect Early. Prevent Better. Live Healthier.
                    </p>

                    {/* Features */}

                    <div className="row g-4 mb-5">

                        {features.map((f) => (

                            <div
                                className="col-md-3 col-sm-6"
                                key={f.title}
                            >

                                <div className="card h-100 shadow-sm border">

                                    <div className="card-body text-center">

                                        <h1 className="mb-3">

                                            {f.icon}

                                        </h1>

                                        <h5 className="card-title">

                                            {f.title}

                                        </h5>

                                        <p className="card-text text-muted">

                                            {f.desc}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Buttons */}

                    <div className="d-flex justify-content-center gap-3">

                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate("/register")}
                        >
                            Get Started
                        </button>

                        <button
                            className="btn btn-outline-primary btn-lg"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>

                    {/* Footer Note */}

                    <p className="text-muted mt-5">

                        ⚠️ SwasthAI provides risk assessment only, not medical diagnosis.
                        Always consult a healthcare professional.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Home;