"use client";

import { useEffect, useState } from 'react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    }
    fetchJobs();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Job Listings</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p>{job.description}</p>
            <p className="text-gray-500">Employer: {job.employer.name}</p>
          </div>
        ))
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
};

export default JobList;