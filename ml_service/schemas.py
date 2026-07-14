
"""
============================================================
SwasthAI
Pydantic Schemas
============================================================
"""

from typing import List
from pydantic import BaseModel, Field


# ============================================================
# INPUT SCHEMA
# ============================================================

class PatientData(BaseModel):
    """
    Patient information received from the Node.js backend.

    Note:
    - Age is received as actual age (years).
    - It will be converted into the BRFSS age category
      inside utils.py before prediction.
    """

    bmi: float = Field(
        ...,
        gt=0,
        le=80,
        description="Body Mass Index"
    )

    height: float = Field(
        ...,
        gt=0,
        le=300,
        description="Height in centimeters"
    )

    weight: float = Field(
        ...,
        gt=0,
        le=500,
        description="Weight in kilograms"
    )

    highBP: int = Field(
        ...,
        ge=0,
        le=1,
        description="High blood pressure: 0 = No, 1 = Yes"
    )

    highChol: int = Field(
        ...,
        ge=0,
        le=1,
        description="High cholesterol: 0 = No, 1 = Yes"
    )

    smoking: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )

    alcohol: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )

    physicalActivity: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )

    fruitsConsumption: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )

    veggiesConsumption: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )

    generalHealth: int = Field(
        ...,
        ge=1,
        le=5,
        description="1 = Excellent ... 5 = Poor"
    )

    difficultyWalking: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )

    age: int = Field(
        ...,
        ge=18,
        le=120,
        description="Actual age in years"
    )

    gender: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = Female, 1 = Male"
    )


# ============================================================
# SHAP RESPONSE
# ============================================================

class SHAPFactor(BaseModel):
    """
    Individual feature contribution.
    """

    feature: str
    contribution: float


# ============================================================
# PREDICTION RESPONSE
# ============================================================

class PredictionResponse(BaseModel):

    riskLevel: str
    riskProbability: float

    age: int
    gender: str

    height: float
    weight: float
    bmi: float

    highBP: int
    highChol: int

    smoking: int
    alcohol: int
    physicalActivity: int

    shapFactors: List[SHAPFactor]

    recommendations: List[str]
