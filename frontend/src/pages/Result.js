import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import api from "../api/axios";

function Result() {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [assessment, setAssessment] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await api.get("/assessment/" + id);
        setAssessment(response.data.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Could not load this assessment."
        );
      }
    };

    fetchResult();
  }, [id]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (message) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <p className="text-red-600 text-center">{message}</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4 text-center">
        <p className="text-slate-500">Loading your results...</p>
      </div>
    );
  }

  return <ResultCard assessment={assessment} />;
}

export default Result;