// src/components/JobList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = ({ newJobId }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('http://localhost:5000/api/jobs');
      console.log(response.data)
      setJobs(response.data);
      
    };
    
    fetchJobs();
    const intervalId = setInterval(fetchJobs, 5000);
    return () => clearInterval(intervalId);
  }, [newJobId]);
  
  console.log('Jobs state:', jobs);
  return (
    <div >
      <h2>Job List</h2>
      <ul className='joblist'>
        {jobs.map(job => (
          <div className='job' key={job.id}>
            <p>ID: {job.id}</p>
            <span>Status: {job.status}</span>
            {job.status === 'resolved' && (
              <img src={job.result} alt="Food"/>
            )}
            
          </div>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
