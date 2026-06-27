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

MODEL_PATH = BASE_DIR / "saved_model" / "diabetes_model.pkl"


# ============================================================
# LOAD MODEL
# ============================================================

def load_model():
    """
    Load the trained ML model bundle.

    Returns
    -------
    dict
        {
            "model": trained model,
            "model_name": model name,
            "needs_scaling": bool,
            "scaler": StandardScaler,
            "feature_names": list,
            "metrics": dict
        }
    """

    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Model file not found: {MODEL_PATH}"
        )

    bundle = joblib.load(MODEL_PATH)

    required_keys = [
        "model",
        "model_name",
        "needs_scaling",
        "scaler",
        "feature_names",
        "metrics"
    ]

    for key in required_keys:
        if key not in bundle:
            raise KeyError(
                f"Missing key '{key}' in saved model bundle."
            )

    return {
        "model": bundle["model"],
        "model_name": bundle["model_name"],
        "needs_scaling": bundle["needs_scaling"],
        "scaler": bundle["scaler"],
        "feature_names": bundle["feature_names"],
        "metrics": bundle["metrics"]
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