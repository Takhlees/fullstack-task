// models/job.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'jobs.json');

const readJobs = () => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return data ? JSON.parse(data) : [];
    } else {
      console.warn('Jobs file does not exist. Returning an empty array.');
      return [];
    }
  } catch (error) {
    console.error('Error reading jobs file:', error);
    return [];
  }
};

const writeJobs = (jobs) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2), 'utf8');
    console.log('Jobs file updated successfully');
  } catch (error) {
    console.error('Error writing jobs file:', error);
  }
};

module.exports = { readJobs, writeJobs };
