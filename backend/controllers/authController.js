const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ======================================================
// Register User
// ======================================================

exports.registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            gender
        } = req.body;


        // ======================================================
        // CHECK REQUIRED FIELDS
        // ======================================================

        if (
            !name ||
            !email ||
            !password ||
            gender === undefined
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }


        // ======================================================
        // VALIDATE NAME
        // ======================================================

        if (name.trim().length < 2) {

            return res.status(400).json({
                success: false,
                message: "Name must contain at least 2 characters."
            });
        }


        // ======================================================
        // VALIDATE EMAIL
        // ======================================================

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }


        // ======================================================
        // VALIDATE PASSWORD
        // ======================================================

        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters."
            });
        }


        // ======================================================
        // VALIDATE GENDER
        // 0 = Female, 1 = Male
        // ======================================================

        const numericGender = Number(gender);

        if (![0, 1].includes(numericGender)) {

            return res.status(400).json({
                success: false,
                message: "Please select a valid gender."
            });
        }


        // ======================================================
        // NORMALIZE EMAIL
        // ======================================================

        const normalizedEmail = email
            .trim()
            .toLowerCase();


        // ======================================================
        // CHECK IF USER ALREADY EXISTS
        // ======================================================

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message:
                    "An account already exists with this email. Please log in instead."
            });
        }


        // ======================================================
        // HASH PASSWORD
        // ======================================================

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // ======================================================
        // CREATE NEW USER
        // ======================================================

        const user = await User.create({

            name: name.trim(),

            email: normalizedEmail,

            password: hashedPassword,

            gender: numericGender
        });


        // ======================================================
        // SUCCESS RESPONSE
        // ======================================================

        return res.status(201).json({

            success: true,

            message:
                "Registration successful. You can now log in.",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender
            }
        });


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong during registration. Please try again."
        });

    }

};


// ======================================================
// Login User
// ======================================================

exports.loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // ======================================================
        // CHECK REQUIRED FIELDS
        // ======================================================

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Please enter both your email and password."
            });
        }


        // ======================================================
        // NORMALIZE EMAIL
        // ======================================================

        const normalizedEmail = email
            .trim()
            .toLowerCase();


        // ======================================================
        // CHECK IF USER EXISTS
        // ======================================================

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "No account found with this email. Please register first and then log in."
            });
        }


        // ======================================================
        // COMPARE PASSWORD
        // ======================================================

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message:
                    "Incorrect password. Please try again."
            });
        }


        // ======================================================
        // GENERATE JWT
        // ======================================================

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // ======================================================
        // SUCCESS RESPONSE
        // ======================================================

        return res.status(200).json({

            success: true,

            message: "Login successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender
            }
        });


    } catch (error) {

        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Something went wrong during login. Please try again."
        });

    }

};