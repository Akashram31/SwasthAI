"""
============================================================
SwasthAI
Diabetes Risk Prediction Model Training
============================================================
Author : SwasthAI Team
Dataset : CDC BRFSS Diabetes Binary Dataset
============================================================
"""

# ============================================================
# IMPORT LIBRARIES
# ============================================================

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import (
    train_test_split,
    RandomizedSearchCV
)

from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    classification_report,
    confusion_matrix
)

# ============================================================
# PROJECT PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "diabetes_binary_health_indicators_BRFSS2015.csv"

SAVE_DIR = BASE_DIR / "saved_model"

SAVE_DIR.mkdir(exist_ok=True)

MODEL_PATH = SAVE_DIR / "diabetes_model.pkl"

METRICS_PATH = SAVE_DIR / "metrics.json"

# ============================================================
# LOAD DATASET
# ============================================================

print("=" * 70)
print("STEP 1 : LOADING DATASET")
print("=" * 70)

df = pd.read_csv(DATASET_PATH)

print("\nDataset Loaded Successfully")

print(f"\nRows : {df.shape[0]}")

print(f"Columns : {df.shape[1]}")

print("\nFirst Five Records")

print(df.head())
print("\nColumn Names")

print(df.columns.tolist())

# ============================================================
# DATA VALIDATION
# ============================================================

print("\n" + "=" * 70)

print("STEP 2 : DATA VALIDATION")

print("=" * 70)

print("\nMissing Values")

print(df.isnull().sum())

print("\nDuplicate Rows")

print(df.duplicated().sum())

print("\nData Types")

print(df.dtypes)

print("\nTarget Distribution")

print(df["Diabetes_binary"].value_counts())

# ============================================================
# FEATURE SELECTION
# ============================================================

print("\n" + "=" * 70)

print("STEP 3 : FEATURE SELECTION")

print("=" * 70)

FEATURES = [

    "BMI",

    "Smoker",

    "HvyAlcoholConsump",

    "PhysActivity",

    "Fruits",

    "Veggies",

    "GenHlth",

    "DiffWalk",

    "Age",

    "Sex"

]

TARGET = "Diabetes_binary"

X = df[FEATURES]

missing_features = [

    feature

    for feature in FEATURES

    if feature not in df.columns

]

if missing_features:

    raise ValueError(

        f"Missing columns: {missing_features}"

    )

y = df[TARGET]

print("\nSelected Features")

for feature in FEATURES:

    print(f"• {feature}")

print("\nTarget")

print(TARGET)

# ============================================================
# TRAIN TEST SPLIT
# ============================================================

print("\n" + "=" * 70)

print("STEP 4 : TRAIN TEST SPLIT")

print("=" * 70)

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.20,

    stratify=y,

    random_state=42

)

print(f"\nTraining Samples : {len(X_train)}")

print(f"Testing Samples  : {len(X_test)}")

# ============================================================
# FEATURE SCALING
# ============================================================

print("\n" + "=" * 70)

print("STEP 5 : FEATURE SCALING")

print("=" * 70)

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)

X_test_scaled = scaler.transform(X_test)

print("\nScaling Completed Successfully")

print("\nDataset Ready For Training")
# ============================================================
# STEP 6 : LOGISTIC REGRESSION
# ============================================================

print("\n" + "=" * 70)

print("STEP 6 : LOGISTIC REGRESSION")

print("=" * 70)

logistic_model = LogisticRegression(

    max_iter=1000,

    class_weight="balanced",

    random_state=42

)

logistic_model.fit(

    X_train_scaled,

    y_train

)

logistic_predictions = logistic_model.predict(

    X_test_scaled

)

logistic_probabilities = logistic_model.predict_proba(

    X_test_scaled

)[:, 1]

logistic_accuracy = accuracy_score(

    y_test,

    logistic_predictions

)

logistic_precision = precision_score(

    y_test,

    logistic_predictions

)

logistic_recall = recall_score(

    y_test,

    logistic_predictions

)

logistic_f1 = f1_score(

    y_test,

    logistic_predictions

)

logistic_auc = roc_auc_score(

    y_test,

    logistic_probabilities

)

print("\nLogistic Regression Performance")

print("-" * 40)

print(f"Accuracy      : {logistic_accuracy:.4f}")

print(f"Precision     : {logistic_precision:.4f}")

print(f"Recall        : {logistic_recall:.4f}")

print(f"F1 Score      : {logistic_f1:.4f}")

print(f"ROC-AUC Score : {logistic_auc:.4f}")

print("\nConfusion Matrix")

print(

    confusion_matrix(

        y_test,

        logistic_predictions

    )

)

print("\nClassification Report")

print(

    classification_report(

        y_test,

        logistic_predictions

    )

)

# ============================================================
# STEP 7 : RANDOM FOREST HYPERPARAMETER TUNING
# ============================================================

print("\n" + "=" * 70)

print("STEP 7 : RANDOM FOREST HYPERPARAMETER TUNING")

print("=" * 70)

parameter_grid = {

    "n_estimators": [

        100,

        200,

        300,

        500

    ],

    "max_depth": [

        5,

        10,

        15,

        20,

        None

    ],

    "min_samples_split": [

        2,

        5,

        10

    ],

    "min_samples_leaf": [

        1,

        2,

        4

    ],

    "max_features": [

        "sqrt",

        "log2"

    ]

}

random_forest = RandomForestClassifier(

    class_weight="balanced",

    random_state=42

)

random_search = RandomizedSearchCV(

    estimator=random_forest,

    param_distributions=parameter_grid,

    n_iter=20,

    scoring="roc_auc",

    cv=5,

    random_state=42,

    verbose=2,

    n_jobs=-1,
    
    return_train_score=True

)

print("\nSearching for Best Hyperparameters...")

random_search.fit(

    X_train,

    y_train

)

best_rf = random_search.best_estimator_

print("\nBest Hyperparameters")

print(random_search.best_params_)

print("\nBest Cross Validation ROC-AUC")

print(f"{random_search.best_score_:.4f}")

# ============================================================
# STEP 8 : RANDOM FOREST EVALUATION
# ============================================================

print("\n" + "=" * 70)

print("STEP 8 : RANDOM FOREST EVALUATION")

print("=" * 70)

rf_predictions = best_rf.predict(

    X_test

)

rf_probabilities = best_rf.predict_proba(

    X_test

)[:, 1]

rf_accuracy = accuracy_score(

    y_test,

    rf_predictions

)

rf_precision = precision_score(

    y_test,

    rf_predictions

)

rf_recall = recall_score(

    y_test,

    rf_predictions

)

rf_f1 = f1_score(

    y_test,

    rf_predictions

)

rf_auc = roc_auc_score(

    y_test,

    rf_probabilities

)

print("\nRandom Forest Performance")

print("-" * 40)

print(f"Accuracy      : {rf_accuracy:.4f}")

print(f"Precision     : {rf_precision:.4f}")

print(f"Recall        : {rf_recall:.4f}")

print(f"F1 Score      : {rf_f1:.4f}")

print(f"ROC-AUC Score : {rf_auc:.4f}")

print("\nConfusion Matrix")

print(

    confusion_matrix(

        y_test,

        rf_predictions

    )

)

print("\nClassification Report")

print(

    classification_report(

        y_test,

        rf_predictions

    )

)
# ============================================================
# STEP 9 : MODEL COMPARISON
# ============================================================

print("\n" + "=" * 70)

print("STEP 9 : MODEL COMPARISON")

print("=" * 70)

print(f"{'Model':<25}{'Accuracy':<12}{'ROC-AUC'}")

print(f"{'Logistic Regression':<25}{logistic_accuracy:.4f}      {logistic_auc:.4f}")

print(f"{'Random Forest':<25}{rf_accuracy:.4f}      {rf_auc:.4f}")

# Select the best model using ROC-AUC

if rf_auc >= logistic_auc:

    best_model = best_rf

    best_model_name = "Random Forest"

    needs_scaling = False

else:

    best_model = logistic_model

    best_model_name = "Logistic Regression"

    needs_scaling = True

print("\n" + "=" * 70)

print("BEST MODEL")

print("=" * 70)

print(f"Selected Model : {best_model_name}")

# ============================================================
# STEP 10 : SAVE MODEL
# ============================================================

print("\n" + "=" * 70)

print("STEP 10 : SAVING MODEL")

print("=" * 70)

model_bundle = {

    "model": best_model,

    "model_name": best_model_name,

    "needs_scaling": needs_scaling,

    "scaler": scaler,

    "feature_names": FEATURES,

    "metrics": {

        "Logistic Regression": {

            "accuracy": logistic_accuracy,

            "precision": logistic_precision,

            "recall": logistic_recall,

            "f1_score": logistic_f1,

            "roc_auc": logistic_auc

        },

        "Random Forest": {

            "accuracy": rf_accuracy,

            "precision": rf_precision,

            "recall": rf_recall,

            "f1_score": rf_f1,

            "roc_auc": rf_auc

        }

    }

}

# Save trained model

joblib.dump(

    model_bundle,

    MODEL_PATH

)

# ============================================================
# STEP 11 : SAVE METRICS
# ============================================================

metrics = {

    "selected_model": best_model_name,

    "logistic_regression": {

        "accuracy": round(logistic_accuracy, 4),

        "precision": round(logistic_precision, 4),

        "recall": round(logistic_recall, 4),

        "f1_score": round(logistic_f1, 4),

        "roc_auc": round(logistic_auc, 4)

    },

    "random_forest": {

        "accuracy": round(rf_accuracy, 4),

        "precision": round(rf_precision, 4),

        "recall": round(rf_recall, 4),

        "f1_score": round(rf_f1, 4),

        "roc_auc": round(rf_auc, 4)

    }

}

with open(

    METRICS_PATH,

    "w"

) as file:

    json.dump(

        metrics,

        file,

        indent=4

    )

# ============================================================
# TRAINING COMPLETED
# ============================================================

print("\n" + "=" * 70)

print("MODEL TRAINING COMPLETED SUCCESSFULLY")

print("=" * 70)

print(f"\nSelected Model : {best_model_name}")

print(f"\nModel Saved To : {MODEL_PATH}")

print(f"\nMetrics Saved To : {METRICS_PATH}")

print("\nProject Ready For FastAPI Deployment")

print("=" * 70)