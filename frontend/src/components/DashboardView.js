import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import api from "../api/axios";

const riskBadgeClasses = {
    Low: "badge bg-success",
    Moderate: "badge bg-warning text-dark",
    High: "badge bg-danger"
};

function DashboardView() {

    const [assessments, setAssessments] = useState([]);

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const fetchAssessments = async () => {

        try {

            const response = await api.get("/assessment/myassessments");

            setAssessments(response.data.data || []);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Could not load your assessments."
            );

        }

    };

    useEffect(() => {

        fetchAssessments();

    }, []);

    // Prepare chart data

    const chartData = assessments
        .map((a, index) => ({

            assessment: "Assessment " + (assessments.length - index),

            riskProbability: a.riskProbability ?? 0,

            date: a.createdAt
                ? new Date(a.createdAt).toLocaleDateString()
                : "-"

        }))
        .reverse();

    const getRiskBadge = (level) =>
        riskBadgeClasses[level] || riskBadgeClasses.High;

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-lg-10">

                    <h3 className="mb-4">
                        📊 My Health Dashboard
                    </h3>

                    {assessments.length === 0 ? (

                        <div className="card shadow-sm border">

                            <div className="card-body text-center">

                                <p className="text-muted">
                                    No assessments found. Take your first assessment!
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/assessment")}
                                >
                                    Take Assessment
                                </button>

                            </div>

                        </div>

                    ) : (

                        <>

                            {/* Risk Trend Chart */}

                            <div className="card shadow-sm border mb-4">

                                <div className="card-body">

                                    <h5 className="card-title mb-3">
                                        📈 Risk Probability Trend
                                    </h5>

                                    <ResponsiveContainer width="100%" height={250}>

                                        <LineChart data={chartData}>

                                            <CartesianGrid strokeDasharray="3 3" />

                                            <XAxis dataKey="date" />

                                            <YAxis domain={[0, 100]} />

                                            <Tooltip />

                                            <Line
                                                type="monotone"
                                                dataKey="riskProbability"
                                                stroke="#0d6efd"
                                                strokeWidth={2}
                                                name="Risk %"
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>

                            {/* Assessment History */}

                            <div className="card shadow-sm border">

                                <div className="card-body">

                                    <h5 className="card-title mb-3">
                                        📋 Assessment History
                                    </h5>

                                    <div className="table-responsive">

                                        <table className="table table-hover">

                                            <thead>

                                                <tr>

                                                    <th>#</th>

                                                    <th>Date</th>

                                                    <th>BMI</th>

                                                    <th>Risk Level</th>

                                                    <th>Risk Probability</th>

                                                    <th>View Details</th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {assessments.map((a, index) => (

                                                    <tr key={a._id}>

                                                        <td>{index + 1}</td>

                                                        <td>

                                                            {a.createdAt
                                                                ? new Date(a.createdAt).toLocaleDateString()
                                                                : "-"}

                                                        </td>

                                                        <td>

                                                            {a.bmi ?? "-"}

                                                        </td>

                                                        <td>

                                                            <span className={getRiskBadge(a.riskLevel || "High")}>

                                                                {a.riskLevel ?? "N/A"}

                                                            </span>

                                                        </td>

                                                        <td>

                                                            {a.riskProbability != null
                                                                ? `${a.riskProbability}%`
                                                                : "-"}

                                                        </td>

                                                        <td>

                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                onClick={() =>
                                                                    navigate("/result/" + a._id)
                                                                }
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

                            </div>

                        </>

                    )}

                    {message &&

                        <p className="text-danger text-center mt-4">

                            {message}

                        </p>

                    }

                </div>

            </div>

        </div>

    );

}

export default DashboardView;