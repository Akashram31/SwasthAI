"""
============================================================
SwasthAI
FastAPI ML Service
============================================================
"""

# ============================================================
# IMPORTS
# ============================================================

import pandas as pd
import numpy as np
import shap

from fastapi import FastAPI, HTTPException

from model_utils import load_model

from schemas import (
    PatientData,
    PredictionResponse,
)

from utils import convert_age_to_category

from recommendation_engine import generate_recommendations
# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="SwasthAI Diabetes Prediction API",
    description="Machine Learning API for Diabetes Prediction",
    version="1.0"
)

# ============================================================
# LOAD MODEL
# ============================================================

try:

    bundle = load_model()

    model = bundle["model"]
    scaler = bundle["scaler"]
    feature_names = bundle["feature_names"]
    needs_scaling = bundle["needs_scaling"]
    model_name = bundle["model_name"]
    metrics = bundle["metrics"]

    # ============================================================
    # SHAP EXPLAINER
    # ============================================================

    explainer = shap.TreeExplainer(model)
   

except Exception as e:

    raise RuntimeError(
        f"Unable to load model : {e}"
    )
# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {
        "message": "SwasthAI API Running Successfully",
        "model": model_name
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "Healthy",
        "model": model_name
    }


# ============================================================
# METRICS
# ============================================================

@app.get("/metrics")
def get_metrics():

    return metrics
# ============================================================
# PREDICT
# ============================================================

@app.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(patient: PatientData):

    try:

        # ============================================================
        # CONVERT REQUEST TO DICTIONARY
        # ============================================================

        patient = patient.model_dump()

        age_category = convert_age_to_category(
            patient["age"]
        )

        # ============================================================
        # CREATE INPUT DATAFRAME
        # ============================================================

        input_df = pd.DataFrame([{
            "BMI": patient["bmi"],
            "Smoker": patient["smoking"],
            "HvyAlcoholConsump": patient["alcohol"],
            "PhysActivity": patient["physicalActivity"],
            "Fruits": patient["fruitsConsumption"],
            "Veggies": patient["veggiesConsumption"],
            "GenHlth": patient["generalHealth"],
            "DiffWalk": patient["difficultyWalking"],
            "Age": age_category,
            "Sex": patient["gender"]
        }])

        # ============================================================
        # PREPARE MODEL INPUT
        # ============================================================

        model_input = input_df.copy()

        if needs_scaling:
            model_input = scaler.transform(model_input)

        # ============================================================
        # PREDICT PROBABILITY
        # ============================================================

        probability = float(
            model.predict_proba(model_input)[0][1]
        )

        prediction = int(
            model.predict(model_input)[0]
        )

        # ============================================================
        # RISK LEVEL
        # ============================================================

        if probability < 0.30:
            risk_level = "Low"
        elif probability < 0.70:
            risk_level = "Moderate"
        else:
            risk_level = "High"

        # ============================================================
        # RECOMMENDATIONS
        # ============================================================

        recommendations = generate_recommendations(
            patient,
            probability
        )

        # ============================================================
        # SHAP EXPLANATION
        # ============================================================

        shap_values = explainer.shap_values(input_df)

        if isinstance(shap_values, list):
            values = shap_values[1][0]

        elif isinstance(shap_values, np.ndarray):

            if shap_values.ndim == 3:
                values = shap_values[0, :, 1]
            else:
                values = shap_values[0]

        else:
            values = np.array(shap_values).flatten()

        shap_factors = []

        for feature, value in zip(feature_names, values):
            shap_factors.append({
                "feature": feature,
                "contribution": round(float(value), 4)
            })

        shap_factors = sorted(
            shap_factors,
            key=lambda x: abs(x["contribution"]),
            reverse=True
        )

        # ============================================================
        # RESPONSE
        # ============================================================

        return PredictionResponse(
            riskLevel=risk_level,
            riskProbability=round(probability * 100, 2),

            age=patient["age"],
            gender="Male" if patient["gender"] == 1 else "Female",

            height=patient["height"],
            weight=patient["weight"],
            bmi=patient["bmi"],

            smoking=patient["smoking"],
            alcohol=patient["alcohol"],
            physicalActivity=patient["physicalActivity"],

            shapFactors=shap_factors[:5],
            recommendations=recommendations
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
   