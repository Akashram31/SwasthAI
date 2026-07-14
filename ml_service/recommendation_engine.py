
"""
============================================================
SwasthAI
Recommendation Engine
============================================================
This module generates personalized recommendations based on
the user's health information and predicted diabetes risk.
============================================================
"""

from typing import Dict, List


def generate_recommendations(
    inputs: Dict,
    risk_probability: float
) -> List[str]:
    """
    Generate personalized health recommendations.

    Parameters
    ----------
    inputs : dict
        Patient input data.

    risk_probability : float
        Diabetes probability returned by the ML model.
        Expected range: 0.0 to 1.0

    Returns
    -------
    List[str]
        Personalized recommendations.
    """

    recommendations = []

    bmi = inputs["bmi"]
    high_bp = inputs["highBP"]
    high_chol = inputs["highChol"]
    smoking = inputs["smoking"]
    alcohol = inputs["alcohol"]
    physical_activity = inputs["physicalActivity"]
    fruits = inputs["fruitsConsumption"]
    vegetables = inputs["veggiesConsumption"]
    general_health = inputs["generalHealth"]
    difficulty_walking = inputs["difficultyWalking"]

    # ==========================================================
    # BMI
    # ==========================================================

    if bmi >= 30:
        recommendations.append(
            "Your BMI falls in the obese range. A gradual reduction in weight through healthy eating and regular exercise can significantly reduce diabetes risk."
        )

    elif bmi >= 25:
        recommendations.append(
            "Your BMI indicates that you are overweight. Maintaining a healthy weight can lower your future diabetes risk."
        )

    # ==========================================================
    # HIGH BLOOD PRESSURE
    # ==========================================================

    if high_bp == 1:
        recommendations.append(
            "High blood pressure is associated with increased health risks. Regular blood pressure monitoring, physical activity, and a balanced diet may help support better cardiovascular health."
        )

    # ==========================================================
    # HIGH CHOLESTEROL
    # ==========================================================

    if high_chol == 1:
        recommendations.append(
            "High cholesterol can increase long-term health risks. Consider maintaining a heart-healthy diet, exercising regularly, and discussing cholesterol management with a healthcare professional."
        )

    # ==========================================================
    # Smoking
    # ==========================================================

    if smoking == 1:
        recommendations.append(
            "Quitting smoking can improve overall health and reduce the risk of chronic diseases."
        )

    # ==========================================================
    # Alcohol
    # ==========================================================

    if alcohol == 1:
        recommendations.append(
            "Reducing heavy alcohol consumption can improve long-term health outcomes."
        )

    # ==========================================================
    # Physical Activity
    # ==========================================================

    if physical_activity == 0:
        recommendations.append(
            "Aim for at least 150 minutes of moderate physical activity every week."
        )

    # ==========================================================
    # Fruits
    # ==========================================================

    if fruits == 0:
        recommendations.append(
            "Increase your daily fruit intake as part of a balanced diet."
        )

    # ==========================================================
    # Vegetables
    # ==========================================================

    if vegetables == 0:
        recommendations.append(
            "Include more vegetables in your daily meals to improve nutrition."
        )

    # ==========================================================
    # General Health
    # ==========================================================

    if general_health >= 4:
        recommendations.append(
            "Your self-reported health status suggests that consulting a healthcare professional would be beneficial."
        )

    # ==========================================================
    # Difficulty Walking
    # ==========================================================

    if difficulty_walking == 1:
        recommendations.append(
            "Difficulty walking may indicate an underlying health condition. Please seek medical advice."
        )

    # ==========================================================
    # High Diabetes Risk
    # ==========================================================

    if risk_probability >= 0.50:
        recommendations.append(
            "Your estimated diabetes risk is elevated. Consider scheduling a medical check-up for professional evaluation."
        )

    # ==========================================================
    # Healthy User
    # ==========================================================

    if not recommendations:
        recommendations.append(
            "Your current lifestyle appears healthy. Continue maintaining balanced nutrition, regular exercise, and routine health check-ups."
        )

    return recommendations

