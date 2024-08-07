// src/App.js
import React, { useState } from 'react';
import JobForm from './Components/jobForm';
import JobList from './Components/jobList';

const App = () => {
  const [newJobId, setNewJobId] = useState(null);

  const handleJobCreated = (id) => {
    setNewJobId(id);
  };

  return (
    <div >
      <h1>Job Manager</h1>
      <JobForm onJobCreated={handleJobCreated} />
      <JobList newJobId={newJobId} />
    </div>
  );
};

export default App;
