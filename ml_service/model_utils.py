
"""
============================================================
SwasthAI
Model Utilities
============================================================
Loads the trained diabetes prediction model and
associated resources for FastAPI inference.
============================================================
"""

from pathlib import Path
import joblib


# ============================================================
# PROJECT PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_DIR = BASE_DIR / "saved_model_v2"

MODEL_PATH = MODEL_DIR / "diabetes_model.pkl"
FEATURES_PATH = MODEL_DIR / "feature_columns.pkl"


# ============================================================
# LOAD MODEL
# ============================================================

def load_model():
    """
    Load the trained Random Forest model and feature columns.

    Returns
    -------
    dict
        {
            "model": trained Random Forest model,
            "model_name": model name,
            "needs_scaling": False,
            "scaler": None,
            "feature_names": list
        }
    """

    # Check model file
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model file not found: {MODEL_PATH}"
        )

    # Check feature columns file
    if not FEATURES_PATH.exists():
        raise FileNotFoundError(
            f"Feature columns file not found: {FEATURES_PATH}"
        )

    # Load trained Random Forest model
    model = joblib.load(MODEL_PATH)

    # Load feature names in correct training order
    feature_names = joblib.load(FEATURES_PATH)

    return {
        "model": model,
        "model_name": "Tuned Random Forest",
        "needs_scaling": False,
        "scaler": None,
        "feature_names": feature_names
    }


# ============================================================
# TEST
# ============================================================

if __name__ == "__main__":

    model_bundle = load_model()

    print("=" * 60)
    print("MODEL LOADED SUCCESSFULLY")
    print("=" * 60)

    print(f"Model Name      : {model_bundle['model_name']}")
    print(f"Needs Scaling   : {model_bundle['needs_scaling']}")
    print(f"Features        : {model_bundle['feature_names']}")

