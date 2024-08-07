// controllers/jobsController.js
const { readJobs, writeJobs } = require('../models/job');
const axios = require('axios');
require('dotenv').config(); // Add this at the top of your file

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

exports.createJob = (req, res) => {
  console.log('good')
    // Load jobs from file
    let jobs = readJobs();
    const jobId = jobs.length + 1;
    const newJob = { id: jobId, status: 'pending', result: null };
    jobs.push(newJob);
    console.log('Before calling writeJobs');
    // Save updated jobs to file
    writeJobs(jobs);

    console.log(`Created job ${jobId} with status 'pending'`);

    // Simulate a delay for job execution
    console.log('Before setTimeout');

    setTimeout(async () => {
      console.log('Timeout function is called');
      try {
        console.log(`Processing job ${jobId}`);

        const response = await axios.get('https://api.unsplash.com/photos/random?count=1', {
          params: { query: 'food', orientation: 'landscape' },
          headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        });
        console.log(`Response status: ${response.status}`);
        newJob.result = response.data[0].urls.regular;
        newJob.status = 'resolved';

        console.log(`Job ${jobId} resolved with result: ${newJob.result}`);
      } catch (error) {
        console.error(`Error fetching image for job ${jobId}:`, error);
        newJob.status = 'failed';
      }
      console.log('Before calling writeJobstime');
      // Save updated jobs to file after processing
      writeJobs(jobs);
    }, 2000);
    console.log('After setTimeout');
    res.status(201).json({ id: jobId });
 
};

exports.getJobs = (req, res) => {
  try {
    const jobs = readJobs();
    res.json(jobs);
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getJobById = (req, res) => {
  try {
    const jobs = readJobs();
    const job = jobs.find(job => job.id === parseInt(req.params.id));
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error retrieving job by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


