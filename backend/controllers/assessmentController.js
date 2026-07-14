const Assessment = require("../models/Assessment");
const User = require("../models/User");
const axios = require("axios");


// ======================================================
// Submit Assessment
// ======================================================

exports.submitAssessment = async (req, res) => {

    try {

        const {
            age,
            height,
            weight,
            highBP,
            highChol,
            smoking,
            alcohol,
            physicalActivity,
            fruitsConsumption,
            veggiesConsumption,
            generalHealth,
            difficultyWalking
        } = req.body;


        // ======================================================
        // GET LOGGED-IN USER
        // ======================================================

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User account not found. Please register first and then log in."
            });
        }


        // ======================================================
        // VALIDATE CURRENT AGE FROM ASSESSMENT FORM
        // ======================================================

        const numericAge = Number(age);

        if (
            age === undefined ||
            age === null ||
            !Number.isInteger(numericAge) ||
            numericAge < 18 ||
            numericAge > 120
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Age must be a whole number between 18 and 120 years."
            });
        }


        // ======================================================
        // VALIDATE USER GENDER
        // Gender still comes from registered user account
        // 0 = Female, 1 = Male
        // ======================================================

        if (
            user.gender === undefined ||
            user.gender === null ||
            ![0, 1].includes(Number(user.gender))
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Gender information is missing or invalid. Please check your account details."
            });
        }


        // ======================================================
        // VALIDATE HEIGHT
        // ======================================================

        if (
            height === undefined ||
            height === null ||
            isNaN(Number(height)) ||
            Number(height) <= 0 ||
            Number(height) > 300
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Height must be greater than 0 and at most 300 cm."
            });
        }


        // ======================================================
        // VALIDATE WEIGHT
        // ======================================================

        if (
            weight === undefined ||
            weight === null ||
            isNaN(Number(weight)) ||
            Number(weight) <= 0 ||
            Number(weight) > 500
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Weight must be greater than 0 and at most 500 kg."
            });
        }


        // ======================================================
        // VALIDATE BINARY FIELDS
        // All fields below must contain either 0 or 1
        // ======================================================

        const binaryFields = [

            {
                name: "High blood pressure",
                value: highBP
            },

            {
                name: "High cholesterol",
                value: highChol
            },

            {
                name: "Smoking",
                value: smoking
            },

            {
                name: "Heavy alcohol consumption",
                value: alcohol
            },

            {
                name: "Physical activity",
                value: physicalActivity
            },

            {
                name: "Fruit consumption",
                value: fruitsConsumption
            },

            {
                name: "Vegetable consumption",
                value: veggiesConsumption
            },

            {
                name: "Difficulty walking",
                value: difficultyWalking
            }

        ];


        for (const field of binaryFields) {

            if (
                field.value === undefined ||
                field.value === null ||
                ![0, 1].includes(Number(field.value))
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        `${field.name} must be answered with Yes or No.`
                });
            }
        }


        // ======================================================
        // VALIDATE GENERAL HEALTH
        // ======================================================

        if (
            generalHealth === undefined ||
            generalHealth === null ||
            ![1, 2, 3, 4, 5].includes(Number(generalHealth))
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "General health must be selected from Excellent, Very Good, Good, Fair, or Poor."
            });
        }


        // ======================================================
        // CONVERT NUMERIC VALUES
        // ======================================================

        const numericHeight = Number(height);

        const numericWeight = Number(weight);


        // ======================================================
        // CALCULATE BMI
        // Formula:
        // BMI = weight in kg / height in meters squared
        // ======================================================

        const heightMeters = numericHeight / 100;

        const bmi = Number(
            (
                numericWeight /
                (heightMeters * heightMeters)
            ).toFixed(2)
        );


        // ======================================================
        // VALIDATE CALCULATED BMI
        // Must match FastAPI schema:
        // BMI > 0 and BMI <= 80
        // ======================================================

        if (
            !Number.isFinite(bmi) ||
            bmi <= 0 ||
            bmi > 80
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "The calculated BMI must be greater than 0 and at most 80. Please check your height and weight."
            });
        }


        // ======================================================
        // PREPARE ML INPUT
        // This must match the FastAPI PatientData schema
        // ======================================================

        const mlInput = {

            bmi: bmi,

            height: numericHeight,

            weight: numericWeight,

            highBP: Number(highBP),

            highChol: Number(highChol),

            smoking: Number(smoking),

            alcohol: Number(alcohol),

            physicalActivity: Number(physicalActivity),

            fruitsConsumption: Number(fruitsConsumption),

            veggiesConsumption: Number(veggiesConsumption),

            generalHealth: Number(generalHealth),

            difficultyWalking: Number(difficultyWalking),

            age: numericAge,

            gender: Number(user.gender)
        };


        // ======================================================
        // CALL FASTAPI ML SERVICE
        // ======================================================

        console.log("ML INPUT:");

        console.log(mlInput);


        const mlResponse = await axios.post(

            process.env.ML_API_URL,

            mlInput,

            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        );


        const prediction = mlResponse.data;


        console.log("Prediction:");

        console.log(prediction);


        // ======================================================
        // SAVE ASSESSMENT TO MONGODB
        // ======================================================

        const assessment = await Assessment.create({

            user: user._id,

            age: numericAge,

            gender: prediction.gender,

            height: numericHeight,

            weight: numericWeight,

            bmi: bmi,

            highBP: Number(highBP),

            highChol: Number(highChol),

            smoking: Number(smoking),

            alcohol: Number(alcohol),

            physicalActivity: Number(physicalActivity),

            fruitsConsumption: Number(fruitsConsumption),

            veggiesConsumption: Number(veggiesConsumption),

            generalHealth: Number(generalHealth),

            difficultyWalking: Number(difficultyWalking),

            riskProbability: prediction.riskProbability,

            riskLevel: prediction.riskLevel,

            shapFactors: prediction.shapFactors,

            recommendations: prediction.recommendations
        });


        // ======================================================
        // SUCCESS RESPONSE
        // ======================================================

        return res.status(201).json({

            success: true,

            message:
                "Assessment submitted successfully.",

            data: assessment
        });


    } catch (error) {


        // ======================================================
        // LOG ERROR
        // ======================================================

        console.error("Assessment Error:");


        if (error.response) {

            console.log(

                JSON.stringify(
                    error.response.data,
                    null,
                    2
                )

            );


            // ==================================================
            // FASTAPI VALIDATION ERROR
            // ==================================================

            if (error.response.status === 422) {

                const detail =
                    error.response.data?.detail;


                if (
                    Array.isArray(detail) &&
                    detail.length > 0
                ) {

                    return res.status(400).json({

                        success: false,

                        message:
                            detail[0]?.msg ||
                            "Please check the assessment information and try again."

                    });

                }

            }


            // ==================================================
            // OTHER FASTAPI ERRORS
            // ==================================================

            return res.status(502).json({

                success: false,

                message:
                    error.response.data?.detail ||
                    "The prediction service could not process the assessment."

            });

        }


        console.log(error.message);


        // ======================================================
        // GENERAL SERVER ERROR
        // ======================================================

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while processing your assessment. Please try again."

        });

    }

};


// ======================================================
// Get Logged-in User Assessment History
// ======================================================

exports.getMyAssessments = async (req, res) => {

    try {

        const assessments = await Assessment.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });


        return res.status(200).json({

            success: true,

            count: assessments.length,

            data: assessments

        });


    } catch (error) {

        console.error(
            "Fetch Assessment History Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch assessment history. Please try again."

        });

    }

};


// ======================================================
// Get Single Assessment
// ======================================================

exports.getAssessmentById = async (req, res) => {

    try {

        const assessment = await Assessment.findById(
            req.params.id
        );


        if (!assessment) {

            return res.status(404).json({

                success: false,

                message:
                    "Assessment not found."

            });

        }


        // ======================================================
        // PREVENT USERS FROM VIEWING OTHERS' ASSESSMENTS
        // ======================================================

        if (
            assessment.user.toString() !==
            req.user.id
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Access denied. You cannot view another user's assessment."

            });

        }


        return res.status(200).json({

            success: true,

            data: assessment

        });


    } catch (error) {

        console.error(
            "Fetch Assessment Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch assessment. Please try again."

        });

    }

};