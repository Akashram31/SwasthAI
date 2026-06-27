# SwasthAI

## An Explainable AI-Based Preventive Healthcare Platform for Early Diabetes Risk Assessment

### Detect Early. Prevent Better. Live Healthier.

---

# Overview

SwasthAI is a full-stack healthcare application that predicts an individual's diabetes risk using Machine Learning. The platform allows users to securely register, complete a health assessment, receive an explainable AI-based prediction, and track their previous assessments through an interactive dashboard.

Unlike traditional prediction systems, SwasthAI provides transparent predictions using **SHAP (SHapley Additive Explanations)** along with personalized health recommendations to help users understand and reduce their diabetes risk.

---

# Key Features

* Secure User Registration & Login
* Diabetes Risk Prediction using Machine Learning
* Explainable AI using SHAP
* Personalized Health Recommendations
* Automatic BMI Calculation
* Assessment History Tracking
* Interactive Dashboard with Risk Trends
* REST API-based Architecture
* Responsive User Interface

---

# Technology Stack

## Frontend

* React.js
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDBAtlas
* Mongoose
* JWT Authentication

## Machine Learning Service

* Python
* FastAPI
* Scikit-learn
* Random Forest Classifier
* SHAP
* Pandas
* NumPy

---

# Project Structure

```text
SwasthAI/
│
├── README.md
│
├── backend/
│   │
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── assessmentController.js
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Assessment.js
│   │   └── User.js
│   │
│   └── routes/
│       ├── assessmentRoutes.js
│       └── authRoutes.js
│
├── frontend/
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   │
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       │
│       ├── api/
│       │   └── axios.js
│       │
│       ├── components/
│       │   ├── AssessmentForm.js
│       │   ├── DashboardView.js
│       │   ├── LoginForm.js
│       │   ├── Navbar.js
│       │   ├── RegisterForm.js
│       │   └── ResultCard.js
│       │
│       ├── pages/
│       │   ├── Assessment.js
│       │   ├── Dashboard.js
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Result.js
│       │
│       ├── App.js
│       ├── index.js
│       └── index.css
│
└── ml_service/
    │
    ├── requirements.txt
    ├── main.py
    ├── model_utils.py
    ├── recommendation_engine.py
    ├── schemas.py
    ├── train_model.py
    ├── utils.py
    ├── diabetes_binary_health_indicators_BRFSS2015.csv
    │
    └── saved_model/
        ├── diabetes_model.pkl
        └── metrics.json
```

---

# System Architecture

```text
                     User
                       │
                       ▼
              React Frontend
                       │
                       ▼
          Node.js + Express Backend
                       │
                       ▼
            FastAPI Machine Learning API
                       │
                       ▼
        Random Forest Prediction Model
                       │
                       ▼
          SHAP Explainability Engine
                       │
                       ▼
                  MongoDB Database
```

---

# Installation Guide

## Step 1: Clone the Project

```bash
git clone <repository-url>
cd SwasthAI
```

---

## Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ML_API_URL=http://127.0.0.1:8000/predict
```

Run the backend:

```bash
npm start
```

---

## Step 3: Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## Step 4: Machine Learning Service

```bash
cd ml_service
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn main:app --reload
```

ML API runs on:

```
http://127.0.0.1:8000
```

---

# Application Workflow

1. User registers or logs in.
2. User completes the diabetes assessment form.
3. BMI is calculated automatically.
4. Backend sends the health data to the FastAPI ML service.
5. Random Forest predicts diabetes risk.
6. SHAP explains the prediction by highlighting important contributing features.
7. Personalized health recommendations are generated.
8. Results are stored in MongoDB.
9. Dashboard displays assessment history and risk trends.

---

# User Input Parameters

* Age
* Gender
* Height
* Weight
* BMI (Automatically Calculated)
* Smoking Habit
* Alcohol Consumption
* Physical Activity
* Fruit Consumption
* Vegetable Consumption
* General Health
* Difficulty Walking

---

# Output

The application provides:

* Diabetes Risk Prediction
* Risk Probability
* SHAP Feature Explanation
* Personalized Health Recommendations
* Assessment History
* Dashboard with Risk Trend Visualization

---

# Future Enhancements

* Multi-Disease Prediction
* Doctor Consultation Module
* Cloud Deployment (AWS)
* Wearable Device Integration
* Mobile Application
* Electronic Health Record (EHR) Integration

---

# Developed For

**Bharat Academix CodeQuest Hackathon**

Project Name: **SwasthAI**

---

# License

This project was developed for educational and hackathon purposes.
