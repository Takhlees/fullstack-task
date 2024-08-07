// src/components/JobForm.js
import React from 'react';
import axios from 'axios';

const JobForm = ({ onJobCreated }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs');
      onJobCreated(response.data.id);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <form className='jobform' onSubmit={handleSubmit}>
      <div className='btn'>
      <button type="submit">Create Job</button>
      </div>
    </form>
  );
};

export default JobForm;



