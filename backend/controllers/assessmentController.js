const Assessment = require("../models/Assessment");
const User = require("../models/User");
const axios = require("axios");

// ======================================================
// Submit Assessment
// ======================================================

exports.submitAssessment = async (req, res) => {

    try {

        const {

            height,
            weight,
            smoking,
            alcohol,
            physicalActivity,
            fruitsConsumption,
            veggiesConsumption,
            generalHealth,
            difficultyWalking

        } = req.body;

        // ---------------------------------------------
        // Get logged-in user
        // ---------------------------------------------

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        // ---------------------------------------------
        // Calculate BMI
        // ---------------------------------------------

        const heightMeters = height / 100;

        const bmi = Number(
            (
                weight /
                (heightMeters * heightMeters)
            ).toFixed(2)
        );

        // ---------------------------------------------
        // Prepare ML Input
        // ---------------------------------------------

        const mlInput = {
			height: Number(height),
			weight: Number(weight),

            bmi,

            smoking,

            alcohol,

            physicalActivity,

            fruitsConsumption,

            veggiesConsumption,

            generalHealth,

            difficultyWalking,

            age: user.age,

            gender: user.gender

        };

        // ---------------------------------------------
        // Call FastAPI
        // ---------------------------------------------

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

        // ---------------------------------------------
        // Save Assessment
        // ---------------------------------------------

        const assessment = await Assessment.create({

            user: user._id,
			 age: prediction.age,
			gender: prediction.gender,


            height,

            weight,

            bmi,

            smoking,

            alcohol,

            physicalActivity,

            fruitsConsumption,

            veggiesConsumption,

            generalHealth,

            difficultyWalking,

            riskProbability: prediction.riskProbability,

            riskLevel: prediction.riskLevel,

            shapFactors: prediction.shapFactors,

            recommendations: prediction.recommendations

        });

        return res.status(201).json({

            success: true,

            message: "Assessment submitted successfully",

            data: assessment

        });

    }

	catch (error) {

    console.error("Assessment Error:");

    if (error.response) {
        console.log(JSON.stringify(error.response.data, null, 2));
    } else {
        console.log(error.message);
    }

    return res.status(500).json({
        success: false,
        message: "Failed to process assessment"
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

        })
            .sort({ createdAt: -1 });

        return res.status(200).json({

            success: true,

            count: assessments.length,

            data: assessments

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch assessments"

        });

    }

};

// ======================================================
// Get Single Assessment
// ======================================================

exports.getAssessmentById = async (req, res) => {

    try {

        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {

            return res.status(404).json({

                success: false,

                message: "Assessment not found"

            });

        }

        // Prevent users from viewing others' assessments
        if (assessment.user.toString() !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        return res.status(200).json({

            success: true,

            data: assessment

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch assessment"

        });

    }

};
