const express = require('express');

const {
    submitAssessment,
    getMyAssessments,
    getAssessmentById
} = require('../controllers/assessmentController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware, submitAssessment);

router.get('/myassessments', authMiddleware, getMyAssessments);

router.get('/:id', authMiddleware, getAssessmentById);

module.exports = router;
