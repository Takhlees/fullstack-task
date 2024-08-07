// routes/jobs.js
const express = require('express');
const { createJob, getJobs, getJobById } = require('../controllers/jobController');

const router = express.Router();

router.post('/jobs', createJob);
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);

module.exports = router;
